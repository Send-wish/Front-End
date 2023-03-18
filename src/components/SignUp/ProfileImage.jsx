import styled from 'styled-components';
import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';

const Container = styled.View`
  padding: 10px;
  margin: 1px 1px 3px 1px;
  width: 300px;
  height: 160px;
  justify-content: center;
  align-items: center;
  border-radius: 35px;
`;

const SignUpImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  border-radius: 33px;
  margin-bottom: 10px;
`;


const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = ({image, onPress}) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress} style={{width: '100%'}}>
        <Row style={{marginBottom: 30, widht: '100%'}}>
          {/* <Title>{title}</Title> */}
          <SignUpImage source={{uri : image? image : null}} />
          {/* <Feather name="edit-2" size={18} color={theme.basicText} /> */}
        </Row>
      </TouchableOpacity>
    </Container>
  );
};

export default memo(ProfileImage);
