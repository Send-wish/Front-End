import React, {useEffect, Component, useState, useRef} from 'react';
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
import {
  ItemBox,
  CollectionCircle,
  AddCollectionCircle,
  SearchIcon,
  EditIcon,
  Input,
  ProfileImage,
  Button,
} from '../components/Chat';
import {theme} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
`;

const UpperContainer = styled.View`
  height: 50px;
  flex-direction: row;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 0 5px;
  align-items: center;
  justify-content: center;
`;

const MiddleContainer = styled.View`
  height: 600px;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 20px;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  height: 200px;
  background-color: ${({theme}) => theme.darkBackground};
  padding: 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Row = styled.View`
  flex-direction: row;
  flex: 1;
  margin: 5px;
`;

const FlexableRow = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  background-color: pink;
`;

const SpackBetweenRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Column = styled.View`
  flex-direction: column;
  flex: 1;
  margin: 5px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const SubTitle = styled.Text`
  margin-top: 3px;
  font-size: 12px;
  color: ${({theme}) => theme.subText};
`;

const TintPinkSubTitle = styled.Text`
  margin-top: 7px;
  font-size: 14px;
  color: ${({theme}) => theme.tintColorPink};
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChatBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  background-color: ${({theme}) => theme.subBackground};
  border-radius: 10px;
  flex-wrap: wrap;
`;

const Chat = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [changedColName, setChangedColname] = useState('');
  const [collections, setCollections] = useState([]);

  return (
    <Container insets={insets}>
      <UpperContainer>
        <Title>벌크섭</Title>
      </UpperContainer>
      <MiddleContainer>
        <ScrollView style={{flexDirection: 'column'}}>
          <MiddleContainer>
            <ProfileImage />
          </MiddleContainer>
        </ScrollView>
      </MiddleContainer>
      <BottomContainer>
        <Row style={{justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 5,
            }}>
            <TouchableOpacity>
              <AntDesign name="plus" size={35} color={theme.lightBackground} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <ChatBar>
              <Input />
              <TouchableOpacity>
                <Ionicons
                  name="ios-arrow-up-circle-sharp"
                  size={35}
                  color={theme.tintColorPink}
                  style={{marginRight: 8, marginBottom: 5}}
                />
              </TouchableOpacity>
            </ChatBar>
          </View>
        </Row>
        <View style={{height: 120}} />
      </BottomContainer>
    </Container>
  );
};

export default Chat;
