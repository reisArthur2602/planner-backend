import { db } from '../database/prisma';
import { Task } from '@prisma/client';
import { ITaskRepository, TaskCreate } from '../interfaces/task.interface';

class TaskRepositoryPrisma implements ITaskRepository {
  async create(data: TaskCreate): Promise<void> {
    await db.task.create({ data });
  }

  async findByDate(data: Pick<Task, 'when'>): Promise<Pick<Task, 'id'> | null> {
    return await db.task.findFirst({
      where: { when: data.when },
      select: { id: true },
    });
  }
}

export { TaskRepositoryPrisma };
