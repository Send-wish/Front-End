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
import {SmallCircleBtn, ItemBox, CollectionCircle} from '../components/Main';
import {theme} from '../theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionic from 'react-native-vector-icons/Ionicons';

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

const RoundContainer = styled.View`
  flex: 6;
  flex-direction: row;
  background-color: ${({theme}) => theme.subBackground};
  padding: 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  margin: 0px 0px 30px 0px;
  position: relative;
`;

const Title = styled.Text`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const PersonName = styled.Text`
  margin: 10px 0px 10px 10px;
  font-size: 15px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const PencilIcon = styled.Text`
  color: ${({theme}) => theme.basicText};
  margin: 15px 15px 0px 0px;
`;

const PersonIcon = styled.Text`
  color: ${({theme}) => theme.basicText};
  margin: 0px 5px 0px 15px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const FlexRow = styled.View`
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
`;

const Collection = ({route, navigation}) => {
  const insets = useSafeAreaInsets();
  // const [collectionId, collectionTitle, memberId] = route.params;
  // const [itemId, setItemId] = useState(0);
  // const [items, setitems] = useState([]);
  // const [copiedText, setCopiedText] = useState('');
  // 컬렉션 상세페이지 아이템들 받아오기
  // collection Id, member Id  등등 필요한 요소를 보내
  // const _postItemURL = async () => {
  //   try {
  //     const response = await fetch(
  //     fetch('https://api.sendwish.link:8081/item/parsing',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           itemId: itemId,
  //           collectionId: collectionId,
  //         }),
  //       },
  //     );
  //     const json = await response.json();
  //     console.log(json);
  //   }
  const _openUrl = url => {
    console.log('urlopen', url);
    Linking.openURL(url);
  };

  useEffect(() => {
    fetch(
      `https://api.sendwish.link:8081/collection/${memberId}/${collectionId}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setProducts(data.dtos);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  <Container insets={insets}>
    <UpperContainer>
      <Row>
        <Title>CollectionName</Title>
        <PencilIcon>
          <FontAwesome5 name={'pencil-alt'} size={15} />
        </PencilIcon>
      </Row>
      <Row>
        <PersonIcon>
          <Ionic name={'person-add-outline'} size={30} />
        </PersonIcon>
        <PersonName>by 와깐나이!</PersonName>
      </Row>
    </UpperContainer>
    <RoundContainer>
      <ScrollView>
        <Title>내 위시템 전체보기</Title>
        <FlexRow>
          {items.map(item => (
            <ItemBox
              productUrl={item?.originUrl}
              itemImage={item?.imageUrl}
              itemName={item?.name}
              itemPrice={item?.price}
              onPress={() => {
                console.log('urlcheck', item.originUrl);
                _openUrl(item.originUrl);
              }}
            />
          ))}
          <ItemBox />
        </FlexRow>
      </ScrollView>
    </RoundContainer>
  </Container>;
};

export default Collection;
