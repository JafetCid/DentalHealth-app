// import React, { useEffect, useState } from 'react';
// import { StyleSheet, TextInput, TouchableOpacity, View, Text, FlatList } from 'react-native';
// import { Ionicons, FontAwesome } from '@expo/vector-icons';
// import io from 'socket.io-client';
// import Header from './components/Header'; 

// //  conexión al servidor de Socket.IO
// const socket = io('');

// // Componente principal del chat
// export default function Chat({ navigation }) {
//   const [message, setMessage] = useState(''); // Estado para el mensaje actual
//   const [messages, setMessages] = useState([]); // Estado para la lista de mensajes
//   const [connected, setConnected] = useState(true); // Estado para manejar la conexión al servidor

  
//   useEffect(() => {
//     // Escucha cuando el socket se conecta o desconecta
//     socket.on('connect', () => setConnected(true));
//     socket.on('disconnect', () => setConnected(false));

//     // Este cucha los mensajes entrantes del servidor
//     socket.on('receiveMessage', (msg) => {
//       setMessages((prev) => [...prev, { text: msg, isMine: false }]); // Añade el mensaje a la lista
//     });

//     // Limpieza al desmontar el componente
//     return () => {
//       socket.off('connect');
//       socket.off('disconnect');
//       socket.off('receiveMessage');
//     };
//   }, []);

//   // Función para enviar un mensaje
//   const sendMessage = () => {
//     if (message.trim()) { // Solo envía si el mensaje no está vacío
//       setMessages((prev) => [...prev, { text: message, isMine: true }]); // Agrega el mensaje a la lista como propio
//       socket.emit('sendMessage', message); // Envía el mensaje al servidor
//       setMessage(''); // Limpia el input
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Encabezado del chat */}
//       <Header title="Chat" showLogo={false} onPress={() => navigation.goBack()} point="" />

//       {/* Información del usuario/paciente */}
//       <View style={styles.headerContent}>
//         <FontAwesome name="user-circle-o" size={60} color="white" style={styles.icon} />
//         <View style={styles.userInfo}>
//           <Text style={styles.name}>Nombre del paciente</Text>
//           {!connected && <Text style={styles.disconnectedText}>Desconectado</Text>} {/* Estado de conexión */}
//         </View>
//       </View>

//       {/* Área de mensajes */}
//       <View style={styles.chatArea}>
//         <FlatList
//           data={messages} // Lista de mensajes
//           inverted // Invierte la lista para mostrar los mensajes recientes primero
//           renderItem={({ item }) => (
//             <View
//               style={item.isMine ? styles.messageContainerRight : styles.messageContainerLeft}
//             >
//               <Text
//                 style={item.isMine ? styles.messageTextRight : styles.messageTextLeft}
//               >
//                 {item.text} {/* Contenido del mensaje */}
//               </Text>
//             </View>
//           )}
//           keyExtractor={(item, index) => index.toString()} // Clave única para cada mensaje
//         />
//       </View>

//       {/* Área de entrada de texto */}
//       <View style={styles.inputArea}>
//         <TextInput
//           style={styles.input}
//           placeholder="Escribe tu mensaje..." // Texto de marcador de posición
//           placeholderTextColor="#888" // Color del marcador de posición
//           value={message} // Mensaje actual
//           onChangeText={setMessage} // Actualiza el estado al escribir
//         />
//         <TouchableOpacity
//           style={[styles.sendButton, { opacity: message.trim() ? 1 : 0.5 }]} // Botón deshabilitado si no hay mensaje
//           onPress={sendMessage}
//           disabled={!message.trim()} // Desactiva el botón si no hay texto
//           accessible
//           accessibilityLabel="Enviar mensaje" // Texto para accesibilidad
//         >
//           <Ionicons name="arrow-up" size={24} color="white" /> {/* Icono de enviar */}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // Estilos del componente
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5', // Fondo gris claro
//   },
//   headerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//     marginHorizontal: 15,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc', // Línea inferior para separar el encabezado
//   },
//   icon: {
//     width: 60,
//     height: 60,
//     borderRadius: 30, // Icono redondeado
//   },
//   userInfo: {
//     marginLeft: 15,
//   },
//   name: {
//     color: 'black',
//     fontSize: 20,
//     fontWeight: 'bold', // Nombre del usuario en negrita
//   },
//   disconnectedText: {
//     color: 'red', // Mensaje de desconexión en rojo
//     fontSize: 14,
//     marginTop: 5,
//   },
//   chatArea: {
//     flex: 1,
//     padding: 10,
//   },
//   messageContainerRight: {
//     padding: 10,
//     backgroundColor: '#e1ffc7', // Fondo verde claro para mensajes propios
//     borderRadius: 20,
//     marginBottom: 10,
//     marginLeft: 50,
//     maxWidth: '80%',
//     alignSelf: 'flex-end', // Alineación a la derecha
//     borderTopLeftRadius: 20,
//     borderBottomLeftRadius: 20,
//   },
//   messageContainerLeft: {
//     padding: 10,
//     backgroundColor: '#fff', // Fondo blanco para mensajes ajenos
//     borderRadius: 20,
//     marginBottom: 10,
//     marginRight: 50,
//     maxWidth: '80%',
//     alignSelf: 'flex-start', // Alineación a la izquierda
//     borderTopRightRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   messageTextRight: {
//     color: '#000', // Texto negro para mensajes propios
//   },
//   messageTextLeft: {
//     color: '#000', // Texto negro para mensajes ajenos
//   },
//   inputArea: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#ccc', // Línea superior para separar la entrada
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     marginRight: 10,
//   },
//   sendButton: {
//     backgroundColor: '#007AFF', // Azul para el botón de enviar
//     borderRadius: 20,
//     padding: 10,
//   },
// });

import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Dimensions, FlatList, Image } from 'react-native';
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
      <Header title={''} showLogo={false} onPress={() => navigation.goBack()} point={''}/>
      <View style={styles.contLT}>
        <FontAwesome name="user-circle-o" size={60} color="white" style={styles.icon}/>
        {/* <Image source={require('../../assets/images/Genshi.jpeg')} style={styles.icon}/> */}
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
});
