import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
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

  async findByDate(
    data: Pick<Task, 'when' | 'user_id'>
  ): Promise<Pick<Task, 'id'> | null> {
    return await db.task.findFirst({
      where: { AND: [{ when: data.when }, { user_id: data.user_id }] },
      select: { id: true },
    });
  }

  async findById(data: Pick<Task, 'id'>): Promise<Task | null> {
    return await db.task.findFirst({
      where: { id: data.id },
    });
  }

  async findWithoutId(
    data: Pick<Task, 'when' | 'user_id' | 'id'>
  ): Promise<Pick<Task, 'id'> | null> {
    return await db.task.findFirst({
      where: {
        AND: [
          { NOT: { id: data.id } },
          { when: data.when },
          { user_id: data.user_id },
        ],
      },
      select: { id: true },
    });
  }

  async delete(data: Pick<Task, 'id'>): Promise<void> {
    await db.task.delete({ where: { id: data.id } });
  }

  async update(data: Omit<Task, 'done' | 'user_id'>): Promise<void> {
    const { id, description, title, when } = data;
    await db.task.update({ where: { id }, data: { description, title, when } });
  }

  async done(data: Pick<Task, 'id' | 'done'>): Promise<void> {
    await db.task.update({
      where: { id: data.id },
      data: { done: data.done },
    });
  }

  async getAll(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    const current = new Date();
    return await db.task.findMany({
      where: { AND: [{ user_id: data.user_id }, { when: { gte: current } }] },
      orderBy: { when: 'asc' },
    });
  }

  async getToday(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    const current = new Date();
    return await db.task.findMany({
      where: {
        AND: [
          { user_id: data.user_id },
          {
            when: {
              gte: startOfDay(current) && current,
              lte: endOfDay(current),
            },
          },
        ],
      },
      orderBy: { when: 'asc' },
    });
  }

  async getWeek(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    const current = new Date();
    return await db.task.findMany({
      where: {
        AND: [
          { user_id: data.user_id },
          {
            when: {
              gte: startOfWeek(current) && current,
              lte: endOfWeek(current),
            },
          },
        ],
      },
      orderBy: { when: 'asc' },
    });
  }

  async getMonth(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    const current = new Date();
    return await db.task.findMany({
      where: {
        AND: [
          { user_id: data.user_id },
          {
            when: {
              gte: startOfMonth(current) && current,
              lte: endOfMonth(current),
            },
          },
        ],
      },
      orderBy: { when: 'asc' },
    });
  }

  async late(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    const current = new Date();
    return await db.task.findMany({
      where: {
        AND: [
          { user_id: data.user_id },
          {
            when: { lt: current },
          },
        ],
      },
      orderBy: { when: 'asc' },
    });
  }
  
  async getYear(data: Pick<Task, 'user_id'>): Promise<Task[] | []> {
    const current = new Date();
    return await db.task.findMany({
      where: {
        AND: [
          { user_id: data.user_id },
          {
            when: {
              gte: startOfYear(current) && current,
              lte: endOfYear(current),
            },
          },
        ],
      },
      orderBy: { when: 'asc' },
    });
  }
}

export { TaskRepositoryPrisma };
