import { StyleSheet } from 'react-native';

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
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'space-between',
    },
    cell: {
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
        color: 'black',
    },
    selectedText: {
        color: 'white',
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
    quadrantNino: {
        justifyContent: 'space-around',
        alignSelf: 'center',
        width: '80%',
    },
    teethRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    colorWheel: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
    },
    content: {
        alignItems: 'center',
        height: 45,
        width: '45%',
        // width: '100%',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 5,
    },
    sano: {
        borderWidth: 0.5,
    },
    cariado: {
        backgroundColor: '#FF1010',
    },
    obturado: {
        backgroundColor: '#308CFF',
    },
    odP: {
        borderWidth: 1,
        borderColor: '#FF1010',
    },
    odR: {
        borderWidth: 1,
        borderColor: '#308CFF',
    },
    extI: {
        borderWidth: 1,
        borderColor: '#FF1010',
        borderStyle: 'dashed',
    },
    protesisF: {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
    },
    protesisP: {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'dotted',
    },
    closeButton: {
        width: 40,
        // top: 550,
        bottom: 250,
        height: 40,
        borderRadius: 30,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        // zIndex: 1,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    //fin del modal
    
    
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
    colorTextOne: {
        color: 'white',
        fontSize: 16,
    },
    colorText: {
        color: 'black',
        fontSize: 16,
    },
});

export default styles;

        // odontogramTable: {
        //     borderWidth: 1,
        //     borderColor: '#ccc',
        //     borderRadius: 8,
        //     padding: 10,
        //     marginBottom: 20,
        // },
        // odontogramRow: {
        //     flexDirection: 'row',
        //     justifyContent: 'space-between',
        //     paddingVertical: 5,
        //     borderWidth: 1,
        //     borderColor: 'blue',
        // },
        // odontogramText: {
        //     fontSize: 16,
        //     borderWidth: 1,
        //     borderColor: 'red',
        // },