import React, {useState, useEffect, useRef} from 'react';

import {Alert, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../theme';
import {Button, Input} from '../components/SignIn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {removeWhitespace} from '../utils';
import ErrorMessage from '../components/SignIn/ErrorMessage';

import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // 첫 로그인 시 async storage token 저장 + nickName 저장
  const storeData = async (nickName, accessToken) => {
    try{
      await AsyncStorage.setItem("userdata",JSON.stringify({
        nickName: nickName,
        accessToken: accessToken,
      }));
      console.log('토큰 스토리지 저장확인:', accessToken)
      console.log('닉네임 스토리지 저장확인', nickName)
      await AsyncStorage.getItem('userdata').then((value) => {
        console.log('getdata check in main!!!', value);
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

      if(value !== null){
        // console.log('storage date check userdata!!!', value);
        navigation.navigate('Navigation',{screen:'Main', params:{nickName: JSON.parse(value).nickName, accessToken: JSON.parse(value).accessToken}})
      }
    }
    catch(e){
      console.log(e);
    }
  }
  getData();

  // 토큰이 없으면 로그인 화면으로 가는지 확인용으로 storage clear test
  // const clearData = async () => {
  //   try{
  //     await AsyncStorage.clear();
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }
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
          console.log('===== result : ', result);
          storeData(nickName, result.tokenInfo.accessToken); // storage 토큰 저장
          console.log("checkt token", result.tokenInfo.accessToken);
          accessToken = result.tokenInfo.accessToken;
          console.log("store data check!!", nickName, accessToken);
          {
            if (result.error) {
              Alert.alert('아이디와 비밀번호를 확인해주세요 :)');
              console.log('===== result.error : ', result.error);
              throw new Error(`로그인 에러발생`);
            }
          }
        })
        // result  값이 유효하지 않으면 (토큰이 발급되지 않으면 알람 메시지 띄우고 로그인 화면 유지)
        .then(json => {
          // passName = {nickName}; // {nickName:UserNickName} object 형식으로 넘겨줌
          // navigation.navigate('Navigation', {
          //   screen: 'Main',
          //   params: passName,
          // });
          console.log(json);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      Alert.alert('로그인 실패', '아이디와 비밀번호를 확인해주세요.');
      console.log(error);
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
