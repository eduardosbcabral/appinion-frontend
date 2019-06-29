import React, { Component } from 'react';

import { createMaterialTopTabNavigator } from 'react-navigation';

import RedeSocial from '../pages/RedeSocial';
import PesquisarRedeSocial from '../pages/PesquisarRedeSocial';

export default createMaterialTopTabNavigator({

  RedeSocial: {
    screen: RedeSocial,
    navigationOptions: {
      title: 'Timeline'
    }
  },

  PesquisarRedeSocial: {
    screen: PesquisarRedeSocial,
    navigationOptions: {
      title: 'Pesquisar'
    }
  }
},
{
  headerMode: 'screen',
  tabBarOptions: {
    labelStyle: {
      fontSize: 10,
      color: '#FBFBFB'
    },
    style: {
      backgroundColor: '#8a70e0',
      marginBottom: -2
    },
    
    indicatorStyle: {
      backgroundColor: '#FBFBFB'
    }
  }
})