import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Header from './components/Header';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <Header title={''} onPress={''} point={''}/>
      <View style={styles.content} >
        <Text style={styles.text}> Expedientes </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Color de fondo blanco
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, // Espacio adicional en la parte superior del contenido
  },
  text: {
    fontSize: 24,
    color: '#000000', // Color negro
    marginTop: 20,
  },
});

