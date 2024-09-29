import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';
import HeaderNoIcon from './components/HeaderNoIcon';

const getCurrentWeekDates = () => {
  const currentDate = new Date();
  const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + 1; // Lunes como primer día de la semana
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.setDate(firstDayOfWeek + i));
    dates.push(date.getDate());
  }
  return dates;
};

const ScheduleView = ({ navigation }) => {
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const weekDates = getCurrentWeekDates();
  const today = new Date().getDate();

  const [appointments, setAppointments] = useState([]);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);

  // Llamar a la API para obtener las citas
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://192.168.0.7:3000/appointments'); // URL de la API
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const openMenu = (appointmentId: string) => {
    setMenuVisible(appointmentId);
  };

  const closeMenu = () => {
    setMenuVisible(null);
  };

  const handleContact = () => {
    navigation.navigate('Chat');
    closeMenu();
  };

  const handleCancel = () => {
    console.log("Cancelar cita");
    closeMenu();
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HeaderNoIcon />
        <View style={styles.header}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <Text style={[styles.dayText, weekDates[index] === today && styles.highlightedDay]}>
                {day}
              </Text>
              <Text style={[styles.dateText, weekDates[index] === today && styles.highlightedDate]}>
                {weekDates[index]}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.todayLabel}>Hoy</Text>
        <View style={styles.appointmentsContainer}>
          {appointments.map((appointment) => (
            <View key={appointment.id} style={styles.card}>
              <View style={styles.appointment}>
                <View style={styles.circle} />
                <View style={styles.details}>
                  <Text style={styles.time}>{appointment.time}</Text>
                  <Text style={styles.name}>{appointment.name}</Text>
                </View>
                <Menu
                  visible={menuVisible === appointment.id}
                  onDismiss={closeMenu}
                  anchor={
                    <TouchableOpacity onPress={() => openMenu(appointment.id)}>
                      <AntDesign name="ellipsis1" size={24} color="black" />
                    </TouchableOpacity>
                  }
                  contentStyle={styles.menuContent}
                >
                  <View style={styles.roundedMenu}>
                    <Menu.Item onPress={handleContact} title="Contactar" />
                    <Menu.Item onPress={handleCancel} title="Cancelar cita" />
                  </View>
                </Menu>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AgendaScreen')}
        >
          <Ionicons name="add-outline" size={50} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    top: -150,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    fontWeight: 'bold',
  },
  dateText: {
    color: 'white',
  },
  highlightedDay: {
    color: 'white',
  },
  highlightedDate: {
    color: 'white',
    fontWeight: 'bold',
  },
  todayLabel: {
    marginVertical: 10,
    fontSize: 25,
    fontWeight: 'bold',
    top: -290,
    padding: 25,
  },
  appointmentsContainer: {
    marginTop: -150,
    padding: 15,
  },
  card: {
    borderRadius: 8,
    padding: 19,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
  },
  appointment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  time: {
    fontWeight: 'bold',
  },
  name: {
    color: 'gray',
  },
  roundedMenu: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuContent: {
    borderRadius: 10,
    backgroundColor: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#2f95dc',
    borderRadius: 25,
    shadowColor: '#ccc', // Color de la sombra
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    
    },
});

export default ScheduleView;
