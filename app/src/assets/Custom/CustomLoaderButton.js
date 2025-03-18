import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const CustomLoaderButton = ({ title, load, customClick }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={customClick}
      disabled={load} // Disable the button while loading
    >
      {load ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FACA4E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: 300,
    marginBottom: '5%',
  },
  buttonText: {
    color: '#232323',
        alignSelf: 'center',
        fontSize: widthPercentageToDP(4),
        fontFamily: 'Montserrat-Medium',
        fontWeight:'700'
  },
//   loader: {
//     marginRight: 10, // Add margin to the right of the loader to space it from the text
//   },
});

export default CustomLoaderButton;
