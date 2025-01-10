import { FC, useContext } from 'react';
import TaskList from './TaskList';
import { TaskContext } from '../context/TaskContext';

const TaskLists: FC = () => {
  const {
    state: { activeTasks, doneTasks },
  } = useContext(TaskContext);

  return (
    <div className="task-lists">
      <TaskList
        title="Active tasks"
        tasks={activeTasks}
        status="active"
        droppableId="ActiveTaskList"
      />
      <TaskList
        title="Done tasks"
        tasks={doneTasks}
        status="done"
        droppableId="DoneTaskList"
      />
    </div>
  );
};

export default TaskLists;
