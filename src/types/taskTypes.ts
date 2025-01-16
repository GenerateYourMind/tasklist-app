import { Dispatch } from 'react';

export interface Task {
  id: string;
  taskText: string;
  isCompleted: boolean;
}

export type TaskStatus = 'active' | 'completed';

export interface InitialState {
  activeTasks: Task[];
  completedTasks: Task[];
}

export interface TaskContextProps {
  state: InitialState;
  dispatch: Dispatch<TaskActions>;
}

// Union type specifying the task list (activeTasks or completedTasks) to which an action will be applied.
export type Target = 'activeTasks' | 'completedTasks';

export type TaskActions =
  | { type: 'CREATE-TASK'; payload: { taskText: string; target?: Target } }
  | {
      type: 'DELETE-TASK' | 'COMPLETE-TASK';
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
      payload: {
        activeTasks?: Task[];
        completedTasks?: Task[];
        target: Target;
      };
    };
