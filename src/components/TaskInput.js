import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 2px solid #919498;
  background-color: #fff;
  font-size: 25px;
  color: ${({ theme }) => theme.text};
`;

const MemoInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.main,
  }))`
    width: ${({ width }) => width - 40}px;
    height: 450px;
    padding: 15px 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 2px solid #919498;
    background-color: #fff;
    font-size: 25px;
    color: ${({ theme }) => theme.text};
  `;
  const Container = styled.View`
  background-color: ${props => props.title === '해야할 일'?'rgba(194, 220, 255, 0.45)':'rgba(216, 255, 235, 0.45)'};
  height: 100px;
  width: ${({ width }) => (width - 60)/2}px;
  border-radius: 20px;
  padding: 20px 20px;
  justify-content: flex-start
`;

const Input = ({
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
}) => {
  const width = Dimensions.get('window').width;
  // const width = useWindowDimensions().width;

  return (
    <Container>
    <StyledInput
      width={width}
      placeholder="할일"
      maxLength={50}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      keyboardAppearance="dark" // iOS only
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
    <MemoInput
      width={width}
      placeholder="할일"
      maxLength={50}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      keyboardAppearance="dark" // iOS only
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
    </Container>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default Input;
