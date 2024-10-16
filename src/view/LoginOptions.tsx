import { StatusBar } from 'expo-status-bar';
import { Text, View, Modal, Alert, Pressable } from 'react-native';
import ButtonIn from './components/ButtonIn';
import GoogleIconButton from './components/GoogleIconB';
import Header from './components/Header';
import { useState } from 'react';
import styles from '../../assets/styles/LoginO';

export default function LoginOptions({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.maincontainer}>
      <Header title={''} showArrow={false} onPress={''}/>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <View style={styles.contB}>
          <ButtonIn
            Title={'Crear cuenta '}
            textStyle={{ color: 'white' }}
            buttonStyle={{ backgroundColor: '#308CFF' }}
            onPress={() => setIsVisible(true)} // Abre el modal
          />
          <ButtonIn
            Title={'Iniciar sesión '}
            textStyle={{ color: '#308CFF' }}
            buttonStyle={{ borderColor: '#308CFF', borderWidth: 1 }}
            onPress={() => navigation.navigate('Login')} // Redirige a la pantalla de login
          />
          <GoogleIconButton />
        </View>
        <StatusBar style="auto" />
      </View>

      {/* Modal para seleccionar tipo de usuario */}
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
              <Text style={styles.modalText2}>
                Dependiendo del tipo de usuario el registro será diferente.
              </Text>
              <View style={styles.btnModal}>
                {/* Botón Doctor redirige a StepperD */}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setIsVisible(false); // Cierra el modal
                    navigation.navigate('StepperD'); // Redirige a la pantalla de registro de Doctor
                  }}>
                  <Text style={styles.textStyle}>Doctor</Text>
                </Pressable>

                {/* Botón Paciente redirige a StepperP */}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setIsVisible(false); // Cierra el modal
                    navigation.navigate('StepperP'); // Redirige a la pantalla de registro de Paciente
                  }}>
                  <Text style={styles.textStyle}>Paciente</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
