import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';

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

const CalendarTask = ({ item, deleteTask, onPressOut }) => {
  return (
    <Container>
      <Contents>{item.text}</Contents>
        <IconButton
          type={images.update}
          id={item.id}
          onPressOut={onPressOut}
        />      
        <IconButton
          type={images.delete}
          id={item.id}
          onPressOut={deleteTask}
        />
    </Container>
  );
};

CalendarTask.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default CalendarTask;
