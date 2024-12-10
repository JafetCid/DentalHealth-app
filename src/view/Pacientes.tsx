import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';
import Header from './components/Header';
import { API_URL } from '@env';

const Patients = ({ navigation }) => {

  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [menuVisible, setMenuVisible] = useState(null);
  const API_URL = 'https://dental-health-backend.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/getPatient`); // URL de la API
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const data = await response.json(); // Convierte la respuesta en un objeto JSON
        setPatients(data); // Guarda los datos en el estado
        // console.log(data);

      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData()
  }, [])

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.Login.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedLetter ? patient.Login.name[0].toUpperCase() === selectedLetter : true)
  );

  // Agrupar pacientes por letras
  const groupByLetter = (patients) => {
    const grouped = {};
    patients.forEach((patient) => {
      const firstLetter = patient.Login.name[0].toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(patient);
    });
    return grouped;
  };

  const groupedPatients = groupByLetter(filteredPatients);


  const openMenu = (patientId) => {
    setMenuVisible(patientId);
  };

  const closeMenu = () => {
    setMenuVisible(null);
  };

  const contactPatient = (id) => {
    navigation.navigate('Chat2', {id});
    closeMenu();
  };

  const viewDetails = (id) => {
    navigation.navigate('Pdetalles', {id});
    closeMenu();
  };

  return (
    <Provider>
      <ScrollView>
        <View style={styles.container}>
          <Header title={''} onPress={''} showLogo={false} showArrow={false} point={''} />
          <Text style={styles.title}>Pacientes</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            onChangeText={handleSearch}
            value={searchQuery}
          />
          <View style={styles.mainContent}>
            <View style={styles.listContainer}>
              {/* Agrupamos los pacientes por letra */}
              {Object.keys(groupedPatients).sort().map((letter) => (
                <View key={letter}>
                  <Text style={styles.letterHeader}>{letter}</Text>
                  {groupedPatients[letter].map((patient) => (
                    <View key={patient.id} style={styles.patientCard}>
                      <View>
                        <Text style={styles.patientName}>
                          {patient.Login?.name || 'Nombre no disponible'}
                        </Text>
                        <Text style={styles.lastAppointment}>
                          Teléfono: {patient.Login?.phoneNumber || 'No disponible'}
                        </Text>
                      </View>
                      <Menu
                        visible={menuVisible === patient.id}
                        onDismiss={closeMenu}
                        anchor={
                          <TouchableOpacity onPress={() => openMenu(patient.id)}>
                            <AntDesign name="ellipsis1" size={24} color="black" />
                          </TouchableOpacity>
                        }
                        contentStyle={styles.menuContent}
                      >
                        <View style={styles.roundedMenu}>
                          <Menu.Item onPress={() => contactPatient(patient.id)} title="Contactar" />
                          <Menu.Item onPress={() => viewDetails(patient.id)} title="Ver detalles" />  
                        </View>
                      </Menu>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    color: 'white',
    marginTop: 60,
    marginLeft: 25,
    top: -230,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    width: '90%',
    top: -100,
  },
  mainContent: {
    flex: 1,
    top: -70,
  },
  letterHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  listContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginLeft: 35,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastAppointment: {
    fontSize: 16,
  },
  roundedMenu: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuContent: {
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default Patients;
