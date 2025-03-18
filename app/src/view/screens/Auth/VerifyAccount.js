import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
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
  ActivityIndicator,
  Pressable,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';

import OTPInputView from '@twotalltotems/react-native-otp-input';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {appImages} from '../../../assets/utilities/index';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Back from '../../../assets/svg/back.svg';

import CustomButton from '../../../assets/Custom/Custom_Button';
import { useTranslation } from 'react-i18next';
import { base_url } from '../../../../../baseUrl';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
LogBox.ignoreAllLogs();

export default function VerifyAccount({navigation, route}) {
  const [value, setValue] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const { t } = useTranslation(); 
  const ref_RBSendOffer = useRef(null);
  const [loading, setLoading] = useState(false);

  const [otpError, setOTPError] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  //const ref = useBlurOnFulfill({value, cellCount: 4});
  /*  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  }); */
  const [isFocused, setIsFocused] = useState(false);

  const [resendTimer, setResendTimer] = useState(45);
  const [userId, setUserId] = useState([]);

  const resendTimerRef = useRef(45);

  //---------------------------\\

  useEffect(() => {
    let interval;

    if (resendTimerRef.current > 0) {
      interval = setInterval(() => {
        resendTimerRef.current -= 1;
        setResendTimer(resendTimerRef.current); // Update state for rendering
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [resendTimerRef.current]);

  const resendText =
    resendTimerRef.current > 0
      ? `Resend in 00:${resendTimerRef.current}`
      : 'Resend';

  const handleResend = () => {
    // Implement the logic to resend the verification code here
    if (resendTimerRef.current === 0) {
      resendTimerRef.current = 45; // Reset the timer to 45 seconds
      setResendTimer(resendTimerRef.current); // Update state for rendering
    }
  };

  //---------------------------\\

  const email = route.params?.email; // Use optional chaining

  // console.log('Email Verify', email);

  const goTOScreen = () => {
    console.log('clicked');

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    setOTPError(false);

    if (otpCode === '') {
      setOTPError(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        handleSendCode();
        //setIsLoading(false);

        // Replace 'YourTargetScreen' with the screen you want to navigate to
      }, 2000);
    }
  };

  const verifyOTPEndpoint = base_url + 'user/verifyOtp'; // Replace with your actual API endpoint

  const handleSendCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(verifyOTPEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          code: otpCode,
          role: 'user',
        }),
      });

      const data = await response.json();

      console.log('error data sign in', data);
       
      if (data.statusCode === 200) {
        setLoading(false);
        setUserId(data.userId)
        ref_RBSendOffer.current.open();
        // console.log('OTP verified successfully');
        // Assuming there's at least one result
      } else {
        setLoading(false);
        handleInValidOtp();
        console.error('No results found.', data.response.result);
      }

      setLoading(false);
      // Reset the input fields
      //setEmail('');
      // navigation.navigate('SelectGender');
    } catch (error) {
      //console.error('Error:');
      //showAlert();
      setLoading(false);
    }
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };
  const handleInValidOtp = async () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
      // navigation.navigate('VerifyAccount');
      //navigation.goBack();
    }, 3000);
  };
  return (
    <ScrollView style={styles.bg} contentContainerStyle={{flexGrow: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FACA4E'} />
      <View style={styles.mainv}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginTop: '9%', marginLeft: '8%', alignSelf: 'flex-start'}}>
          <Back width={20} height={20} />
        </TouchableOpacity>

        <View style={{}}>
          <Image
            source={require('../../../assets/images/VerifyModal.png')}
            resizeMode="contain"
            style={{
              width: wp(40),
              height: hp(30),
            }}
          />
        </View>

        <Text
          style={{
            color: '#333333',
            marginTop: hp(1.8),
            fontSize: hp(3),
            fontFamily: 'Inter',
            fontWeight: '800',
          }}>
             {t('ForgotP.VerifyYourAccount')}
          
          {/* Verify Your Account */}
        </Text>

        <Text
          style={{
            color: '#9597A6',
            marginTop: hp(1.8),
            textAlign: 'center',
            fontSize: hp(2.1),
            fontFamily: 'Inter',
          }}>
              {t('ForgotP.verificationcodesent')}
          
          {/* We have sent a verification code on your{'\n'} email address */}
        </Text>

        <View style={{marginHorizontal: wp(8), paddingTop: 1}}>
          <View style={{}}>
            <OTPInputView
              style={{
                height: 50,
                marginTop: hp(7),
              }}
              autoFocusOnLoad={false}
              pinCount={4}
              code={otpCode}
              onCodeChanged={code => {
                setOtpCode(code);
              }}
              placeholderTextColor={'#ABA7AF'}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={{
                ...styles.underlineStyleHighLighted,
              }}
            />
          </View>

          {otpError === true ? (
            <Text
              style={{
                color: 'red',
                marginLeft: wp(1),
                marginTop: hp(1.8),
                fontSize: hp(1.8),
              }}>
                          {t('ForgotP.EnterOTP')}
              {/* Please Enter Your Otp First */}
            </Text>
          ) : null}
        </View>

        {/* <View style={{width: wp(90), flex: 1, zIndex: 999}}>
            <OTPInputView
              ref={ref}
              style={{
                height: 50,
                // marginTop: hp(5),
              }}
              pinCount={4}
              code={otpCode}
              onCodeChanged={code => {
                setOtpCode(code);
              }}
              autoFocusOnLoad={false}
              placeholderCharacter={''}
              placeholderTextColor={'#ABA7AF'}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={{
                ...styles.underlineStyleHighLighted,
              }}
            />
          </View> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: hp(5.5),
            marginTop: hp(2.1),
          }}>
          <Text
            style={{
              color: '#9597A6',
              textAlign: 'center',
              fontSize: hp(2.1),
              fontFamily: 'Inter',
            }}>
              {t('ForgotP.DidnotReceive')}
              
            {/* Didn’t received the code? */}
          </Text>

          <TouchableOpacity onPress={() => handleResend()}>
            <Text
              style={{
                color: '#FACA4E',
                textAlign: 'center',
                fontSize: hp(2.1),
                fontFamily: 'Inter',
              }}>
              {} {resendText}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: '15%', alignSelf: 'center'}}>
          <CustomButton
            title={t('ForgotP.Verify')}
            //load={loading}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              goTOScreen();
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </View>

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
            source={appImages.model_verify}
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
                {t('ForgotP.AccountVerified')}
                
              {/* Account Verified! */}
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
                  {t('ForgotP.successfullyverified')}
                
              {/* Your account has been successfully verified */}
            </Text>
          </View>
          
          <View style={{marginHorizontal: wp(10)}}>
            <CustomButton
              title={t('ForgotP.ResetPassword')}
              customClick={() => {
                //ref_RBSendOffer.current.open();
                navigation.navigate('ResetPassword',{
                  user_Id:  userId
                });
               
              }}
              style={{width: wp(59)}}
            />
          </View>
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
        message={t('ForgotP.Alert')}
        messageDescription={t('ForgotP.invalidOTP')}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: hp(5), marginHorizontal: wp(12)},
  cell: {
    flex: 1,
    height: 50,
    borderRadius: wp(10), // Rounded corners
    borderWidth: 1,
    borderColor: '#E7EAF2', // Default border color
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusCell: {
    flex: 1,
    height: 50,
    borderRadius: wp(10), // Rounded corners
    borderWidth: 1,
    borderColor: '#000000', // Default border color
    alignItems: 'center',
    justifyContent: 'center',
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  underlineStyleBase: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Inter-Medium',
    width: 60,
    height: 50,
    borderRadius: wp(15),
    borderWidth: 1,
    //borderBottomWidth: 1,
    borderColor: '#CCC',
    marginHorizontal: 5,
  },
  underlineStyleHighLighted: {
    borderColor: '#FACA4E',
    borderRadius: 0,
    borderWidth: 1,
    borderRadius: wp(15),
  },
});
