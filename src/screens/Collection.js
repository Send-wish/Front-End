import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Linking,
} from 'react-native';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  SearchIcon,
  ItemBox,
  ProfileImage,
  EditIcon,
  Input,
  Button,
} from '../components/Collection';

import {theme} from '../theme';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  justify-content: center;
`;

const UpperContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 0 5px;
`;

const BottomContainer = styled.View`
  flex: 4;
  flex-direction: row;
  background-color: ${({theme}) => theme.subBackground};
  padding: 10px;
  padding-top: 20px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const WrapRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  height: 30px;
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
  font-size: 25px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const SubTitle = styled.Text`
  margin-top: 3px;
  font-size: 12px;
  color: ${({theme}) => theme.basicText};
`;

const ModalView = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  justify-content: center;
  align-items: center;
  opacity: 0.98;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Collection = ({route, navigation}) => {
  const {collectionId, collectionName, nickName} = route.params;
  const insets = useSafeAreaInsets();
  const [visibleModal, setVisibleModal] = useState(false);
  const refCollectionName = useRef(null);
  const [collectionTitle, setCollectionTitle] = useState(collectionName);
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  const isFocused = useIsFocused(); // isFoucesd Define
  const [img, setImg] = useState(''); // 내이미지 받아오기
  
  // 화면 이동시 리랜더링  건들지 말것
  useEffect(() => {
    if (isFocused)
    _getItemsFromCollection();
    setIsEditing(false);
    _getImage();
  }, [isFocused]);

  // 컬렉션 네임 수정
  const _changeCollectionName = async () => {
    setVisibleModal(false);
    try {
      await fetch('https://api.sendwish.link:8081/collection', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickName,
          collectionId: collectionId,
          newTitle: collectionTitle,
        }),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        return response.json();
      });
      // .then(data => {
      // })
      // .then(result => {
      // }); //for debug
    } catch (e) {
      console.log('change fail', e);
    }
  };

  _addItemToList = itemId => {
    if (deleteList.includes(itemId)) {
      tempArray = deleteList;
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i] === itemId) {
          tempArray.splice(i, 1);
          i--;
        }
      }
      setDeleteList(tempArray);
    } else {
      tempArray = deleteList;
      tempArray.push(itemId);
      setDeleteList(tempArray);
    }
    console.log('****************deleteList is : ', deleteList);
  };

  // 아이템 렌더링
  const _getItemsFromCollection = () => {
    try {
      fetch(
        `https://api.sendwish.link:8081/collection/${nickName}/${collectionId}`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        },
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          data.dtos ? setItems(data.dtos) : setItems([]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // 아이템 개별 링크
  const _openUrl = url => {
    Linking.openURL(url);
  };

  const _pressEditButton = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };
  
  // 아이템 삭제
  const _deleteItemsFromCollection = async () => {
    try {
      fetch(`https://api.sendwish.link:8081/collection/item`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionId: collectionId,
          itemIdList: deleteList,
          nickname: nickName,
        }),
      }).then(response => {
        if (response.ok) {
          _getItemsFromCollection();
          setDeleteList([]);
          return;
        }
        throw new Error(`${response.status} 에러발생`);
      });
    } catch (e) {
      console.log('items delete fail', e);
    }
  };

  const _getImage = async () => {
    try {
      fetch(`https://api.sendwish.link:8081/profile/${nickName}`, {
        method: 'GET',
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log('!!!!!!!!!!!!!!!',data)
          setImg(data.img);
          console.log('이미지 확인!!!!!!!!!!!!!!!!!!!!!!!!', img);
        });
      } catch (e) {
        console.log(e);
      }
    };

  return (
    <Container insets={insets}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visibleModal}
        style={{flex: 1}}>
        <ModalView insets={insets}>
          <StyledTouchableOpacity onPress={() => _changeCollectionName()}>
            <Ionic name="chevron-back" size={25} color={theme.basicText} />
          </StyledTouchableOpacity>
          <Input
            ref={refCollectionName}
            value={collectionTitle}
            onChangeText={setCollectionTitle}
            onBlur={() => setCollectionTitle(collectionTitle)}
            maxLength={20}
            onSubmitEditing={() => {
              _changeCollectionName();
            }}
            placeholder="변경할 콜렉션 이름을 입력해주세요 :)"
            returnKeyType="done"
          />
          <Button title="변경하기" onPress={() => _changeCollectionName()} />
        </ModalView>
      </Modal>
      <UpperContainer>
        <Row>
          <Column>
            <TouchableOpacity
              onPress={() => {
                passData = {nickName, collectionId, collectionTitle};
                navigation.navigate('Main', {
                  params: collectionId,
                  collectionTitle,
                  nickName,
                });
              }}>
              <Ionic name="chevron-back" size={25} color={theme.basicText} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleModal(true)}>
              <WrapRow style={{marginTop: 30}}>
                <Title
                  style={{
                    marginRight: 10,
                    color: isEditing ? theme.strongSubText : theme.basicText,
                  }}>
                  <Title
                    style={{
                      fontSize: 27,
                      color: isEditing
                        ? theme.tintcolorPalegreen
                        : theme.tintColorGreen,
                    }}>
                    {collectionTitle}
                  </Title>
                  콜렉션
                </Title>
                <Feather
                  name="edit-2"
                  size={20}
                  style={{
                    marginTop: 3,
                    color: isEditing ? theme.strongSubText : theme.basicText,
                  }}
                />
              </WrapRow>
            </TouchableOpacity>
            <WrapRow
              style={{
                paddingTop: 20,
                width: 400,
                height: 60,
              }}>
              <ProfileImage image={img}/>
              <SubTitle
                style={{
                  fontSize: 15,
                  color: isEditing ? theme.strongSubText : theme.basicText,
                }}>
                {nickName}님이 담았어요!
              </SubTitle>
            </WrapRow>
          </Column>
        </Row>
      </UpperContainer>
      <BottomContainer>
        <ScrollView>
          <Column>
            <SpackBetweenRow>
              <View style={{marginBottom: 10}}>
                <SubTitle>총 {items.length}개의 아이템을 담았어요 !</SubTitle>
              </View>
              <Row>
                <SearchIcon onPress={() => console.log('touched!!!!!!!!!')} />
                {/* <FilterIcon /> */}
                <EditIcon
                  onPress={() => _pressEditButton()}
                  name={isEditing ? 'x' : 'edit-2'}
                />
              </Row>
            </SpackBetweenRow>
          </Column>
          <FlexRow>
            {items.error
              ? null
              : items.map(item => (
                  <ItemBox
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
                    onLongPress={_pressEditButton}
                    isEditing={isEditing}
                  />
                ))}
          </FlexRow>
        </ScrollView>
      </BottomContainer>
      <View
        style={{
          position: 'absolute',
          top: '91%',
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
            _deleteItemsFromCollection();
          }}
        />
      </View>
    </Container>
  );
};

export default Collection;
