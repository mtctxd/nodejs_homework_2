import { User } from '../types';

/**
 * Process info array and apply changes to it
 * 
 * @param  {string=''} loginSubscring
 * @param  {string='10'} limit
 */

export function processUserQueryString(
  itesToProcess: User[],
  loginSubscring: string = '',
  limit: string = '10'
): User[] {
  let result = [...itesToProcess];

  if (loginSubscring) {
    result = result
      .filter((user) =>
        user.login.toLowerCase().includes(loginSubscring.toLowerCase())
      )
      .sort((current: User, prev: User) =>
        current.login.localeCompare(prev.login)
      );
  }

  if (limit) {
    result.splice(+limit);
  }

  return result;
}
