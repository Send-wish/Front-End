import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  margin: 10px 0;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

const ItemBox = ({onPress, disabled}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container></Container>
    </TouchableOpacity>
  );
};

export default ItemBox;
