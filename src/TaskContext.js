import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. createContext를 사용하여 새로운 Context를 생성합니다.
const TasksContext = createContext();

// 2. useTasksContext라는 custom hook을 생성하여 Context를 사용하기 편하게 만듭니다.
export const useTasksContext = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState({});

    const updateTasks = (newTasks) => {
        setTasks(newTasks);
        // 그리고 여기서 AsyncStorage.setItem을 사용하여 'tasks'를 저장할 수 있습니다.
        if (newTasks !== undefined) {
            AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
              .catch(error => console.error('Error saving tasks to AsyncStorage:', error));
        }
    };
    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    };
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared successfully');
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
    };
    // 앱이 시작될 때 한 번만 실행되는 useEffect
    useEffect(() => {
      clearAsyncStorage();
        _loadTasks(); // 앱이 시작될 때 한 번만 호출
        console.log("배열");
        console.log(tasks);
    }, []);
  
    return (
      <TasksContext.Provider value={{ tasks, updateTasks }}>
        {children}
      </TasksContext.Provider>
    );
};