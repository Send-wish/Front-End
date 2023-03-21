import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import {View, ScrollView, Linking, Alert} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ItemBox,
  CollectionCircle,
  AddCollectionCircle,
  EditIcon,
  Input,
  Button,
} from '../components/Main';
import {theme} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal, AppState} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

import {useQuery, useMutation, useQueryClient} from 'react-query';
import {_getItems, _getCollections} from '../ReactQuery/useQuery';
import {
  _makeCollect,
  _deleteCollect,
  _addNewItem,
  _deleteItem,
  _addItemToCollect,
} from '../ReactQuery/useMutation';

import {UserContext} from '../../App';

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

const Column = styled.View`
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
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

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Main = ({navigation, route}) => {
  const nick = useContext(UserContext);
  const nickName = nick.nick;
  // const nickName = route.params.nickName;
  const insets = useSafeAreaInsets();
  const [visibleModal, setVisibleModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);
  const [collectionName, setCollectionName] = useState('');
  // const [itemId, setItemId] = useState(0);
  const refChangedColname = useRef(null);
  const isFocused = useIsFocused();
  const [isEditing, setIsEditing] = useState(false);
  const [addToCollection, setAddToCollection] = useState([]);
  const [isCollectionEditing, setIsCollectionEditing] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const appGroupIdentifier = 'group.app.sendwish.jungle';
  const queryClient = useQueryClient();

  // 아이템 추가 자동 렌더링
  const reRender = AppState.addEventListener('change', nextAppState => {
    appState.current = nextAppState;
    if (appState.current === 'active') {
      setAppStateVisible(appState.current);
      refetch();
    }
  });
  useEffect(() => {
    reRender;
  }, [appState]);

  // Extension ID 공유 스토리지
  const saveUserDataToSharedStorage = async nickName => {
    await SharedGroupPreferences.setItem(
      'nickNameData',
      nickName,
      appGroupIdentifier,
    );
  };

  saveUserDataToSharedStorage(nickName);

  const loadUsernameFromSharedStorage = async () => {
    const value = await SharedGroupPreferences.getItem(
      'nickNameData',
      appGroupIdentifier,
    );
  };
  loadUsernameFromSharedStorage();

  useEffect(() => {
    setIsEditing(false);
    setIsCollectionEditing(false);
  }, [isFocused]);

  const {mutateAsync: _makeCol} = useMutation(_makeCollect, {
    onSuccess: () => {
      setVisibleModal(false);
      setCollectionName('');
      queryClient.invalidateQueries('collection');
    },
    onError: () => {
      console.log('error');
    },
  });

  // 컬렉션 생성
  // const _makeCollection = useCallback((nickName, collectionName) => {
  //   _makeCollect({nickName, collectionName}).then(() => {
  //     setVisibleModal(false);
  //     setCollectionName('');
  //     collectionRefetch();
  //   });
  // }, []);

  const _deleteCollection = useCallback((collectionId, nickName) => {
    _deleteCollect({collectionId, nickName})
      .then(() => {
        collectionRefetch();
      })
  }, []);

  const _openUrl = useCallback(url => {
    Linking.openURL(url);
  }, []);

  // 아이템 삭제
  const _deleteItems = useCallback((nickName, addToCollection) => {
    _deleteItem({nickName, addToCollection}).then(() => {
      refetch();
      collectionRefetch();
      setAddToCollection([]);
      setIsEditing(false);
    });
  }, []);

  const _pressEditButton = useCallback(() => {
    if (isCollectionEditing) {
      setIsCollectionEditing(false);
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
      isCollectionEditing
        ? setIsCollectionEditing(false)
        : setIsCollectionEditing(true);
    }
  });

  const _addItemToList = useCallback(itemId => {
    if (addToCollection.includes(itemId)) {
      tempArray = addToCollection;
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i] === itemId) {
          tempArray.splice(i, 1);
          i--;
        }
      }
      setAddToCollection(tempArray);
    } else {
      tempArray = addToCollection;
      tempArray.push(itemId);
      setAddToCollection(tempArray);
    }
  });

  // 컬렌션에 아이템 추가
  const _addItemToCollection = useCallback(
    (nickName, collectionId, addToCollection) => {
      _addItemToCollect({nickName, collectionId, addToCollection}).then(() => {
        setIsEditing(false);
        collectionRefetch();
      }).catch((err) => {
        console.log(err);
      });
    },[]);

  const _pressTargetCollection = useCallback(
    (collectionId, collectionName, nickName) => {
      setIsCollectionEditing(false);
      // 콜렉션 수정중이 아닐 때,
      if (!isCollectionEditing) {
        if (isEditing) {
          _addItemToCollection(nickName, collectionId, addToCollection);
        } else {
          setIsEditing(false);
          navigation.navigate('Collection', {
            collectionId: collectionId,
            collectionName: collectionName,
            nickName: nickName,
          });
        }
        // 콜렉션 수정 중일 때,
      } else {
        _deleteCollection(collectionId, nickName);
      }
    },
  );

  // 아이템 렌더링
  const {isFetching, isLoading, data, isError, refetch} = useQuery(
    ['data', nickName],
    () => _getItems(nickName),
    {staleTime: 5000, refetchOnWindowFocus: true, retry: 0},
  );

  useEffect(() => {
    if (data) {
      setItems(data);
    } else {
      return;
    }
  }, [data]);

  // 컬렉션 렌더링
  const {data: collection, refetch: collectionRefetch} = useQuery(
    ['collection', nickName],
    () => _getCollections(nickName),
    {
      cacheTime: 60 * 1000,
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  );

  useEffect(() => {
    if ({collection}.collection) {
      setCollections({collection}.collection);
    } else {
      return;
    }
  }, [{collection}.collection]);

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
                <Title style={{marginBottom: 10}}>새 컬렉션 만들기</Title>
                <Title>새 컬렉션의 이름을 입력해주세요.</Title>
                <TintPinkSubTitle>
                  다양한 쇼핑몰에서 담은 여러 아이템들을 담을 수 있어요!
                </TintPinkSubTitle>
              </View>
            </View>
            <Input
              ref={refChangedColname}
              value={collectionName}
              onChangeText={setCollectionName}
              onBlur={() => setCollectionName(collectionName)}
              maxLength={10}
              onSubmitEditing={() => {
                _makeCol(nickName, collectionName);
              }}
              placeholder="새 컬렉션 이름"
              returnKeyType="done"
            />
            <Button
              title="새 컬렉션 만들기"
              onPress={() => {
                _makeCol(nickName, collectionName);
              }}
            />
            <View style={{marginBottom: 20}} />
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
              님의 컬렉션
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
                {collections.error
                  ? null
                  : collections.map(collection => (
                      <CollectionCircle
                        titleStyle={{
                          color: isEditing ? theme.subText : theme.basicText,
                        }}
                        key={collection?.collectionId}
                        collectionId={collection?.collectionId}
                        collectionTitle={collection?.title}
                        nickName={collection?.nickname}
                        firstImgUrl={collection?.defaultImage[0]}
                        secondImgUrl={collection?.defaultImage[1]}
                        thirdImgUrl={collection?.defaultImage[2]}
                        fourthImgUrl={collection?.defaultImage[3]}
                        onPress={() =>
                          _pressTargetCollection(
                            collection?.collectionId,
                            collection?.title,
                            collection?.nickname,
                          )
                        }
                        onLongPress={() => {
                          _longPressCollection();
                        }}
                        isCollectionEditing={isCollectionEditing}
                        isEditing={isEditing}
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
                  title="새 컬렉션 추가"></AddCollectionCircle>
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
                  총 {items.length}개의 아이템을 컬렉션에 담아주세요 !
                </SubTitle>
              </View>
              <Row>
                {/* <FilterIcon /> */}
                <EditIcon
                  onPress={() => _pressEditButton()}
                  name={isEditing || isCollectionEditing ? 'x' : 'edit-2'}
                />
              </Row>
            </SpackBetweenRow>
          </Column>
          <FlexRow>
            {items.error
              ? null
              : items.map((item, i) => (
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
                        ? _addItemToList(item?.itemId)
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
            _deleteItems(nickName, addToCollection);
          }}
        />
      </View>
    </Container>
  );
};

export default Main;
