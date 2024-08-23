import { useState } from "react";
import { Platform, View, StyleSheet, Image, Text } from "react-native";
import ButtonIn from "./ButtonIn";
import * as ImagePicker from 'expo-image-picker';

export default function InputImage() {

    const [imageUri, setImageUri] = useState(null);

    const selectImage = async () => {
        // Pedir permisos
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Se requieren permisos para acceder a la galería.');
                return;
            }
        }

        // Seleccionar imagen
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
            allowsEditing: true, // Permitir edición de la imagen
            quality: 1, // Calidad máxima
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

  return (
    <View>
        <Text style={styles.label}>Fotografía (Opcional)</Text>
        <ButtonIn buttonStyle={{backgroundColor: '#F7F7F7', width:'100%'}}
            Title={'Seleccione una imagen'} textStyle={{color: 'black'}}
            onPress={selectImage}/>
        <View style={styles.contImg}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image}/>}
        </View>
    </View>
    
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

    contImg: {
        alignItems: 'center',
    },

    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
})