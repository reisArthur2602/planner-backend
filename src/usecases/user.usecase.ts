import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/error';
import {
  IUserRepository,
  User,
  UserCreate,
} from '../interfaces/user.interface';
import { UserRepositoryPrisma } from '../repositories/user.repository';

class UserUseCase {
  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }
  private userRepository: IUserRepository;

  async create(data: UserCreate): Promise<User> {
    const user = await this.userRepository.findByEmailOrId(data);
    if (user)
      throw new ConflictError(
        'O email informado já está associado a uma conta'
      );
    return await this.userRepository.create(data);
  }

  async auth(data: UserCreate): Promise<User> {
    const user = await this.userRepository.findByEmailOrId(data);
    if (!user) throw new NotFoundError('O Usuário não foi encontrado ');
    return user;
  }
}

export { UserUseCase };
