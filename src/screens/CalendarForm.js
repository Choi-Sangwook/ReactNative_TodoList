import React, { useState } from 'react';
import { StatusBar, Dimensions, View } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import DateBox from '../components/DateBox'
import TaskInput from '../components/TaskInput'
import CustonButton from '../components/CustomButton';
import { useTasksContext } from '../TaskContext';
import {lightTheme, darkTheme} from '../theme'

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

const BackButton = styled.TouchableOpacity`
  height: 45px;
  background-color: ${({ darkMode }) => darkMode ? darkTheme.itemCompletedBackground: '#416AD7'};
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
  const [newTask, setNewTask] = useState(route.params.item != null?route.params.item.text:'');
  const [newMemo, setNewMemo] = useState(route.params.item != null?route.params.item.memo:'');
  const { tasks, updateTasks,darkMode } = useTasksContext();
  const [selectedDate, setSelectedDate] = useState(route.params.item != null?route.params.item.date:route.params.selectedDate);

  const _saveTasks = () => {
      navigation.navigate('Calendar');
  };

  const _addTask = () => {
    if (!newTask.trim() && !newMemo.trim()) {
      return;
    }
  
    const ID = route.params.item != null ? route.params.item.id : Date.now().toString();
  
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
      updateTasks(tasks);
    } 
      updateTasks({ ...tasks, [ID]: newTaskObject });

    _saveTasks();
  };

  const _handleTextChange = text=> {
    setNewTask(text);
  };
  const _handleTextChangeMemo = memo=> {
    setNewMemo(memo);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date)
  };
  
  return (
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
      <Container>
        <StatusBar
          barStyle={darkMode ? "light-content":"dark-content"}
          backgroundColor={darkMode ? darkTheme.background:lightTheme.background}
        />
        <ViewStyle width={width}>
          <Title>일정 등록</Title>
          <BackButton darkMode={darkMode} onPress={() => navigation.goBack() }>
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
