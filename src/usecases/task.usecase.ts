import {
  ITaskRepository,
  Task,
  TaskCreate,
  UpdateTask,
} from '../interfaces/task.interface';
import { TaskRepositoryPrisma } from '../repositories/task.repository';
import { isPast } from 'date-fns';
import { ConflictError, NotFoundError } from '../helpers/error';

class TaskUseCase {
  constructor() {
    this.taskRepository = new TaskRepositoryPrisma();
  }
  private taskRepository: ITaskRepository;

  async create(data: TaskCreate): Promise<void> {
    if (isPast(data.when))
      throw new ConflictError('Escolha uma data e hora no futuro');

    const task = await this.taskRepository.findByDate({
      when: data.when,
      user_id: data.user_id,
    });

    if (task)
      throw new ConflictError('Já existe uma tarefa neste dia e horário');

    await this.taskRepository.create(data);
  }

  async find(data: Pick<Task, 'id'>): Promise<Task> {
    const task = await this.taskRepository.findById(data);

    if (!task) throw new NotFoundError('A tarefa não foi encontrada');
    return task;
  }

  async delete(data: Pick<Task, 'id'>): Promise<void> {
    await this.taskRepository.delete(data).catch(() => {
      throw new NotFoundError('A tarefa não foi encontrada');
    });
  }

  async update(data: Omit<Task, 'done'>): Promise<void> {
    if (isPast(data.when))
      throw new ConflictError('Escolha uma data e hora no futuro');

    const task = await this.taskRepository.findWithoutId({
      id: data.id,
      when: data.when,
      user_id: data.user_id,
    });

    if (task)
      throw new ConflictError('Já existe uma tarefa neste dia e horário');

    await this.taskRepository.update({
      id: data.id,
      description: data.description,
      title: data.title,
      when: data.when,
    });
  }

  async done(data: Pick<Task, 'id' | 'done'>): Promise<void> {
    await this.taskRepository.done(data).catch(() => {
      throw new NotFoundError('A tarefa não foi encontrada');
    });
  }

  async getAll(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    return await this.taskRepository.getAll(data);
  }

  async getToday(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    return await this.taskRepository.getToday(data);
  }

  async getWeek(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    return await this.taskRepository.getWeek(data);
  }
  async getMonth(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    return await this.taskRepository.getMonth(data);
  }
  async getYear(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    return await this.taskRepository.getYear(data);
  }
  async late(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    return await this.taskRepository.late(data);
  }
}

export { TaskUseCase };
