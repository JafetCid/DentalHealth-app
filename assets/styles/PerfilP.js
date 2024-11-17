import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        borderWidth: 5,
    },
    logoC: {
        position: 'absolute',
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    imgLogo: {
        height: 150,
        width: 150,
        borderRadius: 80,
    },
    titleN: {
        fontSize: 25,
        alignSelf: 'center',
    },
    // name: {
    //     fontSize: 25,
    // },
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
        marginBottom: 30,
    },

    text: {
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
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    
    modalView: {
        padding: 5,
        right: '15%',
        elevation: 5,
        marginTop: '-10%',
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
    infoContCardCake: {
        fontSize: 18,
        marginBottom: 10,
        flexDirection: 'row',
        width: '100%',
        right: 4,
    },
    infoContCard: {
        fontSize: 18,
        marginBottom: 10,
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
        width: '80%',
        alignSelf: 'center',
        
    },
    textInf: {
        fontSize: 18,
    },
    textCard: {
        color:'#888888',
        fontSize: 15,
    },
    textEnd: {
        fontSize: 18,
        width: '75%',
        color:'#888888',
        alignSelf: 'center',

    },  
    
    //Estilos de los botones 
    buttonContainer: {
        flexDirection: 'row',         
        justifyContent: 'space-around', 
        // width: '80%',           
        // marginTop: 90,               
    },
    buttonAgendar: {
        backgroundColor: '#308CFF',
        padding: 10,
        borderRadius: 100,
        width: 'auto',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;