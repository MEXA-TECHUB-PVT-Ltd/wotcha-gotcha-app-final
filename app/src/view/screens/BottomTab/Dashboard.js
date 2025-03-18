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
import Sport from "react-native-vector-icons/MaterialIcons";
import { VideoActive } from "../../../assets/svg";
import { InstalledApps, RNLauncherKitHelper } from "react-native-launcher-kit";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
import CategoryActive from "../../../assets/svg/CategoryActive.svg";
import CategoryInactive from "../../../assets/svg/CategoryInactive";
import Add from "../../../assets/svg/AddMainScreen.svg";
import DotLoader from "../../../assets/Custom/DotLoader";
import CustomaddFavModal from "../../../assets/Custom/CustomaddFavModal";
import CustomMassAppCateModal from "../../../assets/Custom/CustomMassAppCateModal";
import DeviceInfo from 'react-native-device-info';
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";


const Dashboard = () => {
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
      try {
        const isFirstTime = await AsyncStorage.getItem("isFirstTime");
        console.log('isFirstTime---------------------------',isFirstTime )
        if (isFirstTime === null || isFirstTime === "true") {
          // If it's the first time or no value exists
          setDotLoading(true);
          const timeout = setTimeout(() => {
            setDotLoading(false);
            AsyncStorage.setItem("isFirstTime", "false"); // Mark it as false after showing the loader
          }, 15000); // 15 seconds delay

          return () => clearTimeout(timeout); // Clear timeout on unmount
        } else {
          // Not the first time
          setDotLoading(false);
        }
      } catch (error) {
        console.error("Error accessing AsyncStorage:", error);
      }
    };
    checkFirstTime();
  }, []);

//   useEffect(() => {
//     const checkFirstTime = async () => {
//       const isFirstTime = await AsyncStorage.getItem("isFirstTime");
//       console.log('isFirstTime---------------------------',isFirstTime )
//       if (!isFirstTime) {
//         // If it's the first time, show the loader
//         setDotLoading(true);
//         const timeout = setTimeout(() => {
//           setDotLoading(false);
//           AsyncStorage.setItem("isFirstTime", "false"); // Mark as shown
//         }, 10000);
//         return () => clearTimeout(timeout);
//       }
//     };

//     checkFirstTime();
//   }, []);

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
  const [systemApps, setSystemApps] = useState([]);
  const [userApps, setUserApps] = useState([]);
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

  // const initializeAppData = async () => {
  const initializeAppData = async (setDataApps, setSystemApps , setUserApps , setUnusedApps ) => {
    try {
        const manufacturer = await DeviceInfo.getManufacturer();
        

      // Fetch all installed apps
          const allApps = await InstalledApps.getApps();
          const packageDataArray = allApps.map((app) => ({
           label: app.label,
           bundle: app.packageName,
           image: app.icon,
          }));
          setDataApps(packageDataArray);
          // Normalize manufacturer name (to lowercase, without spaces) to match prefixes
          const normalizedManufacturer = manufacturer.toLowerCase().replace(/\s/g, '');
          console.log('normalizedManufacturer------??:', normalizedManufacturer);
          const systemAppPrefixes = [
            `com.${normalizedManufacturer}`, // Manufacturer-specific apps
            'com.android',                  // Android system apps
            'com.google',                   // Google apps
            'com.sec',                      // Samsung apps
            'com.miui',                     // Xiaomi apps
            'com.huawei',                   // Huawei apps
            'com.transsion',                // Transsion apps (e.g., Tecno, Infinix, Itel)
            'com.oppo',                     // Oppo apps
            'com.vivo',                     // Vivo apps
            'com.realme',                   // Realme apps
          ];
          // Dynamically filter system and user apps
          const systemAppsList = [];
            const userAppsList = [];
            packageDataArray.forEach((app) => {
              const bundle = app.bundle.toLowerCase();
              const isSystemApp = systemAppPrefixes.some((prefix) => bundle.startsWith(prefix));
              // console.log(' app.bundle.toLowerCase()------:',  app.bundle.toLowerCase());
              const isGalleryOrPhoneApp =
              app.bundle.toLowerCase().includes('gallery') || // Gallery apps
              app.bundle.toLowerCase().includes('dialer') ||  // Dialer apps
              app.bundle.toLowerCase().includes('phone');     // Phone apps
              if (isSystemApp || isGalleryOrPhoneApp) {
                systemAppsList.push(app);
              } else {
                userAppsList.push(app);
              }
            });
        //   packageDataArray.forEach((app) => {
        //  // Check for system apps based on manufacturer, android, and google prefixes
        //  if (
        //   app.bundle.toLowerCase().startsWith(`com.${normalizedManufacturer}`) || // Manufacturer-specific apps
        //   app.bundle.toLowerCase().startsWith('com.android') || // Android system apps
        //    app.bundle.toLowerCase().startsWith('com.google') // Google apps
        //   ) {
        //  systemAppsList.push(app);
        //  } else {
        //   userAppsList.push(app);
        //  }
        // });
        setSystemApps(systemAppsList);
        setUserApps(userAppsList);
      // Top 6 Apps
      // const storedTopData = await AsyncStorage.getItem("topData");
      // if (storedTopData) {
      //   setTopData(JSON.parse(storedTopData));
      // } else {
      //   const topSixApps = packageDataArray.slice(0, 6).map((item) => ({
      //   // const topSixApps = appDataArray.slice(0, 6).map((item) => ({
      //     ...item,
      //     count: 2,
      //   }));
      //   await AsyncStorage.setItem("topData", JSON.stringify(topSixApps));
      //   setTopData(topSixApps);
      // }
  
      // Favourite Apps
      // const storedFavouriteData = await AsyncStorage.getItem("StorefavouriteData");
      // setFavouriteData(JSON.parse(storedFavouriteData));
      // if (!storedFavouriteData) {
      //   const initialFavouriteData = packageDataArray.slice(0, 4);
      //   // const initialFavouriteData = appDataArray.slice(0, 4);
      //   await AsyncStorage.setItem(
      //     "favouriteData",
      //     JSON.stringify(initialFavouriteData)
      //   );
      //   // setFavouriteData(initialFavouriteData);
      // } else {
      //   setFavouriteData(JSON.parse(storedFavouriteData));
      // }

       // Unused Apps Logic
    const currentDate = new Date();
    const threeWeeksAgo = new Date(currentDate - 21 * 24 * 60 * 60 * 1000); // Three weeks ago
    const unusedAppsData = [];

    for (const app of packageDataArray) {
      try {
        const lastUsageDate = await AsyncStorage.getItem(`lastUsageDate_${app.bundle}`);
        if (!lastUsageDate || new Date(lastUsageDate) < threeWeeksAgo) {
          unusedAppsData.push(app);
        }
      } catch (error) {
        console.error(`Error processing unused app: ${app.label}`, error);
      }
    }
    setUnusedApps(unusedAppsData);
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
  
  useEffect(() => {
    // Initialize apps and related data
    initializeAppData(setDataApps, setSystemApps , setUserApps , setUnusedApps );
    // initializeAppData();
    // Fetch unused apps
    // fetchAndStoreUnusedApps(setUnusedApps);
  }, []);



   
    // Load favouriteData from AsyncStorage when the component mounts
    const loadFavouriteData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("StorefavouriteData");

        // it is conisdering empty array as 2 length thats why i a have added it
        if (!storedData) {
          const initialFavouriteData = dataApps.slice(0, 4);
          await AsyncStorage.setItem(
            "StorefavouriteData",
            JSON.stringify(initialFavouriteData)
          );
          console.log('initialFavouriteData----------', initialFavouriteData.length);
          setFavouriteData(initialFavouriteData);
        } else {
          const parsedData = JSON.parse(storedData);
          console.log('favouriteData----------', parsedData.length);
          setFavouriteData(parsedData);
          console.log("FAVOURITE IS NOT NULL??");
        }
      } catch (error) {
        console.error(
          "Error loading favourite data from AsyncStorage:",
          error
        );
      }
    };

    useEffect(() => {
    loadFavouriteData();
  
}, []); 

  
  // Save favouriteData to AsyncStorage whenever it changes
  const saveFavouriteData = async () => {
    try {
      await AsyncStorage.setItem(
        "StorefavouriteData",
        JSON.stringify(favouriteData)
      );
      
    } catch (error) {
      console.error("Error saving favourite data to AsyncStorage:", error);
    }
  };

  useEffect(() => {
  saveFavouriteData();
}, [favouriteData, ]); 


  const loadTopData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("topData");
      console.log("Retrieved storedData:", storedData);

      if (!storedData || JSON.parse(storedData).length === 0) {
        // If no data exists or stored data is an empty array
        console.log("No data found or empty data, initializing with top 6 apps.");
        if (dataApps && dataApps.length > 0) {
          const topSixItems = dataApps.slice(0, 6).map(item => ({
            ...item,
            count: 3, // Initialize count to 3
          }));
          await AsyncStorage.setItem("topData", JSON.stringify(topSixItems));
          setTopData(topSixItems);
        } else {
          console.warn("dataApps is empty, cannot initialize topData.");
        }
      } else {
        // Parse and set the existing data
        const parsedData = JSON.parse(storedData);
        console.log("Parsed data from AsyncStorage:", parsedData);
        setTopData(parsedData);
      }
    } catch (error) {
      console.error("Error loading top data from AsyncStorage:", error);
    }
  };

  useEffect(() => {
 // Only initialize topData when dataApps is first populated
 if (dataApps?.length > 0 && topData.length === 0) {
  loadTopData();
}
}, [dataApps]);



   
      // Save topData to AsyncStorage whenever it changes
      const saveTopData = async () => {
        try {
          // const reversedTopData = [...topData].reverse();
          // await AsyncStorage.setItem("topData", JSON.stringify(reversedTopData));
          await AsyncStorage.setItem("topData", JSON.stringify(topData));
        } catch (error) {
          console.error("Error saving top data to AsyncStorage:", error);
        }
      };

    useEffect(() => {
      if (topData.length > 0) {
        saveTopData();
      }
    }, [topData]);
    

  // useEffect(() => {
  //   const initializeTopData = async () => {
  //     try {
  //       if (!topData || topData.length === 0) {
  //         // Initialize with the first 6 apps
  //         const topSixItems = dataApps.slice(0, 6).map(item => ({
  //           ...item,
  //           count: 2, // Initialize count to 0
  //         }));
  //         await AsyncStorage.setItem('topData', JSON.stringify(topSixItems));
  //         setTopData(topSixItems);
  //       } else {
  //         // Save existing topData to AsyncStorage
  //         await AsyncStorage.setItem('topData', JSON.stringify(topData));
  //       }
  //     } catch (error) {
  //       console.error('Error saving top data to AsyncStorage:', error);
  //     }
  //   };
  
  //   initializeTopData();
  // }, [topData]);

  // useEffect(() => {
  //   const removeTopData = async () => {
  //     try {
  //       await AsyncStorage.removeItem("topData"); // Remove "topData" from AsyncStorage
  //       console.log("topData removed from AsyncStorage");
  //     } catch (error) {
  //       console.error("Error removing topData from AsyncStorage:", error);
  //     }
  //   };
  
  //   removeTopData();
  // }, [topData]);
  // useEffect(() => {
  //   // Save favourite and top data when updated
  //   if (favouriteData) {
  //     handleSaveData("StorefavouriteData", favouriteData);
  //   }

  //   if (topData) {
  //     handleSaveData("topData", topData);
  //   }
  // }, [favouriteData, topData]);

  // const openunusedApp = async (item) => {
  //   try {
  //     await RNLauncherKitHelper.launchApplication(item.bundle);
  //     const now = new Date().toISOString();
  //     await AsyncStorage.setItem(`lastUsageDate_${item.bundle}`, now);
  
  //     // Remove app from unused apps list
  //     const updatedUnusedApps = unusedApps.filter((app) => app.bundle !== item.bundle);
  //     setUnusedApps(updatedUnusedApps);
  //   } catch (error) {
  //     console.error("Error opening the app:", error);
  //   }
  // };

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

  /////////////////////////////////////////////////////////////////////////////News
 
  const [Newsdata, setNewsData] = useState({
    categories: [],
    topNews: null,
    NewsByCategory: [],
  });
  const [selectedNewsCategoryId, setSelectedNewsCategoryId] = useState(null);
  const [Newsloading, setNewsLoading] = useState(true);
  const [Newserror, setNewsError] = useState(null);
 
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
              showNOImage={true}
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
          handleItemPress(item);
          // if (item === t('Ecommerce')) {
          //   loadSavedApps(); 
          // } else if (item ===  t('Business')) {
          //   BusinessSavedApps();
          // } 
          switch (item) {
            case t('Ecommerce'):
              loadSavedApps();
              break;
            case t('Business'):
              BusinessSavedApps();
              break;
            case t('cateSports'):
              SportSavedApps();
              break;
            case t('Education'):
              EducationSavedApps();
              break;
            default:
              console.log("No action defined for:", item);
          }
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
      const openApp = async (bundle) => {
        try {
          await RNLauncherKitHelper.launchApplication(bundle);
        } catch (error) {
          console.error('Error opening the app:', error);
        }
      }
      console.log('topData---count-------', item?.count);
    // Render the item only if count is equal to 2
    if (item?.count > 2) {
      return (
        <TouchableOpacity onPress={() => openApp(item?.bundle)}>

        <View style={{ height: hp(8), padding: 5 }}>
          <Image
            style={{ width: wp(12), height: wp(12) }}
            resizeMode="contain"
            source={{ uri: `data:image/png;base64,${item?.image}` }}
          />
        </View>
        </TouchableOpacity>
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

  const shortenLabel = (label) => {
    if (!label) return ''; // Handle undefined or null labels
    const words = label.split(' ');
    if (words.length > 1) {
      return words[0]; // Return the first word if there are multiple words
    }
    return label.length > 12 ? `${label.slice(0, 12)}...` : label; // Shorten if longer than 10 characters
  };
    const renderApps = (item) => {
    //console.log('item at first', item);
    const openApp = async (bundle) => {
      try {
        const appIndex = topData.findIndex(app => app.bundle === bundle);
    
        let updatedTopData = [...topData];
    
        if (appIndex !== -1) {
          // Update the count for the existing app
          updatedTopData[appIndex].count += 1;
    
          // If the count exceeds 3, move the app to the front of the list
          if (updatedTopData[appIndex].count > 3) {
            const [selectedApp] = updatedTopData.splice(appIndex, 1);
            updatedTopData = [selectedApp, ...updatedTopData].slice(0, 6);
          }
        } else {
          // Add new app to the top data with an initial count of 1
          const newApp = { ...item, count: 1 };
          updatedTopData = [newApp, ...updatedTopData].slice(0, 6);
        }
    
        // Save the updated top data
        setTopData(updatedTopData);
        await AsyncStorage.setItem('topData', JSON.stringify(updatedTopData));
    
        // Launch the app
        console.log(`Launching app: ${item.label}`);
        await RNLauncherKitHelper.launchApplication(bundle);
      } catch (error) {
        console.error('Error opening the app:', error);
      }
      // try {
      //   // Log the current topData labels
      //   // console.log("Current topData labels:", topData.map((app) => app.label));
  
      //   // Check if the app is already in the topData array
      //   const appIndex = topData.findIndex((app) => app.bundle === bundle);
  
      //   if (appIndex !== -1) {
      //     // If the app is already in the array, update the count
      //     console.log(`Updating count for app: ${topData[appIndex].label}`);
      //     const updatedTopData = [...topData];
      //     updatedTopData[appIndex] = {
      //       ...updatedTopData[appIndex],
      //       count: updatedTopData[appIndex].count + 1,
      //     };
      //     setTopData(updatedTopData);
      //   } else {
      //     // If the app is not in the array, add it to the topData
      //     console.log(`Adding new app to topData: ${item.label}`);
      //     const updatedTopData = [
      //       ...topData,
      //       {
      //         label: item.label,
      //         bundle: item.bundle,
      //         image: item.image,
      //         count: 1,
      //       },
      //     ].slice(0, 6); // Ensure topData contains only 6 items
  
      //     setTopData(updatedTopData);
      //   }
  
      //   // Log the updated topData labels
      //   console.log("Updated topData labels:", topData.map((app) => app.label));
  
      //   // Launch the app
      //   console.log(`Launching app: ${item.label}`);
      //   await RNLauncherKitHelper.launchApplication(bundle);
      // } catch (error) {
      //   console.error("Error opening the app:", error);
      // }
    };
    // const openApp = async (items) => {
    //   try {
    //     // Check if the app is already in the topData array
    //     const appIndex = topData.findIndex((app) => app.bundle === item.bundle);

    //     if (appIndex !== -1) {
    //       // If the app is already in the array, update the count
    //       const updatedTopData = [...topData];
    //       updatedTopData[appIndex] = {
    //         ...updatedTopData[appIndex],
    //         count: updatedTopData[appIndex].count + 1,
    //       };

    //       setTopData(updatedTopData);

    //       await RNLauncherKitHelper.launchApplication(item.bundle);

    //     } else {
    //       // If the app is not in the array, add it with count 1
    //       const randomIndex = Math.floor(Math.random() * 6); // Random index between 0 and 5
    //       const updatedTopData = [...topData];
    //       updatedTopData[randomIndex] = {
    //         label: item.label,
    //         bundle: item.bundle,
    //         image: item.image,
    //         count: 1,
    //       };

    //       setTopData(updatedTopData);

    //       await RNLauncherKitHelper.launchApplication(item.bundle);
    //     }
    //   } catch (error) {
    //     console.log("Error opening the app:", error);
    //     await RNLauncherKitHelper.launchApplication(item.bundle);
    //     // Your additional error handling logic here
    //   }
    // };

    return (
      <TouchableOpacity
        onLongPress={() => {
          setIsLongPress(true);
          setIsCancelModalVisible(true);
          setFavouriteItem(item);
        }}
        onPress={() => openApp(item.bundle)}
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
            {/* {item?.label} */}
            {shortenLabel(item?.label)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


    const openunusedApp = (item) => {
    // console.log('item at first', item.bundle);

    
    const openApp = async (items) => {

      try {
        await RNLauncherKitHelper.launchApplication(item.bundle);
        const now = new Date().toISOString();
        await AsyncStorage.setItem(`lastUsageDate_${item.bundle}`, now);
    
        // Remove app from unused apps list
        const updatedUnusedApps = unusedApps.filter((app) => app.bundle !== item.bundle);
        setUnusedApps(updatedUnusedApps);
      } catch (error) {
        console.error("Error opening the app:", error);
        await RNLauncherKitHelper.launchApplication(item.bundle);
        // Your additional error handling logic here
      }
    };

    return (
      <TouchableOpacity
        // onLongPress={() => {
        //   setIsLongPress(true);
        //   setIsCancelModalVisible(true);
        //   setFavouriteItem(item);
        // }}
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
             {shortenLabel(item?.label)}
            {/* {item?.label} */}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

    const renderFavouritesApps = (item) => {
    //console.log('item at first', item);
        // const openApp = async (item) => {
        //   try {
        //     // Check if the app is already in the topData array
        //     const appIndex = topData.findIndex((app) => app.bundle === item.bundle);
      
        //     let updatedTopData = [...topData];
      
        //     if (appIndex !== -1) {
        //       // If the app is already in the array, update the count
        //       updatedTopData[appIndex] = {
        //         ...updatedTopData[appIndex],
        //         count: updatedTopData[appIndex].count + 1,
        //       };
        //     } else {
        //       // If the app is not in the array, add it with count 1
        //       updatedTopData.push({
        //         label: item.label,
        //         bundle: item.bundle,
        //         image: item.image,
        //         count: 1,
        //       });
        //     }
      
        //     setTopData(updatedTopData);
      
        //     // Launch the app
        //     await RNLauncherKitHelper.launchApplication(item.bundle);
      
        //     //----------------------\\
        //     // Your additional logic here
        //     //----------------------\\
        //   } catch (error) {
        //     console.error("Error opening the app:", error);
        //     // Optionally, notify the user or show an error message
        //     // await RNLauncherKitHelper.launchApplication(item.bundle);
        //   }
        // };
        const openApp = async (bundle) => {
          try {
            const appIndex = topData.findIndex(app => app.bundle === bundle);
        
            let updatedTopData = [...topData];
        
            if (appIndex !== -1) {
              // Update the count for the existing app
              updatedTopData[appIndex].count += 1;
        
              // If the count exceeds 3, move the app to the front of the list
              if (updatedTopData[appIndex].count > 3) {
                const [selectedApp] = updatedTopData.splice(appIndex, 1);
                updatedTopData = [selectedApp, ...updatedTopData].slice(0, 6);
              }
            } else {
              // Add new app to the top data with an initial count of 1
              const newApp = { ...item, count: 1 };
              updatedTopData = [newApp, ...updatedTopData].slice(0, 6);
            }
        
            // Save the updated top data
            setTopData(updatedTopData);
            await AsyncStorage.setItem('topData', JSON.stringify(updatedTopData));
        
            // Launch the app
            console.log(`Launching app: ${item.label}`);
            await RNLauncherKitHelper.launchApplication(bundle);
          } catch (error) {
            console.error('Error opening the app:', error);
          }
          // try {
          //   // Log the current topData labels
          //   // console.log("Current topData labels:", topData.map((app) => app.label));
      
          //   // Check if the app is already in the topData array
          //   const appIndex = topData.findIndex((app) => app.bundle === bundle);
      
          //   if (appIndex !== -1) {
          //     // If the app is already in the array, update the count
          //     console.log(`Updating count for app: ${topData[appIndex].label}`);
          //     const updatedTopData = [...topData];
          //     updatedTopData[appIndex] = {
          //       ...updatedTopData[appIndex],
          //       count: updatedTopData[appIndex].count + 1,
          //     };
          //     setTopData(updatedTopData);
          //   } else {
          //     // If the app is not in the array, add it to the topData
          //     console.log(`Adding new app to topData: ${item.label}`);
          //     const updatedTopData = [
          //       ...topData,
          //       {
          //         label: item.label,
          //         bundle: item.bundle,
          //         image: item.image,
          //         count: 1,
          //       },
          //     ].slice(0, 6); // Ensure topData contains only 6 items
      
          //     setTopData(updatedTopData);
          //   }
      
          //   // Log the updated topData labels
          //   console.log("Updated topData labels:", topData.map((app) => app.label));
      
          //   // Launch the app
          //   console.log(`Launching app: ${item.label}`);
          //   await RNLauncherKitHelper.launchApplication(bundle);
          // } catch (error) {
          //   console.error("Error opening the app:", error);
          // }
        };
    // const openApp = async (items) => {
    //   try {
    //     // Launch the application
    //     await RNLauncherKitHelper.launchApplication(item.bundle);

    //     // Check if the app is already in the topData array
    //     const appIndex = topData.findIndex((app) => app.bundle === item.bundle);

    //     if (appIndex !== -1) {
    //       // If the app is already in the array, update the count
    //       const updatedTopData = [...topData];
    //       updatedTopData[appIndex] = {
    //         ...updatedTopData[appIndex],
    //         count: updatedTopData[appIndex].count + 1,
    //       };

    //       setTopData(updatedTopData);
    //     } else {
    //       // If the app is not in the array, add it with count 1
    //       setTopData((prevData) => [
    //         ...prevData,
    //         {
    //           label: item.label,
    //           bundle: item.bundle,
    //           image: item.image,
    //           count: 1,
    //         },
    //       ]);
    //     }

    //     await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
    //   } catch (error) {
    //     console.error("Error opening the app:", error);
    //     await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
    //   }
    // };

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
          {/* {item?.label} */}
          {shortenLabel(item?.label)}
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
      label: t("Dashboard.AddtoFavorites"),
      // label: "Add to Favorites",
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
      label: t("Dashboard.RemoveFromWotchaGotchaApp"),
      // label: "Remove From Wotcha Gotcha App",
      onPress: () => {
        if (favouriteItem) {
          const updatedData = dataApps.filter(
            (item) => item.bundle !== favouriteItem.bundle
          );
          setDataApps(updatedData);


         // Update `topData` by removing the app if it exists
         const updatedTopData = topData.filter(
          (app) => app.bundle !== favouriteItem.bundle
        );
        setTopData(updatedTopData);

           // Update `systemApps` by removing the app if it exists
        const updatedSystemApps = systemApps.filter(
          (item) => item.bundle !== favouriteItem.bundle
        );
        setSystemApps(updatedSystemApps);

           // Update `userApps` by removing the app if it exists
        const updateduserApps = userApps.filter(
          (item) => item.bundle !== favouriteItem.bundle
        );
        setUserApps(updateduserApps);

        // Optional: Remove from `favouriteData` if needed
        const updatedFavouriteData = favouriteData.filter(
          (item) => item.bundle !== favouriteItem.bundle
        );
        setFavouriteData(updatedFavouriteData);

        // Optional: Remove from `UnusedApps` if needed
        const updatedUnusedApps = unusedApps.filter(
          (item) => item.bundle !== favouriteItem.bundle
        );
        setUnusedApps(updatedUnusedApps);



          setIsCancelModalVisible(false);
          setIsLongPress(false);
        }
      },
    },
  ];

  const actionsForRemoveFavourites = [
    {
      label: t("Dashboard.RemoveFavorites"),
      // label: "Remove Favorites",
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
      label: t("Dashboard.RemoveFromWotchaGotchaApp"),
      // label: "Remove From Wotcha Gotcha App",
      onPress: () => {
        if (removeFavouriteItem) {
          const updatedData = dataApps.filter(
            (item) => item.bundle !== removeFavouriteItem.bundle
          );
          setDataApps(updatedData);

            
        // Optional: Remove from `favouriteData` if needed
          const updatedFavouriteData = favouriteData.filter(
          (item) => item.bundle !== removeFavouriteItem.bundle
            );
        setFavouriteData(updatedFavouriteData);

    // Update `systemApps` by removing the app if it exists
    const updatedSystemApps = systemApps.filter(
      (item) => item.bundle !== removeFavouriteItem.bundle
    );
    setSystemApps(updatedSystemApps);

       // Update `userApps` by removing the app if it exists
    const updateduserApps = userApps.filter(
      (item) => item.bundle !== removeFavouriteItem.bundle
    );
    setUserApps(updateduserApps);

 // Update `topData` by removing the app if it exists
 const updatedTopData = topData.filter(
  (app) => app.bundle !== removeFavouriteItem.bundle
);
setTopData(updatedTopData);

            // Optional: Remove from `UnusedApps` if needed
            const updatedUnusedApps = unusedApps.filter(
              (item) => item.bundle !== removeFavouriteItem.bundle
            );
            setUnusedApps(updatedUnusedApps);


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
            {/* {item?.label} */}
            {shortenLabel(item?.label)}
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
            {/* {item?.label} */}
            {shortenLabel(item?.label)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const dismissSnackbar = () => {
    setSnackbarVisible(false);
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
  const SportSavedApps = async () => {
    try {
      const savedApps = await AsyncStorage.getItem("savedApps_sp");
      if (savedApps) {
        // console.log('saved apps in useeffect --------->', savedApps)
        setSavedApps_sp(JSON.parse(savedApps));
      }
    } catch (error) {
      console.error("Error loading saved apps from AsyncStorage:", error);
    }
  };

  // Function to save selected apps to AsyncStorage
  const handleSave_sp = async () => {
    try {
      // Retrieve the current array of saved apps from AsyncStorage
      const currentBusinessSavedApps = await AsyncStorage.getItem(
        "savedApps_sp"
      );
      let updatedSavedApps = [];

      if (currentBusinessSavedApps) {
        updatedSavedApps = JSON.parse(currentBusinessSavedApps);
      }

      // Add the selected apps to the saved apps array
      updatedSavedApps.push(...selectedApps_sp);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem(
        "savedApps_sp",
        JSON.stringify(updatedSavedApps)
      );
      setSnackbarVisible(true);
      setModalVisible_sp(false);
      setSelectedApps_sp([])
      // Update the state
      setSavedApps_sp(updatedSavedApps);

      // console.log('saved apps in handleSave_b --------->', updatedSavedApps);
    } catch (error) {
      console.error("Error saving selected apps to AsyncStorage:", error);
    }
  };


  const EducationSavedApps = async () => {
    try {
      const savedApps = await AsyncStorage.getItem("savedApps_e");
      if (savedApps) {
        // console.log('saved apps in useeffect --------->', savedApps)
        setSavedApps_e(JSON.parse(savedApps));
      }
    } catch (error) {
      console.error("Error loading saved apps from AsyncStorage:", error);
    }
  };

  // Function to save selected apps to AsyncStorage
  const handleSave_e = async () => {
    try {
      // Retrieve the current array of saved apps from AsyncStorage
      const currentBusinessSavedApps = await AsyncStorage.getItem(
        "savedApps_e"
      );
      let updatedSavedApps = [];

      if (currentBusinessSavedApps) {
        updatedSavedApps = JSON.parse(currentBusinessSavedApps);
      }

      // Add the selected apps to the saved apps array
      updatedSavedApps.push(...selectedApps_e);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem(
        "savedApps_e",
        JSON.stringify(updatedSavedApps)
      );
      setSnackbarVisible(true);
      setModalVisible_e(false);
      setSelectedApps_e([])
      // Update the state
      setSavedApps_e(updatedSavedApps);

      // console.log('saved apps in handleSave_b --------->', updatedSavedApps);
    } catch (error) {
      console.error("Error saving selected apps to AsyncStorage:", error);
    }
  };

  // const handleSave_sp = () => {
  //   setSavedApps_sp(selectedApps_sp);
  //   setSnackbarVisible(true);
  //   setModalVisible_sp(false);
  // };
  // const handleSave_e = () => {
  //   setSavedApps_e(selectedApps_e);
  //   setSnackbarVisible(true);
  //   setModalVisible_e(false);
  // };
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
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible_d(true)}>
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
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible_fd(true)}>
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
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible_sm(true)}>
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
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible_mw(true)}>
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
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible_g(true)}>
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
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible_em(true)}>
            <Add />
          </TouchableOpacity>
        </View>
      ),
    },


    // Add other categories similarly
  };
  return (
    <View style={styles.container}>

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

       {DotLoading ? 

    //    <DotLoader /> 
    <View style={styles.centered}>
    <ActivityIndicator size="large" color="#FACA4E" />
    <Text style={styles.noDataText}>Your Data is Loading</Text>
  </View>

       :
       <>
   
     
      <ScrollView
        contentContainerStyle={styles.dataContainer}
        showsVerticalScrollIndicator={false}
      >
        

          <BannerCarousel
          isLoading={isLoading}
          adsData={adsData}
          noDataMessage={t('Dashboard.NoTopBanner')}
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
            <Text style={{color:'gray'}}>{t('NoDataAvailable')}</Text>
          </View>
        }

{categoryActive ? (
  Platform.OS !== "ios" && (
    <>
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
            // data={topData}
            data={[...topData].reverse()} 
            numColumns={3}
            renderItem={({ item }) => renderAvailableApps(item)}
            keyExtractor={(item, index) => `${item.bundle}-${index}`}
          />
        )}
      </View>

      {/* Phone-Based Apps Section */}
      <View style={styles.sectionMassContainer}>
        <Text style={styles.sectionTitle}>
          {t("Dashboard.PhoneBasedApps")}
        </Text>
        <FlatList
          data={systemApps.slice(0, Math.ceil(systemApps.length / 2))}
          // data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => renderApps(item)}
          contentContainerStyle={styles.flatListContainer}
        />
        <FlatList
          data={systemApps.slice(Math.ceil(systemApps.length / 2))}
          // data={dataApps.slice(Math.ceil(dataApps.length / 2))}
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

  {/* Phone-Based Apps Section */}
      <View style={styles.sectionMassContainer}>
        <Text style={styles.sectionTitle}>
          {t("AllOtherApps")}
        </Text>
        <FlatList
          data={userApps.slice(0, Math.ceil(userApps.length / 2))}
          // data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => renderApps(item)}
          contentContainerStyle={styles.flatListContainer}
        />
        <FlatList
          data={userApps.slice(Math.ceil(userApps.length / 2))}
          // data={dataApps.slice(Math.ceil(dataApps.length / 2))}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => renderApps(item)}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>

      {/* Unused Apps Section */}
      <View style={styles.unusedAppsContainer}>
        <Text style={styles.sectionTitle}>
          {t("Dashboard.UnusedApps")}
        </Text>
        <FlatList
          data={unusedApps.slice(0, Math.ceil(unusedApps.length / 2))}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => openunusedApp(item)}
          contentContainerStyle={styles.flatListContainer}
        />
        <FlatList
          data={unusedApps.slice(Math.ceil(unusedApps.length / 2))}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => openunusedApp(item)}
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

<BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t("Dashboard.NoBanner")}
          onBannerPress={handleBannerPress}
        />

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
            <Sport name="sports-handball" size={28} color="#FACA4E"/>
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
  renderItem={({ item }) => renderAppsFavItem({item, selectedApps: selectedApps_sp, setSelectedApps: setSelectedApps_sp})}
  handleSave={handleSave_sp}
/>

<CustomMassAppCateModal
  visible={modalVisible_e}
  onClose={() => setModalVisible_e(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_e(item)}
  renderItem={({ item }) => renderAppsFavItem({item, selectedApps: selectedApps_e, setSelectedApps: setSelectedApps_e})}
  handleSave={handleSave_e}
/>

<CustomMassAppCateModal
  visible={modalVisible_d}
  onClose={() => setModalVisible_d(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_d(item)}
  renderItem={({ item }) => renderAppsFavItem({item, selectedApps:  selectedApps_d, setSelectedApps: setSelectedApps_d})}
  handleSave={handleSave_d}
/>

<CustomMassAppCateModal
  visible={modalVisible_fd}
  onClose={() => setModalVisible_fd(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_fd(item)}
  renderItem={({ item }) => renderAppsFavItem({item, selectedApps:  selectedApps_fd, setSelectedApps: setSelectedApps_fd})}
  handleSave={handleSave_fd}
/>

<CustomMassAppCateModal
  visible={modalVisible_sm}
  onClose={() => setModalVisible_sm(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_sm(item)}
  renderItem={({ item }) => renderAppsFavItem({item, selectedApps: selectedApps_sm, setSelectedApps: setSelectedApps_sm})}
  handleSave={handleSave_sm}
/>

<CustomMassAppCateModal
  visible={modalVisible_mw}
  onClose={() => setModalVisible_mw(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_mw(item)}
  renderItem={({ item }) => renderAppsFavItem({item, selectedApps: selectedApps_mw, setSelectedApps: setSelectedApps_mw})}
  handleSave={handleSave_mw}
/>

<CustomMassAppCateModal
  visible={modalVisible_g}
  onClose={() => setModalVisible_g(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_g(item)}
  renderItem={({ item }) => renderAppsFavItem({item, selectedApps: selectedApps_g, setSelectedApps: setSelectedApps_g})}
  handleSave={handleSave_g}
/>

<CustomMassAppCateModal
  visible={modalVisible_em}
  onClose={() => setModalVisible_em(false)}
  title={t("Dashboard.YourApps")}
  data={dataApps}
  // renderItem={({ item }) => renderAppsFav_em(item)}
  renderItem={({ item }) => renderAppsFavItem({item, selectedApps: selectedApps_em, setSelectedApps: setSelectedApps_em})}

  handleSave={handleSave_em}
/>
<CustomSnackbar
        message={"Success"}
        messageDescription={t("Dashboard.Appsaddedincategory")}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
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
    fontSize: hp(1.8),
    fontFamily: "Inter-SemiBold",
  },
  container: {
    flex: 1,
    paddingTop:Platform.OS ==="ios" ? "20%" :0
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
    marginBottom: hp(2.4),
    // backgroundColor:'green'
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
    marginTop: hp(.8),
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
    marginBottom:hp(4)
  },
  favoritesText: {
    fontWeight: "bold",
    fontSize: hp(2.1),
    justifyContent: "center",
    color: "gray",
  },
  unusedAppsContainer: {
    marginTop: hp(1),
    marginBottom: hp(1),
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
    top: -2, // Adjust this value to control the vertical alignment.
    right: 5, // Adjust this value to control the horizontal alignment.
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

export default Dashboard;











// import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { InstalledApps } from 'react-native-launcher-kit';
// import DeviceInfo from 'react-native-device-info';
// import { DeviceInfo } from 'react-native-device-info';
// const Dashboard = () => {
//   const [systemApps, setSystemApps] = useState([]);
//   const [userApps, setUserApps] = useState([]);

//   const categorizeApps = async () => {
//     try {
//       // Fetch manufacturer name
//       const manufacturer = await DeviceInfo.getManufacturer();
//       console.log('Manufacturer------:', manufacturer);
  
//       // Fetch all installed apps
//       const allApps = await InstalledApps.getApps();
//       const packageDataArray = allApps.map((app) => ({
//         label: app.label,
//         bundle: app.packageName,
//         image: app.icon,
//       }));
  
//       // Normalize manufacturer name (to lowercase, without spaces) to match prefixes
//       const normalizedManufacturer = manufacturer.toLowerCase().replace(/\s/g, '');
//       console.log('normalizedManufacturer------??:', normalizedManufacturer);
  
//       // Dynamically filter system and user apps
//       const systemAppsList = [];
//       const userAppsList = [];
  
//       packageDataArray.forEach((app) => {
//         // Check for system apps based on manufacturer, android, and google prefixes
//         if (
//           app.bundle.toLowerCase().startsWith(`com.${normalizedManufacturer}`) || // Manufacturer-specific apps
//           app.bundle.toLowerCase().startsWith('com.android') || // Android system apps
//           app.bundle.toLowerCase().startsWith('com.google') // Google apps
//         ) {
//           systemAppsList.push(app);
//         } else {
//           userAppsList.push(app);
//         }
//       });
  
//       setSystemApps(systemAppsList);
//       setUserApps(userAppsList);
//     } catch (error) {
//       console.error('Error categorizing apps:', error);
//     }
//   };
  
//   // const categorizeApps = async () => {
//   //   try {
//   //     const allApps = await InstalledApps.getApps();
//   //     const packageDataArray = allApps.map((app) => ({
//   //       label: app.label,
//   //       bundle: app.packageName,
//   //       image: app.icon,
//   //     }));

//   //     const systemAppsList = [];
//   //     const userAppsList = [];

//   //     packageDataArray.forEach((app) => {
//   //       // Categorize based on packageName prefix
//   //       if (app.bundle.startsWith('com.android') || app.bundle.startsWith('com.google')) {
//   //         systemAppsList.push(app);
//   //       } else {
//   //         userAppsList.push(app);
//   //       }
//   //     });

//   //     setSystemApps(systemAppsList);
//   //     setUserApps(userAppsList);
//   //   } catch (error) {
//   //     console.error('Error categorizing apps:', error);
//   //   }
//   // };

//   useEffect(() => {
//     categorizeApps();
//   }, []);
//   // Render function for apps
//   const renderAppItem = ({ item }) => (
//     <View style={styles.appItem}>
//           <TouchableOpacity
    
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
//               fontSize: 14,
//               fontWeight: "bold",
//             }}
//             ellipsizeMode="tail"
//             numberOfLines={1}
//           >
//             {item?.label}
//           </Text>
//         </View>
//         </TouchableOpacity>
//       {/* <Text style={styles.appName}>{item.name}</Text> */}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>System Apps</Text>
//       <FlatList
//   data={systemApps}
//   renderItem={renderAppItem}
//   keyExtractor={(item, index) => `${item.packageName}-${index}`} // Ensure unique keys
//   style={styles.list}
// />
//       <Text style={styles.header}>User-Installed Apps</Text>
//       <FlatList
//   data={userApps}
//   renderItem={renderAppItem}
//   keyExtractor={(item, index) => `${item.packageName}-${index}`} // Ensure unique keys
//   style={styles.list}
// />
//     </View>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     marginTop: 16,
//     color: '#333',
//   },
//   list: {
//     marginBottom: 16,
//   },
//   appItem: {
//     padding: 12,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   appName: {
//     fontSize: 16,
//     color: '#555',
//   },
// });
