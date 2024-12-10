import { View, Text, TouchableOpacity, Pressable, Modal, TouchableWithoutFeedback, Image } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import styles from '../../../assets/styles/PerfilP'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react'
import Header from './Header'
import { API_URL } from '@env';

export const CardPerfilP = ({ navigation, showElipse = false, showHeader = true, showArrowV = false }) => {

    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
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

                console.log('Estado de la respuesta:', response.status);

                const data = await response.json();
                setUser(data)

            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
            }
        };

        fetchUserInfo();

    }, [])

    // Formatear fecha ajustando la diferencia de UTC para zona horaria México
    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible';

        const fecha = new Date(dateString);

        if (isNaN(fecha.getTime())) return 'Fecha inválida';

        return fecha.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: 'America/Mexico_City',
        });
    };

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    return (
        <View>
            {showHeader && (
                <Header title={''} showArrow={showArrowV} showLogo={false} onPress={() => navigation.goBack()} point={''} />
            )}
             <View style={styles.logoC}>
                    {user && user.profilePictureUrl ? (
                        <Image
                            source={
                                user.profilePictureUrl
                                    ? { uri: `${user.profilePictureUrl}` }  // Usar imagen desde la URL proporcionada por la base de datos
                                    : require('../../../assets/images/Perfil.png')  // Imagen por defecto
                            }
                            style={styles.imgLogo}
                        />
                    ) : null}
            </View>

            {user && user.Login && user.Login.name ? (
                <Text style={styles.titleN}>{`${user.Login.name} ${user.Login.lastName}`}</Text>
            ) : (
                <Text style={styles.titleN}>Nombre</Text>
            )}

            <View style={styles.content}>
                <View style={styles.card}>
                    <View style={styles.text}>
                        <Text style={styles.title}>Información</Text>
                    </View>
                    {showElipse && (
                        <TouchableOpacity style={styles.icon} onPress={() => setIsVisible(true)}>
                            <Ionicons name="ellipsis-vertical" size={22} color="gray" />
                        </TouchableOpacity>
                    )}
                    {isVisible &&
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isVisible}
                            onRequestClose={toggleModal}>
                            <TouchableWithoutFeedback onPress={toggleModal}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Pressable
                                            onPress={() => {
                                                setIsVisible(false);
                                                navigation.navigate('StepperP')
                                            }}>
                                            <Text style={styles.modalText}>Editar perfil</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    }
                    <View style={styles.info}>
                        <View style={styles.infoContCardCake}>
                            <View style={styles.iconCard}>
                                <FontAwesome5 name="birthday-cake" size={24} color="black" />
                            </View>
                            <View style={styles.infoContText}>
                                {user && user.Login && user.Login.birthDate ? (
                                    <Text style={styles.textInf}>{formatDate(user.Login.birthDate)}</Text>
                                ) : (
                                    <Text style={styles.textCard}>35 años, 2 meses, 7 dias</Text>
                                    // <Text style={styles.textCard}>35 años, 2 meses, 7 dias</Text>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            {user && user.Login && user.Login.gender === 'masculino' ? (
                                <FontAwesome5 name="male" size={24} color="black" />  // Ícono para hombres
                            ) : (
                                <FontAwesome5 name="female" size={24} color="black" />  // Ícono por defecto para mujeres
                            )}
                        </View>
                        <View style={styles.infoContText}>
                            {user && user.Login && user.Login.gender ? (
                                <Text style={styles.textInf}>{user.Login.gender}</Text>
                            ) : (
                                <Text style={styles.textEnd}> </Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            <FontAwesome name="mobile-phone" size={30} color="black" />
                        </View>
                        <View style={styles.infoContText}>
                        {user && user.Login && user.Login.phoneNumber ? (
                            <Text style={styles.textInf}>{user.Login.phoneNumber}</Text>
                        ) : (
                            <Text style={styles.textEnd}>No se encontro el numero de telefono</Text>
                        )}
                        </View>
                    </View>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            <MaterialIcons name="work" size={24} color="black" />
                        </View>
                        <View style={styles.infoContText}>
                        {user && user.Login && user.occupation ? (
                            <Text style={styles.textInf}>{user.occupation}</Text>
                        ) : (
                            <Text style={styles.textEnd}>No se encontro la ocupación</Text>
                        )}
                        </View>
                    </View>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            <Ionicons name="location-sharp" size={24} color="black" />
                        </View>
                        <View style={styles.infoContText}>
                        {user && user.Login && user.address ? (
                            <Text style={styles.textInf}>{user.address}</Text>
                        ) : (
                            <Text style={styles.textEnd}>No se encontro la ocupación</Text>
                        )}
                        {user && user.Login && user.origin ? (
                            <Text style={styles.textEnd}>{user.origin}</Text>
                        ) : (
                            <Text style={styles.textEnd}>No se encontro la ocupación</Text>
                        )}
                        </View>
                    </View>
                    {/* <Text style={styles.textEnd}>Tochtepec, Puebla</Text> */}
                </View>
            </View>
        </View>
    )
}
