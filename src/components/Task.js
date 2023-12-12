import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Input from './Input';
import ToggleButton from './ToggleButton';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
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
    margin: 0 20px;
`;

const Task = ({ item, toggleTask}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);


  const _handleTogglePress = () => {
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
