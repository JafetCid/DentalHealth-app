import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contLT: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '30%',
        width: '90%',
        padding: 10,
    },
    icon: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    contName: {
        width: '60%',
    },
    name: {
        fontSize: 24,
        color: 'white',
    },
    contNameExp: {
        right: 0,
        padding: 15,
        marginTop: '10%',
        position: 'absolute',
        alignItems: 'flex-end',
    },
    nameExp: {
        fontSize: 18,
        color: 'white',
    },
    fechaExp: {
        fontSize: 15,
        color: 'white',
    },
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