import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  padding: 10px;
  margin: 40px 10px 10px 10px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 75px;
`;

const CollectionImage = styled.View`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  margin: 10px 10px 10px 10px;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border-color: ${({theme}) => theme.line};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 30px;
`;

const AddCollectionCircle = ({onPress, title}) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <CollectionImage>
        <Ionicons name="person-add" size={40} color={theme.basicText} />
        </CollectionImage>
        <Row>
          <Title>{title}</Title>
        </Row>
      </TouchableOpacity>
    </Container>
  );
};

export default AddCollectionCircle;
