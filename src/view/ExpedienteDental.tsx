import React, { useState } from 'react';
import { Image, Text, StyleSheet, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import ExpedienteList from './components/ExpedienteList';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/Header';

const ExpedienteDentales = ({ navigation }) => {

  const [isVisible, setIsVisible] = useState(false);

  const expedientes = [
    { id: '1', titulo: 'Expediente N° 01', ultimaCita: '10/06/2024' },
    { id: '2', titulo: 'Expediente N° 02', ultimaCita: '08/06/2024' },
    { id: '3', titulo: 'Expediente N° 03', ultimaCita: '09/06/2024' },

  ];

  const handleVerDetalles = (id: string) => {
    console.log('Ver detalles de examen dental', id);
    navigation.navigate('VerExpedienteM')
  };

  const handleEditar = (id: string) => {
    //console.log('Editar examen dental', id);
    //navigation.navigate('Examen', { id }); 
  };
  
  const handleEliminar = () => {
    toggleModal()
  };

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

  return (
    <View>
      {/* <ScrollView> */}
      <Header title={'Expedientes'} showLogo={false} onPress={() => navigation.goBack()} point={''} />
      <View style={styles.logoC}>
        <Image source={require('../../assets/images/Perfil.png')} style={styles.imgLogo} />
      </View>
      <ExpedienteList
        expedientes={expedientes}
        onVerDetalles={handleVerDetalles}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CrearExpediente')}>
        <Ionicons name="add-outline" size={50} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={handleEliminar}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>¿Estas seguro que deseas eliminar este expediente?</Text>
              <View style={styles.btnModal}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => { setIsVisible(false) }}>
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose2]}
                  onPress={() => { setIsVisible(false) }}>
                  <Text style={styles.textStyle}>Eliminar</Text>
                </Pressable>
              </View>
            </View>
          </View>

        </TouchableWithoutFeedback>
      </Modal>

      {/* </ScrollView> */}
    </View>
  );
};
const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: -100,
    // borderWidth: 2,
    right: 30,
    backgroundColor: '#2f95dc',
    borderRadius: 25,
    elevation: 4,
  },
  logoC: {
    position: 'absolute',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imgLogo: {
    height: 150,
    width: 150,
    borderRadius: 80,
  },
  titleN: {
    fontSize: 25,
    alignSelf: 'center',
  },

  // estilos del modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '75%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '30%',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonClose2: {
    backgroundColor: '#FF0000',
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
  btnModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default ExpedienteDentales;
