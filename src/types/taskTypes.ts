import { Dispatch } from 'react';

export interface Task {
  id: string;
  taskText: string;
  done: boolean;
}

export type TaskStatus = 'active' | 'done';

export interface InitialState {
  activeTasks: Task[];
  doneTasks: Task[];
}

export interface TaskContextProps {
  state: InitialState;
  dispatch: Dispatch<TaskActions>;
}

// Union type specifying the task list (activeTasks or doneTasks) to which an action will be applied.
export type Target = 'activeTasks' | 'doneTasks';

export type TaskActions =
  | { type: 'CREATE-TASK'; payload: { taskText: string; target?: Target } }
  | {
      type: 'DELETE-TASK' | 'DONE-TASK';
      payload: { id: string; target: Target };
    }
  | { type: 'MOVE-TASK-BETWEEN-LISTS'; payload: { target: Target } }
  | {
      type: 'EDIT-TASK';
      payload: {
        id: string;
        editTaskText: string;
        target?: Target;
      };
    }
  | {
      type: 'UPDATE-TASKS';
      payload: { activeTasks?: Task[]; doneTasks?: Task[]; target: Target };
    };
