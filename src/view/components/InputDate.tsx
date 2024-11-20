import React, { useState } from 'react';
import styles from '../../../assets/styles/Stepper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, StyleSheet, Pressable, Platform, Alert } from 'react-native';

export default function InputDate ({ dateOfBirth, setDateOfBirth, errorMessage }) {
    
    // const [dateOfBirth, setDateOfBirth] = useState("");    
    const [date, setDate] = useState (new Date());
    const [showPicker, setShowPicker] = useState(false);
    
    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const formatDate = (rawDate) => {

        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${day}-${month}-${year}`;
    }
    // const validateDateOfBirth = (dateStr) => {
    //     if (!dateStr) {
    //       return "La fecha de nacimiento es obligatoria.";
    //     }
    
    //     const dateParts = dateStr.split("-");
    //     const day = parseInt(dateParts[0]);
    //     const month = parseInt(dateParts[1]) - 1; // El mes es 0-indexed en JavaScript.
    //     const year = parseInt(dateParts[2]);
    
    //     const inputDate = new Date(year, month, day);
    //     const today = new Date();
    
    //     // Validación: La fecha no puede ser futura
    //     if (inputDate > today) {
    //       return "La fecha de nacimiento no puede ser futura.";
    //     }
    
    //     // Validación: La fecha debe ser válida
    //     if (isNaN(inputDate.getTime())) {
    //       return "La fecha ingresada no es válida.";
    //     }
    
    //     return "";
    //   };
    
    const onChange = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate || date; // Si no hay fecha seleccionada, mantener la actual
            setDate(currentDate); // Actualiza el estado local con la fecha seleccionada
        
            const formattedDate = formatDate(currentDate); // Formatea la fecha seleccionada
            setDateOfBirth(formattedDate); // Actualiza la fecha en el formulario
    
            setShowPicker(false);
        } else {
            setShowPicker(false);
        }
      };
    
    return(
        <View>
            <Text style={styles.label}>Fecha de nacimiento</Text>
            {showPicker && (
                <DateTimePicker
                mode='date'  
                display='spinner'  
                value={date}
                onChange={onChange}
                />
                    
                    
            )}
            {!showPicker && (
                <Pressable onPress={toggleDatepicker}>
                    <TextInput
                        style={styles.input}
                        value={dateOfBirth}
                        editable={false}
                        inputMode='numeric'
                    />
                    <View style={pickerSelectStyles.contIcon}>
                        <Icon name="arrow-drop-down" size={24} color="black" />
                    </View>
                </Pressable>
            )}
            {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
       </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 55,
        width: '100%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F7F7F7',
    },
    inputAndroid: {
        height: 55,
        width: '100%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F7F7F7',
    },
    iconContainer: {
        top: 15,
        right: 15,
    },
    contIcon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 13,
        marginTop: 15,
        // borderWidth: 2,
    },
});
