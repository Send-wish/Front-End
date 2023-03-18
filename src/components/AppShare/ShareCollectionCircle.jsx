import React, {memo}from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const CircleCollectionImage = styled.Image`
  background-color: '#2f2f2f';
  margin: 0.2px;
  width: 35px;
  height: 35px;
  border-width: 1px;
  border-color: '#a6a6a6';
`;

const ShareCollectionCircle = ({
    onPress,
    title,
    defaultImage,
    collectionId,
    sharedUrl,
  }) => {
    const _onPress = () => {
      onPress(collectionId, nickName, sharedUrl);
    };
  
    return (
      <View style = {styles.CircleContainer}>
        <TouchableOpacity onPress={_onPress}>
          <View
            style={styles.TouchView}>
            <CircleCollectionImage
              source={{uri: defaultImage[0]}}
              style={{borderTopLeftRadius: 20}}
            />
            <CircleCollectionImage
              source={{uri: defaultImage[1]}}
              style={{borderBottomLeftRadius: 20}}
            />
            <CircleCollectionImage
              source={{uri: defaultImage[2]}}
              style={{borderTopRightRadius: 20}}
            />
            <CircleCollectionImage
              source={{uri: defaultImage[3]}}
              style={{borderBottomRightRadius: 20}}
            />
          </View>
  
          <View style = {styles.CircleRow}>
            <Text style = {styles.CircleTitle}>{title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
export default memo(ShareCollectionCircle);

const styles = StyleSheet.create({
    CircleContainer: {
      padding: 10,
      marginTop: 22,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      width: 65,
      height: 65,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 75,
    },
    CircleRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    CircleTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#636363',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      width: 80,
      marginTop: 6,
    },
    TouchView: {
      width: 72,
      height: 72,
      backgroundColor: '#111111',
      borderRadius: 21,
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      zIndex: 1,
    },
  });
  