import React from 'react';
import { SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // npm install @react-navigation/bottom-tabs
import { createStackNavigator } from '@react-navigation/stack'; // npm install @react-navigation/stack
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './src/screens/MainHome';
import MemoScreen from './src/screens/Memo';
import CalendarScreen from './src/screens/Canlendar';
import MemoFormScreen from './src/screens/MemoForm';
import CalendarFormScreen from './src/screens/CalendarForm'
import SettingScreen from './src/screens/Setting'
import { TasksProvider } from './src/TaskContext';
import { ThemeProvider } from 'styled-components/native';
import {lightTheme, darkTheme} from './src/theme'
import AppMain from './src/App'


const App = () => {
  return (
        <TasksProvider>
          <AppMain/>
        </TasksProvider>
  );
};

export default App;
