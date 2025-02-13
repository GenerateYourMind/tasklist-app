import { v4 as uuidv4 } from 'uuid';
import { InitialState, TaskActions, Task } from '@typings/taskTypes';

const taskReducer = (
  state: InitialState,
  action: TaskActions
): InitialState => {
  const { type, payload } = action;
  const { activeTasks, completedTasks } = state;
  const targetArray =
    payload.target === 'activeTasks' ? activeTasks : completedTasks;

  switch (type) {
    case 'CREATE-TASK':
      return {
        ...state,
        activeTasks: [
          ...activeTasks,
          { id: uuidv4(), taskText: payload.taskText, isCompleted: false },
        ],
      };

    case 'DELETE-TASK':
      return {
        ...state,
        [payload.target]: targetArray.filter((task) => task.id !== payload.id),
      };

    case 'COMPLETE-TASK':
      return {
        ...state,
        [payload.target]: targetArray.map((task) =>
          task.id === payload.id
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        ),
      };

    case 'MOVE-TASK-BETWEEN-LISTS': {
      const returnTasks = (
        taskList: Task[],
        targetName: string,
        isCompleted: boolean,
        currentState: InitialState
      ): InitialState => {
        return {
          ...currentState,
          [targetName]: [
            ...taskList,
            ...targetArray.filter((task) => task.isCompleted === isCompleted),
          ],
        };
      };

      if (payload.target === 'activeTasks') {
        return returnTasks(completedTasks, 'completedTasks', true, state);
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
