import { View, Text, TouchableOpacity, Pressable, Modal, TouchableWithoutFeedback } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import styles from '../../../assets/styles/PerfilD'
import { useState } from 'react'
import Header from '../components/Header'
import React from 'react'

export default function PerfilD({ navigation }) {

    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };


  return (
    <View>
        <Header title={''} onPress={() => navigation.goBack('Inicio')} showProfilePD={true} point={''} showLogo={false}/>
        <Text style={styles.text}>Jose Alberto López Jiménez</Text>
        <View style={styles.content}>
            <View style={styles.card}>
                <View style={styles.text2}>
                    <Text style={styles.title}>Información</Text>
                </View>
                <TouchableOpacity style={styles.icon} onPress={() => setIsVisible(true)}>
                    <Ionicons name="ellipsis-vertical" size={22} color="gray" />
                </TouchableOpacity>
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
                                    navigation.navigate('StepperD')}}>
                                <Text style={styles.modalText}>Editar perfil</Text>
                                </Pressable>
                            </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                }
                <View style={styles.info}>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            <MaterialIcons name="contacts" size={24} color="black" />
                        </View>
                        <View style={styles.infoContText}>
                            <Text style={styles.textInf}>C.6518106</Text>
                        </View>
                    </View>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            <FontAwesome name="mobile-phone" size={30} color="black" />
                        </View>
                        <View style={styles.infoContText}>
                            <Text style={styles.textInf}>+52 2241158596</Text>
                        </View>
                    </View>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            <MaterialCommunityIcons name="gmail" size={24} color="black" />
                        </View>
                        <View style={styles.infoContText}>
                            <Text style={styles.textInf}>josealberto@gmail.com</Text>
                        </View>
                    </View>
                    <View style={styles.infoContCard}>
                        <View style={styles.iconCard}>
                            <Ionicons name="location-sharp" size={24} color="black" />
                        </View>
                        <View style={styles.infoContText}>
                            <Text style={styles.textInf}>3 Oriente N° 14 entre la calle 8 norte y calle 10 norte</Text>
                        </View>
                    </View>
                    <Text style={styles.textEnd}>Tochtepec, Puebla</Text>
                </View>
            </View>
        </View>
        
    </View>
  )
}
