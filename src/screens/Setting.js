import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';
import SettingComponent from '../components/SettingComponent'
import Input from '../components/Input';
import Task from '../components/Task';
import Box from '../components/Box';
import PrograssBar from '../components/ProgressBar';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTasksContext } from '../TaskContext';
import {lightTheme, darkTheme} from '../theme'

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;
const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 20px;
`;
const List = styled.ScrollView`
  margin:10px 0;
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const SubTitle = styled.Text`
    padding: 0 20px;
    color: #2B3F62;
    font-size: 16px;
    font-weight: 700;
    align-self: flex-start;
`;

const BoxConatiner = styled.SafeAreaView`
  height:150px;
  width: ${({ width }) => width - 40}px;    
  background-color: ${({ theme }) => theme.background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;






export default function App({navigation}) {
  const width = Dimensions.get('window').width;

  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState('');
  // const [tasks, setTasks] = useState({});
  const [toDayTasks, setTodayTasks] = useState({});
  const { tasks, updateTasks } = useTasksContext();
  const { darkMode, updateDarkMode} = useTasksContext();

  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);;
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    updateTasks(currentTasks);
  };

  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);;
    currentTasks[item.id] = item;
    updateTasks(currentTasks);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // 화면이 포커스를 얻을 때마다 메모 목록을 다시 불러옴
      console.log('화면이 포커스를 얻었습니다. 메모를 다시 불러옵니다.');
      
    });
    return () => {
      // cleanup 함수를 반환하여 해당 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
      unsubscribe();
    };
  }, []);    

  useEffect(() => {
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
    const todayTaskList = Object.values(tasks).filter((task) => task.date === formattedToday);
    setTodayTasks(todayTaskList.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {}));
  }, [tasks]);

  const tasksValue = Object.values(toDayTasks);
  const length = tasksValue.length || 0;
  const completed = tasksValue.filter((task) => task.completed === true).length || 0;

  return (
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
      <Container>
        <StatusBar
          barStyle={darkMode ? "light-content":"dark-content"}
          backgroundColor={theme.background} // Android only
        />
        <Title>Setting</Title>
        <SettingComponent title="다크 모드"/>
      </Container>
    </ThemeProvider>
  );
}
