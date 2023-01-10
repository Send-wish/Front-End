import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

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
  collectionTitle,
  imageStyle,
  titleStyle,
  nickName,
  collectionId,
}) => {
  const [items, setItems] = useState([]);
  const [imageUrl, setImageUrl] = useState('https://i.imgur.com/6XzJjYm.png');

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
          setItems(data.dtos);
        })
        .then(setImageUrl(items[0].imgUrl));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    _getItemsFromCollection();
  });

  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <CollectionImage source={{uri: imageUrl}} stytle={imageStyle} />
        <Row>
          <Title style={titleStyle}>{collectionTitle}</Title>
        </Row>
      </TouchableOpacity>
    </Container>
  );
};

export default CollectionCircle;
