import IGroup from '../entities/IGroup';
import IUserDTO from '../entities/IUserDTO';

interface IGroupRepository {
  get(id: string): Promise<IGroup>;
  getAll(): Promise<IGroup>
  create(user: IG): Promise<IGroup>;
  delete(id: string): Promise<IGroup>;
  update(user: IGroup): Promise<IGroup>;
  getSuggested(limit: string, substring: string): Promise<IGroup[]>
}

export default IGroupRepository;
