import {
  createContext,
  ReactNode,
  useReducer,
  Dispatch,
  useEffect,
} from 'react';
import { Todo } from '../models';
import { TodoActions, todoReducer } from './todoReducer';
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

const TodoContext = createContext<TodoContextProps>({
  state: initialState,
  dispatch: () => undefined,
});

const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
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
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoContextProvider };
