import { FC, useContext } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Header from './components/Header';
import CreateTask from './components/CreateTask';
import TaskLists from './components/TaskLists';
import { TaskContext } from './context/TaskContext';
import { Task } from './models';
import './App.scss';

const App: FC = () => {
  const {
    state: { todos, doneTodos },
    dispatch,
  } = useContext(TaskContext);

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const active = [...todos];
    const done = [...doneTodos];

    const getArray = (droppableId: string): Task[] =>
      droppableId === 'ActiveTodoList' ? active : done;

    const sourceArray = getArray(source.droppableId);
    const destinationArray = getArray(destination.droppableId);

    const movingTodo: Task = sourceArray[source.index];

    // Updates todo status based on the destination list
    movingTodo.done = destination.droppableId !== 'ActiveTodoList';

    sourceArray.splice(source.index, 1);
    destinationArray.splice(destination.index, 0, movingTodo);

    dispatch({
      type: 'UPDATE-TODOS',
      payload: { todos: active, target: 'todos' },
    });

    dispatch({
      type: 'UPDATE-TODOS',
      payload: {
        doneTodos: done,
        target: 'doneTodos',
      },
    });
  };

  return (
    <div className="app">
      <Header />
      <main className="todo-container">
        <CreateTask />
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskLists />
        </DragDropContext>
      </main>
    </div>
  );
};

export default App;
