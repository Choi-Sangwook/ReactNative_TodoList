import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components/native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import MemoScreen from '../screens/MemoScreen';
import MemoFormScreen from '../screens/MemoFormScreen';
import CalendarScreen from '../screens/CalendarScreen';
import CalendarFormScreen from '../screens/CalendarFormScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTasksContext } from '../contexts/TasksContext';
import { lightTheme, darkTheme } from '../theme';

const Tab = createBottomTabNavigator();
const MemoStack = createStackNavigator();
const CalendarStack = createStackNavigator();

const stackOptions = { headerShown: false };

const MemoStackScreen = () => (
  <MemoStack.Navigator screenOptions={stackOptions}>
    <MemoStack.Screen name="Memo" component={MemoScreen} />
    <MemoStack.Screen name="AddMemoForm" component={MemoFormScreen} />
  </MemoStack.Navigator>
);

const CalendarStackScreen = () => (
  <CalendarStack.Navigator screenOptions={stackOptions}>
    <CalendarStack.Screen name="Calendar" component={CalendarScreen} />
    <CalendarStack.Screen name="AddTaskForm" component={CalendarFormScreen} />
  </CalendarStack.Navigator>
);

const tabIcon = (name) =>
  function TabBarIcon({ color, size }) {
    return <Icon name={name} color={color} size={size} />;
  };

const AppNavigator = () => {
  const { darkMode } = useTasksContext();
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.tabBarActiveTintColor,
            tabBarInactiveTintColor: theme.tabBarInactiveTintColor,
            tabBarStyle: { backgroundColor: theme.tabBarColor },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home', tabBarIcon: tabIcon('home') }}
          />
          <Tab.Screen
            name="Note"
            component={MemoStackScreen}
            options={{ title: 'Note', tabBarIcon: tabIcon('description') }}
          />
          <Tab.Screen
            name="Task"
            component={CalendarStackScreen}
            options={{ title: 'Calendar', tabBarIcon: tabIcon('event') }}
          />
          <Tab.Screen
            name="Setting"
            component={SettingsScreen}
            options={{ title: 'Settings', tabBarIcon: tabIcon('settings') }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppNavigator;
