import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import ButtonIn from "../components/ButtonIn";
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, ScrollView } from 'react-native';
import styles from '../../../assets/styles/Stepper';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Header from '../components/Header';
import InputDate from '../components/InputDate';
import InputImage from '../components/InputImage';
import * as DocumentPicker from 'expo-document-picker';

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

  //manejo del nombre del archivo
  const [fileName, setFileName] = useState(null);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Permite seleccionar solo PDF
      });
      if (result.canceled) {
        setFileName(null); // limpia el nombre al cancelar
      } else if (result.assets && result.assets.length > 0) {
        const { name } = result.assets[0];
        setFileName(name);
      }
    } catch (err) {
      console.error('Error al seleccionar el archivo:', err);
    }
  };

  return (

    <ScrollView>
      <View style={styles.container}>
        <Header title={'Crear Cuenta'} showLogo={false} onPress={() => navigation.goBack()}/>
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

                <Text style={styles.label}>Telefono</Text>
                <TextInput
                  style={styles.input}
                  inputMode='tel'
                  // value={step1Data.address}
                  // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                />
                
                {/* Input de fotografia */}
                <InputImage/>

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
              onSubmit={() => navigation.navigate('TabNav', { screen: 'Home1' })}
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

                {/* Input de fotografia */}
                <InputImage/>
                
                <Text style={styles.label}>Dirección del consultorio</Text>
                <TextInput
                  style={styles.input}
                  inputMode='text'
                  // value={step2Data.username}
                  // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
                />
                <Text style={styles.label}>Archivo de autorización</Text>
                <View style= {styles.contIA}>
                  <ButtonIn buttonStyle={{backgroundColor: '#F7F7F7', width:'100%'}}
                  Title={'Seleccione un archivo'} textStyle={{color: 'black', fontSize: 16,}}
                  onPress={pickDocument}/>
                  <MaterialCommunityIcons name="paperclip" size={24} color="black" style={styles.iconClip} />
                </View>
                <Text style={styles.nameFile}>{fileName}</Text>
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
    marginBottom: 15,
  },
  iconContainer: {
    top: 15,
    right: 15,
  },
});

export default StepperD;