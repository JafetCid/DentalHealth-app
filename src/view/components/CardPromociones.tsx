import { View, Image, TouchableOpacity, Text, Pressable, Modal, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../../assets/styles/CardPromociones";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '@env';

export default function CardPromociones() {

    interface Promotion {
        id: number; // Incluye el ID de la promoción
        promotionalImageUrl: string;
        title: string;
        description: string;
    }

    const [isVisible, setIsVisible] = useState(false);
    const [selectedPromotionId, setSelectedPromotionId] = useState<number | null>(null); // Guarda el ID de la promoción seleccionada
    const [data, setData] = useState<Promotion[] | null>(null);
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const API_URL = 'https://dental-health-backend.onrender.com';


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

    // Función para alternar el modal y guardar el ID de la promoción seleccionada
    const toggleModal = (promotionId: number) => {
        setSelectedPromotionId(promotionId);
        console.log(promotionId)
    };

    const toggleModal2 = () => {
        setIsVisible(!isVisible)
        if (selectedPromotionId) {
            toggleModal(selectedPromotionId);  // Asegúrate de llamar toggleModal con el ID
        }
    }

    // Función para eliminar la promoción seleccionada
    const handleDelete = async () => {
        if (selectedPromotionId !== null) {
            try {
                const response = await fetch(`${API_URL}/api/promotion/delete/${selectedPromotionId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar la promoción');
                }
                console.log('Promocion eliminada: id', selectedPromotionId)
                // Actualizar la lista de promociones
                setData((prevData) => prevData?.filter((item) => item.id !== selectedPromotionId) || null);
                setIsVisible(false); // Cierra el modal de confirmación
                setSelectedPromotionId(null); // Cierra el modal
            } catch (error) {
                console.error('Error al eliminar la promoción:', error.message);
            }
        }
    };

    return (
        <View style={styles.content}>
            {data && data.length > 0 ? (
                data.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Image
                            style={styles.img}
                            source={{ uri: item.promotionalImageUrl }}
                            resizeMode="cover" />
                        <View style={styles.text}>
                            <Text style={styles.title}>Titulo: {item.title}</Text>
                            <Text>{item.description}</Text>
                        </View>
                        <TouchableOpacity style={styles.icon} onPress={() => toggleModal(item.id)}>
                            <Ionicons name="ellipsis-vertical" size={24} color="gray" />
                        </TouchableOpacity>
                        {selectedPromotionId === item.id && ( // Verifica si el modal de esta tarjeta está activo
                            <Pressable style={styles.centeredView} onPress={() => toggleModal(null)}>
                                <View>
                                    <View style={styles.modalView}>
                                        <Pressable
                                            onPress={() => {
                                                toggleModal(null);
                                                navigation.navigate('CrearP', { promotionId: item.id }); // Pasa el ID al editar
                                            }}>
                                            <Text style={styles.modalText}>Editar</Text>
                                        </Pressable>
                                        <Pressable onPress={toggleModal2}>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={toggleModal2}>
                <TouchableWithoutFeedback onPress={toggleModal2}>
                    <View style={styles.centeredViewM}>
                        <View style={styles.modalViewM}>
                            <Text style={styles.modalTextM}>¿Estas seguro que deseas eliminar esta promoción?</Text>
                            <View style={styles.btnModal}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => { setIsVisible(false) }}>
                                    <Text style={styles.textStyle}>Cancelar</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose2]}
                                    onPress={handleDelete}>
                                    <Text style={styles.textStyle}>Eliminar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}