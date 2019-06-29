import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import Publicacao from '../components/Publicacao';

import { View, Text, Image, StyleSheet, FlatList, TouchableHighlight  } from 'react-native';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class DetalheUsuario extends Component {

  renderTitulos = (usuario) => {
    let nameIcon = '';

    if(usuario.ultimoTitulo !== null) {
      if(usuario.ultimoTitulo.Nome === 'USUARIO_COM_MAIOR_QUANTIDADE_DE_UPVOTES')
       nameIcon = "arrow-up"
  
      if(usuario.ultimoTitulo.Nome === 'USUARIO_COM_MAIOR_QUANTIDADE_DE_DOWNVOTES')
        nameIcon = "arrow-down"
    }

    return (
      <View>
        {usuario.temTituloSemanal ? 
        <Icon name={nameIcon} color='#FBFBFB' size={30} />
        : null} 
      </View>
    );
  }

  redirecionarParaSeguidores = (usuarioId) => {
    this.props.navigation.navigate('Seguidores', { usuarioId });
  }

  redirecionarParaSeguindo = (usuarioId) => {
    this.props.navigation.navigate('Seguindo', { usuarioId });
  }

  render() {
    const { usuario, publicacoes, upvoteCallback, downvoteCallback, retweetCallback } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.containerUsuario}>
          <View style={styles.containerImagem}>
            <View style={styles.containerInformacoesUsuario}>
              {this.renderTitulos(usuario)}
              <Text style={styles.textoInformacoesUsuarioNome}>{usuario.nome !== ' ' ? ' ' + usuario.nome : ' '}</Text>
              <Text style={styles.textoInformacoesUsuarioUsername}>{usuario.username !== ' ' ? ' @' + usuario.username : ' '}</Text>
            </View>
            <Image style={styles.fotoUsuario} 
            source={
              usuario.foto === '' ? require('../assets/img/default-profile-image.png') : { uri: usuario.foto.Nome }
            } />
          </View>
          <View style={styles.containerInformacoes}>
            <TouchableHighlight onPress={() => this.redirecionarParaSeguidores(usuario.id)} style={{flex: 1}} underlayColor="#5a41ad">
              <View>
                <Text style={styles.textoQuantidadeSeguidores}>{usuario.quantidadeSeguidores}</Text>
                <Text style={styles.textoSeguidores}>SEGUIDORES</Text>
              </View> 
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.redirecionarParaSeguindo(usuario.id)} style={{flex: 1}} underlayColor="#5a41ad">
              <View>
                <Text style={styles.textoQuantidadeSeguindo}>{usuario.quantidadeSeguindo}</Text>
                <Text style={styles.textoSeguindo}>SEGUINDO</Text>
              </View> 
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.containerPublicacoes}>
          <FlatList
            keyExtractor={item => `item-${item.Id}`}
            data={publicacoes}
            renderItem={ 
              ({item, index}) => <Publicacao 
              publicacao={item}
              upvoteCallback={upvoteCallback}
              downvoteCallback={downvoteCallback}
              retweetCallback={retweetCallback}
              index={index} />
            }
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(DetalheUsuario);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#7159C1'
  },

  containerUsuario: {
    flex: 1.5
  },

  containerPublicacoes: {
    display: 'flex',
    flex: 2,
  },

  containerInformacoesUsuario: {
    position: 'absolute',
    padding: 20,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 1
  },
  
  containerImagem: {
    flex: 3
  },

  containerInformacoes: {
    height: 60,
    flexDirection: 'row',
  },

  fotoUsuario: {
    width: '100%',
    height: '100%'
  },

  textoSeguidores: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#BCBCBC'
  },

  textoQuantidadeSeguidores: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 23,
    paddingTop: 5,
    fontWeight: 'bold',
    color: '#FBFBFB'
  },

  textoSeguindo: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#BCBCBC'
  },

  textoQuantidadeSeguindo: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 23,
    paddingTop: 5,
    fontWeight: 'bold',
    color: '#FBFBFB'
  },

  textoInformacoesUsuarioNome: {
    fontSize: 25,
    color: '#FBFBFB',
    textShadowColor: 'rgba(0, 0, 0, 0.50)',
    textShadowOffset: {width: -0.3, height: 0.9},
    textShadowRadius: 5
  },

  textoInformacoesUsuarioUsername: {
    fontSize: 18,
    color: '#FBFBFB',
    textShadowColor: 'rgba(0, 0, 0, 0.50)',
    textShadowOffset: {width: -0.3, height: 0.9},
    textShadowRadius: 5
  }
});