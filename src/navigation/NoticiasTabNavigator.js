import React, { Component } from 'react';

import { createMaterialTopTabNavigator } from 'react-navigation';

import Noticias from '../pages/Noticias';
import NoticiasMaisConcordadas from '../pages/NoticiasMaisConcordadas';
import NoticiasMaisDiscordadas from '../pages/NoticiasMaisDiscordadas';

export default createMaterialTopTabNavigator({

  Noticias: {
    screen: Noticias,
    navigationOptions: {
      title: 'Recentes'
    }
  },

  NoticiasMaisConcordadas: {
    screen: NoticiasMaisConcordadas,
    navigationOptions: {
      title: 'Mais Concordadas'
    }
  },

  NoticiasMaisDiscordadas: {
    screen: NoticiasMaisDiscordadas,
    navigationOptions: {
      title: 'Mais Discordadas'
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