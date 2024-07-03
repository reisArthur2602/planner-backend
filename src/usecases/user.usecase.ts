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

}

export { UserUseCase };
