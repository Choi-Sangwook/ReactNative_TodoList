import React, { useState } from "react";
import {Dimensions, View, Text } from 'react-native';
import styled from 'styled-components/native';
import DatePicker from './DatePicker'


const Container = styled.View`
    background-color: ${({ theme}) => theme.itemBackground};
    height: 60px;
    width: ${({ width }) => (width - 40)}px;
    border-radius: 20px;
    padding: 20px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Contents = styled.Text`
    flex:1;
    color: #000;
    font-size: 16px;
    font-weight: 600;
    justify-content:flex-end;
`;

const Box = ({date, width, onDateChange}) =>{
    
    console.log('선택된 날짜' , date);

    return (
        <Container width={width}>
            <Contents>{date}</Contents>
            <DatePicker title="날짜" date = {date} onDateChange={onDateChange}/>
        </Container>
    )
};

export default Box;