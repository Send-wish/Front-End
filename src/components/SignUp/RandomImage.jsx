import styled from 'styled-components';
import React, {memo} from 'react';
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
  border-radius: 30px;
  margin-bottom: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RandomImage = ({image, onPress}) => {
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

export default memo(RandomImage);
