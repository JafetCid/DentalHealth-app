import { TextInput, Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import styles from '../../assets/styles/Login';
import Header from "./components/Header";
import React, { useState } from 'react';
import ButtonIn from './components/ButtonIn';
import GoogleIconButton from './components/GoogleIconB';
import { Checkbox } from 'react-native-paper';
import { validateLogin } from '../utils/Validation';

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


    const handleLogin = () => {
        const validationErrores = validateLogin(email, password);
        if (Object.keys(validationErrores).length > 0) {
            setErrores(validationErrores);
        } else {
            setErrores({});
            // Aquí puedes manejar la lógica para enviar los datos al servidor o API
            Alert.alert("Login exitoso", "Usuario autenticado correctamente");
            // navigation.navigate('TabNavigator', { screen: 'Home' });
            navigation.navigate('TabNav', { screen: 'Home1' });
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