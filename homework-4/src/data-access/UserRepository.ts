import { injectable } from 'inversify';
import { Op } from 'sequelize';
import IUser from '../entities/IUser';
import IUserDTO from '../entities/IUserDTO';
import IUserRepository from './IUserRepository';
import UserModel from '../models/User.model';

@injectable()
class UserRepository implements IUserRepository {
  private formatDTO(userRow: UserModel): IUserDTO {
    return {
      id: `${userRow.id}`,
      login: userRow.login,
      age: userRow.age,
      password: userRow.password,
      isDeleted: userRow.isDeleted,
    };
  }

  async get(id: string): Promise<IUserDTO> {
    const userRow = await UserModel.findByPk(id);

    if (userRow) {
      return this.formatDTO(userRow);
    }

    throw Error(`can't get user with id: ${id}`);
  }

  async create(user: IUserDTO): Promise<IUserDTO> {
    const userRow = await UserModel.create(user);

    return this.formatDTO(userRow);
  }

  async delete(id: string): Promise<IUserDTO> {
    const [, [userRow]] = await UserModel.update(
      { isDeleted: true },
      { where: { id }, returning: true },
    );

    return this.formatDTO(userRow);
  }

  async update(id: string, user: IUser): Promise<IUserDTO> {
    const { ...updateInfo } = user;

    const [, [userRow]] = await UserModel.update(
      { ...updateInfo },
      { where: { id }, returning: true },
    );

    return this.formatDTO(userRow);
  }

  async getSuggested(limit: string, substring: string): Promise<IUserDTO[]> {
    const parsedLimit = parseInt(limit, 10);

    const userRows = await UserModel.findAll({
      where: { login: { [Op.like]: `%${substring}%` } },
      limit: Number.isNaN(parsedLimit) ? undefined : parsedLimit,
      order: ['login', 'ASC'],
    });

    return userRows.map(this.formatDTO);
  }
}

export default UserRepository;
