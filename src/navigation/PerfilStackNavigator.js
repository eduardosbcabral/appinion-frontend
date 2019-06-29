import React, {Component} from 'react';

import { View } from 'react-native';

import { createStackNavigator } from 'react-navigation';

import Perfil from '../pages/Perfil';
import Seguidores from '../pages/Seguidores';
import Seguindo from '../pages/Seguindo';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default createStackNavigator({
  Perfil: {
    screen: Perfil,
    navigationOptions: ({navigation}) => {
      return {
        title: 'Perfil',
        headerLeft: (
          <View>
            <Icon 
              style={{ paddingLeft: 10 }} 
              name="menu" 
              size={30}
              color="#FBFBFB"
              onPress={() => navigation.openDrawer()} />
          </View>
        )
      }
    }
  },

  Seguidores: { 
    screen: Seguidores,
    navigationOptions: {
      title: 'Seguidores'
    }
  },

  Seguindo: { 
    screen: Seguindo,
    navigationOptions: {
      title: 'Seguindo'
    }
  }
}, {
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerStyle: {
        backgroundColor: '#8a70e0',
        elevation: null,
      },
      headerTintColor: '#FBFBFB',
      headerTitleStyle: {
        color: '#FBFBFB'
      }
    }
  }
})