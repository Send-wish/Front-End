import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styled from 'styled-components/native';

import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {theme} from '../theme';
import logo from '../assets/logo.png';
import Button from '../components/Main/Button';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
`;

const Title = styled.Text`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const Row = styled.View`
  flex-direction: row;
`;

const FlexRow = styled.View`
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  background-color: ${({theme}) => theme.basicText};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 20px;
`;

const TopArea = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  justify-content: center;
  align-items: center;
`;

const TopAreaText = styled.Text`
  font-size: 50px;
  font-weight: bold;
  color: ${({theme}) => theme.tintColorPink};
  text-align: center;
  margin: 15px;
  flex-wrap: wrap;
`;

const MainArea = styled.View`
  flex: 1.5;
  flex-direction: row;
  border-radius: 20px;
  background-color: ${({theme}) => theme.basicText};
`;


const BottomArea = styled.View`
  flex-direction: row;
  flex: 1.2;
  background-color: ${({theme}) => theme.mainBackground};
`;

const Start = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container insets={insets}>
      <TopArea>
        <TopAreaText>
          <TopAreaText>Sand </TopAreaText>
          <TopAreaText style={{color: theme.tintColorGreen}}>Wish</TopAreaText>
        </TopAreaText>
        <Logo source={logo} />
      </TopArea>
      <MainArea>
        
      </MainArea>
      <BottomArea>
        <Button title="Sign In" />
        <Button title="Sign Up" style={{color: theme.tintColorGreen}} />
      </BottomArea>
    </Container>
  );
};

export default Start;
