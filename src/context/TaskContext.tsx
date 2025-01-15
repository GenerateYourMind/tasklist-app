import { createContext, ReactNode, useReducer, useEffect } from 'react';
import { InitialState, TaskContextProps, Task } from '../types/taskTypes';
import { taskReducer } from './taskReducer';
import { saveToStorage, getFromStorage } from '../utils/localStorage';

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

  useEffect(() => {
    const storedActiveTasks = getFromStorage<Task[] | null>('activeTasks');
    const storedCompletedTasks = getFromStorage<Task[] | null>(
      'completedTasks'
    );

    if (storedActiveTasks && storedActiveTasks.length > 0) {
      dispatch({
        type: 'UPDATE-TASKS',
        payload: { activeTasks: storedActiveTasks, target: 'activeTasks' },
      });
    }

    if (storedCompletedTasks && storedCompletedTasks.length > 0) {
      dispatch({
        type: 'UPDATE-TASKS',
        payload: {
          completedTasks: storedCompletedTasks,
          target: 'completedTasks',
        },
      });
    }
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
