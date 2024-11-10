import { TouchableOpacity, View, Image, 
  StyleSheet, Text, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../assets/styles/Header'
import { Ionicons } from '@expo/vector-icons';

export default function Header ({ title, showLogo = true, showArrow = true, showP = false, onPress, point}) {

  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

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
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={toggleModal}>
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <Pressable
                  onPress={() => { 
                    setIsVisible(false);
                    navigation.navigate(point)}}>
                  <Text style={style.modalText}>Perfil</Text>
                </Pressable>
                <Pressable
                  onPress={() => { 
                    setIsVisible(false); 
                    navigation.navigate('LoginO')}}>
                  <Text style={style.modalText}>Cerrar sesión</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
    alignItems: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    marginTop: '12%',
    width: '30%',
    borderRadius: 8,
    elevation: 5,
    padding: 10,
    right: 20,
  },
  modalText: {
    marginBottom: 4,
    fontSize: 12,
  },
});
  