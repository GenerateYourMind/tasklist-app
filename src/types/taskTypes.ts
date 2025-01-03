export interface Task {
  id: string;
  taskText: string;
  done: boolean;
}

export type TaskStatus = 'active' | 'done';
