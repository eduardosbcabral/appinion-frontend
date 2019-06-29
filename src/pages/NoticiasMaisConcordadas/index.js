import React, { Component } from 'react';
import { View, Linking, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Noticia from '../../components/Noticia';
import api from '../../services/api';

import styles from './styles';

export default class NoticiasMaisConcordadas extends Component {

  constructor() {
    super();
    this.state = {
      noticias: [],
      pagina: 1,
      loading: false,
      refresh: false
    }
  }

  componentDidMount() {
    this._sub = this.props.navigation.addListener('willFocus', () => {
      this.fetchNoticias();
    });
  }

  abrirNoticia = (noticiaId) => {
    const noticia = this.state.noticias.find(noticia => noticia.Id === noticiaId);

    Linking.openURL(noticia.Url);
  }

  fetchNoticias = async () => {
    if (this.state.loading) return;

    const data = {
      Pagina: this.state.pagina
    };

    const { pagina } = this.state;

    this.setState({ loading: true });

    const response = await api.post('noticias/mais-concordadas', data);

    this.setState({ 
      noticias: [...this.state.noticias, ...response.data.Rows],
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

    this.setState({ pagina: 1, refresh: true, noticias: [] });

    const response = await api.post('noticias/mais-concordadas', data);

    this.setState({ 
      noticias: response.data.Rows,
      pagina: pagina + 1,
      refresh: false
    });
  }

  retirarNoticiaLista(noticiaId) {
    const noticias = this.state.noticias.filter(noticia => noticia.Id !== noticiaId);
    this.setState({noticias});

    if(noticias.length===0)
      this.fetchNoticias();
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
      <FlatList style={styles.container}
        keyExtractor={item => `item-${item.Id}`}
        data={this.state.noticias}
        refreshing={this.state.refresh}
        onRefresh={() => this.manipularRefresh()}
        onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent)) {
            // Dont forget to debounce or throttle this function.
            this.fetchNoticias();
          }
        }}
        ListFooterComponent={this.renderFooter}
        renderItem={ ({item, index}) =>
          <Noticia
            noticia={item}
            opiniao={false}
            opiniaoConcordar={true}
            abrirNoticiaCallback={this.abrirNoticia.bind(this)}
          />
        }
      />
    );
  }
}
