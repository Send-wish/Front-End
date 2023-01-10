import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import Ionic from 'react-native-vector-icons/Ionicons';


const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  margin: 10px;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
  margin-left: 60%;
  `;

const Sharing = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
       <Ionic name="share-social" size={17} color={theme.basicText} />
      </Container>
    </TouchableOpacity>
  );
};

export default Sharing;
