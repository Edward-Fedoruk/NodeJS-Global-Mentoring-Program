import { v4 as uuidV4 } from 'uuid';
import { User, UserDataEntity } from './types';
import userData from '../../data/userData';

export default (user: User) => new Promise<UserDataEntity>((resolve) => {
  const newUser: UserDataEntity = {
    id: uuidV4(),
    isDeleted: false,
    ...user,
  };

  userData.data.push(newUser);
  resolve(newUser);
});
