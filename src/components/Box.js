import React from "react";
import styled , { ThemeProvider }from 'styled-components/native';
import { useTasksContext } from '../TaskContext';
import {lightTheme, darkTheme} from '../theme'


const Container = styled.View`
    background-color: ${(props) => props.title === '해야할 일'?(props.darkMode ? darkTheme.itemBackground:'rgba(194, 220, 255, 0.45)'):(props.darkMode ? darkTheme.itemBackground:'rgba(216, 255, 235, 0.45)')};
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
    const { darkMode} = useTasksContext()|| {};
    return (
        <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
        <Container title={props.title} width={props.width} darkMode={darkMode}>
            <Contents>{props.title}</Contents>
            <Contents>{props.count}</Contents>
        </Container>
        </ThemeProvider>
    )
};

export default Box;