import React, {Component} from 'react';

import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import RedeSocialTabNavigator from './RedeSocialTabNavigator';
import CadastroPublicacao from '../components/CadastroPublicacao';
import UsuariosMaisParecidos from '../pages/UsuariosMaisParecidos';
import UsuariosMenosParecidos from '../pages/UsuariosMenosParecidos';

export default createStackNavigator({
  RedeSocialTabNavigator: {
    screen: RedeSocialTabNavigator,
    navigationOptions: {
      title: 'Rede Social'
    }
  },
  CadastroPublicacao: {
    screen: CadastroPublicacao
  },

  UsuariosMaisParecidos: {
    screen: UsuariosMaisParecidos,
    navigationOptions: {
      title: 'Usuários mais parecidos'
    }
  },

  UsuariosMenosParecidos: {
    screen: UsuariosMenosParecidos,
    navigationOptions: {
      title: 'Usuários menos parecidos'
    }
  },

}, {
  mode: 'modal',
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerStyle: {
        backgroundColor: '#8a70e0', 
        elevation: null,
      },
      headerTitleStyle: {
        color: '#FBFBFB'
      },
      headerLeft:(
          <Icon 
            style={{ paddingLeft: 10 }} 
            name="menu" 
            size={30}
            color="#FBFBFB"
            onPress={() => navigation.openDrawer()} />
      )
    }
  }
})