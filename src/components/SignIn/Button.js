import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../theme';
const Container = styled.View`
  background-color: ${({theme}) => theme.tintColorPink};
  height: 60px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-top: 40px;
  margin-bottom :10px;
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
    <View>
      <TouchableOpacity onPress={onPress}>
        <Container>
          <Title>{title}</Title>
        </Container>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
