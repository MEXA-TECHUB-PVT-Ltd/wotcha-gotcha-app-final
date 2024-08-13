import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ViewImage = ({ route }) => {
    const item  = route.params;
    console.log('image------', item.item)
  return (
    <View style={styles.imageContainer}>
      <Image   source={{ uri: item.item }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
  flex:1
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ViewImage;
