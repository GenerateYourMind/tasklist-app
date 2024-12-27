import { FC } from 'react';

export interface NoTasksProps {
  tasksStatus: 'active' | 'done';
}

const NoTasks: FC<NoTasksProps> = ({ tasksStatus }) => {
  return <p className="no-todos">{`There are no ${tasksStatus} tasks`}</p>;
};

export default NoTasks;
