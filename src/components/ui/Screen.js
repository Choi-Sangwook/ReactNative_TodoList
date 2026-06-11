import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';

// Standard screen wrapper: safe area + themed background + themed status bar.
// Reads everything from the single root ThemeProvider, so screens no longer
// declare their own ThemeProvider / StatusBar / SafeAreaView containers.
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: ${({ $align }) => $align};
  justify-content: flex-start;
`;

export default function Screen({ children, align = 'center' }) {
  const theme = useTheme();
  return (
    <Container edges={['top', 'left', 'right']} $align={align}>
      <StatusBar
        barStyle={theme.statusBarStyle}
        backgroundColor={theme.background}
      />
      {children}
    </Container>
  );
}
