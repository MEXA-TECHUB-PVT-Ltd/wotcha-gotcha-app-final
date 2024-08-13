import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  LogBox,
  Animated,
  ImageBackground,
  Pressable,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CommonActions } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {appImages} from '../../../assets/utilities/index';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Back from '../../../assets/svg/back.svg';

import RBSheet from 'react-native-raw-bottom-sheet';

import CustomButton from '../../../assets/Custom/Custom_Button';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from 'react-native-switch-selector';
import User from '../../../assets/svg/User.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from './styles';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import { base_url } from '../../../../../baseUrl';
import { CLOUD_NAME, CLOUDINARY_URL, UPLOAD_PRESET } from '../../../../../cloudinaryConfig';
LogBox.ignoreAllLogs();

const Profile_image = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {}, [isFocused]);

  const [signin_email, setsignin_email] = useState();

  const [userId, setUserId] = useState('');

  const [authToken, setAuthToken] = useState('');

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState('');

  const [imageUrl, setImageUrl] = useState(null);

  const [openModel, setOpenModel] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [userName, setUserName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageInfo, setimageInfo] = useState(null);

  const ref_RBSheet = useRef(null);
  const ref_RBSheetCamera = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading
    setIsLoading(true);

    await getUserID();

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
      } else {
        console.log('result is null', result);
      }

      const result3 = await AsyncStorage.getItem('authToken ');
      if (result3 !== null) {
        setAuthToken(result3);

        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const takePhotoFromCamera = async value => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: 'photo',
        photoQuality: 'medium',
      },
      response => {
        console.log('image here', response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
            console.log('response', response.assets[0].uri);
            setimageInfo(response.assets[0]);
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setImageUri(response.uri);
            console.log('response', response.uri);
          }
        }
        ref_RBSheetCamera.current.close();
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        console.log('Response', response.assets[0]);
        setImageUri(response.assets[0].uri);
        setimageInfo(response.assets[0]);
      }

      console.log('response', imageInfo);

      ref_RBSheetCamera.current.close();
    });
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'BottomTabNavigation' }],
        })
      );
      // navigation.navigate('BottomTabNavigation');
    }, 3000);
  };

  const upload = async () => {
    if (imageInfo !== null) {
      //uploadVideo()
      //uploadVideos()
      const uri = imageInfo.uri;
      const type = imageInfo.type;
      const name = imageInfo.fileName;
      const source = {uri, type, name};
      console.log('Video Source', source);
      handleUploadImage(source);

      //uploadVideoCloudinary(imageInfo.uri)
    } else {
      //setModalVisible(true);
    }
  };

  const handleUploadImage = data => {
    //setIsLoading(true);

    const dataImage = new FormData();
    dataImage.append('file', data);
    dataImage.append('upload_preset', UPLOAD_PRESET); // Use your Cloudinary upload preset
    dataImage.append('cloud_name', CLOUD_NAME); // Use your Cloudinary cloud name

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: dataImage,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        setImageUrl(data.url); // Store the Cloudinary video URL in your state
        //uploadVideo(data.url)
        //uploadXpiVideo(data.url);
        console.log('Image Url', data);
        updateUserName(data.url);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('Error While Uploading Video', err);
      });
  };

  const updateUserName = async data => {
    setIsLoading(true);
    console.log('TOKEN', authToken);
    const token = authToken;
    const apiUrl = base_url + 'user/uploadImage';

    const requestData = {
      userId: userId,
      image: data,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        setIsLoading(false);
        handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setIsLoading(false);

        console.error(
          'Failed to upload video:',
          response.status,
          response.statusText,
        );
        // Handle the error
      }
    } catch (error) {
      console.error('API Request Error:', error);
      setIsLoading(false);
      // Handle the error
    }
  };

  return (
    <ScrollView style={styles.bg} contentContainerStyle={{flexGrow: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FACA4E'} />
      <View style={styles.mainv}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back
            width={20}
            height={20}
            style={{marginTop: '9%', marginLeft: '8%'}}
          />
        </TouchableOpacity>

        <Text style={styles.txt}>Profile Image</Text>
        <Text style={styles.txt1}>Add your profile image below</Text>

        <View style={{alignItems: 'center', marginTop: hp(15)}}>
          <TouchableOpacity style={styles.circleBox}>
            {imageUri == null ? (
              <User width={30} height={30} />
            ) : (
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(25) / 2, // Half of the width (25/2)
                  resizeMode: 'contain',
                }}
                source={{uri: imageUri}}
              />
            )}
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          onPress={() => ref_RBSheetCamera.current.open()}
          style={styles.button}
          contentStyle={{
            padding: '1%',
          }}
          labelStyle={{
            fontSize: widthPercentageToDP(3.7),
            fontFamily: 'Inter-Bold',
            color: '#232323',
          }}>
          Add Image
        </Button>
        <View style={{marginTop: '25%', alignSelf: 'center'}}>
          <CustomButton
            title="Complete Profile"
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              setIsLoading(true);
              //setTimeout(() => {
              //navigation.navigate('BottomTabNavigation');
              upload();
              //setIsLoading(false);
              // Replace 'YourTargetScreen' with the screen you want to navigate to
              //}, 2000);
            }}
          />
        </View>
      </View>

      <RBSheet
        ref={ref_RBSheetCamera}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(25),
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(8),
            alignItems: 'center',
          }}>
          <Text style={styles.maintext}>Select an option</Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={'#303030'}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => takePhotoFromCamera('camera')}
            style={
              selectedItem === 'camera'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <Ionicons
              color={selectedItem === 'camera' ? '#FACA4E' : '#888888'}
              name="camera"
              size={25}
            />

            <Text style={{color: '#333333'}}>From camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => choosePhotoFromLibrary('gallery')}
            style={
              selectedItem === 'gallery'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <MaterialCommunityIcons
              color={selectedItem === 'gallery' ? '#FACA4E' : '#888888'}
              name="image"
              size={25}
            />

            <Text style={{color: '#333333'}}>From gallery</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {isLoading && (
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
          <ActivityIndicator size="large" color="#FACA4E" />
        </View>
      )}

      <CustomSnackbar
        message={'success'}
        messageDescription={'Image Uploaded Successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
    </ScrollView>
  );
};

export default Profile_image;
