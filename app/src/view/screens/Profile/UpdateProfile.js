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
  Modal,
  Platform
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
import Headers from '../../../assets/Custom/Headers';
import CustomButton from '../../../assets/Custom/Custom_Button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import CPaperInput from './../../../assets/Custom/CPaperInput';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import { base_url } from '../../../../../baseUrl';
import { CLOUD_NAME, CLOUDINARY_URL, UPLOAD_PRESET } from '../../../../../cloudinaryConfig';
import { useTranslation } from 'react-i18next';
import Loader from '../../../assets/Custom/Loader';

export default function UpdateProfile({navigation}) {
  const [selectedItem, setSelectedItem] = useState('');
  const { t } = useTranslation();
  const [imageInfo, setImageInfo] = useState(null);

  const [userName, setUserName] = useState('');

  const [email, setEmail] = useState('');

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [snackbarVisibleAlert, setsnackbarVisibleAlert] = useState(false);

  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [isTextInputActivePrice, setIsTextInputActivePrice] = useState(false);

  const [isTextInputActiveDescription, setIsTextInputActiveDescription] =
    useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [imageUri, setImageUri] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const [showFullContent, setShowFullContent] = useState(false);

  const [pastedURL, setPastedURL] = useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  );

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState('');

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
    await getUserID();
  };

  const getUserID = async () => {
    setLoading(true);
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        await fetchUserId(result);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchUserId = async tokens => {

    const result3 = await AsyncStorage.getItem('userId ');
    if (result3 !== null) {
      setUserId(result3);
      fetchUser(tokens, result3);
    } else {
      setLoading(false);
    }
  };

  const fetchUser = async (tokens, user) => {
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
  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const handleUpdatePasswordAlert = async () => {
    setsnackbarVisibleAlert(true);
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

        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);

            setImageInfo(response.assets[0]);
            handle(response.assets[0]);
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setImageUri(response.uri);

          }
        }
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo'}, response => {

      if (!response.didCancel && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]);
        handle(response.assets[0]);
      }

    });
  };

  const handle = imageInfo => {
    ref_RBSheetCamera.current.close();

    handleUploadVideoC(imageInfo);

  };

  const handleUploadVideoC = data1 => {
    ref_RBSheetCamera.current.close();
    setLoading(true);
    const uri = data1.uri;
    const type = data1.type;
    const name = data1.fileName;
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
        uploadImage(data.url);
        setLoading(false);
        ref_RBSheetCamera.current.close();
      })
      .catch(err => {
        setLoading(false);
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
      } else {
        setLoading(false);

        console.error(
          'Failed to upload video:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      setLoading(false);
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
        setLoading(false);
        handleUpdatePassword();
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

  const handleUpdatePassword = async () => {
    setsnackbarVisible(true);
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
      <View style={{marginTop:Platform.OS =="ios" ? 0 : hp(5)}}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          text={t('Settings.UpdateProfile')}
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
              //  flex: 1,
               width: '100%',
               height: '100%',
               borderRadius: wp(50) / 2, // Half of the width (25/2)
               resizeMode: 'cover',
             }}
             source={{uri: userimage}}
           />
          ) : (
            <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(50) / 2, // Half of the width (25/2)
                  resizeMode:Platform.OS =="ios" ? "cover" : 'contain',
                }}
                source={{uri: imageUri}}
              />
          )}

      
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
              {t('Settings.ChangeImage')}
            {/* Change Image */}
          </Button>
        </TouchableOpacity>

        <CPaperInput
          heading={t('Settings.UserName')}
          placeholderTextColor="#121420"
          value={userName}
          onChangeText={text => setUserName(text)}
          //height={hp(20)}
        />

        <CPaperInput

          editable={false}
          heading={t('signin.EmailAddress')}
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
          {t('Settings.cannotdityouremailaddress')}
          {/* You can't edit your email address */}
        </Text>

        <View style={{marginTop: hp(18),alignItems:'center'}}>
          <CustomButton
            title={t('UpdatePassword.Update')}
            customClick={() => {
              handleUpdateUser(); // Call your password update function here
            }}
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
            // height: hp(25),
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
      {loading && <Loader />}
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
    height: hp(13),
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
