import { v4 as uuidv4 } from 'uuid';
import { InitialState, TaskActions, Task } from '@typings/taskTypes';

const taskReducer = (
  state: InitialState,
  action: TaskActions
): InitialState => {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE_TASK': {
      const { taskText } = payload;

      return {
        ...state,
        activeTasks: [
          ...state.activeTasks,
          { id: uuidv4(), taskText, isCompleted: false },
        ],
      };
    }

    case 'DELETE_TASK': {
      const { id, target } = payload;

      return {
        ...state,
        [target]: state[target].filter((task) => task.id !== id),
      };
    }

    case 'COMPLETE_TASK': {
      const { id, target } = payload;

      return {
        ...state,
        [target]: state[target].map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ),
      };
    }

    case 'MOVE_TASK_BETWEEN_LISTS': {
      const { target } = payload;
      const { activeTasks, completedTasks } = state;

      const returnTasks = (
        taskList: Task[],
        targetName: string,
        isCompleted: boolean,
        targetArray: Task[]
      ): InitialState => {
        return {
          ...state,
          [targetName]: [
            ...taskList,
            ...targetArray.filter((task) => task.isCompleted === isCompleted),
          ],
        };
      };

      if (target === 'activeTasks') {
        return returnTasks(completedTasks, 'completedTasks', true, activeTasks);
      }

      return returnTasks(activeTasks, 'activeTasks', false, completedTasks);
    }

    case 'EDIT_TASK': {
      const { id, editTaskText } = payload;

      return {
        ...state,
        activeTasks: state.activeTasks.map((task) =>
          task.id === id ? { ...task, taskText: editTaskText } : task
        ),
      };
    }

    case 'UPDATE_TASKS': {
      const { tasks, target } = payload;

      return {
        ...state,
        [target]: [...tasks],
      };
    }

    default:
      return state;
  }
};

export { taskReducer };
