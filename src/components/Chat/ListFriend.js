import React from 'react';
import styled from 'styled-components/native';
import ShareIcon from './ShareIcon';
import DeleteIcon from './DeleteIcon';
import {theme} from '../theme';
import {View, TouchableHighlight} from 'react-native';

const Container = styled.View`
  height: 80px;
  border-radius: 15px;
  flex-direction: row;
  margin-left: 10px;
  margin-right: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const CollectionTitle = styled.Text`
  color: ${({theme}) => theme.basicText};
  font-size: 18px;
  font-weight: bold;
`;

const LastMessage = styled.Text`
  color: ${({theme}) => theme.subText};
  font-size: 14px;
  font-weight: bold;
`;

const CollectionCircleContainer = styled.View`
  padding: 5px;
  margin: 5px 5px 5px 5px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 17px;
`;

const CollectionCircleCollectionImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  margin: 10px 10px 10px 10px;
  border-width: 1px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 17px;
  border-color: ${({theme}) => theme.basicText};
`;

const CollectionCircleRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CollectionCircleTitle = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
`;

const CollectionCircle = ({onLongPress, frName, image}) => {
  return (
    <CollectionCircleContainer>
      <TouchableHighlight onLongPress={onLongPress}>
        <View>
          <CollectionCircleRow>
            <CollectionCircleCollectionImage
              source={{uri: image}}
              value={frName}
            />
          </CollectionCircleRow>
          <CollectionCircleTitle>{frName}</CollectionCircleTitle>
        </View>
      </TouchableHighlight>
    </CollectionCircleContainer>
  );
};

const ListFriend = ({friendName, onPress}) => {
  return (
    <Container style = {{backgroundColor : 'red'}}>
      <CollectionCircle />
      {/* <View>
        <CollectionTitle>{friendName}</CollectionTitle>
        <LastMessage>{friendName}</LastMessage>
      </View>
      <View style={{flexDirection: 'row'}}>
        <ShareIcon onPress={onPress} />
        <DeleteIcon onPress={onPress} />
      </View> */}
    </Container>
  );
};

export default ListFriend;
