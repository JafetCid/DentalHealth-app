import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import ButtonIn from './components/ButtonIn';
import { CardPerfilP } from './components/CardPerfilP';
import { API_URL } from '@env';
import Header from './components/Header'

export default function PatientsDetalles({ navigation, route }) {

    const [patients, setPatients] = useState(null);
    // const [patientsId, setPatientsId] = useState()
    const API_URL = 'https://dental-health-backend.onrender.com';
    const { id } = route.params; // Obtener el parámetro de navegación
    console.log('id del paciente:',id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/auth/getPatient/${id}`); // URL de la API
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json(); // Convierte la respuesta en un objeto JSON
                setPatients(data); // Guarda los datos en el estado
                // setPatientsId(data.id);
                console.log(data);

            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData()
    }, [id])

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

    return (
        <View style={{ flex: 1 }}>
            {/* <CardPerfilP navigation={navigation} showArrowV={true} /> */}

            <View>

                <Header title={''} showLogo={false} onPress={() => navigation.goBack()} point={''} />
                <View style={styles.logoC}>
                    {patients && patients.profilePictureUrl ? (
                        <Image
                            source={
                                patients.profilePictureUrl
                                    ? { uri: `${patients.profilePictureUrl}` }  // Usar imagen desde la URL proporcionada por la base de datos
                                    : require('../../assets/images/Perfil.png')  // Imagen por defecto
                            }
                            style={styles.imgLogo}
                        />
                    ) : null}
                </View>

                {patients && patients.Login && patients.Login.name ? (
                    <Text style={styles.titleN}>{`${patients.Login.name} ${patients.Login.lastName}`}</Text>
                ) : (
                    <Text style={styles.titleN}>Nombre</Text>
                )}

                <View style={styles.content}>
                    <View style={styles.card}>
                        <View style={styles.text}>
                            <Text style={styles.title}>Información</Text>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.infoContCardCake}>
                                <View style={styles.iconCard}>
                                    <FontAwesome5 name="birthday-cake" size={24} color="black" />
                                </View>
                                <View style={styles.infoContText}>
                                    {patients && patients.Login && patients.Login.birthDate ? (
                                        <Text style={styles.textInf}>{formatDate(patients.Login.birthDate)}</Text>
                                    ) : (
                                        <Text style={styles.textCard}>35 años, 2 meses, 7 dias</Text>
                                        // <Text style={styles.textCard}>35 años, 2 meses, 7 dias</Text>
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={styles.infoContCard}>
                            <View style={styles.iconCard}>
                                {patients && patients.Login && patients.Login.gender === 'masculino' ? (
                                    <FontAwesome5 name="male" size={24} color="black" />  // Ícono para hombres
                                ) : (
                                    <FontAwesome5 name="female" size={24} color="black" />  // Ícono por defecto para mujeres
                                )}
                            </View>
                            <View style={styles.infoContText}>
                                {patients && patients.Login && patients.Login.gender ? (
                                    <Text style={styles.textInf}>{patients.Login.gender}</Text>
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
                                {patients && patients.Login && patients.Login.phoneNumber ? (
                                    <Text style={styles.textInf}>{patients.Login.phoneNumber}</Text>
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
                                {patients && patients.Login && patients.occupation ? (
                                    <Text style={styles.textInf}>{patients.occupation}</Text>
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
                                {patients && patients.Login && patients.address ? (
                                    <Text style={styles.textInf}>{patients.address}</Text>
                                ) : (
                                    <Text style={styles.textEnd}>No se encontro la ocupación</Text>
                                )}
                                {patients && patients.Login && patients.origin ? (
                                    <Text style={styles.textEnd}>{patients.origin}</Text>
                                ) : (
                                    <Text style={styles.textEnd}>No se encontro la ocupación</Text>
                                )}
                            </View>
                        </View>
                        {/* <Text style={styles.textEnd}>Tochtepec, Puebla</Text> */}
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonIn
                    Title="Ver expediente"
                    buttonStyle={styles.buttonAgendar}
                    textStyle={styles.buttonText}
                    onPress={() => navigation.navigate('ExpedienteLista', { id })} //ExpedienteLista
                />
                <ButtonIn
                    Title="Ver Examen dental"
                    buttonStyle={styles.buttonAgendar}
                    textStyle={styles.buttonText}
                    onPress={() => navigation.navigate('ExamDent', { id })} //ExamenDent
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // width: '80%',           
        // marginTop: 90,               
    },
    buttonAgendar: {
        backgroundColor: '#308CFF',
        padding: 10,
        borderRadius: 100,
        width: 'auto',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleN: {
        fontSize: 25,
        alignSelf: 'center',
    },
    content: {
        alignItems: 'center',
        marginTop: '5%',
    },
    logoC: {
        position: 'absolute',
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    imgLogo: {
        height: 150,
        width: 150,
        borderRadius: 80,
        marginTop: -33,
    },
    card: {
        padding: 8,
        elevation: 5,
        borderRadius: 25,
        width: '80%',
        height: 'auto',
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginBottom: 30,
    },

    text: {
        width: '100%',
        padding: 5,
        alignContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 18,
        marginBottom: 10,
    },

    icon: {
        width: '100%',
        marginTop: '4%',
        position: 'absolute',
        alignItems: 'flex-end',
    },

    // estilos del modal de perfil y cerrar sesion
    centeredView: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    modalView: {
        padding: 5,
        right: '15%',
        elevation: 5,
        marginTop: '-10%',
        borderRadius: 8,
        backgroundColor: 'white',
    },

    modalText: {
        fontSize: 12,
        marginBottom: 4,
    },

    modalTextE: {
        marginBottom: 4,
        fontSize: 12,
    },
    info: {
        padding: 5,
    },
    infoContCardCake: {
        fontSize: 18,
        marginBottom: 10,
        flexDirection: 'row',
        width: '100%',
        right: 4,
    },
    infoContCard: {
        fontSize: 18,
        marginBottom: 10,
        flexDirection: 'row',
    },
    iconCard: {
        width: 30,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContText: {
        left: 5,
        width: '80%',
        alignSelf: 'center',

    },
    textInf: {
        fontSize: 18,
    },
    textCard: {
        color: '#888888',
        fontSize: 15,
    },
    textEnd: {
        fontSize: 18,
        // width: '75%',
        color: '#888888',
    },
});
