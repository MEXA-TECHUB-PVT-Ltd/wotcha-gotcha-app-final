import {Image, StyleSheet, StatusBar, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {appImages} from '../../assets/utilities';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    // Use setTimeout to navigate to the next screen after 3 seconds
    const delay = 50; // 3 seconds in milliseconds

    const timeoutId = setTimeout(() => {
      // Navigate to the next screen here
      fetchVideos();
    }, delay);

    // Clear the timeout if the component unmounts (cleanup)
    return () => clearTimeout(timeoutId);
  }, [navigation]); // Include 'navigation' in the dependency array

  const fetchVideos = async () => {
    // Simulate loading

    // Wait for getUserID to complete before calling getAllSignals
    await getUserID();

    // Fetch data one by one
    // Once all data is fetched, set loading to false
  };

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        console.log('user id retrieved:', result);
        navigation.replace('BottomTabNavigation');
      } else {
        navigation.navigate('Signin_signup'); // Replace 'NextScreen' with the actual screen name
      }

      /*  const userName = await AsyncStorage.getItem('userName');
          if (userName !== null) {
            console.log('user name retrieved:', userName);
          }
    
          const email = await AsyncStorage.getItem('email');
          if (email !== null) {
            console.log('user id retrieved:', email);
            setUserEmail(email);
          } */
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
