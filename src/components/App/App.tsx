import { FC } from 'react';
import Header from '../Header';
import CreateTask from '../CreateTask';
import TaskLists from '../TaskLists';
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
