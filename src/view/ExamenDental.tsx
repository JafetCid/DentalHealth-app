import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ExpedienteList from './components/ExpedienteList';
import HeaderNoIcon from './components/HeaderNoIcon';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/Header';
import IconMasPromo from './components/IconMasPromo';

const ExamenesDentalesScreen = ({navigation}) => {
  const examenes = [
    { id: '1', titulo: 'Examen Dental N° 01', ultimaCita: '10/06/2024' },
    { id: '2', titulo: 'Examen Dental N° 02', ultimaCita: '08/06/2024' },
   
  ];

  const handleVerDetalles = (id: string) => {
    //console.log('Ver detalles de examen dental', id);
    navigation.navigate('Examen', { id }); 
  };

  const handleEditar = (id: string) => {
    //console.log('Editar examen dental', id);
    navigation.navigate('Examen', { id }); 
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
      {/* <IconMasPromo 
        onPress={() => navigation.navigate('ExamenAdult')}
        iconStyle={{
          position: 'absolute',
          borderWidth: 2,
          width: '100%',
          alignItems: 'flex-end',
          bottom: '-40%',
        }}/> */}
    </View>
  );
};
const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: -200,
    right: 30,
    backgroundColor: '#2f95dc',
    borderRadius: 25,
    elevation: 4,
  }
});

export default ExamenesDentalesScreen;
