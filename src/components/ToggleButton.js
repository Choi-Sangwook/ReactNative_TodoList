import React from 'react';
import { Switch } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

const ToggleButton = ({ onPress, completed }) => {
  const theme = useTheme();

  return (
    <Container>
      <Switch
        trackColor={{ false: theme.toggleunfilledColor, true: theme.toggleDone }}
        thumbColor={theme.toggleThumbColor}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => onPress && onPress()}
        value={completed}
      />
    </Container>
  );
};

export default ToggleButton;
