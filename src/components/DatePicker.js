import React, {useState}  from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PropTypes from 'prop-types';
const Contents = styled.Text`
    color: #fff;
    text-align: center;
    font-size:15px;
    font-weight: 700;
`;

const Container = styled.View`
    background: #3E92FF;
    height: 45px;
    border: 1px solid #9EC8FF;
    border-radius: 20px;
    padding: 10px 15px;
    margin:0;
`;

const CustonButton = ({title, onDateChange}) => {
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const showDatePicker = () => {
    setDatePickerVisibility(true);
};

const hideDatePicker = () => {
    setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    const formattedDate = date.toISOString().split('T')[0];
    onDateChange(formattedDate);
    hideDatePicker();
};

  return (
    <TouchableOpacity onPressOut={showDatePicker}>
        <Container>
            <Contents>{title}</Contents>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </Container>
    </TouchableOpacity>
  );
};

CustonButton.defaultProps = {
  onPressOut: () => {},
};

// CustonButton.propTypes = {
//   type: PropTypes.oneOf(Object.values(images)).isRequired,
//   onPressOut: PropTypes.func,
//   id: PropTypes.string,
//   completed: PropTypes.bool,
// };

export default CustonButton;
