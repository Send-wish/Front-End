import React, {useState, useEffect, useRef, useCallback} from 'react';

import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {theme} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Linking} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

import {View, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import ProfileImage from '../components/Friends/ProfileImage';
import FriendImage from '../components/Friends/FriendImage';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
`;

const ProfileContainder = styled.View`
flex: 1;
flex-direction: column;
background-color: ${({theme}) => theme.subBackground};
padding-left: 20px;
padding-right: 20px;
padding-top: 25px;
border-top-left-radius: 30px;
border-top-right-radius: 30px;
border-width: 1px;
border-bottom-color:${({theme}) => theme.tintColorGreen};
`;

const ListContainder = styled.View`
flex: 4;
flex-direction: column;
background-color: ${({theme}) => theme.subBackground};
padding-left: 20px;
padding-right: 20px;
padding-top: 25px;
/* border-color: white; */
border-width: 1px;
`;

const StyledText = styled.Text`
align-items: flex-start;
width: 100%;
height: 20px;
margin-bottom: 10px;
line-height: 20px;
color: ${({theme}) =>theme.basicText};
`;

const Friends = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Container insets={insets}>
      <ProfileContainder>
        <ProfileImage nickName={"유수민"} image={src="data:image/png;base64,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 "}>

        </ProfileImage>
      </ProfileContainder>
      <ListContainder>
      <ScrollView>
        <FriendImage></FriendImage>
        <StyledText>유수민 바보멍청이</StyledText>
      </ScrollView>
      </ListContainder>
    </Container>
  );
};

export default Friends;
