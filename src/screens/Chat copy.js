import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, ScrollView, Linking, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Input,
  ProfileImage,
  ListFriend,
  AddIcon,
  ShareIcon,
  DeleteIcon,
} from '../components/Chat';

import {theme} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useIsFocused} from '@react-navigation/native';
import { Button } from '../components/Friends';


const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  z-index: 100;
`;

const UpperContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 0 5px;
`;


const Row = styled.View`
  flex-direction: row;
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

const Main = ({navigation, route}) => {
  const insets = useSafeAreaInsets();

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
                <Title>등록할 친구의 이름을 입력해주세요.</Title>
                <TintPinkSubTitle>
                 등록할 친구의 이름을 입력해주세요.
                </TintPinkSubTitle>
              </View>
            </View>
            <Input
              // ref={refChangedColname}
              // value={collectionName}
              // onChangeText={setCollectionName}
              // onBlur={() => setCollectionName(collectionName)}
              // maxLength={20}
              // onSubmitEditing={() => {
              //   _madeCollection();
              // }}
              // placeholder="새 콜렉션 이름"
              // returnKeyType="done"
            />
            <Button
              title="친구 추가하기"
              // onPress={() => _madeCollection()}
            />
            <View style={{marginBottom: 20}} />
          </KeyboardAwareScrollView>
        </ModalView>
      </Modal>
      <UpperContainer>
        <Row>
          <Column>
            <Title style={{marginTop: 30}}>
              <Title style={{fontSize: 27, color: theme.tintColorGreen}}>
                {nickName + ' '}
              </Title>
              님의 친구 리스트
            </Title>
          </Column>
        </Row>
        <Row>
          <View style={{height: 150}}>
            <ScrollView horizontal>

            </ScrollView>
          </View>
        </Row>
      </UpperContainer>
    </Container>
  );
};

export default Main;
