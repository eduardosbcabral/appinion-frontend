import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#7159c1'
  },

  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },

  logoImage: {
    alignSelf: 'center',
    flex: 0.8,
    width: 150,
    height: 120,
    resizeMode: 'contain'
  },

  containerForm: {
    flex: 1.5,
  },

  input: {
    backgroundColor: '#FBFBFB',
    borderRadius: 5
  }, 

  inputText: {
    color: '#7159C1',
    fontSize: 15
  },

  buttonEntrar: {
    color: '#FBFBFB',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    borderColor: '#FBFBFB',
  },

  containerMensagemDeErro: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#FF5462',
    marginBottom: 15,
    padding: 15
  },

  mensagemDeErro: {
    color: '#FF5462',
    fontSize: 16,
  }
});

export default styles;