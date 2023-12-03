import React from "react";
import { Calendar } from "react-native-calendars";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";


const Container = styled.View`
  width: ${({ width }) => (width - 60)}px;
`;

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

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