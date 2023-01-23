import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  /* flex: 1; */
  background-color: ${({theme}) => theme.tintColorGreen};
  height: 12%;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 200%;
  padding: 5px;
  margin-top: 3%;
`;

const Title = styled.Text`
  font-size: 18px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const AddButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default AddButton;