import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

import styles from './styles';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      usuario: '',
      senha: '',
      erros: []
    }
  }

  manipularLogin = async () => {
    this.setState({ erros: [] });

    try {
      const response = await api.post('auth/login', this.construirUsuario());

      await AsyncStorage.setItem('@Appinion:usuario', JSON.stringify(response.data));
      this.props.navigation.navigate('Application');

    } catch (e) {
      this.manipularRespostaErro(e.response.data.erros);
    }
  }

  construirUsuario = () => {
    return {
      Username: this.state.usuario,
      Senha: this.state.senha,
    };
  }

  manipularRespostaErro = (erros) => {
    for (var erro of erros) {
      var err = {
        nomeInput: erro.Origem,
        mensagem: erro.Mensagem
      };

      if(erro.Origem === 'Login')
        err.nomeInput = 'Username';

      var listaDeErros = this.state.erros.concat(err);

      this.setState({ erros: listaDeErros })
    }
  }

  manipularErroInput = (nomeInput) => {
    return this.state.erros.find(erro => erro.nomeInput === nomeInput) === undefined ? '' : this.state.erros.find(erro => erro.nomeInput === nomeInput).mensagem;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image style={styles.logoImage} source={require('../../assets/img/appinion-logo.png')} />
        </View>
        <View style={styles.containerForm}>
          <Input
            leftIcon={<Icon name='account' size={23} />}
            containerStyle={{marginBottom: 10}}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            placeholder="Username"
            onChangeText={usuario => this.setState({ usuario })}
            value={this.state.usuario} 
            errorMessage={this.manipularErroInput('Username')}
            errorStyle={styles.mensagemDeErro} />
          <Input
            leftIcon={<Icon name='key' size={23} />} 
            containerStyle={{marginBottom: 10, marginTop: 5}}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={senha => this.setState({ senha })}
            value={this.state.senha}
            errorMessage={this.manipularErroInput('Senha')}
            errorStyle={styles.mensagemDeErro} />

          <TouchableOpacity style={styles.buttonEntrar} onPress={this.manipularLogin}>
              <Text style={{color: '#FBFBFB', fontSize: 22, padding: 10, textAlign: 'center'}}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
