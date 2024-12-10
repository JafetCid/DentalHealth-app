import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        marginTop: '5%',
    },
    
    card: {
        flexDirection: 'row',
        overflow: 'hidden',
        justifyContent: 'space-between',
        borderRadius: 25,
        width: '85%',
        backgroundColor: '#fff',
        elevation: 5,
        marginBottom: 30,
    },

    img: {
        width: '28%',
        // height: '100%',
        aspectRatio: 0.5,  // Controla la relación de aspecto de la imagen (puedes ajustarlo según tu diseño)
    },

    title: {
        marginBottom: 3,
    },

    icon: {
        padding: 8,
    },

    text: {
        width: '58%',
        padding: 5,
    },
    // estilos del modal de perfil y cerrar sesion
    centeredView: {
        position: 'absolute',
        padding: 5,
        width: '100%',
    },
    
    modalView: {
        backgroundColor: 'white',
        marginLeft: '63%',
        width: '30%',
        borderRadius: 8,
        padding: 10,
        elevation: 5,
    },

    modalText: {
        marginBottom: 4,
        fontSize: 12,
    },

    modalTextE: {
        marginBottom: 4,
        fontSize: 12,
        color: 'red',
    },

    // estilos del modal
    centeredViewM: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalViewM: {
        width: '80%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '30%',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonClose2: {
        backgroundColor: '#FF0000',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTextM: {
        marginBottom: 15,
        fontSize: 24,
    },
    btnModal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

export default styles;
