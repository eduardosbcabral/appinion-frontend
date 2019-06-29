import { createSwitchNavigator } from 'react-navigation';

import ApplicationDrawerNavigator from './ApplicationDrawerNavigator';
import StackNavigator from './StackNavigator';

import AuthLoadingScreen from '../pages/AuthLoadingScreen';

export default createSwitchNavigator({
  AuthLoadingScreen: {
    screen: AuthLoadingScreen
  },

  Forms: {
    screen: StackNavigator
  },

  Application: {
    screen: ApplicationDrawerNavigator 
  }
},
{
  initialRouteName: 'AuthLoadingScreen'
})