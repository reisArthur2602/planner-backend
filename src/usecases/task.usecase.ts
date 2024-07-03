import { ITaskRepository, TaskCreate } from '../interfaces/task.interface';
import { TaskRepositoryPrisma } from '../repositories/task.repository';
import { isPast } from 'date-fns';
import { ConflictError } from '../helpers/error';

class TaskUseCase {
  constructor() {
    this.taskRepository = new TaskRepositoryPrisma();
  }
  private taskRepository: ITaskRepository;

  async create(data: TaskCreate): Promise<void> {
    if (isPast(data.when))
      throw new ConflictError('Escolha uma data e hora no futuro');

    const task = await this.taskRepository.findByDate({ when: data.when });
    if (task)
      throw new ConflictError('Já existe uma tarefa neste dia e horário');

    await this.taskRepository.create(data);
  }
}

export { TaskUseCase };
