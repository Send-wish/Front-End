// Basic React Native App
import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';

// Screens
import {
  Chat,
  Collection,
  Main,
  Shared,
  SignIn,
  SignUp,
  SharedCollection,
} from './src/screens';
import Share from './Share';

// color theme
import {ThemeProvider} from 'styled-components';
import {theme} from './src/theme';

// React Native Hooks
import {NavigationContainer, useLinkProps} from '@react-navigation/native';
import {
  BottomTabView,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Use Icons
import Ionic from 'react-native-vector-icons/Ionicons';
import {back} from 'react-native/Libraries/Animated/Easing';

import SockJS from 'sockjs-client';
import {Client, Message, Stomp} from '@stomp/stompjs';
import * as encoding from 'text-encoding';
import StompWS from 'react-native-stomp-websocket';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = props => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: theme.mainBackground,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          opacity: 0.8,
          position: 'absolute',
          borderTopWidth: 0,
          paddingTop: 10,
          paddingRight: 30,
          paddingLeft: 30,
        },
        tabBarIcon: ({focused, size}) => {
          let iconName;
          if (route.name === 'Main') {
            iconName = focused ? 'ios-basket' : 'ios-basket';
          } else if (route.name === 'Shared') {
            iconName = focused ? 'share-social' : 'share-social';
          } else if (route.name === 'Chat') {
            iconName = focused
              ? 'chatbubble-ellipses-sharp'
              : 'chatbubble-ellipses-sharp';
          }
          let iconSize = focused ? 30 : 23;

          let iconColor = focused ? theme.basicText : theme.subText;
          return <Ionic name={iconName} size={iconSize} color={iconColor} />;
        },
      })}>
      <Tab.Screen
        name="Main"
        component={Main}
        initialParams={props.route.params}
      />
      <Tab.Screen
        name="Shared"
        component={Shared}
        initialParams={props.route.params}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        initialParams={props.route.params}
      />
    </Tab.Navigator>
  );
};
const stompConfig = {
  brokerURL: 'ws://localhost:8080/ws/chat',
  debug: str => {
    console.log('STMOP: ' + str);
  },
  onConnect: frame => {
    console.log('connected');
    const subscription = stompClient.subscribe('/topic/chat/room/1', msg => {
      console.log(JSON.parse(msg.body));
    });
  },
  onStompError: frame => {
    console.log('error occur' + frame.body);
  },
};
let stompClient = null;
let roomId = 1;

const webSocket = () => {
  stompClient = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    connectHeaders: {},
    webSocketFactory: () => {
      return SockJS('http://localhost:8080/ws');
    },
    debug: str => {
      console.log('STOMP: ' + str);
    },
    onConnect: function (frame) {
      console.log('connected');
      stompClient.subscribe('/sub/chat/' + roomId, msg => {
        console.log(JSON.parse(msg.body));
      });
      if (!stompClient.connected) {
        return;
      }
      stompClient.publish({
        destination: '/pub/chat',
        body: JSON.stringify({
          roomId: 1,
          sender: 'hcs4125',
          message: '하이',
          type: 'ENTER',
        }),
      });
    },
    onStompError: frame => {
      console.log('error occur' + frame.body);
    },
  });
  stompClient.activate();

  return stompClient;
};
const App = () => {
  useEffect(() => {
    webSocket();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="SignIn">
          {/* <Stack.Screen name="Start" component={Start} /> */}
          <Stack.Screen name="App" component={App} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Navigation" component={Navigation} />
          <Stack.Screen name="Collection" component={Collection} />
          <Stack.Screen name="SharedCollection" component={SharedCollection} />
          {/* <Stack.Screen name="ChatRoom" component={ChatRoom} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
