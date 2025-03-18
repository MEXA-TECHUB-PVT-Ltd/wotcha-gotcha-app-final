// import {
//   StyleSheet,
//   FlatList,
//   Image,
//   Modal,
//   ActivityIndicator,
//   StatusBar,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Text,
//   View,
//   Dimensions,
//   Linking,
//   Platform
// } from "react-native";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP,
//   widthPercentageToDP as wp,
// } from "react-native-responsive-screen";
// import Entypo from "react-native-vector-icons/Entypo";
// import Headers from "../../../assets/Custom/Headers";
// import { appImages } from "../../../assets/utilities";
// //---------------- IMPORTS OF DASHBOARD ----------------------\\
// import Approved from "../../../assets/svg/Approved";
// import { InstalledApps, RNLauncherKitHelper } from "react-native-launcher-kit";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { useIsFocused } from "@react-navigation/native";

// //----------------- IMPORT VIDE0 -------------------\\
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import RBSheet from "react-native-raw-bottom-sheet";
// //----------------------------------------------------\\
// import CategoryActive from "../../../assets/svg/CategoryActive.svg";
// import CategoryInactive from "../../../assets/svg/CategoryInactive";
// import Add from "../../../assets/svg/AddMainScreen.svg";
// //------------------IMPORT OF DISC --------------------\\
// import NonVerified from "../../../assets/svg/NonVerified.svg";
// import CustomModal from "../../../assets/Custom/CustomModal";
// import { base_url } from "../../../../../baseUrl";
// import VideoActive from "../../../assets/svg/VideoActive";
// import ProfileActive from '../../../assets/svg/ProfileActive.svg';
// import MailActive from "../../../assets/svg/MailActive";
// import MarketActive from "../../../assets/svg/MarketActive";
// import Cinematiceactive from "../../../assets/svg/Cinematiceactive";
// import FansActive from "../../../assets/svg/FansActive";
// import KidsActive from "../../../assets/svg/KidsActive";
// import PuzzleActive from "../../../assets/svg/PuzzleActive";
// import TVpromaxActive from "../../../assets/svg/TVpromaxActive";
// import News from "react-native-vector-icons/Entypo";
// import LetterIcon from "react-native-vector-icons/Entypo";
// import QafiIcon from "react-native-vector-icons/FontAwesome5";
// import EBC from "react-native-vector-icons/MaterialCommunityIcons";
// import { fetchBannerConfig, fetchBannerInActive } from '../../../../../API';
// import { useTranslation } from 'react-i18next';
// import { fetchAllCinematicsCategory, fetchCinematicTopVideos, fetchSubCategory } from '../../../../../API';
// import BannerCarousel from "../../../assets/Custom/BannerCarousel";
// import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
// const screenHeight = Dimensions.get("window").height;
// const itemHeight = 450;

// const { width: viewportWidth } = Dimensions.get("window");

// const sliderWidth = viewportWidth * 0.9;

// export default function Dashboard({ route }) {
//   const navigation = useNavigation();
//   const [selectedItemId, setSelectedItemId] = useState(1);
//   const [dataApps, setDataApps] = useState([]);
//   const [isLongPress, setIsLongPress] = useState(false);
//   const [unUsedLocal, setUnUsedLocal] = useState([]);
//   const [unusedApps, setUnusedApps] = useState([]);
//   const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
//   const [isCancelRemoveModalVisible, setIsCancelRemoveModalVisible] =
//     useState(false);
//   const [isLongPressRemove, setIsLongPressRemove] = useState(false);
//   const [favouriteItem, setFavouriteItem] = useState(null);
//   const [removeFavouriteItem, setRemoveFavouriteItem] = useState(null);
//   const [favouriteData, setFavouriteData] = useState([]);
//   const isFocused = useIsFocused();
//   const [topData, setTopData] = useState([]);
//   const [modalDeleteApps, setModalDeleteApps] = useState(false);
//   const [modalDeleteFavouriteApps, setModalDeleteFavouriteApps] =
//     useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [aLoader, setAloader] = useState(false);
//   const scrollViewRef = useRef();
//   const { t } = useTranslation();
//   const [isSelectedActive, setIsSelectedActive] = useState(true);
//   const [categoryActive, setcategoryActive] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [ecommerance, setecommerance] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalVisible_b, setModalVisible_b] = useState(false);
//   const [modalVisible_sp, setModalVisible_sp] = useState(false);
//   const [modalVisible_e, setModalVisible_e] = useState(false);
//   const [modalVisible_d, setModalVisible_d] = useState(false);
//   const [modalVisible_fd, setModalVisible_fd] = useState(false);
//   const [modalVisible_sm, setModalVisible_sm] = useState(false);
//   const [modalVisible_mw, setModalVisible_mw] = useState(false);
//   const [modalVisible_g, setModalVisible_g] = useState(false);
//   const [modalVisible_em, setModalVisible_em] = useState(false);
//   const [selectedApps, setSelectedApps] = useState([]);
//   const [selectedApps_b, setSelectedApps_b] = useState([]);
//   const [selectedApps_sp, setSelectedApps_sp] = useState([]);
//   const [selectedApps_e, setSelectedApps_e] = useState([]);
//   const [selectedApps_d, setSelectedApps_d] = useState([]);
//   const [selectedApps_fd, setSelectedApps_fd] = useState([]);
//   const [selectedApps_sm, setSelectedApps_sm] = useState([]);
//   const [selectedApps_mw, setSelectedApps_mw] = useState([]);
//   const [selectedApps_g, setSelectedApps_g] = useState([]);
//   const [selectedApps_em, setSelectedApps_em] = useState([]);
//   const [savedApps, setSavedApps] = useState([]);
//   const [savedApps_b, setSavedApps_b] = useState([]);
//   const [savedApps_sp, setSavedApps_sp] = useState([]);
//   const [savedApps_e, setSavedApps_e] = useState([]);
//   const [savedApps_d, setSavedApps_d] = useState([]);
//   const [savedApps_fd, setSavedApps_fd] = useState([]);
//   const [savedApps_sm, setSavedApps_sm] = useState([]);
//   const [savedApps_mw, setSavedApps_mw] = useState([]);
//   const [savedApps_g, setSavedApps_g] = useState([]);
//   const [savedApps_em, setSavedApps_em] = useState([]);
//   const [snackbarVisible, setSnackbarVisible] = useState(false);
//   const [Sports, setSport] = useState(false);
//   const [Education, seteducation] = useState(false);
//   const [adsData, setAdsData] = useState([]);
//   const [adsInActiveData, setAdsInActiveData] = useState([]);
//   const [topNewsData, setTopNewsData] = useState([]);
//   const [carouselIndex, setCarouselIndex] = useState(0);
//   const [selectedNewsItemId, setSelectedNewsItemId] = useState(null);
//   const [selectedLetterItemId, setSelectedLetterItemId] = useState(1);
//   const [selectedQAFIItemId, setSelectedQAFIItemId] = useState(null);
//   const [selectedEBCItemId, setSelectedEBCItemId] = useState(null);

//   const [language, setLanguage] = useState(null);

//   useEffect(() => {
//     const fetchLanguage = async () => {
//       try {
//         const storedLanguage = await AsyncStorage.getItem("language");
//         if (storedLanguage) {
//           setLanguage(storedLanguage);
//           console.log('lanugage-------- in dash', storedLanguage)
//         }
//       } catch (error) {
//         console.error("Error fetching language:", error);
//       }
//     };

//     fetchLanguage();
//   }, []);

//   // const fetchAppData = useCallback(async () => {
//   //   try {
//   //     const cachedData = await AsyncStorage.getItem("installedApps");
//   //     // console.log('get install in async-------------', cachedData);
//   //     if (cachedData) {
//   //       // Use cached data if available
//   //       setDataApps(JSON.parse(cachedData));
//   //     } else {
//   //       // Fetch fresh data if no cache is available
//   //       const installedApps = InstalledApps.getSortedApps();
//   //       const packageNames = installedApps.map((app) => app.label);
//   //       const packageImages = installedApps.map((app) => app.icon);
//   //       const packageBundle = installedApps.map((app) => app.packageName);
//   //       const packageDataArray = packageNames.map((packageName, index) => ({
//   //         label: packageName,
//   //         bundle: packageBundle[index],
//   //         image: packageImages[index],
//   //       }));

//   //       setDataApps(packageDataArray);
//   //       await AsyncStorage.setItem("installedApps", JSON.stringify(packageDataArray));
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching installed apps:", error);
//   //   }
//   // }, []); // Empty dependency array to ensure it's only created once

//   // useEffect(() => {
//   //   fetchAppData(); // Call the memoized function inside useEffect
//   // }, [fetchAppData]);
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const cachedData = await AsyncStorage.getItem("installedApps");
//   //       if (cachedData) {
//   //         console.log('installedApps----------', cachedData.label)
//   //         // Use cached data if available
//   //         setDataApps(JSON.parse(cachedData));
//   //       } else {
//   //         // Fetch fresh data if no cache is available
//   //         const installedApps = InstalledApps.getSortedApps();
//   //         const packageNames = installedApps.map((app) => app.label);
//   //         const packageImages = installedApps.map((app) => app.icon);
//   //         const packageBundle = installedApps.map((app) => app.packageName);
//   //         const packageDataArray = packageNames.map((packageName, index) => ({
//   //           label: packageName,
//   //           bundle: packageBundle[index],
//   //           image: packageImages[index],
//   //         }));

//   //           setDataApps(packageDataArray);
//   //         await AsyncStorage.setItem("installedApps", JSON.stringify(packageDataArray));
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching installed apps:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   useEffect(() => {
//     const fetchInstalledAppData = async () => {
//       const installedApps = InstalledApps.getSortedApps();
//       const packageNames = installedApps.map((app) => app.label);
//       const packageImages = installedApps.map((app) => app.icon);
//       const packageBundle = installedApps.map((app) => app.packageName);
//       const packageDataArray = packageNames.map((packageName, index) => ({
//         label: packageName,
//         bundle: packageBundle[index],
//         image: packageImages[index],
//       }));

//       setDataApps(packageDataArray);
//       // setIsLoading(false);
//     };

//     fetchInstalledAppData();
//   }, []);

//   useEffect(() => {
//     const topSixItems = dataApps.slice(0, 6);
//     //   console.log('Top Six Item');
//     const saveTopData = async () => {
//       try {
//         const updatedTopData = topSixItems.map((item) => ({
//           ...item,
//           count: 2,
//         }));
//         await AsyncStorage.setItem("topData", JSON.stringify(updatedTopData));
//         setTopData(updatedTopData);
//       } catch (error) {
//         console.error("Error saving top data to AsyncStorage:", error);
//       }
//     };
//     saveTopData();
//   }, [dataApps]);
//   useEffect(() => {
//     //   if (isFocused) {
//     const loadFavouriteData = async () => {
//       try {
//         const storedData = await AsyncStorage.getItem("favouriteData");

//         if (storedData.length === 2) {

//           const initialFavouriteData = dataApps.slice(0, 4);
//           await AsyncStorage.setItem(
//             "favouriteData",
//             JSON.stringify(initialFavouriteData)
//           );
//           setFavouriteData(initialFavouriteData);
//         } else {
//           const parsedData = JSON.parse(storedData);
//           setFavouriteData(parsedData);

//         }
//       } catch (error) {
//         console.error("Error loading favourite data from AsyncStorage:", error);
//       }
//     };

//     loadFavouriteData();
//     //   }
//   }, []);

//   useEffect(() => {
//     //   if (isFocused) {
//     const saveFavouriteData = async () => {
//       try {
//         await AsyncStorage.setItem(
//           "favouriteData",
//           JSON.stringify(favouriteData)
//         );
//       } catch (error) {
//         console.error("Error saving favourite data to AsyncStorage:", error);
//       }
//     };
//     saveFavouriteData();
//     //   }
//   }, [favouriteData]);

//   useEffect(() => {
//     //   if (isFocused) {
//     const loadTopData = async () => {
//       try {
//         const storedData = await AsyncStorage.getItem("topData");
//         if (storedData) {
//           const parsedData = JSON.parse(storedData);
//           setTopData(parsedData);
//         }
//       } catch (error) {
//         console.error("Error loading top data from AsyncStorage:", error);
//       }
//     };

//     loadTopData();
//     //   }
//   }, []);

//   useEffect(() => {
//     //   if (isFocused) {
//     const saveTopData = async () => {
//       try {
//         await AsyncStorage.setItem("topData", JSON.stringify(topData));
//       } catch (error) {
//         console.error("Error saving top data to AsyncStorage:", error);
//       }
//     };

//     saveTopData();
//     //   }
//   }, [topData]);

//   useEffect(() => {
//     const fetchUsedData = async () => {
//       const lastUsageDate = new Date().toISOString();

//       const installedApps = InstalledApps.getSortedApps();
//       const packageNames = installedApps.map((app) => app.label);
//       const packageImages = installedApps.map((app) => app.icon);
//       const packageBundle = installedApps.map((app) => app.packageName);
//       const packageDataArray = packageNames.map((packageName, index) => ({
//         label: packageName,
//         bundle: packageBundle[index],
//         image: packageImages[index],
//         date: lastUsageDate,
//       }));

//       setUnusedApps(packageDataArray);

//       await AsyncStorage.setItem(
//         "comparisonDate",
//         JSON.stringify(packageDataArray)
//       );
//       // setIsLoading(false);
//     };

//     fetchUsedData();
//   }, []);

//   const filterUnusedApps = async (apps) => {
//     const currentDate = new Date();
//     const threeWeeksAgo = new Date(currentDate - 21 * 24 * 60 * 60 * 1000); // Three weeks ago

//     const unusedAppsData = [];

//     for (const app of apps) {
//       const storedAppInfo = await AsyncStorage.getItem(`appInfo_${app.label}`);
//       let appInfo;

//       if (storedAppInfo) {
//         appInfo = JSON.parse(storedAppInfo);
//       } else {
//         // Store app information for the first time
//         appInfo = {
//           label: app.label,
//           bundle: app.bundle,
//           image: app.image,
//         };

//         await AsyncStorage.setItem(`appInfo_${app.label}`, JSON.stringify(appInfo));
//       }

//       const lastUsageDate = await AsyncStorage.getItem(`lastUsageDate_${app.label}`);

//       if (!lastUsageDate || new Date(lastUsageDate) < threeWeeksAgo) {
//         unusedAppsData.push(appInfo);
//       }
//     }

//     return unusedAppsData;
//   };

//   useEffect(() => {
//     const checkUnusedApps = async () => {
//       const installedApps = InstalledApps.getSortedApps();
//       const filteredApps = await filterUnusedApps(installedApps);
//       setUnusedApps(filteredApps);
//     };

//     checkUnusedApps();
//   }, []);

//   const openunusedApp = async (item) => {
//     try {
//       await RNLauncherKitHelper.launchApplication(item.bundle);
//       const now = new Date().toISOString();
//       await AsyncStorage.setItem(`lastUsageDate_${item.label}`, now);

//       // Remove app from unused apps list
//       const updatedUnusedApps = unusedApps.filter(app => app.label !== item.label);
//       setUnusedApps(updatedUnusedApps);
//     } catch (error) {
//       console.error("Error opening the app:", error);
//     }
//   };

//   //------------------------------------------------------------\\
//   const openCategoryApp = async (app) => {
//     try {
//       console.log("Opening app-------------------:", app.bundle);

//       // Launch the application using its bundle ID
//       await RNLauncherKitHelper.launchApplication(app.bundle);

//       console.log("App launched successfully.");
//     } catch (error) {
//       console.error("Error launching the app:", error.message);
//     }
//   };

//   const renderApps = (item) => {
//     //console.log('item at first', item);
//     const openApp = async (items) => {
//       try {
//         // Check if the app is already in the topData array
//         const appIndex = topData.findIndex((app) => app.bundle === item.bundle);

//         if (appIndex !== -1) {
//           // If the app is already in the array, update the count
//           const updatedTopData = [...topData];
//           updatedTopData[appIndex] = {
//             ...updatedTopData[appIndex],
//             count: updatedTopData[appIndex].count + 1,
//           };

//           setTopData(updatedTopData);

//           await RNLauncherKitHelper.launchApplication(item.bundle);

//         } else {
//           // If the app is not in the array, add it with count 1
//           const randomIndex = Math.floor(Math.random() * 6); // Random index between 0 and 5
//           const updatedTopData = [...topData];
//           updatedTopData[randomIndex] = {
//             label: item.label,
//             bundle: item.bundle,
//             image: item.image,
//             count: 1,
//           };

//           setTopData(updatedTopData);

//           await RNLauncherKitHelper.launchApplication(item.bundle);
//         }
//       } catch (error) {
//         console.error("Error opening the app:", error);
//         await RNLauncherKitHelper.launchApplication(item.bundle);
//         // Your additional error handling logic here
//       }
//     };

//     return (
//       <TouchableOpacity
//         onLongPress={() => {
//           setIsLongPress(true);
//           setIsCancelModalVisible(true);
//           setFavouriteItem(item);
//         }}
//         onPress={() => openApp(item?.bundle)}
//         style={styles.items}
//       >
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <Text
//             style={{
//               color: "#000000",
//               textAlign: "center",
//               fontSize: hp(1.2),
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderAvailableApps = (item) => {
//     // Render the item only if count is equal to 2
//     if (item.count >= 2) {
//       return (
//         <View style={{ height: hp(8), padding: 5 }}>
//           <Image
//             style={{ width: wp(12), height: wp(12) }}
//             resizeMode="contain"
//             source={{ uri: `data:image/png;base64,${item?.image}` }}
//           />
//         </View>
//       );
//     } else {
//       // Return null or an empty view if count is not equal to 2
//       return (
//         <View style={{ height: hp(8), padding: 5 }}>
//           <Image
//             style={{ width: wp(12), height: wp(12) }}
//             resizeMode="contain"
//             source={appImages.logoTransparent}
//           />
//         </View>
//       );
//     }
//   };

//   const closeRequestModal = () => {
//     setIsLongPress(false);
//     setIsCancelModalVisible(false);
//   };

//   const closeRequestRemoveModal = () => {
//     setIsLongPressRemove(false);
//     setIsCancelRemoveModalVisible(false);
//   };

//   //--------------------Video---------------------------\\

//   const handleCancel = () => {
//     setModalDeleteApps(false);
//   };

//   const handleConfirm = () => {
//     if (removeFavouriteItem) {
//       const updatedInstallData = dataApps.filter(
//         (item) => item.bundle !== removeFavouriteItem.bundle
//       );
//       setModalDeleteApps(false);
//       setDataApps(updatedInstallData);
//     } else {
//       setModalDeleteApps(false);
//       console.log("CANCEL");
//     }
//   };

//   const handleCancelFavourite = () => {
//     setModalDeleteFavouriteApps(false);
//   };

//   const handleConfirmFavourite = () => {
//     if (removeFavouriteItem) {
//       // Check if the item already exists in favouriteData
//       const isItemInFavourites = favouriteData.some(
//         (item) => item.bundle === removeFavouriteItem.bundle
//       );

//       if (isItemInFavourites) {
//         // Item already exists, remove it from favouriteData
//         const updatedFavouriteData = favouriteData.filter(
//           (item) => item.bundle !== removeFavouriteItem.bundle
//         );
//         setFavouriteData(updatedFavouriteData);
//         setModalDeleteFavouriteApps(false);
//       } else {

//         setFavouriteData((prevData) => [...prevData, favouriteItem]);
//         setModalDeleteFavouriteApps(false);
//       }
//     } else {
//       console.log("NO APPS FOUND");
//     }
//   };

//   const fetchDataForVisibleComponent = async () => {
//     await fetchDataIfVisible(fetchCategoryMarket);
//     await fetchDataIfVisible(fetchAllMarket);
//     await fetchDataIfVisible(fetchElectronicsMarket);
//     await fetchDataIfVisible(fetchVehiclesMarket);
//     await fetchDataIfVisible(fetchClothingMarket);
//   };

//   const fetchDataIfVisible = async (fetchFunction) => {
//     if (isComponentVisible()) {
//       try {
//         await fetchFunction();
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchDataForVisibleComponent();
//   }, []);

//   const isComponentVisible = () => {
//     if (!scrollViewRef || !scrollViewRef.current) return false;

//     const scrollY = scrollViewRef.current.contentOffset?.y || 0;
//     const screenHeight = scrollViewRef.current.clientHeight || 0;

//     const marketComponentTop = 0; // Top of the market component
//     const marketComponentBottom = marketComponentTop + screenHeight; // Bottom of the market component

//     return (
//       marketComponentTop >= scrollY &&
//       marketComponentBottom <= scrollY + screenHeight
//     );
//   };
//   /////////////////////////////////////////////////////////////////////////Main return start hai 28/5/2024

//   //////////////////////////////2.6.2025

//   // const [data, setData] = useState([]);
//   // const [loading, setLoading] = useState(new Array(4).fill(false));

//   const [error, setError] = useState(null);
//   const [authToken, setAuthToken] = useState(null);

//   const [categoriesSelectMarket, setCategorySelectMarket] = useState([]);

//   const RegionArea = [gic
//     { name: "Africa", french_name: "Afrique" },
//     { name: "Europe", french_name: "Europe" },
//     { name: "Americas", french_name: "Amériques" },
//     { name: "Asia", french_name: "Asie" },
//     { name: "Middle East", french_name: "Moyen-Orient" }
//   ];

//   const MassApp = [
//     t('Ecommerce'),
//     t('Business'),
//     t('cateSports'),
//     t('Education'),
//     t('Dating'),
//     t('FoodDelivery'),
//     t('SocialMedia'),
//     t('MedicalWellness'),
//     t('Grocery'),
//     t('Employment')
//   ];

//   const containerHeight = Math.min(screenHeight * 0.8, itemHeight);

//   // xpi video start
//   // Fetch all data when authToken is set and screen is focused
//   const [Xpisearches, setXpiSearches] = useState([]);
//   const [DataTopXpiData, setDataTopXpiData] = useState([]);
//   const [selectedXpiItemId, setSelectedXpiItemId] = useState(null);
//   const [isXpiLoading, setIsXpiLoading] = useState(false);
//   const [noXpiData, setNoXpiData] = useState(false);
//   const [Xpisections, setXpiSections] = useState([]);

//   useEffect(() => {

//       fetchAllCinematicsCategory();
//       // fetchTopSport();
//       fetchTopXpiVideos(selectedXpiItemId);
//       fetchSubCategoryXpiVideo(selectedXpiItemId);

//   }, [authToken, selectedXpiItemId]);

//   // Fetch categories
//   const fetchAllCinematicsCategory = async () => {
//     setIsXpiLoading(true)
//     try {
//       const response = await fetch(`${base_url}videoCategory/getAllVideoCategories`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();

//       const categories = result.AllCategories.reverse();
//       // console.log(' videoooooooooooooooo...............', categories)
//       setXpiSearches(categories); // Update the state with the fetched data

//       if (selectedXpiItemId === null && categories.length > 0) {
//         setSelectedXpiItemId(categories[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching categories fetchAllCinematicsCategory:", error);
//     }
//     setIsXpiLoading(false)
//   };

//   // Fetch top sports
//   const fetchTopXpiVideos = async (selectedXpiItemId) => {
//     const token = authToken;
//     setIsXpiLoading(true)
//     try {
//       const response = await fetch(
//         base_url + `top/getAllTopVideosByCategory/${selectedXpiItemId}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       const result = await response.json();
//       setDataTopXpiData(result.AllVideos[0]); // Update the state with the fetched data
//     } catch (error) {
//       console.error('Error top:', error);
//     }
//     setIsXpiLoading(false)
//   };

//   // Fetch sub-category sports
//   const fetchSubCategoryXpiVideo = async (selectedXpiItemId) => {
//     setIsXpiLoading(true)
//     try {
//       const response = await fetch(`${base_url}xpi/getAllVideosBycategory/${selectedXpiItemId}`, {
//       // const response = await fetch(`${base_url}xpi/getAllVideosBycategory/${selectedXpiItemId}?page=1&limit=100000`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();
//       if (Array.isArray(result.data) && result.data.length > 0) {
//         const formattedSections = result.data.map(category => ({
//           // title: category.sub_category_name,
//           title:
//           language === "fr" && category.sub_category_french_name
//               ? category.sub_category_french_name
//               : category.sub_category_name,
//           data: category.video_result.Videos,
//         }));
//         setXpiSections(formattedSections);
//         setNoXpiData(formattedSections.every(section => section.data.length === 0));
//       } else {
//         setXpiSections([]);
//         setNoXpiData(true);
//       }
//     } catch (error) {
//       console.error("Error fetching sub-category sports:", error);
//       setNoXpiData(true); // Assume no data on error
//     }
//     setIsXpiLoading(false)
//   };

//   const renderSearchesVideo = (item) => {
//     const isSelected = selectedXpiItemId === item.id;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             // backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//             backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
//           },
//         ]}
//         onPress={() => {
//           setSelectedXpiItemId(item.id); // Update selectedItemVideoId when item is selected
//           console.log("Selected item:", item.id);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {name}
//           {/* {item.name} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderXpiVideoItem = ({ item }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('ViewVideo', { videoData: item, identifier: false })}>
//       <View style={styles.itemContainer}>

//         <View>
//           {item.thumbail === '' ||
//             item.thumbnail === null ||
//             // item.thumbnail.startsWith('/') ||
//             item.thumbnail === undefined ? (
//             <Image
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,

//                 zIndex: 1, // Ensure it's on top of other elements
//                 //flex: 1,
//                 width: '100%',
//                 height: hp(12),
//                 borderRadius: wp(1),
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
//                 height: hp(12),
//                 borderRadius: wp(1),
//                 resizeMode: 'cover',
//               }}
//               source={{ uri: item.thumbnail }}
//             />
//           )}
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginLeft: wp(0.5),
//             marginTop: hp(12.5),
//           }}>
//           <Text
//             numberOfLines={1}
//             ellipsizeMode="tail"
//             style={{
//               fontSize: hp(1.5),
//               fontFamily: 'Inter-Regular',
//               color: '#000000',
//               width: wp(23),
//             }}>
//             {item.description}
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderXpiVideoSection = ({ item }) => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeader}>{item.title}</Text>
//       {item.data.length === 0 ? (
//         <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
//       ) : (
//         <FlatList
//           data={item.data}
//           renderItem={renderXpiVideoItem}
//           keyExtractor={(videoItem) => videoItem.video_id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );

//   // Pic Module start
//   const [Picsearches, setPicSearches] = useState([]);
//   const [DataTopPicData, setDataTopPicData] = useState([]);
//   const [selectedPicItemId, setSelectedPicItemId] = useState(null);
//   const [isPicLoading, setIsPicLoading] = useState(false);
//   const [noPicData, setNoPicData] = useState(false);
//   const [Picsections, setPicSections] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
// const [hasMoreData, setHasMoreData] = useState(true);
// const [loadingMore, setLoadingMore] = useState(false);
//   useEffect(() => {
//     const getMainCategory = async () => {
//       setIsPicLoading(true);
//       try {
//         const response = await fetch(`${base_url}picCategory/getAllPicCategories`, {
//         // const response = await fetch(`${base_url}picCategory/getAllPicCategories?page=1&limit=10000`, {
//           method: "GET",
//           headers: { Authorization: `Bearer ${authToken}` },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         setPicSearches(result.AllCategories);

//         // Set the first item as the default selected item if no item is currently selected
//         if (selectedPicItemId === null && result.AllCategories.length > 0) {
//           setSelectedPicItemId(result.AllCategories[0].id);
//         }
//       } catch (error) {
//         console.error("Error fetching categories getAllPicCategories:", error);
//       } finally {
//         setIsPicLoading(false);
//       }
//     };

//     getMainCategory();
//   }, [authToken]);

//   // Fetch all data when authToken is set and screen is focused
//   useEffect(() => {

//       // fetchAllCinematicsCategory();
//       fetchTopForPics(selectedPicItemId);
//       fetchSubCategorySport(selectedPicItemId);

//   }, [authToken, selectedPicItemId, ]);

//   const fetchTopForPics = async (selectedPicItemId) => {
//     const token = authToken;
//     try {
//       const response = await fetch(
//         base_url + `top/app/top_tour/${selectedPicItemId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // Check if result and result.topTour are defined and not null
//       if (result && result.topTour && result.topTour.length > 0) {
//         // console.log("Response result:", result.topTour[0]);
//         setDataTopPicData(result.topTour[0]); // Update the state with the fetched data
//       } else {
//         // console.error('No topTour data available');
//         setDataTopPicData([]);
//         // console.log("Response result:", []); // Set to an empty array or handle as needed
//       }
//     } catch (error) {
//       console.error("Error for Top:", error);
//     }
//   };

//   // Fetch sub-category sports
//   const fetchSubCategorySport = async (selectedPicItemId, page = 1) => {
//     const limit = 20; // Define the number of items per page
//     const isFirstPage = page === 1;

//     isFirstPage ? setIsPicLoading(true) : setLoadingMore(true);
//     // setIsPicLoading(true)
//     try {
//       // const response = await fetch(`${base_url}picTour/getAllPicTourByCategory/${selectedPicItemId}?page=1&limit=100000`, {
//       const response = await fetch(`${base_url}picTour/getAllPicTourByCategory/${selectedPicItemId}?page=${page}&limit=${limit}`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();

//       if (Array.isArray(result.data) && result.data.length > 0) {
//         const formattedSections = result.data.map(category => ({
//           // title: category.sub_category_name,
//           title:
//           language === "fr" && category.sub_category_french_name
//               ? category.sub_category_french_name
//               : category.sub_category_name,
//           data: category.tour_result.Tours,
//         }));

//         // setPicSections(formattedSections);
//         setPicSections((prevSections) =>
//           isFirstPage ? formattedSections : [...prevSections, ...formattedSections]
//         );
//         setHasMoreData(result.data.length === limit);
//         setNoPicData(formattedSections.every(section => section.data.length === 0));
//       } else {
//         // setPicSections([]);
//         if (isFirstPage) setPicSections([]);
//         setHasMoreData(false);
//         setNoPicData(true);
//       }
//     } catch (error) {
//       console.error("Error fetching sub-category sports:", error);
//       setNoPicData(true); // Assume no data on error
//     }
//     // setIsPicLoading(false)
//     isFirstPage ? setIsPicLoading(false) : setLoadingMore(false);
//   };

//   const renderSearchesPic = (item) => {
//     const isSelected = selectedPicItemId === item.id;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             // backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//             backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
//           },
//         ]}
//         onPress={() => {
//           setSelectedPicItemId(item.id);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {name}
//           {/* {item.name} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderPicsItem = ({ item }) => (

//     <TouchableOpacity onPress={() => navigation.navigate("PicDetails", { picData: item })}>
//       <View style={styles.itemContainer}>
//         <Image source={{ uri: item.image }} style={styles.image} />
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             height: hp(7),
//             width: wp(25),
//           }}
//         >
//           {item?.user_image ? (
//             <View
//               style={{
//                 width: wp(7),
//                 marginLeft: wp(0.5),
//                 height: wp(7),
//                 overflow: "hidden",
//                 borderRadius: wp(7) / 2,
//               }}
//             >
//               <Image
//                 source={{ uri: item?.user_image }}
//                 style={{ width: "100%", height: "100%", resizeMode: "cover" }}
//               />
//             </View>
//           ) : (
//             <View
//               style={{
//                 width: wp(7),
//                 marginLeft: wp(0.5),
//                 height: wp(7),
//                 borderRadius: wp(7) / 2,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <MaterialCommunityIcons
//                 // style={{marginTop: hp(0.5)}}
//                 name={"account-circle"}
//                 size={24}
//                 color={"#FACA4E"}
//               />
//               {/*  <Image
//             source={appImages.profileImg}
//             style={{width: '100%', height: '100%', resizeMode: 'cover'}}
//           /> */}
//             </View>
//           )}

//           <View style={{ width: 70 }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={1}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(0.7),
//                 color: "#000000",
//                 fontWeight: "bold",
//                 fontFamily: "Inter",
//               }}
//             >
//               {item.name}
//             </Text>
//           </View>
//           {/* <View style={{ marginLeft: wp(1) }}>
//             <NonVerified />
//           </View> */}
//         </View>

//         {/* <Text  ellipsizeMode="tail"
//                 numberOfLines={1} style={styles.text}>{item.name}</Text>
//       <Text  ellipsizeMode="tail"
//                 numberOfLines={2} style={styles.text1}>{item.description}</Text> */}
//       </View>
//     </TouchableOpacity>
//   );

//   const renderPicsSection = ({ item }) => (
//     // console.log('item----', item.data)
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeader}>{item.title}</Text>
//       {item.data.length === 0 ? (
//         <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
//       ) : (
//         <FlatList
//           data={item.data}
//           renderItem={renderPicsItem}
//           keyExtractor={(videoItem) => videoItem.tour_id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );

//   //New Render start
//   const renderNewsSearches = (item) => {
//     // console.log('Items', item);
//     const isSelected = selectedNewsItemId === item.id;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//           },
//         ]}
//         onPress={() => {
//           setSelectedNewsItemId(item.id);

//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {name}
//           {/* {item.name} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const [topLetterData, setTopLetterData] = useState('');
//   const [letterLoading, setLetterLoading] = useState(false);
//   const fetchTopLetter = async () => {
//     setLetterLoading(true);
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url + "top/app/top_letter",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // console.log('Resultings of TopNews', result.topitem);
//       //Alert.alert(result)
//       setTopLetterData(result.topitem[0] || '');
//       // const formattedLetters = result.topitem.map((letter) => ({
//       //   ...letter,
//       //   post_date: convertTimeAndDate(letter.post_date),
//       // }));
//       // // console.log('Resultings of setLetterLoading', result.topitem);
//       // setTopLetterData(formattedLetters[0]); // Update the state with the fetched data
//       // fetchSpecificSig(formattedLetters[0].signature_id)
//     } catch (error) {
//       setLetterLoading(false);
//       console.error("Error Trending:", error);
//     }
//   };

// //  Post Letter Function Start
// const [letterselectedItemId, setLetterSelectedItemId] = useState(null);
// const [lettersearchesData, setLetterSearchesData] = useState([]);
// const [lettersections, setLetterSections] = useState([]);
// const [noletterData, setNoLetterData] = useState(false);
// const [postletterloading, setPostLetterLoading] = useState(false);

// const [currentLetterPage, setCurrentLetterPage] = useState(1);
// const [hasMoreLetterData, setHasMoreLetterData] = useState(true);
// const [loadingMoreLetters, setLoadingMoreLetters] = useState(false);
//  // Fetch all data when authToken is set and screen is focused
//  useEffect(() => {
//   if (authToken) {
//     fetchAllLetterCategory();
//     fetchLetterSubCategorySport(letterselectedItemId);
//   }
// }, [authToken, letterselectedItemId]);

//     // Fetch categories
//     const fetchAllLetterCategory = async () => {
//       setPostLetterLoading(true)
//       try {
//         const response = await fetch(`${base_url}discCategory/getAllDiscCategories`, {
//         // const response = await fetch(`${base_url}discCategory/getAllDiscCategories?page=1&limit=100000`, {
//           method: "GET",
//           headers: { Authorization: `Bearer ${authToken}` },
//         });
//         const result = await response.json();

//         const reverseData = result.AllCategories;
//         setLetterSearchesData(reverseData);

//         if (letterselectedItemId === null && result.AllCategories.length > 0) {
//           setLetterSelectedItemId(result.AllCategories[0].id);
//         }
//       } catch (error) {
//         console.error("Error fetching categories fetchAllLetterCategory:", error);
//       }
//       setPostLetterLoading(false)
//     };

//         // Fetch sub-category sports
//   const fetchLetterSubCategorySport = async (letterselectedItemId , page = 1) => {
//     // setPostLetterLoading(true)
//     const limit = 20; // Define the number of items per page
//     const isFirstPage = page === 1;

//     isFirstPage ? setPostLetterLoading(true) : setLoadingMoreLetters(true);
//     try {
//       // const response = await fetch(`${base_url}news/getAllNewsByCategory/${selectedItemId}?page=1&limit=100000`, {
//       const response = await fetch(`${base_url}letter/getAllLetterByCategory/${letterselectedItemId}?page=${page}&limit=${limit}`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();
//       if (Array.isArray(result.data) && result.data.length > 0) {
//         const formattedSections = result.data.map(category => ({
//           // title: category.sub_category_name,
//           title:
//           language === "fr" && category.sub_category_french_name
//               ? category.sub_category_french_name
//               : category.sub_category_name,
//           data: category.total_result.letters,
//         }));

//         // setLetterSections(formattedSections);
//         setLetterSections((prevSections) =>
//           isFirstPage ? formattedSections : [...prevSections, ...formattedSections]
//         );
//         setHasMoreLetterData(result.data.length === limit);
//         // console.log('data for sub cater haioiii', formattedSections)
//         setNoLetterData(formattedSections.every(section => section.data.length === 0));
//       } else {
//         // setLetterSections([]);
//         if (isFirstPage) setLetterSections([]);
//       setHasMoreLetterData(false);
//         setNoLetterData(true);
//       }
//     } catch (error) {
//       console.error("Error fetching sub-category sports:", error);
//       setNoLetterData(true); // Assume no data on error
//     }
//     // setPostLetterLoading(false)
//     isFirstPage ? setPostLetterLoading(false) : setLoadingMoreLetters(false);
//   };

//   const renderPostLetterSearches = (item) => {
//     const isSelected = letterselectedItemId === item.id;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//           },
//         ]}
//         onPress={() => {
//           setLetterSelectedItemId(item.id);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {name}
//           {/* {item.name} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderLetterSection = ({ item }) => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeader}>{item.title}</Text>
//       {item.data.length === 0 ? (
//         <Text style={styles.noDataText}>{t('NoDataAvailable')}</Text>
//       ) : (
//       <FlatList
//         data={item.data}
//         renderItem={renderPublicGeneral}
//         keyExtractor={(videoItem) => videoItem.post_id.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//       />
//     )}
//     </View>
//   );

//   const renderPublicGeneral = (item) => {
//     const post_date = convertTimeAndDate(item.item.post_date);
//     // const imageUrl = item.signature_id;
//     const imageUrl = item.item.signature_image
//       ? item.item.signature_image.startsWith("/fileUpload") ||
//       item.item.signature_image.startsWith("/signatureImages")
//         ? base_url + item.item.signature_image
//         : item.item.signature_image
//       : null;
//       // console.log('user data --------item ', imageUrl)
//     const userimageUrl = item.item.user_image
//       ? item.item.userimage.startsWith("/userImage")
//         ? base_url + item.item.user_image
//         : item.item.user_image
//       : null;

//     return (
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate("LetterDetails", {
//             Letters: item.item,
//             identifier: false,
//           })
//         }
//         style={{
//           width: wp(45),
//           marginHorizontal: wp(2),
//         }} // Add margin here
//       >
//         <View
//           style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
//         ></View>
//         <View>
//           <View
//             style={{
//               flexDirection: "row",
//               paddingHorizontal: 2,
//               alignItems: "center",
//               height: hp(4),
//             }}
//           >
//             {item.item?.user_image !== null ||
//             item.item?.user_image !== undefined ||
//             userimageUrl !== null ||
//             userimageUrl !== undefined ? (
//               <View
//                 style={{
//                   height: hp(2),
//                   width: wp(4),
//                   borderRadius: wp(3),
//                 }}
//               >
//                 <Image
//                   source={{ uri: item.item?.user_image || userimageUrl }}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: wp(3),
//                     resizeMode: "cover",
//                   }}
//                 />
//               </View>
//             ) : (
//               <MaterialCommunityIcons
//                 style={{ marginTop: hp(0.5) }}
//                 name={"account-circle"}
//                 size={35}
//                 color={"#FACA4E"}
//               />
//             )}

//             <View style={{ marginLeft: wp(2.5) }}>
//               <Approved width={10} height={10} />
//             </View>
//           </View>

//           <View
//             style={{
//               alignItems: "flex-end",
//               height: 10,
//               // marginRight: wp(1),
//             }}
//           >
//             <Text
//               style={{
//                 color: "#282828",
//                 // marginLeft: wp(3),
//                 width: "25%",
//                 fontSize: 6,
//                 fontFamily: "Inter-Bold",
//               }}
//             >
//               {post_date}
//             </Text>
//           </View>

//           <View
//             style={{
//               flexDirection: "row",
//               height: hp(5),
//               paddingTop: 6,
//               // backgroundColor:'red', width:'60%'
//             }}
//           >
//             <Text
//               style={{
//                 color: "#282828",
//                 fontSize: 8,
//                 textDecorationLine: "underline",
//                 fontFamily: "Inter-Bold",
//               }}
//             >
//               {t('Subject')}
//               {/* Subject: */}
//             </Text>
//             <View style={{ height: "100%", width: "75%" }}>
//               <Text
//                 numberOfLines={3}
//                 ellipsizeMode="tail"
//                 style={{
//                   color: "#595959",
//                   marginLeft: wp(1),
//                   fontSize: 8,
//                   fontFamily: "Inter-Regular",
//                 }}
//               >
//                 {item.item.subject_place}
//               </Text>
//             </View>
//           </View>

//           <View
//             style={{
//               justifyContent: "center",
//               alignItems: "flex-end",
//               height: hp(6),
//               right: 10,
//             }}
//           >
//             {imageUrl !== null ||
//             imageUrl !== undefined ||
//             item.item.signature_image !== undefined ||
//             item.item.signature_image !== null ? (
//               <View
//                 style={{
//                   height: hp(5),
//                   width: wp(9),
//                   borderRadius: wp(3),
//                 }}
//               >
//                 <Image
//                   source={{ uri: imageUrl || item.item.signature_image }}
//                   style={{
//                     width: "100%",
//                     height: "100%",

//                     resizeMode: "contain",
//                   }}
//                 />
//               </View>
//             ) : null}
//           </View>
//           <View
//             style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
//           ></View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

// const convertTimeAndDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     // hour: '2-digit',
//     // minute: '2-digit',
//   });
// };

//   const renderQAFISearches = (item) => {
//     // console.log('Items', item);
//     const isSelected = selectedQAFIItemId === item.id;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//           },
//         ]}
//         onPress={() => {
//           setSelectedQAFIItemId(item.id);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {name}
//           {/* {item.name} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderEBCSearches = (item) => {
//     // console.log('Items', item);
//     const isSelected = selectedEBCItemId === item.id;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//           },
//         ]}
//         onPress={() => {
//           setSelectedEBCItemId(item.id);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {name}
//           {/* {item.name} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   useEffect(() => {
//     const getAuthToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem("authToken ");
//         if (token) {
//           setAuthToken(token);
//           console.log('user token-------', token)
//         } else {
//           throw new Error("No auth token found");
//         }
//       } catch (err) {
//         console.error("Error retrieving auth token:", err);
//         setError(err);
//       }
//     };

//     getAuthToken();
//   }, []);

//   // useEffect(() => {
//   //   if (authToken) {
//   //     const fetchSequentialData = async () => {
//   //       const marketId = selectedItemIdMarket || "Africa";

//   //       const fetchFunctions = [

//   //         fetchElectronicsMarket, // 16   13   1
//   //         fetchVehiclesMarket, // 17   14   2
//   //         fetchClothingMarket, // 18   15  3
//   //         fetchAllMarket, // 19    16   4

//   //       ];

//   //       let newData = [];
//   //       setLoading((prevload) => {
//   //         if (!Array.isArray(prevload)) {
//   //           prevload = new Array(4).fill(false);
//   //         }
//   //         return prevload.map((item, index) => (index === 0 ? true : item));
//   //       });
//   //       for (let i = 0; i < fetchFunctions.length; i++) {
//   //         try {
//   //           const result = await fetchFunctions[i](
//   //             authToken,
//   //             marketId,
//   //             // DiscId
//   //           );
//   //           newData = [...newData, result];
//   //           setData(newData);
//   //           setLoading((prevload) => {
//   //             if (!Array.isArray(prevload)) {
//   //               prevload = new Array(4).fill(false);
//   //             }
//   //             return prevload.map((item, index) =>
//   //               index === i ? false : index === i + 1 ? true : item
//   //             );
//   //           });
//   //         } catch (err) {
//   //           setError(err);
//   //           setLoading((prevload) => {
//   //             if (!Array.isArray(prevload)) {
//   //               prevload = new Array(4).fill(false);
//   //             }
//   //             return prevload.map((item, index) => (index === i ? false : item));
//   //           });
//   //           break;

//   //         }
//   //       }
//   //     };

//   //     fetchSequentialData();
//   //   }
//   // }, [
//   //   authToken,
//   //   selectedItemIdMarket,
//   // ]);

//   useEffect(() => {
//     if (authToken) {

//       fetchTopMarket();
//       fetchBanners();
//       fetchCategoryMarket();
//       fetchTopLetter()
//       // fetchLetterPublicGeneralLetter();
//     }
//   }, [authToken]);

//   const fetchBanners = async () => {
//     setIsLoading(true);
//     try {
//       const [activeBannersResult, inactiveBannersResult] = await Promise.all([
//         fetchBannerConfig(authToken, base_url),
//         fetchBannerInActive(authToken, base_url)
//       ]);

//       setAdsData(activeBannersResult.AllBanners || []);
//       setAdsInActiveData(inactiveBannersResult || []);
//     } catch (error) {
//       console.error("Error fetching banners:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const [cinLoading, setCinLoading] = useState(false);
//   const [fanLoading, setfanLoading] = useState(false);
//   const [kidLoading, setKidLoading] = useState(false);
//   const [learnLoading, setLearnLoading] = useState(false);
//   const [tvLoading, setTvLoading] = useState(false);
//   const [Cinematicdata, setCinematicData] = useState([]);
//   const [fandata, setFanData] = useState([]);
//   const [kiddata, setKidData] = useState([]);
//   const [learndata, setLearnData] = useState([]);
//   const [tvdata, setTvData] = useState([]);
//   const [selectedCinematicItemId, setSelectedCinematicItemId] = useState(null);
//   const [selectedFanstarItemId, setSelectedFanStarItemId] = useState(null);
//   const [selectedKidItemId, setSelectedKidItemId] = useState(null);
//   const [selectedlearnItemId, setSelectedLearnItemId] = useState(null);
//   const [selectedtvItemId, setSelectedTvItemId] = useState(null);
//   const [dataTopVideos, setDataTopVideos] = useState([]);
//   const [dataTopFanVideos, setDataFanTopVideos] = useState([]);
//   const [dataKidTopVideos, setDataKidTopVideos] = useState([]);
//   const [datalearnTopVideos, setDataLearnTopVideos] = useState([]);
//   const [datatvTopVideos, setDataTvTopVideos] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [fansections, setFanSections] = useState([]);
//   const [kidsections, setKidSections] = useState([]);
//   const [learnsections, setLearnSections] = useState([]);
//   const [tvsections, setTvSections] = useState([]);
//   const [noData, setNoData] = useState(false);

//   useEffect(() => {

//       fetchAllCineCategory();

//   }, [authToken]);

//   const fetchAllCineCategory = async () => {

//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url + "cinematics/category/getAll",
//         // base_url + "cinematics/category/getAll?page=1&limit=1000",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       setCinematicData(result.AllCategories); // Update the state with the fetched data
//       if (result.AllCategories.length > 0) {
//         setSelectedCinematicItemId(result.AllCategories[0].id);
//       }
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   useEffect(() => {
//     if (authToken) {
//       fetchAllCineData();
//     }
//   }, [authToken, selectedCinematicItemId]);

//   const fetchAllCineData = async () => {
//     setCinLoading(true);
//     setNoData(false);
//     try {
//       // await fetchAllCinematicsCategory();
//       await fetchCineTopVideos();
//       await fetchCineSubCategory(selectedCinematicItemId);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setCinLoading(false);
//     }
//   };

//   const fetchCineTopVideos = async () => {
//     // console.log("Categry in id", selectedItemId);
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url + "cinematics/getTopVideo",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       //  console.log("getTopVideo------..", result.data);
//       setDataTopVideos(result.data);
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchCineSubCategory = async (selectedCinematicItemId) => {
//     const token = authToken;

//     try {
//       const response = await fetch(
//         `${base_url}cinematics/getByCategory/${selectedCinematicItemId}`,
//         // `${base_url}cinematics/getByCategory/${selectedCinematicItemId}?page=1&limit=1000`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();

//       if (Array.isArray(result.data) && result.data.length > 0) {
//         const formattedSections = result.data.map(category => ({
//           // title: category.sub_category_name,
//           title:
//           language === "fr" && category.sub_category_french_name
//               ? category.sub_category_french_name
//               : category.sub_category_name,
//           data: category.video_result.videos,
//         }));

//         setSections(formattedSections);
//         const hasNoData = formattedSections.every(section => section.data.length === 0);
//         setNoData(hasNoData);
//       } else {
//         setSections([]);
//         setNoData(true);
//       }
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       setNoData(true);  // Assume no data on error
//     }
//   };

//   useEffect(() => {

//       fetchAllFanStarCategory();

//   }, [authToken]);

//   const fetchAllFanStarCategory = async () => {
//     //console.log("Categry in id", selectedItemId)
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url + "fanStar/category/getAll",
//         // base_url + "fanStar/category/getAll?page=1&limit=1000",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // console.log("AllCategories---", result.AllCategories);
//       const categories = result.AllCategories;
//       setFanData(result.AllCategories); // Update the state with the fetched data

//       if (categories.length > 0) {
//         // Set the first category ID as selected
//         setSelectedFanStarItemId(categories[0].id);
//       }
//     } catch (error) {
//       console.error("Error Trending for all category:", error);
//     }
//   };

//   useEffect(() => {
//     if (authToken) {
//       fetchAllFanData();
//     }
//   }, [authToken, selectedFanstarItemId]);

//   const fetchAllFanData = async () => {
//     setfanLoading(true);
//     setNoData(false);
//     try {
//       // await fetchAllCinematicsCategory();
//       await fetchTopFanVideos();
//       await fetchFanSubCategory(selectedFanstarItemId);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setfanLoading(false);
//     }
//   };

//   const fetchTopFanVideos = async () => {
//     // console.log("Categry in id", selectedItemId);
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url + "fanStar/getTopVideo",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       //  console.log("getTopVideo------..", result.data);
//       setDataFanTopVideos(result.data);
//     } catch (error) {
//       console.error("Error Trending for top:", error);
//     }
//   };

//   const fetchFanSubCategory = async (selectedFanstarItemId) => {
//     const token = authToken;

//     try {
//       const response = await fetch(
//         `${base_url}fanStar/getByCategory/${selectedFanstarItemId}`,
//         // `${base_url}fanStar/getByCategory/${selectedFanstarItemId}?page=1&limit=100000`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();

//       if (Array.isArray(result.data) && result.data.length > 0) {
//         const formattedSections = result.data.map(category => ({
//           // title: category.sub_category_name,
//           title:
//           language === "fr" && category.sub_category_french_name
//               ? category.sub_category_french_name
//               : category.sub_category_name,
//           data: category.video_result.videos,
//         }));

//         // Reverse the titles
//         const reversedSections = formattedSections.reverse();
//         // console.log('results---', formattedSections);
//         setFanSections(reversedSections);

//         // Check if there is no data
//         const hasNoData = formattedSections.every(section => section.data.length === 0);
//         setNoData(hasNoData);
//       } else {
//         setFanSections([]);
//         setNoData(true);
//       }
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       setNoData(true);  // Assume no data on error
//     }
//   };

//   useEffect(() => {

//       if (selectedKidItemId == null) {
//         setSelectedKidItemId(9);
//       }
//       fetchAllKidsCategory();

//   }, [authToken]);

//   useEffect(() => {
//     if (authToken) {
//       fetchAllKidData();
//     }
//   }, [authToken, selectedKidItemId]);

//   const fetchAllKidData = async () => {
//     setKidLoading(true);
//     setNoData(false);
//     try {
//       // await fetchAllCinematicsCategory();
//       await fetchKidTopVideos();
//       await fetchKidsSubCategory(selectedKidItemId);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setKidLoading(false);
//     }
//   };

//   const fetchAllKidsCategory = async () => {
//     //console.log("Categry in id", selectedItemId)
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url + "kidVids/category/getAll",
//         // base_url + "kidVids/category/getAll?page=1&limit=1000",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // console.log("AllCategories---", result.AllCategories);
//       setKidData(result.AllCategories); // Update the state with the fetched data
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchKidTopVideos = async () => {
//     // console.log("Categry in id", selectedItemId);
//     const token = authToken;

//     try {
//       const response = await fetch(base_url + "kidVids/getTopVideo", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const result = await response.json();
//       // console.log("getTopVideo------..", result.data);
//       setDataKidTopVideos(result.data);
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchKidsSubCategory = async (selectedKidItemId) => {
//     const token = authToken;

//     try {
//       const response = await fetch(
//         `${base_url}kidVids/getByCategory/${selectedKidItemId}`,
//         // `${base_url}kidVids/getByCategory/${selectedKidItemId}?page=1&limit=10000`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();

//       if (Array.isArray(result.data) && result.data.length > 0) {
//         const formattedSections = result.data.map((category) => ({
//           // title: category.sub_category_name,
//           title:
//           language === "fr" && category.sub_category_french_name
//               ? category.sub_category_french_name
//               : category.sub_category_name,
//           data: category.video_result.videos,
//         }));

//         // Reverse the titles
//         const reversedSections = formattedSections.reverse();
//         // console.log('results---', formattedSections);
//         setKidSections(reversedSections);

//         // Check if there is no data
//         const hasNoData = formattedSections.every(
//           (section) => section.data.length === 0
//         );
//         setNoData(hasNoData);
//       } else {
//         setKidSections([]);
//         setNoData(true);
//       }
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       setNoData(true); // Assume no data on error
//     }
//   };

//   useEffect(() => {

//       if (selectedlearnItemId == null) {
//         setSelectedLearnItemId(10)
//       }
//       fetchAllLearnCategory();

//   }, [authToken]);

//   useEffect(() => {
//     if (authToken) {
//       fetchAllLearnData();
//     }
//   }, [authToken, selectedlearnItemId]);

//   const fetchAllLearnData = async () => {
//     setLearnLoading(true);
//     setNoData(false);
//     try {
//       // await fetchAllCinematicsCategory();
//       await fetchLearnTopVideos();
//       await fetchLearnSubCategory(selectedlearnItemId);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLearnLoading(false);
//     }
//   };

//   const fetchAllLearnCategory = async () => {
//     //console.log("Categry in id", selectedItemId)
//     const token = authToken;

//     try {
//       const response = await fetch(

//         base_url + "learningHobbies/category/getAll",
//         // base_url + "learningHobbies/category/getAll?page=1&limit=10000",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // console.log("AllCategories---", result.AllCategories);
//       setLearnData(result.AllCategories); // Update the state with the fetched data
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchLearnTopVideos = async () => {
//     // console.log("Categry in id", selectedItemId);
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url + "learningHobbies/getTopVideo",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       //  console.log("getTopVideo------..", result.data);
//       setDataLearnTopVideos(result.data);
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchLearnSubCategory = async (selectedlearnItemId) => {
//     const token = authToken;

//     try {
//       const response = await fetch(

//         `${base_url}learningHobbies/getByCategory/${selectedlearnItemId}`,
//         // `${base_url}learningHobbies/getByCategory/${selectedlearnItemId}?page=1&limit=10000`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();

//       if (Array.isArray(result.data) && result.data.length > 0) {
//         const formattedSections = result.data.map(category => ({
//           // title: category.sub_category_name,
//           title:
//           language === "fr" && category.sub_category_french_name
//               ? category.sub_category_french_name
//               : category.sub_category_name,
//           data: category.video_result.videos,
//         }));

//         // Reverse the titles
//         const reversedSections = formattedSections.reverse();
//         // console.log('results---', reversedSections);
//         setLearnSections(reversedSections);

//         // Check if there is no data
//         const hasNoData = formattedSections.every(section => section.data.length === 0);
//         setNoData(hasNoData);
//       } else {
//         setLearnSections([]);
//         setNoData(true);
//       }
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       setNoData(true);  // Assume no data on error
//     }
//   };

//   const dismissSnackbar = () => {
//     setSnackbarVisible(false);
//   };

//   useEffect(() => {

//       if (selectedtvItemId == null) {
//         setSelectedTvItemId(17)
//       }
//       fetchAllTvCategory();

//   }, [authToken]);

//   useEffect(() => {
//     if (authToken) {
//       fetchAllTvData();
//     }
//   }, [authToken, selectedtvItemId]);

//   const fetchAllTvData = async () => {
//     setTvLoading(true);
//     setNoData(false);
//     try {
//       // await fetchAllCinematicsCategory();
//       await fetchTvTopVideos();
//       await fetchTvSubCategory(selectedtvItemId);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setTvLoading(false);
//     }
//   };
//   const fetchAllTvCategory = async () => {
//     //console.log("Categry in id", selectedItemId)
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url + "tvProgmax/category/getAll",
//         // base_url + "tvProgmax/category/getAll?page=1&limit=10000",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // console.log("AllCategories---", result.AllCategories);
//       setTvData(result.AllCategories); // Update the state with the fetched data
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchTvTopVideos = async () => {
//     // console.log("Categry in id", selectedItemId);
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url + "tvProgmax/getTopVideo",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       setDataTvTopVideos(result.data);
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchTvSubCategory = async (selectedtvItemId) => {
//     const token = authToken;

//     try {
//       const response = await fetch(
//         `${base_url}tvProgmax/getByCategory/${selectedtvItemId}`,
//         // `${base_url}tvProgmax/getByCategory/${selectedtvItemId}?page=1&limit=10000`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();

//       if (Array.isArray(result.data) && result.data.length > 0) {
//         const formattedSections = result.data.map(category => ({
//           // title: category.sub_category_name,
//           title:
//           language === "fr" && category.sub_category_french_name
//               ? category.sub_category_french_name
//               : category.sub_category_name,
//           data: category.video_result.videos,
//         }));

//         // Reverse the titles
//         const reversedSections = formattedSections.reverse();
//         // console.log('results---', reversedSections);
//         setTvSections(reversedSections);

//         // Check if there is no data
//         const hasNoData = formattedSections.every(section => section.data.length === 0);
//         setNoData(hasNoData);
//       } else {
//         setTvSections([]);
//         setNoData(true);
//       }
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       setNoData(true);  // Assume no data on error
//     }
//   };

//   const renderTvVideoItem = ({ item }) => (
//     // <TouchableOpacity onPress={handle_details}>
//     <TouchableOpacity onPress={() => navigation.navigate('Tv_Promax_details', { videoData: item })}>
//       <View style={styles.itemContainer}>
//         {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
//         <Image source={{ uri: item.thumbnail }} style={styles.image} />
//         <Text ellipsizeMode="tail"
//           numberOfLines={1} style={styles.nametext}>{item.name}</Text>
//         <Text ellipsizeMode="tail"
//           numberOfLines={2} style={styles.text1}>{item.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderTvSection = ({ item }) => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeader}>{item.title}</Text>
//       {item.data.length === 0 ? (
//         <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
//       ) : (
//         <FlatList
//           data={item.data}
//           renderItem={renderTvVideoItem}
//           keyExtractor={(videoItem) => videoItem.video_id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );

//   //DISC///////////////////////////////////////////////////////////////////////////////// new dics api 7/7/2024
//   // Fetch all data when authToken is set and screen is focused
//   const [searchesNewsData, setSearchesNewsData] = useState([]);
//   const [newLoader, setNewLoader] = useState(false);
//   const [Newsections, setNewsSections] = useState([]);
//   const [noNewData, setNoNewsData] = useState(false);
//   useEffect(() => {

//       fetchAllNewsCategory();
//       fetchTopSport();
//       fetchSubCategoryNews(selectedNewsItemId);

//   }, [authToken, selectedNewsItemId,]);

//   // Fetch categories
//   const fetchAllNewsCategory = async () => {
//     setNewLoader(true);
//     try {
//       const response = await fetch(`${base_url}news/category/getAll`, {
//       // const response = await fetch(`${base_url}news/category/getAll?page=1&limit=10000`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();
//       const reverseData = result.AllCategories.reverse();
//       setSearchesNewsData(reverseData);
//       if (selectedNewsItemId === null && result.AllCategories.length > 0) {
//         setSelectedNewsItemId(result.AllCategories[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching categories fetchAllNewsCategory:", error);
//     }
//     setNewLoader(false);
//   };

//   // Fetch top sports
//   const fetchTopSport = async () => {
//     setNewLoader(true);
//     try {
//       const response = await fetch(`${base_url}news/getTopNews`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();
//       // console.log('what news top,', result.data)
//       setTopNewsData(result.data);
//     } catch (error) {
//       console.error("Error fetching top sports:", error);
//     }
//     setNewLoader(false);
//   };

//   // Fetch sub-category sports
//   const fetchSubCategoryNews = async (categoryId) => {
//     setNewLoader(true);
//     try {
//       const response = await fetch(`${base_url}news/getAllNewsByCategory/${categoryId}`, {
//       // const response = await fetch(`${base_url}news/getAllNewsByCategory/${categoryId}?page=1&limit=100000`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();
//       if (Array.isArray(result.data) && result.data.length > 0) {
//         const formattedSections = result.data.map(category => ({
//           // title: category.sub_category_name,
//           title:
//           language === "fr" && category.sub_category_french_name
//               ? category.sub_category_french_name
//               : category.sub_category_name,
//           data: category.news_result.News,
//         }));
//         setNewsSections(formattedSections);
//         setNoNewsData(formattedSections.every(section => section.data.length === 0));
//       } else {
//         setNewsSections([]);
//         setNoNewsData(true);
//       }
//     } catch (error) {
//       console.error("Error fetching sub-category sports:", error);
//       setNoNewsData(true); // Assume no data on error
//     }
//     setNewLoader(false);
//   };

//   const renderNewsItem = ({ item }) => (
//     // <TouchableOpacity onPress={handle_details}>
//     <TouchableOpacity onPress={() => navigation.navigate("ViewNews", { picData: item })}>
//       <View style={styles.itemContainer}>
//         {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
//         <Image source={{ uri: item.image }} style={styles.image} />
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             height: hp(7),
//             width: wp(25),
//           }}
//         >
//           {item?.user_image ? (
//             <View
//               style={{
//                 width: wp(7),
//                 marginLeft: wp(0.5),
//                 height: wp(7),
//                 overflow: "hidden",
//                 borderRadius: wp(7) / 2,
//               }}
//             >
//               <Image
//                 source={{ uri: item?.user_image }}
//                 style={{ width: "100%", height: "100%", resizeMode: "cover" }}
//               />
//             </View>
//           ) : (
//             <View
//               style={{
//                 width: wp(7),
//                 marginLeft: wp(0.5),
//                 height: wp(7),
//                 borderRadius: wp(7) / 2,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <MaterialCommunityIcons
//                 // style={{marginTop: hp(0.5)}}
//                 name={"account-circle"}
//                 size={24}
//                 color={"#FACA4E"}
//               />

//             </View>
//           )}

//           <View style={{ width: 70 }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={1}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(0.7),
//                 color: "#000000",
//                 fontWeight: "bold",
//                 fontFamily: "Inter",
//               }}
//             >
//               {item.username}
//             </Text>
//           </View>
//           <View style={{ marginLeft: wp(1) }}>
//             <NonVerified />
//           </View>
//         </View>

//       </View>
//     </TouchableOpacity>
//   );

//   const renderNewsSection = ({ item }) => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeader}>{item.title}</Text>
//       {item.data.length === 0 ? (
//         <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
//       ) : (
//         <FlatList
//           data={item.data}
//           renderItem={renderNewsItem}
//           keyExtractor={(videoItem) => videoItem.news_id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );

//   // QAFI API for Category and sub start 9.9.2024
//   // Fetch all data when authToken is set and screen is focused
//   const [searchesQAFIData, setSearchesQAFIData] = useState([]);
//   const [QAFIsections, setQAFISections] = useState([]);
//   const [noQAFIData, setNoQAFIData] = useState(false);
//   const [TopQAFIData, setTopQAFIData] = useState([]);
//   const [QAFILoading, setQAFILoading] = useState(false);

//   useEffect(() => {

//       fetchAllQAFICategory();
//       fetchTopQAFI();
//       fetchSubCategoryQAFI(selectedQAFIItemId);

//   }, [authToken, selectedQAFIItemId]);

//   // Fetch categories
//   const fetchAllQAFICategory = async () => {
//     setQAFILoading(true)
//     try {
//       const response = await fetch(`${base_url}qafi/category/getAll`, {
//       // const response = await fetch(`${base_url}qafi/category/getAll?page=1&limit=10000`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();
//       const reverseData = result.AllCategories.reverse();
//       setSearchesQAFIData(reverseData);

//       if (selectedQAFIItemId === null && result.AllCategories.length > 0) {
//         setSelectedQAFIItemId(result.AllCategories[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching categories fetchAllQAFICategory:", error);
//     }
//     setQAFILoading(false)
//   };

//   // Fetch top sports
//   const fetchTopQAFI = async () => {
//     setQAFILoading(true)
//     try {
//       const response = await fetch(`${base_url}qafi/getTopQafi`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();
//       setTopQAFIData(result.data);
//     } catch (error) {
//       console.error("Error fetching top sports:", error);
//     }
//     setQAFILoading(false)
//   };

//   // Fetch sub-category sports
//   const fetchSubCategoryQAFI = async (selectedQAFIItemId) => {
//     setQAFILoading(true)
//     try {
//       const response = await fetch(`${base_url}qafi/getAllQafisByCategory/${selectedQAFIItemId}`, {
//       // const response = await fetch(`${base_url}qafi/getAllQafisByCategory/${selectedQAFIItemId}?page=1&limit=100000`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();

//       if (Array.isArray(result.data) && result.data.length > 0) {
//         const formattedSections = result.data.map(category => ({
//           // title: category.sub_category_name,
//           title:
//           language === "fr" && category.sub_category_french_name
//               ? category.sub_category_french_name
//               : category.sub_category_name,
//           data: category.QAFI_result.QAFIs,
//         }));

//         setQAFISections(formattedSections);

//         // console.log('sub cate hai---', formattedSections)
//         setNoQAFIData(formattedSections.every(section => section.data.length === 0));
//       } else {
//         setQAFISections([]);
//         setNoQAFIData(true);
//       }
//     } catch (error) {
//       console.error("Error fetching sub-category sports:", error);
//       setNoQAFIData(true); // Assume no data on error
//     }
//     setQAFILoading(false)
//   };

//   const renderQAFIItem = ({ item }) => (
//     // <TouchableOpacity onPress={handle_details}>
//     <TouchableOpacity onPress={() => navigation.navigate("ViewQAFI", { picData: item })}>
//       <View style={styles.itemContainer}>

//         <View>
//           <Image
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               zIndex: 1, // Ensure it's on top of other elements
//               //flex: 1,
//               width: "100%",
//               height: hp(12),
//               borderRadius: wp(1),
//               resizeMode: "cover",
//             }}
//             source={{ uri: item.image }}
//           />
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             marginTop: hp(12),
//             height: hp(7),
//             width: wp(25),
//           }}
//         >
//           {item?.user_image ? (
//             <View
//               style={{
//                 width: wp(7),
//                 marginLeft: wp(0.5),
//                 height: wp(7),
//                 overflow: "hidden",
//                 borderRadius: wp(7) / 2,
//               }}
//             >
//               <Image
//                 source={{ uri: item?.user_image }}
//                 style={{ width: "100%", height: "100%", resizeMode: "cover" }}
//               />
//             </View>
//           ) : (
//             <View
//               style={{
//                 width: wp(7),
//                 marginLeft: wp(0.5),
//                 height: wp(7),
//                 borderRadius: wp(7) / 2,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <MaterialCommunityIcons
//                 // style={{marginTop: hp(0.5)}}
//                 name={"account-circle"}
//                 size={24}
//                 color={"#FACA4E"}
//               />

//             </View>
//           )}

//           <View style={{ width: 70 }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={1}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(0.7),
//                 color: "#000000",
//                 fontWeight: "bold",
//                 fontFamily: "Inter",
//               }}
//             >
//               {item.username}
//             </Text>
//           </View>

//           <View style={{ marginLeft: wp(1) }}>
//             <NonVerified />
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderQAFISection = ({ item }) => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeader}>{item.title}</Text>
//       {item.data.length === 0 ? (
//         <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
//       ) : (
//         <FlatList
//           data={item.data}
//           renderItem={renderQAFIItem}
//           keyExtractor={(videoItem) => videoItem.qafi_id.toString()}
//           // keyExtractor={(videoItem, index) => index.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );

//   // ebc api Category and sub 9/9/2024
//   // Fetch all data when authToken is set and screen is focused
//   const [searchesEBCData, setSearchesEBCData] = useState([]);
//   const [EBCsections, setEBCSections] = useState([]);
//   const [noEBCData, setNoEBCData] = useState(false);
//   const [TopEBCData, setTopEBCData] = useState([]);
//   const [EBCLoading, setEBCLoading] = useState(false);

//   useEffect(() => {

//       fetchAllEBCCategory();
//       fetchTopEBC();
//       fetchSubCategoryEBC(selectedEBCItemId);

//   }, [authToken, selectedEBCItemId]);

//   // Fetch categories
//   const fetchAllEBCCategory = async () => {
//     setEBCLoading(true)
//     try {
//       const response = await fetch(`${base_url}gebc/category/getAll`, {
//       // const response = await fetch(`${base_url}gebc/category/getAll?page=1&limit=10000`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();
//       const reverseData = result.AllCategories.reverse();
//       setSearchesEBCData(reverseData);
//       // if (result.AllCategories.length > 0) {
//       //   setSelectedItemId(result.AllCategories[0].id);
//       // }
//       if (selectedEBCItemId === null && result.AllCategories.length > 0) {
//         setSelectedEBCItemId(result.AllCategories[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching categories fetchAllEBCCategory:", error);
//     }
//     setEBCLoading(false)
//   };

//   // Fetch top sports
//   const fetchTopEBC = async () => {
//     setEBCLoading(true)
//     try {
//       const response = await fetch(`${base_url}gebc/getTopGebc`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();
//       setTopEBCData(result.data);
//     } catch (error) {
//       console.error("Error fetching top sports:", error);
//     }
//     setEBCLoading(false)
//   };

//   // Fetch sub-category sports
//   const fetchSubCategoryEBC = async (selectedEBCItemId) => {
//     setEBCLoading(true)
//     try {
//       const response = await fetch(`${base_url}gebc/getAllGEBCsByCategory/${selectedEBCItemId}`, {
//       // const response = await fetch(`${base_url}gebc/getAllGEBCsByCategory/${selectedEBCItemId}?page=1&limit=100000`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const result = await response.json();
//       if (Array.isArray(result.data) && result.data.length > 0) {
//         const formattedSections = result.data.map(category => ({
//           // title: category.sub_category_name,
//           title:
//           language === "fr" && category.sub_category_french_name
//               ? category.sub_category_french_name
//               : category.sub_category_name,
//           data: category.GEBC_result.GEBCs,
//         }));
//         setEBCSections(formattedSections);
//         setNoEBCData(formattedSections.every(section => section.data.length === 0));
//       } else {
//         setEBCSections([]);
//         setNoEBCData(true);
//       }
//     } catch (error) {
//       console.error("Error fetching sub-category sports:", error);
//       setNoEBCData(true); // Assume no data on error
//     }
//     setEBCLoading(false)
//   };

//   const renderEBCItem = ({ item }) => (
//     // <TouchableOpacity onPress={handle_details}>
//     <TouchableOpacity onPress={() => navigation.navigate("ViewGEBC", { picData: item })}>
//       <View style={styles.itemContainer}>
//         <View
//           style={{
//             width: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//             height: hp(10),
//             borderRadius: wp(1),
//             resizeMode: "stretch",
//             borderWidth: 1, // Border width
//             borderColor: "grey", // Border color
//           }}
//         >
//           <Text style={{ fontSize: hp(5) }}>{item.image}</Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             height: hp(7),
//             width: wp(25),
//           }}
//         >
//           {item?.user_image ? (
//             <View
//               style={{
//                 width: wp(7),
//                 marginLeft: wp(0.5),
//                 height: wp(7),
//                 overflow: "hidden",
//                 borderRadius: wp(7) / 2,
//               }}
//             >
//               <Image
//                 source={{ uri: item?.user_image }}
//                 style={{ width: "100%", height: "100%", resizeMode: "cover" }}
//               />
//             </View>
//           ) : (
//             <View
//               style={{
//                 width: wp(7),
//                 marginLeft: wp(0.5),
//                 height: wp(7),
//                 borderRadius: wp(7) / 2,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <MaterialCommunityIcons
//                 // style={{marginTop: hp(0.5)}}
//                 name={"account-circle"}
//                 size={24}
//                 color={"#FACA4E"}
//               />

//             </View>
//           )}

//           <View style={{ width: 70 }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={1}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(0.7),
//                 color: "#000000",
//                 fontWeight: "bold",
//                 fontFamily: "Inter",
//               }}
//             >
//               {item.username}
//             </Text>
//           </View>
//           <View style={{ marginLeft: wp(1) }}>
//             <NonVerified />
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderEBCSection = ({ item }) => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeader}>{item.title}</Text>
//       {item.data.length === 0 ? (
//         <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
//       ) : (
//         <FlatList
//           data={item.data}
//           renderItem={renderEBCItem}
//           keyExtractor={(videoItem) => videoItem.gebc_id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );

//   // fetch Market start
//   // console.log('market ki id aaaii-----------', selectedItemIdMarket)

//   const [selectedItemIdMarket, setSelectedItemIdMarket] = useState(null);
//   const [dataElectronics, setDataElectronics] = useState([]);
//   const [allMarket, setAllmarket] = useState([]);
//   const [dataVehicles, setDataVehicles] = useState([]);
//   const [dataClothing, setDataClothing] = useState([]);
//   const [marketLoding, setMarketLoading] = useState([]);
//   useEffect(() => {

//       // Ensure selectedItemId has a value
//       if (selectedItemIdMarket === null) {
//         setSelectedItemIdMarket("Africa");
//       }

//       setMarketLoading(true);

//       fetchAll(selectedItemIdMarket);
//       fetchElectronics(selectedItemIdMarket);
//       fetchVehicles(selectedItemIdMarket);
//       fetchClothing(selectedItemIdMarket);

//       setMarketLoading(false);

//   }, [authToken, selectedItemIdMarket]);

//   const [DataTopVideosMarket, setDataTopVideosMarket] = useState([]);
//   const fetchTopMarket = async () => {
//     const token = authToken;
//     try {
//       const response = await fetch(base_url + "top/app/top_item", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       // console.log('top market hai--', result.topitem[0])
//       // return result.topitem[0];
//       setDataTopVideosMarket(result.topitem[0]);
//     } catch (error) {
//       console.error("Error in fetchTopMarket:", error);
//     }
//   };
//   const firstImageUrl = Array.isArray(DataTopVideosMarket.images) && DataTopVideosMarket.images.length > 0
//     ? DataTopVideosMarket.images[0].image
//     : null;

//   const fetchCategoryMarket = async () => {
//     //   console.log(' Categories Result', result);
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url + "itemCategory/getAllItemCategories",
//         // base_url + "itemCategory/getAllItemCategories?page=1&limit=1000",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();

//         // console.log('Data ', data);
//         const categories = data.AllCategories.map((category) => ({
//           // label: category.name,
//           label:
//           language === "fr" && category.french_name
//               ? category.french_name
//               : category.name,
//           value: category.id.toString(),
//         }));

//         setCategorySelectMarket(categories);

//       } else {
//         console.error(
//           // "Failed to fetch categories:",
//           response.status,
//           response.statusText
//         );
//       }
//     } catch (error) {
//       console.error("Error in fetchCategoryMarket:", error);
//     }
//   };

//   const fetchElectronics = async (selectedItemIdMarket) => {
//     // console.log("Categry in id", selectedItemId);
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url +
//         `item/getAllItemByCategory/13?region=${selectedItemIdMarket}`,
//         // `item/getAllItemByCategory/13?page=1&limit=50&region=${selectedItemIdMarket}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // console.log("Phones and electronic", result.AllItems);
//       setDataElectronics(result.AllItems); // Update the state with the fetched data
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchVehicles = async (selectedItemIdMarket) => {
//     //console.log("Categry in id", selectedItemId)
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url +
//         `item/getAllItemByCategory/12?region=${selectedItemIdMarket}`,
//         // `item/getAllItemByCategory/12?page=1&limit=50&region=${selectedItemIdMarket}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // console.log("AllItems fetch vehicle", result.AllItems);
//       setDataVehicles(result.AllItems); // Update the state with the fetched data
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchClothing = async (selectedItemIdMarket) => {
//     //console.log("Categry in id", selectedItemId)
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url +
//         `item/getAllItemByCategory/6?region=${selectedItemIdMarket}`,
//         // `item/getAllItemByCategory/6?page=1&limit=50&region=${selectedItemIdMarket}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // console.log("AllItems fetch cloth", result.AllItems);
//       setDataClothing(result.AllItems); // Update the state with the fetched data
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };
//   const fetchAll = async (selectedItemIdMarket) => {
//     //console.log("Categry in id", selectedItemId)
//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url +
//         `item/getAllItemByCategory/5?region=${selectedItemIdMarket}`,
//         // `item/getAllItemByCategory/5?page=1&limit=50&region=${selectedItemIdMarket}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // console.log("AllItems fetch other item", result.AllItems);
//       setAllmarket(result.AllItems);
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchElectronicsMarket = async (token, id, picId, marketId) => {
//     try {
//       const response = await fetch(
//         base_url +
//         `item/getAllItemByCategory/13?region=${marketId}`,
//         // `item/getAllItemByCategory/13?page=1&limit=5&region=${marketId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // console.log("electronins -------", result.AllItems);
//       return result.AllItems;
//       // setDataElectronicsMarket(result.AllItems);
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchVehiclesMarket = async (token, id, picId, marketId) => {
//     // console.log("market id vehile-------", marketId);
//     try {
//       const response = await fetch(
//         base_url +
//         `item/getAllItemByCategory/12?region=${marketId}`,
//         // `item/getAllItemByCategory/12?page=1&limit=50&region=${marketId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       // console.log("AllItems in vehicle", result.AllItems);
//       return result.AllItems; // Update the state with the fetched data
//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };

//   const fetchClothingMarket = async (token, id, picId, marketId) => {
//     // const token = authToken;

//     try {
//       const response = await fetch(
//         base_url +
//         `item/getAllItemByCategory/6?region=${marketId}`,
//         // `item/getAllItemByCategory/6?page=1&limit=50&region=${marketId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       return result.AllItems;

//     } catch (error) {
//       console.error("Error Trending:", error);
//     }
//   };
//   const fetchAllMarket = async (token, id, picId, marketId) => {

//     try {
//       const response = await fetch(`${base_url}item/getAllItemByCategory/5?region=${marketId}`,
//         // base_url+`item/getAllItemByCategory/5?page=1&limit=50&region=${marketId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       // console.log("all data market", result.AllItems);
//       return result.AllItems;
//     } catch (error) {
//       // console.error("Error in fetchAllMarket:", error);
//     }
//   };

//   // /////Market Start

//   const renderAvailableAppsMarket = (item) => {
//     // console.log("Items of market zone", item);
//     return (
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate("ProductDetails", { ProductDetails: item })
//         }
//         style={{ width: wp(25.5), margin: 5 }}
//       >
//         <View>
//           {!item?.images[0]?.image ||
//             item?.images[0]?.image === "undefined" ||
//             item?.images[0]?.image.startsWith("/") ? (
//             <Image
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 zIndex: 1,
//                 width: "100%",
//                 height: hp(12),
//                 borderRadius: wp(1),
//                 resizeMode: "cover",
//               }}
//               source={appImages.galleryPlaceHolder}
//             />
//           ) : (
//             <Image
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,

//                 zIndex: 1,
//                 width: "100%",
//                 height: hp(16),
//                 borderRadius: wp(2.5),
//                 resizeMode: "cover",
//               }}
//               source={{ uri: item?.images[0]?.image }}
//             />
//           )}
//         </View>

//         <View
//           style={{
//             position: "absolute",
//             top: hp(17),
//             left: 3,
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 2, // Ensure it's on top
//           }}
//         >
//           <Text
//             ellipsizeMode="tail"
//             numberOfLines={1}
//             style={{
//               fontSize: hp(1.7),
//               fontFamily: "Inter",
//               color: "black",
//               fontWeight: "700",
//             }}
//           >
//             {item?.title}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderSearchesMarket = (item) => {
//     // console.log('Regions item', item);
//     const isSelected = selectedItemIdMarket === item.name;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             // backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//             backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
//           },
//         ]}
//         onPress={() => {
//           setSelectedItemIdMarket(item.name);
//           console.log("Selected item:", item.name);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {/* {item} */}
//           {name}
//         </Text>
//       </TouchableOpacity>
//     );
//   };
//   //Your FlatList rendering the search ite
//   /////////////////////////////////////////////////////////////////////////////////////////////////
//   const renderAppsFav = (item) => {
//     const isSelected = selectedApps.includes(item);

//     const handleAppPress = () => {
//       setSelectedApps((selected) => {
//         if (selected.includes(item)) {
//           return selected.filter((app) => app !== item);
//         } else {
//           return [...selected, item];
//         }
//       });
//     };

//     return (
//       <TouchableOpacity
//         onPress={handleAppPress}
//         style={[styles.items, isSelected]}
//       >
//         {isSelected && (
//           <Ionicons name="checkmark-circle" size={15} color="green" />
//         )}
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <Text
//             style={{
//               color: "#000000",
//               textAlign: "center",
//               fontSize: hp(1.2),
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const renderAppsFav_b = (item) => {
//     const isSelected = selectedApps_b.includes(item);

//     const handleAppPress = () => {
//       setSelectedApps_b((selected) => {
//         if (selected.includes(item)) {
//           return selected.filter((app) => app !== item);
//         } else {
//           return [...selected, item];
//         }
//       });
//     };

//     return (
//       <TouchableOpacity
//         onPress={handleAppPress}
//         style={[styles.items, isSelected]}
//       >
//         {isSelected && (
//           <Ionicons name="checkmark-circle" size={15} color="green" />
//         )}
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <Text
//             style={{
//               color: "#000000",
//               textAlign: "center",
//               fontSize: hp(1.2),
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const renderAppsFav_sp = (item) => {
//     const isSelected = selectedApps_sp.includes(item);

//     const handleAppPress = () => {
//       setSelectedApps_sp((selected) => {
//         if (selected.includes(item)) {
//           return selected.filter((app) => app !== item);
//         } else {
//           return [...selected, item];
//         }
//       });
//     };

//     return (
//       <TouchableOpacity
//         onPress={handleAppPress}
//         style={[styles.items, isSelected]}
//       >
//         {isSelected && (
//           <Ionicons name="checkmark-circle" size={15} color="green" />
//         )}
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <Text
//             style={{
//               color: "#000000",
//               textAlign: "center",
//               fontSize: hp(1.2),
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const renderAppsFav_e = (item) => {
//     const isSelected = selectedApps_e.includes(item);

//     const handleAppPress = () => {
//       setSelectedApps_e((selected) => {
//         if (selected.includes(item)) {
//           return selected.filter((app) => app !== item);
//         } else {
//           return [...selected, item];
//         }
//       });
//     };

//     return (
//       <TouchableOpacity
//         onPress={handleAppPress}
//         style={[styles.items, isSelected]}
//       >
//         {isSelected && (
//           <Ionicons name="checkmark-circle" size={15} color="green" />
//         )}
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <Text
//             style={{
//               color: "#000000",
//               textAlign: "center",
//               fontSize: hp(1.2),
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const renderAppsFav_d = (item) => {
//     const isSelected = selectedApps_d.includes(item);

//     const handleAppPress = () => {
//       setSelectedApps_d((selected) => {
//         if (selected.includes(item)) {
//           return selected.filter((app) => app !== item);
//         } else {
//           return [...selected, item];
//         }
//       });
//     };

//     return (
//       <TouchableOpacity
//         onPress={handleAppPress}
//         style={[styles.items, isSelected ]}
//       >
//         {isSelected && (
//           <Ionicons name="checkmark-circle" size={15} color="green" />
//         )}
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <Text
//             style={{
//               color: "#000000",
//               textAlign: "center",
//               fontSize: hp(1.2),
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const renderAppsFav_fd = (item) => {
//     const isSelected = selectedApps_fd.includes(item);

//     const handleAppPress = () => {
//       setSelectedApps_fd((selected) => {
//         if (selected.includes(item)) {
//           return selected.filter((app) => app !== item);
//         } else {
//           return [...selected, item];
//         }
//       });
//     };

//     return (
//       <TouchableOpacity
//         onPress={handleAppPress}
//         style={[styles.items, isSelected ]}
//       >
//         {isSelected && (
//           <Ionicons name="checkmark-circle" size={15} color="green" />
//         )}
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <Text
//             style={{
//               color: "#000000",
//               textAlign: "center",
//               fontSize: hp(1.2),
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const renderAppsFav_sm = (item) => {
//     const isSelected = selectedApps_sm.includes(item);

//     const handleAppPress = () => {
//       setSelectedApps_sm((selected) => {
//         if (selected.includes(item)) {
//           return selected.filter((app) => app !== item);
//         } else {
//           return [...selected, item];
//         }
//       });
//     };

//     return (
//       <TouchableOpacity
//         onPress={handleAppPress}
//         style={[styles.items, isSelected ]}
//       >
//         {isSelected && (
//           <Ionicons name="checkmark-circle" size={15} color="green" />
//         )}
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <Text
//             style={{
//               color: "#000000",
//               textAlign: "center",
//               fontSize: hp(1.2),
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const renderAppsFav_mw = (item) => {
//     const isSelected = selectedApps_mw.includes(item);

//     const handleAppPress = () => {
//       setSelectedApps_mw((selected) => {
//         if (selected.includes(item)) {
//           return selected.filter((app) => app !== item);
//         } else {
//           return [...selected, item];
//         }
//       });
//     };

//     return (
//       <TouchableOpacity
//         onPress={handleAppPress}
//         style={[styles.items, isSelected ]}
//       >
//         {isSelected && (
//           <Ionicons name="checkmark-circle" size={15} color="green" />
//         )}
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <Text
//             style={{
//               color: "#000000",
//               textAlign: "center",
//               fontSize: hp(1.2),
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const renderAppsFav_g = (item) => {
//     const isSelected = selectedApps_g.includes(item);

//     const handleAppPress = () => {
//       setSelectedApps_g((selected) => {
//         if (selected.includes(item)) {
//           return selected.filter((app) => app !== item);
//         } else {
//           return [...selected, item];
//         }
//       });
//     };

//     return (
//       <TouchableOpacity
//         onPress={handleAppPress}
//         style={[styles.items, isSelected ]}
//       >
//         {isSelected && (
//           <Ionicons name="checkmark-circle" size={15} color="green" />
//         )}
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <Text
//             style={{
//               color: "#000000",
//               textAlign: "center",
//               fontSize: hp(1.2),
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const renderAppsFav_em = (item) => {
//     const isSelected = selectedApps_em.includes(item);

//     const handleAppPress = () => {
//       setSelectedApps_em((selected) => {
//         if (selected.includes(item)) {
//           return selected.filter((app) => app !== item);
//         } else {
//           return [...selected, item];
//         }
//       });
//     };

//     return (
//       <TouchableOpacity
//         onPress={handleAppPress}
//         style={[styles.items, isSelected ]}
//       >
//         {isSelected && (
//           <Ionicons name="checkmark-circle" size={15} color="green" />
//         )}
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <Text
//             style={{
//               color: "#000000",
//               textAlign: "center",
//               fontSize: hp(1.2),
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const renderFavouritesApps = (item) => {
//     //console.log('item at first', item);
//     const openApp = async (items) => {
//       try {
//         // Launch the application
//         await RNLauncherKitHelper.launchApplication(item.bundle);

//         // Check if the app is already in the topData array
//         const appIndex = topData.findIndex((app) => app.bundle === item.bundle);

//         if (appIndex !== -1) {
//           // If the app is already in the array, update the count
//           const updatedTopData = [...topData];
//           updatedTopData[appIndex] = {
//             ...updatedTopData[appIndex],
//             count: updatedTopData[appIndex].count + 1,
//           };

//           setTopData(updatedTopData);
//         } else {
//           // If the app is not in the array, add it with count 1
//           setTopData((prevData) => [
//             ...prevData,
//             {
//               label: item.label,
//               bundle: item.bundle,
//               image: item.image,
//               count: 1,
//             },
//           ]);
//         }

//         await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
//       } catch (error) {
//         console.error("Error opening the app:", error);
//         await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
//       }
//     };

//     return (
//       <TouchableOpacity
//         onLongPress={() => {
//           setIsLongPressRemove(true);
//           setIsCancelRemoveModalVisible(true);
//           setRemoveFavouriteItem(item);
//         }}
//          onPress={() => openApp(item?.bundle)}
//         style={styles.items}
//       >
//         <Image
//           style={{ width: 43, height: 43 }}
//           source={{ uri: `data:image/png;base64,${item?.image}` }}
//         />
//         <Text
//           style={{
//             color: "#000000",
//             textAlign: "center",
//             fontSize: hp(1.2),
//             fontWeight: "bold",
//           }}
//           ellipsizeMode="tail"
//           numberOfLines={1}
//         >
//           {item?.label}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const loadSavedApps = async () => {
//     try {
//       const savedApps = await AsyncStorage.getItem("savedApps");
//       if (savedApps) {
//         // console.log("saved apps in useeffect --------->", savedApps);
//         setSavedApps(JSON.parse(savedApps));
//       }
//     } catch (error) {
//       console.error("Error loading saved apps from AsyncStorage:", error);
//     }
//   };

//   // Function to save selected apps to AsyncStorage
//   const handleSave = async () => {
//     try {
//       // Retrieve the current array of saved apps from AsyncStorage
//       const currentSavedApps = await AsyncStorage.getItem("savedApps");
//       let updatedSavedApps = [];

//       if (currentSavedApps) {
//         updatedSavedApps = JSON.parse(currentSavedApps);
//       }
//       // Add the selected apps to the saved apps array
//       updatedSavedApps.push(...selectedApps);
//       // Save the updated array back to AsyncStorage
//       await AsyncStorage.setItem("savedApps", JSON.stringify(updatedSavedApps));
//       setSnackbarVisible(true);
//       setModalVisible(false);
//       setSelectedApps([]); // Clear the selected apps
//       // Update the state
//       setSavedApps(updatedSavedApps);
//       console.log("saved apps in handleSave --------->", updatedSavedApps);
//     } catch (error) {
//       console.error("Error saving selected apps to AsyncStorage:", error);
//     }
//   };

//   const BusinessSavedApps = async () => {
//     try {
//       const savedApps = await AsyncStorage.getItem("savedApps_b");
//       if (savedApps) {
//         // console.log('saved apps in useeffect --------->', savedApps)
//         setSavedApps_b(JSON.parse(savedApps));
//       }
//     } catch (error) {
//       console.error("Error loading saved apps from AsyncStorage:", error);
//     }
//   };

//   // Function to save selected apps to AsyncStorage
//   const handleSave_b = async () => {
//     try {
//       // Retrieve the current array of saved apps from AsyncStorage
//       const currentBusinessSavedApps = await AsyncStorage.getItem(
//         "savedApps_b"
//       );
//       let updatedSavedApps = [];

//       if (currentBusinessSavedApps) {
//         updatedSavedApps = JSON.parse(currentBusinessSavedApps);
//       }

//       // Add the selected apps to the saved apps array
//       updatedSavedApps.push(...selectedApps_b);

//       // Save the updated array back to AsyncStorage
//       await AsyncStorage.setItem(
//         "savedApps_b",
//         JSON.stringify(updatedSavedApps)
//       );
//       setSnackbarVisible(true);
//       setModalVisible_b(false);
//       setSelectedApps_b([])
//       // Update the state
//       setSavedApps_b(updatedSavedApps);

//       // console.log('saved apps in handleSave_b --------->', updatedSavedApps);
//     } catch (error) {
//       console.error("Error saving selected apps to AsyncStorage:", error);
//     }
//   };

//   const handleSave_sp = () => {
//     setSavedApps_sp(selectedApps_sp);
//     setSnackbarVisible(true);
//     setModalVisible_sp(false);
//   };
//   const handleSave_e = () => {
//     setSavedApps_e(selectedApps_e);
//     setSnackbarVisible(true);
//     setModalVisible_e(false);
//   };
//   const handleSave_d = () => {
//     setSavedApps_d(selectedApps_d);
//     setSnackbarVisible(true);
//     setModalVisible_d(false);
//   };
//   const handleSave_fd = () => {
//     setSavedApps_fd(selectedApps_fd);
//     setSnackbarVisible(true);
//     setModalVisible_fd(false);
//   };
//   const handleSave_sm = () => {
//     setSavedApps_sm(selectedApps_sm);
//     setSnackbarVisible(true);
//     setModalVisible_sm(false);
//   };
//   const handleSave_mw = () => {
//     setSavedApps_mw(selectedApps_mw);
//     setSnackbarVisible(true);
//     setModalVisible_mw(false);
//   };
//   const handleSave_g = () => {
//     setSavedApps_g(selectedApps_g);
//     setSnackbarVisible(true);
//     setModalVisible_g(false);
//   };
//   const handleSave_em = () => {
//     setSavedApps_em(selectedApps_em);
//     setSnackbarVisible(true);
//     setModalVisible_em(false);
//   };

//   const handleItemPress = (category) => {
//     setSelectedItemId(category);
//     setIsSelectedActive(false); ///
//     setcategoryActive(false); ////ye old hai jis ko comment kiya tha
//     setSelectedCategory(category);
//     setecommerance(category === t('Ecommerce'));
//     // setecommerance(category === "E-commerce");
//     setSport(category === t('cateSports'));
//     // setSport(category === "Sports");
//   };

//   const renderSearches = (item) => {
//     const isSelected = selectedItemId === item;

//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetailsCategory,
//           {
//             backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
//           },
//         ]}
//         onPress={() => {
//           // Pass the item data when pressed
//           handleItemPress(item);
//           if (item === t('Ecommerce')) {
//           // if (item === "E-commerce") {
//             // console.log("E----AYA:");
//             loadSavedApps(); // Assuming handleItemPress is a function to handle item press
//           } else if (item ===  t('Business')) {
//           // } else if (item === "Business") {
//             // console.log("Business----AYA:");
//             BusinessSavedApps();
//           } // Assuming handleItemPress is a function to handle item press
//           // console.log("Selected item:", item);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {item}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const press_category = () => {
//     setIsSelectedActive(!isSelectedActive);
//     setSelectedItemId(null); // Deactivate all items when category is pressed
//     setSelectedCategory("");
//     setecommerance(false);
//     setSport(false);
//     setcategoryActive(true); //ye old hai jis ko comment kiya tha
//   };

//   const renderVideoItem = ({ item }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('Cinematics_details', { videoData: item, identifier: false })}>
//       <View style={styles.itemContainer}>
//         {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
//         <Image source={{ uri: item.thumbnail }} style={styles.image} />
//         <Text ellipsizeMode="tail"
//           numberOfLines={1} style={styles.nametext}>{item.name}</Text>
//         <Text ellipsizeMode="tail"
//           numberOfLines={2} style={styles.text1}>{item.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderSection = ({ item }) => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeader}>{item.title}</Text>
//       {item.data.length === 0 ? (
//         <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
//       ) : (
//         <FlatList
//           data={item.data}
//           renderItem={renderVideoItem}
//           keyExtractor={(videoItem) => videoItem.video_id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );

//   const renderFanVideoItem = ({ item }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('Fans_star_details', { videoData: item })}>
//       <View style={styles.itemContainer}>
//         {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
//         <Image source={{ uri: item.thumbnail }} style={styles.image} />
//         <Text ellipsizeMode="tail"
//           numberOfLines={1} style={styles.nametext}>{item.name}</Text>
//         <Text ellipsizeMode="tail"
//           numberOfLines={2} style={styles.text1}>{item.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderFanSection = ({ item }) => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeader}>{item.title}</Text>
//       {item.data.length === 0 ? (
//         <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
//       ) : (
//         <FlatList
//           data={item.data}
//           renderItem={renderFanVideoItem}
//           keyExtractor={(videoItem) => videoItem.video_id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );

//   const renderCinematicSearches = (item) => {
//     // console.log("Regions", item);
//     const isSelected = selectedCinematicItemId === item.id;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     // console.log('is selected hai---', isSelected)
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//           },
//         ]}
//         onPress={() => {
//           setSelectedCinematicItemId(item.id);
//           console.log("Selected item:", item.id);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {name}
//           {/* {item.name} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderFanstartSearches = (item) => {
//     // console.log("Regions", item);
//     const isSelected = selectedFanstarItemId === item.id;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     // console.log('is selected hai---', isSelected)
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//           },
//         ]}
//         onPress={() => {
//           setSelectedFanStarItemId(item.id);
//           console.log("Selected item:", item.id);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {name}
//           {/* {item.name} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderKidsSearches = (item) => {
//     const isSelected = selectedKidItemId === item.id;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//           },
//         ]}
//         onPress={() => {
//           setSelectedKidItemId(item.id);
//           console.log("Selected item:", item.id);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {name}
//           {/* {item.name} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderKidVideoItem = ({ item }) => (
//     // <TouchableOpacity onPress={handle_details}>
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate("Kids_vid_details", { videoData: item })
//       }
//     >
//       <View style={styles.itemContainer}>
//         {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
//         <Image source={{ uri: item.thumbnail }} style={styles.image} />
//         <Text ellipsizeMode="tail" numberOfLines={1} style={styles.nametext}>
//           {item.name}
//         </Text>
//         <Text ellipsizeMode="tail" numberOfLines={2} style={styles.text1}>
//           {item.description}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderKidSection = ({ item }) => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeader}>{item.title}</Text>
//       {item.data.length === 0 ? (
//         <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
//       ) : (
//         <FlatList
//           data={item.data}
//           renderItem={renderKidVideoItem}
//           keyExtractor={(videoItem) => videoItem.video_id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );

//   const renderLearnSearches = (item) => {
//     // console.log("Regions", item);
//     const isSelected = selectedlearnItemId === item.id;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     // console.log('is selected hai---', isSelected)
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//           },
//         ]}
//         onPress={() => {
//           setSelectedLearnItemId(item.id);
//           console.log("Selected item:", item.id);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {name}
//           {/* {item.name} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderLearnVideoItem = ({ item }) => (
//     // <TouchableOpacity onPress={handle_details}>
//     <TouchableOpacity onPress={() => navigation.navigate('Learning_details', { videoData: item })}>
//       <View style={styles.itemContainer}>
//         {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
//         <Image source={{ uri: item.thumbnail }} style={styles.image} />
//         <Text ellipsizeMode="tail"
//           numberOfLines={1} style={styles.nametext}>{item.name}</Text>
//         <Text ellipsizeMode="tail"
//           numberOfLines={2} style={styles.text1}>{item.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderLearnSection = ({ item }) => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeader}>{item.title}</Text>
//       {item.data.length === 0 ? (
//         <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
//       ) : (
//         <FlatList
//           data={item.data}
//           renderItem={renderLearnVideoItem}
//           keyExtractor={(videoItem) => videoItem.video_id.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );

//   const renderTvSearches = (item) => {
//     const isSelected = selectedtvItemId === item.id;
//     const name = language === "fr" && item.french_name ? item.french_name : item.name;
//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//           },
//         ]}
//         onPress={() => {
//           setSelectedTvItemId(item.id);
//           console.log("Selected item:", item.id);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {name}
//           {/* {item.name} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const handleBannerPress = (link) => {
//     Linking.openURL(link);
//   };

//   const top_post_date = convertTimeAndDate(topLetterData.post_date );
//   return (
//     <View
//       pointerEvents="auto"
//       style={aLoader ? styles.containerBlur : styles.container}
//     >
//       <StatusBar
//         translucent={true}
//         backgroundColor="transparent"
//         barStyle="dark-content"
//       />

//       <View style={{ marginTop:Platform.OS =="ios"? 0: hp(6), width: "100%" }}>
//         {/* {console.log("Navigation object:", navigation)} */}
//         <Headers
//           showListings={true}
//           navigation={navigation}
//           showLogo={true}
//           onPressListings={() => navigation.openDrawer()}
//           onPressProfile={() => navigation.navigate("ViewProfile")}
//           showProfileImage={true}
//         />
//       </View>
//       <ScrollView
//         ref={scrollViewRef}
//         showsVerticalScrollIndicator={false}
//         style={{ flex: 1, marginHorizontal: wp(5) }}
//       >
//         <Modal
//           transparent={true}
//           animationType="fade"
//           visible={isLongPress}
//           onRequestClose={() => setIsLongPress(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <TouchableOpacity
//                 onPress={() => {
//                   if (favouriteItem) {
//                     const isItemInFavourites = favouriteData.some(
//                       (item) => item.bundle === favouriteItem.bundle
//                     );

//                     if (isItemInFavourites) {
//                       console.log("Item is already in favourites");
//                     } else {
//                       setFavouriteData((prevData) => [
//                         ...prevData,
//                         favouriteItem,
//                       ]);
//                       console.log(
//                         "Add to Favorites pressed for:",
//                         favouriteItem.label
//                       );
//                     }

//                     setIsLongPress(false);
//                   }
//                 }}
//                 style={styles.overlayButton}
//               >
//                 <Text style={{ color: "white" }}>{t('Dashboard.AddtoFavorites')}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => {
//                   if (favouriteItem) {
//                     const updatedInstallData = dataApps.filter(
//                       (item) => item.bundle !== favouriteItem.bundle
//                     );
//                     setDataApps(updatedInstallData);
//                     setIsCancelModalVisible(false);
//                     setIsLongPress(false);
//                   }
//                 }}
//                 style={styles.overlayButton}
//               >
//                 <Text style={{ color: "white" }}>
//                   {t('Dashboard.RemoveFromWotchaGotchaApp')}

//                   {/* Remove From Wotcha Gotcha App */}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {isCancelModalVisible && (
//             <TouchableOpacity
//               onPress={() => closeRequestModal()}
//               style={styles.modalContentCross}
//             >
//               <Entypo name={"cross"} size={18} color={"black"} />
//             </TouchableOpacity>
//           )}
//         </Modal>
//         <Modal
//           transparent={true}
//           animationType="fade"
//           visible={isLongPressRemove}
//           onRequestClose={() => setIsLongPressRemove(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <TouchableOpacity
//                 onPress={() => {
//                   if (removeFavouriteItem) {
//                     // Check if the item already exists in favouriteData
//                     const isItemInFavourites = favouriteData.some(
//                       (item) => item.bundle === removeFavouriteItem.bundle
//                     );

//                     console.log("Favourite Item", isItemInFavourites);

//                     if (isItemInFavourites) {
//                       // Item already exists, remove it from favouriteData
//                       const updatedFavouriteData = favouriteData.filter(
//                         (item) => item.bundle !== removeFavouriteItem.bundle
//                       );
//                       setFavouriteData(updatedFavouriteData);

//                       console.log("Item removed from favourites");
//                     } else {
//                       // Item doesn't exist, add it to favouriteData
//                       setFavouriteData((prevData) => [
//                         ...prevData,
//                         favouriteItem,
//                       ]);
//                       console.log("Add to Favorites pressed for:");
//                     }

//                     setIsLongPressRemove(false);
//                   }
//                 }}
//                 style={styles.overlayButton}
//               >
//                 <Text style={{ color: "white" }}>{t('Dashboard.RemoveFavorites')}</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => {
//                   if (removeFavouriteItem) {
//                     const updatedInstallData = dataApps.filter(
//                       (item) => item.bundle !== removeFavouriteItem.bundle
//                     );
//                     setDataApps(updatedInstallData);
//                     setIsCancelModalVisible(false);
//                     setIsLongPressRemove(false);
//                   } else {
//                     setIsCancelModalVisible(false);
//                     setIsLongPressRemove(false);
//                   }
//                 }}
//                 style={styles.overlayButton}
//               >
//                 <Text style={{ color: "white" }}>
//                   {t('Dashboard.RemoveFromWotchaGotchaApp')}
//                   {/* Remove From Wotcha Gotcha App */}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {isCancelRemoveModalVisible && (
//             <TouchableOpacity
//               onPress={() => closeRequestRemoveModal()}
//               style={styles.modalContentCross}
//             >
//               <Entypo name={"cross"} size={18} color={"black"} />
//             </TouchableOpacity>
//           )}
//         </Modal>
//         <StatusBar
//           translucent={true}
//           backgroundColor="transparent"
//           barStyle="dark-content"
//         />

//         <View style={{ marginTop: hp(1) }}></View>

//         {/* // start of banner slider */}

//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsData}
//           noDataMessage={t('Dashboard.NoTopBanner')}
//           onBannerPress={handleBannerPress}
//         />

//         {Platform.OS != "ios" ?
//           <View style={styles.latestSearchList}>
//             <TouchableOpacity onPress={press_category}>
//               {isSelectedActive ? (
//                 <CategoryActive width={23} height={23} />
//               ) : (
//                 <CategoryInactive width={23} height={23} />
//               )}
//             </TouchableOpacity>

//             <FlatList
//               style={{ flex: 1 }}
//               contentContainerStyle={{ alignItems: "center" }}
//               showsHorizontalScrollIndicator={false}
//               horizontal
//               data={MassApp}
//               renderItem={({ item }) => renderSearches(item)}
//             />
//           </View> : <View>
//             <Text>{t('NoDataAvailable')}</Text>
//           </View>
//         }

//         {categoryActive ? (
//           Platform.OS != "ios" && (
//             <>
//               <View
//                 style={{
//                   marginTop: hp(2),
//                   marginLeft: wp(-1),
//                   height: hp(23),
//                   width: wp(60),
//                 }}
//               >
//                 {/* {isLoading === true ? (
//                   <View
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       bottom: 0,
//                       left: 0,
//                       right: 0,
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <ActivityIndicator size="large" color="#FACA4E" />
//                   </View>
//                 ) : ( */}

//                   <>
//                     {topData?.length === 0 ? (
//                       <View
//                         style={{
//                           flex: 1,
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                                  <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
//                           {t('Dashboard.NoTopApps')}
//                         </Text>
//                       </View>
//                     ) : (
//                       <FlatList
//                         style={{ margin: 8, flex: 1 }}
//                         showsVerticalScrollIndicator={false}
//                         data={topData}
//                         numColumns={3} // Set the number of columns to 3
//                         renderItem={({ item }) => renderAvailableApps(item)}
//                       />
//                     )}
//                   </>

//                 {/* )} */}
//               </View>

//               <View style={{ marginTop: hp(-3), height: hp(25) }}>
//                 <Text
//                   style={{
//                     fontSize: hp(2.3),
//                     marginLeft: wp(3),
//                     fontFamily: "Inter-Bold",
//                     color: "#4A4A4A",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {t('Dashboard.PhoneBasedApps')}
//                 </Text>

//                 {/* {isLoading ? (
//                   <View
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       bottom: 0,
//                       left: 0,
//                       right: 0,
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <ActivityIndicator size="large" color="#FACA4E" />
//                   </View>
//                 ) : ( */}
//                   <View style={{ flex: 1 }}>
//                     <FlatList
//                       data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                       keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                       renderItem={({ item }) => renderApps(item)}
//                       contentContainerStyle={{
//                         borderWidth: 1,
//                         marginRight: wp(2.3),
//                         marginTop: hp(3),
//                         borderColor: "#00000017",
//                         borderRadius: wp(3),
//                       }}
//                     />

//                     <FlatList
//                       data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                       keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                       renderItem={({ item }) => renderApps(item)}
//                       contentContainerStyle={{
//                         borderWidth: 1,
//                         marginRight: wp(2.3),
//                         marginTop: hp(3),
//                         borderColor: "#00000017",
//                         borderRadius: wp(3),
//                       }}
//                     />
//                   </View>
//                 {/* )} */}
//               </View>

//               <View style={{ height: hp(8), justifyContent: "center" }}>
//                 <View
//                   style={{
//                     height: hp(7),
//                     flexDirection: "row",
//                     justifyContent: "space-around",
//                     alignItems: "center",
//                     //borderWidth: 1,
//                     marginHorizontal: wp(12),
//                   }}
//                 ></View>
//               </View>

//               <View style={{ marginTop: hp(-5), height: hp(28) }}>
//                 <Text
//                   style={{
//                     fontSize: hp(2.3),
//                     marginLeft: wp(3),
//                     fontFamily: "Inter-Bold",
//                     color: "#4A4A4A",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {t('Dashboard.FavouriteApps')}
//                 </Text>
//                 {/* {isLoading ? (
//                   <View
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       bottom: 0,
//                       left: 0,
//                       right: 0,
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <ActivityIndicator size="large" color="#FACA4E" />
//                   </View>
//                 ) : ( */}
//                   <>
//                     {favouriteData?.length === 0 ? (
//                       <View
//                         style={{
//                           flex: 1,
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <Text
//                           style={{
//                             fontWeight: "bold",
//                             fontSize: hp(2.1),
//                             justifyContent: "center",
//                             color:'gray'
//                           }}
//                         >
//                           {t('Dashboard.NoFavouriteApps')}
//                         </Text>
//                       </View>
//                     ) : (
//                       <FlatList
//                         data={favouriteData.slice(
//                           0,
//                           Math.ceil(favouriteData.length / 2)
//                         )}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderFavouritesApps(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           marginTop: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     )}
//                     <FlatList
//                       data={favouriteData.slice(
//                         Math.ceil(favouriteData.length / 2)
//                       )}
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                       keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                       renderItem={({ item }) => renderFavouritesApps(item)}
//                       contentContainerStyle={{
//                         borderWidth: 1,
//                         marginRight: wp(2.3),
//                         marginTop: hp(3),
//                         borderColor: "#00000017",
//                         borderRadius: wp(3),
//                       }}
//                     />
//                   </>
//                 {/* )} */}
//               </View>

//               <View
//                 style={{ marginTop: hp(1), marginBottom: hp(5), height: hp(25) }}
//               >
//                 <Text
//                   style={{
//                     fontSize: hp(2.3),
//                     marginLeft: wp(3),
//                     fontFamily: "Inter-Bold",
//                     color: "#4A4A4A",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {t('Dashboard.UnusedApps')}
//                 </Text>

//                 {/* {isLoading ? (
//                   <View
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       bottom: 0,
//                       left: 0,
//                       right: 0,
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <ActivityIndicator size="large" color="#FACA4E" />
//                   </View>
//                 ) : ( */}
//                   <View style={{ flex: 1 }}>
//                     <FlatList
//                       data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                       keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                       renderItem={({ item }) => renderApps(item)}
//                       contentContainerStyle={{
//                         borderWidth: 1,
//                         marginRight: wp(2.3),
//                         marginTop: hp(3),
//                         borderColor: "#00000017",
//                         borderRadius: wp(3),
//                       }}
//                     />

//                     <FlatList
//                       data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                       keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                       renderItem={({ item }) => renderApps(item)}
//                       contentContainerStyle={{
//                         borderWidth: 1,
//                         marginRight: wp(2.3),
//                         marginTop: hp(3),
//                         borderColor: "#00000017",
//                         borderRadius: wp(3),
//                       }}
//                     />
//                   </View>
//                 {/* )} */}
//               </View>
//             </>
//           )

//         ) : (
//           <>
//             {/* {ecommerance && selectedCategory === "E-commerce" && ( */}
//             {ecommerance && selectedCategory === t('Ecommerce') && (
//               <>
//                 <View
//                   style={{ flex: 1, height: containerHeight, width: "100%" }}
//                 >
//                   {savedApps.length > 0 ? (
//                     <>
//                       <View style={{ flex: 1 }}>
//                         <ScrollView>
//                           {Array.from({
//                             length: Math.ceil(savedApps.length / 5),
//                           }).map((_, rowIndex) => (
//                             <ScrollView showsHorizontalScrollIndicator={true}>
//                               <View
//                                 key={rowIndex}
//                                 style={{
//                                   flexDirection: "row",
//                                   marginBottom: 10,
//                                   margin: "2%",
//                                 }}
//                               >
//                                 {savedApps
//                                   .slice(rowIndex * 5, (rowIndex + 1) * 5)
//                                   .map((app, index) => (
//                                     <TouchableOpacity
//                                       key={index}
//                                       onPress={() => openCategoryApp(app)}
//                                       style={{
//                                         flexDirection: "column",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         marginTop: 10,
//                                         marginRight: 6,
//                                       }}
//                                     >
//                                       <Image
//                                         style={{
//                                           width: 40,
//                                           height: 40,
//                                           marginBottom: 5,
//                                           margin: "3%",
//                                         }}
//                                         source={{
//                                           uri: `data:image/png;base64,${app.image}`,
//                                         }}
//                                       />
//                                       <Text
//                                         style={{
//                                           color: "black",
//                                           fontSize: wp(2.5),
//                                         }}
//                                       >
//                                         {app.label.substring(0, 10)}
//                                       </Text>
//                                     </TouchableOpacity>
//                                   ))}
//                                 {[
//                                   ...Array(
//                                     Math.max(0, 5 - (savedApps.length % 5))
//                                   ),
//                                 ].map((_, index) => (
//                                   <View
//                                     key={index}
//                                     style={{
//                                       width: 30,
//                                       height: 30,
//                                       marginRight: 10,
//                                     }}
//                                   />
//                                 ))}
//                               </View>
//                             </ScrollView>
//                           ))}
//                         </ScrollView>
//                       </View>
//                     </>
//                   ) : (
//                     <>
//                       <View style={{ flex: 1 }}>
//                         <Text
//                           style={{
//                             color: "grey",
//                             fontSize: wp(3.5),
//                             textAlign: "center",
//                             top: "40%",
//                           }}
//                         >
//                           {t('Dashboard.addEcommernceapps')}

//                           {/* Your can add E-commernce apps here */}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   <View style={{ position: "absolute", top: "70%", right: 10 }}>
//                     <TouchableOpacity onPress={() => setModalVisible(true)}>
//                       <Add />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </>
//             )}

//             {selectedCategory ===  t('Business') && (
//             // {selectedCategory === "Business" && (
//               <>
//                 <View
//                   style={{ flex: 1, height: containerHeight, width: "100%" }}
//                 >
//                   {savedApps_b.length > 0 ? (
//                     <View style={{ flex: 1 }}>
//                       <ScrollView>
//                         {Array.from({
//                           length: Math.ceil(savedApps_b.length / 5),
//                         }).map((_, rowIndex) => (
//                           <View
//                             key={rowIndex}
//                             style={{
//                               flexDirection: "row",
//                               marginBottom: 10,
//                               margin: "2%",
//                             }}
//                           >
//                             {savedApps_b
//                               .slice(rowIndex * 5, (rowIndex + 1) * 5)
//                               .map((app, index) => (
//                                 <TouchableOpacity
//                                   key={index}
//                                   onPress={() => openCategoryApp(app)}
//                                   style={{
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     marginTop: 10,
//                                     marginRight: 6,
//                                   }}
//                                 >
//                                   <Image
//                                     style={{
//                                       width: 40,
//                                       height: 40,
//                                       marginBottom: 5,
//                                       margin: "3%",
//                                     }}
//                                     source={{
//                                       uri: `data:image/png;base64,${app.image}`,
//                                     }}
//                                   />
//                                   <Text
//                                     style={{
//                                       color: "black",
//                                       fontSize: wp(2.5),
//                                     }}
//                                   >
//                                     {app.label}
//                                   </Text>
//                                   </TouchableOpacity>
//                               ))}
//                             {[
//                               ...Array(
//                                 Math.max(0, 5 - (savedApps_b.length % 5))
//                               ),
//                             ].map((_, index) => (
//                               <View
//                                 key={index}
//                                 style={{
//                                   width: 30,
//                                   height: 30,
//                                   marginRight: 10,
//                                 }}
//                               />
//                             ))}
//                           </View>
//                         ))}
//                       </ScrollView>
//                     </View>
//                   ) : (
//                     <>
//                       <View style={{ flex: 1 }}>
//                         <Text
//                           style={{
//                             color: "grey",
//                             fontSize: wp(3.5),
//                             textAlign: "center",
//                             top: "40%",
//                           }}
//                         >
//                           {t('Dashboard.addBussinessapps')}
//                           {/* Your can add Bussiness apps here */}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   <View style={{ position: "absolute", top: "70%", right: 10 }}>
//                     <TouchableOpacity onPress={() => setModalVisible_b(true)}>
//                       <Add />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </>
//             )}
//             {selectedCategory === t('cateSports') && (
//             // {selectedCategory === "Sports" && (
//               <>
//                 <View
//                   style={{ flex: 1, height: containerHeight, width: "100%" }}
//                 >
//                   {savedApps_sp.length > 0 ? (
//                     <View style={{ flex: 1 }}>
//                       <ScrollView>
//                         {Array.from({
//                           length: Math.ceil(savedApps_sp.length / 5),
//                         }).map((_, rowIndex) => (
//                           <View
//                             key={rowIndex}
//                             style={{
//                               flexDirection: "row",
//                               marginBottom: 10,
//                               margin: "2%",
//                             }}
//                           >
//                             {savedApps_sp
//                               .slice(rowIndex * 5, (rowIndex + 1) * 5)
//                               .map((app, index) => (
//                                 <TouchableOpacity
//                                   key={index}
//                                   onPress={() => openCategoryApp(app)}
//                                   style={{
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     marginTop: 10,
//                                     marginRight: 6,
//                                   }}
//                                 >
//                                   <Image
//                                     style={{
//                                       width: 40,
//                                       height: 40,
//                                       marginBottom: 5,
//                                       margin: "3%",
//                                     }}
//                                     source={{
//                                       uri: `data:image/png;base64,${app.image}`,
//                                     }}
//                                   />
//                                   <Text
//                                     style={{
//                                       color: "black",
//                                       fontSize: wp(2.5),
//                                     }}
//                                   >
//                                     {app.label}
//                                   </Text>
//                                 </TouchableOpacity>
//                               ))}
//                             {[
//                               ...Array(
//                                 Math.max(0, 5 - (savedApps_sp.length % 5))
//                               ),
//                             ].map((_, index) => (
//                               <View
//                                 key={index}
//                                 style={{
//                                   width: 30,
//                                   height: 30,
//                                   marginRight: 10,
//                                 }}
//                               />
//                             ))}
//                           </View>
//                         ))}
//                       </ScrollView>
//                     </View>
//                   ) : (
//                     <>
//                       <View style={{ flex: 1 }}>
//                         <Text
//                           style={{
//                             color: "grey",
//                             fontSize: wp(3.5),
//                             textAlign: "center",
//                             top: "40%",
//                           }}
//                         >
//                           {t('Dashboard.addSportsapps')}
//                           {/* Your can add Sports apps here */}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   <View style={{ position: "absolute", top: "70%", right: 10 }}>
//                     <TouchableOpacity onPress={() => setModalVisible_sp(true)}>
//                       <Add />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </>
//             )}
//             {selectedCategory ===  t('Education') && (
//             // {selectedCategory === "Education" && (
//               <>
//                 <View
//                   style={{ flex: 1, height: containerHeight, width: "100%" }}
//                 >
//                   {savedApps_e.length > 0 ? (
//                     <View style={{ flex: 1 }}>
//                       <ScrollView>
//                         {Array.from({
//                           length: Math.ceil(savedApps_e.length / 5),
//                         }).map((_, rowIndex) => (
//                           <View
//                             key={rowIndex}
//                             style={{
//                               flexDirection: "row",
//                               marginBottom: 10,
//                               margin: "2%",
//                             }}
//                           >
//                             {savedApps_e
//                               .slice(rowIndex * 5, (rowIndex + 1) * 5)
//                               .map((app, index) => (
//                                 <TouchableOpacity
//                                   key={index}
//                                   onPress={() => openCategoryApp(app)}
//                                   style={{
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     marginTop: 10,
//                                     marginRight: 6,
//                                   }}
//                                 >
//                                   <Image
//                                     style={{
//                                       width: 40,
//                                       height: 40,
//                                       marginBottom: 5,
//                                       margin: "3%",
//                                     }}
//                                     source={{
//                                       uri: `data:image/png;base64,${app.image}`,
//                                     }}
//                                   />
//                                   <Text
//                                     style={{
//                                       color: "black",
//                                       fontSize: wp(2.5),
//                                     }}
//                                   >
//                                     {app.label}
//                                   </Text>
//                                 </TouchableOpacity>
//                               ))}
//                             {[
//                               ...Array(
//                                 Math.max(0, 5 - (savedApps_e.length % 5))
//                               ),
//                             ].map((_, index) => (
//                               <View
//                                 key={index}
//                                 style={{
//                                   width: 30,
//                                   height: 30,
//                                   marginRight: 10,
//                                 }}
//                               />
//                             ))}
//                           </View>
//                         ))}
//                       </ScrollView>
//                     </View>
//                   ) : (
//                     <>
//                       <View style={{ flex: 1 }}>
//                         <Text
//                           style={{
//                             color: "grey",
//                             fontSize: wp(3.5),
//                             textAlign: "center",
//                             top: "40%",
//                           }}
//                         >
//                           {t('Dashboard.addEducationapps')}
//                           {/* Your can add Education apps here */}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   <View style={{ position: "absolute", top: "70%", right: 10 }}>
//                     <TouchableOpacity onPress={() => setModalVisible_e(true)}>
//                       <Add />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </>
//             )}
//             {selectedCategory === t('Dating') && (
//             // {selectedCategory === "Dating" && (
//               <>
//                 <View
//                   style={{ flex: 1, height: containerHeight, width: "100%" }}
//                 >
//                   {savedApps_d.length > 0 ? (
//                     <View style={{ flex: 1 }}>
//                       <ScrollView>
//                         {Array.from({
//                           length: Math.ceil(savedApps_d.length / 5),
//                         }).map((_, rowIndex) => (
//                           <View
//                             key={rowIndex}
//                             style={{
//                               flexDirection: "row",
//                               marginBottom: 10,
//                               margin: "2%",
//                             }}
//                           >
//                             {savedApps_d
//                               .slice(rowIndex * 5, (rowIndex + 1) * 5)
//                               .map((app, index) => (
//                                 <TouchableOpacity
//                                   key={index}
//                                   onPress={() => openCategoryApp(app)}
//                                   style={{
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     marginTop: 10,
//                                     marginRight: 6,
//                                   }}
//                                 >
//                                   <Image
//                                     style={{
//                                       width: 40,
//                                       height: 40,
//                                       marginBottom: 5,
//                                       margin: "3%",
//                                     }}
//                                     source={{
//                                       uri: `data:image/png;base64,${app.image}`,
//                                     }}
//                                   />
//                                   <Text
//                                     style={{
//                                       color: "black",
//                                       fontSize: wp(2.5),
//                                     }}
//                                   >
//                                     {app.label}
//                                   </Text>
//                                 </TouchableOpacity>
//                               ))}
//                             {[
//                               ...Array(
//                                 Math.max(0, 5 - (savedApps_d.length % 5))
//                               ),
//                             ].map((_, index) => (
//                               <View
//                                 key={index}
//                                 style={{
//                                   width: 30,
//                                   height: 30,
//                                   marginRight: 10,
//                                 }}
//                               />
//                             ))}
//                           </View>
//                         ))}
//                       </ScrollView>
//                     </View>
//                   ) : (
//                     <>
//                       <View style={{ flex: 1 }}>
//                         <Text
//                           style={{
//                             color: "grey",
//                             fontSize: wp(3.5),
//                             textAlign: "center",
//                             top: "40%",
//                           }}
//                         >
//                           {t('Dashboard.addDatingapps')}
//                           {/* Your can add Dating apps here */}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   <View style={{ position: "absolute", top: "70%", right: 10 }}>
//                     <TouchableOpacity onPress={() => setModalVisible_d(true)}>
//                       <Add />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </>
//             )}
//             {selectedCategory === t('FoodDelivery') && (
//             // {selectedCategory === "Food Delivery" && (
//               <>
//                 <View
//                   style={{ flex: 1, height: containerHeight, width: "100%" }}
//                 >
//                   {savedApps_fd.length > 0 ? (
//                     <View style={{ flex: 1 }}>
//                       <ScrollView>
//                         {Array.from({
//                           length: Math.ceil(savedApps_fd.length / 5),
//                         }).map((_, rowIndex) => (
//                           <View
//                             key={rowIndex}
//                             style={{
//                               flexDirection: "row",
//                               marginBottom: 10,
//                               margin: "2%",
//                             }}
//                           >
//                             {savedApps_fd
//                               .slice(rowIndex * 5, (rowIndex + 1) * 5)
//                               .map((app, index) => (
//                                 <TouchableOpacity
//                                   key={index}
//                                   onPress={() => openCategoryApp(app)}
//                                   style={{
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     marginTop: 10,
//                                     marginRight: 6,
//                                   }}
//                                 >
//                                   <Image
//                                     style={{
//                                       width: 40,
//                                       height: 40,
//                                       marginBottom: 5,
//                                       margin: "3%",
//                                     }}
//                                     source={{
//                                       uri: `data:image/png;base64,${app.image}`,
//                                     }}
//                                   />
//                                   <Text
//                                     style={{
//                                       color: "black",
//                                       fontSize: wp(2.5),
//                                     }}
//                                   >
//                                     {app.label}
//                                   </Text>
//                                 </TouchableOpacity>
//                               ))}
//                             {[
//                               ...Array(
//                                 Math.max(0, 5 - (savedApps_fd.length % 5))
//                               ),
//                             ].map((_, index) => (
//                               <View
//                                 key={index}
//                                 style={{
//                                   width: 30,
//                                   height: 30,
//                                   marginRight: 10,
//                                 }}
//                               />
//                             ))}
//                           </View>
//                         ))}
//                       </ScrollView>
//                     </View>
//                   ) : (
//                     <>
//                       <View style={{ flex: 1 }}>
//                         <Text
//                           style={{
//                             color: "grey",
//                             fontSize: wp(3.5),
//                             textAlign: "center",
//                             top: "40%",
//                           }}
//                         >
//                           {t('Dashboard.addFoodDeliveryapps')}
//                           {/* Your can add Food Delivery apps here */}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   <View style={{ position: "absolute", top: "70%", right: 10 }}>
//                     <TouchableOpacity onPress={() => setModalVisible_fd(true)}>
//                       <Add />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </>
//             )}
//             {selectedCategory === t('SocialMedia') && (
//             // {selectedCategory === "Social Media" && (
//               <>
//                 <View
//                   style={{ flex: 1, height: containerHeight, width: "100%" }}
//                 >
//                   {savedApps_sm.length > 0 ? (
//                     <View style={{ flex: 1 }}>
//                       <ScrollView>
//                         {Array.from({
//                           length: Math.ceil(savedApps_sm.length / 5),
//                         }).map((_, rowIndex) => (
//                           <View
//                             key={rowIndex}
//                             style={{
//                               flexDirection: "row",
//                               marginBottom: 10,
//                               margin: "2%",
//                             }}
//                           >
//                             {savedApps_sm
//                               .slice(rowIndex * 5, (rowIndex + 1) * 5)
//                               .map((app, index) => (
//                                 <TouchableOpacity
//                                   key={index}
//                                   onPress={() => openCategoryApp(app)}
//                                   style={{
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     marginTop: 10,
//                                     marginRight: 6,
//                                   }}
//                                 >
//                                   <Image
//                                     style={{
//                                       width: 40,
//                                       height: 40,
//                                       marginBottom: 5,
//                                       margin: "3%",
//                                     }}
//                                     source={{
//                                       uri: `data:image/png;base64,${app.image}`,
//                                     }}
//                                   />
//                                   <Text
//                                     style={{
//                                       color: "black",
//                                       fontSize: wp(2.5),
//                                     }}
//                                   >
//                                     {app.label}
//                                   </Text>
//                                 </TouchableOpacity>
//                               ))}
//                             {[
//                               ...Array(
//                                 Math.max(0, 5 - (savedApps_sm.length % 5))
//                               ),
//                             ].map((_, index) => (
//                               <View
//                                 key={index}
//                                 style={{
//                                   width: 30,
//                                   height: 30,
//                                   marginRight: 10,
//                                 }}
//                               />
//                             ))}
//                           </View>
//                         ))}
//                       </ScrollView>
//                     </View>
//                   ) : (
//                     <>
//                       <View style={{ flex: 1 }}>
//                         <Text
//                           style={{
//                             color: "grey",
//                             fontSize: wp(3.5),
//                             textAlign: "center",
//                             top: "40%",
//                           }}
//                         >
//                           {t('Dashboard.addSocialMediaapp')}
//                           {/* you can add Social Media app here */}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   <View style={{ position: "absolute", top: "70%", right: 10 }}>
//                     <TouchableOpacity onPress={() => setModalVisible_sm(true)}>
//                       <Add />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </>
//             )}
//             {selectedCategory === t('MedicalWellness') && (
//             // {selectedCategory === "Medical Wellness" && (
//               <>
//                 <View
//                   style={{ flex: 1, height: containerHeight, width: "100%" }}
//                 >
//                   {savedApps_mw.length > 0 ? (
//                     <View style={{ flex: 1 }}>
//                       <ScrollView>
//                         {Array.from({
//                           length: Math.ceil(savedApps_mw.length / 5),
//                         }).map((_, rowIndex) => (
//                           <View
//                             key={rowIndex}
//                             style={{
//                               flexDirection: "row",
//                               marginBottom: 10,
//                               margin: "2%",
//                             }}
//                           >
//                             {savedApps_mw
//                               .slice(rowIndex * 5, (rowIndex + 1) * 5)
//                               .map((app, index) => (
//                                 <TouchableOpacity
//                                   key={index}
//                                   onPress={() => openCategoryApp(app)}
//                                   style={{
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     marginTop: 10,
//                                     marginRight: 6,
//                                   }}
//                                 >
//                                   <Image
//                                     style={{
//                                       width: 40,
//                                       height: 40,
//                                       marginBottom: 5,
//                                       margin: "3%",
//                                     }}
//                                     source={{
//                                       uri: `data:image/png;base64,${app.image}`,
//                                     }}
//                                   />
//                                   <Text
//                                     style={{
//                                       color: "black",
//                                       fontSize: wp(2.5),
//                                     }}
//                                   >
//                                     {app.label}
//                                   </Text>
//                                 </TouchableOpacity>
//                               ))}
//                             {[
//                               ...Array(
//                                 Math.max(0, 5 - (savedApps_mw.length % 5))
//                               ),
//                             ].map((_, index) => (
//                               <View
//                                 key={index}
//                                 style={{
//                                   width: 30,
//                                   height: 30,
//                                   marginRight: 10,
//                                 }}
//                               />
//                             ))}
//                           </View>
//                         ))}
//                       </ScrollView>
//                     </View>
//                   ) : (
//                     <>
//                       <View style={{ flex: 1 }}>
//                         <Text
//                           style={{
//                             color: "grey",
//                             fontSize: wp(3.5),
//                             textAlign: "center",
//                             top: "40%",
//                           }}
//                         >
//                           {t('Dashboard.addMedicalwallnessapp')}
//                           {/* You can Medical wallness app here */}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   <View style={{ position: "absolute", top: "70%", right: 10 }}>
//                     <TouchableOpacity onPress={() => setModalVisible_mw(true)}>
//                       <Add />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </>
//             )}
//             {selectedCategory === t('Grocery') && (
//             // {selectedCategory === "Grocery" && (
//               <>
//                 <View
//                   style={{ flex: 1, height: containerHeight, width: "100%" }}
//                 >
//                   {savedApps_g.length > 0 ? (
//                     <View style={{ flex: 1 }}>
//                       <ScrollView>
//                         {Array.from({
//                           length: Math.ceil(savedApps_g.length / 5),
//                         }).map((_, rowIndex) => (
//                           <View
//                             key={rowIndex}
//                             style={{
//                               flexDirection: "row",
//                               marginBottom: 10,
//                               margin: "2%",
//                             }}
//                           >
//                             {savedApps_g
//                               .slice(rowIndex * 5, (rowIndex + 1) * 5)
//                               .map((app, index) => (
//                                 <TouchableOpacity
//                                   key={index}
//                                   onPress={() => openCategoryApp(app)}
//                                   style={{
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     marginTop: 10,
//                                     marginRight: 6,
//                                   }}
//                                 >
//                                   <Image
//                                     style={{
//                                       width: 40,
//                                       height: 40,
//                                       marginBottom: 5,
//                                       margin: "3%",
//                                     }}
//                                     source={{
//                                       uri: `data:image/png;base64,${app.image}`,
//                                     }}
//                                   />
//                                   <Text
//                                     style={{
//                                       color: "black",
//                                       fontSize: wp(2.5),
//                                     }}
//                                   >
//                                     {app.label}
//                                   </Text>
//                                 </TouchableOpacity>
//                               ))}
//                             {[
//                               ...Array(
//                                 Math.max(0, 5 - (savedApps_g.length % 5))
//                               ),
//                             ].map((_, index) => (
//                               <View
//                                 key={index}
//                                 style={{
//                                   width: 30,
//                                   height: 30,
//                                   marginRight: 10,
//                                 }}
//                               />
//                             ))}
//                           </View>
//                         ))}
//                       </ScrollView>
//                     </View>
//                   ) : (
//                     <>
//                       <View style={{ flex: 1 }}>
//                         <Text
//                           style={{
//                             color: "grey",
//                             fontSize: wp(3.5),
//                             textAlign: "center",
//                             top: "40%",
//                           }}
//                         >
//                           {t('Dashboard.addGroceryapps')}
//                           {/* You can add Grocery apps here */}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   <View style={{ position: "absolute", top: "70%", right: 10 }}>
//                     <TouchableOpacity onPress={() => setModalVisible_g(true)}>
//                       <Add />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </>
//             )}
//             {selectedCategory === t('Employment') && (
//             // {selectedCategory === "Employment" && (
//               <>
//                 <View
//                   style={{ flex: 1, height: containerHeight, width: "100%" }}
//                 >
//                   {savedApps_em.length > 0 ? (
//                     <View style={{ flex: 1 }}>
//                       <ScrollView>
//                         {Array.from({
//                           length: Math.ceil(savedApps_em.length / 5),
//                         }).map((_, rowIndex) => (
//                           <View
//                             key={rowIndex}
//                             style={{
//                               flexDirection: "row",
//                               marginBottom: 10,
//                               margin: "2%",
//                             }}
//                           >
//                             {savedApps_em
//                               .slice(rowIndex * 5, (rowIndex + 1) * 5)
//                               .map((app, index) => (
//                                 <TouchableOpacity
//                                   key={index}
//                                   onPress={() => openCategoryApp(app)}
//                                   style={{
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     marginTop: 10,
//                                     marginRight: 6,
//                                   }}
//                                 >
//                                   <Image
//                                     style={{
//                                       width: 40,
//                                       height: 40,
//                                       marginBottom: 5,
//                                       margin: "3%",
//                                     }}
//                                     source={{
//                                       uri: `data:image/png;base64,${app.image}`,
//                                     }}
//                                   />
//                                   <Text
//                                     style={{
//                                       color: "black",
//                                       fontSize: wp(2.5),
//                                     }}
//                                   >
//                                     {app.label}
//                                   </Text>
//                                 </TouchableOpacity>
//                               ))}
//                             {[
//                               ...Array(
//                                 Math.max(0, 5 - (savedApps_em.length % 5))
//                               ),
//                             ].map((_, index) => (
//                               <View
//                                 key={index}
//                                 style={{
//                                   width: 30,
//                                   height: 30,
//                                   marginRight: 10,
//                                 }}
//                               />
//                             ))}
//                           </View>
//                         ))}
//                       </ScrollView>
//                     </View>
//                   ) : (
//                     <>
//                       <View style={{ flex: 1 }}>
//                         <Text
//                           style={{
//                             color: "grey",
//                             fontSize: wp(3.5),
//                             textAlign: "center",
//                             top: "40%",
//                           }}
//                         >
//                           {t('Dashboard.addEmploymentapps')}
//                           {/* Your can add Employment apps here */}
//                         </Text>
//                       </View>
//                     </>
//                   )}
//                   <View style={{ position: "absolute", top: "70%", right: 10 }}>
//                     <TouchableOpacity onPress={() => setModalVisible_em(true)}>
//                       <Add />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </>
//             )}
//           </>
//         )}
//         {/* //////////////// ///////////////////////////////////////////////////////////////////////abouve for comments */}
//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}

//         {/* Video Mania */}
//         <View style={styles.latestSearchList}>
//           <View>

//             <VideoActive width={23} height={23} />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: 'center' }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             data={Xpisearches}
//             keyExtractor={item => item.id.toString()}
//             renderItem={({ item }) => renderSearchesVideo(item)}
//           />
//         </View>
//         <View
//           style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom: 30 }}
//         >
//           <View style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
//             {DataTopXpiData === undefined ? (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "contain",
//                 }}
//                 source={appImages.galleryPlaceHolder}
//               />
//             ) : (
//               <TouchableOpacity style={{ width: '100%', height: "100%", borderRadius: wp(5) }} onPress={() => navigation.navigate('VideoPlayerScreen', { videoUri: DataTopXpiData.video, identifier: false })}>
//                 <Image
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     zIndex: 1, // Ensure it's on top of other elements
//                     //flex: 1,
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: wp(3),
//                     resizeMode: "contain",
//                   }}
//                   source={appImages.videoPlaceHolder}
//                 // source={{ uri: DataTopXpiData?.thumbnail }}
//                 />
//               </TouchableOpacity>
//             )}
//             <View
//               style={{
//                 position: "absolute",
//                 top: hp(16),
//                 left: 0,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 zIndex: 2, // Ensure it's on top
//               }}
//             >
//               <Text
//                 ellipsizeMode="tail"
//                 numberOfLines={1}
//                 style={{
//                   fontSize: hp(2.5),
//                   fontFamily: "Inter-Medium",
//                   color: "black",
//                   fontWeight: "700",
//                   marginLeft: 12
//                 }}
//               >
//                 {DataTopXpiData?.name}
//               </Text>
//             </View>
//           </View>

//           <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={7}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(1),
//                 lineHeight: hp(2),
//                 fontFamily: "Inter-Regular",
//                 color: "#000000",
//                 //fontWeight: '700',
//               }}
//             >
//               {DataTopXpiData === undefined || DataTopXpiData === 0
//                 ? "No Top Pic Shown"
//                 : DataTopXpiData?.description}
//             </Text>
//           </View>
//         </View>

//         <View style={{
//           flex: 1, marginTop: hp(2),
//           marginBottom: hp(5)
//         }}>
//           {isXpiLoading ? (
//             <ActivityIndicator size="large" color="#FACA4E" />
//           ) : noXpiData ? (
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >

//               <Text style={{ fontFamily: "Inter-Regular", color:'gray'}}>{t('Dashboard.NoDataavailable')}</Text>
//             </View>

//           ) : (
//             <FlatList
//               data={Xpisections}
//               renderItem={renderXpiVideoSection}
//               keyExtractor={(item) => item.title}
//             />
//           )}
//         </View>

//         {/* /////////////////////////////////////////////////////////////// */}
//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />

//         {/* //////////////////////////////////////////////////////////// */}

//         <View style={[styles.latestSearchList, { marginLeft: wp(1) }]}>
//           <View>
//             <ProfileActive width={23} height={23} />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             data={Picsearches}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => renderSearchesPic(item)}
//           />
//         </View>

//         <View

//           style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(15) }}
//         >
//           <View
//             onPress={() => console.log("TOP DETAILS", DataTopPicData)}
//             style={{
//               width: wp(35),
//               marginLeft: wp(2.5),
//               height: "100%",
//               borderRadius: wp(5),
//             }}
//           >
//             {!DataTopPicData?.image ||
//               DataTopPicData?.image === "undefined" ||
//               DataTopPicData?.image.startsWith("/") ? (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//                 source={appImages?.galleryPlaceHolder}
//               />
//             ) : (
//               <TouchableOpacity style={{ width: "100%", height: "100%", borderRadius: wp(3) }}
//                 onPress={() => navigation.navigate("TopPicView", { picData: DataTopPicData })}>
//                 <Image
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     zIndex: 1, // Ensure it's on top of other elements
//                     //flex: 1,
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: wp(3),
//                     resizeMode: "cover",
//                   }}
//                   source={{ uri: DataTopPicData?.image }}
//                 />
//               </TouchableOpacity>
//             )}

//           </View>

//           <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2, marginLeft: '2%' }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={7}
//               style={{
//                 fontSize: hp(1.5),
//                 lineHeight: hp(2),
//                 fontFamily: "Inter-Regular",
//                 color: "#000000",
//                 //fontWeight: '700',
//               }}
//             >
//               {DataTopPicData === 0 === undefined || DataTopPicData === 0
//                 ? "No Top Pic Shown"
//                 : DataTopPicData?.description}
//             </Text>
//           </View>
//         </View>

//         <View style={{
//           flex: 1, marginTop: hp(2),
//           marginBottom: hp(5)
//         }}>
//           {isPicLoading ? (
//             <ActivityIndicator size="large" color="#FACA4E" />
//           ) : noPicData ? (
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ fontFamily: "Inter-Regular",  color:'gray'}}>{t('Dashboard.NoDataavailable')}</Text>
//             </View>

//           ) : (
//             <FlatList
//               data={Picsections}
//               renderItem={renderPicsSection}
//               keyExtractor={(item) => item.title}
//               onEndReached={() => {
//                 if (hasMoreData && !loadingMore) {
//                   fetchSubCategorySport(selectedPicItemId, currentPage + 1);
//                   setCurrentPage((prevPage) => prevPage + 1);
//                 }
//               }}
//               onEndReachedThreshold={0.5} // Trigger when the user is halfway to the end
//               ListFooterComponent={
//                 loadingMore && <ActivityIndicator size="small" color="#0000ff" />
//               }
//             />
//           )}
//         </View>

//         {/* /////////////////////////////////////////////////////////////// */}
//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}

//         {/* News module start */}
//         <View style={styles.latestSearchList}>
//           <View>
//             <News name="news" size={28} color="#FACA4E" />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             data={searchesNewsData}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => renderNewsSearches(item)}
//           />
//         </View>

//         <View
//           style={{
//             marginTop: hp(1.5),
//             marginBottom: hp(1),
//             flexDirection: "row",
//             height: hp(18),
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => navigation.navigate("ViewNews", { picData: topNewsData })}
//           >
//             {topNewsData === undefined ||
//               topNewsData.length === 0 ||
//               topNewsData.image === undefined ||
//               topNewsData.image === null ||
//               topNewsData.image === "" ||
//               topNewsData.image === "0" ? (
//               <View
//                 //onPress={() => navigation.navigate('News')}
//                 style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
//               >
//                 <Image
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     zIndex: 1, // Ensure it's on top of other elements
//                     //flex: 1,
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: wp(3),
//                     resizeMode: "cover",
//                   }}
//                   source={appImages.galleryPlaceHolder}
//                 />
//               </View>
//             ) : (
//               <View
//                 style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
//               >
//                 <Image
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,

//                     zIndex: 1, // Ensure it's on top of other elements
//                     //flex: 1,
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: wp(3),
//                     resizeMode: "cover",
//                   }}
//                   source={{ uri: topNewsData.image }}
//                 />
//               </View>
//             )}
//           </TouchableOpacity>
//           <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={7}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(1),
//                 lineHeight: hp(2),
//                 fontFamily: "Inter-Regular",
//                 color: "#000000",
//                 //fontWeight: '700',
//               }}
//             >
//               {topNewsData === undefined || topNewsData === 0
//                 ? "No Top News Shown"
//                 : topNewsData?.description}
//             </Text>
//           </View>
//         </View>

//         {/* //////////////////////////////////////////////////////////// */}
//         <View style={{
//           flex: 1, marginTop: hp(2),
//           marginBottom: hp(5)
//         }}>
//           {newLoader ? (
//             <ActivityIndicator size="large" color="#FACA4E" />
//           ) : noNewData ? (
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ fontFamily: "Inter-Regular", color:'gray'}}>{t('Dashboard.NoDataavailable')}</Text>
//             </View>

//           ) : (
//             <FlatList
//               data={Newsections}
//               renderItem={renderNewsSection}
//               keyExtractor={(item) => item.title}
//             />
//           )}
//         </View>

//         {/* /////////////////////////////////////////////////////////////// */}

//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}
//         {/* News module end */}

//         {/* Post letter module start */}
//         <View style={styles.latestSearchList}>
//           <View>
//             <LetterIcon name="newsletter" size={30} color="#FACA4E" />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             data={lettersearchesData}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => renderPostLetterSearches(item)}
//           />
//         </View>

//         <View
//           style={{
//             marginTop: hp(1.5),
//             marginBottom: hp(.1),
//             flexDirection: "row",
//             height: hp(14),
//           }}
//         >
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("LetterDetails", {
//                 Letters: topLetterData,
//                 identifier: false,
//               })
//             }
//             style={{
//               width: wp(45),
//               marginHorizontal: wp(2),
//             }} // Add margin here
//           >
//             <View
//               style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
//             ></View>
//             <View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   paddingHorizontal: 2,
//                   alignItems: "center",
//                   height: hp(4),
//                 }}
//               >
//                 {topLetterData?.userimage !== null ||
//                   topLetterData?.userimage !== undefined ? (
//                   <View
//                     style={{
//                       height: hp(2),
//                       width: wp(4),
//                       borderRadius: wp(3),
//                     }}
//                   >
//                     <Image
//                       source={{ uri: topLetterData?.userimage }}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         borderRadius: wp(3),
//                         resizeMode: "cover",
//                       }}
//                     />
//                   </View>
//                 ) : (
//                   <MaterialCommunityIcons
//                     style={{ marginTop: hp(0.5) }}
//                     name={"account-circle"}
//                     size={35}
//                     color={"#FACA4E"}
//                   />
//                 )}

//                 <View style={{ marginLeft: wp(2.5) }}>
//                   <Approved width={10} height={10} />
//                 </View>
//               </View>

//               <View
//                 style={{
//                   alignItems: "flex-end",
//                   height: 10,
//                   // marginRight: wp(1),
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "#282828",
//                     // marginLeft: wp(3),
//                     width: "25%",
//                     fontSize: 6,
//                     fontFamily: "Inter-Bold",
//                   }}
//                 >
//                   {top_post_date}
//                 </Text>
//               </View>

//               <View
//                 style={{
//                   flexDirection: "row",
//                   height: hp(5),
//                   paddingTop: 6,
//                   // backgroundColor:'red', width:'60%'
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "#282828",
//                     fontSize: 8,
//                     textDecorationLine: "underline",
//                     fontFamily: "Inter-Bold",
//                   }}
//                 >
//                   {/* Subject: */}
//                   {t('Dashboard.Subject')}
//                 </Text>
//                 <View style={{ height: "100%", width: "75%" }}>
//                   <Text
//                     numberOfLines={3}
//                     ellipsizeMode="tail"
//                     style={{
//                       color: "#595959",
//                       marginLeft: wp(1),
//                       fontSize: 8,
//                       fontFamily: "Inter-Regular",
//                     }}
//                   >
//                     {topLetterData.subject_place}
//                   </Text>
//                 </View>
//               </View>
//               <View
//                 style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
//               ></View>
//             </View>
//           </TouchableOpacity>
//         </View>

//  {/* //////////////////////////////////////////////////////////// */}
//  <View style={{  flex: 1,
//     marginBottom: hp(5)}}>
//       {postletterloading ? (
//         <ActivityIndicator size="large" color="#FACA4E" />
//       ) : noletterData ? (
//         <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//          <Text style={{ fontFamily: "Inter-Medium",}}>{t('NoDataAvailable')}</Text>
//       </View>

//       ) : (
//         <FlatList
//           data={lettersections}
//           renderItem={renderLetterSection}
//           keyExtractor={(item) => item.title}
//           onEndReached={() => {
//             if (hasMoreLetterData && !loadingMoreLetters) {
//               fetchLetterSubCategorySport(letterselectedItemId, currentLetterPage + 1);
//               setCurrentLetterPage((prevPage) => prevPage + 1);
//             }
//           }}
//           onEndReachedThreshold={0.5} // Trigger pagination when 50% near the end
//           ListFooterComponent={
//             loadingMoreLetters && <ActivityIndicator size="small" color="#FACA4E" />
//           }
//         />
//       )}
//     </View>

// {/* /////////////////////////////////////////////////////////////// */}

//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}

//         {/* Post letter module end */}

//         {/* QAFI Module start */}
//         <View style={styles.latestSearchList}>
//           <View>
//             <QafiIcon name="people-arrows" size={22} color="#FACA4E" />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             data={searchesQAFIData}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => renderQAFISearches(item)}
//           />
//         </View>

//         <View
//           style={{
//             marginTop: hp(1.5),
//             marginBottom: hp(1),
//             flexDirection: "row",
//             height: hp(18),
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => navigation.navigate("ViewQAFI", { picData: TopQAFIData })}
//           >
//             {TopQAFIData === undefined ||
//               TopQAFIData.length === 0 ||
//               TopQAFIData.image === undefined ||
//               TopQAFIData.image === null ||
//               TopQAFIData.image === "" ||
//               TopQAFIData.image === "0" ? (
//               <View
//                 //onPress={() => navigation.navigate('News')}
//                 style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
//               >
//                 <Image
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     zIndex: 1, // Ensure it's on top of other elements
//                     //flex: 1,
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: wp(3),
//                     resizeMode: "cover",
//                   }}
//                   source={appImages.galleryPlaceHolder}
//                 />
//               </View>
//             ) : (
//               <View
//                 style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
//               >
//                 <Image
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,

//                     zIndex: 1, // Ensure it's on top of other elements
//                     //flex: 1,
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: wp(3),
//                     resizeMode: "cover",
//                   }}
//                   source={{ uri: TopQAFIData.image }}
//                 />
//               </View>
//             )}
//           </TouchableOpacity>

//           <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={7}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(1),
//                 lineHeight: hp(2),
//                 fontFamily: "Inter-Regular",
//                 color: "#000000",
//                 //fontWeight: '700',
//               }}
//             >
//               {TopQAFIData === undefined || TopQAFIData === 0
//                 ? "No Top QAFI Shown"
//                 : TopQAFIData?.description}
//             </Text>
//           </View>
//         </View>

//         {/* //////////////////////////////////////////////////////////// */}
//         <View style={{
//           flex: 1, marginTop: hp(2),
//           marginBottom: hp(5)
//         }}>
//           {QAFILoading ? (
//             <ActivityIndicator size="large" color="#FACA4E" />
//           ) : noQAFIData ? (
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ fontFamily: "Inter-Medium", color:'gray' }}>{t('Dashboard.NoDataavailable')}</Text>
//             </View>

//           ) : (
//             <FlatList
//               data={QAFIsections}
//               renderItem={renderQAFISection}
//               keyExtractor={(item) => item.title}
//             />
//           )}
//         </View>

//         {/* /////////////////////////////////////////////////////////////// */}

//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}
//         {/* QAFI Module end*/}

//         {/* EBC Module start */}

//         <View style={styles.latestSearchList}>
//           <View>
//             <EBC name="sticker-emoji" size={30} color="#FACA4E" />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             data={searchesEBCData}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => renderEBCSearches(item)}
//           />
//         </View>
//         <View
//           style={{
//             marginTop: hp(1.5),
//             marginBottom: hp(1),
//             flexDirection: "row",
//             height: hp(18),
//           }}
//         >
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("ViewGEBC", { picData: TopEBCData })}
//           >
//             {TopEBCData === undefined ||
//               TopEBCData.length === 0 ||
//               TopEBCData.image === undefined ||
//               TopEBCData.image === null ||
//               TopEBCData.image === "" ||
//               TopEBCData.image === "0" ? (
//               <View
//                 //onPress={() => navigation.navigate('News')}
//                 style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
//               >
//                 <Image
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     zIndex: 1, // Ensure it's on top of other elements
//                     //flex: 1,
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: wp(3),
//                     resizeMode: "cover",
//                   }}
//                   source={appImages.galleryPlaceHolder}
//                 />
//               </View>
//             ) : (
//               <View
//                 style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
//               >
//                 <View
//                   style={{
//                     width: "100%",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: hp(10),
//                     borderRadius: wp(1),
//                     resizeMode: "stretch",
//                     borderWidth: 1, // Border width
//                     borderColor: "grey", // Border color
//                   }}
//                 >
//                   <Text style={{ fontSize: hp(5) }}>{TopEBCData.image}</Text>
//                 </View>

//               </View>
//             )}
//           </TouchableOpacity>
//           <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2, marginLeft: '2%' }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={7}
//               style={{
//                 fontSize: hp(1.5),
//                 lineHeight: hp(2),
//                 fontFamily: "Inter-Regular",
//                 color: "#000000",
//                 //fontWeight: '700',
//               }}
//             >
//               {TopEBCData === undefined || TopEBCData === 0
//                 ? "No Top EBC Shown"
//                 : TopEBCData?.description}
//             </Text>
//           </View>
//         </View>

//         {/* //////////////////////////////////////////////////////////// */}
//         <View style={{
//           flex: 1, marginTop: hp(2),
//           marginBottom: hp(5)
//         }}>
//           {EBCLoading ? (
//             <ActivityIndicator size="large" color="#FACA4E" />
//           ) : noEBCData ? (
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ fontFamily: "Inter-Medium", color:'gray' }}>{t('Dashboard.NoDataavailable')}</Text>
//             </View>

//           ) : (
//             <FlatList
//               data={EBCsections}
//               renderItem={renderEBCSection}
//               keyExtractor={(item) => item.title}
//             />
//           )}
//         </View>

//         {/* /////////////////////////////////////////////////////////////// */}

//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}
//         {/* EBC Module End */}

//         {/* Cinematics Moodule Start */}
//         <View style={styles.latestSearchList}>
//           <View>
//             <Cinematiceactive width={23} height={23} />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             data={Cinematicdata}
//             //keyExtractor={item => item.id.toString()}
//             renderItem={({ item }) => renderCinematicSearches(item)}
//           />
//         </View>

//         <View style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom: 30 }}>
//           <TouchableOpacity onPress={() => navigation.navigate('Cinematics_details', { videoData: dataTopVideos, identifier: false })} style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
//             {dataTopVideos === 0 ? (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//                 source={appImages.galleryPlaceHolder}
//               />
//             ) : (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//                 source={{ uri: dataTopVideos?.thumbnail }}
//               />
//             )}
//             <View
//               style={{
//                 position: "absolute",
//                 top: hp(16),
//                 left: 0,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 zIndex: 2, // Ensure it's on top
//               }}
//             >
//               <Text
//                 ellipsizeMode="tail"
//                 numberOfLines={1}
//                 style={{
//                   fontSize: hp(2.5),
//                   fontFamily: "Inter-Medium",
//                   color: "black",
//                   fontWeight: "700",
//                 }}
//               >
//                 {dataTopVideos?.name}
//               </Text>
//             </View>
//           </TouchableOpacity>

//           <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={7}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(1),
//                 lineHeight: hp(2),
//                 fontFamily: "Inter-Regular",
//                 color: "#000000",
//                 //fontWeight: '700',
//               }}
//             >

//               {dataTopVideos === undefined || dataTopVideos === 0
//                 ? "No Top Pic Shown"
//                 : dataTopVideos?.description}
//             </Text>
//           </View>
//         </View>

//         <View style={{
//           flex: 1,
//           paddingTop: 20
//         }}>
//           {cinLoading ? (
//             <ActivityIndicator size="large" color="#FACA4E" />
//           ) : (
//             <FlatList
//               data={sections}
//               renderItem={renderSection}
//               keyExtractor={(item) => item.title}
//             />
//           )}
//         </View>
//         {/* Cinematics Moodule end */}

//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}

//         {/* Fan star zone start */}
//         <View style={styles.latestSearchList}>
//           <View>
//             <FansActive width={23} height={23} />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             data={fandata}
//             //keyExtractor={item => item.id.toString()}
//             renderItem={({ item }) => renderFanstartSearches(item)}
//           />
//         </View>
//         <View
//           style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom: 30 }}
//         >
//           <TouchableOpacity onPress={() => navigation.navigate('Fans_star_details', { videoData: dataTopFanVideos })} style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
//             {dataTopFanVideos === 0 ? (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//                 source={appImages.galleryPlaceHolder}
//               />
//             ) : (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//                 source={{ uri: dataTopFanVideos?.thumbnail }}
//               />
//             )}
//             <View
//               style={{
//                 position: "absolute",
//                 top: hp(16),
//                 left: 0,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 zIndex: 2, // Ensure it's on top
//               }}
//             >
//               <Text
//                 ellipsizeMode="tail"
//                 numberOfLines={1}
//                 style={{
//                   fontSize: hp(2.5),
//                   fontFamily: "Inter-Medium",
//                   color: "black",
//                   fontWeight: "700",
//                 }}
//               >
//                 {dataTopFanVideos?.name}
//               </Text>
//             </View>
//           </TouchableOpacity>

//           <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={7}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(1),
//                 lineHeight: hp(2),
//                 fontFamily: "Inter-Regular",
//                 color: "#000000",
//                 //fontWeight: '700',
//               }}
//             >
//               {dataTopFanVideos === undefined || dataTopFanVideos === 0
//                 ? "No Top Pic Shown"
//                 : dataTopFanVideos?.description}
//             </Text>
//           </View>
//         </View>

//         <View style={{
//           flex: 1,
//           paddingTop: 20
//         }}>
//           {fanLoading ? (
//             <ActivityIndicator size="large" color="#FACA4E" />
//           ) : (
//             <FlatList
//               data={fansections}
//               renderItem={renderFanSection}
//               keyExtractor={(item) => item.title}
//             />
//           )}
//         </View>

//         {/* /////////////////////////////////////////////////////////////// */}
//         {/* fan star zone end */}

//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}

//         {/* Kids Vid Start */}
//         <View style={styles.latestSearchList}>
//           <View>
//             <KidsActive width={23} height={23} />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             //data={regions}
//             data={kiddata}
//             //keyExtractor={item => item.id.toString()}
//             renderItem={({ item }) => renderKidsSearches(item)}
//           />
//         </View>

//         <View
//           style={{
//             marginTop: hp(1.5),
//             flexDirection: "row",
//             height: hp(16),
//             marginBottom: 30,
//           }}
//         >
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("Kids_vid_details", {
//                 videoData: dataKidTopVideos,
//               })
//             }
//             style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}
//           >
//             {dataKidTopVideos === 0 ? (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//                 source={appImages.galleryPlaceHolder}
//               />
//             ) : (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//                 source={{ uri: dataKidTopVideos?.thumbnail }}
//               />
//             )}
//             <View
//               style={{
//                 position: "absolute",
//                 top: hp(16),
//                 left: 0,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 zIndex: 2, // Ensure it's on top
//               }}
//             >
//               <Text
//                 ellipsizeMode="tail"
//                 numberOfLines={1}
//                 style={{
//                   fontSize: hp(2.5),
//                   fontFamily: "Inter-Medium",
//                   color: "black",
//                   fontWeight: "700",
//                 }}
//               >
//                 {dataKidTopVideos?.name}
//               </Text>
//             </View>
//           </TouchableOpacity>

//           <View
//             style={{
//               justifyContent: "flex-start",
//               width: "50%",
//               paddingTop: 2,
//             }}
//           >
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={7}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(1),
//                 lineHeight: hp(2),
//                 fontFamily: "Inter-Regular",
//                 color: "#000000",
//                 //fontWeight: '700',
//               }}
//             >

//               {dataKidTopVideos === undefined || dataKidTopVideos === 0
//                 ? "No Top Pic Shown"
//                 : dataKidTopVideos?.description}
//             </Text>
//           </View>
//         </View>

//         {/* //////////////////////////////////////////////////////////// */}
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           {kidLoading ? (
//             <ActivityIndicator size="large" color="#FACA4E" />
//           ) : (
//             <FlatList
//               data={kidsections}
//               renderItem={renderKidSection}
//               keyExtractor={(item) => item.title}
//             />
//           )}
//         </View>

//         {/* /////////////////////////////////////////////////////////////// */}
//         {/* Kids Vid End */}

//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}

//         <View style={styles.latestSearchList}>
//           <View>
//             <PuzzleActive width={23} height={23} />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             //data={regions}
//             data={learndata}
//             //keyExtractor={item => item.id.toString()}
//             renderItem={({ item }) => renderLearnSearches(item)}
//           />
//         </View>
//         <View
//           style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom: 30 }}
//         >
//           <TouchableOpacity onPress={() => navigation.navigate('Learning_details', { videoData: datalearnTopVideos })} style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
//             {datalearnTopVideos === 0 ? (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//                 source={appImages.galleryPlaceHolder}
//               />
//             ) : (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//                 source={{ uri: datalearnTopVideos?.thumbnail }}
//               />
//             )}
//             <View
//               style={{
//                 position: "absolute",
//                 top: hp(16),
//                 left: 0,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 zIndex: 2, // Ensure it's on top
//               }}
//             >
//               <Text
//                 ellipsizeMode="tail"
//                 numberOfLines={1}
//                 style={{
//                   fontSize: hp(2.5),
//                   fontFamily: "Inter-Medium",
//                   color: "black",
//                   fontWeight: "700",
//                 }}
//               >
//                 {datalearnTopVideos?.name}
//               </Text>
//             </View>
//           </TouchableOpacity>

//           <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={7}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(1),
//                 lineHeight: hp(2),
//                 fontFamily: "Inter-Regular",
//                 color: "#000000",
//                 //fontWeight: '700',
//               }}
//             >
//               {datalearnTopVideos === undefined || datalearnTopVideos === 0
//                 ? "No Top Pic Shown"
//                 : datalearnTopVideos?.description}
//             </Text>
//           </View>
//         </View>

//         {/* //////////////////////////////////////////////////////////// */}
//         <View style={{
//           flex: 1,
//           paddingTop: 20
//         }}>
//           {learnLoading ? (
//             <ActivityIndicator size="large" color="#FACA4E" />
//           ) : (
//             <FlatList
//               data={learnsections}
//               renderItem={renderLearnSection}
//               keyExtractor={(item) => item.title}
//             />
//           )}
//         </View>

//         {/* /////////////////////////////////////////////////////////////// */}
//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}

//         <View style={styles.latestSearchList}>
//           <View>
//             <TVpromaxActive width={23} height={23} />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             //data={regions}
//             data={tvdata}
//             //keyExtractor={item => item.id.toString()}
//             renderItem={({ item }) => renderTvSearches(item)}
//           />
//         </View>
//         <View
//           style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom: 30 }}
//         >
//           <TouchableOpacity onPress={() => navigation.navigate('Tv_Promax_details', { videoData: datatvTopVideos })} style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
//             {datatvTopVideos === undefined ? (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//                 source={appImages.galleryPlaceHolder}
//               />
//             ) : (
//               <Image
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   zIndex: 1, // Ensure it's on top of other elements
//                   //flex: 1,
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//                 source={{ uri: datatvTopVideos?.thumbnail }}
//               />
//             )}
//             <View
//               style={{
//                 position: "absolute",
//                 top: hp(16),
//                 left: 0,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 zIndex: 2, // Ensure it's on top
//               }}
//             >
//               <Text
//                 ellipsizeMode="tail"
//                 numberOfLines={1}
//                 style={{
//                   fontSize: hp(2.5),
//                   fontFamily: "Inter-Medium",
//                   color: "black",
//                   fontWeight: "700",
//                 }}
//               >
//                 {datatvTopVideos?.name}
//               </Text>
//             </View>
//           </TouchableOpacity>

//           <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={7}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(1),
//                 lineHeight: hp(2),
//                 fontFamily: "Inter-Regular",
//                 color: "#000000",
//                 //fontWeight: '700',
//               }}
//             >
//               {datatvTopVideos === undefined || datatvTopVideos === 0
//                 ? "No Top Pic Shown"
//                 : datatvTopVideos?.description}
//             </Text>
//           </View>
//         </View>

//         {/* //////////////////////////////////////////////////////////// */}
//         <View style={{
//           flex: 1,
//           paddingTop: 20
//         }}>
//           {tvLoading ? (
//             <ActivityIndicator size="large" color="#FACA4E" />
//           ) : (
//             <FlatList
//               data={tvsections}
//               renderItem={renderTvSection}
//               keyExtractor={(item) => item.title}
//             />
//           )}
//         </View>

//         {/* /////////////////////////////////////////////////////////////// */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}

//         {/* Market Zone */}

//         <View style={styles.latestSearchListMarket}>
//           <View>
//             <MarketActive width={23} height={23} />
//           </View>
//           <FlatList
//             style={{ flex: 1 }}
//             contentContainerStyle={{ alignItems: "center" }}
//             showsHorizontalScrollIndicator={false}
//             horizontal
//             //data={regions}
//             data={RegionArea}
//             //keyExtractor={item => item.id.toString()}
//             renderItem={({ item }) => renderSearchesMarket(item)}
//           />
//         </View>

//         <View
//           style={{ marginTop: hp(2), flexDirection: "row", height: hp(16) }}
//         >
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("ProductDetails", { ProductDetails: DataTopVideosMarket })
//             }>
//             <View style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
//               {firstImageUrl === 0 ? (
//                 <Image
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     zIndex: 1, // Ensure it's on top of other elements
//                     //flex: 1,
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: wp(3),
//                     resizeMode: "cover",
//                   }}
//                   source={appImages.galleryPlaceHolder}
//                 />
//               ) : (
//                 <Image
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     zIndex: 1, // Ensure it's on top of other elements
//                     //flex: 1,
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: wp(3),
//                     resizeMode: "cover",
//                   }}
//                   source={{ uri: firstImageUrl }}
//                 />
//               )}
//             </View>
//           </TouchableOpacity>
//           <View style={{ width: "50%", }}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={7}
//               style={{
//                 fontSize: hp(1.5),
//                 marginLeft: wp(1),
//                 lineHeight: hp(2),
//                 fontFamily: "Inter-Regular",
//                 color: "#000000",
//                 //fontWeight: '700',
//               }}
//             >
//               {dataTopVideos === undefined || dataTopVideos === 0
//                 ? "No Top Pic Shown"
//                 : dataTopVideos?.description}
//             </Text>
//           </View>
//         </View>
//         <View style={{ marginTop: hp(4), height: hp(23) }}>
//           <Text
//             style={{
//               fontSize: hp(2.3),
//               //marginLeft: wp(3),
//               fontFamily: "Inter-SemiBold",
//               color: "#4A4A4A",
//             }}
//           >
//             {categoriesSelectMarket[0]?.label}
//           </Text>

//           <View style={{ marginTop: hp(1), height: "100%" }}>
//             {marketLoding === true ? (
//               <View
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <ActivityIndicator size="large" color="#FACA4E" />
//               </View>
//             ) : (
//               <>
//                 {dataElectronics?.length === 0 ? (
//                   <View
//                     style={{
//                       flex: 1,
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
//                       {t('Dashboard.NoDataavailable')}
//                     </Text>
//                   </View>
//                 ) : (
//                   <FlatList
//                     style={{ flex: 1 }}
//                     showsHorizontalScrollIndicator={false}
//                     data={dataElectronics}
//                     horizontal
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) => renderAvailableAppsMarket(item)}
//                   />
//                 )}
//               </>
//             )}
//           </View>
//         </View>

//         <View style={{ marginTop: hp(4), height: hp(23) }}>
//           <Text
//             style={{
//               fontSize: hp(2.3),
//               fontFamily: "Inter-SemiBold",
//               color: "#4A4A4A",
//             }}
//           >
//             {categoriesSelectMarket[1]?.label}
//           </Text>

//           <View style={{ marginTop: hp(1), height: "100%" }}>
//             {marketLoding === true ? (
//               <View
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <ActivityIndicator size="large" color="#FACA4E" />
//               </View>
//             ) : (
//               <>
//                 {/* {dummydataVehicles?.length === 0 ? ( */}
//                 {dataVehicles?.length === 0 ? (
//                   <View
//                     style={{
//                       flex: 1,
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                    <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
//                       {t('Dashboard.NoDataavailable')}
//                     </Text>
//                   </View>
//                 ) : (
//                   <FlatList
//                     style={{ flex: 1 }}
//                     showsHorizontalScrollIndicator={false}
//                     data={dataVehicles}
//                     // data={dummydataVehicles}
//                     horizontal
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) => renderAvailableAppsMarket(item)}
//                   />
//                 )}
//               </>
//             )}
//           </View>
//         </View>

//         <View style={{ marginTop: hp(4), height: hp(23) }}>
//           <Text
//             style={{
//               fontSize: hp(2.3),
//               // marginLeft: wp(3),
//               fontFamily: "Inter-SemiBold",
//               color: "#4A4A4A",
//             }}
//           >
//             {categoriesSelectMarket[2]?.label}
//           </Text>

//           <View style={{ marginTop: hp(1), height: "100%" }}>
//             {marketLoding === true ? (
//               <View
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <ActivityIndicator size="large" color="#FACA4E" />
//               </View>
//             ) : (
//               <>
//                 {dataClothing?.length === 0 ? (
//                   <View
//                     style={{
//                       flex: 1,
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
//                       {t('Dashboard.NoDataavailable')}
//                     </Text>
//                   </View>
//                 ) : (
//                   <FlatList
//                     style={{ flex: 1 }}
//                     showsHorizontalScrollIndicator={false}
//                     data={dataClothing}
//                     horizontal
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) => renderAvailableAppsMarket(item)}
//                   />
//                 )}
//               </>
//             )}
//           </View>
//         </View>

//         <View style={{ marginTop: hp(4), height: hp(23) }}>
//           <Text
//             style={{
//               fontSize: hp(2.3),
//               fontFamily: "Inter-SemiBold",
//               color: "#4A4A4A",

//             }}
//           >
//             {categoriesSelectMarket[3]?.label}
//           </Text>

//           <View style={{ marginTop: hp(1), height: "100%" }}>
//             {marketLoding === true ? (
//               <View
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <ActivityIndicator size="large" color="#FACA4E" />
//               </View>
//             ) : (
//               <>
//                 {allMarket?.length === 0 ? (
//                   <View
//                     style={{
//                       flex: 1,
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
//                       {t('Dashboard.NoDataavailable')}
//                     </Text>
//                   </View>
//                 ) : (
//                   <FlatList
//                     style={{ flex: 1 }}
//                     showsHorizontalScrollIndicator={false}
//                     data={allMarket}
//                     horizontal
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) => renderAvailableAppsMarket(item)}
//                   />
//                 )}
//               </>
//             )}
//           </View>
//         </View>
//         {/* market zone end */}

//         {/* // start of banner slider */}
//         <BannerCarousel
//           isLoading={isLoading}
//           adsData={adsInActiveData}
//           noDataMessage={t('Dashboard.NoBanner')}
//           onBannerPress={handleBannerPress}
//         />
//         {/* ////slider end */}

//       </ScrollView>

//       {/* <View
//         style={{
//           position: 'absolute',
//           top: 0,
//           bottom: 0,
//           left: 0,
//           right: 0,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         {aLoader && <ActivityIndicator size="large" color="#FACA4E" />}
//       </View> */}
// <CustomModal
// visible={modalDeleteApps}
// onClose={() => setModalDeleteApps(false)}
// headerText={t('Alert!')}
// bodyText={t('SureToRemoveTheApp')}
// cancelText={t('Drawer.Cancel')}
// doneText={t('YesDelete')}
// onCancel={() => handleCancel()}
// onConfirm={() => handleConfirm()}
// />

// <CustomModal
// visible={modalDeleteFavouriteApps}
// onClose={() => setModalDeleteFavouriteApps(false)}
// headerText={t('Alert!')}
// bodyText={t('SureToRemoveFromFavourites')}
// cancelText={t('Drawer.Cancel')}
// doneText={t('YesRemove')}
// onCancel={() => handleCancelFavourite()}
// onConfirm={() => handleConfirmFavourite()}
// />

// {/* //       <CustomModal
// //        visible={modalDeleteApps}
// //        onClose={() => setModalDeleteApps(false)}
// //        headerText="Alert?"
// //        bodyText="Are You Sure You Want To Remove The App"
// //        cancelText={"Cancel"}
// //        doneText={"Yes, Delete"}
// //       onCancel={() => handleCancel()}
// //        onConfirm={() => handleConfirm()}
// //      />

// //      <CustomModal
// //        visible={modalDeleteFavouriteApps}
// //        onClose={() => setModalDeleteFavouriteApps(false)}
// //       headerText="Alert!"
// //        bodyText="Are You Sure You Want To Remove From Favourites?"
// //        cancelText={"Cancel"}
// //        doneText={"Yes, Remove"}
// //       onCancel={() => handleCancelFavourite()}
// //        onConfirm={() => handleConfirmFavourite()}
// //      /> */}

//       <Modal
//         visible={modalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer1}>
//           <View style={styles.modalContent1}>
//             <View style={{ marginTop: hp(-3), height: hp(30) }}>
//               {/* {isLoading ? (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <ActivityIndicator size="large" color="#FACA4E" />
//                 </View>
//               ) : ( */}
//                 <>
//                   <View style={styles.leftContent1}>
//                     <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
//                     <View style={{ left: "100%" }}>
//                       <TouchableOpacity
//                         onPress={handleSave}
//                         style={{ height: 30, width: 30, paddingLeft: 4 }}
//                       >
//                         <Ionicons
//                           name="checkmark-sharp"
//                           size={24}
//                           color="#FACA4E"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                   <View style={{ flex: 1, bottom: "15%" }}>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginTop: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginBottom: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </>
//               {/* )} */}
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         visible={modalVisible_b}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible_b(false)}
//       >
//         <View style={styles.modalContainer1}>
//           <View style={styles.modalContent1}>
//             <View style={{ marginTop: hp(-3), height: hp(30) }}>
//               {/* {isLoading ? (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <ActivityIndicator size="large" color="#FACA4E" />
//                 </View>
//               ) : ( */}
//                 <>
//                   <View style={styles.leftContent1}>
//                     <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
//                     <View style={{ left: "100%" }}>
//                       <TouchableOpacity
//                         onPress={handleSave_b}
//                         style={{ height: 30, width: 30, paddingLeft: 4 }}
//                       >
//                         <Ionicons
//                           name="checkmark-sharp"
//                           size={24}
//                           color="#FACA4E"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                   <View style={{ flex: 1, bottom: "15%" }}>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_b(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginTop: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_b(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginBottom: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </>
//               {/* )} */}
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         visible={modalVisible_sp}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible_sp(false)}
//       >
//         <View style={styles.modalContainer1}>
//           <View style={styles.modalContent1}>
//             <View style={{ marginTop: hp(-3), height: hp(30) }}>
//               {/* {isLoading ? (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <ActivityIndicator size="large" color="#FACA4E" />
//                 </View>
//               ) : ( */}
//                 <>
//                   <View style={styles.leftContent1}>
//                     <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
//                     <View style={{ left: "100%" }}>
//                       <TouchableOpacity
//                         onPress={handleSave_sp}
//                         style={{ height: 30, width: 30, paddingLeft: 4 }}
//                       >
//                         <Ionicons
//                           name="checkmark-sharp"
//                           size={24}
//                           color="#FACA4E"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                   <View style={{ flex: 1, bottom: "15%" }}>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_sp(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginTop: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_sp(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginBottom: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </>
//               {/* )} */}
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         visible={modalVisible_e}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible_e(false)}
//       >
//         <View style={styles.modalContainer1}>
//           <View style={styles.modalContent1}>
//             <View style={{ marginTop: hp(-3), height: hp(30) }}>
//               {/* {isLoading ? (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <ActivityIndicator size="large" color="#FACA4E" />
//                 </View>
//               ) : ( */}
//                 <>
//                   <View style={styles.leftContent1}>
//                     <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
//                     <View style={{ left: "100%" }}>
//                       <TouchableOpacity
//                         onPress={handleSave_e}
//                         style={{ height: 30, width: 30, paddingLeft: 4 }}
//                       >
//                         <Ionicons
//                           name="checkmark-sharp"
//                           size={24}
//                           color="#FACA4E"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                   <View style={{ flex: 1, bottom: "15%" }}>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_e(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginTop: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_e(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginBottom: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </>
//               {/* )} */}
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         visible={modalVisible_d}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible_d(false)}
//       >
//         <View style={styles.modalContainer1}>
//           <View style={styles.modalContent1}>
//             <View style={{ marginTop: hp(-3), height: hp(30) }}>
//               {/* {isLoading ? (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <ActivityIndicator size="large" color="#FACA4E" />
//                 </View>
//               ) : ( */}
//                 <>
//                   <View style={styles.leftContent1}>
//                     <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
//                     <View style={{ left: "100%" }}>
//                       <TouchableOpacity
//                         onPress={handleSave_d}
//                         style={{ height: 30, width: 30, paddingLeft: 4 }}
//                       >
//                         <Ionicons
//                           name="checkmark-sharp"
//                           size={24}
//                           color="#FACA4E"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                   <View style={{ flex: 1, bottom: "15%" }}>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_d(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginTop: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_d(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginBottom: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </>
//               {/* )} */}
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         visible={modalVisible_fd}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible_fd(false)}
//       >
//         <View style={styles.modalContainer1}>
//           <View style={styles.modalContent1}>
//             <View style={{ marginTop: hp(-3), height: hp(30) }}>
//               {/* {isLoading ? (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <ActivityIndicator size="large" color="#FACA4E" />
//                 </View>
//               ) : ( */}
//                 <>
//                   <View style={styles.leftContent1}>
//                     <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
//                     <View style={{ left: "100%" }}>
//                       <TouchableOpacity
//                         onPress={handleSave_fd}
//                         style={{ height: 30, width: 30, paddingLeft: 4 }}
//                       >
//                         <Ionicons
//                           name="checkmark-sharp"
//                           size={24}
//                           color="#FACA4E"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                   <View style={{ flex: 1, bottom: "15%" }}>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_fd(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginTop: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_fd(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginBottom: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </>
//               {/* )} */}
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         visible={modalVisible_sm}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible_sm(false)}
//       >
//         <View style={styles.modalContainer1}>
//           <View style={styles.modalContent1}>
//             <View style={{ marginTop: hp(-3), height: hp(30) }}>
//               {/* {isLoading ? (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <ActivityIndicator size="large" color="#FACA4E" />
//                 </View>
//               ) : ( */}
//                 <>
//                   <View style={styles.leftContent1}>
//                     <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
//                     <View style={{ left: "100%" }}>
//                       <TouchableOpacity
//                         onPress={handleSave_sm}
//                         style={{ height: 30, width: 30, paddingLeft: 4 }}
//                       >
//                         <Ionicons
//                           name="checkmark-sharp"
//                           size={24}
//                           color="#FACA4E"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                   <View style={{ flex: 1, bottom: "15%" }}>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_sm(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginTop: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_sm(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginBottom: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </>
//               {/* )} */}
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         visible={modalVisible_mw}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible_mw(false)}
//       >
//         <View style={styles.modalContainer1}>
//           <View style={styles.modalContent1}>
//             <View style={{ marginTop: hp(-3), height: hp(30) }}>
//               {/* {isLoading ? (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <ActivityIndicator size="large" color="#FACA4E" />
//                 </View>
//               ) : ( */}
//                 <>
//                   <View style={styles.leftContent1}>
//                     <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
//                     <View style={{ left: "100%" }}>
//                       <TouchableOpacity
//                         onPress={handleSave_mw}
//                         style={{ height: 30, width: 30, paddingLeft: 4 }}
//                       >
//                         <Ionicons
//                           name="checkmark-sharp"
//                           size={24}
//                           color="#FACA4E"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                   <View style={{ flex: 1, bottom: "15%" }}>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_mw(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginTop: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_mw(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginBottom: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </>
//               {/* )} */}
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         visible={modalVisible_g}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible_g(false)}
//       >
//         <View style={styles.modalContainer1}>
//           <View style={styles.modalContent1}>
//             <View style={{ marginTop: hp(-3), height: hp(30) }}>
//               {/* {isLoading ? (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <ActivityIndicator size="large" color="#FACA4E" />
//                 </View>
//               ) : ( */}
//                 <>
//                   <View style={styles.leftContent1}>
//                     <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
//                     <View style={{ left: "100%" }}>
//                       <TouchableOpacity
//                         onPress={handleSave_g}
//                         style={{ height: 30, width: 30, paddingLeft: 4 }}
//                       >
//                         <Ionicons
//                           name="checkmark-sharp"
//                           size={24}
//                           color="#FACA4E"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                   <View style={{ flex: 1, bottom: "15%" }}>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_g(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginTop: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                     <View style={{ top: "5%" }}>
//                       <FlatList
//                         data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                         renderItem={({ item }) => renderAppsFav_g(item)}
//                         contentContainerStyle={{
//                           borderWidth: 1,
//                           marginRight: wp(2.3),
//                           // marginBottom: hp(3),
//                           borderColor: "#00000017",
//                           borderRadius: wp(3),
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </>
//               {/* )} */}
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         visible={modalVisible_em}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible_em(false)}
//       >
//         <View style={styles.modalContainer1}>
//           <View style={styles.modalContent1}>
//             <View style={{ marginTop: hp(-3), height: hp(30) }}>
//               {/* {isLoading ? (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <ActivityIndicator size="large" color="#FACA4E" />
//                 </View>
//               ) :  ( */}
//                   <>
//                     <View style={styles.leftContent1}>
//                       <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
//                       <View style={{ left: "100%" }}>
//                         <TouchableOpacity
//                           onPress={handleSave_em}
//                           style={{ height: 30, width: 30, paddingLeft: 4 }}
//                         >
//                           <Ionicons
//                             name="checkmark-sharp"
//                             size={24}
//                             color="#FACA4E"
//                           />
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                     <View style={{ flex: 1, bottom: "15%" }}>
//                       <View style={{ top: "5%" }}>
//                         <FlatList
//                           data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
//                           horizontal
//                           showsHorizontalScrollIndicator={false}
//                           keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                           renderItem={({ item }) => renderAppsFav_em(item)}
//                           contentContainerStyle={{
//                             borderWidth: 1,
//                             marginRight: wp(2.3),
//                             // marginTop: hp(3),
//                             borderColor: "#00000017",
//                             borderRadius: wp(3),
//                           }}
//                         />
//                       </View>
//                       <View style={{ top: "5%" }}>
//                         <FlatList
//                           data={dataApps.slice(Math.ceil(dataApps.length / 2))}
//                           horizontal
//                           showsHorizontalScrollIndicator={false}
//                           keyExtractor={(item, itemIndex) => `${itemIndex}`}
//                           renderItem={({ item }) => renderAppsFav_em(item)}
//                           contentContainerStyle={{
//                             borderWidth: 1,
//                             marginRight: wp(2.3),
//                             // marginBottom: hp(3),
//                             borderColor: "#00000017",
//                             borderRadius: wp(3),
//                           }}
//                         />
//                       </View>
//                     </View>
//                   </>
//                 {/* )} */}
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <CustomSnackbar
//         message={"Success"}
//         messageDescription={"Apps added in category"}
//         onDismiss={dismissSnackbar} // Make sure this function is defined
//         visible={snackbarVisible}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //marginHorizontal: wp(3),
//     backgroundColor: "white",
//   },
//   bannerview: {
//     height: hp(15),
//     marginTop: hp(2),
//     marginBottom: hp(1),
//     alignSelf: "center",
//     resizeMode: "cover",
//     width: "100%",
//     borderRadius: wp(2),
//     paddingHorizontal: wp(5),
//   },
//   TopBannerView: {
//     height: '100%', width: '100%', borderWidth: 1, borderColor: 'gray', borderRadius: 10, flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   containerBlur: {
//     flex: 1,
//     // backgroundColor: "rgba(234,233,238)",
//     backgroundColor: 'white'
//   },
//   searchBar: {
//     height: hp(5.9),
//     marginTop: hp(3),
//     flex: 1,
//     backgroundColor: "#F2F2F2",
//     flexDirection: "row",
//     alignItems: "center",
//     //marginLeft: wp(3.8),
//     borderRadius: wp(5),
//     borderWidth: 0.5,
//     borderColor: "#00000017",
//   },

//   searchHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-evenly",
//     marginTop: hp(5),
//     marginHorizontal: wp(8),
//     height: hp(8),
//     //borderWidth: 3,
//   },
//   latestSearch: {
//     fontFamily: "Inter",
//     fontWeight: "bold",
//     fontSize: wp(4.3),
//     marginTop: hp(2),
//     marginLeft: wp(10),
//     color: "#595959",
//   },

//   searchesDetails: {
//     flexDirection: "row",
//     marginLeft: wp(3),
//     alignItems: "center",
//     justifyContent: "center",
//     // padding: 10,
//     paddingHorizontal:wp(3),
//     paddingVertical:hp(1.4),
//     backgroundColor: "#F2F2F2",
//     borderRadius: wp(5),
//   },
//   textSearchDetails: {
//     fontFamily: "Inter",
//     fontWeight: "700",
//     fontSize: hp(1.8),
//   },
//   textHeader: {
//     fontSize: wp(5.7),
//     color: "#333333",
//     fontFamily: "Inter",
//     fontWeight: "bold",
//   },

//   // Category Styles
//   items: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     //borderWidth: 1,
//     borderColor: "black",
//     padding: 10,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   overlayButton: {
//     backgroundColor: "#FACA4E",
//     padding: 10,
//     alignItems: "center",
//     //marginHorizontal: wp(5),
//     justifyContent: "center",
//     marginTop: hp(5),
//     borderRadius: 5,
//   },
//   absolute: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//   },

//   modalContent: {
//     //   width: '80%',
//     //justifyContent:'center',
//     //alignItems:'center',
//     //borderWidth:3,
//     //backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     backgroundColor: "transparent",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//   },

//   modalContentCross: {
//     position: "absolute",
//     backgroundColor: "white",
//     top: 18,
//     zIndex: 999,
//     right: 16,
//     width: wp(10),
//     height: wp(10),
//     borderRadius: wp(10),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   //---------------\\

//   //video styles
//   latestSearchListVideo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: hp(2.1),
//     height: hp(7),
//     marginLeft: wp(5),
//     //borderWidth: 3,
//   },
//   ti: {
//     marginHorizontal: "7%",
//     marginTop: "5%",
//     width: 300,
//     backgroundColor: "white",
//     fontSize: wp(4),
//     paddingLeft: "2%",
//     borderRadius: 10,
//   },
//   textInputSelectedCategory: {
//     borderWidth: 1,
//     borderRadius: wp(3),
//     width: "98%",
//     borderColor: "#FACA4E",

//     paddingHorizontal: 20,
//     paddingVertical: 6.8,
//     marginBottom: 20,
//     marginTop: hp(3),
//   },
//   textInputCategoryNonSelected: {
//     borderWidth: 1,
//     borderRadius: wp(3),
//     width: "98%",
//     borderColor: "#E7EAF2",
//     paddingHorizontal: 20,
//     paddingVertical: 6.8,
//     marginBottom: 20,
//     marginTop: hp(3),
//   },
//   iconStyle: {
//     color: "#C4C4C4",
//     width: 20,
//     height: 20,
//   },
//   iconStyleInactive: {
//     color: "#FACA4E",
//   },
//   maintext: {
//     fontSize: hp(2.3),
//     color: "#303030",
//     fontWeight: "bold",
//   },
//   modaltextview: {
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     width: wp(90),
//     borderRadius: 25,
//     backgroundColor: "white",
//     paddingHorizontal: wp(15),
//   },
//   optiontext: {
//     fontSize: hp(1.7),
//     color: "#303030",
//     marginLeft: wp(4),
//   },
//   nonselectedItems: {
//     width: wp(35),
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     height: hp(14),
//     borderRadius: wp(1.8),
//     borderWidth: 1,
//     borderColor: "#E7EAF2",
//   },
//   selectedItems: {
//     width: wp(35),
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     height: hp(14),
//     borderRadius: wp(1.8),
//     borderWidth: 1,
//     borderColor: "#FACA4E",
//   },

//   // Disc Styles
//   searchesDetailsDisc: {
//     flexDirection: "row",
//     marginLeft: wp(3),
//     alignItems: "center",
//     justifyContent: "center",
//     width: wp(25),
//     backgroundColor: "#F2F2F2",
//     borderRadius: wp(5),
//     height: hp(5),
//   },
//   latestSearchListDisc: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: hp(2.1),
//     height: hp(7),
//   },

//   //---------------\\

//   // Pic tour styles

//   latestSearchListPicss: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: hp(2.1),
//     height: hp(7),
//     marginLeft: wp(5),
//     //borderWidth: 3,
//   },

//   latestSearchListMarket: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: hp(2.1),
//     height: hp(7),

//     //borderWidth: 3,
//   },
//   latestSearchList: {
//     flexDirection: "row",
//     alignItems: "center",
//     // marginTop: hp(1),
//     height: hp(7),

//   },
//   searchesDetailsCategory: {
//     flexDirection: "row",
//     marginLeft: wp(3),
//     alignItems: "center",
//     justifyContent: "center",
//     // width: wp(30),
//     backgroundColor: "#F2F2F2",
//     borderRadius: wp(5),
//     // height: hp(5),
//     paddingHorizontal:wp(3),
//     paddingVertical:hp(1.3),

//   },
//   // ///////////////////////////

//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//   },

//   modalContent: {
//     backgroundColor: "transparent",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//   },

//   modalContentCross: {
//     position: "absolute",
//     backgroundColor: "white",
//     top: 18,
//     zIndex: 999,
//     right: 16,
//     width: wp(10),
//     height: wp(10),
//     borderRadius: wp(10),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer1: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent1: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//     elevation: 5,
//     height: "40%",
//   },
//   leftContent1: {
//     flex: 1,
//     flexDirection: "row",
//     alignContent: "center",
//     top: "10%",

//   },
//   leftText1: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "black",
//     marginRight: 20
//   },
//   rightContent1: {
//     marginLeft: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   additionalContentContainer: {
//     marginTop: 10,
//     height: hp(25),
//     borderWidth: 1,
//     borderColor: "#00000017",
//     borderRadius: wp(3),
//     justifyContent: "center",
//   },
//   flatListContainer: {
//     paddingHorizontal: wp(2.3),
//     marginTop: hp(3),
//   },
//   text: {
//     marginTop: 5,
//     fontSize: hp(2.3),
//     marginLeft: wp(1),
//     fontFamily: "Inter-Bold",
//     color: "#4A4A4A",
//   },
//   textname: {

//     marginTop: 5,
//     fontSize: hp(1.8),
//     fontFamily: "Inter-SemiBold",
//     color: "#4A4A4A",
//   },
//   itemContainer: {
//     marginRight: wp(2),
//     width: wp(35),
//     // alignItems: "center",
//   },
//   text1: {
//     color: "#4A4A4A",
//     fontSize: hp(1.5),
//     fontFamily: "Inter",

//   },

//   image: {
//     width: wp(35),
//     height: hp(12),
//     resizeMode: "cover",
//     borderRadius: 10,
//   },
//   nametext: {
//     fontWeight: "700",
//     color: "#4A4A4A",
//     fontSize: hp(2),
//     // textAlign: 'left',
//     fontFamily: "Inter",
//     marginTop: 5,
//     fontSize: hp(1.9),
//     // right: "20%",
//   },

//   sectionContainer: {
//     marginBottom: 20,
//   },
//   sectionHeader: {

//     color: "#4A4A4A",
//     fontSize: hp(2.3),
//     textAlign: "left",
//     fontFamily: "Inter-SemiBold",
//     marginBottom: 6
//     // top: "6%",
//   },
//   videoItem: {
//     marginRight: 15,
//   },

//   noDataText: {
//     textAlign: 'center',
//     marginVertical: 20,
//     fontSize: 18,
//     color: 'gray',
//   },
//   NoDataView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   NoDataText: {
//     fontWeight: "500", fontSize: hp(2.1)
//   }
// });

/////////////////////////////////////////////////////////

// // export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Dashboard = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [topVideo, setTopVideo] = useState(null);
//   const [videosByCategory, setVideosByCategory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [authToken, setAuthToken] = useState(null);

//   const base_url = 'http://192.168.18.24:3005/';

//   useEffect(() => {
//     const getAuthToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('authToken ');
//         if (token) {
//           setAuthToken(token);
//           console.log('User token:', token);
//         } else {
//           throw new Error('No auth token found');
//         }
//       } catch (err) {
//         console.error('Error retrieving auth token:', err);
//         setError(err.message);
//       }
//     };

//     getAuthToken();
//   }, []);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       if (!authToken) return;

//       try {
//         setLoading(true);

//         const response = await fetch(`${base_url}videoCategory/getAllVideoCategories`, {
//           method: 'GET',
//           headers: { Authorization: `Bearer ${authToken}` },
//         });
//         const responseJson = await response.json();
//         const allCategories = responseJson.AllCategories;

//         if (allCategories.length === 0) {
//           throw new Error('No categories found');
//         }

//         setCategories(allCategories);
//         setSelectedCategoryId(allCategories[0]?.id); // Automatically select the first category
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, [authToken]);

//   useEffect(() => {
//     const fetchVideosByCategory = async () => {
//       if (!authToken || !selectedCategoryId) return;

//       try {
//         setLoading(true);

//         const [response2, response3] = await Promise.all([
//           fetch(`${base_url}top/getAllTopVideosByCategory/${selectedCategoryId}`, {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${authToken}` },
//           }),
//           fetch(`${base_url}xpi/getAllVideosBycategory/${selectedCategoryId}`, {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${authToken}` },
//           }),
//         ]);

//         const response2Json = await response2.json();
//         const response3Json = await response3.json();

//         setTopVideo(response2Json.AllVideos[0]);
//         setVideosByCategory(response3Json.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideosByCategory();
//   }, [authToken, selectedCategoryId]);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Horizontal Category List */}
//       <FlatList
//         data={categories}
//         horizontal
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.categoryItem,
//               selectedCategoryId === item.id && styles.selectedCategory,
//             ]}
//             onPress={() => setSelectedCategoryId(item.id)}
//           >
//             <Text style={styles.categoryText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.categoryList}
//       />

//       {/* Display Data */}
//       <ScrollView contentContainerStyle={styles.dataContainer}>
//         <Text style={styles.heading}>Top Video</Text>
//         <Text style={styles.responseText}>{JSON.stringify(topVideo, null, 2)}</Text>

//         <Text style={styles.heading}>Videos by Category</Text>
//         <Text style={styles.responseText}>{JSON.stringify(videosByCategory, null, 2)}</Text>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   categoryList: {
//     paddingVertical: 8,
//   },
//   categoryItem: {
//     padding: 12,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   selectedCategory: {
//     backgroundColor: '#007bff',
//   },
//   categoryText: {
//     color: '#000',
//   },
//   dataContainer: {
//     padding: 16,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   responseText: {
//     fontSize: 16,
//     marginBottom: 12,
//     backgroundColor: '#f4f4f4',
//     padding: 8,
//     borderRadius: 8,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
// });

// export default Dashboard;
///////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Dashboard = () => {
//   const [data, setData] = useState({
//     categories: [],
//     topVideo: null,
//     videosByCategory: [],
//   });
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [authToken, setAuthToken] = useState(null);

//   const base_url = 'http://192.168.18.24:3005/';

//   useEffect(() => {
//     const getAuthToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('authToken ');
//         if (token) {
//           setAuthToken(token);
//           console.log('User token:', token);
//         } else {
//           throw new Error('No auth token found');
//         }
//       } catch (err) {
//         console.error('Error retrieving auth token:', err);
//         setError(err.message);
//       }
//     };

//     getAuthToken();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!authToken) return;

//       try {
//         setLoading(true);

//         // Fetch categories
//         const response1 = await fetch(`${base_url}videoCategory/getAllVideoCategories`, {
//           method: 'GET',
//           headers: { Authorization: `Bearer ${authToken}` },
//         });
//         const response1Json = await response1.json();
//         const allCategories = response1Json.AllCategories;

//         if (allCategories.length === 0) {
//           throw new Error('No categories found');
//         }

//         const defaultCategoryId = allCategories[0]?.id;
//         setSelectedCategoryId(defaultCategoryId);
//         console.log('response 3-------------', defaultCategoryId)
//         // Fetch top video and videos by category
//         const [response2, response3] = await Promise.all([
//           fetch(`${base_url}top/getAllTopVideosByCategory/${defaultCategoryId}`, {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${authToken}` },
//           }),
//           fetch(`${base_url}xpi/getAllVideosBycategory/${defaultCategoryId}`, {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${authToken}` },
//           }),
//         ]);

//         const response2Json = await response2.json();
//         const response3Json = await response3.json();

//         // Update state with all API data
//         setData({
//           categories: allCategories,
//           topVideo: response2Json.AllVideos[0],
//           videosByCategory: response3Json.data,
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [authToken]);

//   useEffect(() => {
//     const fetchVideosForCategory = async () => {
//       if (!authToken || !selectedCategoryId) return;

//       try {
//         setLoading(true);

//         const [response2, response3] = await Promise.all([
//           fetch(`${base_url}top/getAllTopVideosByCategory/${selectedCategoryId}`, {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${authToken}` },
//           }),
//           fetch(`${base_url}xpi/getAllVideosBycategory/${selectedCategoryId}`, {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${authToken}` },
//           }),
//         ]);

//         const response2Json = await response2.json();
//         const response3Json = await response3.json();

//         // Update only topVideo and videosByCategory in the state
//         setData((prevState) => ({
//           ...prevState,
//           topVideo: response2Json.AllVideos[0],
//           videosByCategory: response3Json.data,
//         }));
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideosForCategory();
//   }, [authToken, selectedCategoryId]);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Horizontal Category List */}
//       <FlatList
//         data={data.categories}
//         horizontal
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.categoryItem,
//               selectedCategoryId === item.id && styles.selectedCategory,
//             ]}
//             onPress={() => setSelectedCategoryId(item.id)}
//           >
//             <Text style={styles.categoryText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.categoryList}
//       />

//       {/* Display Data */}
//       <ScrollView contentContainerStyle={styles.dataContainer}>
//         <Text style={styles.heading}>Top Video</Text>
//         <Text style={styles.responseText}>{JSON.stringify(data.topVideo, null, 2)}</Text>

//         <Text style={styles.heading}>Videos by Category</Text>
//         <Text style={styles.responseText}>{JSON.stringify(data.videosByCategory, null, 2)}</Text>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   categoryList: {
//     paddingVertical: 8,
//   },
//   categoryItem: {
//     padding: 12,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   selectedCategory: {
//     backgroundColor: '#007bff',
//   },
//   categoryText: {
//     color: '#000',
//   },
//   dataContainer: {
//     padding: 16,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   responseText: {
//     fontSize: 16,
//     marginBottom: 12,
//     backgroundColor: '#f4f4f4',
//     padding: 8,
//     borderRadius: 8,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
// });

// export default Dashboard;
/////////////////////////

///////////////////////////

// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Dashboard = () => {
//   const [data, setData] = useState({
//     categories: [],
//     topVideo: null,
//     videosByCategory: [],
//   });
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [authToken, setAuthToken] = useState(null);

//   const base_url = 'http://192.168.18.24:3005/';

//   // Fetch auth token from AsyncStorage
//   useEffect(() => {
//     const getAuthToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('authToken ');
//         if (token) {
//           setAuthToken(token);
//           console.log('User token:', token);
//         } else {
//           throw new Error('No auth token found');
//         }
//       } catch (err) {
//         console.error('Error retrieving auth token:', err);
//         setError(err.message);
//       }
//     };

//     getAuthToken();
//   }, []);

//   // Fetch categories only once
//   useEffect(() => {
//     const fetchCategories = async () => {
//       if (!authToken) return;

//       try {
//         setLoading(true);

//         const response = await fetch(`${base_url}videoCategory/getAllVideoCategories`, {
//           method: 'GET',
//           headers: { Authorization: `Bearer ${authToken}` },
//         });

//         const responseJson = await response.json();
//         const allCategories = responseJson.AllCategories;

//         if (allCategories.length === 0) {
//           throw new Error('No categories found');
//         }

//         // Set categories and select the default category
//         setData((prev) => ({ ...prev, categories: allCategories }));
//         const defaultCategoryId = allCategories[0]?.id;
//         setSelectedCategoryId(defaultCategoryId);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, [authToken]);

//   // Fetch top videos and videos by category when selectedCategoryId changes
//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       if (!authToken || !selectedCategoryId) return;

//       try {
//         setLoading(true);

//         const [topVideoResponse, videosByCategoryResponse] = await Promise.all([
//           fetch(`${base_url}top/getAllTopVideosByCategory/${selectedCategoryId}`, {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${authToken}` },
//           }),
//           fetch(`${base_url}xpi/getAllVideosBycategory/${selectedCategoryId}`, {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${authToken}` },
//           }),
//         ]);

//         const topVideoJson = await topVideoResponse.json();
//         const videosByCategoryJson = await videosByCategoryResponse.json();

//         // Update state with the fetched data
//         setData((prev) => ({
//           ...prev,
//           topVideo: topVideoJson.AllVideos[0],
//           videosByCategory: videosByCategoryJson.data,
//         }));
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryData();
//   }, [authToken, selectedCategoryId]);

//   // if (loading) {
//   //   return (
//   //     <View style={styles.centered}>
//   //       <ActivityIndicator size="large" color="#0000ff" />
//   //       <Text>Loading...</Text>
//   //     </View>
//   //   );
//   // }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Horizontal Category List */}
//       <FlatList
//         data={data.categories}
//         horizontal
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.categoryItem,
//               selectedCategoryId === item.id && styles.selectedCategory,
//             ]}
//             onPress={() => setSelectedCategoryId(item.id)}
//           >
//             <Text style={styles.categoryText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.categoryList}
//       />

//       {/* Display Data */}
//       <ScrollView contentContainerStyle={styles.dataContainer}>
//         <Text style={styles.heading}>Top Video</Text>
//         <Text style={styles.responseText}>{JSON.stringify(data.topVideo, null, 2)}</Text>

//         <Text style={styles.heading}>Videos by Category</Text>
//         <Text style={styles.responseText}>{JSON.stringify(data.videosByCategory, null, 2)}</Text>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   categoryList: {
//     paddingVertical: 8,
//   },
//   categoryItem: {
//     padding: 12,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   selectedCategory: {
//     backgroundColor: '#007bff',
//   },
//   categoryText: {
//     color: '#000',
//   },
//   dataContainer: {
//     padding: 16,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   responseText: {
//     fontSize: 16,
//     marginBottom: 12,
//     backgroundColor: '#f4f4f4',
//     padding: 8,
//     borderRadius: 8,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
// });

// export default Dashboard;

// working fine as i want
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderCategory from "../../../assets/Custom/RenderCategory";
import TopContent from "../../../assets/Custom/TopContent";
import { appImages } from "../../../assets/utilities";
import SubCategoryList from "../../../assets/Custom/SubCategoryList";
import { useNavigation } from "@react-navigation/native";
import { base_url } from "../../../../../baseUrl";
import Headers from "../../../assets/Custom/Headers";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useIsFocused } from "@react-navigation/native";
import { fetchBannerConfig, fetchBannerInActive } from "../../../../../API";
import BannerCarousel from "../../../assets/Custom/BannerCarousel";
import { useTranslation } from "react-i18next";
import NonVerified from "../../../assets/svg/NonVerified.svg";
import SubCateItem from "../../../assets/Custom/SubCateItem";
import TopLetterComponent from "../../../assets/Custom/TopLetterComponent";
import Approved from "../../../assets/svg/Approved";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileActive from "../../../assets/svg/ProfileActive.svg";
import MailActive from "../../../assets/svg/MailActive";
import MarketActive from "../../../assets/svg/MarketActive";
import Cinematiceactive from "../../../assets/svg/Cinematiceactive";
import FansActive from "../../../assets/svg/FansActive";
import KidsActive from "../../../assets/svg/KidsActive";
import PuzzleActive from "../../../assets/svg/PuzzleActive";
import TVpromaxActive from "../../../assets/svg/TVpromaxActive";
import News from "react-native-vector-icons/Entypo";
import LetterIcon from "react-native-vector-icons/Entypo";
import QafiIcon from "react-native-vector-icons/FontAwesome5";
import EBC from "react-native-vector-icons/MaterialCommunityIcons";
import { VideoActive } from "../../../assets/svg";
import { InstalledApps, RNLauncherKitHelper } from "react-native-launcher-kit";

//----------------- IMPORT VIDE0 -------------------\\
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Ionicons from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
//----------------------------------------------------\\
import CategoryActive from "../../../assets/svg/CategoryActive.svg";
import CategoryInactive from "../../../assets/svg/CategoryInactive";
import Add from "../../../assets/svg/AddMainScreen.svg";
import DotLoader from "../../../assets/Custom/DotLoader";
import CustomaddFavModal from "../../../assets/Custom/CustomaddFavModal";
import CustomMassAppCateModal from "../../../assets/Custom/CustomMassAppCateModal";
import AppGrid from "../../../assets/Custom/AppGrid";



const DashboardJnvryold = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    categories: [],
    topVideo: null,
    videosByCategory: [],
  });
  const { t } = useTranslation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const isFocused = useIsFocused();
  const [adsData, setAdsData] = useState([]);
  const [adsInActiveData, setAdsInActiveData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [DotLoading, setDotLoading] = useState(true); 

    const RegionArea = [
    { name: "Africa", french_name: "Afrique" },
    { name: "Europe", french_name: "Europe" },
    { name: "Americas", french_name: "Amériques" },
    { name: "Asia", french_name: "Asie" },
    { name: "Middle East", french_name: "Moyen-Orient" }
  ];
    const MassApp = [
    t('Ecommerce'),
    t('Business'),
    t('cateSports'),
    t('Education'),
    t('Dating'),
    t('FoodDelivery'),
    t('SocialMedia'),
    t('MedicalWellness'),
    t('Grocery'),
    t('Employment')
  ];
 
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken ");
        if (token) {
          setAuthToken(token);
          console.log("User token:", token);
        } else {
          throw new Error("No auth token found");
        }
      } catch (err) {
        console.error("Error retrieving auth token:", err);
        setError(err.message);
      }
    };
    useEffect(() => {
    getAuthToken();
  }, [isFocused]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setDotLoading(false); // After 15 seconds, stop the loader
  //     fetchData(); // Call your API or other function here
  //   }, 15000);
  //   return () => clearTimeout(timeout);
  // }, []);
  useEffect(() => {
    const checkFirstTime = async () => {
      const isFirstTime = await AsyncStorage.getItem("isFirstTime");
      console.log('isFirstTime---------------------------',isFirstTime )
      if (!isFirstTime) {
        // If it's the first time, show the loader
        setDotLoading(true);
        const timeout = setTimeout(() => {
          setDotLoading(false);
          AsyncStorage.setItem("isFirstTime", "false"); // Mark as shown
        }, 15000);
        return () => clearTimeout(timeout);
      }
    };

    checkFirstTime();
  }, []);

  // useEffect(() => {
  //   if (data.videosByCategory?.length > 0) {
  //     setDotLoading(false); // Set loading to false once data is available
  //   } else {
  //     setDotLoading(true); // Keep loading true until data is available
  //   }
  // }, [authToken, data.videosByCategory]);

  const [language, setLanguage] = useState(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        if (storedLanguage) {
          setLanguage(storedLanguage);
          // console.log("lanugage-------- in dash", storedLanguage);
        }
      } catch (error) {
        console.error("Error fetching language:", error);
      }
    };

    fetchLanguage();
  }, [isFocused]);

  const [topData, setTopData] = useState([]);
  const [dataApps, setDataApps] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [isLongPress, setIsLongPress] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isCancelRemoveModalVisible, setIsCancelRemoveModalVisible] =
  useState(false);
const [isLongPressRemove, setIsLongPressRemove] = useState(false);
const [favouriteItem, setFavouriteItem] = useState(null);
const [removeFavouriteItem, setRemoveFavouriteItem] = useState(null);

  const [ecommerance, setecommerance] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible_b, setModalVisible_b] = useState(false);
  const [modalVisible_sp, setModalVisible_sp] = useState(false);
  const [modalVisible_e, setModalVisible_e] = useState(false);
  const [modalVisible_d, setModalVisible_d] = useState(false);
  const [modalVisible_fd, setModalVisible_fd] = useState(false);
  const [modalVisible_sm, setModalVisible_sm] = useState(false);
  const [modalVisible_mw, setModalVisible_mw] = useState(false);
  const [modalVisible_g, setModalVisible_g] = useState(false);
  const [modalVisible_em, setModalVisible_em] = useState(false);
  const [selectedApps, setSelectedApps] = useState([]);
  const [selectedApps_b, setSelectedApps_b] = useState([]);
  const [selectedApps_sp, setSelectedApps_sp] = useState([]);
  const [selectedApps_e, setSelectedApps_e] = useState([]);
  const [selectedApps_d, setSelectedApps_d] = useState([]);
  const [selectedApps_fd, setSelectedApps_fd] = useState([]);
  const [selectedApps_sm, setSelectedApps_sm] = useState([]);
  const [selectedApps_mw, setSelectedApps_mw] = useState([]);
  const [selectedApps_g, setSelectedApps_g] = useState([]);
  const [selectedApps_em, setSelectedApps_em] = useState([]);
  const [savedApps, setSavedApps] = useState([]);
  const [savedApps_b, setSavedApps_b] = useState([]);
  const [savedApps_sp, setSavedApps_sp] = useState([]);
  const [savedApps_e, setSavedApps_e] = useState([]);
  const [savedApps_d, setSavedApps_d] = useState([]);
  const [savedApps_fd, setSavedApps_fd] = useState([]);
  const [savedApps_sm, setSavedApps_sm] = useState([]);
  const [savedApps_mw, setSavedApps_mw] = useState([]);
  const [savedApps_g, setSavedApps_g] = useState([]);
  const [savedApps_em, setSavedApps_em] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [Sports, setSport] = useState(false);
  const [Education, seteducation] = useState(false);

const [unusedApps, setUnusedApps] = useState([]);

  const initializeAppData = async (setDataApps, setTopData, setFavouriteData) => {
    try {
      // const installedApps = InstalledApps.getSortedApps();
      // const appDataArray = installedApps.map((app) => ({
      //   label: app.label,
      //   bundle: app.packageName,
      //   image: app.icon,
      // }));
      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map((app) => app.label);
      const packageImages = installedApps.map((app) => app.icon);
      const packageBundle = installedApps.map((app) => app.packageName);
      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        bundle: packageBundle[index],
        image: packageImages[index],
      }));

      setDataApps(packageDataArray);
      // setDataApps(appDataArray);
  
      // Top 6 Apps
      const storedTopData = await AsyncStorage.getItem("topData");
      if (storedTopData) {
        setTopData(JSON.parse(storedTopData));
      } else {
        const topSixApps = appDataArray.slice(0, 6).map((item) => ({
          ...item,
          count: 2,
        }));
        await AsyncStorage.setItem("topData", JSON.stringify(topSixApps));
        setTopData(topSixApps);
      }
  
      // Favourite Apps
      const storedFavouriteData = await AsyncStorage.getItem("favouriteData");
      if (!storedFavouriteData) {
        const initialFavouriteData = appDataArray.slice(0, 4);
        await AsyncStorage.setItem(
          "favouriteData",
          JSON.stringify(initialFavouriteData)
        );
        setFavouriteData(initialFavouriteData);
      } else {
        setFavouriteData(JSON.parse(storedFavouriteData));
      }
    } catch (error) {
      console.error("Error initializing app data:", error);
    }
  };
  
  const handleSaveData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to AsyncStorage:`, error);
    }
  };
  
  const fetchAndStoreUnusedApps = async (setUnusedApps) => {
    try {
      const lastUsageDate = new Date().toISOString();
      const installedApps = InstalledApps.getSortedApps();
      const unusedApps = installedApps.map((app) => ({
        label: app.label,
        bundle: app.packageName,
        image: app.icon,
        date: lastUsageDate,
      }));
  
      setUnusedApps(unusedApps);
      await AsyncStorage.setItem("comparisonDate", JSON.stringify(unusedApps));
    } catch (error) {
      console.error("Error fetching unused apps:", error);
    }
  };
  useEffect(() => {
    // Initialize apps and related data
    initializeAppData(setDataApps, setTopData, setFavouriteData);

    // Fetch unused apps
    // fetchAndStoreUnusedApps(setUnusedApps);
  }, []);

  useEffect(() => {
    // Save favourite and top data when updated
    if (favouriteData.length) {
      handleSaveData("favouriteData", favouriteData);
    }

    if (topData.length) {
      handleSaveData("topData", topData);
    }
  }, [favouriteData, topData]);







  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const [activeBannersResult, inactiveBannersResult] = await Promise.all([
        fetchBannerConfig(authToken, base_url),
        fetchBannerInActive(authToken, base_url),
      ]);

      setAdsData(activeBannersResult.AllBanners || []);
      setAdsInActiveData(inactiveBannersResult || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (authToken) {
      fetchBanners();
    }
  }, [authToken]);


    const fetchData = async () => {
      if (!authToken) return;
  
      try {
        setLoading(true);
  
        // Initial fetch: Fetch categories and set the default category
        if (!selectedCategoryId) {
          const response = await fetch(`${base_url}videoCategory/getAllVideoCategories`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          });
          const responseJson = await response.json();
          const allCategories = responseJson?.AllCategories?.reverse();
  
          if (allCategories?.length === 0) {
            throw new Error("No categories found");
          }
  
          // Set categories and default category ID
          setData((prev) => ({
            ...prev,
            categories: allCategories,
          }));
  
          const defaultCategoryId = allCategories[0]?.id;
          setSelectedCategoryId(defaultCategoryId);
          return; // Exit early to avoid fetching category data in this iteration
        }
  
        // Fetch data for the selected category
        const [topVideoResponse, videosByCategoryResponse] = await Promise.all([
          fetch(`${base_url}top/getAllTopVideosByCategory/${selectedCategoryId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          fetch(`${base_url}xpi/getAllVideosBycategory/${selectedCategoryId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);
  
        const topVideoJson = await topVideoResponse.json();
        const videosByCategoryJson = await videosByCategoryResponse.json();
  
        const formattedSections = videosByCategoryJson.data.map((category) => ({
          title:
            language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.video_result.Videos,
        }));
  
        // Update state with data for the selected category
        setData((prev) => ({
          ...prev,
          topVideo: topVideoJson.AllVideos[0],
          videosByCategory: formattedSections,
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchData();
  }, [authToken, language, selectedCategoryId]);
  // const fetchData = async () => {
  //   if (!authToken) return;

  //   try {
  //     setLoading(true);

  //     // Fetch categories, top video, and videos by category in a single operation
  //     const response = await fetch(
  //       `${base_url}videoCategory/getAllVideoCategories`,
  //       {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }
  //     );
  //     const responseJson = await response.json();
  //     const allCategories = responseJson?.AllCategories?.reverse();

  //     if (allCategories?.length === 0) {
  //       throw new Error("No categories found");
  //     }

  //     // Select the default category (first one in the list) if no category is selected
  //     const defaultCategoryId = selectedCategoryId || allCategories[0]?.id;
  //     setSelectedCategoryId(defaultCategoryId);

  //     // Fetch data for the default category
  //     const [topVideoResponse, videosByCategoryResponse] = await Promise.all([
  //       fetch(`${base_url}top/getAllTopVideosByCategory/${defaultCategoryId}`, {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }),
  //       fetch(`${base_url}xpi/getAllVideosBycategory/${defaultCategoryId}`, {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }),
  //     ]);

  //     const topVideoJson = await topVideoResponse.json();
  //     const videosByCategoryJson = await videosByCategoryResponse.json();
  //     const formattedSections = videosByCategoryJson.data.map((category) => ({
  //       title:
  //         language === "fr" && category.sub_category_french_name
  //           ? category.sub_category_french_name
  //           : category.sub_category_name,
  //       data: category.video_result.Videos,
  //     }));
  //     // Update state with all data
  //     setData({
  //       categories: allCategories,
  //       topVideo: topVideoJson.AllVideos[0],
  //       videosByCategory: formattedSections,
  //       // videosByCategory: videosByCategoryJson.data,
  //     });
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (language) {
  //     fetchData();
  //   }
  // }, [authToken, selectedCategoryId, language]);

  /////////////////////////////////////////////////////////////////////////////pic
 
 
 
  const [Picdata, setPicData] = useState({
    categories: [],
    topPic: null,
    PicByCategory: [],
  });
  const [selectedPicCategoryId, setSelectedPicCategoryId] = useState(null);
  const [Picloading, setPicLoading] = useState(true);
  const [Picerror, setPicError] = useState(null);

    const fetchPicData = async () => {
      if (!authToken) return;
  
      try {
        setPicLoading(true);
  
        // Fetch categories if no category is selected
        if (!selectedPicCategoryId) {
          const response = await fetch(
            `${base_url}picCategory/getAllPicCategories`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          const responseJson = await response.json();
          const allCategories = responseJson?.AllCategories;
  
          if (allCategories?.length === 0) {
            throw new Error("No categories found");
          }
  
          // Set categories and default category ID
          setPicData((prev) => ({
            ...prev,
            categories: allCategories,
          }));
  
          const defaultCategoryId = allCategories[0]?.id;
          setSelectedPicCategoryId(defaultCategoryId);
          return; // Exit early to avoid fetching category data in this iteration
        }
  
        // Fetch data for the selected category
        const [topVideoResponse, videosByCategoryResponse] = await Promise.all([
          fetch(`${base_url}top/app/top_tour/${selectedPicCategoryId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          fetch(
            `${base_url}picTour/getAllPicTourByCategory/${selectedPicCategoryId}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${authToken}` },
            }
          ),
        ]);
  
        const topVideoJson = await topVideoResponse.json();
        const topPicData =
          topVideoJson &&
          topVideoJson?.topTour &&
          Array.isArray(topVideoJson?.topTour) &&
          topVideoJson?.topTour?.length > 0
            ? topVideoJson?.topTour[0]
            : null; // Set to null or handle as needed when no valid data is present
  
        const videosByCategoryJson = await videosByCategoryResponse.json();
        const formattedSections = videosByCategoryJson.data.map((category) => ({
          title:
            language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.tour_result.Tours,
        }));
  
        // Update state with category data
        setPicData((prev) => ({
          ...prev,
          topPic: topPicData,
          PicByCategory: formattedSections,
        }));
      } catch (err) {
        setPicError(err.message);
      } finally {
        setPicLoading(false);
      }
    };
    useEffect(() => {
    fetchPicData();
  }, [authToken, selectedPicCategoryId, language]);
  // const fetchPicData = async () => {
  //   if (!authToken) return;

  //   try {
  //     setPicLoading(true);

  //     // Fetch categories, top video, and videos by category in a single operation
  //     const response = await fetch(
  //       `${base_url}picCategory/getAllPicCategories`,
  //       {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }
  //     );
  //     const responseJson = await response.json();
  //     const allCategories = responseJson?.AllCategories;

  //     if (allCategories?.length === 0) {
  //       throw new Error("No categories found");
  //     }

  //     // Select the default category (first one in the list) if no category is selected
  //     const defaultCategoryId = selectedPicCategoryId || allCategories[0]?.id;
  //     setSelectedPicCategoryId(defaultCategoryId);

  //     // Fetch data for the default category
  //     const [topVideoResponse, videosByCategoryResponse] = await Promise.all([
  //       fetch(base_url + `top/app/top_tour/${defaultCategoryId}`, {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }),
  //       fetch(
  //         `${base_url}picTour/getAllPicTourByCategory/${defaultCategoryId}`,
  //         {
  //           method: "GET",
  //           headers: { Authorization: `Bearer ${authToken}` },
  //         }
  //       ),
  //     ]);

  //     const topVideoJson = await topVideoResponse.json();
  //     const topPicData =
  //       topVideoJson &&
  //       topVideoJson?.topTour &&
  //       Array.isArray(topVideoJson?.topTour) &&
  //       topVideoJson?.topTour?.length > 0
  //         ? topVideoJson?.topTour[0]
  //         : []; // Set to null or handle as needed when no valid data is present

  //     const videosByCategoryJson = await videosByCategoryResponse.json();
  //     const formattedSections = videosByCategoryJson.data.map((category) => ({
  //       // title: category.sub_category_name,
  //       title:
  //         language === "fr" && category.sub_category_french_name
  //           ? category.sub_category_french_name
  //           : category.sub_category_name,
  //       data: category.tour_result.Tours,
  //     }));
  //     // Update state with all data
  //     setPicData({
  //       categories: allCategories,
  //       topPic: topPicData,
  //       PicByCategory: formattedSections,
  //       // videosByCategory: videosByCategoryJson.data,
  //     });
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setPicLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (language) {
  //     fetchPicData();
  //   }
  // }, [authToken, selectedPicCategoryId, language]);



  /////////////////////////////////////////////////////////////////////////////News
 
 
  const [Newsdata, setNewsData] = useState({
    categories: [],
    topNews: null,
    NewsByCategory: [],
  });
  const [selectedNewsCategoryId, setSelectedNewsCategoryId] = useState(null);
  const [Newsloading, setNewsLoading] = useState(true);
  const [Newserror, setNewsError] = useState(null);

  // const fetchNewsData = async () => {
  //   if (!authToken) return;

  //   try {
  //     setNewsLoading(true);

  //     // Fetch categories, top video, and videos by category in a single operation
  //     const response = await fetch(`${base_url}news/category/getAll`, {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${authToken}` },
  //     });
  //     const responseJson = await response.json();
  //     const allCategories = responseJson?.AllCategories.reverse();
  //     // console.log("allCategories-----------------------", allCategories);
  //     if (allCategories?.length === 0) {
  //       throw new Error("No categories found");
  //     }

  //     // Select the default category (first one in the list) if no category is selected
  //     const defaultCategoryId = selectedNewsCategoryId || allCategories[0]?.id;
  //     setSelectedNewsCategoryId(defaultCategoryId);

  //     // Fetch data for the default category
  //     const [topVideoResponse, videosByCategoryResponse] = await Promise.all([
  //       fetch(`${base_url}news/getTopNews`, {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }),
  //       fetch(`${base_url}news/getAllNewsByCategory/${defaultCategoryId}`, {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }),
  //     ]);

  //     const topVideoJson = await topVideoResponse.json();
  //     // console.log("Newsdata.topNews-----------------------", topVideoJson);
  //     const topNewData =
  //       topVideoJson && topVideoJson?.data?.length > 0
  //         ? topVideoJson?.data
  //         : ""; // Set to null or handle as needed when no valid data is present

  //     const videosByCategoryJson = await videosByCategoryResponse.json();
  //     let formattedSections = [];
  //     if (
  //       Array.isArray(videosByCategoryJson.data) &&
  //       videosByCategoryJson.data.length > 0
  //     ) {
  //       formattedSections = videosByCategoryJson.data.map((category) => ({
  //         title:
  //           language === "fr" && category.sub_category_french_name
  //             ? category.sub_category_french_name
  //             : category.sub_category_name,
  //         data: category.news_result.News,
  //       }));
  //     }
  //     // const formattedSections = videosByCategoryJson.data.map((category) => ({
  //     //   // title: category.sub_category_name,
  //     //   title:
  //     //     language === "fr" && category.sub_category_french_name
  //     //       ? category.sub_category_french_name
  //     //       : category.sub_category_name,
  //     //   data: category.tour_result.Tours,
  //     // }));

  //     // Update state with all data
  //     setNewsData({
  //       categories: allCategories,
  //       topNews: topVideoJson.data,
  //       NewsByCategory: formattedSections,
  //     });
  //   } catch (err) {
  //     setNewsError(err.message);
  //   } finally {
  //     setNewsLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (language) {
  //     fetchNewsData();
  //   }
  // }, [authToken, selectedNewsCategoryId, language]);
 
    const fetchNewsData = async () => {
      if (!authToken) return;
  
      try {
        setNewsLoading(true);
  
        // Fetch categories if no category is selected
        if (!selectedNewsCategoryId) {
          const response = await fetch(`${base_url}news/category/getAll`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          });
          const responseJson = await response.json();
          const allCategories = responseJson?.AllCategories.reverse();
  
          if (allCategories?.length === 0) {
            throw new Error("No categories found");
          }
  
          // Set categories and default category ID
          setNewsData((prev) => ({
            ...prev,
            categories: allCategories,
          }));
  
          const defaultCategoryId = allCategories[0]?.id;
          setSelectedNewsCategoryId(defaultCategoryId);
          return; // Exit early to avoid fetching category data in this iteration
        }
  
        // Fetch data for the selected category
        const [topNewsResponse, newsByCategoryResponse] = await Promise.all([
          fetch(`${base_url}news/getTopNews`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          fetch(`${base_url}news/getAllNewsByCategory/${selectedNewsCategoryId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);
  
        const topNewsJson = await topNewsResponse.json();
   
        const topNewsData =
          topNewsJson && topNewsJson?.data?.length > 0
            ? topNewsJson.data
            : null; // Set to null or handle as needed when no valid data is present
  
        const newsByCategoryJson = await newsByCategoryResponse.json();
        const formattedSections =
          Array.isArray(newsByCategoryJson.data) &&
          newsByCategoryJson.data.length > 0
            ? newsByCategoryJson.data.map((category) => ({
                title:
                  language === "fr" && category.sub_category_french_name
                    ? category.sub_category_french_name
                    : category.sub_category_name,
                data: category.news_result.News,
              }))
            : []; // Handle case when no data is available
            // console.log('tooooooooooooooooooooooop', topNewsJson)
        // Update state with category data
        setNewsData((prev) => ({
          ...prev,
          topNews: topNewsJson.data,
          NewsByCategory: formattedSections,
        }));
      } catch (err) {
        setNewsError(err.message);
      } finally {
        setNewsLoading(false);
      }
    };
    useEffect(() => {
    fetchNewsData();
  }, [authToken, selectedNewsCategoryId, language]);
  /////////////////////////////////////////////////////////////////////////////Letter
  const [Letterdata, setLetterData] = useState({
    categories: [],
    topLetter: null,
    LetterByCategory: [],
  });
  const [selectedLetterCategoryId, setSelectedLetterCategoryId] =
    useState(null);
  const [Letterloading, setLetterLoading] = useState(true);
  const [Lettererror, setLetterError] = useState(null);

  
  // const fetchLetterData = async () => {
  //   if (!authToken) return;

  //   try {
  //     setLetterLoading(true);

  //     // Fetch categories, top video, and videos by category in a single operation
  //     const response = await fetch(
  //       `${base_url}discCategory/getAllDiscCategories`,
  //       {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }
  //     );
  //     const responseJson = await response.json();
  //     const allCategories = responseJson?.AllCategories;
  //     // console.log("allCategories-----------------------", allCategories);
  //     if (allCategories?.length === 0) {
  //       throw new Error("No categories found");
  //     }

  //     // Select the default category (first one in the list) if no category is selected
  //     const defaultCategoryId =
  //       selectedLetterCategoryId || allCategories[0]?.id;
  //     setSelectedLetterCategoryId(defaultCategoryId);

  //     // Fetch data for the default category
  //     const [topVideoResponse, videosByCategoryResponse] = await Promise.all([
  //       fetch(`${base_url}top/app/top_letter`, {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }),
  //       fetch(`${base_url}letter/getAllLetterByCategory/${defaultCategoryId}`, {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }),
  //     ]);

  //     const topVideoJson = await topVideoResponse.json();
  //     // console.log("Newsdata.topNews-----------------------", topVideoJson);
  //     const topLetterData =
  //       topVideoJson && topVideoJson?.topitem?.length > 0
  //         ? topVideoJson?.topitem[0] // Access the first item if available
  //         : "";
  //     const videosByCategoryJson = await videosByCategoryResponse.json();
  //     let formattedSections = [];
  //     if (
  //       Array.isArray(videosByCategoryJson.data) &&
  //       videosByCategoryJson.data.length > 0
  //     ) {
  //       formattedSections = videosByCategoryJson.data.map((category) => ({
  //         title:
  //           language === "fr" && category.sub_category_french_name
  //             ? category.sub_category_french_name
  //             : category.sub_category_name,
  //         data: category.total_result.letters,
  //       }));
  //     }

  //     // Update state with all data
  //     setLetterData({
  //       categories: allCategories,
  //       topLetter: topLetterData,
  //       LetterByCategory: formattedSections,
  //     });
  //   } catch (err) {
  //     setLetterError(err.message);
  //   } finally {
  //     setLetterLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (language) {
  //     fetchLetterData();
  //   }
  // }, [authToken, selectedLetterCategoryId, language]);
 
    const fetchLetterData = async () => {
      if (!authToken) return;
  
      try {
        setLetterLoading(true);
  
        // Fetch categories if no category is selected
        if (!selectedLetterCategoryId) {
          const response = await fetch(
            `${base_url}discCategory/getAllDiscCategories`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          const responseJson = await response.json();
          const allCategories = responseJson?.AllCategories;
  
          if (allCategories?.length === 0) {
            throw new Error("No categories found");
          }
  
          // Set categories and default category ID
          setLetterData((prev) => ({
            ...prev,
            categories: allCategories,
          }));
  
          const defaultCategoryId = allCategories[0]?.id;
          setSelectedLetterCategoryId(defaultCategoryId);
          return; // Exit early to avoid fetching category-specific data in the same iteration
        }
  
        // Fetch data for the selected category
        const [topLetterResponse, letterByCategoryResponse] = await Promise.all([
          fetch(`${base_url}top/app/top_letter`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          fetch(
            `${base_url}letter/getAllLetterByCategory/${selectedLetterCategoryId}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${authToken}` },
            }
          ),
        ]);
  
        const topLetterJson = await topLetterResponse.json();
        const topLetterData =
          topLetterJson && topLetterJson?.topitem?.length > 0
            ? topLetterJson.topitem[0] // Access the first item if available
            : null;
  
        const letterByCategoryJson = await letterByCategoryResponse.json();
        const formattedSections =
          Array.isArray(letterByCategoryJson.data) &&
          letterByCategoryJson.data.length > 0
            ? letterByCategoryJson.data.map((category) => ({
                title:
                  language === "fr" && category.sub_category_french_name
                    ? category.sub_category_french_name
                    : category.sub_category_name,
                data: category.total_result.letters,
              }))
            : []; // Handle case when no data is available
  
        // Update state with category data
        setLetterData((prev) => ({
          ...prev,
          topLetter: topLetterData,
          LetterByCategory: formattedSections,
        }));
      } catch (err) {
        setLetterError(err.message);
      } finally {
        setLetterLoading(false);
      }
    };
    useEffect(() => {
    fetchLetterData();
  }, [authToken, selectedLetterCategoryId, language]);
  /////////////////////////////////////////////////////////////////////////////QAFI
  const [QAFIdata, setQAFIData] = useState({
    categories: [],
    topQAFI: null,
    QAFIByCategory: [],
  });
  const [selectedQAFICategoryId, setSelectedQAFICategoryId] = useState(null);
  const [QAFIloading, setQAFILoading] = useState(true);
  const [QAFIrerror, setQAFIError] = useState(null);

  // const fetchQAFIData = async () => {
  //   if (!authToken) return;

  //   try {
  //     setQAFILoading(true);

  //     // Fetch categories, top video, and videos by category in a single operation
  //     const response = await fetch(`${base_url}qafi/category/getAll`, {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${authToken}` },
  //     });
  //     const responseJson = await response.json();
  //     const allCategories = responseJson?.AllCategories.reverse();
  //     if (allCategories?.length === 0) {
  //       throw new Error("No categories found");
  //     }

  //     // Select the default category (first one in the list) if no category is selected
  //     const defaultCategoryId = selectedQAFICategoryId || allCategories[0]?.id;
  //     setSelectedQAFICategoryId(defaultCategoryId);

  //     // console.log("defaultCategoryId-----------------------", defaultCategoryId);
  //     // Fetch data for the default category
  //     const [topVideoResponse, videosByCategoryResponse] = await Promise.all([
  //       fetch(`${base_url}qafi/getTopQafi`, {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }),
  //       fetch(`${base_url}qafi/getAllQafisByCategory/${defaultCategoryId}`, {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }),
  //     ]);

  //     const topVideoJson = await topVideoResponse.json();

  //     const videosByCategoryJson = await videosByCategoryResponse.json();
  //     // console.log("videosByCategoryJsons-----------------------", videosByCategoryJson);
  //     let formattedSections = [];
  //     if (
  //       Array.isArray(videosByCategoryJson.data) &&
  //       videosByCategoryJson.data.length > 0
  //     ) {
  //       formattedSections = videosByCategoryJson.data.map((category) => ({
  //         title:
  //           language === "fr" && category.sub_category_french_name
  //             ? category.sub_category_french_name
  //             : category.sub_category_name,
  //         data: category.QAFI_result.QAFIs,
  //       }));
  //     }

  //     setQAFIData({
  //       categories: allCategories,
  //       topQAFI: topVideoJson.data,
  //       QAFIByCategory: formattedSections,
  //     });
  //   } catch (err) {
  //     setQAFIError(err.message);
  //   } finally {
  //     setQAFILoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (language) {
  //     fetchQAFIData();
  //   }
  // }, [authToken, selectedQAFICategoryId, language]);


    const fetchQAFIData = async () => {
      if (!authToken) return;
  
      try {
        setQAFILoading(true);
  
        // Fetch categories if no category is selected
        if (!selectedQAFICategoryId) {
          const response = await fetch(`${base_url}qafi/category/getAll`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          });
          const responseJson = await response.json();
          const allCategories = responseJson?.AllCategories.reverse();
  
          if (allCategories?.length === 0) {
            throw new Error("No categories found");
          }
  
          // Set categories and default category ID
          setQAFIData((prev) => ({
            ...prev,
            categories: allCategories,
          }));
  
          const defaultCategoryId = allCategories[0]?.id;
          setSelectedQAFICategoryId(defaultCategoryId);
          return; // Exit early to avoid fetching category-specific data in the same iteration
        }
  
        // Fetch data for the selected category
        const [topQAFIResponse, qafiByCategoryResponse] = await Promise.all([
          fetch(`${base_url}qafi/getTopQafi`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          fetch(
            `${base_url}qafi/getAllQafisByCategory/${selectedQAFICategoryId}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${authToken}` },
            }
          ),
        ]);
  
        const topQAFIJson = await topQAFIResponse.json();
        const topQAFIData =
          topQAFIJson && topQAFIJson.data ? topQAFIJson.data : null;
  
        const qafiByCategoryJson = await qafiByCategoryResponse.json();
        const formattedSections =
          Array.isArray(qafiByCategoryJson.data) &&
          qafiByCategoryJson.data.length > 0
            ? qafiByCategoryJson.data.map((category) => ({
                title:
                  language === "fr" && category.sub_category_french_name
                    ? category.sub_category_french_name
                    : category.sub_category_name,
                data: category.QAFI_result.QAFIs,
              }))
            : []; // Handle case when no data is available
  
        // Update state with category data
        setQAFIData((prev) => ({
          ...prev,
          topQAFI: topQAFIJson.data,
          QAFIByCategory: formattedSections,
        }));
      } catch (err) {
        setQAFIError(err.message);
      } finally {
        setQAFILoading(false);
      }
    };
    useEffect(() => {
    fetchQAFIData();
  }, [authToken, selectedQAFICategoryId, language]);


  /////////////////////////////////////////////////////////////////////////////EBIC
  const [EBICdata, setEBICData] = useState({
    categories: [],
    topEBIC: null,
    EBICByCategory: [],
  });
  const [selectedEBICCategoryId, setSelectedEBICCategoryId] = useState(null);
  const [EBICloading, setEBICLoading] = useState(true);
  const [EBICrerror, setEBICError] = useState(null);

  const fetchEBICData = async () => {
    if (!authToken) return;
  
    try {
      setEBICLoading(true);
  
      // Fetch categories if no category is selected
      if (!selectedEBICCategoryId) {
        const categoryResponse = await fetch(`${base_url}gebc/category/getAll`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const categoryJson = await categoryResponse.json();
        const allCategories = categoryJson?.AllCategories.reverse();
  
        if (!allCategories || allCategories.length === 0) {
          throw new Error("No categories found");
        }
  
        // Set categories and default category ID
        setEBICData((prev) => ({
          ...prev,
          categories: allCategories,
        }));
        setSelectedEBICCategoryId(allCategories[0]?.id);
        return; // Exit early after setting default category
      }
  
      // Fetch data for the selected category
      const [topEBICResponse, EBICByCategoryResponse] = await Promise.all([
        fetch(`${base_url}gebc/getTopGebc`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch(
          `${base_url}gebc/getAllGEBCsByCategory/${selectedEBICCategoryId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }
        ),
      ]);
  
      const topEBICJson = await topEBICResponse.json();
      const topEBICData = topEBICJson?.data || null;
  
      const EBICByCategoryJson = await EBICByCategoryResponse.json();
      const formattedSections =
        Array.isArray(EBICByCategoryJson.data) &&
        EBICByCategoryJson.data.length > 0
          ? EBICByCategoryJson.data.map((category) => ({
              title:
                language === "fr" && category.sub_category_french_name
                  ? category.sub_category_french_name
                  : category.sub_category_name,
              data: category.GEBC_result.GEBCs,
            }))
          : []; // Handle empty data case
  
      // Update state with all fetched data
      setEBICData((prev) => ({
        ...prev,
        topEBIC: topEBICData,
        EBICByCategory: formattedSections,
      }));
    } catch (err) {
      setEBICError(err.message);
    } finally {
      setEBICLoading(false);
    }
  };
  
  useEffect(() => {
      fetchEBICData();
  }, [authToken, selectedEBICCategoryId, language]);
  /////////////////////////////////////////////////////////////////////////////Sports
  const [Sportsdata, setSportsData] = useState({
    categories: [],
    topSports: null,
    SportsByCategory: [],
  });
  const [selectedSportsCategoryId, setSelectedSportsCategoryId] = useState(null);
  const [Sportsloading, setSportsLoading] = useState(true);
  const [Sportsrerror, setSportsError] = useState(null);

  const fetchSportsData = async () => {
    if (!authToken) return;
  
    try {
      setSportsLoading(true);
  
      // Fetch categories if no category is selected
      if (!selectedSportsCategoryId) {
        const categoryResponse = await fetch(`${base_url}sports/category/getAll`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const categoryJson = await categoryResponse.json();
        const allCategories = categoryJson?.AllCategories.reverse();
  
        if (!allCategories || allCategories.length === 0) {
          throw new Error("No categories found");
        }
  
        // Set categories and default category ID
        setSportsData((prev) => ({
          ...prev,
          categories: allCategories,
        }));
        setSelectedSportsCategoryId(allCategories[0]?.id);
        return; // Exit early after setting default category
      }
  
      // Fetch data for the selected category
      const [topSportsResponse, SportsByCategoryResponse] = await Promise.all([
        fetch(`${base_url}sports/getTopSport`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch(
          `${base_url}sports/getByCategory/${selectedSportsCategoryId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }
        ),
      ]);
  
      const topSportsJson = await topSportsResponse.json();
      const topSportsData = topSportsJson?.data || null;
  
      const SportsByCategoryJson = await SportsByCategoryResponse.json();
      const formattedSections =
        Array.isArray(SportsByCategoryJson.data) &&
        SportsByCategoryJson.data.length > 0
          ? SportsByCategoryJson.data.map((category) => ({
            title:
            language === "fr" && category.sub_category_french_name
                ? category.sub_category_french_name
                : category.sub_category_name,
            data: category.Sport_result.Sports,
            }))
          : []; // Handle empty data case
  
      // Update state with all fetched data
      setSportsData((prev) => ({
        ...prev,
        topSports: topSportsData,
        SportsByCategory: formattedSections,
      }));
    } catch (err) {
      setSportsError(err.message);
    } finally {
      setSportsLoading(false);
    }
  };
  
  useEffect(() => {
      fetchSportsData();
  }, [authToken, selectedSportsCategoryId, language]);

  /////////////////////////////////////////////////////////////////////////////Cinematic
  const [Cinematicdata, setCinematicData] = useState({
    categories: [],
    topCinematic: null,
    CinematicByCategory: [],
  });
  const [selectedCinematicCategoryId, setSelectedCinematicCategoryId] = useState(null);
  const [Cinematicloading, setCinematicLoading] = useState(true);
  const [Cinematicrerror, setCinematicError] = useState(null);

  const fetchCinematicData = async () => {
    if (!authToken) return;
  
    try {
      setCinematicLoading(true);
  
      // Fetch categories if no category is selected
      if (!selectedCinematicCategoryId) {
        const categoryResponse = await fetch(`${base_url}cinematics/category/getAll`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const categoryJson = await categoryResponse.json();
        const allCategories = categoryJson?.AllCategories;
  
        if (!allCategories || allCategories.length === 0) {
          throw new Error("No categories found");
        }
  
        // Set categories and default category ID
        setCinematicData((prev) => ({
          ...prev,
          categories: allCategories,
        }));
        setSelectedCinematicCategoryId(allCategories[0]?.id);
        return; // Exit early after setting default category
      }
  
      // Fetch data for the selected category
      const [topCinematicResponse, CinematicByCategoryResponse] = await Promise.all([
        fetch(`${base_url}cinematics/getTopVideo`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch(
          `${base_url}cinematics/getByCategory/${selectedCinematicCategoryId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }
        ),
      ]);
  
      const topCinematicJson = await topCinematicResponse.json();
      const topCinematicData = topCinematicJson?.data || null;
  
      const EBICByCategoryJson = await CinematicByCategoryResponse.json();
      const formattedSections =
        Array.isArray(EBICByCategoryJson.data) &&
        EBICByCategoryJson.data.length > 0
          ? EBICByCategoryJson.data.map((category) => ({
            title:
                      language === "fr" && category.sub_category_french_name
                          ? category.sub_category_french_name
                          : category.sub_category_name,
                      data: category.video_result.videos,
            }))
          : []; // Handle empty data case
  
      // Update state with all fetched data
      setCinematicData((prev) => ({
        ...prev,
        topCinematic: topCinematicJson?.data ,
        CinematicByCategory: formattedSections,
      }));
    } catch (err) {
      setCinematicError(err.message);
    } finally {
      setCinematicLoading(false);
    }
  };
  
  useEffect(() => {
      fetchCinematicData();
  }, [authToken, selectedCinematicCategoryId, language]);


  /////////////////////////////////////////////////////////////////////////////Fanstar
  const [Fanstardata, setFanstarData] = useState({
    categories: [],
    topFanstar: null,
    FanstarByCategory: [],
  });
  const [selectedFanstarCategoryId, setSelectedFanstarCategoryId] = useState(null);
  const [Fanstarloading, setFanstarLoading] = useState(true);
  const [Fanstarrerror, setFanstarError] = useState(null);

  const fetchFanstarData = async () => {
    if (!authToken) return;
  
    try {
      setFanstarLoading(true);
  
      // Fetch categories if no category is selected
      if (!selectedFanstarCategoryId) {
        const categoryResponse = await fetch(`${base_url}fanStar/category/getAll`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const categoryJson = await categoryResponse.json();
        const allCategories = categoryJson?.AllCategories;
  
        if (!allCategories || allCategories.length === 0) {
          throw new Error("No categories found");
        }
  
        // Set categories and default category ID
        setFanstarData((prev) => ({
          ...prev,
          categories: allCategories,
        }));
        setSelectedFanstarCategoryId(allCategories[0]?.id);
        return; // Exit early after setting default category
      }
  
      // Fetch data for the selected category
      const [topFanstarResponse, FanstarByCategoryResponse] = await Promise.all([
        fetch(`${base_url}fanStar/getTopVideo`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch(
          `${base_url}fanStar/getByCategory/${selectedFanstarCategoryId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }
        ),
      ]);
  
      const topFanstarJson = await topFanstarResponse.json();
      const topFanstarData = topFanstarJson?.data || null;
  
      const FanstarByCategoryJson = await FanstarByCategoryResponse.json();
      const formattedSections =
        Array.isArray(FanstarByCategoryJson.data) &&
        FanstarByCategoryJson.data.length > 0
          ? FanstarByCategoryJson.data.map((category) => ({
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.video_result.videos,
            }))
          : []; // Handle empty data case
  
      // Update state with all fetched data
      setFanstarData((prev) => ({
        ...prev,
        topFanstar: topFanstarJson?.data,
        FanstarByCategory: formattedSections,
      }));
    } catch (err) {
      setFanstarError(err.message);
    } finally {
      setFanstarLoading(false);
    }
  };
  
  useEffect(() => {
      fetchFanstarData();
  }, [authToken, selectedFanstarCategoryId, language]);


  /////////////////////////////////////////////////////////////////////////////Kids
  const [Kidsdata, setKidsData] = useState({
    categories: [],
    topKids: null,
    KidsByCategory: [],
  });
  const [selectedKidsCategoryId, setSelectedKidsCategoryId] = useState(null);
  const [Kidsloading, setKidsLoading] = useState(true);
  const [Kidsrerror, setKidsError] = useState(null);

  const fetchKidsData = async () => {
    if (!authToken) return;
  
    try {
      setKidsLoading(true);
  
      // Fetch categories if no category is selected
      if (!selectedKidsCategoryId) {
        const categoryResponse = await fetch(`${base_url}kidVids/category/getAll`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const categoryJson = await categoryResponse.json();
        const allCategories = categoryJson?.AllCategories;
  
        if (!allCategories || allCategories.length === 0) {
          throw new Error("No categories found");
        }
  
        // Set categories and default category ID
        setKidsData((prev) => ({
          ...prev,
          categories: allCategories,
        }));
        setSelectedKidsCategoryId(allCategories[0]?.id);
        return; // Exit early after setting default category
      }
  
      // Fetch data for the selected category
      const [topKidsResponse, KidsByCategoryResponse] = await Promise.all([
        fetch(`${base_url}kidVids/getTopVideo`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch(
          `${base_url}kidVids/getByCategory/${selectedKidsCategoryId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }
        ),
      ]);
  
      const topKidsJson = await topKidsResponse.json();
      const topKidsData = topKidsJson?.data || null;
  
      const KidsByCategoryJson = await KidsByCategoryResponse.json();
      const formattedSections =
        Array.isArray(KidsByCategoryJson.data) &&
        KidsByCategoryJson.data.length > 0
          ? KidsByCategoryJson.data.map((category) => ({
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.video_result.videos,
            }))
          : []; // Handle empty data case
  
      // Update state with all fetched data
      setKidsData((prev) => ({
        ...prev,
        topKids: topKidsJson?.data,
        KidsByCategory: formattedSections,
      }));
    } catch (err) {
      setKidsError(err.message);
    } finally {
      setKidsLoading(false);
    }
  };
  
  useEffect(() => {
      fetchKidsData();
  }, [authToken, selectedKidsCategoryId, language]);


  /////////////////////////////////////////////////////////////////////////////Learning
  const [Learningdata, setLearningData] = useState({
    categories: [],
    topLearning: null,
    LearningByCategory: [],
  });
  const [selectedLearningCategoryId, setSelectedLearningCategoryId] = useState(null);
  const [Learningloading, setLearningLoading] = useState(true);
  const [Learningrerror, setLearningError] = useState(null);

  const fetchLearningData = async () => {
    if (!authToken) return;
  
    try {
      setLearningLoading(true);
  
      // Fetch categories if no category is selected
      if (!selectedLearningCategoryId) {
        const categoryResponse = await fetch(`${base_url}learningHobbies/category/getAll`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const categoryJson = await categoryResponse.json();
        const allCategories = categoryJson?.AllCategories;
   

        if (!allCategories || allCategories.length === 0) {
          throw new Error("No categories found");
        }
  
        // Set categories and default category ID
        setLearningData((prev) => ({
          ...prev,
          categories: allCategories,
        }));
        setSelectedLearningCategoryId(allCategories[0]?.id);
        return; // Exit early after setting default category
      }
      // Fetch data for the selected category
      const [topLearningResponse, LearningByCategoryResponse] = await Promise.all([
        fetch(`${base_url}learningHobbies/getTopVideo`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch(
          `${base_url}learningHobbies/getByCategory/${selectedLearningCategoryId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }
        ),
      ]);
      const topLearningJson = await topLearningResponse.json();
      const LearningByCategoryJson = await LearningByCategoryResponse.json();
      const formattedSections =
        Array.isArray(LearningByCategoryJson.data) &&
        LearningByCategoryJson.data.length > 0
          ? LearningByCategoryJson.data.map((category) => ({
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.video_result.videos,
            }))
          : []; // Handle empty data case
      setLearningData((prev) => ({
        ...prev,
        topLearning: topLearningJson?.data,
        LearningByCategory: formattedSections,
      }));
    } catch (err) {
      setLearningError(err.message);
    } finally {
      setLearningLoading(false);
    }
  };
  
  useEffect(() => {
      fetchLearningData();
  }, [authToken, selectedLearningCategoryId, language]);


  /////////////////////////////////////////////////////////////////////////////TVProg
  const [TVProgdata, setTVProgData] = useState({
    categories: [],
    topTVProg: null,
    TVProgByCategory: [],
  });
  const [selectedTVProgCategoryId, setSelectedTVProgCategoryId] = useState(null);
  const [TVProgloading, setTVProgLoading] = useState(true);
  const [TVProgrerror, setTVProgError] = useState(null);

  const fetchTVProgData = async () => {
    if (!authToken) return;
  
    try {
      setTVProgLoading(true);
  
      // Fetch categories if no category is selected
      if (!selectedTVProgCategoryId) {
        const categoryResponse = await fetch(`${base_url}tvProgmax/category/getAll`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const categoryJson = await categoryResponse.json();
        const allCategories = categoryJson?.AllCategories;
   

        if (!allCategories || allCategories.length === 0) {
          throw new Error("No categories found");
        }
  
        // Set categories and default category ID
        setTVProgData((prev) => ({
          ...prev,
          categories: allCategories,
        }));
        setSelectedTVProgCategoryId(allCategories[0]?.id);
        return; // Exit early after setting default category
      }
      // Fetch data for the selected category
      const [topTVProgResponse, TVProgByCategoryResponse] = await Promise.all([
        fetch(`${base_url}tvProgmax/getTopVideo`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch(
          `${base_url}tvProgmax/getByCategory/${selectedTVProgCategoryId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          }
        ),
      ]);
      const topTVProgJson = await topTVProgResponse.json();
      const TVProgByCategoryJson = await TVProgByCategoryResponse.json();
      const formattedSections =
        Array.isArray(TVProgByCategoryJson.data) &&
        TVProgByCategoryJson.data.length > 0
          ? TVProgByCategoryJson.data.map((category) => ({
            title:
            language === "fr" && category.sub_category_french_name
            ? category.sub_category_french_name
           : category.sub_category_name,
                      data: category.video_result.videos,
            }))
          : []; // Handle empty data case
      setTVProgData((prev) => ({
        ...prev,
        topTVProg: topTVProgJson?.data,
        TVProgByCategory: formattedSections,
      }));
    } catch (err) {
      setTVProgError(err.message);
    } finally {
      setTVProgLoading(false);
    }
  };
  
  useEffect(() => {
      fetchTVProgData();
  }, [authToken, selectedTVProgCategoryId, language]);


  /////////////////////////////////////////////////////////////////////////////////////////////////Market Start
  const [categoriesSelectMarket, setCategorySelectMarket] = useState([]);
  const [selectedItemIdMarket, setSelectedItemIdMarket] = useState("Africa");
  const [dataElectronics, setDataElectronics] = useState([]);
  const [allMarket, setAllMarket] = useState([]);
  const [dataVehicles, setDataVehicles] = useState([]);
  const [dataClothing, setDataClothing] = useState([]);
  const [marketLoading, setMarketLoading] = useState(false);
  const [dataTopVideosMarket, setDataTopVideosMarket] = useState([]);
  // console.log('selectedItemIdMarket-----',selectedItemIdMarket)
  // console.log('dataElectronics-----',dataElectronics)
  // console.log('allMarket-----',allMarket)
  // console.log('dataVehicles-----',dataVehicles)
  // console.log('dataClothing-----',dataClothing)
  // console.log('categoriesSelectMarket-----',dataTopVideosMarket)
  // useEffect(() => {
  //   setMarketLoading(true);
  //   fetchAll(selectedItemIdMarket);
  //   fetchElectronics(selectedItemIdMarket);
  //   fetchVehicles(selectedItemIdMarket);
  //   fetchClothing(selectedItemIdMarket);
  //   fetchCategoryMarket();
  //   fetchTopMarket();
  //   setMarketLoading(false);
  // }, [authToken, selectedItemIdMarket]);

  
    const fetchMarketData = async () => {
      try {
        setMarketLoading(true); // Start the loader
        await Promise.all([
          fetchAll(selectedItemIdMarket),
          fetchElectronics(selectedItemIdMarket),
          fetchVehicles(selectedItemIdMarket),
          fetchClothing(selectedItemIdMarket),
          fetchCategoryMarket(),
          fetchTopMarket(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setMarketLoading(false); // Stop the loader
      }
    };
    useEffect(() => {
    fetchMarketData();
  }, [authToken, selectedItemIdMarket]);

  const fetchTopMarket = async () => {
    try {
      const response = await fetch(`${base_url}top/app/top_item`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setDataTopVideosMarket(result.topitem[0]);
      } else {
        console.error("Failed to fetch top market items");
      }
    } catch (error) {
      console.error("Error in fetchTopMarket:", error);
    }
  };

  const fetchCategoryMarket = async () => {
    try {
      const response = await fetch(`${base_url}itemCategory/getAllItemCategories`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const categories = data.AllCategories.map((category) => ({
          label: language === "fr" && category.french_name ? category.french_name : category.name,
          value: category.id.toString(),
        }));
        setCategorySelectMarket(categories);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error in fetchCategoryMarket:", error);
    }
  };

  const fetchDataByCategory = async (categoryId, setDataFunction, region) => {
    try {
      const response = await fetch(
        `${base_url}item/getAllItemByCategory/${categoryId}?region=${region}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setDataFunction(result.AllItems);
      } else {
        console.error(`Failed to fetch category ${categoryId} items`);
      }
    } catch (error) {
      console.error(`Error fetching category ${categoryId}:`, error);
    }
  };

  const fetchElectronics = (region) => fetchDataByCategory(13, setDataElectronics, region);
  const fetchVehicles = (region) => fetchDataByCategory(12, setDataVehicles, region);
  const fetchClothing = (region) => fetchDataByCategory(6, setDataClothing, region);
  const fetchAll = (region) => fetchDataByCategory(5, setAllMarket, region);

  ////////////////////////////////////////////////////////////////////////////////////////////////Market end

  // console.log("QAFIdata-----------------------", QAFIdata.QAFIByCategory);
  const renderPicsItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PicDetails", { picData: item })}
    >
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.rowContainer}>
          {item?.user_image ? (
            <View style={styles.userImageContainer}>
              <Image
                source={{ uri: item?.user_image }}
                style={styles.userImage}
              />
            </View>
          ) : (
            <View style={styles.defaultUserIcon}>
              <MaterialCommunityIcons
                name="account-circle"
                size={24}
                color="#FACA4E"
              />
            </View>
          )}
          <View style={styles.userNameContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.userName}
            >
              {item.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPicsSection = ({ item }) => (
    // console.log('item----', item.data)
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t("Dashboard.NoDataavailable")}</Text>
      ) : (
        <FlatList
          data={item.data}
          // renderItem={renderPicsItem}
          renderItem={({ item }) => (
            <SubCateItem
              item={item}
              // showusername={false}
              showName={true}
              ShowUserImage={true}
              onPress={() =>
                navigation.navigate("PicDetails", { picData: item })
              }
            />
          )}
          keyExtractor={(videoItem) => videoItem.tour_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  const renderNewsSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t("Dashboard.NoDataavailable")}</Text>
      ) : (
        <FlatList
          data={item.data}
          // renderItem={renderNewsItem}
          renderItem={({ item }) => (
            <SubCateItem
              item={item}
              ShowUserImage={true}
              showusername={true}
              // showName={false}
              onPress={() => navigation.navigate("ViewNews", { picData: item })}
            />
          )}
          keyExtractor={(videoItem) => videoItem.news_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  const renderLetterSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
      ) : (
        <FlatList
          data={item.data}
          renderItem={renderPublicGeneral}
          keyExtractor={(videoItem) => videoItem.post_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  const renderPublicGeneral = (item) => {
    const post_date = convertTimeAndDate(item.item.post_date);

    const imageUrl = item.item.signature_image
      ? item.item.signature_image.startsWith("/fileUpload") ||
        item.item.signature_image.startsWith("/signatureImages")
        ? base_url + item.item.signature_image
        : item.item.signature_image
      : null;

    const userimageUrl = item.item.userimage
      ? item.item.userimage.startsWith("/userImage")
        ? base_url + item.item.userimage
        : item.item.userimage
      : null;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("LetterDetails", {
            Letters: item.item,
            identifier: false,
          })
        }
        style={styles.touchableContainer}
      >
        <View style={styles.topDivider}></View>
        <View>
          <View style={styles.headerContainer}>
            {item.item?.userimage || userimageUrl ? (
              <View style={styles.userImageContainer}>
                <Image
                  source={{ uri: item.item?.userimage || userimageUrl }}
                  style={styles.userImage}
                />
              </View>
            ) : (
              <MaterialCommunityIcons
                style={styles.accountIcon}
                name={"account-circle"}
                size={18}
                color={"#FACA4E"}
              />
            )}
            <View style={styles.approvedIconContainer}>
              <Approved width={10} height={10} />
            </View>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.postDateText}>{post_date}</Text>
          </View>

          <View style={styles.subjectContainer}>
            <Text style={styles.subjectText}>{t("Subject")}</Text>
            <View style={styles.subjectDetails}>
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={styles.subjectDetailsText}
              >
                {item.item.subject_place}
              </Text>
            </View>
          </View>

          <View style={styles.signatureContainer}>
            {imageUrl ? (
              <View style={styles.signatureImageContainer}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.signatureImage}
                />
              </View>
            ) : null}
          </View>
          <View style={styles.bottomDivider}></View>
        </View>
      </TouchableOpacity>
    );
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
  const renderQAFISection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t("Dashboard.NoDataavailable")}</Text>
      ) : (
        <FlatList
          data={item.data}
          // renderItem={renderQAFIItem}
          renderItem={({ item }) => (
            <SubCateItem
              item={item}
              showusername={true}
              ShowUserImage={true}
              // showName={false}
              onPress={() => navigation.navigate("ViewQAFI", { picData: item })}
            />
          )}
          keyExtractor={(videoItem) => videoItem.qafi_id.toString()}
          // keyExtractor={(videoItem, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  const renderEBCSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t("Dashboard.NoDataavailable")}</Text>
      ) : (
        <FlatList
          data={item.data}
          // renderItem={renderEBCItem}
          renderItem={({ item }) => (
            <SubCateItem
              item={item}
              showusername={true}
              // showName={false}
              ShowEmoji={true}
              ShowUserImage={true}
              onPress={() => navigation.navigate("ViewGEBC", { picData: item })}
            />
          )}
          keyExtractor={(videoItem) => videoItem.gebc_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

   const renderSportsSection = ({ item }) => (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>{item.title}</Text>
          {item.data.length === 0 ? (
            <Text style={styles.noDataText}>{t('NoDataAvailable')}</Text>
          ) : (
          <FlatList
            data={item.data}
            // renderItem={renderVideoItem}
            renderItem={({ item }) => (
              <SubCateItem
                item={item}
                // showusername={false}
                showName={true}
                ShowUserImage={true}
                onPress={() =>
                  navigation.navigate('SportsDetails', {SportsData: item, identifier: false})}
              />
            )}
            keyExtractor={(videoItem) => videoItem.sport_id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
        </View>
      );
  const renderCinematicSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          // renderItem={renderVideoItem}
          renderItem={({ item }) => (
            <SubCateItem
              item={item}
              // showusername={false}
              // showName={false}
              // ShowEmoji={false}
              CinematicContent={true}
              ShowThumbnail={true}
              // ShowUserImage={false}
              // onPress={() => navigation.navigate("ViewGEBC", { picData: item })}
              onPress={() => navigation.navigate('Cinematics_details', { videoData: item, identifier: false })}
            />
          )}
          keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  const renderFanstarSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          // renderItem={renderFanVideoItem}
          renderItem={({ item }) => (
            <SubCateItem
              item={item}
              // showusername={false}
              // showName={false}
              // ShowEmoji={false}
              CinematicContent={true}
              ShowThumbnail={true}
              // ShowUserImage={false}
              onPress={() => navigation.navigate('Fans_star_details', { videoData: item, identifier: false })}
            />
          )}
          keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

    const renderKidsSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          // renderItem={renderKidVideoItem}
          renderItem={({ item }) => (
            <SubCateItem
              item={item}
              CinematicContent={true}
              ShowThumbnail={true}
              onPress={() => navigation.navigate("Kids_vid_details", { videoData: item })}
            />
          )}
          keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

    const renderLearnSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          // renderItem={renderLearnVideoItem}
          renderItem={({ item }) => (
            <SubCateItem
              item={item}
              CinematicContent={true}
              ShowThumbnail={true}
              onPress={() => navigation.navigate('Learning_details', { videoData: item })}            />
          )}
          keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
  const renderTVProgSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          // renderItem={renderLearnVideoItem}
          renderItem={({ item }) => (
            <SubCateItem
              item={item}
              CinematicContent={true}
              ShowThumbnail={true}
              onPress={() => navigation.navigate('Tv_Promax_details', { videoData: item })}            />
          )}
          keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          // navigation.navigate('Tv_Promax_details', { videoData: item })}>
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  // if (error) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text style={styles.errorText}>Error: {error}</Text>
  //     </View>
  //   );
  // }
  // if (Picerror) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text style={styles.errorText}>Error: {Picerror}</Text>
  //     </View>
  //   );
  // }
  const handleVideoPress = (videoData) => {
    navigation.navigate("ViewVideo", { videoData, identifier: false });
  };

  const renderSearchesPic = (item) => {
    const isSelected = selectedPicCategoryId === item.id;
    const name =
      language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedPicCategoryId(item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderNewsSearches = (item) => {
    const isSelected = selectedNewsCategoryId === item.id;
    const name =
      language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedNewsCategoryId(item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderPostLetterSearches = (item) => {
    const isSelected = selectedLetterCategoryId === item.id;
    const name =
      language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedLetterCategoryId(item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderQAFISearches = (item) => {
    const isSelected = selectedQAFICategoryId === item.id;
    const name =
      language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedQAFICategoryId(item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEBCSearches = (item) => {
    const isSelected = selectedEBICCategoryId === item.id;
    const name =
      language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedEBICCategoryId(item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderSearchesSports = (item) => {
    const isSelected = selectedSportsCategoryId === item.id;
    const name =
      language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedSportsCategoryId(item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderCinematicSearches = (item) => {
    const isSelected = selectedCinematicCategoryId === item.id;
    const name =
      language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedCinematicCategoryId(item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderFanstarSearches = (item) => {
    const isSelected = selectedFanstarCategoryId === item.id;
    const name =
      language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedFanstarCategoryId(item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderKidsSearches = (item) => {
    const isSelected = selectedKidsCategoryId === item.id;
    const name =
      language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedKidsCategoryId(item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderLearnSearches = (item) => {
    const isSelected = selectedLearningCategoryId === item.id;
    const name =
      language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedLearningCategoryId(item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderTVProgSearches = (item) => {
    const isSelected = selectedTVProgCategoryId === item.id;
    const name =
      language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedTVProgCategoryId(item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderSearchesMarket = (item) => {
    const isSelected = selectedItemIdMarket === item.name;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
        ]}
        onPress={() => {
          setSelectedItemIdMarket(item.name);
          console.log("Selected item:", item.name);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item.name} */}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleBannerPress = (link) => {
    Linking.openURL(link);
  };


  // console.log('Fanstardata.topFanstar------------------,', Fanstardata.topFanstar)
   const firstImageUrl = Array.isArray(dataTopVideosMarket.images) && dataTopVideosMarket.images.length > 0
    ? dataTopVideosMarket.images[0].image
    : null;
    const renderAvailableAppsMarket = (item) => (
      <TouchableOpacity
        style={{
          // width: wp(43),
          width: wp(25.5), margin: 5,
          // marginHorizontal: wp(1),
          borderRadius: wp(5),
          // backgroundColor: "#f9f9f9",
        }}
        onPress={() =>
          navigation.navigate("ProductDetails", { ProductDetails: item })
        }
      >
        <Image
          style={{
            width: "100%",
            height: hp(15),
            borderRadius: wp(3),
            resizeMode: "cover",
          }}
          source={item?.images ? {uri: item?.images[0]?.image} : appImages.galleryPlaceHolder}
        />
        <Text
          numberOfLines={2}
          style={{
            fontSize: hp(1.8),
            fontFamily: "Inter-Medium",
            color: "#4A4A4A",
            margin: wp(1),
          }}
        >
          {item.title || "No Title"}
        </Text>
      </TouchableOpacity>
    );
    
    const [selectedItemId, setSelectedItemId] = useState(1);
    const [isSelectedActive, setIsSelectedActive] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryActive, setcategoryActive] = useState(true);

// console.log('selectedCategory-------------------',selectedCategory)

    const handleItemPress = (category) => {
    setSelectedItemId(category);
    setIsSelectedActive(false); ///
    setcategoryActive(false); ////ye old hai jis ko comment kiya tha
    setSelectedCategory(category);
  //   setecommerance(category === t('Ecommerce'));
  //   setSport(category === t('cateSports'));
  };
  const press_category = () => {
    setIsSelectedActive(!isSelectedActive);
    setSelectedItemId(null); // Deactivate all items when category is pressed
    setSelectedCategory("");
    // setecommerance(false);
    // setSport(false);
    setcategoryActive(true); //ye old hai jis ko comment kiya tha
  };
      const renderMassAppSearches = (item) => {
    const isSelected = selectedItemId === item;
    return (
      <TouchableOpacity
      style={[
        styles.categoryItem,
        { backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD" },
      ]}
        onPress={() => {
          // Pass the item data when pressed
          handleItemPress(item);
          if (item === t('Ecommerce')) {
          // if (item === "E-commerce") {
            // console.log("E----AYA:");
            loadSavedApps(); // Assuming handleItemPress is a function to handle item press
          } else if (item ===  t('Business')) {
          // } else if (item === "Business") {
            // console.log("Business----AYA:");
            BusinessSavedApps();
          } // Assuming handleItemPress is a function to handle item press
          // console.log("Selected item:", item);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

    const renderAvailableApps = (item) => {
    // Render the item only if count is equal to 2
    if (item.count >= 2) {
      return (
        <View style={{ height: hp(8), padding: 5 }}>
          <Image
            style={{ width: wp(12), height: wp(12) }}
            resizeMode="contain"
            source={{ uri: `data:image/png;base64,${item?.image}` }}
          />
        </View>
      );
    } 
    // else {
    //   // Return null or an empty view if count is not equal to 2
    //   return (
    //     <View style={{ height: hp(8), padding: 5 }}>
    //       <Image
    //         style={{ width: wp(12), height: wp(12) }}
    //         resizeMode="contain"
    //         source={appImages.logoTransparent}
    //       />
    //     </View>
    //   );
    // }
  };

    const renderApps = (item) => {
    //console.log('item at first', item);
    const openApp = async (items) => {
      try {
        // Check if the app is already in the topData array
        const appIndex = topData.findIndex((app) => app.bundle === item.bundle);

        if (appIndex !== -1) {
          // If the app is already in the array, update the count
          const updatedTopData = [...topData];
          updatedTopData[appIndex] = {
            ...updatedTopData[appIndex],
            count: updatedTopData[appIndex].count + 1,
          };

          setTopData(updatedTopData);

          await RNLauncherKitHelper.launchApplication(item.bundle);

        } else {
          // If the app is not in the array, add it with count 1
          const randomIndex = Math.floor(Math.random() * 6); // Random index between 0 and 5
          const updatedTopData = [...topData];
          updatedTopData[randomIndex] = {
            label: item.label,
            bundle: item.bundle,
            image: item.image,
            count: 1,
          };

          setTopData(updatedTopData);

          await RNLauncherKitHelper.launchApplication(item.bundle);
        }
      } catch (error) {
        console.error("Error opening the app:", error);
        await RNLauncherKitHelper.launchApplication(item.bundle);
        // Your additional error handling logic here
      }
    };

    return (
      <TouchableOpacity
        onLongPress={() => {
          setIsLongPress(true);
          setIsCancelModalVisible(true);
          setFavouriteItem(item);
        }}
        onPress={() => openApp(item?.bundle)}
        style={styles.items}
      >
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.4),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

    const renderFavouritesApps = (item) => {
    //console.log('item at first', item);
    const openApp = async (items) => {
      try {
        // Launch the application
        await RNLauncherKitHelper.launchApplication(item.bundle);

        // Check if the app is already in the topData array
        const appIndex = topData.findIndex((app) => app.bundle === item.bundle);

        if (appIndex !== -1) {
          // If the app is already in the array, update the count
          const updatedTopData = [...topData];
          updatedTopData[appIndex] = {
            ...updatedTopData[appIndex],
            count: updatedTopData[appIndex].count + 1,
          };

          setTopData(updatedTopData);
        } else {
          // If the app is not in the array, add it with count 1
          setTopData((prevData) => [
            ...prevData,
            {
              label: item.label,
              bundle: item.bundle,
              image: item.image,
              count: 1,
            },
          ]);
        }

        await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
      } catch (error) {
        console.error("Error opening the app:", error);
        await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
      }
    };

    return (
      <TouchableOpacity
        onLongPress={() => {
          setIsLongPressRemove(true);
          setIsCancelRemoveModalVisible(true);
          setRemoveFavouriteItem(item);
        }}
         onPress={() => openApp(item?.bundle)}
        style={styles.items}
      >
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <Text
          style={{
            color: "#000000",
            textAlign: "center",
            fontSize: hp(1.2),
            fontWeight: "bold",
          }}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {item?.label}
        </Text>
      </TouchableOpacity>
    );
  };
    const closeRequestModal = () => {
    setIsLongPress(false);
    setIsCancelModalVisible(false);
  };

  const closeRequestRemoveModal = () => {
    setIsLongPressRemove(false);
    setIsCancelRemoveModalVisible(false);
  };

  const actionsForAddToFavourites = [
    {
      label: "Add to Favorites",
      onPress: () => {
        if (favouriteItem) {
          const isItemInFavourites = favouriteData.some(
            (item) => item.bundle === favouriteItem.bundle
          );
          if (!isItemInFavourites) {
            setFavouriteData((prev) => [...prev, favouriteItem]);
          }
          setIsLongPress(false);
        }
      },
    },
    {
      label: "Remove From Wotcha Gotcha App",
      onPress: () => {
        if (favouriteItem) {
          const updatedData = dataApps.filter(
            (item) => item.bundle !== favouriteItem.bundle
          );
          setDataApps(updatedData);
          setIsCancelModalVisible(false);
          setIsLongPress(false);
        }
      },
    },
  ];

  const actionsForRemoveFavourites = [
    {
      label: "Remove Favorites",
      onPress: () => {
        if (removeFavouriteItem) {
          const updatedData = favouriteData.filter(
            (item) => item.bundle !== removeFavouriteItem.bundle
          );
          setFavouriteData(updatedData);
          setIsLongPressRemove(false);
        }
      },
    },
    {
      label: "Remove From Wotcha Gotcha App",
      onPress: () => {
        if (removeFavouriteItem) {
          const updatedData = dataApps.filter(
            (item) => item.bundle !== removeFavouriteItem.bundle
          );
          setDataApps(updatedData);
          setIsCancelModalVisible(false);
          setIsLongPressRemove(false);
        }
      },
    },
  ];

    const loadSavedApps = async () => {
    try {
      const savedNewApps = await AsyncStorage.getItem("savedApps");
      if (savedNewApps) {
        // console.log("saved apps in useeffect --------->", savedNewApps);
        setSavedApps(JSON.parse(savedNewApps));
      }
    } catch (error) {
      console.error("Error loading saved apps from AsyncStorage:", error);
    }
  };
  const renderAppsFav = (item) => {
    const isSelected = selectedApps.includes(item);

    const handleAppPress = () => {
      setSelectedApps((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.itemFavContainer, isSelected]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green"  style={styles.checkmarkIcon} />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAppsFavItem = ({ item, selectedApps, setSelectedApps }) => {
    const isSelected = selectedApps.includes(item);
  
    const handleAppPress = () => {
      setSelectedApps((selected) => {
        if (selected.includes(item)) {
          return selected.filter((app) => app !== item);
        } else {
          return [...selected, item];
        }
      });
    };
  
    return (
      <TouchableOpacity
        onPress={handleAppPress}
        style={[styles.itemFavContainer, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" style={styles.checkmarkIcon} />
        )}
        <Image
          style={{ width: 43, height: 43 }}
          source={{ uri: `data:image/png;base64,${item?.image}` }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: hp(1.2),
              fontWeight: "bold",
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  // Function to save selected apps to AsyncStorage
  const handleSave = async () => {
    try {
      // Retrieve the current array of saved apps from AsyncStorage
      const currentSavedApps = await AsyncStorage.getItem("savedApps");
      let updatedSavedApps = [];

      if (currentSavedApps) {
        updatedSavedApps = JSON.parse(currentSavedApps);
      }
      // Add the selected apps to the saved apps array
      updatedSavedApps.push(...selectedApps);
      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("savedApps", JSON.stringify(updatedSavedApps));
      setSnackbarVisible(true);
      setModalVisible(false);
      setSelectedApps([]); // Clear the selected apps
      // Update the state
      setSavedApps(updatedSavedApps);
      console.log("saved apps in handleSave --------->", updatedSavedApps);
    } catch (error) {
      console.error("Error saving selected apps to AsyncStorage:", error);
    }
  };

  const BusinessSavedApps = async () => {
    try {
      const savedApps = await AsyncStorage.getItem("savedApps_b");
      if (savedApps) {
        // console.log('saved apps in useeffect --------->', savedApps)
        setSavedApps_b(JSON.parse(savedApps));
      }
    } catch (error) {
      console.error("Error loading saved apps from AsyncStorage:", error);
    }
  };

  // Function to save selected apps to AsyncStorage
  const handleSave_b = async () => {
    try {
      // Retrieve the current array of saved apps from AsyncStorage
      const currentBusinessSavedApps = await AsyncStorage.getItem(
        "savedApps_b"
      );
      let updatedSavedApps = [];

      if (currentBusinessSavedApps) {
        updatedSavedApps = JSON.parse(currentBusinessSavedApps);
      }

      // Add the selected apps to the saved apps array
      updatedSavedApps.push(...selectedApps_b);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem(
        "savedApps_b",
        JSON.stringify(updatedSavedApps)
      );
      setSnackbarVisible(true);
      setModalVisible_b(false);
      setSelectedApps_b([])
      // Update the state
      setSavedApps_b(updatedSavedApps);

      // console.log('saved apps in handleSave_b --------->', updatedSavedApps);
    } catch (error) {
      console.error("Error saving selected apps to AsyncStorage:", error);
    }
  };

  const handleSave_sp = () => {
    setSavedApps_sp(selectedApps_sp);
    setSnackbarVisible(true);
    setModalVisible_sp(false);
  };
  const handleSave_e = () => {
    setSavedApps_e(selectedApps_e);
    setSnackbarVisible(true);
    setModalVisible_e(false);
  };
  const handleSave_d = () => {
    setSavedApps_d(selectedApps_d);
    setSnackbarVisible(true);
    setModalVisible_d(false);
  };
  const handleSave_fd = () => {
    setSavedApps_fd(selectedApps_fd);
    setSnackbarVisible(true);
    setModalVisible_fd(false);
  };
  const handleSave_sm = () => {
    setSavedApps_sm(selectedApps_sm);
    setSnackbarVisible(true);
    setModalVisible_sm(false);
  };
  const handleSave_mw = () => {
    setSavedApps_mw(selectedApps_mw);
    setSnackbarVisible(true);
    setModalVisible_mw(false);
  };
  const handleSave_g = () => {
    setSavedApps_g(selectedApps_g);
    setSnackbarVisible(true);
    setModalVisible_g(false);
  };
  const handleSave_em = () => {
    setSavedApps_em(selectedApps_em);
    setSnackbarVisible(true);
    setModalVisible_em(false);
  };
  const openCategoryApp = async (app) => {
    try {
      console.log("Opening app-------------------:", app.bundle);

      // Launch the application using its bundle ID
      await RNLauncherKitHelper.launchApplication(app.bundle);

      console.log("App launched successfully.");
    } catch (error) {
      console.error("Error launching the app:", error.message);
    }
  };
  const screenHeight = Dimensions.get("window").height;
const itemHeight = 450;

const { width: viewportWidth } = Dimensions.get("window");

const sliderWidth = viewportWidth * 0.9;
  const containerHeight = Math.min(screenHeight * 0.8, itemHeight);
  const categoryComponents = {
    [t('Ecommerce')]: {
      component: (
        <View style={[styles.Appcategorycontainer, { height: containerHeight }]}>
          {savedApps.length > 0 ? (
            <ScrollView>
              {Array.from({ length: Math.ceil(savedApps.length / 5) }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {savedApps
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((app, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => openCategoryApp(app)}
                        style={styles.appContainer}
                      >
                        <Image
                          style={styles.appImage}
                          source={{ uri: `data:image/png;base64,${app.image}` }}
                        />
                        <Text style={styles.appText}>
                          {app.label.substring(0, 10)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.placeholderText}>
              {t('Dashboard.addEcommernceapps')}
            </Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Add />
          </TouchableOpacity>
        </View>
      ),
    },
    [t('Business')]: {
      component: (
        <View style={[styles.Appcategorycontainer, { height: containerHeight }]}>
          {savedApps_b.length > 0 ? (
            <ScrollView>
              {Array.from({ length: Math.ceil(savedApps_b.length / 5) }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {savedApps_b
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((app, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => openCategoryApp(app)}
                        style={styles.appContainer}
                      >
                        <Image
                          style={styles.appImage}
                          source={{ uri: `data:image/png;base64,${app.image}` }}
                        />
                        <Text style={styles.appText}>{app.label}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.placeholderText}>
              {t('Dashboard.addBussinessapps')}
            </Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible_b(true)}>
            <Add />
          </TouchableOpacity>
        </View>
      ),
    },

    [t('cateSports')]: {
      component: (
        <View style={[styles.Appcategorycontainer, { height: containerHeight }]}>
          {savedApps_sp.length > 0 ? (
            <ScrollView>
              {Array.from({ length: Math.ceil(savedApps_sp.length / 5) }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {savedApps_sp
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((app, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => openCategoryApp(app)}
                        style={styles.appContainer}
                      >
                        <Image
                          style={styles.appImage}
                          source={{ uri: `data:image/png;base64,${app.image}` }}
                        />
                        <Text style={styles.appText}>{app.label}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.placeholderText}>
              {t('Dashboard.addSportsapps')}
            </Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible_sp(true)}>
            <Add />
          </TouchableOpacity>
        </View>
      ),
    },

    [t('Education')]: {
      component: (
        <View style={[styles.Appcategorycontainer, { height: containerHeight }]}>
          {savedApps_e.length > 0 ? (
            <ScrollView>
              {Array.from({ length: Math.ceil(savedApps_e.length / 5) }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {savedApps_e
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((app, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => openCategoryApp(app)}
                        style={styles.appContainer}
                      >
                        <Image
                          style={styles.appImage}
                          source={{ uri: `data:image/png;base64,${app.image}` }}
                        />
                        <Text style={styles.appText}>{app.label}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.placeholderText}>
              {t('Dashboard.addEducationapps')}
            </Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible_e(true)}>
            <Add />
          </TouchableOpacity>
        </View>
      ),
    },
      [t('Dating')]: {
      component: (
        <View style={[styles.Appcategorycontainer, { height: containerHeight }]}>
          {selectedApps_d.length > 0 ? (
            <ScrollView>
              {Array.from({ length: Math.ceil(selectedApps_d.length / 5) }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {selectedApps_d
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((app, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => openCategoryApp(app)}
                        style={styles.appContainer}
                      >
                        <Image
                          style={styles.appImage}
                          source={{ uri: `data:image/png;base64,${app.image}` }}
                        />
                        <Text style={styles.appText}>{app.label}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.placeholderText}>
              {t('Dashboard.addDatingapps')}
            </Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => setSelectedApps_d(true)}>
            <Add />
          </TouchableOpacity>
        </View>
      ),
    },
          

         [t('FoodDelivery')]: {
      component: (
        <View style={[styles.Appcategorycontainer, { height: containerHeight }]}>
          {selectedApps_fd.length > 0 ? (
            <ScrollView>
              {Array.from({ length: Math.ceil(selectedApps_fd.length / 5) }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {selectedApps_fd
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((app, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => openCategoryApp(app)}
                        style={styles.appContainer}
                      >
                        <Image
                          style={styles.appImage}
                          source={{ uri: `data:image/png;base64,${app.image}` }}
                        />
                        <Text style={styles.appText}>{app.label}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.placeholderText}>
              {t('Dashboard.addFoodDeliveryapps')}
            </Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => setSelectedApps_fd(true)}>
            <Add />
          </TouchableOpacity>
        </View>
      ),
    },

    


             [t('SocialMedia')]: {
      component: (
        <View style={[styles.Appcategorycontainer, { height: containerHeight }]}>
          {selectedApps_sm.length > 0 ? (
            <ScrollView>
              {Array.from({ length: Math.ceil(selectedApps_sm.length / 5) }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {selectedApps_sm
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((app, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => openCategoryApp(app)}
                        style={styles.appContainer}
                      >
                        <Image
                          style={styles.appImage}
                          source={{ uri: `data:image/png;base64,${app.image}` }}
                        />
                        <Text style={styles.appText}>{app.label}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.placeholderText}>
              {t('Dashboard.addSocialMediaapp')}
            </Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => setSelectedApps_sm(true)}>
            <Add />
          </TouchableOpacity>
        </View>
      ),
    },
             [t('MedicalWellness')]: {
      component: (
        <View style={[styles.Appcategorycontainer, { height: containerHeight }]}>
          {selectedApps_mw.length > 0 ? (
            <ScrollView>
              {Array.from({ length: Math.ceil(selectedApps_mw.length / 5) }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {selectedApps_mw
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((app, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => openCategoryApp(app)}
                        style={styles.appContainer}
                      >
                        <Image
                          style={styles.appImage}
                          source={{ uri: `data:image/png;base64,${app.image}` }}
                        />
                        <Text style={styles.appText}>{app.label}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.placeholderText}>
              {t('Dashboard.addMedicalwallnessapp')}
            </Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => setSelectedApps_mw(true)}>
            <Add />
          </TouchableOpacity>
        </View>
      ),
    },
             [t('Grocery')]: {
      component: (
        <View style={[styles.Appcategorycontainer, { height: containerHeight }]}>
          {selectedApps_g.length > 0 ? (
            <ScrollView>
              {Array.from({ length: Math.ceil(selectedApps_g.length / 5) }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {selectedApps_g
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((app, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => openCategoryApp(app)}
                        style={styles.appContainer}
                      >
                        <Image
                          style={styles.appImage}
                          source={{ uri: `data:image/png;base64,${app.image}` }}
                        />
                        <Text style={styles.appText}>{app.label}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.placeholderText}>
              {t('Dashboard.addGroceryapps')}
            </Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => setSelectedApps_g(true)}>
            <Add />
          </TouchableOpacity>
        </View>
      ),
    },
             [t('Employment')]: {
      component: (
        <View style={[styles.Appcategorycontainer, { height: containerHeight }]}>
          {selectedApps_em.length > 0 ? (
            <ScrollView>
              {Array.from({ length: Math.ceil(selectedApps_em.length / 5) }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {selectedApps_em
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((app, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => openCategoryApp(app)}
                        style={styles.appContainer}
                      >
                        <Image
                          style={styles.appImage}
                          source={{ uri: `data:image/png;base64,${app.image}` }}
                        />
                        <Text style={styles.appText}>{app.label}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.placeholderText}>
              {t('Dashboard.addEmploymentapps')}
            </Text>
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => setSelectedApps_em(true)}>
            <Add />
          </TouchableOpacity>
        </View>
      ),
    },


    // Add other categories similarly
  };
  return (
    <View style={styles.container}>
       {DotLoading ? 

       <DotLoader /> 
    //   <>
    
    //   <View style={styles.loaderOverlay}>
    //     <DotLoader />
    //   </View>
    
    // </>
       
       :
       <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View
        style={{ marginTop: Platform.OS == "ios" ? 0 : hp(6), width: "100%" }}
      >
        <Headers
          showListings={true}
          navigation={navigation}
          showLogo={true}
          onPressListings={() => navigation.openDrawer()}
          onPressProfile={() => navigation.navigate("ViewProfile")}
          showProfileImage={true}
        />
      </View>
     
      <ScrollView
        contentContainerStyle={styles.dataContainer}
        showsVerticalScrollIndicator={false}
      >
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
       {Platform.OS != "ios" ?
          <View style={styles.latestSearchList}>
            <View style={{ marginRight: 6 }}>
            <TouchableOpacity onPress={press_category}>
              {isSelectedActive ? (
                <CategoryActive width={23} height={23} />
              ) : (
                <CategoryInactive width={23} height={23} />
              )}
            </TouchableOpacity>
            </View>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: "center" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={MassApp}
              renderItem={({ item }) => renderMassAppSearches(item)}
            />
          </View> : <View>
            <Text>{t('NoDataAvailable')}</Text>
          </View>
        }

{categoryActive ? (
  Platform.OS !== "ios" && (
    <>
      {/* Top Apps Section */}
      <View style={styles.Masscontainer}>
        {topData?.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              {t("Dashboard.NoTopApps")}
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={topData}
            numColumns={3}
            renderItem={({ item }) => renderAvailableApps(item)}
          />
        )}
      </View>

      {/* Phone-Based Apps Section */}
      <View style={styles.sectionMassContainer}>
        <Text style={styles.sectionTitle}>
          {t("Dashboard.PhoneBasedApps")}
        </Text>
        <FlatList
          data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => renderApps(item)}
          contentContainerStyle={styles.flatListContainer}
        />
        <FlatList
          data={dataApps.slice(Math.ceil(dataApps.length / 2))}

          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => renderApps(item)}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>

      {/* Favourite Apps Section */}
      <View style={styles.favoritesContainer}>
        <Text style={styles.sectionTitle}>
          {t("Dashboard.FavouriteApps")}
        </Text>
        {favouriteData?.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.favoritesText}>
              {t("Dashboard.NoFavouriteApps")}
            </Text>
          </View>
        ) : (
          <>
          <FlatList
            data={favouriteData.slice(0, Math.ceil(favouriteData.length / 2))}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => renderFavouritesApps(item)}
            contentContainerStyle={styles.flatListContainer}
          />
          <FlatList
            data={favouriteData.slice(Math.ceil(favouriteData.length / 2))}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => renderFavouritesApps(item)}
            contentContainerStyle={styles.flatListContainer}
          />
          </>
        )}
      </View>

      {/* Unused Apps Section */}
      <View style={styles.unusedAppsContainer}>
        <Text style={styles.sectionTitle}>
          {t("Dashboard.UnusedApps")}
        </Text>
        <FlatList
          data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => renderApps(item)}
          contentContainerStyle={styles.flatListContainer}
        />
        <FlatList
          data={dataApps.slice(Math.ceil(dataApps.length / 2))}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => renderApps(item)}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </>
  )
) : (
  <View style={{height:hp(55)}}>
   {categoryComponents[selectedCategory]?.component || (
      <Text>{t('NoDataAvailable')}</Text>
    )}
  </View>
)}

        {/* Mass App Category List */}
        {/* Vedio sections  start*/}
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
            <VideoActive width={23} height={23} />
          </View>
          <FlatList
            data={data.categories}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RenderCategory
                item={item}
                isSelected={selectedCategoryId === item.id}
                onPress={() => setSelectedCategoryId(item.id)}
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopContent
              data={data.topVideo}
              showTopimage={false}
              showTopVideo={true}
              // placeholderImage={appImages.videoPlaceHolder}
              onPress={() =>
                navigation.navigate("VideoPlayerScreen", {
                  videoUri: data.video,
                  identifier: false,
                })
              }
              titleStyle={{ fontSize: 18, fontFamily: "Inter-Bold" }}
              descriptionStyle={{ fontSize: 14, color: "gray" }}
              // containerStyle={{ marginHorizontal: 20 }}
            />
            {data.videosByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <View style={{}}>
                <SubCategoryList
                  data={data.videosByCategory}
                  onVideoPress={handleVideoPress}
                  placeholderImage={appImages.galleryPlaceHolder}
                />
              </View>
            )}
          </View>
        )}
        {/* Vedio sections  ed*/}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
        {/* Pic sections start */}
        {/* Horizontal Category List */}
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
            <ProfileActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Picdata.categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderSearchesPic(item)}
          />
        </View>

        {Picloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopContent
              data={Picdata.topPic}
              showTopimage={true}
              showTopVideo={false}
              onPress={() =>
                navigation.navigate("TopPicView", { picData: Picdata.topPic })
              }
              titleStyle={{ fontSize: 18, fontFamily: "Inter-Bold" }}
              descriptionStyle={{ fontSize: 14, color: "gray" }}
              // containerStyle={{ marginHorizontal: 20 }}
            />
            {Picdata.PicByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <View style={{}}>
                <FlatList
                  data={Picdata.PicByCategory}
                  renderItem={renderPicsSection}
                  keyExtractor={(item) => item.title}
                />
              </View>
            )}
          </View>
        )}
        {/* Pic sections end*/}

        {/* News sections start*/}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
        {/* Pic sections start */}
        {/* Horizontal Category List */}
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
            <News name="news" size={28} color="#FACA4E" />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Newsdata.categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderNewsSearches(item)}
          />
        </View>

        {Newsloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopContent
              data={Newsdata.topNews || []}
              showUsername={true}
              showTopimage={true}
              showTopVideo={false}
              onPress={() =>
                navigation.navigate("ViewNews", { picData: Newsdata.topNews })
              }
              titleStyle={{ fontSize: 18, fontFamily: "Inter-Bold" }}
              descriptionStyle={{ fontSize: 14, color: "gray" }}
            />
            {Newsdata.NewsByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <View style={{}}>
                <FlatList
                  data={Newsdata.NewsByCategory || []}
                  renderItem={renderNewsSection}
                  keyExtractor={(item) => item.title}
                />
              </View>
            )}
          </View>
        )}
        {/* News sections end*/}

        {/* Letter sections start*/}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
        {/* Pic sections start */}
        {/* Horizontal Category List */}
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
          <LetterIcon name="newsletter" size={30} color="#FACA4E" />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Letterdata.categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderPostLetterSearches(item)}
          />
        </View>
        {Letterloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopLetterComponent
              LetterData={Letterdata}
              navigation={navigation}
            />
            {Letterdata.LetterByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <FlatList
                data={Letterdata.LetterByCategory || []}
                renderItem={renderLetterSection}
                keyExtractor={(item) => item.title}
              />
            )}
          </View>
        )}

        {/* Letter sections end*/}

        {/* QAFI sections start*/}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
            <QafiIcon name="people-arrows" size={22} color="#FACA4E" />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={QAFIdata.categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderQAFISearches(item)}
          />
        </View>
        {QAFIloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopContent
              data={QAFIdata.topQAFI || []}
              showUsername={true}
              showTopimage={true}
              showTopVideo={false}
              onPress={() =>
                navigation.navigate("ViewQAFI", { picData: QAFIdata.topQAFI })
              }
              titleStyle={{ fontSize: 18, fontFamily: "Inter-Bold" }}
              descriptionStyle={{ fontSize: 14, color: "gray" }}
            />
            {QAFIdata.QAFIByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <View style={{}}>
                <FlatList
                  data={QAFIdata.QAFIByCategory || []}
                  renderItem={renderQAFISection}
                  keyExtractor={(item) => item.title}
                />
              </View>
            )}
          </View>
        )}
        {/* QAFI sections end*/}

        {/*EBIC  sections start*/}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
            <EBC name="sticker-emoji" size={30} color="#FACA4E" />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={EBICdata.categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderEBCSearches(item)}
          />
        </View>
        {EBICloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopContent
              data={EBICdata.topEBIC || []}
              showUsername={true}
              showTopimage={false}
              showTopVideo={false}
              ShowEmoji={true}
              onPress={() =>
                navigation.navigate("ViewGEBC", { picData: EBICdata.topEBIC })
              }
              titleStyle={{ fontSize: 18, fontFamily: "Inter-Bold" }}
              descriptionStyle={{ fontSize: 14, color: "gray" }}
            />
            {EBICdata.EBICByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <View style={{}}>
                <FlatList
                  data={EBICdata.EBICByCategory || []}
                  renderItem={renderEBCSection}
                  keyExtractor={(item) => item.title}
                />
              </View>
            )}
          </View>
        )}


       {/* Sports sections  start*/}
       <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />

        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
            <ProfileActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Sportsdata.categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderSearchesSports(item)}
          />
        </View>

        {Sportsloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopContent
              data={Sportsdata.topSports}
              showTopimage={true}
              showTopVideo={false}
              onPress={() =>
                navigation.navigate("TopSportsView", { picData: Sportsdata.topSports })}
              titleStyle={{ fontSize: 18, fontFamily: "Inter-Bold" }}
              descriptionStyle={{ fontSize: 14, color: "gray" }}
              // containerStyle={{ marginHorizontal: 20 }}
            />
            {Sportsdata.SportsByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <View style={{}}>
                <FlatList
                  data={Sportsdata.SportsByCategory}
                  renderItem={renderSportsSection}
                  keyExtractor={(item) => item.title}
                />
              </View>
            )}
          </View>
        )}
        {/* Pic sections end*/}


        {/* Cinematic sections start*/}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
          <Cinematiceactive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Cinematicdata.categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderCinematicSearches(item)}
          />
        </View>
        {Cinematicloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopContent
              data={Cinematicdata.topCinematic || []}
              showUsername={false}
              showTopimage={true}
              showTopVideo={false}
              ShowEmoji={false}
              onPress={() =>
                navigation.navigate('Cinematics_details', { videoData: Cinematicdata.topCinematic, identifier: false })
                // navigation.navigate("ViewGEBC", { picData: Cinematicdata.topCinematic })
              }
              titleStyle={{ fontSize: 18, fontFamily: "Inter-Bold" }}
              descriptionStyle={{ fontSize: 14, color: "gray" }}
            />
            {Cinematicdata.CinematicByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <View style={{}}>
                <FlatList
                  data={Cinematicdata.CinematicByCategory || []}
                  renderItem={renderCinematicSection}
                  keyExtractor={(item) => item.title}
                />
              </View>
            )}
          </View>
        )}
        {/* Cinematic sections end*/}


        {/* Fanstar sections start*/}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
          <FansActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Fanstardata.categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderFanstarSearches(item)}
          />
        </View>
        {Fanstarloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopContent
              data={Fanstardata.topFanstar || []}
              showUsername={false}
              showTopimage={true}
              showTopVideo={false}
              ShowEmoji={false}
              onPress={() =>
                // navigation.navigate('Cinematics_details', { videoData: Fanstardata.topFanstar, identifier: false })
          navigation.navigate('Fans_star_details', { videoData: Fanstardata.topFanstar })
              }
              titleStyle={{ fontSize: 18, fontFamily: "Inter-Bold" }}
              descriptionStyle={{ fontSize: 14, color: "gray" }}
            />
            {Fanstardata.FanstarByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <View style={{}}>
                <FlatList
                  data={Fanstardata.FanstarByCategory || []}
                  renderItem={renderFanstarSection}
                  keyExtractor={(item) => item.title}
                />
              </View>
            )}
          </View>
        )}
        {/* Fanstar sections end*/}


        {/* Kids sections start*/}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
          <KidsActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Kidsdata.categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderKidsSearches(item)}
          />
        </View>
        {Kidsloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopContent
              data={Kidsdata.topKids || []}
              showUsername={false}
              showTopimage={true}
              showTopVideo={false}
              ShowEmoji={false}
              onPress={() =>
              navigation.navigate("Kids_vid_details", {videoData: Kidsdata.topKids,})}
              titleStyle={{ fontSize: 18, fontFamily: "Inter-Bold" }}
              descriptionStyle={{ fontSize: 14, color: "gray" }}
            />
            {Kidsdata.KidsByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <View style={{}}>
                <FlatList
                  data={Kidsdata.KidsByCategory || []}
                  renderItem={renderKidsSection}
                  keyExtractor={(item) => item.title}
                />
              </View>
            )}
          </View>
        )}
        {/* Kids sections end*/}


        {/* Learningdata sections start*/}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
          <PuzzleActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Learningdata.categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderLearnSearches(item)}
          />
        </View>
        {Learningloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopContent
              data={Learningdata.topLearning || []}
              showUsername={false}
              showTopimage={true}
              showTopVideo={false}
              ShowEmoji={false}
              onPress={() =>
              navigation.navigate("Learning_details", {videoData: Learningdata.topLearning,})}
              titleStyle={{ fontSize: 18, fontFamily: "Inter-Bold" }}
              descriptionStyle={{ fontSize: 14, color: "gray" }}
            />
            {Learningdata.LearningByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <View style={{}}>
                <FlatList
                  data={Learningdata.LearningByCategory || []}
                  renderItem={renderLearnSection}
                  keyExtractor={(item) => item.title}
                />
              </View>
            )}
          </View>
        )}
        {/* Learningdata sections end*/}

        
        {/* TVProg sections start*/}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
          <TVpromaxActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={TVProgdata.categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderTVProgSearches(item)}
          />
        </View>
        {TVProgloading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        ) : (
          <View>
            <TopContent
              data={TVProgdata.topTVProg || []}
              showUsername={false}
              showTopimage={true}
              showTopVideo={false}
              ShowEmoji={false}
              onPress={() =>
                navigation.navigate('Tv_Promax_details', { videoData: TVProgdata.topTVProg })}
              // navigation.navigate("Learning_details", {videoData: TVProgdata.topTVProg,})}
              titleStyle={{ fontSize: 18, fontFamily: "Inter-Bold" }}
              descriptionStyle={{ fontSize: 14, color: "gray" }}
            />
            {TVProgdata.TVProgByCategory?.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{t("NoDataAvailable")}</Text>
              </View>
            ) : (
              <View style={{}}>
                <FlatList
                  data={TVProgdata.TVProgByCategory || []}
                  renderItem={renderTVProgSection}
                  keyExtractor={(item) => item.title}
                />
              </View>
            )}
          </View>
        )}
        {/* Learningdata sections end*/}


     

  {/* Marcket sections start*/}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />
        <View style={styles.latestSearchList}>
          <View style={{ marginRight: 6 }}>
          <MarketActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={RegionArea}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) => renderSearchesMarket(item)}
          />
        </View>


        <View>
      {/* Top Videos */}
      <View style={styles.topVideosContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetails", { ProductDetails: dataTopVideosMarket })
          }>
          <View style={styles.topVideoImageContainer}>
            {firstImageUrl === 0 ? (
              <Image
                style={styles.topVideoImage}
                source={appImages.galleryPlaceHolder}
              />
            ) : (
              <Image
                style={styles.topVideoImage}
                source={{ uri: firstImageUrl }}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.topVideoTextContainer}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={7}
            style={styles.topVideoText}>
            {dataTopVideosMarket === undefined || dataTopVideosMarket === 0
              ? "No Top market Shown"
              : dataTopVideosMarket?.description}
          </Text>
        </View>
      </View>

      {/* Category Sections */}
      {categoriesSelectMarket.map((category, index) => {
        const categoryData = [
          dataElectronics,
          dataVehicles,
          dataClothing,
          allMarket,
        ][index];

        return (
          <View style={styles.categorySection} key={index}>
            <Text style={styles.categoryTitle}>
              {category?.label}
            </Text>
            <View style={styles.categoryContent}>
              {marketLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#FACA4E" />
                </View>
              ) : (
                <>
                  {categoryData?.length === 0 ? (
                    <View style={styles.noDataContainer}>
                      <Text style={styles.noDataText}>
                        {t("Dashboard.NoDataavailable")}
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      style={styles.flatList}
                      showsHorizontalScrollIndicator={false}
                      data={categoryData}
                      horizontal
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => renderAvailableAppsMarket(item)}
                    />
                  )}
                </>
              )}
            </View>
          </View>
        );
      })}
    </View>
        {/* Marcket sections start*/}
      </ScrollView>

      <CustomaddFavModal
        visible={isLongPress}
        onClose={() => setIsLongPress(false)}
        actions={actionsForAddToFavourites}
        isCancelModalVisible={isCancelModalVisible}
        closeCancelModal={() => setIsCancelModalVisible(false)}
      />

      <CustomaddFavModal
        visible={isLongPressRemove}
        onClose={() => setIsLongPressRemove(false)}
        actions={actionsForRemoveFavourites}
        isCancelModalVisible={isCancelModalVisible}
        closeCancelModal={() => setIsCancelModalVisible(false)}
      />


<CustomMassAppCateModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav(item)}
  renderItem={({ item }) => renderAppsFavItem({ item, selectedApps, setSelectedApps })}
  handleSave={handleSave}
/>

<CustomMassAppCateModal
  visible={modalVisible_b}
  onClose={() => setModalVisible_b(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_b(item)}
  renderItem={({ item }) => renderAppsFavItem({ item, selectedApps: selectedApps_b, setSelectedApps: setSelectedApps_b })}
  handleSave={handleSave_b}
/>

<CustomMassAppCateModal
  visible={modalVisible_sp}
  onClose={() => setModalVisible_sp(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_sp(item)}
  renderItem={({ item }) => renderAppsFavItem(item, selectedApps_sp, setSelectedApps_sp)}
  handleSave={handleSave_sp}
/>

<CustomMassAppCateModal
  visible={modalVisible_e}
  onClose={() => setModalVisible_e(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_e(item)}
  renderItem={({ item }) => renderAppsFavItem(item, selectedApps_e, setSelectedApps_e)}
  handleSave={handleSave_e}
/>

<CustomMassAppCateModal
  visible={modalVisible_d}
  onClose={() => setModalVisible_d(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_d(item)}
  renderItem={({ item }) => renderAppsFavItem(item, selectedApps_d, setSelectedApps_d)}
  handleSave={handleSave_d}
/>

<CustomMassAppCateModal
  visible={modalVisible_fd}
  onClose={() => setModalVisible_fd(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_fd(item)}
  renderItem={({ item }) => renderAppsFavItem(item, selectedApps_fd, setSelectedApps_fd)}
  handleSave={handleSave_fd}
/>

<CustomMassAppCateModal
  visible={modalVisible_sm}
  onClose={() => setModalVisible_sm(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_sm(item)}
  renderItem={({ item }) => renderAppsFavItem(item, selectedApps_sm, setSelectedApps_sm)}
  handleSave={handleSave_sm}
/>

<CustomMassAppCateModal
  visible={modalVisible_mw}
  onClose={() => setModalVisible_mw(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_mw(item)}
  renderItem={({ item }) => renderAppsFavItem(item, selectedApps_mw, setSelectedApps_mw)}
  handleSave={handleSave_mw}
/>

<CustomMassAppCateModal
  visible={modalVisible_g}
  onClose={() => setModalVisible_g(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_g(item)}
  renderItem={({ item }) => renderAppsFavItem(item, selectedApps_g, setSelectedApps_g)}
  handleSave={handleSave_g}
/>

<CustomMassAppCateModal
  visible={modalVisible_em}
  onClose={() => setModalVisible_em(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_em(item)}
  renderItem={({ item }) => renderAppsFavItem(item, selectedApps_em, setSelectedApps_em)}

  handleSave={handleSave_em}
/>

      </>
    }
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textSearchDetails: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
  },
  container: {
    flex: 1,
  },
  categoryList: {
    paddingVertical: 8,
  },

  categoryItem: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: "#007bff",
  },
  categoryText: {
    color: "#000",
  },
  dataContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexGrow: 1,
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  responseText: {
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#f4f4f4",
    padding: 8,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },

  // pic style start hai
  itemContainer: {
    // Add any specific styles for the main container
    marginRight: wp(2),
    width: wp(35),
    // alignItems: "center",
  },
  image: {
    width: wp(35),
    height: hp(12),
    resizeMode: "cover",
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(7),
    width: wp(25),
  },
  userImageContainer: {
    width: wp(7),
    marginLeft: wp(0.5),
    height: wp(7),
    overflow: "hidden",
    borderRadius: wp(7) / 2,
  },
  userImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  defaultUserIcon: {
    width: wp(7),
    marginLeft: wp(0.5),
    height: wp(7),
    borderRadius: wp(7) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  userNameContainer: {
    width: 70, // Adjust as needed
  },
  userName: {
    fontSize: hp(1.5),
    marginLeft: wp(0.7),
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    color: "#4A4A4A",
    fontSize: hp(2.3),
    textAlign: "left",
    fontFamily: "Inter-SemiBold",
    marginBottom: 6,
    // top: "6%",
  },
  videoItem: {
    marginRight: 15,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
    color: "gray",
  },
  NoDataView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataText: {
    fontWeight: "500",
    fontSize: hp(2.1),
  },

  // Letter Style
  touchableContainer: {
    width: wp(45),
    marginHorizontal: wp(2),
  },
  topDivider: {
    backgroundColor: "#77BDF2",
    height: 2,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 2,
    alignItems: "center",
    height: hp(4),
  },
  userImageContainer: {
    height: hp(2),
    width: wp(4),
    borderRadius: wp(3),
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: wp(3),
    resizeMode: "cover",
  },
  accountIcon: {
    marginTop: hp(0.5),
  },
  approvedIconContainer: {
    marginLeft: wp(2.5),
  },
  dateContainer: {
    alignItems: "flex-end",
    height: 10,
  },
  postDateText: {
    color: "#282828",
    width: "25%",
    fontSize: 6,
    fontFamily: "Inter-Bold",
  },
  subjectContainer: {
    flexDirection: "row",
    height: hp(5),
    paddingTop: 6,
  },
  subjectText: {
    color: "#282828",
    fontSize: 8,
    textDecorationLine: "underline",
    fontFamily: "Inter-Bold",
  },
  subjectDetails: {
    height: "100%",
    width: "75%",
  },
  subjectDetailsText: {
    color: "#595959",
    marginLeft: wp(1),
    fontSize: 8,
    fontFamily: "Inter-Regular",
  },
  signatureContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: hp(6),
    right: 10,
  },
  signatureImageContainer: {
    height: hp(5),
    width: wp(9),
    borderRadius: wp(3),
  },
  signatureImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  bottomDivider: {
    backgroundColor: "#77BDF2",
    height: 2,
    width: "100%",
  },
  latestSearchList: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(7),
  },









  topVideosContainer: {
    marginTop: hp(2),
    flexDirection: "row",
    height: hp(16),
  },
  topVideoImageContainer: {
    width: wp(43),
    height: "100%",
    borderRadius: wp(5),
  },
  topVideoImage: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    borderRadius: wp(3),
    resizeMode: "cover",
  },
  topVideoTextContainer: {
    width: "50%",
  },
  topVideoText: {
    fontSize: hp(1.5),
    marginLeft: wp(1),
    lineHeight: hp(2),
    fontFamily: "Inter-Regular",
    color: "#000000",
  },
  categorySection: {
    marginTop: hp(4),
    height: hp(23),
  },
  categoryTitle: {
    fontSize: hp(2.3),
    fontFamily: "Inter-SemiBold",
    color: "#4A4A4A",
  },
  categoryContent: {
    marginTop: hp(1),
    height: "100%",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontFamily: "Inter-Medium",
    fontSize: hp(2),
    color: "gray",

    textAlign: 'center',
    marginVertical: 20,
  },
  flatList: {
    flex: 1,
  },


  // Mass apps
  Masscontainer: {
    marginTop: hp(2),
    marginLeft: wp(-1),
    height: hp(23),
    width: wp(60),
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontFamily: "Inter-Medium",
    fontSize: hp(2),
    color: "gray",
  },
  flatList: {
    margin: 8,
    flex: 1,
  },
  sectionMassContainer: {
    marginTop: hp(-3),
    height: hp(22),
    marginBottom:8
  },
  sectionTitle: {
    fontSize: hp(2.3),
    marginLeft: wp(3),
    fontFamily: "Inter-Bold",
    color: "#4A4A4A",
    fontWeight: "bold",
  },
  flatListContainer: {
    // borderWidth: 1,
    marginRight: wp(2),
    // marginTop: hp(3),
    borderColor: "#00000017",
    borderRadius: wp(3),
    // backgroundColor:'gray'
  },
  favoritesContainer: {
    height: hp(22),
    marginBottom:8
  },
  favoritesText: {
    fontWeight: "bold",
    fontSize: hp(2.1),
    justifyContent: "center",
    color: "gray",
  },
  unusedAppsContainer: {
    marginTop: hp(1),
    marginBottom: hp(5),
    height: hp(25),
  },
    items: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1,
    borderColor: "black",
    // padding: 10,
    paddingHorizontal:10,
    // backgroundColor:'red',
    // height:hp(10)
      marginTop:6,
      
  },



    modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
    modalContent: {
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  modalContentCross: {
    position: "absolute",
    backgroundColor: "white",
    top: 18,
    zIndex: 999,
    right: 16,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent1: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    elevation: 5,
    height: "40%",
  },
  leftContent1: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    top: "10%",

  },
  leftText1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginRight: 20
  },



  //App category component
  Appcategorycontainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    margin: '2%',
  },
  appContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  appImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
    margin: '3%',
  },
  appText: {
    color: 'black',
    fontSize: wp(2.5),
  },
  placeholderText: {
    color: 'grey',
    fontSize: wp(3.5),
    textAlign: 'center',
    top: '40%',
  },
  addButton: {
    position: 'absolute',
    top: '70%',
    right: 10,
  },
  itemFavContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal:10,
  },
  checkmarkIcon: {
    position: 'absolute', // Position the icon absolutely within the container.
    top: -5, // Adjust this value to control the vertical alignment.
    right: -5, // Adjust this value to control the horizontal alignment.
    zIndex: 1, // Ensure the icon is above other elements.
  },


  loaderOverlay: {
    position: "absolute", // Full-screen overlay
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: background dimming effect
  },
});

export default DashboardJnvryold;
