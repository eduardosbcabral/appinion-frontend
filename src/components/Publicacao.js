import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { distanceInWordsToNow } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default class Publicacao extends Component {
  render() {
    const { publicacao, upvoteCallback, downvoteCallback, retweetCallback, index } = this.props;

    return (
      <View style={styles.container}>
        <View style={{marginHorizontal: 15}}>
          <TouchableOpacity onPress={() => {}} style={styles.containerConteudo}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image style={styles.fotoUsuario} 
                source={
                  publicacao.Usuario.Foto === null ? require('../assets/img/default-profile-image.png') : { uri: publicacao.Usuario.Foto.Nome }
                } />
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={styles.autor}>{publicacao.Usuario.Username}</Text>
                  <Text style={styles.data}>
                  {
                    distanceInWordsToNow(publicacao.Data, {
                      locale: pt
                    }) + ' atrás'
                  }
                  </Text>
                </View>

            </View>
            <Text style={styles.conteudo}>{publicacao.Conteudo}</Text>
          </TouchableOpacity>

          <View style={styles.containerButton}>
            <TouchableOpacity onPress={() => upvoteCallback(publicacao.Id, index)} style={styles.upvoteButton}>
              <Icon name="arrow-up" size={24} color="#FBFBFB" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => downvoteCallback(publicacao.Id, index)} style={styles.downvoteButton}>
              <Icon name="arrow-down" size={24} color="#FBFBFB" />
            </TouchableOpacity>

            <Text style={styles.voteText}>{publicacao.QuantidadeVotos}</Text>

            <TouchableOpacity onPress={() => retweetCallback(publicacao.Id)} style={styles.retweetButton}>
              <Icon name="twitter-retweet" size={24} color="#FBFBFB" />
            </TouchableOpacity>

            <Text style={styles.retweetText}>0</Text>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,    
    marginBottom: 5,
    borderBottomWidth: 0.2,
    paddingBottom: 10,
    borderColor: '#BCBCBC'
  },

  containerConteudo: {
    paddingBottom: 10,
  },

  autor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FBFBFB'
  },

  data: {
    fontSize: 10,
    color: '#FBFBFB'
  },

  fotoUsuario: {
    width: 30,
    flexDirection: 'row',
    height: 30,
    marginRight: 5,
    marginTop: 2,
    borderRadius: 10
  },  

  conteudo: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: 5,
    color: '#FBFBFB',
  },

  containerButton: {
    marginTop: 10,
    flexDirection: 'row',
    flex: 1
  },

  upvoteButton: {
    marginHorizontal: 5,
    alignItems: 'center'
  },

  retweetButton: {
    marginHorizontal: 5,
    alignItems: 'center',
    marginLeft: 60
  },

  downvoteButton: {
    marginHorizontal: 5,
    alignItems: 'center'
  },

  voteText: {
    color: '#FBFBFB',
    marginLeft: 5
  },

  retweetText: {
    color: '#FBFBFB',
    marginHorizontal: 5
  }
});
