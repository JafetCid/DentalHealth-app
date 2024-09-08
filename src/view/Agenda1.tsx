import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';
import HeaderNoIcon from './components/HeaderNoIcon';

const getCurrentWeekDates = () => {
  const currentDate = new Date();
  const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + 1; // Monday as the first day of the week
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

  const [menuVisible, setMenuVisible] = useState(null);

  const openMenu = (appointmentId) => {
    setMenuVisible(appointmentId);
  };

  const closeMenu = () => {
    setMenuVisible(null);
  };

  const handleContact = () => {
    navigation.navigate('Chat');
    //console.log("Contactar al paciente");
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
          {[
            { time: '9:00 AM', name: 'Ultima cita', id: '1' },
            { time: '10:00 AM', name: 'Jafet Primer cita', id: '2' },
            { time: '11:00 AM', name: 'Victor Primer cita', id: '3' },
            { time: '11:00 AM', name: 'Victor Primer cita', id: '4' },
            { time: '11:00 AM', name: 'Victor Primer cita', id: '5' },
            { time: '11:00 AM', name: 'Victor Primer cita', id: '6' },
            { time: '11:00 AM', name: 'Victor Primer cita', id: '7' },

          ].map((appointment) => (
            <View key={appointment.id} style={styles.card}>
              <View style={styles.appointment}>
                <View style={styles.circle} />
                <View style={styles.details}>
                  <Text style={styles.time}>{appointment.time}</Text>
                  <Text style={styles.name}>{appointment.name}</Text>
                </View>
                {/* Menú de elipsis */}
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
});

export default ScheduleView;
