import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity, TouchableHighlight, View} from 'react-native';

const Container = styled.View`
  padding: 10px;
  margin: 40px 10px 10px 10px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 75px;
`;

const CollectionImage = styled.Image`
  background-color: ${({theme}) => theme.mainBackground};
  padding: 10px;
  margin: 10px 10px 10px 10px;
  border-width: 1px;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border-color: ${({theme}) => theme.basicText};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 30px;
`;

const CollectionCircle = ({onLongPress, friendName, image}) => {
  return (
    <Container>
      <TouchableHighlight onLongPress={onLongPress}>
        <View>
        <Row>
        <CollectionImage source={{uri: image}} value={friendName}/>
        </Row>
        <Title>{friendName}</Title>
        </View>
      </TouchableHighlight>
    </Container>
  );
};

export default CollectionCircle;