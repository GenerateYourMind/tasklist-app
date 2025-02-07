import { FC } from 'react';
import Header from '../Header/Header';
import CreateTask from '../CreateTask/CreateTask';
import TaskLists from '../TaskLists/TaskLists';
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
