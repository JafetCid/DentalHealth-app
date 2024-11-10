import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cont: {
    width: '80%',
    alignSelf: 'center',
    marginTop: -20,
  },
  stepContent: {
  },
  botonAnterior: {
    right: 50,
  },
  botonSiguiente: {
    left: 50,
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
    marginTop: 15,
  },
  input: {
    height: 55,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F7F7F7',
    color: 'black',
    // marginBottom: 15,
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
  textArchivo: {
    alignSelf: 'center',
    color: '#888888',
  },
  contIA: {
    justifyContent: 'center',
  },
  iconClip: {
    position: 'absolute',
    right: 0,
    padding: 10,
    // borderWidth: 2,
  },
  nameFile: {
    left: 5,
  },
  
  //estilos de ver la informacion
  labelVerE: {
    fontSize: 18,
    marginBottom: 5,
  },
  cardInf: {
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
  },
});

export default styles;