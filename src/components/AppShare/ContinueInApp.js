import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ContiuneInApp = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style = {styles.ViewApp}>
        <Text style = {styles.TextApp}>어플로 이동하기</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContiuneInApp;

const styles = StyleSheet.create({
    ViewApp : {
        height: 33,
        width: 120,
        borderRadius: 10,
        backgroundColor: '#ff1493',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    TextApp : {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
