import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  /* background-color: red; */
  height: 40px;
  width: 130px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  margin: 3px;
`;

const Title = styled.Text`
  font-size: 15px;
  text-align: left;
  font-weight: bold;
  color: ${({theme}) => theme.line};
`;

const Button = ({title, onPress,style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container style = {style}>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default Button;
