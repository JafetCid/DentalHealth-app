import ButtonIn from "../components/ButtonIn";
import Header from "../components/Header";
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from "react-native";
import InputImage from "../components/InputImage";
import { useState } from "react";

export default function CrearPromocion({ navigation }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [promotionalImage, setPromotionalImage] = useState(null);

    const handleSave = async () => {

        const formDataToSend = new FormData();
        formDataToSend.append('title', title);
        formDataToSend.append('description', description);
        
        if (promotionalImage) {
            const imageName = promotionalImage.split('/').pop();
            const imageType = promotionalImage.endsWith('.png') ? 'image/png' : 'image/jpeg';
            // Agregar la imagen al FormData
            formDataToSend.append('promotionalImage', {
                uri: promotionalImage,
                name: imageName,
                type: imageType,
            }as unknown as Blob);
            console.log(promotionalImage)
        }

        try {
            const response = await fetch('https://dental-health-api.onrender.com/api/promotion/create/1', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                // Actualizar la lista de promociones según sea necesario
                console.log('Goticas culonas')
            } else {
                console.log('no hay dinero para las putas :,,(')
            }   
        } catch (error) {
            console.error("Error al guardar la promoción:", error);

        }
    };

    return(
        <ScrollView>
            <View>
                <Header title={'Crear promoción'} 
                    showLogo={false} onPress={() => navigation.goBack()} point={''}/>
                <View style={styles.form}>
                    <View style={styles.conten}>
                        <Text style={styles.label}>Titulo</Text>
                        <TextInput
                            style={styles.input}
                            inputMode='text'
                            value={title}
                            onChangeText={setTitle}
                        />
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={styles.input}
                            inputMode='text'
                            value={description}
                            onChangeText={setDescription}
                        />
                        <InputImage onImageSelect={(image) => setPromotionalImage(image.uri)}/>
                        <ButtonIn buttonStyle={{backgroundColor: '#308CFF', width:'100%', marginBottom: '10%'}}
                            Title={'Guardar'} textStyle={{color: 'white'}}
                            onPress={handleSave}/>
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