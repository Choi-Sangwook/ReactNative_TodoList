import React from 'react';
import { SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './screens/MainHome';
import MemoScreen from './screens/Memo';
import CalendarScreen from './screens/Canlendar';
import MemoFormScreen from './screens/MemoForm';
import CalendarFormScreen from './screens/CalendarForm'
import SettingScreen from './screens/Setting'
import { useTasksContext } from './TaskContext';
import { ThemeProvider } from 'styled-components/native';
import {lightTheme, darkTheme} from './theme'


const Tab = createBottomTabNavigator();
const MemoStack = createStackNavigator();
const CalendarStack = createStackNavigator();

const MemoStackScreen = () => (
  <SafeAreaView style={{flex:2}}>
  <MemoStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <MemoStack.Screen name="Memo" component={MemoScreen} />
    <MemoStack.Screen name="AddMemoForm" component={MemoFormScreen} />
  </MemoStack.Navigator>
  </SafeAreaView>
);

const CalendarStackScreen = () => (
  <CalendarStack.Navigator
  screenOptions={{
    headerShown: false,
  }}>
    <CalendarStack.Screen name="Calendar" component={CalendarScreen} />
    <CalendarStack.Screen name="AddTaskForm" component={CalendarFormScreen} />
  </CalendarStack.Navigator>
);

const App = () => {
  const { darkMode} = useTasksContext();
  return (
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
    <NavigationContainer >
          <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{
              tabBarActiveTintColor: darkMode ? darkTheme.tabBarActiveTintColor : lightTheme.tabBarActiveTintColor,
              tabBarInactiveTintColor: darkMode ? darkTheme.tabBarInactiveTintColor : lightTheme.tabBarInactiveTintColor,
              tabBarStyle: {
                display: 'flex',
                backgroundColor: darkMode ? darkTheme.tabBarColor : lightTheme.tabBarColor,
              },
            }}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Home',
                tabBarIcon: ({color, size}) => (
                  <Icon name="home" color={color} size={size} />
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Note"
              component={MemoStackScreen}
              options={{
                title: 'Note',
                tabBarIcon: ({color, size}) => (
                  <Icon name="description" color={color} size={size} />
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Task"
              component={CalendarStackScreen}
              options={{
                title: 'Calendar',
                tabBarIcon: ({color, size}) => (
                  <Icon name="event" color={color} size={size} />
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Setting"
              component={SettingScreen}
              options={{
                title: 'Settings',
                tabBarIcon: ({color, size}) => (
                  <Icon name="settings" color={color} size={size} />
                ),
                headerShown: false,
              }}
            />
          </Tab.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
