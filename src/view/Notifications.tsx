import HeaderNoIcon from './components/HeaderNoIcon';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './components/Header';

const { width } = Dimensions.get('window');

const notifications = [
  { id: '1', title: 'Se cancelo la', body: 'Esta es la primera notificacion CAMPEÓN.' },
  { id: '2', title: 'Tines cita pt', body: 'Esta es la segunda perro.' },
  { id: '3', title: 'Notificación 3', body: 'Esta es la tercera notificación.' },
  // Añade más notificaciones aquí si es necesario
];

export default function NotificationScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => navigation.navigate('NotificationDetail', { notification: item })}
    >
      <View style={styles.notificationContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={'Notificaciones'} showLogo={false}/>
      <View style={styles.content}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Fondo gris claro
  },
  content: {
    flex: 1,
    paddingHorizontal: 20, // Espacio a los lados
    paddingTop: 10, // Espacio adicional en la parte superior del contenido
  },
  notificationItem: {
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Sombra para Android
    marginStart:5,
  },
  notificationContent: {
    padding: 15,
    marginStart:2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  body: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
});
