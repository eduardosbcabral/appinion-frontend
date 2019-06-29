import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import DetalheUsuario from '../../components/DetalheUsuario';

import api from '../../services/api';

import styles from './styles';

export default class Perfil extends Component {

  constructor() {
    super();
    this.state = {
      usuario: {
        id: '',
        foto: '',
        nome: '',
        username: '',
        descricao: '',
        dataNascimento: '',
        quantidadeSeguidores: '',
        quantidadeSeguindo: '',
        ultimoTitulo: {},
        temTituloSemanal: false
      },

      publicacoes: [],
      pagina: 1
    }
  }

  async componentDidMount() {
    const loggedUser = await JSON.parse(await AsyncStorage.getItem('@Appinion:usuario'));

    const dataUsuario = {
      params: {
        usuarioId: loggedUser.Id,
      }
    };

    api.get('usuarios/detalhar-sem-lista', dataUsuario)
    .then(response => {
        const usuarioResponse = response.data;
        const usuario = {
          id: usuarioResponse.Id,
          username: usuarioResponse.Username,
          nome: usuarioResponse.Nome,
          foto: usuarioResponse.Foto === null ? '' : usuarioResponse.Foto,
          descricao: usuarioResponse.Descricao,
          dataNascimento: usuarioResponse.DataNascimento,
          quantidadeSeguidores: usuarioResponse.QuantidadeSeguidores,
          quantidadeSeguindo: usuarioResponse.QuantidadeSeguindo,
          ultimoTitulo: usuarioResponse.UltimoTitulo,
          temTituloSemanal: usuarioResponse.TemTituloSemanal
        }

        this.setState({ usuario });
    })  
    .catch(error => console.log(error.message));

    const dataPublicacoes = {
      Pagina: this.state.pagina,
      Usuario: {
        Id: loggedUser.Id
      }
    }

    api.post('publicacoes/usuario', dataPublicacoes)
    .then(response => {
        this.setState({ publicacoes: response.data.Rows });
    })  
    .catch(error => console.log(error.message));
  }

  handleUpvote = async (publicacaoId, index) => {
    const data = {
      Publicacao: {
        Id: publicacaoId
      }
    }
    await api.post('publicacoes/upvote', data)
    .then(() => {
      let publicacoesList = JSON.parse(JSON.stringify(this.state.publicacoes))
      let targetPublicacao = publicacoesList[index];
      targetPublicacao.QuantidadeVotos++;  
      
      publicacoesList[index] = targetPublicacao;
      this.setState({publicacoes: publicacoesList});
    })
    .catch(error => {
      console.log(error.response);
      ToastAndroid.showWithGravity('Você já deu upvote.', ToastAndroid.SHORT, ToastAndroid.TOP);
    })
  }

  handleDownvote = async (publicacaoId, index) => {
    const data = {
      Publicacao: {
        Id: publicacaoId
      }
    }
    await api.post('publicacoes/downvote', data)
    .then(() => {
      let publicacoesList = JSON.parse(JSON.stringify(this.state.publicacoes))
      let targetPublicacao = publicacoesList[index];
      targetPublicacao.QuantidadeVotos--  
      
      publicacoesList[index] = targetPublicacao;
      this.setState({publicacoes: publicacoesList});
    })
    .catch(error => {
      console.log(error.response);
      ToastAndroid.showWithGravity('Você já deu downvote.', ToastAndroid.SHORT, ToastAndroid.TOP);
    })
  }

  handleRetweet = (publicacaoId) => {

  }

  render() {
    const { usuario, publicacoes } = this.state;
    return <DetalheUsuario 
        usuario={usuario} 
        publicacoes={publicacoes}
        upvoteCallback={this.handleUpvote}
        downvoteCallback={this.handleDownvote}
        retweetCallback={this.handleRetweet}
        />
  }
}
