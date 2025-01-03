import { v4 as uuidv4 } from 'uuid';
import { InitialState, TaskActions, Task } from '../types/taskTypes';

const taskReducer = (
  state: InitialState,
  action: TaskActions
): InitialState => {
  const { type, payload } = action;
  const { activeTasks, doneTasks } = state;
  const targetArray =
    payload.target === 'activeTasks' ? activeTasks : doneTasks;

  switch (type) {
    case 'CREATE-TASK':
      return {
        ...state,
        activeTasks: [
          ...activeTasks,
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

      if (payload.target === 'activeTasks') {
        return returnTasks(doneTasks, 'doneTasks', true, state);
      }

      return returnTasks(activeTasks, 'activeTasks', false, state);
    }

    case 'EDIT-TASK':
      return {
        ...state,
        activeTasks: activeTasks.map((task) =>
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
