import React, {useEffect, Component, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder,
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
  Button,
} from '../components/Main';
import {theme} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
`;

const UpperContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 0 5px;
`;

const BottomContainer = styled.View`
  flex: 2.7;
  flex-direction: row;
  background-color: ${({theme}) => theme.subBackground};
  padding: 10px;
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

const Column = styled.View`
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
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

const ModalView = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  justify-content: center;
  align-items: center;
  opacity: 0.98;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Main = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [visibleModal, setVisibleModal] = useState(false);
  const refChangedColname = useRef(null);
  const [changedColName, setChangedColname] = useState('');
  const nickName = route.params;
  const [collections, setCollections] = useState([]);
  const [collectionName, setCollectionName] = useState('');

  const _madeCollection = async () => {
    console.log('nickName', nickName);
    console.log('collectionName', collectionName);
    setVisibleModal(false);
    try {
      fetch('https://api.sendwish.link:8081/collection', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          nickname: nickName,
          title: changedColName,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status} 에러발생`);
          }
          return response.json();
        })
        .then(json => console.log(json))
        .then(data => {
          console.log('made collection', data);
        })
        .then(() => _getCollections());
    } catch (e) {
      console.log('collection made fail');
    }
  };

  const _getCollections = async () => {
    try {
      fetch(`https://api.sendwish.link:8081/collections/${nickName}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => {
          return res.json();
        })
        .then(console.log('collections', collections))
        .then(data => {
          setCollections(data);
          console.log('get collections', data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log('컬렉션 추가 완료');
    _getCollections();
  }, []);

  useEffect(() => {
    console.log('nickName is : ', nickName);
  }, []);

  const _openUrl = url => {
    console.log('url', url);
    Linking.openURL(url);
  };

  // pan
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only move if the gesture is over the element we want to drag
        return gestureState.dx > 2 || gestureState.dx < -2;
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: pan.x, // x, y are Animated.Value
        },
      ]),
      onPanResponderRelease: (e, gestureState) => {
        // Set the value to the gesture data
        pan.setValue({x: gestureState.dx, y: 0});
      },
    }),
  ).current;

  return (
    <Container insets={insets}>
      <Modal animationType="slide" transparent={true} visible={visibleModal}>
        <ModalView insets={insets}>
          <StyledTouchableOpacity
            onPress={() => setVisibleModal(false)}
            style={{marginLeft: 5}}>
            <Ionic name="chevron-back" size={25} color={theme.basicText} />
          </StyledTouchableOpacity>
          <KeyboardAwareScrollView extraScrollHeight={200}>
            <StyledTouchableOpacity
              onPress={() => setVisibleModal(false)}></StyledTouchableOpacity>
            <View style={{marginTop: 60}} />
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
              }}>
              <View style={{width: 330}}>
                <Title style={{marginBottom: 10}}>새 콜렉션 만들기</Title>
                <Title>새 콜렉션의 이름을 입력해주세요.</Title>
                <TintPinkSubTitle>
                  새 콜렉션의 이름을 입력해주세요.
                </TintPinkSubTitle>
              </View>
            </View>
            <Input
              ref={refChangedColname}
              value={changedColName}
              onChangeText={setChangedColname}
              onBlur={() => setChangedColname(changedColName)}
              maxLength={20}
              onSubmitEditing={() => {
                _madeCollection();
              }}
              placeholder="새 콜렉션 이름"
              returnKeyType="done"
            />
            <Button
              title="새 콜렉션 만들기"
              onPress={() => _madeCollection()}
            />
            <View style={{marginBottom: 20}} />
          </KeyboardAwareScrollView>
        </ModalView>
      </Modal>
      <UpperContainer>
        <Row>
          <Column>
            <Title style={{marginTop: 30}}>
              <Title style={{fontSize: 27, color: theme.tintColorGreen}}>
                {nickName + ' '}
              </Title>
              님이 담은 아이템
            </Title>
          </Column>
        </Row>
        <Row>
          <View style={{height: 150}}>
            <ScrollView horizontal>
              {collections.reverse().map(collection => (
                <CollectionCircle
                  key={collection?.collectionId}
                  collectionId={collection?.collectionId}
                  collectionTitle={collection?.title}
                  nickName={collection?.nickname}
                  image={
                    'https://w7.pngwing.com/pngs/104/341/png-transparent-pokemon-let-s-go-pikachu-ash-ketchum-pokemon-pikachu-pikachu-let-s-go-ash-ketchum-pokemon-pikachu.png'
                  }
                  onPress={() =>
                    navigation.navigate('Collection', {
                      collectionId: collection?.collectionId,
                      collectionTitle: collection?.title,
                      nickName: collection?.nickname,
                    })
                  }
                />
              ))}
              <Ionicons
                name="ellipsis-vertical"
                size={15}
                color={theme.subText}
                style={{marginTop: 45, marginLeft: 10}}
              />
              <AddCollectionCircle
                onPress={() => setVisibleModal(true)}
                title="새 버킷 추가"></AddCollectionCircle>
            </ScrollView>
          </View>
        </Row>
      </UpperContainer>
      <BottomContainer>
        <ScrollView scrollEnabled={true}>
          <Column>
            <SpackBetweenRow>
              <View style={{marginBottom: 10}}>
                <Title>내 위시템 전체보기</Title>
                <SubTitle>총 N개의 위시템</SubTitle>
              </View>
              <Row>
                <SearchIcon />

                <EditIcon />
              </Row>
            </SpackBetweenRow>
          </Column>
          <FlexRow>
            <View style={{pointerEvents: 'none'}}>
              <View {...panResponder.panHandlers}>
                <Text>I can be dragged out of the ScrollView!</Text>
              </View>
            </View>

            <ItemBox
              title="안녕하세요"
              saleRate="60%"
              price={(70000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              image={
                'https://w7.pngwing.com/pngs/104/341/png-transparent-pokemon-let-s-go-pikachu-ash-ketchum-pokemon-pikachu-pikachu-let-s-go-ash-ketchum-pokemon-pikachu.png'
              }
            />
            <ItemBox
              title="안녕하세요"
              saleRate="60%"
              price={(70000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              image={
                'https://w7.pngwing.com/pngs/104/341/png-transparent-pokemon-let-s-go-pikachu-ash-ketchum-pokemon-pikachu-pikachu-let-s-go-ash-ketchum-pokemon-pikachu.png'
              }
            />
          </FlexRow>
        </ScrollView>
      </BottomContainer>
    </Container>
  );
};

export default Main;
