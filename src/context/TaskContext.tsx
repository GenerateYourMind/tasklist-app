import {
  createContext,
  ReactNode,
  useReducer,
  Dispatch,
  useEffect,
} from 'react';
import { Todo } from '../models';
import { TodoActions, taskReducer } from './taskReducer';
import { saveToStorage, getFromStorage } from '../utils/localStorage';

export interface InitialState {
  todos: Todo[];
  doneTodos: Todo[];
}

const initialState: InitialState = {
  todos: [],
  doneTodos: [],
};

interface TodoContextProps {
  state: InitialState;
  dispatch: Dispatch<TodoActions>;
}

const TaskContext = createContext<TodoContextProps>({
  state: initialState,
  dispatch: () => undefined,
});

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { todos, doneTodos } = state;

  useEffect(() => {
    const storedTodos = getFromStorage<Todo[] | null>('todos');
    const storedDoneTodos = getFromStorage<Todo[] | null>('doneTodos');

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
