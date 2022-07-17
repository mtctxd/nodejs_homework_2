export const premisionTypes = [
  'READ',
  'WRITE',
  'DELETE',
  'SHARE',
  'UPLOAD_FILES',
] as const;

export type Premission = typeof premisionTypes[number];

export type User = {
  id: number;
  user_id: string;
  login: string;
  password: string;
  age: number;
  is_deleted: boolean;
};

export type Group = {
  id: number;
  group_id: string;
  name: string;
  premissions: Array<Premission>;
  users?: string[],
};

export type UserCreateProperties = Omit<User, 'id' | 'is_deleted' | 'user_id'>;
export type UserUpdateProperties = Partial<UserCreateProperties>;

export type GroupCreateProperties = Omit<Group, 'id' | 'group_id'>;
export type GroupUpdateProperties = Partial<GroupCreateProperties>;

export type UniqueUserKey = keyof Pick<UserCreateProperties, 'login'>;
export type UniqueGroupKey = keyof Pick<GroupCreateProperties, 'name'>;
export type UniqueKeys = UniqueUserKey | UniqueGroupKey;
