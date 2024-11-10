import { useState } from 'react';
import { ScrollView } from "react-native";
import Header from "../components/Header";
import IconMasPromo from "../components/IconMasPromo";
import CardPromociones from "../components/CardPromociones";

export default function Promociones({ navigation }) {
    
    const [isVisible, setIsVisible] = useState(false);

    return(
        <ScrollView>
            <Header title={'Promociones'} showLogo={false} onPress={() => navigation.goBack()} point={''}/>
            <CardPromociones/>
            <CardPromociones/>
            <IconMasPromo 
                onPress={() => navigation.navigate('CrearP')} 
                iconStyle={{ alignSelf: 'center',}}/>
        </ScrollView>
    )
}