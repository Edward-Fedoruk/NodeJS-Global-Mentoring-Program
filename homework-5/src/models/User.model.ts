import {
  Table,
  Column,
  Model,
  AllowNull,
  Default,
  BelongsToMany,
} from 'sequelize-typescript';
import Group from './Group.model';
import UserGroup from './UserGroup.model';

@Table
class User extends Model {
  @AllowNull(false)
  @Column
  login: string

  @AllowNull(false)
  @Column
  password: string

  @AllowNull(false)
  @Column({ validate: { min: 1 } })
  age: number

  @Default(false)
  @AllowNull(false)
  @Column
  isDeleted: boolean

  @BelongsToMany(() => Group, () => UserGroup)
  groups: Group[]
}

export default User;
