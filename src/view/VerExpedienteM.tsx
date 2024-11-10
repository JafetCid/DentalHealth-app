import React from 'react';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Header from './components/Header';
import { Image } from 'react-native';
import styles from '../../assets/styles/StepperVerE';
import { View, Text, ScrollView} from 'react-native';
import { CardPerfilP } from './components/CardPerfilP';

export const VerExpedienteM = ({ navigation }) => {
    
    const buttonTextStyle = {
    
        activeStepIconBorderColor: '#308CFF',
        completedProgressBarColor: '#308CFF',
        completedStepIconColor: '#308CFF',
        anteriorBtnStyle: '',
    };
    const datos = ['Gastritis', 'Colitis', 'Gastroenteritis'];
    const datosD = ['Tuberculosis', 'Neumonia', 'Asma', 'Bronquitis', 'farinoamigdalitis'];
    const datosF = ['Dolor', 'Espasmo Muscular', 'Crepitación', 'Luxación'];

    return (
    <ScrollView>
        <Header title={''} showLogo={false} onPress={() => navigation.goBack()} point={''}/>
        <View style={styles.contLT}>
            <Image source={require('../../assets/images/Genshi.jpeg')} style={styles.icon}/>
            <View style={styles.contName}>
                <Text style={styles.name}>Noelia de los Angeles</Text>
            </View>
        </View>
        <View style={styles.contNameExp}>
            <Text style={styles.nameExp}>Expediente N° 02</Text>
            <Text style={styles.fechaExp}>02/05/2024</Text>
        </View>
        <View style={styles.cont}>
            <ProgressSteps {...buttonTextStyle}>
                {/* Progreso 1 */}
                <ProgressStep nextBtnText="Siguiente">
                    <View style={styles.contCardPerfilP}>
                        <CardPerfilP navigation={navigation} showHeader={false}/>
                    </View>
                </ProgressStep>
                {/* Progreso 2 */}
                <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
                previousBtnStyle={styles.botonAnterior}>
                    <View style={styles.stepContent}>
                        <View style={styles.context}>
                            <Text style={styles.text}>Historia médica</Text>
                        </View>
                        <View style={styles.contenS}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.labelInfo}>
                                    Peso: <Text>53 Kg</Text>
                                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.labelInfo}>
                                    Talla: <Text>53 cm</Text>
                                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.labelInfo}>
                                    T.A: <Text>53 Kg</Text>
                                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.labelInfo}>
                                    F.C: <Text>53 cm</Text>
                                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.labelInfo}>
                                    F.R: <Text>53 Kg</Text>
                                </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.labelInfo}>
                                    T: <Text>53 cm</Text>
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.labelVerE}>¿Motivo de la consulta?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Qué medida de higiene oral acostumbra?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Cómo se encuentra usted de salud?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Padecimiento actual?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Esta bajo tratamiento médico?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Está tomando un tipo de medicamento o droga?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Es Ud. alérgico o intolerante a los medicamentos,
                            alimentos u otras sustancias?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Ha sido hospitalizado quirúrgicamente?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                    </View>
                </ProgressStep>
                {/* Progreso 3*/}
                <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
                previousBtnStyle={styles.botonAnterior}>
                    <View style={styles.stepContent}>
                        <View style={styles.context}>
                            <Text style={styles.text}>Aparato Cardiovascular</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Presión arterial?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Fiebre reumática?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Hemorragias?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Anemia?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Infartos?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Otros?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                    </View>
                </ProgressStep>
                {/* Progreso 4*/}
                <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
                previousBtnStyle={styles.botonAnterior}>
                    <View style={styles.stepContent}>
                        <View style={styles.context}>
                            <Text style={styles.text}>Enfermedades de transmisión sexual</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Herpes?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Tuberculosis?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿VIH?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Otros?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                    </View>
                </ProgressStep>
                {/* Progreso 5 */}
                <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
                previousBtnStyle={styles.botonAnterior}>
                    <View style={styles.stepContent}>
                        <View style={styles.context}>
                            <Text style={styles.text}>Antecedentes patologicos</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Alteración del aparato digestivo?</Text>
                        <View style={styles.list}>
                            {datos.map((item, index) => (
                                <View
                                key={index} 
                                style={styles.contPoints}>
                                    <Text style={styles.punto}>•</Text>
                                    <Text style={styles.item}>{item}</Text>
                                </View>
                            ))}
                        </View>
                        <Text style={styles.labelVerE}>¿Dificultades respiratorias?  </Text>
                        <View style={styles.list}>
                            {datosD.map((item, index) => (
                                <View
                                key={index} 
                                style={styles.contPoints}>
                                    <Text style={styles.punto}>•</Text>
                                    <Text style={styles.item}>{item}</Text>
                                </View>
                            ))}
                        </View>
                        <Text style={styles.labelVerE}>¿Cardiopatías?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Diabetes?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Hepatitis?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Padecimientos actuales?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Embarazos y abortos?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Alteraciones Neuropsicológicas?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.labelVerE}>¿Convulsiones?</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                    </View>
                </ProgressStep>
                {/* Progreos 6 */}
                <ProgressStep previousBtnText="Anterior" finishBtnText="Guardar" 
                onSubmit={() => navigation.navigate('TabNavigator', { screen: 'Home' })}
                previousBtnStyle={styles.botonAnterior}>
                    <View style={styles.stepContent}>
                        <View style={styles.context}>
                            <Text style={styles.text}>Exploración de la cavidad oral</Text>
                        </View>
                        <Text style={styles.label}>Tejidos Blandos</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.label}>Tejidos Óseos</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <Text style={styles.label}>Articulación Temporomandibular</Text>
                        <View style={styles.cardInf}>
                            <Text style={styles.cardText}>respuesta largaaaaaaaaaa...</Text>
                        </View>
                        <View style={styles.list}>
                            {datosF.map((item, index) => (
                                <View
                                key={index} 
                                style={styles.contPoints}>
                                    <Text style={styles.punto}>•</Text>
                                    <Text style={styles.item}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
    </ScrollView> 
  )
}

