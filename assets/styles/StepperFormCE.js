import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    left: 30,
    alignItems: 'center',
    width: '90%',
    marginTop: -20,
},
  stepContent: {
    left: 25,
    width: '80%',
  },
  botonAnterior: {
    right: 30,
  },
  context: {
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  label:{
    fontSize: 16,
    marginHorizontal:5,
  },
  input: {
    height: 55,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F7F7F7',
    color: 'black',
    marginBottom: 15,
  },

  //estilos del form Crear Expediente
  contenS: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    width: '100%',
  },
  inputContainer: {
    width: '45%',
  },
  labelI: {
    fontSize: 16,
    marginTop:10,
    marginHorizontal:5,
  },
  inputI: {
    height: 55,
    padding: 10,
    color: 'black',
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
  },
  contCBT: {
    alignItems: 'center',
    marginBottom: 10,
  },
  contCheckBox: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;