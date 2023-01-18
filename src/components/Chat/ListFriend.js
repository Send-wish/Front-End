import React from 'react';
import styled from 'styled-components/native';
import ShareIcon from './ShareIcon';
import DeleteIcon from './DeleteIcon';
import {theme} from '../theme';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Container = styled.View`
  height: 70px;
  width: 370px;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const CollectionTitle = styled.Text`
  color: ${({theme}) => theme.basicText};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
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
  border-radius: 17px;
`;

const CollectionCircleCollectionImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  width: 50px;
  height: 50px;
  border-radius: 17px;
  border-color: ${({theme}) => theme.basicText};
`;

const CollectionCircleRow = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const CollectionCircleTitle = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
  width: 80px;
`;

const CollectionCircle = ({onLongPress, firstDefaultImage}) => {
  return (
    <CollectionCircleContainer>
      <TouchableHighlight onLongPress={onLongPress}>
        <View>
          <CollectionCircleRow>
            <CollectionCircleCollectionImage
              source={{uri: firstDefaultImage}}
            />
          </CollectionCircleRow>
        </View>
      </TouchableHighlight>
    </CollectionCircleContainer>
  );
};

const ListFriend = ({
  firstDefaultImage,
  createAt,
  message,
  sender,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <View
          style={{
            width: '15%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CollectionCircle firstDefaultImage={firstDefaultImage} />
        </View>

        <View
          style={{
            width: '65%',
            height: '100%',
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <CollectionTitle>{title}</CollectionTitle>
          <LastMessage>
            {message}
            {'  '}({sender}님이 보냄)
          </LastMessage>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '20%',
            justifyContent: 'center',
            alignContent: 'flex-start',
            height: '100%',
            paddingTop: 20,
          }}>
          <Time>{createAt}</Time>
        </View>
      </Container>
    </TouchableOpacity>
  );
};

export default ListFriend;
