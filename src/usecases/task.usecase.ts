import {
  ITaskRepository,
  Task,
  TaskCreate,
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
      throw new ConflictError(
        'Por favor, selecione uma data e hora futuras para sua tarefa.'
      );

    const task = await this.taskRepository.findByDate({
      when: data.when,
      user_id: data.user_id,
    });

    if (task)
      throw new ConflictError(
        'Ops! Já existe uma tarefa agendada para este dia e horário. Por favor, escolha um momento diferente.'
      );

    await this.taskRepository.create(data);
  } 

  async find(data: Pick<Task, 'id'>): Promise<Task> {
    const task = await this.taskRepository.findById(data);

    if (!task)
      throw new NotFoundError(
        'Desculpe, não conseguimos encontrar a tarefa que você está procurando. Verifique se o ID da tarefa está correto ou se ela ainda está disponível.'
      );
    return task;
  }

  async delete(data: Pick<Task, 'id'>): Promise<void> {
    await this.taskRepository.delete(data).catch(() => {
      throw new NotFoundError(
        'Desculpe, não conseguimos encontrar a tarefa que você está procurando. Verifique se o ID da tarefa está correto ou se ela ainda está disponível.'
      );
    });
  }

  async update(data: Task): Promise<void> {
    if (isPast(data.when))
      throw new ConflictError(
        'Por favor, selecione uma data e hora futuras para sua tarefa.'
      );

    const task = await this.taskRepository.findWithoutId({
      id: data.id,
      when: data.when,
      user_id: data.user_id,
    });

    if (task)
      throw new ConflictError(
        'Ops! Já existe uma tarefa agendada para este dia e horário. Por favor, escolha um momento diferente.'
      );

    await this.taskRepository
      .update({
        id: data.id,
        description: data.description,
        title: data.title,
        when: data.when,
        type: data.type,
        done: data.done,
      })
      .catch(() => {
        throw new NotFoundError(
          'Desculpe, não conseguimos encontrar a tarefa que você está procurando. Verifique se o ID da tarefa está correto ou se ela ainda está disponível.'
        );
      });
  }

  async done(data: Pick<Task, 'id' | 'done'>): Promise<void> {
    await this.taskRepository.done(data).catch(() => {
      throw new NotFoundError(
        'Desculpe, não conseguimos encontrar a tarefa que você está procurando. Verifique se o ID da tarefa está correto ou se ela ainda está disponível.'
      );
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
