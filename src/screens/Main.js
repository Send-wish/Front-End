import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  ItemBox,
  CollectionCircle,
  AddCollectionCircle,
  SearchIcon,
  EditIcon,
  Input,
  Button
  // FilterIcon
} from '../components/Main';
import {theme} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
`;

const UpperContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 0 5px;
`;

const BottomContainer = styled.View`
  flex: 3;
  flex-direction: row;
  background-color: ${({theme}) => theme.subBackground};
  padding: 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const SpackBetweenRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const FlexRow = styled.View`
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
`;

const Column = styled.View`
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const SubTitle = styled.Text`
  margin-top: 3px;
  font-size: 12px;
  color: ${({theme}) => theme.subText};
`;

const ModalView = styled.View`
  flex: 0.8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ModalInView = styled.View`
  flex: 1;
  border-radius: 5px;
  border-color: ${({theme}) => theme.basicText};
  border-width: 2px;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 10px;
  margin: 30px;
  height: 250px;
`;
const ModalText = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.basicText};
  padding: 10px 10px 10px 10px;
`;

const Main = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [visibleMoal, setVisibleModal] = useState(false);
  return (
    <Container insets={insets}>
      <UpperContainer>
        <Row>
          <Column>
            <Title style={{marginTop: 30}}>벌크섭님이 담은 아이템</Title>
          </Column>
        </Row>
        <Row>
          <ScrollView horizontal>
            <CollectionCircle
              title="콜렉션"
              image="https://www.pngplay.com/wp-content/uploads/12/Pikachu-Meme-Background-PNG.png"
              onPress={() => {
                navigation.navigate('Collection');
              }}
            />
            <CollectionCircle
              title="콜렉션"
              image="https://www.pngplay.com/wp-content/uploads/12/Pikachu-Meme-Background-PNG.png"
            />

            <CollectionCircle
              title="콜렉션"
              image="https://www.pngplay.com/wp-content/uploads/12/Pikachu-Meme-Background-PNG.png"
            />
            <Ionicons
              name="ellipsis-vertical"
              size={15}
              color={theme.subText}
              style={{marginTop: 45, marginLeft: 10}}
            />

            <Modal
              animationType="slide"
              transparent={true}
              visible={visibleMoal}>
              <ModalView>
                <ModalInView>
                  <ModalText>컬렉션 이름을 입력해주세요.</ModalText>
                  {/* Modal 다이얼로그 숨기기 */}
                  <Input />
                  <Button title="완료" onPress={() => setVisibleModal(false)} />
                </ModalInView>
              </ModalView>
            </Modal>
            <AddCollectionCircle
              onPress={() => setVisibleModal(true)}
              title="새 버킷 추가"></AddCollectionCircle>
          </ScrollView>
        </Row>
      </UpperContainer>
      <BottomContainer>
        <ScrollView>
          <Column>
            <SpackBetweenRow>
              <View style={{marginBottom: 10}}>
                <Title>내 위시템 전체보기</Title>
                <SubTitle>총 N개의 위시템</SubTitle>
              </View>
              <Row>
                <SearchIcon />
                {/* <FilterIcon /> */}
                <EditIcon />
              </Row>
            </SpackBetweenRow>
          </Column>
          <FlexRow>
            <ItemBox
              title="안녕하세요as
            gasdgsagdsadgsadgasdgasdgsag"
              saleRate="60%"
              price={(70000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              image={
                'https://w7.pngwing.com/pngs/104/341/png-transparent-pokemon-let-s-go-pikachu-ash-ketchum-pokemon-pikachu-pikachu-let-s-go-ash-ketchum-pokemon-pikachu.png'
              }
            />

            <ItemBox
              title="안녕하세요as
            gasdgsagdsadgsadgasdgasdgsag"
              saleRate="60%"
              price={(70000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              image={
                'https://w7.pngwing.com/pngs/104/341/png-transparent-pokemon-let-s-go-pikachu-ash-ketchum-pokemon-pikachu-pikachu-let-s-go-ash-ketchum-pokemon-pikachu.png'
              }
            />

            <ItemBox
              title="안녕하세요as
            gasdgsagdsadgsadgasdgasdgsag"
              saleRate="60%"
              price={(70000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              image={
                'https://w7.pngwing.com/pngs/104/341/png-transparent-pokemon-let-s-go-pikachu-ash-ketchum-pokemon-pikachu-pikachu-let-s-go-ash-ketchum-pokemon-pikachu.png'
              }
            />
          </FlexRow>
        </ScrollView>
      </BottomContainer>
    </Container>
  );
};

export default Main;
