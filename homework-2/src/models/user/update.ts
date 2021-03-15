import userData from '../../data/userData';
import { UserDataEntity } from './types';

export default (
  id: string,
  updateData: Partial<UserDataEntity>,
) => new Promise<UserDataEntity>((resolve, reject) => {
  let userFound: UserDataEntity | null = null;

  const newUsers = userData.data.map((userEntity) => {
    if (userEntity.id === id) {
      userFound = { ...userEntity, ...updateData };
      return userFound;
    }
    return userEntity;
  });

  if (userFound) {
    resolve(userFound);
    userData.data = newUsers;
  } else {
    reject(new Error('could not find user'));
  }
});
