import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import Entypo from 'react-native-vector-icons/Entypo';

const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  margin: 6px 8px 0px 2px;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
`;

const SearchIcon = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
       <Entypo name="magnifying-glass" size={15} color={theme.basicText} />
      </Container>
    </TouchableOpacity>
  );
};

<<<<<<< HEAD
export default SearchIcon;
=======
export default SearchIcon;
>>>>>>> 1ad815514b54f43da7cba1a7b33d178cd5ae3c7a
