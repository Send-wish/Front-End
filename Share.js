import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import {ShareMenuReactView} from 'react-native-share-menu';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/theme';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import {EditIcon} from './src/components/Main';

const Button = ({onPress, title, style}) => (
  <Pressable onPress={onPress}>
    <Text style={[{fontSize: 16, margin: 16}, style]}>{title}</Text>
  </Pressable>
);

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  background-color: transparent;
`;

const BottomContainer = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  /* justify-content: center; */
  align-items: center;
  height: 30%;
  width: 100%;
  background-color: ${({theme}) => theme.componentBackground};
  flex-wrap: wrap;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Row = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

const SaveStatus = styled.View`
  justify-content: center;
  align-items: flex-start;
  height: 20%;
  width: 100%;
  background-color: red;
`;

const CollectionList = styled.View`
  justify-content: center;
  align-items: flex-start;
  height: 50%;
  width: 100%;
  background-color: blue;
`;
const DividingLine = styled.View`
  justify-content: center;
  align-items: center;
  height: 10%;
  width: 100%;
  background-color: ${({theme}) => theme.basicText};
  border-bottom-color: ${({theme}) => theme.mainBackground};
`;

const LineIcon = styled.View`
  justify-content: center;
  align-items: center;
  height: 1%;
  width: 10%;
  background-color: ${({theme}) => theme.basicText};
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const DeleteButton = () => {
  return (
    <View style={{height: 20, width: 20, backgroundColor: 'black'}}></View>
  );
};

const EditButton = () => {
  return (
    <View style={{height: 20, width: 20, backgroundColor: 'black'}}></View>
  );
};

const MainTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${({theme}) => theme.mainBackground};
`;

const Share = () => {
  const [sending, setSending] = useState(false);

  const appGroupIdentifier = 'group.app.sendwish.jungle';

  const loadUsernameFromSharedStorage = async () => {
    try {
      const value = await SharedGroupPreferences.getItem(
        'nickNameData',
        appGroupIdentifier,
      );
      // const value = await SharedGroupPreferences.getItem("nickNameData",nickName, appGroupIdentifier)
      // console.log('share check data==in share', value);
      nickName = value;
      // console.log('nickName check in share', nickName);
      // this.setState({username:value.name})
    } catch (errorCode) {
      // errorCode 0 = no group name exists. You probably need to setup your Xcode Project properly.
      // errorCode 1 = there is no value for that key
      console.log(errorCode);
    }
  };
  loadUsernameFromSharedStorage();

  useEffect(() => {
    ShareMenuReactView.data()
      .then(({data}) => {
        console.log(data[0].data);
        postItem(data[0].data);
      })
      .catch(error => {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }, []);

  const postItem = url => {
    try {
      fetch('https://api.sendwish.link:8081/item/parsing', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          url: url,
          nickname: nickName,
        }),
      })
        .then(response => {
          return response.json();
        })
        .then(json => console.log(json))
        .then(() => {
          console.log('아이템 등록 완료 [URL] : ', url);
          setSending(true);
        })
        .then()
        .catch(error => {
          console.log('아이템저장서버통신에러');
          console.error(error);
        });
    } catch (e) {
      console.log(e);
      console.log('send url fail');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <BottomContainer>
          <LineIcon />
          <SaveStatus>
            <Row>
              <MainTitle>
                {sending ? '저장 완료!' : '아이템 저장 중'}{' '}
              </MainTitle>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '15%',
                  flexWrap: 'wrap',
                }}>
                <EditButton />
                <DeleteButton />
              </View>
            </Row>
          </SaveStatus>
          <DividingLine />
          <CollectionList></CollectionList>
        </BottomContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Share;

// <Text style={{fontSize: 25, fontWeight: 'bold'}}>
// {sending ? '저장 완료!' : '아이템 저장 중'}

//           <Button>
//   title={sending ? '아이템 저장 완료' : '아이템 저장 중..'}
//   disabled={sending}
//   style={sending ? styles.sending : styles.send}
// </Button>
