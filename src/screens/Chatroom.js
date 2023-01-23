import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  ScrollView,
  Linking,
  Text,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import {
  Input,
  MySaying,
  OthersSaying,
  ItemBox,
  MySayingItem,
  OthersSayingItem,
  Button,
  AddCollectionCircle,
  CollectionCircle,
  ChartButton,
  ChartItemBox,
  EditIcon,
  AddButton,
} from '../components/ChatRoom';
import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import * as encoding from 'text-encoding';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const UpperContainer = styled.View`
  height: 7%;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
`;

const CollectionContainer = styled.View`
  flex: 1.7;
  width: 94%;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  z-index: 10;
  background-color: ${({theme}) => theme.lightBackground};
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 25px;
`;

const MiddleContainer = styled.View`
  height: 500px;
  background-color: ${({theme}) => theme.mainBackground};
  flex-wrap: wrap;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-top: 15px;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  height: 500px;
  padding-top: 17px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 15px;
  background-color: ${({theme}) => theme.strongBackground};
  flex-wrap: wrap;
  align-items: center;
  margin-right: 15px;
  width: 100%;
`;

const MainTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.tintColorGreen};
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.subBackground};
  padding-left: 10px;
  padding-right: 6px;
  border-radius: 50px;
  width: 81%;
  height: 58%;
  margin-right: 5px;
`;

const SendIcon = styled.View`
  width: 42px;
  height: 42px;
  background-color: ${({theme}) => theme.tintColorPink};
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const LineIcon = styled.View`
  justify-content: center;
  align-items: center;
  height: 3%;
  width: 15%;
  background-color: ${({theme}) => theme.strongBackground};
  border-radius: 20px;
  margin-top: 5px;
`;

const _openUrl = url => {
  Linking.openURL(url);
};

const Item = ({
  item: {createAt, message, sender, senderImg, nickName, itemDto},
}) => {
  const parcedCreateAt = createAt.substring(11, 16);
  if (sender === nickName) {
    if (itemDto) {
      const {imgUrl, itemId, name, originUrl, price} = itemDto;
      return (
        <MySayingItem
          sender={sender}
          message={message}
          createAt={parcedCreateAt}
          imgUrl={imgUrl}
          itemId={itemId}
          name={name}
          originUrl={originUrl}
          price={new String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          onPress={_openUrl}
          senderImg={senderImg}
        />
      );
    } else {
      return (
        <MySaying
          sender={sender}
          message={message}
          createAt={parcedCreateAt}
          senderImg={senderImg}
        />
      );
    }
  } else {
    if (itemDto) {
      const {imgUrl, itemId, name, originUrl, price} = itemDto;
      return (
        <OthersSayingItem
          sender={sender}
          message={message}
          createAt={parcedCreateAt}
          imgUrl={imgUrl}
          itemId={itemId}
          name={name}
          originUrl={originUrl}
          price={new String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          onPress={_openUrl}
          senderImg={senderImg}
        />
      );
    } else {
      return (
        <OthersSaying
          sender={sender}
          message={message}
          createAt={parcedCreateAt}
          senderImg={senderImg}
        />
      );
    }
  }
};

const ModalView = styled.View`
  width: 30%;
  height: 10%;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  justify-content: center;
  align-items: center;
  opacity: 0.98;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 26.5%;
  margin-left: 67%;
  border-radius: 20px;
`;

const ChartModalView = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  flex: 1;
  margin-top: 0;
  padding-top: 30%;
`;

const ImageModalView = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.mainBackground};
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChartImage = styled.Image`
  margin-top: 10%;
  width: 100%;
  height: 5%;
  color: ${({theme}) => theme.tintColorGreen};
  align-items: flex-end;
  justify-content: flex-end;
`;

const FriendContainer = styled.View`
  height: 15%;
  width: 94%;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 24px;
  background-color: ${({theme}) => theme.lightBackground};
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 27%;
`;

const Row = styled.View`
  flex-direction: row;
`;

// 피어 생성
// const localPeer = new Peer();
// localPeer.on('error', console.log);

// localPeer.on('open', localPeerId => {
//   console.log('Local peer open with ID', localPeerId);

//   // const remotePeer = new Peer();
//   // remotePeer.on('error', console.log);
//   remotePeer.on('open', targetId => {
//     console.log('Remote peer open with ID', remotePeerId);

//     const conn = remotePeer.connect(localPeerId);
//     conn.on('error', console.log);
//     conn.on('open', () => {
//       console.log('Remote peer has opened connection.');
//       console.log('conn', conn);
//       conn.on('data', data => console.log('Received from local peer', data));
//       console.log('Remote peer sending data.');
//       conn.send('Hello, this is the REMOTE peer!');
//     });
//   });
// });

// localPeer.on('connection', conn => {
//   console.log('Local peer has received connection.');
//   conn.on('error', console.log);
//   conn.on('open', () => {
//     console.log('Local peer has opened connection.');
//     console.log('conn', conn);
//     conn.on('data', data => console.log('Received from remote peer', data));
//     console.log('Local peer sending data.');
//     conn.send('Hello, this is the LOCAL peer!');
//   });
// });

const ChatRoom = ({navigation, route}) => {
  let flatListRef;
  const insets = useSafeAreaInsets();
  const [chat, setChat] = useState([]);
  const {
    friendList,
    nickName,
    shareCollectionId,
    shareCollectionTitle,
    chatRoomId,
    screen,
  } = route.params;

  const client = useRef({});
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const isFocused = useIsFocused(); // 스크린 이동시 포커싱 및 useEffect 실행
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [update, setUpdate] = useState('');
  const refMessage = useRef(null);
  const [img, setImg] = useState(''); // 내이미지 받아오기
  const [isSorted, setIsSorted] = useState(false);
  const [isFolded, setIsFolded] = useState(true);
  const [targetId, setTargetId] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [friends, setFriends] = useState([]);
  const [isFriendSelected, setIsFriendSelected] = useState(false);
  const [chartModal, setChartModal] = useState(false);
  const [dataChart, setDataChart] = useState([]);
  const [chartItems, setChartItems] = useState([]);
  const [addToShareCollection, setAddToShareCollection] = useState([]);
  const length = 350;
  const [isShareCollectionEditing, setIsShareCollectionEditing] =
    useState(false);

  const _connect = roomId => {
    client.current = new Client({
      brokerURL: 'wss://api.sendwish.link:8081/ws',
      connectHeaders: {},
      webSocketFactory: () => {
        return SockJS('https://api.sendwish.link:8081/ws');
      },
      debug: str => {
        // console.log('STOMP: ' + str);
        setUpdate(str);
        _getItemsFromShareCollection();
      },
      onConnect: () => {
        _subscribe(roomId);
        // console.log('connected!');
      },
      onStompError: frame => {
        // console.log('error occur' + frame.body);
      },
    });
    client.current.activate();
  };

  const _disconnect = () => {
    // console.log('here is disconnect!');
    client.current.deactivate();
  };

  const _subscribe = roomId => {
    client.current.subscribe('/sub/chat/' + roomId, msg => {
      // console.log('connected! and subscribed!');
      let tempObject = JSON.parse(msg.body);
      console.log('msg.body: ' + msg.body);
      tempObject.nickName = nickName;
      tempArray = chatList;
      tempArray.push(tempObject);
      setChatList(tempArray);
      setUpdated(!updated);
    });
  };

  const _publish = roomId => {
    console.log('here is publish');
    if (!client.current.connected) {
      return;
    }
    client.current.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        roomId: roomId,
        sender: nickName,
        message: message,
        type: 'TALK',
      }),
    });
  };

  useEffect(() => {
    _connect(chatRoomId);
    return () => _disconnect();
  }, []);

  const _openUrl = url => {
    Linking.openURL(url);
  };

  useEffect(() => {
    if (isFocused) {
      _getItemsFromShareCollection();
      _getChatHistory();
      setIsEditing(false);
      _getFriends();
    }
  }, [isFocused]);

  _pressEnter = () => {
    if (message === '') {
      return;
    }
    _publish(chatRoomId);
    setMessage('');
  };

  // 공유컬렉션 아이템 렌더링
  const _getItemsFromShareCollection = () => {
    try {
      fetch(
        `https://api.sendwish.link:8081/collection/${nickName}/${shareCollectionId}`,
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        },
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          // data.dtos ? setItems(data.dtos) : setItems([]);
          let temp = [];
          if (data.dtos) {
            temp = data.dtos;
          }

          isSorted
            ? temp.sort(function (a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
              })
            : null;
          setItems(temp);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const _getChatHistory = async () => {
    try {
      fetch(`https://api.sendwish.link:8081/chats/${chatRoomId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            let tempObject = data[i];
            tempObject.nickName = nickName;
            tempArray = chatList;
            tempArray.push(tempObject);
            setChatList(tempArray);
          }
          console.log('data :ddd ', data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const _pressFilter = () => {
    isSorted ? setIsSorted(false) : setIsSorted(true);
  };

  useEffect(() => {
    _getItemsFromShareCollection();
  }, [isSorted]);

  const _getFriends = async () => {
    try {
      // API 아직 안열림
      fetch(`https://api.sendwish.link:8081/friend/${nickName}`, {
        method: 'GET',
        headers: {'Content-Type': `application/json`},
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          setFriends(data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getChart = async friendName => {
    try {
      fetch(
        `https://api.sendwish.link:8081/items/category/rank/${friendName}`,
        {
          method: 'GET',
          headers: {'Content-Type': `application/json`},
        },
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          setDataChart(data);
          console.log('chart data check', data);
          console.log('카테고리', dataChart[0].category);
          console.log('퍼센티지', dataChart[0].percentage);
          console.log('아이템', dataChart[0].itemDtos);
          setChartItems(dataChart[0].itemDtos);
          console.log('아이템', chartItems);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const _addItemToShareCollection = async (nickName, shareCollectionId) => {
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
        _getItemsFromShareCollection();

        return response.json();
      });
      // .then(data => {
      //   console.log('data is : ', data);
      // });
    } catch (e) {
      console.log('adding item to collection failed');
    }
  };

  const _addItemToShareList = itemId => {
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
    console.log('쉐어 컬렉션 담기 : ', addToShareCollection);
  };

  const _deleteItemsFromCollection = async (itemId) => {
    try {
      fetch(`https://api.sendwish.link:8081/collection/item`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionId: shareCollectionId,
          itemIdList: [itemId],
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

  return (
    <Container insets={insets}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visibleModal}
        style={{flex: 1}}>
        <ModalView insets={insets}>
          <Button
            title={'아이템 보기'}
            onPress={() => {
              setIsFolded(!isFolded);
              setVisibleModal(!visibleModal);
            }}
          />
          <Button
            title={'친구 목록 보기'}
            onPress={() => {
              setIsFriendSelected(!isFriendSelected);
              setVisibleModal(!visibleModal);
            }}
          />
        </ModalView>
      </Modal>
      <UpperContainer>
        <Ionic
          name="chevron-back"
          size={25}
          color={theme.basicText}
          onPress={() =>
            navigation.navigate(screen, {
              shareCollectionId: shareCollectionId,
              nickName: nickName,
              shareCollectionName: shareCollectionTitle,
            })
          }
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '70%',
          }}>
          <MainTitle>{shareCollectionTitle}</MainTitle>
          <MainTitle style={{color: theme.basicText, fontSize: 15}}>
            ({friendList.map(friend => ' ' + friend + ' ')})
          </MainTitle>
        </View>
        <Feather
          name="menu"
          size={30}
          style={{
            color: visibleModal ? theme.tintColorPink : theme.basicText,
          }}
          onPress={() => {
            setVisibleModal(!visibleModal);
          }}
        />
      </UpperContainer>

      <CollectionContainer
        style={{display: isFolded ? 'none' : 'flex'}}
        onBackdropPress={() => setIsFolded(!isFolded)}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{width: '95%'}}>
          {items.error
            ? null
            : items.map(item => (
                <ItemBox
                  imageStyle={{
                    opacity: isEditing ? 0.1 : 1,
                  }}
                  titleStyle={{
                    color: isEditing ? theme.subText : theme.strongText,
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
                      ? _addItemToShareCollection(item?.itemId)
                      : _openUrl(item?.originUrl);
                    console.log('!!!!!!!!!!!', item.itemId);
                  }}
                  onLongPress={() => _deleteItemsFromCollection(item.itemId)}
                  isEditing={isEditing}
                />
              ))}
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            alignItems: 'flex-end',
            width: 353,
            paddingTop: 3,
          }}>
          <TouchableOpacity onPress={_pressFilter}>
            <View
              style={{
                backgroundColor: isSorted
                  ? theme.tintColorPink
                  : theme.mainBackground,
                width: 38,
                height: 38,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 13,
                borderColor: theme.basicText,
                borderWidth: 2,
              }}>
              <Foundation name="filter" size={23} color={theme.basicText} />
            </View>
          </TouchableOpacity>
        </View>
        <LineIcon />
      </CollectionContainer>
      <Modal
        visible={isFriendSelected}
        transparent={true}
        animationType="none"
        onBackdropPress={() => setIsFriendSelected(false)}>
        <FriendContainer>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{width: '95%'}}>
            {friends.error
              ? null
              : friends.map(friend => (
                  <CollectionCircle
                    key={friend?.friend_id}
                    frName={friend?.friend_nickname}
                    activeOpacity={0.6}
                    image={friend?.friend_img}
                    onPress={() => {
                      friendName = friend.friend_nickname;
                      setChartModal(!chartModal), getChart(friendName);
                    }}
                  />
                ))}
          </ScrollView>
          <Modal visible={chartModal}>
            <ChartModalView insets={insets}>
              <ImageModalView>
                <ChartImage
                  source={{
                    uri: 'https://postfiles.pstatic.net/MjAyMzAxMjJfMjgz/MDAxNjc0MzkxMTE1MTg5.uF_FNBj0STqnVC7o7vZ41zieBXQ5F46bVkC0MZzwPHQg.geCzzmDljeZGhjfWBBL05uwe3isSGWWMSPta0zf9Gnsg.JPEG.okrldbs/IMG_0044.jpg?type=w966',
                  }}
                  // style={{width: length * 80 / 100}}

                  // style={{width: length * dataChart[0]?.percentage / 100}}
                />
                <Text
                  style={{
                    color: theme.basicText,
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  {dataChart[0]?.category + ' '}
                  {dataChart[0]?.percentage + '%'}
                </Text>

                <ChartImage
                  source={{
                    uri: 'https://postfiles.pstatic.net/MjAyMzAxMjJfMjgz/MDAxNjc0MzkxMTE1MTg5.uF_FNBj0STqnVC7o7vZ41zieBXQ5F46bVkC0MZzwPHQg.geCzzmDljeZGhjfWBBL05uwe3isSGWWMSPta0zf9Gnsg.JPEG.okrldbs/IMG_0044.jpg?type=w966',
                  }}
                  // style={{width: (length * dataChart[1]?.percentage) / 100}}
                />
                <Text
                  style={{
                    color: theme.basicText,
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  {dataChart[1]?.category + ' '}
                  {dataChart[1]?.percentage + '%'}
                </Text>
                <ChartImage
                  source={{
                    uri: 'https://postfiles.pstatic.net/MjAyMzAxMjJfMjgz/MDAxNjc0MzkxMTE1MTg5.uF_FNBj0STqnVC7o7vZ41zieBXQ5F46bVkC0MZzwPHQg.geCzzmDljeZGhjfWBBL05uwe3isSGWWMSPta0zf9Gnsg.JPEG.okrldbs/IMG_0044.jpg?type=w966',
                  }}
                  // style={{width: (length * dataChart[2]?.percentage) / 100}}
                />
                <Text
                  style={{
                    color: theme.basicText,
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  {dataChart[2]?.category + ' '}
                  {dataChart[2]?.percentage + '%'}
                </Text>
              </ImageModalView>
              <Row>
                <Text style={{color: theme.tintColorGreen}}>
                  친구가 가장 선호하는 {dataChart[0]?.category} 카테고리의
                  상품들
                </Text>
                <EditIcon
                  onPress={() => setIsItemSelected(!isItemSelected)}
                  name={isItemSelected ? 'x' : 'edit-2'}
                />
              </Row>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{width: '95%', opacity: isItemSelected ? 0.5 : 1.0}}>
                {chartItems.error
                  ? null
                  : chartItems.map(chartitem => (
                      <ChartItemBox
                        key={chartitem?.itemId}
                        saleRate="가격"
                        itemName={chartitem?.name}
                        itemPrice={new String(chartitem?.price).replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ',',
                        )}
                        isItemSelected={isItemSelected}
                        itemImage={chartitem?.imgUrl}
                        itemId={chartitem?.itemId}
                        onPress={() => {
                          isItemSelected
                            ? _addItemToShareList(chartitem?.itemId)
                            : _openUrl(chartitem?.originUrl);
                        }}
                      />
                    ))}
              </ScrollView>
              <Row>
                <AddButton
                  title={'추가하기'}
                  onPress={() => {
                    console.log('nickname:', nickName);
                    console.log('collectionId:', shareCollectionId);
                    console.log('itemIdList:', addToShareCollection);
                    setChartModal(false),
                      setIsItemSelected(!isItemSelected),
                      setChartItems([]),
                      _addItemToShareCollection(nickName, shareCollectionId);
                  }}
                />
                <Text>' '</Text>
                <ChartButton
                  title={'닫기'}
                  onPress={() => {
                    setIsItemSelected(!isItemSelected), setChartModal(false) , setChartItems([]), setAddToShareCollection([]);
                  }}
                />
              </Row>
            </ChartModalView>
          </Modal>
          <View style={{marginLeft: -30}}>
            <View
              style={{
                position: 'absolute',
                alignItems: 'flex-end',
                width: 33,
                paddingTop: 3,
              }}>
              <TouchableOpacity
                onPress={() => setIsFriendSelected(!isFriendSelected)}>
                <View
                  style={{
                    backgroundColor: theme.mainBackground,
                    width: 38,
                    height: 38,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 13,
                    borderColor: theme.basicText,
                    borderWidth: 2,
                    marginBottom: 80,
                  }}>
                  <FontAwesome name="close" size={22} color={theme.basicText} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* <LineIcon /> */}
        </FriendContainer>
      </Modal>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          height: 530,
          width: 405,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
        extraScrollHeight={200}
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={false}>
        <MiddleContainer style={{height: isFolded ? 638 : 500}}>
          <FlatList
            data={chatList}
            renderItem={({item}) => <Item item={item} />}
            key={item => item['createAt']}
            ref={ref => (flatListRef = ref)}
            onContentSizeChange={() =>
              flatListRef.scrollToEnd({animated: false})
            }
            showsVerticalScrollIndicator={false}
            extraData={{update, updated}}

            // image={img}
          />
        </MiddleContainer>
        <BottomContainer>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 42,
                width: 42,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 13,
                paddingBottom: 5,
                marginLeft: 5,
                backgroundColor: theme.tintColorGreen,
              }}>
              <MaterialIcons
                name="live-tv"
                size={27}
                color={theme.mainBackground}
                onPress={() => {
                  navigation.navigate('LiveChat', {
                    shareCollectionId: shareCollectionId,
                    nickName: nickName,
                    shareCollectionName: shareCollectionTitle,
                    chatRoomId: chatRoomId,
                    friendList: friendList,
                    screen: screen,
                  });
                }}
              />
            </View>
            <InputContainer>
              <Input
                ref={refMessage}
                onChangeText={text => setMessage(text)}
                value={message}
                onSubmitEditing={_pressEnter}
                returnKeyType={'send'}
                MaxLegnth={200}
              />
              <TouchableHighlight onPress={() => _pressEnter()}>
                <SendIcon>
                  <Feather
                    name="arrow-up"
                    size={30}
                    style={{
                      color: theme.mainBackground,
                    }}
                  />
                </SendIcon>
              </TouchableHighlight>
            </InputContainer>
          </View>
        </BottomContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default ChatRoom;
