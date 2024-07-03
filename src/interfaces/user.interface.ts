export type User = {
  id: string;
  email: string;
};

export type UserCreate = {
  email: string;
};

export interface IUserRepository {
  create(data: UserCreate): Promise<Pick<User, 'id'>>;
  findByEmailOrId(data: Partial<User>): Promise<Pick<User, 'id'> | null>;
}
