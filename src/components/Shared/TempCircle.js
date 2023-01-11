import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity, TouchableHighlight, View} from 'react-native';
import theme from '../../theme';

const Container = styled.View`
  margin: 20px 10px 10px 10px;
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
  font-size: 15px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 30px;
`;

const TempCircle = ({onLongPress, frName, image}) => {
  return (
    <Container>
      <TouchableHighlight onLongPress={onLongPress}>
        <View>
        <Row>
        <CollectionImage source={{uri: image}} value={frName}/>
        </Row>
        <Title>{frName}</Title>
        </View>
      </TouchableHighlight>
    </Container>
  );
};

export default TempCircle;