// import React, { useEffect, useRef, useState } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   View,
//   FlatList,
//   Image,
//   Text,
//   TouchableOpacity,
//   LogBox,
//   Animated,
//   ImageBackground,
//   Pressable,
//   StatusBar,
//   Platform,
// } from "react-native";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// import { appImages } from "../../assets/utilities/index";
// import { Button, Divider, TextInput } from "react-native-paper";
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from "react-native-responsive-screen";
// import CustomButton from "../../assets/Custom/Custom_Button";
// import CustomSnackbar from "../../assets/Custom/CustomSnackBar";

// import Headers from "../../assets/Custom/Headers";
// import RBSheet from "react-native-raw-bottom-sheet";
// import { useTranslation } from "react-i18next";

// LogBox.ignoreAllLogs();

// export default function ContactUs({ navigation }) {
//   const { t } = useTranslation();
//   const [fullName, setFullName] = useState("");
//   const [emailAddress, setEmailAddress] = useState("");
//   const [message, setMessage] = useState("");
//   const [snackbarVisible, setSnackbarVisible] = useState(false);
//   const ref_RBSheetLogout = useRef(null);

//   const [isTextInputActive, setIsInputActive] = useState(false);

//   const [isTextInputActiveEmailAddress, setIsInputActiveEmailAddress] =
//     useState(false);

//   const [isTextInputActiveMessage, setIsInputActiveMessage] = useState(false);

//   const handleFocus = () => {
//     setIsInputActive(true);
//   };

//   const handleBlur = () => {
//     setIsInputActive(false);
//   };

//   const handleFocusEmail = () => {
//     setIsInputActiveEmailAddress(true);
//   };

//   const handleBlurEmail = () => {
//     setIsInputActiveEmailAddress(false);
//   };

//   const handleFocusMessage = () => {
//     setIsInputActiveMessage(true);
//   };

//   const handleBlurMessage = () => {
//     setIsInputActiveMessage(false);
//   };

//   const dismissSnackbar = () => {
//     setSnackbarVisible(true);
//   };

//   const handleBlurConfirmPassword = () => {
//     setIsConfirmPasswordActive(false);
//   };

//   const handleUpdatePassword = async () => {
//     // Perform the password update logic here
//     // For example, you can make an API request to update the password

//     // Assuming the update was successful
//     setSnackbarVisible(true);

//     // Automatically hide the Snackbar after 3 seconds
//     setTimeout(() => {
//       navigation.goBack();
//       setSnackbarVisible(false);
//     }, 3000);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ marginTop: Platform.OS == "ios" ? 0 : hp(5) }}>
//         <Headers
//           onPress={() => navigation.goBack()}
//           showBackIcon={true}
//           showText={true}
//           text={t('ContactUs')}
//           // text={"Contact Us"}
//         />
//       </View>
//       <CustomSnackbar
//         message={t('Success')}
//         messageDescription={t('MessageSubmittedSuccessfully')}
//         onDismiss={dismissSnackbar} // Make sure this function is defined
//         visible={snackbarVisible}
//       />
//       <View style={{ marginTop: hp(3) }}>
//         <TextInput
//           mode="outlined"
//           label={t('FirstName')}
//           onChangeText={(text) => setFullName(text)}
//           style={styles.ti}
//           outlineColor="#0000001F"
//           placeholderTextColor={"#646464"}
//           activeOutlineColor="#FACA4E"
//           autoCapitalize="none"
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           // left={isTextInputActive ? <Oemail /> : <Gemail />}
//         />
//       </View>

//       <View style={{ marginTop: hp(1) }}>
//         <TextInput
//           mode="outlined"
//           label={t('EmailAddress')}
//           onChangeText={(text) => setEmailAddress(text)}
//           style={styles.ti}
//           outlineColor="#0000001F"
//           placeholderTextColor={"#646464"}
//           activeOutlineColor="#FACA4E"
//           autoCapitalize="none"
//           onFocus={handleFocusEmail}
//           onBlur={handleBlurEmail}
//           // left={isTextInputActive ? <Oemail /> : <Gemail />}
//         />
//       </View>

//       <View style={{ marginTop: hp(1) }}>
//         <TextInput
//           mode="outlined"
//           label={t('Message')}
//           multiline
//           onChangeText={(text) => setMessage(text)}
//           style={[styles.ti, { height: hp(18) }]}
//           outlineColor="#0000001F"
//           placeholderTextColor={"#646464"}
//           activeOutlineColor="#FACA4E"
//           autoCapitalize="none"
//           onFocus={handleFocusMessage}
//           onBlur={handleBlurMessage}
//           // left={isTextInputActive ? <Oemail /> : <Gemail />}
//         />
//       </View>

//       <View
//         style={{
//           marginTop: hp(30),
//           marginBottom: hp(5),
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <CustomButton
//           title={t('Submit')}
//           load={false}
//           // checkdisable={inn == '' && cm == '' ? true : false}
//           customClick={() => {
//             handleUpdatePassword();
//             //ref_RBSheetLogout.current.open()
//             //navigation.navigate('Profile_image');
//           }}
//         />
//       </View>

//       <RBSheet
//         ref={ref_RBSheetLogout}
//         height={330}
//         openDuration={250}
//         enableOverDrag={false}
//         enabledGestureInteraction={false}
//         closeOnDragDown={true}
//         closeOnPressMask={false}
//         customStyles={{
//           container: {
//             justifyContent: "center",
//             alignItems: "center",
//             borderTopLeftRadius: 30,
//             borderTopRightRadius: 30,
//             paddingTop: 0,
//             padding: 20,
//             zIndex: 999,
//           },
//           draggableIcon: {
//             backgroundColor: "transparent",
//           },
//         }}
//       >
//         <Image source={appImages.alert} style={{ resizeMode: "contain" }} />
//         <Text
//           style={[
//             styles.txtNotification,
//             { marginTop: 1, fontSize: hp(2.5), fontWeight: "500" },
//           ]}
//         >
//           Confirmation
//         </Text>

//         <Text style={{ marginTop: hp(2) }}>Do You Really Want To Logout?</Text>

//         <View style={styles.buttonDirections}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => ref_RBSheetLogout.current.close()}
//           >
//             <Text style={styles.textButton}>Cancel</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => ref_RBSheetLogout.current.close()}
//             style={[styles.button, { backgroundColor: "#FACA4E" }]}
//           >
//             <Text style={[styles.textButton, { color: "#232323" }]}>
//               Logout
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </RBSheet>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   ti: {
//     marginHorizontal: "7%",
//     marginTop: "5%",
//     // width: 300,
//     backgroundColor: "white",
//     fontSize: wp(4),
//     paddingLeft: "2%",
//     borderRadius: 10,
//   },
//   buttonDirections: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: hp(4.3),
//     width: "100%",
//     marginLeft: wp(5),
//     justifyContent: "space-evenly",
//   },
//   button: {
//     borderColor: "#FACA4E",
//     borderWidth: 0.8,
//     borderRadius: wp(5),
//     width: wp(35),
//     height: hp(5.5),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   textButton: {
//     color: "#FACA4E",
//     fontWeight: "bold",
//   },
//   txtNotification: {
//     fontWeight: "500",
//     marginTop: hp(10),
//     marginLeft: wp(5),
//     fontSize: hp(2.3),
//     color: "#0B0B0B",
//   },
// });


import React, { useEffect, useRef, useState } from "react"; 
import {
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { TextInput, Text } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CustomButton from "../../assets/Custom/Custom_Button";
import CustomSnackbar from "../../assets/Custom/CustomSnackBar";
import Headers from "../../assets/Custom/Headers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "../../../../baseUrl";
import CustomLoaderButton from "../../assets/Custom/CustomLoaderButton";
import { useTranslation } from 'react-i18next';
export default function ContactUs({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState("");
const { t } = useTranslation();
  const dismissSnackbar = () => setSnackbarVisible(false);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken ");
        if (token) {
          setAuthToken(token);
          console.log('auth token----------', token)
        } else {
          throw new Error("No auth token found");
        }
      } catch (err) {
        console.error("Error retrieving auth token:", err);
      }
    };

    getAuthToken();
  }, []);

  const validateFields = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim())
    ) {
      newErrors.emailAddress = "Invalid email address.";
    }
    if (!message.trim()) {
      newErrors.message = "Message is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitMessage = async () => {
    if (!validateFields()) {
      return;
    }

    setLoading(true);

    const payload = {
      fullname: fullName,
      email_address: emailAddress,
      message,
    };

    try {
      const response = await fetch(base_url + "contact/createMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });
      console.log("API Response:", response);
      if (response.ok) {
        const responseData = await response.json();
        console.log("Response Data:", responseData);
        setSnackbarVisible(true);
        setFullName("");
        setEmailAddress("");
        setMessage("");
        setErrors({});
      } else {
        const errorResponse = await response.json();
        const apiErrors = {};
        if (errorResponse.errors) {
          for (const key in errorResponse.errors) {
            apiErrors[key] = errorResponse.errors[key][0];
          }
        }
        setErrors(apiErrors);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : hp(5) }}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          showText={true}
          text="Contact Us"
        />
      </View>

      <CustomSnackbar
        message="Success"
        messageDescription="Message submitted successfully."
        onDismiss={dismissSnackbar}
        visible={snackbarVisible}
      />

      <View style={{ marginTop: hp(3) }}>
        <TextInput
          mode="outlined"
          label="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={styles.ti}
          outlineColor="#0000001F"
          placeholderTextColor="#646464"
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
        />
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
      </View>

      <View style={{ marginTop: hp(1) }}>
        <TextInput
          mode="outlined"
          label="Email Address"
          value={emailAddress}
          onChangeText={(text) => setEmailAddress(text)}
          style={styles.ti}
          outlineColor="#0000001F"
          placeholderTextColor="#646464"
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
        />
        {errors.emailAddress && (
          <Text style={styles.errorText}>{errors.emailAddress}</Text>
        )}
      </View>

      <View style={{ marginTop: hp(1) }}>
        <TextInput
          mode="outlined"
          label="Message"
          value={message}
          onChangeText={(text) => setMessage(text)}
          multiline
          style={[styles.ti, { height: hp(18) }]}
          outlineColor="#0000001F"
          placeholderTextColor="#646464"
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
        />
        {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
      </View>

      <View
        style={{
          marginTop: hp(15),
          marginBottom: hp(5),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <CustomLoaderButton
              title={t('Submit')}
              load={loading}
              customClick={handleSubmitMessage}
              // customClick={() => {
               
           
              //     if (!loading) {
              //       // alert("If")
              //       setLoading(true);
              //       handleSubmitMessage()
    
              //   }
              // }}
            />
        {/* <CustomButton
          title="Submit"
          load={loading}
          customClick={handleSubmitMessage}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  ti: {
    marginHorizontal: "7%",
    marginTop: "5%",
    backgroundColor: "white",
    fontSize: wp(4),
    paddingLeft: "2%",
    borderRadius: 10,
  },
  errorText: {
    marginHorizontal: "7%",
    marginTop: hp(1),
    fontSize: wp(3.5),
    color: "red",
  },
});
