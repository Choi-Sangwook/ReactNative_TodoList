import React, { useState, useEffect, useMemo } from 'react';
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
  const { tasks, updateTasks } = useTasksContext();
  const [selectedDate, setSelectedDate] = useState(todayString());

  // Re-mark the calendar on today every time the screen is opened.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () =>
      setSelectedDate(todayString())
    );
    return unsubscribe;
  }, [navigation]);

  // Tasks shown in the list below the calendar (the selected day's tasks).
  const dayTasks = useMemo(
    () => Object.values(tasks).filter((task) => task.date === selectedDate),
    [tasks, selectedDate]
  );

  // A dot on every date that has tasks, plus the "selected" marker which
  // follows selectedDate (so it moves when the user taps another day).
  const markedDates = useMemo(() => {
    const marked = {};
    Object.values(tasks).forEach((task) => {
      marked[task.date] = { marked: true, dots: [{ color: 'green' }] };
    });
    marked[selectedDate] = { ...(marked[selectedDate] || {}), selected: true };
    return marked;
  }, [tasks, selectedDate]);

  const _deleteTask = (id) => {
    const currentTasks = { ...tasks };
    delete currentTasks[id];
    updateTasks(currentTasks);
  };

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
          key={theme.background}
          theme={calendarTheme}
          showSixWeeks={false}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          monthFormat={'M월'}
        />
      </CalendarContainer>

      <SubTitle>그 날의 할 일</SubTitle>
      <List width={width}>
        {[...dayTasks].reverse().map((item) => (
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
