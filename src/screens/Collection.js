import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
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
import {get} from 'react-native/Libraries/Utilities/PixelRatio';

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
  const [isChanged, setIsChanged] = useState(false);
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const isFocused = useIsFocused(); // isFoucesd Define
  // 화면 이동시 리랜더링  건들지 말것
  useEffect(() => {
    if (isFocused) console.log('Collection focused & re-rendered');
    _getItemsFromCollection();
  }, [isFocused]);

  const _changeCollectionName = async () => {
    setVisibleModal(false);
    console.log(nickName, collectionId, collectionName);
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
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status} 에러발생`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);

          setIsChanged(true);

          console.log('chagned true?', isChanged);
          console.log('change_check!!', collectionTitle);
        })
        .then(result => {
          console.log('result', result);
        }); //for debug
    } catch (e) {
      console.log('change fail', e);
    }
  };

  const _getItemsFromCollection = async () => {
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
          data.dtos? setItems(data.dtos) : setItems([]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const _openUrl = url => {
    console.log('url', url);
    Linking.openURL(url);
  };

  _pressEditButton = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  };

  const _deleteItemsFromCollection = async () => {
    try {
      fetch(`https://api.sendwish.link:8081/items/${nickName}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickName,
          listItemId: addToCollection,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status} 에러발생`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
        })
        .then(result => {
          console.log('result', result);
        });
    } catch (e) {
      console.log('items delete fail', e);
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
                console.log('check colleciton to main Data 전달', passData);
                // console.log(params);
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
                  style={{marginTop: 3, color : isEditing? theme.strongSubText : theme.basicText}}
                />
              </WrapRow>
            </TouchableOpacity>

            <WrapRow
              style={{
                paddingTop: 20,
                width: 400,
                height: 60,
              }}>
              <ProfileImage />
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
                <SubTitle>총 N개의 위시템</SubTitle>
              </View>
              <Row>
                <SearchIcon />
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
            _deleteItemsFromCollection();
          }}
        />
      </View>
    </Container>
  );
};

export default Collection;
