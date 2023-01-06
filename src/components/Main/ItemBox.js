import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import View from 'react-native-view';

const Container = styled.View`
  padding: 10px;
  margin: 1px 1px 3px 1px;
  width: 120px;
  height: 160px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const ItemImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  margin: 3px 3px 3px 3px;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  flex-wrap: wrap;
  border-style: solid;
  border: ${({theme}) => theme.line};
`;

const Title = styled.Text`
  margin: 1px;
  font-size: 10px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  width: 80px;
  height: 25px;
  flex-wrap: wrap;
`;

const Price = styled.Text`
  margin: 1px;
  font-size: 11px;
  font-weight: bold;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  color: ${({theme}) => theme.basicText};
`;

const Sale = styled.Text`
  margin: 1px;
  font-size: 11px;
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

const ItemBox = ({onPress, saleRate, title, price, image}) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <ItemImage source={{uri: image}} />
        <Row>
          <Sale>{saleRate}</Sale>
          <Price> {price} </Price>
        </Row>
        <Title>{title}</Title>
      </TouchableOpacity>
    </Container>
  );
};

export default ItemBox;