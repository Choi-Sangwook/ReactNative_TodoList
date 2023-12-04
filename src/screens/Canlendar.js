import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';
import Task from '../components/Task';
import IconButton from '../components/IconButton';
import CalendarView from '../components/CalendarView';
import {images} from '../images';
import { Calendar } from "react-native-calendars";
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarTask from '../components/CalendarTask';


const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;
const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  width: ${({ width }) => width - 150}px;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  align-self: center;
  margin: 20px;
`;
const List = styled.ScrollView`
  margin:10px 0;
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const SubTitle = styled.Text`
margin: 20px;
    padding: 0 20px;
    color: #2B3F62;
    font-size: 20px;
    font-weight: 700;
    align-self: flex-start;
`;

const BoxConatiner = styled.SafeAreaView`
  height:120px;
  width: ${({ width }) => width - 40}px;    
  background-color: ${({ theme }) => theme.background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;




export default function App({ navigation }) {
  const width = Dimensions.get('window').width;
  // 오늘 날짜 정보
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 1자리 수 월은 0을 붙여줍니다.
  const day = String(today.getDate()).padStart(2, '0'); // 날짜도 1자리 수일 경우 0을 붙여줍니다.
  const formattedToday = `${year}-${month}-${day}`;

  const [isReady, setIsReady] = useState(false); 
  const [loadTasks, setLoadTasks] =useState({});
  const [tasks, setTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(formattedToday);
  const [markedDates, setMarkedDates] = useState({});
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
    const loadedTasksObject = JSON.parse(loadedTasks || '{}'); 
    setLoadTasks(loadedTasksObject); //화면 진입시 일과들 모두 로딩해서 상태 변수로 저장.
    const markedDatesObject = {
      ...loadedTasksObject,
      [formattedToday]: {
        selected: true,
        marked: false,
        dots: [{ color: 'green' }], // 마커 색깔 등 설정 가능
      },
    };
    Object.keys(loadedTasksObject).forEach((taskId) => {
    const task = loadedTasksObject[taskId];
    markedDatesObject[task.date] = {
      selected: markedDatesObject[task.date]?.selected || false,
      dots: [{ color: 'green' }], // 마커 색깔 등 설정 가능
      marked: true,
    };
  });
  console.log('loadTasksStatus', markedDatesObject);
  setMarkedDates(markedDatesObject);
  _selectedDateTasks();
  };

  const _selectedDateTasks = () => {
    const selectedDateTasks = Object.keys(loadTasks)
    .filter(key => loadTasks[key].date === selectedDate)
    .reduce((obj, key) => {
      obj[key] = loadTasks[key];
      return obj;
    }, {});
  // 일정 및 마커 갱신
  console.log('dsd', selectedDateTasks);
  setTasks(selectedDateTasks);
  };

  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };
  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const handleDateSelect = (date) => {
    const dateString = date.dateString;
    setSelectedDate(dateString); 
    console.log(dateString);
    const updatedMarkedDates = { ...markedDates };
    if (updatedMarkedDates[selectedDate]) {
      updatedMarkedDates[selectedDate] = {
        ...updatedMarkedDates[selectedDate],
        selected: false,
      };
    }
    // 선택된 날짜에 selected 표시
    updatedMarkedDates[dateString] = {
    selected: true,
    marked: updatedMarkedDates[dateString]?.marked || false,
    dots: updatedMarkedDates[dateString]?.dots || [],
    };
    console.log(updatedMarkedDates[dateString]);
    setMarkedDates(updatedMarkedDates);
       // 여기서 선택한 날짜에 대한 처리를 추가할 수 있습니다.
    _selectedDateTasks();    
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // 화면이 포커스를 얻을 때마다 메모 목록을 다시 불러옴
      console.log('화면이 포커스를 얻었습니다. 메모를 다시 불러옵니다.');
      setSelectedDate(formattedToday);
      await _loadTasks();   
      console.log(tasks);
      console.log('선택된 날짜', selectedDate, formattedToday);
      console.log(markedDates);
    });

    return unsubscribe;
  }, [navigation, formattedToday]);
  
  useEffect(() => {
    // useEffect 내부에서 _selectedDateTasks를 호출하여 동기화 처리
    _selectedDateTasks();
  }, [selectedDate]);
 
  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.background} // Android only
        />
        <BoxConatiner width={width}>
            <Title>Calendar</Title>
            <IconButton 
              type={images.update}
              onPressOut={() => navigation.navigate('AddTaskForm', { selectedDate })}/>
        </BoxConatiner>        
            <Calendar 
            theme={{
              todayTextColor: 'black',
            }}
            style={{
              height: 300, // 원하는 높이로 설정
            }}
            showSixWeeks={false}
            borderBottomWidth = {width} 
            borderBottomColor="#000000"
            onDayPress={(day) => handleDateSelect(day)}
            markedDates={markedDates}
            monthFormat={'M월'}/>        
        <SubTitle>그 날의 할 일</SubTitle>
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <CalendarTask
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
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
