import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Input,
  ListFriend,
  CollectionCircle,
  Button,
  AddCollectionCircle,
} from '../components/Chat';
import {theme} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import EventSource from 'react-native-sse';

import {useQuery} from 'react-query';
import _getFriends from '../ReactQuery/useQuery/getFriends';
import _getChatList from '../ReactQuery/useQuery/getChatList';
import { UserContext } from '../../App';

const Item = ({
  item: {chatRoomId, lastMessage, collection, friends},
  onPress,
}) => {
  const sender = lastMessage?.sender;
  const message = lastMessage?.message;
  const createAt = lastMessage?.createAt;
  const shareCollectionId = collection?.collectionId;
  const shareCollectionTitle = collection?.title;
  const nickName = collection?.nickname;
  const firstDefaultImage = collection?.defaultImage[0];
  const secondDefaultImage = collection?.defaultImage[1];
  const thirdDefaultImage = collection?.defaultImage[2];
  const fourthDefaultImage = collection?.defaultImage[3];

  let friendList = [];
  for (let i = 0; i < friends.length; i++) {
    friendList.push(friends[i].friend_nickname);
  }

  const _onPress = () => {
    onPress(
      shareCollectionId,
      shareCollectionTitle,
      nickName,
      friendList,
      chatRoomId,
    );
  };

  if (lastMessage) {
    if (createAt) {
      const sentTime = new Date(createAt) / 1000;
      const currentTime = new Date() / 1000;
      const timeGap = currentTime - sentTime;

      let gap;
      if (timeGap < 60) {
        gap = '방금 전';
      }
      if (timeGap > 60 && timeGap < 3600) {
        gap = Math.round(timeGap / 60) + '분 전';
      }
      if (timeGap > 3600 && timeGap < 86400) {
        gap = Math.round(timeGap / 3600) + '시간 전';
      }
      if (timeGap > 86400 && timeGap < 604800) {
        gap = Math.round(timeGap / 86400) + '일 전';
      }

      return (
        <ListFriend
          chatRoomId={chatRoomId}
          firstDefaultImage={firstDefaultImage}
          createAt={gap}
          message={message}
          sender={sender}
          title={shareCollectionTitle}
          onPress={_onPress}
        />
      );
    }
  }
};

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  align-items: center;
  justify-items: center;
  align-content: center;
`;

const UpperContainer = styled.View`
  height: 10%;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 0 5px;
`;
const MiddleContainer = styled.View`
  height: 13%;
  width: 94%;
  margin-left: 11px;
  margin-right: 11px;
  margin-bottom: 24px;
  background-color: ${({theme}) => theme.lightBackground};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const BottomContainer = styled.View`
  height: 100%;
  background-color: ${({theme}) => theme.mainBackground};
  justify-content: flex-start;
  align-items: center;
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
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Chat = ({route, navigation}) => {
  const nick = useContext(UserContext);
  const nickName = nick.nick;
  // const nickName = route.params.params.nickName;
  let flatListRef;
  const insets = useSafeAreaInsets();
  const [frName, setFrName] = useState('');
  const [friends, setFriends] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const isFocused = useIsFocused(); // 스크린 이동시 포커싱 및 useEffect 실행
  const [chatRoomList, setChatRoomList] = useState([]);
  const [update, setUpdate] = useState('');
  const [img, setImg] = useState('');
  const [count, setCount] = useState();
  const [length, setLength] = useState(70);

  // 친구목록 렌더
  const {data: queryFriends} = useQuery(
    ['queryFriends', nickName],
    () => _getFriends(nickName),
    {staleTime: 0, refetchOnWindowFocus: false, retry: 0},
  );
  useEffect(() => {
    if (queryFriends) {
      setFriends(queryFriends);
    } else {
      return;
    }
  }, [queryFriends]);

  // 채팅 목록 렌더
  const {data: queryChatList} = useQuery(
    ['queryChatList', nickName],
    () => _getChatList(nickName),
    {staleTime: 0, refetchOnWindowFocus: false, retry: 0},
  );
  useEffect(() => {
    if (queryChatList) {
      setChatRoomList(queryChatList);
    } else {
      return;
    }
  }, [queryChatList]);
  // SSE 전체 데이터 전송 안될 시 Get 요청으로 데이터 받아오기
  // useEffect(() => {
  //   // 데이터 요청 함수
  //   _getChatList(nickName);
  //   console.log('테스트!!!');
  // }, [count]);

  // const sse = new EventSource('https://api.sendwish.link:8081/chat/connect');

  // // SSE 연결 요청
  // useEffect(() => {
  //   sse.addEventListener('open', event => {
  //     console.log('Open SSE connection!!!',event);
  //   });
  // },[]);
  // // 서버 데이터 수신

  // // 더미 데이터 확인
  // sse.addEventListener('connected', event => {
  //   // console.log('더미 값:', event);
  //   // console.log('더미 확인: ', event.data);
  //   // setCount(event);
  // });

  // // 데이터 수신 에러 체크
  // sse.addEventListener('error', event => {
  //   if (event.type === 'error') {
  //     console.error('Connection error:', event.message);
  //   } else if (event.type === 'exception') {
  //     console.error('Error:', event.message, event.error);
  //   }
  // });

  // // SSE 연결 종료
  // sse.addEventListener('close', event => {
  //   console.log('Close SSE connection.');
  // });

  useEffect(() => {
    // if (isFocused) console.log('Chat Focused');
    // _getFriends(nickName);
    // _getChatList(nickName);
  }, [isFocused]);

  // 친구 추가
  const _addFriends = async () => {
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
          if (!response.ok) {
            Alert.alert('이미 등록된 친구이거나 없는 사용자입니다 :(');
            throw new Error('이미 등록된 친구이거나 없는 사용자입니다 :)');
          }
          setVisibleModal(false);
          setFrName('');
          return response.json();
        })
        .catch(error => {
          console.error(error);
        })
        .then(() => _getFriends(nickName));
    } catch (e) {
      console.log('add friend fail');
    }
  };

  // 친구 삭제
  const _deleteFriend = async frName => {
    // 변수 감싸서 변형
    // cosnt name = encodeURI("bulksup")
    try {
      fetch('https://api.sendwish.link:8081/friend', {
        method: 'DELETE',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          nickname: nickName,
          friendNickname: frName,
        }),
      }).then(response => {
        console.log('errorcheck!!response: ', response);
        if (!response.ok) {
          Alert.alert('등록되지 않은 친구입니다 :(');
          throw new Error('등록되지 않은 친구입니다 :)');
        }
        _getFriends(nickName);
        return;
        // return response.json();
      });
    } catch (e) {
      console.log('friend delete fail', e);
    }
  };

  const screen = 'Chat';

  const _pressChat = (
    shareCollectionId,
    shareCollectionTitle,
    nickName,
    friendList,
    chatRoomId,
  ) => {
    navigation.navigate('ChatRoom', {
      shareCollectionId,
      shareCollectionTitle,
      nickName,
      friendList,
      chatRoomId,
      screen,
    });
  };

  useEffect(() => {
    setLength(chatRoomList.length * 70 + 80);
  }, [chatRoomList]);


  return (
    <Container insets={insets}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visibleModal}
        style={{flex: 1}}>
        <ModalView insets={insets}>
          <StyledTouchableOpacity
            onPress={() => setVisibleModal(false)}
            style={{marginLeft: 5, marginTop: 85}}>
            <Ionic name="chevron-back" size={25} color={theme.basicText} />
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            onPress={() => setVisibleModal(false)}></StyledTouchableOpacity>
          <View style={{marginTop: 60}} />
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}>
            <View style={{width: 320}}>
              <Title style={{marginBottom: 10}}>친구 등록하기</Title>
              <Title>추가할 친구의 이름을 입력해주세요.</Title>
              <TintPinkSubTitle>
                친구와 아이템을 공유하고 의사결정을 할 수 있어요 !
              </TintPinkSubTitle>
            </View>
          </View>
          <Input
            value={frName}
            onChangeText={setFrName}
            onBlur={() => setFrName(frName)}
            maxLength={12}
            onSubmitEditing={() => {
              _addFriends();
            }}
            placeholder="친구 닉네임"
            returnKeyType="done"
          />
          <Button title="친구 등록하기" onPress={() => _addFriends()} />
          <View style={{marginBottom: 20}} />
        </ModalView>
      </Modal>
      <UpperContainer>
        <Row>
          <Column style={{width: '95%'}}>
            <Title style={{marginTop: 30}}>
              <Title style={{fontSize: 27, color: theme.tintColorGreen}}>
                {nickName + ' '}
              </Title>
              님의 친구 목록
            </Title>
          </Column>
        </Row>
      </UpperContainer>
      <MiddleContainer>
        <Row>
          <View
            style={{
              flexDirection: 'row',
              height: 80,
              width: 350,
              alignItems: 'center',
              justifyContent: 'flex-start',
              alignContent: 'center',
              flexWrap: 'wrap',
              paddingTop: 10,
            }}>
            <ScrollView
              horizontal
              style={{height: 100, width: 200}}
              showsHorizontalScrollIndicator={false}>
              {friends.error
                ? null
                : friends.map(friend => (
                    <CollectionCircle
                      key={friend?.friend_id}
                      frName={friend?.friend_nickname}
                      onLongPress={() => _deleteFriend(friend?.friend_nickname)}
                      activeOpacity={0.6}
                      image={friend?.friend_img}
                    />
                  ))}
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color={theme.strongBackground}
                style={{marginTop: 30, marginLeft: 10}}
              />
              <AddCollectionCircle
                onPress={() => setVisibleModal(true)}
                title="친구 추가"></AddCollectionCircle>
            </ScrollView>
          </View>
        </Row>
      </MiddleContainer>
      <BottomContainer>
        <Column>
          <SpackBetweenRow>
            <View
              style={{
                paddingLeft: 10,
                marginBottom: 10,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
              }}>
              <Title>채팅 목록</Title>
              <SubTitle>아이템을 친구와 공유하고, 이야기를 나눠요 !</SubTitle>
            </View>
          </SpackBetweenRow>
        </Column>
        <Column style={{flexGrow: 1}}>
          <FlatList
            data={chatRoomList}
            renderItem={({item}) => <Item item={item} onPress={_pressChat} />}
            key={item => item['createAt']}
            ref={ref => (flatListRef = ref)}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.scrollToEnd()}
            extraData={{update}}
            contentContainerStyle={{flexGrow: 1, height: length}}
          />
        </Column>
      </BottomContainer>
    </Container>
  );
};

export default Chat;
