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



export interface ITaskRepository {
  create(data: TaskCreate): Promise<void>;
  findByDate(data: Pick<Task, 'when'>): Promise<Pick<Task, 'id'> | null>;
  findById(data: Pick<Task, 'id'>): Promise<Task | null>;
}
