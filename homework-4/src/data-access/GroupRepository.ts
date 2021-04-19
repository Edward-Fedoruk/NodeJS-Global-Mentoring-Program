import { injectable } from 'inversify';
import IGroup from '../entities/IGroup';
import IGroupDTO from '../entities/IGroupDTO';
import IGroupRepository from './IGroupRepository';
import GroupModel from '../models/Group.model';
import UserGroup from '../models/UserGroup.model';

@injectable()
class GroupRepository implements IGroupRepository {
  private formatDTO(groupRow: GroupModel): IGroupDTO {
    return {
      id: `${groupRow.id}`,
      name: groupRow.groupName,
      permissions: groupRow.permissions,
    };
  }

  async getAll(): Promise<IGroupDTO[]> {
    const groupRows = await GroupModel.findAll();
    return groupRows.map(this.formatDTO);
  }

  async get(id: string): Promise<IGroupDTO> {
    const groupRow = await GroupModel.findByPk(id);

    if (groupRow) {
      return this.formatDTO(groupRow);
    }

    throw Error(`can't get group with id: ${id}`);
  }

  async create(group: IGroup): Promise<IGroupDTO> {
    const groupRow = await GroupModel.create(group);

    return this.formatDTO(groupRow);
  }

  async delete(id: string): Promise<number> {
    const deletedId = await GroupModel.destroy(
      { where: { id } },
    );

    if (deletedId) {
      return deletedId;
    }

    throw new Error('group cant be deleted');
  }

  async update(id: string, group: IGroup): Promise<IGroupDTO> {
    const { ...updateInfo } = group;

    const [, [groupRow]] = await GroupModel.update(
      { ...updateInfo },
      { where: { id }, returning: true },
    );

    return this.formatDTO(groupRow);
  }

  async addToGroup(groupId: string, ids: string[]): Promise<void> {
    const rows = ids.map((id) => ({ groupId, userId: id }));
    await UserGroup.bulkCreate(rows);
  }
}

export default GroupRepository;
