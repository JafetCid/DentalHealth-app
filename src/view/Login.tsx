import { TextInput, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../../assets/styles/Login';
import Header from "./components/Header";
import React, { useState } from 'react';
import ButtonIn from './components/ButtonIn';
import GoogleIconButton from './components/GoogleIconB';
import { Checkbox } from 'react-native-paper';

export default function Login ({ navigation }) {
    const [isSelected, setSelected] = useState({
        check: false,
    });

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
                        <Text style={styles.textI}>Usuario</Text>
                        <TextInput style={styles.input}/>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.textI}>Contraseña</Text>
                        <TextInput style={styles.input}/>
                        <TouchableOpacity style={styles.link}>
                            <Text style={styles.linkText}> ¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                    </View>
                    <ButtonIn 
                        Title={'Iniciar sesión '} textStyle={{color: '#308CFF'}} 
                        buttonStyle={{borderColor: '#308CFF', borderWidth: 1, marginTop: 30}} 
                        onPress={() => navigation.navigate('TabNavigator', { screen: 'Home' })}/>
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
                    <GoogleIconButton/>
                </View> 
            </View>
        </ScrollView>
        
    )
}