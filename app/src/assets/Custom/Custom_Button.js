import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default function Custom_Button(props) {
    return (
        <Button
            disabled={props.checkdisable}
            mode="contained" onPress={props.customClick}
            style={[styles.button, props.style]}
            contentStyle={{
                padding: '1.2%',

            }}
            loading={props.load}
            labelStyle={{
                fontSize: widthPercentageToDP(4),
                //borderWidth:3,
                width:widthPercentageToDP(70),
                fontFamily: 'Inter',
                fontWeight:'900',
                color: '#232323'
            }}
        >
             {props.load ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text>{props.title}</Text>
      )}
            {/* {props.title} */}
        </Button>
    );
}
const styles = StyleSheet.create({
    button: {
        // flexDirection: 'row',
        backgroundColor: '#FACA4E',
        borderRadius: 25,
        width: 300,
        marginBottom: '5%',
    },
    text: {
        color: 'white',
        alignSelf: 'center',
        fontSize: widthPercentageToDP(4),
        fontFamily: 'Montserrat-Medium',
    },
});