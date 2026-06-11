import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Owns task state + dark-mode preference, persisted to AsyncStorage.
const TasksContext = createContext();

export const useTasksContext = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      setTasks(JSON.parse(storedTasks || '{}'));
      const storedDarkMode = await AsyncStorage.getItem('darkMode');
      setDarkMode(storedDarkMode === 'true');
    })();
  }, []);

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(newTasks)).catch((error) =>
      console.error('Error saving tasks:', error)
    );
  };

  const updateDarkMode = (newDarkMode) => {
    setDarkMode(newDarkMode);
    AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode)).catch((error) =>
      console.error('Error saving darkMode:', error)
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, updateTasks, darkMode, updateDarkMode }}>
      {children}
    </TasksContext.Provider>
  );
};
