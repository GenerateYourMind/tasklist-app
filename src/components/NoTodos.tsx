import { FC } from 'react';

export interface NoTodosProps {
  todosStatus: 'active' | 'done';
}

const NoTodos: FC<NoTodosProps> = ({ todosStatus }) => {
  return <p className="no-todos">{`There are no ${todosStatus} tasks`}</p>;
};

export default NoTodos;
