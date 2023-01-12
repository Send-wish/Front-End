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
import {useIsFocused} from '@react-navigation/native';

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
  background-color: ${({theme}) => theme.tintColorPink};
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

const ItemView = styled.View`
  background-color: ${({theme}) => theme.subBackground};
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
  onLongPress,
  onPress,
  saleRate,
  itemName,
  itemPrice,
  itemImage,
  titleStyle,
  imageStyle,
  priceStyle,
  isEditing,
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

  _pressCheckButton = () => {
    setIsChecked(!isChecked);
    onPress();
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <View>
      <TouchableHighlight
        onLongPress={onLongPress}
        onPress={onPress}
        style={{display: isEditing ? 'none' : 'flex'}}>
        <Container>
          <ItemImage source={{uri: itemImage}} style={imageStyle} />
          <Row>
            <Sale style={priceStyle}>{saleRate}</Sale>
            <Price style={titleStyle}> {itemPrice}원 </Price>
          </Row>
          <Title style={titleStyle}>{itemName}</Title>
        </Container>
      </TouchableHighlight>

      <TouchableHighlight
        onLongPress={onLongPress}
        onPress={_pressCheckButton}
        style={{display: isEditing ? 'flex' : 'none'}}>
        <Container>
          <ItemView
            style={{
              backgroundColor: isChecked
                ? theme.tintColorGreen
                : theme.mainBackground,
            }}>
            <Feather
              name="check"
              size={40}
              color={theme.basicText}
              style={{
                position: 'absolute',
                display: isChecked ? 'flex' : 'none',
                zIndex: 10,
              }}
            />
            <ItemImage
              source={{uri: itemImage}}
              style={{opacity: isChecked ? 0.4 : 0.3, position: 'absolute'}}
            />
          </ItemView>
          <Row>
            <Sale
              style={{
                color: isChecked
                  ? theme.tintColorPink
                  : theme.tintcolorPalepink,
              }}>
              {saleRate}
            </Sale>
            <Price style={{color: isChecked ? theme.basicText : theme.subText}}>
              {' '}
              {itemPrice}원{' '}
            </Price>
          </Row>
          <Title style={{color: isChecked ? theme.basicText : theme.subText}}>
            {itemName}
          </Title>
        </Container>
      </TouchableHighlight>
    </View>
  );
};

export default ItemBox;
