// Basic React Native App
import React, {useLayoutEffect} from 'react';

// Screens
import {
  Chat,
  Collection,
  Friends,
  ItemDetail,
  Main,
  Shared,
  SignIn,
  SignUp,
  Start,
} from './src/screens';

// color theme
import {ThemeProvider} from 'styled-components';
import {theme} from './src/theme';

// React Native Hooks
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Use Icons
import Ionic from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const MainStack = ({navigation, route}) => {
  useLayoutEffect(() => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName === "SignIn" || routeName === "SignUp" || routeName === "Start") {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
});
  return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Collection" component={Collection} />
        </Stack.Navigator>
  );
};

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  return (

      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 70,
            backgroundColor: theme.mainBackground,
            borderRadius: 20,
            opacity: 0.9,
            position: 'absolute',
          },
          tabBarIcon: ({focused, size}) => {
            let iconName;

            if (route.name === 'Main') {
              iconName = focused ? 'logo-bitbucket' : 'ios-logo-bitbucket';
            } else if (route.name === 'Shared') {
              iconName = focused ? 'share-social' : 'share-social-outline';
            } else if (route.name === 'Chat') {
              iconName = focused
                ? 'chatbubble-ellipses-sharp'
                : 'chatbubble-ellipses-outline';
            } else if (route.name === 'Friends') {
              iconName = focused
                ? 'notifications-sharp'
                : 'notifications-outline';
            }

            return <Ionic name={iconName} size={size} color="white" />;
          },
        })}>
        <Tab.Screen name="MainStack" component={MainStack} />
      </Tab.Navigator>
  );
};

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SignIn">
          <Stack.Screen name="Navigation" component={Navigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;