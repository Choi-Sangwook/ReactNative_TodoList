import React, { useState} from 'react';
import {  Switch } from 'react-native';
import styled,{ ThemeProvider } from 'styled-components/native';
import { useTasksContext } from '../TaskContext';
import {lightTheme, darkTheme} from '../theme'

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme,darkMode }) => (darkMode ? theme.itemCompletedBackground : theme.itemBackground)};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 20px;
`;

const Contents = styled.Text`
margin: 0 20px;
  flex: 1;
  font-size: 24px;
  color: ${({ theme, darkMode }) => (darkMode ? theme.done : theme.text)};
  text-decoration-line: ${({ darkMode }) =>
  darkMode ? 'line-through' : 'none'};
`;

const Task = props => {
  const { darkMode, updateDarkMode} = useTasksContext();
  const [isEnabled, setIsEnabled] = useState(darkMode);

  const toggleSwitch = () => {
    updateDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
    <Container >
      <Contents>{props.title}</Contents>
      <Switch
        trackColor={{ false: darkMode ? darkTheme.toggleunfilledColor:lightTheme.toggleunfilledColor, true: darkMode ? darkTheme.toggleDone:lightTheme.toggleDone }}
        thumbColor={isEnabled ? (darkMode ? darkTheme.tabBarColor:lightTheme.tabBarColor) : (darkMode ?darkTheme.tabBarColor:lightTheme.tabBarColor)}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={darkMode}
      />
    </Container>
    </ThemeProvider>
  );
};


export default Task;
