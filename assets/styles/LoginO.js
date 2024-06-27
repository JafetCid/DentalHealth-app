import { StyleSheet } from "react-native";
import { Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
  },
  contB: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
  },

  // estilos del modal

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '30%',
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 24,
  },
  modalText2: {
    marginBottom: 15,
  },
  btnModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default styles;
