import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import { useTasksContext } from '../TaskContext';
import {lightTheme, darkTheme} from '../theme'

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #919498;
  background-color: ${({ darkMode }) => darkMode ? darkTheme.textInputBackColor:lightTheme.textInputBackColor};
  font-size: 16px;
  color: ${({ darkMode }) => darkMode ? darkTheme.main:lightTheme.main};
  font-weight:400;
  margin:0;
`;

const MemoInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.main,
  }))`
    width: ${({ width }) => width - 40}px;
    flex:1;
    padding: 15px 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid #919498;
    background-color: ${({ darkMode }) => darkMode ? darkTheme.textInputBackColor:lightTheme.textInputBackColor};
    font-size: 16px;
    justify-content:flex-start;
    color: ${({ darkMode }) => darkMode ? darkTheme.main:lightTheme.main};
    font-weight:400;
    margin: 0;
  `;
  const Container = styled.View`
  flex:1;
  padding: 20px 20px;
  justify-content: flex-start;
  margin:0;
`;

const Input = ({
  value,
  memo,
  onChangeText,
  onChangeTextMemo,
}) => {
  const width = Dimensions.get('window').width;
  const { darkMode, updateDarkMode} = useTasksContext();
  return (
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
      <Container>
        <StyledInput
          width={width}
          placeholder="할일"
          maxLength={50}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          keyboardAppearance="dark"
          value={value}
          onChangeText={onChangeText}
          darkMode={darkMode}
        />
        <MemoInput
          width={width}
          placeholder="메모"
          maxLength={50}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          keyboardAppearance="dark"
          value={memo}
          onChangeText={onChangeTextMemo}
          darkMode={darkMode}
        />
      </Container>
    </ThemeProvider>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  memo: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
};

export default Input;
