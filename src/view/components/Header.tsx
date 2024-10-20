import { TouchableOpacity, View, Image, 
  StyleSheet, Text, Modal, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../assets/styles/Header'
import { Ionicons } from '@expo/vector-icons';

export default function Header ({ title, showLogo = true, showArrow = true, showP = false, onPress}) {

  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();

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
        <TouchableOpacity style={styles.arrowLeft} onPress={onPress}>
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
                onPress={() => { 
                  setIsVisible(false);
                  navigation.navigate('PerfilP')}}>
                <Text style={style.modalText}>Perfil</Text>
              </Pressable>
              <Pressable
                onPress={() => { 
                  setIsVisible(false); 
                  navigation.navigate('CrearExpediente')}}>
                <Text style={style.modalText}>Cerrar sesión</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.logoC}>
        {showLogo && (
          // <Image source={require('../../../assets/images/Genshi.jpeg')} style={styles.imgLogo}/>
          <Image source={require('../../../assets/images/logo.png')} style={styles.imgLogo}/>
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
  