import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';

import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {SmallCircleBtn, ItemBox, CollectionCircle} from '../components/Main';
import {theme} from '../theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionic from 'react-native-vector-icons/Ionicons';

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

const RoundContainer = styled.View`
  flex: 6;
  flex-direction: row;
  background-color: ${({theme}) => theme.subBackground};
  padding: 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  margin: 0px 0px 30px 0px;
  position: relative;
`;

const Title = styled.Text`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const PersonName = styled.Text`
  margin: 10px 0px 10px 10px;
  font-size: 15px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const PencilIcon = styled.Text`
  color: ${({theme}) => theme.basicText};
  margin: 15px 15px 0px 0px;
`;

const PersonIcon = styled.Text`
  color: ${({theme}) => theme.basicText};
  margin: 0px 5px 0px 15px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const FlexRow = styled.View`
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
`;

const Collection = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container insets={insets}>
      <UpperContainer>
        <Row>
          <Title>CollectionName</Title>
          <PencilIcon>
            <FontAwesome5 name={'pencil-alt'} size={15} />
          </PencilIcon>
        </Row>
        <Row>
          <PersonIcon>
            <Ionic name={'person-add-outline'} size={30} />
          </PersonIcon>
          <PersonName>by 서울대 진섭킴</PersonName>
        </Row>
      </UpperContainer>
      <RoundContainer>
        <ScrollView>
          <Title>내 위시템 전체보기</Title>
          <FlexRow>
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
            <ItemBox />
          </FlexRow>
        </ScrollView>
      </RoundContainer>
    </Container>
  );
};

export default Collection;
