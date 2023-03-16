import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  /* flex: 1; */
  background-color: ${({theme}) => theme.tintColorGreen};
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  margin-top: 3%;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight : bold;
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

export default memo(AddButton);