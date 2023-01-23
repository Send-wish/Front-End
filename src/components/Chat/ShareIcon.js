import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import Ionic from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  /* margin: 10px; */
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
`;

const ShareIcon = ({onPress}) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <Ionic name="share-social" size={20} color={theme.basicText} />
      </TouchableOpacity>
    </Container>
  );
};

export default ShareIcon;
