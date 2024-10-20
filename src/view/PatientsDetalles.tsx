import React from 'react';
import { StyleSheet, View } from 'react-native';
import InfoCard from './components/InfoCard'; 
import Header from './components/Header';
import ButtonIn from './components/ButtonIn';
import PerfilP from './Pacientes/PerfilP';

export default function PatientsDetalles({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <PerfilP showButton={true} navigation={navigation} showElipse={false}/>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',         
        justifyContent: 'space-between', 
        width: '80%',                 
        marginTop: 90,               
    },
    buttonAgendar: {
        backgroundColor: '#308CFF',
        paddingVertical: 10,
        paddingHorizontal: 20,       
        borderRadius: 100,
        flex: 1,                      
        marginHorizontal: 5,          
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
