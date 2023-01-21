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
import {
  Modal,
  AppState,
  TouchableHighlight,
  findNodeHandle,
  NativeModules,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import {Text, View} from 'react-native';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import * as encoding from 'text-encoding';

// import {createMeeting, token} from '../../api';

// function JoinScreen(props) {
//   return null;
// }

// function ControlsContainer() {
//   return null;
// }

// function MeetingView() {
//   return null;
// }

// import {
//   MeetingProvider,
//   useMeeting,
//   useParticipant,
//   MediaStream,
//   RTCView,
// } from '@videosdk.live/react-native-sdk';
// import VideosdkRPK from '../../VideosdkRPK';

// const {enableScreenShare, disableScreenShare} = useMeeting({});

// useEffect(() => {
//   VideosdkRPK.addListener('onScreenShare', event => {
//     if (event === 'START_BROADCAST') {
//       enableScreenShare();
//     } else if (event === 'STOP_BROADCAST') {
//       disableScreenShare();
//     }
//   });
//   return () => {
//     VideosdkRPK.removeSubscription('onScreenShare');
//   };
// }, []);

// const [meetingId, setMeetingId] = useState(null);

// const getMeetingId = async id => {
//   const meetingId = id == null ? await createMeeting({token}) : id;
//   setMeetingId(meetingId);
// };

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

  const [userStream, setUserStream] = useState();
  const [otherUserStream, setOtherUserStream] = useState();
  const [userDisplayStream, setUserDisplayStream] = useState();
  const userVideo = useRef({});
  const partnerVideo = useRef();
  const peerRef = useRef();
  const [otherUser, setOtherUser] = useState('');
  const senders = useRef([]);
  const screenCaptureView = useRef(null);
  // const isCaptured = useIsCaptured ();

  const MyPeer = new Peer(undefined, {
    secure: false,
    debug: 1,
  });

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

  // useEffect(() => {
  //   MyPeer.on('error', console.log);
  //   MyPeer.on('open', MyPeerId => {
  //     console.log('My peer open with ID', MyPeerId);
  //     _publish(chatRoomId);
  //   });
  // }, []);

  // const _subscribe = roomId => {
  //   client.current.subscribe('/sub/live/' + roomId, msg => {
  //     console.log('connected! and subscribed!');

      let newPeerId = JSON.parse(msg.body).peerId;
      console.log('newPeerId is ', newPeerId);

      if (newPeerId === MyPeer._id) {
        console.log('my peer id is same');
        return;
      }

      setOtherUser(newPeerId);
      console.log('otherUser is ', otherUser);
      console.log('passed newPeerId is : ', newPeerId);

  // 내 화면 공유해주기
  const _pressVideo = () => {
    let videoSourceId;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log('sourceInfos is : ', sourceInfos);
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          (sourceInfo.kind === 'videoinput' &&
            sourceInfo.facing === 'environment') ||
          sourceInfo.facing === 'environment'
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
    });
    mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          mandatory: {
            minWidth: 500,
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: 'user',
          optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
        },
      })
      .then(stream => {
        setUserStream(stream);
        console.log('*******userStream is : ', userStream);
        console.log('otherUser is :', otherUser);
        otherUser ? MyPeer.call(otherUser, stream) : null;
      });
  };

  // 쉐어화면 공유해주기
  const _pressShare = () => {
    console.log('<1>');
    const reactTag = findNodeHandle(screenCaptureView.current);
    console.log('<2>');
    NativeModules.ScreenCapturePickerViewManager.show(reactTag);
    console.log('<3>');
    mediaDevices.getDisplayMedia({video: true}).then(stream => {
      console.log('<4>');
      setUserDisplayStream(stream);
      console.log('*******userDisplayStream is : ', userDisplayStream);
      otherUser ? MyPeer.call(otherUser, stream) : null;
    });
  };

  
  MyPeer.on('call', call => {
    (() => {
      console.log('MyPeer.on');
      call.send('Hi! I got your stream well :) '); // Answer the call with an A/V stream.
      call.on('stream', remoteStream => {
        // Show stream in some <video> element.
        console.log('remoteStream', remoteStream);
        setUserDisplayStream(remoteStream);
      });
    }).catch(err => {
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
        <>
          <TouchableOpacity
            onPress={() => {
              // Calling startBroadcast from iOS Native Module
              VideosdkRPK.startBroadcast();
            }}>
            <Text> Start Screen Share </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              disableScreenShare();
            }}>
            <Text> Stop Screen Share </Text>
          </TouchableOpacity>
        </>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight onPress={_pressVideo}>
            <View style={{backgroundColor: 'red', color: 'white', margin: 10}}>
              <Text>영상</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={_pressShare}>
            <View style={{backgroundColor: 'red', color: 'white', margin: 10}}>
              <Text>화면공유</Text>
            </View>
          </TouchableHighlight>
        </View>
        <RTCView
          streamURL={userStream?.toURL()}
          style={{width: 200, height: 200, margin: 10}}
        />
        <ScreenCapturePickerView ref={screenCaptureView} />
        <RTCView
          streamURL={userDisplayStream?.toURL()}
          style={{width: 200, height: 200, margin: 10}}
        />
      </MiddleContainer>
      <BottomContainer></BottomContainer>
    </Container>
  );
};

export default LiveChat;
