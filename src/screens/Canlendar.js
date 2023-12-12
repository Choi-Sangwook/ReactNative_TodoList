import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import IconButton from '../components/IconButton';
import {images} from '../images';
import { Calendar } from "react-native-calendars";
import CalendarTask from '../components/CalendarTask';
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
    color: ${({ theme }) => theme.main};
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

const CalendarContainer = styled.View`
  width: ${({ width }) => (width - 60)}px;
`;




export default function App({ navigation }) {
  const width = Dimensions.get('window').width;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}`;
  const [loadTasks, setLoadTasks] =useState({});
  const { tasks, updateTasks,darkMode } = useTasksContext();
  const [selectedDate, setSelectedDate] = useState(formattedToday);
  const [markedDates, setMarkedDates] = useState({});


  

  const _loadTasks = async () => {
    setLoadTasks(tasks);
    setMarkedDates({});
    const markedDatesObject = {
      ...tasks,
      [selectedDate]: {
        selected: true,
        marked: false,
        dots: [{ color: 'green' }], 
      },
    };
    Object.keys(tasks).forEach((taskId) => {
    const task = tasks[taskId];
    markedDatesObject[task.date] = {
      selected: markedDatesObject[task.date]?.selected || false,
      dots: [{ color: 'green' }], 
      marked: true,
    };
  });
  await setMarkedDates(markedDatesObject);
  await _selectedDateTasks();
  };

  const _selectedDateTasks = () => {
    const selectedDateTasks = Object.keys(tasks)
    .filter(key => tasks[key].date === selectedDate)
    .reduce((obj, key) => {
      obj[key] = tasks[key];
      return obj;
    }, {});
  setLoadTasks(selectedDateTasks);
  };

  const _deleteTask = async(id)=> {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    await updateTasks(currentTasks);
  };

  useEffect(() => {
    _loadTasks();
  }, [tasks]);
  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    updateTasks(currentTasks);
  };

  const handleDateSelect = async(date) => {
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

    updatedMarkedDates[dateString] = {
    selected: true,
    marked: updatedMarkedDates[dateString]?.marked || false,
    dots: updatedMarkedDates[dateString]?.dots || [],
    };
    console.log(updatedMarkedDates[dateString]);
    setMarkedDates(updatedMarkedDates);
    _selectedDateTasks();    
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setSelectedDate(selectedDate!==null?selectedDate:formattedToday);
      await _loadTasks();   
    });

    return unsubscribe;
  }, [navigation, formattedToday,tasks,loadTasks,markedDates]);
  
  useEffect(() => {
    _selectedDateTasks();
  }, [selectedDate]);
 
  return (
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
      <Container>
        <StatusBar
          barStyle={darkMode ? "light-content":"dark-content"}
          backgroundColor={darkMode ? darkTheme.background:lightTheme.background} // Android only
        />
        <BoxConatiner width={width}>
            <Title>Calendar</Title>
            <IconButton 
              type={images.update}
              onPressOut={() => navigation.navigate('AddTaskForm', { selectedDate })}/>
        </BoxConatiner>        
        <CalendarContainer width={width}>
            <Calendar 
            theme={{
              todayTextColor: darkMode ?'white':'black',
            }}
            showSixWeeks={false}
            borderBottomWidth = {width} 
            borderBottomColor="#000000"
            onDayPress={(day) => handleDateSelect(day)}
            markedDates={markedDates}
            monthFormat={'M월'}/>        
        </CalendarContainer>
        <SubTitle>그 날의 할 일</SubTitle>
        <List width={width}>
          {Object.values(loadTasks)
            .reverse()
            .map(item => (
              <CalendarTask
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                updateTask={_updateTask}
                onPressOut={() => navigation.navigate('AddTaskForm', { item })}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  );
}
