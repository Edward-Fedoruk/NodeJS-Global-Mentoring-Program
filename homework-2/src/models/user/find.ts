import userData from '../../data/userData';
import { UserDataEntity } from './types';

export default (id: string) => new Promise<UserDataEntity>((resolve, reject) => {
  const foundUser = userData.data.find((user) => user.id === id);

  if (foundUser) {
    resolve(foundUser);
  } else {
    reject(new Error('could not find user'));
  }
});
