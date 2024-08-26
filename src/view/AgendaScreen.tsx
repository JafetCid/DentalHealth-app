import HeaderNoIcon from './components/HeaderNoIcon';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';

const { width, height } = Dimensions.get('window');

export default function AgendaScreen({navigation}) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDayPress = (day: DateObject) => {
    setSelectedDay(day.dateString);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}> 
        <HeaderNoIcon />
        <Text style={styles.text}>Citas</Text>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDay || '']: { selected: true, marked: true, selectedColor: 'blue' },
          }}
          theme={{
            calendarBackground: 'transparent',
            textSectionTitleColor: '#000000',
            dayTextColor: '#000000',
            todayTextColor: '#0000ff',
            selectedDayTextColor: '#ffffff',
            selectedDayBackgroundColor: '#0000ff',
          }}
          style={styles.calendar}
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horarios disponibles</Text>
          <Text style={styles.subTitle}>Mañana</Text>
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
          <Text style={styles.subTitle}>Tarde</Text>
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
  timeSlot: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
