import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';

import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {theme} from '../theme';
import logo from '../assets/logo.png';
import { Button, Input } from '../components/Main';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
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
  flex: 1;
  flex-direction: row;
  border-radius: 20px;
  background-color: ${({theme}) => theme.mainBackground};
  justify-content: center;
  align-items: center;
`;

const BottomArea = styled.View`
  flex-direction: row;
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
`;

const SignIn = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const refPassword = useRef(null);

  useEffect(() => {
    setDisabled(!(nickName && password));
  }, [nickName, password]);

  const _handleNickNameChange = nickName => {
    setNickName(nickName);
  };

  const _handlePasswordChange = password => {
    setPassword(password);
  };

  const _handleSignInButtonPress = async () => {
    try {
      fetch('https://api.sendwish.link:8081/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberId: nickName,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(result => console.log('result', result)) //for debug
        .then(json => {
          if (json.resultCode === '200' && nickName !== undefined) {
            navigation.navigate('Main', nickName);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      Alert.alert('로그인 실패', '아이디와 비밀번호를 확인해주세요.');
      console.log(error);
    }
  };

  return (
    <Container insets={insets}>
      <TopArea>
        <TopAreaText>
          <TopAreaText>Send </TopAreaText>
          <TopAreaText style={{color: theme.tintColorGreen}}>Wish</TopAreaText>
        </TopAreaText>
        <Logo source={logo} />
      </TopArea>
      <KeyboardAwareScrollView
        extraScrollHeight={-100}
        keyboardShouldPersistTaps="handled">
        <Input
          label="아이디"
          placeholer="아이디"
          value={nickName}
          onChangeText={_handleNickNameChange}
          returnKeyType="next"
          onSubmitEditing={() => refPassword.current.focus()}
        />
        <MainArea>
          <Input
            label="비밀번호"
            placeholer="비밀번호"
            ref={refPassword}
            value={password}
            onChangeText={_handlePasswordChange}
            returnKeyType="done"
            onSubmitEditing={_handleSignInButtonPress}
            secureTextEntry
            isPassword={true}
          />
        </MainArea>
        <BottomArea>
          <Button
            title="Sign In"
            onPress={_handleSignInButtonPress}
            disabled={disabled}
          />
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('SignUp')}
            style={{color: theme.tintColorGreen}}
          />
        </BottomArea>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default SignIn;