import IUser from '../entities/IUser';
import IUserDTO from '../entities/IUserDTO';

interface IUserService {
  get(id: string): Promise<IUserDTO>;
  create(user: IUserDTO): Promise<IUserDTO>;
  delete(id: string): Promise<IUserDTO>;
  update(id: string, user: IUser): Promise<IUserDTO>;
  getSuggested(limit?: string, substring?: string): Promise<IUserDTO[]>
}

export default IUserService;
