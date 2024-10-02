import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const ExpedientesScreen = ({ navigation }) => {
  const expedientes = [
    { id: '1', numero: '02', ultimaCita: '26/05/2024' },
    { id: '2', numero: '042', ultimaCita: '26/05/2024' },
    { id: '3', numero: '62', ultimaCita: '26/05/2024' },
    { id: '4', numero: '82', ultimaCita: '26/05/2024' },
  ];

  const renderExpediente = ({ item }) => (
    <View style={styles.expedienteCard}>
      <View style={styles.expedienteText}>
        <Text style={styles.expedienteNumero}>Expediente N° {item.numero}</Text>
        <Text style={styles.ultimaCita}>Ultima cita {item.ultimaCita}</Text>
      </View>
      <Menu>
        <MenuTrigger>
          <Ionicons name="ellipsis-vertical" size={24} color="grey" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => alert('Ver detalles')}>
            <Text style={styles.menuText}>Ver detalles</Text>
          </MenuOption>
          <MenuOption onSelect={() => alert('Editar')}>
            <Text style={styles.menuText}>Editar</Text>
          </MenuOption>
          <MenuOption onSelect={() => alert('Eliminar')} text="Eliminar">
            <Text style={styles.menuTextEliminar}>Eliminar</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image
          source={{ uri: 'https://your-image-url.com' }} // Imagen de perfil, cambia la URL
          style={styles.profileImage}
        />
        <Text style={styles.name}>Noelia</Text>
      </View>

      <Text style={styles.title}>Lista de expedientes</Text>

      <FlatList
        data={expedientes}
        keyExtractor={(item) => item.id}
        renderItem={renderExpediente}
        contentContainerStyle={styles.expedientesList}
      />

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  expedientesList: {
    paddingHorizontal: 20,
  },
  expedienteCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
  },
  expedienteText: {
    flex: 1,
  },
  expedienteNumero: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ultimaCita: {
    fontSize: 14,
    color: 'gray',
  },
  menuText: {
    fontSize: 16,
    paddingVertical: 5,
  },
  menuTextEliminar: {
    fontSize: 16,
    color: 'red',
    paddingVertical: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#1976D2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpedientesScreen;
