import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const containerWidth = state.routes.length * 100; // Adjust as needed

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ width: containerWidth }}
    >
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tab: {
    padding: 10,
  },
  tabFocused: {
    borderBottomWidth: 2,
    borderColor: 'blue', // Adjust the color as needed
  },
  tabText: {
    color: 'black', // Adjust the color as needed
    fontSize: 16, // Adjust the font size as needed
  },
});

export default CustomTabBar;