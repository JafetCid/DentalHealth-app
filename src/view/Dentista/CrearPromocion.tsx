import React from 'react';
import ButtonIn from "../components/ButtonIn";
import Header from "../components/Header";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import InputImage from "../components/InputImage";
import { useState, useEffect } from "react";
import { API_URL } from '@env';
import { validarFormCP } from '../../utils/Validation';

export default function CrearPromocion({ navigation, route }) {

    const API_URL = 'https://dental-health-backend.onrender.com';
    const [stepData, setStepData] = useState({
        title: '',
        description: '',
    });

    const [errores, setErrores] = useState({
        title: '',
        description: '',
    });

    const [promotionalImage, setPromotionalImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { promotionId } = route?.params || {}; // Obtener el parámetro de navegación

    useEffect(() => {
        console.log('Promotion ID:', promotionId);
        if (promotionId) {
            const fetchPromotion = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`${API_URL}/api/promotion/get/${promotionId}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener datos de la promoción');
                    }
                    const data = await response.json();
                    setStepData({
                        title: data.title,
                        description: data.description,
                    });
                    setPromotionalImage(data.promotionalImageUrl);  // Cargar la imagen existente

                } catch (error) {
                    console.error('Error al obtener datos:', error);
                }
            };
            fetchPromotion();
        }
    }, [promotionId]);


    const handleInputChange = (e, value) => {
        if (e === 'title') {
            value = value.replace(/\d/g, '');
            if (value.length > 20) {
                setErrores(prevErrores => ({
                    ...prevErrores,
                    title: 'El titulo no puede tener más de 20 caracteres.',
                }));
                return; // No actualiza el estado si excede el límite de caracteres
            }
        }

        if (e === 'description') {
            // value = value.replace(/\d/g, '');
            if (value.length > 200) {
                setErrores(prevErrores => ({
                    ...prevErrores,
                    description: 'La descripción no puede tener más de 200 caracteres.',
                }));
                return; // No actualiza el estado si excede el límite de caracteres
            }
        }

        const nuevoStepData = { ...stepData, [e]: value };
        setStepData(nuevoStepData);

        const erroresValidacion = validarFormCP(
            nuevoStepData.title,
            nuevoStepData.description,
        );

        const todosCamposLlenos = nuevoStepData.title && nuevoStepData.description

        if (todosCamposLlenos) {
            setErrores(erroresValidacion);
        } else {
            setErrores(prevErrores => ({
                ...prevErrores,
                [e]: erroresValidacion[e] || '',
            }));
        }
    }

    const handleSave = async () => {
        const erroresForm = validarFormCP(
            stepData.title,
            stepData.description,
        );

        if (Object.keys(erroresForm).length > 0) {
            console.log('errores', erroresForm);
            setErrores(erroresForm);
            Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
            return false;

        } else {

            const formDataToSend = new FormData();
            formDataToSend.append('title', stepData.title);
            formDataToSend.append('description', stepData.description);

            if (promotionalImage) { 
                const imageName = promotionalImage.split('/').pop();
                const imageType = promotionalImage.endsWith('.png') ? 'image/png' : 'image/jpeg';
                // Agregar la imagen al FormData
                formDataToSend.append('promotionalImage', {
                    uri: promotionalImage,
                    name: imageName,
                    type: imageType,
                } as unknown as Blob);
                console.log('Imagen añadida correctamente');
                console.log(promotionalImage)
            }

            try {
                const endpoint = promotionId
                    ? `${API_URL}/api/promotion/update/${promotionId}`
                    : `${API_URL}/api/promotion/create/1`;

                const response = await fetch(endpoint, {
                    method: promotionId ? 'PUT' : 'POST',
                    body: formDataToSend,
                });

                if (response.ok) {
                    Alert.alert('Éxito', promotionId ? 'Promoción actualizada' : 'Promoción creada');
                    navigation.navigate('Promociones');
                } else {
                    console.log('Error al guardar la promoción');
                }
            } catch (error) {
                Alert.alert('Hubo un problema al editar la información vuelva a intentar guardarla nuenvamente');
            }
        }
    };

    return (
        <ScrollView>
            <View>
                <Header title={'Crear promoción'}
                    showLogo={false} onPress={() => navigation.goBack()} point={''} />
                <View style={styles.form}>
                    <View style={styles.conten}>
                        <Text style={styles.label}>Titulo</Text>
                        <TextInput
                            style={styles.input}
                            inputMode='text'
                            value={stepData.title}
                            onChangeText={(value) => handleInputChange('title', value)}
                        />
                        {errores.title && <Text style={{ color: 'red' }}>{errores.title}</Text>}

                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={styles.input}
                            inputMode='text'
                            value={stepData.description}
                            onChangeText={(value) => handleInputChange('description', value)}
                        />
                        {errores.description && <Text style={{ color: 'red' }}>{errores.description}</Text>}

                        <InputImage onImageSelect={(image) => setPromotionalImage(image.uri)} />
                        <ButtonIn buttonStyle={{ backgroundColor: '#308CFF', width: '100%', marginBottom: '10%' }}
                            Title={'Guardar'} textStyle={{ color: 'white' }}
                            onPress={handleSave} />
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

    label: {
        fontSize: 16,
        marginHorizontal: 5,
        marginTop: 10
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
