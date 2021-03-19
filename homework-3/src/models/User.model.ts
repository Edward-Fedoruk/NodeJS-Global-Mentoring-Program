import {
  Table,
  Column,
  Model,
  Unique,
  AllowNull,
} from 'sequelize-typescript';

@Table
class Users extends Model {
  @AllowNull(false)
  @Unique
  @Column
  login: string

  @AllowNull(false)
  @Column
  password: string

  @AllowNull(false)
  @Column({ validate: { min: 1 } })
  age: number
}

export default Users;
