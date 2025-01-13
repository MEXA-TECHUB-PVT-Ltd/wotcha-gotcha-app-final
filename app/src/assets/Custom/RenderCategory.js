import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RenderCategory = ({ item, isSelected, onPress }) => {
  const name = language === "fr" && item.french_name ? item.french_name : item.name;
   const isFocused = useIsFocused();
      const [language, setLanguage] = useState(null);
    useEffect(() => {
      const fetchLanguage = async () => {
        try {
          const storedLanguage = await AsyncStorage.getItem("language");
          if (storedLanguage) {
            setLanguage(storedLanguage);
            // console.log('lanugage-------- in dash', storedLanguage)
          }
        } catch (error) {
          console.error("Error fetching language:", error);
        }
      };
  
      fetchLanguage();
    }, [isFocused]);
    // console.log('lang-----in render--------', item)
  return (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.textSearchDetails,
          { color: isSelected ? "#232323" : "#939393" },
        ]}
      >
        {name}
        {/* {item.name} */}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    padding: 8,
    borderRadius: 230,
    marginRight: 6,
  },
  textSearchDetails: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
  },
});

export default RenderCategory;
