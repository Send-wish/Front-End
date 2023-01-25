import styled from 'styled-components';
import React, {useRef, useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Animated,
  PanResponder,
  View,
  TouchableHighlight,
} from 'react-native';
import {theme} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';


const Container = styled(Animated.createAnimatedComponent(View))`
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

const ItemView = styled.View`
  background-color: ${({theme}) => theme.subBackground};
  padding: 10px;
  margin: 3px 3px 3px 3px;
  width: 170px;
  height: 170px;
  justify-content: center;
  align-items: center;
  border-radius: 65px;
  flex-wrap: wrap;
  border-style: solid;
  border: ${({theme}) => theme.line};
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
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({x: 0, y: 0, z: 5})).current;

  //Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  // PanResponders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, {dx, dy, dz}) => {
        position.setValue({x: dx, y: dy, z: dz});
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: () => {
        Animated.parallel([onPressOut, goHome]).start();
      },
    }),
  ).current;

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

export default VoteItemBox;
