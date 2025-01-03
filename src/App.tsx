import { FC, useContext } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Header from './components/Header';
import CreateTask from './components/CreateTask';
import TaskLists from './components/TaskLists';
import { TaskContext } from './context/TaskContext';
import { Task } from './types/taskTypes';
import './App.scss';

const App: FC = () => {
  const {
    state: { activeTasks, doneTasks },
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

    const active = [...activeTasks];
    const done = [...doneTasks];

    const getArray = (droppableId: string): Task[] =>
      droppableId === 'ActiveTaskList' ? active : done;

    const sourceArray = getArray(source.droppableId);
    const destinationArray = getArray(destination.droppableId);

    const movingTask: Task = sourceArray[source.index];

    // Updates task status based on the destination list
    movingTask.done = destination.droppableId !== 'ActiveTaskList';

    sourceArray.splice(source.index, 1);
    destinationArray.splice(destination.index, 0, movingTask);

    dispatch({
      type: 'UPDATE-TASKS',
      payload: { activeTasks: active, target: 'activeTasks' },
    });

    dispatch({
      type: 'UPDATE-TASKS',
      payload: {
        doneTasks: done,
        target: 'doneTasks',
      },
    });
  };

  return (
    <div className="app">
      <Header />
      <main className="task-container">
        <CreateTask />
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskLists />
        </DragDropContext>
      </main>
    </div>
  );
};

export default App;
