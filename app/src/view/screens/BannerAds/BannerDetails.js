// import {
//   StyleSheet,
//   FlatList,
//   Text,
//   Image,
//   KeyboardAvoidingView,
//   ScrollView,
//   StatusBar,
//   ImageBackground,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useState, useRef} from 'react';
// import RBSheet from 'react-native-raw-bottom-sheet';

// import {Button, Divider, TextInput} from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// import Back from '../../../assets/svg/back.svg';
// import {appImages} from '../../../assets/utilities/index';
// import Slider from '@react-native-community/slider';
// import VolumeUp from '../../../assets/svg/VolumeUp.svg';
// import Like from '../../../assets/svg/Like.svg';
// import UnLike from '../../../assets/svg/Unlike.svg';
// import Comment from '../../../assets/svg/Comment.svg';
// import Send from '../../../assets/svg/Send.svg';
// import Download from '../../../assets/svg/Download.svg';
// import CustomButton from '../../../assets/Custom/Custom_Button';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Share from 'react-native-share';
// import Blogss from '../../../assets/images/logo.png';
// import Link from '../../../assets/svg/Link.svg';

// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';

// import Fontiso from 'react-native-vector-icons/Fontisto';

// import IonIcons from 'react-native-vector-icons/Ionicons';

// import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
// import CPaperInput from '../../../assets/Custom/CPaperInput';
// import Headers from '../../../assets/Custom/Headers';

// import Add from '../../../assets/svg/AddMainScreen.svg';

// export default function BannerDetails({navigation, route}) {

//   const receivedData = route.params?.item;

//   console.log('Data Recieved on pics', receivedData);

//   const chats = [
//     {
//       id: 1,
//       link: 'http:/?www.sample.org?head',
//       startDate: '09/12/2023',
//       EndDate: '09/12/2023',
//     },
//     {
//       id: 2,
//       link: 'http:/?www.sample.org?head',
//       startDate: '09/12/2023',
//       EndDate: '09/12/2023',
//     },
//     {
//       id: 3,
//       link: 'http:/?www.sample.org?head',
//       startDate: '09/12/2023',
//       EndDate: '09/12/2023',
//     },
//     {
//       id: 4,
//       link: 'http:/?www.sample.org?head',
//       startDate: '09/12/2023',
//       EndDate: '09/12/2023',
//     },
//     {
//       id: 5,
//       link: 'http:/?www.sample.org?head',
//       startDate: '09/12/2023',
//       EndDate: '09/12/2023',
//     },
//     {
//       id: 6,
//       link: 'http:/?www.sample.org?head',
//       startDate: '09/12/2023',
//       EndDate: '09/12/2023',
//     },
//   ];

//   const renderBlogs = item => {
//     console.log('Items', item);
//     return (
//       <View>
//         <View
//           style={{
//             flexDirection: 'row',
//             paddingHorizontal: wp(3),
//             alignItems: 'center',
//             height: hp(12),
//             marginTop: hp(3),
//             marginHorizontal: wp(8),
//           }}>
//           <View
//             style={{
//               height: hp(10),
//               alignSelf: 'center',
//               resizeMode: 'hidden',
//               width: wp(21),
//               borderRadius: wp(5),
//             }}>
//             <Image
//               style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
//               source={appImages.bannerAds}
//             />
//           </View>

//           <View style={{flex: 1, justifyContent: 'space-between'}}>
//             <View
//               style={{
//                 height: hp(6),
//                 marginLeft: wp(1.8),
//                 justifyContent: 'space-between',
//               }}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   width: '100%',
//                 }}>
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontSize: hp(1.8),
//                     fontFamily: 'Inter-Medium',
//                   }}>
//                   Start date
//                 </Text>

//                 <Text
//                   style={{
//                     color: '#646464',
//                     fontSize: hp(1.8),
//                     fontFamily: 'Inter-Regular',
//                   }}>
//                   09/12/2023
//                 </Text>
//               </View>

//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   width: '100%',
//                 }}>
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontSize: hp(1.8),
//                     fontFamily: 'Inter-Medium',
//                   }}>
//                   End date
//                 </Text>

//                 <Text
//                   style={{
//                     color: '#646464',
//                     fontSize: hp(1.8),
//                     fontFamily: 'Inter-Regular',
//                   }}>
//                   09/12/2023
//                 </Text>
//               </View>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 marginTop: hp(1),
//                 height: hp(2.1),
//                 alignSelf: 'center',
//               }}>
//               <Link width={14} height={14} />

//               <Text
//                 style={{
//                   color: '#646464',
//                   marginLeft: wp(3),
//                   fontSize: hp(1.5),
//                   fontFamily: 'Inter-Regular',
//                 }}>
//                 http:/?www.sample.org?head
//               </Text>
//             </View>
//           </View>
//         </View>

//         <View
//           style={{
//             height: hp(0.1),
//             width: '100%',
//             marginTop: hp(1),
//             backgroundColor: '#00000021',
//           }}></View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />

//       <View style={{marginTop:hp(5)}}>

//       <Headers onPress={()=>navigation.goBack()} showBackIcon={true} showText={true} text={'Banner Details'} />

//       </View>

//       <View
//         style={{
//           height: hp(18),
//           marginTop:hp(3),
//           alignSelf: 'center',
//           resizeMode: 'hidden',
//           width: '80%',
//           borderRadius: wp(5),
//         }}>
//         <Image
//           style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
//           source={{uri:receivedData?.image}}
//         />
//       </View>

//       <View style={{flexDirection:'row',height:hp(5), justifyContent:'space-between', alignItems:'center', marginHorizontal:wp(8), marginTop:hp(3)}}>
//        <Text style={{color:'#000000',fontFamily:'Inter-Medium',fontSize:hp(1.5)}}>
//        Start date
//        </Text>

//        <Text style={{color:'#646464',fontFamily:'Inter-Medium',fontSize:hp(1.5)}}>
//        {receivedData?.startdate}
//        </Text>
//       </View>

//       <View style={{flexDirection:'row',height:hp(5), justifyContent:'space-between', alignItems:'center', marginHorizontal:wp(8)}}>
//        <Text style={{color:'#000000',fontFamily:'Inter-Medium',fontSize:hp(1.5)}}>
//        End date
//        </Text>

//        <Text style={{color:'#646464',fontFamily:'Inter-Medium',fontSize:hp(1.5)}}>
//         {receivedData?.enddate}
//        </Text>
//       </View>

//       <View style={{flexDirection:'row',height:hp(7), alignItems:'center', marginHorizontal:wp(8)}}>
       
//        <Link/>

//        <Text style={{ marginLeft:wp(2.5),color:'#646464',fontFamily:'Inter-Regular',fontSize:hp(1.6)}}>
//       {/*  http:/?www.sample.org?head http:/?www.sample{'\n'}.org?head */}

//       {receivedData?.banner_link}
//        </Text>
//       </View>

      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
// });
//////////////////////////////////////////////////////////////////////////////// add faisal code on 22/5/2024
import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
  Linking
} from "react-native";
import React, { useState, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

import { Button, Divider, TextInput } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Back from "../../../assets/svg/back.svg";
import { appImages } from "../../../assets/utilities/index";
import Slider from "@react-native-community/slider";
import VolumeUp from "../../../assets/svg/VolumeUp.svg";
import Like from "../../../assets/svg/Like.svg";
import UnLike from "../../../assets/svg/Unlike.svg";
import Comment from "../../../assets/svg/Comment.svg";
import Send from "../../../assets/svg/Send.svg";
import Download from "../../../assets/svg/Download.svg";
import CustomButton from "../../../assets/Custom/Custom_Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Share from "react-native-share";
import Blogss from "../../../assets/images/logo.png";
import Link from "../../../assets/svg/Link.svg";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Fontiso from "react-native-vector-icons/Fontisto";

import IonIcons from "react-native-vector-icons/Ionicons";

import { SelectCountry, Dropdown } from "react-native-element-dropdown";
import CPaperInput from "../../../assets/Custom/CPaperInput";
import Headers from "../../../assets/Custom/Headers";

import Add from "../../../assets/svg/AddMainScreen.svg";

export default function BannerDetails({ navigation, route }) {
  const receivedData = route.params?.item;
  const authToken = route.params?.authToken;

  const PaymentStatus =  receivedData.paid_status



  console.log("Data Recieved on authToken", receivedData);
  console.log("Data Recieved on price", receivedData?.price);
  console.log("Data Recieved on id", receivedData?.id);

  const chats = [
    {
      id: 1,
      link: "http:/?www.sample.org?head",
      startDate: "09/12/2023",
      EndDate: "09/12/2023",
    },
    {
      id: 2,
      link: "http:/?www.sample.org?head",
      startDate: "09/12/2023",
      EndDate: "09/12/2023",
    },
    {
      id: 3,
      link: "http:/?www.sample.org?head",
      startDate: "09/12/2023",
      EndDate: "09/12/2023",
    },
    {
      id: 4,
      link: "http:/?www.sample.org?head",
      startDate: "09/12/2023",
      EndDate: "09/12/2023",
    },
    {
      id: 5,
      link: "http:/?www.sample.org?head",
      startDate: "09/12/2023",
      EndDate: "09/12/2023",
    },
    {
      id: 6,
      link: "http:/?www.sample.org?head",
      startDate: "09/12/2023",
      EndDate: "09/12/2023",
    },
  ];

  const renderBlogs = (item) => {
    console.log("Items", item);
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: wp(3),
            alignItems: "center",
            height: hp(12),
            marginTop: hp(3),
            marginHorizontal: wp(8),
          }}
        >
          <View
            style={{
              height: hp(10),
              alignSelf: "center",
              resizeMode: "hidden",
              width: wp(21),
              borderRadius: wp(5),
            }}
          >
            <Image
              style={{ width: "100%", borderRadius: wp(2.1), height: "100%" }}
              source={appImages.bannerAds}
            />
          </View>

          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View
              style={{
                height: hp(6),
                marginLeft: wp(1.8),
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: hp(1.8),
                    fontFamily: "Inter-Medium",
                  }}
                >
                  Start date
                </Text>

                <Text
                  style={{
                    color: "#646464",
                    fontSize: hp(1.8),
                    fontFamily: "Inter-Regular",
                  }}
                >
                  09/12/2023
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: hp(1.8),
                    fontFamily: "Inter-Medium",
                  }}
                >
                  End date
                </Text>

                <Text
                  style={{
                    color: "#646464",
                    fontSize: hp(1.8),
                    fontFamily: "Inter-Regular",
                  }}
                >
                  09/12/2023
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: hp(1),
                height: hp(2.1),
                alignSelf: "center",
              }}
            >
              <Link width={14} height={14} />

              <Text
                style={{
                  color: "#646464",
                  marginLeft: wp(3),
                  fontSize: hp(1.5),
                  fontFamily: "Inter-Regular",
                }}
              >
                http:/?www.sample.org?head
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: hp(0.1),
            width: "100%",
            marginTop: hp(1),
            backgroundColor: "#00000021",
          }}
        ></View>
      </View>
    );
  };

  const handleLinkPress = (url) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#FFFFFF"} />

      <View style={{ marginTop: hp(5) }}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          showText={true}
          text={"Banner Details"}
        />
      </View>

      <View
        style={{
          height: hp(18),
          marginTop: hp(4),
          alignSelf: "center",
          resizeMode: "hidden",
          width: "100%",
          borderRadius: wp(5),
          paddingHorizontal: wp(8),
        }}
      >
        <Image
          style={{ width: "100%", borderRadius: wp(2.1), height: "100%" }}
          source={{ uri: receivedData?.image }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          height: hp(5),
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: wp(8),
          marginTop: hp(2),
        }}
      >
        <Text
          style={{
            color: "#000000",
            fontFamily: "Inter-SemiBold",
            fontSize: hp(1.6),
          }}
        >
          Start date
        </Text>

        <Text
          style={{
            color: "#646464",
            fontFamily: "Inter-Medium",
            fontSize: hp(1.5),
          }}
        >
          {receivedData?.startdate}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          height: hp(4),
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: wp(8),
        }}
      >
        <Text
          style={{
            color: "#000000",
            fontFamily: "Inter-SemiBold",
            fontSize: hp(1.6),
          }}
        >
          End date
        </Text>

        <Text
          style={{
            color: "#646464",
            fontFamily: "Inter-Medium",
            fontSize: hp(1.5),
          }}
        >
          {receivedData?.enddate}
        </Text>
      </View>
      {/* ////////// Faisal Code */}

      <View style={styles.bannerpriceview}>
        <Text style={styles.bannertexthard}>Price</Text>
        <Text style={styles.bannertext}>{receivedData?.price}</Text>
      </View>

      <View style={styles.bannerpriceview}>
        <Text style={styles.bannertexthard}>Status</Text>
        <Text style={styles.bannertext}>{receivedData?.status}</Text>
      </View>
      <View style={styles.bannerpriceview}>
        <Text style={styles.bannertexthard}>Payment Status</Text>
        <Text style={styles.bannertext}>{PaymentStatus ? "True" : "False"}</Text>
      </View>
{/* 
      <View style={styles.bannerpriceview}>
        <Text style={styles.bannertexthard}>Top Banner</Text>
        <Text style={styles.bannertext}>{receivedData?.top_banner}</Text>
      </View> */}
      {/* //////////Faisal code */}

      <TouchableOpacity  onPress={() => handleLinkPress(receivedData?.banner_link)}
        style={{
          flexDirection: "row",
          height: hp(6),
          alignItems: "center",
          marginHorizontal: wp(8),
          paddingRight: wp(4),
          marginBottom:'60%'
        }}
      >
        <Link />

        <Text
          style={{
            marginLeft: wp(2.5),
            color: "#646464",
            fontFamily: "Inter-Regular",
            fontSize: hp(1.6),
          }}
        >
          {/*  http:/?www.sample.org?head http:/?www.sample{'\n'}.org?head */}

          {receivedData?.banner_link}
        </Text>
       </TouchableOpacity>

       {PaymentStatus === false && (
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("PaymentScreen", {
          authToken: authToken,
          totalAmount: receivedData?.price,
          bannerId: receivedData?.id,
          addBannerLink: receivedData.banner_link,
          datas: receivedData.image,
          user_id: receivedData.user_id,
          startDate: receivedData.startdate,
          endDate: receivedData.enddate,
          top_banner: receivedData.top_banner,

        })}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: wp(2),
  },
  bannerpriceview: {
    flexDirection: "row",
    height: hp(4),
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(8),
  },
  bannertexthard: {
    color: "#000000",
    fontFamily: "Inter-SemiBold",
    fontSize: hp(1.6),
  },
  bannertext: {
    color: "#646464",
    fontFamily: "Inter-Regular",
    fontSize: hp(1.5),
  },
  button: {
    backgroundColor: "#FACA4E",
    marginHorizontal: wp(8),
    padding: 12,
    borderRadius: 30,
    alignItems: "center",

  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
