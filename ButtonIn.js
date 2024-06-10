import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'react-native-svg';

export default function ButtonIn ({Title, buttonStyle, textStyle}) {
    return(
        <TouchableOpacity style={[styles.button, buttonStyle]}>
            <LinearGradient>
                <Text style={[styles.tex, textStyle]}>{Title}</Text>
            </LinearGradient>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    tex: {
        color: 'white',
        fontSize: 14,
        
    },
        
    button: {
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        width: '80%',
        height: 49,
        margin: 10,
    },
  });