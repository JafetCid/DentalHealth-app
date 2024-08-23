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
    },

    img: {
        width: '28%',
        height: '100%',
    },

    title: {
        marginBottom: 3,
    },

    icon: {
        padding: 8,
        height: '50%',
        
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

});

export default styles;
