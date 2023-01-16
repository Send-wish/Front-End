import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import View from 'react-native-view';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '../../theme';

const Container = styled.View`
  padding: 5px;
  margin: 2px 7px 7px 7px;
  width: 100px;
  height: 160px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const SignUpImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  width: 90px;
  height: 90px;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
  border-radius: 40px;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  margin-top: 5px;
  margin-right : 5px;
  margin-left : 16px;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
  justify-content: center;
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

const RandomImage = ({title, image, onPress}) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress} style={{width: '100%'}}>
        <Row style={{marginBottom: 30, widht: '100%'}}>
          <SignUpImage source={{uri:image}} />
        </Row>
      </TouchableOpacity>
    </Container>
  );
};

export default RandomImage;
