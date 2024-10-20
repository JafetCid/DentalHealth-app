import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Header from '../components/Header';
import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import styles from '../../../assets/styles/Stepper';
import { View, Text, TextInput, ScrollView} from 'react-native';
import { Checkbox } from 'react-native-paper';

const { width } = Dimensions.get('window');


export default function FormCrearE({ navigation }) {

  const buttonTextStyle = {
    
    activeStepIconBorderColor: '#308CFF',
    completedProgressBarColor: '#308CFF',
    completedStepIconColor: '#308CFF',
    
  };
  
  const [isSelected, setSelected] = useState({
    colitis: false,
    gastritis: false,
    gastroenteritis: false,
    // Checkbox2
    asma: false,
    bronquitis: false,
    neumonia: false,
    tuberculosis: false,
    farinoamigdalitis: false,
    // Checkbox3
    dolor: false,
    luxacion: false,
    anquilosis: false,
    crepitacion: false,
    subluxacion: false,
    espasmo: false,
  });

  const handleCheckboxChange = (condition) => {
    setSelected((prevState) => ({
      ...prevState,
      [condition]: !prevState[condition],
    }));
  };

  return (
    <ScrollView>
      <Header title={'Crear expediente'} showLogo={false} onPress={() => navigation.goBack()}/>
      <View style={styles.cont}>
        <ProgressSteps {...buttonTextStyle}>
          {/* Progreso 1 */}
          <ProgressStep nextBtnText="Siguiente">
            <View style={styles.context}>
              <Text style={styles.text}>Historia médica</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.contenS}>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>Peso</Text>
                  <TextInput
                    style={styles.inputI}
                    inputMode='text'
                    // value={step1Data.name}
                    // onChangeText={text => setStep1Data({ ...step1Data, name: text })}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>Talla</Text>
                  <TextInput
                    style={styles.inputI}
                    inputMode='text'
                    // value={step1Data.address}
                    // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>T.A</Text>
                  <TextInput
                    style={styles.inputI}
                    inputMode='text'
                    // value={step1Data.address}
                    // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>F.C</Text>
                  <TextInput
                    style={styles.inputI}
                    inputMode='text'
                    // value={step1Data.address}
                    // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>F.R</Text>
                  <TextInput
                    style={styles.inputI}
                    inputMode='text'
                    // value={step1Data.address}
                    // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>T</Text>
                  <TextInput
                    style={styles.inputI}
                    inputMode='text'
                    // value={step1Data.address}
                    // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                  />
                </View>
              </View>
              <Text style={styles.label}>¿Motivo de la consulta?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step1Data.address}
                // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
              />
              <Text style={styles.label}>¿Qué medida de higiene oral acostumbra?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step1Data.address}
                // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
              />
              <Text style={styles.label}>¿Cómo se encuentra usted de salud?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step1Data.address}
                // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
              />
              <Text style={styles.label}>¿Padecimiento actual?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step1Data.address}
                // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
              />
              <Text style={styles.label}>¿Esta bajo tratamiento médico?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step1Data.address}
                // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
              />
              <Text style={styles.label}>¿Padecimiento actual?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step1Data.address}
                // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
              />
              <Text style={styles.label}>¿Está tomando un tipo de medicamento o droga?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step1Data.address}
                // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
              />
              <Text style={styles.label}>
                ¿Es Ud. alérgico o intolerante a los medicamentos, 
                alimentos u otras sustancias?
              </Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step1Data.address}
                // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
              />
              <Text style={styles.label}>¿Ha sido hospitalizado quirúrgicamente?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
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
                <Text style={styles.text}>Aparato Cardiovascular</Text>
              </View>
              <Text style={styles.label}>¿Presion arterial?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.email}
                // onChangeText={text => setStep2Data({ ...step2Data, email: text })}
              />
              <Text style={styles.label}>¿Fiebre reumática?</Text>
              <TextInput
                style={styles.input}
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿Hemorragias?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿Anemia?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿Infartos?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿Otros?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
            </View>
          </ProgressStep>
          {/* Progreso 3*/}
          <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
            // previousBtnStyle={styles.button} nextBtnStyle={styles.button}
          >
            <View style={styles.stepContent}>
              <View style={styles.context}>
                <Text style={styles.text}>Enfermedades de transmisión sexual</Text>
              </View>
              <Text style={styles.label}>¿Herpes?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.email}
                // onChangeText={text => setStep2Data({ ...step2Data, email: text })}
              />
              <Text style={styles.label}>¿Tuberculosis?</Text>
              <TextInput
                style={styles.input}
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿VIH?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿Otros?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
            </View>
          </ProgressStep>
          {/* Progreso 4*/}
          <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
            // previousBtnStyle={styles.button} nextBtnStyle={styles.button}
          >
            <View style={styles.stepContent}>
              <View style={styles.context}>
                <Text style={styles.text}>Antecedentes patólogicos</Text>
              </View>

              {/* CheckBox */}
              <Text style={styles.label}>¿Alteración del aparato digestivo?</Text>
              <View style={styles.contCBT}>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Colitis</Text>
                  <Checkbox
                    status={isSelected.colitis ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('colitis')}
                    color='#308CFF'
                  />
                </View>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Gastritis</Text>
                  <Checkbox
                    status={isSelected.gastritis ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('gastritis')}
                    color='#308CFF'
                  />
                </View>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Gastroenteritis</Text>
                  <Checkbox
                    status={isSelected.gastroenteritis ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('gastroenteritis')}
                    color='#308CFF'
                  />
                </View>
              </View>

              {/* CheckBox2 */}
              <Text style={styles.label}>¿Dificultades respiratorias?</Text>
              <View style={styles.contCBT}>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Asma</Text>
                  <Checkbox
                    status={isSelected.asma ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('asma')}
                    color='#308CFF'
                  />
                </View>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Bronquitis</Text>
                  <Checkbox
                    status={isSelected.bronquitis ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('bronquitis')}
                    color='#308CFF'
                  />
                </View>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Neumonia</Text>
                  <Checkbox
                    status={isSelected.neumonia ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('neumonia')}
                    color='#308CFF'
                  />
                </View>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Tuberculosis</Text>
                  <Checkbox
                    status={isSelected.tuberculosis ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('tuberculosis')}
                    color='#308CFF'
                  />
                </View>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Farinoamigdalitis</Text>
                  <Checkbox
                    status={isSelected.farinoamigdalitis ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('farinoamigdalitis')}
                    color='#308CFF'
                  />
                </View>
              </View>
              <Text style={styles.label}>¿Cardiopatías?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿Diabetes?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿Hepatitis?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿Padecimientos actuales?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿Embarazos y abortos?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿Alteraciones Neuropsicológicas?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>¿Convulsiones?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              
            </View>
          </ProgressStep>
          {/* Progreos 5 */}
          <ProgressStep previousBtnText="Anterior" finishBtnText="Guardar" 
            onSubmit={() => navigation.navigate('TabNavigator', { screen: 'Home' })}
            // previousBtnStyle={styles.button} finishBtnStyle={styles.button}
          >
            <View style={styles.stepContent}>
              <View style={styles.context}>
                <Text style={styles.text}>Exploración de la cavidad oral</Text>
              </View>
              <Text style={styles.label}>Tejidos Blandos</Text>
              <TextInput
                style={styles.input}
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>Tejidos Óseos</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />
              <Text style={styles.label}>Articulación Temporomandibular</Text>
              <TextInput
                style={styles.input}
                // value={step2Data.username}
                // onChangeText={text => setStep2Data({ ...step2Data, username: text })}
              />

              {/* CheckBox3 */}
              <View style={styles.contCBT}>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Dolor</Text>
                  <Checkbox
                    status={isSelected.dolor ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('dolor')}
                    color='#308CFF'
                  />
                </View>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Luxación</Text>
                  <Checkbox
                    status={isSelected.luxacion ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('luxacion')}
                    color='#308CFF'
                  />
                </View>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Anquilosis</Text>
                  <Checkbox
                    status={isSelected.anquilosis ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('anquilosis')}
                    color='#308CFF'
                  />
                </View>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Crepitación</Text>
                  <Checkbox
                    status={isSelected.crepitacion ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('crepitacion')}
                    color='#308CFF'
                  />
                </View>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Subluxación</Text>
                  <Checkbox
                    status={isSelected.subluxacion ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('subluxacion')}
                    color='#308CFF'
                  />
                </View>
                <View style={styles.contCheckBox}>
                  <Text style={styles.label}>Espasmo muscular</Text>
                  <Checkbox
                    status={isSelected.espasmo ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange('espasmo')}
                    color='#308CFF'
                  />
                </View>
              </View>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </ScrollView> 
  )
}

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
    // marginBottom: 15,
  },
  iconContainer: {
    top: 15,
    right: 15,
  },
});