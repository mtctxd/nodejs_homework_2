export const premisionTypes = [
  'READ',
  'WRITE',
  'DELETE',
  'SHARE',
  'UPLOAD_FILES',
] as const;

export type Premission = typeof premisionTypes[number];

export type User = {
  user_id: string;
  login: string;
  password: string;
  age: number;
  is_deleted: boolean;
  groups?: string[];
};

export type Group = {
  group_id: string;
  name: string;
  premissions: Array<Premission>;
  users?: string[];
};

export type UserCreateProperties = Omit<User, 'is_deleted' | 'user_id'>;
export type UserUpdateProperties = Partial<UserCreateProperties>;

export type GroupCreateProperties = Omit<Group, 'group_id'>;
export type GroupUpdateProperties = Partial<GroupCreateProperties>;

export type UniqueUserKey = keyof Pick<UserCreateProperties, 'login'>;
export type UniqueGroupKey = keyof Pick<GroupCreateProperties, 'name'>;
export type UniqueKeys = UniqueUserKey | UniqueGroupKey;
