
import {
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {appImages} from '../../../assets/utilities/index';
import CustomButton from '../../../assets/Custom/Custom_Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../../assets/Custom/CPaperInput';
import { base_url } from '../../../../../baseUrl';
import { CLOUD_NAME, CLOUDINARY_URL, UPLOAD_PRESET } from '../../../../../cloudinaryConfig';
import CustomLoaderButton from '../../../assets/Custom/CustomLoaderButton';


export default function UploadScreenSports({navigation, route}) {
  const [selectedItem, setSelectedItem] = useState('');

  const [profileName, setProfileName] = useState('');

  const [loading, setLoading] = useState(false);

  const [authToken, setAuthToken] = useState('');

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [category, setCategory] = useState('');

  const [userId, setUserId] = useState('');

  const [categoriesSelect, setCategorySelect] = useState([]);

  const [categoryId, setCategoryId] = useState('');

  const [description, setDescription] = useState('');

  const [imageUri, setImageUri] = useState(null);

  const [videoUrl, setImageUrl] = useState('');

  const [imageInfo, setImageInfo] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const ref_RBSheetCamera = useRef(null);

  const ref_RBSendOffer = useRef(null);
  const [categoryError, setCategoryError] = useState("");
  const [subcategoryError, setSubcategoryError] = useState("");
  const [subCate, setSubCate] = useState([]);
  const [subcategory, setSubCategory] = useState("");

  const [profileNameError, setProfileNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [thumbnailError, setthumbnailImageUritwoError] = useState("");


  const receivedData = route.params?.Video;

  // console.log('Recieved Data', receivedData);

  const navigateToScreen = () => {
    ref_RBSendOffer.current.close();
    navigation.navigate('Signin_signup');
  };

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    await getUserID();
    setLoading(false);
  };

  const getUserID = async () => {
    // console.log("Id's");
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);
        // console.log('user id retrieved:', result);
      } else {
        console.log('result is null', result);
      }

      const result1 = await AsyncStorage.getItem('authToken ');
      if (result1 !== null) {
        setAuthToken(result1);
        // console.log('user token retrieved:', result1);
        await fetchCategory(result1);
      } else {
        console.log('result is null', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchCategory = async userToken => {
    const token = userToken;

    try {
      const response = await fetch(
        base_url + 'sports/category/getAll?page=1&limit=100000',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        const categories = data.AllCategories.map(category => ({
          label: category.name, // Use the "name" property as the label
          value: category.id.toString(), // Convert "id" to a string for the value
        }));

        setCategorySelect(categories); // Update the state with the formatted category data

        // console.log('Data main Categories', categoriesSelect);
        setImageInfo(receivedData);
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
    // console.log("Categry in id--", categoryId)
    const token = authToken;
    try {
      const response = await fetch(
        // base_url + "cinematics/sub_category/getAll?page=1&limit=1000",
        base_url + `sports/sub_category/getAllByCategory?category_id=${categoryId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      const subcategories = result.AllCategories.map(category => ({
        label: category.name, // Use the "name" property as the label
        value: category.id.toString(), // Convert "id" to a string for the value
      }));
      setSubCate(subcategories);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

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
        videoQuality: 'medium',
      },
      response => {
        console.log('image here', response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            //setImageUri(response.assets[0].uri);
            // setImageUri(response.assets[0])
            setImageInfo(response.assets[0]);
            setImageUri(response.assets[0].uri);
            console.log('response', response.assets[0]);
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            // setImageUri(response.uri);
            console.log('response of image', response.assets[0]);

            setImageInfo(response.assets[0]);

            //console.log('response', response.uri);
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
        setImageInfo(response.assets[0]);
        setImageUri(response.assets[0].uri);
        console.log('response', response.assets[0]);
      }
      console.log('response', response.assets[0]);

      setImageInfo(response.assets[0]);

      //console.log('response', imageUri);

      ref_RBSheetCamera.current.close();
    });
  };

  const handleUpdatePassword = async () => {
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);
      navigation.replace('Sports');
    }, 3000);
  };

  const upload = async () => {
    if (
      imageInfo !== null &&
      profileName !== '' &&
      categoryId !== '' &&
      description !== ''
    ) {
      //uploadVideo()
      //uploadVideos()
      const uri = imageInfo.uri;
      const type = imageInfo.type;
      const name = imageInfo.fileName;
      const source = {uri, type, name};
      console.log('Video Source', source);
      handleUploadImage(source);
    } else {
      setModalVisible(true);
    }
  };
 
  const handleUploadImage = data => {
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
        //uploadVideo(data.url)
        //uploadXpiVideo(data.url);
        console.log('Image Url', data);

        createPicTour(data.url);
        //uploadXpiVideo(data.url,data)
        // uploadVideo(data.url);
      })
      .catch(err => {
        setLoading(false);
        console.log('Error While Uploading Video', err);
      });
  };


  // const createPicTour = async value => {
  //   console.log('Image Value', value);

  //   console.log('Profile Name', profileName);

  //   console.log('Description', description);

  //   console.log('category id', categoryId);

  //   console.log('user id', userId);

  //   console.log("for upload sub subcategory Categry----", subcategory)

  //   const token = authToken;
  //   const apiUrl = base_url + 'sports/create';

  //   // Construct the request data as FormData
  //   const formData = new FormData();

  //   formData.append('name', profileName);
  //   formData.append('description', description);
  //   formData.append('category_id', categoryId);
  //   formData.append('sub_category_id', subcategory);
  //   formData.append('user_id', userId);
  //   formData.append('image', value);

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Use the provided token
  //         'Content-Type': 'multipart/form-data', // Set the content type to FormData
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log('API Response:', responseData);
  //       setLoading(false);
  //       handleUpdatePassword();
  //       // Handle the response data as needed
  //     } else {
  //       setLoading(false);
  //       console.error(
  //         'Failed to upload video:',
  //         response.status,
  //         response.statusText,
  //       );
  //       // Handle the error
  //     }
  //   } catch (error) {
  //     console.error('API Request Error:', error);
  //     setLoading(false);
  //     // Handle the error
  //   }
  // };
////////////////////////////////
const createPicTour = async (value) => {

  console.log('category id', categoryId);
  console.log("subcategory id", subcategory)
  console.log('user id', userId);
  console.log('Profile Name', profileName);
  console.log('Description', description);
  console.log('Image Value', value);


  const token = authToken;
  const apiUrl = base_url + 'sports/create';

  const requestData = {
    category_id: categoryId,
    sub_category_id: subcategory,
    user_id: userId,
    name: profileName,
    description: description,
    image: value,

    
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

  // ////////////////////////
  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };



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

        <Text style={styles.headerText}>Upload Sports</Text>
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
              Change Pic
            </Text>
          </TouchableOpacity>
          {imageInfo == null && (
            <View style={{ width: '100%',
              height: '100%', borderRadius: wp(8), justifyContent: 'center', borderWidth:.5,
              alignItems: 'center', }}>
               <Image
              style={{
            
                zIndex: 0, // Ensure it's below other elements when no image
              }}
              source={appImages.Upload}
            />
              </View>
           
          )}
        </View>

        <View style={{marginRight: wp(2)}}>
          <TextInput
            mode="outlined"
            label="Title"
            outlineStyle={{borderRadius: wp(3)}}
            onChangeText={text => setProfileName(text)}
            style={[styles.ti, {borderRadius: wp(10)}]}
            outlineColor="#0000001F"
            placeholderTextColor={'#646464'}
            activeOutlineColor="#FACA4E"
            autoCapitalize="none"
            onFocus={handleFocus}
            onBlur={handleBlur}
            // left={isTextInputActive ? <Oemail /> : <Gemail />}
          />
            <View style={{marginLeft:25}}>
{profileNameError ? <Text style={styles.errorText}>{profileNameError}</Text> : null}
        </View>

        </View>

        <View style={{marginHorizontal: wp(7)}}>
          <Dropdown
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
            value={category}
            data={categoriesSelect}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={'Select Category'}
            searchPlaceholder="Search..."
            onFocus={handleCategoryFocus}
            onBlur={handleCategoryBlur}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={item => {
              //setCategory(item.label);
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
          <View style={{ marginTop:hp(-3), marginBottom:hp(3)}}>
                    {categoryError ? <Text style={styles.errorText}>{categoryError}</Text> : null}
                    </View>
        </View>
        {/* for sub category */}
        <View style={{marginHorizontal: wp(7), marginTop:hp(-2)}}>
          <Dropdown
            style={
              isSubCategoryActive
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
            value={subcategory}
            data={subCate}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            onFocus={handleSubCategoryFocus}
            onBlur={handleSubCategoryBlur}
            placeholder={'Select Sub Category'}
            searchPlaceholder="Search..."
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              console.log("kon sub category id hai----", item.value);
              setSubCategory(item.value);
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
          <View style={{ marginTop:hp(-3), marginBottom:hp(3)}}>
          {subcategoryError ? <Text style={styles.errorText}>{subcategoryError}</Text> : null}
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
            placeholder={'Description'}
            placeholderTextColor="#121420"
            value={description}
            onChangeText={text => setDescription(text)}
            height={hp(20)}
          />
        </View>
            <View style={{marginLeft:hp(4), marginTop:-10, marginBottom:15}}>
        {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
        </View>
        <View
          style={{
            marginTop: hp(5),
            marginBottom: hp(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <CustomButton
            title={'Upload'}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              //handleUpdatePassword()
              console.log('Upload Pics');
              if (userId !== '') {
                //uploadVideos();
                upload(); 
              } else {
                ref_RBSendOffer.current.open();
              }
              //navigation.navigate('Profile_image');
            }}
          /> */}


<CustomLoaderButton
              title={"Upload"}
              load={loading}
              customClick={() => {
                let hasError = false;

        
                if (!profileName) {
                  setProfileNameError("Title is required");
                  hasError = true;
                } else {
                  setProfileNameError("");
                }

                if (!categoryId) {
                  setCategoryError("Category is required");
                  hasError = true;
                } else {
                  setCategoryError("");
                }

                if (!subcategory) {
                  setSubcategoryError("Subcategory is required");
                  hasError = true;
                } else {
                  setSubcategoryError("");
                }

                if (!description) {
                  setDescriptionError("Description is required");
                  hasError = true;
                } else {
                  setDescriptionError("");
                }

                if (!hasError) {
                  if (!loading) {
                    setLoading(true);
                    upload();
                  } else {
                    ref_RBSendOffer.current.open();
                  }
                }
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
        messageDescription={'Upload sports successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
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
    //width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 100,
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
