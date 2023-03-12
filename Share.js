import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {ShareMenuReactView} from 'react-native-share-menu';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

import {
  CollectionCircle,
  ShareCollectionCircle,
  ContiuneInApp,
} from './src/components/AppShare';

const Share = () => {
  const [sending, setSending] = useState(false);
  const appGroupIdentifier = 'group.app.sendwish.jungle';
  const [waitSecond, setWaitSecond] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 및 로딩낭비 방지
  const [collections, setCollections] = useState([]); // 컬렉션 목록
  const [shareCollections, setShareCollections] = useState([]);
  const [sharedUrl, setSharedUrl] = useState('');

  // 공유 스토리지에서 닉네임 가져오기
  const loadUsernameFromSharedStorage = async () => {
    try {
      const value = await SharedGroupPreferences.getItem(
        'nickNameData',
        appGroupIdentifier,
      );
      nickName = value;
    } catch (errorCode) {
      // errorCode 0 = no group name exists. You probably need to setup your Xcode Project properly.
      // errorCode 1 = there is no value for that key
      console.log(errorCode);
    }
  };

  loadUsernameFromSharedStorage();

  useEffect(() => {
    ShareMenuReactView.data()
      .then(({data}) => {
        _getCollections();
        _getShareCollections();
        postItem(data[0].data);
        setSharedUrl(data[0].data);
        _timeoutFunc();
      })
      .catch(error => {
        console.log(error.config);
      });
  }, []);

  const _getCollections = async () => {
    setLoading(true);
    try {
      fetch(`https://api.sendwish.link:8081/collections/${nickName}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setCollections(data);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // 공유 컬렉션 렌더링
  const _getShareCollections = async () => {
    setLoading(true);
    try {
      fetch(`https://api.sendwish.link:8081/collections/shared/${nickName}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setShareCollections(data);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const postItem = async url => {
    try {
      fetch('https://api.sendwish.link:8081/item/parsing', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          url: url,
          nickname: nickName,
        }),
      })
        .then(response => {
          return response.json();
        })
        .then(() => {
          setSending(true);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const _addItemToCollection = async (collectionId, nickName, sharedUrl) => {
    try {
      fetch('https://api.sendwish.link:8081/item/enrollment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nickname: nickName,
          collectionId: collectionId,
          itemIdList: [sharedUrl],
        }),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        _getCollections();
        return response.json();
      });
    } catch (e) {
      console.log('adding item to collection failed');
    }
  };

  const _addItemToShareCollection = async (
    shareCollectionId,
    nickName,
    sharedUrl,
  ) => {
    try {
      fetch('https://api.sendwish.link:8081/item/enrollment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nickname: nickName,
          collectionId: shareCollectionId,
          itemIdList: [sharedUrl],
        }),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        _getShareCollections();
        return response.json();
      });
    } catch (e) {
      console.log('adding item to collection failed');
    }
  };

  const _setWaitSecond = () => {
    setWaitSecond(true);
  };

  const _timeoutFunc = () => {
    setTimeout(_setWaitSecond, 1000);
  };
  return (
      <View style = {styles.Container}>
        <TouchableOpacity
          style={{width: '100%', height: '60%'}}
          onPress={() => {
            ShareMenuReactView.dismissExtension();
          }}></TouchableOpacity>

        <View style = {styles.BottomContainer}>
          <View style = {styles.LineIcon} />
          <View style = {styles.SaveStatus}>
            <View style = {styles.Row}>
              <Text style={styles.MainTitle}>
                {waitSecond ? '저장 완료!' : '아이템 저장 중 ... !'}
              </Text>
              <View
                style={styles.InnerView}>
                <ContiuneInApp
                  onPress={() => {
                    ShareMenuReactView.continueInApp();
                  }}
                />
              </View>
            </View>
          </View>
          <View style = {styles.DividingLine} />
          <View style={{padding: 8, marginTop: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style = {styles.SectionTitle}> 컬렉션에 담기</Text>
            </View>
            <View style = {styles.CollectionList}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {collections.error
                  ? null
                  : collections.map(collection => (
                      <CollectionCircle
                        key={collection?.collectionId}
                        collectionId={collection?.collectionId}
                        title={collection?.title}
                        defaultImage={collection?.defaultImage}
                        nickName={collection?.nickname}
                        onPress={_addItemToCollection}
                        sharedUrl={sharedUrl}
                      />
                    ))}
              </ScrollView>
            </View>
            <Text style = {styles.SectionTitle}> 공유컬렉션에 담기</Text>
            <View style = {styles.CollectionList}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {shareCollections.error
                  ? null
                  : shareCollections.map(shareCollection => (
                      <ShareCollectionCircle
                        key={shareCollection?.collectionId}
                        collectionId={shareCollection?.collectionId}
                        title={shareCollection?.title}
                        defaultImage={shareCollection?.defaultImage}
                        nickName={shareCollection?.nickname}
                        onPress={_addItemToShareCollection}
                        sharedUrl={sharedUrl}
                      />
                    ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
  );
};

export default Share;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  BottomContainer: {
    width: '100%',
    height: '58%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  Row: {
    flex : 1,
    width : '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  SaveStatus: {
    width: '100%',
    height: '11$',
    justifyContent: 'center',
  },
  CollectionList: {
    width: '100%',
    height: '33%',
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 13,
    paddingTop: 9,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    backgroundColor: '#d5d5d5'
  },
  DividingLine: {
    width: '96%',
    height: '0.2%',
    backgroundColor: '#a6a6a6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    zIndex: 1,
  },
  LineIcon: {
    width: '15%',
    height: '1%',
    backgroundColor: '#a6a6a6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 33,
  },
  SectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111111',
    marginLeft: 8,
  },
  InnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '39%',
    flexWrap: 'wrap',
  },
  MainTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#111111',
    marginLeft: 10,
  },
});
