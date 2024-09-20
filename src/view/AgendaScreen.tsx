import { Ionicons } from '@expo/vector-icons';
import HeaderNoIcon from './components/HeaderNoIcon';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Calendar, LocaleConfig, DateObject } from 'react-native-calendars';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; //  español

const { width } = Dimensions.get('window');

// Configuración del calendario en español
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es'; 

export default function AgendaScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [busyDays, setBusyDays] = useState<string[]>([]);

  const today = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
    const fetchBusyDays = async () => {
      const fetchedBusyDays = []; 
      setBusyDays(fetchedBusyDays);
    };
    fetchBusyDays();
  }, []);

  const handleDayPress = (day: DateObject) => {
    const dayOfWeek = dayjs(day.dateString).locale('es').format('dddd');

    // Verificar si es domingo
    if (dayOfWeek === 'domingo') {
      Alert.alert('Día no disponible', 'No se puede seleccionar el día domingo.');
      return;
    }

    // Verificar si el día seleccionado es antes del día actual
    if (day.dateString < today) {
      Alert.alert('Fecha inválida', 'No se pueden seleccionar días pasados.');
      return;
    }

    // Verificar si el día está ocupado
    if (busyDays.includes(day.dateString)) {
      Alert.alert('Día ocupado', 'Este día ya está ocupado.');
      return;
    }

    setSelectedDay(day.dateString);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeaderNoIcon />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Agenda')}
        >
          <Ionicons name="arrow-back-outline" size={35} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>Citas</Text>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            ...busyDays.reduce((acc, date) => {
              acc[date] = { selected: true, marked: true, selectedColor: 'red' };
              return acc;
            }, {}),
            [selectedDay || '']: { selected: true, marked: true, selectedColor: 'blue' },
          }}
          minDate={today}
          theme={{
            calendarBackground: 'transparent',
            textSectionTitleColor: '#000000',
            dayTextColor: '#000000',
            todayTextColor: '#0000ff',
            selectedDayTextColor: '#ffffff',
            selectedDayBackgroundColor: 'blue',
          }}
          style={styles.calendar}
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horarios disponibles</Text>
          <Text style={styles.subTitle}>Mañana</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeSlotsContainer}>
            {['9:00 am', '10:00 am', '11:00 am'].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot,
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text>{time}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.subTitle}>Tarde</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeSlotsContainer}>
            {['1:00 pm', '2:00 pm', '5:00 pm'].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot,
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text>{time}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Solicitar cita</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  calendar: {
    width: width * 0.9,
    marginBottom: 20,
  },
  section: {
    width: width * 0.9,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeSlotsContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  timeSlot: {
    padding: 25,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 15,
  },
  selectedTimeSlot: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
