import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import Screen from '../components/ui/Screen';
import { Title } from '../components/ui/Typography';
import DateBox from '../components/DateBox';
import TaskInput from '../components/TaskInput';
import CustomButton from '../components/CustomButton';
import { useTasksContext } from '../contexts/TasksContext';

const HeaderRow = styled.View`
  flex-direction: row;
  width: ${({ width }) => width - 40}px;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  height: 45px;
  background-color: ${({ theme }) => theme.primary};
  padding: 10px;
  border-radius: 10px;
  align-self: center;
  margin: 0 10px;
`;

const BackButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export default function CalendarFormScreen({ navigation, route }) {
  const { width } = useWindowDimensions();
  const { item, selectedDate: paramDate } = route.params || {};
  const { tasks, updateTasks } = useTasksContext();
  const [newTask, setNewTask] = useState(item?.text ?? '');
  const [newMemo, setNewMemo] = useState(item?.memo ?? '');
  const [selectedDate, setSelectedDate] = useState(item?.date ?? paramDate);

  const _addTask = () => {
    if (!newTask.trim() && !newMemo.trim()) {
      return;
    }

    const id = item?.id ?? Date.now().toString();
    const newTaskObject = {
      id,
      text: newTask,
      completed: item?.completed ?? false,
      date: selectedDate,
      memo: newMemo,
    };

    updateTasks({ ...tasks, [id]: newTaskObject });
    navigation.navigate('Calendar');
  };

  return (
    <Screen>
      <HeaderRow width={width}>
        <Title>일정 등록</Title>
        <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>뒤로가기</BackButtonText>
        </BackButton>
      </HeaderRow>

      <DateBox date={selectedDate} width={width} onDateChange={setSelectedDate} />
      <TaskInput
        value={newTask}
        memo={newMemo}
        onChangeText={setNewTask}
        onChangeTextMemo={setNewMemo}
      />
      <CustomButton width={width} title="등록" onPress={_addTask} />
    </Screen>
  );
}
