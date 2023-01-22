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

  return (
    <Container insets={insets}>
      <View>
        <Text> haha</Text>
      </View>
    </Container>
  );
};

export default LiveChat;