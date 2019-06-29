import React, { Component } from 'react';

import { View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Usuario from '../../components/Usuario';

import styles from './styles';

import api from '../../services/api';

export default class UsuariosMenosParecidos extends Component {

  static navigationOptions = ({navigation}) => {
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
      )
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      pagina: 1,
      loading: false
    }
  }

  componentDidMount() {
    this.fetchUsuarios();
  }

  fetchUsuarios = async () => {
    if (this.state.loading) return;

    const data = {
      Pagina: this.state.pagina
    };

    const { pagina } = this.state;

    this.setState({ loading: true });

    const response = await api.post('usuarios/menos-parecidos', data);

    this.setState({ 
      usuarios: [...this.state.usuarios, ...response.data.Rows],
      pagina: pagina + 1,
      loading: false
    });
  }

  render() {
    return (
      <FlatList style={styles.container}
        keyExtractor={item => `item-${item.Id}`}
        data={this.state.usuarios}
        renderItem={ ({item, index}) =>
          <Usuario
            usuario={item}
            opinioes={true}
            opiniaoDiscordar={true}
          />
        }
      />
    );
  }
}
