import { FC } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import Button from './Button';
import { useTheme } from '../hooks/useTheme';

const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1 className="title">Task list</h1>
      <Button className="theme-btn" onClick={toggleTheme}>
        {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
      </Button>
    </header>
  );
};

export default Header;
