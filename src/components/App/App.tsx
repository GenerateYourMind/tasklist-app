import { FC } from 'react';
import Header from '@components/Header';
import CreateTask from '@components/CreateTask';
import TaskLists from '@components/TaskLists';
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.tasksContainer}>
        <CreateTask />
        <TaskLists />
      </main>
    </div>
  );
};

export default App;
