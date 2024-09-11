import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React from 'react'

const Loader = () => {
    return (
        <View style={{
            position: 'absolute',
            height: "100%",
            width: '100%',
            alignItems:'center',
            justifyContent:'center',
        }}>
            <ActivityIndicator size="large" color="#FACA4E" />
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({})