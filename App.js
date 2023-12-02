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
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#2B3F62',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            display: 'flex',
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
          name="Calendar"
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
          component={HomeScreen}
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
  );
};

export default App;
