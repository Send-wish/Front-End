import styled from 'styled-components';
import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';

const Container = styled.View`
  padding: 10px;
  margin: 38px 10px 10px 10px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 75px;
`;

const CollectionImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  margin: 7px 10px 10px 10px;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border-color: ${({theme}) => theme.line};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: ${({theme}) => theme.mainBackground};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 30px;
  margin-top: 0px;
`;

const CollectionCircle = ({onPress, frName, image}) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <CollectionImage source={{uri: image}} />
        <Row>
          <Title>{frName}</Title>
        </Row>
      </TouchableOpacity>
    </Container>
  );
};

export default memo(CollectionCircle);