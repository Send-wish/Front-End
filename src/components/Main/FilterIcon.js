import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Container = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  margin: 6px 8px 0px 2px;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
`;

const FilterIcon = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <FontAwesome5 name="filter" size={15} color={theme.basicText} />
      </Container>
    </TouchableOpacity>
  );
};

export default FilterIcon;