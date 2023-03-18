import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({theme}) => theme.tintColorGreen};
  height: 60px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-top: 3px;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

const Title = styled.Text`
  font-size: 22px;
  text-align: center;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const Button = ({title, onPress, disabled}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Container disabled ={disabled}>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default memo(Button);