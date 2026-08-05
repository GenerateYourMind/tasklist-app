import { FC, useContext } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import TaskList from '@components/TaskList';
import { TaskContext } from '@context/TaskContext';
import { Task } from '@typings/taskTypes';
import styles from './TaskLists.module.scss';

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

    const [movingTask] = sourceArray.splice(source.index, 1);

    const updatedTask: Task = {
      ...movingTask,
      isCompleted: destination.droppableId !== 'ActiveTaskList',
    };

    destinationArray.splice(destination.index, 0, updatedTask);

    dispatch({
      type: 'SET_TASK_LIST',
      payload: { taskList: active, taskListKey: 'activeTasks' },
    });

    dispatch({
      type: 'SET_TASK_LIST',
      payload: { taskList: completed, taskListKey: 'completedTasks' },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.taskLists}>
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
