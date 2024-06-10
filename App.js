import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import Svg, { Path } from "react-native-svg"
import ButtonIn from './ButtonIn';
const {width, height} = Dimensions.get('window');

export default function App() {

  function SvgTop() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={360}
        height={206}
        fill="none"
      >
        <Path fill="#308CFF" d="M-4.511-49h364.08v201H-4.511z" />
        <Path
          fill="#308CFF"
          d="M70.536 105.435c0-30.022 70.832 21.2 158.207 21.2 87.376 0 158.208-51.222 158.208-21.2 0 30.022-70.832 100.565-158.208 100.565-87.375 0-158.207-70.543-158.207-100.565Z"
        />
        <Path
          fill="#308CFF"
          d="M152 178.941c4.344 26.261-12.88-26.385-116.607-16.926-21.719 0-55.393 28.032-55.393 4.639 0-23.392 0-26.824 62.451-30.213 86.369 0 184.478 35.723 109.549 42.5Z"
        />
      </Svg>
    )
  }

  return (
    
    <View style={styles.maincontainercontainer}>
      <View style={styles.containeSvg}>
        <SvgTop/>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <View style={styles.contB}>
          <ButtonIn Title={'Crear cuenta'} buttonStyle={{backgroundColor: '#308CFF'}}/>
          <ButtonIn Title={'Iniciar sesión'} textStyle={{color: '#308CFF'}} buttonStyle={{borderColor: '#308CFF', borderWidth: 1, }}/>
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
    position: 'relative',
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contB: {
    
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
  },
});
