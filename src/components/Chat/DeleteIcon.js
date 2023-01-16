import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import Antdesign from 'react-native-vector-icons/AntDesign';


const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
  `;

const DeleteIcon = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
       <Antdesign name="delete" size={20} color={theme.basicText} />
      </Container>
    </TouchableOpacity>
  );
};

export default DeleteIcon;
