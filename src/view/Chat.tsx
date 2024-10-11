import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Dimensions, FlatList } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import io from 'socket.io-client';
import Header from './components/Header';

const socket = io(''); // dirección IP

export default function Chat({ navigation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, { text: msg, isMine: false }]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message, isMine: true }]);
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Header title={''} showLogo={false} onPress={() => navigation.goBack()}/>
      <View style={styles.contLT}>
        <FontAwesome name="user-circle-o" size={60} color="white" />
        <View style={styles.contName}>
          <Text style={styles.name}>Nombre del paciente</Text>
        </View>
      </View>
      <View style={styles.chatArea}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={item.isMine ? styles.messageContainerRight : styles.messageContainerLeft}>
              <Text style={item.isMine ? styles.messageTextRight : styles.messageTextLeft}>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
          <Ionicons name="arrow-up" size={24} color="white" />
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
  contName: {
    width: '70%',
  },
  name: {
    color: 'white',
    fontSize: 24,
  },
});
