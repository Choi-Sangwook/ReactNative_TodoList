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

const Box = props =>{
    return (
        <Container width={props.width}>
            <Contents>{props.date}</Contents>
            <DatePicker title="날짜"/>
        </Container>
    )
};

export default Box;