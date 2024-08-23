import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    title: {
        fontSize: 24,
        marginBottom: 40,
    },
    formC: {
        alignItems: 'center',
    },
    form: {
        width: '80%',
        marginTop: 15,
    },
    textI: {
        fontSize: 18,
    },
    input: {
        height: 55,
        width: '100%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F7F7F7',
    },
    link: {
        marginTop: 20,
        alignSelf:'flex-end',
    },
    linkText: {
        // color: '#6200ee',
        fontSize: 12, 
        textDecorationLine: 'none',
    },
    cuent: {
        justifyContent: 'space-between',
        width: '65%',
        flexDirection: 'row',
        marginTop: 10,
        fontSize: 14,
    },
    linkR: {
        textDecorationLine: 'underline',
    },
    aviso: {
        marginTop: 10,
    },

});

export default styles;
