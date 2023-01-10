
// 친구추가,삭제=Button /  친구목록 불러오기 / 랜더링 틀
// nickName 랜더링시 받아오고 친구 목록 요청

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from 'react';
import {View, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Input, ProfileImage, ListFriend, AddIcon, ShareIcon, DeleteIcon } from '../components/Chat';
import {theme} from '../theme';

// import {useIsFocused} from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
`;

const UpperContainer = styled.View`
  flex: 0.7;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 0 5px;
  flex-wrap: wrap;
`;
const MiddleContainer = styled.View`
  flex: 0.7;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 0 5px;
  flex-wrap: wrap;
`;
const BottomContainer = styled.View`
  flex: 5;
  flex-direction: row;
  background-color: ${({theme}) => theme.subBackground};
  padding: 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const SpackBetweenRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const FlexRow = styled.View`
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
`;

const Column = styled.View`
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const SubTitle = styled.Text`
  margin-top: 3px;
  font-size: 12px;
  color: ${({theme}) => theme.subText};
`;


const Friends = () => {

  const insets = useSafeAreaInsets();
  const [frName, setFrName] = useState('');
  const [friends, setFriends] = useState([]);

  // 요청 서버통신 완료
  // 친구 추가하기 > 친구리스트 리랜더링 
const _addFriends = async () => {
  try {
    // 아직 안열림
    await fetch('https://api.sendwish.link:8081/friend', {
      method: 'POST',
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({
        memberNickname: "giyoun",
        addMemberNickname: "기윤",
      }),
    })
      .then(response => {
        console.log('errorcheck!!response addfriend: ', response);
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        return response.json();
      })
      .then(json => console.log('from server data check',json))
      // .then(data => {
      //   console.log('add friend check', data);
      // })
      .catch(error => {
        console.error(error);
      })
      .then(() => _getFriends());
  } catch (e) {
    console.log('add friend fail');
  }
};

const _getFriends = async () => {
  try {
    // API 아직 안열림
    fetch('https://api.sendwish.link:8081/friend/giyoun', {
      method: 'GET',
      headers: {'Content-Type': `application/json`},
    })
      .then(response => {
        console.log('errorcheck!!response Get  friend: ', response);
        return response.json();
      })
      .then(data => {
        setFriends(data);
        console.log('get friends', data);
      });
  } catch (e) {
    console.log(e);
  }
};

// 친구 삭제하기 통신 완료
// 친구 삭제하기 > 친구리스트 리랜더링
const _deleteFriend = async () => {
  // 변수 감싸서 변형
  // cosnt name = encodeURI("bulksup")
  try {
    fetch('https://api.sendwish.link:8081/friend/giyoun/runner', {
      method: 'DELETE'
    })
      .then(response => {
        console.log('errorcheck!!response: ', response);
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .then(result => {
        console.log('result', result);
      });
  } catch (e) {
    console.log('friend delete fail', e);
  }
};
  // console.log(nickName);
  // const isFocused = useIsFocused(); // 스크린 이동시 포커싱 및 useEffect 실행

  // 화면이동시마다 랜더링 건들지 말것
  // useEffect(() => {
  //   console.log('친구목록 랜더링 완료')
  // }, [isFocused]);

  return (
    <Container insets={insets}>
      <UpperContainer>
        <Row>
          <Title
            style={{marginTop: 45, fontSize: 30, color: theme.tintColorPink}}>
            {'  ' + '유수민' + ' '}
            {/* {nickName + ' '} */}
          </Title>
          <Title style={{marginTop: 50, fontSize: 25}}>님의 친구 목록</Title>
        </Row>
        <Row>
          <View style={{height: 150}}></View>
        </Row>
      </UpperContainer>
      <MiddleContainer>
        {/* 입력 받은 값 인자로 추가하기 함수에 전달해서 받고 조회 랜더링 함수 호출 연동 */}
        <Input 
            value={frName}
            onChangeText={setFrName}
            onBlur={() => setFrName(frName)}
            maxLength={20}
            onSubmitEditing={() => {
              _addFriends();
            }}
            placeholder="추가할 친구 닉네임을 입력해주세요 :)"
            returnKeyType="done"/>
        <AddIcon onPress={()=> {_addFriends()}}/>
      </MiddleContainer>
      <BottomContainer>
        <ScrollView>
          <Column>
            <SpackBetweenRow>
              <View style={{marginBottom: 10}}>
                <Title>내 친구 목록 전체보기</Title>
                <SubTitle>당신의 wish item 을 공유해보세요 !</SubTitle>
              </View>
            </SpackBetweenRow>
          </Column>
          <ListFriend friendName={'뭐고!'} />
          <ListFriend friendName={'뭐고!'} />
          <ListFriend friendName={'뭐고!'} />
          <ListFriend friendName={'뭐고!'} />
          <ListFriend friendName={'뭐고!'} />

          {/* 공유하기 > 쉐어 컬렉션으로 Navigate / 삭제 > delete 버튼별로 다르게 설정해야하고 랜더링 뜨게 해야함 */}
          {/* {friends.reverse().map(friend => (
            <ListFriend
              key={friend?.nickname}
              friendName={item?.name}
              />
              ))}
              <ShareIcon onPress={()=> navigation.navigte('Main', {params:nickName })}/>
              <DeleteIcon /> */}
          <FlexRow></FlexRow>
        </ScrollView>
      </BottomContainer>
    </Container>
  );
};

export default Friends;
