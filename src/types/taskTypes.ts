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

export type TaskListKey = keyof InitialState;

export type TaskActions =
  | {
      type: 'CREATE_TASK';
      payload: { taskText: string };
    }
  | {
      type: 'DELETE_TASK';
      payload: { id: string; isCompleted: boolean };
    }
  | {
      type: 'TOGGLE_TASK_COMPLETE';
      payload: { task: Task };
    }
  | {
      type: 'MOVE_TASK';
      payload: {
        sourceListKey: TaskListKey;
        destinationListKey: TaskListKey;
        sourceIndex: number;
        destinationIndex: number;
      };
    }
  | {
      type: 'EDIT_TASK';
      payload: { id: string; editTaskText: string };
    }
  | {
      type: 'SET_TASK_LIST';
      payload: { taskList: Task[]; taskListKey: TaskListKey };
    };
