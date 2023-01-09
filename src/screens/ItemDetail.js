import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, PanResponder, Text, View} from 'react-native';
import styled from 'styled-components/native';

const ItemDetail = () => {
  const componentRef = useRef(null);

  const handlePress = () => {
    const component = componentRef.current;
    if (component) {
      const layout = component.getBoundingClientRect();
      console.log(`Component is at position x: ${layout.x}, y: ${layout.y}`);
    }
  };

  return (
    <ItemDetail ref={componentRef} onPress={handlePress} />
  );
};

export default ItemDetail;