import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from './components/Header';



export default function Home() {
  return (
    <View style={styles.container}>
      <Header title={''} showArrow={false} showP={true}/>
      <View style={styles.content}>
        <Text style={styles.text}>Bienvenido</Text>
        <Text style={styles.text}>Doctor [Nombre del doctor]</Text>
        <Image source={require('../../assets/images/imageHome.png')}></Image>
        <Text style={styles.textE}>Tus promociones publicadas</Text>
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
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  textE: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 15,
  },
});
