import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Calendar } from 'react-native-calendars';
import Screen from '../components/ui/Screen';
import { Title, SubTitle } from '../components/ui/Typography';
import IconButton from '../components/IconButton';
import CalendarTask from '../components/CalendarTask';
import { images } from '../images';
import { useTasksContext } from '../TaskContext';
import { todayString } from '../utils/date';

const HeaderRow = styled.View`
  height: 120px;
  width: ${({ width }) => width - 40}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CalendarContainer = styled.View`
  width: ${({ width }) => width - 60}px;
`;

const List = styled.ScrollView`
  margin: 10px 0;
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default function CalendarScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const formattedToday = todayString();
  const { tasks, updateTasks } = useTasksContext();
  const [loadTasks, setLoadTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(formattedToday);
  const [markedDates, setMarkedDates] = useState({});

  const _selectedDateTasks = () => {
    const selectedDateTasks = Object.keys(tasks)
      .filter((key) => tasks[key].date === selectedDate)
      .reduce((obj, key) => {
        obj[key] = tasks[key];
        return obj;
      }, {});
    setLoadTasks(selectedDateTasks);
  };

  const _loadTasks = () => {
    const marked = {
      [selectedDate]: { selected: true, marked: false, dots: [{ color: 'green' }] },
    };
    Object.keys(tasks).forEach((taskId) => {
      const task = tasks[taskId];
      marked[task.date] = {
        selected: marked[task.date]?.selected || false,
        dots: [{ color: 'green' }],
        marked: true,
      };
    });
    setMarkedDates(marked);
    _selectedDateTasks();
  };

  const _deleteTask = (id) => {
    const currentTasks = { ...tasks };
    delete currentTasks[id];
    updateTasks(currentTasks);
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  useEffect(() => {
    _loadTasks();
  }, [tasks]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => _loadTasks());
    return unsubscribe;
  }, [navigation, tasks]);

  useEffect(() => {
    _selectedDateTasks();
  }, [selectedDate]);

  const calendarTheme = {
    calendarBackground: theme.background,
    dayTextColor: theme.text,
    monthTextColor: theme.main,
    textSectionTitleColor: theme.main,
    todayTextColor: theme.accent,
    arrowColor: theme.main,
    selectedDayBackgroundColor: theme.primary,
    selectedDayTextColor: '#fff',
    textDisabledColor: theme.done,
  };

  return (
    <Screen>
      <HeaderRow width={width}>
        <Title>Calendar</Title>
        <IconButton
          type={images.update}
          onPressOut={() => navigation.navigate('AddTaskForm', { selectedDate })}
        />
      </HeaderRow>

      <CalendarContainer width={width}>
        <Calendar
          theme={calendarTheme}
          showSixWeeks={false}
          onDayPress={handleDateSelect}
          markedDates={markedDates}
          monthFormat={'M월'}
        />
      </CalendarContainer>

      <SubTitle>그 날의 할 일</SubTitle>
      <List width={width}>
        {Object.values(loadTasks)
          .reverse()
          .map((item) => (
            <CalendarTask
              key={item.id}
              item={item}
              deleteTask={_deleteTask}
              onPressOut={() => navigation.navigate('AddTaskForm', { item })}
            />
          ))}
      </List>
    </Screen>
  );
}
