import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, ScrollView} from 'react-native';
import styles from '../../assets/styles/Stepper';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Header from './components/Header';
import InputDate from './components/InputDate';

const StepperD = ({ navigation }) => {
  // const [step1Data, setStep1Data] = useState({ name: '', address: '' });
  // const [step2Data, setStep2Data] = useState({ email: '', username: '' });
  // const [step3Data, setStep3Data] = useState({ password: '', retypePassword: '' });
  const buttonTextStyle = {
    activeStepIconBorderColor: '#308CFF',
    completedProgressBarColor: '#308CFF',
    completedStepIconColor: '#308CFF', 
  };
  
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
                  placeholder={{label: ''}}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => {
                    return <Icon name="arrow-drop-down" size={24} color="black" />; // Ícono de flecha
                  }}
                  >
                  
                </RNPickerSelect>
                {/* input de fecha */}
                <InputDate/>
                {/* <Text style={styles.label}>Fecha de nacimiento</Text>
                <TextInput
                  style={styles.input}
                  // value={step1Data.address}
                  // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                /> */}
                <Text style={styles.label}>Telefono</Text>
                <TextInput
                  style={styles.input}
                  inputMode='tel'
                  // value={step1Data.address}
                  // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                />
                <Text style={styles.label}>Fotografia</Text>
                <TextInput
                  style={styles.input}
                  // value={step1Data.address}
                  // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                />
              </View>
            </ProgressStep>
            {/* Progreso 2 */}
            <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
              // previousBtnStyle={styles.button} nextBtnStyle={styles.button}
            >
              <View style={styles.stepContent}>
                <View style={styles.context}>
                  <Text style={styles.text}>Formación academica</Text>
                </View>
                <Text style={styles.label}>Licenciatura</Text>
                <TextInput
                  style={styles.input}
                  inputMode='text'
                  // value={step2Data.email}
                  // onChangeText={text => setStep2Data({ ...step2Data, email: text })}
                />
                <Text style={styles.label}>Cedula profesional</Text>
                <TextInput
                  style={styles.input}
                  // value={step2Data.username}
                  // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                />
                <Text style={styles.label}>Especialidad</Text>
                <TextInput
                  style={styles.input}
                  inputMode='text'
                  // value={step2Data.username}
                  // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                />
                <Text style={styles.label}>Cedula de especialidad</Text>
                <TextInput
                  style={styles.input}
                  inputMode='text'
                  // value={step2Data.username}
                  // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                />
              </View>
            </ProgressStep>
            {/* Progreos 3 */}
            <ProgressStep previousBtnText="Anterior" finishBtnText="Siguiente" 
              onSubmit={() => navigation.navigate('TabNavigator', { screen: 'Home' })}
              // previousBtnStyle={styles.button} finishBtnStyle={styles.button}
            >
              <View style={styles.stepContent}>
                <View style={styles.context}>
                  <Text style={styles.text}>Información del consultorio</Text>
                </View>
                <Text style={styles.label}>Nombre del consultorio</Text>
                <TextInput
                  style={styles.input}
                  // value={step2Data.username}
                  // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                />
                <Text style={styles.label}>Logo del consultorio</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  // value={step3Data.retypePassword}
                  // onChangeText={text => setStep3Data({ ...step3Data, retypePassword: text })}
                />
                <Text style={styles.label}>Dirección del consultorio</Text>
                <TextInput
                  style={styles.input}
                  inputMode='text'
                  // value={step2Data.username}
                  // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                />
                <Text style={styles.label}>Archivo de autorización</Text>
                <TextInput
                  style={styles.input}
                  // value={step2Data.username}
                  // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                />
              </View>
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

export default StepperD;