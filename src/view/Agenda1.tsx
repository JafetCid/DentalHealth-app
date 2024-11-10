import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';
import Header from './components/Header';

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

//Fecha del dia en el que nos econtramos abreviada 
const today = new Date();
const monthShort = today.toLocaleDateString('es-ES', { month: 'long' }).substring(0, 3);
// Formatea el día y el año
const day = today.getDate();
const year = today.getFullYear();
// Formatea la fecha final como "Mes Día, Año" (Ej: "May 5, 2024")
const formattedDate = `${monthShort.charAt(0).toUpperCase() + monthShort.slice(1)} ${day}, ${year}`;

const ScheduleView = ({ navigation }) => {
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const weekDates = getCurrentWeekDates();
  const today = new Date().getDate();

  const [appointments, setAppointments] = useState([]);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);

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
        <Header onPress={''} title={''} showArrow={false} point={''} showLogo={false}/>
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
        <Text style={styles.dateAbreviate}>{formattedDate}</Text>
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
    fontSize: 18,
    // fontWeight: 'bold',
    color: 'white',
  },
  dateText: {
    fontSize: 18,
    color: 'white',
  },
  highlightedDay: {
    color: 'white',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 1,
  },
  highlightedDate: {
    color: 'white',
    fontWeight: 'bold',
    
  },
  dateAbreviate: {
    color: 'white',
    fontSize: 25,
    top: -300,
    left: 38,
  },
  todayLabel: {
    marginVertical: 10,
    fontSize: 25,
    color: 'white',
    top: -310,
    left: 40,
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
    // borderWidth: 2,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    
    
    },
});

export default ScheduleView;
