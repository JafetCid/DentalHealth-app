import React, { useState } from 'react';
import styles from '../../../assets/styles/Stepper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Platform } from 'react-native';

export default function InputDate () {
    
    const [dateOfBirth, setDateOfBirth] = useState("");
    
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

        // month = month < 10 ? `0${month}` : month;
        // day = day < 10 ? `0${day}` : day;

        return `${day}-${month}-${year}`;
    }
    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate 
            setDate(currentDate);
            if (Platform.OS === "android") {
                toggleDatepicker();
                setDateOfBirth(formatDate(currentDate));
            }
        } else {
            toggleDatepicker();
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
                        onChangeText={setDateOfBirth}
                        placeholder=''
                        placeholderTextColor='black'
                        editable={false}
                    />
                </Pressable>
            )}
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
});
