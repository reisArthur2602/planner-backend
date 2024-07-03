export type User = {
  id: string;
  email: string;
};

export type UserCreate = {
  email: string;
};

export interface IUserRepository {
  create(data: UserCreate): Promise<User>;
}
