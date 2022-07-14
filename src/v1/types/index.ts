export type User = {
  id: number;
  user_id: string;
  login: string;
  password: string;
  age: number;
  is_deleted: boolean;
};

export type UserCreateUpdateProperties = Omit<User, 'id' | 'is_deleted' | 'user_id'>;
