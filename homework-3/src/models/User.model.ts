import {
  Table,
  Column,
  Model,
  AllowNull,
  Default,
} from 'sequelize-typescript';

@Table
class Users extends Model {
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
}

export default Users;
