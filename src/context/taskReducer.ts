import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models';
import { InitialState } from './TaskContext';

export type Target = 'tasks' | 'doneTasks';

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
      payload: { tasks?: Task[]; doneTasks?: Task[]; target: Target };
    };

const taskReducer = (
  state: InitialState,
  action: TaskActions
): InitialState => {
  const { type, payload } = action;
  const { tasks, doneTasks } = state;
  const targetArray = payload.target === 'tasks' ? tasks : doneTasks;

  switch (type) {
    case 'CREATE-TASK':
      return {
        ...state,
        tasks: [
          ...tasks,
          { id: uuidv4(), taskText: payload.taskText, done: false },
        ],
      };

    case 'DELETE-TASK':
      return {
        ...state,
        [payload.target]: targetArray.filter((task) => task.id !== payload.id),
      };

    case 'DONE-TASK':
      return {
        ...state,
        [payload.target]: targetArray.map((task) =>
          task.id === payload.id ? { ...task, done: !task.done } : task
        ),
      };

    case 'MOVE-TASK-BETWEEN-LISTS': {
      const returnTasks = (
        taskList: Task[],
        targetName: string,
        isDone: boolean,
        currentState: InitialState
      ): InitialState => {
        return {
          ...currentState,
          [targetName]: [
            ...taskList,
            ...targetArray.filter((task) => task.done === isDone),
          ],
        };
      };

      if (payload.target === 'tasks') {
        return returnTasks(doneTasks, 'doneTasks', true, state);
      }

      return returnTasks(tasks, 'tasks', false, state);
    }

    case 'EDIT-TASK':
      return {
        ...state,
        tasks: tasks.map((task) =>
          task.id === payload.id
            ? { ...task, taskText: payload.editTaskText }
            : task
        ),
      };

    case 'UPDATE-TASKS':
      return {
        ...state,
        [payload.target]: [...(payload[payload.target] as Task[])],
      };

    default:
      return state;
  }
};

export { taskReducer };
