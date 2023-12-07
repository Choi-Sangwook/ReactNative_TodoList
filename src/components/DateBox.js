import React, { useState } from "react";
import {Dimensions, View, Text } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import DatePicker from './DatePicker'
import { useTasksContext } from '../TaskContext';
import {lightTheme, darkTheme} from '../theme'


const Container = styled.View`
    background-color: ${({ theme}) => theme.itemBackground};
    height: 60px;
    width: ${({ width }) => (width - 40)}px;
    border-radius: 20px;
    padding: 20px 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Contents = styled.Text`
    margin: 0 10px;
    flex:1;
    color: ${({ darkMode }) => darkMode ? darkTheme.main:lightTheme.main};
    font-size: 16px;
    font-weight: 600;
    justify-content:flex-end;
`;

const Box = ({date, width, onDateChange}) =>{
    const { darkMode} = useTasksContext();
    console.log('선택된 날짜' , date);

    return (
        <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
            <Container width={width}>
                <Contents darkMode={darkMode}>{date}</Contents>
                <DatePicker title="날짜" date = {date} onDateChange={onDateChange}/>
            </Container>
        </ThemeProvider>
    )
};

export default Box;