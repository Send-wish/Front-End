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
  TouchableOpacity,
  findNodeHandle,
  NativeModules,
  TextInput,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import {Text, View} from 'react-native';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import * as encoding from 'text-encoding';
import {useFocusEffect} from '@react-navigation/native';
import {
  RTCView,
  mediaDevices,
  useParticipant,
  MeetingProvider,
  MeetingConsumer,
} from '@videosdk.live/react-native-sdk';
import VideosdkRPK from '../../VideosdkRPK';

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

  const API_BASE_URL = 'https://api.videosdk.live/v2';
  const VIDEOSDK_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlYWEwZjM1Mi0zNWVkLTQ2OGUtYThjZS01MzBhZDIzZWNlZDEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY3NDMxMzQzMiwiZXhwIjoxNjc0OTE4MjMyfQ.5A3CfgRMvhuAGJPY7XK7FmjkbACOSPptopyidvnHK3Q';
  const API_AUTH_URL = process.env.REACT_APP_AUTH_URL;
  const [tracks, setTracks] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      mediaDevices
        .getUserMedia({audio: false, video: true})
        .then(stream => {
          setTracks(stream);
        })
        .catch(e => {
          console.log(e);
        });
    }, []),
  );

  const getToken = async () => {
    if (VIDEOSDK_TOKEN && API_AUTH_URL) {
      console.error(
        'Error: Provide only ONE PARAMETER - either Token or Auth API',
      );
    } else if (VIDEOSDK_TOKEN) {
      return VIDEOSDK_TOKEN;
    } else if (API_AUTH_URL) {
      const res = await fetch(`${API_AUTH_URL}/get-token`, {
        method: 'GET',
      });
      const {token} = await res.json();
      return token;
    } else {
      console.error('Error: ', Error('Please add a token or Auth Server URL'));
    }
  };

  const createMeeting = async ({token}) => {
    const url = `${API_BASE_URL}/rooms`;
    const options = {
      method: 'POST',
      headers: {Authorization: token, 'Content-Type': 'application/json'},
    };

    const {roomId} = await fetch(url, options)
      .then(response => response.json())
      .catch(error => console.error('error', error));

    return roomId;
  };

  const disposeVideoTrack = () => {
    setTracks(stream => {
      stream?.getTracks().forEach(track => {
        track.enabled = false;
        return track;
      });
    });
  };

  const validateMeeting = async ({meetingId, token}) => {
    const url = `${API_BASE_URL}/rooms/validate/${meetingId}`;

    const options = {
      method: 'GET',
      headers: {Authorization: token},
    };

    const result = await fetch(url, options)
      .then(response => response.json()) //result will have meeting id
      .catch(error => console.error('error', error));

    console.log('*********result is : ', result);
    return result ? result.roomId === meetingId : false;
  };

  const [liveRoomId, setLiveRoomId] = useState('');
  const [typedRoomId, setTypedRoomId] = useState('');

  const _makeRoom = async () => {
    const token = await getToken();
    console.log('token: ', token);
    let meetingId = await createMeeting({token: token});
    console.log('meetingId: ', meetingId);
    setLiveRoomId(meetingId);
    disposeVideoTrack();
  };

  const _participateRoom = async () => {
    const token = await getToken();
    let valid = await validateMeeting({
      token: token,
      meetingId: typedRoomId.trim(),
    });
    if (valid) {
      disposeVideoTrack();
    }
  };

  const _sharing = () => {
    VideosdkRPK.startBroadcast();
  };

  console.log(typedRoomId);
  return (
    <Container insets={insets}>
      <MeetingProvider>
        <MeetingConsumer>
          {()=>{
            return (


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
            <MiddleContainer
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={_makeRoom}>
                  <View
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      margin: 10,
                      height: 20,
                      width: 80,
                    }}>
                    <Text style={{color: 'white'}}>방 만들기</Text>
                    <Text style={{margin: 5, height: 20, width: 150}}>
                      {liveRoomId}
                    </Text>
                  </View>
                </TouchableOpacity>
    
                <TouchableOpacity onPress={_participateRoom}>
                  <View
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      margin: 10,
                      margin: 10,
                      height: 20,
                      width: 80,
                    }}>
                    <Text> 참여하기</Text>
                  </View>
                </TouchableOpacity>
                <TextInput
                  style={{width: 100, height: 20, backgroundColor: 'white'}}
                  onChangeText={text => setTypedRoomId(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={typedRoomId}
                />
              </View>
              <TouchableHighlight onPress={_sharing}>
                <View
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    margin: 10,
                    margin: 10,
                    height: 20,
                    width: 80,
                  }}>
                  <Text> 화면공유</Text>
                </View>
              </TouchableHighlight>
    
              <View style={{marginBottom: 20}} />
              <RTCView
                streamURL={tracks ? tracks.toURL() : ''}
                objectFit={'cover'}
                mirror={true}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 20,
                }}
              />
              <RTCView
                style={{flex: 1, backgroundColor: '#424242'}}
                // streamURL={new MediaStream([stream.track]).toURL()}
              />
            </MiddleContainer>
            <BottomContainer></BottomContainer>

            )
          }}
       
        </MeetingConsumer>
      </MeetingProvider>
    </Container>
  );
};

export default LiveChat;
