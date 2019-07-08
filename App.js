import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./src/screens/LoginScreen";
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import TabNavigator from "./src/screens/TabNavigator";
import RoomScreen from "./src/screens/RoomScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SignupScreen from "./src/screens/SignupScreen";


const LoginStack = createStackNavigator({ Login: LoginScreen, Signup: SignupScreen });

const AppStack = createStackNavigator({
  Tab: TabNavigator,
  Home: HomeScreen,
  Room: RoomScreen,

});
const AuthLoadingStack = createStackNavigator({ Auth: AuthLoadingScreen })




export default createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Login: LoginStack,
    AuthLoading: AuthLoadingStack,

  },
  {
    initialRouteName: 'AuthLoading',

  },

));

