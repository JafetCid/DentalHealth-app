import { TextInput, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../../assets/styles/Login';
import Header from "./components/Header";
import ButtonIn from './components/ButtonIn';
import GoogleIconButton from './components/GoogleIconB';

export default function Login ({ navigation }) {
    // const [isSelected, setSelection] = useState(false);
    return(
        <ScrollView>
            <View>
                <Header title={''}/>
                <View style={styles.container}>
                    <Text style={styles.title}> Bienvenido de nuevo </Text>
                </View>
                <View style={styles.formC}>
                    <View style={styles.form}>
                        <Text style={styles.textI}>Usuario</Text>
                        <TextInput style={styles.input}/>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.textI}>Contraseña</Text>
                        <TextInput style={styles.input}/>
                        <TouchableOpacity style={styles.link}>
                            <Text style={styles.linkText}> ¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                    </View>
                    <ButtonIn 
                        Title={'Iniciar sesión '} textStyle={{color: '#308CFF'}} 
                        buttonStyle={{borderColor: '#308CFF', borderWidth: 1, marginTop: 30}} 
                        onPress={() => navigation.navigate('Inicio')}/>
                    <View style={styles.cuent}>
                        <Text>¿Cuentas con una cuenta?</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkR}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.aviso}>
                            <Text style={styles.linkR}>Aviso de privacidad</Text>
                        </TouchableOpacity>
                    </View>
                    <GoogleIconButton/>
                </View> 
            </View>
        </ScrollView>
        
    )
}