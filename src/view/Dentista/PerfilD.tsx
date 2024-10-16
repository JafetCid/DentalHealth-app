import React from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import Header from '../components/Header'
import styles from '../../../assets/styles/PerfilA'
import { useState } from 'react'

export default function PerfilD({ navigation }) {

    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };


  return (
    <View>
        <Header title={''} onPress={() => navigation.goBack()} showP={true}/>
        <Text style={styles.text}>Nombre del Doctor</Text>
        <View style={styles.content}>
            <View style={styles.card}>
                <View style={styles.text2}>
                    <Text style={styles.title}>Información</Text>
                </View>
                <TouchableOpacity style={styles.icon} onPress={() => setIsVisible(true)}>
                    <Ionicons name="ellipsis-vertical" size={22} color="gray" />
                </TouchableOpacity>
                {isVisible &&
                    <Pressable style={styles.centeredView} onPress={toggleModal}>
                        <View>
                            <View style={styles.modalView}>
                                <Pressable 
                                    onPress={() => navigation.navigate('StepperD')}>
                                    <Text style={styles.modalText}>Editar perfil</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                }
                <View style={styles.info}>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            <MaterialIcons name="contacts" size={24} color="black" />
                        </View>
                        <View style={styles.infoContText}>
                            <Text>C.6518106</Text>
                        </View>
                    </View>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            <FontAwesome name="mobile-phone" size={30} color="black" />
                        </View>
                        <View style={styles.infoContText}>
                            <Text>+52 2241158596</Text>
                        </View>
                    </View>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            <MaterialCommunityIcons name="gmail" size={24} color="black" />
                        </View>
                        <View style={styles.infoContText}>
                            <Text>josealberto@gmail.com</Text>
                        </View>
                    </View>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            <Ionicons name="location-sharp" size={24} color="black" />
                        </View>
                        <View style={styles.infoContText}>
                            <Text>3 Oriente N° 14 entre la calle 8 norte y calle 10 norte</Text>
                        </View>
                    </View>
                    <Text style={styles.textEnd}>Tochtepec, Puebla</Text>
                </View>
            </View>
        </View>
        
    </View>
  )
}
