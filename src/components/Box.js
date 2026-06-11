import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({ theme, tone }) =>
    tone === 'done' ? theme.summaryDoneBackground : theme.summaryTodoBackground};
  height: 100px;
  width: ${({ width }) => (width - 60) / 2}px;
  border-radius: 20px;
  padding: 20px;
`;

const Contents = styled.Text`
  flex: 1;
  color: #000;
  font-size: 16px;
  font-weight: 600;
`;

const Box = ({ title, count, tone, width }) => (
  <Container tone={tone} width={width}>
    <Contents>{title}</Contents>
    <Contents>{count}</Contents>
  </Container>
);

export default Box;
