import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ItemBox,
  CollectionCircle,
  AddCollectionCircle,
  SearchIcon,
  EditIcon,
  Input,
  Button,
} from '../components/Main';
import {theme} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal, AppState, TouchableHighlight} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import {Text, View} from 'react-native';
import Peer from 'react-native-peerjs';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import * as encoding from 'text-encoding';
import Video from 'react-native-video';
import {
  mediaDevices,
  MediaStream,
  MediaStreamConstraints,
  getDisplayMedia,
  RTCView,
} from 'react-native-webrtc';
import {set} from 'immer/dist/internal';


const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const UpperContainer = styled.View`
  height: 7%;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
`;

const MiddleContainer = styled.View`
  height: 80%;
  /* background-color: ${({theme}) => theme.mainBackground}; */
  background-color: blue;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-top: 15px;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  height: 500px;
  padding-top: 17px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 15px;
  /* background-color: ${({theme}) => theme.strongBackground}; */
  background-color: red;
  flex-wrap: wrap;
  align-items: center;
  margin-right: 15px;
  width: 100%;
`;

const Temp = styled.Image`
  width: 300px;
  height: 300px;
  background-color: yellow;
`;

const LiveChat = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const client = useRef({});
  const [newFriendPeerId, setNewFriendPeerId] = useState(false);

  const {
    shareCollectionId,
    nickName,
    shareCollectionName,
    chatRoomId,
    friendList,
    screen,
  } = route.params;

  const MyPeer = new Peer();

  const _connect = roomId => {
    client.current = new Client({
      brokerURL: 'wss://api.sendwish.link:8081/ws',
      connectHeaders: {},
      webSocketFactory: () => {
        return SockJS('https://api.sendwish.link:8081/ws');
      },
      debug: str => {
        console.log('STOMP: ' + str);
      },
      onConnect: () => {
        _subscribe(roomId);
        console.log('connected!');
      },
      onStompError: frame => {
        console.log('error occur' + frame.body);
      },
    });
    client.current.activate();
  };

  const _disconnect = () => {
    console.log('here is disconnect!');
    client.current.deactivate();
  };

  const _publish = roomId => {
    console.log('here is publish');
    if (!client.current.connected) {
      return;
    }
    client.current.publish({
      destination: '/pub/live',
      body: JSON.stringify({
        roomId: roomId,
        peerId: MyPeer._id,
      }),
    });
  };

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
    MyPeer.on('error', console.log);
    MyPeer.on('open', MyPeerId => {
      console.log('My peer open with ID', MyPeerId);
      _publish(chatRoomId);
    });
  }, []);

  const _subscribe = roomId => {
    client.current.subscribe('/sub/live/' + roomId, msg => {
      console.log('connected! and subscribed!');

      console.log('body is ', msg.body.peerId);
      let newPeerId = JSON.parse(msg.body).peerId;
      console.log('first newPeerId is ', newPeerId);

      if (newPeerId === MyPeer._id) {
        console.log('second my peer id is same');
        return;
      }

      console.log('passed newPeerId is : ', newPeerId);

        const conn = MyPeer.connect(newPeerId);
        conn.on('error', console.log);
        conn.on('open', () => {
          console.log('My peer has opened connection.');
          console.log('conn', conn);
          conn.on('data', data => console.log('Received from Others!', data));
          console.log('My peer sending data.');
          conn.send('Hello, this is the Bulksup!');
        });

      mediaDevices.enumerateDevices();

      mediaDevices
        .getUserMedia({audio: true, video: true})
        .then(stream => {
          const call = MyPeer.call(newPeerId, stream);
          console.log('***********************!!!!!!!!!!!!!!!!!!', stream);
          console.log('-------------------------');
          call.on('stream', remoteStream => {
            setRemoteStream(remoteStream);
            console.log('stream2', remoteStream);
          });
        })
        .catch(err => {
          console.log('Failed to get local stream', err);
        });

      // navigator.mediaDevices
      // .getUserMedia({audio: true, video: true})
      // .then(stream => {
      //   console.log('***********************!!!!!!!!!!!!!!!!!!');
      //   const call = MyPeer.call(newPeerId, stream);
      //   console.log('-------------------------');
      //   call.on('stream', remoteStream => {
      //     // Show stream in some video/canvas element.
      //     <Video>video.srcObject = remoteStream </Video>;
      //     console.log('remoteStream', remoteStream);
      //   });
      // })
      // .catch(err => {
      //   console.log('Failed to get local stream', err);
      // });
    });
  };

    MyPeer.on('connection', conn => {
      console.log('My peer has received connection.');
      conn.on('error', console.log);
      conn.on('open', () => {
        console.log('My peer has opened connection.');
        console.log('conn', conn);
        conn.on('data', data => console.log('Received from Other peer', data));
        console.log('My peer sending data.');
        conn.send('Hello, this is the Bulksup peer!');
      });
    });

  MyPeer.on('call', call => {
    mediaDevices
      .getUserMedia({video: true, audio: true})
      .then(stream => {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', remoteStream => {
          // Show stream in some <video> element.
          console.log('****************************');
          console.log('remoteStream', remoteStream);
          setRemoteStream(remoteStream);
        });
      })
      .catch(err => {
        console.error('Failed to get local stream', err);
      });
  });

  useEffect(() => {
    _connect(chatRoomId);
    return () => _disconnect();
  }, []);

  return (
    <Container insets={insets}>
      <UpperContainer>
        <Ionic
          name="chevron-back"
          size={25}
          color={theme.basicText}
          onPress={() =>
            navigation.navigate('ChatRoom', {
              shareCollectionId,
              shareCollectionName,
              nickName,
              friendList,
              chatRoomId,
              screen,
            })
          }
        />
      </UpperContainer>
      <MiddleContainer>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight onPress={{}}>
            <View style={{backgroundColor: 'red', color: 'white', margin: 10}}>
              <Text>라이브 시작하기</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={{}}>
            <View style={{backgroundColor: 'red', color: 'white', margin: 10}}>
              <Text>라이브 보기</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Temp />
        <RTCView streamURL={remoteStream} />
      </MiddleContainer>
      <BottomContainer></BottomContainer>
    </Container>
  );
};

export default LiveChat;