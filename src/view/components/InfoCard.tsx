import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import styles from '../../../assets/styles/PerfilA'; // Asegúrate de que la ruta sea correcta

const InfoCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.text2}>
        <Text style={styles.title}>Información</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.infoContCard}>
          <View style={styles.iconCard}>
            <MaterialIcons name="contacts" size={24} color="black" />
          </View>
          <View style={styles.infoContText}>
            <Text>C.6518106</Text>
          </View>
        </View>
        <View style={styles.infoContCard}>
          <View style={styles.iconCard}>
            <FontAwesome name="mobile-phone" size={30} color="black" />
          </View>
          <View style={styles.infoContText}>
            <Text>+52 2241158596</Text>
          </View>
        </View>
        <View style={styles.infoContCard}>
          <View style={styles.iconCard}>
            <MaterialCommunityIcons name="gmail" size={24} color="black" />
          </View>
          <View style={styles.infoContText}>
            <Text>josealberto@gmail.com</Text>
          </View>
        </View>
        <View style={styles.infoContCard}>
          <View style={styles.iconCard}>
            <Ionicons name="location-sharp" size={24} color="black" />
          </View>
          <View style={styles.infoContText}>
            <Text>3 Oriente N° 14 entre la calle 8 norte y calle 10 norte</Text>
          </View>
        </View>
        <Text style={styles.textEnd}>Tochtepec, Puebla</Text>
      </View>
    </View>
  );
};

export default InfoCard;
