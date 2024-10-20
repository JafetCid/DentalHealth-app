import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    ScrollView
} from 'react-native';
import { Provider } from 'react-native-paper';
import styles from '../../assets/styles/ExamAdult';
import Header from './components/Header';

const DentalExamCreateScreen = ({ navigation }) => {
    const [selectedType, setSelectedType] = useState('Adulto');
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [showColorSelector, setShowColorSelector] = useState(false);
    const [toothStates, setToothStates] = useState({});

    // const odontogramData = [
    //     { description: 'Sano', symbol: 'Sin marca' },
    //     { description: 'Cariado', symbol: 'Rojo' },
    //     { description: 'Obturado', symbol: 'Azul' },
    //     { description: 'O.d. perdido', symbol: 'Círculo rojo' },
    //     { description: 'O.d. reemplazado', symbol: 'Círculo azul' },
    //     { description: 'Ext. indicada', symbol: 'Línea roja' },
    //     { description: 'Prótesis fija', symbol: '======' },
    //     { description: 'Prótesis parcial y removible', symbol: '------' },
    // ];
    
    // const renderOdontogramRow = ({ item }) => (
    //     <View style={styles.odontogramRow}>
    //         <Text style={styles.odontogramText}>{item.description}</Text>
    //         <Text style={styles.odontogramText}>{item.symbol}</Text>
    //     </View>
    // );

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

    const handleToothPress = (tooth) => {
        setSelectedTooth(tooth);
        setShowColorSelector(true);
    };

    const applyColorToTooth = (color) => {
        let newToothState = {};
        
        // Define el color de fondo y el estilo de borde basado en la opción seleccionada
        switch (color) {
            case 'sano':
                newToothState = { backgroundColor: 'white' }; // Sano: Rojo de fondo
                break;
            case 'cariado':
                newToothState = { backgroundColor: '#FF1010' }; // Cariado: Rojo de fondo
                break;
            case 'obturado':
                newToothState = { backgroundColor: '#308CFF' }; // Obturado: Azul de fondo
                break;
            case 'odPerdido':
                newToothState = { borderColor: '#FF1010', borderWidth: 2, borderStyle: 'solid' }; // O.d. Perdido
                break;
            case 'odReemplazado':
                newToothState = { borderColor: '#308CFF', borderWidth: 2, borderStyle: 'solid' }; // O.d. Reemplazado
                break;
            case 'extIndicada':
                newToothState = { backgroundColor: 'white', borderColor: '#FF1010', borderWidth: 2, borderStyle: 'dashed' }; // Otras opciones con contorno punteado
                break;
            case 'protesisFija':
                newToothState = { backgroundColor: 'white', borderColor: 'black', borderWidth: 2, borderStyle: 'dashed' }; // Otras opciones con contorno punteado
                break;
            case 'protesisParcial':
                newToothState = { backgroundColor: 'white', borderColor: 'black', borderWidth: 2, borderStyle: 'dotted' }; // Otras opciones con contorno punteado
                break;
        }
    
        // Actualizar el estado del diente
        setToothStates((prev) => ({
            ...prev,
            [selectedTooth]: newToothState,
        }));
        setShowColorSelector(false);
    };
    
    return (
        <Provider>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Header showLogo={false} title={'Crear examen dental'} onPress={() => navigation.goBack()}/>
                    {/**Papi tengo dudas aqui tambien haber si le pedes checar por
                     * que no me muesta nosla vista actualizada :,C
                     */}
                <View style={styles.container}>
                    {/* Title */}
                    <Text style={styles.title}>Examen Dental</Text>
                    <Text style={styles.textT}>Odontograma</Text>

                    {/* Odontogram Table */}
                    {/* <View style={styles.odontogramTable}>
                        <FlatList
                            data={odontogramData}
                            renderItem={renderOdontogramRow}
                            keyExtractor={(item) => item.description}
                        />
                    </View> */}

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
                                        <TouchableOpacity
                                            key={tooth}
                                            style={[
                                                styles.tooth,
                                                { 
                                                    backgroundColor: toothState.backgroundColor,
                                                    borderColor: toothState.borderColor,
                                                    borderWidth: toothState.borderWidth,
                                                    borderStyle: toothState.borderStyle || 'solid' // Usar estilo sólido por defecto
                                                }
                                            ]}
                                            onPress={() => handleToothPress(tooth)}
                                        >
                                                <Text style={styles.toothNumber}>{tooth}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        ))}
                    </View>
                    <Modal 
                        visible={showColorSelector} 
                        transparent={true} 
                        animationType="slide">
                        <View style={styles.modalOverlay}>
                                {/* Botón de cerrar */}
                                <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setShowColorSelector(false)}
                                >
                                    <Text style={styles.closeButtonText}>X</Text>
                                </TouchableOpacity>
                            <View style={styles.colorWheel}>
                                {/* sano */}
                                <TouchableOpacity
                                style={[styles.sano, styles.content]}
                                onPress={() => applyColorToTooth('sano')}
                                >
                                    <Text style={styles.colorText}>Sano</Text>
                                </TouchableOpacity>
                                {/* Cariado */}
                                <TouchableOpacity
                                style={[styles.cariado, styles.content]}
                                onPress={() => applyColorToTooth('cariado')}
                                >
                                    <Text style={styles.colorTextOne}>Cariado</Text>
                                </TouchableOpacity>

                                {/* Obturado */}
                                <TouchableOpacity
                                style={[styles.obturado, styles.content]}
                                onPress={() => applyColorToTooth('obturado')}
                                >
                                    <Text style={styles.colorTextOne}>Obturado</Text>
                                </TouchableOpacity>

                                {/* OD Perdido */}
                                <TouchableOpacity
                                style={[styles.odP, styles.content]}
                                onPress={() => applyColorToTooth('odPerdido')}
                                >
                                    <Text style={styles.colorText}>O.d Perdido</Text>
                                </TouchableOpacity>

                                {/* OD Reemplazado */}
                                <TouchableOpacity
                                style={[styles.odR, styles.content]}
                                onPress={() => applyColorToTooth('odReemplazado')}
                                >
                                    <Text style={styles.colorText}>O.d Reemplazado</Text>
                                </TouchableOpacity>

                                {/* Ext. indicada */}
                                <TouchableOpacity
                                style={[styles.extI, styles.content]}
                                onPress={() => applyColorToTooth('extIndicada')}
                                >
                                    <Text style={styles.colorText}>Ext. indicada</Text>
                                </TouchableOpacity>
                                {/* Prótese fija */}
                                <TouchableOpacity
                                style={[styles.protesisF, styles.content]}
                                onPress={() => applyColorToTooth('protesisFija')}
                                >
                                    <Text style={styles.colorText}>Prótesis fija</Text>
                                </TouchableOpacity>

                                {/* Prótese parcial */}
                                <TouchableOpacity
                                style={[styles.protesisP, styles.content]}
                                onPress={() => applyColorToTooth('protesisParcial')}
                                >
                                    <Text style={styles.colorText}>Prótesis parcial y removible</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* Save Button */}
                    <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('ExamDent')}>
                        <Text style={styles.saveButtonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Provider>
    );
};

export default DentalExamCreateScreen;
