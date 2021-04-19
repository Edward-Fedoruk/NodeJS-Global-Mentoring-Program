import IGroup from '../entities/IGroup';
import IGroupDTO from '../entities/IGroupDTO';

interface IGroupService {
  get(id: string): Promise<IGroupDTO>;
  getAll(): Promise<IGroupDTO[]>
  create(group: IGroup): Promise<IGroupDTO>;
  addToGroup(groupId: string, ids: string[]): Promise<void>;
  delete(id: string): Promise<number>;
  update(id: string, user: IGroup): Promise<IGroupDTO>;
}

export default IGroupService;
