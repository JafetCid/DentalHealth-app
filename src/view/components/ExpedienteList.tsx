import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Expediente = {
  id: string;
  titulo: string;
  ultimaCita: string;
};

type Examen = {
  id: string;
  titulo: string;
  fechaExamen: string;
};

type Props = {
  expedientes: Expediente[];
  examenes: Examen[];
  onVerDetalles: (id: string) => void;
  onEditar: (id: string) => void;
  onEliminar: (id: string) => void;
};

const ExpedienteList: React.FC<Props> = ({ expedientes, onVerDetalles, onEditar, onEliminar }) => {
  const [visibleMenuId, setVisibleMenuId] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setVisibleMenuId((prev) => (prev === id ? null : id));
  };

  const hideMenu = () => {
    setVisibleMenuId(null);
  };

  return (
    <TouchableWithoutFeedback onPress={hideMenu}>
      <View style={styles.container}>
        {expedientes.map((expediente) => (
          <View
            key={expediente.id}
            style={[
              styles.expedienteContainer,
              visibleMenuId === expediente.id && styles.expedienteContainerWithMenu // Aumenta el zIndex de la tarjeta con menú visible
            ]}
          >
            <Text style={styles.titulo}>{expediente.titulo}</Text>
            <Text style={styles.ultimaCita}>Última cita: {expediente.ultimaCita}</Text>
            <TouchableOpacity onPress={() => toggleMenu(expediente.id)} style={styles.menuIcon}>
              <MaterialIcons name="more-vert" size={24} color="#333" />
            </TouchableOpacity>
            {/* Menú de opciones */}
            {visibleMenuId === expediente.id && (
              <View style={styles.menuOptions}>
                <TouchableOpacity onPress={() => { onVerDetalles(expediente.id); hideMenu(); }} style={styles.menuItem}>
                  <Text style={styles.menuText}>Ver detalles</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onEditar(expediente.id); hideMenu(); }} style={styles.menuItem}>
                  <Text style={styles.menuText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onEliminar(expediente.id); hideMenu(); }} style={styles.deleteItem}>
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  expedienteContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 10,
    elevation: 4, // Para Android
    // position: 'relative', // Necesario para el posicionamiento absoluto del menú
    // zIndex: 1, // Z-index bajo por defecto para las tarjetas
  },
  expedienteContainerWithMenu: {
    zIndex: 999, // Z-index alto solo cuando el menú está visible
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  ultimaCita: {
    color: '#777',
    marginVertical: 6,
    fontSize: 14,
  },
  menuIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  menuOptions: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5, // Aumenta para que el menú se vea por encima en Android
    position: 'absolute',
    right: 20,
    top: 60,
    padding: 10,
    width: 150,
    zIndex: 9999, // Asegura que el menú esté por encima de las tarjetas
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  deleteItem: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  deleteText: {
    color: '#ff5252',
    fontWeight: 'bold',
  },
});

export default ExpedienteList;
