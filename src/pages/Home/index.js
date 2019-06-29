import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class Home extends Component {

  redirecionarParaPaginaCadastro = () => {
    this.props.navigation.navigate('Cadastro');
  }

  redirecionarParaPaginaLogin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image style={styles.imagemLogo} source={require('../../assets/img/appinion-logo.png')} />
          <Text style={styles.textoLogo}>APPINION</Text>
          <Text style={styles.textoAplicativo}>Aqui, a sua opinião tem muito mais valor.</Text>
        </View>
        <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.botaoCadastrar} onPress = {this.redirecionarParaPaginaCadastro}>
                <View>
                  <Text style={styles.textoBotao}>Cadastrar</Text>
                </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoEntrar} onPress = {this.redirecionarParaPaginaLogin}>
                <View>
                  <Text style={styles.textoBotao}>Entrar</Text>
                </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
