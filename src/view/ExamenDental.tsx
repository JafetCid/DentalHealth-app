import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ExpedienteList from './components/ExpedienteList';
import HeaderNoIcon from './components/HeaderNoIcon';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/Header';

const ExamenesDentalesScreen = ({navigation}) => {
  const examenes = [
    { id: '1', titulo: 'Examen Dental N° 01', ultimaCita: '10/06/2024' },
    { id: '2', titulo: 'Examen Dental N° 02', ultimaCita: '08/06/2024' },
   
  ];

  const handleVerDetalles = (id: string) => {
    console.log('Ver detalles de examen dental', id);
  };

  const handleEditar = (id: string) => {
    console.log('Editar examen dental', id);
  };

  const handleEliminar = (id: string) => {
    console.log('Eliminar examen dental', id);
  };

  return (
    <View>
        <Header title={'Examenes'} showLogo={true} onPress={() => navigation.goBack()}/>
      <ExpedienteList
        expedientes={examenes}
        onVerDetalles={handleVerDetalles}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
      <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('ExamenAdult')}
        >
          <Ionicons name="add-outline" size={50} color="white" />
        </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: -300,
    right: 30,
    backgroundColor: '#2f95dc',
    borderRadius: 25,
    shadowColor: '#ccc', // Color de la sombra
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    
  }
});

export default ExamenesDentalesScreen;
