import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RBSheet from 'react-native-raw-bottom-sheet';

import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlusPost from '../../assets/svg/PlusPost.svg';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../assets/svg/VolumeUp.svg';
import Like from '../../assets/svg/Like.svg';
import UnLike from '../../assets/svg/Unlike.svg';
import Comment from '../../assets/svg/Comment.svg';
import Send from '../../assets/svg/Send.svg';
import Download from '../../assets/svg/Download.svg';
import CustomButton from '../../assets/Custom/Custom_Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Saved from '../../assets/svg/BookMark.svg';
import CustomSnackbar from '../../assets/Custom/CustomSnackBar';
import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../assets/Custom/CPaperInput';
import Headers from '../../assets/Custom/Headers';
import { base_url } from '../../../../baseUrl';
import Loader from '../../assets/Custom/Loader';

import { useTranslation } from 'react-i18next';

export default function SavedItems({navigation}) {
  const { t } = useTranslation();
  const [userId, setUserId] = useState('');

  const [authToken, setAuthToken] = useState('');

  const [savedItems, setSavedItems] = useState([]);

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  useEffect(() => {
    authTokenAndId();
  }, [userId, authToken]);

  const fetchVideos = async () => {
    // Simulate loading
    setIsLoading(true);

    await getUserID();
    // Fetch data one by one

    // Once all data is fetched, set loading to false
    setIsLoading(false);
  };

  const getUserID = async () => {
    console.log("Id's");
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);

        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }

    try {
      const result = await AsyncStorage.getItem('userName');
      if (result !== null) {
        setName(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }

    const result1 = await AsyncStorage.getItem('authToken ');
    if (result1 !== null) {
      setAuthToken(result1);
      console.log('user token retrieved:', result1);
      //await fetchUser(result1);
      //await fetchCategory(result1);
    } else {
      console.log('result is null', result1);
    }

    await authTokenAndId();
  };

  const authTokenAndId = async () => {
    if (userId !== '' && authToken !== '') {
      console.log('USER ID', userId);
      console.log('AUTH TOKEN ', authToken);
      fetchSavedItems(userId, authToken);
    }
  };

  const fetchSavedItems = async (ids, tokens) => {
    console.log('selected most commented videosssssssssssss', tokens);

    const token = tokens;

    try {
      const response = await fetch(
        base_url + `item/getAllSavedItemsByUser/${ids}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.AllSavedItems);
      setSavedItems(result.AllSavedItems); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderAvailableApps = item => {
    console.log('Items', item.images[0].image);
    return (
      <View
        style={{
          height: hp(18),
          flex: 1,
          borderRadius: wp(3),
          margin: 5,
        }}>
        <Image
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1, // Ensure it's on top of other elements
            flex: 1,
            width: '100%',
            height: '100%',
            borderRadius: wp(3),
            resizeMode: 'stretch',
          }}
          source={{uri: item.images[0].image}}
        />
        <View
          style={{
            position: 'absolute',
            top: hp(1),
            right: 3,
            //height: hp(3),
            //width: wp(21),
            //borderRadius: wp(3),
            //backgroundColor: '#FACA4E',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2, // Ensure it's on top
          }}>
          <Saved width={18} height={18} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />

      <View style={{marginTop:Platform.OS =="ios" ? 0: hp(5)}}>
        <Headers
          onPress={() => navigation.goBack()}
          showText={true}
          text={t('Settings.SavedItems')}
          showBackIcon={true}
        />
      </View>

      <FlatList
        style={{marginTop: hp(3), marginHorizontal: wp(5), flex: 1}}
        showsVerticalScrollIndicator={false}
        data={savedItems}
        keyExtractor={item => item.id.toString()}
        numColumns={3} // Set the number of columns to 3
        renderItem={({item}) => renderAvailableApps(item)}
      />

      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading && <ActivityIndicator size="large" color="#FACA4E" />}
      </View> */}
      {loading && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
