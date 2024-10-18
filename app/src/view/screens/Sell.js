import {
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  StatusBar,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Image,
  Platform,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Button, Divider, TextInput} from 'react-native-paper';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Headers from '../../assets/Custom/Headers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../assets/Custom/Custom_Button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import { useIsFocused } from "@react-navigation/native";
import Geolocation from 'react-native-geolocation-service';
import { useTranslation } from 'react-i18next';
import Geocoding from 'react-native-geocoding';

import AsyncStorage from '@react-native-async-storage/async-storage';

import RBSheet from 'react-native-raw-bottom-sheet';
import CustomSnackbar from '../../assets/Custom/CustomSnackBar';
import { base_url } from '../../../../baseUrl';
import { CLOUDINARY_URL, UPLOAD_PRESET, CLOUD_NAME } from "../../../../cloudinaryConfig";


export default function Sell({navigation}) {
  const [userId, setUserId] = useState('');
  const { t } = useTranslation();
  const [imageUris, setImageUris] = useState([]);

  const [selectedItem, setSelectedItem] = useState('');

  const ref_RBSendOffer = useRef(null);

  const [title, setTitle] = useState('');

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [snackbarVisibleExceeded, setsnackbarVisibleExceeded] = useState(false);

  const [snackbarVisibleAlert, setsnackbarVisibleAlert] = useState(false);

  const [price, setPrice] = useState('');

  const [location, setLocation] = useState(null);

  const [locationName, setLocationName] = useState('');

  const [region, setRegion] = useState('');

  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [isTextInputActivePrice, setIsTextInputActivePrice] = useState(false);

  const [isTextInputActiveDescription, setIsTextInputActiveDescription] =
    useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [description, setDescription] = useState('');

  const [condition, setCondition] = useState('');

  const [regionArea, setRegionArea] = useState('');

  const [isFocusRegion, setIsFocusRegion] = useState(false);

  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState('');

  const [categoryId, setCategoryId] = useState('');

  const [authToken, setAuthToken] = useState('');

  const [categoriesSelect, setCategorySelect] = useState([]);

  const [imageUri, setImageUri] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const [isFocusCondition, setIsFocusCondition] = useState(false);

  const ref_RBSheetCamera = useRef(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    // Check and request location permission

    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Downloader App Location Permission',
            message:
              'Downloader App needs access to your location ' +
              'so you can download files based on your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log(
            'Location permission granted. Downloading file based on location...',
          );
          fetchLocation();
        } else {
          console.log('Location permission denied');
          // You can show a message to the user or take other actions if needed
        }
      } catch (err) {
        console.error('Error requesting location permission:', err);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    await getUserID();
    // Fetch data one by one

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {

    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);
        console.log('user id retrieved:', result);
      } else {
        console.log('result is null', result);
      }

      const result1 = await AsyncStorage.getItem('authToken ');
      if (result1 !== null) {
        setAuthToken(result1);
        console.log('user token retrieved:', result1);
        // await fetchCategory(result1);
      } else {
        console.log('result is null', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const [language, setLanguage] = useState(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        if (storedLanguage) {
          setLanguage(storedLanguage);
          console.log("lanugage--------", storedLanguage);
          await fetchCategory(authToken, storedLanguage);
          

          // await fetchAllSubCategory(authToken,storedLanguage,categoryId);
        }
      } catch (error) {
        console.error("Error fetching language:", error);
      }
    };

    fetchLanguage();
  }, [isFocused, authToken]);

  const fetchCategory = async (token, lang) => {
 

    try {
      const response = await fetch(
        base_url + 'itemCategory/getAllItemCategories?page=1&limit=10000',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();

        console.log('Data ', data);

        // Use the data from the API to set the categories
        const categories = data.AllCategories.map(category => ({
          // label: category.name, // Use the "name" property as the label
          label:
          lang === "fr" && category.french_name
            ? category.french_name
            : category.name,
          value: category.id.toString(), // Convert "id" to a string for the value
        }));

        setCategorySelect(categories); // Update the state with the formatted category data

        console.log('Data Categories', categoriesSelect);
      } else {
        console.error(
          'Failed to fetch categories:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const status = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (status !== PermissionsAndroid.RESULTS.GRANTED) {
        try {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted. Fetching location...');
            // Permission granted, now fetch the location
            fetchLocation();
          } else {
            console.warn('Location permission denied.');
          }
        } catch (error) {
          console.error('Error requesting location permission:', error);
        }
      } else {
        console.log(
          'Location permission already granted. Fetching location...',
        );
        // Permission already granted, fetch the location
        fetchLocation();
      }
    }
  };

  const fetchLocation = async () => {
    console.log('Fetch Location called');

    Geocoding.init('AIzaSyD2gv4DJD2-xSnjvdfPmdyjhbhFyPgqMrI');

    // Get current location
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});

        // Reverse geocoding to get location name and region
        try {
          const response = await Geocoding.from({latitude, longitude});
          const address = response.results[0].formatted_address;
          setLocationName(address);

          console.log('Address', address);

          // Extract region from address components
          const regionComponent = response.results[0].address_components.find(
            component =>
              component.types.includes('administrative_area_level_1'),
          );
          const regionName = regionComponent ? regionComponent.long_name : '';

          console.log('Address', regionName);

          setRegion(regionName);
        } catch (error) {
          console.error('Error fetching location and region:', error);
        }
      },
      error => console.error(error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const performAction = () => {
    setModalVisible(false);
  };

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  const handleFocusPrice = () => {
    setIsTextInputActivePrice(true);
  };

  const handleBlurPrice = () => {
    setIsTextInputActivePrice(false);
  };

  const handleFocusDescription = () => {
    setIsTextInputActiveDescription(true);
  };

  const handleBlurDescription = () => {
    setIsTextInputActiveDescription(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // const Condition = [
  //   {label: 'new', value: 'new'},
  //   {label: 'used_Like_new', value: 'used_Like_new'},
  //   {label: 'used_Good', value: 'used_Good'},
  //   {label: 'used_Fair', value: 'used_Fair'},
  // ];

  // const RegionArea = [
  //   {label: 'Africa', value: 'Africa'},
  //   {label: 'Europe', value: 'Europe'},
  //   {label: 'Americas', value: 'Americas'},
  //   {label: 'Asia', value: 'Asia'},
  //   {label: 'Middle East', value: 'Middle East'},
  // ];

  const Condition = [
    {label: t('new'), value: 'new'},
    {label: t('used_Like_new'), value: 'used_Like_new'},
    {label: t('used_Good'), value: 'used_Good'},
    {label: t('used_Fair'), value: 'used_Fair'},
  ];

  const RegionArea = [
    {label: t('Africa'), value: 'Africa'},
    {label: t('Europe'), value: 'Europe'},
    {label: t('Americas'), value: 'Americas'},
    {label: t('Asia'), value: 'Asia'},
    {label: t('Middle_East'), value: 'Middle_East'},
  ];

  const TakeImageFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 500,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };
  const TakeImageFromGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 500,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };
  const takePhotoFromCamera = async value => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: 'photo',
      },
      response => {
        if (!response.didCancel) {
          const newImageUri = response.assets
            ? response.assets[0]
            : response.uri;
          //updateImageUris(newImageUri);
          console.log('IMAGE URI', newImageUri);
          updateImageUrisCamera(newImageUri);
        }
        ref_RBSheetCamera.current.close();
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo', selectionLimit: 10}, response => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const newImageUri = response.assets;
        updateImageUris(newImageUri);
      }
      ref_RBSheetCamera.current.close();
    });
  };

  const updateImageUrisCamera = newImageUri => {
    console.log('RESPONSE', imageUris.length);

    if (imageUris.length < 10) {
      setImageUris(prevImageUris => [...prevImageUris, newImageUri]);
    } else {
      // Handle the case when the limit exceeds (e.g., show a message)
      //console.log('Image limit exceeded');
      handleUpdatePasswordExceeded();
    }
  };

  const updateImageUris = newImageUri => {
    console.log('RESPONSE', imageUris.length);

    if (imageUris.length < 10) {
      setImageUris(prevImageUris => [...prevImageUris, ...newImageUri]);
    } else {
      // Handle the case when the limit exceeds (e.g., show a message)
      //console.log('Image limit exceeded');
      handleUpdatePasswordExceeded();
    }
  };

  const handleUploadImage = data => {
    setLoading(true);
    const uri = imageInfoThumbnail.uri;
    const type = imageInfoThumbnail.type;
    const name = imageInfoThumbnail.fileName;
    const sourceImage = {uri, type, name};
    console.log('Source Image', sourceImage);
    const dataImage = new FormData();
    dataImage.append('file', sourceImage);
    dataImage.append('upload_preset', UPLOAD_PRESET ); // Use your Cloudinary upload preset
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
        uploadXpiVideo(data.url, data);
      })
      .catch(err => {
        setLoading(false);
        console.log('Error While Uploading Video', err);
      });
  };

  const upload = async () => {
    console.log('Image URIS', imageUris.length);
    console.log('title', title);
    console.log('categoryId', categoryId);
    console.log('condition', condition);
    console.log('description', description);
    console.log('price', price);
    console.log('locationName', locationName);
    console.log('region', region);
    console.log('regionArea', regionArea);

    if (
      imageUris.length !== 0 &&
      title !== '' &&
      categoryId !== '' &&
      condition !== '' &&
      description !== '' &&
      price !== ''
      //locationName !== '' &&
      //region !== '' &&
      //regionArea !== ''
    ) {
      handleUploadImages(imageUris);
      //console.log('All');
      //uploadVideoCloudinary(imageInfo.uri)
    } else {
      handleUpdatePasswordAlert();
      //setModalVisible(true);
    }
  };

  const handleUploadImages = async imageArray => {
    setLoading(true);

    const uploadPromises = imageArray.map(async imageInfo => {
      const uri = imageInfo.uri;
      const type = imageInfo.type;
      const name = imageInfo.fileName;
      const sourceImage = {uri, type, name};
      const dataImage = new FormData();
      dataImage.append('file', sourceImage);
      dataImage.append('upload_preset', UPLOAD_PRESET);
      dataImage.append('cloud_name', CLOUD_NAME);

      try { 
        const response = await fetch(
          CLOUDINARY_URL,
          {
            method: 'POST',
            body: dataImage,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (!response.ok) {
          throw new Error('Image upload failed');
        }

        const data = await response.json();
        console.log('Image Url', data.url);

        // Assuming you have a function like uploadXpiVideo, you can call it here
        //uploadXpiVideo(data.url, data);

        return data.url;
      } catch (error) {
        console.log('Error While Uploading Image', error);
        throw error; // Rethrow the error so that the Promise.all catches it
      }
    });

    try {
      const imageUrls = await Promise.all(uploadPromises);
      console.log('All images uploaded successfully:', imageUrls);

      sellItem(imageUrls);

      // Do something with the imageUrls array, e.g., store it in state or send it to the server
    } catch (error) {
      console.log('Error uploading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const sellItem = async data => {
    console.log('user Id', userId);
    console.log('condition', condition);
    console.log('imageUri', data);
    console.log('title', title);
    console.log('categoryId ', categoryId);
    console.log('description ', description);
    console.log('price ', price);
    console.log('paid Status ', isChecked);
    console.log('location ', locationName);
    console.log('region ', region);

    const token = authToken;
    const apiUrl = base_url + 'item/sellItem';

    const requestData = {
      user_id: userId,
      item_category: categoryId,
      images: data,
      title: title,
      description: description,
      price: price,
      condition: condition,
      location: locationName,
      paid_status: isChecked,
      region: regionArea,
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
        setLoading(false);
        handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          'Failed to upload pic',
          response.status,
          response.statusText,
        );
        // Handle the error
      }
    } catch (error) {
      console.error('API Request Error:', error);
      setLoading(false);

      // Handle the error
    }
  };

  // Call the function wherever you need to trigger the API request

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const dismissSnackbarAlert = () => {
    setsnackbarVisibleAlert(false);
  };

  const navigateToScreen = () => {
    ref_RBSendOffer.current.close();
    navigation.navigate('Signin_signup');
  };

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);
      navigation.goBack();
    }, 3000);
  };

  const handleUpdatePasswordAlert = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisibleAlert(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisibleAlert(false);
      //navigation.goBack();
    }, 3000);
  };

  //---------------------\\

  const dismissSnackbarAlertExceeded = () => {
    setsnackbarVisibleExceeded(false);
  };

  const handleUpdatePasswordExceeded = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisibleExceeded(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisibleExceeded(false);
    }, 3000);
  };

  //------------------------\\

  const handleRemoveImage = index => {
    const newImageUris = [...imageUris];
    newImageUris.splice(index, 1);
    setImageUris(newImageUris);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior="height" // You can use ‘height’ as well, depending on your preference
      enabled>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{marginTop: hp(5)}}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          text={'Sell'}
          showText={true}
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        {/* //post letter */}

        <TouchableOpacity
          onPress={() => ref_RBSheetCamera.current.open()}
          style={{
            borderRadius: wp(3),
            marginTop: hp(5),
            height: hp(25),
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#E7EAF2',
          }}>
          {imageUri !== null ? (
            <Image style={{resizeMode: 'contain'}} source={{uri: imageUri}} />
          ) : (
            <Image style={{resizeMode: 'contain'}} source={appImages.gallery} />
          )}

          <Text
            style={{
              fontFamily: 'Inter',
              marginTop: hp(1.8),
              // fontWeight: 'bold',
              fontSize: hp(1.5),
              color: '#939393',
            }}>
            You can upload a minimum of 1 and {'\n'}a maximum of 10 images.
          </Text>
        </TouchableOpacity>

        {/* //-------------------\\ */}
        <FlatList
          data={imageUris}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3} // Set the number of columns to 3
          renderItem={({item, index}) => (
            <View style={styles.imageContainer}>
              <Image source={{uri: item.uri}} style={styles.image} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => handleRemoveImage(index)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {/* 
        {imageUri !== null ? (
          <View
            style={{
              marginTop: hp(5),
              height: hp(35),
              borderRadius: wp(3),
              marginHorizontal: wp(20),
            }}>
            {imageUri !== null && (
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
                  resizeMode: 'contain',
                }}
                source={{uri: imageUri}}
              />
            )}
            {imageUri == null && (
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(3),
                  resizeMode: 'stretch',
                  zIndex: 0, // Ensure it's below other elements when no image
                }}
                source={appImages.updatePics}
              />
            )}
          </View>
        ) : null} */}

        <TextInput
          mode="outlined"
          label="Title"
          onChangeText={text => setTitle(text)}
          style={styles.ti}
          outlineColor="#0000001F"
          placeholderTextColor={'#646464'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        />

        <TextInput
          mode="outlined"
          label="$ Price"
          onChangeText={text => setPrice(text)}
          keyboardType="number-pad"
          style={styles.ti}
          outlineColor="#0000001F"
          placeholderTextColor={'#646464'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusPrice}
          onBlur={handleBlurPrice}
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        />

        <View>
          <Dropdown
            style={
              isFocus
                ? styles.textInputSelectedCategory
                : styles.textInputCategoryNonSelected
            }
            containerStyle={{
              marginTop: 3,
              alignSelf: 'center',
              borderRadius: wp(3),
              width: '100%',
            }}
            // dropdownPosition="top"
            // mode="modal"
            placeholderStyle={{
              color: '#121420',
              //   fontWeight: '400',
              fontFamily: 'Inter',
              fontSize: hp(1.8),
            }}
            iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
            itemTextStyle={{color: '#000000'}}
            selectedTextStyle={{fontSize: 16, color: '#000000'}}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            value={category}
            data={categoriesSelect}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={'Select Category'}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              console.log("kon sub category id hai----", item.value);
              setCategoryId(item.value);
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? '#FACA4E' : '#C4C4C4'}
                name="down"
                size={15}
              />
            )}
          />
        </View>

        <View style={{}}>
          <Dropdown
            style={
              isFocusCondition
                ? styles.textInputSelectedCategory
                : styles.textInputCategoryNonSelected
            }
            containerStyle={{
              marginTop: 3,
              alignSelf: 'center',
              borderRadius: wp(3),
              width: '100%',
            }}
            // dropdownPosition="top"
            // mode="modal"
            placeholderStyle={{
              color: '#121420',
              //   fontWeight: '400',
              fontFamily: 'Inter',
              fontSize: hp(1.8),
            }}
            iconStyle={
              isFocusCondition ? styles.iconStyle : styles.iconStyleInactive
            }
            itemTextStyle={{color: '#000000'}}
            selectedTextStyle={{fontSize: 16, color: '#000000'}}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            value={condition}
            data={Condition}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={'Select Condition'}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocusCondition(true)}
            onBlur={() => setIsFocusCondition(false)}
            onChange={item => {
              console.log("kon sub category id hai----", item.value);
              setCondition(item.value);
              //console.log("Condition", item.label)
              setIsFocusCondition(false);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? '#FACA4E' : '#C4C4C4'}
                name="down"
                size={15}
              />
            )}
          />
        </View>

        <View style={{}}>
          <Dropdown
            style={
              isFocusRegion
                ? styles.textInputSelectedCategory
                : styles.textInputCategoryNonSelected
            }
            containerStyle={{
              marginTop: 3,
              alignSelf: 'center',
              borderRadius: wp(3),
              width: '100%',
            }}
            // dropdownPosition="top"
            // mode="modal"
            placeholderStyle={{
              color: '#121420',
              //   fontWeight: '400',
              fontFamily: 'Inter',
              fontSize: hp(1.8),
            }}
            iconStyle={
              isFocusRegion ? styles.iconStyle : styles.iconStyleInactive
            }
            itemTextStyle={{color: '#000000'}}
            selectedTextStyle={{fontSize: 16, color: '#000000'}}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            value={regionArea}
            data={RegionArea}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={'Select Region'}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocusRegion(true)}
            onBlur={() => setIsFocusRegion(false)}
            onChange={item => {
              setRegionArea(item.value);
              console.log("kon sub category id hai----", item.value);
              //console.log("Condition", item.label)
              setIsFocusRegion(false);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? '#FACA4E' : '#C4C4C4'}
                name="down"
                size={15}
              />
            )}
          />
        </View>

        <TextInput
          mode="outlined"
          label="Description"
          onChangeText={text => setDescription(text)}
          multiline={true} // Enable multiline input
          numberOfLines={3} // Set the initial number of lines
          style={{height: hp(25), ...styles.ti, width: wp(82)}} // Adjust the height as needed
          outlineColor="#0000001F"
          placeholderTextColor="#646464"
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusDescription}
          onBlur={handleBlurDescription}
        />

        <TouchableOpacity
          onPress={() => handleCheckboxChange()}
          style={{flexDirection: 'row', marginTop: hp(3), width: '100%'}}>
          <TouchableOpacity
            style={isChecked ? styles.selectCheckBox : styles.unSelectCheckBox}
            onPress={
              () => handleCheckboxChange()
              // setChecked(!checked);
            }>
            {isChecked && <Entypo name={'check'} size={15} color={'#FACA4E'} />}

            {/* {checked ? ( */}
            {/* <Icon
                  name="checkmark"
                  size={28}
                  color={AppColors.buttonColor}
                /> */}
            {/* ) : ( */}

            {/* )} */}
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: wp(1.8),
              fontFamily: 'Inter',
              color: '#333333',
            }}>
            Add to top post
          </Text>
        </TouchableOpacity>

        <View style={{marginTop: hp(5)}}>
          <CustomButton
            title={'Upload'}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              if (userId !== '') {
                //handleUpdatePassword();

                //console.log("found")

                upload();
              } else {
                ref_RBSendOffer.current.open();
              }
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </ScrollView>

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

      <CustomSnackbar
        message={'success'}
        messageDescription={'Item uploaded successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />

      <CustomSnackbar
        message={'Alert'}
        messageDescription={'Kindly Fill All Fields'}
        onDismiss={dismissSnackbarAlert} // Make sure this function is defined
        visible={snackbarVisibleAlert}
      />

      <CustomSnackbar
        message={'Alert'}
        messageDescription={'Image Limit Exceeded!'}
        onDismiss={dismissSnackbarAlertExceeded} // Make sure this function is defined
        visible={snackbarVisibleExceeded}
      />
      <RBSheet
        ref={ref_RBSendOffer}
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
            height: hp(51),
          },
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginHorizontal: wp(8),
            justifyContent: 'space-evenly',
          }}>
          <Image
            source={appImages.alert}
            style={{
              width: wp(30),
              marginTop: hp(-10),
              height: hp(30),
              resizeMode: 'contain',
            }}
          />

          <View style={{marginTop: hp(-5), height: hp(8)}}>
            <Text
              style={{
                color: '#333333',
                textAlign: 'center',
                fontSize: hp(2.3),
                fontWeight: 'bold',
                fontFamily: 'Inter',
              }}>
              Join Us Today
            </Text>

            <Text
              style={{
                color: '#9597A6',
                marginTop: hp(0.5),
                textAlign: 'center',
                fontSize: hp(1.8),
                marginTop: hp(1.5),
                //fontWeight:'bold',
                fontFamily: 'Inter',
              }}>
              We invite you to become a part of our community
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: hp(8),
              marginHorizontal: wp(5),
            }}>
            <TouchableOpacity
              onPress={() => ref_RBSendOffer.current.close()}
              style={{
                width: wp(30),
                borderRadius: wp(5),
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#FACA4E',
                borderWidth: 1,
                height: hp(5),
              }}>
              <Text
                style={{
                  color: '#FACA4E',
                  textAlign: 'center',
                  fontSize: hp(1.8),
                  fontWeight: 'bold',
                  fontFamily: 'Inter',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateToScreen()}
              style={{
                width: wp(30),
                borderRadius: wp(5),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FACA4E',
                height: hp(5),
              }}>
              <Text
                style={{
                  color: '#000000',
                  textAlign: 'center',
                  fontSize: hp(1.8),
                  fontWeight: 'bold',
                  fontFamily: 'Inter',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
          }}>
          <ActivityIndicator size="large" color="#FACA4E" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: wp(8),
  },
  ti: {
    marginTop: '5%',
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98.8%',
    borderColor: '#FACA4E',

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98.8%',
    borderColor: '#E7EAF2',
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  iconStyle: {
    color: '#C4C4C4',
    width: 20,
    height: 20,
  },
  iconStyleInactive: {
    color: '#FACA4E',
  },
  maintext: {
    fontSize: hp(2.3),
    color: '#303030',
    fontWeight: 'bold',
  },
  modaltextview: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: wp(90),
    borderRadius: 25,
    backgroundColor: 'white',
    paddingHorizontal: wp(15),
  },
  optiontext: {
    fontSize: hp(1.7),
    color: '#303030',
    marginLeft: wp(4),
  },
  nonselectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#E7EAF2',
  },
  selectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#FACA4E',
  },
  selectCheckBox: {
    width: 17,
    height: 17,
    borderRadius: wp(1),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FACA4E',
  },
  unSelectCheckBox: {
    width: 17,
    height: 17,
    borderRadius: wp(1),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#C4C4C4',
  },
  imageContainer: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: '100%',
    height: 100,
    aspectRatio: 1, // Maintain the aspect ratio of the image
  },
  closeButton: {
    position: 'absolute',
    top: 1,
    //right: -7,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(8),
    height: wp(8),
    width: wp(8),
  },
  closeButtonText: {
    color: 'white',
  },
});
