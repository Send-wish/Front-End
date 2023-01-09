import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, PanResponder, Text, View} from 'react-native';
import styled from 'styled-components/native';

const BLACK_COLOR = '#1e272e';
const GREY = '#485460';
const GREEN = '#2ecc71';
const RED = '#e74c3c';

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;
const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`;
const Word = styled.Text`
  font-size: 38px;
  font-weight: 500;
  color: ${props => props.color};
`;
const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 10;
  position: absolute;
`;

export default function App() {
  // Values
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

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
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });

  // 뗐을 때 원래대로
  const onPressOut = Animated.spring(scale, {
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
        console.log(dy);
        position.setValue({x: dx, y: dy});
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

  // State
  const nextAction = () => {
    Animated.parallel([
      Animated.spring(scale, {toValue: 1, useNativeDriver: true}),
      Animated.spring(opacity, {toValue: 1, useNativeDriver: true}),
    ]).start();
  };

  return (
    // '알아' 써클 : scaleOne 함수 실행하여 변할 예정 (커짐)
    <Container>
      <Edge>
        <WordContainer style={{transform: [{scale: scaleOne}]}}>
          <Word color={GREEN}>알아</Word>
        </WordContainer>
      </Edge>


      <Center>
        <IconCard
        // panResponder의 panHandlers를 IconCard에 넣어줌
          {...panResponder.panHandlers}
          style={{
            opacity : opacity,
            transform: [...position.getTranslateTransform(), {scale}],
          }}>
          <Text>Drag me!</Text>
        </IconCard>
      </Center>

      {/* '몰라' 써클 : scaleOne 함수 실행하여 변할 예정 (커짐) */}
      <Edge>
        <WordContainer style={{transform: [{scale: scaleTwo}]}}>
          <Word color={RED}>몰라</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
}
