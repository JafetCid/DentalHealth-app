import React, { useEffect, useState } from 'react';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import Header from './components/Header';
import { Image } from 'react-native';
import styles from '../../assets/styles/StepperVerE';
import { View, Text, ScrollView } from 'react-native';
import { CardPerfilP } from './components/CardPerfilP';
import { API_URL } from '@env';

export const VerExpedienteM = ({ navigation, route }) => {

    const [dataUser, setDataUser] = useState(null);
    const [data, setData] = useState(null);
    
    const API_URL = 'https://dental-health-backend.onrender.com';

    const { id, patientsId } = route.params;
    useEffect(() => {
        if (id || patientsId) {
            console.log('id del expediente:', id);
            console.log('id del paciente:', patientsId);
        }
    }, [id, patientsId]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const responseUser = await fetch(`${API_URL}/api/auth/getPatient/${patientsId}`); // URL de la API
                if (!responseUser.ok) {
                    throw new Error('Error al obtener los datos del Paciente');
                }
                const dataUser = await responseUser.json(); // Convierte la respuesta en un objeto JSON
                setDataUser(dataUser);

                const response = await fetch(`${API_URL}/api/medicalForm/getExam/${id}`); // URL de la API
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                const data = await response.json(); // Convierte la respuesta en un objeto JSON
                const transformedData = {
                    ...data,
                    ...data.CardiovascularSystems[0], // Combina el primer elemento de CardiovascularSystems
                    ...data.EtsDiseases[0],
                    ...data.OralCavities[0],
                    ...data.PathologicalHistories[0]
                };
                // Elimina las propiedades que ya no necesitas
                delete transformedData.CardiovascularSystems;
                delete transformedData.EtsDiseases;
                delete transformedData.OralCavities;
                delete transformedData.PathologicalHistories;

                setData(transformedData);
                console.log('datos:', transformedData);

            } catch (error) {
                console.log('No funciona')
            }
        }

        fetchData();

    }, [id])

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible';

        const fecha = new Date(dateString);

        if (isNaN(fecha.getTime())) return 'Fecha inválida';

        return fecha.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: 'America/Mexico_City',
        });
    };


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
            <Header title={''} showLogo={false} onPress={() => navigation.goBack()} point={''} />
            <View style={styles.contLT}>
                {dataUser && dataUser.profilePictureUrl ? (
                    <Image
                        source={
                            dataUser.profilePictureUrl
                                ? { uri: `${dataUser.profilePictureUrl}` }  // Usar imagen desde la URL proporcionada por la base de datos
                                : require('../../assets/images/Perfil.png')  // Imagen por defecto
                        }
                        style={styles.icon}
                    />
                ) : null}
                <View style={styles.contName}>
                    {dataUser && dataUser.Login && dataUser.Login.name ? (
                        <Text style={styles.name}>{`${dataUser.Login.name} ${dataUser.Login.lastName}`}</Text>
                    ) : (
                        <Text style={styles.name}>Nombre</Text>
                    )}
                </View>
            </View>
            <View style={styles.contNameExp}>
                <Text style={styles.nameExp}>Expediente N° {id}</Text>
                {data && data.createdAt ? (
                    <Text style={styles.fechaExp}>{new Date(data.createdAt).toISOString().split('T')[0]}</Text>
                ) : (
                    <Text style={styles.fechaExp}>02/05/2024</Text>
                )}
            </View>
            <View style={styles.cont}>
                <ProgressSteps {...buttonTextStyle}>
                    {/* Progreso 1 */}
                    <ProgressStep nextBtnText="Siguiente">
                        <View style={styles.contCardPerfilP}>
                            <View style={styles.content}>
                                <View style={styles.card}>
                                    <View style={styles.text}>
                                        <Text style={styles.title}>Información</Text>
                                    </View>
                                    <View style={styles.info}>
                                        <View style={styles.infoContCardCake}>
                                            <View style={styles.iconCard}>
                                                <FontAwesome5 name="birthday-cake" size={24} color="black" />
                                            </View>
                                            <View style={styles.infoContText}>
                                                {dataUser && dataUser.Login && dataUser.Login.birthDate ? (
                                                    <Text style={styles.textInf}>{formatDate(dataUser.Login.birthDate)}</Text>
                                                ) : (
                                                    <Text style={styles.textCard}>35 años, 2 meses, 7 dias</Text>
                                                    // <Text style={styles.textCard}>35 años, 2 meses, 7 dias</Text>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.infoContCard}>
                                        <View style={styles.iconCard}>
                                            {dataUser && dataUser.Login && dataUser.Login.gender === 'masculino' ? (
                                                <FontAwesome5 name="male" size={24} color="black" />  // Ícono para hombres
                                            ) : (
                                                <FontAwesome5 name="female" size={24} color="black" />  // Ícono por defecto para mujeres
                                            )}
                                        </View>
                                        <View style={styles.infoContText}>
                                            {dataUser && dataUser.Login && dataUser.Login.gender ? (
                                                <Text style={styles.textInf}>{dataUser.Login.gender}</Text>
                                            ) : (
                                                <Text style={styles.textEnd}> </Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.infoContCard}>
                                        <View style={styles.iconCard}>
                                            <FontAwesome name="mobile-phone" size={30} color="black" />
                                        </View>
                                        <View style={styles.infoContText}>
                                            {dataUser && dataUser.Login && dataUser.Login.phoneNumber ? (
                                                <Text style={styles.textInf}>{dataUser.Login.phoneNumber}</Text>
                                            ) : (
                                                <Text style={styles.textEnd}>No se encontro el numero de telefono</Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.infoContCard}>
                                        <View style={styles.iconCard}>
                                            <MaterialIcons name="work" size={24} color="black" />
                                        </View>
                                        <View style={styles.infoContText}>
                                            {dataUser && dataUser.Login && dataUser.occupation ? (
                                                <Text style={styles.textInf}>{dataUser.occupation}</Text>
                                            ) : (
                                                <Text style={styles.textEnd}>No se encontro la ocupación</Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.infoContCard}>
                                        <View style={styles.iconCard}>
                                            <Ionicons name="location-sharp" size={24} color="black" />
                                        </View>
                                        <View style={styles.infoContText}>
                                            {dataUser && dataUser.Login && dataUser.address ? (
                                                <Text style={styles.textInf}>{dataUser.address}</Text>
                                            ) : (
                                                <Text style={styles.textEnd}>No se encontro la ocupación</Text>
                                            )}
                                            {dataUser && dataUser.Login && dataUser.origin ? (
                                                <Text style={styles.textEnd}>{dataUser.origin}</Text>
                                            ) : (
                                                <Text style={styles.textEnd}>No se encontro la ocupación</Text>
                                            )}
                                        </View>
                                    </View>
                                    {/* <Text style={styles.textEnd}>Tochtepec, Puebla</Text> */}
                                </View>
                            </View>
                        </View>
                    </ProgressStep>
                    {/* Progreso 2 */}
                    <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
                        previousBtnStyle={styles.botonAnterior}>
                        <View style={styles.stepContent}>
                            <View style={styles.context}>
                                <Text style={styles.text2}>Historia médica</Text>
                            </View>
                            <View style={styles.contenS}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labelInfo}>
                                        Peso:
                                        {data && data.weight ? (
                                            <Text> {data.weight} Kg</Text>
                                        ) : (
                                            <Text>53 Kg</Text>
                                        )}
                                    </Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labelInfo}>
                                        Talla:
                                        {data && data.size ? (
                                            <Text> {data.size} Cm</Text>
                                        ) : (
                                            <Text>53 cm</Text>
                                        )}
                                    </Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labelInfo}>
                                        T.A:
                                        {data && data.tA ? (
                                            <Text> {data.tA}</Text>
                                        ) : (
                                            <Text>53</Text>
                                        )}
                                    </Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labelInfo}>
                                        F.C:
                                        {data && data.fC ? (
                                            <Text> {data.fC}</Text>
                                        ) : (
                                            <Text>53</Text>
                                        )}
                                    </Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labelInfo}>
                                        F.R:
                                        {data && data.fR ? (
                                            <Text> {data.fR}</Text>
                                        ) : (
                                            <Text>53</Text>
                                        )}
                                    </Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labelInfo}>
                                        T:
                                        {data && data.t ? (
                                            <Text> {data.t} C°</Text>
                                        ) : (
                                            <Text>53</Text>
                                        )}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.labelVerE}>¿Motivo de la consulta?</Text>
                            <View style={styles.cardInf}>
                                {data && data.history1 ? (
                                    <Text style={styles.cardText}>{data.history1}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>

                            <Text style={styles.labelVerE}>¿Qué medida de higiene oral acostumbra?</Text>
                            <View style={styles.cardInf}>
                                {data && data.history2 ? (
                                    <Text style={styles.cardText}>{data.history2}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>

                            <Text style={styles.labelVerE}>¿Cómo se encuentra usted de salud?</Text>
                            <View style={styles.cardInf}>
                                {data && data.history3 ? (
                                    <Text style={styles.cardText}>{data.history3}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>

                            <Text style={styles.labelVerE}>¿Padecimiento actual?</Text>
                            <View style={styles.cardInf}>
                                {data && data.history4 ? (
                                    <Text style={styles.cardText}>{data.history4}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>

                            <Text style={styles.labelVerE}>¿Esta bajo tratamiento médico?</Text>
                            <View style={styles.cardInf}>
                                {data && data.history5 ? (
                                    <Text style={styles.cardText}>{data.history5}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>

                            <Text style={styles.labelVerE}>¿Está tomando un tipo de medicamento o droga?</Text>
                            <View style={styles.cardInf}>
                                {data && data.history6 ? (
                                    <Text style={styles.cardText}>{data.history6}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>

                            <Text style={styles.labelVerE}>¿Es Ud. alérgico o intolerante a los medicamentos,
                                alimentos u otras sustancias?</Text>
                            <View style={styles.cardInf}>
                                {data && data.history7 ? (
                                    <Text style={styles.cardText}>{data.history7}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.labelVerE}>¿Ha sido hospitalizado quirúrgicamente?</Text>
                            <View style={styles.cardInf}>
                                {data && data.history8 ? (
                                    <Text style={styles.cardText}>{data.history8}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                        </View>
                    </ProgressStep>
                    {/* Progreso 3*/}
                    <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
                        previousBtnStyle={styles.botonAnterior}>
                        <View style={styles.stepContent}>
                            <View style={styles.context}>
                                <Text style={styles.text2}>Aparato Cardiovascular</Text>
                            </View>
                            <Text style={styles.labelVerE}>¿Presión arterial?</Text>
                            <View style={styles.cardInf}>
                                {data && data.cardiovascular1 ? (
                                    <Text style={styles.cardText}>{data.cardiovascular1}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>

                            <Text style={styles.labelVerE}>¿Fiebre reumática?</Text>
                            <View style={styles.cardInf}>
                                {data && data.cardiovascular2 ? (
                                    <Text style={styles.cardText}>{data.cardiovascular2}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>

                            <Text style={styles.labelVerE}>¿Hemorragias?</Text>
                            <View style={styles.cardInf}>
                                {data && data.cardiovascular3 ? (
                                    <Text style={styles.cardText}>{data.cardiovascular3}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>

                            <Text style={styles.labelVerE}>¿Anemia?</Text>
                            <View style={styles.cardInf}>
                                {data && data.cardiovascular4 ? (
                                    <Text style={styles.cardText}>{data.cardiovascular4}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>

                            <Text style={styles.labelVerE}>¿Infartos?</Text>
                            <View style={styles.cardInf}>
                                {data && data.cardiovascular5 ? (
                                    <Text style={styles.cardText}>{data.cardiovascular5}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.labelVerE}>¿Otros?</Text>
                            <View style={styles.cardInf}>
                                {data && data.cardiovascular6 ? (
                                    <Text style={styles.cardText}>{data.cardiovascular6}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                        </View>
                    </ProgressStep>
                    {/* Progreso 4*/}
                    <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
                        previousBtnStyle={styles.botonAnterior}>
                        <View style={styles.stepContent}>
                            <View style={styles.context}>
                                <Text style={styles.text2}>Enfermedades de transmisión sexual</Text>
                            </View>
                            <Text style={styles.labelVerE}>¿Herpes?</Text>
                            <View style={styles.cardInf}>
                                {data && data.disease1 ? (
                                    <Text style={styles.cardText}>{data.disease1}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.labelVerE}>¿Tuberculosis?</Text>
                            <View style={styles.cardInf}>
                                {data && data.disease2 ? (
                                    <Text style={styles.cardText}>{data.disease2}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.labelVerE}>¿VIH?</Text>
                            <View style={styles.cardInf}>
                                {data && data.disease3 ? (
                                    <Text style={styles.cardText}>{data.disease3}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.labelVerE}>¿Otros?</Text>
                            <View style={styles.cardInf}>
                                {data && data.disease4 ? (
                                    <Text style={styles.cardText}>{data.disease4}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                        </View>
                    </ProgressStep>
                    {/* Progreso 5 */}
                    <ProgressStep previousBtnText="Anterior" nextBtnText="Siguiente"
                        previousBtnStyle={styles.botonAnterior}>
                        <View style={styles.stepContent}>
                            <View style={styles.context}>
                                <Text style={styles.text2}>Antecedentes patologicos</Text>
                            </View>
                            <Text style={styles.labelVerE}>¿Alteración del aparato digestivo?</Text>
                            <View style={styles.list}>
                                <View style={styles.contPoints}>
                                    {data && data.colitis ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Colitis</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>

                                <View style={styles.contPoints}>
                                    {data && data.gastritis ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Gastritis</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>

                                <View style={styles.contPoints}>
                                    {data && data.gastroenteritis ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Gastroenteritis</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                            </View>

                            <Text style={styles.labelVerE}>¿Dificultades respiratorias?  </Text>
                            <View style={styles.list}>
                                <View style={styles.contPoints}>
                                    {data && data.asma ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Asma</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                                <View style={styles.contPoints}>
                                    {data && data.bronquitis ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Bronquitis</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                                <View style={styles.contPoints}>
                                    {data && data.neumonia ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Neumonia</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                                <View style={styles.contPoints}>
                                    {data && data.tuberculosis ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Tuberculosis</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                                <View style={styles.contPoints}>
                                    {data && data.farinoamigdalitis ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Farinoamigdalitis</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                            </View>

                            <Text style={styles.labelVerE}>¿Cardiopatías?</Text>
                            <View style={styles.cardInf}>
                                {data && data.pathological1 ? (
                                    <Text style={styles.cardText}>{data.pathological1}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>

                            <Text style={styles.labelVerE}>¿Diabetes?</Text>
                            <View style={styles.cardInf}>
                                {data && data.pathological2 ? (
                                    <Text style={styles.cardText}>{data.pathological2}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.labelVerE}>¿Hepatitis?</Text>
                            <View style={styles.cardInf}>
                                {data && data.pathological3 ? (
                                    <Text style={styles.cardText}>{data.pathological3}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.labelVerE}>¿Padecimientos actuales?</Text>
                            <View style={styles.cardInf}>
                                {data && data.pathological4 ? (
                                    <Text style={styles.cardText}>{data.pathological4}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.labelVerE}>¿Embarazos y abortos?</Text>
                            <View style={styles.cardInf}>
                                {data && data.pathological5 ? (
                                    <Text style={styles.cardText}>{data.pathological5}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.labelVerE}>¿Alteraciones Neuropsicológicas?</Text>
                            <View style={styles.cardInf}>
                                {data && data.pathological6 ? (
                                    <Text style={styles.cardText}>{data.pathological6}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.labelVerE}>¿Convulsiones?</Text>
                            <View style={styles.cardInf}>
                                {data && data.pathological7 ? (
                                    <Text style={styles.cardText}>{data.pathological7}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                        </View>
                    </ProgressStep>
                    {/* Progreos 6 */}
                    <ProgressStep previousBtnText="Anterior" finishBtnText=""
                        onSubmit={() => navigation.navigate('ExpedienteLista')}
                        previousBtnStyle={styles.botonAnterior}>
                        <View style={styles.stepContent}>
                            <View style={styles.context}>
                                <Text style={styles.text2}>Exploración de la cavidad oral</Text>
                            </View>
                            <Text style={styles.label}>Tejidos Blandos</Text>
                            <View style={styles.cardInf}>
                                {data && data.cavity1 ? (
                                    <Text style={styles.cardText}>{data.cavity1}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.label}>Tejidos Óseos</Text>
                            <View style={styles.cardInf}>
                                {data && data.cavity2 ? (
                                    <Text style={styles.cardText}>{data.cavity2}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <Text style={styles.label}>Articulación Temporomandibular</Text>
                            <View style={styles.cardInf}>
                                {data && data.cavity3 ? (
                                    <Text style={styles.cardText}>{data.cavity3}</Text>
                                ) : (
                                    <Text style={styles.cardText}></Text>
                                )}
                            </View>
                            <View style={styles.list}>
                                <View style={styles.contPoints}>
                                    {data && data.dolor ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Dolor</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                                <View style={styles.contPoints}>
                                    {data && data.luxacion ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Luxacion</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                                <View style={styles.contPoints}>
                                    {data && data.anquilosis ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Anquilosis</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                                <View style={styles.contPoints}>
                                    {data && data.crepitacion ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Crepitacion</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                                <View style={styles.contPoints}>
                                    {data && data.subluxacion ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Subluxacion</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                                <View style={styles.contPoints}>
                                    {data && data.espasmoMuscular ? (
                                        <Text style={styles.punto}>•
                                            <Text style={styles.item}> Espasmo Muscular</Text>
                                        </Text>
                                    ) : (
                                        <Text style={styles.cardText}></Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </View>
        </ScrollView>
    )
}

