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
      <Droppable droppableId="ActiveTodoList">
        {(provided) => (
          <section
            className="todo-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="todo-list-header">Active tasks</h2>
            {shouldRenderNoTodos(todos, 'active')}
            {renderTodoItems(todos)}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
      <Droppable droppableId="DoneTodoList">
        {(provided) => (
          <section
            className="todo-list done"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="todo-list-header">Done tasks</h2>
            {shouldRenderNoTodos(doneTodos, 'done')}
            {renderTodoItems(doneTodos)}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </div>
  );
};

export default TodoLists;
