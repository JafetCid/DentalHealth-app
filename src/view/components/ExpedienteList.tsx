import React = require('react');
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Tipos para los props del componente
interface Expediente {
  id: string;
  numero: string;
  ultimaCita: string;
}

interface ExpedienteListProps {
  expedientes: Expediente[];
  onVerDetalles: (id: string) => void;
  onEditar: (id: string) => void;
  onEliminar: (id: string) => void;
}

// Componente reutilizable ExpedienteList
const ExpedienteList: React.FC<ExpedienteListProps> = ({ expedientes, onVerDetalles, onEditar, onEliminar }) => {

  // Renderizado de cada expediente
  const renderItem = ({ item }: { item: Expediente }) => (
    <View style={styles.expedienteCard}>
      <View style={styles.expedienteInfo}>
        <Text style={styles.expedienteNumero}>Expediente N° {item.numero}</Text>
        <Text style={styles.ultimaCita}>Última cita {item.ultimaCita}</Text>
      </View>
      <TouchableOpacity onPress={() => handleOptions(item.id)}>
        <MaterialIcons name="more-vert" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  const handleOptions = (id: string) => {
    // Aquí puedes implementar la lógica para abrir un menú con opciones
    console.log('Opciones para expediente', id);
  };

  return (
    <FlatList
      data={expedientes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

// Estilos
const styles = StyleSheet.create({
  list: {
    paddingVertical: 20,
  },
  expedienteCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2, // Sombra en Android
  },
  expedienteInfo: {
    flexDirection: 'column',
  },
  expedienteNumero: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ultimaCita: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
});

export default ExpedienteList;
