import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import ExpedienteList from './components/ExpedienteList';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/Header';
import IconMasPromo from './components/IconMasPromo';
import { API_URL } from '@env';

const ExamenesDentalesScreen = ({ navigation, route }) => {

  const API_URL = 'https://dental-health-backend.onrender.com';
  const { id } = route.params; // Obtener el parámetro de navegación
  useEffect(() => {
    if (id) {
      console.log('id del paciente ED:', id);
    }
  }, [id]);


  const [patientsId, setPatientsId] = useState(null);
  const [patients, setPatients] = useState(null);
  const [examenes, setExamenes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await fetch(`${API_URL}/api/auth/getPatient/${id}`); // URL de la API
        if (!responseUser.ok) {
          throw new Error('Error en la solicitud');
        }
        const dataUser = await responseUser.json(); // Convierte la respuesta en un objeto JSON
        setPatients(dataUser); // Guarda los datos en el estado
        setPatientsId(dataUser.id)
        console.log('Datos del usuario:', dataUser);


        const examenResponse = await fetch(`${API_URL}/api/dentalExam/getAll/${id}`); // URL de la API
        if (!examenResponse.ok) {
          throw new Error('Error en la solicitud');
        }
        const examenData = await examenResponse.json(); // Convierte la respuesta en un objeto JSON
        console.log('Examen', examenData);
        setExamenes(examenData); // Guarda los datos en el estado

      } catch (error) {
        console.log('Error:', error);
      }
    };

    // Escuchar el evento `focus` para actualizar los datos
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe; // Limpia el evento al desmontar
  }, [id, navigation])

  const handleVerDetalles = (id: string) => {
    console.log('Ver detalles de examen dental', id);
    navigation.navigate('VerExamenD', { id, patientsId });
  };

  const handleEditar = (id: string) => {
    //console.log('Editar examen dental', id);
    navigation.navigate('VerExamenD', { id });
  };

  const handleEliminar = (id: string) => {
    console.log('Eliminar examen dental', id);
  };

  return (
    <View>
      <Header title={'Examenes'} showLogo={true} onPress={() => navigation.goBack()} point={''} />
      <View style={styles.logoC}>
        {patients && patients.profilePictureUrl ? (
          <Image
            source={
              patients.profilePictureUrl
                ? { uri: `${patients.profilePictureUrl}` }  // Usar imagen desde la URL proporcionada por la base de datos
                : require('../../assets/images/Perfil.png')  // Imagen por defecto
            }
            style={styles.imgLogo}
          />
        ) : null}
      </View>
      {patients && patients.Login && patients.Login.name ? (
        <Text style={styles.titleN}>{`${patients.Login.name} ${patients.Login.lastName}`}</Text>
      ) : (
        <Text style={styles.titleN}>Nombre</Text>
      )}
      <ExpedienteList
        expedientes={examenes}
        onVerDetalles={handleVerDetalles}
        onEditar={handleEditar}
        onEliminar={handleEliminar}

      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ExamenAdult', { patientsId })}
      >
        <Ionicons name="add-outline" size={50} color="white" />
      </TouchableOpacity>
      {/* <IconMasPromo 
        onPress={() => navigation.navigate('ExamenAdult')}
        iconStyle={{
          position: 'absolute',
          borderWidth: 2,
          width: '100%',
          alignItems: 'flex-end',
          bottom: '-40%',
        }}/> */}
    </View>
  );
};
const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: -200,
    right: 30,
    backgroundColor: '#2f95dc',
    borderRadius: 25,
    elevation: 4,
  },
  logoC: {
    position: 'absolute',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imgLogo: {
    height: 150,
    width: 150,
    borderRadius: 80,
    marginTop: -33,
  },
  titleN: {
    fontSize: 25,
    alignSelf: 'center',
  },
});

export default ExamenesDentalesScreen;
