import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default function IconMasPromo({ iconStyle, onPress }) {
    return(
        <View style={[styles.iconS, iconStyle]}>
            <TouchableOpacity style={styles.img} onPress={onPress}>
                <Ionicons name="add-outline" size={50} color="white"/>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        backgroundColor: '#2f95dc',
        borderRadius: 25,
        marginBottom: 20,
        marginTop: 50,
        elevation: 4,
        width: 50,
    },
    iconS: {
        width: 50,
    },
})