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
  tasks: Task[];
  doneTasks: Task[];
}

interface TaskContextProps {
  state: InitialState;
  dispatch: Dispatch<TaskActions>;
}

const initialState: InitialState = {
  tasks: [],
  doneTasks: [],
};

const TaskContext = createContext<TaskContextProps>({
  state: initialState,
  dispatch: () => undefined,
});

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { tasks, doneTasks } = state;

  useEffect(() => {
    const storedTasks = getFromStorage<Task[] | null>('tasks');
    const storedDoneTasks = getFromStorage<Task[] | null>('doneTasks');

    if (storedTasks && storedTasks.length > 0) {
      dispatch({
        type: 'UPDATE-TASKS',
        payload: { tasks: storedTasks, target: 'tasks' },
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
    saveToStorage('tasks', tasks);
  }, [tasks]);

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
