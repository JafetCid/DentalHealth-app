import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import ExpedienteList from './components/ExpedienteList';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/Header';

const ExpedienteDentalesScreen = ({navigation}) => {
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
    console.log('Editar examen dental', id);

  };

  const handleEliminar = (id: string) => {
    console.log('Eliminar examen dental', id);
  };

  return (
    <View>
      {/* <ScrollView> */}
        <Header title={'Expedientes'} showLogo={true} onPress={() => navigation.goBack()}/>
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
}
});

export default ExpedienteDentalesScreen;
