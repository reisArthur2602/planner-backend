import { Router } from 'express';
import { TaskUseCase } from '../usecases/task.usecase';
import { BadRequestError } from '../helpers/error';
import { isAuthenticated } from '../middlewares/isAuthenticated';

export const TaskRoutes = Router();
const taskUseCase = new TaskUseCase();

TaskRoutes.post('/', isAuthenticated, async (req, res) => {
  const { title, description, when } = req.body;

  if (!title || !description || !when)
    throw new BadRequestError('Preencha os dados corretamente');

  const user_id = req.userId;

  await taskUseCase.create({ title, description, when, user_id });

  return res.status(201).send();
});

TaskRoutes.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const task = await taskUseCase.find({ id });

  return res.json(task);
});
