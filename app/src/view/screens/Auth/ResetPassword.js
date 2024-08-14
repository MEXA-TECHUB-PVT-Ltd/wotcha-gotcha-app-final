import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from 'react-native-switch-selector';
import User from '../../../assets/svg/User.svg';

import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import { base_url } from '../../../../../baseUrl';
import { useTranslation } from 'react-i18next';
LogBox.ignoreAllLogs();

const ResetPassword = ({navigation, route}) => {
  const {user_Id} = route.params;
  console.log('user_Id from params', user_Id)
  const [userId, setUserId] = useState('');
  const { t } = useTranslation(); 
  const [passwordError, setPasswordError] = useState(false);

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getUserID = async () => {
      console.log("Id's");
      try {
        const result = await AsyncStorage.getItem('userId ');
        if (result !== null) {
          setUserId(result);
          console.log('user id retrieved:', result);
        }
      } catch (error) {
        // Handle errors here
        console.error('Error retrieving user ID:', error);
      }
    };

    getUserID();
  }, [isFocused]);

  const [newPassword, setNewPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState();

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
  const [signin_pass, setsignin_pass] = useState('');
  const [confirm, setconfirm_pass] = useState('');

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

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisible(false);
      navigation.navigate('Signin_signup');
    }, 3000);
  };

  //--------------------------\\

  //----------------------------\\

  const dismissSnackbar = () => {
    setSnackbarVisible(true);
  };

  const handleBlurConfirmPassword = () => {
    setIsConfirmPasswordActive(false);
  };

  const goTOScreen = () => {
    console.log('clicked', signin_pass);

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    setPasswordError(false);
    setConfirmPasswordError(false);

    if (signin_pass === '' && confirm === '') {
      setPasswordError(true);
      setConfirmPasswordError(true);
    } else if (signin_pass === '') {
      setPasswordError(false);
    } else if (confirm === '') {
      setConfirmPasswordError(false);
    } else {
      setIsLoading(true);

      setPasswordError(false);
      setConfirmPasswordError(false);

      setTimeout(() => {
        //setIsLoading(false);
        handleResetPassword();

        // Replace 'YourTargetScreen' with the screen you want to navigate to
      }, 2000);
    }

    /* setTimeout(() => {
      navigation.navigate('BottomTabNavigation');

      setIsLoading(false);

      // Replace 'YourTargetScreen' with the screen you want to navigate to
    }, 2000); // Adjust the loading duration as needed */
  };

  const verifyOTPEndpoint =
    base_url + 'user/reset_password'; // Replace with your actual API endpoint

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(verifyOTPEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: signin_pass,
          confirmPassword: confirm,
          id: user_Id,
        }),
      });

      const data = await response.json();

      console.log('error data sign in', data);

      if (data.statusCode === 200) {
        setIsLoading(false);

        handleUpdatePassword();
        // Assuming there's at least one result
      } else {
        setIsLoading(false);
        console.error('No results found.', data.response.result);
      }

      setIsLoading(false);
      // Reset the input fields
      //setEmail('');
      // navigation.navigate('SelectGender');
    } catch (error) {
      //console.error('Error:');
      //showAlert();
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.bg} contentContainerStyle={{flexGrow: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FACA4E'} />
      <View style={styles.mainv}>
        <TouchableOpacity
          style={{marginTop: '9%', marginLeft: '8%', alignSelf: 'flex-start'}}
          onPress={() => navigation.goBack()}>
          <Back width={20} height={20} />
        </TouchableOpacity>

        <View style={styles.passwordImg}>
          <Image
            source={require('../../../assets/images/forget.png')}
            resizeMode="contain"
            style={{
              width: wp(45),
              height: hp(45),
            }}
          />
        </View>

        <Text style={styles.resetPasswordHeadingTxt}>{t('ForgotP.ResetPassword')}</Text>
        
        <Text style={styles.resetPasswordTxt}>{t('ForgotP.Createstrongpassword')}</Text>

        <View> 
          <TextInput 
            mode="outlined"
            label={t('password')}
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
                backgroundColor: signin_ShowPassword
                  ? '#64646412'
                  : '#FF660012',
              },
            ]}>
            <Text
              style={[
                styles.txt,
                {color: signin_ShowPassword ? '#646464' : '#FACA4E'},
              ]}>
              {signin_ShowPassword ?  t('signin.Show') : t('signin.Hide')}
            </Text>
          </TouchableOpacity>
        </View>

        {passwordError === true ? (
          <Text
            style={{
              color: 'red',
              marginLeft: wp(-35),
              marginTop: hp(1.8),
              fontSize: hp(1.8),
            }}>
              {t('ForgotP.PleaseEnterPassword')}
              
            {/* Please Enter Your Password */}
          </Text>
        ) : null}

        <View>
          <TextInput
            mode="outlined"
            label= {t('confirmPassword')}
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
                    color={isTextInputActive2 == true ? '#FACA4E' : '#64646485'}
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
              {signin_ConfirmShowPassword ?  t('signin.Show') : t('signin.Hide')}
              {/* {signin_ConfirmShowPassword ? 'Show' : 'Hide'} */}
            </Text>
          </TouchableOpacity>
        </View>

        {confirmPasswordError === true ? (
          <Text
            style={{
              color: 'red',
              marginLeft: wp(-21),
              marginTop: hp(1.8),
              fontSize: hp(1.8),
            }}>
            {t('ForgotP.PleaseConfirmPassword')}
            {/* Please Enter Your Confirm Password */}
          </Text>
        ) : null}

        <View style={{marginTop: '25%', alignSelf: 'center'}}>
          <CustomButton
            title={t('ForgotP.Reset')}
            //load={loading}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              goTOScreen();
            }}
          />
        </View>
      </View>
      
      <CustomSnackbar
        message={t('ForgotP.success')}
        messageDescription={t('ForgotP.Passwordresetsuccessfully')}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
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
    </ScrollView>
  );
};

export default ResetPassword;

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
    backgroundColor: '#FACA4E',
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
  ti: {
    marginHorizontal: '7%',
    marginTop: '10%',
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },

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
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
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
    right: 35,
    top: 31,
  },
  txt: {
    fontSize: wp(3.6),
    fontFamily: 'Inter-Medium',
  },
});
