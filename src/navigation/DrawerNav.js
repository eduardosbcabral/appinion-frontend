import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

export default class DrawerNav extends Component {

  navigateToScreen = (route) =>(
      () => {
      const navigateAction = NavigationActions.navigate({
          routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
  })
  
  logout = () => {
    AsyncStorage.removeItem("@Appinion:usuario");
    this.props.navigation.navigate('Forms', { backTo: 'Home' });
  }

  render() {
    return (
        <View style={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between' }}>
          <View style={styles.headerContainer}>
              <Image source={require('../assets/img/appinion-logo.png')} style={{marginTop: 20, marginLeft: 100, width: 80, height: 80, justifyContent: 'center'}} />
              <Text style={styles.textoLogo}>APPINION</Text>
          </View>
          <View style={styles.screenContainer}>
              <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey=='Noticias') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('Noticias')}>
                  <Icon name="newspaper" size={30} style={[styles.icon, (this.props.activeItemKey=='Noticias') ? styles.selectedTextStyle : null]} />
                  <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Noticias') ? styles.selectedTextStyle : null]}>Notícias</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey=='RedeSocial') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('RedeSocial')}>
                  <Icon name="account-supervisor-circle" size={30} style={[styles.icon, (this.props.activeItemKey=='RedeSocial') ? styles.selectedTextStyle : null]} />
                  <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='RedeSocial') ? styles.selectedTextStyle : null]}>Rede Social</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey=='UsuariosMaisParecidos') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('UsuariosMaisParecidos')}>
                  <Text style={[styles.screenTextStyleSub, (this.props.activeItemKey=='UsuariosMaisParecidos') ? styles.selectedTextStyle : null]}>Mais parecidos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey=='UsuariosMenosParecidos') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('UsuariosMenosParecidos')}>
                  <Text style={[styles.screenTextStyleSub, (this.props.activeItemKey=='UsuariosMenosParecidos') ? styles.selectedTextStyle : null]}>Menos parecidos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey=='Perfil') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('Perfil')}>
                  <Icon name="account-outline" size={30} style={[styles.icon, (this.props.activeItemKey=='Perfil') ? styles.selectedTextStyle : null]} />
                  <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Perfil') ? styles.selectedTextStyle : null]}>Perfil</Text>
              </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.screenStyle} onPress={this.logout}>
              <Icon name="logout-variant" size={20} style={styles.icon} />
              <Text style={styles.label}>Logout</Text>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
      height: 150,
      width: '100%',
      backgroundColor: '#7159C1'
    },
    headerText: {
        color: '#fff8f8',
    },
    textoLogo: {
      fontSize: 16,
      color: '#FBFBFB',
      marginTop: 5,
      marginLeft: 95,
      fontWeight: 'bold'
    },
    screenContainer: { 
      flex: 1,
      paddingTop: 20,
      width: '100%',
    },
    screenStyle: {
        height: 40,
        paddingLeft: 25,
        paddingVertical: 25,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: 18,
        marginLeft: 20, 
        textAlign: 'center',
        color: '#282828',
        fontWeight: 'bold'
    },
    screenTextStyleSub: {
      fontSize: 13,
      marginLeft: 100, 
      fontWeight: 'bold',
      color: '#282828',
      textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#7159C1'
    },
    activeBackgroundColor: {
        backgroundColor: '#F5F5F5'
    },

    item: {
      flexDirection: 'row',
      margin: 20
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft: 25,
      color: 'rgba(0, 0, 0, .87)',
    },

    icon: {
      color: '#959595',
      marginLeft: 10,
      marginRight: 20
    }
});