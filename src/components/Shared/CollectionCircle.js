import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import {TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '../../theme';

const Container = styled.View`
  padding: 10px;
  margin: 45px 25px 10px 10px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 75px;
`;

const CollectionImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  margin: 0.2px;
  width: 39px;
  height: 39px;
  justify-content: center;
  align-items: center;
  border-color: ${({theme}) => theme.line};
`;

const CollectionView = styled.View`
  background-color: ${({theme}) => theme.tintColorPink};
  padding: 10px;
  margin-bottom: 8px;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
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
  shareCollectionName,
  // isClicked,
  titleStyle,
  nickName,
  shareCollectionId,
  onLongPress,
  isShareCollectionEditing,
  isEditing,
  firstImgUrl,
  secondImgUrl,
  thirdImgUrl,
  fourthImgUrl,
}) => {
  return (
    <Container>
      <TouchableHighlight
        onPress={onPress}
        onLongPress={onLongPress}
        style={{opacity: isEditing ? 0.5 : 1}}>
        <View>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: theme.strongBackground,
              borderRadius: 25,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              zIndex: 1,
              // display: isCollectionEditing ? 'none' : 'flex',
              marginBottom: 8,
              display: isShareCollectionEditing ? 'none' : 'flex',
            }}>
            <CollectionImage
              source={{uri: firstImgUrl}}
              style={{borderTopLeftRadius: 25}}
            />
            <CollectionImage
              source={{uri: secondImgUrl}}
              style={{borderBottomLeftRadius: 25}}
            />
            <CollectionImage
              source={{uri: thirdImgUrl}}
              style={{borderTopRightRadius: 25}}
            />
            <CollectionImage
              source={{uri: fourthImgUrl}}
              style={{borderBottomRightRadius: 25}}
            />
          </View>

          <View
            style={{
              display: isShareCollectionEditing ? 'flex' : 'none',
            }}>
            <CollectionView>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: theme.strongBackground,
                  borderRadius: 25,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  zIndex: 1,
                  marginBottom: 8,
                  opacity: 0.5,
                  position: 'absolute',
                }}>
                <CollectionImage
                  source={{uri: firstImgUrl}}
                  style={{borderTopLeftRadius: 25}}
                />
                <CollectionImage
                  source={{uri: secondImgUrl}}
                  style={{borderBottomLeftRadius: 25}}
                />
                <CollectionImage
                  source={{uri: thirdImgUrl}}
                  style={{borderTopRightRadius: 25}}
                />
                <CollectionImage
                  source={{uri: fourthImgUrl}}
                  style={{borderBottomRightRadius: 25}}
                />
              </View>
            </CollectionView>
            <View
              style={{
                borderRadius: 100,
                position: 'absolute',
                marginLeft: 54,
                backgroundColor: theme.mainBackground,
                opacity: 0.7,
              }}>
              <Feather name="minus-circle" size={30} color="white" />
            </View>
          </View>
          <Row>
            <Title style={titleStyle}>{shareCollectionName}</Title>
          </Row>
        </View>
      </TouchableHighlight>
    </Container>
  );
};

export default CollectionCircle;
