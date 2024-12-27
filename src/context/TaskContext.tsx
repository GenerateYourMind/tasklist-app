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
  todos: Task[];
  doneTodos: Task[];
}

interface TaskContextProps {
  state: InitialState;
  dispatch: Dispatch<TaskActions>;
}

const initialState: InitialState = {
  todos: [],
  doneTodos: [],
};

const TaskContext = createContext<TaskContextProps>({
  state: initialState,
  dispatch: () => undefined,
});

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { todos, doneTodos } = state;

  useEffect(() => {
    const storedTodos = getFromStorage<Task[] | null>('todos');
    const storedDoneTodos = getFromStorage<Task[] | null>('doneTodos');

    if (storedTodos && storedTodos.length > 0) {
      dispatch({
        type: 'UPDATE-TODOS',
        payload: { todos: storedTodos, target: 'todos' },
      });
    }

    if (storedDoneTodos && storedDoneTodos.length > 0) {
      dispatch({
        type: 'UPDATE-TODOS',
        payload: { doneTodos: storedDoneTodos, target: 'doneTodos' },
      });
    }
  }, []);

  useEffect(() => {
    saveToStorage('todos', todos);
  }, [todos]);

  useEffect(() => {
    saveToStorage('doneTodos', doneTodos);
  }, [doneTodos]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskContextProvider };
