// import {
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   Text,
//   Image,
//   KeyboardAvoidingView,
//   ScrollView,
//   StatusBar,
//   ImageBackground,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useState, useEffect, useRef} from 'react';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import Entypo from 'react-native-vector-icons/Entypo';

// import NonVerified from '../../../assets/svg/NonVerified.svg';

// import {Button, Divider, TextInput} from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import PlusPost from '../../../assets/svg/PlusPost.svg';
// import Approved from '../../../assets/svg/Approved.svg';

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
// import {useIsFocused} from '@react-navigation/native';
// import Share from 'react-native-share';

// import AsyncStorage from '@react-native-async-storage/async-storage';

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
// import { base_url } from '../../../../../baseUrl';

// export default function ViewElseProfile({navigation, route}) {
//   const [authToken, setAuthToken] = useState(null);

//   const [selectedItemId, setSelectedItemId] = useState(1);

//   const [userId, setUserId] = useState('');

//   const [name, setName] = useState('');

//   const [image, setImage] = useState('');

//   const [email, setEmail] = useState('');

//   const [loading, setLoading] = useState(false);

//   const [videos, setVideos] = useState([]);
//   const [pics, setPics] = useState([]);

//   const [totalVideos, setTotalVideos] = useState(null);

//   const [totalPics, setTotalPics] = useState(null);

//   const [marketZone, setMarketZone] = useState([]);

//   const [totalMarketZone, setTotalMarketZone] = useState(null);

//   const [news, setNews] = useState([]);

//   const [totalNews, setTotalNews] = useState(null);

//   const [QAFI, setQAFI] = useState([]);

//   const [totalQAFI, setTotalQAFI] = useState(null);

//   const [GEBC, setGEBC] = useState([]);

//   const [totalGEBC, setTotalGEBC] = useState(null);

//   const isFocused = useIsFocused();

//   const receivedData = route.params?.id;

//   console.log('recieved Data in conversation', receivedData);

//   useEffect(() => {
//     // Make the API request and update the 'data' state
//     fetchVideos();
//   }, [isFocused]);

//   const fetchVideos = async () => {
//     // Simulate loading
//     setLoading(true);

//     // Fetch data one by one
//     await getUserID();
//     //await fetchUser();
//     setLoading(false);
//     // Once all data is fetched, set loading to false
//   };

//   const getUserID = async () => {
//     console.log('AT User Id');
//     try {
//       const result = await AsyncStorage.getItem('authToken ');
//       if (result !== null) {
//         setAuthToken(result);
//         await fetchUserId(result);
//         // console.log('ViewElseProfile user token retrieved of profile:', result);
//       }

//       /* console.log("User Id", userId);
//       console.log("authToken", authToken); */
//     } catch (error) {
//       // Handle errors here
//       console.error('Error retrieving user ID:', error);
//     }
//   };

//   const fetchUserId = async tokens => {
//     console.log('Token', tokens);
//     const result3 = await AsyncStorage.getItem('userId ');
//     if (result3 !== null) {
//       setUserId(result3);

//       console.log('user id retrieved:', result3);
//       fetchUser(tokens, receivedData);
//     } else {
//       console.log('result is null', result3);
//     }
//   };

//   const searches = [
//     {id: 1, title: 'On News'},
//     {id: 2, title: 'QAFI'},
//     {id: 3, title: 'GEBC'},
//   ];

//   const fetchUser = async (tokens, user) => {
//     console.log('Came to fetch Id');
//     const token = tokens;

//     try {
//       const response = await fetch(
//         base_url + `user/getUser/${user}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const result = await response.json();
//       //console.log('Resultings', result.user);
//       setName(result.user.username);
//       setImage(result.user.image);
//       setEmail(result.user.email);
//       fetchMyVideos(tokens, user);
//     } catch (error) {
//       console.error('Error USER:', error);
//     }
//   };

//   //---------------- VIDEOS OF MY PROFILE----------------\\

//   const fetchMyVideos = async (tokens, user) => {
//     /*  console.log("Came to my videos");
//     console.log("UserId", ids);
//     console.log("AuthToken", authToken); */

//     const token = tokens;

//     try {
//       const response = await fetch(
//         base_url + `xpi/getAllVideosByUser/${user}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const result = await response.json();
//       //console.log('Resultings', result.Videos);
//       setVideos(result.Videos); // Update the state with the fetched data
//       setTotalVideos(result.totalVideos);
//       fetchMyPicTour(tokens, user);
//     } catch (error) {
//       console.error('Error VIDEOS', error);
//     }
//   };

//   const fetchMyPicTour = async (tokens, user) => {
//     const token = tokens;

//     try {
//       const response = await fetch(
//         base_url + `picTour/getAllPicToursByUser/${user}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const result = await response.json();
//       //console.log('Resultings', result.Videos);
//       setPics(result.Tours); // Update the state with the fetched data
//       setTotalPics(result.totalTours);
//       fetchMyMarketZoneTour(tokens, user);
//     } catch (error) {
//       console.error('Error PIC TOUR', error);
//     }
//   };

//   const fetchMyMarketZoneTour = async (tokens, user) => {
//     const token = tokens;

//     try {
//       const response = await fetch(
//         base_url + `item/getAllItemByUser/${user}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const result = await response.json();
//       //console.log('Resultings', result.AllItems);
//       setMarketZone(result.AllItems); // Update the state with the fetched data
//       setTotalMarketZone(result.totalItems);
//       fetchMyNews(tokens, user);
//     } catch (error) {
//       console.error('Error MARKET ZONE:', error);
//     }
//   };

//   const fetchMyNews = async (tokens, user) => {
//     console.log('TOKEN', tokens);
//     console.log('USER', user);
//     const token = tokens;

//     try {
//       const response = await fetch(
//         base_url + `news/getAllNewsByUser/${user}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const result = await response.json();
//       console.log('Resultings ON NEWS', result.News);
//       setNews(result.News); // Update the state with the fetched data
//       setTotalNews(result.totalNews);
//       fetchMyQAFI(tokens, user);
//     } catch (error) {
//       console.error('Error ON NEWS', error);
//     }
//   };

//   const fetchMyQAFI = async (tokens, user) => {
//     const token = tokens;

//     try {
//       const response = await fetch(
//         base_url + `qafi/getAllQafisByUser/${user}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const result = await response.json();
//       //console.log('Resultings', result.QAFIs);
//       setQAFI(result.QAFIs); // Update the state with the fetched data
//       setTotalQAFI(result.totalQAFIs);
//       fetchMyGEBC(tokens, user);
//     } catch (error) {
//       console.error('Error MY QAFI', error);
//     }
//   };

//   const fetchMyGEBC = async (tokens, user) => {
//     const token = tokens;

//     try {
//       const response = await fetch(
//         base_url + `gebc/getAllGEBCByUser/${user}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const result = await response.json();
//       //console.log('Resultings', result.GEBCs);
//       setGEBC(result.GEBCs); // Update the state with the fetched data
//       setTotalGEBC(result.totalGEBCs);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error GEBC:', error);
//     }
//   };

//   const availableAppsVideo = [
//     {
//       id: 1,
//       title: 'Explore the intricate web of global pol.....',
//       image: appImages.topSearches1,
//     },
//     {
//       id: 2,
//       title: 'Explore the intricate web of global pol.....',
//       image: appImages.topSearches2,
//     },
//     {
//       id: 3,
//       title: 'Explore the intricate web of global pol.....',
//       image: appImages.topSearches3,
//     },
//     {
//       id: 4,
//       title: 'Explore the intricate web of global pol.....',
//       image: appImages.topSearches4,
//     },
//     {
//       id: 5,
//       title: 'Explore the intricate web of global pol.....',
//       image: appImages.topSearches1,
//     },
//     {
//       id: 6,
//       title: 'Explore the intricate web of global pol.....',
//       image: appImages.topSearches2,
//     },
//     {
//       id: 7,
//       title: 'Explore the intricate web of global pol.....',
//       image: appImages.topSearches3,
//     },
//     {
//       id: 8,
//       title: 'Explore the intricate web of global pol.....',
//       image: appImages.topSearches4,
//     },
//     {
//       id: 9,
//       title: 'Explore the intricate web of global pol.....',
//       image: appImages.topSearches1,
//     },
//     {
//       id: 10,
//       title: 'Explore the intricate web of global pol.....',
//       image: appImages.topSearches2,
//     },
//   ];

//   const availableApps = [
//     {
//       id: 1,
//       title: 'Item Name',
//       image: appImages.topSearches1,
//     },
//     {
//       id: 2,
//       title: 'Item Name',
//       image: appImages.topSearches2,
//     },
//     {
//       id: 3,
//       title: 'Item Name',
//       image: appImages.topSearches3,
//     },
//     {
//       id: 4,
//       title: 'Item Name',
//       image: appImages.topSearches4,
//     },
//     {
//       id: 5,
//       title: 'Item Name',
//       image: appImages.topSearches1,
//     },
//     {
//       id: 6,
//       title: 'Item Name',
//       image: appImages.topSearches2,
//     },
//     {
//       id: 7,
//       title: 'Item Name',
//       image: appImages.topSearches3,
//     },
//     {
//       id: 8,
//       title: 'Item Name',
//       image: appImages.topSearches4,
//     },
//     {
//       id: 9,
//       title: 'Item Name',
//       image: appImages.topSearches1,
//     },
//     {
//       id: 10,
//       title: 'Item Name',
//       image: appImages.topSearches2,
//     },
//   ];

//   const renderAvailableApps = item => {
//     console.log('Items Of Market', item.images[0].image);
//     const imageUri = item.images[0]?.image;
//     console.log(imageUri);
//     return (
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('ProductDetails', {ProductDetails: item})
//         }
//         style={{width: wp(35), margin: 5}}>
//         <View>
//           {imageUri === null ? (
//             <Image
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,

//                 zIndex: 1, // Ensure it's on top of other elements
//                 //flex: 1,
//                 width: '100%',
//                 height: hp(18),
//                 borderRadius: wp(3),
//                 resizeMode: 'cover',
//               }}
//               source={appImages.galleryPlaceHolder}
//             />
//           ) : (
//             <Image
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,

//                 zIndex: 1, // Ensure it's on top of other elements
//                 //flex: 1,
//                 width: '100%',
//                 height: hp(18),
//                 borderRadius: wp(3),
//                 resizeMode: 'cover',
//               }}
//               source={{uri: imageUri}}
//             />
//           )}
//         </View>

//         <View
//           style={{
//             position: 'absolute',
//             top: hp(14),
//             left: 7,
//             //height: hp(3),
//             //width: wp(21),
//             //borderRadius: wp(3),
//             //backgroundColor: '#FACA4E',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 2, // Ensure it's on top
//           }}>
//           <Text
//             style={{
//               fontSize: hp(1.6),
//               fontFamily: 'Inter',
//               color: '#FFFFFF',
//               fontWeight: '700',
//             }}>
//             {item.description}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderAvailableAppsPic = item => {
//     console.log('Items Pics', item);

//     const imageUrl =
//       item.image && item.image
//         ? item.image.startsWith('/fileUpload')
//           ? base_url + `${item.image}`
//           : item.image
//         : null;
//     return (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('PicDetails', {picData: item})}
//         /* onPress={() =>
//           navigation.navigate('ViewVideoPicProfile', {picData: item})
//         } */
//         style={{width: wp(28), margin: 5}}>
//         <View>
//           <Image
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,

//               zIndex: 1, // Ensure it's on top of other elements
//               //flex: 1,
//               width: '100%',
//               height: hp(12),
//               borderRadius: wp(2.1),
//               resizeMode: 'cover',
//             }}
//             source={{uri: imageUrl}}
//           />
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginLeft: wp(2),
//             marginTop: hp(12.5),
//           }}>
//           <Text
//             numberOfLines={1}
//             ellipsizeMode="tail"
//             style={{
//               fontSize: hp(1.5),
//               color: '#000000',
//               fontFamily: 'Inter-Regular',
//               width: wp(23),
//             }}>
//             {item?.description}
//           </Text>
//           <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderAvailableAppsVideo = item => {
//     console.log('Video Items', item);
//     return (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('ViewVideo', {videoData: item})}
//         /* onPress={() =>
//           navigation.navigate('ViewVideoProfile', {videoData: item})
//         } */
//         style={{width: wp(28), margin: 5}}>
//         <View>
//           <Image
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,

//               zIndex: 1, // Ensure it's on top of other elements
//               //flex: 1,
//               width: '100%',
//               height: hp(12),
//               borderRadius: wp(2.1),
//               resizeMode: 'cover',
//             }}
//             source={{uri: item.thumbnail}}
//           />
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginLeft: wp(2),
//             marginTop: hp(12.5),
//           }}>
//           <Text
//             numberOfLines={1}
//             ellipsizeMode="tail"
//             style={{
//               fontSize: hp(1.5),
//               color: '#000000',
//               fontFamily: 'Inter-Regular',
//               width: wp(23),
//             }}>
//             {item.description}
//           </Text>

//           <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   // DISC

//   const renderSearches = item => {
//     console.log('Items Of Searches', item);
//     const isSelected = selectedItemId === item.id;

//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
//           },
//         ]}
//         onPress={() => {
//           setSelectedItemId(item.id);
//           console.log('Selected item:', item.id);
//           if (item.id === 1) {
//             console.log('ITEMS NEWS CAllED');
//             fetchMyNews(authToken, userId);
//             setSelectedItemId(1);
//           } else if (item.id === 2) {
//             setSelectedItemId(2);
//             console.log('On Letter id', item.id);
//           } else if (item.id === 3) {
//             setSelectedItemId(3);
//           }
//         }}>
//         <Text
//           style={[
//             styles.textSearchDetails,
//             {color: isSelected ? '#232323' : '#939393'},
//           ]}>
//           {item.title}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   //------------------------\\

//   //------------------------\\

//   // GEBC COMP
//   const GEBCCOMP = () => {
//     return (
//       <View style={{flex: 1}}>
//         <View style={{height: hp(15)}}>
//           <View style={{height: '100%'}}>
//             {loading === true ? (
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <ActivityIndicator size="large" color="#FACA4E" />
//               </View>
//             ) : (
//               <>
//                 {GEBC?.length === 0 ? (
//                   <View
//                     style={{
//                       flex: 1,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
//                       No data available
//                     </Text>
//                   </View>
//                 ) : (
//                   <FlatList
//                     style={{flex: 1}}
//                     showsHorizontalScrollIndicator={false}
//                     data={GEBC}
//                     horizontal
//                     //keyExtractor={item => item.id.toString()}
//                     renderItem={({item}) => renderAvailableAppsGEBC(item)}
//                   />
//                 )}
//               </>
//             )}
//           </View>
//         </View>
//       </View>
//     );
//   };

//   //--------------\\

//   // QAFI COMP

//   const QAFICOMP = () => {
//     return (
//       <View style={{flex: 1}}>
//         <View style={{height: hp(15)}}>
//           <View style={{height: '100%'}}>
//             {loading === true ? (
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <ActivityIndicator size="large" color="#FACA4E" />
//               </View>
//             ) : (
//               <>
//                 {QAFI?.length === 0 ? (
//                   <View
//                     style={{
//                       flex: 1,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
//                       No data available
//                     </Text>
//                   </View>
//                 ) : (
//                   <FlatList
//                     style={{flex: 1}}
//                     showsHorizontalScrollIndicator={false}
//                     data={QAFI}
//                     horizontal
//                     //keyExtractor={item => item.id.toString()}
//                     renderItem={({item}) => renderAvailableAppsQAFI(item)}
//                   />
//                 )}
//               </>
//             )}
//           </View>
//         </View>
//       </View>
//     );
//   };
//   //------------------\\

//   // NEWS COMP

//   const NEWSCOMP = () => {
//     return (
//       <View style={{flex: 1}}>
//         <View style={{height: hp(15)}}>
//           <View style={{height: '100%'}}>
//             {loading === true ? (
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <ActivityIndicator size="large" color="#FACA4E" />
//               </View>
//             ) : (
//               <>
//                 {news?.length === 0 ? (
//                   <View
//                     style={{
//                       flex: 1,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
//                       No data available
//                     </Text>
//                   </View>
//                 ) : (
//                   <FlatList
//                     style={{flex: 1}}
//                     showsHorizontalScrollIndicator={false}
//                     data={news}
//                     horizontal
//                     //keyExtractor={item => item.id.toString()}
//                     renderItem={({item}) => renderAvailableAppsNEWS(item)}
//                   />
//                 )}
//               </>
//             )}
//           </View>
//         </View>
//       </View>
//     );
//   };

//   //----------------\\
//   //RENDER GEBC

//   const renderAvailableAppsGEBC = item => {
//     console.log('Items Of GEBC', item?.image);
//     const imageUri = item?.image;
//     console.log(imageUri);
//     return (
//       <View
//         /*         onPress={() => navigation.navigate('ViewUpdateGEBC', {details: item})}
//          */ style={{width: wp(35), marginLeft: wp(3)}}>
//         <View>
//           {imageUri === null ? (
//             <Image
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,

//                 zIndex: 1, // Ensure it's on top of other elements
//                 //flex: 1,
//                 width: '100%',
//                 height: hp(14),
//                 borderRadius: wp(3),
//                 resizeMode: 'cover',
//               }}
//               source={appImages.galleryPlaceHolder}
//             />
//           ) : (
//             <Image
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,

//                 zIndex: 1, // Ensure it's on top of other elements
//                 //flex: 1,
//                 width: '100%',
//                 height: hp(14),
//                 borderRadius: wp(3),
//                 resizeMode: 'cover',
//               }}
//               source={{uri: imageUri}}
//             />
//           )}
//         </View>

//         <View
//           style={{
//             position: 'absolute',
//             top: hp(10),
//             left: 3,
//             //height: hp(3),
//             //width: wp(21),
//             //borderRadius: wp(3),
//             //backgroundColor: '#FACA4E',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 2, // Ensure it's on top
//           }}>
//           <Text
//             style={{
//               fontSize: hp(1.6),
//               fontFamily: 'Inter',
//               color: '#FFFFFF',
//               fontWeight: '700',
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}>
//             {item.description}
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   //--------------------------\\

//   //RENDER QAFI

//   const renderAvailableAppsQAFI = item => {
//     console.log('Items Of QAFI', item?.image);
//     const imageUri = item?.image;
//     console.log(imageUri);
//     return (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('ViewQAFI', {picData: item})}
//         /*         onPress={() => navigation.navigate('ViewUpdateQAFI', {details: item})}
//          */ style={{width: wp(35), marginLeft: wp(3)}}>
//         <View>
//           {imageUri === null ? (
//             <Image
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,

//                 zIndex: 1, // Ensure it's on top of other elements
//                 //flex: 1,
//                 width: '100%',
//                 height: hp(14),
//                 borderRadius: wp(3),
//                 resizeMode: 'cover',
//               }}
//               source={appImages.galleryPlaceHolder}
//             />
//           ) : (
//             <Image
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,

//                 zIndex: 1, // Ensure it's on top of other elements
//                 //flex: 1,
//                 width: '100%',
//                 height: hp(14),
//                 borderRadius: wp(3),
//                 resizeMode: 'cover',
//               }}
//               source={{uri: imageUri}}
//             />
//           )}
//         </View>

//         <View
//           style={{
//             position: 'absolute',
//             top: hp(10),
//             left: 3,
//             //height: hp(3),
//             //width: wp(21),
//             //borderRadius: wp(3),
//             //backgroundColor: '#FACA4E',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 2, // Ensure it's on top
//           }}>
//           <Text
//             style={{
//               fontSize: hp(1.6),
//               fontFamily: 'Inter',
//               color: '#FFFFFF',
//               fontWeight: '700',
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}>
//             {item.description}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   //---------------------------\\

//   //RENDER NEWS

//   const renderAvailableAppsNEWS = item => {
//     console.log('Items Of NEWS', item?.image);
//     const imageUri = item?.image;
//     console.log(imageUri);
//     return (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('ViewNews', {picData: item})}
//         /*         onPress={() => navigation.navigate('ViewUpdateNews', {details: item})}
//          */ style={{width: wp(35), marginLeft: wp(3)}}>
//         <View>
//           {imageUri === null ? (
//             <Image
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,

//                 zIndex: 1, // Ensure it's on top of other elements
//                 //flex: 1,
//                 width: '100%',
//                 height: hp(14),
//                 borderRadius: wp(3),
//                 resizeMode: 'cover',
//               }}
//               source={appImages.galleryPlaceHolder}
//             />
//           ) : (
//             <Image
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,

//                 zIndex: 1, // Ensure it's on top of other elements
//                 //flex: 1,
//                 width: '100%',
//                 height: hp(14),
//                 borderRadius: wp(3),
//                 resizeMode: 'cover',
//               }}
//               source={{uri: imageUri}}
//             />
//           )}
//         </View>

//         <View
//           style={{
//             position: 'absolute',
//             top: hp(10),
//             left: 3,
//             //height: hp(3),
//             //width: wp(21),
//             //borderRadius: wp(3),
//             //backgroundColor: '#FACA4E',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 2, // Ensure it's on top
//           }}>
//           <Text
//             style={{
//               fontSize: hp(1.6),
//               fontFamily: 'Inter',
//               color: '#FFFFFF',
//               fontWeight: '700',
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}>
//             {item.description}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   //---------------------------\\

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent={true}
//         backgroundColor="transparent"
//         barStyle="dark-content" // You can set the StatusBar text color to dark or light
//       />
//       <View style={{marginTop: hp(5), marginRight: wp(5)}}>
//         <Headers
//           onPress={() => navigation.goBack()}
//           showBackIcon={true}
//           //showSettings={true}
//           //onPressSettings={() => navigation.navigate('ProfileSettings')}
//           //showText={true}
//           //text={'Profile'}
//         />
//       </View>

//       <ScrollView style={{flex: 1}}>
//       <View
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: hp(3),
//             height: hp(21),
//           }}>
//           {image !== null ? (
//             <View
//               style={{
//                 width: wp(20),
//                 marginLeft: wp(0.5),
//                 height: wp(20),
//                 borderRadius: wp(20) / 2,
//               }}>
//               <Image
//                 source={{uri: image}}
//                 style={{width: '100%', height: '100%', resizeMode: 'contain',  borderRadius: wp(20) / 2,}}
//               />
//             </View>
//           ) : (
//             <MaterialCommunityIcons
//               style={{marginTop: hp(0.5)}}
//               name={'account-circle'}
//               size={55}
//               color={'#FACA4E'}
//             />
//           )}

//           <Text
//             style={{
//               fontSize: hp(2.3),
//               //marginLeft: wp(2),
//               marginTop: hp(1.3),
//               color: '#FACA4E',
//               //fontWeight: 'bold',
//               fontFamily: 'Inter-Medium',
//             }}>
//             {name}
//           </Text>

//           <Text
//             style={{
//               fontSize: hp(2),
//               //marginLeft: wp(2),
//               //   /marginTop:hp(0.1),
//               color: '#77838F',
//               //fontWeight: 'bold',
//               fontFamily: 'Inter-Regular',
//             }}>
//             {email}
//           </Text>
//         </View>
//         <View
//           style={{
//             height: hp(6.5),
//             marginTop: hp(1.5),
//             marginHorizontal: wp(6),
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <View
//             style={{
//               width: wp(30),
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}>
//             <Text
//               style={{
//                 fontSize: hp(2.5),
//                 //marginLeft: wp(2),
//                 //   /marginTop:hp(0.1),
//                 color: '#1E2022',
//                 //fontWeight: 'bold',
//                 fontFamily: 'Inter-Bold',
//               }}>
//               {totalVideos}
//             </Text>

//             <Text
//               style={{
//                 fontSize: hp(1.8),
//                 //marginLeft: wp(2),
//                 //   /marginTop:hp(0.1),
//                 color: '#77838F',
//                 //fontWeight: 'bold',
//                 fontFamily: 'Inter-Regular',
//               }}>
//               Video Mania
//             </Text>
//           </View>

//           <View
//             style={{
//               width: wp(18),
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}>
//             <Text
//               style={{
//                 fontSize: hp(2.5),
//                 //marginLeft: wp(2),
//                 //   /marginTop:hp(0.1),
//                 color: '#1E2022',
//                 //fontWeight: 'bold',
//                 fontFamily: 'Inter-Bold',
//               }}>
//               {totalPics}
//             </Text>

//             <Text
//               style={{
//                 fontSize: hp(1.8),
//                 //marginLeft: wp(2),
//                 //   /marginTop:hp(0.1),
//                 color: '#77838F',
//                 //fontWeight: 'bold',
//                 fontFamily: 'Inter-Regular',
//               }}>
//               Pic Tour
//             </Text>
//           </View>

//           <View
//             style={{
//               width: wp(18),
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}>
//             <Text
//               style={{
//                 fontSize: hp(2.5),
//                 //marginLeft: wp(2),
//                 //   /marginTop:hp(0.1),
//                 color: '#1E2022',
//                 //fontWeight: 'bold',
//                 fontFamily: 'Inter-Bold',
//               }}>
//               {totalNews + totalGEBC + totalQAFI}
//             </Text>

//             <Text
//               style={{
//                 fontSize: hp(1.8),
//                 //marginLeft: wp(2),
//                 //   /marginTop:hp(0.1),
//                 color: '#77838F',
//                 //fontWeight: 'bold',
//                 fontFamily: 'Inter-Regular',
//               }}>
//               DISC
//             </Text>
//           </View>

//           <View
//             style={{
//               width: wp(21),
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}>
//             <Text
//               style={{
//                 fontSize: hp(2.5),
//                 //marginLeft: wp(2),
//                 //   /marginTop:hp(0.1),
//                 color: '#1E2022',
//                 //fontWeight: 'bold',
//                 fontFamily: 'Inter-Bold',
//               }}>
//               {totalMarketZone}
//             </Text>

//             <Text
//               style={{
//                 fontSize: hp(1.7),
//                 //marginLeft: wp(2),
//                 //   /marginTop:hp(0.1),
//                 color: '#77838F',
//                 //fontWeight: 'bold',
//                 fontFamily: 'Inter-Regular',
//               }}>
//               Marketpark
//             </Text>
//           </View>
//         </View>

//         <View style={{height: hp(23), marginLeft: wp(8), marginTop: hp(5)}}>
//           <Text
//             style={{
//               fontSize: hp(2.1),
//               //marginLeft: wp(2),
//               //   /marginTop:hp(0.1),
//               color: '#77838F',
//               //fontWeight: 'bold',
//               fontFamily: 'Inter-Bold',
//             }}>
//             Video Mania
//           </Text>

//           <View style={{marginTop: hp(1), height: '100%'}}>
//             {loading === true ? (
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <ActivityIndicator size="large" color="#FACA4E" />
//               </View>
//             ) : (
//               <>
//                 {videos?.length === 0 ? (
//                   <View
//                     style={{
//                       flex: 1,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
//                       No data available
//                     </Text>
//                   </View>
//                 ) : (
//                   <FlatList
//                     style={{flex: 1, marginLeft: wp(-1.5)}}
//                     showsHorizontalScrollIndicator={false}
//                     data={videos}
//                     horizontal
//                     //keyExtractor={item => item.id.toString()}
//                     renderItem={({item}) => renderAvailableAppsVideo(item)}
//                   />
//                 )}
//               </>
//             )}
//           </View>
//         </View>

//         <View style={{height: hp(23), marginLeft: wp(8), marginTop: hp(1)}}>
//           <Text
//             style={{
//               fontSize: hp(2.1),
//               //marginLeft: wp(2),
//               //   /marginTop:hp(0.1),
//               color: '#77838F',
//               //fontWeight: 'bold',
//               fontFamily: 'Inter-Bold',
//             }}>
//             Pic Tour
//           </Text>

//           <View style={{marginTop: hp(1), height: '100%'}}>
//             {loading === true ? (
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <ActivityIndicator size="large" color="#FACA4E" />
//               </View>
//             ) : (
//               <>
//                 {pics?.length === 0 ? (
//                   <View
//                     style={{
//                       flex: 1,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
//                       No data available
//                     </Text>
//                   </View>
//                 ) : (
//                   <FlatList
//                     style={{flex: 1, marginLeft: wp(-1.5)}}
//                     data={pics}
//                     showsHorizontalScrollIndicator={false}
//                     horizontal
//                     //keyExtractor={item => item.id.toString()}
//                     renderItem={({item}) => renderAvailableAppsPic(item)}
//                   />
//                 )}
//               </>
//             )}
//           </View>
//         </View>

//         <View
//           style={{height: hp(23), marginHorizontal: wp(8), marginTop: hp(1)}}>
//           <Text
//             style={{
//               fontSize: hp(2.1),
//               //marginLeft: wp(2),
//               //   /marginTop:hp(0.1),
//               color: '#77838F',
//               //fontWeight: 'bold',
//               fontFamily: 'Inter-Bold',
//             }}>
//             Disc
//           </Text>

//           <FlatList
//             style={{flex: 1}}
//             contentContainerStyle={{alignItems: 'center'}}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             data={searches}
//             keyExtractor={item => item.id.toString()}
//             renderItem={({item}) => renderSearches(item)}
//           />

//           {selectedItemId === 1 ? (
//             <NEWSCOMP />
//           ) : selectedItemId === 2 ? (
//             <QAFICOMP />
//           ) : selectedItemId === 3 ? (
//             <GEBCCOMP />
//           ) : null}

//           {/* 
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}> */}
//           {/*  <TouchableOpacity
//               onPress={() => navigation.navigate('LetterDetails')}>
//               <Image
//                 source={appImages.OpenLetter}
//                 style={{resizeMode: 'contain', width: wp(39)}}
//               />
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => navigation.navigate('LetterDetails')}>
//               <Image
//                 source={appImages.OpenLetter}
//                 style={{resizeMode: 'contain', width: wp(39)}}
//               />
//             </TouchableOpacity> */}
//           {/* </View> */}
//         </View>

//         <View
//           style={{height: hp(23), marginHorizontal: wp(8), marginTop: hp(5)}}>
//           <Text
//             style={{
//               fontSize: hp(2.1),
//               //marginLeft: wp(2),
//               //   /marginTop:hp(0.1),
//               color: '#77838F',
//               //fontWeight: 'bold',
//               fontFamily: 'Inter-Bold',
//             }}>
//             Market Zone
//           </Text>

//           {loading === true ? (
//             <View
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <ActivityIndicator size="large" color="#FACA4E" />
//             </View>
//           ) : (
//             <>
//               {marketZone?.length === 0 ? (
//                 <View
//                   style={{
//                     flex: 1,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
//                     No data available
//                   </Text>
//                 </View>
//               ) : (
//                 <FlatList
//                   style={{flex: 1, marginTop: hp(1), marginLeft: wp(-2)}}
//                   showsHorizontalScrollIndicator={false}
//                   data={marketZone}
//                   horizontal
//                   keyExtractor={item => item.id.toString()}
//                   renderItem={({item}) => renderAvailableApps(item)}
//                 />
//               )}
//             </>
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   searchesDetails: {
//     flexDirection: 'row',
//     marginLeft: wp(3),
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: wp(25),
//     backgroundColor: '#F2F2F2',
//     borderRadius: wp(5),
//     height: hp(5),
//   },
//   textSearchDetails: {
//     fontFamily: 'Inter',
//     fontWeight: '700',
//     fontSize: hp(1.8),
//   },
// });



// ///////////////////

import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";

import NonVerified from "../../../assets/svg/NonVerified.svg";

import { Button, Divider, TextInput } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import PlusPost from "../../../assets/svg/PlusPost.svg";
import Approved from "../../../assets/svg/Approved.svg";

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
import { useIsFocused } from "@react-navigation/native";
import Share from "react-native-share";

import AsyncStorage from "@react-native-async-storage/async-storage";

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
import { base_url } from "../../../../../baseUrl";

export default function ViewElseProfile({ navigation , route}) {
  const [authToken, setAuthToken] = useState(null);

  const [selectedItemId, setSelectedItemId] = useState(1);

  const [userId, setUserId] = useState("");

  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [videos, setVideos] = useState([]);
  const [pics, setPics] = useState([]);

  const [totalVideos, setTotalVideos] = useState(null);

  const [totalPics, setTotalPics] = useState(null);

  const [marketZone, setMarketZone] = useState([]);

  const [totalMarketZone, setTotalMarketZone] = useState(null);

  const [news, setNews] = useState([]);

  const [totalNews, setTotalNews] = useState(null);

  const [QAFI, setQAFI] = useState([]);

  const [totalQAFI, setTotalQAFI] = useState(null);

  const [GEBC, setGEBC] = useState([]);

  const [totalGEBC, setTotalGEBC] = useState(null);
  const [sports, setSports] = useState([]);
  const [totalsports, setTotalSports] = useState(null);

  const [letter, setLetter] = useState([]);
  const [totalLetter, setTotalLetter] = useState(null);

  const [cinematicvideos, setCinematicVideos] = useState([]);
  const [cinematictotalVideos, setCinematicTotalVideos] = useState(null);

  const [kidsvideos, setKidsVideos] = useState([]);
  const [kidstotalVideos, setKidsTotalVideos] = useState(null);

  const [tvvideos, setTVVideos] = useState([]);
  const [tvtotalVideos, setTVTotalVideos] = useState(null);

  const [learningvideos, setLearningVideos] = useState([]);
  const [learningtotalVideos, setLearningTotalVideos] = useState(null);

  const [fanStarvideos, setfanStarVideos] = useState([]);
  const [fanStartotalVideos, setfanStarTotalVideos] = useState(null);
  const [signatureData, setSignatureData] = useState(null);
  const isFocused = useIsFocused();

  const receivedData = route.params?.id;
  console.log('recieved Data in conversation', receivedData);

   useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, [isFocused]);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    // Fetch data one by one
    await getUserID();
    //await fetchUser();
    setLoading(false);
    // Once all data is fetched, set loading to false
  };

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        await fetchUserId(result);
        // console.log('ViewElseProfile user token retrieved of profile:', result);
      }

      /* console.log("User Id", userId);
      console.log("authToken", authToken); */
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchUserId = async tokens => {
    console.log('Token', tokens);
    const result3 = await AsyncStorage.getItem('userId ');
    if (result3 !== null) {
      setUserId(result3);

      console.log('user id retrieved:', result3);
      fetchUser(tokens, receivedData);
    } else {
      console.log('result is null', result3);
    }
  };
  const searches = [
    { id: 1, title: "On News" },
    { id: 2, title: "Open Letter" },
    { id: 3, title: "QAFI" },
    { id: 4, title: "GEBC" },
  ];

  const fetchUser = async (tokens, user) => {
    // console.log('Came to fetch Id');
    const token = tokens;

    try {
      const response = await fetch(base_url + `user/getUser/${user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      //console.log('Resultings', result.user);
      setName(result.user.username);
      setImage(result.user.image);
      setEmail(result.user.email);
      fetchMyVideos(tokens, user);
      fetchMyPicTour(tokens, user);
      fetchMyMarketZoneTour(tokens, user);
      fetchMyNews(tokens, user);
      fetchMyQAFI(tokens, user);
      fetchMyGEBC(tokens, user);
      fetchMySports(tokens, user);
      // fetchSignature(tokens, user);
      FetchMyLetter(tokens, user);
      fetchCinematic(tokens, user);
      fetchKidsVid(tokens, user);
      FetchtvProgmax(tokens, user);
      FetchlearningHobbies(tokens, user);
      FetchfanStar(tokens, user);
    } catch (error) {
      console.error("Error USER:", error);
    }
  };

  //---------------- VIDEOS OF MY PROFILE----------------\\

  const fetchMyVideos = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `xpi/getAllVideosByUser/${user}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      //console.log('Resultings', result.Videos);
      setVideos(result.Videos); // Update the state with the fetched data
      setTotalVideos(result.totalVideos);
      // fetchMyPicTour(tokens, user);
    } catch (error) {
      console.error("Error VIDEOS", error);
    }
  };

  const fetchMyPicTour = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `picTour/getAllPicToursByUser/${user}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings Tours', result.Tours);
      setPics(result.Tours); // Update the state with the fetched data
      setTotalPics(result.totalTours);
      // fetchMyMarketZoneTour(tokens, user);
    } catch (error) {
      console.error("Error PIC TOUR", error);
    }
  };

  const fetchMyMarketZoneTour = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(base_url + `item/getAllItemByUser/${user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      //console.log('Resultings', result.AllItems);
      setMarketZone(result.AllItems); // Update the state with the fetched data
      setTotalMarketZone(result.totalItems);
      // fetchMyNews(tokens, user);
    } catch (error) {
      console.error("Error MARKET ZONE:", error);
    }
  };

  const fetchMyNews = async (tokens, user) => {
    // console.log('TOKEN', tokens);
    // console.log('USER', user);
    const token = tokens;

    try {
      const response = await fetch(base_url + `news/getAllNewsByUser/${user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      // console.log('Resultings ON NEWS', result.News);
      const reversedNewData = result.News.reverse();
      setNews(reversedNewData); 
      // setNews(result.News); // Update the state with the fetched data
      setTotalNews(result.totalNews);
      // fetchMyQAFI(tokens, user);
    } catch (error) {
      console.error("Error ON NEWS", error);
    }
  };

  const fetchMyQAFI = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `qafi/getAllQafisByUser/${user}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      const reversedData = result.QAFIs.reverse();
      setQAFI(reversedData); 
      //console.log('Resultings', result.QAFIs);
      // setQAFI(result.QAFIs); // Update the state with the fetched data
      setTotalQAFI(result.totalQAFIs);
      // fetchMyGEBC(tokens, user);
    } catch (error) {
      console.error("Error MY QAFI", error);
    }
  };

  const fetchMyGEBC = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(base_url + `gebc/getAllGEBCByUser/${user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      const reversedData = result.GEBCs.reverse(); // Update the state with the fetched data
      setGEBC(reversedData);
      // console.log("Resultings", result.GEBCs);
      // setGEBC(result.GEBCs); // Update the state with the fetched data
      setTotalGEBC(result.totalGEBCs);
      // fetchCinematic(tokens, user)
      setLoading(false);
    } catch (error) {
      console.error("Error GEBC:", error);
    }
  };

  const fetchMySports = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `sports/getByUserId/${user}?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings sports in profile', result.sports);
      setSports(result.sports); // Update the state with the fetched data
      setTotalSports(result.totalSports);
    } catch (error) {
      console.error("Error PIC TOUR", error);
    }
  };

  const convertTimeAndDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: '2-digit',
      // minute: '2-digit',
    });
  };

  const FetchMyLetter = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `letter/getAllLetterByUser/${user}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      setLetter( result.AllLetters);
      // console.log('Resultings of letter', result.AllLetters);

      // const formattedLetters = result.AllLetters.map((letter) => ({
      //   ...letter,
      //   post_date: convertTimeAndDate(letter.post_date),
      // }));


      const formattedSignatures = result.AllLetters.map((signature) => {
        const imageUrl = signature.signature_image;
        let formattedUrl;
        if (imageUrl.startsWith("/fileUpload")) {
          formattedUrl = `https://watch-gotcha-be.mtechub.com${imageUrl}`;
        } else {
          formattedUrl = imageUrl;
        }
        const formattedDate = covertTimeAndDate(signature.post_date);
        return {
          ...signature,
          signature_image: formattedUrl,
          post_date: formattedDate,
        };

      });

      setLetter(formattedSignatures); // Update the state with the fetched data
      setTotalLetter(result.totalLetters);
      setLoading(false);
    } catch (error) {
      console.error("Error GEBC:", error);
    }
  };

  const covertTimeAndDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
    });
  };
  const fetchCinematic = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `cinematics/getByUserId/${user}?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of cinematic', result.videos);
      setCinematicVideos(result.videos); // Update the state with the fetched data
      setCinematicTotalVideos(result.totalVideos);
      // fetchKidsVid(tokens, user);
    } catch (error) {
      console.error("Error VIDEOS", error);
    }
  };

  const fetchKidsVid = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `kidVids/getByUserId/${user}?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of kids', result.videos);
      setKidsVideos(result.videos); // Update the state with the fetched data
      setKidsTotalVideos(result.totalVideos);
      // FetchtvProgmax(tokens, user);
    } catch (error) {
      console.error("Error VIDEOS", error);
    }
  };
  const FetchtvProgmax = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `tvProgmax/getByUserId/${user}?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of tvProgmax', result.totalVideos);
      setTVVideos(result.videos); // Update the state with the fetched data
      setTVTotalVideos(result.totalVideos);
      // FetchlearningHobbies(tokens, user);
    } catch (error) {
      console.error("Error VIDEOS", error);
    }
  };
  const FetchlearningHobbies = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `learningHobbies/getByUserId/${user}?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of learningHobbies', result.totalVideos);
      setLearningVideos(result.videos); // Update the state with the fetched data
      setLearningTotalVideos(result.totalVideos);
      // FetchfanStar(tokens, user);
    } catch (error) {
      console.error("Error VIDEOS", error);
    }
  };

  const FetchfanStar = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `fanStar/getByUserId/${user}?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of fanStar', result.totalVideos);
      setfanStarVideos(result.videos); // Update the state with the fetched data
      setfanStarTotalVideos(result.totalVideos);
      // fetchMyPicTour(tokens, user);
    } catch (error) {
      console.error("Error VIDEOS", error);
    }
  };


  const renderAvailableApps = (item) => {
    // console.log('Items Of Market', item.images[0].image);
    const imageUri = item.images[0].image;
    // console.log(imageUri);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetailsProfile", {
            ProductDetails: item,
            identifier: false,
          })
        }
        style={{ width: wp(35), margin: 5 }}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={{ uri: imageUri }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item?.description}
          </Text>
          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsPic = (item) => {
    // console.log('Items Pics', item);

    const imageUrl =
      item.image && item.image
        ? item.image.startsWith("/fileUpload")
          ? base_url + `${item.image}`
          : item.image
        : null;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ViewVideoPicProfile", {
            picData: item,
            identifier: false,
          })
        }
        style={{ width: wp(35), margin: 5 }}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={{ uri: imageUrl }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item?.description}
          </Text>
          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableSports = (item) => {
    // console.log('Items Pics', item);

    const imageUrl =
      item.image && item.image
        ? item.image.startsWith("/fileUpload")
          ? base_url + `${item.image}`
          : item.image
        : null;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SportsDetails", {
            SportsData: item,
            identifier: true,
          })
        }
        style={{ width: wp(35), margin: 5 }}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={{ uri: imageUrl }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item?.description}
          </Text>
          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsVideo = (item) => {
    // console.log('Video Items', item);
    return (
      <TouchableOpacity
        onPress={
          () =>
            navigation.navigate("ViewVideo", {
              videoData: item,
              identifier: false,
            })
          // navigation.navigate("ViewVideoProfile", { videoData: item })
        }
        style={{ width: wp(35), margin: 5 }}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={{ uri: item.thumbnail }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>

          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCinematicVideos = (item) => {
    // console.log('Video Items', item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Cinematics_details", {
            videoData: item,
            identifier: false,
          })
        }
        style={{ width: wp(35), margin: 5 }}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={{ uri: item.thumbnail }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>

          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };
  const renderKidsVideo = (item) => {
    // console.log('Video Items', item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Kids_vid_details", {
            videoData: item,
            identifier: false,
          })
        }
        style={{ width: wp(35), margin: 5 }}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={{ uri: item.thumbnail }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>

          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };
  const renderTVVideos = (item) => {
    // console.log('Video Items', item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Tv_Promax_details", {
            videoData: item,
            identifier: false,
          })
        }
        style={{ width: wp(35), margin: 5 }}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={{ uri: item.thumbnail }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>

          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };
  const renderLearnVideo = (item) => {
    // console.log('Video Items', item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Learning_details", {
            videoData: item,
            identifier: false,
          })
        }
        style={{ width: wp(35), margin: 5 }}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={{ uri: item.thumbnail }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>

          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };
  const renderFanstarVideo = (item) => {
    // console.log('Video Items', item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Fans_star_details", {
            videoData: item,
            identifier: false,
          })
        }
        style={{ width: wp(35), margin: 5 }}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={{ uri: item.thumbnail }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>

          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };

  // DISC

  const renderSearches = (item) => {
    // console.log('Items Of Searches', item);
    const isSelected = selectedItemId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedItemId(item.id);
          // console.log('Selected item:', item.id);
          if (item.id === 1) {
            // console.log('ITEMS NEWS CAllED');
            fetchMyNews(authToken, userId);
            setSelectedItemId(1);
          } else if (item.id === 2) {
            setSelectedItemId(2);
            FetchMyLetter(authToken, userId);

            // console.log('On Letter id', item.id);
          } else if (item.id === 3) {
            setSelectedItemId(3);
            fetchMyQAFI(authToken, userId);
          } else if (item.id === 4) {
            setSelectedItemId(4);
            fetchMyGEBC(authToken, userId);
          }
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  //------------------------\\

  //------------------------\\

  // GEBC COMP
  const GEBCCOMP = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: hp(15) }}>
          <View style={{ height: "100%" }}>
            {loading === true ? (
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
            ) : (
              <>
                {GEBC?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={GEBC}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  //--------------\\

  // QAFI COMP

  const QAFICOMP = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: hp(15) }}>
          <View style={{ height: "100%" }}>
            {loading === true ? (
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
            ) : (
              <>
                {QAFI?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={QAFI}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };
  //------------------\\

  // NEWS COMP

  const NEWSCOMP = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: hp(15) }}>
          <View style={{ height: "100%" }}>
            {loading === true ? (
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
            ) : (
              <>
                {news?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={news}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsNEWS(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };
  const LETTERC0MP = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: hp('18%') }}>
          <View style={{ height: "100%" }}>
            {loading === true ? (
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
            ) : (
              <>
                {news?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={letter}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderAvailableLetter(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  //----------------\\
  //RENDER GEBC

  const renderAvailableAppsGEBC = (item) => {
    // console.log('Items Of GEBC', item);
    const imageUri = item?.image;
    // console.log(imageUri);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewUpdateGEBC", { details: item , identifier: false })}
        style={{ width: wp(35), marginRight: 10 }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: hp(10),
            borderRadius: wp(1),
            resizeMode: "stretch",
            borderWidth: 1,
            borderColor: "grey",
          }}
        >
          <Text style={{ fontSize: hp(5) }}>{item.image}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(1), // Adjusted the marginTop to ensure it's within the visible area
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>

          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };

  //--------------------------\\

  //RENDER QAFI

  const renderAvailableAppsQAFI = (item) => {
    // console.log('Items Of QAFI', item?.image);
    const imageUri = item?.image;
    // console.log(imageUri);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewUpdateQAFI", { details: item , identifier: false})}
        style={{ width: wp(35), marginRight: 10  }}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={imageUri ? { uri: imageUri } : appImages.galleryPlaceHolder}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>

          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };

  //---------------------------\\

  //RENDER NEWS

  const renderAvailableAppsNEWS = (item) => {
    // console.log('Items Of NEWS', item?.image);
    const imageUri = item?.image;
    // console.log(imageUri);
    return (
      // <TouchableOpacity
      //   onPress={() => navigation.navigate('ViewUpdateNews', {details: item})}
      //   style={{width: wp(35), marginLeft: wp(3)}}>
      //   <View>
      //     {imageUri === null ? (
      //       <Image
      //         style={{
      //           position: 'absolute',
      //           top: 0,
      //           left: 0,

      //           zIndex: 1, // Ensure it's on top of other elements
      //           //flex: 1,
      //           width: '100%',
      //           height: hp(14),
      //           borderRadius: wp(3),
      //           resizeMode: 'cover',
      //         }}
      //         source={appImages.galleryPlaceHolder}
      //       />
      //     ) : (
      //       <Image
      //         style={{
      //           position: 'absolute',
      //           top: 0,
      //           left: 0,

      //           zIndex: 1, // Ensure it's on top of other elements
      //           //flex: 1,
      //           width: '100%',
      //           height: hp(14),
      //           borderRadius: wp(3),
      //           resizeMode: 'cover',
      //         }}
      //         source={{uri: imageUri}}
      //       />
      //     )}
      //   </View>

      //   <View
      //     style={{
      //       position: 'absolute',
      //       top: hp(10),
      //       left: 3,
      //       //height: hp(3),
      //       //width: wp(21),
      //       //borderRadius: wp(3),
      //       //backgroundColor: '#FACA4E',
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //       zIndex: 2, // Ensure it's on top
      //     }}>
      //     <Text
      //       style={{
      //         fontSize: hp(1.6),
      //         fontFamily: 'Inter',
      //         color: '#FFFFFF',
      //         fontWeight: '700',
      //       }}
      //       ellipsizeMode="tail"
      //       numberOfLines={1}>
      //       {item.description}
      //     </Text>
      //   </View>
      // </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ViewUpdateNews", { details: item,  identifier: false })}
        style={{ width: wp(35), marginRight: 10  }}
      >
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={imageUri ? { uri: imageUri } : appImages.galleryPlaceHolder}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>

          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
        {/* <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: "cover",
            }}
            source={{ uri: item.image }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: wp(2),
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              color: "#000000",
              fontFamily: "Inter-Regular",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>
        </View> */}
      </TouchableOpacity>
    );
  };
  // const renderSignatureItem = ({ item }) => (
  //   <View style={{ flexDirection: 'row',
  //     alignItems: 'center',

  //     padding: 10,
  //     backgroundColor: '#fff',
  //     borderRadius: 8,
  //     elevation: 2,}}>
  //     <Image source={{ uri: item.signature_image }} style={{  width: 30,
  //   height: 30,

  //  }} />
  //   </View>
  // );
  const renderAvailableLetter = (item) => {
    // console.log('Items Of Leeter render', item);
    const imageUri = item?.image;
    // console.log(imageUri);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("LetterDetails", {
            Letters: item,
            identifier: false,
          })
        }
        style={{
          width: wp(45),
          marginHorizontal: wp(2),
          marginVertical: hp(1),
          height: "100%",
        }} // Add margin here
      >
        <View
          style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
        ></View>
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 2,
              alignItems: "center",
              height: hp(4),
            }}
          >
            {item?.userimage !== null || item?.userimage !== undefined ? (
              <View
                style={{
                  height: hp(2),
                  width: wp(4),
                  borderRadius: wp(3),
                }}
              >
                <Image
                  source={{ uri: item?.userimage }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                />
              </View>
            ) : (
              <MaterialCommunityIcons
                style={{ marginTop: hp(0.5) }}
                name={"account-circle"}
                size={35}
                color={"#FACA4E"}
              />
            )}

            <View style={{ marginLeft: wp(2.5) }}>
              <Approved width={10} height={10} />
            </View>
          </View>

          <View
            style={{
              alignItems: "flex-end",
              marginTop: hp(-2),
              marginRight: wp(3),
            }}
          >
            <Text
              style={{
                color: "#282828",
                // marginLeft: wp(3),
                width: "25%",
                fontSize: 6,
                fontFamily: "Inter-Bold",
              }}
            >
              {item.post_date}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              height: hp(5),
paddingTop:6,
            }}
          >
            <Text
              style={{
                color: "#282828",
                fontSize: 8,
                textDecorationLine: "underline",
                fontFamily: "Inter-Bold",
              }}
            >
              Subject:
            </Text>
            <View style={{height:'90%',}}>
              <Text
                numberOfLines={3}
              ellipsizeMode="tail"
                style={{
                  color: "#595959",
                  marginLeft: wp(1),
                  fontSize: 8,
                  fontFamily: "Inter-Regular",
                }}
              >
                {item.subject_place}
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: 'flex-end',
              height: hp(6),

            }}
          >
            {item?.signature_image !== null || item?.signature_image !== undefined ? (
              <View
                style={{
                  height: hp(10),
                  width: wp(14),
                  borderRadius: wp(3),
                }}
              >
                <Image
                  source={{ uri: item?.signature_image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                />
              </View>
            ) : (
            null
            )}
            {/* <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={{
                color: "#595959",
                fontSize: 8,
                fontFamily: "Inter-Regular",
              }}
            >
              {item.body}
            </Text> */}
          </View>
          <View
            style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };

  //---------------------------\\

  // const data = [
  //   { id: "1", total: totalVideos, label: "Videos Mania" },
  //   { id: "2", total: totalPics, label: "Pic Tour" },
  //   {
  //     id: "3",
  //     total: totalNews + totalGEBC + totalQAFI + totalLetter,
  //     label: "DISC",
  //   },
  //   { id: "4", total: totalMarketZone, label: "Market Zone" },
  //   { id: "5", total: cinematictotalVideos, label: "Cinematics" },
  //   { id: "6", total: kidstotalVideos, label: "Kids-Vids" },
  //   { id: "7", total: tvtotalVideos, label: "TV ProgMax" },
  //   { id: "8", total: learningtotalVideos, label: "Learning and Hobbies" },
  //   { id: "9", total: fanStartotalVideos, label: "Fan Star Zone" },
  //   // Add more items as needed
  // ];

  const data = [
    { id: "1", total: totalVideos, label: "Videos Mania" },
    { id: "2", total: totalPics, label: "Pic Tour" },
    { id: "3", total: totalNews, label: "News" },
    { id: "4", total: totalLetter, label: "Open Letters" },
    { id: "5", total: totalQAFI, label: "QAFI" },
    { id: "6", total: totalGEBC, label: "EBC" },
    { id: "7", total: totalQAFI, label: "Sports" },
    // {
    //   id: "3",
    //   total: totalNews + totalGEBC + totalQAFI + totalLetter,
    //   label: "DISC",
    // },
    { id: "8", total: cinematictotalVideos, label: "Cinematics" },
    { id: "9", total: kidstotalVideos, label: "Kids-Vids" },
    { id: "10", total: tvtotalVideos, label: "TV ProgMax" },
    { id: "11", total: learningtotalVideos, label: "Learning & Hobbies" },
    { id: "12", total: fanStartotalVideos, label: "Fan Star Zone" },
    { id: "13", total: totalMarketZone, label: "Market Zone" },
    // Add more items as needed
  ];

  const renderItemforHeading = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.boldText}>{item.total}</Text>
      <Text style={styles.regularText}>{item.label}</Text>
    </View>
  );
  // //////////
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{ marginTop: hp(5), marginRight: wp(5) }}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          // showSettings={true}
          // onPressSettings={() => navigation.navigate("ProfileSettings")}
          showText={true}
          text={"Profile"}
        />
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(3),
            height: hp(21),
          }}
        >
          {image !== null ? (
            <View
              style={{
                width: wp(20),
                marginLeft: wp(0.5),
                height: wp(20),
                borderRadius: wp(20) / 2,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                  borderRadius: wp(20) / 2,
                }}
              />
            </View>
          ) : (
            <MaterialCommunityIcons
              style={{ marginTop: hp(0.5) }}
              name={"account-circle"}
              size={55}
              color={"#FACA4E"}
            />
          )}

          <Text
            style={{
              fontSize: hp(2.3),
              //marginLeft: wp(2),
              marginTop: hp(1.3),
              color: "#FACA4E",
              //fontWeight: 'bold',
              fontFamily: "Inter-Medium",
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              fontSize: hp(2),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Regular",
            }}
          >
            {email}
          </Text>
        </View>
        <FlatList
          horizontal
          data={data}
          renderItem={renderItemforHeading}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
        {/* <View
          style={{
            height: hp(6.5),
            marginTop: hp(1.5),
            marginHorizontal: wp(6),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: wp(30),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              {totalVideos}
            </Text>

            <Text
              style={{
                fontSize: hp(1.8),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              Video Mania
            </Text>
          </View>

          <View
            style={{
              width: wp(18),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              {totalPics}
            </Text>

            <Text
              style={{
                fontSize: hp(1.8),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              Pic Tour
            </Text>
          </View>

          <View
            style={{
              width: wp(18),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              {totalNews + totalGEBC + totalQAFI}
            </Text>

            <Text
              style={{
                fontSize: hp(1.8),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              DISC
            </Text>
          </View>

          <View
            style={{
              width: wp(21),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              {totalMarketZone}
            </Text>

            <Text
              style={{
                fontSize: hp(1.7),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              Marketpark
            </Text>
          </View>
        </View> */}

        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(5) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
             Video Mania
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading ? (
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
            ) : (
              <>
                {videos?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1, marginLeft: wp(-1.5) }}
                    showsHorizontalScrollIndicator={false}
                    data={videos}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsVideo(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
             Pic Tours
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading ? (
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
            ) : (
              <>
                {pics?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1, marginLeft: wp(-1.5) }}
                    data={pics}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsPic(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

{/* old disc with category */}
        {/* <View
          style={{ height: hp(23), marginHorizontal: wp(8), marginTop: hp(1) }}
        >
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            My Disc
          </Text>

          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searches}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderSearches(item)}
          />

          {selectedItemId === 1 ? (
            <NEWSCOMP />
          ) : selectedItemId === 2 ? (
            <LETTERC0MP />
          ) : selectedItemId === 3 ? (
            <QAFICOMP />
          ) : selectedItemId === 4 ? (
            <GEBCCOMP />
          ) : null}

    
        </View> */}

{/*  dics new module start to separate */}
      {/* News */}
      <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            News
          </Text>

          <View style={{ flex: 1 }}>
        <View style={{ height: hp(15), marginTop:5 }}>
          <View style={{ height: "100%" }}>
            {loading === true ? (
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
            ) : (
              <>
                {news?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={news}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsNEWS(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
        </View>

   {/* Open Letter  */}
   <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
           Open Letters
          </Text>

          <View style={{ flex: 1 }}>
        <View style={{ height: hp('18%') }}>
          <View style={{ height: "100%" }}>
            {loading === true ? (
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
            ) : (
              <>
                {news?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={letter}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderAvailableLetter(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
        </View>

 {/* QAFI  */}
 <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
          QAFI
          </Text>

          <View style={{ flex: 1 }}>
        <View style={{ height: hp(15),marginTop:5 }}>
          <View style={{ height: "100%" }}>
            {loading === true ? (
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
            ) : (
              <>
                {QAFI?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={QAFI}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
        </View>

         {/* EBC */}
         <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
         EBC
          </Text>

          <View style={{ flex: 1 }}>
        <View style={{ height: hp(15), marginTop:5 }}>
          <View style={{ height: "100%" }}>
            {loading === true ? (
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
            ) : (
              <>
                {GEBC?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={GEBC}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
        </View>

        {/* Other Sports */}
        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            My Sports
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading ? (
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
            ) : (
              <>
                {sports?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1, marginLeft: wp(-1.5) }}
                    data={sports}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderAvailableSports(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
     {/* dics new module end 6.8.2024 */}


       

        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            Cinematics
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading ? (
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
            ) : (
              <>
                {cinematicvideos?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1, marginLeft: wp(-1.5) }}
                    showsHorizontalScrollIndicator={false}
                    data={cinematicvideos}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderCinematicVideos(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            Kids Vids
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading ? (
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
            ) : (
              <>
                {kidsvideos?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1, marginLeft: wp(-1.5) }}
                    showsHorizontalScrollIndicator={false}
                    data={kidsvideos}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderKidsVideo(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            TV ProgMax
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading ? (
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
            ) : (
              <>
                {tvvideos?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1, marginLeft: wp(-1.5) }}
                    showsHorizontalScrollIndicator={false}
                    data={tvvideos}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderTVVideos(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            Learning & Hobbies
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading ? (
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
            ) : (
              <>
                {learningvideos?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1, marginLeft: wp(-1.5) }}
                    showsHorizontalScrollIndicator={false}
                    data={learningvideos}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderLearnVideo(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            Fan Star Zone
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading ? (
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
            ) : (
              <>
                {fanStarvideos?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1, marginLeft: wp(-1.5) }}
                    showsHorizontalScrollIndicator={false}
                    data={fanStarvideos}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => renderFanstarVideo(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        {/* market zone */}
        <View
          style={{ height: hp(23), marginHorizontal: wp(8), marginTop: hp(1) }}
        >
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            Market Zone
          </Text>

          {loading ? (
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
          ) : (
            <>
              {marketZone?.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                    No data available
                  </Text>
                </View>
              ) : (
                <FlatList
                  style={{ flex: 1, marginTop: hp(1), marginLeft: wp(-2) }}
                  showsHorizontalScrollIndicator={false}
                  data={marketZone}
                  horizontal
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => renderAvailableApps(item)}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchesDetails: {
    flexDirection: "row",
    marginLeft: wp(3),
    alignItems: "center",
    justifyContent: "center",
    width: wp(25),
    backgroundColor: "#F2F2F2",
    borderRadius: wp(5),
    height: hp(5),
  },
  textSearchDetails: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: hp(1.8),
  },
  flatListContainer: {
    // paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
  },
  itemContainer: {
    width: wp(30), // Adjusted width to fit approximately 4 items on the screen
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'green',
    // marginHorizontal: wp(1.5), // Reduced margin between items
    height: hp(9),
  },
  boldText: {
    fontSize: hp(2.5),
    color: "#1E2022",
    fontFamily: "Inter-Bold",
  },
  regularText: {
    fontSize: hp(1.8),
    color: "#77838F",
    fontFamily: "Inter-Regular",
  },
});
