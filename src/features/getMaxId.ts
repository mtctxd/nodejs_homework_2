import { User } from '../../types';

/**
 * @param  {User[]} data
 */
export const getMaxId = (data: User[]): number => {
  return Math.max(...data.map(({ id }) => id)) + 1 || 1;
};
