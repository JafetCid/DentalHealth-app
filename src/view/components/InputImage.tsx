import { useState } from "react";
import { Platform, View, StyleSheet, Image, Text } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ButtonIn from "./ButtonIn";
import * as ImagePicker from 'expo-image-picker';

export default function InputImage() {

    const [imageUri, setImageUri] = useState(null);
    const [imageName, setImageName] = useState(null);

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
            console.log('imagen cancelada');
        }
        // Muestra el nombre de la imagen
        // if (!result.canceled && result.assets && result.assets.length > 0) {
        //     const uri = result.assets[0].uri;
        //     setImageUri(uri);
      
        //     // Extraer el nombre de la imagen desde la uri
        //     const name = uri.split('/').pop();
        //     setImageName(name);
        //   }
    };

  return (
    <View style={styles.conten}>
        <Text style={styles.label}>Fotografía (Opcional)</Text>
        <View style= {styles.contIA}>
            <ButtonIn buttonStyle={{backgroundColor: '#F7F7F7', width:'100%'}}
                Title={'Seleccione una imagen'} textStyle={{color: 'black', fontSize: 16,}}
                onPress={selectImage}/>
            <MaterialCommunityIcons name="paperclip" size={24} color="black" style={styles.iconClip} />
        </View>
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
        width: '100%',
        marginBottom: 15,
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
    contIA: {
        justifyContent: 'center',
    },
    iconClip: {
        position: 'absolute',
        right: 0,
        padding: 10,
        // borderWidth: 2,
    },
})