import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, Modal, Pressable, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import axios from 'axios';

export default function NotificationScreen() {

  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 'static1',
  //     title: 'Notificación importante',
  //     body: 'Recuerda confirmar tu cita programada.',
  //   },
  // ]);
  // const [loading, setLoading] = useState(true);
  // const [selectedNotification, setSelectedNotification] = useState(null);
  type Notification = {
    id: number;
    status: string;
    date: string;
    time: string;
  };

  const [actionType, setActionType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications1, setNotifications1] = useState<Notification[]>([]);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const API_URL = 'https://dental-health-backend.onrender.com';

  useEffect(() => {
    //Obtener la informacion del usuario
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token: ', token)

        const response = await fetch(`${API_URL}/api/auth/userinfo`, {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        const data = await response.json();
        setUser(data)
        console.log('Datos del usuario:', data);

      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchUserInfo();

  }, [])

  useEffect(() => {
    // Solo llamar a fetchNotifications cuando `user` esté disponible y tenga `id`
    if (user && user.id) {
      const fetchNotifications = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          console.log('Token: ', token)

          const response = await fetch(`${API_URL}/api/notification/getNotificationsById/${user.id}`);

          console.log('Estado de la respuesta:', response.status);

          const data = await response.json();
          console.log(data);

          // Mapeamos el status de cada notificación
          const notificationsWithStatus = data.map(item => ({
            id: item.id,
            status: item.Appointment.status,  // 'confirmed' o 'canceled'
            date: item.Appointment.date,      // Fecha de la cita
            time: item.Appointment.time,      // Hora de la cita
          }));

          setNotifications1(notificationsWithStatus)
          console.log('Datos de las Notificaciones:', notificationsWithStatus);

        } catch (error) {
          console.error('Error al obtener la información de las notificaciones:', error);
        }
      };

      fetchNotifications();
    }

  }, [user])

  const handleDelete = async (id) => {

    try {
      const response = await fetch(`${API_URL}/api/notification/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log('Exito')
        // Solo actualiza si notifications1 está definido y es un array
        if (notifications1 && Array.isArray(notifications1)) {
          const updatedNotifications = notifications1.filter(notification => notification.id !== id);
          setNotifications1(updatedNotifications);
        }
      } else {
        console.log('Fallo al eliminar la notificación');
      }
    } catch (error) {
      console.error("Error al eliminar la promoción:", error);
      // setNotification({ message: "Ocurrió un error al intentar eliminar la promoción.", type: "error" });
    }
  };

  const confirmAction = () => {
    setModalVisible(false);
    Alert.alert('Confirmado', `Cita ${actionType === 'confirm' ? 'confirmada' : 'reprogramada'} exitosamente.`);
  };

  const cancelAction = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (

    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.title}>
          {item.status === 'aceptada' ? 'Cita Confirmada' : 'Cita Cancelada'}
        </Text>
        <Text style={styles.body}>
          {item.date && item.time ? `Fecha: ${item.date} - Hora: ${item.time}` : 'Información no disponible'}

        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </TouchableOpacity>
  );

  //  

  return (
    <View style={styles.container}>
      <Header title={'Notificaciones'} showLogo={false} onPress={''} showArrow={false} point={''} />
      <View style={styles.content}>

        {!notifications1 ? (
          <FlatList
            data={notifications1}
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
      {/* <Modal
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
      </Modal> */}
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
    marginBottom: 30,
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
