import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import Screen from '../components/ui/Screen';
import { Title, SubTitle } from '../components/ui/Typography';
import Task from '../components/Task';
import Box from '../components/Box';
import ProgressBar from '../components/ProgressBar';
import { useTasksContext } from '../TaskContext';
import { todayString } from '../utils/date';

const SummaryRow = styled.View`
  height: 150px;
  width: ${({ width }) => width - 40}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const List = styled.ScrollView`
  margin: 10px 0;
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [todayTasks, setTodayTasks] = useState({});
  const { tasks, updateTasks } = useTasksContext();

  const toggleTask = (id) => {
    const next = { ...tasks };
    next[id].completed = !next[id].completed;
    updateTasks(next);
  };

  useEffect(() => {
    const today = todayString();
    const list = Object.values(tasks).filter((task) => task.date === today);
    setTodayTasks(list.reduce((acc, task) => ({ ...acc, [task.id]: task }), {}));
  }, [tasks]);

  const values = Object.values(todayTasks);
  const length = values.length;
  const completed = values.filter((task) => task.completed).length;

  return (
    <Screen>
      <Title>Hi, User!</Title>
      <SubTitle>오늘의 할일</SubTitle>
      <SummaryRow width={width}>
        <Box title="해야할 일" count={length} tone="todo" width={width} />
        <Box title="완료한 일" count={completed} tone="done" width={width} />
      </SummaryRow>

      <SubTitle>전체 진행도</SubTitle>
      <ProgressBar completed={completed} length={length} />

      <SubTitle>목록</SubTitle>
      {length === 0 ? (
        <SubTitle>오늘의 일과를 추가하세요.</SubTitle>
      ) : (
        <List width={width}>
          {values.reverse().map((item) => (
            <Task key={item.id} item={item} toggleTask={toggleTask} />
          ))}
        </List>
      )}
    </Screen>
  );
}
