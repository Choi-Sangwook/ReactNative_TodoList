// npm install @react-navigation/stack
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function StackNavigationApp() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

