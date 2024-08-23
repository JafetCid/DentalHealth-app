import { StyleSheet } from "react-native";
import { Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      marginBottom: '15%',
    },
    arrowLeft: {
      position: 'absolute',
      marginTop: 50,
      margin: 20,
      flex: 1,
    },
    point: {
      position: 'absolute',
      marginTop: 50,
      width: '95%',
      alignItems: 'flex-end',
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

export default styles;