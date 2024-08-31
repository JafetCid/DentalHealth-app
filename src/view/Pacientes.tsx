import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
//import { useNavigation } from '@react-navigation/native';
import { Menu, Provider } from 'react-native-paper';
import HeaderNoIcon from './components/HeaderNoIcon';

const Patients = ({navigation}) => {
  //const navigation = useNavigation();

  const [patients, setPatients] = useState([
    { name: 'Alvarez', lastAppointment: '26/05/2024', id: 'A' },
    { name: 'Arguello', lastAppointment: '26/05/2024', id: 'B' },
    { name: 'Bolaños', lastAppointment: '26/05/2024', id: 'C' },
    { name: 'Castillo', lastAppointment: '26/05/2024', id: 'D' },
    { name: 'Cid', lastAppointment: '26/05/2024', id: 'E' },
    { name: 'Duran', lastAppointment: '26/05/2024', id: '1' },
    { name: 'Espinoza', lastAppointment: '26/05/2024', id: '2' },
    { name: 'Martinez', lastAppointment: '26/05/2024', id: '3' },
    { name: 'Marreros', lastAppointment: '26/05/2024', id: '4' },
    { name: 'Muñoz', lastAppointment: '26/05/2024', id: '5' },
    { name: 'Merchant', lastAppointment: '26/05/2024', id: '6' },

  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [menuVisible, setMenuVisible] = useState(null);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedLetter ? patient.name[0].toUpperCase() === selectedLetter : true)
  );

  const getAlphabet = () => {
    const uniqueLetters = [...new Set(patients.map(patient => patient.name[0].toUpperCase()))];
    return uniqueLetters.sort();
  };

  const alphabet = getAlphabet();

  const openMenu = (patientId) => {
    setMenuVisible(patientId);
  };

  const closeMenu = () => {
    setMenuVisible(null);
  };

  const contactPatient = () => {
    navigation.navigate('Chat');
    closeMenu();
  };

  const viewDetails = () => {
    navigation.navigate('ExamenAdult');
    closeMenu();
  };

  return (
    <Provider>
      <ScrollView>
        <View style={styles.container}>
          <HeaderNoIcon />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Pacientes')}>
            {/*<AntDesign name="left" size={24} color="white" />*/}
          </TouchableOpacity>
          <Text style={styles.title}>Pacientes</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            onChangeText={handleSearch}
            value={searchQuery}
          />
          <View style={styles.mainContent}>
            <View style={styles.alphabetContainer}>
              <TouchableOpacity
                style={[styles.alphabetButton]}
                onPress={() => setSelectedLetter(null)}
              >
                <Text style={styles.alphabetLetter}>#</Text>
              </TouchableOpacity>
              {alphabet.map((letter) => (
                <TouchableOpacity
                  key={letter}
                  onPress={() => setSelectedLetter(letter)}
                  style={[styles.alphabetButton, selectedLetter === letter && styles.selectedLetter]}
                >
                  <Text style={styles.alphabetLetter}>{letter}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.listContainer}>
              {filteredPatients.sort((a, b) => a.name.localeCompare(b.name)).map((patient) => (
                <View key={patient.id} style={styles.patientCard}>
                  <View>
                    <Text style={styles.patientName}>{patient.name}</Text>
                    <Text style={styles.lastAppointment}>
                      Última cita: {patient.lastAppointment}
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
                      <Menu.Item onPress={contactPatient} title="Contactar" />
                      <Menu.Item onPress={viewDetails} title="Ver detalles" />
                    </View>
                  </Menu>
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
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 60,
    marginLeft: 25,
    top: -230,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignSelf: 'center',
    width: '90%',
    top: -210,
  },
  mainContent: {
    flexDirection: 'row',
    flex: 1,
    top: -145,
  },
  alphabetContainer: {
    justifyContent: 'center',
    padding: 10,
    marginLeft: 5,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  alphabetButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopStartRadius: 56,
  },
  alphabetLetter: {
    fontSize: 16,
    color: 'black',
  },
  selectedLetter: {
    backgroundColor: '#ADD8E6',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastAppointment: {
    fontSize: 16,
  },
  roundedMenu: {
    borderRadius: 10, // Aplicamos el redondeado al menú
    overflow: 'hidden',
    shadowColor:'#1211',
  },
  menuContent: {
    borderRadius: 10, // Redondeamos también el contenedor de contenido del menú
    backgroundColor: 'white',
    shadowColor:'#000',
  },
});

export default Patients;