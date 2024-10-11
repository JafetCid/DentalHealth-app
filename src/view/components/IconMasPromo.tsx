import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default function IconMasPromo({ navigation }) {
    return(
        <TouchableOpacity style={styles.img} onPress={() => navigation.navigate('CrearP')}>
            <Ionicons name="add-outline" size={50} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    img: {
        backgroundColor: '#2f95dc',
        alignSelf: 'center',
        borderRadius: 25,
        marginBottom: 20,
        marginTop: 50,
        elevation: 4,
        width: 50,
    }
})