import Header from './components/Header';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, Modal, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [actionType, setActionType] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://192.168.0.7:3000/notifications/');
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleAction = (type, notification) => {
    setActionType(type);
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const confirmAction = () => {

    setModalVisible(false);
    Alert.alert('Confirmado', `Cita ${actionType === 'confirm' ? 'confirmada' : 'reprogramada'} exitosamente.`);
  };

  const cancelAction = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
    //onPress={() => navigation.navigate('NotificationDetail', { notification: item })}
    >
      <View style={styles.notificationContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => handleAction('confirm', item)}
          >
            <Text style={styles.buttonText}>Confirmar cita</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rescheduleButton}
            onPress={() => handleAction('reschedule', item)}
          >
            <Text style={styles.buttonText}>Reprogramar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#308CFF" />
        <Text style={styles.loadingText}>Cargando notificaciones...😉</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={'Notificaciones'} showLogo={false} onPress={''} showArrow={false}/>
      <View style={styles.content}>
        
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../../assets/images/campana.jpg')} // Verifica la ruta
              style={styles.bellIcon}
            />
            <Text style={styles.emptyText}>No hay notificaciones</Text>
          </View>
        )}
      </View>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {actionType === 'confirm'
                ? '¿Estás seguro de confirmar la cita? Cita programada el dia [fecha] a las [Hora]'
                : '¿Estás seguro de reprogramar tu cita para otro día?'}
            </Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={confirmAction}
              >
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={cancelAction}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // Fondo gris claro
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: -70,


  },
  notificationItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    
  },
  notificationContent: {
    padding: 15,

  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 60,
    marginLeft: 25,
    top: -230,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#308CFF',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  rescheduleButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  bellIcon: {
    width: 180,
    height: 200,
    marginBottom: 35,
  },
  emptyText: {
    fontSize: 20,
    color: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 28,
    marginBottom: 60,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  modalConfirmButton: {
    backgroundColor: '#308CFF',
  },
  modalCancelButton: {
    backgroundColor: 'red',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
