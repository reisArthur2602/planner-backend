import { Router } from 'express';
import { UserUseCase } from '../usecases/user.usecase';
import { BadRequestError } from '../helpers/error';

export const UserRoutes = Router();
const userUseCase = new UserUseCase();

UserRoutes.post('/register', async (req, res) => {
  const { email } = req.body;
  if (!email) throw new BadRequestError('O email é obrigatório');
  const user = await userUseCase.create({ email });
  return res.status(201).json(user);
});

UserRoutes.post('/session', async (req, res) => {
  const { email } = req.body;
  if (!email) throw new BadRequestError('O email é obrigatório');
  const user = await userUseCase.auth({ email });
  return res.json(user);
});