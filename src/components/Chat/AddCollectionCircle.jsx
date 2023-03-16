import styled from 'styled-components';
import React,{memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  padding: 10px;
  margin: 10px 10px 10px 10px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 75px;
`;

const CollectionImage = styled.View`
  background-color: ${({theme}) => theme.strongBackground};
  padding: 10px;
  margin: 5px 5px 5px 5px;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: ${({theme}) => theme.strongBackground};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
`;

const AddCollectionCircle = ({onPress, title}) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <CollectionImage>
        <Ionicons name="person-add" size={30} color={theme.componentBackground} />
        </CollectionImage>
        <Row>
          <Title>{title}</Title>
        </Row>
      </TouchableOpacity>
    </Container>
  );
};

export default memo(AddCollectionCircle);
