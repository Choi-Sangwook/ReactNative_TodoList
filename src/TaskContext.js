import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. createContext를 사용하여 새로운 Context를 생성합니다.
const TasksContext = createContext();

// 2. useTasksContext라는 custom hook을 생성하여 Context를 사용하기 편하게 만듭니다.
export const useTasksContext = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState({});
    const [darkMode, setDarkMode] = useState(false);

    const updateTasks = (newTasks) => {
        setTasks(newTasks);
        // 그리고 여기서 AsyncStorage.setItem을 사용하여 'tasks'를 저장할 수 있습니다.
        if (newTasks !== undefined) {
            AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
              .catch(error => console.error('Error saving tasks to AsyncStorage:', error));
        }
    };

    const updateDarkMode = (newDarkMode) => {
      setDarkMode(newDarkMode);
      // 다크 모드 설정을 AsyncStorage에 저장
      AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode))
        .catch(error => console.error('Error saving darkMode to AsyncStorage:', error));
  };


    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));

        const loadedDarkMode = await AsyncStorage.getItem('darkMode');
        setDarkMode(loadedDarkMode === 'true'); // 'true' 문자열을 boolean으로 변환
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
      // clearAsyncStorage();
        _loadTasks(); // 앱이 시작될 때 한 번만 호출
        console.log("배열");
        console.log(tasks);
    }, []);
  
    return (
      <TasksContext.Provider value={{ tasks, updateTasks, darkMode, updateDarkMode }}>
        {children}
      </TasksContext.Provider>
    );


};

