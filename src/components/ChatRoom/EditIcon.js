import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';

const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  margin: 0px 0px 0px 10px;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
`;

const EditIcon = ({onPress,name}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Feather name={name} size={15} color={theme.basicText} />
      </Container>
    </TouchableOpacity>
  );
};

export default EditIcon;
