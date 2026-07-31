import {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useLayoutEffect,
} from 'react';
import {
  InitialState,
  TaskContextProps,
  Task,
  TaskListKey,
} from '@typings/taskTypes';
import { taskReducer } from '@context/taskReducer';
import { saveToStorage, getFromStorage } from '@utils/localStorage';

const initialState: InitialState = {
  activeTasks: [],
  completedTasks: [],
};

const TaskContext = createContext<TaskContextProps>({
  state: initialState,
  dispatch: () => undefined,
});

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { activeTasks, completedTasks } = state;

  // Use layout effect to prevent layout shift (scrollbar jump) on initial render.
  useLayoutEffect(() => {
    const taskListKeys: TaskListKey[] = ['activeTasks', 'completedTasks'];

    taskListKeys.forEach((taskListKey) => {
      const taskList = getFromStorage<Task[] | null>(taskListKey);

      if (taskList && taskList.length > 0) {
        dispatch({ type: 'SET_TASK_LIST', payload: { taskList, taskListKey } });
      }
    });
  }, []);

  useEffect(() => {
    saveToStorage('activeTasks', activeTasks);
  }, [activeTasks]);

  useEffect(() => {
    saveToStorage('completedTasks', completedTasks);
  }, [completedTasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskContextProvider };
