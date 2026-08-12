import { FC, useContext } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import TaskList from '@components/TaskList';
import { TaskContext } from '@context/TaskContext';
import { TaskListKey } from '@typings/taskTypes';
import styles from './TaskLists.module.scss';

const TaskLists: FC = () => {
  const {
    state: { activeTasks, completedTasks },
    dispatch,
  } = useContext(TaskContext);

  const handleDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    dispatch({
      type: 'MOVE_TASK',
      payload: {
        sourceListKey: source.droppableId as TaskListKey,
        destinationListKey: destination.droppableId as TaskListKey,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.taskLists}>
        <TaskList
          title="Active tasks"
          tasks={activeTasks}
          status="active"
          droppableId="activeTasks"
        />
        <TaskList
          title="Completed tasks"
          tasks={completedTasks}
          status="completed"
          droppableId="completedTasks"
        />
      </div>
    </DragDropContext>
  );
};

export default TaskLists;
