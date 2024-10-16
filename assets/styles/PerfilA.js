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
        padding: 8,
        elevation: 5,
        borderRadius: 25,
        width: '80%',
        height: 'auto',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },

    text2: {
        width: '100%',
        padding: 5,
        alignContent: 'center',
        alignItems: 'center',
    },
    
    title: {
        fontSize: 18,
        marginBottom: 10,
    },

    icon: {
        width: '100%',
        marginTop: '4%',
        position: 'absolute',
        alignItems: 'flex-end',
    },
    
    // estilos del modal de perfil y cerrar sesion
    centeredView: {
        padding: 5,
        width: '100%',
        marginTop: '8%',
        position: 'absolute',
        alignItems: 'flex-end',
    },
    
    modalView: {
        padding: 5,
        width: '30%',
        elevation: 5,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    
    modalText: {
        fontSize: 12,
        marginBottom: 4,
    },

    modalTextE: {
        marginBottom: 4,
        fontSize: 12,
    },
    info: {
        padding: 5,
    },
    
    infoContCard: {
        fontSize: 18,
        marginBottom: 8,
        flexDirection: 'row',
        
    },
    iconCard: {
        width: 30,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContText: {
        left: 5,
        width: '88%',
        alignSelf: 'center',
        
    },
    textEnd: {
        width: '75%',
        color:'#888888',
        alignSelf: 'center',
    },    
});

export default styles;