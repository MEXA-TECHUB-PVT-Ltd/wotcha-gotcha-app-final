import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Backarrow from '../svg/backarrow.svg'
export default function Custom_Button(props) {
    const navigation = useNavigation()
    return (
        <View style={{ marginVertical: '10%', }}>
            <TouchableOpacity onPress={() => { navigation.goBack() }} activeOpacity={0.7}>
                <Backarrow width={24} height={24} />
            </TouchableOpacity>
        </View>
    );
}