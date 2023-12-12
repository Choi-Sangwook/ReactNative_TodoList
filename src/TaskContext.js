import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TasksContext = createContext();

export const useTasksContext = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState({});
    const [darkMode, setDarkMode] = useState(false);

    const updateTasks = (newTasks) => {
        setTasks(newTasks);
        if (newTasks !== undefined) {
            AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
              .catch(error => console.error('Error saving tasks to AsyncStorage:', error));
        }
    };

    const updateDarkMode = (newDarkMode) => {
      setDarkMode(newDarkMode);
      AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode))
        .catch(error => console.error('Error saving darkMode to AsyncStorage:', error));
  };


    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));

        const loadedDarkMode = await AsyncStorage.getItem('darkMode');
        setDarkMode(loadedDarkMode === 'true'); 
    };
    useEffect(() => {
        _loadTasks();
        console.log("배열");
        console.log(tasks);
    }, []);
  
    return (
      <TasksContext.Provider value={{ tasks, updateTasks, darkMode, updateDarkMode }}>
        {children}
      </TasksContext.Provider>
    );


};

