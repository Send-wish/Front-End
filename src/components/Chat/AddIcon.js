import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  margin: 10px 0px 30px 10px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  position: relative;
`;

const AddIcon = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
       <Ionicons name="person-add" size={20} color={theme.basicText} />
      </Container>
    </TouchableOpacity>
  );
};

export default AddIcon;