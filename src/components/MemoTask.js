import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';
import Input from './Input';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme}) => theme.itemBackground};
  border-radius: 15px;
  padding: 5px;
  margin: 3px 0px;
`;

const Contents = styled.Text`
  padding:0 20px;
  flex: 1;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  };
  const _onSubmitEditing = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, { text });
      setIsEditing(false);
      updateTask(editedTask);
    }
  };
  const _onBlur = () => {
    if (isEditing) {
      setIsEditing(false);
      setText(item.text);
    }
  };

  return (
    <Container completed={item.completed}>
      <Contents>{item.text}</Contents>
        <IconButton
          type={images.update}
          onPressOut={_handleUpdateButtonPress}
        />
      
      <IconButton
        type={images.delete}
        id={item.id}
        onPressOut={deleteTask}
      />
    </Container>
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Task;
