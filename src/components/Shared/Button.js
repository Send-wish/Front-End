import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({theme}) => theme.tintColorGreen};
  height: 60px;
  width: 100%;
  margin-top: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const Title = styled.Text`
  font-size: 22px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const Button = ({title, buttonStyle, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container style={buttonStyle}>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default Button;
