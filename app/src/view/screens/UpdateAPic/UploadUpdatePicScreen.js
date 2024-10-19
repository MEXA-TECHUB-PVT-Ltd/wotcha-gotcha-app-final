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
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useTranslation } from 'react-i18next';
import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Back from '../../../assets/svg/back.svg';
import {appImages} from '../../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../../assets/svg/VolumeUp.svg';
import Like from '../../../assets/svg/Like.svg';
import UnLike from '../../../assets/svg/Unlike.svg';
import Comment from '../../../assets/svg/Comment.svg';
import Send from '../../../assets/svg/Send.svg';
import Download from '../../../assets/svg/Download.svg';
import CustomButton from '../../../assets/Custom/Custom_Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import AsyncStorage from '@react-native-async-storage/async-storage';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../../assets/Custom/CPaperInput';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import { base_url } from '../../../../../baseUrl';
import { CLOUD_NAME, CLOUDINARY_URL, UPLOAD_PRESET } from '../../../../../cloudinaryConfig';

const Category = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];
import { useIsFocused } from "@react-navigation/native";
export default function UploadUpdatePicScreen({navigation, route}) {
  const [selectedItem, setSelectedItem] = useState('');
  const { t } = useTranslation();
  const [dataFetched, isDataFetched] = useState(false);

  const [userId, setUserId] = useState('');

  const [profileName, setProfileName] = useState('');

  const [categoriesSelect, setCategorySelect] = useState([]);

  const [snackBarVisible, setSnackbarVisible] = useState(false);

  const [authToken, setAuthToken] = useState('');

  const [imageInfo, setImageInfo] = useState(null);

  const [loading, setLoading] = useState(false);

  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [category, setCategory] = useState('');

  const [description, setDescription] = useState('');

  const [imageUri, setImageUri] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);

  const [categoryId, setCategoryId] = useState('');

  const [isFocus, setIsFocus] = useState(false);

  const ref_RBSheetCamera = useRef(null);
  const [snackbarVisibleAlert, setsnackbarVisibleAlert] = useState(false);
  const [categoryType, setCategoryType] = useState(null);
  const [thumbnailError, setthumbnailImageUritwoError] = useState("");
  const [subCate, setSubCate] = useState([]);
  const [subcategory, setSubCategory] = useState("");
  //------------------\\
  const isFocused = useIsFocused();
  const receivedData = route.params?.item;

  console.log('Data Recieved on pics', receivedData);

  useEffect(() => {
    // Make the API request and update the 'data' state
    const fetchCategory = async () => {
      setProfileName(receivedData?.name);
      setDescription(receivedData?.description);
      setCategory(receivedData?.pic_category);
      setImageInfo({uri: receivedData?.image});

      // setCategoryId(receivedData?.pic_category);
      // setSubCategory(receivedData?.sub_category);


 // Mapping category and subcategory to label and value format
 const formattedCategory = {
  label: language === 'fr' && receivedData?.category_french_name ? receivedData?.category_french_name : receivedData?.category_name,
  value: receivedData?.pic_category?.toString(),
};

const formattedSubCategory = {
  label: language === 'fr' && receivedData?.sub_category_french_name ? receivedData?.sub_category_french_name : receivedData?.sub_category_name,
  value: receivedData?.sub_category?.toString(),
};

setCategoryId(formattedCategory.value); // set the category in label-value format
setSubCategory(formattedSubCategory.value);



      isDataFetched(true);
    };

    fetchCategory(); 
  }, [receivedData]);

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
      } else {
        console.log('result is null', result);
      }

      const result1 = await AsyncStorage.getItem('authToken ');
      if (result1 !== null) {
        setAuthToken(result1);
        // 18-10-2024 rat
        // fetchCategoryPic(result1);
      } else {
        console.log('result is null', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  //---------------------------\\
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        if (storedLanguage) {
          setLanguage(storedLanguage);
          console.log('lanugage--------', storedLanguage)
          await fetchCategoryPic(authToken,storedLanguage);
          // await fetchAllSubCategory(authToken,storedLanguage,categoryId);
        }
      } catch (error) {
        console.error("Error fetching language:", error);
      }
    };

    fetchLanguage();
  }, [isFocused, authToken]);

  
  // const fetchCategoryPic = async userToken => {
  //   const token = userToken;
  const fetchCategoryPic = async (token,lang) => {
    try {
      const response = await fetch(
        base_url + 'picCategory/getAllPicCategories',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();

        // console.log('Data ', data);

        // Use the data from the API to set the categories
        const categories = data.AllCategories.map(category => ({
          // label: category.name, 
          label: lang === 'fr' && category.french_name ? category.french_name : category.name,
          value: category.id.toString(), // Convert "id" to a string for the value
        }));
        setCategorySelect(categories);
        

        // console.log('categooooooooooooooooooooo', data.AllCategories)
        // setCategorySelect(data.AllCategories);
      

        // console.log('Data Categories', categoriesSelect);
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


  useEffect(() => {
    if (authToken && categoryId) {
      fetchAllSubCategory(categoryId);
    }
  }, [authToken, categoryId]);

  const fetchAllSubCategory = async (categoryId) => {
    try {
      const response = await fetch(`${base_url}pic/sub_category/getAllByCategory?category_id=${categoryId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        const subcategories = result.AllCategories.map(category => ({
          // label: category.name, // Use the "name" property as the label
          label: language === 'fr' && category.french_name ? category.french_name : category.name,
          value: category.id.toString(), // Convert "id" to a string for the value
        }));
          const reverseData = subcategories.reverse();
          setSubCate(reverseData);



        // setSubCate(result.AllCategories);
      } else {
        console.error('Failed to fetch subcategories:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  
////////////////////////////////////////////////////////////////////////
  //---------------------------\\

  //-----------------\\

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
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
            setImageInfo(response.assets[0]);
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
        setImageInfo(response.assets[0]);
      }

      console.log('response', imageInfo);

      ref_RBSheetCamera.current.close();
    });
  };

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisible(false);
      navigation.replace("ViewProfile");
    }, 3000);
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(true);
  };

  const handleUpdatePasswordAlert = async () => {
    setsnackbarVisibleAlert(true);
    setTimeout(() => {
      setsnackbarVisibleAlert(false);
    }, 3000);
  };
  const dismissSnackbarAlert = () => {
    setsnackbarVisibleAlert(false);
  };
  const checkUpdate = async () => {
    const cloudinaryUrl = 'http://res.cloudinary.com';
    console.log('Image Info', imageInfo?.uri);
    console.log('Data Fetched', dataFetched);
    if (
      dataFetched && // Check if data has been fetched
      imageInfo &&
      imageInfo.uri &&
      imageInfo.uri.startsWith(cloudinaryUrl)
    ) {
      uploadXpiVideoWithOutAnyVideoChange();
    } else {
      handleUploadVideoC();
    }
  };

  // image upload 
  const handleUploadVideoC = data1 => {
    setLoading(true);
    const uri = imageInfo.uri;
    const type = imageInfo.type;
    const name = imageInfo.fileName;
    const sourceImage = {uri, type, name};
    console.log('Source Image', sourceImage);
    const dataImage = new FormData();
    dataImage.append('file', sourceImage);
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
        uploadXpiVideoWithPicChange(data.url);
        //uploadVideo(data.url)
        //uploadXpiVideo(data.url);
        console.log('Image Url', data);
      })
      .catch(err => {
        setLoading(false);
        console.log('Error While Uploading Video', err);
      });
  };

  const uploadXpiVideoWithPicChange = async data => {
    console.log('Image', data);
    const token = authToken;
    const apiUrl = base_url + 'picTour/updatePicTour';

    const requestData = {
      id: receivedData?.pic_tour_id,
      name: profileName,
      image: data,
      description: description,
      pic_category: categoryId,
      sub_category: subcategory,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response of Videos:', data);
        setLoading(false);
        handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          'Failed to upload video:',
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

  const uploadXpiVideoWithOutAnyVideoChange = async () => {
    setLoading(true);

    const token = authToken;
    const apiUrl = base_url + 'picTour/updatePicTour';

    const requestData = {
      id: receivedData?.pic_tour_id,
      name: profileName,
      image: receivedData?.image,
      description: description,
      pic_category: categoryId,
      sub_category: subcategory,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response of Videos:', data);
        setLoading(false);
        handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          'Failed to upload video uploadXpiVideoWithOutAnyVideoChange:',
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

  // console.log('thumbnail---', imageInfo)
  // console.log('picNameError---', profileName)
  console.log('categoryId---', categoryId)
  console.log('sub iddddd', subcategory)
  // console.log('description---', description)


  const [isCategoryActive, setIsCategoryActive] = useState(false); // Track if category dropdown is active
  const [isSubCategoryActive, setIsSubCategoryActive] = useState(false);
    const handleCategoryFocus = () => {
      setIsCategoryActive(true);
      setIsSubCategoryActive(false); // Make the sub-category dropdown inactive
    };
    
    const handleCategoryBlur = () => {
      setIsCategoryActive(false);
    };
    
    const handleSubCategoryFocus = () => {
      setIsSubCategoryActive(true);
      setIsCategoryActive(false); // Make the category dropdown inactive
    };
    
    const handleSubCategoryBlur = () => {
      setIsSubCategoryActive(false);
    };
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior="height" // You can use ‘height’ as well, depending on your preference
      enabled>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons name={'chevron-back'} color={'#282828'} size={25} />
        </TouchableOpacity>

        <Text style={styles.headerText}>{t('UpdatePic')}</Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <View
          style={{
            marginTop: hp(5),
            height: hp(30),
            borderRadius: wp(8),
            marginHorizontal: wp(23),
          }}>
          {imageInfo !== null && (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1, // Ensure it's on top of other elements
                flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(8),
                resizeMode: 'contain',
              }}
              source={{uri: imageInfo.uri}}
            />
          )}
          <TouchableOpacity
            onPress={() => ref_RBSheetCamera.current.open()}
            style={{
              position: 'absolute',
              top: 10,
              left: 8,
              height: hp(3),
              width: wp(21),
              borderRadius: wp(3),
              backgroundColor: '#FACA4E',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2, // Ensure it's on top
            }}>
            <Text
              style={{
                fontSize: hp(1.3),
                fontFamily: 'Inter',
                color: '#232323',
                fontWeight: '700',
              }}>
                {t('ChangePic')}
              {/* Change Pic */}
            </Text>
          </TouchableOpacity>
          {imageInfo == null && (
            <Image
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(8),
                resizeMode: 'stretch',
                zIndex: 0, // Ensure it's below other elements when no image
              }}
              source={appImages.updatePics}
            />
          )}
         
        </View>
        <View style={{marginLeft:25}}>
{thumbnailError ? <Text style={styles.errorText}>{thumbnailError}</Text> : null}
        </View>
        <TextInput
          mode="outlined"
          label={t('PicName')}
          value={profileName}
          outlineStyle={{borderRadius: wp(3)}}
          onChangeText={text => setProfileName(text)}
          style={styles.ti}
          outlineColor="#0000001F"
          placeholderTextColor={'#646464'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        />

        <View style={{marginHorizontal: wp(7)}}>
          <Dropdown
            // style={
            //   isFocus
            //     ? styles.textInputSelectedCategory
            //     : styles.textInputCategoryNonSelected
            // }
            style={
              isCategoryActive
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
            value={categoryId}
            data={categoriesSelect}
            search={false}
            maxHeight={200}
            // labelField="name"
            // valueField="id"
            labelField="label"
            valueField="value"
            placeholder={t('SelectCategory')}
            searchPlaceholder="Search..."
            onFocus={handleCategoryFocus}
            onBlur={handleCategoryBlur}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={item => {
              console.log("kon category id hai----?? ", item.value);
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
        <View style={{ marginHorizontal: wp(7), marginTop:hp(-2) }}>
            <Dropdown
            //  style={styles.textInputCategoryNonSelected}
              style={
                isSubCategoryActive
                  ? styles.textInputSelectedCategory
                  : styles.textInputCategoryNonSelected
              }
              containerStyle={{
                marginTop: 3,
                alignSelf: "center",
                borderRadius: wp(3),
                width: "100%",
              }}
              // dropdownPosition="top"
              // mode="modal"
              placeholderStyle={{
                color: "#121420",
                //   fontWeight: '400',
                fontFamily: "Inter",
                fontSize: hp(1.8),
              
              }}
              iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
              itemTextStyle={{ color: "#000000", }}
              selectedTextStyle={{ fontSize: 16, color: "#000000",   height: 42, textAlignVertical: "center",}}
              // inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              value={subcategory}
              data={subCate}
              search={false}
              maxHeight={200}
             labelField="label"
            valueField="value"
              placeholder={t('SelectSubCategory')}
              searchPlaceholder="Search..."
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onFocus={handleSubCategoryFocus}
              onBlur={handleSubCategoryBlur}
              onChange={(item) => {
                console.log("kon sub category id hai----", item.value);
                setSubCategory(item.value);
                setIsFocus(false);
              }}
              renderRightIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? '#000000' : '#000000'}
                  name="down"
                  size={15}
                />
              )}
            />
            <View>

            </View>
          </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp(-1),
          }}>
          <CPaperInput
            multiline={true}
            placeholder={t('Description')}
            placeholderTextColor="#121420"
            value={description}
            onChangeText={text => setDescription(text)}
            height={hp(20)}
          />
        </View>
        <View
          style={{
            marginTop: hp(5),
            marginBottom: hp(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomButton
            title={t('Update')}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
            
              if (!categoryId) {
                handleUpdatePasswordAlert()
            
              } else {
                checkUpdate();
              }

              // if (!profileName) {
              //   setPicNameError("Pic Title is required");
              //   hasError = true;
              // } else {
              //   setPicNameError("");
              // }

              // if (!categoryId) {
              //   setCategoryError("Category is required");
              //   hasError = true;
              // } else {
              //   setCategoryError("");
              // }

              // if (!description) {
              //   setDescriptionError("Description is required");
              //   hasError = true;
              // } else {
              //   setDescriptionError("");
              // }
           
              // checkUpdate();
              //handleUpdatePassword()
              //ref_RBSheetCamera.current.open();
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
          <Text style={styles.maintext}>{t('Selectanoption')}</Text>
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

            <Text style={{color: '#333333'}}>{t('Fromcamera')}</Text>
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

            <Text style={{color: '#333333'}}>{t('Fromgallery')}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <CustomSnackbar
        message={t('Success')}
        messageDescription={t('PicUpdatedSuccessfully')}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackBarVisible}
      />
   <CustomSnackbar
        message={t('Alert!')}
        messageDescription={t('KindlyFillAllFields')}
        onDismiss={dismissSnackbarAlert} // Make sure this function is defined
        visible={snackbarVisibleAlert}
      />
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
  },
  header: {
    flexDirection: 'row',
    height: hp(6.2),
    marginTop: hp(5),
    alignItems: 'center',
    marginHorizontal: wp(8),
  },
  headerText: {
    fontSize: hp(2.5),
    alignSelf: 'center',
    marginLeft: wp(23),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  ti: {
    marginHorizontal: '7%',
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
    width: '98%',
    borderColor: '#FACA4E',

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
