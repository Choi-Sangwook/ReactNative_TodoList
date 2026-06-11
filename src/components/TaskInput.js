import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  height: 60px;
  padding: 15px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.textInputBackColor};
  font-size: 16px;
  color: ${({ theme }) => theme.main};
  font-weight: 400;
`;

const MemoInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  flex: 1;
  padding: 15px 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.textInputBackColor};
  font-size: 16px;
  color: ${({ theme }) => theme.main};
  font-weight: 400;
`;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: flex-start;
`;

const TaskInput = ({ value, memo, onChangeText, onChangeTextMemo }) => {
  const { width } = useWindowDimensions();

  return (
    <Container>
      <StyledInput
        width={width}
        placeholder="할일"
        maxLength={50}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        value={value}
        onChangeText={onChangeText}
      />
      <MemoInput
        width={width}
        placeholder="메모"
        maxLength={50}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        value={memo}
        onChangeText={onChangeTextMemo}
      />
    </Container>
  );
};

TaskInput.propTypes = {
  value: PropTypes.string.isRequired,
  memo: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onChangeTextMemo: PropTypes.func.isRequired,
};

export default TaskInput;
