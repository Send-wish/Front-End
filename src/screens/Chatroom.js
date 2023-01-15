import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, ScrollView, Linking, Text} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import {Input, MySaying, OthersSaying} from '../components/ChatRoom';
import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import * as encoding from 'text-encoding';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  flex-wrap: wrap;
  justify-content: center;
`;

const UpperContainer = styled.View`
  flex : 1
  align-items:center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 10
`;

const MiddleContainer = styled.View`
  flex: 7;
  width: 100%;
  background-color: ${({theme}) => theme.mainBackground};
  flex-wrap: wrap;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 1px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${({theme}) => theme.strongBackground};
  flex-wrap: wrap;
  align-items: center;
`;

const Temp = styled.View`
  height: 93%;
  width : 100%
  background-color: ${({theme}) => theme.strongBackground};
  flex-wrap: wrap;
  align-items: center;
`;

const MainTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.tintColorGreen};
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.subBackground};
  padding-left: 10px;
  padding-right: 6px;
  border-radius: 50px;
  height: 60%;
  width: 100%;
`;

const SendIcon = styled.View`
  width: 42px;
  height: 42px;
  background-color: ${({theme}) => theme.tintColorPink};
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const stompConfig = {
  brokerURL: 'ws://localhost:8080/ws/chat',
  debug: str => {
    console.log('STMOP: ' + str);
  },
  onConnect: frame => {
    console.log('connected');
    const subscription = stompClient.subscribe('/topic/chat/room/1', msg => {
      console.log(JSON.parse(msg.body));
    });
  },
  onStompError: frame => {
    console.log('error occur' + frame.body);
  },
};
let stompClient = null;

const webSocket = roomId => {
  console.log(roomId);
  stompClient = new Client({
    brokerURL: 'wss://api.sendwish.link:8081/ws',
    connectHeaders: {},
    webSocketFactory: () => {
      return SockJS('https://api.sendwish.link:8081/ws');
    },
    debug: str => {
      console.log('STOMP: ' + str);
    },
    onConnect: function (frame) {
      console.log('connected');
      stompClient.subscribe('/sub/chat/' + roomId, msg => {
        console.log(JSON.parse(msg.body));
      });
      if (!stompClient.connected) {
        return;
      }
      stompClient.publish({
        destination: '/pub/chat',
        body: JSON.stringify({
          roomId: roomId,
          sender: 'hcs4125',
          message: 'test',
          type: 'TALK',
        }),
      });
    },
    onStompError: frame => {
      console.log('error occur' + frame.body);
    },
  });
  stompClient.activate();

  return stompClient;
};

const ChatRoom = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [chat, setChat] = useState([]);
  console.log('params are', route.params);
  const {shareCollectionId, shareCollectionName, nickName, friendList} =
    route.params;
    /* console.log('공유 컬렉션별 친구 목록',friendList) */

  return (
    <Container insets={insets}>
      <UpperContainer>
        <Ionic name="chevron-back" size={25} color={theme.basicText} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
          }}>
          <MainTitle>bulksup</MainTitle>
        </View>
        <Feather
          name="menu"
          size={30}
          style={{
            color: theme.basicText,
          }}
        />
      </UpperContainer>
      <Temp>
        <MiddleContainer>
          <MySaying />
          <OthersSaying />
        </MiddleContainer>
        <BottomContainer>
          <InputContainer>
            <Input />
            <SendIcon>
              <Feather
                name="arrow-up"
                size={30}
                style={{
                  color: theme.mainBackground,
                }}
              />
            </SendIcon>
          </InputContainer>
        </BottomContainer>
      </Temp>
    </Container>
  );
};

export default ChatRoom;
