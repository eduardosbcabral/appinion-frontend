import { createStackNavigator } from 'react-navigation';

import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';

export default createStackNavigator({
  Home: {
    screen: Home
  },

  Cadastro: {
    screen: Cadastro
  },

  Login: {
    screen: Login
  }
},
{
  headerMode: 'none'
})