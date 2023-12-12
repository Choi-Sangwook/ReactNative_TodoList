import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import SettingComponent from '../components/SettingComponent'
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

export default function App({navigation}) {
  const { darkMode} = useTasksContext();

  return (
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
      <Container>
        <StatusBar
          barStyle={darkMode ? "light-content":"dark-content"}
          backgroundColor={darkMode ? darkTheme.background:lightTheme.background}
        />
        <Title>Setting</Title>
        <SettingComponent title="다크 모드"/>
      </Container>
    </ThemeProvider>
  );
}
