import { Router } from 'express';
import { UserUseCase } from '../usecases/user.usecase';

export const UserRoutes = Router();
const userUseCase = new UserUseCase();

UserRoutes.get('/', async (req, res) => {
  return res.json({ message: 'ok' });
});


