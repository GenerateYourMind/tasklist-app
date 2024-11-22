import { FC, useContext } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TodoItem from './TodoItem';
import NoTodos from './NoTodos';
import { TodoContext } from '../context/TodoContext';
import { Todo } from '../models';

const TodoLists: FC = () => {
  const {
    state: { todos, doneTodos },
    dispatch,
  } = useContext(TodoContext);

  const shouldRenderNoTodos = (
    todosList: Todo[],
    status: 'active' | 'done'
  ) => {
    return !todosList.length && <NoTodos todosStatus={status} />;
  };

  const renderTodoItems = (todosList: Todo[]) => {
    return todosList.map((todo, index) => (
      <TodoItem index={index} key={todo.id} todo={todo} dispatch={dispatch} />
    ));
  };

  return (
    <div className="todo-lists">
      <div className="todo-list">
        <h2 className="todo-list-header">Active tasks</h2>
        <Droppable droppableId="ActiveTodoList">
          {(provided) => (
            <ul
              className="todo-items"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {shouldRenderNoTodos(todos, 'active')}
              {renderTodoItems(todos)}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
      <div className="todo-list done">
        <h2 className="todo-list-header">Done tasks</h2>
        <Droppable droppableId="DoneTodoList">
          {(provided) => (
            <ul
              className="todo-items"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {shouldRenderNoTodos(doneTodos, 'done')}
              {renderTodoItems(doneTodos)}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoLists;
