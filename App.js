import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Svg, { Path } from "react-native-svg"
import ButtonIn from './ButtonIn';
const {width, height} = Dimensions.get('window');

export default function App() {
  return (
    
    <View style={styles.maincontainer}>
      <View>
        <Image
          style={styles.containeSvg}
          source={require('./assets/wavy.png')}
        />
        <Image
          style={styles.wavyF}
          source={require('./assets/Union.png')}
        />
        <View style={styles.logoC}>
          <Image
            style={styles.logo}
            source={require('./assets/logo.png')}
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido </Text>
        <View style={styles.contB}>
          <ButtonIn Title={'Crear cuenta '} buttonStyle={{backgroundColor: '#308CFF'}}/>
          <ButtonIn Title={'Iniciar sesión '} textStyle={{color: '#308CFF'}} buttonStyle={{borderColor: '#308CFF', borderWidth: 1, }}/>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
    
  );
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
  containeSvg: {
    width: 'auto',
    height: 255,
    alignItems: 'center',
  },
  wavyF: {
    position:'absolute',
    width: width,
    marginTop: 30,
    height: 260,
  }, 
  logoC: {
    position: 'absolute',
    width: width,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    
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
