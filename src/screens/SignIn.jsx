import React, {useState, useEffect, useRef, useContext, memo, useCallback} from 'react';

import {Alert, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../theme';
import {Button, Input, ErrorMessage} from '../components/SignIn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {removeWhitespace} from '../utils';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {UserContext} from '../../App';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
`;

const UpperContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;
const BottomContainer = styled.View`
  flex: 2;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 25px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const CenterRow = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const SignIn = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const refNickName = useRef(null);
  const refPassword = useRef(null);

  const {nick, setNick} = useContext(UserContext);

  // 첫 로그인 시 async storage token 저장 + nickName 저장
  const storeData = async (nickName, accessToken) => {
    try{
      await AsyncStorage.setItem("userdata",JSON.stringify({
        nickName: nickName,
        accessToken: accessToken,
      }));
      await AsyncStorage.getItem('userdata').then(() => {
        getData();
      })
    }
    catch(e){
      console.log(e);
    }
  }

  // 처음 로그인 하면 자동 로그인 되도록 token 체크 후 넘겨준다. (nickName 도 같이 넘겨줘야함)
   const getData = async () => {
    try{
      const value = await AsyncStorage.getItem('userdata')
      console.log(JSON.parse(value).nickName,'data check');
      setNick(JSON.parse(value).nickName);
      if(value !== null){
        navigation.navigate('Navigation',{screen:'Main', params:{nickName: JSON.parse(value).nickName, accessToken: JSON.parse(value).accessToken}})
      }
    }
    catch(e){
      console.log(e);
    }
  }
  getData();

  // 토큰이 없으면 로그인 화면으로 가는지 확인용으로 storage clear test
    // const clearData = async () => {await AsyncStorage.clear();}
    // clearData();

  useEffect(() => {
    setDisabled(!(nickName && password && !errorMessage));
  }, [nickName, password]);

  useEffect(() => {
    let error = '';
    if (!nickName) {
      error = '별명을 입력해주세요 :)';
    } else if (password.length < 6) {
      error = '비밀번호는 최소 6글자 이상이어야 해요 :)';
    }
    setErrorMessage(error);
  }, [nickName, password, errorMessage]);

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
          nickname: nickName,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(result => {
          storeData(nickName, result.tokenInfo.accessToken); // storage 토큰 저장
          accessToken = result.tokenInfo.accessToken;
          {
            if (result.error) {
              Alert.alert('아이디와 비밀번호를 확인해주세요 :)');
              throw new Error(`로그인 에러발생`);
            }
          }
        })
    } catch (e) {
      Alert.alert('로그인 실패', '아이디와 비밀번호를 확인해주세요.');
    }
  };

  const _handleSignUpBtn = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Container insets={insets}>
      <UpperContainer>
        <Title style={{marginTop: 30}}>간편한 소비, Sendwish</Title>
        <Row>
          <Title style={{marginTop: 10}}>
            <Title style={{color: theme.tintColorGreen}}>컬렉션</Title>에
            담아보세요!{' '}
          </Title>
        </Row>
      </UpperContainer>
      <BottomContainer>
        <KeyboardAwareScrollView
          extraScrollHeight={140}
          keyboardShouldPersistTaps="handled">
          <Input
            ref={refNickName}
            value={nickName}
            label="별명"
            placeholder="별명"
            returnKeyType="next"
            onChangeText={_handleNickNameChange}
            onBlur={() => setNickName(nickName.trim())}
            maxLength={12}
            onSubmitEditing={() => refPassword.current.focus()}
          />
          <Input
            ref={refPassword}
            label="비밀번호"
            placeholder="비밀번호"
            value={password}
            onChangeText={_handlePasswordChange}
            returnKeyType="done"
            onSubmitEditing={_handleSignInButtonPress}
            secureTextEntry
            isPassword={true}
            onBlur={() => setPassword(removeWhitespace(password))}
          />
          <ErrorMessage message={errorMessage} />
          <Button
            title="로그인"
            onPress={_handleSignInButtonPress}
            disabled={disabled}
          />
          <TouchableOpacity>
            <CenterRow>
              <Title
                style={{fontSize: 18, color: theme.subText}}
                onPress={_handleSignUpBtn}>
                회원가입하러 가기
              </Title>
            </CenterRow>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </BottomContainer>
    </Container>
  );
};

export default SignIn;
