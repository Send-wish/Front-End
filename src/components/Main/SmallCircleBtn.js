import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  margin: 20px 20px 20px 20px;
  width: 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 7.5px;
`;

const CollectionCircle = ({onPress, disabled}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container />
    </TouchableOpacity>
  );
};

export default CollectionCircle;