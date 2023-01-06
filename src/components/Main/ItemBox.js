import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  margin: 10px 10px 10px 10px;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 75px;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

const ItemBox = ({onPress, disabled}) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}></TouchableOpacity>
    </Container>
  );
};

export default ItemBox;