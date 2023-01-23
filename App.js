// Basic React Native App
import React from 'react';

// Screens
import {
  SignIn,
  SignUp,
  Main,
  Collection,
  Shared,
  SharedCollection,
  Chat,
  ChatRoom,
  LiveChat,

} from './src/screens';
import Share from './Share';

import Join from "./src/screens/join";
import Meeting from "./src/screens/meeting";
import 'react-native-gesture-handler';

// color theme
import {ThemeProvider} from 'styled-components';
import {theme} from './src/theme';

// React Native Hooks
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Use Icons
import Ionic from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
} from 'react-native';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import ParticipantStatsViewer from './src/screens/meeting/Components/ParticipantStatsViewer';
import {SCREEN_NAMES} from './src/navigators/screenNames';

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
          opacity: 0.88,
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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="SignIn">
          {/* <Stack.Screen name="App" component={App} /> */}
          <Stack.Screen name={SCREEN_NAMES.Join} component={Join} />
          <Stack.Screen name={SCREEN_NAMES.Meeting} component={Meeting} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Navigation" component={Navigation} />
          <Stack.Screen name="Collection" component={Collection} />
          <Stack.Screen name="SharedCollection" component={SharedCollection} />
          <Stack.Screen name="Share" component={Share} />
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
          <Stack.Screen name="LiveChat" component={LiveChat} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
