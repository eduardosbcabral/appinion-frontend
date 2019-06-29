import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  containerDetalhePerfil: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#7159c1'
  },

  containerPublicacoes: {
    flex: 2
  },

  containerSeguidores: {
    flexDirection: 'row'
  },

  fotoUsuario: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    margin: 10
  },

  usernameUsuario: {
    flex: 1,
    color: '#FBFBFB',
    fontSize: 17,
  },

  textoSeguindo: {
    color: '#FBFBFB',
    fontSize: 17
  },

  textoSeguidores: {
    color: '#FBFBFB',
    fontSize: 17
  }
});

export default styles;