import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  margin: 10px 0;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const CollectionCircle = ({onPress, disabled}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Container disabled={disabled} />
    </TouchableOpacity>
  );
};

export default CollectionCircle;