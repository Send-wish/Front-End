import React from 'react';
import styled from 'styled-components/native';
import ShareIcon from './ShareIcon';
import DeleteIcon from './DeleteIcon';
import {theme} from '../theme';
import {View, TouchableHighlight, ScrollView} from 'react-native';

const Container = styled.View`
  height: 70px;
  width: 370px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
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

const Time = styled.Text`
  color: ${({theme}) => theme.subText};
  font-size: 14px;
  font-weight: bold;
`;

const CollectionCircleContainer = styled.View`
  padding: 5px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 17px;
`;

const CollectionCircleCollectionImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  width: 50px;
  height: 50px;
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
        </View>
      </TouchableHighlight>
    </CollectionCircleContainer>
  );
};

const ListFriend = ({friendName, onPress}) => {
  return (
    <Container>
      <View
        style={{
          width: '15%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <CollectionCircle />
      </View>

      <View
        style={{
          width: '75%',
          height: '100%',
          justifyContent: 'center',
          paddingLeft: 10,
        }}>
        <CollectionTitle>{friendName}</CollectionTitle>
        <LastMessage>{friendName}</LastMessage>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '10%',
          justifyContent: 'center',
          alignContent: 'flex-start',
          height: '100%',
          paddingTop: 20,
        }}>
        <Time>시간</Time>
      </View>
    </Container>
  );
};

export default ListFriend;
