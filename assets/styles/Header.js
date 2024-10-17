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
    marginLeft: '90%',
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
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLogo: {
    height: 150,
    width: 150,
    borderRadius: 80,
  },
  title: {
    fontSize: 25,
    color: 'white',
  },
});

export default styles;