import React from 'react'
import { View, Image} from 'react-native'
import Header from '../components/Header'
import styles from '../../../assets/styles/PerfilP'
import { CardPerfilP } from '../components/CardPerfilP';

export default function PerfilP({ navigation }) {

  // const [isVisible, setIsVisible] = useState(false);

  // const toggleModal = () => {
  //     setIsVisible(!isVisible);
  // };

  return (
    <View>
      <Header title={''} onPress={() => navigation.goBack('Inicio')} showLogo={false} showP={true} point={''}/>
      <View style={styles.logoC}>
        <Image source={require('../../../assets/images/Perfil.png')} style={styles.imgLogo}/>
      </View>
      {/* <Text style={styles.name}>Noelia</Text> */}
      <CardPerfilP navigation={navigation} showElipse={true} showHeader={false}/>
    </View>
  )
}
