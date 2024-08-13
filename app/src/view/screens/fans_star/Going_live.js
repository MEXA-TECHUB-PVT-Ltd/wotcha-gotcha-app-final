import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const Going_live = ({ navigation, route }) => {
  const { thumbnailImageUri } = route.params;
  const [count, setCount] = useState(3);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count > 1) {
        setCount(count - 1);
      } else if (count === 1) {
        setCount(0);
        setIsLive(true);
      } else {
        // Navigate to the next screen when count reaches zero
        navigation.navigate('Live', { thumbnailImageUri: thumbnailImageUri,});
      }
    }, 1000); 
    return () => clearTimeout(timer);
  }, [count, navigation]);

  return (
    <ImageBackground
      source={{ uri: thumbnailImageUri }}
      style={styles.backgroundImage}
    >
      {/* Overlay view */}
      <View style={styles.overlay} />

      <View style={styles.timerContainer}>
        {isLive ? (
          <Text style={styles.liveText}>You are live now</Text>
        ) : (
          <Text style={styles.timerText}>{count}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()} 
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
  },
  timerContainer: {
    position: 'absolute',
    top: '40%', // Adjust position vertically
  },
  timerText: {
    fontSize: 50,
    color: 'white',
  },
  liveText: {
    fontSize: 20,
    color: 'white',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 20,
    borderRadius:20,
    borderWidth:1,
    borderColor:"white",
    padding:"3%",
    marginHorizontal:"15%",
    justifyContent:"center",
    textAlign:"center"
  },
});

export default Going_live;
