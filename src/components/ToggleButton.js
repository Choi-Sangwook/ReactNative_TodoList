// ToggleSwitch.js

import React, { useState, useEffect } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const ToggleButton = ({ onPress, completed }) => {
  const [isEnabled, setIsEnabled] = useState(completed);

  useEffect(() => {
    setIsEnabled(completed);
  }, [completed]);

  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev);
    onPress && onPress(!isEnabled);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: '#00A3FF', true: '#17D313' }}
        thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
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
