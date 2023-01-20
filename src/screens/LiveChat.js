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
import {Modal, AppState} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import {Text, View} from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LiveChat = ({navigation, route}) => {
  const insets = useSafeAreaInsets();

  const {
    shareCollectionId,
    nickName,
    shareCollectionName,
    chatRoomId,
    friendList,
  } = route.params;

  return (
    <Container insets={insets}>
      <View>
        <Text>Live Chat</Text>
      </View>
    </Container>
  );
};

export default LiveChat;
