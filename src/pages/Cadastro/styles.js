import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#7159c1',
  },

  containerLogo: {
    flex: 0.3,
    justifyContent: 'center',
  },

  imagemLogo: {
    alignSelf: 'center',
    flex: 1,
    width: 120,
    height: 120,
    marginBottom: 15,
    resizeMode: 'contain'
  },

  containerForm: {
    flex: 2
  },

  containerBotao: {
    marginTop: 10
  },

  input: {
    backgroundColor: '#FBFBFB',
    borderRadius: 5
  },

  inputText: {
    color: '#7159C1',
    fontSize: 15
  },

  inputData: {
    color: '#7159c1',
    backgroundColor: '#FBFBFB',
    borderRadius: 5,
    padding: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoCadastrar: {
    color: '#FBFBFB',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    borderColor: '#FBFBFB',
  },

  containerMensagemDeErro: {
    marginLeft: 14,
    marginBottom: 10
  },

  mensagemDeErro: {
    color: '#FF5462',
    fontSize: 12
  },
});

export default styles;