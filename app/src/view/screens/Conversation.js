// import {
//   StyleSheet,
//   FlatList,
//   Text,
//   ActivityIndicator,
//   Image,
//   ScrollView,
//   Platform,
//   TextInput,
//   StatusBar,
//   ImageBackground,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import Back from '../../assets/svg/back.svg';

// import {appImages} from '../../assets/utilities/index';
// import Slider from '@react-native-community/slider';
// import VolumeUp from '../../assets/svg/VolumeUp.svg';
// import Like from '../../assets/svg/Like.svg';
// import UnLike from '../../assets/svg/Unlike.svg';
// import Comment from '../../assets/svg/Comment.svg';
// import Send from '../../assets/svg/Send.svg';
// import Download from '../../assets/svg/Download.svg';
// import DownArrowComments from '../../assets/svg/DownArrowComments.svg';
// import UpArrowComments from '../../assets/svg/UpArrowComments.svg';

// import Ionicons from 'react-native-vector-icons/Ionicons';

// import {format} from 'date-fns';

// import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

// import {GestureHandlerRootView} from 'react-native-gesture-handler';

// import {GiftedChat, Bubble, Day} from 'react-native-gifted-chat';

// import Share from 'react-native-share';

// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';

// import Fontiso from 'react-native-vector-icons/Fontisto';

// import IonIcons from 'react-native-vector-icons/Ionicons';

// import ButtonSend from '../../assets/svg/ButtonSendBlack.svg';

// import SmileEmoji from '../../assets/svg/SmileEmoji.svg';

// import firestore from '@react-native-firebase/firestore';

// import Entypo from 'react-native-vector-icons/Entypo';
// import CustomSnackbar from '../../assets/Custom/CustomSnackBar';

// export default function Conversation({navigation, route}) {
//   const [messageList, setMessageList] = useState([]);

//   const [loading, setLoading] = useState('');

//   const [authToken, setAuthToken] = useState('');

//   const [userId, setUserId] = useState('');

//   const receivedData = route.params?.receivedData;

//   console.log('recieved Data in conversation', receivedData);

//   const [commentText, setCommentText] = useState(null); // State variable to hold the text

//   const clearTextInput = () => {
//     console.log('came to logssssss', commentText);
//     // Clear the text in the TextInput
//     setCommentText(null);
//   };

//   //------------ useeffect -------------------\\

//   useEffect(() => {
//     // Make the API request and update the 'data' state
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     // Simulate loading
//     setLoading(true);

//     // Fetch data one by one
//     await getUserID();

//     // Once all data is fetched, set loading to false
//     setLoading(false);
//   };

//   const getUserID = async () => {
//     console.log('AT User Id');
//     try {
//       const result = await AsyncStorage.getItem('authToken ');
//       if (result !== null) {
//         setAuthToken(result);
//         console.log('user token retrieved:', result);
//       }

//       const result3 = await AsyncStorage.getItem('userId ');
//       if (result3 !== null) {
//         setUserId(result3);
//         console.log('user id retrieved:', result3);
//         fetchData(result3)
//       } else {
//         console.log('result is null', result);
//       }
//     } catch (error) {
//       // Handle errors here
//       console.error('Error retrieving user ID:', error);
//     }
//   };

//   //------------------------------------------\\

//   //-------------Fire Base Useeffect-----------\\

//  /*  useEffect(() => {

//   }, []); */
//   const fetchData=(userId)=>{

//     const subscriber= firestore().collection("chats").doc(userId + receivedData?.user_id)
//        .collection("messages")
//        .orderBy("createdAt", "desc");
//        subscriber.onSnapshot(querysnapshot=>{
//         const allMessages=  querysnapshot.docs.map(item=>{
//           const data = item.data();
//           return {...data,createdAt:data.createdAt.toDate()};
//         });

//         console.log("Document", userId + receivedData?.user_id)

//         console.log("Messages", allMessages)
//         setMessageList(allMessages);
//        });
//        return ()=> subscriber();

//   }

//    // On Send Message \\

//    const onSend = useCallback(async (messages= []) => {
//     if (!commentText) {
//       // Don't send an empty message
//       return;
//     }

//     //const msg =messages[0];
//     const myMsg={
//       _id: new Date().getTime().toString(),
//       text:commentText,
//        sendBy:userId,sendTo:receivedData?.user_id,
//       createdAt: new Date(),
//       user: {
//         _id: userId,
//        // name: senderName, // Include sender's name
//        // avatar: senderImage, // Include sender's image URL
//       },
//       //createdAt:Date.parse(msg.createdAt),

//     }

//     setMessageList(previousMessages=>
//       GiftedChat.append(previousMessages, [myMsg]),
//       );

//       firestore().collection("chats").doc(''+ userId+receivedData?.user_id)
//       .collection("messages")
//       .add(myMsg);

//       firestore().collection("chats").doc(''+ receivedData?.user_id+userId)
//       .collection("messages")
//       .add(myMsg);

//       clearTextInput();

//   }, [commentText, userId, receivedData.id]);

//    //-----------------\\

//   //----------------------------------------------\\

//   /* useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Realy? can I get it too?',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//         },
//       },
//       {
//         _id: 2,
//         text: 'Hey mar, I just got a great fried noodle recipe from my mother!',
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//           name: 'You',
//         },
//       },
//       {
//         _id: 3,
//         text: 'Dont forget to split it for me when its ripe ! haha',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//         },
//       },
//       {
//         _id: 4,
//         text: 'Of course dude!',
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//           name: 'You',
//         },
//       },
//       // Add more messages here...
//     ]);
//   }, []); */

//   const renderDay = props => {
//     return (
//       <Day
//         {...props}
//         textStyle={{
//           fontFamily: 'Inter-Bold',
//           fontSize: 16,
//           color: 'gray', // Customize the color of the date separator
//         }}
//       />
//     );
//   };

//   // Define a function to render custom message bubbles
//   const renderBubble = props => {
//     //console.log("Propsssssssssssssss", props)
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           left: {
//             backgroundColor: '#F4F8FC', // Customize the color for left messages
//           },
//           right: {
//             backgroundColor: '#FACA4E', // Customize the color for right messages
//           },
//         }}
//       />
//     );
//   };

//   /* const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages),
//     );
//   }, []); */

//   const CustomInputToolbar = () => {
//     return null; // This will remove the input message box
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent={true}
//         backgroundColor="transparent"
//         barStyle="dark-content" // You can set the StatusBar text color to dark or light
//       />

//       <View
//         style={{
//           flexDirection: 'row',
//           marginTop: hp(7),
//           alignItems: 'center',
//           justifyContent: 'center',
//           height: hp(7),
//         }}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backArrow}>
//           <Ionicons name="chevron-back-sharp" size={25} color="#282828" />
//         </TouchableOpacity>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             height: '100%',
//             width: wp(39),
//             justifyContent: 'space-between',
//             alignSelf: 'center',
//           }}>
//          { receivedData?.userimage!==null? <TouchableOpacity  onPress={()=>navigation.navigate("ViewElseProfile",{id:receivedData?.user_id})} style={{}}>
//             <Image
//               source={{uri:receivedData?.userimage}}
//               style={styles.profileImgs}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>:
//           <TouchableOpacity  onPress={()=>navigation.navigate("ViewElseProfile",{id:receivedData?.user_id})} style={{}}>
//          <MaterialCommunityIcons
//            style={{marginTop: hp(0.5)}}
//            name={'account-circle'}
//            size={35}
//            color={'#FACA4E'}
//          />
//         </TouchableOpacity>}

//           <Text
//             style={{
//               color: '#1E2022',
//               marginLeft: wp(-10),
//               fontFamily: 'Inter-Bold',
//               fontSize: hp(2.1),
//             }}>
//             {receivedData?.username}
//           </Text>
//         </View>
//       </View>

//       <View style={{flex: 1}}>
//         <GiftedChat
//           messagesContainerStyle={{paddingBottom: 30}}
//           messages={messageList}
//           //onSend={messages => onSend(messages)}
//           user={{
//             // _id: user_id,
//             _id: userId,
//           }}
//           // renderAvatar={props => {
//           //   return null;
//           // }}
//           renderAvatar={null}
//           renderBubble={renderBubble} // Set the custom renderBubble function
//           renderDay={null}
//           /* renderBubble={props => {
//             return <CustomBubble {...props} />;
//           }} */
//           //alwaysShowSend
//           /*  onInputTextChanged={text => {
//             console.log('text : ', text);
//           }} */
//           // renderChatEmpty={() => (
//           //   <View
//           //     style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//           //     {loading ? null : (
//           //       <Text
//           //         style={{
//           //           color: 'gray',
//           //           fontSize: 14,
//           //           transform: [{scaleY: -1}],
//           //         }}>
//           //         No Record Found
//           //       </Text>
//           //     )}
//           //   </View>
//           // )}
//           //disableComposer={false}
//           renderInputToolbar={CustomInputToolbar} // This will remove the input message box
//         />

//         <View
//           style={{
//             width: '100%',
//             flexDirection: 'row',
//             alignItems: 'center',
//             height: hp(21),
//           }}>
//           {/* ... (previous code) */}
//         </View>
//       </View>

//       <View
//         style={{
//           width: '100%',
//           flexDirection: 'row',
//           alignItems: 'center',
//           height: hp(8),
//         }}>
//       {/*   <TouchableOpacity
//           style={{
//             height: hp(8),
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: wp(14),
//           }}>
//           <SmileEmoji />
//         </TouchableOpacity> */}

//         <TextInput
//           placeholderTextColor={'#848484'}
//           value={commentText} // Bind the value to the state variable
//           onChangeText={text => setCommentText(text)} // Update state on text change
//           placeholder="Write Comment Here"
//           style={{flex: 1, marginLeft: wp(1)}}
//         />

//         <TouchableOpacity onPress={() => onSend()}>
//           <ButtonSend />
//         </TouchableOpacity>
//       </View>

//       <View
//         style={{
//           position: 'absolute',
//           top: 0,
//           bottom: 0,
//           left: 0,
//           right: 0,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         {loading && <ActivityIndicator size="large" color="#FACA4E" />}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   profileImgs: {
//     resizeMode: 'contain',
//     //marginTop: hp(-2),
//     //position: 'absolute',
//     //right: -10,
//     width: wp(12),
//     height: wp(12),
//   },
//   backArrow: {
//     position: 'absolute',
//     left: 20,
//     justifyContent: 'center', // Vertically align the arrow within the touchable area
//     paddingVertical: 10, // Add padding to increase the touchable area
//     paddingRight: 10, // Add some space on the right side if needed
//   },
// });
////////////////////////////////////////////////////////////////////////////// faisal code merg22/5/2024
import {
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  Platform,
  TextInput,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from 'react-i18next';
import Back from "../../assets/svg/back.svg";

import { appImages } from "../../assets/utilities/index";
import Slider from "@react-native-community/slider";
import VolumeUp from "../../assets/svg/VolumeUp.svg";
import Like from "../../assets/svg/Like.svg";
import UnLike from "../../assets/svg/Unlike.svg";
import Comment from "../../assets/svg/Comment.svg";
import Send from "../../assets/svg/Send.svg";
import Download from "../../assets/svg/Download.svg";
import DownArrowComments from "../../assets/svg/DownArrowComments.svg";
import UpArrowComments from "../../assets/svg/UpArrowComments.svg";

import Ionicons from "react-native-vector-icons/Ionicons";

import { format } from "date-fns";

import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { GiftedChat, Bubble, Day } from "react-native-gifted-chat";

import Share from "react-native-share";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Fontiso from "react-native-vector-icons/Fontisto";

import IonIcons from "react-native-vector-icons/Ionicons";

import ButtonSend from "../../assets/svg/ButtonSendBlack.svg";

import SmileEmoji from "../../assets/svg/SmileEmoji.svg";

import firestore from "@react-native-firebase/firestore";

import Entypo from "react-native-vector-icons/Entypo";
import CustomSnackbar from "../../assets/Custom/CustomSnackBar";
import { useIsFocused } from "@react-navigation/native";

export default function Conversation({ navigation, route }) {
  const offerid = route.params?.offerid?.data?.offer_id;
  // const receivedofferdata = route.params?.offerid;
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [userId, setUserId] = useState("");
  const [offerData, setOfferData] = useState([]);
  const receivedData = route.params?.receivedData;
  const itemId = receivedData.id;
  const isFocused = useIsFocused(); // Hook to track focus state
  const inputRef = useRef(null);
  // console.log("recieved Data in conversation", receivedData);
  // console.log("recieved Data in conversation", receivedofferdata);
  const { t } = useTranslation();
  const [receivedofferdata, setReceivedOfferData] = useState([]);
  // Example of retrieving data from AsyncStorage


  const retrieveOfferData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(`offerData_${itemId}`);
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        console.log("Retrieved Offer Data:", parsedData);
        setReceivedOfferData(parsedData); // Assuming you use state to store this data
        // Use parsedData as needed
      } else {
        console.log(`No offer data found in AsyncStorage for item id ${itemId}.`);
        // Handle case where no data is found
      }
    } catch (error) {
      console.error("Error retrieving offer data from AsyncStorage:", error);
      // Handle errors
    }
  };

  const [commentText, setCommentText] = useState(null);
  const clearTextInput = () => {
    setCommentText(null);
  };
  //------------ useeffect -------------------\\
  // useEffect(() => {
  //   // fetchVideos();
  // }, []);

  const fetchVideos = async () => {
    setLoading(true);
    // Fetch data one by one
    await getUserID();
    // const token = await getUserID();
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      console.log("test 123");
      fetchVideos();
    }
  }, [offerid]);

  const getUserID = async () => {
    console.log("AT User Id");
    try {
      const result = await AsyncStorage.getItem("authToken");
      if (result !== null) {
        setAuthToken(result);
        retrieveOfferData();
        console.log("user token retrieved:", result);
        // fetchOffers();
        // return result;
      }

      const result3 = await AsyncStorage.getItem("userId ");
      if (result3 !== null) {
        setUserId(result3);
        // console.log("user id retrieved:", result3);
        // fetchData(result3, receivedofferdata.data);
      } else {
        console.log("result is null", result);
      }
    } catch (error) {
      console.error("Error retrieving user ID:", error);
    }
  };

  //------------------------------------------\\

  // useEffect(() => {
  //   fetchOffers();
  // }, []);

  // const itemId = receivedData.user_id;
  // const itemId = route.params?.receivedData?.id;

  // console.log("item id:", itemId);
  // useEffect(() => {
  //   if (isFocused) {
  //     console.log('offer save')
  //     setLoading(true);
  //     fetchOffers(itemId);
  //   }
  // }, [itemId]);

  // useEffect(() => {
  //   const fetchOffers = async () => {
  //     const apiUrl = `https://watch-gotcha-be.mtechub.com/item/getALlOfferByItem/${itemId}`;
  //     try {
  //       const token = authToken;
  //       console.log("toookee:", token);
  //       const response = await fetch(apiUrl, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("Offer_price:", data.data);
  //         const processedData = data.data.map((offer) => {
  //           console.log("item_price:", offer.item_price);
  //           console.log("Offer Price:", offer.offers[0].price);
  //           console.log("Item Title:", offer.item_title);

  //           return {
  //             offerId: offer.item_price,
  //             offerPrice: offer.offers[0].price,
  //             itemTitle: offer.item_title,
  //           };
  //         });
  //         // setOfferData(data.data);
  //         setOfferData(processedData);
  //       } else {
  //         console.error(
  //           "Failed to fetch offers:",
  //           response.status,
  //           response.statusText
  //         );
  //       }
  //     } catch (error) {
  //       console.error("API Request Error:", error);
  //     }
  //     setLoading(false);
  //   };
  //   if (isFocused) {
  //     console.log("offer save");
  //     setLoading(true);
  //     fetchOffers(itemId);
  //   }
  // }, [itemId, authToken, isFocused]);

  // const fetchOffers = async () => {
  //   const apiUrl = `https://watch-gotcha-be.mtechub.com/item/getALlOfferByItem/${itemId}`;

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Offer_price:", data.data);

  //       const processedData = data.data.map(offer => {
  //         // Perform actions on each offer here
  //         console.log("item_price:", offer.item_price);
  //         console.log("Offer Price:", offer.offers[0].price);
  //         console.log("Item Title:", offer.item_title);
  //         // Return any modified or processed data
  //         return {
  //           offerId: offer.item_price,
  //           offerPrice: offer.offers[0].price,
  //           itemTitle: offer.item_title
  //         };
  //       });
  //       // setOfferData(data.data);
  //       setOfferData(processedData);
  //       // console.log('offerlistdata', offerData)
  //     } else {
  //       console.error(
  //         "Failed to fetch offers:",
  //         response.status,
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("API Request Error:", error);
  //   }
  // };

  // console.log("Offerdata is out:", offerData); 
  //-------------Fire Base Useeffect-----------\\

  /*  useEffect(() => {
     
  }, []); */















  useEffect(() => {
    if (userId && receivedData) {
      const unsubscribe = fetchData(userId, receivedData, receivedofferdata);
      return () => unsubscribe();
    }
  }, [userId, receivedData, receivedofferdata]);
  
  
  const fetchData = (userId, receivedData, receivedofferdata) => {
    const subscriber = firestore()
      .collection("chats")
      .doc(userId + receivedData?.user_id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const allMessages = querySnapshot.docs.map((item) => {
          const data = item.data();
          return { ...data, _id: item.id, createdAt: data.createdAt ? data.createdAt.toDate() : new Date() };
        });
  
        let allCombinedMessages = [...allMessages];
  
        // Add offer messages if available
        if (receivedofferdata && receivedofferdata.length > 0) {
          receivedofferdata.forEach((offerData) => {
            const offerMsg = {
              _id: offerData.data.offer_id.toString(),
              text: `${offerData.data.item_title}\n${offerData.data.price}\n${offerData.data.offer_price}`,
              createdAt: new Date(offerData.data.offer_created_at),
              user: {
                _id: receivedData?.user_id,
              },
              isOffer: true,
            };
  
            // Check if the offer message already exists in allCombinedMessages
            const existingOfferIndex = allCombinedMessages.findIndex(msg => msg._id === offerMsg._id && msg.isOffer);
            if (existingOfferIndex === -1) {
              allCombinedMessages.push(offerMsg);
            } else {
              allCombinedMessages[existingOfferIndex] = offerMsg; // Update existing offer message
            }
          });
        }
  
        // Sort messages by createdAt in descending order
        allCombinedMessages.sort((a, b) => b.createdAt - a.createdAt);
  
        setMessageList(allCombinedMessages);
      });
  
    return () => subscriber();
  };

  const onSend = useCallback(
    async (messages = []) => {
      if (!commentText) {
        // Don't send an empty message
        return;
      }
  
      const myMsg = {
        _id: new Date().getTime().toString(),
        text: commentText,
        sendBy: userId,
        sendTo: receivedData?.user_id,
        createdAt: new Date(),
        user: {
          _id: userId,
        },
      };
  
      try {
        // Save the new message to Firestore
        await firestore()
          .collection("chats")
          .doc(userId + receivedData?.user_id)
          .collection("messages")
          .add(myMsg);
  
        // Update messageList with the new message
        setMessageList(previousMessages => [...previousMessages, myMsg]); 
  
        setCommentText('');
      } catch (error) {
        console.error("Error sending message:", error);
        // Handle error appropriately (e.g., show error message to user)
      }
    },
    [commentText, userId, receivedData?.user_id]
  );
  
  // const onSend = useCallback(
  //   async (messages = []) => {
  //     if (!commentText) {
  //       // Don't send an empty message
  //       return;
  //     }

  //     //const msg =messages[0];
  //     const myMsg = {
  //       _id: new Date().getTime().toString(),
  //       text: commentText,
  //       sendBy: userId,
  //       sendTo: receivedData?.user_id,
  //       createdAt: new Date(),
  //       user: {
  //         _id: userId,
  //         // name: senderName, // Include sender's name
  //         // avatar: senderImage, // Include sender's image URL
  //       },
  //       //createdAt:Date.parse(msg.createdAt),
  //     };

  //     setMessageList((previousMessages) =>
  //       GiftedChat.append(previousMessages, [myMsg])
  //     );

  //     firestore()
  //       .collection("chats")
  //       .doc("" + userId + receivedData?.user_id)
  //       .collection("messages")
  //       .add(myMsg);

  //     firestore()
  //       .collection("chats")
  //       .doc("" + receivedData?.user_id + userId)
  //       .collection("messages")
  //       .add(myMsg);

  //     clearTextInput();
  //   },
  //   [commentText, userId, receivedData?.user_id]
  // );

  const renderDay = (props) => {
    return (
      <Day
        {...props}
        textStyle={{
          fontFamily: "Inter-Bold",
          fontSize: 16,
          color: "gray", // Customize the color of the date separator
        }}
      />
    );
  };
  // /////////21/5

  // to get the offer..faisal

  //

  // // to get the offer..faisal
  const [selectedOffer, setSelectedOffer] = useState(null);
  useEffect(() => {
    fetchSelectedOffer();
  }, []);

  const fetchSelectedOffer = async () => {
    try {
      const selectedOffer = await AsyncStorage.getItem("selectedOffer");
      if (selectedOffer !== null) {
        // Parse the stored offer from JSON string
        const parsedOffer = JSON.parse(selectedOffer);
        console.log("faisal Selected offer retrieved:", parsedOffer);
        setSelectedOffer(parsedOffer);
        // Now you can use the retrieved offer in the Conversation screen
      }
    } catch (error) {
      console.error("Error retrieving selected offer:", error);
    }
  };

  // Define a function to render custom message bubbles
  const renderBubble = (props) => {
    const { currentMessage } = props;
    console.log("message aya", currentMessage);

    // if (currentMessage && selectedOffer) {
    if (currentMessage.isOffer) {
      const [item_title, price, offer_price] = currentMessage.text
        .split("\n")
        .map((text) => text.trim());
      return (
        <View style={styles.offerContainer}>
          <Text style={styles.offerTextheading}>
            {/* Item */}
            {item_title}
          </Text>
          <View>
            <Text style={styles.offerText}>
              {t('ListedPrice')} 
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter-Bold",
                  color: "#FACA4E",
                }}
              >
                $ {price}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.offerText}>
            {t('ListedPrice')} 
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter-Bold",
                  color: "#FACA4E",
                }}
              >
                $ {offer_price}
              </Text>
            </Text>
          </View>
        </View>
      );
    }
    //console.log("Propsssssssssssssss", props)
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#F4F8FC", // Customize the color for left messages
          },
          right: {
            backgroundColor: "#FACA4E", // Customize the color for right messages
          },
        }}
      />
    );
  };

  /* const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []); */

  const CustomInputToolbar = () => {
    return null; // This will remove the input message box
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View
        style={{
          flexDirection: "row",
          marginTop: hp(7),
          alignItems: "center",
          justifyContent: "center",
          height: hp(7),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrow}
        >
          <Ionicons name="chevron-back-sharp" size={25} color="#282828" />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: "100%",
            width: wp(39),
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: hp(5),
        backgroundColor: 'red',
        borderRadius: hp(5) / 2,
        overflow: "hidden",
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ViewElseProfile", {
            id: receivedData?.user_id,
          })
        }
        style={{
          height: hp(5),
          width: hp(5),
          borderRadius: hp(5) / 2,
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {receivedData?.userimage ? (
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: hp(5) / 2,
              resizeMode: 'cover',
            }}
            source={{ uri: receivedData.userimage }}
          />
        ) : (
          <MaterialCommunityIcons
            name={"account-circle"}
            size={hp(5)}
            color={"#FACA4E"}
          />
        )}
      </TouchableOpacity>
    </View>
          {/* {receivedData?.userimage !== null ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewElseProfile", {
                  id: receivedData?.user_id,
                })
              }
              style={{
                height: hp(5),
                 borderRadius: hp(6) / 2,
                  justifyContent: "center",
                  overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: receivedData?.userimage }}
                style={styles.profileImgs} 
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewElseProfile", {
                  id: receivedData?.user_id,
                })
              }
              style={{}}
            >
              <MaterialCommunityIcons
                style={{ marginTop: hp(0.5) }}
                name={"account-circle"}
                size={35}
                color={"#FACA4E"}
              />
            </TouchableOpacity>
          )} */}

          <Text
            style={{
              color: "#1E2022",
              marginLeft: wp(-10),
              fontFamily: "Inter-Bold",
              fontSize: hp(2.1),
            }}
          >
            {receivedData?.username}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>

      {/* <GiftedChat
      messages={messageList}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: userId,
      }}
    /> */}
     <GiftedChat
          messagesContainerStyle={{ paddingBottom: 1 }}
          messages={messageList}
          onSend={(messages) => onSend(messages)}
          user={{
            // _id: user_id,
            _id: userId,
          }}
          // renderAvatar={props => {
          //   return null;
          // }}
          renderAvatar={null}
          renderBubble={renderBubble} // Set the custom renderBubble function
          renderDay={null}
          inverted={true}
          /* renderBubble={props => {
            return <CustomBubble {...props} />;
          }} */
          //alwaysShowSend
          /*  onInputTextChanged={text => {
            console.log('text : ', text);
          }} */
          // renderChatEmpty={() => (
          //   <View
          //     style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          //     {loading ? null : (
          //       <Text
          //         style={{
          //           color: 'gray',
          //           fontSize: 14,
          //           transform: [{scaleY: -1}],
          //         }}>
          //         No Record Found
          //       </Text>
          //     )}
          //   </View>
          // )}
          //disableComposer={false}
          renderInputToolbar={CustomInputToolbar} // This will remove the input message box
        />
        

        {/* <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            height: hp(21),
          }}
        >
        </View> */}
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          height: hp(8),
          paddingHorizontal: wp(3),
          paddingBottom: 10,
        }}
      >
        {/*   <TouchableOpacity
          style={{
            height: hp(8),
            justifyContent: 'center',
            alignItems: 'center',
            width: wp(14),
          }}>
          <SmileEmoji />
        </TouchableOpacity> */}

        <TextInput
          placeholderTextColor={"#848484"}
          value={commentText} // Bind the value to the state variable
          onChangeText={(text) => setCommentText(text)} // Update state on text change
          placeholder={t('WriteCommentHere')}  
          style={{ flex: 1 }}
        />

        <TouchableOpacity onPress={() => onSend()}>
          <ButtonSend />
        </TouchableOpacity>
      </View>

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
        {loading && <ActivityIndicator size="large" color="#FACA4E" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileImgs: {
    resizeMode: "contain",
    //marginTop: hp(-2),
    //position: 'absolute',
    //right: -10,
    
    width: wp(12),
    height: wp(12),
  },
  backArrow: {
    position: "absolute",
    left: 20,
    justifyContent: "center", // Vertically align the arrow within the touchable area
    paddingVertical: 10, // Add padding to increase the touchable area
    paddingRight: 10, // Add some space on the right side if needed
  },
  offerContainer: {
    backgroundColor: "#F3F7F9",
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  offerTextheading: {
    color: "#333333",

    fontFamily: "Inter-Bold",
  },
  offerText: {
    color: "#7C7C7C",
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
