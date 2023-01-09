import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView, Modal, TextInput} from 'react-native';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  SearchIcon,
  ItemBox,
  ProfileImage,
  EditIcon,
  Input,
  Button,
} from '../components/Collection';

import {theme} from '../theme';
import Ionic from 'react-native-vector-icons/Ionicons';
import Main from './Main';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  justify-content: center;
`;

const UpperContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme}) => theme.mainBackground};
  padding: 0 5px;
`;

const BottomContainer = styled.View`
  flex: 4;
  flex-direction: row;
  background-color: ${({theme}) => theme.subBackground};
  padding: 10px;
  padding-top: 20px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const WrapRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  height: 30px;
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
  font-size: 25px;
  font-weight: bold;
  color: ${({theme}) => theme.basicText};
`;

const SubTitle = styled.Text`
  margin-top: 3px;
  font-size: 12px;
  color: ${({theme}) => theme.basicText};
`;

const ModalView = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.mainBackground};
  padding-top: ${({insets: {top}}) => top}px;
  justify-content: center;
  align-items: center;
  opacity: 0.98;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Collection = ({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const [visibleModal, setVisibleModal] = useState(false);
  const refChangedColname = useRef(null);
  const [ChangedColName, setChangedColname] = useState(collectionTitle);
  const {collectionId, collectionTitle, nickName} = route.params;
  const [isChanged, setIsChanged] = useState(false);
  
  // const [modifyName, setModifyName] = useState(collectionTitle);
  // useEffect(() => {
  // console.log('namecheck',modifyName)
  // }, [modifyName])
  
  const _changeCollectionName = async () => {
    setVisibleModal(false);
    console.log('data check', nickName, collectionId, ChangedColName)
    try {
      await fetch('https://api.sendwish.link:8081/collection', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickName,
          collectionId: collectionId,
          newTitle: ChangedColName,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status} 에러발생`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data)
          setChangedColname(data)
          setIsChanged(true)
          // setModifyName(ChangedColName)
          // console.log('해치웠나',modifyName)
          console.log("chagned true?", isChanged)
          console.log('change_check!!',ChangedColName)
        })
        .then(result => {
          console.log('result', result);
        }); //for debug
    } catch (e) {
      console.log('change fail');
    }
  };

  return (
    <Container insets={insets}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visibleModal}
        style={{flex: 1}}>
        <ModalView insets={insets}>
          <StyledTouchableOpacity onPress={() => setVisibleModal(false)}>
            <Ionic name="chevron-back" size={25} color={theme.basicText} />
          </StyledTouchableOpacity>
          <Input
            ref={refChangedColname}
            value={ChangedColName}
            onChangeText={setChangedColname}
            onBlur={() => setChangedColname(ChangedColName)}
            maxLength={20}
            onSubmitEditing={() => {
              _changeCollectionName();
            }}
            placeholder="변경할 콜렉션 이름을 입력해주세요 :)"
            returnKeyType="done"
          />
          <Button title="변경하기" onPress={() => _changeCollectionName()} />
        </ModalView>
      </Modal>
      <UpperContainer>
        <Row>
          <Column>
            <TouchableOpacity
              onPress={() => {
                passName = {nickName};
                console.log('check colleciton to main nickName 전달',passName)
                navigation.navigate('Main', {params: passName});
              }}>
              <Ionic name="chevron-back" size={25} color={theme.basicText} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setVisibleModal(true) 
                    console.log('컬렉션이름', ChangedColName);}
          }>
              <WrapRow style={{marginTop: 30}}>
                <Title style={{marginRight: 10}}>
                  <Title style={{fontSize: 27, color: theme.tintColorGreen}}>
                    {ChangedColName.title + ' '}
                    {/* {modifyName+ ' '} */}
                    {/* {isChanged === true? {collectionTitle} : {modifyName[0] + ' '}} */}
                  </Title>
                    콜렉션
                </Title>
                <Feather
                  name="edit-2"
                  size={20}
                  color={theme.basicText}
                  style={{marginTop: 3}}
                />
              </WrapRow>
            </TouchableOpacity>

            <WrapRow
              style={{
                paddingTop: 20,
                width: 400,
                height: 60,
              }}>
              <ProfileImage />
              <SubTitle style={{fontSize: 15}}>bulksup님이 담았어요!</SubTitle>
            </WrapRow>
          </Column>
        </Row>
      </UpperContainer>

      <BottomContainer>
        <ScrollView>
          <Column>
            <SpackBetweenRow>
              <View style={{marginBottom: 10}}>
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

export default Collection;

<Title onChangeText={ChangedColName => setChangedColname(ChangedColName)}>{ChangedColName}</Title>
