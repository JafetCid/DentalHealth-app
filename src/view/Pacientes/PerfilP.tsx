import React from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import ButtonIn from '../components/ButtonIn';
import Header from '../components/Header'
import styles from '../../../assets/styles/PerfilP'
import { useState } from 'react'
import { CardPerfilP } from '../components/CardPerfilP';

export default function PerfilP({ navigation, showButton = false, showElipse = true }) {

  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
      setIsVisible(!isVisible);
  };

  return (
    <View>
      <Header title={''} onPress={() => navigation.goBack('Inicio')} showP={true}/>
      <Text style={styles.name}>Noelia</Text>
      <CardPerfilP navigation={navigation}/>
      
      {showButton && (
        <View style={styles.buttonContainer}> 
        <ButtonIn
          Title="Ver expediente"
          buttonStyle={styles.buttonAgendar}
          textStyle={styles.buttonText}
          onPress={() => navigation.navigate('ExamDent')} 
        />
        <ButtonIn
          Title="Ver Examen dental"
          buttonStyle={styles.buttonAgendar}
          textStyle={styles.buttonText}
          onPress={() => navigation.navigate('ExpedienteLista')} 
          />
        </View>   
      )}
    </View>
  )
}
