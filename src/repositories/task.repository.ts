import { db } from '../database/prisma';
import { Task } from '@prisma/client';
import { ITaskRepository, TaskCreate } from '../interfaces/task.interface';

class TaskRepositoryPrisma implements ITaskRepository {
  async create(data: TaskCreate): Promise<void> {}
}
export { TaskRepositoryPrisma };
