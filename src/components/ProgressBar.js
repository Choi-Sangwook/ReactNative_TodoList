import React from "react";
import styled from "styled-components/native";
import * as Progress from "react-native-progress";
 
const BarView = styled.View`
  width: 100%;
  padding: 0 15px;
  flex-direction: row;
  margin-top: 20px;
`;
 
const Bar = styled.View`
  margin: 10px 0;
  flex: 1;
`;
 
const BarText = styled.Text`
  width: 40px;
  text-align: center;
  font-size: 15px;
  padding: 3px 0 0 5px;
`;
 
const ProgressBar = props => {

  return (
    <BarView>
      <Bar>
        <Progress.Bar
          progress={props.completed / props.length}
          width={null}
          height={8}
          color={"#17D313"}
          borderColor="#00A3FF"
          unfilledColor="#00A3FF"
        />
      </Bar>
      <BarText>
        {props.completed}/{props.length}
      </BarText>
    </BarView>
  );
};
 
export default ProgressBar;