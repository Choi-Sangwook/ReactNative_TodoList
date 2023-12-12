import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled , { ThemeProvider } from 'styled-components/native';
import { useTasksContext } from '../TaskContext';
import {lightTheme, darkTheme} from '../theme'
const Contents = styled.Text`
    color: #fff;
    text-align: center;
    font-size: ${props=>props.title==="등록"?'24px':'15px'};
    font-weight: 700;
`;

const Container = styled.View`
    background: ${(props)=>props.title==="등록"?(props.darkMode ? darkTheme.itemCompletedBackground: '#416AD7'):'#3E92FF'};
    height: ${props=>props.title==="등록"?'60px':'45px'};
    width: ${({ width }) => (width - 40)}px;
    border: 1px solid ${({ darkMode }) => darkMode ? darkTheme.itemCompletedBackground: '#9EC8FF'};
    border-radius: 20px;
    padding: 10px 20px;
    margin:20px;
`;

const CustonButton = props => {
const { darkMode } = useTasksContext();
  return (
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
    <TouchableOpacity onPressOut={props.onPress}>
        <Container width={props.width} title={props.title} darkMode={darkMode}>
            <Contents title={props.title} darkMode={darkMode}>{props.title}</Contents>
        </Container>
    </TouchableOpacity>
    </ThemeProvider>
  );
};

CustonButton.defaultProps = {
  onPressOut: () => {},
};

export default CustonButton;
