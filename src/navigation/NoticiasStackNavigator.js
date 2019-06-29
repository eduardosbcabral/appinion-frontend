import React, {Component} from 'react';

import { View, Image } from 'react-native';

import { createStackNavigator } from 'react-navigation';

import NoticiasTabNavigator from './NoticiasTabNavigator';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default createStackNavigator({
  NoticiasTabNavigator: {
    screen: NoticiasTabNavigator,
    navigationOptions: {
      title: 'Notícias'
    }
  }
}, {
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
})