import {
  Table,
  Column,
  Model,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import Group from './Group.model';
import User from './User.model';

@Table
class UserGroup extends Model {
  @AllowNull(false)
  @Column
  @ForeignKey(() => User)
  userId: number

  @AllowNull(false)
  @Column
  @ForeignKey(() => Group)
  groupId: number
}

export default UserGroup;
