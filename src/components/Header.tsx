import { FC } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useTheme } from '../hooks/useTheme';

const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1 className="title">Task list</h1>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
      </button>
    </header>
  );
};

export default Header;
