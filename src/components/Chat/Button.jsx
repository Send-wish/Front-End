import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({theme}) => theme.tintColorGreen};
  height: 60px;
  width: 360px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-top: 25px;
  margin-bottom : 400px;
`;

const Title = styled.Text`
  font-size: 22px;
  width: 100%;
  text-align: center;
  font-weight: bold;
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

export default memo(Button);