import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default class Logout extends Component {

  componentDidMount() {
    AsyncStorage.removeItem("@Appinion:usuario");
    this.props.navigator.navigate('Home');
  }

  render() {
    return null;
  }
}
