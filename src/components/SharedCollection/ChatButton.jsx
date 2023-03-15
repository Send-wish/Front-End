import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({theme}) => theme.tintColorPink};
  height: 36px;
  width: 95%;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-bottom : -10px;
  margin-left: 15px;
`;

const Title = styled.Text`
  font-size: 18px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  margin: 0px 5px 0px 5px;
  color: ${({theme}) => theme.basicText};
`;

const ChatButton = ({title, buttonStyle, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container style={buttonStyle}>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default ChatButton;