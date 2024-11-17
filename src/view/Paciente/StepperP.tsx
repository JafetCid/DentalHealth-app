import styles from '../../../assets/styles/Stepper';
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
        genero: null,
        dateOfBirth: '',
        telefono: '',
        direccion: '',
        procedencia: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errores, setErrores] = useState({
        nombre: '',
        apellidos: '',
        genero: null,
        dateOfBirth: '',
        telefono: '',
        direccion: '',
        procedencia: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e, value) => {
        // Prevenir números en los campos nombre, apellidos y ocupación
        if (e === 'nombre') {
            value = value.replace(/\d/g, '');
            if (value.length > 20) {
                setErrores(prevErrores => ({
                    ...prevErrores,
                    nombre: 'El nombre no puede tener más de 20 caracteres.',
                }));
                return; 
            }
        }

        if (e === 'apellidos') {
            value = value.replace(/\d/g, '');
            if (value.length > 20) {
                setErrores(prevErrores => ({
                    ...prevErrores,
                    apellidos: 'Los apellidos no puede tener más de 20 caracteres.',
                }));
                return; 
            }
        }
        
        if (e === 'telefono') {
            value = value.replace(/\D/g, ''); // Eliminar cualquier carácter que no sea un dígito
            if (value.length > 10) {
                value = value.slice(0, 10); // Limitar a 10 dígitos
            }
        }

        // Primero, actualizamos el estado con el nuevo valor de stepData
        const nuevoStepData = { ...stepData, [e]: value };
        setStepData(nuevoStepData); // Actualizamos el estado de forma directa
        
        const erroresValidacion = validarPaso1P(
            nuevoStepData.nombre,
            nuevoStepData.apellidos,
            nuevoStepData.genero,
            nuevoStepData.dateOfBirth,
            nuevoStepData.telefono
        );
         // Verificar si todos los campos están llenos
         const todosCamposLlenos = nuevoStepData.nombre && nuevoStepData.apellidos && 
            nuevoStepData.genero && nuevoStepData.dateOfBirth && nuevoStepData.telefono;

        if (todosCamposLlenos) {
            // Si todos los campos están llenos, actualiza todos los errores
            setErrores(erroresValidacion);
        } else {
            // Si se está llenando un campo, actualiza solo el error específico
            setErrores(prevErrores => ({
                ...prevErrores,
                [e]: erroresValidacion[e] || '', // Actualiza solo el campo específico
            }));
        }
    };

    const handleInputChange2 = (e, value) => {

        if (e === 'procedencia') {
            value = value.replace(/\d/g, ''); // Eliminar números
        }

        // Primero, actualizamos el estado con el nuevo valor de stepData
        const nuevoStepData = { ...stepData, [e]: value };
        setStepData(nuevoStepData); // Actualizamos el estado de forma directa
        
        const erroresValidacion = validarPaso2P(
            nuevoStepData.direccion,
            nuevoStepData.procedencia,
            nuevoStepData.email,
            nuevoStepData.password,
            nuevoStepData.confirmPassword,
        );
         // Verificar si todos los campos están llenos
        const todosCamposLlenos = nuevoStepData.direccion && nuevoStepData.procedencia && 
            nuevoStepData.email  && nuevoStepData.password && nuevoStepData.confirmPassword;

        if (todosCamposLlenos) {
            setErrores(erroresValidacion);
        } else {
            setErrores(prevErrores => ({
                ...prevErrores,
                [e]: erroresValidacion[e] || '', // Actualiza solo el campo específico
            }));
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
            setErrores(erroresPaso1);
            Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
            return false;
        }
        return true; // Permite avanzar al paso 2
    };
    
    const handleFinalSubmit = () => {
        console.log('Datos enviados:', stepData);
        console.log(errores);
        const erroresPaso2 = validarPaso2P(
            stepData.direccion,
            stepData.procedencia,
            stepData.email,
            stepData.password,
            stepData.confirmPassword
        );

        if (Object.keys(erroresPaso2).length > 0) {
            setErrores(erroresPaso2);
            Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
            return false;
        } else {
            navigation.navigate('TabNavigator', { screen: 'Home' });
        }

    };
    
    const buttonTextStyle = {
        activeStepIconBorderColor: '#308CFF',
        completedProgressBarColor: '#308CFF',
        completedStepIconColor: '#308CFF', 
    };

    return (

        <ScrollView>
            <View style={styles.container}>
                <Header title={'Crear Cuenta'} showLogo={false} onPress={() => navigation.goBack()} point={''}/>
                <View style={styles.cont}>
                    <ProgressSteps style={styles.stepContent} {...buttonTextStyle}>
                        {/* Progreso 1 */}
                        <ProgressStep nextBtnText="Siguiente"
                            nextBtnStyle={styles.botonSiguiente}
                            onNext={handleNextStep1}
                            previousBtnStyle={styles.botonAnterior}
                            nextBtnDisabled={Object.keys(errores).length > 0 || !stepData.nombre || 
                                !stepData.apellidos || !stepData.genero || !stepData.dateOfBirth || 
                                !stepData.telefono}
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
                                value={stepData.genero}
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
                                    onChangeText={(value) => handleInputChange2('direccion', value)}
                                />
                                {errores.direccion && <Text style={{ color: 'red' }}>{errores.direccion}</Text>}
                                <Text style={styles.label}>Procedencia</Text>
                                <TextInput
                                    style={styles.input}
                                    value={stepData.procedencia}
                                    onChangeText={(value) => handleInputChange2('procedencia', value)}
                                />
                                {errores.procedencia && <Text style={{ color: 'red' }}>{errores.procedencia}</Text>}

                                <Text style={styles.label}>Correo electrónico</Text>
                                <TextInput
                                    style={styles.input}
                                    value={stepData.email}
                                    onChangeText={(value) => handleInputChange2('email', value)}
                                />
                                {errores.email && <Text style={{ color: 'red' }}>{errores.email}</Text>}

                                <Text style={styles.label}>Contraseña</Text>
                                    <TextInput
                                    style={styles.input}
                                    //  
                                    value={stepData.password}
                                    onChangeText={(value) => handleInputChange2('password', value)}
                                />
                                {errores.password && <Text style={{ color: 'red' }}>{errores.password}</Text>}

                                <Text style={styles.label}>Confirmar contraseña</Text>
                                    <TextInput
                                    style={styles.input}
                                    //  
                                    value={stepData.confirmPassword}
                                    onChangeText={(value) => handleInputChange2('confirmPassword', value)}
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