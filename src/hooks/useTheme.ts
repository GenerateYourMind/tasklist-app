import { useEffect, useState } from 'react';
import { getFromStorage, saveToStorage } from '@utils/localStorage';
import { THEMES } from '@constants/themeList';

interface UseThemeReturn {
  theme: string;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    const storedTheme = getFromStorage<string | null>('theme');

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const systemTheme = matchMedia?.('(prefers-color-scheme: dark)').matches
        ? THEMES.DARK
        : THEMES.LIGHT;
      setTheme(systemTheme);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      saveToStorage('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  return { theme, toggleTheme };
};
