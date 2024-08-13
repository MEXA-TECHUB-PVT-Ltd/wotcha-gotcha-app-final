import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Back from '../../../assets/svg/back.svg';
import {appImages} from '../../../assets/utilities/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Button, Divider, TextInput} from 'react-native-paper';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Headers from '../../../assets/Custom/Headers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../../assets/Custom/Custom_Button';
import User from '../../../assets/svg/User.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import CPaperInput from './../../../assets/Custom/CPaperInput';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import { base_url } from '../../../../../baseUrl';
import { CLOUD_NAME, CLOUDINARY_URL, UPLOAD_PRESET } from '../../../../../cloudinaryConfig';

export default function UpdateProfile({navigation}) {
  const [selectedItem, setSelectedItem] = useState('');

  const [imageInfo, setImageInfo] = useState(null);

  const [userName, setUserName] = useState('');

  const [email, setEmail] = useState('');

  const [price, setPrice] = useState('');

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [snackbarVisibleAlert, setsnackbarVisibleAlert] = useState(false);

  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [isTextInputActivePrice, setIsTextInputActivePrice] = useState(false);

  const [isTextInputActiveDescription, setIsTextInputActiveDescription] =
    useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [category, setCategory] = useState('');

  const [description, setDescription] = useState('');

  const [imageUri, setImageUri] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  //------------------------------------\\

  const [showFullContent, setShowFullContent] = useState(false);

  const [pastedURL, setPastedURL] = useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  );

  const [comments, setComments] = useState([]);

  const [snackbarDeleteVisible, setsnackbarDeleteVisible] = useState(false);

  const [likes, setLikes] = useState(null);

  const [commentsCount, setCommentsCount] = useState(null);

  const [showReply, setShowReply] = useState(false);

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState('');

  const [showMenu, setShowMenu] = useState(true);

  const [progress, setProgress] = useState(0);

  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  const ref_Comments = useRef(null);

  const [authToken, setAuthToken] = useState([]);

  const [userimage, setUserImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const handleImagePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  //------------------------------------\\

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading

    // Fetch data one by one
    await getUserID();
    //await fetchUser();
    // Once all data is fetched, set loading to false
  };

  const getUserID = async () => {
    console.log('AT User Id');

    setLoading(true);
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        await fetchUserId(result);
        // console.log('UpdateProfile screen user token retrieved of profile :', result);
      }

      /* console.log("User Id", userId);
      console.log("authToken", authToken); */
    } catch (error) {
      // Handle errors here
      setLoading(false);
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchUserId = async tokens => {
    console.log('Token', tokens);
    const result3 = await AsyncStorage.getItem('userId ');
    if (result3 !== null) {
      setUserId(result3);

      console.log('user id retrieved:', result3);
      fetchUser(tokens, result3);
    } else {
      setLoading(false);
      console.log('result is null', result3);
    }
  };

  const fetchUser = async (tokens, user) => {
    console.log('Came to fetch Id');
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `user/getUser/${user}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.user);
      
      // setUserName(result.user.image);
      setUserImage(result?.user?.image || "");
      setUserName(result.user.username);
      setEmail(result.user.email);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error USER:', error);
    }
  };

  //-------------------------------------\\

  const ref_RBSheetCamera = useRef(null);

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

  const Category = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
  ];

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const handleUpdatePasswordAlert = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisibleAlert(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisibleAlert(false);
      navigation.navigate('ViewProfile');
    }, 3000);
  };

  const dismissSnackbarAlert = () => {
    setsnackbarVisibleAlert(false);
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
            handle(response.assets[0]);
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setImageUri(response.uri);
            console.log('response', response.uri);
          }
        }
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
        handle(response.assets[0]);
      }
      console.log('response', imageInfo);
    });
  };

  const handle = imageInfo => {
    ref_RBSheetCamera.current.close();
    console.log('Image Infosssssssssss', imageInfo);
    handleUploadVideoC(imageInfo);
    /*  if(imageInfo!==null){
      console.log("Not Null");
      handleUploadVideoC();
    }else{
      console.log("Null");
    } */
    /*  handleUploadVideoC() */
  };

  const handleUploadVideoC = data1 => {
    ref_RBSheetCamera.current.close();
    setLoading(true);
    const uri = data1.uri;
    const type = data1.type;
    const name = data1.fileName;
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
        // Update the image at the selected index in your state
        uploadImage(data.url);
        // Update the image of the first object

        // Set the state with the updated array

        setLoading(false);
        ref_RBSheetCamera.current.close();
      })
      .catch(err => {
        setLoading(false);
        console.log('Error While Uploading Video', err);
      });
  };

  const uploadImage = async data => {
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

  const handleUpdateUser = () => {
    if (userName !== '') {
      updateUserName();
    } else {
      handleUpdatePasswordAlert();
    }
  };

  const updateUserName = async () => {
    setLoading(true);
    console.log('TOKEN', authToken);
    const token = authToken;
    const apiUrl = base_url + 'user/updateUserProfile';

    const requestData = {
      id: userId,
      username: userName,
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

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);
      navigation.navigate('ViewProfile');
    }, 3000);
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
          text={'Update Profile'}
          showText={true}
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={{alignItems: 'center', marginTop: hp(5)}}>
          <TouchableOpacity style={styles.circleBox} onPress={handleImagePress}>
          {userimage ? (
             <Image
             style={{
               flex: 1,
               width: '100%',
               height: '100%',
               borderRadius: wp(25) / 2, // Half of the width (25/2)
               resizeMode: 'cover',
             }}
             source={{uri: userimage}}
           />
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

            {/* {imageUri == null ? (
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
            )} */}
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Button
            mode="contained"
            onPress={() => {
              ref_RBSheetCamera.current.open();
            }}
            style={styles.button}
            contentStyle={{
              padding: '1%',
            }}
            labelStyle={{
              fontSize: wp(3.7),
              fontFamily: 'Inter-Medium',
              color: '#232323',
            }}>
            Change Image
          </Button>
        </TouchableOpacity>

        <CPaperInput
          //multiline={true}
          //placeholder={'Description'}
          heading={'User Name'}
          placeholderTextColor="#121420"
          value={userName}
          onChangeText={text => setUserName(text)}
          //height={hp(20)}
        />

        <CPaperInput
          //multiline={true}
          //placeholder={'Description'}
          editable={false}
          heading={'Email Address'}
          placeholderTextColor="#121420"
          value={email}
          onChangeText={text => setEmail(text)}
          //height={hp(20)}
        />

        <Text
          style={{
            color: '#FF0000',
            marginLeft: wp(1),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          You can't edit your email address
        </Text>

        <View style={{marginTop: hp(18),alignItems:'center'}}>
          <CustomButton
            title="Update"
            customClick={() => {
              handleUpdateUser(); // Call your password update function here

              //setsnackbarVisible(true);

              //navigation.goBack();
              //ref_RBSendOffer.current.close();
              //navigation.navigate('ResetPassword');
            }}
            //style={{width: wp(59)}}
          />
        </View>

        <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal}>
            <Image
              style={styles.modalImage}
              source={{ uri: userimage || imageUri }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
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
        messageDescription={'Update profile successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />

      <CustomSnackbar
        message={'Alert!'}
        messageDescription={'Kindly Fill Your User Name'}
        onDismiss={dismissSnackbarAlert} // Make sure this function is defined
        visible={snackbarVisibleAlert}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: wp(7),
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
  button: {
    // flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#FACA4E',
    borderRadius: 25,
    width: '80%',
    marginTop: hp(2),
    marginBottom: '5%',
  },
  circleBox: {
    width: wp(28),
    height: hp(14),
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#0000001F',
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});
