import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDate } from '../utils/date';

const Container = styled.View`
  width: 90px;
  background: ${({ theme }) => theme.accent};
  height: 45px;
  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 15px;
  padding: 10px 15px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.buttonText};
  text-align: center;
  font-size: 15px;
  font-weight: 700;
`;

const DatePicker = ({ title, date, onDateChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = (picked) => {
    onDateChange(formatDate(picked));
    setIsVisible(false);
  };

  return (
    <TouchableOpacity onPressOut={() => setIsVisible(true)}>
      <Container>
        <Label>{title}</Label>
      </Container>
      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        date={date ? new Date(date) : new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setIsVisible(false)}
      />
    </TouchableOpacity>
  );
};

export default DatePicker;
