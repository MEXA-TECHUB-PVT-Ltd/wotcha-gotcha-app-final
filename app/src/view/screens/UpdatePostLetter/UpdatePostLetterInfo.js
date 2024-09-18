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
import Entypo from 'react-native-vector-icons/Entypo';
import { useTranslation } from 'react-i18next';
import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlusPost from '../../../assets/svg/PlusPost.svg';
import Approved from '../../../assets/svg/Approved.svg';

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
import PublicLetter from '../../../assets/svg/PublicLetter.svg';
import PrivateLetter from '../../../assets/svg/PrivateLetter.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../../assets/Custom/CPaperInput';
import Headers from '../../../assets/Custom/Headers';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import { base_url } from '../../../../../baseUrl';

export default function UpdatePostLetterInfo({navigation, route}) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [categoryPublicType, setCategoryPublicType] = useState('');

  const [categoriesSelect, setCategorySelect] = useState([]);

  const [isFocus, setIsFocus] = useState(false);

  const [isFocusPublicType, setIsFocusPublicType] = useState(false);

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [category, setCategory] = useState('');

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [isTextInputActiveAddress, setIsTextInputActiveAddress] =
    useState(false);

  const [isTextInputActiveContact, setIsTextInputActiveContact] =
    useState(false);

  const [isTextInputActiveEmail, setIsTextInputActiveEmail] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const ref_RBSheetCamera = useRef(null);

  const ref_RBSendOffer = useRef(null);

  const [authToken, setAuthToken] = useState('');

  const [postLetter, setPostLetter] = useState('');

  const [letterType, setLetterTypes] = useState('Public Letter');

  //statrs

  const [selectedItem, setSelectedItem] = useState('');

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [profileName, setProfileName] = useState('');

  const [imageUrl, setImageUrl] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [description, setDescription] = useState('');

  const [comment, setComment] = useState('');

  const [imageInfo, setImageInfo] = useState(null);

  const [userImage, setUserImage] = useState();

  const [userId, setUserId] = useState('');

  const [imageUri, setImageUri] = useState(null);

  const receivedData = route.params?.Video;

  const [categoryError, setCategoryError] = useState("");
  const [subcategoryError, setSubcategoryError] = useState("");
  const [subCate, setSubCate] = useState([]);
  const [subcategory, setSubCategory] = useState("");
  
  const [Username, setUserName] = useState('');
  console.log('category_id', receivedData.disc_category);
  // console.log('sub_category_id', receivedData.sub_category_id);
  // console.log('name', name);

  useEffect(() => {
    // Make the API request and update the 'data' state
    const fetchCategory = async () => {
      setName(receivedData?.name);
      setAddress(receivedData?.address)
      setContact(receivedData?.contact_no)
      setEmail(receivedData?.email)
      setCategoryPublicType(receivedData?.receiver_type)
      // setCategoryId(receivedData?.category_id);
      // setSubCategory(receivedData?.sub_category_id);
      setCategoryId(receivedData?.disc_category);
      setImageUrl(receivedData?.image); 
      setImageInfo({uri: receivedData?.image});
    };

    fetchCategory();
  }, []);

  // useEffect(() => {
  //   // Make the API request and update the 'data' state
  //   fetchVideos();
  // }, []);

  // const fetchVideos = async () => {
  //   // Simulate loading
  //   setLoading(true);

  //   await getUserID();
  //   // Fetch data one by one
  //   // Once all data is fetched, set loading to false
  //   setLoading(false);
  // };

  // const getUserID = async () => {
  //   try {
  //     const result = await AsyncStorage.getItem('userId ');
  //     if (result !== null) {
  //       setUserId(result);
  //       // console.log('user id retrieved:', result);

  //       userToken(result);
  //     }
  //   } catch (error) {
  //     // Handle errors here
  //     console.error('Error retrieving user ID:', error);
  //   }

  // };

  // //--------------------------------\\

  // const userToken = async id => {
  //   try {
  //     const result3 = await AsyncStorage.getItem('authToken ');
  //     if (result3 !== null) {
  //       setAuthToken(result3);
  //       //await fetchCategory(result3, id);
  //       authTokenAndId(id, result3);
  //       userUserName();
  //     }
  //   } catch (error) {
  //     // Handle errors here
  //     console.error('Error retrieving user ID:', error);
  //   }
  // };

  // const userUserName = async id => {
  //   try {
  //     const result3 = await AsyncStorage.getItem('userName');
  //     if (result3 !== null) {
  //       setUserName(result3);  
  //     }
  //   } catch (error) {
  //   }
  // };

  // const authTokenAndId = async (id, token) => {
  //   fetchUser(id, token);
  // };

  // const fetchUser = async (id, tokens) => {
  //   // console.log('USER', id);
  //   // console.log('TOKEN', tokens);
  //   const token = tokens;

  //   try {
  //     const response = await fetch(
  //       base_url + `user/getUser/${id}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       // console.log('IMAGE', data.user.image);

  //       // Use the data from the API to set the categories
  //       setUserImage(data.user.image);
  //       await fetchCategory(id, tokens);
  //     } else {
  //       console.error(
  //         'Failed to fetch user:',
  //         response.status,
  //         response.statusText,
  //       );
  //     }
  //   } catch (error) {
  //     //await fetchCategory(id, tokens);
  //     console.error('Errors:', error);
  //   }
  // };

  // //----------------------------------\\

  // const fetchCategory = async (id, tokens) => {
  //   const token = tokens;

  //   try {
  //     const response = await fetch(
  //       base_url + 'discCategory/getAllDiscCategories?page=1&limit=5',
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     if (response.ok) {
  //       const data = await response.json();

  //       // Use the data from the API to set the categories
  //       const categories = data.AllCategories.map(category => ({
  //         label: category.name, // Use the "name" property as the label
  //         value: category.id.toString(), // Convert "id" to a string for the value
  //       }));

  //       // console.log('Categories', categories);

  //       setCategorySelect(categories); // Update the state with the formatted category data

  //       // console.log('Data Categories', categoriesSelect);
  //     } else {
  //       console.error(
  //         'Failed to fetch categories:',
  //         response.status,
  //         response.statusText,
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Errors:', error);
  //   }
  // };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storedUserId, storedUserName, storedAuthToken] = await Promise.all([
          AsyncStorage.getItem('userId '),
          AsyncStorage.getItem('userName'),
          AsyncStorage.getItem('authToken ')
        ]);

        if (storedUserId) setUserId(storedUserId);
        if (storedUserName) setUserName(storedUserName);
        if (storedAuthToken) setAuthToken(storedAuthToken);

        if (storedUserId && storedAuthToken) {
          await fetchUser(storedUserId, storedAuthToken);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  const fetchUser = async (id, token) => {
    try {
      const response = await fetch(`${base_url}user/getUser/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserImage(data.user.image);
        fetchCategory(token);
      } else {
        console.error('Failed to fetch user:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchCategory = async (id, token) => {
    // const token = token;
    console.log('user token-----------', authToken )
    try {
      const response = await fetch(
        base_url + 'discCategory/getAllDiscCategories?page=1&limit=10000',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
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
        
      } else {
        console.error(
          'Failed to fetch categ',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Errors:', error);
    }
  };

  useEffect(() => {
    if (authToken && categoryId) {
      fetchAllSubCategory(categoryId);
    }
  }, [authToken, categoryId]);

  const fetchAllSubCategory = async (categoryId) => {
    console.log('id ahi', categoryId)
    try {
      const response = await fetch(`${base_url}discSubCategory/get-all?search=Test&category_id=${categoryId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        const reverseData = result.data
        console.log('sub cate data for -------', reverseData)
        setSubCate(reverseData);
      } else {
        console.error('Failed to fetch subcategories:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };
////////////////////////////////////////////////////////////////////////




  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  const handleFocusAddress = () => {
    setIsTextInputActiveAddress(true);
  };

  const handleBlurAddress = () => {
    setIsTextInputActiveAddress(false);
  };

  const handleFocusContact = () => {
    setIsTextInputActiveContact(true);
  };

  const handleBlurContact = () => {
    setIsTextInputActiveContact(false);
  };

  const handleFocusEmail = () => {
    setIsTextInputActiveEmail(true);
  };

  const handleBlurEmail = () => {
    setIsTextInputActiveEmail(false);
  };

  const handleUpdatePassword = async () => {
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);
    }, 3000);
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const CategoryPublicType = [
    {label: 'general', value: 'general'},
    {
      label: 'Celebrities, authorities, leaders',
      value: 'Celebrities, authorities, leaders',
    },
  ];

  const setLetterType = value => {
    setLetterTypes(value);
    ref_RBSheetCamera.current.close();
  };

  const setType = () => {
    ref_RBSheetCamera.current.close();

    setLetterType('Private Letter');

    ref_RBSendOffer.current.open();
  };

  const uploadLetter = () => {
    if (letterType == 'Public Letter') {
      checkOnPublicAndAuthorities();
    } else if (letterType == 'Private Letter') {
      navigation.navigate('UpdatePostLetterAllUserName', {
        name: name,
        address: address,
        contactNumber: contact,
        email: email,
        category_id: categoryId,
        letterType: categoryPublicType,
        receivedData:receivedData
      });
    }
  };

  const checkOnPublicAndAuthorities = () => {
    // console.log('Letter Type', categoryPublicType);
    if (categoryPublicType === 'general') {
      navigation.replace('UpdatePtLetter', {
        name: name,
        address: address,
        contactNumber: contact,
        email: email,
        category_id: categoryId,
        letterType: subcategory,
        // letterType: categoryPublicType,
        // category_id: '3',
        // letterType: 'general',
        receivedData:receivedData
      });
    } else {
      navigation.replace('UpdatePtLetter', {
        name: name,
        address: address,
        contactNumber: contact,
        email: email,
        category_id: categoryId,
        letterType: subcategory,
        // letterType: categoryPublicType,
        // category_id: '3',
        // letterType: 'authorities',
        receivedData:receivedData
      });
    }
  };

  const renderSearches = item => {
    // console.log('Items', item);
    const isSelected = selectedItemId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            // backgroundColor: isSelected ? '#FACA4E' : null,
          },
        ]}
        onPress={() => {
          setSelectedItemId(item.id);
          // console.log('Selected item:', item.title);
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#FACA4E' : '#939393'},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
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
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{marginTop: hp(5), height: hp(8)}}>
        <Headers
          showBackIcon={true}
          showText={true}
          text={'Post Letter'}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView style={{flexGrow: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(8),
            alignItems: 'center',
            marginTop: hp(3),
            height: hp(8),
          }}>
          {userImage !== undefined ? (
            <View
              style={{
                width: wp(12),
                marginLeft: wp(0.5),
                height: wp(12),
                borderRadius: wp(12) / 2,
              }}>
              <Image
                source={{uri: userImage}}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  borderRadius: wp(12) / 2,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(10),
                marginLeft: wp(3),
                height: wp(10),
                overflow: 'hidden',
                borderRadius: wp(10) / 2,
              }}>
              <MaterialCommunityIcons
                style={{marginTop: hp(0.5)}}
                name={'account-circle'}
                size={35}
                color={'#FACA4E'}
              />
            </View>
          )}

<Text
            style={{
              color: '#333333',
              marginLeft: wp(3),
              fontFamily: 'Inter',
              fontWeight: 'bold',
            }}>
            {Username}
          </Text>
          {/* <TouchableOpacity
            onPress={() => ref_RBSheetCamera.current.open()}
            style={{
              flexDirection: 'row',
              marginLeft: wp(5),
              height: hp(5),
              width: wp(33),
              borderWidth: 0.5,
              borderColor: '#FACA4E',
              borderRadius: wp(5),
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Text style={{color: '#FACA4E', fontFamily: 'Inter-Regular'}}>
              {letterType}
            </Text>

            <Ionicons name="chevron-down" size={21} color="#FACA4E" />
          </TouchableOpacity> */}
        </View>

        <Text
          style={{
            color: '#FACA4E',
            fontFamily: 'Inter-Medium',
            fontSize: hp(2.3),
            marginTop: hp(3),
            marginLeft: wp(8),
          }}>
            {t('SendersInformation')}
          {/* Sender's Information */}
        </Text>

        <TextInput
          mode="outlined"
          label={t('Name')}
          value={name}
          onChangeText={text => setName(text)}
          style={[styles.ti, {marginTop: '5%'}]}
          outlineColor="#0000001F"
          placeholderTextColor={'#404040'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          /* left={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={'email-outline'}
                  size={23}
                  color={isTextInputActive == true ? '#FACA4E' : '#64646485'}
                />
              )}
            />
          } */
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        />

        <TextInput
          mode="outlined"
          label={t('Address')}
          value={address}
          onChangeText={text => setAddress(text)}
          style={[styles.ti, {marginTop: '5%'}]}
          outlineColor="#0000001F"
          placeholderTextColor={'#404040'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusAddress}
          onBlur={handleBlurAddress}
          /* left={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={'email-outline'}
                  size={23}
                  color={isTextInputActive == true ? '#FACA4E' : '#64646485'}
                />
              )}
            />
          } */
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        />

        <TextInput
          mode="outlined"
          label={t('ContactNumber')}
          value={contact}
          onChangeText={text => setContact(text)}
          style={[styles.ti, {marginTop: '5%'}]}
          outlineColor="#0000001F"
          placeholderTextColor={'#404040'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusContact}
          onBlur={handleBlurContact}
          keyboardType="numeric" // Set keyboardType to 'numeric'

          /* left={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={'email-outline'}
                  size={23}
                  color={isTextInputActive == true ? '#FACA4E' : '#64646485'}
                />
              )}
            />
          } */
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        />

        <TextInput
          mode="outlined"
          label={t('EmailAddress')}
          value={email}
          onChangeText={text => setEmail(text)}
          style={[styles.ti, {marginTop: '5%'}]}
          outlineColor="#0000001F"
          placeholderTextColor={'#404040'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusEmail}
          onBlur={handleBlurEmail}
          /* left={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={'email-outline'}
                  size={23}
                  color={isTextInputActive == true ? '#FACA4E' : '#64646485'}
                />
              )}
            />
          } */
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        />

        {/* <View style={{marginLeft: wp(8), marginRight: wp(8)}}>
          <Dropdown
            style={styles.textInputCategoryNonSelected}
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
              //setCategory(item.label);
              setCategoryId(item.value);
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
        </View> */}






        <View style={{ marginHorizontal: wp(7)}}>
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
            value={categoryId}
            data={categoriesSelect}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={t('SelectCategory')}
            searchPlaceholder="Search..."
            onFocus={handleCategoryFocus}
            onBlur={handleCategoryBlur}
            onChange={item => {
              setCategoryId(item.value);
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
              <View style={{ marginTop:hp(-3), marginBottom:hp(3)}}>
                    {categoryError ? <Text style={styles.errorText}>{categoryError}</Text> : null}
                    </View>
        </View>

        <View style={{ marginHorizontal: wp(7) }}>
          <Dropdown
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

            placeholderStyle={{
              color: "#121420",
              //   fontWeight: '400',
              fontFamily: "Inter",
              fontSize: hp(1.8),
            
            }}
            iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
            itemTextStyle={{ color: "#000000", }}
            selectedTextStyle={{ fontSize: 16, color: "#000000",   height: 42, textAlignVertical: "center",}}
            value={subcategory}
            data={subCate}
            search={false}
            maxHeight={200}
            labelField="name"
            valueField="id"
            placeholder={t('SelectSubCategory')}
            searchPlaceholder="Search..."
            onFocus={handleSubCategoryFocus}
            onBlur={handleSubCategoryBlur}
 
            onChange={(item) => {
              setSubCategory(item.id);
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
         <View style={{ marginTop:hp(-3), marginBottom:hp(3)}}>
          {subcategoryError ? <Text style={styles.errorText}>{subcategoryError}</Text> : null}
          </View>
        </View>















        {/* <View
          style={{marginLeft: wp(8), marginTop: hp(1.8), marginRight: wp(8)}}>
          <Dropdown
            style={styles.textInputCategoryNonSelected}
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
            value={categoryPublicType}
            data={CategoryPublicType}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={t('SelectType')}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocusPublicType(true)}
            onBlur={() => setIsFocusPublicType(false)}
            onChange={item => {
              //setCategory(item.label);
              setCategoryPublicType(item.value);
              setIsFocusPublicType(false);
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
        </View> */}

        <View style={{marginTop: '30%', alignSelf: 'center'}}>
          <CustomButton
            title={t('Next')}
            //load={loading}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              if (
                // name !== '' &&
                // address !== '' &&
                // contact !== '' &&
                // email !== '' &&


                name !== '' &&
                address !== '' &&
                contact !== '' &&
                email !== '' &&
                categoryId !== '' &&
                subcategory !== '' 
                // categoryPublicType !== ''
              ) {
                uploadLetter();
              } else {
                // console.log('Name', name);
                // console.log('Address', address);
                // console.log('Contact', contact);
                // console.log('categoryPublicType', categoryPublicType);
                handleUpdatePassword();
              }
              //navigation.navigate('PostLetter');
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
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              color: '#303030',
              fontSize: hp(2.3),
            }}>
              {t('SelectLetterType')}
           
          </Text>
          <TouchableOpacity>
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
            //flexDirection: 'row',
            justifyContent: 'space-evenly',
            //alignItems: 'center',
            //borderWidth: 3,
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => setLetterType('Public Letter')}
            style={{flexDirection: 'row', marginHorizontal: wp(7)}}>
            <PublicLetter height={23} width={23} />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
                {t('PublicLetter')}
              
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: hp(0.1),
              marginHorizontal: wp(8),
              marginTop: hp(3),
              backgroundColor: '#00000012',
            }}></View>

          <TouchableOpacity
            onPress={() => setType()}
            style={{
              flexDirection: 'row',
              marginTop: hp(2.5),
              marginHorizontal: wp(7),
            }}>
            <PrivateLetter height={23} width={23} />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
                {t('PrivateLetter')}
              
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

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
            height: hp(55),
          },
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginHorizontal: wp(8),
            justifyContent: 'space-evenly',
          }}>
          <Image source={appImages.alert} style={{resizeMode: 'contain'}} />

          <Text
            style={{
              color: '#333333',
              marginLeft: wp(1),
              fontSize: hp(2.3),
              //textDecorationLine:'underline',
              fontFamily: 'Inter-Bold',
              //fontWeight: 'bold',
            }}>
              {t('UnableToPost')}
            {/* Unable To Post! */}
          </Text>

          <Text
            style={{
              color: '#9597A6',
              marginLeft: wp(1),
              fontSize: hp(2),
              textAlign: 'center',
              lineHeight: hp(3),
              //textDecorationLine:'underline',
              fontFamily: 'Inter-Regular',
              //fontWeight: 'bold',
            }}>
               {t('UpgradeForPrivateLetterPostingAndASeamlessExperience')}
            {/* Upgrade for private letter posting and a{'\n'}seamless experience */}
          </Text>

          <View style={{marginHorizontal: wp(10)}}>
            <CustomButton
              title={t('BuySubscription')}
              customClick={() => {
                ref_RBSendOffer.current.close();
                navigation.navigate('SubscriptionPayment');
              }}
              style={{width: wp(59)}}
            />
          </View>

          <TouchableOpacity onPress={() => ref_RBSendOffer.current.close()}>
            <Text
              style={{
                color: '#9597A6',
                marginLeft: wp(1),
                marginBottom: hp(3),
                fontSize: hp(2),
                textAlign: 'center',
                lineHeight: hp(3),
                //textDecorationLine:'underline',
                fontFamily: 'Inter-Regular',
                //fontWeight: 'bold',
              }}>
                {t('Maybelater')}
              {/* Maybe later */}
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

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

      <CustomSnackbar
        message={t('Alert!')}
        messageDescription={t('KindlyFillAllFields')}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ti: {
    marginHorizontal: '7%',
    marginTop: '10%',
    // width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(1),
    width: '100%',
    borderColor: '#E7EAF2',
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    // marginBottom: 20,
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


  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(1),
    width: '100%',
    borderColor: '#FACA4E',

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    // marginBottom: 10,
    marginTop: hp(3),
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
