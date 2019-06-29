import React, { Component } from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Usuario extends Component {

  render() {
    const { usuario, opinioes, opiniaoConcordar, opiniaoDiscordar } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.containerConteudo}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            {!opinioes ?
              <Image style={styles.fotoUsuario} 
                source={
                  usuario.Foto === null ? require('../assets/img/default-profile-image.png') : { uri: usuario.Foto.Nome }
                } />
              : 
              <Image style={styles.fotoUsuario} 
                source={
                  usuario.FotoNome === null ? require('../assets/img/default-profile-image.png') : { uri: usuario.FotoNome }
                } />
            }
              <View style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <Text style={styles.nomeAutor}>{usuario.Nome}</Text>
                <Text style={styles.autor}>{ '@' + usuario.Username}</Text>
                <Text style={styles.descricao}>{usuario.Descricao}</Text>
                {opinioes ? 
                  opiniaoConcordar ? 
                  <View style={styles.cardActions}>
                    <View style={styles.containerConcordar}>
                      <Text style={styles.textConcordar}>
                        {usuario.Quantidade>1 ? "Concordaram com as mesmas " + usuario.Quantidade + " notícias." : "Concordaram com a mesma " + usuario.Quantidade + " notícia."}
                      </Text>
                    </View>
                  </View>
                  :
                  opiniaoDiscordar ? 
                    <View style={styles.cardActions}>
                      <View style={styles.containerDiscordarQuantidade}>
                        <Text style={styles.textDiscordar}>
                          {usuario.Quantidade>1 ? "Discordaram com as mesmas " + usuario.Quantidade + " notícias." : "Discordaram com a mesma " + usuario.Quantidade + " notícia."}
                        </Text>
                      </View>
                    </View>
                  : null
                :
                  null
                }
              </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Usuario);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#7159C1'
  },

  containerConteudo: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#6a49d8'
  },

  nomeAutor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBFBFB'
  },

  autor: {
    fontSize: 15,
    color: '#a0a0a0'
  },

  descricao: {
    fontSize: 14,
    color: '#FBFBFB'
  },

  fotoUsuario: {
    width: 50,
    flexDirection: 'row',
    height: 50,
    marginRight: 10,
    marginTop: 2,
    borderRadius: 50
  },  

  cardActions: {
    flex: 0.25,
    flexDirection: 'row',
  },

  containerConcordar: {
    flex: 1,
    marginLeft: 15,
  },

  containerDiscordar: {
    flex: 1,
    marginLeft: 35
  },

  containerDiscordarQuantidade: {
    flex: 1,
    marginLeft: 15
  },

  textConcordar: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#00c177'
  },

  textDiscordar: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#db1a1a'
  },
});