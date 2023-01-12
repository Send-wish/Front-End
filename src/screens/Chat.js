// 친구추가,삭제=Button /  친구목록 불러오기 / 랜더링 틀
// nickName 랜더링시 받아오고 친구 목록 요청

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from 'react';
import {View, ScrollView, Linking, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Input,
  ProfileImage,
  ListFriend,
  AddIcon,
  ShareIcon,
  DeleteIcon,
  CollectionCircle,
  Button,
  AddCollectionCircle,
} from '../components/Chat';
import {theme} from '../theme';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

import {useIsFocused} from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
`;

const UpperContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 0 5px;
`;
const BottomContainer = styled.View`
  flex: 4;
  flex-direction: row;
  background-color: ${({theme}) => theme.subBackground};
  padding: 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: 15%;
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

const TintPinkSubTitle = styled.Text`
  margin-top: 7px;
  font-size: 14px;
  color: ${({theme}) => theme.tintColorPink};
`;

const ModalView = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  justify-content: center;
  align-items: center;
  opacity: 0.98;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Chat = (props) => {
  const insets = useSafeAreaInsets();
  const [frName, setFrName] = useState('');
  const [friends, setFriends] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const isFocused = useIsFocused(); // 스크린 이동시 포커싱 및 useEffect 실행
  const nickName = props.route.params.params.nickName;

  console.log('chat screen nickname check!!!!!!!',nickName);

  // const nickName = props.route.params; 이 상황이면 아래와같음
  // console.log('passed from main param',nickName);
  // {"params": {"nickName": "giyoun"}, "screen": "Main"}
  // console.log('passed from main param',nickName.params);
  // //{"nickName": "giyoun"}
  // console.log('passed from main param',nickName.params.nickName);
  // giyoun

  useEffect(() => {
    if (isFocused) console.log('Chat Focused');
    _getFriends();
  }, [isFocused]);
  // 요청 서버통신 완료
  // 친구 추가하기 > 친구리스트 리랜더링

  const _addFriends = async () => {
    setVisibleModal(false)
    console.log('nickname check!!!!', nickName);
    try {
      // 아직 안열림
      await fetch('https://api.sendwish.link:8081/friend', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          memberNickname: nickName,
          addMemberNickname: frName,
        }),
      })
        .then(response => {
          // console.log('errorcheck!!response addfriend: ', response);
          if (!response.ok) {
            // throw new Error(`${response.status} 에러발생`);
            throw new Error('이미 등록된 친구이거나 없는 사용자입니다 :)');
          }
          return response.json();
        })
        .then(json => console.log('from server data check', json))
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
      fetch(`https://api.sendwish.link:8081/friend/${nickName}`, {
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
      fetch('https://api.sendwish.link:8081/friend', {
        method: 'DELETE',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          nickname: nickName,
          friendNickname:frName,
      })
      })
        .then(response => {
          console.log('errorcheck!!response: ', response);
          if (!response.ok) {
            // throw new Error(`${response.status} 에러발생`);
            throw new Error('등록되지 않은 친구입니다 :)');
          }
          _getFriends();
          return 
          // return response.json();
        })
        // .then(data => {
        //   console.log(data);
        // })
        // .then(result => {
        //   console.log('result', result);
        //   _getFriends();
        // });
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
      <Modal animationType="slide" transparent={true} visible={visibleModal}>
        <ModalView insets={insets}>
          <StyledTouchableOpacity
            onPress={() => setVisibleModal(false)}
            style={{marginLeft: 5}}>
            <Ionic name="chevron-back" size={25} color={theme.basicText} />
          </StyledTouchableOpacity>
          <KeyboardAwareScrollView extraScrollHeight={200}>
            <StyledTouchableOpacity
              onPress={() => setVisibleModal(false)}></StyledTouchableOpacity>
            <View style={{marginTop: 60}} />
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
              }}>
              <View style={{width: 330}}>
                <Title style={{marginBottom: 10}}>친구 등록하기</Title>
                <Title>추가할 친구의 이름을 입력해주세요.</Title>
                <TintPinkSubTitle>
                  추가할 친구의 이름을 입력해주세요.
                </TintPinkSubTitle>
              </View>
            </View>
            <Input
              // ref={refFrName}
              value={frName}
              onChangeText={setFrName}
              onBlur={() => setFrName(frName)}
              maxLength={20}
              onSubmitEditing={() => {
                _addFriends();
              }}
              placeholder="친구 닉네임"
              returnKeyType="done"
            />
            <Button title="친구 등록하기" onPress={() => _addFriends()} />
            <View style={{marginBottom: 20}} />
          </KeyboardAwareScrollView>
        </ModalView>
      </Modal>
      <UpperContainer>
        <Row>
          <Column>
            <Title style={{marginTop: 30}}>
              <Title style={{fontSize: 27, color: theme.tintColorPink}}>
                {nickName + ' '}
              </Title>
              님의 친구 목록
            </Title>
          </Column>
        </Row>
        <Row>
          <View style={{height: 150}}>
            <ScrollView horizontal>
              {friends.reverse().map(friend => (
                <CollectionCircle
                  key={friend?.friend_id}
                  frName={friend?.friend_nickname}
                  onLongPress={() =>  _deleteFriend()}
                  activeOpacity={0.6}
                />
              ))}

              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color={theme.subText}
                style={{marginTop: 45, marginLeft: 10}}
              />
              <AddCollectionCircle
                onPress={() => setVisibleModal(true)}
                title="친구 추가"></AddCollectionCircle>
            </ScrollView>
          </View>
        </Row>
      </UpperContainer>

      <BottomContainer>
        <ScrollView>
          <Column>
            <SpackBetweenRow>
              <View style={{marginBottom: 10}}>
                <Title>채팅 목록</Title>
                <SubTitle>당신의 wish item 을 공유해보세요 !</SubTitle>
              </View>
            </SpackBetweenRow>
          </Column>
          <ListFriend friendName={'채팅창'} />
          <FlexRow></FlexRow>
        </ScrollView>
      </BottomContainer>
    </Container>
  );
};

export default Chat;
