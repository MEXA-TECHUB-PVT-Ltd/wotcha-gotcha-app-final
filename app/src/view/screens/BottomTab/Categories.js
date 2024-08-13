import {
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
  Alert,
  Dimensions,
  Linking
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Fontiso from "react-native-vector-icons/Fontisto";
import Headers from "../../../assets/Custom/Headers";
import { appImages } from "../../../assets/utilities";
import { DraxProvider, DraxView } from "react-native-drax";
import { BlurView } from "@react-native-community/blur";
import Entypo from "react-native-vector-icons/Entypo";
import CategoryInactive from "../../../assets/svg/CategoryInactive";
import { useNavigation } from '@react-navigation/native';
// hover apps
import Carousel from 'react-native-snap-carousel';
import { InstalledApps, RNLauncherKitHelper } from "react-native-launcher-kit";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Add from "../../../assets/svg/AddMainScreen.svg";
import { useIsFocused } from "@react-navigation/native";
import CustomModal from "../../../assets/Custom/CustomModal";
import { base_url } from "../../../../../baseUrl";
import CategoryActive from "../../../assets/svg/CategoryActive.svg";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
import HeaderImageSlider from "../../../assets/Custom/HeaderImageSlider";
import SwiperFlatList from "react-native-swiper-flatlist";
import { fetchBannerConfig, fetchBannerInActive } from '../../../../../API';
import BannerCarousel from "../../../assets/Custom/BannerCarousel";
//------------------------\\

const screenHeight = Dimensions.get("window").height;
const itemHeight = 450;

const { width: viewportWidth } = Dimensions.get('window');

const sliderWidth = viewportWidth * 0.9;


export default function Categories(identifier) {
  // const identifierName = identifier.route.name;
  const navigation = useNavigation();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [dataApps, setData] = useState([]);
  const [isLongPress, setIsLongPress] = useState(false);
  const [categoryActive, setcategoryActive] = useState(true);
  const [banner, setBanners] = useState([]);

  const [authToken, setAuthToken] = useState("");

  const [unUsedLocal, setUnUsedLocal] = useState([]);

  const [unusedApps, setUnusedApps] = useState([]);

  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const [isCancelRemoveModalVisible, setIsCancelRemoveModalVisible] =
    useState(false);
  const [isSelectedActive, setIsSelectedActive] = useState(true);
  const [isLongPressRemove, setIsLongPressRemove] = useState(false);
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

  const [favouriteItem, setFavouriteItem] = useState(null);
  const [removeFavouriteItem, setRemoveFavouriteItem] = useState(null);

  const [favouriteData, setFavouriteData] = useState([]);

  const isFocused = useIsFocused();

  const [topData, setTopData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [modalDeleteApps, setModalDeleteApps] = useState(false);

  const [modalDeleteFavouriteApps, setModalDeleteFavouriteApps] =
    useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const [flatListKey, setFlatListKey] = useState(Date.now()); // Add a key for the FlatList
  const [Business, setBusiness] = useState(false);
  const [Sports, setSport] = useState(false);
  const [Education, seteducation] = useState(false);
  const [ecommerance, setecommerance] = useState(false);
  const [dating, setdating] = useState(false);
  const [food, setfood] = useState(false);
  const [social, setsocial] = useState(false);
  const [medical, setmedical] = useState(false);
  const [grocery, setgrocery] = useState(false);
  const [Employment, setemployment] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [adsData, setAdsData] = useState([]);
  // const [adsinActiveData, setAdsInActiveData] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [adsInActiveData, setAdsInActiveData] = useState([]);
  const RegionArea = [
    "E-commerce",
    "Business",
    "Sports",
    "Education",
    "Dating",
    "Food Delivery",
    "Social Media",
    "Medical Wellness",
    "Grocery",
    "Employment",
  ];
  const containerHeight = Math.min(screenHeight * 0.8, itemHeight);
  //-------------------------------------------------------

  useEffect(() => {
    // Check if it's the initial load (selectedItemId is not set yet)
    // Fetch data based on the updated selectedItemId
    fetchVideos();
  }, [isFocused]);

  const fetchVideos = async () => {
    // Simulate loading
    setIsLoading(true);
    getUserID();
    // Once all data is fetched, set loading to false
    setIsLoading(false);
  };

  const getUserID = async () => {
    // console.log("AT User Id");
    try {
      const result = await AsyncStorage.getItem("authToken ");
      if (result !== null) {
        setAuthToken(result);
        // await fetchBanners(result);
        console.log("user id retrieved:", result);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  useEffect(() => {
    if (authToken){
      fetchBanners();
    }
    }, [authToken]);
  
  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const [activeBannersResult, inactiveBannersResult] = await Promise.all([
        fetchBannerConfig(authToken, base_url),
        fetchBannerInActive(authToken, base_url)
      ]);

      setAdsData(activeBannersResult.AllBanners || []);
      setAdsInActiveData(inactiveBannersResult || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBannerPress = (link) => {
    Linking.openURL(link);
  };

    // const fetchBannerConfig = async () => {
    //   const token = authToken;
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch(
    //       base_url + "banner/getAllActiveBanners?topBanner=true",
    //       // base_url + "banner/getAllBannersByUser/97",
    //       {
    //         method: "GET",
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
  
    //     const result = await response.json();
    //     // console.log("AllBanners---", result.AllBanners);
    //     setAdsData(result.AllBanners);
    //   } catch (error) {
    //     console.error("Error AllBanners:", error);
    //   }
    //   setIsLoading(false); 
    // };
    // const fetchBannerInActive = async () => {
    //   const token = authToken;
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch(
    //       base_url + "banner/getAllActiveBanners?topBanner=false",
    //       // base_url + "banner/getAllBannersByUser/97",
    //       {
    //         method: "GET",
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
  
    //     const result = await response.json();
    //     // setAdsInActiveData(result.AllBanners);
    //     const updatedBanners = result.AllBanners.map(banner => {
    //       if (banner.image.startsWith('/fileUpload')) {
    //         banner.image = `https://watch-gotcha-be.mtechub.com${banner.image}`;
    //       }
    //       return banner;
    //     });
    //     // console.log("AllBanners AdsInActiveData---", updatedBanners);
    //     setAdsInActiveData(updatedBanners);
    //   } catch (error) {
    //     console.error("Error AllBanners AdsInActiveData---", error);
    //   }
    //   setIsLoading(false);
    // };

  // const fetchBanners = async (tokens) => {
  //   try {
  //     const token = tokens; // Replace 'YOUR_BEARER_TOKEN' with your actual token
  //     const response = await fetch(
  //       base_url + "banner/getAllBannersByStatus?status=active&page=1&limit=2",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     // console.log("API Response:", data?.AllBanners[0]);
  //     setBanners(data?.AllBanners[0]);

  //     // Handle the response data (e.g., update state)
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     // Handle errors
  //   }
  // };

  //-------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map((app) => app.label);
      const packageImages = installedApps.map((app) => app.icon);
      const packageBundle = installedApps.map((app) => app.packageName);
      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        bundle: packageBundle[index],
        image: packageImages[index],
      }));

      setData(packageDataArray);
      setIsLoading(false);

      /* if(packageDataArray.length>0){
        saveTofavourites()

      }else{
        console.log("LENGTH IS NULL")
      } */
    };

    fetchData();

    {
      /* <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                    No Favourite Apps
                  </Text> */
    }
  }, []);
  useEffect(() => {
    if (isFocused) {
      // Load favouriteData from AsyncStorage when the component mounts
      const loadFavouriteData = async () => {
        try {
          const storedData = await AsyncStorage.getItem("favouriteData");
          // console.log(
          //   "IS FOCUSED OF FAVOURITE DATA IS CALLED",
          //   typeof storedData
          // );
          // console.log(
          //   "IS FOCUSED OF FAVOURITE DATA IS CALLED LENGTH",
          //   storedData.length
          // );
          // it is conisdering empty array as 2 length thats why i a have added it
          if (storedData.length === 2) {
            // console.log("FAVOURITE IS NULLl");
            const initialFavouriteData = dataApps.slice(0, 4);
            await AsyncStorage.setItem(
              "favouriteData",
              JSON.stringify(initialFavouriteData)
            );
            setFavouriteData(initialFavouriteData);
          } else {
            const parsedData = JSON.parse(storedData);
            setFavouriteData(parsedData);
            console.log("FAVOURITE IS NOT NULL");
          }
        } catch (error) {
          console.error(
            "Error loading favourite data from AsyncStorage:",
            error
          );
        }
      };

      loadFavouriteData();
    }
  }, [isFocused]); // Run this effect only once when the component mounts

  useEffect(() => {
    if (isFocused) {
      // Save favouriteData to AsyncStorage whenever it changes
      const saveFavouriteData = async () => {
        // console.log("FAVOURITE DATA IS CALLED");
        try {
          await AsyncStorage.setItem(
            "favouriteData",
            JSON.stringify(favouriteData)
          );
        } catch (error) {
          console.error("Error saving favourite data to AsyncStorage:", error);
        }
      };
      saveFavouriteData();
      // AsyncStorage.removeItem('topData');
    }
  }, [favouriteData, isFocused]); // Run this effect whenever favouriteData changes

  //------------------------------------\\

  //-------------------Use Effect Top Apps---------\\

  useEffect(() => {
    if (isFocused) {
      // Load topData from AsyncStorage when the component mounts
      const loadTopData = async () => {
        //await AsyncStorage.removeItem('topData');
        try {
          const storedData = await AsyncStorage.getItem("topData");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setTopData(parsedData);
          }
        } catch (error) {
          console.error("Error loading top data from AsyncStorage:", error);
        }
      };

      loadTopData();
    }
  }, [isFocused]); // Run this effect only once when the component mounts

  useEffect(() => {
    if (isFocused) {
      // Save topData to AsyncStorage whenever it changes
      const saveTopData = async () => {
        try {
          await AsyncStorage.setItem("topData", JSON.stringify(topData));
        } catch (error) {
          console.error("Error saving top data to AsyncStorage:", error);
        }
      };

      saveTopData();
    }
  }, [topData]); // Run this effect whenever topData changes

  //---------------------------------------------\\

  //----------------NEW FUNCTION ------------------\\

  useEffect(() => {
    const topSixItems = dataApps.slice(0, 6);
    // console.log("APPS CALLED");
    // Save topSixItems directly to AsyncStorage whenever it changes
    const saveTopData = async () => {
      try {
        const updatedTopData = topSixItems.map((item) => ({
          ...item,
          count: 2, // Set count to 2 for each item
        }));
        await AsyncStorage.setItem("topData", JSON.stringify(updatedTopData));
        setTopData(updatedTopData); // Update the state with updatedTopData
      } catch (error) {
        console.error("Error saving top data to AsyncStorage:", error);
      }
    };

    saveTopData();
  }, [dataApps]); // Run this effect whenever dataApps changes

  //-----------------------------------------------\\

  //------------------Use Effect Filtered Apps----------------\\

  useEffect(() => {
    const fetchUsedData = async () => {
      const lastUsageDate = new Date().toISOString();

      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map((app) => app.label);
      const packageImages = installedApps.map((app) => app.icon);
      const packageBundle = installedApps.map((app) => app.packageName);
      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        bundle: packageBundle[index],
        image: packageImages[index],
        date: lastUsageDate,
      }));

      setUnusedApps(packageDataArray);

      await AsyncStorage.setItem(
        "comparisonDate",
        JSON.stringify(packageDataArray)
      );
      setIsLoading(false);
    };

    fetchUsedData();
  }, []);
  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  // const filterUnusedApps = async (apps) => {
  //   const currentDate = new Date();
  //   const threeWeeksAgo = new Date(currentDate - 21 * 24 * 60 * 60 * 1000); // Three weeks ago

  //   const unusedAppsData = [];

  //   for (const app of apps) {
  //     const storedAppInfo = await AsyncStorage.getItem(`appInfo_${app}`);
  //     let appInfo;

  //     if (storedAppInfo) {
  //       appInfo = JSON.parse(storedAppInfo);
  //       //console.log("APp Info", appInfo)
  //     } else {
  //       // Store app information for the first time

  //       appInfo = {
  //         label: app, // Assuming app is the package name if not change it to the correct property
  //         bundle: app,
  //         image: app.icon, // You might want to fetch and store the icon as well
  //       };

  //       await AsyncStorage.setItem(`appInfo_${app}`, JSON.stringify(appInfo));
  //     }

  //     const lastUsageDate = await AsyncStorage.getItem(`lastUsageDate_${app}`);

  //     if (!lastUsageDate || new Date(lastUsageDate) < threeWeeksAgo) {
  //       unusedAppsData.push({
  //         label: appInfo.label,
  //         bundle: appInfo.bundle,
  //         image: appInfo.image,
  //       });
  //     }
  //   }

  //   //console.log("Unused Apps", unusedAppsData);

  //   return unusedAppsData;
  // };
  const filterUnusedApps = async (apps) => {
    const currentDate = new Date();
    const threeWeeksAgo = new Date(currentDate - 21 * 24 * 60 * 60 * 1000); // Three weeks ago

    const unusedAppsData = [];

    for (const app of apps) {
      const storedAppInfo = await AsyncStorage.getItem(`appInfo_${app.label}`);
      let appInfo;

      if (storedAppInfo) {
        appInfo = JSON.parse(storedAppInfo);
      } else {
        // Store app information for the first time
        appInfo = {
          label: app.label,
          bundle: app.bundle,
          image: app.image,
        };

        await AsyncStorage.setItem(`appInfo_${app.label}`, JSON.stringify(appInfo));
      }

      const lastUsageDate = await AsyncStorage.getItem(`lastUsageDate_${app.label}`);

      if (!lastUsageDate || new Date(lastUsageDate) < threeWeeksAgo) {
        unusedAppsData.push(appInfo);
      }
    }

    return unusedAppsData;
  };

  useEffect(() => {
    const checkUnusedApps = async () => {
      const installedApps = InstalledApps.getSortedApps();
      const filteredApps = await filterUnusedApps(installedApps);
      setUnusedApps(filteredApps);
    };

    checkUnusedApps();
  }, []);

  const openunusedApp = async (item) => {
    try {
      await RNLauncherKitHelper.launchApplication(item.bundle);
      const now = new Date().toISOString();
      await AsyncStorage.setItem(`lastUsageDate_${item.label}`, now);

      // Remove app from unused apps list
      const updatedUnusedApps = unusedApps.filter(app => app.label !== item.label);
      setUnusedApps(updatedUnusedApps);
    } catch (error) {
      console.error("Error opening the app:", error);
    }
  };

  // const renderAppItem = ({ item }) => (
  //   <TouchableOpacity onPress={() => openApp(item)} style={styles.appItem}>
  //     <Image style={styles.appIcon} source={{ uri: `data:image/png;base64,${item.image}` }} />
  //     <Text style={styles.appLabel}>{item.label}</Text>
  //   </TouchableOpacity>
  // );

  //------------------------------------------------------------\\

  const itemsPerPage = 10; // Change this to set the number of items per screen
  const screens = Math.ceil(dataApps.length / itemsPerPage);

  const screenFavourite = Math.ceil(favouriteData.length / itemsPerPage);

  /* const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
 */

  const [availableApps, setAvailableApps] = useState([
    { id: 11, title: "SnapChat", image: appImages.snapchat },
    { id: 21, title: "Gmail", image: appImages.gmail },
    { id: 31, title: "Pinterest", image: appImages.pinterest },
    { id: 41, title: "LinkedIn", image: appImages.linkedIn },
    { id: 51, title: "Calendar", image: appImages.calendar },
    { id: 61, title: "SnapChat", image: appImages.snapchat },
  ]);

  const [favouriteApps, setFavouriteApps] = useState([
    { id: 1, title: "SnapChat", image: appImages.snapchat },
    { id: 2, title: "Gmail", image: appImages.gmail },
    { id: 3, title: "Pinterest", image: appImages.pinterest },
    { id: 4, title: "LinkedIn", image: appImages.linkedIn },
    { id: 5, title: "Calendar", image: appImages.calendar },
    { id: 6, title: "SnapChat", image: appImages.snapchat },
    { id: 7, title: "SnapChat", image: appImages.snapchat },
    { id: 8, title: "Gmail", image: appImages.gmail },
    { id: 9, title: "Pinterest", image: appImages.pinterest },
    { id: 10, title: "LinkedIn", image: appImages.linkedIn },
  ]);

  /*  const availableApps = [
    
  ]; */
  const bannerAds = [
    {
      id: 1,
      image: require("../../../assets/images/BannerAds.png"),
    },
    {
      id: 2,
      image: require("../../../assets/images/BannerAds.png"),
    },
    {
      id: 3,
      image: require("../../../assets/images/BannerAds.png"),
    },
    {
      id: 4,
      image: require("../../../assets/images/BannerAds.png"),
    },
  ];

  const searches = [
    { id: 1, title: "Games" },
    { id: 2, title: "Business" },
    { id: 3, title: "Education" },
    { id: 4, title: "Games" },
    { id: 5, title: "Business" },
    { id: 6, title: "Education" },
    { id: 7, title: "Games" },
    { id: 8, title: "Business" },
    { id: 9, title: "Education" },
    { id: 10, title: "Games" },
  ];

  /* const favouriteApps = [
    
  ]; */

  const onDragEnd = (data, targetList, item) => {
    console.log("data list", data);
    console.log("target list item", item);

    // Handle the item drop here
    // Update the target list based on the dragged item data
    // You might want to implement your own logic here
    const updatedList = [...targetList, item];

    // Update the state and use the callback to log the updated state
    setFavouriteApps(updatedList, () => {
      console.log("On drag ends FavouriteList", favouriteApps);
    });

    setFlatListKey(Date.now()); // Update the key to force re-render
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

          //----------------------\\
          // Your additional logic here
          //----------------------\\
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

          //----------------------\\
          // Your additional logic here
          //----------------------\\
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
  const renderunUsedApps = (item) => {
    //console.log('item at first', item);
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

    //       //----------------------\\
    //       // Your additional logic here
    //       //----------------------\\
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

    //       //----------------------\\
    //       // Your additional logic here
    //       //----------------------\\
    //     }
    //   } catch (error) {
    //     console.error("Error opening the app:", error);
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
        onPress={() => openunusedApp(item)}
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

  // Load saved apps from AsyncStorage when the component mounts
 
    const loadSavedApps = async () => {
      try {
        const savedApps = await AsyncStorage.getItem('savedApps');
        if (savedApps) {
          // console.log('saved apps in useeffect --------->', savedApps)
          setSavedApps(JSON.parse(savedApps));
        }
      } catch (error) {
        console.error('Error loading saved apps from AsyncStorage:', error);
      }
    };

   // Function to save selected apps to AsyncStorage
   const handleSave = async () => {
    try {
      // Retrieve the current array of saved apps from AsyncStorage
      const currentSavedApps = await AsyncStorage.getItem('savedApps');
      let updatedSavedApps = [];

      if (currentSavedApps) {
        updatedSavedApps = JSON.parse(currentSavedApps);
      }

      // Add the selected apps to the saved apps array
      updatedSavedApps.push(...selectedApps);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem('savedApps', JSON.stringify(updatedSavedApps));
      setSnackbarVisible(true);
      setSelectedApps([]); // Clear the selected apps
      setModalVisible(false);
      // Update the state
      setSavedApps(updatedSavedApps);

      console.log('saved apps in handleSave --------->', updatedSavedApps);
    } catch (error) {
      console.error('Error saving selected apps to AsyncStorage:', error);
    }
  };


  // Business Load saved apps from AsyncStorage when the component mounts
  // useEffect(() => {
  //   if (isFocused) {
  //     BusinessSavedApps()
  //   }
  // }, [isFocused]);

    const BusinessSavedApps = async () => {
      try {
        const savedApps = await AsyncStorage.getItem('savedApps_b');
        if (savedApps) {
          // console.log('saved apps in useeffect --------->', savedApps)
          setSavedApps_b(JSON.parse(savedApps));
        }
      } catch (error) {
        console.error('Error loading saved apps from AsyncStorage:', error);
      }
    };

   // Function to save selected apps to AsyncStorage
   const handleSave_b = async () => {
    try {
      // Retrieve the current array of saved apps from AsyncStorage
      const currentBusinessSavedApps = await AsyncStorage.getItem('savedApps_b');
      let updatedSavedApps = [];

      if (currentBusinessSavedApps) {
        updatedSavedApps = JSON.parse(currentBusinessSavedApps);
      }
      // Add the selected apps to the saved apps array
      updatedSavedApps.push(...selectedApps_b);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem('savedApps_b', JSON.stringify(updatedSavedApps));
      setSnackbarVisible(true);
      setModalVisible_b(false);
      setSelectedApps_b([])
      // Update the state
      setSavedApps_b(updatedSavedApps);

      // console.log('saved apps in handleSave_b --------->', updatedSavedApps);
    } catch (error) {
      console.error('Error saving selected apps to AsyncStorage:', error);
    }
  };

  // console.log('total saved --------->', savedApps)
  // const handleSave = () => {
  //   setSavedApps(selectedApps);
  //   setSnackbarVisible(true);
  //   setModalVisible(false);

  //   // Alert.alert('Selected Apps', selectedApps.join(', '));
  // };
  // const handleSave_b = () => {
  //   setSavedApps_b(selectedApps_b);
  //   setSnackbarVisible(true);
  //   setModalVisible_b(false);
  // };
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
  const handleAppPress = (item) => {
    setSelectedApps((selected) => {
      if (selected.includes(item)) {
        return selected.filter((app) => app !== item);
      } else {
        return [...selected, item];
      }
    });
  };

  //   // Save selected apps to AsyncStorage whenever selectedApps changes
  //   useEffect(() => {
  //     const saveSelectedApps = async () => {
  //       try {
  //         await AsyncStorage.setItem('selectedApps', JSON.stringify(selectedApps));
  //       } catch (error) {
  //         console.error('Error saving selected apps to AsyncStorage:', error);
  //       }
  //     };
  
  //     saveSelectedApps();
  //   }, [selectedApps]);

  //     // Load selected apps from AsyncStorage when the component mounts
  // useEffect(() => {
  //   const loadSelectedApps = async () => {
  //     try {
  //       const savedApps = await AsyncStorage.getItem('selectedApps');
  //       if (savedApps) {
  //         setSelectedApps(JSON.parse(savedApps));
  //       }
  //     } catch (error) {
  //       console.error('Error loading selected apps from AsyncStorage:', error);
  //     }
  //   };

  //   if (isFocused) {
  //     loadSelectedApps();
  //   }
  // }, [isFocused]);

  // console.log('saved apps --------->', selectedApps)
  // //////////
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
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
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
  const renderAppsFav_b = (item) => {
    const isSelected = selectedApps_b.includes(item);

    const handleAppPress = () => {
      setSelectedApps_b((selected) => {
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
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
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
  const renderAppsFav_sp = (item) => {
    const isSelected = selectedApps_sp.includes(item);

    const handleAppPress = () => {
      setSelectedApps_sp((selected) => {
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
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
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
  const renderAppsFav_e = (item) => {
    const isSelected = selectedApps_e.includes(item);

    const handleAppPress = () => {
      setSelectedApps_e((selected) => {
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
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
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
  const renderAppsFav_d = (item) => {
    const isSelected = selectedApps_d.includes(item);

    const handleAppPress = () => {
      setSelectedApps_d((selected) => {
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
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
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
  const renderAppsFav_fd = (item) => {
    const isSelected = selectedApps_fd.includes(item);

    const handleAppPress = () => {
      setSelectedApps_fd((selected) => {
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
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
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
  const renderAppsFav_sm = (item) => {
    const isSelected = selectedApps_sm.includes(item);

    const handleAppPress = () => {
      setSelectedApps_sm((selected) => {
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
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
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
  const renderAppsFav_mw = (item) => {
    const isSelected = selectedApps_mw.includes(item);

    const handleAppPress = () => {
      setSelectedApps_mw((selected) => {
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
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
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
  const renderAppsFav_g = (item) => {
    const isSelected = selectedApps_g.includes(item);

    const handleAppPress = () => {
      setSelectedApps_g((selected) => {
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
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
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
  const renderAppsFav_em = (item) => {
    const isSelected = selectedApps_em.includes(item);

    const handleAppPress = () => {
      setSelectedApps_em((selected) => {
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
        style={[styles.items, isSelected && styles.selectedItem]}
      >
        {isSelected && (
          <Ionicons name="checkmark-circle" size={15} color="green" />
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
        //onPress={() => openApp(item?.bundle)}
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

  const renderFavouriteApps = (item) => {
    console.log("Items", item);
    return (
      <View
        onDragEnd={({ dragged: data }) => onDragEnd(data, favouriteApps)}
        style={{
          height: hp(8),
          width: wp(15),
          margin: 2.8,
        }}
      >
        <Image source={item?.image} />
      </View>
      /* 
draggingStyle={{opacity: 0.5}}
dragReleasedStyle={{opacity: 1}}

onDragEnd={({dragged: data}) => onDragEnd(data, favouriteApps)} */
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
    } else {
      // Return null or an empty view if count is not equal to 2
      return (
        <View style={{ height: hp(8), padding: 5 }}>
          <Image
            style={{ width: wp(12), height: wp(12) }}
            resizeMode="contain"
            source={appImages.logoTransparent}
          />
        </View>
      );
    }

    /* draggingStyle={{opacity: 0.5}}
    dragReleasedStyle={{opacity: 1}}
    onDragStart={() => console.log('Drag started for item:', item)}
    onDragEnd={({dragged: data}) => onDragEnd(data, favouriteApps, item)} */
  };

  const onDragOverFlatList = (
    data,
    viewMetadata,
    sourceViewMetadata,
    touchPosition
  ) => {
    // Check if the dragged item is over the FlatList
    // You can use viewMetadata, sourceViewMetadata, or touchPosition to determine the position
    // and decide whether it's over the FlatList or not
    const isOverFlatList = true; // Implement your logic here

    if (isOverFlatList) {
      // Trigger the logic to update the state or perform other actions
      console.log("Dragged item is over the FlatList", data);
    }
  };
  const handleItemPress = (category) => {
    setSelectedItemId(category);
    setIsSelectedActive(false);///
    setcategoryActive(false);////ye old hai jis ko comment kiya tha
    setSelectedCategory(category);
    setecommerance(category === "E-commerce");
    setSport(category === "Sports");
  };

  const renderSearches = (item) => {
    const isSelected = selectedItemId === item;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          // Pass the item data when pressed
          handleItemPress(item);
          if(item === 'E-commerce')
            {
              console.log("E----AYA:");
              loadSavedApps() // Assuming handleItemPress is a function to handle item press
            }
            else if (item === 'Business')
              {
                console.log("Business----AYA:");
                BusinessSavedApps() 
              }
          console.log("Selected item:", item);
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

  const closeRequestModal = () => {
    setIsLongPress(false);
    setIsCancelModalVisible(false);
  };

  const closeRequestRemoveModal = () => {
    setIsLongPressRemove(false);
    setIsCancelRemoveModalVisible(false);
  };

  const handleCancel = () => {
    setModalDeleteApps(false);
  };

  const handleConfirm = () => {
    if (removeFavouriteItem) {
      const updatedInstallData = dataApps.filter(
        (item) => item.bundle !== removeFavouriteItem.bundle
      );
      setModalDeleteApps(false);
      setData(updatedInstallData);
    } else {
      setModalDeleteApps(false);
      console.log("CANCEL");
    }
  };

  const handleCancelFavourite = () => {
    setModalDeleteFavouriteApps(false);
  };
  const press_category = () => {
    setIsSelectedActive(!isSelectedActive);
    setSelectedItemId(null); // Deactivate all items when category is pressed
    setSelectedCategory('');
    setecommerance(false);
    setSport(false);
    setcategoryActive(true);//ye old hai jis ko comment kiya tha
  };

  const handleConfirmFavourite = () => {
    if (removeFavouriteItem) {
      // Check if the item already exists in favouriteData
      const isItemInFavourites = favouriteData.some(
        (item) => item.bundle === removeFavouriteItem.bundle
      );

      console.log("Favourite Item", isItemInFavourites);

      if (isItemInFavourites) {
        // Item already exists, remove it from favouriteData
        const updatedFavouriteData = favouriteData.filter(
          (item) => item.bundle !== removeFavouriteItem.bundle
        );
        setFavouriteData(updatedFavouriteData);

        console.log("Item removed from favourites");

        setModalDeleteFavouriteApps(false);
      } else {
        // Item doesn't exist, add it to favouriteData
        setFavouriteData((prevData) => [...prevData, favouriteItem]);
        console.log("Add to Favorites pressed for:");

        setModalDeleteFavouriteApps(false);
      }
    } else {
      console.log("NO APPS FOUND");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        //backgroundColor: isLongPress === true ? 'rgba(0, 0, 0, 0.5)' : 'white',
      }}
    >
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLongPress}
        onRequestClose={() => setIsLongPress(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                if (favouriteItem) {
                  const isItemInFavourites = favouriteData.some(
                    (item) => item.bundle === favouriteItem.bundle
                  );

                  if (isItemInFavourites) {
                    console.log("Item is already in favourites");
                  } else {
                    setFavouriteData((prevData) => [
                      ...prevData,
                      favouriteItem,
                    ]);
                    console.log(
                      "Add to Favorites pressed for:",
                      favouriteItem.label
                    );
                  }

                  setIsLongPress(false);
                }
              }}
              style={styles.overlayButton}
            >
              <Text style={{ color: "white" }}>Add to Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsCancelModalVisible(false);
                setIsLongPress(false);
                setModalDeleteApps(true);
              }}
              style={styles.overlayButton}
            >
              <Text style={{ color: "white" }}>
                Remove From Wotcha Gotcha App
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isCancelModalVisible && (
          <TouchableOpacity
            onPress={() => closeRequestModal()}
            style={styles.modalContentCross}
          >
            <Entypo name={"cross"} size={18} color={"black"} />
          </TouchableOpacity>
        )}
      </Modal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLongPressRemove}
        onRequestClose={() => setIsLongPressRemove(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                // Handle your overlay button action (e.g., add to favorites)

                /*  if (favouriteItem) {
                  setFavouriteData((prevData) => [...prevData, favouriteItem]);
                  console.log('Add to Favorites pressed for:');
                  setIsLongPress(false);
                } */
                setIsLongPressRemove(false);
                setModalDeleteFavouriteApps(true);
              }}
              style={styles.overlayButton}
            >
              <Text style={{ color: "white" }}>Remove Favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsCancelModalVisible(false);
                setIsLongPressRemove(false);
                setModalDeleteApps(true);
              }}
              style={styles.overlayButton}
            >
              <Text style={{ color: "white" }}>
                Remove From Wotcha Gotcha App
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isCancelRemoveModalVisible && (
          <TouchableOpacity
            onPress={() => closeRequestRemoveModal()}
            style={styles.modalContentCross}
          >
            <Entypo name={"cross"} size={18} color={"black"} />
          </TouchableOpacity>
        )}
      </Modal>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{ marginTop: hp(7) }}>
        <Headers
         OnpresshowHome={() => {
            navigation.navigate("MoreScreen");
          }}
          // showListings={true}
          showHome={true}
          // navigation={navigation}
          // onPressListings={() => navigation.openDrawer()}
          showSearch={true}
          onPressSearch={() => navigation.navigate("SearchApps")}
          
        />
        {/* <Headers
          showListings={true}
          navigation={navigation}
          onPressListings={() => navigation.openDrawer()}
          showSearch={true}
          onPressSearch={() => navigation.navigate("SearchApps")}
          
        /> */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginHorizontal: wp(5) }}
      >
        {/* <View
          style={{
            height: hp(18),
            marginTop: hp(1),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: wp(80),
              height: hp(13),
              borderWidth: 1,
              resizeMode: "contain",
            }}
            source={{
              uri: "https://neilpatel.com/wp-content/uploads/2021/02/ExamplesofSuccessfulBannerAdvertising.jpg",
            }}
          />
        </View> */}

        {/* ///slider for banner 24.5.2024 5pm */}
        {/* <View style={{alignItems: 'center'}}>
      <SwiperFlatList
        // autoplay
        // autoplayDelay={2}
        // autoplayLoop
        index={0}
        // showPagination
        paginationStyle={styles.pagination}
        paginationStyleItem={styles.paginationItem}
        paginationStyleItemActive={styles.paginationItemActive}
        data={bannerAds}
        renderItem={({ item }) => (
          <View style={styles.child}>
            <Image source={ item.image } style={styles.image} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        loop
      />
    </View> */}
        {/* // */}

  {/* // start of banner slider */}
  <BannerCarousel
        isLoading={isLoading}
        adsData={adsData}
        noDataMessage="No Top Banner"
        onBannerPress={handleBannerPress}
      />
  {/* <View
      style={{
        alignItems: 'center',
        height: hp(16),
        // marginLeft: 8,
        marginVertical: hp(2),
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#FACA4E" />
      ) : adsData.length === 0 ? (
        <View style={styles.TopBannerView}>
          <Text style={{ fontWeight: 'bold', fontSize: hp(2.1) }}>No Top Banner</Text>
        </View>
      ) : (
        <Carousel
          data={adsData}
          renderItem={({ item }) => (
            <View
              key={item.id}
              style={{
                justifyContent: 'center',
              }}
            >
              <Image
                source={{ uri: item?.image }}
                style={{
                  height: hp(15),
                  width: '100%',
                  borderWidth: 1,
                  resizeMode: 'contain',
                  borderRadius: 10,
                }}
              />
            </View>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 0.9}
          loop={true}
          autoplay={true}
        />
      )}
    </View> */}
        {/* ////slider end */}

        
        {/* <View
          style={{
          alignItems: 'center',
          height: hp(14),
          marginLeft:8,
          marginVertical:hp(2)
          }}
        >
          <Swiper autoplay={true} loop={true}>
            {bannerAds.map((banner) => (
              <View
                key={banner.id}
                style={{

                  justifyContent: "center",
   
                }}
              >
                <Image
                  source={banner.image}
                  style={{
                    height: hp(13),
                    width: wp(85),
                    borderWidth: 1,
                    // resizeMode:'contain',
                    borderRadius: 10,
                  }}
                />
              </View>
            ))}
          </Swiper>
        </View> */}
        {/* ////slider end */}

        <View style={styles.latestSearchList}>
          <TouchableOpacity onPress={press_category}>
            {isSelectedActive ? (
              <CategoryActive width={23} height={23} />
            ) : (
              <CategoryInactive width={23} height={23} />
            )}
          </TouchableOpacity>

          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            //data={regions}
            data={RegionArea}
            // keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderSearches(item)}
          />
        </View>
        {categoryActive ? (
          <>
            <View
              style={{
                marginTop: hp(2),
                marginLeft: wp(-1),
                height: hp(23),
                width: wp(60),
              }}
            >
              {isLoading === true ? (
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
                  {topData?.length === 0 ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                        No Top Apps
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      style={{ margin: 8, flex: 1 }}
                      //contentContainerStyle={{marginBottom:hp(5)}}
                      showsVerticalScrollIndicator={false}
                      data={topData}
                      //keyExtractor={item => item.id.toString()}
                      numColumns={3} // Set the number of columns to 3
                      renderItem={({ item }) => renderAvailableApps(item)}
                    />
                  )}
                </>
              )}
            </View>

            <View style={{ marginTop: hp(-3), height: hp(25) }}>
              <Text
                style={{
                  fontSize: hp(2.3),
                  marginLeft: wp(3),
                  fontFamily: "Inter-Bold",
                  color: "#4A4A4A",
                  fontWeight: "bold",
                }}
              >
                Phone Based Apps
              </Text>

              {isLoading ? (
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
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, itemIndex) => `${itemIndex}`}
                    renderItem={({ item }) => renderApps(item)}
                    contentContainerStyle={{
                      borderWidth: 1,
                      marginRight: wp(2.3),
                      marginTop: hp(3),
                      borderColor: "#00000017",
                      borderRadius: wp(3),
                    }}
                  />

                  <FlatList
                    data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, itemIndex) => `${itemIndex}`}
                    renderItem={({ item }) => renderApps(item)}
                    contentContainerStyle={{
                      borderWidth: 1,
                      marginRight: wp(2.3),
                      marginTop: hp(3),
                      borderColor: "#00000017",
                      borderRadius: wp(3),
                    }}
                  />
                </View>
              )}
            </View>

            <View style={{ height: hp(8), justifyContent: "center" }}>
              <View
                style={{
                  height: hp(7),
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  //borderWidth: 1,
                  marginHorizontal: wp(12),
                }}
              ></View>
            </View>

            <View style={{ marginTop: hp(-5), height: hp(28) }}>
              <Text
                style={{
                  fontSize: hp(2.3),
                  marginLeft: wp(3),
                  fontFamily: "Inter-Bold",
                  color: "#4A4A4A",
                  fontWeight: "bold",
                }}
              >
                Favourite Apps
              </Text>
              {isLoading ? (
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
                  {favouriteData?.length === 0 ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: hp(2.1),
                          justifyContent: "center",
                        }}
                      >
                        No Favourite Apps
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      data={favouriteData.slice(
                        0,
                        Math.ceil(favouriteData.length / 2)
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, itemIndex) => `${itemIndex}`}
                      renderItem={({ item }) => renderFavouritesApps(item)}
                      contentContainerStyle={{
                        borderWidth: 1,
                        marginRight: wp(2.3),
                        marginTop: hp(3),
                        borderColor: "#00000017",
                        borderRadius: wp(3),
                      }}
                    />
                  )}
                  <FlatList
                    data={favouriteData.slice(
                      Math.ceil(favouriteData.length / 2)
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, itemIndex) => `${itemIndex}`}
                    renderItem={({ item }) => renderFavouritesApps(item)}
                    contentContainerStyle={{
                      borderWidth: 1,
                      marginRight: wp(2.3),
                      marginTop: hp(3),
                      borderColor: "#00000017",
                      borderRadius: wp(3),
                    }}
                  />
                </>
              )}
            </View>

            <View
              style={{ marginTop: hp(1), marginBottom: hp(5), height: hp(25) }}
            >
              <Text
                style={{
                  fontSize: hp(2.3),
                  marginLeft: wp(3),
                  fontFamily: "Inter-Bold",
                  color: "#4A4A4A",
                  fontWeight: "bold",
                }}
              >
                Unused Apps
              </Text>

              {isLoading ? (
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
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, itemIndex) => `${itemIndex}`}
                    renderItem={({ item }) => renderApps(item)}
                    contentContainerStyle={{
                      borderWidth: 1,
                      marginRight: wp(2.3),
                      marginTop: hp(3),
                      borderColor: "#00000017",
                      borderRadius: wp(3),
                    }}
                  />

                  <FlatList
                    data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, itemIndex) => `${itemIndex}`}
                    renderItem={({ item }) => renderApps(item)}
                    contentContainerStyle={{
                      borderWidth: 1,
                      marginRight: wp(2.3),
                      marginTop: hp(3),
                      borderColor: "#00000017",
                      borderRadius: wp(3),
                    }}
                  />
                </View>
              )}
            </View>
          </>
        ) : (
          <>
            {ecommerance && selectedCategory === "E-commerce" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps.length > 0 ? (
                    <>
                      <View style={{ flex: 1 }}>
                        <ScrollView>
                          {Array.from({
                            length: Math.ceil(savedApps.length / 5),
                          }).map((_, rowIndex) => (
                            <ScrollView showsHorizontalScrollIndicator={true}>
                              <View
                                key={rowIndex}
                                style={{
                                  flexDirection: "row",
                                  marginBottom: 10,
                                  margin: "2%",
                                }}
                              >
                                {savedApps
                                  .slice(rowIndex * 5, (rowIndex + 1) * 5)
                                  .map((app, index) => (
                                    <View
                                      key={index}
                                      style={{
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: 10,
                                        marginRight: 6.1,
                                      }}
                                    >
                                      <Image
                                        style={{
                                          width: 40,
                                          height: 40,
                                          marginBottom: 5,
                                          margin: "3%",
                                        }}
                                        source={{
                                          uri: `data:image/png;base64,${app.image}`,
                                        }}
                                      />
                                      <Text
                                        style={{
                                          color: "black",
                                          fontSize: wp(2.5),
                                        }}
                                      >
                                        {app.label.substring(0, 10)}
                                      </Text>
                                    </View>
                                  ))}
                                {[
                                  ...Array(
                                    Math.max(0, 5 - (savedApps.length % 5))
                                  ),
                                ].map((_, index) => (
                                  <View
                                    key={index}
                                    style={{
                                      width: 30,
                                      height: 30,
                                      marginRight: 10,
                                    }}
                                  />
                                ))}
                              </View>
                            </ScrollView>
                          ))}
                        </ScrollView>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add E-commernce apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

            {selectedCategory === "Business" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_b.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_b.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_b
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_b.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Bussiness apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_b(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Sports" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_sp.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_sp.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_sp
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_sp.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Sports apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_sp(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Education" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_e.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_e.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_e
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_e.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Education apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_e(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Dating" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_d.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_d.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_d
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_d.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Dating apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_d(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Food Delivery" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_fd.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_fd.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_fd
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_fd.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Food Delivery apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_fd(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Social Media" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_sm.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_sm.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_sm
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_sm.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          you can add Social Media app here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_sm(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Medical Wellness" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_mw.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_mw.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_mw
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_mw.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          You can Medical wallness app here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_mw(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Grocery" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_g.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_g.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "2%",
                            }}
                          >
                            {savedApps_g
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_g.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          You can add Grocery apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_g(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === "Employment" && (
              <>
                <View
                  style={{ flex: 1, height: containerHeight, width: "100%" }}
                >
                  {savedApps_em.length > 0 ? (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        {Array.from({
                          length: Math.ceil(savedApps_em.length / 5),
                        }).map((_, rowIndex) => (
                          <View
                            key={rowIndex}
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                              margin: "4%",
                            }}
                          >
                            {savedApps_em
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginRight: 10,
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 40,
                                      height: 40,
                                      marginBottom: 5,
                                      margin: "3%",
                                    }}
                                    source={{
                                      uri: `data:image/png;base64,${app.image}`,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      color: "black",
                                      fontSize: wp(2.5),
                                    }}
                                  >
                                    {app.label}
                                  </Text>
                                </View>
                              ))}
                            {[
                              ...Array(
                                Math.max(0, 5 - (savedApps_em.length % 5))
                              ),
                            ].map((_, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 30,
                                  height: 30,
                                  marginRight: 10,
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: wp(3.5),
                            textAlign: "center",
                            top: "40%",
                          }}
                        >
                          Your can add Employment apps here
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "80%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_em(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </>
        )}

          {/* // start of banner slider */}
          <BannerCarousel
        isLoading={isLoading}
        adsData={adsInActiveData}
        noDataMessage="No Banner"
        onBannerPress={handleBannerPress}
      />
        {/* ////slider end */}
      </ScrollView>

      <CustomModal
        visible={modalDeleteApps}
        onClose={() => setModalDeleteApps(false)}
        headerText="Alert?"
        bodyText="Are You Sure You Want To Remove The App"
        cancelText={"Cancel"}
        doneText={"Yes, Delete"}
        onCancel={() => handleCancel()}
        onConfirm={() => handleConfirm()}
      />

      <CustomModal
        visible={modalDeleteFavouriteApps}
        onClose={() => setModalDeleteFavouriteApps(false)}
        headerText="Alert!"
        bodyText="Are You Sure You Want To Remove From Favourites?"
        cancelText={"Cancel"}
        doneText={"Yes, Remove"}
        onCancel={() => handleCancelFavourite()}
        onConfirm={() => handleConfirmFavourite()}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
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
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Your Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity onPress={handleSave} style={{height:30, width:30, paddingLeft:4}}>
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_b}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_b(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
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
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Your Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity onPress={handleSave_b} style={{height:30, width:30, paddingLeft:4}}>
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_b(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_b(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_sp}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_sp(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
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
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Your Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity onPress={handleSave_sp} style={{height:30, width:30, paddingLeft:4}}>
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_sp(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_sp(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_e}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_e(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
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
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Your Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity onPress={handleSave_e} style={{height:30, width:30, paddingLeft:4}}>
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_e(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_e(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_d}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_d(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
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
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Your Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity onPress={handleSave_d} style={{height:30, width:30, paddingLeft:4}}>
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_d(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_d(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_fd}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_fd(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
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
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Your Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity onPress={handleSave_fd} style={{height:30, width:30, paddingLeft:4}}>
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_fd(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_fd(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_sm}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_sm(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
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
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Your Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity onPress={handleSave_sm} style={{height:30, width:30, paddingLeft:4}}>
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_sm(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_sm(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_mw}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_mw(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
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
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Your Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity onPress={handleSave_mw} style={{height:30, width:30, paddingLeft:4}}>
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_mw(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_mw(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_g}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_g(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
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
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Your Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity onPress={handleSave_g} style={{height:30, width:30, paddingLeft:4}}>
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_g(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_g(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible_em}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible_em(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <View style={{ marginTop: hp(-3), height: hp(30) }}>
              {isLoading ? (
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
                  <View style={styles.leftContent1}>
                    <Text style={styles.leftText1}>Your Apps</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity onPress={handleSave_em} style={{height:30, width:30, paddingLeft:4}}>
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#FACA4E"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1, bottom: "15%" }}>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_em(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginTop: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                    <View style={{ top: "5%" }}>
                      <FlatList
                        data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, itemIndex) => `${itemIndex}`}
                        renderItem={({ item }) => renderAppsFav_em(item)}
                        contentContainerStyle={{
                          borderWidth: 1,
                          marginRight: wp(2.3),
                          // marginBottom: hp(3),
                          borderColor: "#00000017",
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <CustomSnackbar
        message={"Success"}
        messageDescription={"Apps added in category"}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  searchBar: {
    height: hp(5.9),
    marginTop: hp(3),
    flex: 1,
    backgroundColor: "#F2F2F2",
    flexDirection: "row",
    alignItems: "center",
    //marginLeft: wp(3.8),
    borderRadius: wp(5),
    borderWidth: 0.5,
    borderColor: "#00000017",
  },
  latestSearchList: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),
    // marginLeft: wp(1),
    //borderWidth: 3,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: hp(5),
    marginHorizontal: wp(8),
    height: hp(8),
    //borderWidth: 3,
  },
  latestSearch: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: wp(4.3),
    marginTop: hp(2),
    marginLeft: wp(10),
    color: "#595959",
  },
  searchesDetails: {
    flexDirection: "row",
    marginLeft: wp(3),
    alignItems: "center",
    justifyContent: "center",
    width: wp(30),
    backgroundColor: "#F2F2F2",
    borderRadius: wp(5),
    height: hp(5),
  },
  textSearchDetails: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: hp(1.8),
  },
  textHeader: {
    fontSize: wp(5.7),
    color: "#333333",
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  items: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  overlayButton: {
    backgroundColor: "#FACA4E",
    padding: 10,
    alignItems: "center",
    //marginHorizontal: wp(5),
    justifyContent: "center",
    marginTop: hp(5),
    borderRadius: 5,
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalContent: {
    //   width: '80%',
    //justifyContent:'center',
    //alignItems:'center',
    //borderWidth:3,
    //backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    marginRight:20
  },
  rightContent1: {
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  additionalContentContainer: {
    marginTop: 10,
    height: hp(25),
    borderWidth: 1,
    borderColor: "#00000017",
    borderRadius: wp(3),
    justifyContent: "center",
  },
  flatListContainer: {
    paddingHorizontal: wp(2.3),
    marginTop: hp(3),
  },
  child: {
    width: sliderWidth,
    height: hp(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  pagination: {
    bottom: 10,
  },
  paginationItem: {
    width: 8,
    height: 8,
    marginHorizontal: 2,
  },
  paginationItemActive: {
    width: 10,
    height: 10,
  },
  TopBannerView:{
    height:'100%', width:'100%', borderWidth:1, borderColor:'gray',  borderRadius: 10, flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  appIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  appLabel: {
    fontSize: 16,
  },
});




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////All done before unused app