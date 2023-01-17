import styled from 'styled-components';
import React, {useState} from 'react';
import {TouchableOpacity, TouchableHighlight, View} from 'react-native';
import {theme} from '../../theme';

const Container = styled.View`
  margin: 20px 10px 10px 10px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 75px;
`;

const CollectionImage = styled.Image`
  background-color: ${({theme}) => theme.mainBackground};
  padding: 10px;
  margin: 10px 10px 10px 10px;
  border-width: 1px;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
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

const TempCircle = ({
  frName,
  friendName,
  titleStyle,
  image,
  onPress,
}) => {
  const _pressClickButton = () => {
    setIsClicked(!isClicked);
    onPress();
  };

  const [isClicked, setIsClicked] = useState(false);

  return (
    <Container>
      <TouchableHighlight onPress={_pressClickButton}>
        <View>
          <Row>
            <CollectionImage
              style={{
                backgroundColor: isClicked
                  ? theme.tintColorGreen
                  : theme.mainBackground,
                opacity: isClicked ? 0.5 : 1,
              }}
              source={{uri : image? image : null}}
              value={frName}
            />
          </Row>
          <Title style={titleStyle}>{frName}</Title>
        </View>
      </TouchableHighlight>
    </Container>
  );
};

export default TempCircle;
