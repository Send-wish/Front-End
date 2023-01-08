import React, {useState, useEffect, useRef, useContext} from 'react';
import {Alert, View, TouchableOpacity, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Input, ProfileImage, Button} from '../components/SignIn';
import {theme} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {removeWhitespace} from '../utils';

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

const SpackBetweenRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const FlexRow = styled.View`
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const DEFAULT_PHOTO =
  'https://w7.pngwing.com/pngs/441/722/png-transparent-pikachu-thumbnail.png';

const SignIn = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const refId = useRef(null);
  const refPassword = useRef(null);

  useEffect(() => {
    setDisabled(!(id && password && !errorMessage));
  }, [id, password, errorMessage]);

  useEffect(() => {
    let error = '';
    if (!id) {
      error = '별명을 입력해주세요 :)';
    } else if (password.length < 6) {
      error = '비밀번호는 최소 6글자 이상이어야 해요 :)';
    }
    setErrorMessage(error);
  }, [id, password, errorMessage]);

  const _handleSigninBtnpress = async () => {
    try {
      fetch('https://api.sendwish.link:8081/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: id,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(navigation.navigate('Main', id));
    } catch (e) {
      Alert.alert('Signup error', e.message);
      console.log('signin');
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
            <Title style={{color: theme.tintColorGreen}}>콜렉션</Title>에
            담아보세요!{' '}
          </Title>
        </Row>
      </UpperContainer>
      <BottomContainer>
        <KeyboardAwareScrollView extraScrollHeight={140}>
          <Input
            ref={refId}
            value={id}
            label="별명"
            placeholder="별명"
            returnKeyType="next"
            onChangeText={setId}
            onBlur={() => setId(id.trim())}
            maxLength={12}
            onSubmitEditing={() => refId.current.focus()}
          />
          <Input
            value={password}
            label="비밀번호"
            placeholder="비밀번호"
            ref={refPassword}
            onChangeText={setPassword}
            isPassword={true}
            onSubmitEditing={() => {
              _handleSigninBtnpress;
            }}
            onBlur={() => setPassword(removeWhitespace(password))}
          />

          <Button
            title="로그인"
            onPress={_handleSigninBtnpress}
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
