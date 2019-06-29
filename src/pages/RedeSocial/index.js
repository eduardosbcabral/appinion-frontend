import React, { Component } from 'react';

import { View, FlatList, ActivityIndicator } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

import Publicacao from '../../components/Publicacao';

import api from '../../services/api';

export default class RedeSocial extends Component {

  constructor() {
    super();
    this.state = {
      publicacoes: [],
      pagina: 1,
      loading: false,
      refresh: false
    }
  }

  componentDidMount() {
    this.fetchPublicacoes();
  }

  abrirPublicacao = (publicacaoId) => {
    const publicacao = this.state.publicacacoes.find(publicacao => publicacao.Id === publicacaoId);

  }

  fetchPublicacoes = async () => {
    if (this.state.loading) return;

    const data = {
      Pagina: this.state.pagina
    };

    const { pagina } = this.state;

    this.setState({ loading: true });

    const response = await api.post('publicacoes/timeline', data);

    this.setState({ 
      publicacoes: [...this.state.publicacoes, ...response.data.Rows],
      pagina: pagina + 1,
      loading: false
    });
  }

  async manipularRefresh() {
    if (this.state.refresh) return;

    const data = {
      Pagina: 1
    };

    const { pagina } = this.state;

    this.setState({ pagina: 1, refresh: true, publicacoes: [] });

    const response = await api.post('publicacoes/timeline', data);

    this.setState({ 
      publicacoes: response.data.Rows,
      pagina: pagina + 1,
      refresh: false
    });
  }

  abrirCadastroDePublicacao = () => {
    this.props.navigation.navigate('CadastroPublicacao', { 
      refreshPublicacoes: this.manipularRefresh.bind(this) 
    });
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20; // how far from the bottom
    return layoutMeasurement.height + contentOffset.y >= 
    contentSize.height - paddingToBottom;
  };

  render() {
    return (
      <View style={{flex:1, backgroundColor: '#7159C1'}}>
        <FlatList style={styles.container}
          keyExtractor={item => `item-${item.Id}`}
          data={this.state.publicacoes}
          refreshing={this.state.refresh}
          onRefresh={() => this.manipularRefresh()}
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this.fetchPublicacoes();
            }
          }}
          ListFooterComponent={this.renderFooter}
          renderItem={ ({item, index}) =>
            <Publicacao
              publicacao={item}
            />
          }
        />
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#3596D6' title="Publicar" onPress={this.abrirCadastroDePublicacao}>
            <Icon name="pencil" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}
