import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models';
import { InitialState } from './TaskContext';

export type Target = 'todos' | 'doneTodos';

export type TaskActions =
  | { type: 'CREATE-TODO'; payload: { todoText: string; target?: Target } }
  | {
      type: 'DELETE-TODO' | 'DONE-TODO';
      payload: { id: string; target: Target };
    }
  | { type: 'MOVE-TODO-BETWEEN-LISTS'; payload: { target: Target } }
  | {
      type: 'EDIT-TODO';
      payload: {
        id: string;
        editTodoText: string;
        target?: Target;
      };
    }
  | {
      type: 'UPDATE-TODOS';
      payload: { todos?: Task[]; doneTodos?: Task[]; target: Target };
    };

const taskReducer = (
  state: InitialState,
  action: TaskActions
): InitialState => {
  const { type, payload } = action;
  const { todos, doneTodos } = state;
  const targetArray = payload.target === 'todos' ? todos : doneTodos;

  switch (type) {
    case 'CREATE-TODO':
      return {
        ...state,
        todos: [
          ...todos,
          { id: uuidv4(), todoText: payload.todoText, done: false },
        ],
      };

    case 'DELETE-TODO':
      return {
        ...state,
        [payload.target]: targetArray.filter((todo) => todo.id !== payload.id),
      };

    case 'DONE-TODO':
      return {
        ...state,
        [payload.target]: targetArray.map((todo) =>
          todo.id === payload.id ? { ...todo, done: !todo.done } : todo
        ),
      };

    case 'MOVE-TODO-BETWEEN-LISTS': {
      const returnTodos = (
        todosList: Task[],
        targetName: string,
        isDone: boolean,
        currentState: InitialState
      ): InitialState => {
        return {
          ...currentState,
          [targetName]: [
            ...todosList,
            ...targetArray.filter((todo) => todo.done === isDone),
          ],
        };
      };

      if (payload.target === 'todos') {
        return returnTodos(doneTodos, 'doneTodos', true, state);
      }

      return returnTodos(todos, 'todos', false, state);
    }

    case 'EDIT-TODO':
      return {
        ...state,
        todos: todos.map((todo) =>
          todo.id === payload.id
            ? { ...todo, todoText: payload.editTodoText }
            : todo
        ),
      };

    case 'UPDATE-TODOS':
      return {
        ...state,
        [payload.target]: [...(payload[payload.target] as Task[])],
      };

    default:
      return state;
  }
};

export { taskReducer };
