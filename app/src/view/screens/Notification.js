import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Category = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];

const availableApps = [
  {id: 1, title: 'Lense', image: appImages.lense},
  {id: 2, title: 'Holder', image: appImages.holder},
  {id: 3, title: 'HeadPhone', image: appImages.headPhone},
  {id: 4, title: 'Shoes', image: appImages.shoes},
  {id: 5, title: 'Printer', image: appImages.printer},
  {id: 6, title: 'Lense', image: appImages.lense},
  {id: 7, title: 'Holder', image: appImages.holder},
  {id: 8, title: 'HeadPhone', image: appImages.headPhone},
  {id: 9, title: 'Shoes', image: appImages.shoes},
  //{id: 10, title: 'Printer', image: appImages.printer},
];

export default function Notification({navigation}) {
  const [selectedRide, setSelectedRide] = useState(null);

  const [imageUri, setImageUri] = useState(null);
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState(null);
  const [authToken, setAuthToken] = useState('');

  const [priceOffer, setPriceOffer] = useState('');

  const [selectedValueListView, setSelectedValueListView] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarVisibleAlert, setSnackbarVisibleAlert] = useState(false);
  const [snackbarVisibleSaved, setSnackbarVisibleSaved] = useState(false);
  const [snackbarVisiblePrice, setSnackbarVisiblePrice] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  useEffect(() => {
    authTokenAndId();
  }, [userId, authToken]);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    await getUserID();
    // Fetch data one by one

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {
    console.log("Id's");
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);

        // console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }

    try {
      const result = await AsyncStorage.getItem('userName');
      if (result !== null) {
        setName(result);
        // console.log('user id retrieved:', result);
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
      fetchAll(userId, authToken);
    }
  };

  const fetchAll = async (id, tokens) => {
    console.log('Categry in id', id);
    console.log('USER ID', tokens);
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `notification/getAllNotificationsByUser/${userId}`,

        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('AllItems of user', result.AllNotifications);
      setUserData(result.AllNotifications); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const handleSelected = item => {
    if (selectedRide === item) {
      setSelectedRide(null); // Deselect the item if it's already selected
    } else {
      setSelectedRide(item); // Select the item if it's not selected
    }
  };

  const availableApps = [
    {
      id: 1,
      title: 'NewRider',
      desc: 'our journey is almost ready to be shared with the community. To complete the ride publishing process, please review the details......',
      image: appImages.logoWhite,
    },
    {
      id: 2,
      title: 'NewRider',
      desc: 'our journey is almost ready to be shared with the community. To complete the ride publishing process, please review the details......',
      image: appImages.logoWhite,
    },
    {
      id: 3,
      title: 'NewRider',
      desc: 'our journey is almost ready to be shared with the community. To complete the ride publishing process, please review the details......',
      image: appImages.logoWhite,
    },
    {
      id: 4,
      title: 'NewRider',
      desc: 'our journey is almost ready to be shared with the community. To complete the ride publishing process, please review the details......',
      image: appImages.logoWhite,
    },
    {
      id: 5,
      title: 'NewRider',
      desc: 'our journey is almost ready to be shared with the community. To complete the ride publishing process, please review the details......',
      image: appImages.logoWhite,
    },

    //{id: 10, title: 'Printer', image: appImages.printer},
  ];

  const renderItems = ({item}) => {
    console.log('ITEMS OF NOTIFICATIONS', item);
    return (
      <TouchableOpacity
        onPress={() => handleSelected(item.id)}
        style={selectedRide === item.id ? styles.selected : styles.nonSelected}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', height: hp(8)}}>
          <Image
            style={{width: 100, height: 50, resizeMode: 'contain'}}
            source={appImages.logo}
          />

          <Text style={{color: '#000000', fontSize: hp(3), fontWeight: '700'}}>
            Watcha Gotcha
          </Text>
        </View>

        <Text
          style={
            selectedRide === item.id
              ? styles.textSelected
              : styles.nonTextSelected
          }>
          {item.desc}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View style={{marginTop: hp(1.8)}}>
        <Headers
          onPress={() => navigation.goBack()}
          showText={true}
          text={'Notifications'}
          showBackIcon={true}
        />
      </View>

      <FlatList
        data={availableApps}
        renderItem={renderItems}
        keyExtractor={item => item.id.toString()}
      />

      <View
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  selected: {
    height: hp(15),
    marginTop: hp(1),
    borderRadius: wp(4),
    marginHorizontal: wp(8),
    borderWidth: 1,
    justifyContent: 'center',
  },
  nonSelected: {
    height: hp(15),
    borderRadius: wp(4),
    marginTop: hp(1),

    backgroundColor: '#F4F4F4',
    marginHorizontal: wp(8),
    //borderWidth: 1,
    justifyContent: 'center',
  },
  textSelected: {
    color: '#000000',
    fontSize: hp(1.3),
    marginLeft: wp(3),
    fontFamily: 'Inter-Bold',
  },
  nonTextSelected: {
    color: '#606060',
    fontSize: hp(1.3),
    marginLeft: wp(3),
    fontFamily: 'Inter-Regular',
  },
});
