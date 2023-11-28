import React, { useState } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';
import Input from '../components/Input';
import Task from '../components/Task';
import Box from '../components/Box';
import PrograssBar from '../components/ProgressBar';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

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




export default function App() {
  const width = Dimensions.get('window').width;

  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({});

  const _saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };
  const _loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
  };

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    _saveTasks({ ...tasks, ...newTaskObject });
  };
  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };
  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    _saveTasks(currentTasks);
  };
  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const _handleTextChange = text => {
    setNewTask(text);
  };
  const _onBlur = () => {
    setNewTask('');
  };

  const tasksValue = Object.values(tasks);
  const length = tasksValue.length;
  const completed = tasksValue.filter((task) => task.completed === true).length;

  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background} // Android only
        />
        <Title>Hi, User!</Title>
        <SubTitle>오늘의 할일</SubTitle>
        <BoxConatiner width={width}>
            <Box title = "해야할 일" count = {length} width={width}/>
            <Box title = "완료한 일" count = {completed} width={width}/>
        </BoxConatiner>
        
        <SubTitle>전체 진행도</SubTitle>
        <PrograssBar completed={completed} length={length}/>
        <SubTitle>목록</SubTitle>
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadTasks}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}
