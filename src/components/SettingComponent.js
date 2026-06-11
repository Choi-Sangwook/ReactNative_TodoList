import React from 'react';
import { Switch } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useTasksContext } from '../contexts/TasksContext';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 20px;
`;

const Label = styled.Text`
  margin: 0 20px;
  flex: 1;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

const SettingComponent = ({ title }) => {
  const theme = useTheme();
  const { darkMode, updateDarkMode } = useTasksContext();

  return (
    <Container>
      <Label>{title}</Label>
      <Switch
        trackColor={{ false: theme.toggleunfilledColor, true: theme.toggleDone }}
        thumbColor={theme.toggleThumbColor}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => updateDarkMode(!darkMode)}
        value={darkMode}
      />
    </Container>
  );
};

export default SettingComponent;
