export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage.`, error);
  }
};

export const getFromStorage = <T>(key: string): T | null => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : null;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage.`, error);
    return null;
  }
};
