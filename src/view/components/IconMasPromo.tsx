import { TouchableOpacity, Image, StyleSheet } from "react-native";


export default function IconMasPromo({ navigation }) {
    return(
        <TouchableOpacity style={styles.img} onPress={() => navigation.navigate('CrearP')}>
            <Image source={require('../../../assets/images/PlusCircleFill.png')}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    img: {
        marginTop: 50,
        alignItems: 'center',
        marginBottom: 20,
    }
})