import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import View from 'react-native-view';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '../../theme';

const Container = styled.View`
  padding: 10px;
  margin: 3px 5px 0 0;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const SignUpImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  border-radius: 18px;
`;

const Title = styled.Text`
  margin-top: 5px;
  margin-right : 5px;
  margin-left : 16px;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
  justify-content: center
  align-items : center;
  text-align: center;
  height: 20px;
  flex-wrap: wrap;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = ({title, image, onPress}) => {
  return (
    <Container>
      <SignUpImage source={{uri: image}} />
      <TouchableOpacity onPress={onPress}>
        <Row>
          <Title>{title}</Title>
        </Row>
      </TouchableOpacity>
    </Container>
  );
};

export default ProfileImage;
