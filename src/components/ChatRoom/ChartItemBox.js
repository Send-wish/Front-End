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
  margin-top: 8px;
  width: 90px;
  height: 120px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const ItemImage = styled.Image`
  background-color: ${({theme}) => theme.tintColorPink};
  padding: 10px;
  margin: 2px 2px 2px 2px;
  width: 73px;
  height: 73px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  flex-wrap: wrap;
  border-style: solid;
  border: ${({theme}) => theme.line};
`;

const ItemView = styled.View`
  background-color: ${({theme}) => theme.subBackground};
  padding: 10px;
  margin: 3px 3px 3px 3px;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  flex-wrap: wrap;
  border-style: solid;
  border: ${({theme}) => theme.line};
`;

const Title = styled.Text`
  margin: 1px;
  font-size: 9px;
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
  font-size: 9px;
  font-weight: bold;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  color: ${({theme}) => theme.basicText};
  width : 60px;
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

const ChartItemBox = ({
  onPress,
  onLongPress,
  saleRate,
  itemName,
  itemPrice,
  itemImage,
  titleStyle,
  imageStyle,
  priceStyle,
  isEditing,
  isItemSelected
}) => {
  _pressCheckButton = () => {
    setIsChecked(!isChecked);
    onPress();
  };

  const [isChecked, setIsChecked] = useState(false);

  
  return (
    <View>
      <TouchableHighlight
        onPress={onPress}
        style={{display: isEditing ? 'none' : 'flex'}}
        onLongPress={onLongPress}>
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
              {itemPrice}원
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

export default ChartItemBox;
