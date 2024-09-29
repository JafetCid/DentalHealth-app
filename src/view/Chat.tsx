import React, { useEffect, useState } from 'react';
import HeaderNoIcon from './components/HeaderNoIcon';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client';

const socket = io('http://192.168.0.7:3000'); // dirección IP

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
      <HeaderNoIcon />
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Agenda')}
      >
        <Ionicons name="arrow-back" size={24} color="black" />  
      </TouchableOpacity>
      <Text style={styles.text}>Nombre del Doctor</Text>
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
});
