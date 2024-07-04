export type Task = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  when: Date;
  user_id: string;
};

export type TaskCreate = {
  title: string;
  description: string;
  when: Date;
  user_id: string;
};

export type UpdateTask = {
  id: string;
  title: string;
  description: string;
  when: Date;
};

export interface ITaskRepository {
  create(data: TaskCreate): Promise<void>;
  findByDate(
    data: Pick<Task, 'when' | 'user_id'>
  ): Promise<Pick<Task, 'id'> | null>;
  findById(data: Pick<Task, 'id'>): Promise<Task | null>;
  findWithoutId(
    data: Pick<Task, 'when' | 'user_id' | 'id'>
  ): Promise<Pick<Task, 'id'> | null>;
  delete(data: Pick<Task, 'id'>): Promise<void>;
  update(data: Omit<Task, 'done' | 'user_id'>): Promise<void>;
  done(data: Pick<Task, 'id' | 'done'>): Promise<void>;
  getAll(data: Pick<Task, 'user_id'>): Promise<Task[] | []>;
  getToday(data: Pick<Task, 'user_id'>): Promise<Task[] | []>;
  getWeek(data: Pick<Task, 'user_id'>): Promise<Task[] | []>;
  getMonth(data: Pick<Task, 'user_id'>): Promise<Task[] | []>;
  getYear(data: Pick<Task, 'user_id'>): Promise<Task[] | []>;
  late(data: Pick<Task, 'user_id'>): Promise<Task[] | []>;
}
