import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const DotLoader = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 500,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 200);
    animateDot(dot3, 400);
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        <Animated.View
          style={[
            styles.dot,
            { opacity: dot1, transform: [{ scale: dot1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.5],
                }) }] },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            { opacity: dot2, transform: [{ scale: dot2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.5],
                }) }] },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            { opacity: dot3, transform: [{ scale: dot3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.5],
                }) }] },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f",
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.4,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#ffffff",
  },
});

export default DotLoader;
