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
} from '../components/ChatRoom';
import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import * as encoding from 'text-encoding';
import Foundation from 'react-native-vector-icons/Foundation';
import Peer from 'react-native-peerjs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


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
  const [isFolded, setIsFolded] = useState(false);
  const [targetId, setTargetId]=useState('');

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
          // console.log('data : ', data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // console.log('chatList : ', chatList);

  const _pressFilter = () => {
    isSorted ? setIsSorted(false) : setIsSorted(true);
  };

  useEffect(() => {
    _getItemsFromShareCollection();
  }, [isSorted]);


  return (
    <Container insets={insets}>
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
            color: isFolded ? theme.tintColorPink : theme.basicText,
          }}
          onPress={() => {
            setIsFolded(!isFolded);
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
                      ? _addItemToList(item?.itemId)
                      : _openUrl(item?.originUrl);
                  }}
                  onLongPress={{}}
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
                    screen : screen
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