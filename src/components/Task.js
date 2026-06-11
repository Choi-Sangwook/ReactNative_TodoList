import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import ToggleButton from './ToggleButton';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, completed }) =>
    completed ? theme.itemCompletedBackground : theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
  text-decoration-line: ${({ completed }) => (completed ? 'line-through' : 'none')};
  margin: 0 20px;
`;

const Task = ({ item, toggleTask }) => (
  <Container completed={item.completed}>
    <ToggleButton onPress={() => toggleTask(item.id)} completed={item.completed} />
    <Contents completed={item.completed}>{item.text}</Contents>
  </Container>
);

Task.propTypes = {
  item: PropTypes.object.isRequired,
  toggleTask: PropTypes.func.isRequired,
};

export default Task;
