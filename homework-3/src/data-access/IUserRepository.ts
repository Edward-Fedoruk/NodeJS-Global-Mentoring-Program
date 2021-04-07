import IUser from '../entities/IUser';
import IUserDTO from '../entities/IUserDTO';

interface IUserRepository {
  get(id: string): Promise<IUser>;
  create(user: IUserDTO): Promise<IUser>;
  delete(id: string): Promise<IUser>;
  update(id: string, user: IUser): Promise<IUser>;
  getSuggested(limit: string, substring: string): Promise<IUser[]>
}

export default IUserRepository;
