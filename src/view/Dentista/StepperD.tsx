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
import { validarPaso1, validarPaso2, validarPaso3 } from '../../utils/Validation';
import * as FileSystem from 'expo-file-system';

const StepperD = () => {
  
  const navigation = useNavigation();
  const [stepData, setStepData] = useState({ 
    nombre: '', 
    apellidos: '', 
    genero: null, 
    dateOfBirth: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenciatura: '',
    cedulaProfesional: '',
    especialidad: '', 
    cedulaEspecialidad: '',
    nombreConsultorio: '',
    direccion: '', 
    archivoAutorizacion: null,
    profilePicture: null,
    clinicLogo: null
  });


  const [errores, setErrores] = useState({
    nombre: '', 
    apellidos: '', 
    genero: '', 
    dateOfBirth: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenciatura: '',
    cedulaProfesional: '',
    especialidad: '', 
    cedulaEspecialidad: '',
    nombreConsultorio: '',
    direccion: '', 
    archivoAutorizacion: '',
    profilePicture: '',
    clinicLogo: ''
  });

  const handleInputChange = (e, value) => {

    if (e === 'nombre') {
      value = value.replace(/\d/g, '');
      if (value.length > 20) {
        setErrores(prevErrores => ({
          ...prevErrores,
          nombre: 'El nombre no puede tener más de 20 caracteres.',
        }));
        return; // No actualiza el estado si excede el límite de caracteres
      }
    }
    
    if (e === 'apellidos') {
      value = value.replace(/\d/g, '');
      if (value.length > 20) {
        setErrores(prevErrores => ({
          ...prevErrores,
          apellidos: 'Los apellidos no puede tener más de 20 caracteres.',
        }));
        return; // No actualiza el estado si excede el límite de caracteres
      }
    }

    // Limitar el campo de teléfono a 10 dígitos
    if (e === 'telefono') {
      value = value.replace(/\D/g, ''); // Eliminar cualquier carácter que no sea un dígito
      if (value.length > 10) {
          value = value.slice(0, 10); // Limitar a 10 dígitos
      }
    }

    const nuevoStepData = { ...stepData, [e]: value };
    setStepData(nuevoStepData);

    const erroresValidacion = validarPaso1(
      nuevoStepData.nombre,
      nuevoStepData.apellidos,
      nuevoStepData.genero,
      nuevoStepData.dateOfBirth,
      nuevoStepData.telefono,
      nuevoStepData.email,
      nuevoStepData.password,
      nuevoStepData.confirmPassword,
    );
  
    const todosCamposLlenos = nuevoStepData.nombre && nuevoStepData.apellidos && 
      nuevoStepData.genero  && nuevoStepData.dateOfBirth && nuevoStepData.telefono &&
      nuevoStepData.email && nuevoStepData.password && nuevoStepData.confirmPassword

    if (todosCamposLlenos) {
      setErrores(erroresValidacion);
    } else {
      setErrores(prevErrores => ({
        ...prevErrores,
        [e]: erroresValidacion[e] || '',
      }));
    }
  };

  const handleInputChange2 = (e, value) => {
    // Prevenir números en los campos nombre, apellidos y ocupación
    if (e === 'licenciatura') {
      value = value.replace(/\d/g, '');
      if (value.length > 30) {
        setErrores(prevErrores => ({
          ...prevErrores,
          licenciatura: 'La licenciatura no puede tener más de 30 caracteres.',
        }));
        return; // No actualiza el estado si excede el límite de caracteres
      }
    }

    if (e === 'especialidad') {
      value = value.replace(/\d/g, '');
      if (value.length > 30) {
        setErrores(prevErrores => ({
          ...prevErrores,
          especialidad: 'La especialida no puede tener más de 30 caracteres.',
        }));
        return; // No actualiza el estado si excede el límite de caracteres
      }
    }

    if (e === 'cedulaProfesional' || e === 'cedulaEspecialidad') {
      value = value.replace(/\D/g, ''); // Eliminar cualquier carácter que no sea un dígito
      if (value.length > 8) {
        value = value.slice(0, 8); // Limitar a 10 dígitos
      }
    }

    const nuevoStepData = { ...stepData, [e]: value };
    setStepData(nuevoStepData);

    const erroresValidacion = validarPaso2(
      nuevoStepData.licenciatura,
      nuevoStepData.cedulaProfesional,
      nuevoStepData.especialidad,
      nuevoStepData.cedulaEspecialidad,
    );
  
    const todosCamposLlenos = nuevoStepData.licenciatura && nuevoStepData.cedulaProfesional && 
      nuevoStepData.especialidad  && nuevoStepData.cedulaEspecialidad

    if (todosCamposLlenos) {
      setErrores(erroresValidacion);
    } else {
      setErrores(prevErrores => ({
        ...prevErrores,
        [e]: erroresValidacion[e] || '',
      }));
    }
  };
  
  const handleInputChange3 = (e, value) => {
    
    if (e === 'nombreConsultorio') {
      value = value.replace(/\d/g, '');
      if (value.length > 30) {
        setErrores(prevErrores => ({
          ...prevErrores,
          nombreConsultorio: 'La dirección no puede tener más de 30 caracteres.',
        }));
        return; // No actualiza el estado si excede el límite de caracteres
      }
    }

    if (e === 'direccion') { 
      if (value.length > 40) {
        setErrores(prevErrores => ({
          ...prevErrores,
          direccion: 'La dirección no puede tener más de 40 caracteres.',
        }));
        return; // No actualiza el estado si excede el límite de caracteres
      }
    }

    const nuevoStepData = { ...stepData, [e]: value };
    setStepData(nuevoStepData);

    const erroresValidacion = validarPaso3(
      nuevoStepData.nombreConsultorio,
      nuevoStepData.direccion,
      // nuevoStepData.archivoAutorizacion
    );
  
    const todosCamposLlenos = nuevoStepData.nombreConsultorio && nuevoStepData.direccion
      // nuevoStepData.archivoAutorizacion

    if (todosCamposLlenos) {
      setErrores(erroresValidacion);
    } else {
      setErrores(prevErrores => ({
        ...prevErrores,
        [e]: erroresValidacion[e] || '',
      }));
    }
  };

  const handleNextStep1 = () => {
    const erroresPaso1 = validarPaso1(
      stepData.nombre, 
      stepData.apellidos, 
      stepData.genero, 
      stepData.dateOfBirth, 
      stepData.telefono,
      stepData.email,
      stepData.password,
      stepData.confirmPassword,
    );

    if (Object.keys(erroresPaso1).length > 0) {
      setErrores(erroresPaso1);
      Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
      return false;
    }
    return true; // Permite avanzar al paso 2
  };

  const handleNextStep2 = () => {
    const erroresPaso2 = validarPaso2(
      stepData.licenciatura,
      stepData.cedulaProfesional,
      stepData.especialidad,
      stepData.cedulaEspecialidad,
    );

    if (Object.keys(erroresPaso2).length > 0) {
      setErrores(erroresPaso2);
      Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
      return false;
    } 
    return true;
  };

  const handleFinalSubmit = async () => {
    console.log('Datos enviados:', stepData);
    const erroresPaso3 = validarPaso3(
      stepData.nombreConsultorio,
      stepData.direccion,
      // stepData.archivoAutorizacion
    );
    
    if (Object.keys(erroresPaso3).length > 0) {
      console.log('errores',erroresPaso3);
      setErrores(erroresPaso3);
      Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
      return false;
    } else {
      // navigation.navigate('TabNav', { screen: 'Home1' });
      // Crear una instancia de FormData
      const formDataToSend = new FormData();

      // Agregar los campos de texto
      formDataToSend.append('name', stepData.nombre);
      formDataToSend.append('lastName', stepData.apellidos);
      formDataToSend.append('gender', stepData.genero);
      formDataToSend.append('birthDate', stepData.dateOfBirth);
      formDataToSend.append('phoneNumber', stepData.telefono);
      formDataToSend.append('email', stepData.email);
      formDataToSend.append('password', stepData.password);
      // formDataToSend.append('confirmPassword', stepData.confirmPassword);
      formDataToSend.append('degree', stepData.licenciatura);
      formDataToSend.append('professionalLicense', stepData.cedulaProfesional);
      formDataToSend.append('specialty', stepData.especialidad);
      formDataToSend.append('specialtyLicense', stepData.cedulaEspecialidad);
      formDataToSend.append('clinicName', stepData.nombreConsultorio);
      formDataToSend.append('clinicAddress', stepData.direccion);
      // formDataToSend.append('authorizationFile', stepData.archivoAutorizacion);

      // Agregar los archivos opcionales
      // Subir la imagen de perfil
      if (stepData.profilePicture) {
        const imageName = stepData.profilePicture.split('/').pop();
        const imageType = stepData.profilePicture.endsWith('.png') ? 'image/png' : 'image/jpeg';
        formDataToSend.append('profilePicture', {
          uri: stepData.profilePicture,
          name: imageName,
          type: imageType,
        }as unknown as Blob);
      }

      // Subir el logo de la clínica si está presente
      if (stepData.clinicLogo) {
        const logoName = stepData.clinicLogo.split('/').pop();
        const logoType = stepData.clinicLogo.endsWith('.png') ? 'image/png' : 'image/jpeg';
        formDataToSend.append('clinicLogo', {
          uri: stepData.clinicLogo,
          name: logoName,
          type: logoType,
        }as unknown as Blob);
      }
      
      if (stepData.archivoAutorizacion) {
        formDataToSend.append('archivoAutorizacion', stepData.archivoAutorizacion);
      }
      
      try {
        // Enviar el formulario al servidor
        const response = await fetch('http://192.168.0.113:5000/api/auth/registerDoctor', {
          method: 'POST',
          body: formDataToSend,  // Enviar el objeto FormData
        });

        if (response.ok) {
          console.log('Formulario enviado con éxito');
          console.log(formDataToSend);

          navigation.navigate('TabNav', { screen: 'Home1' });

        } else {
          console.error('Error al enviar el formulario');
          console.log(formDataToSend);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
  };

  const buttonTextStyle = {
    activeStepIconBorderColor: '#308CFF',
    completedProgressBarColor: '#308CFF',
    completedStepIconColor: '#308CFF', 
  };

  // manejo del nombre del archivo
  // const pickDocument = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: 'application/pdf', // Permite seleccionar solo PDF
  //     });
      
  //     if (result.canceled) {
  //       // Si el usuario cancela, limpia el campo de archivo
  //       handleInputChange3('archivoAutorizacion', ''); // Llamamos a handleInputChange3
  //     } else if (result.assets && result.assets.length > 0) {
  //       const { name } = result.assets[0];
  //       // Si el usuario selecciona un archivo, actualizamos el estado
  //       handleInputChange3('archivoAutorizacion', name); // Llamamos a handleInputChange3
  //     }
  //   } catch (err) {
  //     console.error('Error al seleccionar el archivo:', err);
  //     // Si hay un error al seleccionar el archivo, lo mostramos
  //     handleInputChange3('archivoAutorizacion', ''); // Llamamos a handleInputChange3 para limpiar
  //     setErrores(prevState => ({ ...prevState, archivoAutorizacion: 'Ocurrió un error al seleccionar el archivo.' }));
  //   }
  // };
  
  return (
    
    <ScrollView>
      <View style={styles.container}>
        <Header title={'Crear Cuenta'} showLogo={false} onPress={() => navigation.goBack()} point={''}/>
        <View style={styles.cont}>
          <ProgressSteps style={styles.stepContent} {...buttonTextStyle}>
            {/* Progreso 1 */}
            <ProgressStep 
              nextBtnText="Siguiente"
              nextBtnStyle={styles.botonSiguiente}
              onNext={handleNextStep1}
              nextBtnDisabled={Object.keys(errores).length > 0 || !stepData.nombre || 
                !stepData.apellidos || !stepData.genero || !stepData.dateOfBirth || !stepData.telefono || 
                !stepData.email || !stepData.password || !stepData.confirmPassword}
            >
              <View style={styles.context}>
                <Text style={styles.text}>Datos personales</Text>
              </View>
              <View>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  value={stepData.nombre}
                  onChangeText={(value) => handleInputChange('nombre', value)}
                />
                {errores.nombre && <Text style={{ color: 'red' }}>{errores.nombre}</Text>}

                <Text style={styles.label}>Apellidos</Text>
                <TextInput
                  style={styles.input}
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
                
                <Text style={styles.label}>Telefono</Text>
                <TextInput
                  style={styles.input}
                  inputMode='tel'
                  value={stepData.telefono}
                  onChangeText={(value) => handleInputChange('telefono', value)}
                />
                {errores.telefono && <Text style={{ color: 'red' }}>{errores.telefono}</Text>}
                
                {/* Input de fotografia */}
                <InputImage onImageSelect={(image) => setStepData((prevData) => ({
                    ...prevData,
                    profilePicture: image.uri, // O puedes almacenar más información si es necesario
                }))}/>

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
                  value={stepData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                />
                {errores.password && <Text style={{ color: 'red' }}>{errores.password}</Text>}

                <Text style={styles.label}>Confirmar contraseña</Text>
                    <TextInput
                    style={styles.input}
                    value={stepData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                />
                {errores.confirmPassword && <Text style={{ color: 'red' }}>{errores.confirmPassword}</Text>}

              </View>
            </ProgressStep>

            {/* Progreso 2 */}
            <ProgressStep 
              previousBtnText="Anterior" nextBtnText="Siguiente"
              previousBtnStyle={styles.botonAnterior} 
              nextBtnStyle={styles.botonSiguiente}
              onNext={handleNextStep2} // Valida antes de avanzar al siguiente paso
              nextBtnDisabled={Object.keys(errores).length > 0 || !stepData.licenciatura || 
                !stepData.cedulaProfesional || !stepData.especialidad || !stepData.cedulaEspecialidad || 
                !stepData.telefono 
              }
            >
              <View style={styles.stepContent}>
                <View style={styles.context}>
                  <Text style={styles.text}>Formación academica</Text>
                </View>
                <Text style={styles.label}>Licenciatura</Text>
                <TextInput
                  style={styles.input}
                  value={stepData.licenciatura}
                  onChangeText={(value) => handleInputChange2( 'licenciatura', value )}
                />
                {errores.licenciatura && <Text style={{ color: 'red' }}>{errores.licenciatura}</Text>}

                <Text style={styles.label}>Cedula profesional</Text>
                <TextInput
                  style={styles.input}
                  value={stepData.cedulaProfesional}
                  onChangeText={(value) => handleInputChange2( 'cedulaProfesional', value )}
                />
                {errores.cedulaProfesional && <Text style={{ color: 'red' }}>{errores.cedulaProfesional}</Text>}

                <Text style={styles.label}>Especialidad</Text>
                <TextInput
                  style={styles.input}
                  value={stepData.especialidad}
                  onChangeText={(value) => handleInputChange2( 'especialidad', value )}
                />
                {errores.especialidad && <Text style={{ color: 'red' }}>{errores.especialidad}</Text>}

                <Text style={styles.label}>Cedula de especialidad</Text>
                <TextInput
                  style={styles.input}
                  value={stepData.cedulaEspecialidad}
                  onChangeText={(value) => handleInputChange2( 'cedulaEspecialidad', value )}
                />
                {errores.cedulaEspecialidad && <Text style={{ color: 'red' }}>{errores.cedulaEspecialidad}</Text>}
              </View>
            </ProgressStep>
            
            {/* Progreos 3 */}
            <ProgressStep previousBtnText="Anterior" finishBtnText="Siguiente" 
              onSubmit={handleFinalSubmit}
              previousBtnStyle={styles.botonAnterior}
              nextBtnStyle={styles.botonSiguiente}
              nextBtnDisabled={Object.keys(errores).length > 0}
            >
              <View style={styles.stepContent}>
                <View style={styles.context}>
                  <Text style={styles.text}>Información del consultorio</Text>
                </View>
                <Text style={styles.label}>Nombre del consultorio</Text>
                <TextInput
                  style={styles.input}
                  value={stepData.nombreConsultorio}
                  onChangeText={(value) => handleInputChange3( 'nombreConsultorio', value )}
                />
                {errores.nombreConsultorio && <Text style={{ color: 'red' }}>{errores.nombreConsultorio}</Text>}

                {/* Input de fotografia */}
                <InputImage onImageSelect={(image) => setStepData((prevData) => ({
                    ...prevData,
                    clinicLogo: image.uri, // O puedes almacenar más información si es necesario
                }))}/>
                
                <Text style={styles.label}>Dirección del consultorio</Text>
                <TextInput
                  style={styles.input}
                  value={stepData.direccion}
                  onChangeText={(value) => handleInputChange3( 'direccion', value )}
                />
                {errores.direccion && <Text style={{ color: 'red' }}>{errores.direccion}</Text>}

                {/* <Text style={styles.label}>Archivo de autorización</Text>
                <View style= {styles.contIA}>
                  <ButtonIn 
                    buttonStyle={{backgroundColor: '#F7F7F7', width:'100%'}}
                    Title={'Seleccione un archivo'} 
                    textStyle={{color: 'black', fontSize: 16}}
                    onPress={pickDocument}/>
                  <MaterialCommunityIcons name="paperclip" size={24} color="black" style={styles.iconClip} />
                </View>
                <Text style={styles.nameFile}>{stepData.archivoAutorizacion}</Text>
                {errores.archivoAutorizacion && <Text style={{ color: 'red', marginTop: -20 }}>{errores.archivoAutorizacion}</Text>} */}
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