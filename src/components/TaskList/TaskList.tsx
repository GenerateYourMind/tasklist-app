import { FC, useContext } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskItem from '../TaskItem';
import { TaskContext } from '../../context/TaskContext';
import { Task, TaskStatus } from '../../types/taskTypes';

interface TaskListProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
  droppableId: string;
}

const TaskList: FC<TaskListProps> = ({ title, tasks, status, droppableId }) => {
  const { dispatch } = useContext(TaskContext);

  return (
    <div className={`task-list ${status === 'completed' ? 'completed' : ''}`}>
      <h2 className="task-list-header">{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <ul
            className="task-items"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {!tasks.length && (
              <li className="no-tasks">{`There are no ${status} tasks`}</li>
            )}
            {tasks.map((task, index) => (
              <TaskItem
                index={index}
                key={task.id}
                task={task}
                dispatch={dispatch}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
