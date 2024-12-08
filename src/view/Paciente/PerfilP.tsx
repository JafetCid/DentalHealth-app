import React from 'react'
import { API_URL } from '@env';
import { View, Image } from 'react-native'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import styles from '../../../assets/styles/PerfilP'
import { CardPerfilP } from '../components/CardPerfilP';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilP({ navigation }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    //Obtener la informacion del usuario
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token: ', token)

        const response = await fetch(`${API_URL}/api/auth/userinfo`, {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        console.log('Estado de la respuesta:', response.status);

        const data = await response.json();
        setUser(data)

      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchUserInfo();

  }, [])

  return (
    <View>
      <Header title={''} onPress={() => navigation.goBack('Inicio')} showLogo={false} showP={true} point={''} />
      <View style={styles.logoC}>
        {user && user.profilePictureUrl ? (
          <Image
            source={
              user.profilePictureUrl
                ? { uri: `${user.profilePictureUrl}` }  // Usar imagen desde la URL proporcionada por la base de datos
                : require('../../../assets/images/Perfil.png')  // Imagen por defecto
            }
            style={styles.imgLogo}
          />
        ) : null}
      </View>
      {/* <Text style={styles.name}>Noelia</Text> */}
      <CardPerfilP navigation={navigation} showElipse={true} showHeader={false} />
    </View>
  )
}
