import React from "react";
import { Calendar } from "react-native-calendars";
import styled from "styled-components/native";


const Container = styled.View`
  width: ${({ width }) => (width - 60)}px;
`;
const CalendarView = (props) =>{
    return(
        <Container width={props.width}>
            <Calendar 
            borderBottomWidth = {props.width} 
            borderBottomColor="#000000"
            onDayPress={(day) => props.onDateSelect(day.dateString)}/>
        </Container>
    );
};

export default CalendarView;