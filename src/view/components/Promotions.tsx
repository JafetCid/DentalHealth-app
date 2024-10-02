import { View, Image, TouchableOpacity, Modal, Alert, Text, Pressable } from "react-native";
import HeaderNoIcon from "./HeaderNoIcon";
import styles from "../../../assets/styles/CardPromociones";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CardPromociones from "./CardPromociones";
import { ScrollView } from "react-native";
import IconMasPromo from "./IconMasPromo";
import Header from "./Header";

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