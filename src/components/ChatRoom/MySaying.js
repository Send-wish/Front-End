import styled from 'styled-components';
import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';

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
const ProfilePhoto = styled.View`
  width: 50px;
  height: 50px;
  background-color: ${({theme}) => theme.basicText};
  border-radius: 20px;
`;

// 말풍선 파트
const SayingPart = styled.View`
  width: 60%;
  padding: 5px;
  align-items: flex-end;
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

const MySaying = ({}) => {
  return (
    <Container>
      <PartContainer>
        <EmptyPart />
        <SayingPart>
          <Name>벌크섭</Name>
          <Time>23:07</Time>
          <SayingBalloon>
            <Saying>
              내가 할말sagsag absolutea absolutea absoluteaasfafㄴㅁㅇㅎㄴㅁㅎㄴㅁㅎㄴㅁㅎㄴㅁㅎㅁㄴㅎㅁㄴaaㄴㄴㅁㅇㅎㅁㄴㅎㄴㅁㅎㅁㄴㅎㄴㅁㅎㅁㅎㅁ asgasgasg asgasgasg
              sagsagsag sagsagasgas
            </Saying>
          </SayingBalloon>
        </SayingPart>
        <ProfilePart>
          <ProfilePhoto />
        </ProfilePart>
      </PartContainer>
    </Container>
  );
};

export default MySaying;