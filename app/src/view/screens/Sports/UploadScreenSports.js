
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
import { useIsFocused } from "@react-navigation/native";
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
import { useTranslation } from 'react-i18next';

export default function UploadScreenSports({navigation, route}) {
  const [selectedItem, setSelectedItem] = useState('');
  const { t } = useTranslation();
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
  const isFocused = useIsFocused();
  const ref_RBSendOffer = useRef(null);
  const [categoryError, setCategoryError] = useState("");
  const [subcategoryError, setSubcategoryError] = useState("");
  const [subCate, setSubCate] = useState([]);
  const [subcategory, setSubCategory] = useState("");

  const [profileNameError, setProfileNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const receivedData = route.params?.Video;

  const navigateToScreen = () => {
    ref_RBSendOffer.current.close();
    navigation.navigate('Signin_signup');
  };

  // useEffect(() => {
  //   // Make the API request and update the 'data' state
  //   fetchVideos();
  // }, []);

  // const fetchVideos = async () => {
  //   setLoading(true);
  //   await getUserID();
  //   setLoading(false);
  // };

  // const getUserID = async () => {
 
  //   try {
  //     const result = await AsyncStorage.getItem('userId ');
  //     if (result !== null) {
  //       setUserId(result);
        
  //     } else {
         
  //     }

  //     const result1 = await AsyncStorage.getItem('authToken ');
  //     if (result1 !== null) {
  //       setAuthToken(result1);
       
  //       await fetchCategory(result1);
  //     } else {
         
  //     }
  //   } catch (error) {
  //     // Handle errors here
  //     console.error('Error retrieving user ID:', error);
  //   }
  // };
  const dummyData2 = {
    AllCategories: [
      {
        id: 1,
        name: "Vehic",
        french_name: "Véhic",
      },
      {
        id: 2,
        name: "Tools ",
        french_name: "Outils ",
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storedUserId, storedUserName, storedAuthToken] =
          await Promise.all([
            AsyncStorage.getItem("userId "),
            AsyncStorage.getItem("userName"),
            AsyncStorage.getItem("authToken "),
          ]);

        if (storedUserId) setUserId(storedUserId);
        if (storedAuthToken) setAuthToken(storedAuthToken);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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


  const fetchCategory = async (token) => {
  

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
          // label: category.name, // Use the "name" property as the label
          label:
          language === "fr" && category.french_name
            ? category.french_name
            : category.name,
          value: category.id.toString(), // Convert "id" to a string for the value
        }));

        const reverseData = categories.reverse();
        setCategorySelect(reverseData); // Update the state with the formatted category data
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
    console.log("langiuuuuuuuuuuuuuuuuuuuuuuu---------", language);
    console.log("category---------", categoryId);
    // const token = authToken;
    try {
      const response = await fetch(
        
        base_url + `sports/sub_category/getAllByCategory?category_id=${categoryId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const result = await response.json();
      const subcategories = result.AllCategories.map(category => ({
        // label: category.name, // Use the "name" property as the label
        label:
        language === "fr" && category.french_name
            ? category.french_name
            : category.name,
        value: category.id.toString(), // Convert "id" to a string for the value
      }));
      const reverseData = subcategories.reverse();
      setSubCate(reverseData);
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
       
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
         
            setImageInfo(response.assets[0]);
            setImageUri(response.assets[0].uri);
           
          } else if (response.uri) {
         
            setImageInfo(response.assets[0]);
  
          }
        }
        ref_RBSheetCamera.current.close();
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo'}, response => {
       
      if (!response.didCancel && response.assets.length > 0) {
        setImageInfo(response.assets[0]);
        setImageUri(response.assets[0].uri);
        
      }
 
      setImageInfo(response.assets[0]);
      ref_RBSheetCamera.current.close();
    });
  };

  const handleUpdatePassword = async () => {
    setsnackbarVisible(true);

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

      const uri = imageInfo.uri;
      const type = imageInfo.type;
      const name = imageInfo.fileName;
      const source = {uri, type, name};

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
        createPicTour(data.url);
      })
      .catch(err => {
        setLoading(false);
        console.log('Error While Uploading Video', err);
      });
  };


const createPicTour = async (value) => {
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
    }
  } catch (error) {
    console.error('API Request Error:', error);
    setLoading(false);

  }
};

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

        <Text style={styles.headerText}>{t('UploadSports')}</Text>
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
                {t('ChangeSports')}
              {/* Change Sports */}
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
            label={t('Title')}
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
            placeholderStyle={{
              color: '#121420',
              fontFamily: 'Inter',
              fontSize: hp(1.8),
            }}
            iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
            itemTextStyle={{color: '#000000'}}
            selectedTextStyle={{fontSize: 16, color: '#000000'}}
            value={category}
            data={categoriesSelect}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={t('Select Category')}
            searchPlaceholder="Search..."
            onFocus={handleCategoryFocus}
            onBlur={handleCategoryBlur}

            onChange={item => {
              //setCategory(item.label);
              console.log("kon main category id hai----", item.value);
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
        
   
            placeholderStyle={{
              color: '#121420',
       
              fontFamily: 'Inter',
              fontSize: hp(1.8),
            }}
            iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
            itemTextStyle={{color: '#000000'}}
            selectedTextStyle={{fontSize: 16, color: '#000000'}}

            value={subcategory}
            data={subCate}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            onFocus={handleSubCategoryFocus}
            onBlur={handleSubCategoryBlur}
            placeholder={t('SelectSubCategory')}
            searchPlaceholder="Search..."
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              console.log("kon main category id hai----", item.value);
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
            placeholder={t('Description')}
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

<CustomLoaderButton
              title={t('Upload')}
              load={loading}
              customClick={() => {
                let hasError = false;

        
                if (!profileName) {
                  setProfileNameError(t('Titleisrequired')); 
                  hasError = true;
                } else {
                  setProfileNameError("");
                }

                if (!categoryId) {
                  setCategoryError(t('Categoryisrequired')); 
                  hasError = true;
                } else {
                  setCategoryError("");
                }

                if (!subcategory) {
                  setSubcategoryError(t('Subcategoryisrequired')); 
                  hasError = true;
                } else {
                  setSubcategoryError("");
                }

                if (!description) {
                  setDescriptionError(t('Descriptionisrequired'));
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
        messageDescription={t('Uploadsportssuccessfully')} 
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
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
