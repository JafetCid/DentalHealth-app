import { StyleSheet, View, Image, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default function Header () {
    return(
        <View>
            <Image
            style={styles.containeSvg}
            source={require('../../assets/images/wavy.png')}
            />
            <Image
            style={styles.wavyF}
            source={require('../../assets/images/Union.png')}
            />
            <View style={styles.logoC}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/logo.png')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
  });
  