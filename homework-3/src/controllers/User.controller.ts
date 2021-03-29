/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  BaseHttpController, controller, httpDelete, httpGet, httpPatch, httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import IUserService from '../services/IUserService';
import TYPES from '../types';

@controller('/user')
class UserController extends BaseHttpController {
  private userService: IUserService

  constructor(@inject(TYPES.UserService) userService: IUserService) {
    super();
    this.userService = userService;
  }

  @httpGet('/:id')
  async get(req: Request, res: Response) {
    const { id: userId } = req.params;
    try {
      const user = await this.userService.get(userId);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).send('user not found');
    }
  }

  @httpPost('/')
  async create(req: Request, res: Response) {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(404).send('user was not created');
    }
  }

  @httpDelete('/:id')
  async delete(req: Request, res: Response) {
    const { id: userId } = req.params;

    try {
      const user = await this.userService.delete(userId);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).send('user was not deleted');
    }
  }

  @httpPatch('/:id')
  async update(req: Request, res: Response) {
    try {
      const user = await this.userService.update(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).send('user was not deleted');
    }
  }
}

export default UserController;
