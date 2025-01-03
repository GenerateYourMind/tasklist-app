import { FC } from 'react';
import { TaskStatus } from '../types/taskTypes';

export interface NoTasksProps {
  tasksStatus: TaskStatus;
}

const NoTasks: FC<NoTasksProps> = ({ tasksStatus }) => {
  return <p className="no-tasks">{`There are no ${tasksStatus} tasks`}</p>;
};

export default NoTasks;
