import { View, Image, TouchableOpacity, Modal, Alert, Text, Pressable } from "react-native";
import Header from "./components/Header";
import styles from "../../assets/styles/CardPromociones";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CardPromociones from "./components/CardPromociones";
import { ScrollView } from "react-native";
import IconMasPromo from "./components/IconMasPromo";

export default function Promociones() {
    
    const [isVisible, setIsVisible] = useState(false);
    const navigation = useNavigation();

    return(
        <ScrollView>
            
                <Header title={'Promociones'} showLogo={false}/>
                <CardPromociones/>
                <CardPromociones/>
                <IconMasPromo navigation={navigation}/>
        </ScrollView>
    )
}