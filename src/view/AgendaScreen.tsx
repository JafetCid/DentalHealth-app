import Header from './components/Header';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Pressable, Modal, Image
 } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../../assets/styles/AgendaScreen';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Checkbox } from 'react-native-paper';
import ButtonIn from './components/ButtonIn';
import { parse, format } from "date-fns";
import { API_URL } from '@env';

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
  const [selectedTime, setSelectedTime] = useState(null);
  const [busyDays, setBusyDays] = useState<string[]>([]);
  const [citas, setCitas] = useState<{ freeHours: string[] }>({ freeHours: [] });

  //Modal y checkBox
  const [isVisible, setIsVisible] = useState(false);
  const [isSelected, setSelected] = useState({
    check: false,
  });

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

  const today = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
    const fetchBusyDays = async () => {
      const fetchedBusyDays = [];
      setBusyDays(fetchedBusyDays);
    };
    fetchBusyDays();
  }, []);

  // Definición del tipo DateObject personalizado
  interface DateObject {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
  }

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

  const handleTimeSelect = (time) => {
    console.log(time)
    setSelectedTime(time);
  };

  //CheckBox
  const handleCheckboxChange = (condition) => {
    setSelected((prevState) => ({
      ...prevState,
      [condition]: !prevState[condition],
    }));
  };

  // Validación al presionar el botón "Agendar"
  const handleAgendarPress = async () => {
    if (!selectedDay || !selectedTime) {
      Alert.alert('Error', 'Por favor, seleccione una fecha y un horario.');
    } else {
      // console.log(selectedDay, selectedTime)
      // Crear el objeto con los datos que quieres enviar
      const dataToSend = {
        date: selectedDay,    // La fecha en formato 'YYYY-MM-DD'
        time: selectedTime,   // La hora en formato 'HH:mm:ss' (ej. '11:00:00')
      };

      try {
        // Enviar el formulario al servidor
        const response = await fetch(`${API_URL}/api/appointment/create/3`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  // Indicamos que estamos enviando JSON
          },
          body: JSON.stringify(dataToSend),  // Convertimos el objeto a JSON
        });

        if (response.ok) {
          console.log('Formulario enviado con éxito');
          console.log(dataToSend);

          Alert.alert('Cita agendada', `Cita programada para el ${selectedDay} a las ${selectedTime}.`);
          navigation.navigate('HomeP')

        } else {
          console.error('Error al agendar la cita');
          console.log(dataToSend);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
    // Aquí puedes agregar la lógica para agendar la cita
  };

  useEffect(() => {
    fetchAppointmentsData(selectedDay)
  }, [selectedDay])

  const fetchAppointmentsData = async (date) => {
    try {
      console.log(date)
      const response = await fetch(`${API_URL}/api/appointment/availableHours?date=${date}`);
      if (response.ok) {
        const data = await response.json();
        setCitas(data);
        console.log(data)
      } else {
        // console.error('Error al obtener las citas');
        Alert.alert('No puede agendar esta cita')
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Header title={''} showLogo={false} onPress={() => navigation.goBack()} point={''} />
        <View style={styles.contLT}>
          {/* <FontAwesome name="user-circle-o" size={60} color="white" style={styles.icon} /> */}
          <Image source={require('../../assets/images/Doc.jpeg')} style={styles.icon}/>
          <View style={styles.contName}>
            <Text style={styles.name}>Jose Alberto Lopez Jimenez</Text>
          </View>
        </View>
        <View style={styles.contAgenda}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              ...busyDays.reduce((acc, date) => {
                acc[date] = { selected: true, marked: true, selectedColor: 'red' };
                return acc;
              }, {}),
              [selectedDay || '']: { selected: true, marked: true, selectedColor: '#308CFF' },
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
            {/* <Text style={styles.subTitle}>Mañana</Text> */}
            <View style={styles.contHorarios}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeSlotsContainer}>
                {citas.freeHours && citas.freeHours.length > 0 ? (
                  citas.freeHours.map((time) => {
                    const formattedTime = format(parse(time, "HH:mm:ss", new Date()), "h:mm a");
                    const isSelected = selectedTime === time;

                    return (
                      <TouchableOpacity
                        key={time}
                        style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}
                        onPress={() => handleTimeSelect(time)}
                      >
                        <Text style={[isSelected && styles.selectedTimeText]}>
                          {formattedTime}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text>No hay citas disponibles en este momento.</Text>
                )}
              </ScrollView>
            </View>
            {/* <Text style={styles.subTitle}>Tarde</Text>
            <View style={styles.contHorarios}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeSlotsContainer}>
                {['1:00 pm', '2:00 pm', '5:00 pm'].map((time) => {
                  const isSelected = selectedTime === format(parse(time, "h:mm a", new Date()), "HH:mm:ss"); // Comparación en formato "HH:mm:ss"
                  return (
                    <TouchableOpacity
                      key={time}
                      style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}
                      onPress={() => handleTimeSelect(time)}
                    >
                      <Text style={[isSelected && styles.selectedTimeText]}>{time}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View> */}
          </View>
        </View>
        <View style={styles.contCartaC}>
          <Text style={styles.textCartaC}>Favor de leer con atención la carta de consentimiento.</Text>
          <View style={styles.contAviso}>
            <Checkbox
              status={isSelected.check ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('check')}
              color='#308CFF'
              uncheckedColor="#308CFF"
            />
            <TouchableOpacity
              style={styles.aviso}
              onPress={() => setIsVisible(true)}>
              <Text style={styles.linkR}>Aviso de privacidad</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={toggleModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Carta de consentimiento</Text>
              <Text style={styles.modalText2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </Text>
              <View style={styles.btnModal}>
                <Pressable
                  style={styles.buttonCloseM}
                  onPress={toggleModal}>
                  <Text style={styles.textStyle}>Aceptar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.buttonContainer}>
          <ButtonIn
            Title={'Solicitar cita'}
            textStyle={{ color: 'white' }}
            buttonStyle={{ backgroundColor: '#308CFF', marginBottom: '10%', }}
            onPress={handleAgendarPress}
          />
        </View>
      </ScrollView>
    </View>
  );
}
