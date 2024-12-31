import {
  createContext,
  ReactNode,
  useReducer,
  Dispatch,
  useEffect,
} from 'react';
import { Task } from '../models';
import { TaskActions, taskReducer } from './taskReducer';
import { saveToStorage, getFromStorage } from '../utils/localStorage';

export interface InitialState {
  activeTasks: Task[];
  doneTasks: Task[];
}

interface TaskContextProps {
  state: InitialState;
  dispatch: Dispatch<TaskActions>;
}

const initialState: InitialState = {
  activeTasks: [],
  doneTasks: [],
};

const TaskContext = createContext<TaskContextProps>({
  state: initialState,
  dispatch: () => undefined,
});

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { activeTasks, doneTasks } = state;

  useEffect(() => {
    const storedActiveTasks = getFromStorage<Task[] | null>('activeTasks');
    const storedDoneTasks = getFromStorage<Task[] | null>('doneTasks');

    if (storedActiveTasks && storedActiveTasks.length > 0) {
      dispatch({
        type: 'UPDATE-TASKS',
        payload: { activeTasks: storedActiveTasks, target: 'activeTasks' },
      });
    }

    if (storedDoneTasks && storedDoneTasks.length > 0) {
      dispatch({
        type: 'UPDATE-TASKS',
        payload: { doneTasks: storedDoneTasks, target: 'doneTasks' },
      });
    }
  }, []);

  useEffect(() => {
    saveToStorage('activeTasks', activeTasks);
  }, [activeTasks]);

  useEffect(() => {
    saveToStorage('doneTasks', doneTasks);
  }, [doneTasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskContextProvider };
