import ButtonIn from "../components/ButtonIn";
import Header from "../components/Header";
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from "react-native";
import InputImage from "../components/InputImage";

export default function CrearPromocion({ navigation }) {
    return(
        <ScrollView>
            <View>
                <Header title={'Crear promoción'} showLogo={false} onPress={() => navigation.goBack()}/>
                <View style={styles.form}>
                    <View style={styles.conten}>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            inputMode='text'
                            // value={step1Data.name}
                            // onChangeText={text => setStep1Data({ ...step1Data, name: text })}
                        />
                        <Text style={styles.label}>Apellidos</Text>
                        <TextInput
                            style={styles.input}
                            inputMode='text'
                            // value={step1Data.address}
                            // onChangeText={text => setStep1Data({ ...step1Data, address: text })}
                        />
                        <InputImage/>
                        <ButtonIn buttonStyle={{backgroundColor: '#308CFF', width:'100%', marginBottom: '10%'}}
                            Title={'Guardar'} textStyle={{color: 'white'}}
                            onPress={() => navigation.navigate('Promociones')}/>
                    </View>
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: '10%',
        alignItems: 'center',
    },

    conten: {
        width: '80%',
    },

    label:{
        fontSize: 16,
        marginHorizontal: 5,
        marginTop:10
    },

    input: {
        height: 55,
        width: '100%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F7F7F7',
        color: 'black',
    },
})