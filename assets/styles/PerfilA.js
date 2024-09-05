import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        alignSelf: 'center',
    },
    content: {
        alignItems: 'center',
        marginTop: '5%',
    },
    
    card: {
        overflow: 'hidden',
        borderRadius: 25,
        width: '85%',
        height: 'auto',
        backgroundColor: '#fff',
        elevation: 5,
        padding: 8,
    },

    text2: {
        width: '100%',
        padding: 5,
        alignContent: 'center',
        alignItems: 'center',
    },
    
    title: {
        fontSize: 18,
    },

    icon: {
        position: 'absolute',
        width: '100%',
        alignItems: 'flex-end',
        marginTop: '4%',
    },
    
    // estilos del modal de perfil y cerrar sesion
    centeredView: {
        position: 'absolute',
        padding: 5,
        width: '100%',
        alignItems: 'flex-end',
        marginTop: '8%',
    },
    
    modalView: {
        backgroundColor: 'white',
        width: '30%',
        borderRadius: 8,
        padding: 5,
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
    info: {
        borderColor: 'black',
        borderWidth: 1,
    }
    
});

export default styles;