import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'react-native-svg';

export default function ButtonIn ({Title, buttonStyle, textStyle, onPress}) {
    return(
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            <Text style={[styles.tex, textStyle]}>{Title}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    tex: {
        fontSize: 20,
    },
    button: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        width: '80%',
        height: 49,
        margin: 10,
    },
  });