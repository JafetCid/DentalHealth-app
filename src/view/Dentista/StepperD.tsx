import React, { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import ButtonIn from "../components/ButtonIn";
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import styles from '../../../assets/styles/Stepper';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Header from '../components/Header';
import InputDate from '../components/InputDate';
import InputImage from '../components/InputImage';
import * as DocumentPicker from 'expo-document-picker'
import { useNavigation } from '@react-navigation/native';;
import { validarPaso1, validarPaso2 } from '../../utils/StepperD';

const StepperD = () => {
  
  const navigation = useNavigation();
  const [stepData, setStepData] = useState({ 
    nombre: '', 
    apellidos: '', 
    genero: '', 
    telefono: '',
    licenciatura: '',
    cedulaProfesional: '',
    especialidad: '', 
    cedulaEspecialidad: '',
  });

  const [errores, setErrores] = useState({
    nombre: '', 
    apellidos: '', 
    genero: '', 
    telefono: '',
    licenciatura: '',
    cedulaProfesional: '',
    especialidad: '', 
    cedulaEspecialidad: '',
  });
  
  const [FormValid, setFormValid] = useState(1);

  const handleInputChange = (nombre, value) => {
    // Primero, actualizamos el estado con el nuevo valor de stepData
    const nuevoStepData = { ...stepData, [nombre]: value };
    setStepData(nuevoStepData); // Actualizamos el estado de forma directa
  
    // Después de actualizar el estado, validamos el campo actualizado
    const erroresValidacion = validarPaso1(
      nuevoStepData.nombre,
      nuevoStepData.apellidos,
      nuevoStepData.genero,
      nuevoStepData.telefono
    );
  
    // Establecer solo el error del campo que se está modificando
    setErrores((prevErrores) => ({
      ...prevErrores,
      [nombre]: erroresValidacion[nombre] || '', // Actualiza solo el campo específico
    }));
  };
  
  // Valida todos los campos del paso actual
  const validarStep = () => {
    let erroresValidacion = {};

    if (FormValid === 1){
      const erroresValidacion = validarPaso1(
        stepData.nombre,
        stepData.apellidos,
        stepData.genero,
        stepData.telefono
      );
    }
    if (FormValid === 2){
      const erroresValidacion = validarPaso2(
        stepData.licenciatura,
        stepData.cedulaProfesional,
        stepData.especialidad,
        stepData.cedulaEspecialidad
      );
    }
    // setErrores(erroresValidacion); // Actualiza todos los errores

    return Object.keys(erroresValidacion).length === 0;
  };

  const nextStep = () => {
    if (validarStep()) {
      setFormValid((prevFormValid) => prevFormValid + 1);
    } else {
      Alert.alert('Error', 'Por favor corrija los errores antes de continuar.');
    }
  };

  const prevStep = () => {
    if (FormValid > 1) {
        setFormValid(FormValid - 1);
    }
  };

  const buttonTextStyle = {
    activeStepIconBorderColor: '#308CFF',
    completedProgressBarColor: '#308CFF',
    completedStepIconColor: '#308CFF', 
  };

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
  
  const generoItems = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Femenino', value: 'femenino' },
  ];

  return (

    <ScrollView>
      <View style={styles.container}>
        <Header title={'Crear Cuenta'} showLogo={false} onPress={() => navigation.goBack()} point={''}/>
        <View style={styles.cont}>
          <ProgressSteps style={styles.stepContent} {...buttonTextStyle}>
            {/* Progreso 1 */}
            {/* {FormValid === 1 && ( */}
              <ProgressStep nextBtnText="Siguiente"  
                nextBtnStyle={styles.botonSiguiente}
                onNext={nextStep}
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
                  <InputDate/>

                  <Text style={styles.label}>Telefono</Text>
                  <TextInput
                    style={styles.input}
                    inputMode='tel'
                    value={stepData.telefono}
                    onChangeText={(value) => handleInputChange('telefono', value)}
                  />
                  {errores.telefono && <Text style={{ color: 'red' }}>{errores.telefono}</Text>}
                  
                  {/* Input de fotografia */}
                  <InputImage/>

                </View>
              </ProgressStep>
            {/* )} */}
            {/* Progreso 2 */}
            {/* {FormValid === 2 && ( */}
            <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
            previousBtnStyle={styles.botonAnterior} 
            nextBtnStyle={styles.botonSiguiente}>
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
            {/* )} */}
            {/* Progreos 3 */}
            <ProgressStep previousBtnText="Anterior" finishBtnText="Siguiente" 
            onSubmit={() => navigation.navigate('TabNav', { screen: 'Home1' })}
            previousBtnStyle={styles.botonAnterior} 
            nextBtnStyle={styles.botonSiguiente}>
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