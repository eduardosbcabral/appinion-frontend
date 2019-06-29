import React, { Component } from 'react';

import { FlatList } from 'react-native';

import Usuario from '../../components/Usuario';

import styles from './styles';

import api from '../../services/api';

export default class Seguidores extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seguidores: [],
      loading: false
    }
  }

  componentDidMount() {
    this.fetchSeguidores();
  }

  fetchSeguidores = async () => {
    if (this.state.loading) return;

    this.setState({ loading: true });

    const response = await api.get('usuarios/listar-seguidores', this.montarUsuario());
    console.log(response);
    this.setState({ 
      seguidores: [...this.state.seguidores, ...response.data],
      loading: false
    });
  }

  montarUsuario = () => {
    return {
      params: {
        usuarioId: this.props.navigation.state.params.usuarioId,
      }
    };
  }

  render() {
    return (
      <FlatList style={styles.container}
        keyExtractor={item => `item-${item.Id}`}
        data={this.state.seguidores}
        renderItem={ ({item, index}) =>
          <Usuario
            usuario={item}
          />
        }
      />
    );
  }
}
