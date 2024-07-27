import { Router } from 'express';
import { UserUseCase } from '../usecases/user.usecase';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { UserValidator } from '../helpers/validators/user.validator';

export const UserRoutes = Router();
const userUseCase = new UserUseCase();

UserRoutes.post('/register', async (req, res) => {
  const body = UserValidator.parse(req.body);
  const user = await userUseCase.create(body);
  return res.status(201).json(user);
});

UserRoutes.post('/session', async (req, res) => {
  const body = UserValidator.parse(req.body);
  const user = await userUseCase.auth(body);
  return res.json(user);
});

UserRoutes.get('/me', isAuthenticated, async (req, res) => {
  const id = req.userId;
  const user = await userUseCase.details({ id });
  return res.json(user);
});
