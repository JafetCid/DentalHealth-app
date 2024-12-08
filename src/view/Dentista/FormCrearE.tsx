import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Header from '../components/Header';
import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import styles from '../../../assets/styles/StepperFormCE';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { validarFormCE } from '../../utils/Validation';
import { API_URL } from '@env';

const { width } = Dimensions.get('window');


export default function FormCrearE({ navigation }) {

  const [stepData, setStepData] = useState({
    peso: '',
    talla: '',
    ta: '',
    fc: '',
    fr: '',
    t: '',
    motivoC: '',
    medidaH: '',
    salud: '',
    padecimientoA: '',
    tratamientoM: '',
    medicamentoDroga: '',
    alergico: '',
    hospitalizado: '',

    cardiovascular1: '',
    cardiovascular2: '',
    cardiovascular3: '',
    cardiovascular4: '',
    cardiovascular5: '',
    cardiovascular6: '',

    disease1: '',
    disease2: '',
    disease3: '',
    disease4: '',

    pathological1: '',
    pathological2: '',
    pathological3: '',
    pathological4: '',
    pathological5: '',
    pathological6: '',
    pathological7: '',

    cavity1: '',
    cavity2: '',
    cavity3: '',

    dolor: '',
    luxacion: '',
    anquilosis: '',
    crepitacion: '',
    subluxacion: '',
    espasmoMuscular: '',


  });

  const [errores, setErrores] = useState({
    peso: '',
    talla: '',
    ta: '',
    fc: '',
    fr: '',
    t: '',
    motivoC: '',
    medidaH: '',
    salud: '',
    padecimientoA: '',
    tratamientoM: '',
    medicamentoDroga: '',
    alergico: '',
    hospitalizado: '',

    cardiovascular1: '',
    cardiovascular2: '',
    cardiovascular3: '',
    cardiovascular4: '',
    cardiovascular5: '',
    cardiovascular6: '',

    disease1: '',
    disease2: '',
    disease3: '',
    disease4: '',

    pathological1: '',
    pathological2: '',
    pathological3: '',
    pathological4: '',
    pathological5: '',
    pathological6: '',
    pathological7: '',

    cavity1: '',
    cavity2: '',
    cavity3: '',
    
    dolor: '',
    luxacion: '',
    anquilosis: '',
    crepitacion: '',
    subluxacion: '',
    espasmoMuscular: '',
  });

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

  const handleInputChange = (e, value) => {

    if (e === 'peso') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) {
        setErrores(prevErrores => ({
          ...prevErrores,
          peso: 'La peso debe estar entre 20 y 120 kg',
        }));
        return;
      }
    }

    if (e === 'talla') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) {
        setErrores(prevErrores => ({
          ...prevErrores,
          talla: 'La talla debe estar entre 50 y 250 cm',
        }));
        return;
      }
    }

    if (e === 'ta') {
      value = value.replace(/[^\d/]/g, '');
      if (value.length > 6) {
        setErrores(prevErrores => ({
          ...prevErrores,
          ta: 'T.A. debe estar en formato 120/80',
        }));
        return;
      }
    }

    if (e === 'fc') {
      value = value.replace(/[^\d/]/g, '');
      if (value.length > 3) {
        setErrores(prevErrores => ({
          ...prevErrores,
          fc: 'F.C. debe estar entre 40 y 200 lpm',
        }));
        return;
      }
    }

    if (e === 'fr') {
      value = value.replace(/[^\d/]/g, '');
      if (value.length > 2) {
        setErrores(prevErrores => ({
          ...prevErrores,
          fr: 'F.R. debe estar entre 8 y 40 respiraciones por minuto',
        }));
        return;
      }
    }

    if (e === 't') {
      value = value.replace(/[^\d/]/g, '');
      if (value.length > 2) {
        setErrores(prevErrores => ({
          ...prevErrores,
          t: 'T debe estar entre 8 y 40 respiraciones por minuto',
        }));
        return;
      }
    }

    if (e === 'motivoC' || e === 'medidaH' || e === 'salud' || e === 'padecimientoA' ||
      e === 'tratamientoM' || e === 'medicamentoDroga' || e === 'alergico' || e === 'hospitalizado') {

      value = value.replace(/\d/g, '');
      if (value.length > 20) {
        setErrores(prevErrores => ({
          ...prevErrores,
          t: 'No puedes ',
        }));
        return;
      }
    }

    const nuevoStepData = { ...stepData, [e]: value };
    setStepData(nuevoStepData);

    const erroresValidacion = validarFormCE(
      nuevoStepData.peso,
      nuevoStepData.talla,
      nuevoStepData.ta,
      nuevoStepData.fc,
      nuevoStepData.fr,
      nuevoStepData.t,
      nuevoStepData.motivoC,
      nuevoStepData.medidaH,
      nuevoStepData.salud,
      nuevoStepData.padecimientoA,
      nuevoStepData.tratamientoM,
      nuevoStepData.medicamentoDroga,
      nuevoStepData.alergico,
      nuevoStepData.hospitalizado,
    );

    const todosCamposLlenos = nuevoStepData.peso && nuevoStepData.talla && nuevoStepData.ta &&
      nuevoStepData.fc && nuevoStepData.fr && nuevoStepData.t && nuevoStepData.motivoC &&
      nuevoStepData.medidaH && nuevoStepData.salud && nuevoStepData.padecimientoA &&
      nuevoStepData.tratamientoM && nuevoStepData.medicamentoDroga && nuevoStepData.alergico &&
      nuevoStepData.hospitalizado

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
    const erroresPaso1 = validarFormCE(
      stepData.peso,
      stepData.talla,
      stepData.ta,
      stepData.fc,
      stepData.fr,
      stepData.t,
      stepData.motivoC,
      stepData.medidaH,
      stepData.salud,
      stepData.padecimientoA,
      stepData.tratamientoM,
      stepData.medicamentoDroga,
      stepData.alergico,
      stepData.hospitalizado
    );

    if (Object.keys(erroresPaso1).length > 0) {
      setErrores(erroresPaso1);
      Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
      return false;
    }
    return true; // Permite avanzar al paso 2
  };

  const handleFinalSubmit = async () => {
    console.log('Datos enviados:', stepData);
    console.log(errores);
    const erroresPaso1 = validarFormCE(
      stepData.peso,
      stepData.talla,
      stepData.ta,
      stepData.fc,
      stepData.fr,
      stepData.t,
      stepData.motivoC,
      stepData.medidaH,
      stepData.salud,
      stepData.padecimientoA,
      stepData.tratamientoM,
      stepData.medicamentoDroga,
      stepData.alergico,
      stepData.hospitalizado,
    );

    if (Object.keys(erroresPaso1).length > 0) {
      setErrores(erroresPaso1);
      Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
      return false;
    } else {
      // navigation.navigate('ExpedienteLista');
      const formDataToSend = new FormData();

      formDataToSend.append('weight', stepData.peso);
      formDataToSend.append('size', stepData.talla);
      formDataToSend.append('tA', stepData.ta);
      formDataToSend.append('fC', stepData.fc);
      formDataToSend.append('fR', stepData.fr);
      formDataToSend.append('t', stepData.t);
      formDataToSend.append('history1', stepData.motivoC);
      formDataToSend.append('history2', stepData.medidaH);
      formDataToSend.append('history3', stepData.salud);
      formDataToSend.append('history4', stepData.padecimientoA);
      formDataToSend.append('history5', stepData.tratamientoM);
      formDataToSend.append('history6', stepData.medicamentoDroga);
      formDataToSend.append('history7', stepData.alergico);
      formDataToSend.append('history8', stepData.hospitalizado);

      formDataToSend.append('cardiovascular1', stepData.cardiovascular1);
      formDataToSend.append('cardiovascular2', stepData.cardiovascular2);
      formDataToSend.append('cardiovascular3', stepData.cardiovascular3);
      formDataToSend.append('cardiovascular4', stepData.cardiovascular4);
      formDataToSend.append('cardiovascular5', stepData.cardiovascular5);
      formDataToSend.append('cardiovascular6', stepData.cardiovascular6);

      formDataToSend.append('disease1', stepData.disease1);
      formDataToSend.append('disease2', stepData.disease2);
      formDataToSend.append('disease3', stepData.disease3);
      formDataToSend.append('disease4', stepData.disease4);

      formDataToSend.append('colitis', String(isSelected.colitis));
      formDataToSend.append('gastritis', String(isSelected.gastritis));
      formDataToSend.append('gastroenteritis', String(isSelected.gastroenteritis));
      formDataToSend.append('asma', String(isSelected.asma));
      formDataToSend.append('bronquitis', String(isSelected.bronquitis));
      formDataToSend.append('neumonia', String(isSelected.neumonia));
      formDataToSend.append('tuberculosis', String(isSelected.tuberculosis));
      formDataToSend.append('farinoamigdalitis', String(isSelected.farinoamigdalitis));

      formDataToSend.append('pathological1', stepData.pathological1);
      formDataToSend.append('pathological2', stepData.pathological2);
      formDataToSend.append('pathological3', stepData.pathological3);
      formDataToSend.append('pathological4', stepData.pathological4);
      formDataToSend.append('pathological5', stepData.pathological5);
      formDataToSend.append('pathological6', stepData.pathological6);
      formDataToSend.append('pathological7', stepData.pathological7);

      formDataToSend.append('cavity1', stepData.cavity1);
      formDataToSend.append('cavity2', stepData.cavity2);
      formDataToSend.append('cavity3', stepData.cavity3);

      formDataToSend.append('dolor', String(isSelected.dolor));
      formDataToSend.append('luxacion', String(isSelected.luxacion));
      formDataToSend.append('anquilosis', String(isSelected.anquilosis));
      formDataToSend.append('crepitacion', String(isSelected.crepitacion));
      formDataToSend.append('subluxacion', String(isSelected.subluxacion));
      formDataToSend.append('espasmoMuscular', String(isSelected.espasmo));

      try {
        // Enviar el formulario al servidor
        const response = await fetch(`${API_URL}/api/medicalForm/register/6`, {
          method: 'POST',
          body: formDataToSend,  // Enviar el objeto FormData
        });
  
        if (response.ok) {
          console.log('Formulario enviado con éxito');
          navigation.navigate('ExpedienteLista');

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

  return (
    <ScrollView>
      <Header title={'Crear expediente'} showLogo={false} onPress={() => navigation.goBack()} point={''} />
      <View style={styles.cont}>
        <ProgressSteps {...buttonTextStyle}>
          {/* Progreso 1 */}
          <ProgressStep nextBtnText="Siguiente"
            onNext={handleNextStep1}
            nextBtnDisabled={Object.keys(errores).length > 0 || !stepData.peso || !stepData.talla ||
              !stepData.ta || !stepData.fc || !stepData.fr || !stepData.t || !stepData.motivoC ||
              !stepData.medidaH || !stepData.salud || !stepData.padecimientoA || !stepData.tratamientoM ||
              !stepData.medicamentoDroga || !stepData.alergico || !stepData.hospitalizado
            }
          >
            <View style={styles.context}>
              <Text style={styles.text}>Historia médica</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.contenS}>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>Peso (Kg)</Text>
                  <TextInput
                    style={styles.inputI}
                    value={stepData.peso}
                    onChangeText={(value) => handleInputChange('peso', value)}
                  />
                  {errores.peso && <Text style={{ color: 'red' }}>{errores.peso}</Text>}

                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>Talla (cm)</Text>
                  <TextInput
                    style={styles.inputI}
                    value={stepData.talla}
                    onChangeText={(value) => handleInputChange('talla', value)}
                  />
                  {errores.talla && <Text style={{ color: 'red' }}>{errores.talla}</Text>}

                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>T.A</Text>
                  <TextInput
                    style={styles.inputI}
                    value={stepData.ta}
                    onChangeText={(value) => handleInputChange('ta', value)}
                  />
                  {errores.ta && <Text style={{ color: 'red' }}>{errores.ta}</Text>}

                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>F.C</Text>
                  <TextInput
                    style={styles.inputI}
                    value={stepData.fc}
                    onChangeText={(value) => handleInputChange('fc', value)}
                  />
                  {errores.fc && <Text style={{ color: 'red' }}>{errores.fc}</Text>}

                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>F.R</Text>
                  <TextInput
                    style={styles.inputI}
                    value={stepData.fr}
                    onChangeText={(value) => handleInputChange('fr', value)}
                  />
                  {errores.fr && <Text style={{ color: 'red' }}>{errores.fr}</Text>}

                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.labelI}>T</Text>
                  <TextInput
                    style={styles.inputI}
                    value={stepData.t}
                    onChangeText={(value) => handleInputChange('t', value)}
                  />
                  {errores.t && <Text style={{ color: 'red' }}>{errores.t}</Text>}

                </View>
              </View>
              <Text style={styles.label}>¿Motivo de la consulta?</Text>
              <TextInput
                style={styles.input}
                value={stepData.motivoC}
                onChangeText={(value) => handleInputChange('motivoC', value)}
              />
              {errores.motivoC && <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>{errores.motivoC}</Text>}

              <Text style={styles.label}>¿Qué medida de higiene oral acostumbra?</Text>
              <TextInput
                style={styles.input}
                value={stepData.medidaH}
                onChangeText={(value) => handleInputChange('medidaH', value)}
              />
              {errores.medidaH && <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>{errores.medidaH}</Text>}

              <Text style={styles.label}>¿Cómo se encuentra usted de salud?</Text>
              <TextInput
                style={styles.input}
                value={stepData.salud}
                onChangeText={(value) => handleInputChange('salud', value)}
              />
              {errores.salud && <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>{errores.salud}</Text>}

              <Text style={styles.label}>¿Padecimiento actual?</Text>
              <TextInput
                style={styles.input}
                value={stepData.padecimientoA}
                onChangeText={(value) => handleInputChange('padecimientoA', value)}
              />
              {errores.padecimientoA && <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>{errores.padecimientoA}</Text>}

              <Text style={styles.label}>¿Esta bajo tratamiento médico?</Text>
              <TextInput
                style={styles.input}
                value={stepData.tratamientoM}
                onChangeText={(value) => handleInputChange('tratamientoM', value)}
              />
              {errores.tratamientoM && <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>{errores.tratamientoM}</Text>}

              <Text style={styles.label}>¿Está tomando un tipo de medicamento o droga?</Text>
              <TextInput
                style={styles.input}
                value={stepData.medicamentoDroga}
                onChangeText={(value) => handleInputChange('medicamentoDroga', value)}
              />
              {errores.medicamentoDroga && <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>{errores.medicamentoDroga}</Text>}

              <Text style={styles.label}>
                ¿Es Ud. alérgico o intolerante a los medicamentos,
                alimentos u otras sustancias?
              </Text>
              <TextInput
                style={styles.input}
                value={stepData.alergico}
                onChangeText={(value) => handleInputChange('alergico', value)}
              />
              {errores.alergico && <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>{errores.alergico}</Text>}

              <Text style={styles.label}>¿Ha sido hospitalizado quirúrgicamente?</Text>
              <TextInput
                style={styles.input}
                value={stepData.hospitalizado}
                onChangeText={(value) => handleInputChange('hospitalizado', value)}
              />
              {errores.hospitalizado && <Text style={{ color: 'red', marginTop: -15, marginBottom: 10 }}>{errores.hospitalizado}</Text>}

            </View>
          </ProgressStep>

          {/* Progreso 2 */}
          <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
            previousBtnStyle={styles.botonAnterior}>
            <View style={styles.stepContent}>
              <View style={styles.context}>
                <Text style={styles.text}>Aparato Cardiovascular</Text>
              </View>
              <Text style={styles.label}>¿Presion arterial?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.cardiovascular1}
                onChangeText={(value) => setStepData({ ...stepData, cardiovascular1: value })}
              />
              <Text style={styles.label}>¿Fiebre reumática?</Text>
              <TextInput
                style={styles.input}
                value={stepData.cardiovascular2}
                onChangeText={(value) => setStepData({ ...stepData, cardiovascular2: value })}
              />
              <Text style={styles.label}>¿Hemorragias?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.cardiovascular3}
                onChangeText={(value) => setStepData({ ...stepData, cardiovascular3: value })}
              />
              <Text style={styles.label}>¿Anemia?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.cardiovascular4}
                onChangeText={(value) => setStepData({ ...stepData, cardiovascular4: value })}
              />
              <Text style={styles.label}>¿Infartos?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.cardiovascular5}
                onChangeText={(value) => setStepData({ ...stepData, cardiovascular5: value })}
              />
              <Text style={styles.label}>¿Otros?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.cardiovascular6}
                onChangeText={(value) => setStepData({ ...stepData, cardiovascular6: value })}
              />
            </View>
          </ProgressStep>

          {/* Progreso 3*/}
          <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
            previousBtnStyle={styles.botonAnterior}>
            <View style={styles.stepContent}>
              <View style={styles.context}>
                <Text style={styles.text}>Enfermedades de transmisión sexual</Text>
              </View>
              <Text style={styles.label}>¿Herpes?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.disease1}
                onChangeText={(value) => setStepData({ ...stepData, disease1: value })}
              />
              <Text style={styles.label}>¿Tuberculosis?</Text>
              <TextInput
                style={styles.input}
                value={stepData.disease2}
                onChangeText={(value) => setStepData({ ...stepData, disease2: value })}
              />
              <Text style={styles.label}>¿VIH?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.disease3}
                onChangeText={(value) => setStepData({ ...stepData, disease3: value })}
              />
              <Text style={styles.label}>¿Otros?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.disease4}
                onChangeText={(value) => setStepData({ ...stepData, disease4: value })}
              />
            </View>
          </ProgressStep>

          {/* Progreso 4*/}
          <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
            previousBtnStyle={styles.botonAnterior}>
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
                value={stepData.pathological1}
                onChangeText={(value) => setStepData({ ...stepData, pathological1: value })}
              />
              <Text style={styles.label}>¿Diabetes?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.pathological2}
                onChangeText={(value) => setStepData({ ...stepData, pathological2: value })}
              />
              <Text style={styles.label}>¿Hepatitis?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.pathological3}
                onChangeText={(value) => setStepData({ ...stepData, pathological3: value })}
              />
              <Text style={styles.label}>¿Padecimientos actuales?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.pathological4}
                onChangeText={(value) => setStepData({ ...stepData, pathological4: value })}
              />
              <Text style={styles.label}>¿Embarazos y abortos?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.pathological5}
                onChangeText={(value) => setStepData({ ...stepData, pathological5: value })}
              />
              <Text style={styles.label}>¿Alteraciones Neuropsicológicas?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.pathological6}
                onChangeText={(value) => setStepData({ ...stepData, pathological6: value })}
              />
              <Text style={styles.label}>¿Convulsiones?</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.pathological7}
                onChangeText={(value) => setStepData({ ...stepData, pathological7: value })}
              />

            </View>
          </ProgressStep>

          {/* Progreos 5 */}
          <ProgressStep previousBtnText="Anterior" finishBtnText="Guardar"
            previousBtnStyle={styles.botonAnterior}
            onSubmit={handleFinalSubmit}
            nextBtnDisabled={Object.keys(errores).length > 0}
          >
            <View style={styles.stepContent}>
              <View style={styles.context}>
                <Text style={styles.text}>Exploración de la cavidad oral</Text>
              </View>
              <Text style={styles.label}>Tejidos Blandos</Text>
              <TextInput
                style={styles.input}
                value={stepData.cavity1}
                onChangeText={(value) => setStepData({ ...stepData, cavity1: value })}
              />
              <Text style={styles.label}>Tejidos Óseos</Text>
              <TextInput
                style={styles.input}
                inputMode='text'
                value={stepData.cavity2}
                onChangeText={(value) => setStepData({ ...stepData, cavity2: value })}
              />
              <Text style={styles.label}>Articulación Temporomandibular</Text>
              <TextInput
                style={styles.input}
                value={stepData.cavity3}
                onChangeText={(value) => setStepData({ ...stepData, cavity3: value })}
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