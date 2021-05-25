import {
  BaseHttpController, controller, httpDelete, httpGet, httpPatch, httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import IGroupService from '../services/IGroupService';
import groupSchema from '../validation-schemas/group';
import validate from '../middlewares/validate';
import TYPES from '../config/types';
import auth from '../middlewares/auth';

@controller('/group', auth)
class GroupController extends BaseHttpController {
  private groupService: IGroupService

  constructor(@inject(TYPES.GroupService) groupService: IGroupService) {
    super();
    this.groupService = groupService;
  }

  @httpGet('/:id')
  async get(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const group = await this.groupService.get(id);
      res.json(group);
    } catch (err) {
      res.status(404).send('group not found');
    }
  }

  @httpGet('/')
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const group = await this.groupService.getAll();
      res.json(group);
    } catch (err) {
      res.status(404).send('groups not found');
    }
  }

  @httpPost('/', validate(groupSchema, 'body'))
  async create(req: Request, res: Response): Promise<void> {
    try {
      const group = await this.groupService.create(req.body);
      res.json(group);
    } catch (err) {
      res.status(404).send('group was not created');
    }
  }

  @httpPost('/:id')
  async addUsersToGroup(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { userIds } = req.body;

    try {
      await this.groupService.addToGroup(id, userIds);
    } catch (err) {
      res.status(400).send('could not add user');
    }
  }

  @httpDelete('/:id')
  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await this.groupService.delete(id);
      res.status(200);
    } catch (err) {
      res.status(400).send('group was not deleted');
    }
  }

  @httpPatch('/:id')
  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const group = await this.groupService.update(id, req.body);
      res.json(group);
    } catch (err) {
      res.status(400).send('group was not updated');
    }
  }
}

export default GroupController;
