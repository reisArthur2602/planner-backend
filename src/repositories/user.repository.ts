import { db } from '../database/prisma';
import {
  IUserRepository,
  User,
  UserCreate,
} from '../interfaces/user.interface';

class UserRepositoryPrisma implements IUserRepository {
  async create(data: UserCreate): Promise<User> {}
}
export { UserRepositoryPrisma };
