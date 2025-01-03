import { FC, useContext } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';
import NoTasks from './NoTasks';
import { TaskContext } from '../context/TaskContext';
import { Task } from '../types/taskTypes';

const TaskLists: FC = () => {
  const {
    state: { activeTasks, doneTasks },
    dispatch,
  } = useContext(TaskContext);

  const shouldRenderNoTasks = (taskList: Task[], status: 'active' | 'done') => {
    return !taskList.length && <NoTasks tasksStatus={status} />;
  };

  const renderTaskItems = (taskList: Task[]) => {
    return taskList.map((task, index) => (
      <TaskItem index={index} key={task.id} task={task} dispatch={dispatch} />
    ));
  };

  return (
    <div className="task-lists">
      <div className="task-list">
        <h2 className="task-list-header">Active tasks</h2>
        <Droppable droppableId="ActiveTaskList">
          {(provided) => (
            <ul
              className="task-items"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {shouldRenderNoTasks(activeTasks, 'active')}
              {renderTaskItems(activeTasks)}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
      <div className="task-list done">
        <h2 className="task-list-header">Done tasks</h2>
        <Droppable droppableId="DoneTaskList">
          {(provided) => (
            <ul
              className="task-items"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {shouldRenderNoTasks(doneTasks, 'done')}
              {renderTaskItems(doneTasks)}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TaskLists;
