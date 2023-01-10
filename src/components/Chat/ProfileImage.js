import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '../../theme';

const Container = styled.View`
  padding: 10px;
  margin: 10px 10px 10px 10px;
  width: 100px;
  height: 170px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const SignUpImage = styled.Image`
  background-color: ${({theme}) => theme.componentBackground};
  padding: 10px;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  border-radius: 40px;
  margin-bottom: 10px;
`;

const NickName = styled.Text`
  margin-top: 5px;
  margin-right : 5px;
  margin-left : 5px;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
  justify-content: center;
  align-items : center;
  text-align: center;
  height: 20px;
  flex-wrap: wrap;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = ({nickName, image}) => {
  return (
    <Container>
      <SignUpImage source={{uri: image}} />
      {/* <TouchableOpacity onPress={onPress}> */}
        <Row style={{marginBottom: 30}}>
          <NickName>{nickName}</NickName>
        </Row>
      {/* </TouchableOpacity> */}
    </Container>
  );
};

export default ProfileImage;
