import { db } from '../database/prisma';
import {
  IUserRepository,
  User,
  UserCreate,
} from '../interfaces/user.interface';

class UserRepositoryPrisma implements IUserRepository {
  async create(data: UserCreate): Promise<User> {
    return await db.user.create({ data });
  }
  async findByEmail(data: UserCreate): Promise<User | null> {
    return await db.user.findFirst({ where: { email: data.email } });
  }
}
export { UserRepositoryPrisma };
