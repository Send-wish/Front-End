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
  CollectionCircle,
  ChartButton,
  ChartItemBox,
  EditIcon,
  AddButton,
  TimerItemBox,
} from '../components/ChatRoom';
import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import Foundation from 'react-native-vector-icons/Foundation';
import {Modal} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-end;
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
`;

const ImageModalView = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.mainBackground};
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 10px;
`;

const ChartImage = styled.View`
  height: 12%;
  background-color: ${({theme}) => theme.tintColorPink};
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 15px;
  margin-bottom: 25px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
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
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [friends, setFriends] = useState([]);
  const [isFriendSelected, setIsFriendSelected] = useState(false);
  const [chartModal, setChartModal] = useState(false);
  const [dataChart, setDataChart] = useState([
    {category: '', percentage: 1, itemDtos: []},
    {category: '', percentage: 1, itemDtos: []},
    {category: '', percentage: 1, itemDtos: []},
  ]);
  const [chartItems, setChartItems] = useState([{dtos: {}}]);
  const [addToShareCollection, setAddToShareCollection] = useState([]);
  const length = 330;
  const [isShareCollectionEditing, setIsShareCollectionEditing] =
    useState(false);
  const [isVoteVisible, setIsVoteVisible] = useState(false);
  const [likeNumber, setLikeNumber] = useState(0);


  const _connect = (roomId, nickName, itemId, isLike) => {
    client.current = new Client({
      brokerURL: 'wss://api.sendwish.link:8081/ws',
      connectHeaders: {},
      webSocketFactory: () => {
        return SockJS('https://api.sendwish.link:8081/ws');
      },
      debug: str => {
        setUpdate(str);
        _getItemsFromShareCollection();
      },
      onConnect: () => {
        _subscribe(roomId);
        // _subscribeVoteEnter(roomId, nickName);
        // _subscribeVote(roomId, nickName, itemId, isLike);
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
    _connect(chatRoomId, nickName);
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

  _pressEnter = useCallback(() => {
    if (message === '') {
      return;
    }
    _publish(chatRoomId);
    setMessage('');
  });

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
        });
    } catch (e) {
      console.log(e);
    }
  };

  const _pressFilter = useCallback(() => {
    isSorted ? setIsSorted(false) : setIsSorted(true);
  });

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

  const _getChart = async friendName => {
    console.log('friendName is : ', friendName);
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
          console.log('data ', data);
          if (data.length > 0) {
            setChartItems(data[0].itemDtos);
          }

          let tempDataChart = data;
          console.log('tempDataChart.length is :', tempDataChart.length);

          for (let i = 0; i < 3; i = i + 1) {
            tempDataChart.push({category: '', percentage: 1, itemDtos: []});
          }
          console.log('tempDataChart is :', tempDataChart);
          setDataChart(tempDataChart);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const _pressFriend = useCallback((friend) => {
    _getChart(friend).then(setChartModal(!chartModal));
  });

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

  const _deleteItemsFromCollection = async itemId => {
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
          _getItemsFromShareCollection();
          return;
        }
        throw new Error(`${response.status} 에러발생`);
      });
    } catch (e) {
      console.log('items delete fail', e);
    }
  };

  const _publishVote = (chatRoomId, nickName, itemId, isLike) => {
    console.log('vote : here is publish');

    if (!client.current.connected) {
      return;
    }
    client.current.publish({
      destination: '/pub/vote',
      body: JSON.stringify({
        roomId: chatRoomId,
        nickname: nickName,
        itemId: itemId,
        isLike: isLike,
      }),
    });
  };

  const _publishVoteEnter = (roomId, nickName) => {
    console.log('voteEnter : here is publish');

    if (!client.current.connected) {
      return;
    }
    client.current.publish({
      destination: '/pub/vote/enter',
      body: JSON.stringify({
        roomId: roomId,
        nickname: nickName,
      }),
    });
  };

  // chatRoom 리턴
  return (
    <Container insets={insets}>
      <View
        style={{
          display: isMenuVisible ? 'flex' : 'none',
          position: 'absolute',
          height: 135,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          backgroundColor: theme.subBackground,
          marginTop: 80,
          padding: 5,
          borderRadius: 10,
        }}>
        <Button
          title={'아이템 보기'}
          onPress={() => {
            setIsFolded(false);
            setIsMenuVisible(false);
            setIsFriendSelected(false);
          }}
        />
        <Button
          title={'내 친구 전체 목록'}
          onPress={() => {
            setIsFolded(true);
            setIsMenuVisible(false);
            setIsFriendSelected(true);
          }}
        />
        <Button
          title={'투표하기'}
          onPress={() => {
            setIsFolded(true);
            setIsMenuVisible(false);
            setIsVoteVisible(true);
          }}
        />
      </View>
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
            color:
              isMenuVisible || isItemSelected || !isFolded
                ? theme.tintColorPink
                : theme.basicText,
          }}
          onPress={() => {
            if (
              isMenuVisible === true ||
              isFriendSelected === true ||
              isFolded === false
            ) {
              setIsMenuVisible(false);
              setIsFriendSelected(false);
              setIsFolded(true);
            } else {
              setIsMenuVisible(true);
            }
          }}
        />
      </UpperContainer>

      <CollectionContainer style={{display: isFolded ? 'none' : 'flex'}}>
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
                  isItemSelected={isItemSelected}
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
      <CollectionContainer
        style={{display: isFriendSelected ? 'flex' : 'none'}}>
        <Text
          style={{
            position: 'absolute',
            marginTop: 5,
            color: theme.subBackground,
            fontWeight: 'bold',
            marginBottom: 5,
          }}>
          친구를 클릭하면 취향을 알 수 있어요!
        </Text>
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
                  image={friend?.friend_img}
                  onPress={() => {
                    friendName = friend.friend_nickname;
                    _pressFriend(friend.friend_nickname);
                  }}
                />
              ))}
        </ScrollView>
        <LineIcon />
      </CollectionContainer>

      {/* 투표 모달 */}
      <Modal visible={isVoteVisible}>
        <ChartModalView insets={insets} style={{justifyContent: 'flex-start'}}>
          <View style={{width: '100%', marginRight: 20}}>
            <Ionic
              name="chevron-back"
              size={25}
              color={theme.basicText}
              onPress={() => setIsVoteVisible(false)}
            />
          </View>

          <TimerItemBox
            nickName={nickName}
            chatRoomId={chatRoomId}
            items={items}
            onPress={_publishVote}
            friendList={friendList}
            friends={friends}
            likeNumber = {likeNumber}
          />
        </ChartModalView>
      </Modal>

      {/* 차트 모달 */}
      <Modal visible={chartModal}>
        <ChartModalView insets={insets}>
          <ImageModalView>
            {/* 카테고리 순위 */}
            <View style={{marginBottom: 13, marginLeft: 10, marginTop : 29}}>
              <Text style={{color: theme.basicText, fontSize: 19, fontWeight : 'bold'}}>
                친구가 선호하는 아이템 카테고리
              </Text>
              <Text
                style={{
                  color: theme.subText,
                  fontSize: 14,
                  marginTop: 5,
                  fontWeight: 'bold',
                }}>
                SendWish가 자동으로 카테고리를 생성해서 분류했어요.
              </Text>
            </View>
            <View
              style={{
                backgroundColor: theme.componentBackground,
                width: '100%',
                padding: 20,
                paddingLeft: 10,
                borderRadius: 25,
                justifyContent: 'center',
                height: 300,
              }}>
              <View style={{height: 30}} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 36,
                    height: 23,
                    borderRadius: 5,
                    backgroundColor: theme.tintColorPink,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: theme.basicText,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    1위
                  </Text>
                </View>
                <Text
                  style={{
                    color: theme.mainBackground,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {dataChart[0].category
                    ? dataChart[0].category.replace('\n', '')
                    : '담은 아이템이 없어요 '}
                </Text>
                <Text
                  style={{
                    color: theme.mainBackground,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  ( {dataChart[0].category ? dataChart[0].percentage : '0'}% )
                </Text>
              </View>
              <ChartImage
                style={{
                  width: dataChart[0].category ? length : 10,
                }}
              />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 36,
                    height: 23,
                    borderRadius: 5,
                    backgroundColor: theme.subBackground,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: theme.basicText,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    2위
                  </Text>
                </View>
                <Text
                  style={{
                    color: theme.mainBackground,
                    fontSize: 15,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {dataChart[1].category
                    ? dataChart[1].category.replace('\n', '')
                    : '담은 아이템이 없어요 '}
                </Text>
                <Text
                  style={{
                    color: theme.mainBackground,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  ( {dataChart[1].category ? dataChart[1].percentage : '0'}% )
                </Text>
              </View>
              <ChartImage
                style={{
                  width: dataChart[1].category
                    ? (length * dataChart[1].percentage) /
                      dataChart[0].percentage
                    : 10,
                  backgroundColor: theme.subBackground,
                }}
              />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 36,
                    height: 23,
                    borderRadius: 5,
                    backgroundColor: theme.subBackground,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: theme.basicText,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    3위
                  </Text>
                </View>
                <Text
                  style={{
                    color: theme.mainBackground,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {dataChart[2].category
                    ? dataChart[2].category.replace('\n', '')
                    : '담은 아이템이 없어요 '}
                </Text>
                <Text
                  style={{
                    color: theme.mainBackground,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  ( {dataChart[2].category ? dataChart[2].percentage : '0'}% )
                </Text>
              </View>
              <ChartImage
                style={{
                  width: dataChart[2].category
                    ? (length * dataChart[2].percentage) /
                      dataChart[0].percentage
                    : 10,
                  backgroundColor: theme.subBackground,
                }}
              />
              <View style={{height: 5}} />
            </View>

            {/* 친구가 선호하는 상품들 */}
          </ImageModalView>
          <View
            style={{
              width: '100%',
              marginTop: 30,
              marginLeft: 15,
            }}>
            <Row>
              <Text
                style={{
                  color: theme.basicText,
                  fontSize: 19,
                  fontWeight: 'bold',
                }}>
                친구가 담은{' '}
                <Text style={{color: theme.tintColorPink, fontSize: 19}}>
                  {dataChart[0].category
                    ? ' ' + dataChart[0].category.replace('\n', '') + ' '
                    : ''}
                </Text>
                카테고리의 아이템
              </Text>
              <EditIcon
                onPress={() => setIsItemSelected(!isItemSelected)}
                name={isItemSelected ? 'x' : 'edit-2'}
              />
            </Row>
            <Text
              style={{
                color: theme.subText,
                fontSize: 14,
                marginTop: 5,
                fontWeight: 'bold',
              }}>
              1위 카테고리 중 친구가 담은 아이템이랍니다.
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              backgroundColor: theme.subBackground,
              borderRadius: 25,
              alignItems: 'center',
              height: '18%',
              marginTop: 13,
            }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{width: '93%'}}>
              {chartItems.map(chartitem => (
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
          </View>
          <View style={{width: '100%', height: '20%', marginTop: 15}}>
            <AddButton
              title={'공유 컬렉션에 가져오기'}
              onPress={() => {
                console.log('nickname:', nickName);
                console.log('collectionId:', shareCollectionId);
                console.log('itemIdList:', addToShareCollection);
                setChartModal(false),
                  setIsItemSelected(false),
                  setChartItems([]),
                  _addItemToShareCollection(nickName, shareCollectionId);
              }}
            />
            <ChartButton
              title={'닫기'}
              onPress={() => {
                setIsItemSelected(false),
                  setChartModal(false),
                  setChartItems([]),
                  setAddToShareCollection([]);
              }}
            />
          </View>
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
        <MiddleContainer
          style={{height: !isFolded || isFriendSelected ? 500 : 638}}>
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
                marginLeft: 5,
                backgroundColor: theme.tintColorGreen,
              }}>
              <FontAwesome
                name="microphone"
                size={25}
                color={theme.mainBackground}
                // onPress={() => {
                //   navigation.navigate('LiveChat', {
                //     shareCollectionId: shareCollectionId,
                //     nickName: nickName,
                //     shareCollectionName: shareCollectionTitle,
                //     chatRoomId: chatRoomId,
                //     friendList: friendList,
                //     screen: screen,
                //   });
                // }}
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
