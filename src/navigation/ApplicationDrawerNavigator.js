import React from 'react';

import { createDrawerNavigator } from 'react-navigation';


import RedeSocialStackNavigator from './RedeSocialStackNavigator';
import NoticiasStackNavigator from './NoticiasStackNavigator';
import PerfilStackNavigator from './PerfilStackNavigator';

import DrawerNav from './DrawerNav';

export default createDrawerNavigator({
  Noticias: {
    screen: NoticiasStackNavigator,
    navigationOptions: {
      title: 'Notícias'
    }
  },

  RedeSocial: {
    screen: RedeSocialStackNavigator,
    navigationOptions: {
      title: 'Rede Social'
    }
  },

  Perfil: {
    screen: PerfilStackNavigator,
    navigationOptions: {
      title: 'Perfil'
    }
  }
}, {
  initialRouteName: 'Noticias',
  contentComponent: DrawerNav
})