import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import styled from 'styled-components/native';


import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {SmallCircleBtn, ItemBox, CollectionCircle} from '../components/Main';
import {theme} from '../theme';

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
  flex: 2;
  flex-direction: row;
  background-color: ${({theme}) => theme.subBackground};
  padding: 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Column = styled.View`
  flex-direction: column;
`;

const Title = styled.Text`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const Main = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container insets={insets}>
      <UpperContainer>
        <Row>
          <Title>나의 콜렉션</Title>
          <SmallCircleBtn />
        </Row>
        <Row>
          <ItemBox />
          <ItemBox />
          <ItemBox />
          <ItemBox />
          <ItemBox />
        </Row>
      </UpperContainer>
      <BottomContainer>
        {/* <BottomContainer> */}
        <ScrollView>
          <Title>내 위시템 전체보기</Title>
        </ScrollView>
        {/* </BottomContainer> */}
      </BottomContainer>
    </Container>
  );
};

export default Main;