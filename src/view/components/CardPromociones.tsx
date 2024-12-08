import { View, Image, TouchableOpacity, Text, Pressable} from "react-native";
import styles from "../../../assets/styles/CardPromociones";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '@env';

export default function CardPromociones() {

    interface Promotion {
        promotionalImageUrl: string;
        title: string;
        description: string;
    }

    const [isVisible, setIsVisible] = useState<number | null>(null); // Estado para el índice del modal activo
    const [data, setData] = useState<Promotion[] | null>(null);
    const [error, setError] = useState('');
    const navigation = useNavigation();


    useEffect(() => {
        // Función para hacer la solicitud GET
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/promotion/get`);
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                const data = await response.json(); // Convierte la respuesta en un objeto JSON
                setData(data); // Guarda los datos en el estado
            } catch (error) {
                setError(error.message); // Guarda el error en el estado
            }
        };

        fetchData(); // Llama a la función fetchData cuando se monta el componente
        // Escucha cuando el componente recibe enfoque o se vuelve visible
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData(); // Vuelve a hacer la solicitud de las promociones cada vez que se regresa a esta pantalla
        });

        return unsubscribe; // Devuelve la función de limpieza para que no haya fugas de memoria
    }, [navigation]);

    // Muestra las promociones o un mensaje de error
    if (error) {
        return <Text>Error al cargar las promociones: {error}</Text>;
    }

    const toggleModal = (index: number) => {
        setIsVisible(index === isVisible ? null : index); // Alterna el modal activo
    };

    return (
        <View style={styles.content}>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <Image
                            style={styles.img}
                            source={{ uri: item.promotionalImageUrl }}
                            resizeMode="cover" />
                        <View style={styles.text}>
                            <Text style={styles.title}>Titulo: {item.title}</Text>
                            <Text>{item.description}</Text>
                        </View>
                        <TouchableOpacity style={styles.icon} onPress={() => toggleModal(index)}>
                            <Ionicons name="ellipsis-vertical" size={24} color="gray" />
                        </TouchableOpacity>
                        {isVisible === index && ( // Verifica si el modal de esta tarjeta está activo
                            <Pressable style={styles.centeredView} onPress={() => toggleModal(index)}>
                                <View>
                                    <View style={styles.modalView}>
                                        <Pressable
                                            onPress={() => navigation.navigate('CrearP')}>
                                            <Text style={styles.modalText}>Editar</Text>
                                        </Pressable>
                                        <Pressable onPress={() => navigation.navigate('CrearP')}>
                                            <Text style={styles.modalTextE}>Eliminar</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Pressable>
                        )}
                    </View>
                ))
            ) : (
                <Text>No hay promociones disponibles.</Text>
            )}
        </View>
    )
}