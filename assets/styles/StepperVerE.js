import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        left: 35,
        alignItems: 'center',
        width: '90%',
        marginTop: -20,
    },
    stepContent: {
        left: 25,
        width: '80%',
    },
    contCardPerfilP: {
        right: 15,
    },
    botonAnterior: {
        right: 30,
    },
    context: {
        alignItems: 'center',
        marginBottom: 30,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    },
    label:{
        fontSize: 16,
        marginHorizontal:5,
    },
    input: {
        height: 55,
        width: '100%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F7F7F7',
        color: 'black',
        marginBottom: 15,
    },

  //estilos del form Crear Expediente
    contenS: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap', 
        width: '100%',
    },
    inputContainer: {
        width: '45%',
    },
    
    //estilos de ver la informacion
    labelVerE: {
        fontSize: 18,
        marginBottom: 5,
    },
    labelInfo: {
        fontSize: 18,
        marginBottom: 15,
        marginHorizontal:5,
    },
    cardInf: {
        padding: 10,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    cardText: {
        fontSize: 18,
    },
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
    list: {
        marginBottom: 20,
    },
    contPoints: {
        flexDirection: 'row',
        paddingLeft: 10,
    },
    punto: {
        fontSize: 18,
    },
    item: {
        paddingLeft: 5,
        fontSize: 18,
    },
});

export default styles;