import { v4 as uuidv4 } from 'uuid';
import { InitialState, TaskActions, TaskListKey } from '@typings/taskTypes';

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
      const { id, isCompleted } = payload;
      const taskListKey: TaskListKey = isCompleted
        ? 'completedTasks'
        : 'activeTasks';

      return {
        ...state,
        [taskListKey]: state[taskListKey].filter((task) => task.id !== id),
      };
    }

    case 'TOGGLE_TASK_COMPLETE': {
      const { task } = payload;
      const sourceListKey: TaskListKey = task.isCompleted
        ? 'completedTasks'
        : 'activeTasks';
      const destinationListKey: TaskListKey = task.isCompleted
        ? 'activeTasks'
        : 'completedTasks';

      return {
        ...state,
        [sourceListKey]: state[sourceListKey].filter(
          (currentTask) => currentTask.id !== task.id
        ),
        [destinationListKey]: [
          ...state[destinationListKey],
          { ...task, isCompleted: !task.isCompleted },
        ],
      };
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

    case 'SET_TASK_LIST': {
      const { taskList, taskListKey } = payload;

      return {
        ...state,
        [taskListKey]: taskList,
      };
    }

    default:
      return state;
  }
};

export { taskReducer };
