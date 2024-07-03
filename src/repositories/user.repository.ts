import { db } from '../database/prisma';
import {
  IUserRepository,
  User,
  UserCreate,
} from '../interfaces/user.interface';

class UserRepositoryPrisma implements IUserRepository {
  async create(data: UserCreate): Promise<Pick<User, 'id'>> {
    return await db.user.create({ data, select: { id: true } });
  }
  async findByEmailOrId(data: Partial<User>): Promise<Pick<User, 'id'> | null> {
    return await db.user.findFirst({
      where: { OR: [{ email: data.email }, { id: data.id }] },
      select: { id: true },
    });
  }
}
export { UserRepositoryPrisma };
