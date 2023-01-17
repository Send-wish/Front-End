import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({theme}) => theme.tintColorPink};
  height: 60px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-top: 25px;
  margin-bottom : 200px;
`;

const Title = styled.Text`
  font-size: 22px;
  width: 100%;
  font-weight: bold;
  justify-items: center;
  align-items: center;
  color: ${({theme}) => theme.basicText};
`;

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default Button;