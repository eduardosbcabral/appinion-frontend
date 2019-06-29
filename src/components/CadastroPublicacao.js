import React, { Component } from 'react';

import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { stringify } from 'querystring';

import api from '../services/api';

export default class CadastroPublicacao extends Component {

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;

    return {
      headerLeft: (
        <View>
          <Icon 
            style={{ paddingLeft: 10 }} 
            name="arrow-left" 
            size={30}
            color="#FBFBFB"
            onPress={() => navigation.goBack()} />
        </View>
      ),
      headerRight: (
        <TouchableOpacity style={{padding: 15}} onPress={params.manipularPublicacao}>
          <View>
            <Text style={{color: '#FBFBFB', fontSize: 17, fontWeight: 'bold'}}>
              Publicar
            </Text>
          </View>
        </TouchableOpacity>
      ),
    }
  }

  constructor() {
    super();
    this.state = {
      publicacao: '',
      erros: []
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ manipularPublicacao: this.manipularPublicacao })
  }

  manipularPublicacao = async() => {
    this.setState({ erros: [] });

    try {
      await api.post('publicacoes', this.construirPublicacao());
      
      this.props.navigation.state.params.refreshPublicacoes();
      
      this.props.navigation.goBack();
    } catch (e) {
      this.manipularRespostaErro(e.response.data.erros);
    }
  }

  construirPublicacao = () => {
    return stringify({ Conteudo: this.state.publicacao});
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

  manipularErroInput = (nomeInput) => {
    return this.state.erros.find(erro => erro.nomeInput === nomeInput) === undefined ? '' : this.state.erros.find(erro => erro.nomeInput === nomeInput).mensagem;
  }

  render() {
    return (
      <View style={styles.page}>
        <ScrollView keyboardDismissMode='interactive'>
          {this.manipularErroInput('Conteudo') === '' ? null :
            <View style={{marginTop: 10, marginLeft: 20}}>
              <Text style={styles.mensagemDeErro}>{this.manipularErroInput('Conteudo')}</Text>
            </View>
          }
          <TextInput multiline={true}
            onChangeText={(text) => {
              this.state.publicacao = text;
            }}
            defaultValue={this.state.publicacao}
            autoFocus={true}
            style={styles.input}
          />
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#7159C1'
  },
  input: {
    color: '#FBFBFB',
    padding: 20,
    fontSize: 18
  },

  mensagemDeErro: {
    fontSize: 17,
    color: '#FF5462',
    fontWeight: 'bold'
  }
});