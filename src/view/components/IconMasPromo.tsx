
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Image, StyleSheet } from "react-native";


export default function IconMasPromo({ navigation }) {
    return(
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CrearP')}>
            {/**<Image source={require('../../../assets/images/PlusCircleFill.png')}/>*/}
            <Ionicons name="add-outline" size={50} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addButton: {
        marginTop: 50,
        alignItems: 'center',
        marginBottom: 20,
        color:'red',
        backgroundColor: '#2f95dc',
        //position: 'absolute',
        bottom: 30,
        shadowColor: '#ccc', // Color de la sombra
        borderRadius: 25,
        
    },
    addButton1: {
        //right: 30,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        
        },
})
