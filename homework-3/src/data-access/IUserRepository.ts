import IUser from '../entities/IUser';
import IUserDTO from '../entities/IUserDTO';

interface IUserRepository {
  get(id: string): Promise<IUserDTO>;
  create(user: IUser): Promise<IUserDTO>;
  delete(id: string): Promise<IUserDTO>;
  update(id: string, user: IUser): Promise<IUserDTO>;
  getSuggested(limit: string, substring: string): Promise<IUserDTO[]>
}

export default IUserRepository;
