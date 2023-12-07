import React, { useState } from 'react';
import { StatusBar, Dimensions, View } from 'react-native';
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
import { useTasksContext } from '../TaskContext';

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
  margin: 20px 0;
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

const BackButton = styled.TouchableOpacity`
  height: 45px;
  background-color: #416AD7;
  padding: 10px;
  border-radius: 10px;
  align-self:center;
  margin: 0 10px;
`;

const BackButtonText = styled.Text`
  font-size: 18px;
  color: white;
`;

const ViewStyle = styled(View)`
  flex-direction: row;
  width: ${({ width }) => width - 40}px;  
  justify-content: space-between;
`;





export default function App({navigation, route}) {
  const width = Dimensions.get('window').width;

  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState(route.params.item != null?route.params.item.text:'');
  const [newMemo, setNewMemo] = useState(route.params.item != null?route.params.item.memo:'');
  // const [tasks, setTasks] = useState({});
  const { tasks, updateTasks } = useTasksContext();
  const [selectedDate, setSelectedDate] = useState(route.params.item != null?route.params.item.date:route.params.selectedDate);
  

  const _saveTasks = () => {
      navigation.navigate('Calendar');
      console.log(tasks);
  };

  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };

  const _loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
  };


  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    _saveTasks(currentTasks);
  };


  const _addTask = () => {
    if (!newTask.trim() && !newMemo.trim()) {
      // 입력된 텍스트나 메모가 없는 경우 처리 (예: 경고 메시지 또는 아무 작업도 하지 않음)
      return;
    }
  
    const ID = route.params.item != null ? route.params.item.id : Date.now().toString();
    console.log(ID);
  
    const newTaskObject = {
      id: ID,
      text: newTask,
      completed: false,
      date: selectedDate,
      memo: newMemo,
    };
  
    setNewTask('');
    setNewMemo('');
  
    if (route.params.item != null) {
      tasks[ID]=newTaskObject;
      updateTasks(tasks); // 기존 작업 객체의 ID를 사용하여 업데이트
    } 
      updateTasks({ ...tasks, [ID]: newTaskObject }); // 새로운 작업 객체를 기존 tasks에 추가

    _saveTasks();
  };
  
  const _updateTask = (id, item) => {
    setTasks(prevTasks => {
      const updatedTasks = {
        ...prevTasks,
        [id]: item,
      };
      _saveTasks(updatedTasks);
      return updatedTasks;
    });
  };


  const _handleTextChange = text=> {
    setNewTask(text);
  };
  const _handleTextChangeMemo = memo=> {
    setNewMemo(memo);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date)
    console.log(date);
  };
  console.log('넘겨받은 선택된 날짜', selectedDate);
  

  const tasksValue = Object.values(tasks);
  const length = tasksValue.length;
  const completed = tasksValue.filter((task) => task.completed === true).length;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.background} // Android only
        />
        <ViewStyle width={width}>
          <Title>일정 등록</Title>
          <BackButton onPress={() => navigation.goBack()}>
            <BackButtonText>뒤로가기</BackButtonText>
          </BackButton>
        </ViewStyle>
        <DateBox date={selectedDate} width={width}  onDateChange={handleDateChange}/>
        <TaskInput
          value={newTask}
          memo={newMemo}
          onChangeText={_handleTextChange}
          onChangeTextMemo={_handleTextChangeMemo}
          onSubmitEditing={_addTask}
        />
        <CustonButton width={width} title="등록" onPress={_addTask}/>
      </Container>
    </ThemeProvider>
   );
}
