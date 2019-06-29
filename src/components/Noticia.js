import React, { Component } from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default class Noticia extends Component {
  render() {
    const { noticia, opiniao, opiniaoConcordar, opiniaoDiscordar, concordarCallback, discordarCallback, abrirNoticiaCallback } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.containerDate}>
            <Text style={styles.cardDate}>
            {
              format(noticia.Data, 'dddd, DD [de] MMMM', {
                locale: pt
              })
            }
            </Text>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.cardTitle}>
              {noticia.Titulo}
            </Text>
          </View>
          {!opiniao ? 
            opiniaoConcordar ? 
            <View style={styles.cardActions}>
              <View style={styles.containerConcordar}>
                <Text style={styles.textConcordar}>
                  {noticia.Quantidade>1 ? noticia.Quantidade + " usuários concordaram." : noticia.Quantidade + " usuário concordou."}
                </Text>
              </View>
            </View>
            :
            opiniaoDiscordar ? 
              <View style={styles.cardActions}>
                <View style={styles.containerDiscordarQuantidade}>
                  <Text style={styles.textDiscordar}>
                    {noticia.Quantidade>1 ? noticia.Quantidade + " usuários discordaram." : noticia.Quantidade + " usuário discordou."}
                  </Text>
                </View>
              </View>
            : null
           :
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => {concordarCallback(noticia.Id)}}>
                <View style={styles.containerConcordar}>
                  <Text style={styles.textConcordar}>Concordar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {discordarCallback(noticia.Id)}}>
                <View style={styles.containerDiscordar}>
                  <Text style={styles.textDiscordar}>Discordar</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        </View>
        <View style={styles.containerImage}>
          <TouchableOpacity onPress={() => {abrirNoticiaCallback(noticia.Id)}}>
            <Image 
              style={styles.cardImage}
              source={{uri: noticia.UrlImagem}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    marginTop: 7,
    marginBottom: 8,
    marginRight: 20,
    display: 'flex'
  },

  card: {
    zIndex: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FBFBFB',
    borderRadius: 25,
    marginLeft: 55,
    paddingLeft: 115,
    paddingRight: 8,
    flex: 1
  },

  containerImage: {
    position: 'absolute',
    marginTop: 18,
    marginLeft: 15,
  },

  containerDate: {
    marginTop: 5,
    flex: 0.15,
  },

  containerTitle: {
    flex: 1
  },

  cardImage: {
    zIndex: 1,
    width: 145,
    height: 145,
    borderRadius: 25
  },

  cardDate: {
    fontSize: 12
  },

  cardTitle: {
    fontSize: 15,
    color: '#53418D',
    fontWeight: 'bold'
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
    color: '#098455'
  },

  textDiscordar: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#B52929'
  },
});