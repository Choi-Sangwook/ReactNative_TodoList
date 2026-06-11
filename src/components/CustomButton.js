import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background: ${({ theme }) => theme.primary};
  height: 60px;
  width: ${({ width }) => width - 40}px;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 20px;
`;

const Label = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

const CustomButton = ({ title, width, onPress = () => {} }) => (
  <TouchableOpacity onPressOut={onPress}>
    <Container width={width}>
      <Label>{title}</Label>
    </Container>
  </TouchableOpacity>
);

export default CustomButton;
