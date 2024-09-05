import React from 'react'
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Header from './components/Header'
import styles from '../../assets/styles/PerfilA'
import { useState } from 'react'

export default function PerfilA({ navigation }) {

    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };


  return (
    // <View>
    //     <Header title={''} showP={true}/>
    //     <Text style={styles.text}>Nombre del Doctor</Text>
    //     <View style={styles.card}>
    //         <TouchableOpacity style={styles.icon} onPress={() => setIsVisible(true)}>
    //             <Ionicons name="ellipsis-vertical" size={24} color="gray" />
    //         </TouchableOpacity>


    //     </View>

    // </View>
    <View>
        <Header title={''}/>
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
                                    onPress={() => navigation.navigate('CrearP')}>
                                    <Text style={styles.modalText}>Editar perfil</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                }
                <View style={styles.info}>

                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                </View>
            </View>
        </View>
        
    </View>
  )
}
