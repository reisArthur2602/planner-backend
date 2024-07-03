import { ITaskRepository } from "../interfaces/task.interface";
import { TaskRepositoryPrisma } from "../repositories/task.repository";


class TaskUseCase {
  constructor() {
    this.taskRepository = new TaskRepositoryPrisma();
  }
  private taskRepository: ITaskRepository;
}

export { TaskUseCase };
