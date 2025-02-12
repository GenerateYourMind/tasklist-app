import { FC } from 'react';
import Header from '@components/Header';
import CreateTask from '@components/CreateTask';
import TaskLists from '@components/TaskLists';
import './App.scss';

const App: FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="task-container">
        <CreateTask />
        <TaskLists />
      </main>
    </div>
  );
};

export default App;
