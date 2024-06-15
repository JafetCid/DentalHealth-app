import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import ButtonIn from './components/ButtonIn';
import GoogleIconButton from './components/GoogleIconB';
import Header from './Header';
const {width, height} = Dimensions.get('window');

export default function Login () {
    return(
        <View style={styles.maincontainer}>
            <Header/>
            <View style={styles.container}>
                <Text style={styles.title}>Bienvenido </Text>
                <View style={styles.contB}>
                    <ButtonIn 
                    
                        Title={'Crear cuenta '} buttonStyle={{backgroundColor: '#308CFF'}}/>
                    <ButtonIn Title={'Iniciar sesión '} textStyle={{color: '#308CFF'}} buttonStyle={{borderColor: '#308CFF', borderWidth: 1, }}/>
                    <GoogleIconButton/>
                </View>
                <StatusBar style="auto" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    maincontainer: {
      backgroundColor: '#fff',
      flex: 1,
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
    },
    contB: {
      alignItems: 'center',
      justifyContent: 'center',
      width: width,
    },
    title: {
      fontSize: 24,
      marginBottom: 40,
    },
  });