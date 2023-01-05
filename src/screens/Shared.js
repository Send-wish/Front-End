import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Shared = () => {
  const navigation = useNavigation();
  const StyledText = styled.Text`
    margin-top: 20px;
    margin-left: 15px;
    height: 70px;
  `;
  return (
    <View>
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: 15,
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '500',
                color: '#ff1493',
              }}>
              SendWish
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView horizontal>
        <StyledText>
          <View>
            <Text> Add your Wish </Text>
            <TouchableOpacity onPress={() => navigation.navigate()}>
              <MaterialIcons
                name="collections"
                style={{fontSize: 50, maginLeft: 0, padding: 10}}
              />
            </TouchableOpacity>
          </View>
        </StyledText>
      </ScrollView>
    </View>
  );
};

export default Shared;
