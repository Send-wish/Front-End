// Basic React Native App
import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './src/theme';
// Screens
import {
  Chat,
  Collection,
  Friends,
  ItemDetail,
  Main,
  Shared,
  Signin,
  Signup,
  Start,
} from './src/screens';

// React Native Hooks
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import Ionic from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/Ionicons';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 70,
          },
          // tabBarIcon: ({focused, color, size}) => {
          //   let iconName;
          //   if (route.name === 'Main') {
          //     iconName = focused ? 'logo-bitbucket' : 'ios-logo-bitbucket';
          //   } else if (route.name === 'Shared') {
          //     iconName = focused ? 'share-social' : 'share-social-outline';
          //   } else if (route.name === 'Chat') {
          //     iconName = focused
          //       ? 'chatbubble-ellipses-sharp'
          //       : 'chatbubble-ellipses-outline';
          //   } else if (route.name === 'Friends') {
          //     iconName = focused
          //       ? 'notifications-sharp'
          //       : 'notifications-outline';
          //   }

          //   // return <Ionic name={iconName} size={size} color={color} />;
          // },
        })}>
        <Tab.Screen name="Main" component={Main} />
        <Tab.Screen name="Shared" component={Shared} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Friends" component={Friends} />
      </Tab.Navigator>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Bottom" component={BottomTabScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor={theme.background} barStyle="dark-content" />
    </ThemeProvider>
  );
};

export default App;
