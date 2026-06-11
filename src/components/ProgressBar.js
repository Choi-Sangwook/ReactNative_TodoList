import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import * as Progress from 'react-native-progress';

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

const ProgressBar = ({ completed = 0, length = 0 }) => {
  const theme = useTheme();
  const progress = completed && length ? completed / length : 0;

  return (
    <BarView>
      <Bar>
        <Progress.Bar
          progress={progress}
          width={null}
          height={8}
          color={theme.toggleDone}
          borderColor={theme.toggleborderColor}
          unfilledColor={theme.toggleunfilledColor}
        />
      </Bar>
      <BarText>
        {completed}/{length}
      </BarText>
    </BarView>
  );
};

export default ProgressBar;
