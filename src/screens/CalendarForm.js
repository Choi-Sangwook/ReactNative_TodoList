import React, { useState } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';
import Input from '../components/Input';
import Task from '../components/Task';
import Box from '../components/Box';
import DateBox from '../components/DateBox'
import TaskInput from '../components/TaskInput'
import CustonButton from '../components/CustomButton';
import DatePicker from '../components/DatePicker'
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
  font-size: 24px;
  font-weight: 700;
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
  const [newMemo, setNewMemo] = useState('');
  const [tasks, setTasks] = useState({});

  const _saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
      console.log(tasks);
    } catch (e) {
      console.error(e);
    }
  };
  const _loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
  };

  const _addTask = () => {
    if (!newTask.trim() && !newMemo.trim()) {
      // 입력된 텍스트나 메모가 없는 경우 처리 (예: 경고 메시지 또는 아무 작업도 하지 않음)
      return;
    }
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false, date: ID, memo: newMemo, },
    };
    setNewTask('');
    setNewMemo('');
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

  const _handleTextChange = text=> {
    setNewTask(text);
  };
  const _onBlur = () => {
    setNewTask('');
  };

  const _handleTextChangeMemo = memo=> {
    setNewMemo(memo);
  };
  const _onBlurMemo = () => {
    setNewMemo('');
  };

  

  const tasksValue = Object.values(tasks);
  const length = tasksValue.length;
  const completed = tasksValue.filter((task) => task.completed === true).length;

  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.background} // Android only
        />
        <Title>일정 등록</Title>
        <DateBox date="2020-01-10" width={width}/>
        <TaskInput
          value={newTask}
          memo={newMemo}
          onChangeText={_handleTextChange}
          onChangeTextMemo={_handleTextChangeMemo}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}
          onBlurMemo={_onBlurMemo}
        />
        <CustonButton width={width} title="등록" onPress={_addTask}/>
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
