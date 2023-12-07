// ToggleSwitch.js

import React, { useState, useEffect } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { useTasksContext } from '../TaskContext';
import {lightTheme, darkTheme} from '../theme'

const ToggleButton = ({ onPress, completed }) => {
  const [isEnabled, setIsEnabled] = useState(completed);
  const { darkMode, updateDarkMode} = useTasksContext();

  useEffect(() => {
    setIsEnabled(completed);
  }, [completed]);

  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev);
    onPress && onPress(!isEnabled);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
    <View style={styles.container}>
      <Switch
        trackColor={{ false: darkMode ? darkTheme.toggleunfilledColor:lightTheme.toggleunfilledColor, true: darkMode ? darkTheme.toggleDone:lightTheme.toggleDone }}
        thumbColor={isEnabled ? (darkMode ? darkTheme.tabBarColor:lightTheme.tabBarColor) : (darkMode ?darkTheme.tabBarColor:lightTheme.tabBarColor)}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={completed}
      />
    </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
});

export default ToggleButton;
