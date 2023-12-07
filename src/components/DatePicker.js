import React, {useState}  from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PropTypes from 'prop-types';
import { useTasksContext } from '../TaskContext';
import {lightTheme, darkTheme} from '../theme'

const Contents = styled.Text`
    color: ${({ darkMode }) => darkMode ? darkTheme.buttonText:lightTheme.buttonText};
    text-align: center;
    font-size:15px;
    font-weight: 700;
`;

const Container = styled.View`
    width: 90px;
    background: ${({ darkMode }) => darkMode ? darkTheme.itemCompletedBackground: '#3E92FF'};
    height: 45px;
    border: 1px solid ${({ darkMode }) => darkMode ? darkTheme.itemCompletedBackground: '#3E92FF'};
    border-radius: 15px;
    padding: 10px 15px;
    margin:0;
`;

const CustonButton = ({title, onDateChange}) => {
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const { darkMode} = useTasksContext();

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
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
    <TouchableOpacity onPressOut={showDatePicker}>
        <Container darkMode={darkMode}>
            <Contents darkMode={darkMode}>{title}</Contents>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </Container>
    </TouchableOpacity>
    </ThemeProvider>
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
