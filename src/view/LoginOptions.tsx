import { StatusBar } from 'expo-status-bar';
import { Text, View, Modal, Alert, Pressable } from 'react-native';
import ButtonIn from './components/ButtonIn';
import GoogleIconButton from './components/GoogleIconB';
import Header from './components/Header';
import { useState } from 'react';
import styles from '../../assets/styles/LoginO'

export default function LoginOptions ({ navigation }) {

  const [isVisible, setIsVisible] = useState(false);

  return(
    <View style={styles.maincontainer}>
      <Header title={''} showArrow={false}/>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido </Text>
        <View style={styles.contB}>
          <ButtonIn 
            Title={'Crear cuenta '} textStyle={{color: 'white'}} buttonStyle={{backgroundColor: '#308CFF'}}
            onPress={() => setIsVisible(true) }/>
          <ButtonIn 
            Title={'Iniciar sesión '} textStyle={{color: '#308CFF'}} 
            buttonStyle={{borderColor: '#308CFF', borderWidth: 1, }}
            onPress={() => navigation.navigate('Login')}/>
          <GoogleIconButton/>
        </View>
        <StatusBar style="auto" />
      </View>

      {/* Modal */}
      
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setIsVisible(!isVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>¿Eres doctor o eres paciente?</Text>
              <Text style={styles.modalText2}>Dependiendo del tipo de usuario el registro será diferente.</Text>
              <View style={styles.btnModal}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => navigation.navigate('StepperD')}>
                  <Text style={styles.textStyle}>Doctor</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => navigation.navigate('StepperP')}>
                  <Text style={styles.textStyle}>Paciente</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
    //</ScrollView>
  )
}
