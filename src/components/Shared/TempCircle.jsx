import styled from 'styled-components';
import React, {useState, memo} from 'react';
import {TouchableHighlight, View} from 'react-native';
import {theme} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';

const Container = styled.View`
  margin: 20px 5px 5px 3px;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 27px;
`;

const ImageContainer = styled.View`
  background-color: ${({theme}) => theme.tintColorGreen};
  padding: 10px;
  margin: 10px 10px 10px 10px;
  border-width: 0.2px;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 27px;
`;

const CollectionImage = styled.Image`
  background-color: ${({theme}) => theme.mainBackground};
  padding: 10px;
  margin: 10px 10px 10px 10px;
  border-width: 0.2px;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 27px;
  border-color: ${({theme}) => theme.basicText};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 30px;
`;

const TempCircle = ({frName, friendName, titleStyle, image, onPress}) => {
  const _pressFriend = () => {
    setIsChecked(!isChecked);
    onPress();
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <Container>
      <TouchableHighlight onPress={_pressFriend}>
        <View>
          <Row>
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
            <ImageContainer>
              <CollectionImage
                style={{
                  opacity: isChecked ? 0.5 : 1,
                  postion: 'absolute',
                }}
                source={{uri: image ? image : null}}
                value={frName}
              />
            </ImageContainer>
          </Row>
          <Title style={titleStyle}>{frName}</Title>
        </View>
      </TouchableHighlight>
    </Container>
  );
};

export default memo(TempCircle);
