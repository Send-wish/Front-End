import styled from 'styled-components';
import React, {useRef} from 'react';
import {TouchableOpacity, Animated, PanResponder, View} from 'react-native';

const Container = styled(Animated.createAnimatedComponent(View))`
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

const ItemBox = ({
  onPress,
  saleRate,
  itemName,
  itemPrice,
  itemImage,
  itemId,
  itemUrl,
}) => {
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

  //  State

  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
      <ItemImage source={{uri: itemImage}} />
        <Row>
          <Sale>{saleRate}</Sale>
          <Price> {itemPrice}원 </Price>
        </Row>
        <Title>{itemName}</Title>
      </TouchableOpacity>
    </Container>
  );
};

export default ItemBox;
