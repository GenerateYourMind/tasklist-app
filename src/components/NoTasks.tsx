import { FC } from 'react';

export interface NoTasksProps {
  todosStatus: 'active' | 'done';
}

const NoTasks: FC<NoTasksProps> = ({ todosStatus }) => {
  return <p className="no-todos">{`There are no ${todosStatus} tasks`}</p>;
};

export default NoTasks;
