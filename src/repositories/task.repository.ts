import { db } from '../database/prisma';

import {
  ITaskRepository,
  Task,
  TaskCreate,
} from '../interfaces/task.interface';

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

  async findById(data: Pick<Task, 'id'>): Promise<Task | null> {
    return await db.task.findFirst({
      where: { id: data.id },
    });
  }

}

export { TaskRepositoryPrisma };
