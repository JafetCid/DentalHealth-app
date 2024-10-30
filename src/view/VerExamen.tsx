import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView
} from 'react-native';
import { Provider } from 'react-native-paper';
import styles from '../../assets/styles/ExamAdult';
import Header from './components/Header';
import dayjs from 'dayjs'; // Asegúrate de tener dayjs instalado para el manejo de fechas

const VerDentalExamScreen = ({ navigation }) => {
    const [selectedType, setSelectedType] = useState('Adulto');
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [showColorSelector, setShowColorSelector] = useState(false);
    const [toothStates, setToothStates] = useState({});
    const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm')); // Formato de hora
    const [currentDate, setCurrentDate] = useState(dayjs().format('DD/MM/YYYY')); // Formato de fecha

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs().format('HH:mm'));
            setCurrentDate(dayjs().format('DD/MM/YYYY'));
        }, 60000); // Actualiza la hora y fecha cada minuto
        return () => clearInterval(timer); // Limpia el intervalo cuando el componente se desmonta
    }, []);

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

    const currentTeethQuadrants = selectedType === 'Adulto' ? teethQuadrants : teethQuadrantsNino;

    const handleToothPress = (tooth) => {
        setSelectedTooth(tooth);
        setShowColorSelector(true);
    };

    const applyColorToTooth = (color) => {
        let newToothState = {};
        switch (color) {
            case 'sano':
                newToothState = { backgroundColor: 'white' }; 
                break;
            case 'cariado':
                newToothState = { backgroundColor: '#FF1010' }; 
                break;
            case 'obturado':
                newToothState = { backgroundColor: '#308CFF' }; 
                break;
            case 'odPerdido':
                newToothState = { borderColor: '#FF1010', borderWidth: 2, borderStyle: 'solid' }; 
                break;
            case 'odReemplazado':
                newToothState = { borderColor: '#308CFF', borderWidth: 2, borderStyle: 'solid' }; 
                break;
            case 'extIndicada':
                newToothState = { backgroundColor: 'white', borderColor: '#FF1010', borderWidth: 2, borderStyle: 'dashed' }; 
                break;
            case 'protesisFija':
                newToothState = { backgroundColor: 'white', borderColor: 'black', borderWidth: 2, borderStyle: 'dashed' }; 
                break;
            case 'protesisParcial':
                newToothState = { backgroundColor: 'white', borderColor: 'black', borderWidth: 2, borderStyle: 'dotted' }; 
                break;
        }

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

                {/* Sección de fecha y hora */}
                <View style={styles.datetimeContainer}>
                    <Text style={styles.currentDate}>{currentDate}</Text>
                    <Text style={styles.currentTime}>{currentTime}</Text>
                </View>

                <View style={styles.container}>
                    {/* Title */}
                    <Text style={styles.title}>Examen Dental</Text>
                    <Text style={styles.textT}>Odontograma</Text>

                    {/* Título del odontograma */}
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.cell}>Sano</Text>
                            <Text style={styles.cell}>Sin marca</Text>
                        </View>
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

                    {/* Botones Adulto/Niño */}
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

                    {/* Cuadrantes Dentales */}
                    <View style={styles.teethSection}>
                        {currentTeethQuadrants.map((quadrant) => (
                            <View key={quadrant.quadrant} style={styles.quadrant}>
                                <Text style={styles.quadrantTitle}>{quadrant.quadrant}</Text>
                                <View style={[styles.teethRow, selectedType === 'Niño' && styles.quadrantNino]}>
                                    {quadrant.teeth.map((tooth) => {
                                        const toothState = toothStates[tooth] || { backgroundColor: '#fff', borderColor: 'transparent', borderWidth: 0 };
                                        return (
                                            <TouchableOpacity
                                                key={tooth}
                                                style={[styles.tooth, {
                                                    backgroundColor: toothState.backgroundColor,
                                                    borderColor: toothState.borderColor,
                                                    borderWidth: toothState.borderWidth,
                                                    borderStyle: toothState.borderStyle || 'solid'
                                                }]}
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
                            <TouchableOpacity
                                style={styles.closeModalButton}
                                onPress={() => setShowColorSelector(false)}
                            >
                                <Text style={styles.closeModalButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                            <View style={styles.colorSelector}>
                                <TouchableOpacity style={[styles.sano, styles.content]} onPress={() => applyColorToTooth('sano')}>
                                    <Text style={styles.colorText}>Sano</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.cariado, styles.content]} onPress={() => applyColorToTooth('cariado')}>
                                    <Text style={styles.colorText}>Cariado</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.obturado, styles.content]} onPress={() => applyColorToTooth('obturado')}>
                                    <Text style={styles.colorText}>Obturado</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.odPerdido, styles.content]} onPress={() => applyColorToTooth('odPerdido')}>
                                    <Text style={styles.colorText}>O.d Perdido</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.odReemplazado, styles.content]} onPress={() => applyColorToTooth('odReemplazado')}>
                                    <Text style={styles.colorText}>O.d Reemplazado</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.extIndicada, styles.content]} onPress={() => applyColorToTooth('extIndicada')}>
                                    <Text style={styles.colorText}>Ext. indicada</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.pf, styles.content]} onPress={() => applyColorToTooth('protesisFija')}>
                                    <Text style={styles.colorText}>Prótesis fija</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.pp, styles.content]} onPress={() => applyColorToTooth('protesisParcial')}>
                                    <Text style={styles.colorText}>Prótesis parcial</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </Provider>
    );
};

export default VerDentalExamScreen;
