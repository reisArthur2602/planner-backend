import { ConflictError } from '../helpers/error';
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
    const user = await this.userRepository.findByEmail(data);

    if (user)
      throw new ConflictError(
        'O email informado já está associado a uma conta'
      );

    return await this.userRepository.create(data);
  }
}

export { UserUseCase };
