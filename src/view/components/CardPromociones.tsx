import { View, Image, TouchableOpacity, Modal, Alert, Text, Pressable } from "react-native";
import styles from "../../../assets/styles/CardPromociones";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function CardPromociones() {

    const [isVisible, setIsVisible] = useState(false);
    const navigation = useNavigation();

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };
    
    return(
        <View style={styles.content}>
            <View style={styles.card}>
                <Image style={styles.img} source={require('../../../assets/images/Genshi.jpeg')} resizeMode="cover"/>
                <View style={styles.text}>
                    <Text style={styles.title}>Titulo: ¡Descuento del 20% en Limpieza Dental!</Text>
                    <Text>Descripción: Cuida tu sonrisa con nuestra 
                        promoción especial. Por tiempo limitado, 
                        ofrecemos un 20% de descuento en nuestra limpieza dental profesional.</Text>
                </View>
                <TouchableOpacity style={styles.icon} onPress={() => setIsVisible(true)}>
                    <Ionicons name="ellipsis-vertical" size={24} color="gray" />
                </TouchableOpacity>
                {isVisible &&
                    <Pressable style={styles.centeredView} onPress={toggleModal}>
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
                }
            </View>
        </View>
    )
}