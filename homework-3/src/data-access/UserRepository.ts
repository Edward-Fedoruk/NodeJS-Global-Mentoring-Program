import { injectable } from 'inversify';
import { Op } from 'sequelize';
import IUser from '../entities/IUser';
import IUserDTO from '../entities/IUserDTO';
import IUserRepository from './IUserRepository';
import UserModel from '../models/User.model';

@injectable()
class UserRepository implements IUserRepository {
  private formatDTO(userRow: UserModel) {
    return {
      id: `${userRow.id}`,
      login: userRow.login,
      age: userRow.age,
      password: userRow.password,
      isDeleted: userRow.isDeleted,
    };
  }

  async get(id: string): Promise<IUser> {
    const userRow = await UserModel.findByPk(id);

    if (userRow) {
      return this.formatDTO(userRow);
    }

    throw Error(`can't get user with id: ${id}`);
  }

  async create(user: IUserDTO): Promise<IUser> {
    const userRow = await UserModel.create(user);

    return this.formatDTO(userRow);
  }

  async delete(id: string): Promise<IUser> {
    const [, [userRow]] = await UserModel.update(
      { isDeleted: true },
      { where: { id }, returning: true },
    );

    return this.formatDTO(userRow);
  }

  async update(user: IUser): Promise<IUser> {
    const { id, ...updateInfo } = user;

    const [, [userRow]] = await UserModel.update(
      { ...updateInfo },
      { where: { id }, returning: true },
    );

    return this.formatDTO(userRow);
  }

  async getSuggested(limit: string, substring: string): Promise<IUser[]> {
    const parsedLimit = parseInt(limit, 10);

    const userRows = await UserModel.findAll({
      where: { login: { [Op.like]: `%${substring}%` } },
      limit: Number.isNaN(parsedLimit) ? undefined : parsedLimit,
    });

    return userRows.map(this.formatDTO);
  }
}

export default UserRepository;
