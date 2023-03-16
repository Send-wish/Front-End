import styled from 'styled-components';
import React, {memo, useState} from 'react';
import {TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '../../theme';

const Container = styled.View`
  padding: 10px;
  margin: 28px 20px 10px 10px;
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
  align-content: center;
  justify-items: center;
  border-radius: 25px;
  border-color: ${({theme}) => theme.line};
  position: relative;
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

const MainCollectionCircle = ({
  onPress,
  collectionTitle,
  imageStyle,
  imageStyle2,
  titleStyle,
  nickName,
  collectionId,
  onLongPress,
  isCollectionEditing,
  isEditing,
  firstImgUrl,
  secondImgUrl,
  thirdImgUrl,
  fourthImgUrl,
}) => {
  const [items, setItems] = useState([]);
  const isFocused = useIsFocused(); // 스크린 이동시 포커싱 및 useEffect 실행
  const [isChecked, setIsChecked] = useState(false);

  const _onPress = async () => {
    onPress();
    setIsChecked(!isChecked);
  };

  return (
    <Container>
      <TouchableHighlight onPress={_onPress} onLongPress={onLongPress}>
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
              marginBottom: 8,
              display: isChecked ? 'none' : 'flex',
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

          <CollectionView style={{display: isChecked ? 'flex' : 'none'}}>
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

          <Row>
            <Title style={titleStyle}>{collectionTitle}</Title>
          </Row>
        </View>
      </TouchableHighlight>
    </Container>
  );
};

export default memo(MainCollectionCircle);
