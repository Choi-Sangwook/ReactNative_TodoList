import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
const Contents = styled.Text`
    color: #fff;
    text-align: center;
    font-size: ${props=>props.title==="등록"?'24px':'15px'};
    font-weight: 700;
`;

const Container = styled.View`
    background: ${props=>props.title==="등록"?'#416AD7':'#3E92FF'};
    height: ${props=>props.title==="등록"?'60px':'45px'};
    width: ${({ width }) => (width - 40)}px;
    border: 1px solid #9EC8FF;
    border-radius: 20px;
    padding: 10px 20px;
    margin:20px;
`;

const CustonButton = props => {
//   const _onPressOut = () => {
//     onPressOut(id);
//   };

  return (
    <TouchableOpacity onPressOut={props.onPress}>
        <Container width={props.width} title={props.title}>
            <Contents title={props.title}>{props.title}</Contents>
        </Container>
    </TouchableOpacity>
  );
};

CustonButton.defaultProps = {
  onPressOut: () => {},
};

// CustonButton.propTypes = {
//   type: PropTypes.oneOf(Object.values(images)).isRequired,
//   onPressOut: PropTypes.func,
//   id: PropTypes.string,
//   completed: PropTypes.bool,
// };

export default CustonButton;
