import { TextInput, Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import styles from '../../assets/styles/Login';
import Header from "./components/Header";
import React, { useState } from 'react';
import ButtonIn from './components/ButtonIn';
import { Checkbox } from 'react-native-paper';
import { validateLogin } from '../utils/Validation';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Login ({ navigation }) {

    const [isSelected, setSelected] = useState({
        check: false,
    });

    type Errores = {
        email?: string; // Clave opcional
        password?: string; // Clave opcional
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errores, setErrores] = useState<Errores>({});
      
    const handleLogin = async () => {
        const validationErrores = validateLogin(email, password);
        if (Object.keys(validationErrores).length > 0) {
            setErrores(validationErrores);
        } else {
            

            try {
                const response = await fetch('http://192.168.0.113:5000/api/auth/login', {
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

                    // navigation.navigate('TabNavigator', { screen: 'Home' });
                    navigation.navigate('TabNav', { screen: 'Home1' });

                } else {
                    // Manejar errores de autenticación
                    Alert.alert('Error', data.message || 'Credenciales incorrectas');
                }
                // const data = await response.json();
    
                // if (response.ok) {
                //     // Si el login es exitoso, guarda el token en las cookies
                //     await CookieManager.set({
                //         name: 'token',
                //         value: data.token,
                //         domain: '192.168.0.113',
                //         path: '/',
                //         version: '1',
                //         expiration: '2025-12-31T23:59:59.999Z', // La fecha de expiración del token
                //     });
        
                //     // Luego de guardar el token, redirige dependiendo del rol del usuario
                //     const userInfoResponse = await fetch('http://192.168.0.113:5000/api/auth/userInfo', {
                //         method: 'GET',
                //         headers: {
                //             'Authorization': `Bearer ${data.token}`, // Usar el token para obtener los datos del usuario
                //         },
                //     });
        
                //     const userInfo = await userInfoResponse.json();
        
                //     if (userInfoResponse.ok) {
                //         // Verifica el rol y redirige a la vista correspondiente
                //         if (userInfo.role === 'patient') {
                //             navigation.navigate('TabNavigator', { screen: 'Home' });
                //         } else if (userInfo.role === 'doctor') {
                //             navigation.navigate('TabNav', { screen: 'Home1' });
                //         } else {
                //             Alert.alert('Error', 'Rol no reconocido');
                //         }
                //     } else {
                //         Alert.alert('Error', userInfo.message || 'No se pudo obtener la información del usuario.');
                //     }
        
                // } else {
                //     // Si las credenciales son incorrectas, muestra un mensaje
                //     Alert.alert('Error', data.message || 'Credenciales incorrectas');
                // }
            } catch (error) {
                // Manejar errores de red u otros problemas
                console.error('Error en la solicitud:', error);
                Alert.alert('Error', 'Hubo un problema con la solicitud. Inténtalo más tarde.');
            }
            // Aquí puedes manejar la lógica para enviar los datos al servidor o API
            // Alert.alert("Login exitoso", "Usuario autenticado correctamente");
            // navigation.navigate('TabNav', { screen: 'Home1' });
        }
    };

    const handleCheckboxChange = (condition) => {
        setSelected((prevState) => ({
        ...prevState,
        [condition]: !prevState[condition],
        }));
    };
    return(
        <ScrollView>
            <View>
                <Header title={''} onPress={''} showArrow={false} point={''}/>
                <View style={styles.container}>
                    <Text style={styles.title}> Bienvenido de nuevo </Text>
                </View>
                <View style={styles.formC}>
                    <View style={styles.form}>
                        <Text style={styles.textI}>Correo</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                        />
                        {errores.email ? <Text style={{color: 'red'}}>{errores.email}</Text> : null}
                    
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.textI}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        {errores.password ? <Text style={{color: 'red'}}>{errores.password}</Text> : null}

                        <TouchableOpacity style={styles.link}>
                            <Text style={styles.linkText}> ¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                    </View>
                    <ButtonIn 
                        Title={'Iniciar sesión '} textStyle={{color: '#308CFF'}} 
                        buttonStyle={{borderColor: '#308CFF', borderWidth: 1, marginTop: 30}} 
                        onPress={handleLogin}/>
                    <View style={styles.cuent}>
                        <Text>¿Cuentas con una cuenta?</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkR}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contAviso}>
                        <Checkbox
                            status={isSelected.check ? 'checked' : 'unchecked'}
                            onPress={() => handleCheckboxChange('check')}
                            color='#308CFF'
                        />
                        <TouchableOpacity style={styles.aviso}>
                            <Text style={styles.linkR}>Aviso de privacidad</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <GoogleIconButton/> */}
                </View> 
            </View>
        </ScrollView>
        
    )
}