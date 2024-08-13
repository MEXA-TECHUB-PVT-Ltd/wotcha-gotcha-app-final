// import {
//   StyleSheet,
//   FlatList,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   StatusBar,
//   Image,
//   TextInput,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useState, useRef, useEffect} from 'react';
// import {SwiperFlatList} from 'react-native-swiper-flatlist';
// import Back from '../../assets/svg/back.svg';
// import {appImages} from '../../assets/utilities/index';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import CustomButton from '../../assets/Custom/Custom_Button';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import Fontiso from 'react-native-vector-icons/Fontisto';
// import Location from '../../assets/svg/Location.svg';
// import SendMessage from '../../assets/svg/Message.svg';
// import SendMail from '../../assets/svg/SendMail.svg';
// import BellAlert from '../../assets/svg/BellAlert.svg';
// import BookMark from '../../assets/svg/BookMark.svg';
// import Share from '../../assets/svg/ShareGold.svg';

// import Icon from 'react-native-vector-icons/FontAwesome';

// import RBSheet from 'react-native-raw-bottom-sheet';

// import Ionicons from 'react-native-vector-icons/Ionicons';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import Headers from '../../assets/Custom/Headers';

// import RadioForm, {
//   RadioButton,
//   RadioButtonInput,
//   RadioButtonLabel,
// } from 'react-native-simple-radio-button';

// import HeaderImageSlider from '../../assets/Custom/HeaderImageSlider';

// import CustomSnackbar from '../../assets/Custom/CustomSnackBar';

// import axios from 'axios';

// import Shares from 'react-native-share';
// import { base_url } from '../../../../baseUrl';

// export default function ProductDetails({navigation, route}) {
//   const [imageUri, setImageUri] = useState(null);
//   const [userId, setUserId] = useState('');
//   const [userToken, setUserToken] = useState(null);

//   const [authToken, setAuthToken] = useState('');

//   const [priceOffer, setPriceOffer] = useState('');

//   const [selectedValueListView, setSelectedValueListView] = useState('');
//   const [snackbarVisible, setSnackbarVisible] = useState(false);
//   const [snackbarVisibleAlert, setSnackbarVisibleAlert] = useState(false);
//   const [snackbarVisibleSaved, setSnackbarVisibleSaved] = useState(false);
//   const [snackbarVisibleRemoveSave, setSnackbarRemoveSave] = useState(false);

//   const [snackbarVisiblePrice, setSnackbarVisiblePrice] = useState(false);

//   const [showAlert, setShowAlert] = useState(false);

//   const [bookMark, setBookMark] = useState(true);

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const receivedData = route.params?.ProductDetails;

//   console.log('Recieved Data', receivedData);

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
//     console.log("Id's");
//     try {
//       const result = await AsyncStorage.getItem('userId ');
//       if (result !== null) {
//         setUserId(result);
//         console.log('user id retrieved:', result);
//       }

//       const result3 = await AsyncStorage.getItem('authToken ');
//       if (result3 !== null) {
//         setAuthToken(result3);
//         console.log('Token', result3);

//         await fetchAll(result3);

//         console.log('user id retrieved:', result);
//       }
//     } catch (error) {
//       // Handle errors here
//       console.error('Error retrieving user ID:', error);
//     }

//     try {
//       const result = await AsyncStorage.getItem('UserToken');
//       if (result !== null) {
//         setUserToken(result);
//         console.log('user token retrieved:', result);
//       }
//     } catch (error) {
//       // Handle errors here
//       console.error('Error retrieving user ID:', error);
//     }
//   };

//   //---------------fetch All-----------------\\

//   const fetchAll = async result3 => {
//     //console.log("Categry in id", selectedItemId)
//     const token = result3;

//     try {
//       const response = await fetch(
//         base_url + `user/getUser/${receivedData.user_id}`,

//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const result = await response.json();
//       console.log('AllItems of user', result.user);
//       setUserData(result.user); // Update the state with the fetched data
//     } catch (error) {
//       console.error('Error Trending:', error);
//     }
//   };

//   //-------------------------------------------\\

//   const ref_RBSendOffer = useRef(null);
//   const ref_RBSendOffer2 = useRef(null);

//   const details = [
//     {id: 1, title: 'Lense', image: appImages.lense},
//     {id: 2, title: 'Holder', image: appImages.holder},
//     {id: 3, title: 'HeadPhone', image: appImages.headPhone},
//     {id: 4, title: 'Shoes', image: appImages.shoes},
//     {id: 5, title: 'Printer', image: appImages.printer},
//     //{id: 10, title: 'Printer', image: appImages.printer},
//   ];

//   const availableApps = [
//     {id: 1, title: 'Lense', image: appImages.lense},
//     {id: 2, title: 'Holder', image: appImages.holder},
//     {id: 3, title: 'HeadPhone', image: appImages.headPhone},
//     {id: 4, title: 'Shoes', image: appImages.shoes},
//     {id: 5, title: 'Printer', image: appImages.printer},
//     {id: 6, title: 'Lense', image: appImages.lense},
//     {id: 7, title: 'Holder', image: appImages.holder},
//     {id: 8, title: 'HeadPhone', image: appImages.headPhone},
//     {id: 9, title: 'Shoes', image: appImages.shoes},
//     //{id: 10, title: 'Printer', image: appImages.printer},
//   ];

//   const shareViaWhatsApp = async () => {
//     const shareOptions = {
//       title: 'Share via',
//       message: 'Hey! Check out this cool app!',
//       url: 'https://play.google.com/store/apps/details?id=your.app.package',
//       //social: Share.Social,
//     };

//     try {
//       await Shares.open(shareOptions);
//     } catch (error) {
//       console.error('Error sharing via WhatsApp:', error.message);
//     }
//   };

//   const renderAvailableApps = item => {
//     console.log('Items', item);
//     return (
//       <View
//         style={{
//           //height: hp(18),
//           //width:'100%',
//           flex: 1,
//           //borderRadius: wp(3),
//           //margin: 5,
//         }}>
//         <Image
//           style={{
//             // flex: 1,
//             resizeMode: 'contain',
//           }}
//           source={item.image}
//         />
//       </View>
//     );
//   };

//   const renderDot = (index, currentIndex) => {
//     const dotWidth = index === currentIndex ? 12 : 6; // Adjust the dot width as needed

//     return <View key={index} style={[styles.dot, {width: dotWidth}]} />;
//   };

//   const radioButtonsGridView = [
//     {
//       label: '$ ' + parseInt(receivedData.price - 10),
//       value: receivedData.price - 10,
//     },
//     {
//       label: '$ ' + parseInt(receivedData.price - 20),
//       value: receivedData.price - 20,
//     },
//     {
//       label: '$ ' + parseInt(receivedData.price - 30),
//       value: receivedData.price - 30,
//     },
//   ];

//   const onPressChangeView = async item => {
//     //console.log("first",item)
//     setSelectedValueListView(item);
//     //await AsyncStorage.setItem('distance', token);
//     //ref_RBSendOffer.current.close();
//   };

//   const detectOfferPrice = () => {
//     ref_RBSendOffer2.current.close();
//     if (priceOffer == '') {
//       handleUpdatePasswordPrice();
//     } else {
//       sendOfferPrice();
//     }
//   };

//   const detectOffer = () => {
//     if (selectedValueListView == '') {
//       handleUpdatePasswordPrice();
//     } else {
//       sendOffer();

//       //sendNotification();
//     }
//   };

//   const sendOffer = async () => {
//     console.log('Id', receivedData.id);
//     console.log('userId', userId);
//     console.log('price', receivedData.price);
//     const token = authToken;
//     const apiUrl = 'https://watch-gotcha-be.mtechub.com/item/sendOffer';

//     const requestData = {
//       item_id: receivedData.id,
//       sender_id: userId,
//       price: receivedData.price,
//     };

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`, // Use the provided token
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
//         setLoading(false);
//         //sendNotification()

//         createNotification();
//         //handleUpdatePassword();

//         // Handle the response data as needed
//       } else {
//         setLoading(false);

//         console.error(
//           'Failed to upload video:',
//           response.status,
//           response.statusText,
//         );
//         // Handle the error
//       }
//     } catch (error) {
//       console.error('API Request Error:', error);
//       setLoading(false);

//       // Handle the error
//     }
//   };

//   const sendNotification = async () => {
//     console.log('User Token is-----', userToken);
//     const serverKey =
//       'AAAAoTTOTQU:APA91bE2b0B9Iz7SB2TWDafHN89doM8rHik0YRJ9x7QmBZhP0kJExSihD0tqPR8gTkm2Uz31e6ihPqxgLWCNz8GdlqbyLJiFwsxRk-r-Dg6ht9HqMoWbCPyFxmAAKmIO6-Gy7uDHlN6F'; // Replace with your actual server key
//     const token = userToken.replace(/"/g, '');
//     //'f5scnV4jSJ6j2QMOLYUAYI:APA91bEQOL6umubg_n73gGvXxwM8lF9UdkiIcQC2qnHeH2Axi54RQM6Ny6wXnz8RxdvCiMOOR5KBrzGUp4d59cf9oBq3stokRw4HzMwWkQ-74ON57phpSKkrMAGASmRbvNbflqav1GSF'; // Replace with the device token
//     const data = {
//       to: token,
//       notification: {
//         body: 'New Offer',
//         title: 'Offer!',
//         subtitle: 'New offer is recieved',
//       },
//     };

//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `key=${serverKey}`,
//     };

//     try {
//       const response = await fetch('https://fcm.googleapis.com/fcm/send', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(data),
//       });

//       console.log('Status Code:', response.status);

//       const responseText = await response.text();
//       console.log('Response Text:', responseText);

//       const result = JSON.parse(responseText);
//       console.log('Parsed JSON Result:', result);

//       handleUpdatePassword();
//     } catch (error) {
//       console.error('Error sending notification:', error);
//     }
//   };

//   const sendOfferPrice = async () => {
//     console.log('Id', receivedData.id);
//     console.log('userId', userId);
//     console.log('price', priceOffer);
//     const token = authToken;
//     const apiUrl = 'https://watch-gotcha-be.mtechub.com/item/sendOffer';

//     const requestData = {
//       item_id: receivedData.id,
//       sender_id: userId,
//       price: receivedData.price,
//     };

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`, // Use the provided token
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
//         setLoading(false);
//         //handleUpdatePassword();
//         //sendNotification()
//         createNotification();

//         // Handle the response data as needed
//       } else {
//         setLoading(false);

//         console.error(
//           'Failed to upload video:',
//           response.status,
//           response.statusText,
//         );
//         // Handle the error
//       }
//     } catch (error) {
//       console.error('API Request Error:', error);
//       setLoading(false);

//       // Handle the error
//     }
//   };

//   const createNotification = async () => {
//     console.log('receiver_id', receivedData.user_id);
//     console.log('sender_id', userId);
//     console.log('title', userId);
//     console.log('user name', receivedData.username);

//     const token = authToken;
//     const apiUrl =
//       'https://watch-gotcha-be.mtechub.com/notification/createNotification';

//     const requestData = {
//       sender_id: userId,
//       receiver_id: receivedData.user_id,
//       type: 7,
//       title: 'Offer Received',
//       content: receivedData.username + 'Give You An Offer',
//     };

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`, // Use the provided token
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
//         //handleUpdatePassword();
//         sendNotification();

//         // Handle the response data as needed
//       } else {
//         setLoading(false);

//         console.error(
//           'Failed to send notifications:',
//           response.status,
//           response.statusText,
//         );
//         // Handle the error
//       }
//     } catch (error) {
//       console.error('API Request Error:', error);
//       setLoading(false);

//       // Handle the error
//     }
//   };

//   const sendBookMark = async () => {
//     console.log('Id', receivedData.id);
//     console.log('userId', userId);
//     console.log('price', receivedData.price);
//     const token = authToken;
//     const apiUrl = base_url + 'item/saveItem';

//     const requestData = {
//       item_id: receivedData.id,
//       user_id: userId,
//     };

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`, // Use the provided token
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
//         setLoading(false);

//         handleUpdateSaved();

//         // Handle the response data as needed
//       } else {
//         setLoading(false);
//         removeBookMark();

//         console.error(
//           'Failed to upload video:',
//           response.status,
//           response.statusText,
//         );
//         // Handle the error
//       }
//     } catch (error) {
//       console.error('API Request Error:', error);
//       setLoading(false);

//       // Handle the error
//     }
//   };

//   const removeBookMark = async () => {
//     console.log('Id', receivedData.id);
//     console.log('userId', userId);
//     console.log('price', receivedData.price);
//     const token = authToken;
//     const apiUrl = base_url + 'item/unSaveItem';

//     const requestData = {
//       item_id: receivedData.id,
//       user_id: userId,
//     };

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`, // Use the provided token
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data);
//         setLoading(false);
//         handleUpdateRemovePassword();
//         // Handle the response data as needed
//       } else {
//         setLoading(false);

//         console.error(
//           'Failed to upload video:',
//           response.status,
//           response.statusText,
//         );
//         // Handle the error
//       }
//     } catch (error) {
//       console.error('API Request Error:', error);
//       setLoading(false);

//       // Handle the error
//     }
//   };

//   const dismissSnackbar = () => {
//     setSnackbarVisible(false);
//   };

//   const dismissSnackbarAlert = () => {
//     setSnackbarVisibleAlert(false);
//   };

//   const dismissSnackbarSaved = () => {
//     setSnackbarVisibleSaved(false);
//   };

//   const dismissSnackbarPrice = () => {
//     setSnackbarVisiblePrice(false);
//   };

//   const changeModal = () => {
//     ref_RBSendOffer.current.close();
//     ref_RBSendOffer2.current.open();
//   };

//   // remove item successfully

//   const dismissSnackbarRemove = () => {
//     setSnackbarRemoveSave(false);
//   };

//   const handleUpdateRemovePassword = async () => {
//     // Perform the password update logic here
//     // For example, you can make an API request to update the password

//     // Assuming the update was successful
//     setSnackbarRemoveSave(true);

//     // Automatically hide the Snackbar after 3 seconds
//     setTimeout(() => {
//       setBookMark(false);
//       setSnackbarRemoveSave(false);
//     }, 3000);
//   };

//   //-----------------\\

//   const handleUpdatePassword = async () => {
//     // Perform the password update logic here
//     // For example, you can make an API request to update the password

//     // Assuming the update was successful
//     setSnackbarVisible(true);

//     // Automatically hide the Snackbar after 3 seconds
//     setTimeout(() => {
//       setSnackbarVisible(false);
//     }, 3000);
//   };

//   const handleUpdateAlert = async () => {
//     // Perform the password update logic here
//     // For example, you can make an API request to update the password

//     // Assuming the update was successful
//     setSnackbarVisibleAlert(true);

//     // Automatically hide the Snackbar after 3 seconds
//     setTimeout(() => {
//       setSnackbarVisibleAlert(false);
//       setShowAlert(true);
//     }, 3000);
//   };

//   const handleUpdateSaved = async () => {
//     // Perform the password update logic here
//     // For example, you can make an API request to update the password

//     // Assuming the update was successful
//     setSnackbarVisibleSaved(true);

//     // Automatically hide the Snackbar after 3 seconds
//     setTimeout(() => {
//       setBookMark(true);
//       setSnackbarVisibleSaved(false);
//     }, 3000);
//   };

//   const handleUpdatePasswordPrice = async () => {
//     // Perform the password update logic here
//     // For example, you can make an API request to update the password

//     // Assuming the update was successful
//     setSnackbarVisiblePrice(true);

//     // Automatically hide the Snackbar after 3 seconds
//     setTimeout(() => {
//       setSnackbarVisiblePrice(false);
//     }, 3000);
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent={true}
//         backgroundColor="transparent"
//         barStyle="dark-content" // You can set the StatusBar text color to dark or light
//       />
//       <View style={{marginTop: hp(5)}}>
//         <Headers
//           showBackIcon={true}
//           onPress={() => navigation.goBack()}
//           showText={true}
//           text={'Item Details'}
//         />
//       </View>

//       <ScrollView style={{flex: 1}}>
//         <View style={{height: hp(25), marginTop: hp(5)}}>
//           <HeaderImageSlider
//             data={receivedData.images}
//             paginationStyleItemActiveStyle={{
//               width: 18,
//               height: 7,
//               borderRadius: 7 / 2,
//             }}
//             paginationStyleItemInactive={{
//               backgroundColor: '#D4D4D4',
//               borderWidth: 0,
//             }}
//           />

//           {/* <SwiperFlatList
//       autoplay
//       autoplayDelay={2}
//       autoplayLoop
//       index={2}
//       showPagination
//       data={availableApps}
//       renderItem={renderAvailableApps}
//     /> */}

//           {/* <SwiperFlatList
//       data={availableApps}
//       autoplay
//       autoplayDelay={2}
//       autoplayLoop
//       index={2}
//       showPagination
//       renderItem={renderAvailableApps}
//       renderAll={false}
//       paginationStyleItem={styles.paginationStyle}
//       paginationActiveDotColor={'blue'} // Change this to your active dot color
//       paginationDefaultColor={'gray'} // Change this to your default dot color
//       renderPagination={({ index, currentIndex }) => renderDot(index, currentIndex)}
//     /> */}
//         </View>

//         <View
//           style={{
//             flex: 1,
//             marginTop: hp(19),
//             marginHorizontal: wp(8),
//           }}>
//           <Text
//             style={{
//               color: '#595959',
//               fontFamily: 'Inter',
//               fontWeight: '800',
//               fontSize: hp(2.4),
//             }}>
//             {receivedData.title}
//           </Text>

//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}>
//             <Text
//               style={{
//                 color: '#77838F',
//                 marginTop: hp(1.3),
//                 fontFamily: 'Inter',
//                 fontWeight: '400',
//                 fontSize: hp(2),
//               }}>
//               {receivedData.item_category_name}
//             </Text>

//             <Text
//               style={{
//                 color: '#77838F',
//                 marginTop: hp(1.3),
//                 fontFamily: 'Inter',
//                 fontWeight: '400',
//                 fontSize: hp(2),
//               }}>
//               $ {receivedData.price}
//             </Text>
//           </View>

//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginTop: hp(1.8),
//               height: hp(5),
//             }}>
//             <Location width={15} height={15} />

//             <Text
//               style={{
//                 color: '#77838F',
//                 fontFamily: 'Inter',
//                 marginLeft: wp(3),
//                 fontWeight: '400',
//                 fontSize: hp(2),
//               }}>
//               {receivedData.location}
//             </Text>
//           </View>

//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             style={{marginTop: hp(3), height: hp(23)}}>
//             <Text
//               style={{
//                 color: '#77838F',
//                 fontFamily: 'Inter',
//                 textAlign: 'justify',
//                 lineHeight: hp(2.7),
//                 //fontWeight: '400',
//                 fontSize: hp(1.8),
//               }}>
//               {receivedData.description}
//               {/*  Our Classic Lens offers a timeless touch to your photography.
//               Crafted with precision and a nod to vintage aesthetics, this lens
//               is perfect for capturing moments with a hint of nostalgia. Whether
//               you're shooting portraits, landscapes, or street photography, the
//               Classic Lens delivers stunning results with its soft focus and
//               beautiful bokeh. */}
//             </Text>
//           </ScrollView>

//           <View
//             style={{
//               flexDirection: 'row',
//               height: hp(8),
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}>
//             <View style={{flexDirection: 'row', width: wp(60)}}>
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate('ViewElseProfile', {
//                     id: receivedData?.user_id,
//                   })
//                 }
//                 style={styles.circleBox}>
//                 {receivedData.image == null ? (
//                   <MaterialCommunityIcons
//                     style={{marginTop: hp(0.5)}}
//                     name={'account-circle'}
//                     size={35}
//                     color={'#FACA4E'}
//                   />
//                 ) : (
//                   <Image
//                     style={{
//                       flex: 1,
//                       width: '100%',
//                       height: '100%',
//                       borderRadius: wp(12) / 2, // Half of the width (25/2)
//                       resizeMode: 'contain',
//                     }}
//                     source={{uri: imageUri}}
//                   />
//                 )}
//               </TouchableOpacity>

//               <View>
//                 <Text
//                   style={{
//                     color: '#FACA4E',
//                     fontFamily: 'Inter',
//                     marginLeft: wp(3),
//                     fontWeight: '400',
//                     fontSize: hp(2),
//                   }}>
//                   {receivedData.username}
//                 </Text>

//                 <Text
//                   style={{
//                     color: '#77838F',
//                     fontFamily: 'Inter',
//                     marginLeft: wp(3),
//                     fontSize: hp(2),
//                   }}>
//                   {userData?.email}
//                 </Text>
//               </View>
//             </View>

//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('Conversation', {
//                   receivedData: receivedData,
//                 })
//               }>
//               <SendMessage width={39} height={39} />
//             </TouchableOpacity>
//           </View>

//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',

//               height: hp(8),
//             }}>
//             <TouchableOpacity
//               onPress={() => ref_RBSendOffer.current.open()}
//               style={{
//                 width: wp(21),
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//               }}>
//               <SendMail />

//               <Text
//                 style={{
//                   color: '#4C4C4C',
//                   fontFamily: 'Inter',
//                   fontWeight: 'bold',
//                   fontSize: hp(1.8),
//                 }}>
//                 Send Offer
//               </Text>
//             </TouchableOpacity>

//             <View
//               style={{
//                 width: wp(21),
//                 height: hp(7.5),
//                 //borderWidth:3,
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//               }}>
//               <TouchableOpacity onPress={() => handleUpdateAlert()}>
//                 {/*  <BellAlert style={{marginTop: hp(1)}} width={21} height={21} /> */}
//                 {showAlert === true ? (
//                   <MaterialIcons
//                     style={{marginTop: hp(0.5)}}
//                     name="notifications-active"
//                     size={28}
//                     color={'#FACA4E'}
//                   />
//                 ) : (
//                   <MaterialIcons
//                     style={{marginTop: hp(0.5)}}
//                     name="notifications"
//                     size={28}
//                     color={'#FACA4E'}
//                   />
//                 )}
//               </TouchableOpacity>

//               <Text
//                 style={{
//                   color: '#4C4C4C',
//                   fontFamily: 'Inter',
//                   fontWeight: 'bold',
//                   fontSize: hp(1.8),
//                 }}>
//                 Alert
//               </Text>
//             </View>

//             <View
//               style={{
//                 width: wp(21),
//                 alignItems: 'center',
//                 height: hp(7.5),
//                 justifyContent: 'space-between',
//               }}>
//               <TouchableOpacity onPress={() => sendBookMark()}>
//                 {bookMark === true ? (
//                   <Icon name="bookmark" size={25} color="#FACA4E" />
//                 ) : (
//                   <Icon name="bookmark-o" size={25} color="#FACA4E" />
//                 )}
//               </TouchableOpacity>

//               <Text
//                 style={{
//                   color: '#4C4C4C',
//                   fontFamily: 'Inter',
//                   fontWeight: 'bold',
//                   fontSize: hp(1.8),
//                 }}>
//                 Book Mark
//               </Text>
//             </View>

//             <View
//               style={{
//                 width: wp(21),
//                 alignItems: 'center',
//                 height: hp(7.5),
//                 justifyContent: 'space-between',
//               }}>
//               <TouchableOpacity onPress={() => shareViaWhatsApp()}>
//                 <Share style={{marginTop: hp(1)}} width={18} height={18} />
//               </TouchableOpacity>

//               <Text
//                 style={{
//                   color: '#4C4C4C',
//                   fontFamily: 'Inter',
//                   fontWeight: 'bold',

//                   fontSize: hp(1.8),
//                 }}>
//                 Share
//               </Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <RBSheet
//         ref={ref_RBSendOffer}
//         closeOnDragDown={true}
//         closeOnPressMask={false}
//         animationType="fade"
//         minClosingHeight={0}
//         customStyles={{
//           wrapper: {
//             backgroundColor: 'rgba(52, 52, 52, 0.5)',
//           },
//           draggableIcon: {
//             backgroundColor: 'white',
//           },
//           container: {
//             borderTopLeftRadius: wp(10),
//             borderTopRightRadius: wp(10),
//             height: hp(55),
//           },
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginHorizontal: wp(8),
//             alignItems: 'center',
//           }}>
//           <Text style={styles.maintext}>Send Offer</Text>
//           <TouchableOpacity onPress={() => ref_RBSendOffer.current.close()}>
//             <Ionicons
//               name="close"
//               size={22}
//               color={'#303030'}
//               onPress={() => ref_RBSendOffer.current.close()}
//             />
//           </TouchableOpacity>
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             height: hp(14),
//             alignItems: 'center',
//             marginTop: hp(3),
//             marginHorizontal: wp(8),
//             //borderWidth: 3,
//           }}>
//           <View
//             style={{
//               // height: hp(10),
//               //flex: 1,
//               height: hp(12),
//               marginLeft: wp(5),
//               //borderWidth:3,
//               width: wp(21),
//               borderRadius: wp(3),
//               // margin: 5,
//             }}>
//             <Image
//               style={{
//                 // position: 'absolute',
//                 // top: 0,
//                 // left: 0,
//                 //zIndex: 1, // Ensure it's on top of other elements
//                 //flex: 1,
//                 width: '100%',
//                 height: '100%',
//                 //height:hp(15),
//                 // width:wp(15),
//                 borderRadius: wp(3),
//                 resizeMode: 'contain',
//               }}
//               source={appImages.lense}
//             />
//           </View>

//           <View
//             style={{
//               height: hp(10),
//               marginLeft: wp(2.1),
//               justifyContent: 'space-between',
//             }}>
//             <Text
//               style={{
//                 color: '#333333',
//                 fontFamily: 'Inter',
//                 fontWeight: 'bold',

//                 fontSize: hp(2),
//               }}>
//               {receivedData?.title}
//             </Text>

//             <View style={{flexDirection: 'row'}}>
//               <Text
//                 style={{
//                   color: '#FACA4E',
//                   fontFamily: 'Inter',
//                   fontWeight: '500',

//                   fontSize: hp(2),
//                 }}>
//                 ${receivedData.price}
//               </Text>
//             </View>

//             <View style={{flexDirection: 'row', marginLeft: wp(-1.7)}}>
//               <Location width={18} height={18} />
//               <Text
//                 style={{
//                   color: '#77838F',
//                   fontFamily: 'Inter',
//                   fontWeight: '300',

//                   fontSize: hp(1.4),
//                 }}>
//                 {receivedData.location}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View
//           style={{
//             height: hp(15),
//             //flexDirection: 'row', // Arrange items horizontally
//             justifyContent: 'space-between', // Space between items
//             //alignItems: 'center', // Center items vertically
//             //borderWidth: 3,
//             marginHorizontal: wp(8),
//             //paddingHorizontal: 10, // Add horizontal padding
//           }}>
//           {radioButtonsGridView.map((button, index) => (
//             <View
//               key={index}
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//               }}>
//               <RadioButtonLabel
//                 obj={button}
//                 index={index}
//                 onPress={() => onPressChangeView(button.value)}
//                 labelHorizontal={true}
//                 labelStyle={{
//                   fontSize: hp(1.8),
//                   fontFamily: 'Inter',
//                   fontWeight: 'bold',
//                   color: '#333333',
//                   //marginRight: 10, // Add margin between label and button
//                 }}
//                 labelWrapStyle={
//                   {
//                     //marginBottom: hp(2),
//                   }
//                 }
//               />
//               <RadioButtonInput
//                 obj={button}
//                 index={index}
//                 isSelected={selectedValueListView === button.value}
//                 onPress={() => onPressChangeView(button.value)}
//                 borderWidth={1}
//                 buttonInnerColor={
//                   selectedValueListView === button.value
//                     ? '#FACA4E'
//                     : '#00000017'
//                 }
//                 buttonOuterColor={
//                   selectedValueListView === button.value
//                     ? '#FACA4E'
//                     : '#00000017'
//                 }
//                 buttonSize={15}
//                 buttonOuterSize={20}
//                 //buttonStyle={{ marginTop: hp(3) }}
//               />
//             </View>
//           ))}
//         </View>

//         <TouchableOpacity
//           onPress={() => changeModal()}
//           style={{
//             height: hp(5),
//             marginTop: hp(1.9),
//             marginHorizontal: wp(8),
//             justifyContent: 'center',
//           }}>
//           <Text
//             style={{
//               color: '#333333',
//               fontFamily: 'Inter',
//               fontWeight: 'bold',

//               fontSize: hp(1.8),
//             }}>
//             Offer a different amount
//           </Text>
//         </TouchableOpacity>

//         <View
//           style={{
//             marginTop: hp(2.1),
//             marginBottom: hp(5),
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <CustomButton
//             title={'Send Offer'}
//             load={false}
//             // checkdisable={inn == '' && cm == '' ? true : false}
//             customClick={() => {
//               ref_RBSendOffer.current.close();
//               detectOffer(); //this is currently used
//               //handleUpdatePassword();
//               //navigation.navigate('Profile_image');
//             }}
//           />
//         </View>
//       </RBSheet>

//       <RBSheet
//         ref={ref_RBSendOffer2}
//         closeOnDragDown={true}
//         closeOnPressMask={false}
//         animationType="fade"
//         minClosingHeight={0}
//         customStyles={{
//           wrapper: {
//             backgroundColor: 'rgba(52, 52, 52, 0.5)',
//           },
//           draggableIcon: {
//             backgroundColor: 'white',
//           },
//           container: {
//             borderTopLeftRadius: wp(10),
//             borderTopRightRadius: wp(10),
//             height: hp(48),
//           },
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginHorizontal: wp(8),
//             alignItems: 'center',
//           }}>
//           <Text style={styles.maintext}>Send Offer</Text>
//           <TouchableOpacity onPress={() => ref_RBSendOffer2.current.close()}>
//             <Ionicons
//               name="close"
//               size={22}
//               color={'#303030'}
//               onPress={() => ref_RBSendOffer2.current.close()}
//             />
//           </TouchableOpacity>
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             height: hp(14),
//             alignItems: 'center',
//             marginTop: hp(3),
//             marginHorizontal: wp(8),
//             //borderWidth: 3,
//           }}>
//           <View
//             style={{
//               // height: hp(10),
//               //flex: 1,
//               height: hp(12),
//               marginLeft: wp(5),
//               //borderWidth:3,
//               width: wp(21),
//               borderRadius: wp(3),
//               // margin: 5,
//             }}>
//             <Image
//               style={{
//                 // position: 'absolute',
//                 // top: 0,
//                 // left: 0,
//                 //zIndex: 1, // Ensure it's on top of other elements
//                 //flex: 1,
//                 width: '100%',
//                 height: '100%',
//                 //height:hp(15),
//                 // width:wp(15),
//                 borderRadius: wp(3),
//                 resizeMode: 'contain',
//               }}
//               source={appImages.lense}
//             />
//           </View>

//           <View
//             style={{
//               height: hp(10),
//               marginLeft: wp(2.1),
//               justifyContent: 'space-between',
//             }}>
//             <Text
//               style={{
//                 color: '#333333',
//                 fontFamily: 'Inter',
//                 fontWeight: 'bold',

//                 fontSize: hp(2),
//               }}>
//               {receivedData?.title}
//             </Text>

//             <View style={{flexDirection: 'row'}}>
//               <Text
//                 style={{
//                   color: '#FACA4E',
//                   fontFamily: 'Inter',
//                   fontWeight: '500',

//                   fontSize: hp(2),
//                 }}>
//                 $ {receivedData?.price}
//               </Text>
//             </View>

//             <View style={{flexDirection: 'row', marginLeft: wp(-1.7)}}>
//               <Location width={18} height={18} />
//               <Text
//                 style={{
//                   color: '#77838F',
//                   fontFamily: 'Inter',
//                   fontWeight: '300',

//                   fontSize: hp(1.2),
//                 }}>
//                 {receivedData?.location}
//               </Text>
//             </View>
//           </View>
//         </View>

//         <View
//           style={{
//             height: hp(15),
//             marginHorizontal: wp(8),
//             justifyContent: 'space-evenly',
//             alignItems: 'center',
//           }}>
//           {/* <Text
//             style={{
//               color: '#333333',
//               fontFamily: 'Inter',
//               fontWeight: 'bold',

//               fontSize: hp(4.3),
//             }}>
//             $ 435
//           </Text> */}

//           <TextInput
//             placeholderTextColor={'#848484'}
//             keyboardType="numeric"
//             value={priceOffer} // Bind the value to the state variable
//             onChangeText={text => setPriceOffer(text)} // Update state on text change
//             placeholder="Please Enter Your Price Here"
//             style={{flex: 1, marginLeft: wp(1)}}
//           />

//           <View
//             style={{
//               height: hp(0.1),
//               width: '100%',
//               backgroundColor: '#00000042',
//             }}></View>

//           <Text
//             style={{
//               color: '#FACA4E',
//               fontFamily: 'Inter',
//               fontWeight: '400',

//               fontSize: hp(2.5),
//             }}>
//             Listed Price $ {receivedData?.price}
//           </Text>
//         </View>

//         <View
//           style={{
//             marginTop: hp(2.1),
//             marginBottom: hp(5),
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <CustomButton
//             title={'Send Offer'}
//             load={false}
//             // checkdisable={inn == '' && cm == '' ? true : false}
//             customClick={() => {
//               //ref_RBSendOffer2.current.close();
//               detectOfferPrice();
//               //ref_RBSendOffer.current.open();
//               //navigation.navigate('Profile_image');
//             }}
//           />
//         </View>
//       </RBSheet>

//       <CustomSnackbar
//         message={'Success'}
//         messageDescription={'Your Offer Sent Successfully'}
//         onDismiss={dismissSnackbar} // Make sure this function is defined
//         visible={snackbarVisible}
//       />

//       <CustomSnackbar
//         message={'Success'}
//         messageDescription={'You will get notified to the relevant feed'}
//         onDismiss={dismissSnackbarAlert} // Make sure this function is defined
//         visible={snackbarVisibleAlert}
//       />

//       <CustomSnackbar
//         message={'Success'}
//         messageDescription={'Item saved successfully'}
//         onDismiss={dismissSnackbarSaved} // Make sure this function is defined
//         visible={snackbarVisibleSaved}
//       />

//       <CustomSnackbar
//         message={'Alert'}
//         messageDescription={'Kindly Select Price First'}
//         onDismiss={dismissSnackbarPrice} // Make sure this function is defined
//         visible={snackbarVisiblePrice}
//       />

//       <CustomSnackbar
//         message={'Success'}
//         messageDescription={'Item Removed Successfully'}
//         onDismiss={dismissSnackbarRemove} // Make sure this function is defined
//         visible={snackbarVisibleRemoveSave}
//       />

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
//   dot: {
//     width: 6, // Default dot width
//     height: 6, // Default dot height
//     borderRadius: 3, // Make it round
//     marginHorizontal: 5, // Adjust spacing between dots
//     backgroundColor: 'gray', // Default dot color
//   },
//   paginationStyle: {
//     bottom: 10, // Adjust the position of the pagination
//   },
//   circleBox: {
//     width: wp(12),
//     height: wp(12),
//     overflow: 'hidden',
//     borderColor: '#00000020',
//     borderRadius: wp(50),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   maintext: {
//     fontSize: hp(2.3),
//     color: '#333333',
//     fontWeight: 'bold',
//   },
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////faisal code merg on 22/5/2024
import {
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Image,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Back from "../../assets/svg/back.svg";
import { appImages } from "../../assets/utilities/index";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CustomButton from "../../assets/Custom/Custom_Button";

import AsyncStorage from "@react-native-async-storage/async-storage";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Fontiso from "react-native-vector-icons/Fontisto";
import Location from "../../assets/svg/Location.svg";
import SendMessage from "../../assets/svg/Message.svg";
import SendMail from "../../assets/svg/SendMail.svg";
import BellAlert from "../../assets/svg/BellAlert.svg";
import BookMark from "../../assets/svg/BookMark.svg";
import Share from "../../assets/svg/ShareGold.svg";

import Icon from "react-native-vector-icons/FontAwesome";

import RBSheet from "react-native-raw-bottom-sheet";

import Ionicons from "react-native-vector-icons/Ionicons";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Headers from "../../assets/Custom/Headers";

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

import HeaderImageSlider from "../../assets/Custom/HeaderImageSlider";

import CustomSnackbar from "../../assets/Custom/CustomSnackBar";

import axios from "axios";

import Shares from "react-native-share";
import { base_url } from "../../../../baseUrl";

export default function ProductDetails({ navigation, route }) {
  const [imageUri, setImageUri] = useState(null);
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const [priceOffer, setPriceOffer] = useState("");

  const [selectedValueListView, setSelectedValueListView] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarVisibleAlert, setSnackbarVisibleAlert] = useState(false);
  const [snackbarVisibleSaved, setSnackbarVisibleSaved] = useState(false);
  const [snackbarVisibleRemoveSave, setSnackbarRemoveSave] = useState(false);

  const [snackbarVisiblePrice, setSnackbarVisiblePrice] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [bookMark, setBookMark] = useState(false);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offerId, setOfferId] = useState("");
  const receivedData = route.params?.ProductDetails;

  // console.log("Recieved Data", receivedData);


  const [reset, setReset] = useState(false); // State to trigger reset
  useEffect(() => {
    if (reset) {
      setPriceOffer(""); // Clear the input field
      setReset(false); // Reset the trigger
    }
  }, [reset]);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    // Fetch data one by one
    await getUserID();

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem("userId ");
      if (result !== null) {
        setUserId(result);
        // console.log("user id retrieved:", result);
      }

      const result3 = await AsyncStorage.getItem("authToken ");
      if (result3 !== null) {
        setAuthToken(result3);
        // console.log("Token", result3);

        await fetchAll(result3);

        // console.log("user id retrieved:", result);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }

    try {
      const result = await AsyncStorage.getItem("UserToken");
      if (result !== null) {
        setUserToken(result);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  //---------------fetch All-----------------\\

  const fetchAll = async (result3) => {
    //console.log("Categry in id", selectedItemId)
    const token = result3;

    try {
      const response = await fetch(
        base_url + `user/getUser/${receivedData.user_id}`,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log("AllItems of user", result.user);
      setUserData(result.user); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  //-------------------------------------------\\

  const ref_RBSendOffer = useRef(null);
  const ref_RBSendOffer2 = useRef(null);

  const details = [
    { id: 1, title: "Lense", image: appImages.lense },
    { id: 2, title: "Holder", image: appImages.holder },
    { id: 3, title: "HeadPhone", image: appImages.headPhone },
    { id: 4, title: "Shoes", image: appImages.shoes },
    { id: 5, title: "Printer", image: appImages.printer },
    //{id: 10, title: 'Printer', image: appImages.printer},
  ];

  const availableApps = [
    { id: 1, title: "Lense", image: appImages.lense },
    { id: 2, title: "Holder", image: appImages.holder },
    { id: 3, title: "HeadPhone", image: appImages.headPhone },
    { id: 4, title: "Shoes", image: appImages.shoes },
    { id: 5, title: "Printer", image: appImages.printer },
    { id: 6, title: "Lense", image: appImages.lense },
    { id: 7, title: "Holder", image: appImages.holder },
    { id: 8, title: "HeadPhone", image: appImages.headPhone },
    { id: 9, title: "Shoes", image: appImages.shoes },
    //{id: 10, title: 'Printer', image: appImages.printer},
  ];

  const shareViaWhatsApp = async () => {
    const shareOptions = {
      title: "Share via",
      message: "Hey! Check out this cool app!",
      url: "https://play.google.com/store/apps/details?id=your.app.package",
      //social: Share.Social,
    };

    try {
      await Shares.open(shareOptions);
    } catch (error) {
      console.error("Error sharing via WhatsApp:", error.message);
    }
  };

  const renderAvailableApps = (item) => {
    console.log("Items", item);
    return (
      <View
        style={{
          //height: hp(18),
          //width:'100%',
          flex: 1,
          //borderRadius: wp(3),
          //margin: 5,
        }}
      >
        <Image
          style={{
            // flex: 1,
            resizeMode: "contain",
          }}
          source={item.image}
        />
      </View>
    );
  };

  const renderDot = (index, currentIndex) => {
    const dotWidth = index === currentIndex ? 12 : 6; // Adjust the dot width as needed

    return <View key={index} style={[styles.dot, { width: dotWidth }]} />;
  };

  const radioButtonsGridView = [
    {
      label: "$ " + parseInt(receivedData.price - 5),
      value: receivedData.price - 5,
    },
    {
      label: "$ " + parseInt(receivedData.price - 10),
      value: receivedData.price - 10,
    },
    {
      label: "$ " + parseInt(receivedData.price - 12),
      value: receivedData.price - 12,
    },
  ];

  const onPressChangeView = async (item) => {
    //console.log("first",item)
    setSelectedValueListView(item);
    //await AsyncStorage.setItem('distance', token);
    //ref_RBSendOffer.current.close();
  };

  const detectOfferPrice = () => {
    ref_RBSendOffer2.current.close();
    setLoading(true);
    if (priceOffer == "") {
      handleUpdatePasswordPrice();
    } else {
      sendOfferPrice(priceOffer);
    }
  };

  useEffect(() => {
    // Store the priceOffer in local storage
    AsyncStorage.setItem("priceOffer", priceOffer);
  }, [priceOffer]); // Trigger whenever priceOffer changes

  // const detectOffer = () => {
  //   if (selectedValueListView == "") {
  //     handleUpdatePasswordPrice();
  //   } else {
  //     sendOffer();

  //     //sendNotification();
  //   }
  // };
  const detectOffer = () => {
    let offerValue = 0; // Default value or any initial value

    // Iterate through radioButtonsGridView to find the selected offer value
    for (const button of radioButtonsGridView) {
      // Convert button value to string for comparison
      if (String(selectedValueListView) === String(button.value)) {
        offerValue = button.value; // Assuming the offerValue is available in the button object
        break; // Exit loop once the selected offer value is found
      }
    }

    if (offerValue === 0) {
      handleUpdatePasswordPrice(); // Handle if no offer value is found
    } else {
      // Call sendOffer with the detected offer value
      sendOffer(offerValue);
      // navigation.navigate('Conversation',{
      //   receivedData:receivedData
      //   data: data
      // });
    }
  };

  const sendOffer = async (offerValue) => {
    console.log("Id", receivedData.id);
    console.log("userId", userId);
    console.log("price", offerValue);
    const token = authToken;
    const apiUrl = "https://watch-gotcha-be.mtechub.com/item/sendOffer";

    const requestData = {
      item_id: receivedData.id,
      sender_id: userId,
      // price: receivedData.price,
      price: offerValue,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API se Offer send Response:", data);



             // Retrieve existing offers from AsyncStorage based on item_id
      let existingOffers = await AsyncStorage.getItem(`offerData_${receivedData.id}`);
      existingOffers = existingOffers ? JSON.parse(existingOffers) : [];

      // Add new offer to the array
      existingOffers.push(data);

      // Store updated offers array back in AsyncStorage based on item_id
      await AsyncStorage.setItem(`offerData_${receivedData.id}`, JSON.stringify(existingOffers));



        setOfferId(data);
        setLoading(false);
        //sendNotification()

        createNotification();
        //handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          "Failed to upload video:",
          response.status,
          response.statusText
        );
        // Handle the error
      }
    } catch (error) {
      console.error("API Request Error:", error);
      setLoading(false);

      // Handle the error
    }
  };
  // console.log("API Offer id in productdetails:", offerId.data.offer_id);
  const sendNotification = async () => {
    console.log("User Token is-----", userToken);
    const serverKey =
      "AAAAoTTOTQU:APA91bE2b0B9Iz7SB2TWDafHN89doM8rHik0YRJ9x7QmBZhP0kJExSihD0tqPR8gTkm2Uz31e6ihPqxgLWCNz8GdlqbyLJiFwsxRk-r-Dg6ht9HqMoWbCPyFxmAAKmIO6-Gy7uDHlN6F"; // Replace with your actual server key
    const token = userToken.replace(/"/g, "");
    //'f5scnV4jSJ6j2QMOLYUAYI:APA91bEQOL6umubg_n73gGvXxwM8lF9UdkiIcQC2qnHeH2Axi54RQM6Ny6wXnz8RxdvCiMOOR5KBrzGUp4d59cf9oBq3stokRw4HzMwWkQ-74ON57phpSKkrMAGASmRbvNbflqav1GSF'; // Replace with the device token
    const data = {
      to: token,
      notification: {
        body: "New Offer",
        title: "Offer!",
        subtitle: "New offer is recieved",
      },
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `key=${serverKey}`,
    };

    try {
      const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });

      // console.log("Status Code:", response.status);

      const responseText = await response.text();
      // console.log("Response Text:", responseText);

      const result = JSON.parse(responseText);
      // console.log("Parsed JSON Result:", result);

      handleUpdatePassword();
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const sendOfferPrice = async () => {
    console.log("sendOfferPrice called with offerValue:");
    console.log("Id------", receivedData.id);
    console.log("userId------", userId);
    console.log("price----", priceOffer);
    const token = authToken;
    const apiUrl = "https://watch-gotcha-be.mtechub.com/item/sendOffer";

    const requestData = {
      item_id: receivedData.id,
      sender_id: userId,
      // price: receivedData.price,
      price: priceOffer,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);




             // Retrieve existing offers from AsyncStorage based on item_id
             let existingOffers = await AsyncStorage.getItem(`offerData_${receivedData.id}`);
             existingOffers = existingOffers ? JSON.parse(existingOffers) : [];
       
             // Add new offer to the array
             existingOffers.push(data);
       
             // Store updated offers array back in AsyncStorage based on item_id
             await AsyncStorage.setItem(`offerData_${receivedData.id}`, JSON.stringify(existingOffers));
       




        setOfferId(data);
        setLoading(false);
        //handleUpdatePassword();
        //sendNotification()
        createNotification();
        setReset(true);
        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          "Failed to upload video:",
          response.status,
          response.statusText
        );
        // Handle the error
      }
    } catch (error) {
      console.error("API Request Error:", error);
      setLoading(false);

      // Handle the error
    }
  };

  const createNotification = async () => {
    console.log("receiver_id", receivedData.user_id);
    console.log("sender_id", userId);
    console.log("title", userId);
    console.log("user name", receivedData.username);

    const token = authToken;
    const apiUrl =
      "https://watch-gotcha-be.mtechub.com/notification/createNotification";

    const requestData = {
      sender_id: userId,
      receiver_id: receivedData.user_id,
      type: 7,
      title: "Offer Received",
      content: receivedData.username + "Give You An Offer",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        //handleUpdatePassword();
        sendNotification();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          "Failed to send notifications:",
          response.status,
          response.statusText
        );
        // Handle the error
      }
    } catch (error) {
      console.error("API Request Error:", error);
      setLoading(false);

      // Handle the error
    }
  };

  const sendBookMark = async () => {
    console.log("Id", receivedData.id);
    console.log("userId", userId);
    console.log("price", receivedData.price);
    const token = authToken;
    const apiUrl = base_url + "item/saveItem";

    const requestData = {
      item_id: receivedData.id,
      user_id: userId,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        setLoading(false);

        handleUpdateSaved();

        // Handle the response data as needed
      } else {
        setLoading(false);
        removeBookMark();

        console.error(
          "Failed to upload video:",
          response.status,
          response.statusText
        );
        // Handle the error
      }
    } catch (error) {
      console.error("API Request Error:", error);
      setLoading(false);

      // Handle the error
    }
  };

  const removeBookMark = async () => {
    console.log("Id", receivedData.id);
    console.log("userId", userId);
    console.log("price", receivedData.price);
    const token = authToken;
    const apiUrl = base_url + "item/unSaveItem";

    const requestData = {
      item_id: receivedData.id,
      user_id: userId,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        setLoading(false);
        handleUpdateRemovePassword();
        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          "Failed to upload video:",
          response.status,
          response.statusText
        );
        // Handle the error
      }
    } catch (error) {
      console.error("API Request Error:", error);
      setLoading(false);

      // Handle the error
    }
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const dismissSnackbarAlert = () => {
    setSnackbarVisibleAlert(false);
  };

  const dismissSnackbarSaved = () => {
    setSnackbarVisibleSaved(false);
  };

  const dismissSnackbarPrice = () => {
    setSnackbarVisiblePrice(false);
  };

  const changeModal = () => {
    ref_RBSendOffer.current.close();
    ref_RBSendOffer2.current.open();
  };

  // remove item successfully

  const dismissSnackbarRemove = () => {
    setSnackbarRemoveSave(false);
  };

  const handleUpdateRemovePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarRemoveSave(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setBookMark(false);
      setSnackbarRemoveSave(false);
    }, 3000);
  };

  //-----------------\\

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  const handleUpdateAlert = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisibleAlert(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisibleAlert(false);
      setShowAlert(true);
    }, 3000);
  };

  const handleUpdateSaved = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisibleSaved(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setBookMark(true);
      setSnackbarVisibleSaved(false);
    }, 3000);
  };

  const handleUpdatePasswordPrice = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisiblePrice(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisiblePrice(false);
    }, 3000);
  };

  // store the offer in local mein
  const storeSelectedOffer = async (offer) => {
    try {
      await AsyncStorage.setItem("selectedOffer", JSON.stringify(offer));
      console.log("Selected offer stored successfully:", offer);
    } catch (error) {
      console.error("Error storing selected offer:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{ marginTop: hp(5) }}>
        <Headers
          showBackIcon={true}
          onPress={() => navigation.goBack()}
          showText={true}
          text={"Item Details"}
        />
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: hp(25), marginTop: hp(5) }}>
          <HeaderImageSlider
            data={receivedData.images}
            paginationStyleItemActiveStyle={{
              width: 18,
              height: 7,
              borderRadius: 7 / 2,
            }}
            paginationStyleItemInactive={{
              backgroundColor: "#D4D4D4",
              borderWidth: 0,
            }}
          />

          {/* <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      data={availableApps}
      renderItem={renderAvailableApps}
    /> */}

          {/* <SwiperFlatList
      data={availableApps}
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      renderItem={renderAvailableApps}
      renderAll={false}
      paginationStyleItem={styles.paginationStyle}
      paginationActiveDotColor={'blue'} // Change this to your active dot color
      paginationDefaultColor={'gray'} // Change this to your default dot color
      renderPagination={({ index, currentIndex }) => renderDot(index, currentIndex)}
    /> */}
        </View>

        <View
          style={{
            flex: 1,
            marginTop: hp(19),
            marginHorizontal: wp(8),
          }}
        >
          <Text
            style={{
              color: "#595959",
              fontFamily: "Inter-SemiBold",
              fontWeight: "600",
              fontSize: hp(2.4),
            }}
          >
            {receivedData.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#77838F",
                marginTop: hp(1.2),
                fontFamily: "Inter-Medium",
                fontWeight: "400",
                fontSize: hp(2),
              }}
            >
              {receivedData.item_category_name}
            </Text>

            <Text
              style={{
                color: "#77838F",
                marginTop: hp(1.2),
                fontFamily: "Inter-Medium",
                fontWeight: "400",
                fontSize: hp(2),
              }}
            >
              $ {receivedData.price}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(0.6),
              height: hp(5),
            }}
          >
            <Location width={15} height={15} />

            <Text
              style={{
                color: "#77838F",
                fontFamily: "Inter-Medium",
                marginLeft: wp(3),
                fontWeight: "400",
                fontSize: hp(1.9),
              }}
            >
              {receivedData.location}
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: hp(0.6), height: hp(23) }}
          >
            <Text
              style={{
                color: "#77838F",
                fontFamily: "Inter",
                textAlign: "justify",
                lineHeight: hp(2.7),
                //fontWeight: '400',
                fontSize: hp(1.8),
              }}
            >
              {receivedData.description}
              {/*  Our Classic Lens offers a timeless touch to your photography.
              Crafted with precision and a nod to vintage aesthetics, this lens
              is perfect for capturing moments with a hint of nostalgia. Whether
              you're shooting portraits, landscapes, or street photography, the
              Classic Lens delivers stunning results with its soft focus and
              beautiful bokeh. */}
            </Text>
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              height: hp(8),
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", width: wp(60) }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewElseProfile", {
                    id: receivedData?.user_id,
                  })
                }
                style={styles.circleBox}
              >
                {receivedData.userimage == null ? (
                  <MaterialCommunityIcons
                    style={{ marginTop: hp(0.5) }}
                    name={"account-circle"}
                    size={35}
                    color={"#FACA4E"}
                  />
                ) : (
                  <Image
                    style={{
                      flex: 1,
                      width: "100%",
                      height: "100%",
                      borderRadius: wp(12) / 2, // Half of the width (25/2)
                      resizeMode: "contain",
                    }}
                    source={{ uri: receivedData.userimage }}
                  />
                )}
              </TouchableOpacity>

              <View>
                <Text
                  style={{
                    color: "#FACA4E",
                    fontFamily: "Inter-Medium",
                    marginLeft: wp(3),
                    fontWeight: "400",
                    fontSize: hp(2),
                  }}
                >
                  {receivedData.username}
                </Text>

                <Text
                  style={{
                    color: "#77838F",
                    fontFamily: "Inter",
                    marginLeft: wp(3),
                    fontSize: hp(2),
                  }}
                >
                  {userData?.email}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Conversation", {
                  receivedData: receivedData,
                  offerid: offerId,
                })
              }
            >
              <SendMessage width={39} height={39} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              height: hp(10),
            }}
          >
            <TouchableOpacity
              onPress={() => ref_RBSendOffer.current.open()}
              style={{
                width: wp(21),
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <SendMail />

              <Text
                style={{
                  color: "#4C4C4C",
                  fontFamily: "Inter-SemiBold",
                  // fontWeight: '600',
                  fontSize: hp(1.6),
                }}
              >
                Send Offer
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: wp(21),
                height: hp(7.5),
                //borderWidth:3,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => handleUpdateAlert()}>
                {/*  <BellAlert style={{marginTop: hp(1)}} width={21} height={21} /> */}
                {showAlert === true ? (
                  <MaterialIcons
                    style={{ marginTop: hp(0.5) }}
                    name="notifications-active"
                    size={28}
                    color={"#FACA4E"}
                  />
                ) : (
                  <MaterialIcons
                    style={{ marginTop: hp(0.5) }}
                    name="notifications"
                    size={28}
                    color={"#FACA4E"}
                  />
                )}
              </TouchableOpacity>

              <Text
                style={{
                  color: "#4C4C4C",
                  fontFamily: "Inter-SemiBold",
                  fontSize: hp(1.6),
                }}
              >
                Alert
              </Text>
            </View>

            <View
              style={{
                width: wp(21),
                alignItems: "center",
                height: hp(7.5),
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => sendBookMark()}>
                {bookMark === true ? (
                  <Icon
                    name="bookmark"
                    size={24}
                    color="#FACA4E"
                    style={{ marginTop: hp(0.6) }}
                  />
                ) : (
                  <Icon
                    name="bookmark-o"
                    size={24}
                    color="#FACA4E"
                    style={{ marginTop: hp(0.6) }}
                  />
                )}
              </TouchableOpacity>

              <Text
                style={{
                  color: "#4C4C4C",
                  fontFamily: "Inter-SemiBold",
                  fontSize: hp(1.6),
                }}
              >
                Book Mark
              </Text>
            </View>

            <View
              style={{
                width: wp(21),
                alignItems: "center",
                height: hp(7.5),
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => shareViaWhatsApp()}>
                <Share style={{ marginTop: hp(1.2) }} width={18} height={18} />
              </TouchableOpacity>

              <Text
                style={{
                  color: "#4C4C4C",
                  fontFamily: "Inter-SemiBold",
                  fontSize: hp(1.6),
                }}
              >
                Share
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <RBSheet
        ref={ref_RBSendOffer}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(58),
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: wp(8),
            alignItems: "center",
          }}
        >
          <Text style={styles.maintext}>Send Offer</Text>
          <TouchableOpacity onPress={() => ref_RBSendOffer.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSendOffer.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            height: hp(16),
            alignItems: "center",
            marginTop: hp(1.5),
            marginHorizontal: wp(6),
            marginVertical: wp(1),

            //borderWidth: 3,
          }}
        >
          <View
            style={{
              // height: hp(10),
              //flex: 1,
              height: hp(12),
              marginLeft: wp(0.4),
              //borderWidth:3,
              width: wp(25),
              borderRadius: wp(2),
              marginTop: 10,
            }}
          >
            <Image
              style={{
                // position: 'absolute',
                // top: 0,
                // left: 0,
                //zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: "100%",
                height: "100%",
                //height:hp(15),
                // width:wp(15),
                borderRadius: wp(2),
                resizeMode: "contain",
              }}
              source={receivedData?.image}
            />
          </View>

          <View
            style={{
              height: hp(13),
              marginLeft: wp(2.1),
              justifyContent: "space-between",

              paddingRight: 15,
            }}
          >
            <Text
              style={{
                color: "#333333",
                fontFamily: "Inter-SemiBold",

                fontSize: hp(2),
              }}
            >
              {receivedData?.title}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#FACA4E",
                  fontFamily: "Inter-Medium",
                  fontSize: hp(2),
                  paddingBottom: 2,
                }}
              >
                ${receivedData.price}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", marginLeft: wp(-1), width: "89%" }}
            >
              <Location width={18} height={18} />
              <Text
                style={{
                  color: "#77838F",
                  fontFamily: "Inter-Regular",
                  // fontWeight: '300',
                  // paddingRight: 20,
                  fontSize: hp(1.6),
                }}
              >
                {receivedData.location}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: hp(15),
            //flexDirection: 'row', // Arrange items horizontally
            justifyContent: "space-between", // Space between items
            //alignItems: 'center', // Center items vertically
            //borderWidth: 3,
            marginHorizontal: wp(8),
            //paddingHorizontal: 10, // Add horizontal padding
          }}
        >
          {radioButtonsGridView.map((button, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: wp(4),
                justifyContent: "space-between",
              }}
            >
              <RadioButtonLabel
                obj={button}
                index={index}
                onPress={() => onPressChangeView(button.value)}
                labelHorizontal={true}
                labelStyle={{
                  fontSize: hp(1.8),
                  fontFamily: "Inter-SemiBold",

                  color: "#333333",
                  //marginRight: 10, // Add margin between label and button
                }}
                labelWrapStyle={
                  {
                    //marginBottom: hp(2),
                  }
                }
              />
              <RadioButtonInput
                obj={button}
                index={index}
                isSelected={selectedValueListView === button.value}
                onPress={() => onPressChangeView(button.value)}
                borderWidth={1}
                buttonInnerColor={
                  selectedValueListView === button.value
                    ? "#FACA4E"
                    : "#00000017"
                }
                buttonOuterColor={
                  selectedValueListView === button.value
                    ? "#FACA4E"
                    : "#00000017"
                }
                buttonSize={15}
                buttonOuterSize={20}
                //buttonStyle={{ marginTop: hp(3) }}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => changeModal()}
          style={{
            height: hp(5),
            marginTop: hp(1.9),
            marginHorizontal: wp(10.4),
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#333333",
              fontFamily: "Inter",
              fontWeight: "bold",

              fontSize: hp(1.8),
            }}
          >
            Offer a different amount
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: hp(2.1),
            marginBottom: hp(5),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButton
            title={"Send Offer"}
            load={loading}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              ref_RBSendOffer.current.close();
              detectOffer();
              {
                loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : null;
              } //this is currently used
              //handleUpdatePassword();
              //navigation.navigate('Profile_image');
              const selectedOffer = radioButtonsGridView.find(
                (button) => button.value === selectedValueListView
              );
              if (selectedOffer) {
                // Store the selected offer before closing the modal
                storeSelectedOffer(selectedOffer); // Pass the selected offer here
              } else {
                console.warn("No offer selected.");
              }
            }}
          />
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSendOffer2}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(50),
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: wp(8),
            alignItems: "center",
          }}
        >
          <Text style={styles.maintext}>Your Offer</Text>
          <TouchableOpacity onPress={() => ref_RBSendOffer2.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSendOffer2.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            height: hp(16),
            alignItems: "center",
            marginTop: hp(1.5),
            marginHorizontal: wp(8),
            //borderWidth: 3,
          }}
        >
          <View
            style={{
              // height: hp(10),
              //flex: 1,
              height: hp(12),
              marginLeft: wp(1),
              //borderWidth:3,
              width: wp(25),
              borderRadius: wp(3),
              marginTop: 12,
            }}
          >
            <Image
              style={{
                // position: 'absolute',
                // top: 0,
                // left: 0,
                //zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: "100%",
                height: "100%",
                //height:hp(15),
                // width:wp(15),
                borderRadius: wp(3),
                resizeMode: "contain",
              }}
              source={appImages.lense}
            />
          </View>

          <View
            style={{
              height: hp(10),
              marginLeft: wp(2.1),
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "#333333",
                fontFamily: "Inter",
                fontWeight: "bold",

                fontSize: hp(2),
              }}
            >
              {receivedData?.title}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#FACA4E",
                  fontFamily: "Inter-Regular",
                  fontWeight: "500",

                  fontSize: hp(2),
                }}
              >
                $ {receivedData?.price}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", marginLeft: wp(-1), width: "89%" }}
            >
              <Location width={18} height={18} />
              <Text
                style={{
                  color: "#77838F",
                  fontFamily: "Inter-Regular",
                  // fontWeight: '300',
                  fontSize: hp(1.4),
                  paddingRight: 10,
                }}
              >
                {receivedData?.location}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: hp(15),
            marginHorizontal: wp(8),
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {/* <Text
            style={{
              color: '#333333',
              fontFamily: 'Inter',
              fontWeight: 'bold',

              fontSize: hp(4.3),
            }}>
            $ 435
          </Text> */}

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholderTextColor={"#848484"}
              keyboardType="numeric"
              value={priceOffer} // Bind the value to the state variable
              onChangeText={(text) => setPriceOffer(text)} // Update state on text change
              placeholder={isFocused ? "" : "Please Enter Your Price"} // Conditionally render placeholder
              onFocus={() => setIsFocused(true)} // Set focus state to true
              onBlur={() => setIsFocused(false)} // Set focus state to false
              style={{
                flex: 1,
                marginLeft: wp(1),
                fontFamily: "Inter-Bold",
                textAlign: "center",
              }}
            />
          </View>
          {/* <TextInput
            placeholderTextColor={"#848484"}
            keyboardType="numeric"
            value={priceOffer} // Bind the value to the state variable
            onChangeText={(text) => setPriceOffer(text)} // Update state on text change
            placeholder="Please Enter Your Price"
            style={{
              flex: 1,
              marginLeft: wp(1),
              fontFamily: "Inter-Bold",
          
            }}
          /> */}

          <View
            style={{
              height: hp(0.1),
              width: "100%",
              backgroundColor: "#00000042",
            }}
          ></View>

          <Text
            style={{
              color: "#FACA4E",
              fontFamily: "Inter-medium",
              // fontWeight: '400',

              fontSize: hp(1.8),
            }}
          >
            Listed Price $ {receivedData?.price}
          </Text>
        </View>

        <View
          style={{
            marginTop: hp(2.1),
            marginBottom: hp(5),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButton
            title={"Send Offer"}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              //ref_RBSendOffer2.current.close();
              detectOfferPrice();
              //ref_RBSendOffer.current.open();
              //navigation.navigate('Profile_image');
              // if (selectedOffer) {
              //   // Store the selected offer before closing the modal
              //   storeSelectedOffer(selectedOffer); // Pass the selected offer here
              // } else {
              //   console.warn("No offer selected.");
              // }
            }}
          />
        </View>
      </RBSheet>

      <CustomSnackbar
        message={"Success"}
        messageDescription={"Your Offer Sent Successfully"}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />

      <CustomSnackbar
        message={"Success"}
        messageDescription={"You will get notified to the relevant feed"}
        onDismiss={dismissSnackbarAlert} // Make sure this function is defined
        visible={snackbarVisibleAlert}
      />

      <CustomSnackbar
        message={"Success"}
        messageDescription={"Item saved successfully"}
        onDismiss={dismissSnackbarSaved} // Make sure this function is defined
        visible={snackbarVisibleSaved}
      />

      <CustomSnackbar
        message={"Alert"}
        messageDescription={"Kindly Select Price First"}
        onDismiss={dismissSnackbarPrice} // Make sure this function is defined
        visible={snackbarVisiblePrice}
      />

      <CustomSnackbar
        message={"Success"}
        messageDescription={"Item Removed Successfully"}
        onDismiss={dismissSnackbarRemove} // Make sure this function is defined
        visible={snackbarVisibleRemoveSave}
      />

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
  dot: {
    width: 6, // Default dot width
    height: 6, // Default dot height
    borderRadius: 3, // Make it round
    marginHorizontal: 5, // Adjust spacing between dots
    backgroundColor: "gray", // Default dot color
  },
  paginationStyle: {
    bottom: 10, // Adjust the position of the pagination
  },
  circleBox: {
    width: wp(12),
    height: wp(12),
    overflow: "hidden",
    borderColor: "#00000020",
    borderRadius: wp(50),
    justifyContent: "center",
    alignItems: "center",
  },
  maintext: {
    fontSize: hp(2.3),
    color: "#333333",
    // fontWeight: 'bold',
    fontFamily: "Inter-Bold",
  },
});
