import HeaderNoIcon from './components/HeaderNoIcon';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function TabTwoScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <HeaderNoIcon />
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Home')} // Cambiado a navigate
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>
        Nombre del Doctor
      </Text>
      <View style={styles.content}>
      </View>
      <View style={styles.chatArea}>
        {/* Aquí irían los mensajes del chat */}
      </View>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Color de fondo blanco
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10, // Espacio adicional en la parte superior del contenido
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 25,
    marginTop: -200, // Mueve la flecha más arriba
    marginLeft:10,
  },
  text: {
    fontSize: 24,
    color: '#000000', // Color negro
    marginTop: 10,
    marginLeft:10,
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
  },
});
