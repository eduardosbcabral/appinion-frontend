import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage'; 
import { format } from 'date-fns';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';
import styles from './styles';

export default class Cadastro extends Component {

  constructor() {
    super();
    this.state = {
      usuario: '',
      email: '',
      nome: '',
      dataNascimento: '',
      senha: '',
      erros: [],
      dataFormatada: '',
      modalDataVisivel: false
    }
  }

  manipularCadastro = async () => {
    this.setState({ erros: [] });

    try {
      await api.post('usuarios', this.construirUsuario());

      logarUsuarioERedirecionar();

    } catch (e) {
      this.manipularRespostaErro(e.response.data.erros);
    }
  }
  
  construirUsuario = () => {
    return {
      Username: this.state.usuario,
      Email: this.state.email,
      Senha: this.state.senha,
      Nome: this.state.nome,
      DataNascimento: this.state.dataNascimento == '' ? '1/1/0001' : this.state.dataNascimento
    };
  }

  logarUsuarioERedirecionar = async () => {
    const response = api.post('auth/login', {
      Username: this.state.usuario,
      Senha: this.state.senha
    });

    await AsyncStorage.setItem('@Appinion:usuario', JSON.stringify(response.data));
    
    this.props.navigation.navigate('Application');
  }

  manipularRespostaErro = (erros) => {
    for (var erro of erros) {
      var listaDeErros = this.state.erros.concat({
        nomeInput: erro.Origem,
        mensagem: erro.Mensagem
      });

      this.setState({ erros: listaDeErros })
    }
  }

  mostrarModalData = () => {
    this.setState({ modalDataVisivel: true });
  };

  esconderModalData = () => {
    this.setState({ modalDataVisivel: false });
  };

  formatarDataInput = (date) => {
    const dataFormatada = format(date, 'DD/MM/YYYY');
    this.setState({ dataFormatada, dataNascimento: format(date, 'YYYY/MM/DD') });
    this.esconderModalData();
  } 

  manipularErroInput = (nomeInput) => {
    return this.state.erros.find(erro => erro.nomeInput === nomeInput) === undefined ? '' : this.state.erros.find(erro => erro.nomeInput === nomeInput).mensagem;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image style={styles.imagemLogo} source={require('../../assets/img/appinion-logo.png')} />
        </View>
        <ScrollView style={styles.containerForm}>
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
            leftIcon={<Icon name='email' size={23} />} 
            containerStyle={{marginBottom: 10}}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            errorMessage={this.manipularErroInput('Email')}
            errorStyle={styles.mensagemDeErro} />
          <Input
            leftIcon={<Icon name='account-card-details' size={23} />} 
            containerStyle={{marginBottom: 10}}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            placeholder="Nome"
            onChangeText={nome => this.setState({ nome })}
            value={this.state.nome}
            errorMessage={this.manipularErroInput('Nome')}
            errorStyle={styles.mensagemDeErro} />
          <TouchableOpacity
            style={styles.inputData}
            onPress={this.mostrarModalData}>
            <Text style={{color: '#7159c1'}}>
              {this.state.dataFormatada ==='' ? "Data de Nascimento" : this.state.dataFormatada}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.modalDataVisivel}
            onConfirm={this.formatarDataInput}
            onCancel={this.esconderModalData}
          />
          {
            this.manipularErroInput('DataNascimento') === '' ? null : <Text style={[styles.mensagemDeErro, styles.containerMensagemDeErro]}>{this.manipularErroInput('DataNascimento')}</Text>
          }
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
        </ScrollView>
        <View style={styles.containerBotao}>
          <TouchableOpacity style={styles.botaoCadastrar} onPress={this.manipularCadastro}>
            <Text style={{color: '#FBFBFB', fontSize: 22, padding: 10, textAlign: 'center'}}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
