import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Input, ProfileImage, Button} from '../components/SignUp';
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
  flex: 2;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const MiddleContainer = styled.View`
  flex: 3;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  background-color: ${({theme}) => theme.mainBackground};
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 30px;
`;

const BottomContainer = styled.View`
  flex: 9;
  flex-direction: column;
  background-color: ${({theme}) => theme.subBackground};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 25px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Row = styled.View`
  flex-direction: row;
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

const SignUp = () => {
  const insets = useSafeAreaInsets();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const refId = useRef(null);
  const refPassword = useRef(null);
  const refPasswordCheck = useRef(null);

  useEffect(() => {
    setDisabled(!(id && password && passwordCheck && !errorMessage));
  }, [id, passwordCheck, password, errorMessage]);
  useEffect(() => {
    let error = '';
    if (!id) {
      error = '별명을 입력해주세요 :)';
    } else if (password.length < 6) {
      error = '비밀번호는 최소 6글자 이상이어야 해요 :)';
    } else if (password !== passwordCheck) {
      error = '비밀번호를 다르게 입력했어요 :(';
    }
    setErrorMessage(error);
  }, [id, passwordCheck, password, errorMessage]);

  const _handleSignupBtnpress = async () => {
    try {
      fetch('https://api.sendwish.link:8081/signup', {
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
        .then(navigation.navigate('Signin', {id}));
    } catch (e) {
      Alert.alert('Signup error', e.message);
    }
  };

  return (
    <Container insets={insets}>
      <UpperContainer>
        <Title style={{marginTop: 30, marginBottom: 10}}>
          간편한 소비를 위해
        </Title>
        <Title>회원가입하기</Title>
      </UpperContainer>

      <MiddleContainer>
        <Row>
          <ProfileImage title="벌크섭" />
        </Row>
      </MiddleContainer>
      <BottomContainer>
        <KeyboardAwareScrollView extraScrollHeight={130}>
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
            onSubmitEditing={() => refPasswordCheck.current.focus()}
            onBlur={() => setPassword(removeWhitespace(password))}
          />
          <Input
            value={passwordCheck}
            label="비밀번호확인"
            placeholder="비밀번호확인"
            ref={refPasswordCheck}
            returnKeyType="done"
            onChangeText={setPasswordCheck}
            isPassword={true}
            onSubmitEditing={_handleSignupBtnpress}
            onBlur={() => setPasswordCheck(removeWhitespace(passwordCheck))}
          />
          <Button
            title="회원가입 완료하기"
            onPress={_handleSignupBtnpress}
            disabled={disabled}
          />
        </KeyboardAwareScrollView>
      </BottomContainer>
    </Container>
  );
};

export default SignUp;