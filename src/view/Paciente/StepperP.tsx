import styles from '../../../assets/styles/Stepper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Header from '../components/Header';
import InputDate from '../components/InputDate';
import InputImage from '../components/InputImage';
import { validarPaso1P, validarPaso2P } from '../../utils/Validation';

const StepperP = ({ navigation }) => {
    
    const [stepData, setStepData] = useState({
        nombre: '',
        apellidos: '',
        genero: '',
        dateOfBirth: '',
        telefono: '',
        direccion: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errores, setErrores] = useState({
        nombre: '',
        apellidos: '',
        genero: '',
        dateOfBirth: '',
        telefono: '',
        direccion: '',
        email: '',
        password: '',
        confirmPassword: '',
        showError: false,
    });

    const handleInputChange = (e, value) => {
        // Prevenir números en los campos nombre, apellidos y ocupación
        if (e === 'nombre' || e === 'apellidos' || e === 'ocupacion') {
            value = value.replace(/\d/g, ''); // Eliminar números
        }

        // Limitar el campo de teléfono a 10 dígitos
        if (e === 'telefono') {
            value = value.replace(/\D/g, ''); // Eliminar cualquier carácter que no sea un dígito
            if (value.length > 10) {
                value = value.slice(0, 10); // Limitar a 10 dígitos
            }
        }

        // Primero, actualizamos el estado con el nuevo valor de stepData
        const nuevoStepData = { ...stepData, [e]: value };
        setStepData(nuevoStepData); // Actualizamos el estado de forma directa
        
        // Solo validar los campos relevantes cuando se escriben
        if (e === 'nombre' || e === 'apellidos' || e === 'genero' || e === 'telefono' || e === 'dateOfBirth') {
            // Solo validar los campos relevantes cuando se escriben
            const erroresValidacion= validarPaso1P(
                nuevoStepData.nombre, 
                nuevoStepData.apellidos, 
                nuevoStepData.genero,
                nuevoStepData.dateOfBirth,
                nuevoStepData.telefono
            );

            setErrores((prevErrores) => ({
                ...prevErrores,
                [e]: erroresValidacion[e] || '', // Actualiza solo el campo específico
            }));
            // setErrores(erroresValidacion);

        } else if (e === 'direccion' || e === 'email' || e === 'password' || e === 'confirmPassword') {
            // Validar otros campos en el paso 2
            const erroresValidacion = validarPaso2P(
                nuevoStepData.direccion,
                nuevoStepData.email,
                nuevoStepData.password,
                nuevoStepData.confirmPassword
            );

            setErrores((prevErrores) => ({
                ...prevErrores,
                [e]: erroresValidacion[e] || '', // Actualiza solo el campo específico
            }));
            // setErrores(erroresValidacion);
        }
        
    
    };

    const handleNextStep1 = () => {
        const erroresPaso1 = validarPaso1P(
            stepData.nombre, 
            stepData.apellidos, 
            stepData.genero, 
            stepData.dateOfBirth, 
            stepData.telefono
        );
        if (Object.keys(erroresPaso1).length > 0) {
            console.log(erroresPaso1);
            setErrores(erroresPaso1);
            Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
            return false; // Evita que se avance al paso 2
        }
        return true; // Permite avanzar al paso 2
    };

    const handleFinalSubmit = () => {
        const erroresPaso2 = validarPaso2P(
            stepData.direccion,
            stepData.email,
            stepData.password,
            stepData.confirmPassword
        );
        if (Object.keys(erroresPaso2).length > 0) {
            setErrores(erroresPaso2);
            Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
            return false;
        }
        navigation.navigate('TabNavigator', { screen: 'Home' });
    };
    
    const buttonTextStyle = {
        activeStepIconBorderColor: '#308CFF',
        completedProgressBarColor: '#308CFF',
        completedStepIconColor: '#308CFF', 
    };

    // Input de select
    // const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    // const items = [
    //     { label: 'Masculino', value: 'masculino' },
    //     { label: 'Femenino', value: 'femenino' },
    // ];

    return (

        <ScrollView>
            <View style={styles.container}>
                <Header title={'Crear Cuenta'} showLogo={false} onPress={() => navigation.goBack()} point={''}/>
                <View style={styles.cont}>
                    <ProgressSteps style={styles.stepContent} {...buttonTextStyle}>
                        {/* Progreso 1 */}
                        <ProgressStep nextBtnText="Siguiente"
                            nextBtnStyle={styles.botonSiguiente}
                            onNext={handleNextStep1} // Valida antes de avanzar al siguiente paso
                            previousBtnStyle={styles.botonAnterior}
                            nextBtnDisabled={Object.keys(errores).length > 0 || !stepData.nombre || !stepData.apellidos || !stepData.genero || !stepData.dateOfBirth || !stepData.telefono}  // Deshabilitar si hay errores o campos vacíos
                        >
                        <View style={styles.context}>
                            <Text style={styles.text}>Datos personales</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput
                                style={styles.input}
                                inputMode='text'
                                value={stepData.nombre}
                                onChangeText={(value) => handleInputChange('nombre', value)}
                            />
                            {errores.nombre && <Text style={{ color: 'red' }}>{errores.nombre}</Text>}

                            <Text style={styles.label}>Apellidos</Text>
                            <TextInput
                                style={styles.input}
                                inputMode='text'
                                value={stepData.apellidos}
                                onChangeText={(value) => handleInputChange('apellidos', value)}
                            />
                            {errores.apellidos && <Text style={{ color: 'red' }}>{errores.apellidos}</Text>}

                            <Text style={styles.label}>Genero</Text>
                            <RNPickerSelect 
                                style={pickerSelectStyles}
                                 onValueChange={(value) => handleInputChange('genero', value)}
                                items={[
                                { label: 'Masculino', value: 'masculino' },
                                { label: 'Femenino', value: 'femenino' },
                                ]}
                                placeholder={{ label: 'Seleccione su género', value: null }}
                            > 
                            </RNPickerSelect>
                            {errores.genero && <Text style={{ color: 'red' }}>{errores.genero}</Text>}

                            {/* input de fecha */}
                            <InputDate
                                dateOfBirth={stepData.dateOfBirth}
                                setDateOfBirth={(value) => handleInputChange('dateOfBirth', value)}
                                errorMessage={errores.dateOfBirth}
                            />
                            
                            <Text style={styles.label}>Número de telefono</Text>
                            <TextInput
                                style={styles.input}
                                inputMode='tel'
                                value={stepData.telefono}
                                onChangeText={(value) => handleInputChange('telefono', value)}
                                keyboardType="numeric"
                            />
                            {errores.telefono && <Text style={{ color: 'red' }}>{errores.telefono}</Text>}

                            {/* Input de fotografia */}
                            <InputImage/>
                        </View>
                        </ProgressStep>
                        {/* Progreso 2 */}
                        <ProgressStep 
                            previousBtnText="Anterior" 
                            finishBtnText="Siguiente"
                            onSubmit={handleFinalSubmit}
                            previousBtnStyle={styles.botonAnterior}
                            nextBtnStyle={styles.botonSiguiente}
                            nextBtnDisabled={Object.keys(errores).length > 0} // Deshabilitar si hay errores
                        >
                            <View style={styles.stepContent}>
                                <View style={styles.context}>
                                    <Text style={styles.text}>Datos personales</Text>
                                </View>
                                <Text style={styles.label}>Estado civil (Opcional)</Text>
                                <TextInput
                                    style={styles.input}
                                    inputMode='text'
                                />
                                <Text style={styles.label}>Ocupación (Opcional)</Text>
                                <TextInput
                                    style={styles.input}
                                />
                                <Text style={styles.label}>Dirección</Text>
                                <TextInput
                                    style={styles.input}
                                    inputMode='text'
                                    value={stepData.direccion}
                                    onChangeText={(value) => handleInputChange('direccion', value)}
                                />
                                {errores.direccion && <Text style={{ color: 'red' }}>{errores.direccion}</Text>}
                                <Text style={styles.label}>Procedencia</Text>
                                <TextInput
                                    style={styles.input}
                                    inputMode='text'
                                />
                                <Text style={styles.label}>Correo electrónico</Text>
                                <TextInput
                                    style={styles.input}
                                    value={stepData.email}
                                    onChangeText={(value) => handleInputChange('email', value)}
                                />
                                {errores.email && <Text style={{ color: 'red' }}>{errores.email}</Text>}
                                <Text style={styles.label}>Contraseña</Text>
                                    <TextInput
                                    style={styles.input}
                                    //  
                                    value={stepData.password}
                                    onChangeText={(value) => handleInputChange('password', value)}
                                />
                                {errores.password && <Text style={{ color: 'red' }}>{errores.password}</Text>}
                                <Text style={styles.label}>Confirmar contraseña</Text>
                                    <TextInput
                                    style={styles.input}
                                    //  
                                    value={stepData.confirmPassword}
                                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                                />
                                {errores.confirmPassword && <Text style={{ color: 'red' }}>{errores.confirmPassword}</Text>}
                            </View>
                            {/* <View>
                                <TouchableOpacity style={stylesL.aviso}>
                                    <Text style={stylesL.linkR}>Aviso de privacidad</Text>
                                </TouchableOpacity>
                            </View> */}
                        </ProgressStep>
                    </ProgressSteps>
                </View>
            </View>
        </ScrollView> 
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 55,
        width: '100%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F7F7F7',
    },
    inputAndroid: {
        height: 55,
        width: '100%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F7F7F7',
        marginBottom: 15,
    },
    iconContainer: {
        top: 15,
        right: 15,
    },
});

export default StepperP;