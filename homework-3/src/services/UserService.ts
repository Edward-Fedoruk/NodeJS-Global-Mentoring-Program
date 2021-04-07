import { inject, injectable } from 'inversify';
import TYPES from '../types';
import IUser from '../entities/IUser';
import IUserDTO from '../entities/IUserDTO';
import IUserService from './IUserService';
import IUserRepository from '../data-access/IUserRepository';

@injectable()
class UserService implements IUserService {
  private userRepository: IUserRepository

  constructor(@inject(TYPES.UserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  get(id: string): Promise<IUser> {
    return this.userRepository.get(id);
  }

  create(user: IUserDTO): Promise<IUser> {
    return this.userRepository.create(user);
  }

  delete(id: string): Promise<IUser> {
    return this.userRepository.delete(id);
  }

  update(id: string, user: IUser): Promise<IUser> {
    return this.userRepository.update(id, user);
  }

  getSuggested(limit = '', substring = ''): Promise<IUser[]> {
    return this.userRepository.getSuggested(limit, substring);
  }
}

export default UserService;
