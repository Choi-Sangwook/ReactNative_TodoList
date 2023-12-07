import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';
import Input from './Input';
import ToggleButton from './ToggleButton';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  /* background-color: ${({ theme}) => theme.itemCompletedBackground}; */
  background-color: ${({ theme,completed }) => (completed ? theme.itemCompletedBackground : theme.itemBackground)};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
  text-decoration-line: ${({ completed }) =>
    completed ? 'line-through' : 'none'};
`;

const Task = ({ item, toggleTask}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);


  const _handleTogglePress = () => {
    // Implement your toggle logic here
    toggleTask(item.id);
  };

  return isEditing ? (
    <Input
      value={text}
      onChangeText={text => setText(text)}
      onSubmitEditing={_onSubmitEditing}
      onBlur={_onBlur}
    />
  ) : (
    <Container completed={item.completed}>
      <ToggleButton onPress={_handleTogglePress} completed={item.completed} />
      <Contents completed={item.completed}>{item.text}</Contents>

    </Container>
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  toggleTask: PropTypes.func.isRequired,
};

export default Task;
