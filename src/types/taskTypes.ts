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
  | {
      type: 'CREATE_TASK';
      payload: { taskText: string };
    }
  | {
      type: 'DELETE_TASK' | 'COMPLETE_TASK';
      payload: { id: string; target: Target };
    }
  | {
      type: 'MOVE_TASK_BETWEEN_LISTS';
      payload: { target: Target };
    }
  | {
      type: 'EDIT_TASK';
      payload: { id: string; editTaskText: string };
    }
  | {
      type: 'UPDATE_TASKS';
      payload: { tasks: Task[]; target: Target };
    };
