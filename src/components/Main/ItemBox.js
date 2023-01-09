import styled from 'styled-components';
import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {TouchableOpacity, Animated, Easing, PanResponder} from 'react-native';
import View from 'react-native-view';

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

const ItemBox = forwardRef(({onPress, saleRate, title, price, image}, ref) => {
  // Values
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({x: 0, y: 0, z: 20})).current;

  const scaleOne = position.y.interpolate({
    inputRange: [-300, -80],
    outputRange: [2, 1],
    extrapolate: 'clamp',
  });

  const scaleTwo = position.y.interpolate({
    inputRange: [80, 300],
    outputRange: [1, 2],
    extrapolate: 'clamp',
  });

  // Animations

  // 눌렀을 때 조금 작아짐
  const onPressIn = Animated.spring(opacity, {
    toValue: 0.5,
    useNativeDriver: true,
  });

  // 뗐을 때 원래대로
  const onPressOut = Animated.spring(opacity, {
    toValue: 1,
    useNativeDriver: true,
  });

  // 홈으로 돌아감
  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  // 떨어졌을 때 작아지며 없어짐
  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  // 떨어뜨렸을 때 흐려지며 없어짐
  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      // 주어진 터치 이벤트에 반응할지 결정하는 함수
      // 아래도 있음
      // onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,

      // 진행 중일 때 실행되는 함수 ( 첫번째 인자 : event, 두번째 인자 : gestureState)
      onPanResponderMove: (_, {dx, dy}) => {
        // console.log(dy);
        position.setValue({x: dx, y: dy});
        onPressIn.start();
      },
      //터치 이벤트가 발생 할 때 실행되는 함수
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      // 터치 이벤트가 끝날 때 실행되는 함수
      // 아래 함수도 있음
      // onPanResponderTerminate: () => {}
      onPanResponderRelease: (_, {dy}) => {
        //만약에 y축으로 250 이상 움직였다면, 혹은 -250이하로 가면
        if (dy < -250 || dy > 250) {
          // 여러 애니메이션을 하나씩 실행
          Animated.sequence([
            // 여러 애니메이션을 동시에 실행
            Animated.parallel([onDropScale, onDropOpacity]),
            // 크기가 0으로 됨
            Animated.timing(position, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(nextAction);
        } else {
          //영역으로 안 가면 원래대로 돌아감
          Animated.parallel([onPressOut, goHome]).start();
        }
      },
    }),
  ).current;

  const nextAction = () => {
    Animated.parallel([
      Animated.spring(scale, {toValue: 1, useNativeDriver: true}),
      Animated.spring(opacity, {toValue: 1, useNativeDriver: true}),
    ]).start();
  };

  return (
    <Container
        {...panResponder.panHandlers}
        style={{
          opacity,
          transform: [...position.getTranslateTransform(), {scale}],
        }}>
          <TouchableOpacity ref={ref} onPress={onPress}>
        <ItemImage source={{uri: image}} />
        <Row>
          <Sale>{saleRate}</Sale>
          <Price> {price} </Price>
        </Row>
        <Title>{title}</Title>
    </TouchableOpacity>
      </Container>
  );
});

export default ItemBox;
