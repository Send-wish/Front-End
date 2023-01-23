import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
// check!
const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  margin: 6px 8px 0px 2px;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
`;

const SearchIcon = ({onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container style ={style}>
       <Entypo name="magnifying-glass" size={15} color={theme.basicText} />
      </Container>
    </TouchableOpacity>
  );
};

export default SearchIcon;
