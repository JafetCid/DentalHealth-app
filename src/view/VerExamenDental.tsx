import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { Provider } from 'react-native-paper';
import styles from '../../assets/styles/VerExamenD';
import Header from './components/Header';

const VerExamenDental = ({ navigation }) => {
    const [selectedType, setSelectedType] = useState('Adulto');
    const [toothStates, setToothStates] = useState({});

    const teethQuadrants = [
        { quadrant: 'Cuadrante 1', teeth: [18, 17, 16, 15, 14, 13, 12, 11] },
        { quadrant: 'Cuadrante 2', teeth: [21, 22, 23, 24, 25, 26, 27, 28] },
        { quadrant: 'Cuadrante 3', teeth: [31, 32, 33, 34, 35, 36, 37, 38] },
        { quadrant: 'Cuadrante 4', teeth: [48, 47, 46, 45, 44, 43, 42, 41] },
    ];

    const teethQuadrantsNino = [
        { quadrant: 'Cuadrante 5', teeth: [55, 54, 53, 52, 51] },
        { quadrant: 'Cuadrante 6', teeth: [61, 62, 63, 64, 65] },
        { quadrant: 'Cuadrante 7', teeth: [71, 72, 73, 74, 75] },
        { quadrant: 'Cuadrante 8', teeth: [85, 84, 83, 82, 81] },
    ];

    // Selección dinámica de cuadrantes según el tipo seleccionado
    const currentTeethQuadrants = selectedType === 'Adulto' ? teethQuadrants : teethQuadrantsNino;
    
    return (
        <Provider>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Header title={''} showLogo={false} onPress={() => navigation.goBack()} point={''}/>
                <View style={styles.contLT}>
                    <Image source={require('../../assets/images/Genshi.jpeg')} style={styles.icon}/>
                    <View style={styles.contName}>
                        <Text style={styles.name}>Noelia de los Angeles</Text>
                    </View>
                </View>
                <View style={styles.contNameExp}>
                    <Text style={styles.nameExp}>Expediente N° 02</Text>
                    <Text style={styles.fechaExp}>02/05/2024</Text>
                </View>
                <View style={styles.container}>
                    {/* Title */}
                    <Text style={styles.title}>Examen Dental</Text>
                    <Text style={styles.textT}>Odontograma</Text>
                    
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.cell}>Sano</Text>
                            <Text style={styles.cell}>Sin marca</Text>
                        </View >
                        <View style={styles.row}>
                            <Text style={styles.cell}>Cariado</Text>
                            <Text style={styles.cell}>Rojo</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>Obturado</Text>
                            <Text style={styles.cell}>Azul</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>O.d. perdido</Text>
                            <Text style={styles.cell}>Círculo rojo</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>O.d. reemplazado</Text>
                            <Text style={styles.cell}>Círculo azul</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>Ext. indicada</Text>
                            <Text style={styles.cell}>Línea roja</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>Prótesis fija</Text>
                            <Text style={styles.cell}>=====</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cell}>Prótesis parcial y removible</Text>
                            <Text style={styles.cell}>------</Text>
                        </View>
                    </View>
                    
                    {/* Adulto/Niño Buttons */}
                    <Text style={styles.teethTitle}>Nomenclatura FDI</Text>
                    <View style={styles.selectionContainer}>
                        <TouchableOpacity
                            style={[styles.selectionButton, selectedType === 'Adulto' && styles.selectedButton]}
                            onPress={() => setSelectedType('Adulto')}
                        >
                            <Text style={[styles.selectionText, selectedType === 'Adulto' && styles.selectedText]}>Adulto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectionButton, selectedType === 'Niño' && styles.selectedButton]}
                            onPress={() => setSelectedType('Niño')}
                        >
                            <Text style={[styles.selectionText, selectedType === 'Niño' && styles.selectedText]}>Niño</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Teeth Quadrants */}
                    <View style={styles.teethSection}>
                        {currentTeethQuadrants.map((quadrant) => (
                            <View key={quadrant.quadrant} style={styles.quadrant}>
                                <Text style={styles.quadrantTitle}>{quadrant.quadrant}</Text>
                                <View style={[styles.teethRow, selectedType === 'Niño' && styles.quadrantNino]}>
                                {quadrant.teeth.map((tooth) => {
                                    const toothState = toothStates[tooth] || { backgroundColor: '#fff',
                                         borderColor: 'transparent', borderWidth: 0 }; // Valor por defecto
                                    return (
                                        <View
                                            key={tooth}
                                            style={[
                                                styles.tooth,
                                                { 
                                                    backgroundColor: toothState.backgroundColor,
                                                    borderColor: toothState.borderColor,
                                                    borderWidth: toothState.borderWidth,
                                                    borderStyle: toothState.borderStyle || 'solid' // Usar estilo sólido por defecto
                                                }
                                            ]}>
                                                <Text style={styles.toothNumber}>{tooth}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        ))}
                    </View>
                    
                </View>
            </ScrollView>
        </Provider>
    );
};

export default VerExamenDental;