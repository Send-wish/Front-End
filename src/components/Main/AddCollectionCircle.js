import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {theme} from '../../theme';

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
          <AntDesign name="plus" size={30} color={theme.basicText} />
        </CollectionImage>
        <Row>
          <Title>{title}</Title>
        </Row>
      </TouchableOpacity>
    </Container>
  );
};

<<<<<<< HEAD
export default AddCollectionCircle;
=======
export default AddCollectionCircle;
>>>>>>> 1ad815514b54f43da7cba1a7b33d178cd5ae3c7a
