import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import User from './User.model';
import UserGroup from './UserGroup.model';

@Table
class Group extends Model {
  @AllowNull(false)
  @Column
  name: string

  @AllowNull(false)
  @Column(DataType.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
  permissions: string[]

  @BelongsToMany(() => User, () => UserGroup)
  users: User[]
}

export default Group;
