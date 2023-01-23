import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({theme}) => theme.tintColorGreen};
  height: 55px;
  width: 91%;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin: 10px;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  margin-bottom: 180px;
`;

const Title = styled.Text`
  font-size: 22px;
  text-align: center;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const ImageButton = ({title, onPress, disabled}) => {
  return (
    // <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Container disabled ={disabled}>
        <Title>{title}</Title>
      </Container>
    // </TouchableOpacity>
  );
};

export default ImageButton;