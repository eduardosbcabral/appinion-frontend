import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  // Fetch the token from storage then navigate to our appropriate place
  componentDidMount = async () => {
    const userToken = await AsyncStorage.getItem('@Appinion:usuario', (value) => {
      JSON.parse(value);
    });

    this.props.navigation.navigate(userToken ? 'Application' : 'Forms');
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#500089" size={50} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});