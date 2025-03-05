import { FC, useContext } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskItem from '@components/TaskItem';
import { TaskContext } from '@context/TaskContext';
import { Task, TaskStatus } from '@typings/taskTypes';
import styles from './TaskList.module.scss';

interface TaskListProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
  droppableId: string;
}

const TaskList: FC<TaskListProps> = ({ title, tasks, status, droppableId }) => {
  const { dispatch } = useContext(TaskContext);

  return (
    <div
      className={`${styles.taskList} ${
        status === 'completed' ? styles.completed : ''
      }`}
    >
      <h2 className={styles.title}>{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <ul
            className={styles.taskItems}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {!tasks.length && (
              <li
                className={styles.noTasks}
              >{`There are no ${status} tasks`}</li>
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
