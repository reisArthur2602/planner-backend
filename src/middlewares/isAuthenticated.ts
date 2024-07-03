import { RequestHandler } from 'express';
import { UnauthorizedError } from '../helpers/error';
import { UserRepositoryPrisma } from '../repositories/user.repository';
const userRepository = new UserRepositoryPrisma();

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const userId = req.headers['userid'] as string;
  if (!userId) throw new UnauthorizedError('O Usuário não está autenticado');

  const user = await userRepository.findByEmailOrId({ id: userId });
  if (!user) throw new UnauthorizedError('O Usuário não está autenticado');

  req.userId = user.id;

  return next();
};
