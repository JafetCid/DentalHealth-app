import { TouchableOpacity, View, Image, 
  StyleSheet, Text, Modal, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../assets/styles/Header'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


export default function Header ({ title, showLogo = true, showArrow = true, showP = false, navigation } ) {

  const [isVisible, setIsVisible] = useState(false);
  // const navigation = useNavigation();

  const handleLogout = async () => {
    try {
        // Elimina el token de AsyncStorage
        await AsyncStorage.removeItem('token');

        // Navega a la pantalla de inicio de sesión o pantalla pública
        navigation.navigate('Login');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
    }
};

  return(
    <View style={styles.container}>
      <Image
        style={styles.cont}
        source={require('../../../assets/images/wavy.png')}
      />
      <Image
        style={styles.wavyF}
        source={require('../../../assets/images/Union.png')}
      />
      {showArrow && (
        <TouchableOpacity style={styles.arrowLeft}>
          <Image source={require('../../../assets/images/ArrowLeft.png')}/>
        </TouchableOpacity>
      )}
      {showP && (
        <TouchableOpacity style={styles.point} onPress={() => setIsVisible(true)}>
          {/* <Image source={require('../../../assets/images/container.png')}/> */}
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      )}
      {/* Modal */}

      <View style={style.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setIsVisible(!isVisible);
          }}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Pressable
                onPress={() => navigation.navigate('StepperD')}>
                <Text style={style.modalText}>Perfil</Text>
              </Pressable>
              <Pressable
                onPress={handleLogout}>
                <Text style={style.modalText}>Cerrar sesión</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.logoC}>
        {showLogo && (
          <Image source={require('../../../assets/images/logo.png')}/>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  // estilos del modal de perfil y cerrar sesion
  centeredView: {
    flex: 1,
    position: 'absolute',
    width: '95%',
    alignItems: 'flex-end',
    marginTop: '12%',
  },
  modalView: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
  },
  modalText: {
    marginBottom: 4,
    fontSize: 12,
  },
});
  