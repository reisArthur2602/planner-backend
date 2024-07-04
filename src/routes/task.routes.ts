import { Router } from 'express';
import { TaskUseCase } from '../usecases/task.usecase';
import { BadRequestError } from '../helpers/error';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { dateRegex } from '../utils/regex';

export const TaskRoutes = Router();
const taskUseCase = new TaskUseCase();

TaskRoutes.post('/', isAuthenticated, async (req, res) => {
  const { title, description, when } = req.body;

  if (!title || !description || !when)
    throw new BadRequestError('Preencha os dados corretamente');

  if (!dateRegex.test(when))
    throw new BadRequestError(
      'Parece que a data inserida é inválida. Por favor, verifique e tente novamente.'
    );

  const user_id = req.userId;

  await taskUseCase.create({
    title,
    description,
    when: new Date(when),
    user_id,
  });

  return res.status(201).send();
});

TaskRoutes.get('/all', isAuthenticated, async (req, res) => {
  const user_id = req.userId;
  const task = await taskUseCase.getAll({ user_id });
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
  const { id } = req.params;

  const { title, description, when } = req.body;

  if (!title || !description || !when)
    throw new BadRequestError('Preencha os dados corretamente');

  if (!dateRegex.test(when))
    throw new BadRequestError(
      'Parece que a data inserida é inválida. Por favor, verifique e tente novamente.'
    );

  const user_id = req.userId;

  await taskUseCase.update({
    id,
    title,
    description,
    when: new Date(when),
    user_id,
  });

  return res.status(200).send();
});

TaskRoutes.patch('/:id/:done', isAuthenticated, async (req, res) => {
  const { id, done } = req.params;

  await taskUseCase.done({ id, done: done === 'true' ? true : false });

  return res.status(200).send();
});


