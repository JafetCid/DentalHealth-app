import { TouchableOpacity, StyleSheet, View, Image, Dimensions, Text } from 'react-native';
const {width, height} = Dimensions.get('window');

export default function Header ({ title, showLogo = true, showArrow= false }) {
  return(
    <View style={styles.container}>
      <Image
      style={styles.cont}
      source={require('../../assets/images/wavy.png')}
      />
      <Image
      style={styles.wavyF}
      source={require('../../assets/images/Union.png')}
      />
      {showArrow && (
        <TouchableOpacity style={styles.arrowLeft}>
          <Image source={require('../../assets/images/ArrowLeft.png')}/>
        </TouchableOpacity>
      )}
      <View style={styles.logoC}>
        {showLogo && (
          <Image source={require('../../assets/images/logo.png')}/>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  arrowLeft: {
    position: 'absolute',
    marginTop: 50,
    margin: 20,
    flex: 1,
  },
  cont: {
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
  title: {
    fontSize: 24,
    color: 'white',
  },
});
  