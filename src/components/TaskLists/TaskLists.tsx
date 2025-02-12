import { FC, useContext } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import TaskList from '@components/TaskList';
import { TaskContext } from '@context/TaskContext';
import { Task } from '../../types/taskTypes';

const TaskLists: FC = () => {
  const {
    state: { activeTasks, completedTasks },
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
    const completed = [...completedTasks];

    const getArray = (droppableId: string): Task[] =>
      droppableId === 'ActiveTaskList' ? active : completed;

    const sourceArray = getArray(source.droppableId);
    const destinationArray = getArray(destination.droppableId);

    const movingTask: Task = sourceArray[source.index];

    // Updates task status based on the destination list
    movingTask.isCompleted = destination.droppableId !== 'ActiveTaskList';

    sourceArray.splice(source.index, 1);
    destinationArray.splice(destination.index, 0, movingTask);

    dispatch({
      type: 'UPDATE-TASKS',
      payload: {
        activeTasks: active,
        target: 'activeTasks',
      },
    });

    dispatch({
      type: 'UPDATE-TASKS',
      payload: {
        completedTasks: completed,
        target: 'completedTasks',
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-lists">
        <TaskList
          title="Active tasks"
          tasks={activeTasks}
          status="active"
          droppableId="ActiveTaskList"
        />
        <TaskList
          title="Completed tasks"
          tasks={completedTasks}
          status="completed"
          droppableId="CompletedTaskList"
        />
      </div>
    </DragDropContext>
  );
};

export default TaskLists;
