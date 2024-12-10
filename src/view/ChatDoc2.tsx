import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import Header from './components/Header';
import { API_URL } from '@env';
const socket = io(`https://dental-health-backend.onrender.com`, {
    transports: ['websocket']
});

export default function ChatDoc2({ navigation, route }) {

    const [doc, setDoc] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState(null);

    const listenerRegistered = useRef(false);
    const flatListRef = useRef<FlatList>(null); // Ref para FlatList
    const { id } = route.params; // Obtener el parámetro de navegación
    const API_URL = 'https://dental-health-backend.onrender.com';

    // console.log('-------', id)

    useEffect(() => {
        fetchUserInfo();
        fetchMessages(id);
        if (!listenerRegistered.current) {
            listenerRegistered.current = true;

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
    }, []);

    //Obtener la informacion del doc
    const fetchUserInfo = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('Token: ', token)

            const response = await fetch(`${API_URL}/api/auth/getDoctor`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                },
            });

            console.log('Estado de la respuesta:', response.status);

            const data = await response.json();
            console.log(data);
            setDoc(data)
            socket.emit('register', data.id);

        } catch (error) {
            console.error('Error al obtener la información del usuario:', error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/auth/getPatient/${id}`); // URL de la API
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json(); // Convierte la respuesta en un objeto JSON
                setPatients(data); // Guarda los datos en el estado
                console.log(data);

            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData()
    }, [id])

    const fetchMessages = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/message/messages/${doc.id}/${id}`);
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
            const nuevoMensaje = { id: messages.length + 1, message: message, senderId: doc.id };
            setMessages([...messages, nuevoMensaje]);

            // Enviar mensaje al backend
            socket.emit("send_private_message", {
                fromUserId: doc.id, // Cambia esto por el ID del doctor
                toUserId: id, // ID del paciente seleccionado
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
        <View style={item.senderId === doc.id ? styles.messageContainerRight : styles.messageContainerLeft}>
            <Text style={item.senderId === doc.id ? styles.messageTextRight : styles.messageTextLeft}>
                {item.message}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title={''} showLogo={false} onPress={() => navigation.goBack()} point={''} />
            <View style={styles.contLT}>
            {patients && patients.profilePictureUrl ? (
                        <Image
                            source={
                                patients.profilePictureUrl
                                    ? { uri: `${patients.profilePictureUrl}` }  // Usar imagen desde la URL proporcionada por la base de datos
                                    : require('../../assets/images/Perfil.png')  // Imagen por defecto
                            }
                            style={styles.icon}
                        />
                    ) : null}
                <View style={styles.contName}>
                {patients && patients.Login && patients.Login.name ? (
                    <Text style={styles.name}>{`${patients.Login.name} ${patients.Login.lastName}`}</Text>
                ) : (
                    <Text style={styles.name}>Nombre</Text>
                )}
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
