import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 30,
    backgroundColor: '#7159c1'
  },

  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },

  imagemLogo: {
    alignSelf: 'center',
    flex: 1,
    width: 150,
    height: 120,
    resizeMode: 'contain'
  },

  textoLogo: {
    flex: 1,
    alignSelf: 'center',
    color: '#FBFBFB',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },

  textoAplicativo: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 25,
    color: '#FBFBFB',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginLeft: 20
  },

  botoesContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  botaoCadastrar: {
    flex: 1,
    color: '#FBFBFB',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#FBFBFB',
    marginRight: 25,
  },

  botaoEntrar: {
    flex: 1,
    color: '#FBFBFB',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#FBFBFB',
  },

  textoBotao: {
    color: '#FBFBFB',
    fontSize: 22,
    padding: 15,
    textAlign: 'center'
  }
});

export default styles;