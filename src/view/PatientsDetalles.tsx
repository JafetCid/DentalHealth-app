import React from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonIn from './components/ButtonIn';
import { CardPerfilP } from './components/CardPerfilP';
// import PerfilP from './Pacientes/PerfilP';

export default function PatientsDetalles({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            {/* <PerfilP showButton={true} navigation={navigation}/> */}
            <CardPerfilP navigation={navigation} showArrowV={true}/>
            <View style={styles.buttonContainer}> 
                <ButtonIn
                Title="Ver expediente"
                buttonStyle={styles.buttonAgendar}
                textStyle={styles.buttonText}
                onPress={() => navigation.navigate('ExpedienteLista')} //ExpedienteLista
                />
                <ButtonIn
                Title="Ver Examen dental"
                buttonStyle={styles.buttonAgendar}
                textStyle={styles.buttonText}
                onPress={() => navigation.navigate('ExamDent')} //ExamenDent
                />
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',         
        justifyContent: 'space-around', 
        // width: '80%',           
        // marginTop: 90,               
    },
    buttonAgendar: {
        backgroundColor: '#308CFF',
        padding: 10,
        borderRadius: 100,
        width: 'auto',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
