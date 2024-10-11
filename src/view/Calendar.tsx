import { useNavigation } from '@react-navigation/native';
import HeaderNoIcon from './components/HeaderNoIcon';

import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Header from './components/Header';


const { width } = Dimensions.get('window');

export default function DentalHealthScreen({navigation}) {
  //const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title={''} onPress={''} />
      <View style={styles.content}>
        <Text style={styles.greeting}>¡Hola [Nombre del Paciente]!</Text>
        <Text style={styles.message}>Actualmente, no tenemos una cita registrada a tu nombre.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AgendaScreen')}>
          <Text style={styles.buttonText}>Programar cita</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});