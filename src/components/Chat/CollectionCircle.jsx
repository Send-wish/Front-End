import styled from 'styled-components';
import React, {memo} from 'react';
import {TouchableOpacity, TouchableHighlight, View} from 'react-native';

const Container = styled.View`
  margin: 10px 10px 10px 10px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 75px;
`;

const CollectionImage = styled.Image`
  background-color: ${({theme}) => theme.strongBackground};
  padding: 10px;
  margin: 5px 5px 5px 5px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: ${({theme}) => theme.strongBackground};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
`;

const CollectionCircle = ({onLongPress, frName, image}) => {
  return (
    <Container>
      <TouchableHighlight onLongPress={onLongPress}>
        <View>
        <Row>
        <CollectionImage source={{uri : image? image : null}} value={frName}/>
        </Row>
        <Title>{frName}</Title>
        </View>
      </TouchableHighlight>
    </Container>
  );
};

export default memo(CollectionCircle);