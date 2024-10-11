import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    FlatList,
    ScrollView
} from 'react-native';
import { Provider } from 'react-native-paper';
import HeaderNoIcon from './components/HeaderNoIcon';
import { AntDesign } from '@expo/vector-icons';
import Header from './components/Header';

const DentalExamCreateScreen = ({ navigation }) => {
    const [selectedType, setSelectedType] = useState('Adulto');
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [showColorSelector, setShowColorSelector] = useState(false);
    const [toothStates, setToothStates] = useState({});

    const odontogramData = [
        { description: 'Sano', symbol: 'Sin marca' },
        { description: 'Cariado', symbol: 'Rojo' },
        { description: 'Obturado', symbol: 'Azul' },
        { description: 'O.d. perdido', symbol: 'Círculo rojo' },
        { description: 'O.d. reemplazado', symbol: 'Círculo azul' },
        { description: 'Ext. indicada', symbol: 'Línea roja' },
        { description: 'Prótesis fija', symbol: '======' },
        { description: 'Prótesis parcial y removible', symbol: '------' },
    ];

    const teethQuadrants = [
        { quadrant: 'Cuadrante 1', teeth: [18, 17, 16, 15, 14, 13, 12, 11] },
        { quadrant: 'Cuadrante 2', teeth: [21, 22, 23, 24, 25, 26, 27, 28] },
        { quadrant: 'Cuadrante 3', teeth: [31, 32, 33, 34, 35, 36, 37, 38] },
        { quadrant: 'Cuadrante 4', teeth: [48, 47, 46, 45, 44, 43, 42, 41] },
    ];

    const handleToothPress = (tooth) => {
        setSelectedTooth(tooth);
        setShowColorSelector(true);
    };

    const applyColorToTooth = (color) => {
        setToothStates((prev) => ({
            ...prev,
            [selectedTooth]: color,
        }));
        setShowColorSelector(false);
    };

    const renderOdontogramRow = ({ item }) => (
        <View style={styles.odontogramRow}>
            <Text style={styles.odontogramText}>{item.description}</Text>
            <Text style={styles.odontogramText}>{item.symbol}</Text>
        </View>
    );

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
                    <View style={styles.odontogramTable}>
                        <FlatList
                            data={odontogramData}
                            renderItem={renderOdontogramRow}
                            keyExtractor={(item) => item.description}
                        />
                    </View>

                    {/* Adulto/Niño Buttons */}
                    <Text style={styles.teethTitle}>Nomenclatura FDI</Text>
                    <View style={styles.selectionContainer}>
                        <TouchableOpacity
                            style={[styles.selectionButton, selectedType === 'Adulto' && styles.selectedButton]}
                            onPress={() => setSelectedType('Adulto')}
                        >
                            <Text style={styles.selectionText}>Adulto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectionButton, selectedType === 'Niño' && styles.selectedButton]}
                            onPress={() => setSelectedType('Niño')}
                        >
                            <Text style={styles.selectionText}>Niño</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Teeth Quadrants */}
                    <View style={styles.teethSection}>
                        {teethQuadrants.map((quadrant) => (
                            <View key={quadrant.quadrant} style={styles.quadrant}>
                                <Text style={styles.quadrantTitle}>{quadrant.quadrant}</Text>
                                <View style={styles.teethRow}>
                                    {quadrant.teeth.map((tooth) => (
                                        <TouchableOpacity
                                            key={tooth}
                                            style={[
                                                styles.tooth,
                                                { backgroundColor: toothStates[tooth] || '#fff' },
                                            ]}
                                            onPress={() => handleToothPress(tooth)}
                                        >
                                            <Text style={styles.toothNumber}>{tooth}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Seleccion del color Modal */}
                    {/* <Modal visible={showColorSelector} transparent={true} animationType="slide">
                        <View style={styles.modalOverlay}>
                            <View style={styles.colorWheel}>
                                <TouchableOpacity
                                    style={[styles.colorOption, styles.red]}
                                    onPress={() => applyColorToTooth('red')}
                                >
                                    <Text style={styles.colorText}>Cariado</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.colorOption, styles.blue]}
                                    onPress={() => applyColorToTooth('blue')}
                                >
                                    <Text style={styles.colorText}>Obturado</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.colorOption, styles.transparent]}
                                    onPress={() => applyColorToTooth('transparent')}
                                >
                                    <Text style={styles.colorText}>OD Perdido</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.colorOption, styles.green]}
                                    onPress={() => applyColorToTooth('green')}
                                >
                                    <Text style={styles.colorText}>OD Reemplazado</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setShowColorSelector(false)}
                                >
                                    <Text style={styles.closeButtonText}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal> */}
                    <Modal visible={showColorSelector} transparent={true} animationType="slide">
  <View style={styles.modalOverlay}>
    <View style={styles.colorWheel}>
      {/* Cariado */}
      <TouchableOpacity
        style={[styles.colorOption, styles.red, styles.topLeft]}
        onPress={() => applyColorToTooth('red')}
      >
        <Text style={styles.colorText}>Cariado</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.colorOption, styles.topOrange]}
        onPress={() => applyColorToTooth('')}
      >
        <Text style={styles.colorText}>Sano</Text>
      </TouchableOpacity>

      {/* Obturado */}
      <TouchableOpacity
        style={[styles.colorOption, styles.blue, styles.topRight]}
        onPress={() => applyColorToTooth('blue')}
      >
        <Text style={styles.colorText}>Obturado</Text>
      </TouchableOpacity>

      {/* OD Perdido */}
      <TouchableOpacity
        style={[styles.colorOption, styles.transparent, styles.bottomRight]}
        onPress={() => applyColorToTooth('transparent')}
      >
        <Text style={styles.colorText}>OD Perdido</Text>
      </TouchableOpacity>

      {/* OD Reemplazado */}
      <TouchableOpacity
        style={[styles.colorOption, styles.green, styles.bottomLeft]}
        onPress={() => applyColorToTooth('green')}
      >
        <Text style={styles.colorText}>OD Reemplazado</Text>
      </TouchableOpacity>

      {/* Prótese fija */}
      <TouchableOpacity
        style={[styles.colorOption, styles.dashed, styles.centerLeft]}
        onPress={() => applyColorToTooth('yellow')}
      >
        <Text style={styles.colorText1}>Pro fija</Text>
      </TouchableOpacity>

      {/* Prótese parcial */}
      <TouchableOpacity
        style={[styles.colorOption, styles.dotted, styles.centerRight]}
        onPress={() => applyColorToTooth('grey')}
      >
        <Text style={styles.colorText}>Prótese parcial</Text>
      </TouchableOpacity>

      {/* Ext. indicada */}
      <TouchableOpacity
        style={[styles.colorOption, styles.dottedRed, styles.centerLeftR]}
        onPress={() => applyColorToTooth('pink')}
      >
        <Text style={styles.colorText}>Ext. indicada</Text>
      </TouchableOpacity>

      {/* Botón de cerrar */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setShowColorSelector(false)}
      >
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


                    {/* Save Button */}
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        top:-50,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 30,
    },
    textT: {
        fontSize: 16,
        marginBottom: 10,
    },
    odontogramTable: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    odontogramRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    odontogramText: {
        fontSize: 16,
    },
    selectionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    selectionButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
    },
    selectedButton: {
        backgroundColor: '#4A90E2',
    },
    selectionText: {
        fontSize: 16,
        color: '#000',
    },
    teethSection: {
        marginBottom: 20,
    },
    teethTitle: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    quadrant: {
        marginBottom: 20,
    },
    quadrantTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    teethRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tooth: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    toothNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    // estilos de modal
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      colorWheel: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: 20,
      },
      colorOption: {
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      },
    //rojo
    topLeft: {
        top: 10,
        left: 70,
    },
    //azul
    topRight: {
        top: 10,
        right: 70,
      },
    //verde
    bottomLeft: {
        top: 220,
        right: 70,
    },
    //linea roja
    bottomRight: {
        right: 8,
        top: 75,
    },
    //lineas negras
    centerLeft: {
        top: 220,
        left: 70,
    },
    //protesis parcial
    centerRight: {
        top: 160,
        right: 10,
    },
    //liena roja punteada
    centerLeftR: {
        top: 160,
        left: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    //sano
    topOrange: {
        left: 8,
        top: 75,
        borderWidth: 1,
    },
      red: {
        backgroundColor: '#FF1010',
      },
      blue: {
        backgroundColor: '#308CFF',
      },
      green: {
        backgroundColor: '#00ff00',
      },
      transparent: {
        borderWidth: 1,
        borderColor: '#ff0000',
      },
      dashed: {
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'dashed',
      },
      dotted: {
        borderWidth: 2,
        borderColor: 'grey',
        borderStyle: 'dotted',
      },
      dottedRed: {
        borderWidth: 2,
        borderColor: 'grey',
        borderStyle: 'dotted',
      },
      colorText1: {
        color: 'black',
        textAlign: 'center',
      },
      closeButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
      },
      closeButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
      },

    saveButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 50,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 45,
        left: 20,
    },
    colorText: {
        color: 'black',
    }
});

export default DentalExamCreateScreen;
