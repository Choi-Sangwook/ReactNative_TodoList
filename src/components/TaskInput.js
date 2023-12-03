import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, useWindowDimensions} from 'react-native';
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
  border: 1px solid #919498;
  background-color: #fff;
  font-size: 16px;
  color: #7D7D7D;
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
    background-color: #fff;
    font-size: 16px;
    justify-content:flex-start;
    color: #7D7D7D;
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
      placeholder="메모"
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
