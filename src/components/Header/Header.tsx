import { FC } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useTheme } from '@hooks/useTheme';
import styles from './Header.module.scss';

const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Task list</h1>
      <button
        className={styles.themeButton}
        aria-label="Switch theme"
        onClick={toggleTheme}
      >
        {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
      </button>
    </header>
  );
};

export default Header;
