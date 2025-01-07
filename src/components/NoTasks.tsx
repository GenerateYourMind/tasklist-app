import { FC } from 'react';
import { TaskStatus } from '../types/taskTypes';

export interface NoTasksProps {
  status: TaskStatus;
}

const NoTasks: FC<NoTasksProps> = ({ status }) => {
  return <p className="no-tasks">{`There are no ${status} tasks`}</p>;
};

export default NoTasks;
