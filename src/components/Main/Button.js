import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({theme}) => theme.tintColorPink};
  height: 50px;
  width: 180px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  test-align: center;
  color: ${({theme}) => theme.basicText};
`;

const Button = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={{margin: 10, flex:1, justifyContent: "flex-start", alignItems: "center" }} >
    <Container >
        <Title>{title}</Title>
    </Container>
    </TouchableOpacity>
  );
};

export default Button;
