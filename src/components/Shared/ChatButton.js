import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({theme}) => theme.tintColorGreen};
  height: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: -7px;
  margin-bottom : -10px;
  margin-left: 60px;
`;

const Title = styled.Text`
  font-size: 20px;
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