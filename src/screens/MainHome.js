import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import Task from '../components/Task';
import Box from '../components/Box';
import PrograssBar from '../components/ProgressBar';
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
    color: ${({ theme }) => theme.main};
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
  const [toDayTasks, setTodayTasks] = useState({});
  const { tasks, updateTasks } = useTasksContext();
  const { darkMode} = useTasksContext();

  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);;
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    updateTasks(currentTasks);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    return () => {
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
          backgroundColor={darkMode ? darkTheme.background:lightTheme.background}
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
        {Object.values(toDayTasks).length === 0 ? ( 
          <Container>
            <SubTitle>오늘의 일과를 추가하세요.</SubTitle>
          </Container>
        ) : (
        <List width={width}>
          {Object.values(toDayTasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                toggleTask={_toggleTask}
              />
            ))}
        </List>
        )}
      </Container>
    </ThemeProvider>
  );
}
