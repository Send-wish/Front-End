import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  height: 80px;
  width: 130px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  padding: 5px;
  margin: 3px;
`;

const Title = styled.Text`
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const VoteButton = ({title, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container style= {style}>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default VoteButton;
