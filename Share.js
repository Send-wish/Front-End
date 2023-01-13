import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {ShareMenuReactView} from 'react-native-share-menu';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/theme';
import styled from 'styled-components';
import Feather from 'react-native-vector-icons/Feather';

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
  height: 40%;
  width: 100%;
  background-color: ${({theme}) => theme.basicText};
  flex-wrap: wrap;
  border-color: ${({theme}) => theme.componentBackground};
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
  background-color: ${({theme}) => theme.basicText};
`;

const CollectionList = styled.View`
  align-items: flex-start;
  flex-direction: row;
  height: 62%;
  width: 100%;
  background-color: ${({theme}) => theme.basicText};
`;
const DividingLine = styled.View`
  justify-content: center;
  align-items: center;
  height: 0.2%;
  width: 90%;
  background-color: ${({theme}) => theme.componentBackground};
  border-radius: 20px;
  z-index: 1;
`;

const LineIcon = styled.View`
  justify-content: center;
  align-items: center;
  height: 1%;
  width: 15%;
  background-color: ${({theme}) => theme.subText};
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const ContinueButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 33,
          width: 100,
          borderRadius: 10,
          backgroundColor: theme.tintColorPink,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <Text
          style={{color: theme.basicText, fontSize: 16, fontWeight: 'bold'}}>
          쇼핑 계속하기
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ContiuneInApp = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 33,
          width: 120,
          borderRadius: 10,
          backgroundColor: theme.tintColorPink,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <Text
          style={{color: theme.basicText, fontSize: 16, fontWeight: 'bold'}}>
          어플로 이동하기
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MainTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${({theme}) => theme.mainBackground};
`;

const CircleContainer = styled.View`
  padding: 10px;
  margin: 40px 10px 10px 10px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 75px;
`;

const CircleCollectionImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  margin: 10px 10px 10px 10px;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border-color: ${({theme}) => theme.line};
`;

const CircleRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CircleTitle = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({theme}) => theme.subText};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 30px;
  margin-bottom: 15px;
`;

const CollectionCircle = ({onPress, title, image}) => {
  return (
    <CircleContainer>
      <TouchableOpacity onPress={onPress}>
        <CircleCollectionImage source={{uri: image}} />
        <CircleRow>
          <CircleTitle>{title}</CircleTitle>
        </CircleRow>
      </TouchableOpacity>
    </CircleContainer>
  );
};

const Share = () => {
  const [sending, setSending] = useState(false);
  const appGroupIdentifier = 'group.app.sendwish.jungle';
  const [waitSecond, setWaitSecond] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 및 로딩낭비 방지
  const [collections, setCollections] = useState([]); // 컬렉션 목록

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
        _getCollections()
        postItem(data[0].data);
        _timeoutFunc();
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

  const _getCollections = async () => {
    setLoading(true);
    try {
      fetch(`https://api.sendwish.link:8081/collections/${nickName}`, {
        method: 'GET',
        // headers: {Content_Type: 'application/json'},
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setCollections(data);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const postItem = async url => {
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
        // .then(json => console.log(json))
        .then(() => {
          console.log('아이템 등록 완료 [URL] : ', url);
          setSending(true);
        })
        .catch(error => {
          console.log('아이템저장서버통신에러');
          console.error(error);
        });
    } catch (e) {
      console.log(e);
      console.log('send url fail');
    }
  };

  // console.log('waitSecond', waitSecond);
  // console.log('collections ', collections);

  const _setWaitSecond = () => {
    setWaitSecond(true);
  };

  const _timeoutFunc = () => {
    setTimeout(_setWaitSecond, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TouchableOpacity
          style={{width: '100%', height: '60%'}}
          onPress={() => {
            ShareMenuReactView.dismissExtension();
          }}></TouchableOpacity>

        <BottomContainer>
          <LineIcon />
          <SaveStatus>
            <Row>
              <MainTitle style={{marginLeft: 10}}>
                {waitSecond ? '저장 완료!' : '아이템 저장 중'}
              </MainTitle>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '39%',
                  flexWrap: 'wrap',
                }}>
                <ContiuneInApp
                  onPress={() => {
                    ShareMenuReactView.continueInApp();
                  }}
                />
              </View>
            </Row>
          </SaveStatus>
          <DividingLine />
          <CollectionList>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {collections.error
                ? null
                : collections.map(collection => (
                    <CollectionCircle
                      titleStyle={{
                        color: theme.basicText,
                      }}
                      key={collection?.collectionId}
                      collectionId={collection?.collectionId}
                      collectionTitle={collection?.title}
                      nickName={collection?.nickname}
                      title={collection?.title}
                    />
                  ))}
            </ScrollView>
          </CollectionList>
        </BottomContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Share;