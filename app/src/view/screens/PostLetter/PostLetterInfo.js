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
  Platform,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';

import { Button, Divider, TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appImages } from '../../../assets/utilities/index';
import CustomButton from '../../../assets/Custom/Custom_Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PublicLetter from '../../../assets/svg/PublicLetter.svg';
import PrivateLetter from '../../../assets/svg/PrivateLetter.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SelectCountry, Dropdown } from 'react-native-element-dropdown';
import Headers from '../../../assets/Custom/Headers';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import { base_url } from '../../../../../baseUrl';
import Loader from '../../../assets/Custom/Loader';

export default function PostLetterInfo({ navigation }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [Username, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [categoryPublicType, setCategoryPublicType] = useState('');

  const [categoriesSelect, setCategorySelect] = useState([]);

  const [isFocus, setIsFocus] = useState(false);

  const [isFocusPublicType, setIsFocusPublicType] = useState(false);

  const [loading, setLoading] = useState(false);
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

  const [letterType, setLetterTypes] = useState('Public Letter');


  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [userImage, setUserImage] = useState();

  const [userId, setUserId] = useState('');

  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState("");
  const [subcategoryError, setSubcategoryError] = useState("");
  const [subCate, setSubCate] = useState([]);
  const [subcategory, setSubCategory] = useState("");
  const [profileNameError, setProfileNameError] = useState("");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    await getUserID();
    setLoading(false);
  };

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);
        userToken(result);
        userUserName();
      }

    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }

  };

  //--------------------------------\\

  const userToken = async id => {
    try {
      const result3 = await AsyncStorage.getItem('authToken ');
      if (result3 !== null) {
        setAuthToken(result3);
        authTokenAndId(id, result3);
      }
    } catch (error) {
    }
  };

  const userUserName = async id => {
    try {
      const result3 = await AsyncStorage.getItem('userName');
      if (result3 !== null) {
        setUserName(result3);  
      }
    } catch (error) {
    }
  };


  const authTokenAndId = async (id, token) => {
    fetchUser(id, token);
  };

  const fetchUser = async (id, tokens) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `user/getUser/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();

        setUserImage(data.user.image);
        await fetchCategory(id, tokens);
      } else {
        console.error(
          'Failed to fetch user:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      //await fetchCategory(id, tokens);
      console.error('Errors:', error);
    }
  };

  //----------------------------------\\

  const fetchCategory = async (id, tokens) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + 'discCategory/getAllDiscCategories?page=1&limit=10000',
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
      } else {
        console.error(
          'Failed to fetch categories:',
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
    try {
      const response = await fetch(`${base_url}news/sub_category/getAllByCategory?category_id=${categoryId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        const reverseData = result.AllCategories.reverse();
        setSubCate(reverseData);
      } else {
        console.error('Failed to fetch subcategories:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };




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
    setTimeout(() => {
      setsnackbarVisible(false);
    }, 3000);
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const CategoryPublicType = [
    { label: 'general', value: 'general' },
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
      navigation.navigate('PostLetterAllUserName', {
        name: name,
        address: address,
        contactNumber: contact,
        email: email,
        category_id: categoryId,
        letterType: categoryPublicType,
      });
    }
  };

  const checkOnPublicAndAuthorities = () => {
    console.log('Letter Type', categoryPublicType);
    if (categoryPublicType === 'general') {
      navigation.replace('PostLetter', {
        name: name,
        address: address,
        contactNumber: contact,
        email: email,
        category_id: '3',
        letterType: 'general',
      });
    } else {
      navigation.replace('PostLetter', {
        name: name,
        address: address,
        contactNumber: contact,
        email: email,
        category_id: '3',
        letterType: 'authorities',
      });
    }
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

      <View style={{ marginTop: hp(5), height: hp(8) }}>
        <Headers
          showBackIcon={true}
          showText={true}
          text={t('PostLetters')}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView style={{ flexGrow: 1 }}>
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
                source={{ uri: userImage }}
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
                style={{ marginTop: hp(0.5) }}
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
            onPress={() => {

              setTimeout(() => {
                ref_RBSheetCamera.current.open()
              }, 500);
            }}
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
            <Text style={{ color: '#FACA4E', fontFamily: 'Inter-Regular' }}>
              {letterType}
            </Text>

            <Ionicons name="chevron-down" size={21} color="#FACA4E" />
          </TouchableOpacity>  */}
        </View>

        <Text
          style={{
            color: '#FACA4E',
            fontFamily: 'Inter-Medium',
            fontSize: hp(2.3),
            marginTop: hp(3),
            marginLeft: wp(8),
          }}>
            {t('SenderInformation')}
          {/* Sender's Information */}
        </Text>

        <TextInput
          mode="outlined"
          label={t('Name')}
          onChangeText={text => setName(text)}
          style={[styles.ti, { marginTop: '5%' }]}
          outlineColor="#0000001F"
          placeholderTextColor={'#404040'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
 
        />

        <TextInput
          mode="outlined"
          label={t('Address')}
          onChangeText={text => setAddress(text)}
          style={[styles.ti, { marginTop: '5%' }]}
          outlineColor="#0000001F"
          placeholderTextColor={'#404040'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusAddress}
          onBlur={handleBlurAddress}
 
        />

        <TextInput
          mode="outlined"
          label={t('ContactNumber')}
          onChangeText={text => setContact(text)}
          style={[styles.ti, { marginTop: '5%' }]}
          outlineColor="#0000001F"
          placeholderTextColor={'#404040'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusContact}
          onBlur={handleBlurContact}
          keyboardType="numeric" // Set keyboardType to 'numeric'

   
        />

        <TextInput
          mode="outlined"
          label={t('EmailAddress')}
          onChangeText={text => setEmail(text)}
          style={[styles.ti, { marginTop: '5%' }]}
          outlineColor="#0000001F"
          placeholderTextColor={'#404040'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusEmail}
          onBlur={handleBlurEmail}
  
        />




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
            value={category}
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
          style={{ marginLeft: wp(8), marginTop: hp(1.8), marginRight: wp(8) }}>
          <Dropdown
            style={styles.textInputCategoryNonSelected}
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
            itemTextStyle={{ color: '#000000' }}
            selectedTextStyle={{ fontSize: 16, color: '#000000' }}

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

        <View style={{ marginTop:Platform.OS =="ios"? "15%" : '30%', alignSelf: 'center' }}>
          <CustomButton
            title={t('Next')}
            customClick={() => {
              if (
                name !== '' &&
                address !== '' &&
                contact !== '' &&
                email !== ''
                // categoryPublicType !== ''
              ) {
                uploadLetter();
              } else {
                handleUpdatePassword();
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
              justifyContent: 'space-evenly',
              marginTop: hp(3),
            }}>
            <TouchableOpacity
              onPress={() => setLetterType('Public Letter')}
              style={{ flexDirection: 'row', marginHorizontal: wp(7) }}>
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
          <Image source={appImages.alert} style={{ resizeMode: 'contain' }} />

          <Text
            style={{
              color: '#333333',
              marginLeft: wp(1),
              fontSize: hp(2.3),
              fontFamily: 'Inter-Bold',
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
              fontFamily: 'Inter-Regular',
            }}>
              {t('UpgradeForPrivateLetterPostingAndASeamlessExperience')}
            {/* Upgrade for private letter posting and a{'\n'}seamless experience */}
          </Text>

          <View style={{ marginHorizontal: wp(10) }}>
            <CustomButton
              title={t('BuySubscription')}
              customClick={() => {
                ref_RBSendOffer.current.close();
                setLetterTypes('Public Letter');
                navigation.navigate('SubscriptionPayment');
              }}
              style={{ width: wp(59) }}
            />
          </View>

          <TouchableOpacity onPress={() => {
            setLetterTypes('Public Letter');
            ref_RBSendOffer.current.close();
          }}>
            <Text
              style={{
                color: '#9597A6',
                marginLeft: wp(1),
                marginBottom: hp(3),
                fontSize: hp(2),
                textAlign: 'center',
                lineHeight: hp(3),
                fontFamily: 'Inter-Regular',
                //fontWeight: 'bold',
              }}>
                {t('MaybeLater')}
              {/* Maybe later */}
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

{loading && <Loader />}
  

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
