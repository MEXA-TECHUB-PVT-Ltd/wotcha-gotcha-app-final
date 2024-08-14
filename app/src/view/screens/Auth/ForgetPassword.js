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
import CustomSnackbar from './../../../assets/Custom/CustomSnackBar';
import { base_url } from '../../../../../baseUrl';
import { useTranslation } from 'react-i18next';
LogBox.ignoreAllLogs();

const ForgetPassword = ({navigation}) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation(); 
  useEffect(() => {}, [isFocused]);

  const [email, setEmail] = useState('');

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [userName, setUserName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [emailSignInError, setEmailSignInError] = useState(false);
  const ref_RBSheet = useRef(null);
  const ref_RBSheetCamera = useRef(null);
  const [snackbarVisibleAlert, setsnackbarVisibleAlert] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  const forgetPasswordEndpoint = base_url + 'user/forgetPassword';

  const goTOScreen = () => {
    setEmailSignInError(false);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email === '' || !emailRegex.test(email)) {
      setEmailSignInError(true);
    } else {
      setIsLoading(true);
      handleSendCode(); // Start sending OTP
    }
  };
  
  const handleSendCode = async () => {
    try {
      const response = await fetch(forgetPasswordEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          role: 'user',
        }),
      });
  
      const data = await response.json();
  
      if (data.statusCode === 200) {
        setIsLoading(false);
        console.log('Email sent to:', email);
        handleSuccessSendOTP();
      
      } else {
        setIsLoading(false);
        handleUpdatePasswordAlert();
        console.error('Error sending OTP:', data);
        // Handle error scenarios, show an alert or error message
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error sending OTP:', error);
      // Handle network errors or other exceptions
    }
  };


  const handleSuccessSendOTP = async () => {
    setsnackbarVisibleAlert(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisibleAlert(false);
      navigation.navigate('VerifyAccount', {
        email: email,
      });
      // navigation.navigate('ViewProfile');
    }, 3000);
  };
  const dismissSnackbarAlert = () => {
    setsnackbarVisibleAlert(false);
  };

  // const goTOScreen = () => {
  //   console.log('clicked');

  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  //   setEmailSignInError(false);

  //   if (email === '') {
  //     setEmailSignInError(true);
  //   } else {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       handleSendCode();
  //       //setIsLoading(false);

  //       // Replace 'YourTargetScreen' with the screen you want to navigate to
  //     }, 2000);
  //   }
  // };

  // const forgetPasswordEndpoint =
  //   base_url + 'user/forgetPassword'; // Replace with your actual API endpoint

  // const handleSendCode = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(forgetPasswordEndpoint, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         role: 'user',
  //       }),
  //     });

  //     const data = await response.json();

  //     //console.log('error data sign in', data);

  //     if (data.statusCode === 200) {
  //       setIsLoading(false);
  //       console.log('Email', email);
  //       // Assuming there's at least one result
  //       setEmail('')
  //       navigation.navigate('VerifyAccount', {
  //         email: email,
  //       });
  //     } else {
  //       setIsLoading(false);
  //       handleUpdatePasswordAlert();
  //       console.log('ERROR kya hai', data);
  //       console.error('No results found.', data.response.result);
  //     }

  //     setIsLoading(false);
  //     // Reset the input fields
  //     // navigation.navigate('SelectGender');
  //   } catch (error) {
  //     //console.error('Error:');
  //     //showAlert();
  //     setIsLoading(false);
  //   }
  // };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleUpdatePasswordAlert = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisible(false);
      setEmail('')
      console.log('call')
      // navigation.navigate('VerifyAccount');
      //navigation.goBack();
    }, 3000);
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
              width: wp(40),
              height: hp(40),
            }}
          />
        </View>

        <Text style={styles.resetPasswordHeadingTxt}>{t('signin.ForgetPassword')}</Text>
        
        <Text style={styles.resetPasswordTxt}>
        {t('ForgotP.resetPasswordText')}
        </Text>

        <TextInput
          mode="outlined"
          label= {t('signin.EmailAddress')}
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.ti}
          outlineColor="#0000001F"
          placeholderTextColor={'#646464'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          left={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={'email-outline'}
                  size={23}
                  color={isTextInputActive == true ? '#FACA4E' : '#64646485'}
                />
              )}
            />
          }
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        />

        {emailSignInError === true ? (
          <Text
            style={{
              color: 'red',
              marginLeft: wp(-39),
              marginTop: hp(1.8),
              fontSize: hp(1.8),
            }}>
            Please Enter Your Email!
          </Text>
        ) : null}

        <View style={{marginTop: '25%', alignSelf: 'center'}}>
          <CustomButton
            title= {t('ForgotP.SendCode')}
            //load={loading}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              goTOScreen();
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </View>
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
        message={'Alert'}
        messageDescription={t('ForgotP.SomethingWrong')}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
         <CustomSnackbar
        message={'Success'}
        messageDescription={t('ForgotP.OTPSent')}
        onDismiss={dismissSnackbarAlert} // Make sure this function is defined
        visible={snackbarVisibleAlert}
      />
    </ScrollView>
  );
};

export default ForgetPassword;

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
    width:wp('90%')
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
});
