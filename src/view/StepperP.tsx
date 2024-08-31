import styles from '../../assets/styles/Stepper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Header from './components/Header';
import InputDate from './components/InputDate';

const StepperP = ({ navigation }) => {
  // const [step1Data, setStep1Data] = useState({ name: '', address: '' });
  // const [step2Data, setStep2Data] = useState({ email: '', username: '' });
  // const [step3Data, setStep3Data] = useState({ password: '', retypePassword: '' });
  
  const buttonTextStyle = {
      activeStepIconBorderColor: '#308CFF',
        completedProgressBarColor: '#308CFF',
        completedStepIconColor: '#308CFF', 
    };

    // Input de select
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const items = [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Femenino', value: 'femenino' },
    ];

    return (

        <ScrollView>
            <View style={styles.container}>
                <Header title={'Crear Cuenta'} showLogo={false}/>
                <View style={styles.cont}>
                    <ProgressSteps style={styles.stepContent} {...buttonTextStyle}>
                        {/* Progreso 1 */}
                        <ProgressStep nextBtnText="Siguiente"  
                        // nextBtnStyle={styles.button}
                        >
                        <View style={styles.context}>
                            <Text style={styles.text}>Datos personales</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput
                                style={styles.input}
                                inputMode='text'
                                // value={step1Data.name}
                                // onChangeText={text => setStep1Data({ ...step1Data, name: text })}
                            />
                            <Text style={styles.label}>Apellidos</Text>
                            <TextInput
                                style={styles.input}
                                inputMode='text'
                                // value={step1Data.address}
                                // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                            />
                            <Text style={styles.label}>Genero</Text>
                            <RNPickerSelect 
                                style={pickerSelectStyles}
                                onValueChange={(value) => setSelectedValue(value)}
                                items={items}
                                placeholder={{label: '', value: null}}
                                useNativeAndroidPickerStyle={false} 
                                Icon={() => {
                                    return <Icon name="arrow-drop-down" size={24} color="black" />; // Ícono de flecha
                                }}
                            >
                            </RNPickerSelect>
                            {/* input de fecha */}
                            <InputDate/>
                            {/* <Text style={styles.label}>Fecha de nacimiento</Text>

                            {showPicker && (
                                <DateTimePicker
                                    mode='date'  
                                    display='spinner'  
                                    value={date}
                                    onChange={onChange}
                                />
                            )}
                            {!showPicker && (
                                <Pressable onPress={toggleDatepicker}>
                                    <TextInput
                                        style={styles.input}
                                        value={dateOfBirth}
                                        onChangeText={setDateOfBirth}
                                        placeholder='hola'
                                        placeholderTextColor='black'
                                        editable={false}
                                    />
                                </Pressable>
                            )} */}
                            <Text style={styles.label}>Número de telefono</Text>
                            <TextInput
                                style={styles.input}
                                inputMode='tel'
                                // value={step1Data.address}
                                // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                            />
                            <Text style={styles.label}>Fotografía (Opcional)</Text>
                            <TextInput
                                style={styles.input}
                                // value={step1Data.address}
                                // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                            />
                        </View>
                        </ProgressStep>
                        {/* Progreso 2 */}
                        <ProgressStep previousBtnText="Anterior" finishBtnText="Siguiente"
                            onSubmit={() => navigation.navigate('TabNavigator', { screen: 'Home' })}
                        // previousBtnStyle={styles.button} nextBtnStyle={styles.button}
                        >
                            <View style={styles.stepContent}>
                                <View style={styles.context}>
                                    <Text style={styles.text}>Datos personales</Text>
                                </View>
                                <Text style={styles.label}>Estado civil (Opcional)</Text>
                                <TextInput
                                    style={styles.input}
                                    inputMode='text'
                                    // value={step2Data.email}
                                    // onChangeText={text => setStep2Data({ ...step2Data, email: text })}
                                />
                                <Text style={styles.label}>Ocupación (Opcional)</Text>
                                <TextInput
                                    style={styles.input}
                                    // value={step2Data.username}
                                    // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                                />
                                <Text style={styles.label}>Dirección</Text>
                                <TextInput
                                    style={styles.input}
                                    inputMode='text'
                                    // value={step2Data.username}
                                    // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                                />
                                <Text style={styles.label}>Procedencia</Text>
                                <TextInput
                                    style={styles.input}
                                    inputMode='text'
                                    // value={step2Data.username}
                                    // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                                    />
                                <Text style={styles.label}>Correo electrónico</Text>
                                <TextInput
                                    style={styles.input}
                                    inputMode='text'
                                    // value={step2Data.username}
                                    // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                                    />
                                <Text style={styles.label}>Contraseña</Text>
                                    <TextInput
                                    style={styles.input}
                                    inputMode='text'
                                    // value={step2Data.username}
                                    // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                                    />
                                <Text style={styles.label}>Confirmar contraseña</Text>
                                    <TextInput
                                    style={styles.input}
                                    inputMode='text'
                                    // value={step2Data.username}
                                    // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                                />
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
    },
    iconContainer: {
        top: 15,
        right: 15,
    },
});

export default StepperP;