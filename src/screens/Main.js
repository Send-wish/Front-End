import React, {Component} from 'react';
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
  // FilterIcon
} from '../components/Main';
import {theme} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const Main = () => {
  const insets = useSafeAreaInsets();

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
            <AddCollectionCircle title="새 버킷 추가"></AddCollectionCircle>
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
