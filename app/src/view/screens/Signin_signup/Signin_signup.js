import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  View,
  KeyboardAvoidingView,
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
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appImages } from "../../../assets/utilities/index";
import { Button, Divider, TextInput } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CustomButton from "../../../assets/Custom/Custom_Button";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SwitchSelector from "react-native-switch-selector";
import styles from "./styles";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
import { base_url } from "../../../../../baseUrl";
import { CommonActions } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import useCustomTranslation from "../../../assets/Localization/useCustomTranslation";
import { useTranslation } from 'react-i18next';
LogBox.ignoreAllLogs();

const App = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [check, setcheck] = useState(0);
  const { t } = useTranslation(); 
  useEffect(() => {}, [isFocused]);

  const options = [
    { label: t('switch.signIn'), value: 0 },
    { label: t('switch.signUp'), value: 1 },
];

  const [signin_email, setsignin_email] = useState("");
  const [signin_pass, setsignin_pass] = useState("");
  const [signin_ShowPassword, setsignin_ShowPassword] = useState(true);
  const [signin_ShowPassword1, setsignin_ShowPassword1] = useState(true);
  const [signin_ShowPassword2, setsignin_ShowPassword2] = useState(true);

  const [username, setusername] = useState("");
  const [signup_email, setsignup_email] = useState("");
  const [signup_pass, setsignup_pass] = useState("");
  const [signup_cpass, setsignup_cpass] = useState("");

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [isTextInputActive1, setIsTextInputActive1] = useState(false);
  const [isTextInputActive2, setIsTextInputActive2] = useState(false);
  const [isTextInputActive3, setIsTextInputActive3] = useState(false);
  const [isTextInputActive4, setIsTextInputActive4] = useState(false);
  const [isTextInputActive5, setIsTextInputActive5] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [emailSignInError, setEmailSignInError] = useState(false);

  const [passwordSignInError, setPasswordSignInError] = useState(false);

  const [signUpUserNameError, setSignUpUserNameError] = useState(false);

  const [signUpEmailError, setSignUpEmailError] = useState(false);

  const [signUpPasswordError, setSignUpPasswordError] = useState(false);

  const [emailNotCorrect, setemailNotCorrect] = useState(false);

  const [emailNotCorrectSignUp, setemailNotCorrectSignUp] = useState(false);

  const [signUpConfirmPasswordError, setSignUpConfirmPasswordError] =
    useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [token, setToken] = useState("");

  const [snackbarVisibleChecked, setSnackbarVisibleChecked] = useState(false);

  const [snackbarCorrectVisible, setSnackbarCorrectVisible] = useState(false);



  const { changeLanguage } = useCustomTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(null); // State for selected language

  const languageOptions = [
    { label: 'English', value: 'en', flag: require('../../../assets/english_flag.png') },
    { label: 'Français', value: 'fr', flag: require('../../../assets/Flag_of_France.png') }
  ];
  const handleLanguageChange = (value) => {
      if (value) {
          setSelectedLanguage(value);
          // console.log('langugae select', value)
          changeLanguage(value);
      }
  };

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
        } else {
          // If no language is stored, set to default
          setSelectedLanguage('en');
        }
      } catch (error) {
        // console.error('Error fetching language:', error);
        setSelectedLanguage('en'); // Fallback to default if there's an error
      }
    };
  
    fetchLanguage();
  }, []);

  useEffect(() => {
    getUserID();
  }, []);

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem("UserToken");
      if (result !== null) {
        setToken(result);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const dismissSnackbarChecked = () => {
    setSnackbarVisibleChecked(false);
  };

  const dismissCorrectSnackbar = () => {
    setSnackbarCorrectVisible(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleUpdatePasswordChecked = async () => {
    setSnackbarVisibleChecked(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisibleChecked(false);
    }, 3000);
  };

  const handleUpdatePassword = async () => {
    setSnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  const handleUpdateCorrectPassword = async () => {
    setSnackbarCorrectVisible(true);
    setTimeout(() => {
      setSnackbarCorrectVisible(false);
    }, 3000);
  };

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const goToScreen2 = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // console.log("Sign Up");

    setSignUpUserNameError(false);
    setSignUpEmailError(false);
    setSignUpPasswordError(false);
    setSignUpConfirmPasswordError(false);

    if (
      username === "" &&
      signup_email === "" &&
      signup_pass === "" &&
      signup_cpass === ""
    ) {
      setSignUpUserNameError(true);
      setSignUpEmailError(true);
      setSignUpPasswordError(true);
      setSignUpConfirmPasswordError(true);
    } else if (
      username !== "" &&
      signup_email == "" &&
      signup_pass === "" &&
      signup_cpass === ""
    ) {
      // console.log("user name not present");

      setSignUpUserNameError(false);
      setSignUpEmailError(true);
      setSignUpPasswordError(true);
      setSignUpConfirmPasswordError(true);
    } else if (
      username !== "" &&
      signup_email !== "" &&
      signup_pass === "" &&
      signup_cpass === ""
    ) {
      // console.log("user name not present");

      setSignUpUserNameError(false);
      setSignUpEmailError(false);
      setSignUpPasswordError(true);
      setSignUpConfirmPasswordError(true);
    } else if (
      username !== "" &&
      signup_email !== "" &&
      signup_pass !== "" &&
      signup_cpass === ""
    ) {
      // console.log("user name not present");

      setSignUpUserNameError(false);
      setSignUpEmailError(false);
      setSignUpPasswordError(false);
      setSignUpConfirmPasswordError(true);
    } else if (
      username === "" &&
      signup_email === "" &&
      signup_pass === "" &&
      signup_cpass !== ""
    ) {
      // console.log("user name not present");

      setSignUpUserNameError(true);
      setSignUpEmailError(true);
      setSignUpPasswordError(true);
      setSignUpConfirmPasswordError(false);
    } else if (
      username !== "" &&
      signup_email === "" &&
      signup_pass !== "" &&
      signup_cpass !== ""
    ) {
      // console.log("user name not present");

      setSignUpUserNameError(false);
      setSignUpEmailError(true);
      setSignUpPasswordError(false);
      setSignUpConfirmPasswordError(false);
    } else if (!emailRegex.test(signup_email)) {
      //setEmailSnackBarVisible(true);
      setemailNotCorrectSignUp(true);
    }

    else {
      handleSignup();
    }
  };

  const resetFields = () => {
    setsignin_email('');
    setsignin_pass('');
    setusername('')
    setsignup_email('');
    setsignup_pass('');
    setsignup_cpass('');
  };
  const goTOScreen = () => {
    console.log("clicked");

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    setEmailSignInError(false);
    setPasswordSignInError(false);
    setSignUpUserNameError(false);
    setSignUpEmailError(false);
    setSignUpPasswordError(false);
    setSignUpConfirmPasswordError(false);

    if (signin_email === "" && signin_pass === "") {
      setEmailSignInError(true);
      setPasswordSignInError(true);
    } else if (signin_email === "") {
      setEmailSignInError(true);
    } else if (signin_pass === "") {
      setPasswordSignInError(true);
    } else if (!emailRegex.test(signin_email)) {

      setemailNotCorrect(true);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        handleSignIn();
    
      }, 2000);
    }
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
    setsignin_email((prevEmail) => prevEmail.trim());
  };
  const handleFocus1 = () => {
    setIsTextInputActive1(true);
  };

  const handleBlur1 = () => {
    setIsTextInputActive1(false);
  };
  const handleFocus2 = () => {
    setIsTextInputActive2(true);
  };

  const handleBlur2 = () => {
    setIsTextInputActive2(false);
  };
  const handleFocus3 = () => {
    setIsTextInputActive3(true);
  };

  const handleBlur3 = () => {
    setIsTextInputActive3(false);
    setsignup_email((prevEmail) => prevEmail.trim());
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
  const handleTogglePasswordVisibility1 = () => {
    setsignin_ShowPassword1(!signin_ShowPassword1);
  };
  const handleTogglePasswordVisibility2 = () => {
    setsignin_ShowPassword2(!signin_ShowPassword2);
  };

  const signupEndpoint = base_url + "user/register"; // Replace with your actual API endpoint

  const handleSignup = async () => {
    // console.log("GVSVGV", signup_email);
    // console.log("user name", username);
    // console.log("password", signup_pass);
    // console.log("password C", signup_cpass);
    // console.log("device_id", token);
    // console.log("role", "user");

    setIsLoading(true);
    try {
      const response = await fetch(signupEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Specify TLS version explicitly
          Connection: "Keep-Alive",
          "Upgrade-Insecure-Requests": "1",
          "X-Requested-With": "XMLHttpRequest",
          "X-Forwarded-Proto": "https",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
        },
        body: JSON.stringify({
          email: signup_email,
          username: username,
          password: signup_pass,
          confirmPassword: signup_cpass,
          device_id: token,
          role: "user",
        }),
      });

      const data = await response.json();
      if (data.newUser.role === "user") {
        setIsLoading(false);
        // Assuming there's at least one result
        const firstResult = data.newUser;
        AsyncStorage.setItem("email", firstResult.email.toString(), () => {
          // console.log("user email saved successfully");
        });

        AsyncStorage.setItem(
          "userName",
          firstResult.username.toString(),
          () => {
         
          }
        );

        AsyncStorage.setItem("userId ", firstResult.id.toString(), () => {

        });

        AsyncStorage.setItem("authToken ", firstResult.token.toString(), () => {
        
        });

        AsyncStorage.setItem("Password", signup_pass, () => {
      
        });
      } else {
        setIsLoading(false);
        
      }

      setIsLoading(false);
      resetFields();
      setsignup_email("");
      setsignup_pass("");
      setsignup_cpass("");
      setusername("");

      navigation.navigate("Profile_image");
    } catch (error) {
      // console.error("Error is on sign up:", error);
      handleUpdatePassword();

      //showAlert();
      setIsLoading(false);
    }
  };

  // console.log('email-------',signin_email)
  const signInEndpoint = base_url + "user/login"; // Replace with your actual API endpoint

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(signInEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Specify TLS version explicitly
          Connection: "Keep-Alive",
          "Upgrade-Insecure-Requests": "1",
          "X-Requested-With": "XMLHttpRequest",
          "X-Forwarded-Proto": "https",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
        },
        body: JSON.stringify({
          email: signin_email,
          password: signin_pass,
          role: "user",
        }),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        setIsLoading(false);
        // Assuming there's at least one result
        const firstResult = data.user;
        AsyncStorage.setItem("email", firstResult.email.toString(), () => {
     
        });

        AsyncStorage.setItem(
          "userName",
          firstResult.username.toString(),
          () => {
      
          }
        );

        AsyncStorage.setItem("userId ", firstResult.id.toString(), () => {
     
        });

        AsyncStorage.setItem("email ", firstResult.email.toString(), () => {
      
        });

        AsyncStorage.setItem("authToken ", firstResult.token.toString(), () => {
       

          AsyncStorage.setItem("Password", signin_pass, () => {
       
          });
        });

        console.log('naviiiiiiiiiiiiiiii',navigation.getState());
        /////5/7/2024 dispatch
        resetFields()
        // navigation.navigate('MainStackNavigation');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            // routes: [{ name: 'BottomTabNavigation' }],
            routes: [{ name: 'MainStackNavigation' }], 
          })
        );
      } else {
        setIsLoading(false);
        handleUpdateCorrectPassword();
        console.error("No results found.", data.response.result);
      }

      setIsLoading(false);
      setsignin_email("");
      setsignin_pass("");
    } catch (error) {
      console.log("Error", error);
      setIsLoading(false);
    }
  };

 
  const skipforNow = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      navigation.navigate("BottomTabNavigation");
    }, 2000);
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.bg}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
        >
          <StatusBar barStyle={"dark-content"} backgroundColor={"#FACA4E"} />
          <View style={styles.mainv}>
            <View style={{alignItems: 'center',}}>

           
            <Image
              source={appImages.logo}
              style={{ width: 280, height: 80, marginTop: "5%" }}
              resizeMode="contain"
            />

            <SwitchSelector
              options={options}
              initial={0}
              hasPadding
              textColor={"#232323"}
              textStyle={{
                fontSize: 14,
                fontWeight: "bold",
              }}
              buttonStyle={{
                height: 120, // Adjust the height of the switch button as needed
                borderRadius: 20, // Match the borderRadius with the container's borderRadius
                
              }}
              style={{
                marginTop: "8%",
                width: "90%",
                borderRadius: 20,
                fontWeight: "bold",
              }} // Adjust the height value as needed
              selectedColor={"#333333"}
              buttonColor={"#FFFFFF"}
              backgroundColor={"#FACA4E"}
              borderColor={"#EEF1F6"}
              bold={true}
              height={50}
              valuePadding={5}
              onPress={(value) => {
                setcheck(value);
              }}
            />

            {check == 0 ? (
              <Text
                style={{
                  color: "#9597A6",
                  fontSize: wp(4),
                  marginVertical: "5%",
                  fontFamily: "Inter-Medium",
                }}
              >
                 {t('signin.signInMessage')}
                {/* Please sign in to access your account. */}
              </Text>
            ) : (
              <Text
                style={{
                  color: "#9597A6",
                  fontSize: wp(4),
                  marginVertical: "5%",
                  fontFamily: "Inter-Medium",
                }}
              >
                   {t('signup.createAccountMessage')}
               
              </Text>
            )}
 </View>
 <View style={styles.DropMani}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.containerStyle}
        data={languageOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Language"
        value={selectedLanguage}
        onChange={(item) => handleLanguageChange(item.value)}
        renderItem={(item) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Image source={item.flag} style={styles.flagImage} />
          </View>
        )}
      />
    </View>
            {check == 0 ? (
              <View style={styles.v1}>
                <TextInput
                  mode="outlined"
                  label={t('signin.EmailAddress')}
                  onChangeText={(text) => setsignin_email(text)}
                  // onChangeText={(text) => setsignin_email(text.trimStart())}
                  style={styles.ti}
                  outlineColor="#0000001F"
                  placeholderTextColor={"#646464"}
                  activeOutlineColor="#FACA4E"
                  autoCapitalize="none"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialCommunityIcons
                          name={"email-outline"}
                          size={23}
                          color={
                            isTextInputActive == true ? "#FACA4E" : "#64646485"
                          }
                        />
                      )}
                    />
                  }
                  // left={isTextInputActive ? <Oemail /> : <Gemail />}
                />
                {emailSignInError === true ? (
                  <Text
                    style={{
                      color: "red",
                      marginLeft: widthPercentageToDP(10),
                      marginTop: heightPercentageToDP(1.8),
                      fontSize: heightPercentageToDP(1.8),
                    }}
                  >
                    Please Enter Your Email!
                  </Text>
                ) : null}

                {emailNotCorrect === true ? (
                  <Text
                    style={{
                      color: "red",
                      marginLeft: widthPercentageToDP(10),
                      marginTop: heightPercentageToDP(1.8),
                      fontSize: heightPercentageToDP(1.8),
                    }}
                  >
                    Please Enter Correct Email!
                  </Text>
                ) : null}

                <View>
                  <TextInput
                    mode="outlined"
                    label={t('signin.Password')}
                    onChangeText={(text) => setsignin_pass(text)}
                    style={styles.ti}
                    placeholderTextColor={"#646464"}
                    outlineColor="#0000001F"
                    activeOutlineColor="#FACA4E"
                    secureTextEntry={signin_ShowPassword}
                    onFocus={handleFocus1}
                    onBlur={handleBlur1}
                    left={
                      <TextInput.Icon
                        icon={() => (
                          <MaterialCommunityIcons
                            name={"lock-outline"}
                            // size={23}
                            size={wp(5.5)}
                            color={
                              isTextInputActive1 == true
                                ? "#FACA4E"
                                : "#64646485"
                            }
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
                        borderColor: signin_ShowPassword
                          ? "#646464"
                          : "#FACA4E",
                        backgroundColor: signin_ShowPassword
                          ? "#64646412"
                          : "#FF660012",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.txt,
                        { color: signin_ShowPassword ? "#646464" : "#FACA4E" },
                      ]}
                    >
                      {signin_ShowPassword ? t('signin.Show') : t('signin.Hide')}
                      {/* {signin_ShowPassword ? "Show" : "Hide"} */}
                    </Text>
                  </TouchableOpacity>
                </View>

                {passwordSignInError === true ? (
                  <Text
                    style={{
                      color: "red",
                      marginLeft: widthPercentageToDP(10),
                      marginTop: heightPercentageToDP(1.8),
                      fontSize: heightPercentageToDP(1.8),
                    }}
                  >
                    Please Enter Your Password!
                  </Text>
                ) : null}

                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgetPassword")}
                >
                  <Text
                    style={{
                      color: "#FACA4E",
                      fontSize: wp(4),
                      fontFamily: "Inter-Bold",
                      marginRight: "5%",
                      alignSelf: "flex-end",
                      marginTop: "10%",
                    }}
                  >
                    {t('signin.ForgetPassword')}
                    {/* Forgot Password? */}
                  </Text>
                </TouchableOpacity>


                <View style={{ marginTop: "25%", alignSelf: "center" }}>
                  <CustomButton
                    title= {t('signin.SignIn')}
                    load={false}
                    // checkdisable={inn == '' && cm == '' ? true : false}
                    customClick={() => {
                      goTOScreen();
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.v1}>
                <TextInput
                  mode="outlined"
                  label={t('signup.Username')}
                  // label="Username"
                  onChangeText={(text) => setusername(text)}
                  value={username}
                  style={styles.ti}
                  outlineColor="#0000001F"
                  placeholderTextColor={"#646464"}
                  activeOutlineColor="#FACA4E"
                  autoCapitalize="none"
                  onFocus={handleFocus2}
                  onBlur={handleBlur2}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialCommunityIcons
                          name={"account-outline"}
                          size={23}
                          color={
                            isTextInputActive2 == true ? "#FACA4E" : "#64646485"
                          }
                        />
                      )}
                    />
                  }
                />

                {signUpUserNameError === true ? (
                  <Text
                    style={{
                      color: "red",
                      marginLeft: widthPercentageToDP(10),
                      marginTop: heightPercentageToDP(1.8),
                      fontSize: heightPercentageToDP(1.8),
                    }}
                  >
                    Please Enter Your User name!
                  </Text>
                ) : null}

                <TextInput
                  mode="outlined"
                  label={t('signin.EmailAddress')}
                  // label="Email Address"
                  onChangeText={(text) => setsignup_email(text)}
                  // onChangeText={(text) => setsignup_email(text.trimStart())}
                  style={styles.ti}
                  outlineColor="#0000001F"
                  placeholderTextColor={"#646464"}
                  activeOutlineColor="#FACA4E"
                  autoCapitalize="none"
                  onFocus={handleFocus3}
                  onBlur={handleBlur3}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialCommunityIcons
                          name={"email-outline"}
                          size={23}
                          color={
                            isTextInputActive3 == true ? "#FACA4E" : "#64646485"
                          }
                        />
                      )}
                    />
                  }
                />

                {signUpEmailError === true ? (
                  <Text
                    style={{
                      color: "red",
                      marginLeft: widthPercentageToDP(10),
                      marginTop: heightPercentageToDP(1.8),
                      fontSize: heightPercentageToDP(1.8),
                    }}
                  >
                    Please Enter Your Email Address!
                  </Text>
                ) : null}

                {emailNotCorrectSignUp === true ? (
                  <Text
                    style={{
                      color: "red",
                      marginLeft: widthPercentageToDP(10),
                      marginTop: heightPercentageToDP(1.8),
                      fontSize: heightPercentageToDP(1.8),
                    }}
                  >
                    Please Enter Correct Email!
                  </Text>
                ) : null}

                <View>
                  <TextInput
                    mode="outlined"
                    label={t('signin.Password')}
                    // label="Password"
                    onChangeText={(text) => setsignup_pass(text)}
                    style={styles.ti}
                    placeholderTextColor={"#646464"}
                    outlineColor="#0000001F"
                    activeOutlineColor="#FACA4E"
                    secureTextEntry={signin_ShowPassword1}
                    onFocus={handleFocus4}
                    onBlur={handleBlur4}
                    left={
                      <TextInput.Icon
                        icon={() => (
                          <MaterialCommunityIcons
                            name={"lock-outline"}
                            size={23}
                            color={
                              isTextInputActive4 == true
                                ? "#FACA4E"
                                : "#64646485"
                            }
                          />
                        )}
                      />
                    }
                  />

                  {signUpPasswordError === true ? (
                    <Text
                      style={{
                        color: "red",
                        marginLeft: widthPercentageToDP(10),
                        marginTop: heightPercentageToDP(1.8),
                        fontSize: heightPercentageToDP(1.8),
                      }}
                    >
                      Please Enter Your Password
                    </Text>
                  ) : null}

                  <TouchableOpacity
                    onPress={handleTogglePasswordVisibility1}
                    style={[
                      styles.hs,
                      {
                        borderColor: signin_ShowPassword1
                          ? "#646464"
                          : "#FACA4E",
                        backgroundColor: signin_ShowPassword1
                          ? "#64646412"
                          : "#FF660012",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.txt,
                        { color: signin_ShowPassword1 ? "#646464" : "#FACA4E" },
                      ]}
                    >
                      {signin_ShowPassword1 ? t('signin.Show') : t('signin.Hide')}
                      {/* {signin_ShowPassword1 ? "Show" : "Hide"} */}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TextInput
                    mode="outlined"
                    // label="Confirm Password"
                    label={t('signup.confirmPassword')}
                    onChangeText={(text) => setsignup_cpass(text)}
                    style={styles.ti}
                    placeholderTextColor={"#646464"}
                    outlineColor="#0000001F"
                    activeOutlineColor="#FACA4E"
                    secureTextEntry={signin_ShowPassword2}
                    onFocus={handleFocus5}
                    onBlur={handleBlur5}
                    left={
                      <TextInput.Icon
                        icon={() => (
                          <MaterialCommunityIcons
                            name={"lock-outline"}
                            size={23}
                            color={
                              isTextInputActive5 == true
                                ? "#FACA4E"
                                : "#64646485"
                            }
                          />
                        )}
                      />
                    }
                  />
                  <TouchableOpacity
                    onPress={handleTogglePasswordVisibility2}
                    style={[
                      styles.hs,
                      {
                        borderColor: signin_ShowPassword2
                          ? "#646464"
                          : "#FACA4E",
                        backgroundColor: signin_ShowPassword2
                          ? "#64646412"
                          : "#FF660012",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.txt,
                        { color: signin_ShowPassword2 ? "#646464" : "#FACA4E" },
                      ]}
                    >
                      {signin_ShowPassword2 ? t('signin.Show') : t('signin.Hide')}
                      {/* {signin_ShowPassword2 ? "Show" : "Hide"} */}
                    </Text>
                  </TouchableOpacity>

                  {signUpConfirmPasswordError === true ? (
                    <Text
                      style={{
                        color: "red",
                        marginLeft: widthPercentageToDP(10),
                        marginTop: heightPercentageToDP(1.8),
                        fontSize: heightPercentageToDP(1.8),
                      }}
                    >
                      Please Enter Your Confirm Password
                    </Text>
                  ) : null}
                </View>


                <View></View>

                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: widthPercentageToDP(7),
                    marginTop: heightPercentageToDP(3),
                    width: "100%",
                  }}
                >
                  <Text style={{ marginLeft: wp(3) }}>
                  {t('signup.pleaseReview')}
                
                  </Text>
                </View>

                <View
                  style={{
                    marginBottom: heightPercentageToDP(12),
                    marginHorizontal: widthPercentageToDP(8),
                  }}
                >
              
                  <Text
                    style={{
                      marginTop: heightPercentageToDP(Platform.OS ==="ios" ? 5:1),
                      fontFamily: "Inter",
                      fontSize: heightPercentageToDP(1.8),
                      lineHeight: heightPercentageToDP(2),
                      color: "black",
                    }}
                  >
                    1.  {t('signup.point1')}
                    {"\n\n"}
                    2.  {t('signup.point2')}
                    {"\n\n"}
                    3.  {t('signup.point3')}
                    {/* {"\n\n"} */}
                    {/* 4.  {t('signup.point4')} */}
                    {"\n\n"}
                    4.  {t('signup.point5')}
             
                  </Text>
                  {/* </ScrollView> */}
                </View>
              </View>
            )}
          </View>

          {isLoading && (
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#FACA4E" />
            </View>
          )}
       
      
 </ScrollView>
 {check === 1 ? (
          <View
            style={{ position: "absolute", bottom: 10, alignSelf: "center" }}
          >
            <CustomButton
              title="Sign Up"
              load={false}
              customClick={() => {
                goToScreen2();
              }}
            />
          </View>
        ) : null}
        <CustomSnackbar
          message={"Alert!"}
          messageDescription={
            "Password is not matching or email is already in use!"
          }
          onDismiss={dismissSnackbar} // Make sure this function is defined
          visible={snackbarVisible}
        />

        <CustomSnackbar
          message={"Alert!"}
          messageDescription={"Please Agree With Terms & Condition"}
          onDismiss={dismissSnackbarChecked} // Make sure this function is defined
          visible={snackbarVisibleChecked}
        />

        <CustomSnackbar
          message={"Alert!"}
          messageDescription={"Wrong Email Or Password"}
          onDismiss={dismissCorrectSnackbar} // Make sure this function is defined
          visible={snackbarCorrectVisible}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default App;
