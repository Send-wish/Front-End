import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Linking, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../theme';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import * as encoding from 'text-encoding';

const FriendsContainer = styled.View`
  padding: 10px;
  margin: 25px 15px 19px 15px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 75px;
`;

const FriendsCollectionImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  margin: 10px 10px 10px 10px;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border-color: ${({theme}) => theme.subBackground};
  border-width: 1px;
`;

const FriendsRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FriendsTitle = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: ${({theme}) => theme.mainBackground};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 30px;
  margin-top: 0px;
`;

const CollectionCircle = ({onPress, frName, image}) => {
  return (
    <FriendsContainer>
      <TouchableOpacity onPress={onPress}>
        <FriendsCollectionImage source={{uri: image}} />
        <FriendsRow>
          <FriendsTitle>{frName}</FriendsTitle>
        </FriendsRow>
      </TouchableOpacity>
    </FriendsContainer>
  );
};

const Container = styled.View`
  width: 170px;
  justify-content: center;
  align-items: center;
`;

const ItemImage = styled.Image`
  background-color: ${({theme}) => theme.tintColorPink};
  padding: 10px;
  margin: 2px 2px 10px 2px;
  width: 170px;
  height: 170px;
  justify-content: center;
  align-items: center;
  border-radius: 65px;
  flex-wrap: wrap;
`;

const Title = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: ${({theme}) => theme.subBackground};
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  width: 160px;
  height: 85px;
  flex-wrap: wrap;
`;

const Price = styled.Text`
  margin: 1px;
  font-size: 15px;
  font-weight: bold;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  color: ${({theme}) => theme.mainBackground};
  width: 140px;
`;

const Sale = styled.Text`
  margin: 1px;
  font-size: 15px;
  font-weight: bold;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  color: ${({theme}) => theme.tintColorPink};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const VoteItemBox = ({saleRate, itemName, itemPrice, itemImage}) => {
  return (
    <View>
      <Container>
        <ItemImage source={{uri: itemImage}} />
        <Row>
          <Sale>{saleRate}</Sale>
          <Price> {itemPrice}원 </Price>
        </Row>
        <Title>{itemName}</Title>
      </Container>
    </View>
  );
};

const MiniContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  margin-right: 10px;
`;

const MiniItemImage = styled.Image`
  background-color: ${({theme}) => theme.tintColorPink};
  padding: 10px;
  width: 95px;
  margin-right: 10px;
  height: 95px;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  flex-wrap: wrap;
  border-color: ${({theme}) => theme.strongBackground};
  border-width: 1px;
`;

const MiniTitle = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({theme}) => theme.strongSubText};
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
`;

const MiniPrice = styled.Text`
  margin: 1px;
  font-size: 15px;
  font-weight: bold;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  color: ${({theme}) => theme.mainBackground};
`;

const MiniSale = styled.Text`
  margin: 1px;
  font-size: 15px;
  font-weight: bold;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  color: ${({theme}) => theme.tintColorPink};
`;

const MiniRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  margin-bottom: 4px;
`;

const MiniVoteItemBox = ({
  saleRate,
  itemName,
  itemPrice,
  itemImage,
  originUrl,
}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => Linking.openURL(originUrl)}>
        <MiniContainer>
          <MiniItemImage source={{uri: itemImage}} />
          <View
            style={{
              width: 140,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <MiniRow>
              <MiniSale>{saleRate}</MiniSale>
              <MiniPrice> {itemPrice}원 </MiniPrice>
            </MiniRow>
            <MiniTitle>{itemName}</MiniTitle>
          </View>
        </MiniContainer>
      </TouchableOpacity>
    </View>
  );
};

const ButtonContainer = styled.View`
  height: 80px;
  width: 130px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  padding: 5px;
  margin: 3px;
`;

const ButtonTitle = styled.Text`
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const VoteButton = ({title, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonContainer style={style}>
        <ButtonTitle>{title}</ButtonTitle>
      </ButtonContainer>
    </TouchableOpacity>
  );
};

const TimerItemBox = ({
  nickName,
  chatRoomId,
  items,
  onPress,
  friendList,
  friends,
}) => {
  const [index, setIndex] = useState(0);
  const [tempIndex, setTempIndex] = useState(0);
  const [leftSecond, setLeftSecond] = useState(3);
  const [message, setMessage] = useState('');
  const [like, setLike] = useState(0);
  const [isMessageVisible, setIsMessageVisible] = useState(0);
  const client = useRef({});
  const [_items, _setItems] = useState(items);
  const [isAbleToStart, setIsAbleToStart] = useState(false);
  const [voteParticipants, setVoteParticipants] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [_friends, _setFriends] = useState([]);

  const _connect = (roomId, nickName, itemId, isLike) => {
    client.current = new Client({
      brokerURL: 'wss://api.sendwish.link:8081/ws',
      connectHeaders: {},
      webSocketFactory: () => {
        return SockJS('https://api.sendwish.link:8081/ws');
      },
      debug: str => {},
      onConnect: () => {
        _subscribeVote(roomId, nickName, itemId, isLike);
        _subscribeVoteEnter(roomId, nickName);
      },
      onStompError: frame => {},
    });
    client.current.activate();
  };

  const _disconnect = () => {
    console.log('here is disconnect!');
    _publishVoteExit(chatRoomId, nickName);
    client.current.deactivate();
  };

  const _subscribeVote = roomId => {
    client.current.subscribe('/sub/vote/' + roomId, msg => {
      console.log('vote : connected! and subscribed!');
      console.log('msg.body', msg.body);
      let tempArray = JSON.parse(msg.body);
      let tempList = _items;
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].itemId === tempArray.itemId) {
          tempList[i].like = tempArray.like;
          break;
        }
      }
      tempList.sort(function (a, b) {
        return (
          parseFloat(b.like ? b.like : 0) - parseFloat(a.like ? a.like : 0)
        );
      });
      _setItems(tempList);
    });
  };

  console.log(_items);

  const _subscribeVoteEnter = roomId => {
    client.current.subscribe('/sub/vote/enter/' + roomId, msg => {
      let tempParticipants = JSON.parse(msg.body);

      setVoteParticipants(tempParticipants.memberIdList);

      let tempFriends = [];
      let temp = friends;

      for (let i = 0; i < tempParticipants.memberIdList.length; i++) {
        for (let j = 0; j < temp.length; j++) {
          if (tempParticipants.memberIdList[i] === temp[j].friend_nickname) {
            console.log(temp[j].friend_nickname);
            tempFriends.push(temp[j]);
          }
        }
      }
      _setFriends(tempFriends);
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

  const _publishVoteExit = (roomId, nickName) => {
    console.log('voteEnter : here is publish');

    if (!client.current.connected) {
      return;
    }
    client.current.publish({
      destination: '/pub/vote/exit',
      body: JSON.stringify({
        roomId: roomId,
        nickname: nickName,
      }),
    });
  };

  useEffect(() => {
    _connect(chatRoomId, nickName);
    return () => _disconnect();
  }, []);

  useEffect(() => {
    setIsMessageVisible(false);
  }, [tempIndex]);

  useEffect(() => {
    setTimeout(() => {
      _publishVoteEnter(chatRoomId, nickName);
    }, 1000);
  }, []);

  const _pressLike = () => {
    setMessage('좋아요를 눌렀어요! ❤️');
    setIsMessageVisible(true);
    setLike(true);
    onPress(chatRoomId, nickName, items[index].itemId, true);
  };

  const _pressIdontknow = () => {
    setMessage('별로 마음에 들지 않으시군요... 그럴 수 있어요!');
    setIsMessageVisible(true);
    setLike(false);
    onPress(chatRoomId, nickName, items[index].itemId, false);
  };

  const _startVote = () => {
    if (tempIndex === items?.length) {
      return () => {
        clearTimeout(indexTimer);
        clearTimeout(leftSecondTimer);
        clearTimeout(tempIndexTimer);
      };
    }
    let indexTimer = setTimeout(
      () => (index === items?.length - 1 ? null : setIndex(index + 1)),
      3000,
    );
    let tempIndexTimer = setTimeout(() => setTempIndex(index + 1), 3000);
    let leftSecondTimer = setTimeout(
      () =>
        leftSecond === 1 ? setLeftSecond(3) : setLeftSecond(leftSecond - 1),
      1000,
    );
  };

  console.log('friendList is ', friendList);
  console.log('voteParticipants is ', voteParticipants);

  if (voteParticipants?.length < friendList?.length)
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '13 %',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <View style={{width: '83%'}}>
          <Text
            style={{
              color: theme.tintColorGreen,
              fontSize: 24,
              fontWeight: 'bold',
              marginTop: 3,
            }}>
            대기 중 ... !
          </Text>
          <Text
            style={{
              color: theme.subText,
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 3,
              marginBottom: 10,
            }}>
            친구들이 입장하기를 기다리고 있어요.
          </Text>
          <Text
            style={{
              color: theme.subText,
              fontSize: 15,
              fontWeight: 'bold',
              marginTop: 3,
              marginBottom: 10,
            }}>
            {' '}
            (
            <Text style={{color: theme.basicText, fontSize: 18}}>
              {' '}
              {nickName}{' '}
            </Text>
            님의 친구 {friendList.length - 1}명 중{' '}
            <Text style={{fontSize: 18, color: theme.tintColorPink}}>
              {_friends.length}명
            </Text>
            이 참여했어요! )
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.line,
            width: '90%',
            height: '45%',
            flexDirection: 'row',
            borderRadius: 52,
            padding: 13,
            marginTop: 10,
            flexWrap: 'wrap',
          }}>
          {_friends.map(friend => (
            <CollectionCircle
              key={friend?.friend_id}
              frName={friend?.friend_nickname}
              image={friend?.friend_img}
              onPress={() => {
                friendName = friend.friend_nickname;
              }}
            />
          ))}
        </View>
      </View>
    );
  else if (tempIndex === items?.length) {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          height: '90%',
        }}>
        <View
          style={{
            width: '100%',
            height: '7%',
            alignItems: 'flex-start',
          }}></View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: 12,
            paddingLeft: 20,
          }}>
          <Text
            style={{color: theme.basicText, fontSize: 22, fontWeight: 'bold'}}>
            친구들과의 투표 결과
          </Text>
          <Text
            style={{
              color: theme.subText,
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: 3,
            }}>
            상품 이미지를 눌러 빠르게 구매 가능해요.
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.line,
            height: '79%',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 50,
            flexWrap: 'wrap',
            padding: 22,
          }}>
          {_items.map((item, index) =>
            index > 2 ? null : (
              <View
                style={{
                  width: '100%',
                  height: '33%',
                  backgroundColor: index === 0 ? theme.basicText : null,
                  padding: 5,
                  borderRadius: 40,
                  paddingBottom: index === 0 ? 14 : 2,
                }}>
                <View
                  style={{
                    width: '82%',
                    height: '20%',
                    margin: 8,
                    marginBottom: 0,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor:
                        index === 0
                          ? theme.tintColorPink
                          : theme.strongBackground,
                      width: 25,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: theme.basicText,
                      }}>
                      {index + 1}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color:
                        index === 0
                          ? theme.tintColorPink
                          : theme.mainBackground,
                      fontWeight: 'bold',
                      fontSize: 22,
                    }}>
                    위{' '}
                    <Text
                      style={{
                        color: theme.mainBackground,
                        fontSize: 15,
                      }}>
                      ( {item.like ? item.like : 0}표를 받았어요 )
                    </Text>
                  </Text>
                </View>
                <MiniVoteItemBox
                  key={item?.itemId}
                  saleRate="가격"
                  itemName={item?.name}
                  itemPrice={new String(item?.price).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ',',
                  )}
                  itemImage={item.imgUrl}
                  itemId={item.itemId}
                  originUrl={item.originUrl}
                />
              </View>
            ),
          )}

          <View
            style={{
              width: '100%',
              height: '12%',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              padding: 20,
            }}></View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '10%',
            }}></View>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
            }}></View>
        </View>
      </View>
    );
  } else {
    _startVote();
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          height: '92%',
        }}>
        <View
          style={{
            width: '100%',
            height: '8%',
            alignItems: 'flex-start',
          }}></View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: 10,
            paddingLeft: 40,
          }}></View>
        <View
          style={{
            backgroundColor: theme.line,
            height: '80%',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <View
            style={{
              width: '100%',
              height: '12%',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              padding: 20,
            }}>
            <View
              style={{
                width: 45,
                height: 45,
                backgroundColor: theme.tintColorPink,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 18,
              }}>
              <Text
                style={{
                  color: theme.basicText,
                  fontSize: 28,
                  fontWeight: 'bold',
                }}>
                {leftSecond}
                <Text style={{fontSize: 16}}>초</Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '10%',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              최종{' '}
              <Text style={{color: theme.tintColorPink}}>{index + 1}번째 </Text>
              아이템
            </Text>
            <Text style={{fontWeight: 'bold', color: theme.strongSubText}}>
              이 아이템이 좋은지 골라주세요.{' '}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <VoteItemBox
              saleRate="가격"
              itemName={items[index]?.name}
              itemPrice={new String(items[index]?.price).replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ',',
              )}
              itemImage={items[index]?.imgUrl}
              itemId={items[index]?.itemId}
            />
          </View>
          <Row
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '20%',
            }}>
            <VoteButton
              style={{backgroundColor: theme.strongBackground}}
              title={'잘 모르겠어요'}
              onPress={_pressIdontknow}
            />
            <VoteButton
              style={{backgroundColor: theme.tintColorPink}}
              title={'좋아요 :)'}
              onPress={_pressLike}
            />
          </Row>
          <Text
            style={{
              color: like ? theme.tintColorPink : theme.subBackground,
              fontWeight: 'bold',
              display: isMessageVisible ? 'flex' : 'none',
            }}>
            {message}
          </Text>
        </View>
      </View>
    );
  }
};

export default TimerItemBox;
