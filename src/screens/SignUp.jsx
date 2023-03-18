import React, {useState, useEffect, useRef} from 'react';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Input,
  ProfileImage,
  Button,
  ErrorMessage,
  ImageButton,
  RandomImage,
} from '../components/SignUp';
import {theme} from '../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {removeWhitespace} from '../utils';
import Ionic from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native';

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

const Title = styled.Text`
  font-size: 27px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const ModalView = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  justify-content: center;
  align-items: center;
  opacity: 0.98;
`;

const ModalInnerView = styled.View`
  width: 91%;
  height: 15%;
  background-color: ${({theme}) => theme.subBackground};
  border-radius: 15px;
  margin-top: -150px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-top : 20px;   
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  margin-bottom: 200px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SignUp = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const refNickName = useRef(null);
  const refPassword = useRef(null);
  const refPasswordCheck = useRef(null);

  const [visibleModal, setVisibleModal] = useState(false);
  const [img, setImg] = useState('');
  const imageUrls = [
    'https://ca.slack-edge.com/T01FZU4LB4Y-U042W9AA43E-3149d187d734-512',
    'https://ca.slack-edge.com/T01FZU4LB4Y-U042W9AF0A0-0b610ab5e5a9-72',
    'https://ca.slack-edge.com/T01FZU4LB4Y-U042QSPEZLM-fedd11412751-72',
    'https://ca.slack-edge.com/T01FZU4LB4Y-U043HGW0VC0-e86dae1dc336-72',
    'https://ca.slack-edge.com/T01FZU4LB4Y-U042TRPA5U2-867945fabab9-72',
  ];

  useEffect(() => {
    setDisabled(!(nickName && password && passwordCheck && !errorMessage));
  }, [nickName, passwordCheck, password, errorMessage]);
  useEffect(() => {
    let error = '';
    if (!nickName) {
      error = '별명을 입력해주세요 :)';
    } else if (password.length < 6) {
      error = '비밀번호는 최소 6글자 이상이어야 해요 :)';
    } else if (password !== passwordCheck) {
      error = '비밀번호를 다르게 입력했어요 :(';
    }
    setErrorMessage(error);
  }, [nickName, passwordCheck, password, errorMessage]);

  const _handleSignupBtnpress = async () => {
    try {
      fetch('https://api.sendwish.link:8081/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickName,
          password: password,
          img: img,
        }),
      })
        .then(response => response.json())
        .then(result => {
          {
            if (result.error) {
              Alert.alert(result.error);
            } else {
              navigation.navigate('SignIn');
            }
          }
        })
        .then();
    } catch (e) {
      Alert.alert('Signup error', e.message);
    }
  };

  return (
    <Container insets={insets}>
      <Modal animationType="slide" transparent={true} visible={visibleModal}>
        <ModalView insets={insets}>
          <StyledTouchableOpacity
            onPress={() => setVisibleModal(false)}
            style={{marginLeft: 5, marginTop: -100}}>
            <Ionic name="chevron-back" size={25} color={theme.basicText} />
          </StyledTouchableOpacity>
          <ModalInnerView>
            <ScrollView horizontal showsHorizontalScrollIndicator = {false}>
              {imageUrls.map(img => (
                <RandomImage
                  key={img}
                  image={img}
                  onPress={() => (setVisibleModal(false), setImg(img))}
                />
              ))}
            </ScrollView>
          </ModalInnerView>
          <ImageButton title=" 프로필사진을 선택해주세요!   " />
        </ModalView>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <Ionic name="chevron-back" size={25} color={theme.basicText} />
      </TouchableOpacity>
      <UpperContainer>
        <Title style={{marginTop: 30, marginBottom: 10}}>
          간편한 소비를 위해
        </Title>
        <Title>회원가입하기</Title>
      </UpperContainer>
      <MiddleContainer>
        <Row>
          <ProfileImage
            title={nickName}
            onPress={() => setVisibleModal(true)}
            image={img}
          />
        </Row>
      </MiddleContainer>
      <BottomContainer>
        <KeyboardAwareScrollView extraScrollHeight={130}>
          <Input
            ref={refNickName}
            value={nickName}
            label="별명"
            placeholder="별명"
            returnKeyType="next"
            onChangeText={setNickName}
            onBlur={() => setNickName(nickName.trim())}
            maxLength={12}
            onSubmitEditing={() => refPassword.current.focus()}
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
          <ErrorMessage message={errorMessage} />

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
