import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import {TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const Container = styled.View`
  padding: 10px;
  margin: 40px 10px 10px 10px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 75px;
`;

const CollectionImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  margin: 10px 10px 10px 10px;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border-color: ${({theme}) => theme.line};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 30px;
`;

const CollectionCircle = ({
  onPress,
  onPress2,
  collectionTitle,
  imageStyle,
  titleStyle,
  nickName,
  collectionId,
  onLongPress,
}) => {
  const [items, setItems] = useState([]);
  const [imageUrl, setImageUrl] = useState('https://i.imgur.com/6XzJjYm.png');
  const isFocused = useIsFocused(); // 스크린 이동시 포커싱 및 useEffect 실행

  useEffect(() => {
    if (isFocused) console.log('Focused');
    _getItemsFromCollection();
  }, [isFocused]);

  useEffect(() => {
    _setImageUrl();
  }, [items]);

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
          console.log('check@@@@@@@', data.dtos);
          setItems(data.dtos);
        });
      // .then(_setImageUrl);
    } catch (e) {
      console.log(e);
    }
  };

  const _setImageUrl = () => {
    if (items.length > 0) {
      setImageUrl(items[0].imgUrl);
    }
  };

  const _onPress = async () => {
    onPress()
      .then(_getItemsFromCollection())
      .then(_setImageUrl())
      .then(onPress2());
  };

  return (
    <Container>
      <TouchableHighlight onPress={_onPress} onLongPress={onLongPress}>
        <View>
          <CollectionImage source={{uri: imageUrl}} stytle={imageStyle} />
          <Row>
            <Title style={titleStyle}>{collectionTitle}</Title>
          </Row>
        </View>
      </TouchableHighlight>
    </Container>
  );
};

export default CollectionCircle;
