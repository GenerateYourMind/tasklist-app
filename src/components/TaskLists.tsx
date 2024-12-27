import { FC, useContext } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';
import NoTasks from './NoTasks';
import { TaskContext } from '../context/TaskContext';
import { Todo } from '../models';

const TaskLists: FC = () => {
  const {
    state: { todos, doneTodos },
    dispatch,
  } = useContext(TaskContext);

  const shouldRenderNoTasks = (
    todosList: Todo[],
    status: 'active' | 'done'
  ) => {
    return !todosList.length && <NoTasks todosStatus={status} />;
  };

  const renderTaskItems = (todosList: Todo[]) => {
    return todosList.map((todo, index) => (
      <TaskItem index={index} key={todo.id} todo={todo} dispatch={dispatch} />
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
              {shouldRenderNoTasks(todos, 'active')}
              {renderTaskItems(todos)}
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
              {shouldRenderNoTasks(doneTodos, 'done')}
              {renderTaskItems(doneTodos)}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TaskLists;
