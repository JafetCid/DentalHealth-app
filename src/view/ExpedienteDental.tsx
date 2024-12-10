import React, { useState, useEffect } from 'react';
import { Image, Text, StyleSheet, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import ExpedienteList from './components/ExpedienteList';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/Header';
import { API_URL } from '@env';

const ExpedienteDentales = ({ navigation, route }) => {

  const [patients, setPatients] = useState(null);
  const [patientsId, setPatientsId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expedientes, setExpedientes] = useState([]);
  const [expedienteId, setExpedienteId] = useState();

  const API_URL = 'https://dental-health-backend.onrender.com';
  const { id } = route.params;
  useEffect(() => {
    if (id) {
      console.log('id del paciente al mandarlo a traer:', id)
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await fetch(`${API_URL}/api/auth/getPatient/${id}`); // URL de la API
        if (!responseUser.ok) {
          throw new Error('Error en la solicitud');
        }
        const data = await responseUser.json(); // Convierte la respuesta en un objeto JSON
        setPatients(data); // Guarda los datos en el estado
        console.log('Datos del paciente:', data.id);
        setPatientsId(data.id)
        // setPatients(id)

        const expedientesResponse = await fetch(`${API_URL}/api/medicalForm/get/${id}`);
        if (!expedientesResponse.ok) {
          throw new Error('Error al obtener expedientes');
        }
        const expedientesData = await expedientesResponse.json();
        console.log('Expediente:', expedientesData)
        // Obtén el id del expediente y guárdalo en el estado
        const idExpediente = expedientesData[0]?.id; // Accede al primer elemento y a su campo 'id'
        console.log("Id del Expediente:", idExpediente); // Verifica en la consola
        setExpedienteId(idExpediente);

        // console.log('Datos transformados:', transformedData);

        // Actualiza tu estado con el nuevo objeto transformado
        setExpedientes(expedientesData);

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

  const handleVerDetalles = (id) => {
    console.log('Ver detalles de examen dental', id);
    navigation.navigate('VerExpedienteM', { id, patientsId })
  };

  const handleEditar = (id: string) => {
    //console.log('Editar examen dental', id);
    //navigation.navigate('Examen', { id }); 
  };

  const handleEliminar = () => {
    toggleModal()
  };

  const toggleModal = async () => {
    setIsVisible(!isVisible)
    try {
      const response = await fetch(`${API_URL}/api/medicalForm/delete/${expedienteId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Actualizar la lista de expedientes en el estado
      setExpedientes((prevExpedientes) =>
        prevExpedientes.filter((expediente) => expediente.id !== expedienteId)
      );
      } else {
        console.log('No se pudo eliminar');
      }
    } catch (error) {
      console.error("Error al eliminar el expediente:", error);
    }
  }

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

  return (
    <View>
      {/* <ScrollView> */}
      <Header title={'Expedientes'} showLogo={true} onPress={() => navigation.goBack()} point={''} />
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
        expedientes={expedientes}
        onVerDetalles={handleVerDetalles}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CrearExpediente', { patientsId })}>
        <Ionicons name="add-outline" size={50} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={handleEliminar}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>¿Estas seguro que deseas eliminar este expediente?</Text>
              <View style={styles.btnModal}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => { setIsVisible(false) }}>
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose2]}
                  onPress={() => { setIsVisible(false) }}>
                  <Text style={styles.textStyle}>Eliminar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* </ScrollView> */}
    </View>
  );
};
const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: -100,
    // borderWidth: 2,
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

  // estilos del modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '30%',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonClose2: {
    backgroundColor: '#FF0000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 24,
  },
  btnModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default ExpedienteDentales;
