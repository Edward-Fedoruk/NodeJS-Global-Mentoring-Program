import userData from '../../data/userData';
import { UserDataEntity } from './types';

export default (
  limit: string,
  substring: string,
) => new Promise<UserDataEntity[]>((resolve) => {
  const suggestedUsers = userData.data
    .filter((user) => user.login.includes(substring))
    .sort((a, b) => a.login.localeCompare(b.login));

  resolve(suggestedUsers.slice(0, parseInt(limit, 10)));
});
