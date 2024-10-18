import {
    StyleSheet,
    FlatList,
    Text,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    StatusBar,
    ImageBackground,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState, useEffect, useRef} from 'react';
  import RBSheet from 'react-native-raw-bottom-sheet';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import PlusPost from '../../../assets/svg/PlusPost.svg';
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  import {appImages} from '../../../assets/utilities/index';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import IonIcons from 'react-native-vector-icons/Ionicons';
  import CPaperInput from '../../../assets/Custom/CPaperInput';
  import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
  import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
  import CustomDialog from '../../../assets/Custom/CustomDialog';
  import { base_url } from '../../../../../baseUrl';
  import { CLOUD_NAME, CLOUDINARY_URL, UPLOAD_PRESET } from '../../../../../cloudinaryConfig';
import CustomLoaderButton from '../../../assets/Custom/CustomLoaderButton';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from "@react-navigation/native";
  export default function QAFIUpload({navigation}) {
    const [selectedItem, setSelectedItem] = useState('');
    const { t } = useTranslation();
    const [snackbarVisible, setsnackbarVisible] = useState(false);
  
    const [snackbarVisibleAlert, setsnackbarVisibleAlert] = useState(false);
  
    const [userImage, setUserImage] = useState('');
  
    const [imageUrl, setImageUrl] = useState('');
  
    const [loading, setLoading] = useState(false);
  
    const [modalVisible, setModalVisible] = useState(false);
  
    const [isTextInputActive, setIsTextInputActive] = useState(false);
  
    const [category, setCategory] = useState('');
  
    const [description, setDescription] = useState('');
  
    const [comment, setComment] = useState('');
  
    const [imageInfo, setImageInfo] = useState(null);
  
    const [authToken, setAuthToken] = useState('');
  
    const [categoryId, setCategoryId] = useState('');
  
    const [userId, setUserId] = useState('');
  
    const [userName, setName] = useState('');
  
    const [categoriesSelect, setCategorySelect] = useState([]);
  
    const [imageUri, setImageUri] = useState(null);
  
    const [isFocus, setIsFocus] = useState(false);
    const isFocused = useIsFocused();
    const ref_RBSheetCamera = useRef(null);
  
    const ref_RBSendOffer = useRef(null);
    const [categoryError, setCategoryError] = useState("");
    const [subcategoryError, setSubcategoryError] = useState("");
    const [subCate, setSubCate] = useState([]);
    const [subcategory, setSubCategory] = useState("");
  
    const [profileNameError, setProfileNameError] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [storedUserId, storedUserName, storedAuthToken] = await Promise.all([
            AsyncStorage.getItem('userId '),
            AsyncStorage.getItem('userName'),
            AsyncStorage.getItem('authToken ')
          ]);
  
          if (storedUserId) setUserId(storedUserId);
          if (storedUserName) setName(storedUserName);
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
          // fetchCategory(token);
        } else {
          console.error('Failed to fetch user:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
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
        const response = await fetch(`${base_url}qafi/category/getAll?page=1&limit=10000`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          const categories = data.AllCategories.map(category => ({
            // label: category.name,
            label:
            lang === "fr" && category.french_name
              ? category.french_name
              : category.name,
            value: category.id.toString()
          }));
          const reverseData = categories.reverse();
          setCategorySelect(reverseData);
        } else {
          console.error('Failed to fetch categories:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
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
      try {
        const response = await fetch(`${base_url}qafi/sub_category/getAllByCategory?category_id=${categoryId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
  
        if (response.ok) {
          const result = await response.json();

          
      const subcategories = result.AllCategories.map((category) => ({
        // label: category.name, // Use the "name" property as the label
        label:
        language === "fr" && category.french_name
            ? category.french_name
            : category.name,
        value: category.id.toString(), // Convert "id" to a string for the value
      }));
      const reverseData = subcategories.reverse();
      console.log("result---------", reverseData);
      setSubCate(reverseData);


          // const reverseData = result.AllCategories.reverse();
          // setSubCate(reverseData);
        } else {
          console.error('Failed to fetch subcategories:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };
 
    const upload = async () => {
      if (imageUri !== null && comment !== '' && categoryId !== '') {
        handleUploadImage();
        //uploadVideo();
      } else {
        handleUpdatePasswordAlert();
      }
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
  
    const performAction = () => {
      setModalVisible(false);
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
          uploadVideo(data.url);
        })
        .catch(err => {
          setLoading(false);
          console.log('Error While Uploading Video', err);
        });
    };
  
    const uploadVideo = async data => {
      const token = authToken;
      const apiUrl = base_url + 'qafi/createQafi';
  
      const requestData = {
        description: comment,
        category: categoryId,
        sub_category: subcategory,
        image: data,
        user_id: userId,
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
      }
    };
  
  
    const handleUpdatePassword = async () => {
      setsnackbarVisible(true);
      setTimeout(() => {
        setsnackbarVisible(false);
        navigation.replace('QAFIScreen');
      }, 3000);
    };
  
    const dismissSnackbar = () => {
      setsnackbarVisible(false);
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

  
    const takePhotoFromCamera = async value => {
      setSelectedItem(value);
      launchCamera(
        {
          mediaType: 'Photo',
          //videoQuality: 'medium',
        },
        response => {
   
          if (!response.didCancel) {
            if (response.assets && response.assets.length > 0) {
              setImageUri(response.assets[0].uri);
       
              setImageInfo(response.assets[0]);
              ref_RBSheetCamera.current.close();
            } else if (response.uri) {
              // Handle the case when no assets are present (e.g., for videos)
              setImageUri(response.uri);
     
              ref_RBSheetCamera.current.close();
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
          setImageUri(response.assets[0].uri);
          setImageInfo(response.assets[0]);
          ref_RBSheetCamera.current.close();
        }  
        ref_RBSheetCamera.current.close();
      });
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
  
          <Text style={styles.headerText}>{t('PostQAFI')}</Text>
        </View>
  
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              height: hp(8),
              alignItems: 'center',
              marginTop: hp(3),
              marginHorizontal: wp(6),
              //borderWidth: 3,
            }}>
            <View
              style={{
                width: wp(10),
                marginLeft: wp(3),
                height: wp(10),
                borderRadius: wp(10) / 2,
              }}>
         
              {userImage ? (
                <View
                  style={{
                    width: wp(10),
                    marginLeft: wp(3),
                    height: wp(10),
                    overflow: 'hidden',
                    borderRadius: wp(10) / 2,
                  }}>
           
                  <Image
                    source={{uri: userImage}}
                    style={{width: '100%', height: '100%', resizeMode: 'cover'}}
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
            </View>
            <Text
              style={{
                color: '#333333',
                marginLeft: wp(5),
                fontFamily: 'Inter',
                fontWeight: 'bold',
              }}>
              {userName}
            </Text>
          </View>
  
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              marginTop: hp(-1),
            }}>
            <CPaperInput
              //multiline={true}
              placeholder={t('AddQAFI')}
              placeholderTextColor="#B0B0B0"
              value={comment}
              onChangeText={text => setComment(text)}
              //height={hp(5)}
            />
            

          </View>
          <View style={{marginHorizontal:hp('4%'), marginTop:hp('-2%')}}>
{profileNameError ? <Text style={styles.errorText}>{profileNameError}</Text> : null}
        </View>
  
          <TouchableOpacity
            onPress={() => ref_RBSheetCamera.current.open()}
            style={{
              flexDirection: 'row',
              height: hp(5),
              width: wp(35),
              alignItems: 'center',
              marginTop: hp(3),
              marginHorizontal: wp(8),
            }}>
            <TouchableOpacity onPress={() => ref_RBSheetCamera.current.open()}>
              <PlusPost />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: hp(1.8),
                marginLeft: wp(2),
                color: '#FACA4E',
                fontWeight: 'bold',
                fontFamily: 'Inter',
              }}>
                {t('AddImage')}
              
            </Text>
          </TouchableOpacity>
  
          {imageUri !== null ? (
            <View
              style={{
                marginTop: hp(5),
                height: hp(27),
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
          ) : null}
  
          <View style={{marginLeft: wp(8), marginRight: wp(7)}}>
            <Dropdown
              // style={styles.textInputCategoryNonSelected}
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
                //   fontWeight: '400',
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
                console.log("kon sub category id hai----", item.value);
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
              // labelField="name"
              // valueField="id"
                    labelField="label"
              valueField="value"
              placeholder={t('SelectSubCategory')}
              searchPlaceholder="Search..."
      
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
              <View style={{ marginTop:hp(-3), marginBottom:hp(3)}}>
          {subcategoryError ? <Text style={styles.errorText}>{subcategoryError}</Text> : null}
          </View>
            
          </View>
        </ScrollView>
  
        <View
          style={{
            height: hp(12),
            marginBottom: hp(3),
            justifyContent: 'flex-end',
            alignSelf: 'center',
          }}>

            <CustomLoaderButton
              title={t('Post')}
              load={loading}
              customClick={() => {
                let hasError = false;

        
                if (!comment) {
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
  
        <CustomDialog
          visible={modalVisible}
          onClose={closeModal}
          onAction={performAction}
          imageURL="URL_TO_YOUR_IMAGE"
        />
  
        <CustomSnackbar
          message={t('Success')}
          messageDescription={t('QAFIPostedSuccessfully')}
          onDismiss={dismissSnackbar} // Make sure this function is defined
          visible={snackbarVisible}
        />
  
        <CustomSnackbar
          message={t('Alert!')}
          messageDescription={t('KindlyFillAllFields')}
          onDismiss={dismissSnackbarAlert} // Make sure this function is defined
          visible={snackbarVisibleAlert}
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
      marginTop: hp(7),
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
  