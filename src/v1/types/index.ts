export type User = {
  id: number;
  user_id: string;
  login: string;
  password: string;
  age: number;
  is_deleted: boolean;
};

export type UserCreateProperties = Omit<User, 'id' | 'is_deleted' | 'user_id'>;
export type UserUpdateProperties = Partial<UserCreateProperties>;
export type UserCreateUpdateProperties = UserUpdateProperties | UserCreateProperties;
