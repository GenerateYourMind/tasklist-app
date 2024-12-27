import { FC } from 'react';

export interface NoTodosProps {
  todosStatus: 'active' | 'done';
}

const NoTasks: FC<NoTodosProps> = ({ todosStatus }) => {
  return <p className="no-todos">{`There are no ${todosStatus} tasks`}</p>;
};

export default NoTasks;
