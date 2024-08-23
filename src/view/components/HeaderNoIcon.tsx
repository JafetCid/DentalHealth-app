import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function HeaderNoIcon() {
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.containeSvg}
        source={require('./../../../assets/images/wavy.png')}
      />
      <Image
        style={styles.wavyF}
        source={require('./../../../assets/images/Union.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 255, // Ajusta este valor basado en tu diseño
    zIndex: -1,
  },
  containeSvg: {
    width: '100%',
    height: 255,
    zIndex: -1, // Asegura que este elemento esté por encima
  },
  wavyF: {
    position: 'absolute',
    width: width,
    marginTop:30 ,
    height: 260,
    zIndex: -1, // Asegura que este elemento esté por debajo
  },
});
