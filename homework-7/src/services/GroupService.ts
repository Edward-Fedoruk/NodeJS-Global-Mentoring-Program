import { inject, injectable } from 'inversify';
import TYPES from '../config/types';
import IGroup from '../entities/IGroup';
import IGroupDTO from '../entities/IGroupDTO';
import IGroupService from './IGroupService';
import IGroupRepository from '../data-access/IGroupRepository';

@injectable()
class GroupService implements IGroupService {
  private groupRepository: IGroupRepository

  constructor(@inject(TYPES.GroupRepository) groupRepository: IGroupRepository) {
    this.groupRepository = groupRepository;
  }

  addToGroup(groupId: string, ids: string[]): Promise<void> {
    return this.groupRepository.addToGroup(groupId, ids);
  }

  getAll(): Promise<IGroupDTO[]> {
    return this.groupRepository.getAll();
  }

  get(id: string): Promise<IGroupDTO> {
    return this.groupRepository.get(id);
  }

  create(group: IGroup): Promise<IGroupDTO> {
    return this.groupRepository.create(group);
  }

  delete(id: string): Promise<number> {
    return this.groupRepository.delete(id);
  }

  update(id: string, group: IGroup): Promise<IGroupDTO> {
    return this.groupRepository.update(id, group);
  }
}

export default GroupService;
