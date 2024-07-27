import { Router } from 'express';
import { TaskUseCase } from '../usecases/task.usecase';
import { isAuthenticated } from '../middlewares/isAuthenticated';

import { TaskValidator } from '../helpers/validators/task.validator';

export const TaskRoutes = Router();
const taskUseCase = new TaskUseCase();

TaskRoutes.post('/', isAuthenticated, async (req, res) => {
  const body = TaskValidator.parse(req.body);

  const user_id = req.userId;

  await taskUseCase.create({ ...body, user_id });

  return res.status(201).send();
});

TaskRoutes.get('/all', isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.getAll({ user_id });
  return res.json(task);
});

TaskRoutes.get('/today', isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.getToday({ user_id });
  return res.json(task);
});

TaskRoutes.get('/week', isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.getWeek({ user_id });
  return res.json(task);
});

TaskRoutes.get('/month', isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.getMonth({ user_id });
  return res.json(task);
});

TaskRoutes.get('/year', isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.getYear({ user_id });
  return res.json(task);
});

TaskRoutes.get('/late', isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.late({ user_id });
  return res.json(task);
});

TaskRoutes.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const task = await taskUseCase.find({ id });

  return res.json(task);
});

TaskRoutes.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  await taskUseCase.delete({ id });

  return res.status(201).send();
});

TaskRoutes.put('/:id', isAuthenticated, async (req, res) => {
  
  const body = TaskValidator.parse(req.body);

  const { id } = req.params;
  const user_id = req.userId;

  await taskUseCase.update({ ...body, id, user_id });

  return res.status(200).send();
});

TaskRoutes.patch('/:id/:done', isAuthenticated, async (req, res) => {
  const { id, done } = req.params;

  await taskUseCase.done({ id, done: done === 'true' ? true : false });

  return res.status(200).send();
});
