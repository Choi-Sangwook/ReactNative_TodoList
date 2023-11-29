import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import mainScreen from '../screens/MainHome';
import noteScreen from '../screens/Memo';
import calendarScreen from '../screens/Calendar';
import { StatusBar, Dimensions } from 'react-native';

const Tab = createBottomTabNavigator();

function HomeScreen() {
   return <Text>Home</Text>;
}

function SearchScreen() {
  return <Text>Search</Text>;
}

function NotificationScreen() {
  return <Text>Notification</Text>;
}

function MessageScreen() {
  return <Text>Message</Text>;
}

function BottomTabNavigationApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#2B3F62',
          inactiveTintColor: 'grey',
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
          component={noteScreen}
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
          component={SearchScreen}
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
          component={MessageScreen}
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
}

export default BottomTabNavigationApp;