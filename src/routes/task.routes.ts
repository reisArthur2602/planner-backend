import { Router } from 'express';
import { TaskUseCase } from '../usecases/task.usecase';

export const TaskRoutes = Router();
const taskUseCase = new TaskUseCase();

TaskRoutes.get('/', async (req, res) => {
  return res.json({ message: 'ok' });
});
