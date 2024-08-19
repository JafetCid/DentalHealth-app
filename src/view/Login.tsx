import { TextInput, Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import styles from '../../assets/styles/Login';
import Header from "./components/Header";
import ButtonIn from './components/ButtonIn';
import GoogleIconButton from './components/GoogleIconB';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Login ({ navigation }) {
    // const [isSelected, setSelection] = useState(false);

// example@example.com
// password123
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://10.1.1.135:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Manejar el éxito del login
                Alert.alert('Login exitoso', 'Has iniciado sesión correctamente.');
                await AsyncStorage.setItem('token', data.token);

                navigation.navigate('Inicio');
            } else {
                // Manejar errores de autenticación
                Alert.alert('Error', data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            // Manejar errores de red u otros problemas
            console.error('Error en la solicitud:', error);
            Alert.alert('Error', 'Hubo un problema con la solicitud. Inténtalo más tarde.');
        }
    };

    return(
        <ScrollView>
            <View>
                <Header title={''} navigation={navigation}/>
                <View style={styles.container}>
                    <Text style={styles.title}> Bienvenido de nuevo </Text>
                </View>
                <View style={styles.formC}>
                    <View style={styles.form}>
                        <Text style={styles.textI}>Usuario</Text>
                        <TextInput 
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.textI}>Contraseña</Text>
                        <TextInput 
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.link}>
                            <Text style={styles.linkText}> ¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                    </View>
                    <ButtonIn 
                        Title={'Iniciar sesión '} textStyle={{color: '#308CFF'}} 
                        buttonStyle={{borderColor: '#308CFF', borderWidth: 1, marginTop: 30}} 
                        // onPress={() => navigation.navigate('Inicio')}
                        onPress={handleLogin}

                    />
                    <View style={styles.cuent}>
                        <Text>¿Cuentas con una cuenta?</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkR}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.aviso}>
                            <Text style={styles.linkR}>Aviso de privacidad</Text>
                        </TouchableOpacity>
                    </View>
                    <GoogleIconButton/>
                </View> 
            </View>
        </ScrollView>
        
    )
}