import React from 'react';
import { StyleSheet, View } from 'react-native';
import InfoCard from './components/InfoCard'; 
import Header from './components/Header';
import ButtonIn from './components/ButtonIn';

export default function PatientsDetalles({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <Header title="Detalles del Paciente" onPress={() => navigation.goBack()} />
            <View style={{ flex: 1, alignItems: 'center' }}>
                <InfoCard />
                <View style={styles.buttonContainer}> 
                    <ButtonIn
                        Title="Examen"
                        buttonStyle={styles.buttonAgendar}
                        textStyle={styles.buttonText}
                        onPress={() => navigation.navigate('ExamDent')} 
                    />
                    <ButtonIn
                        Title="Expediente"
                        buttonStyle={styles.buttonAgendar}
                        textStyle={styles.buttonText}
                        onPress={() => navigation.navigate('ExpedienteLista')} 
                    />
                    

                </View>
            </View>
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
