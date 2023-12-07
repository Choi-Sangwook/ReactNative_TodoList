import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import * as Progress from "react-native-progress";
import { useTasksContext } from '../TaskContext';
import {lightTheme, darkTheme} from '../theme'
 
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
  color: ${({ theme }) => theme.main};
`;
 
const ProgressBar = props => {
  const { darkMode, updateDarkMode} = useTasksContext();

  const completedValue = props.completed || 0;
  const lengthValue = props.length || 0;
  const progressValue = (completedValue && lengthValue) ? completedValue / lengthValue : 0;

  return (
    <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
    <BarView>
      <Bar>
        <Progress.Bar
          progress={progressValue}
          width={null}
          height={8}
          color={darkMode ? darkTheme.toggleDone:lightTheme.toggleDone}
          borderColor={darkMode ? darkTheme.toggleborderColor:lightTheme.toggleborderColor}
          unfilledColor={darkMode ? darkTheme.toggleunfilledColor:lightTheme.toggleunfilledColor}
        />
      </Bar>
      <BarText>
        {completedValue}/{lengthValue}
      </BarText>
    </BarView>
    </ThemeProvider>
  );
};
 
export default ProgressBar;