import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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

import {Linking} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

import ShareMenu from 'react-native-share-menu';

// const isFocused = useIsFocused(); // isFoucesd Define

// useEffect(() => {
// if (isFocused) console.log('Focused');
// }, [isFocused]);

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
  const nickName = route.params.nickName;
  const insets = useSafeAreaInsets();
  const [visibleModal, setVisibleModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const [collectionName, setCollectionName] = useState('');
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState(0);
  const refChangedColname = useRef(null);

  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused(); // isFoucesd Define

  useEffect(() => {
    if (isFocused) console.log('Focused');
    _getCollections();
  }, [isFocused]);

  // collection 추가
  const _madeCollection = async () => {
    console.log('nickName from Sign In', nickName);
    console.log('collectionName', collectionName);
    setVisibleModal(false);

    try {
      fetch('https://api.sendwish.link:8081/collection', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          nickname: nickName,
          title: collectionName,
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
        // .catch(error => {
        //   console.error(error);
        // })
        .then(() => _getCollections());
    } catch (e) {
      console.log('collection made fail');
    }
  };

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
          console.log('get collections', data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };
  // first screen rendering
  useEffect(() => {
    console.log('컬렉션 추가 or 랜더링 완료');
    _getCollections();
  }, []);

  // item link
  const _openUrl = url => {
    console.log('url', url);
    Linking.openURL(url);
  };

  useEffect(() => {
    console.log('nickName from Sign In', nickName);
  }, []);

  // item 추가
  const _addItem = async () => {
    try {
      await fetch('https://api.sendwish.link:8081/item/parsing', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          url: receiveText, // url 아직 못받음 임시변수
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
          console.log('send url', data);
        })
        .catch(error => {
          console.error(error);
        })
        .then(() => _getItems());
    } catch (e) {
      console.log('send url fail');
    }
  };

  const _getItems = async () => {
    try {
      // API 아직 안열림
      fetch(
        `https://api.sendwish.link:8081/collection/honghonghong/${collectionId}`,
        {
          method: 'GET',
          // headers: {Content_Type: 'application/json'},
        },
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          setItems(data);
          setItemId(data);
          console.log('get items', data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log('아이템 추가 완료');
    _getItems();
  }, []);

  // Shared item
  const [sharedUrl, setSharedUrl] = useState('');

  const handleShare = useCallback(item => {
    console.log('item is : ', item);

    if (!item.data) {
      console.log('data is null!!!!');
      return;
    }

    var {mimeType, data, extraData} = item;
    console.log('data is : ', data);
    setSharedUrl(data[0].data);
  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);
    return () => {
      listener.remove();
    };
  }, []);
  console.log('sharedUrl is : ', sharedUrl);

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
              value={collectionName}
              onChangeText={setCollectionName}
              onBlur={() => setCollectionName(setCollectionName)}
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
              {/* <CollectionCircle
                title="콜렉션"
                image="https://www.pngplay.com/wp-content/uploads/12/Pikachu-Meme-Background-PNG.png"
                onPress={() =>
                  navigation.navigate('Collection', {
                    collectionId: collections?.collectionId,
                    collectionTitle: collections?.title,
                    nickName: collections?.nickname,
                  })
                }
              /> */}
              {/* collection rendering */}
              {collections.reverse().map(collection => (
                <CollectionCircle
                  key={collection?.collectionId}
                  collectionId={collection?.collectionId}
                  collectionTitle={collection?.title}
                  nickName={collection?.nickname}
                  // image={collection?.image}
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
        <ScrollView scrollEnabled={false}>
          <Column>
            <SpackBetweenRow>
              <View style={{marginBottom: 10}}>
                <Title>내 위시템 전체보기</Title>
                <SubTitle>총 N개의 위시템</SubTitle>
              </View>
              <Row>
                <SearchIcon />
                {/* <FilterIcon /> */}
                <EditIcon />
              </Row>
            </SpackBetweenRow>
          </Column>
          <FlexRow>
            <ItemBox
              itemName="안녕하세요as
            gasdgsagdsadgsadgasdgasdgsag"
              saleRate="60%"
              itemPrice={(70000)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              itemImage={
                'https://w7.pngwing.com/pngs/104/341/png-transparent-pokemon-let-s-go-pikachu-ash-ketchum-pokemon-pikachu-pikachu-let-s-go-ash-ketchum-pokemon-pikachu.png'
              }
              onPress={() => {
                // console.log('item recieve', item);
                _openUrl(
                  `https://www.notion.so/b9c1497a993642deb4bd265cd9174645`,
                );
              }}
            />
            {/* item rendering  */}
            {/* {items.reverse().map(item => (
              <ItemBox
                key={item?.itemId}
                saleRate="30%"
                itemName={item?.name}
                itemPrice={item?.price}
                itemImage={item?.originUrl}
                itemUrl={item?.itemUrl}
                // itemId={item?.itemId}
                onPress={() => {
                  console.log('item recieve', item);
                  _openUrl(item?.itemUrl);
                }}
              />
            ))} */}
          </FlexRow>
        </ScrollView>
      </BottomContainer>
    </Container>
  );
};

export default Main;
