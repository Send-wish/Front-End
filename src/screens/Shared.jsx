import React, {useState, useEffect, useRef, useCallback, useContext} from 'react';
import {View, ScrollView, Linking, TouchableOpacity, Alert} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  AddCollectionCircle,
  Button,
  EditIcon,
  Input,
  ItemBox,
  TempCircle,
  CollectionCircle,
  MainCollectionCircle,
} from '../components/Shared';
import {theme} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal, AppState} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';

import {useQuery} from 'react-query';
import {
  _getItems,
  _getCollections,
} from '../ReactQuery/useQuery';

import _getShareCollections from '../ReactQuery/useQuery/getShareCollection';
import _getFriends from '../ReactQuery/useQuery/getFriends';

import { UserContext } from '../../App';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  z-index: 100;
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
  margin-top: 10px;
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
const ModalInnerView = styled.View`
  width: 100%;
  height: 125px;
  background-color: ${({theme}) => theme.subBackground};
  border-radius: 25px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const ModalCollectionView = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.subBackground};
  border-radius: 25px;
  margin-top: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  height: 125px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Shared = ({route, navigation}) => {
  const nick = useContext(UserContext);
  console.log('nick', nick.nick);
  // Tab navigator route params check
  const nickName = nick.nick;
  // const nickName = route.params.params.nickName;
  const insets = useSafeAreaInsets();
  const [visibleModal, setVisibleModal] = useState(false);
  const [shareCollections, setShareCollections] = useState([]); // 컬렉션 목록
  const [items, setItems] = useState([]); // 아이템 목록
  const [shareCollectionName, setShareCollectionName] = useState(''); // 컬렉션 개별 이름
  const [itemId, setItemId] = useState(0); // 아이템별 아이디
  const refChangedColname = useRef(null);
  const [loading, setLoading] = useState(false); // 로딩 및 로딩낭비 방지
  const isFocused = useIsFocused(); // 스크린 이동시 포커싱 및 useEffect 실행
  const [isEditing, setIsEditing] = useState(false);
  const [addToShareCollection, setAddToShareCollection] = useState([]);
  const [isShareCollectionEditing, setIsShareCollectionEditing] =
    useState(false);
  // 공유 컬렉션 친구 추가
  const [isFriendselected, setIsFriendselected] = useState(false);
  const [addFriendList, setAddFriendList] = useState([nickName]);
  const [friends, setFriends] = useState([]);

  // 개인컬렉션
  const [collections, setCollections] = useState([]); // 컬렉션 목록
  const [isCollectionSelected, setIsCollectionSelected] = useState(false);
  const [targetCollectionId, setTargetCollectionId] = useState();
  const [roomId, setRoomId] = useState(0);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // 아이템 렌더
  const {isLoading, data, isError} = useQuery(
    ['data', nickName],
    () => _getItems(nickName),
    {staleTime: 1000 ,refetchOnWindowFocus: true, retry: 0},
  );
  useEffect(() => {
    if (data) {
      setItems(data);
    } else {
      return;
    }
  }, [data]);

  // 개인 컬렉션 렌더링
  const {data: collection} = useQuery(
    ['collection', nickName],
    () => _getCollections(nickName),
    {
      cacheTime: 60 * 1000,
      staleTime: 0,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  useEffect(() => {
    if ({collection}?.collection) {
      setCollections({collection}.collection);
    } else {
      return;
    }
  }, [{collection}?.collection]);

  // 공유 컬렉션 렌더
  const {data: getShareCollection} = useQuery(
    ['getShareCollection', nickName],
    () => _getShareCollections(nickName),
    {staleTime: 0, refetchOnWindowFocus: false, retry: 0},
  );

  useEffect(() => {
    if ({getShareCollection}?.getShareCollection) {
      setShareCollections({getShareCollection}?.getShareCollection);
    } else {
      return;
    }
  }, [{getShareCollection}?.getShareCollection]);

    // 친구목록 렌더
    const {data:queryFriends} = useQuery(
      ['queryFriends', nickName],
      () => _getFriends(nickName),
      {staleTime: 0, refetchOnWindowFocus: false, retry: 0},
    );
    useEffect(() => {
      if (queryFriends) {
        setFriends(queryFriends);
      } else {
        return;
      }
    }, [queryFriends]);

  // 아이템 추가 자동 렌더링
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // _getItems(nickName);
      console.log('AppState', appState.current);
    });
  }, [appState]);

  // console.log('친구목록확인', addFriendList);
  // 화면이동시마다 랜더링 건들지 말것
  useEffect(() => {
    // if (isFocused) console.log('Focused');
    // _getShareCollections(nickName); // 컬렌션 목록 랜더링
    // _getItems(nickName); // 아이템 목록 랜더링
    // _getFriends(nickName);
    // _getCollections(nickName);
    setIsEditing(false);
  }, [isFocused]);

  // 공유 컬렉션 생성
  const _madeShareCollection = async () => {
    if (addFriendList.length < 2) {
      return Alert.alert('친구를 선택해야 공유컬렉션을 만들 수 있어요!');
    }

    if (shareCollectionName === '') {
      return Alert.alert('컬렉션 이름을 입력해주세요!');
    }
    setAddFriendList([nickName]);
    _getCollections(nickName);
    _getItems(nickName);
    setVisibleModal(false);
    try {
      fetch('https://api.sendwish.link:8081/collection/shared', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          memberIdList: addFriendList,
          targetCollectionId: targetCollectionId,
          title: shareCollectionName,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status} 공유 컬렉션 생성 에러발생`);
          } else {
            setShareCollectionName('');
            return response.json();
          }
        })
        // .then(() => _getShareCollections(nickName));
    } catch (e) {
      console.log('share collection made fail');
    }
  };

  // 공유 컬렉션 삭제
  const _deleteShareCollection = async (shareCollectionId, nickName) => {
    try {
      fetch(
        `https://api.sendwish.link:8081/collection/${nickName}/${shareCollectionId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nickname: nickName,
            collectionId: shareCollectionId,
          }),
        },
      ).then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        // _getShareCollections(nickName);
        return;
        // return response.json();
      });
      // .then(() => _getShareCollections(nickName));
    } catch (e) {
      console.log('delete fail', e);
    }
  };

  // 아이템 삭제
  const _deleteItems = async () => {
    try {
      fetch(`https://api.sendwish.link:8081/items`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickName,
          itemIdList: addToShareCollection,
        }),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        _getItems(nickName);
        setAddToShareCollection([]);
        // _getShareCollections(nickName);
        return;
        // return response.json();
      });
      // .then(()=>_getItems(nickName))
      // .then(setAddToShareCollection([]));
    } catch (e) {
      console.log('items delete fail', e);
    }
  };

  // 공유 컬렉션 만들 친구 추가하기
  const _addFriendList = useCallback((frName) => {
    if (addFriendList.includes(frName)) {
      friendArray = addFriendList;
      for (let i = 0; i < friendArray.length; i++) {
        if (friendArray[i] === frName) {
          friendArray.splice(i, 1);
          i--;
        }
      }
      setAddFriendList(friendArray);
      console.log('friendArraycheck out', addFriendList);
    } else {
      friendArray = addFriendList;
      friendArray.push(frName);
      setAddFriendList(friendArray);
      console.log('friendArraycheck ADDDD', addFriendList);
    }
  });

  // 공유 컬렉션 생성시 추가할 개인 컬렉션
  const _pressTargetCollection = useCallback((collectionId) => {
    setIsCollectionSelected(!isCollectionSelected);
    setTargetCollectionId(collectionId);
    if (isCollectionSelected && targetCollectionId === targetCollectionId) {
      setTargetCollectionId();
    }
    console.log('targetCollectionId', targetCollectionId);
  });

  // 아이템 개별 링크
  const _openUrl = useCallback((url) => {
    console.log('url', url);
    Linking.openURL(url);
  });

  const _pressEditButton = useCallback(() => {
    if (isShareCollectionEditing) {
      setIsShareCollectionEditing(false);
    } else {
      if (isEditing) {
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    }
  });

  const _longPressCollection = useCallback(() => {
    if (isEditing) {
      return;
    } else {
      isShareCollectionEditing
        ? setIsShareCollectionEditing(false)
        : setIsShareCollectionEditing(true);
    }
  });

  // 공유 컬렉션에 추가할 아이템 선택
  const _addItemToShareList = useCallback((itemId) => {
    if (addToShareCollection.includes(itemId)) {
      tempArray = addToShareCollection;
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i] === itemId) {
          tempArray.splice(i, 1);
          i--;
        }
      }
      setAddToShareCollection(tempArray);
    } else {
      tempArray = addToShareCollection;
      tempArray.push(itemId);
      setAddToShareCollection(tempArray);
    }
  });

  // 공유 컬렉션에 아이템 추가
  const _addItemToShareCollection = async (shareCollectionId, nickName) => {
    setIsEditing(false);
    try {
      fetch('https://api.sendwish.link:8081/item/enrollment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nickname: nickName,
          collectionId: shareCollectionId,
          itemIdList: addToShareCollection,
        }),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        // _getShareCollections(nickName);
        return response.json();
      });
    } catch (e) {
      console.log('adding item to collection failed');
    }
  };

  const _pressTargetShareCollection = useCallback((
    shareCollectionId,
    nickName,
    shareCollectionName,
  ) => {
    setIsShareCollectionEditing(false);
    // 콜렉션 수정중이 아닐 때,
    if (!isShareCollectionEditing) {
      if (isEditing) {
        _addItemToShareCollection(shareCollectionId, nickName);
      } else {
        navigation.navigate('SharedCollection', {
          shareCollectionId: shareCollectionId,
          nickName: nickName,
          shareCollectionName: shareCollectionName,
        });
      }
      // 콜렉션 수정 중일 때,
    } else {
      _deleteShareCollection(shareCollectionId, nickName);
    }
  });

  return (
    <Container insets={insets}>
      <Modal animationType="slide" transparent={true} visible={visibleModal}>
        <ModalView insets={insets}>
          <StyledTouchableOpacity
            onPress={() => (setVisibleModal(false), setShareCollectionName(''))}
            style={{marginLeft: 5}}>
            <Ionic name="chevron-back" size={25} color={theme.basicText} />
          </StyledTouchableOpacity>
          <KeyboardAwareScrollView extraScrollHeight={430}>
            <StyledTouchableOpacity
              onPress={() => setVisibleModal(false)}></StyledTouchableOpacity>
            <View style={{marginTop: 60}} />
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
              }}>
              <View style={{width: 330}}>
                <Title style={{marginBottom: 10}}>공유 컬렉션 만들기</Title>
                <Title>컬렉션의 이름을 입력해주세요.</Title>
                <TintPinkSubTitle>
                  친구들과 컬렉션을 공유하고 의사결정을 할 수 있어요.
                </TintPinkSubTitle>
              </View>
            </View>
            <Input
              ref={refChangedColname}
              value={shareCollectionName}
              onChangeText={setShareCollectionName}
              onBlur={() => setShareCollectionName(shareCollectionName)}
              maxLength={10}
              onSubmitEditing={() => {
                _madeShareCollection();
              }}
              placeholder="새 컬렉션 이름"
              returnKeyType="done"
            />
            <View>
              <View style={{marginTop: 13, zIndex: 10}}>
                <SubTitle
                  style={{fontSize: 15, marginLeft: 5, marginBottom: 10}}>
                  공유할 친구들을 선택해주세요.
                </SubTitle>
              </View>
              <ModalInnerView>
                <ScrollView
                  horizontal
                  style={{width: 300}}
                  showsHorizontalScrollIndicator={false}>
                  {friends.error
                    ? null
                    : friends.map(friend => (
                        <TempCircle
                          key={friend?.friend_id}
                          friendId={friend?.friend_id}
                          frName={friend?.friend_nickname}
                          imageStyle={{
                            opacity: isFriendselected ? 1 : 0.5,
                            position: 'absolute',
                          }}
                          titleStyle={{
                            color: isFriendselected
                              ? theme.subText
                              : theme.basicText,
                          }}
                          onPress={() => {
                            _addFriendList(friend?.friend_nickname);
                          }}
                          // isClicked={isFriendselected}
                          image={friend?.friend_img}
                        />
                      ))}
                </ScrollView>
              </ModalInnerView>
              <View style={{marginTop: 13}}>
                <SubTitle style={{fontSize: 15, marginLeft: 5}}>
                  친구들에게 공유할 컬렉션을 선택해주세요.
                </SubTitle>
              </View>
              <ModalCollectionView>
                <ScrollView
                  horizontal
                  style={{width: 300}}
                  showsHorizontalScrollIndicator={false}>
                  {collections.error
                    ? null
                    : collections.map(collection => (
                        <MainCollectionCircle
                          titleStyle={{
                            color: isEditing ? theme.subText : theme.basicText,
                          }}
                          key={collection?.collectionId}
                          collectionId={collection?.collectionId}
                          collectionTitle={collection?.title}
                          nickName={collection?.nickname}
                          onPress={() =>
                            _pressTargetCollection(collection?.collectionId)
                          }
                          onLongPress={() => {
                            _longPressCollection();
                          }}
                          firstImgUrl={collection?.defaultImage[0]}
                          secondImgUrl={collection?.defaultImage[1]}
                          thirdImgUrl={collection?.defaultImage[2]}
                          fourthImgUrl={collection?.defaultImage[3]}
                          isEditing={isEditing}
                        />
                      ))}
                </ScrollView>
              </ModalCollectionView>
            </View>
            <Button
              title="새 컬렉션 만들기"
              onPress={() => _madeShareCollection()}
            />
          </KeyboardAwareScrollView>
        </ModalView>
      </Modal>
      <UpperContainer>
        <Row>
          <Column>
            <Title
              style={{
                marginTop: 30,
                color: isEditing ? theme.strongSubText : theme.basicText,
              }}>
              <Title
                style={{
                  fontSize: 27,
                  color: isEditing
                    ? theme.tintcolorPalegreen
                    : theme.tintColorGreen,
                }}>
                {nickName + ' '}
              </Title>
              님의 공유 컬렉션
            </Title>
          </Column>
        </Row>
        <Row>
          <View style={{height: 150}}>
            <View
              style={{
                widh: '100%',
                marginLeft: 10,
                marginRight: 10,
                height: 300,
              }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{width: 360}}>
                {/* collection rendering */}
                {shareCollections.error
                  ? null
                  : shareCollections.map(shareCollection => (
                      <CollectionCircle
                        imageStyle={{
                          opacity: isEditing ? 0.5 : 1,
                          position: 'absolute',
                        }}
                        titleStyle={{
                          color: isEditing ? theme.subText : theme.basicText,
                        }}
                        key={shareCollection?.collectionId}
                        shareCollectionId={shareCollection?.collectionId}
                        shareCollectionName={shareCollection?.title}
                        nickName={shareCollection?.nickname}
                        onPress={() =>
                          _pressTargetShareCollection(
                            shareCollection?.collectionId,
                            nickName,
                            shareCollection?.title,
                          )
                        }
                        onLongPress={() => {
                          _longPressCollection();
                        }}
                        isShareCollectionEditing={isShareCollectionEditing}
                        isEditing={isEditing}
                        firstImgUrl={shareCollection?.defaultImage[0]}
                        secondImgUrl={shareCollection?.defaultImage[1]}
                        thirdImgUrl={shareCollection?.defaultImage[2]}
                        fourthImgUrl={shareCollection?.defaultImage[3]}
                      />
                    ))}

                <Ionicons
                  name="ellipsis-vertical"
                  size={15}
                  style={{
                    marginTop: 45,
                    marginRight: 10,
                    color: isEditing
                      ? theme.subBackground
                      : theme.componentBackground,
                  }}
                />
                <AddCollectionCircle
                  imageStyle={{
                    backgroundColor: isEditing
                      ? theme.subBackground
                      : theme.componentBackground,
                  }}
                  titleStyle={{
                    color: isEditing ? theme.subText : theme.basicText,
                  }}
                  onPress={() => (isEditing ? {} : setVisibleModal(true))}
                  title="공유 컬렉션 만들기"></AddCollectionCircle>
              </ScrollView>
            </View>
          </View>
        </Row>
      </UpperContainer>

      <BottomContainer
        style={{
          backgroundColor: isEditing
            ? theme.strongBackground
            : theme.subBackground,
        }}>
        <ScrollView scrollEnabled={true}>
          <Column>
            <SpackBetweenRow>
              <View style={{marginBottom: 10}}>
                <Title
                  style={{
                    color: isEditing ? theme.strongSubText : theme.basicText,
                  }}>
                  아이템 전체보기
                </Title>
                <SubTitle
                  style={{
                    color: isEditing ? theme.strongSubText : theme.subText,
                  }}>
                  총 {items.length}개의 아이템을 공유 컬렉션에 담아주세요 !
                </SubTitle>
              </View>
              <Row>
                {/* <SearchIcon style={{opacity: isEditing ? 0 : 1}} /> */}
                {/* <FilterIcon /> */}
                <EditIcon
                  onPress={() => _pressEditButton()}
                  name={isEditing || isShareCollectionEditing ? 'x' : 'edit-2'}
                />
              </Row>
            </SpackBetweenRow>
          </Column>
          <FlexRow>
            {/* item rendering  */}
            {items.error
              ? null
              : items.map(item => (
                  <ItemBox
                    onLongPress={() => {
                      _pressEditButton();
                    }}
                    imageStyle={{
                      opacity: isEditing ? 0.1 : 1,
                    }}
                    titleStyle={{
                      color: isEditing ? theme.subText : theme.basicText,
                    }}
                    priceStyle={{
                      color: isEditing
                        ? theme.tintcolorPalepink
                        : theme.tintColorPink,
                    }}
                    key={item?.itemId}
                    saleRate="가격"
                    itemName={item?.name}
                    itemPrice={new String(item?.price).replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ',',
                    )}
                    itemImage={item?.imgUrl}
                    itemId={item?.itemId}
                    onPress={() => {
                      isEditing
                        ? _addItemToShareList(item?.itemId)
                        : _openUrl(item?.originUrl);
                    }}
                    isEditing={isEditing}
                  />
                ))}
          </FlexRow>
        </ScrollView>
      </BottomContainer>

      <View
        style={{
          position: 'absolute',
          top: '86%',
          width: '100%',
          height: '00%',
          paddingLeft: 20,
          paddingRight: 20,
          display: isEditing ? 'flex' : 'none',
        }}>
        <Button
          style={{
            marginBottom: 0,
            position: 'absolute',
          }}
          buttonStyle={{backgroundColor: theme.tintColorPink}}
          title="삭제하기"
          onPress={() => {
            _deleteItems();
          }}
        />
      </View>
    </Container>
  );
};

export default Shared;
