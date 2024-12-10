import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import Header from './components/Header';
import { API_URL } from '@env';
const socket = io('https://dental-health-backend.onrender.com', {
  transports: ['websocket']
});

export default function Chat({ navigation }) {

  const [user, setUser] = useState(null);
  const [userLogin, setUserLogin] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null); // Ref para FlatList
  const listenerRegistered = useRef(false);
  const API_URL = 'https://dental-health-backend.onrender.com';

  useEffect(() => {
    const initialize = async () => {
      await fetchUserInfo(); // Espera a que se cargue la información del usuario
    };

    initialize();
  }, []);

  useEffect(() => {
    fetchUserInfo();
    fetchMessages(user);
    if (!listenerRegistered.current) {
      listenerRegistered.current = true;
      socket.emit('register', user);

      socket.on('receive_private_message', (data) => {
        setMessages((prevMensajes) => [
          ...prevMensajes,
          {
            id: prevMensajes.length + 1,
            message: data.message,
            senderId: data.fromUserId,
            receiverId: data.toUserId,
          },
        ]);
      });
    }
    return () => {
      socket.off('receive_private_message');
      listenerRegistered.current = false;
    };
  }, [user]);

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

      console.log('Estado de la respuesta:', response.status);

      const data = await response.json();
      console.log(data);

      setUser(data.Login.id)
      // setUserLogin(data.Login.id)
      console.log('id del patient:', data.Login.id)

    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
    }
  };

  const fetchMessages = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/message/messages/${id}/14`);
      const data = await response.json();
      setMessages(data);
      console.log(data)
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
      console.log(messages)
    }
  };

  // Función para manejar el envío de mensajes
  const sendMessage = () => {
    console.log(message);
    if (message.trim() === "") return;
    if (message.trim()) {
      const nuevoMensaje = { id: messages.length + 1, message: message, senderId: user };
      setMessages([...messages, nuevoMensaje]);

      // Enviar mensaje al backend
      socket.emit("send_private_message", {
        fromUserId: user, // Cambia esto por el ID del doctor
        toUserId: 14, // ID del paciente seleccionado
        message: message,
      });

      setMessage(""); // Limpiar el campo de texto
    }
  };

  // Autoscroll hacia el primer mensaje
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      setLoading(false); // Dejar de mostrar indicador de carga
    }
  }, [messages]);

  const renderItem = ({ item }) => (
    <View style={item.senderId === user ? styles.messageContainerRight : styles.messageContainerLeft}>
      <Text style={item.senderId === user ? styles.messageTextRight : styles.messageTextLeft}>
        {item.message}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={''} showLogo={false} onPress={() => navigation.goBack()} point={''} />
      <View style={styles.contLT}>
        {/* <FontAwesome name="user-circle-o" size={60} color="white" style={styles.icon} /> */}
        <Image source={require('../../assets/images/Doc.jpeg')} style={styles.icon} />
        <View style={styles.contName}>
          <Text style={styles.name}>Jose Alberto Lopez Jimenez</Text>
        </View>
      </View>
      <View style={styles.chatArea}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingVertical: 10 }}
          onContentSizeChange={() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToEnd({ animated: true }); // Desplazar al último mensaje
            }
          }}
        />
        {loading && (
          <ActivityIndicator size="large" color="#007AFF" style={styles.loadingIndicator} />
        )}
      </View>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="arrow-forward" size={24} color="white" />
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
  backButton: {
    marginRight: 25,
    marginTop: 10,
    marginLeft: 10,
  },
  text: {
    fontSize: 24,
    color: '#000000',
    marginTop: 10,
    marginLeft: 10,
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  messageContainerRight: {
    padding: 10,
    backgroundColor: '#e1ffc7', // Fondo verde claro para mensajes propios
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 50,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  messageContainerLeft: {
    padding: 10,
    backgroundColor: '#fff', // Fondo blanco para mensajes ajenos
    borderRadius: 20,
    marginBottom: 10,
    marginRight: 50,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  messageTextRight: {
    color: '#000', // Color de texto para mensajes propios
  },
  messageTextLeft: {
    color: '#000', // Color de texto para mensajes ajenos
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
  },
  contLT: {
    justifyContent: 'space-around',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '30%',
    width: '90%',
    padding: 10,
  },
  icon: {
    width: 61,
    height: 61,
    borderRadius: 35,
  },
  contName: {
    width: '70%',
  },
  name: {
    color: 'white',
    fontSize: 24,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});
