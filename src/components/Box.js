import React from "react";
import {Dimensions, View, Text } from 'react-native';
import styled from 'styled-components/native';


const Container = styled.View`
    background-color: ${props => props.title === '해야할 일'?'rgba(194, 220, 255, 0.45)':'rgba(216, 255, 235, 0.45)'};
    height: 100px;
    width: ${({ width }) => (width - 60)/2}px;
    border-radius: 20px;
    padding: 20px 20px;
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
        <Container title={props.title} width={props.width}>
            <Contents>{props.title}</Contents>
            <Contents>{props.count}</Contents>
        </Container>
    )
};

export default Box;