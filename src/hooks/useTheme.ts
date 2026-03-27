import { useEffect, useLayoutEffect, useState } from 'react';
import { saveToStorage } from '@utils/localStorage';
import { THEMES, Theme } from '@constants/themeList';

interface UseThemeReturn {
  theme: Theme | '';
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<Theme | ''>('');

  // Use layout effect to prevent theme icon flickering on initial render
  useLayoutEffect(() => {
    // Sync state with the theme initialized by the blocking script in index.html
    const initialTheme = document.documentElement.getAttribute(
      'data-theme'
    ) as Theme;
    setTheme(initialTheme || THEMES.LIGHT);
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
