import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
const Contents = styled.Text`
    color: #fff;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
`;

const Container = styled.View`
    background: #416AD7;
    height: 60px;
    width: ${({ width }) => (width - 40)}px;
    border: 1px solid #9EC8FF;
    border-radius: 20px;
    padding: 10px 20px;
    margin:20px;
`;

const CustonButton = ({width }) => {
//   const _onPressOut = () => {
//     onPressOut(id);
//   };

  return (
    <TouchableOpacity>
        <Container width={width}>
            <Contents>등록</Contents>
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
