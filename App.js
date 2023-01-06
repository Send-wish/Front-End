// Basic React Native App
import React from 'react';

// Screens
// import Start from './src/components/Start';
// import SignUp from './src/components/SignUp';
// import SignIn from './src/components/SignIn';
import Main from './src/screens/Main';
import Shared from './src/screens/Shared';
import Chat from './src/screens/Chat';
import Friends from './src/screens/Friends';

// color theme
import {ThemeProvider} from 'styled-components';
import {theme} from './src/theme';

// React Native Hooks
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Use Icons
import Ionic from 'react-native-vector-icons/Ionicons';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const BottomTabScreen = () => {
    return (
      <ThemeProvider theme={theme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 70,
            backgroundColor: theme.mainBackground,
            borderRadius: 20,
          },
            tabBarIcon: ({focused, color, size}) => {
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

              return <Ionic name={iconName} size={size} color={color} />;
            },
        })}>
        <Tab.Screen name="Main" component={Main} />
        <Tab.Screen name="Shared" component={Shared} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Friends" component={Friends} />
      </Tab.Navigator>
      </ThemeProvider>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Bottom" component={BottomTabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
