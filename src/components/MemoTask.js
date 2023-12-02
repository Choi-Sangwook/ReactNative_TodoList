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

const MemoTask = ({ item, deleteMemo, updateMemo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  
  return (
    <Container>
      <Contents>{item.title}</Contents>
        <IconButton
          type={images.update}
          id={item.id}
          onPressOut={updateMemo}
        />      
      <IconButton
        type={images.delete}
        id={item.id}
        onPressOut={deleteMemo}
      />
    </Container>
  );
};

MemoTask.propTypes = {
  item: PropTypes.object.isRequired,
  deleteMemo: PropTypes.func.isRequired,
  updateMemo: PropTypes.func.isRequired,
};

export default MemoTask;
