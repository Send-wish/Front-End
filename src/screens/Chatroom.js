import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  ScrollView,
  Linking,
  Text,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import {Input, MySaying, OthersSaying, ItemBox} from '../components/ChatRoom';
import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import * as encoding from 'text-encoding';

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
  flex: 0.8;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
`;

const CollectionContainer = styled.View`
  flex: 1.7;
  width: 92%;
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
  flex: 7;
  background-color: ${({theme}) => theme.mainBackground};
  flex-wrap: wrap;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  padding-bottom: 1px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${({theme}) => theme.strongBackground};
  flex-wrap: wrap;
  align-items: center;
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
  width: 100%;
  height: 60%;
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

const Item = ({item: {chatRoomId, createAt, message, sender}}) => {
  console.log(message);
  return <MySaying sender={sender} message={message} createAt={createAt} />;
};

const ChatRoom = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [chat, setChat] = useState([]);
  const {
    friendList,
    nickName,
    shareCollectionId,
    shareCollectionTitle,
    chatRoomId,
  } = route.params;

  console.log('friendList is : ', friendList);

  const client = useRef({});
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const isFocused = useIsFocused(); // 스크린 이동시 포커싱 및 useEffect 실행
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState([]);

  const _connect = roomId => {
    client.current = new Client({
      brokerURL: 'wss://api.sendwish.link:8081/ws',
      connectHeaders: {},
      webSocketFactory: () => {
        return SockJS('https://api.sendwish.link:8081/ws');
      },
      debug: str => {
        console.log('STOMP: ' + str);
      },
      onConnect: () => {
        _subscribe(roomId);
      },
      onStompError: frame => {
        console.log('error occur' + frame.body);
      },
    });
    client.current.activate();
  };

  const _disconnect = () => {
    console.log('here is disconnect!');
    client.current.deactivate();
  };

  const _subscribe = roomId => {
    console.log('connected!');
    client.current.subscribe('/sub/chat/' + roomId, msg => {
      //msg.body 정보를 사용한다!!
      console.log(JSON.parse(msg.body));
      tempArray = chatList;
      tempArray.push(msg.body);
      setChatList(tempArray);
    });
    client.current.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        roomId: roomId,
        sender: nickName,
        message: '',
        type: 'ENTER',
      }),
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
  }, []);

  const _openUrl = url => {
    Linking.openURL(url);
  };

  useEffect(() => {
    if (isFocused) _getItemsFromShareCollection();
    setIsEditing(false);
  }, [isFocused]);

  _pressEnter = () => {
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
          data.dtos ? setItems(data.dtos) : setItems([]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container insets={insets}>
      <UpperContainer>
        <Ionic
          name="chevron-back"
          size={25}
          color={theme.basicText}
          onPress={() =>
            navigation.navigate('SharedCollection', {
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
            {/* ({friendList.map(friend => ' ' + friend + ' ')}) */}
          </MainTitle>
        </View>
        <Feather
          name="menu"
          size={30}
          style={{
            color: theme.basicText,
          }}
        />
      </UpperContainer>
      <CollectionContainer>
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
        <LineIcon />
      </CollectionContainer>
      <MiddleContainer>
        <MySaying />
        <OthersSaying />
        <FlatList
          data={chatList}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item['createAt'].toString()}
        />
      </MiddleContainer>
      <BottomContainer>
        <InputContainer>
          <Input onChangeText={text => setMessage(text)} value={message} />
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
      </BottomContainer>
    </Container>
  );
};

export default ChatRoom;
