import styled from 'styled-components';
import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
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
  color: ${({theme}) => theme.subText}
  margin : 5px;
`;

// 텍스트
const Saying = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

// 말풍선
const SayingBalloon = styled.View`
  border-radius: 10px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 5px;
  margin-top: 5px;
  background-color: ${({theme}) => theme.subBackground};
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

const OthersSaying = ({sender, createAt, message, senderImg}) => {
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
          </SayingBalloon>
        </SayingPart>
        <EmptyPart />
      </PartContainer>
    </Container>
  );
};

export default OthersSaying;
