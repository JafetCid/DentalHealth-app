import { useState } from "react";
import { Platform, View, StyleSheet, Image, Text, Alert } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ButtonIn from "./ButtonIn";
import * as ImagePicker from 'expo-image-picker';

export default function InputImage({ onImageSelect }) {

    const [imageUri, setImageUri] = useState(null);
    const [imageName, setImageName] = useState(null);

    const handleImageUpload = async () => {
        // Pedir permisos si es necesario
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Se requieren permisos para acceder a la galería.');
                return;
            }
        }
    
        // Abrir la galería y seleccionar una imagen
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    
        // Verificar si se seleccionó una imagen
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            setImageUri(selectedImage.uri);
            // onImageSelect(selectedImage.uri); // Pasar la URI al formulario principal
            setImageName(selectedImage.fileName); // Guardar el nombre del archivo
            onImageSelect({
                uri: selectedImage.uri,
                name: selectedImage.fileName,  // Pasar el nombre del archivo
                type: selectedImage.type || 'image/jpeg', // Asegúrate de asignar el tipo de archivo
            });

        }
    };

    // const uploadImageToServer = async (image) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('image', {
    //             uri: image.uri,
    //             name: image.uri.split('/').pop(),
    //             type: image.type || 'image/jpeg', // Asegúrate de ajustar el tipo según tu API
    //         });

    //         const response = await fetch('http://<TU_SERVIDOR>/upload', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //             body: formData,
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('Imagen subida exitosamente:', data);

    //             // Si necesitas guardar la URL en una base de datos
    //             saveImageUrlToDatabase(data.imageUrl);
    //         } else {
    //             console.error('Error al subir la imagen.');
    //         }
    //     } catch (error) {
    //         console.error('Error en la subida de la imagen:', error);
    //     }
    // };

    // const saveImageUrlToDatabase = async (imageUrl) => {
    //     try {
    //         const response = await fetch('http://<TU_SERVIDOR>/save-image-url', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ imageUrl }),
    //         });

    //         if (response.ok) {
    //             Alert.alert('Éxito', 'Imagen guardada en la base de datos.');
    //         } else {
    //             console.error('Error al guardar la URL en la base de datos.');
    //         }
    //     } catch (error) {
    //         console.error('Error al guardar la URL:', error);
    //     }
    // };
    

  return (
    <View style={styles.conten}>
        <Text style={styles.label}>Fotografía (Opcional)</Text>
        <View style= {styles.contIA}>
            <ButtonIn buttonStyle={{backgroundColor: '#F7F7F7', width:'100%'}}
                Title={'Seleccione una imagen'} textStyle={{color: 'black', fontSize: 16,}}
                onPress={handleImageUpload}/>
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