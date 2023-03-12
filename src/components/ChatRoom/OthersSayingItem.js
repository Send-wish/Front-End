import styled from 'styled-components';
import React from 'react';
import {Text} from 'react-nativse';
import {TouchableOpacity, View, TouchableHighlight} from 'react-native';
import {theme} from '../../theme';

const Container = styled.View`
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const PartContainer = styled.View`
  width: 100%;
  /* background-color: greenyellow; */
  flex-wrap: wrap;
  flex-direction: row;
`;

// 프로필 사진 파트
const ProfilePart = styled.View`
  width: 15%;
  /* background-color: yellow; */
`;

// 프로필 사진
const ProfilePhoto = styled.Image`
  width: 50px;
  height: 50px;
  background-color: ${({theme}) => theme.basicText};
  border-radius: 20px;
`;

// 말풍선 파트
const SayingPart = styled.View`
  width: 60%;
  /* background-color: grey; */
  flex-wrap: wrap;
`;

// 이름
const Name = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${({theme}) => theme.subText};
  margin: 5px;
`;

// 텍스트
const Saying = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: ${({theme}) => theme.mainBackground};
`;

// 말풍선
const SayingBalloon = styled.View`
  border-radius: 20px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 5px;
  margin-top: 5px;
  background-color: ${({theme}) => theme.tintColorPastelPink};
`;

// 시간
const Time = styled.Text`
  margin-right: 5px;
  margin-left: 5px;
  font-size: 13px;
  color: ${({theme}) => theme.subText};
`;

// 빈공간 파트
const EmptyPart = styled.View`
  width: 25%;
`;

const ItemBoxContainer = styled.View`
  margin-top: 8px;
  width: 90px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const ItemBoxItemImage = styled.Image`
  background-color: ${({theme}) => theme.tintColorPink};
  padding: 10px;
  margin: 2px 2px 2px 2px;
  width: 85px;
  height: 85px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  flex-wrap: wrap;
  border-style: solid;
  border-width: 3px;
  border: ${({theme}) => theme.strongSubText};
`;

const ItemBoxTitle = styled.Text`
  margin: 1px;
  font-size: 9px;
  font-weight: bold;
  color: ${({theme}) => theme.strongSubText};
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  width: 80px;
  height: 25px;
  flex-wrap: wrap;
`;

const ItemBoxPrice = styled.Text`
  margin: 1px;
  font-size: 9px;
  font-weight: bold;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  color: ${({theme}) => theme.mainBackground};
  width: 60px;
`;

const ItemBoxSale = styled.Text`
  margin: 1px;
  font-size: 11px;
  font-weight: bold;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  color: ${({theme}) => theme.tintColorPink};
`;

const ItemBoxRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const ItemBox = ({onPress, onLongPress, name, imgUrl, price, originUrl}) => {
  const _onPress = () => {
    onPress(originUrl);
  };

  return (
    <View>
      <TouchableHighlight onPress={_onPress} onLongPress={onLongPress}>
        <ItemBoxContainer>
          <ItemBoxItemImage source={{uri: imgUrl}} />
          <ItemBoxRow>
            <ItemBoxSale>가격</ItemBoxSale>
            <ItemBoxPrice> {price}원 </ItemBoxPrice>
          </ItemBoxRow>
          <ItemBoxTitle>{name}</ItemBoxTitle>
        </ItemBoxContainer>
      </TouchableHighlight>
    </View>
  );
};

const OthersSaying = ({
  sender,
  createAt,
  message,
  onPress,
  onLongPress,
  name,
  imgUrl,
  price,
  originUrl,
  senderImg
}) => {
  return (
    <Container>
      <PartContainer>
        <ProfilePart>
          <ProfilePhoto source={{uri : senderImg}}/>
        </ProfilePart>
        <SayingPart>
          <Name>{sender}</Name>
          <Time>{createAt}</Time>
          <SayingBalloon>
            <Saying>{message}</Saying>
            <View
              style={{
                width: 160,
                marginTop: 20,
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <ItemBox
                onPress={onPress}
                onLongPress={onLongPress}
                name={name}
                imgUrl={imgUrl}
                price={price}
                originUrl={originUrl}
              />
            </View>
          </SayingBalloon>
        </SayingPart>
        <EmptyPart />
      </PartContainer>
    </Container>
  );
};

export default OthersSaying;
