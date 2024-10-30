import React from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import ButtonIn from '../components/ButtonIn';
import Header from '../components/Header'
import styles from '../../../assets/styles/PerfilP'
import { useState } from 'react'

export default function PerfilP({ navigation, showButton = false, showElipse = true }) {

  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
      setIsVisible(!isVisible);
  };

  return (
    <View>
      <Header title={''} onPress={() => navigation.goBack('Inicio')} showP={true}/>
      <Text style={styles.name}>Noelia</Text>
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
                <FontAwesome5 name="birthday-cake" size={24} color="black" />
              </View>
              <View style={styles.infoContText}>
                  <Text style={styles.textInf}>31 de Agosto de 1987</Text>
                  <Text style={styles.textCard}>35 años, 2 meses, 7 dias</Text>
              </View>
            </View>
            <View style={styles.infoContCard}>
              <View style={styles.iconCard}>
                <FontAwesome5 name="female" size={24} color="black" />
              </View>
              <View style={styles.infoContText}>
                  <Text style={styles.textInf}>Femenino 
                    <Text style={styles.textEnd}> /Soltera</Text>
                  </Text>
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
                <MaterialIcons name="work" size={24} color="black" />
              </View>
              <View style={styles.infoContText}>
                <Text style={styles.textInf}>Ama de casa</Text>
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
      {showButton && (
        <View style={styles.buttonContainer}> 
        <ButtonIn
          Title="Ver expediente"
          buttonStyle={styles.buttonAgendar}
          textStyle={styles.buttonText}
          onPress={() => navigation.navigate('ExpedienteLista')} //ExpedienteLista
        />
        <ButtonIn
          Title="Ver Examen dental"
          buttonStyle={styles.buttonAgendar}
          textStyle={styles.buttonText}
          onPress={() => navigation.navigate('ExamDent')} //ExamenDent
          />
        </View>   
      )}
    </View>
  )
}
