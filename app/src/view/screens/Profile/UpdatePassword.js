import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  View,
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

import ForgetPasswordImg from '../../../assets/images/forget.png';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import {appImages} from '../../../assets/utilities/index';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Back from '../../../assets/svg/back.svg';

import CustomButton from '../../../assets/Custom/Custom_Button';
import {useIsFocused} from '@react-navigation/native';
import SwitchSelector from 'react-native-switch-selector';
import User from '../../../assets/svg/User.svg';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import Headers from '../../../assets/Custom/Headers';
import { base_url } from '../../../../../baseUrl';
import { useTranslation } from 'react-i18next';
LogBox.ignoreAllLogs();

const UpdatePassword = ({navigation}) => {
  const [oldPasswordAccount, setPasswordAccount] = useState('');
  const [userId, setUserId] = useState('');
  const [authToken, setAuthToken] = useState('');
  const { t } = useTranslation(); 
  const isFocused = useIsFocused();

 
  const [newPassword, setNewPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [isConfirmActive, setIsConfirmPasswordActive] = useState(false);

  const [loading, setIsLoading] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [userName, setUserName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const ref_RBSheet = useRef(null);
  const ref_RBSheetCamera = useRef(null);

  const [signin_email, setsignin_email] = useState();
  const [signin_pass, setsignin_pass] = useState();
  const [confirm, setconfirm_pass] = useState();

  const [signin_ShowPassword, setsignin_ShowPassword] = useState(true);
  const [signin_ConfirmShowPassword, setsignin_ConfirmShowPassword] =
    useState(true);

  const [signin_ShowPassword1, setsignin_ShowPassword1] = useState(true);
  const [signin_ShowPassword2, setsignin_ShowPassword2] = useState(true);

  const [username, setusername] = useState();
  const [signup_email, setsignup_email] = useState();
  const [signup_pass, setsignup_pass] = useState();
  const [signup_cpass, setsignup_cpass] = useState();

  const [isTextInputActive1, setIsTextInputActive1] = useState(false);
  const [isTextInputActive2, setIsTextInputActive2] = useState(false);
  const [isTextInputActive3, setIsTextInputActive3] = useState(false);
  const [isTextInputActive4, setIsTextInputActive4] = useState(false);
  const [isTextInputActive5, setIsTextInputActive5] = useState(false);

  const [isTextInputActiveConfirmPass, setIsTextInputActiveConfirmPass] =
    useState(false);

  const [isTextInputActiveConfirmPassOld, setIsTextInputActiveConfirmPassOld] =
    useState(false);

  //old password
  const [OldPassword, setOldPassword] = useState();

  const [oldPassword_ShowPassword, setOldPassword_ShowPassword] =
    useState(true);

    useEffect(() => {
      fetchVideos();
    }, [isFocused]);
  
    const fetchVideos = async () => {
      // Simulate loading
      setIsLoading(true);
  
      await getUserID();
      // Fetch data one by one
      // Once all data is fetched, set loading to false
      setIsLoading(false);
    };
  
    const getUserID = async () => {
      console.log("Id's");
      try {
        const result1 = await AsyncStorage.getItem('authToken ');
        if (result1 !== null) {
          setAuthToken(result1);
          console.log('user token retrieved:', result1);
        }
  
        const result3 = await AsyncStorage.getItem('userId ');
        if (result3 !== null) {
          setUserId(result3);
  
          console.log('user id retrieved:', result3);
        }
        const passwordResult = await AsyncStorage.getItem('Password');
        if (passwordResult !== null) {
          setPasswordAccount(passwordResult);
          console.log('password recieved', passwordResult);
        } else {
          console.log('no password recieved');
        }
      } catch (error) {
        // Handle errors here
        console.error('Error retrieving user ID:', error);
      }
    };
  
  //--------------\\

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  const handleFocus1 = () => {
    setIsTextInputActive1(true);
  };

  const handleBlur1 = () => {
    setIsTextInputActive1(false);
  };

  const handleFocus2 = () => {
    setIsTextInputActiveConfirmPass(true);
  };

  const handleBlur2 = () => {
    setIsTextInputActiveConfirmPass(false);
  };
  // Old Pass

  const handleFocusOldPass = () => {
    setIsTextInputActiveConfirmPassOld(true);
  };

  const handleBlurOldPass = () => {
    setIsTextInputActiveConfirmPassOld(false);
  };
  const handleFocus3 = () => {
    setIsTextInputActive3(true);
  };

  const handleBlur3 = () => {
    setIsTextInputActive3(false);
  };
  const handleFocus4 = () => {
    setIsTextInputActive4(true);
  };

  const handleBlur4 = () => {
    setIsTextInputActive4(false);
  };
  const handleFocus5 = () => {
    setIsTextInputActive5(true);
  };

  const handleBlur5 = () => {
    setIsTextInputActive5(false);
  };

  const handleTogglePasswordVisibility = () => {
    setsignin_ShowPassword(!signin_ShowPassword);
  };

  const handleTogglePasswordVisibilityConfirm = () => {
    setsignin_ConfirmShowPassword(!signin_ConfirmShowPassword);
  };

  const handleTogglePasswordVisibilityOld = () => {
    setOldPassword_ShowPassword(!oldPassword_ShowPassword);
  };
  const handleTogglePasswordVisibility1 = () => {
    setsignin_ShowPassword1(!signin_ShowPassword1);
  };
  const handleTogglePasswordVisibility2 = () => {
    setsignin_ShowPassword2(!signin_ShowPassword2);
  };

  //----------------------------\\

  const handleFocusConfirmPassword = () => {
    setIsConfirmPasswordActive(true);
  };

  const [snackbarVisibleConfirmPassword, setSnackbarVisibleConfirmPassword] =
    useState(false);

  const [
    snackbarVisibleConfirmPasswordOld,
    setSnackbarVisibleConfirmPasswordOld,
  ] = useState(false);

  const [
    snackbarVisibleConfirmPasswordAlert,
    setSnackbarVisibleConfirmPasswordAlert,
  ] = useState(false);

  //--------------------------\\

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisible(false);
      navigation.goBack();
    }, 3000);
  };

  //----------------------------\\

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleBlurConfirmPassword = () => {
    setIsConfirmPasswordActive(false);
  };

  //-------------------------\\

  const dismissSnackbarConfirmPassword = () => {
    setSnackbarVisibleConfirmPassword(true);
  };

  const handleUpdateConfirmPassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisibleConfirmPassword(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisibleConfirmPassword(false);
      //navigation.navigate('SignIn');
    }, 3000);
  };

  const dismissSnackbarConfirmPasswordOld = () => {
    setSnackbarVisibleConfirmPasswordOld(false);
  };

  const handleUpdateConfirmPasswordOld = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisibleConfirmPasswordOld(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisibleConfirmPassword(false);
      //navigation.navigate('SignIn');
    }, 3000);
  };

  //------------------\\

  const dismissSnackbarConfirmPasswordAlert = () => {
    setSnackbarVisibleConfirmPasswordAlert(false);
  };

  const handleUpdateConfirmPasswordAlert = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisibleConfirmPasswordAlert(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisibleConfirmPasswordAlert(false);
      //navigation.navigate('SignIn');
    }, 3000);
  };

  //--------------------------\\

  const checkPassword = () => {
    console.log('Came to confirm password');
    setIsLoading(true);
    if (signin_pass !== confirm) {
      setIsLoading(false);
      handleUpdateConfirmPassword();
    
    } else if (OldPassword !== '' && signin_pass !== '' && confirm !== '') {
      if (OldPassword !== oldPasswordAccount) {
        setIsLoading(false);
        handleUpdateConfirmPasswordOld();
      
      } else {
        resetPassword();
      }
    } else {
      setIsLoading(false);
      handleUpdateConfirmPasswordAlert();
     
    }
  };

  const resetPassword = async data => {
    const token = authToken;
    const apiUrl = base_url + 'user/changePassword';

    const requestData = {
      id: userId,
      currentPassword: oldPasswordAccount,
      newPassword: signin_pass,
      role: 'user',
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
    <ScrollView
      style={{backgroundColor: 'white'}}
      contentContainerStyle={{flexGrow: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />

      <View style={{marginTop: hp(5)}}>
        <Headers
          showBackIcon={true}
          onPress={() => navigation.goBack()}
          showText={true}
          text={t('Settings.UpdatePassword')}
        />
      </View>
      <View style={{marginTop: hp(5),  alignItems:'center'}}>
        <TextInput
          mode="outlined"
          label={t('UpdatePassword.OldPassword')}
          value={OldPassword}
          onChangeText={text => setOldPassword(text)}
          style={styles.ti}
          placeholderTextColor={'#646464'}
          outlineColor="#0000001F"
          activeOutlineColor="#FACA4E"
          secureTextEntry={oldPassword_ShowPassword}
          onFocus={handleFocusConfirmPassword}
          onBlur={handleBlurConfirmPassword}
          left={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={'lock-outline'}
                  size={23}
                  color={isConfirmActive == true ? '#FACA4E' : '#64646485'}
                />
              )}
            />
          }
        />
        <TouchableOpacity
          onPress={handleTogglePasswordVisibilityOld}
          style={[
            styles.hs,
            {
              borderColor: oldPassword_ShowPassword ? '#646464' : '#FACA4E',
              backgroundColor: oldPassword_ShowPassword
                ? '#64646412'
                : '#FF660012',
            },
          ]}>
          <Text
            style={[
              styles.txt,
              {color: oldPassword_ShowPassword ? '#646464' : '#FACA4E'},
            ]}>
            {oldPassword_ShowPassword ? t('signin.Show') : t('signin.Hide')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems:'center'}}>
        <TextInput
          mode="outlined"
          label={t('UpdatePassword.NewPassword')}
          value={signin_pass}
          onChangeText={text => setsignin_pass(text)}
          style={styles.ti}
          placeholderTextColor={'#646464'}
          outlineColor="#0000001F"
          activeOutlineColor="#FACA4E"
          secureTextEntry={signin_ShowPassword}
          onFocus={handleFocus1}
          onBlur={handleBlur1}
          left={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={'lock-outline'}
                  size={23}
                  color={isTextInputActive1 == true ? '#FACA4E' : '#64646485'}
                />
              )}
            />
          }
        />
        <TouchableOpacity
          onPress={handleTogglePasswordVisibility}
          style={[
            styles.hs,
            {
              borderColor: signin_ShowPassword ? '#646464' : '#FACA4E',
              backgroundColor: signin_ShowPassword ? '#64646412' : '#FF660012',
            },
          ]}>
          <Text
            style={[
              styles.txt,
              {color: signin_ShowPassword ? '#646464' : '#FACA4E'},
            ]}>
            {signin_ShowPassword ? t('signin.Show') : t('signin.Hide')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems:'center'}}>
        <TextInput
          mode="outlined"
          label={t('UpdatePassword.ConfirmPassword')}
          value={confirm}
          onChangeText={text => setconfirm_pass(text)}
          style={styles.ti}
          placeholderTextColor={'#646464'}
          outlineColor="#0000001F"
          activeOutlineColor="#FACA4E"
          secureTextEntry={signin_ConfirmShowPassword}
          onFocus={handleFocus2}
          onBlur={handleBlur2}
          left={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={'lock-outline'}
                  size={23}
                  color={
                    isTextInputActiveConfirmPass == true
                      ? '#FACA4E'
                      : '#64646485'
                  }
                />
              )}
            />
          }
        />
        <TouchableOpacity
          onPress={handleTogglePasswordVisibilityConfirm}
          style={[
            styles.hs,
            {
              borderColor: signin_ConfirmShowPassword ? '#646464' : '#FACA4E',
              backgroundColor: signin_ConfirmShowPassword
                ? '#64646412'
                : '#FF660012',
            },
          ]}>
          <Text
            style={[
              styles.txt,
              {color: signin_ConfirmShowPassword ? '#646464' : '#FACA4E'},
            ]}>
            {signin_ConfirmShowPassword ? t('signin.Show') : t('signin.Hide')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: '90%', alignSelf: 'center'}}>
        <CustomButton
          title={t('UpdatePassword.Update')}
          // load={loading}
          // checkdisable={inn == '' && cm == '' ? true : false}
          customClick={() => {
            // setIsLoading(true);
            checkPassword();
          }}
        />
      </View>

      <CustomSnackbar
        message={'success'}
        messageDescription={'Password Reset Successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />

      {/* {loading && (
        <View
          style={{
            position: 'absolute',
            // top: 0,
            bottom: 56,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )} */}
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

      <CustomSnackbar
        message={'Alert!'}
        messageDescription={'Please Match The Below Passwords'}
        onDismiss={dismissSnackbarConfirmPassword} // Make sure this function is defined
        visible={snackbarVisibleConfirmPassword}
      />

      <CustomSnackbar
        message={'Alert!'}
        messageDescription={'Kindly Fill All Fields'}
        onDismiss={dismissSnackbarConfirmPasswordAlert} // Make sure this function is defined
        visible={snackbarVisibleConfirmPasswordAlert}
      />

      <CustomSnackbar
        message={'Alert!'}
        messageDescription={'Old Password Doesnot Match'}
        onDismiss={dismissSnackbarConfirmPasswordOld} // Make sure this function is defined
        visible={snackbarVisibleConfirmPasswordOld}
      />

      <CustomSnackbar
        message={'Success'}
        messageDescription={'Password Changed Successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
    </ScrollView>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  mainv: {
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: 'center',
    marginTop: '15%',
    backgroundColor: 'white',
  },
  bg: {
    // height:800,
    //backgroundColor: '#FACA4E',
  },
  passwordImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5),
    height: hp(25),
  },
  resetPasswordHeadingTxt: {
    marginTop: hp(3),
    fontFamily: 'Inter',
    color: '#333333',
    fontSize: wp(7),
    fontWeight: 'bold',
  },
  resetPasswordTxt: {
    marginTop: hp(1.5),
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#9597A6',
    fontSize: wp(3.5),
  },
  // ti: {
  //   marginHorizontal: '7%',
  //   marginTop: '10%',
  //   width: 300,
  //   backgroundColor: 'white',
  //   fontSize: wp(4),
  //   paddingLeft: '2%',
  //   borderRadius: 10,
  // },

  bg: {
    // height:800,
    backgroundColor: '#FACA4E',
  },
  mainv: {
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: '15%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ti: {
    marginHorizontal: '7%',
    marginTop: '5%',
    width: '86%',
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '.5%',
    borderRadius: 10,
  },
  v1: {
    marginTop: '10%',
  },
  hs: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 10,
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    right: 40,
    top: 31,
  },
  txt: {
    fontSize: wp(3.6),
    fontFamily: 'Inter-Medium',
  },
});
