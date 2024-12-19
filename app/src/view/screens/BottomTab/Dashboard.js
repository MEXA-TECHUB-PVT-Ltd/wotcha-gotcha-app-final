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
  Dimensions,
  Linking,
  Platform
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import Headers from "../../../assets/Custom/Headers";
import { appImages } from "../../../assets/utilities";
import Carousel from 'react-native-snap-carousel';
//---------------- IMPORTS OF DASHBOARD ----------------------\\
import Approved from "../../../assets/svg/Approved";
import { InstalledApps, RNLauncherKitHelper } from "react-native-launcher-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

//----------------- IMPORT VIDE0 -------------------\\
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
//----------------------------------------------------\\
import CategoryActive from "../../../assets/svg/CategoryActive.svg";
import CategoryInactive from "../../../assets/svg/CategoryInactive";
import Add from "../../../assets/svg/AddMainScreen.svg";
//------------------IMPORT OF DISC --------------------\\
import NonVerified from "../../../assets/svg/NonVerified.svg";
import CustomModal from "../../../assets/Custom/CustomModal";
import { base_url } from "../../../../../baseUrl";
import VideoActive from "../../../assets/svg/VideoActive";
import ProfileActive from '../../../assets/svg/ProfileActive.svg';
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
import { fetchBannerConfig, fetchBannerInActive } from '../../../../../API';
import { useTranslation } from 'react-i18next';
import { fetchAllCinematicsCategory, fetchCinematicTopVideos, fetchSubCategory } from '../../../../../API';
import BannerCarousel from "../../../assets/Custom/BannerCarousel";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
const screenHeight = Dimensions.get("window").height;
const itemHeight = 450;

const { width: viewportWidth } = Dimensions.get("window");

const sliderWidth = viewportWidth * 0.9;

export default function Dashboard({ route }) {
  const navigation = useNavigation();
  const [selectedItemId, setSelectedItemId] = useState(1);
  const [dataApps, setDataApps] = useState([]);
  const [isLongPress, setIsLongPress] = useState(false);
  const [unUsedLocal, setUnUsedLocal] = useState([]);
  const [unusedApps, setUnusedApps] = useState([]);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isCancelRemoveModalVisible, setIsCancelRemoveModalVisible] =
    useState(false);
  const [isLongPressRemove, setIsLongPressRemove] = useState(false);
  const [favouriteItem, setFavouriteItem] = useState(null);
  const [removeFavouriteItem, setRemoveFavouriteItem] = useState(null);
  const [favouriteData, setFavouriteData] = useState([]);
  const isFocused = useIsFocused();
  const [topData, setTopData] = useState([]);
  const [modalDeleteApps, setModalDeleteApps] = useState(false);
  const [modalDeleteFavouriteApps, setModalDeleteFavouriteApps] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aLoader, setAloader] = useState(true);
  const scrollViewRef = useRef();
  const { t } = useTranslation();
  const [isSelectedActive, setIsSelectedActive] = useState(true);
  const [categoryActive, setcategoryActive] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
  const [adsData, setAdsData] = useState([]);
  const [adsInActiveData, setAdsInActiveData] = useState([]);
  const [topNewsData, setTopNewsData] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedNewsItemId, setSelectedNewsItemId] = useState(null);
  const [selectedLetterItemId, setSelectedLetterItemId] = useState(1);
  const [selectedQAFIItemId, setSelectedQAFIItemId] = useState(null);
  const [selectedEBCItemId, setSelectedEBCItemId] = useState(null);

  const [language, setLanguage] = useState(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        if (storedLanguage) {
          setLanguage(storedLanguage);
          console.log('lanugage-------- in dash', storedLanguage)
        }
      } catch (error) {
        console.error("Error fetching language:", error);
      }
    };

    fetchLanguage();
  }, [isFocused]);

  useEffect(() => {
    const fetchInstalledAppData = async () => {
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
      setIsLoading(false);
    };

    fetchInstalledAppData();
  }, []);

  useEffect(() => {
    const topSixItems = dataApps.slice(0, 6);
    //   console.log('Top Six Item');
    const saveTopData = async () => {
      try {
        const updatedTopData = topSixItems.map((item) => ({
          ...item,
          count: 2,
        }));
        await AsyncStorage.setItem("topData", JSON.stringify(updatedTopData));
        setTopData(updatedTopData);
      } catch (error) {
        console.error("Error saving top data to AsyncStorage:", error);
      }
    };
    saveTopData();
  }, [dataApps]);
  useEffect(() => {
    //   if (isFocused) {
    const loadFavouriteData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("favouriteData");

        if (storedData.length === 2) {
        
          const initialFavouriteData = dataApps.slice(0, 4);
          await AsyncStorage.setItem(
            "favouriteData",
            JSON.stringify(initialFavouriteData)
          );
          setFavouriteData(initialFavouriteData);
        } else {
          const parsedData = JSON.parse(storedData);
          setFavouriteData(parsedData);
       
        }
      } catch (error) {
        console.error("Error loading favourite data from AsyncStorage:", error);
      }
    };

    loadFavouriteData();
    //   }
  }, []);

  useEffect(() => {
    //   if (isFocused) {
    const saveFavouriteData = async () => {
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
    //   }
  }, [favouriteData]);

  useEffect(() => {
    //   if (isFocused) {
    const loadTopData = async () => {
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
    //   }
  }, []);

  useEffect(() => {
    //   if (isFocused) {
    const saveTopData = async () => {
      try {
        await AsyncStorage.setItem("topData", JSON.stringify(topData));
      } catch (error) {
        console.error("Error saving top data to AsyncStorage:", error);
      }
    };

    saveTopData();
    //   }
  }, [topData]);

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

  //------------------------------------------------------------\\
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
  };

  const closeRequestModal = () => {
    setIsLongPress(false);
    setIsCancelModalVisible(false);
  };

  const closeRequestRemoveModal = () => {
    setIsLongPressRemove(false);
    setIsCancelRemoveModalVisible(false);
  };

  //--------------------Video---------------------------\\

  const [loadingOne, setLoadingOne] = useState(false);

  const [imageInfo, setImageInfo] = useState(null);

  const [selectedItem, setSelectedItem] = useState("");

  const ref_RBSheetCamera = useRef(null);

  const takePhotoFromCamera = async (value) => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: "video",
        videoQuality: "medium",
      },
      (response) => {
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setLoadingOne(true);
            setImageInfo(response.assets[0]);
            ref_RBSheetCamera.current.close();
            setLoadingOne(false);

            navigation.navigate("UploadUpdateVideo", {
              Video: response.assets[0],
            });
          } else if (response.uri) {
            ref_RBSheetCamera.current.close();
            setLoading(false);

            navigation.navigate("UploadUpdateVideo", {
              Video: response.assets[0],
            });
          }
        }
        ref_RBSheetCamera.current.close();
        setLoading(false);

        navigation.navigate("UploadUpdateVideo", { Video: response.assets[0] });
      }
    );
  };

  const choosePhotoFromLibrary = (value) => {
    setSelectedItem(value);
    launchImageLibrary({ mediaType: "video" }, (response) => {
      // console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        setLoading(true);
        setImageInfo(response.assets[0]);
        ref_RBSheetCamera.current.close();
        setLoading(false);

        navigation.navigate("UploadUpdateVideo", { Video: response.assets[0] });
      }
      ref_RBSheetCamera.current.close();
      setLoading(false);

      navigation.navigate("UploadUpdateVideo", { Video: response.assets[0] });
    });
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
      setDataApps(updatedInstallData);
    } else {
      setModalDeleteApps(false);
      console.log("CANCEL");
    }
  };

  const handleCancelFavourite = () => {
    setModalDeleteFavouriteApps(false);
  };

  const handleConfirmFavourite = () => {
    if (removeFavouriteItem) {
      // Check if the item already exists in favouriteData
      const isItemInFavourites = favouriteData.some(
        (item) => item.bundle === removeFavouriteItem.bundle
      );

      if (isItemInFavourites) {
        // Item already exists, remove it from favouriteData
        const updatedFavouriteData = favouriteData.filter(
          (item) => item.bundle !== removeFavouriteItem.bundle
        );
        setFavouriteData(updatedFavouriteData);
        setModalDeleteFavouriteApps(false);
      } else {

        setFavouriteData((prevData) => [...prevData, favouriteItem]);
        setModalDeleteFavouriteApps(false);
      }
    } else {
      console.log("NO APPS FOUND");
    }
  };

  const fetchDataForVisibleComponent = async () => {
    await fetchDataIfVisible(fetchCategoryMarket);
    await fetchDataIfVisible(fetchAllMarket);
    await fetchDataIfVisible(fetchElectronicsMarket);
    await fetchDataIfVisible(fetchVehiclesMarket);
    await fetchDataIfVisible(fetchClothingMarket);
  };

  const fetchDataIfVisible = async (fetchFunction) => {
    if (isComponentVisible()) {
      try {
        await fetchFunction();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchDataForVisibleComponent();
  }, []);

  const isComponentVisible = () => {
    if (!scrollViewRef || !scrollViewRef.current) return false;

    const scrollY = scrollViewRef.current.contentOffset?.y || 0;
    const screenHeight = scrollViewRef.current.clientHeight || 0;

    const marketComponentTop = 0; // Top of the market component
    const marketComponentBottom = marketComponentTop + screenHeight; // Bottom of the market component

    return (
      marketComponentTop >= scrollY &&
      marketComponentBottom <= scrollY + screenHeight
    );
  };
  /////////////////////////////////////////////////////////////////////////Main return start hai 28/5/2024

  //////////////////////////////2.6.2025

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(new Array(4).fill(false));
 
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const [categoriesSelectMarket, setCategorySelectMarket] = useState([]);
  // const RegionArea = ["Africa", "Europe", "Americas", "Asia", "Middle East"];

  // const RegionArea = [
  //   t('Africa'),
  //   t('Europe'),
  //   t('Americas'),
  //   t('Asia'),
  //   t('Middle_East')
  // ];

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
  // const MassApp = [
  //   "E-commerce",
  //   "Business",
  //   "Sports",
  //   "Education",
  //   "Dating",
  //   "Food Delivery",
  //   "Social Media",
  //   "Medical Wellness",
  //   "Grocery",
  //   "Employment",
  // ];
  const containerHeight = Math.min(screenHeight * 0.8, itemHeight);


  // xpi video start
  // Fetch all data when authToken is set and screen is focused
  const [Xpisearches, setXpiSearches] = useState([]);
  const [DataTopXpiData, setDataTopXpiData] = useState([]);
  const [selectedXpiItemId, setSelectedXpiItemId] = useState(null);
  const [isXpiLoading, setIsXpiLoading] = useState(true);
  const [noXpiData, setNoXpiData] = useState(false);
  const [Xpisections, setXpiSections] = useState([]);

  useEffect(() => {
    if (authToken && isFocused) {
      fetchAllCinematicsCategory();
      // fetchTopSport();
      fetchTopXpiVideos(selectedXpiItemId);
      fetchSubCategoryXpiVideo(selectedXpiItemId);
    }
  }, [authToken, selectedXpiItemId, isFocused]);

  // Fetch categories
  const fetchAllCinematicsCategory = async () => {
    setIsXpiLoading(true)
    try {
      const response = await fetch(`${base_url}videoCategory/getAllVideoCategories`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();

      const categories = result.AllCategories.reverse();
      // console.log(' videoooooooooooooooo...............', categories)
      setXpiSearches(categories); // Update the state with the fetched data
  
      if (selectedXpiItemId === null && categories.length > 0) {
        setSelectedXpiItemId(categories[0].id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setIsXpiLoading(false)
  };


  // Fetch top sports
  const fetchTopXpiVideos = async (selectedXpiItemId) => {
    const token = authToken;
    setIsXpiLoading(true)
    try {
      const response = await fetch(
        base_url + `top/getAllTopVideosByCategory/${selectedXpiItemId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();
      setDataTopXpiData(result.AllVideos[0]); // Update the state with the fetched data
    } catch (error) {
      console.error('Error top:', error);
    }
    setIsXpiLoading(false)
  };

  // Fetch sub-category sports
  const fetchSubCategoryXpiVideo = async (selectedXpiItemId) => {
    setIsXpiLoading(true)
    try {
      const response = await fetch(`${base_url}xpi/getAllVideosBycategory/${selectedXpiItemId}?page=1&limit=100000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          // title: category.sub_category_name,
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.video_result.Videos,
        }));
        setXpiSections(formattedSections);
        setNoXpiData(formattedSections.every(section => section.data.length === 0));
      } else {
        setXpiSections([]);
        setNoXpiData(true);
      }
    } catch (error) {
      console.error("Error fetching sub-category sports:", error);
      setNoXpiData(true); // Assume no data on error
    }
    setIsXpiLoading(false)
  };

  const renderSearchesVideo = (item) => {
    const isSelected = selectedXpiItemId === item.id;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            // backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
            backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
          },
        ]}
        onPress={() => {
          setSelectedXpiItemId(item.id); // Update selectedItemVideoId when item is selected
          console.log("Selected item:", item.id);
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

  const renderXpiVideoItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ViewVideo', { videoData: item, identifier: false })}>
      <View style={styles.itemContainer}>

        <View>
          {item.thumbail === '' ||
            item.thumbnail === null ||
            // item.thumbnail.startsWith('/') ||
            item.thumbnail === undefined ? (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,

                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: 'cover',
              }}
              source={appImages.galleryPlaceHolder}
            />
          ) : (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,

                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: 'cover',
              }}
              source={{ uri: item.thumbnail }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(0.5),
            marginTop: hp(12.5),
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              fontFamily: 'Inter-Regular',
              color: '#000000',
              width: wp(23),
            }}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderXpiVideoSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          renderItem={renderXpiVideoItem}
          keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );



  // Pic Module start
  const [Picsearches, setPicSearches] = useState([]);
  const [DataTopPicData, setDataTopPicData] = useState([]);
  const [selectedPicItemId, setSelectedPicItemId] = useState(null);
  const [isPicLoading, setIsPicLoading] = useState(true);
  const [noPicData, setNoPicData] = useState(false);
  const [Picsections, setPicSections] = useState([]);
  useEffect(() => {
    const getMainCategory = async () => {
      setIsPicLoading(true);
      try {
        const response = await fetch(`${base_url}picCategory/getAllPicCategories?page=1&limit=10000`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setPicSearches(result.AllCategories);

        // Set the first item as the default selected item if no item is currently selected
        if (selectedPicItemId === null && result.AllCategories.length > 0) {
          setSelectedPicItemId(result.AllCategories[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsPicLoading(false);
      }
    };

    getMainCategory();
  }, [authToken]);

  // Fetch all data when authToken is set and screen is focused
  useEffect(() => {
    if (authToken && isFocused) {
      // fetchAllCinematicsCategory();
      fetchTopForPics(selectedPicItemId);
      fetchSubCategorySport(selectedPicItemId);
    }
  }, [authToken, selectedPicItemId, isFocused]);



  const fetchTopForPics = async (selectedPicItemId) => {
    const token = authToken;
    try {
      const response = await fetch(
        base_url + `top/app/top_tour/${selectedPicItemId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // Check if result and result.topTour are defined and not null
      if (result && result.topTour && result.topTour.length > 0) {
        // console.log("Response result:", result.topTour[0]);
        setDataTopPicData(result.topTour[0]); // Update the state with the fetched data
      } else {
        // console.error('No topTour data available');
        setDataTopPicData([]);
        console.log("Response result:", []); // Set to an empty array or handle as needed
      }
    } catch (error) {
      console.error("Error for Top:", error);
    }
  };


  // Fetch sub-category sports
  const fetchSubCategorySport = async (selectedPicItemId) => {
    setIsPicLoading(true)
    try {
      const response = await fetch(`${base_url}picTour/getAllPicTourByCategory/${selectedPicItemId}?page=1&limit=100000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          // title: category.sub_category_name,
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.tour_result.Tours,
        }));

        setPicSections(formattedSections);
        setNoPicData(formattedSections.every(section => section.data.length === 0));
      } else {
        setPicSections([]);
        setNoPicData(true);
      }
    } catch (error) {
      console.error("Error fetching sub-category sports:", error);
      setNoPicData(true); // Assume no data on error
    }
    setIsPicLoading(false)
  };

  const renderSearchesPic = (item) => {
    const isSelected = selectedPicItemId === item.id;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            // backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
            backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
          },
        ]}
        onPress={() => {
          setSelectedPicItemId(item.id);
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

  const renderPicsItem = ({ item }) => (

    <TouchableOpacity onPress={() => navigation.navigate("PicDetails", { picData: item })}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: hp(7),
            width: wp(25),
          }}
        >
          {item?.user_image ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: "hidden",
                borderRadius: wp(7) / 2,
              }}
            >
              <Image
                source={{ uri: item?.user_image }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                // style={{marginTop: hp(0.5)}}
                name={"account-circle"}
                size={24}
                color={"#FACA4E"}
              />
              {/*  <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          /> */}
            </View>
          )}

          <View style={{ width: 70 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(0.7),
                color: "#000000",
                fontWeight: "bold",
                fontFamily: "Inter",
              }}
            >
              {item.name}
            </Text>
          </View>
          {/* <View style={{ marginLeft: wp(1) }}>
            <NonVerified />
          </View> */}
        </View>


        {/* <Text  ellipsizeMode="tail"
                numberOfLines={1} style={styles.text}>{item.name}</Text>
      <Text  ellipsizeMode="tail"
                numberOfLines={2} style={styles.text1}>{item.description}</Text> */}
      </View>
    </TouchableOpacity>
  );

  const renderPicsSection = ({ item }) => (
    // console.log('item----', item.data)
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          renderItem={renderPicsItem}
          keyExtractor={(videoItem) => videoItem.tour_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );


  //New Render start
  const renderNewsSearches = (item) => {
    // console.log('Items', item);
    const isSelected = selectedNewsItemId === item.id;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedNewsItemId(item.id);

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

  const lettersearches = [
    { id: 1, title: "Open Letter" },
  ];
  const [topLetterData, setTopLetterData] = useState('');
  const [letterLoading, setLetterLoading] = useState('');
  const fetchTopLetter = async () => {
    setLetterLoading(true);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "top/app/top_letter",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of TopNews', result.topitem);
      //Alert.alert(result)
      setTopLetterData(result.topitem[0] || '');
      // const formattedLetters = result.topitem.map((letter) => ({
      //   ...letter,
      //   post_date: convertTimeAndDate(letter.post_date),
      // }));
      // // console.log('Resultings of setLetterLoading', result.topitem);
      // setTopLetterData(formattedLetters[0]); // Update the state with the fetched data
      // fetchSpecificSig(formattedLetters[0].signature_id)
    } catch (error) {
      setLetterLoading(false);
      console.error("Error Trending:", error);
    }
  };

//  Post Letter Function Start
const [letterselectedItemId, setLetterSelectedItemId] = useState(null);
const [lettersearchesData, setLetterSearchesData] = useState([]);
const [lettersections, setLetterSections] = useState([]);
const [noletterData, setNoLetterData] = useState(false);
const [postletterloading, setPostLetterLoading] = useState(false);
 // Fetch all data when authToken is set and screen is focused
 useEffect(() => {
  if (authToken) {
    fetchAllLetterCategory();
    fetchLetterSubCategorySport(letterselectedItemId);
  }
}, [authToken, letterselectedItemId]);

    // Fetch categories
    const fetchAllLetterCategory = async () => {
      setPostLetterLoading(true)
      try {
        const response = await fetch(`${base_url}discCategory/getAllDiscCategories?page=1&limit=100000`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const result = await response.json();

        const reverseData = result.AllCategories;
        setLetterSearchesData(reverseData);

        if (letterselectedItemId === null && result.AllCategories.length > 0) {
          setLetterSelectedItemId(result.AllCategories[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setPostLetterLoading(false)
    };

        // Fetch sub-category sports
  const fetchLetterSubCategorySport = async (letterselectedItemId) => {
    setPostLetterLoading(true)
    try {
      // const response = await fetch(`${base_url}news/getAllNewsByCategory/${selectedItemId}?page=1&limit=100000`, {
      const response = await fetch(`${base_url}letter/getAllLetterByCategory/${letterselectedItemId}?page=1&limit=100000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          // title: category.sub_category_name,
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.total_result.letters,
        }));

        setLetterSections(formattedSections);
        console.log('data for sub cater haioiii', formattedSections)
        setNoLetterData(formattedSections.every(section => section.data.length === 0));
      } else {
        setLetterSections([]);
        setNoLetterData(true);
      }
    } catch (error) {
      console.error("Error fetching sub-category sports:", error);
      setNoLetterData(true); // Assume no data on error
    }
    setPostLetterLoading(false)
  };

  const renderPostLetterSearches = (item) => {
    const isSelected = letterselectedItemId === item.id;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setLetterSelectedItemId(item.id);
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


  const renderLetterSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('NoDataAvailable')}</Text>
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
    // const imageUrl = item.signature_id;
    const imageUrl = item.item.signature_image
      ? item.item.signature_image.startsWith("/fileUpload") ||
      item.item.signature_image.startsWith("/signatureImages")
        ? base_url + item.item.signature_image
        : item.item.signature_image
      : null;
      // console.log('user data --------item ', imageUrl)
    const userimageUrl = item.item.user_image
      ? item.item.userimage.startsWith("/userImage")
        ? base_url + item.item.user_image
        : item.item.user_image
      : null;
     
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("LetterDetails", {
            Letters: item.item,
            identifier: false,
          })
        }
        style={{
          width: wp(45),
          marginHorizontal: wp(2),
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
            {item.item?.user_image !== null ||
            item.item?.user_image !== undefined ||
            userimageUrl !== null ||
            userimageUrl !== undefined ? (
              <View
                style={{
                  height: hp(2),
                  width: wp(4),
                  borderRadius: wp(3),
                }}
              >
                <Image
                  source={{ uri: item.item?.user_image || userimageUrl }}
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
              height: 10,
              // marginRight: wp(1),
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
              {post_date}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              height: hp(5),
              paddingTop: 6,
              // backgroundColor:'red', width:'60%'
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
              {t('Subject')}
              {/* Subject: */}
            </Text>
            <View style={{ height: "100%", width: "75%" }}>
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
                {item.item.subject_place}
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              height: hp(6),
              right: 10,
            }}
          >
            {imageUrl !== null ||
            imageUrl !== undefined ||
            item.item.signature_image !== undefined ||
            item.item.signature_image !== null ? (
              <View
                style={{
                  height: hp(5),
                  width: wp(9),
                  borderRadius: wp(3),
                }}
              >
                <Image
                  source={{ uri: imageUrl || item.item.signature_image }}
                  style={{
                    width: "100%",
                    height: "100%",

                    resizeMode: "contain",
                  }}
                />
              </View>
            ) : null}
          </View>
          <View
            style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };

const convertTimeAndDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
  });
};

// const renderPublicGeneralLetter = (item) => {
//   const imageUrl = item.signature_image
//     ? item.signature_image.startsWith('/fileUpload') || item.signature_image.startsWith('/signatureImages')
//       ? base_url + item.signature_image
//       : item.signature_image
//     : null;

//   const userimageUrl = item.userimage
//     ? item.userimage.startsWith('/userImage')
//       ? base_url + item.userimage
//       : item.userimage
//     : null;
//   return (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate("LetterDetails", {
//           Letters: item,
//           identifier: false,
//         })
//       }
//       style={{
//         width: wp(45),
//         marginHorizontal: wp(2),
//         marginVertical: hp(1),
//         height: "100%",
//       }} // Add margin here
//     >
//       <View
//         style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
//       ></View>
//       <View>
//         <View
//           style={{
//             flexDirection: "row",
//             paddingHorizontal: 2,
//             alignItems: "center",
//             height: hp(4),
//           }}
//         >
//           {item?.userimage !== null || item?.userimage !== undefined || userimageUrl !== null || userimageUrl !== undefined ? (
//             <View
//               style={{
//                 height: hp(2),
//                 width: wp(4),
//                 borderRadius: wp(3),
//               }}
//             >
//               <Image
//                 source={{ uri: item?.userimage || userimageUrl }}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//               />
//             </View>
//           ) : (
//             <MaterialCommunityIcons
//               style={{ marginTop: hp(0.5) }}
//               name={"account-circle"}
//               size={35}
//               color={"#FACA4E"}
//             />
//           )}

//           <View style={{ marginLeft: wp(2.5) }}>
//             <Approved width={10} height={10} />
//           </View>
//         </View>

//         <View
//           style={{
//             alignItems: "flex-end",
//             marginTop: hp(-2),
//             marginRight: wp(3),
//           }}
//         >
//           <Text
//             style={{
//               color: "#282828",
//               // marginLeft: wp(3),
//               width: "25%",
//               fontSize: 6,
//               fontFamily: "Inter-Bold",
//             }}
//           >
//             {item.post_date}
//           </Text>
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             height: hp(5),
//             paddingTop: 6,
//             // backgroundColor:'red', width:'60%'
//           }}
//         >
//           <Text
//             style={{
//               color: "#282828",
//               fontSize: 8,
//               textDecorationLine: "underline",
//               fontFamily: "Inter-Bold",
//             }}
//           >
//             {t('Dashboard.Subject')}
//             {/* Subject: */}
//           </Text>
//           <View style={{ height: '100%', width: '75%' }}>
//             <Text
//               numberOfLines={3}
//               ellipsizeMode="tail"
//               style={{
//                 color: "#595959",
//                 marginLeft: wp(1),
//                 fontSize: 8,
//                 fontFamily: "Inter-Regular",
//               }}
//             >
//               {item.subject_place}
//             </Text>
//           </View>
//         </View>

//         <View
//           style={{
//             justifyContent: "center",
//             alignItems: 'flex-end',
//             height: hp(6),
//             right: 10
//           }}
//         >
//           {imageUrl !== null || imageUrl !== undefined || item.signature_image !== undefined || item.signature_image !== null ? (
//             <View
//               style={{
//                 height: hp(5),
//                 width: wp(10),
//                 borderRadius: wp(3),
//               }}
//             >
//               <Image
//                 source={{ uri: imageUrl || item.signature_image }}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: wp(3),
//                   resizeMode: "cover",
//                 }}
//               />
//             </View>
//           ) : (
//             null
//           )}
  
//         </View>
//         <View
//           style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
//         ></View>
//       </View>
//     </TouchableOpacity>
//   );
// };



  const renderQAFISearches = (item) => {
    // console.log('Items', item);
    const isSelected = selectedQAFIItemId === item.id;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedQAFIItemId(item.id);
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
    // console.log('Items', item);
    const isSelected = selectedEBCItemId === item.id;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedEBCItemId(item.id);
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

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken ");
        if (token) {
          setAuthToken(token);
          console.log('user token-------', token)
        } else {
          throw new Error("No auth token found");
        }
      } catch (err) {
        console.error("Error retrieving auth token:", err);
        setError(err);
      }
    };

    getAuthToken();
  }, []);

  useEffect(() => {
    if (authToken) {
      const fetchSequentialData = async () => {
        const marketId = selectedItemIdMarket || "Africa";
      
        const fetchFunctions = [
      
          fetchElectronicsMarket, // 16   13   1
          fetchVehiclesMarket, // 17   14   2
          fetchClothingMarket, // 18   15  3
          fetchAllMarket, // 19    16   4
      
        ];

        let newData = [];
        setLoading((prevload) => {
          if (!Array.isArray(prevload)) {
            prevload = new Array(4).fill(false);
          }
          return prevload.map((item, index) => (index === 0 ? true : item));
        });
        for (let i = 0; i < fetchFunctions.length; i++) {
          try {
            const result = await fetchFunctions[i](
              authToken,
              marketId,
              // DiscId
            );
            newData = [...newData, result];
            setData(newData);
            setLoading((prevload) => {
              if (!Array.isArray(prevload)) {
                prevload = new Array(4).fill(false);
              }
              return prevload.map((item, index) =>
                index === i ? false : index === i + 1 ? true : item
              );
            });
          } catch (err) {
            setError(err);
            setLoading((prevload) => {
              if (!Array.isArray(prevload)) {
                prevload = new Array(4).fill(false);
              }
              return prevload.map((item, index) => (index === i ? false : item));
            });
            break;

          }
        }
      };

      fetchSequentialData();
    }
  }, [
    authToken,
    selectedItemIdMarket,
  ]);

  useEffect(() => {
    if (authToken) {

      fetchTopMarket();
      fetchBanners();
      fetchCategoryMarket();
      fetchTopLetter()
      // fetchLetterPublicGeneralLetter();
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
 
  const [cinLoading, setCinLoading] = useState(true);
  const [fanLoading, setfanLoading] = useState(true);
  const [kidLoading, setKidLoading] = useState(true);
  const [learnLoading, setLearnLoading] = useState(true);
  const [tvLoading, setTvLoading] = useState(true);
  const [Cinematicdata, setCinematicData] = useState([]);
  const [fandata, setFanData] = useState([]);
  const [kiddata, setKidData] = useState([]);
  const [learndata, setLearnData] = useState([]);
  const [tvdata, setTvData] = useState([]);
  const [selectedCinematicItemId, setSelectedCinematicItemId] = useState(null);
  const [selectedFanstarItemId, setSelectedFanStarItemId] = useState(null);
  const [selectedKidItemId, setSelectedKidItemId] = useState(null);
  const [selectedlearnItemId, setSelectedLearnItemId] = useState(null);
  const [selectedtvItemId, setSelectedTvItemId] = useState(null);
  const [dataTopVideos, setDataTopVideos] = useState([]);
  const [dataTopFanVideos, setDataFanTopVideos] = useState([]);
  const [dataKidTopVideos, setDataKidTopVideos] = useState([]);
  const [datalearnTopVideos, setDataLearnTopVideos] = useState([]);
  const [datatvTopVideos, setDataTvTopVideos] = useState([]);
  const [sections, setSections] = useState([]);
  const [fansections, setFanSections] = useState([]);
  const [kidsections, setKidSections] = useState([]);
  const [learnsections, setLearnSections] = useState([]);
  const [tvsections, setTvSections] = useState([]);
  const [noData, setNoData] = useState(false);



  useEffect(() => {
    if (authToken && isFocused) {
      fetchAllCineCategory();
    }
  }, [authToken]);

  const fetchAllCineCategory = async () => {

    const token = authToken;

    try {
      const response = await fetch(
        base_url + "cinematics/category/getAll?page=1&limit=100",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      setCinematicData(result.AllCategories); // Update the state with the fetched data
      if (result.AllCategories.length > 0) {
        setSelectedCinematicItemId(result.AllCategories[0].id);
      }
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchAllCineData();
    }
  }, [authToken, selectedCinematicItemId]);

  const fetchAllCineData = async () => {
    setCinLoading(true);
    setNoData(false);
    try {
      // await fetchAllCinematicsCategory();
      await fetchCineTopVideos();
      await fetchCineSubCategory(selectedCinematicItemId);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setCinLoading(false);
    }
  };



  const fetchCineTopVideos = async () => {
    // console.log("Categry in id", selectedItemId);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "cinematics/getTopVideo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      //  console.log("getTopVideo------..", result.data);
      setDataTopVideos(result.data);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchCineSubCategory = async (selectedCinematicItemId) => {
    const token = authToken;

    try {
      const response = await fetch(
        `${base_url}cinematics/getByCategory/${selectedCinematicItemId}?page=1&limit=1000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          // title: category.sub_category_name,
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.video_result.videos,
        }));

        setSections(formattedSections);
        const hasNoData = formattedSections.every(section => section.data.length === 0);
        setNoData(hasNoData);
      } else {
        setSections([]);
        setNoData(true);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setNoData(true);  // Assume no data on error
    }
  };

  useEffect(() => {
    if (authToken && isFocused) {
      fetchAllFanStarCategory();
    }
  }, [authToken]);

  const fetchAllFanStarCategory = async () => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "fanStar/category/getAll?page=1&limit=1000",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllCategories---", result.AllCategories);
      const categories = result.AllCategories;
      setFanData(result.AllCategories); // Update the state with the fetched data

      if (categories.length > 0) {
        // Set the first category ID as selected
        setSelectedFanStarItemId(categories[0].id);
      }
    } catch (error) {
      console.error("Error Trending for all category:", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchAllFanData();
    }
  }, [authToken, selectedFanstarItemId]);

  const fetchAllFanData = async () => {
    setfanLoading(true);
    setNoData(false);
    try {
      // await fetchAllCinematicsCategory();
      await fetchTopFanVideos();
      await fetchFanSubCategory(selectedFanstarItemId);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setfanLoading(false);
    }
  };


  const fetchTopFanVideos = async () => {
    // console.log("Categry in id", selectedItemId);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "fanStar/getTopVideo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      //  console.log("getTopVideo------..", result.data);
      setDataFanTopVideos(result.data);
    } catch (error) {
      console.error("Error Trending for top:", error);
    }
  };

  const fetchFanSubCategory = async (selectedFanstarItemId) => {
    const token = authToken;

    try {
      const response = await fetch(
        `${base_url}fanStar/getByCategory/${selectedFanstarItemId}?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          // title: category.sub_category_name,
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.video_result.videos,
        }));

        // Reverse the titles
        const reversedSections = formattedSections.reverse();
        // console.log('results---', formattedSections);
        setFanSections(reversedSections);

        // Check if there is no data
        const hasNoData = formattedSections.every(section => section.data.length === 0);
        setNoData(hasNoData);
      } else {
        setFanSections([]);
        setNoData(true);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setNoData(true);  // Assume no data on error
    }
  };



  useEffect(() => {
    if (authToken && isFocused) {
      if (selectedKidItemId == null) {
        setSelectedKidItemId(9);
      }
      fetchAllKidsCategory();
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      fetchAllKidData();
    }
  }, [authToken, selectedKidItemId]);

  const fetchAllKidData = async () => {
    setKidLoading(true);
    setNoData(false);
    try {
      // await fetchAllCinematicsCategory();
      await fetchKidTopVideos();
      await fetchKidsSubCategory(selectedKidItemId);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setKidLoading(false);
    }
  };

  const fetchAllKidsCategory = async () => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "kidVids/category/getAll?page=1&limit=1000",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllCategories---", result.AllCategories);
      setKidData(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchKidTopVideos = async () => {
    // console.log("Categry in id", selectedItemId);
    const token = authToken;

    try {
      const response = await fetch(base_url + "kidVids/getTopVideo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      // console.log("getTopVideo------..", result.data);
      setDataKidTopVideos(result.data);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchKidsSubCategory = async (selectedKidItemId) => {
    const token = authToken;

    try {
      const response = await fetch(
        `${base_url}kidVids/getByCategory/${selectedKidItemId}?page=1&limit=10000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map((category) => ({
          // title: category.sub_category_name,
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.video_result.videos,
        }));

        // Reverse the titles
        const reversedSections = formattedSections.reverse();
        // console.log('results---', formattedSections);
        setKidSections(reversedSections);

        // Check if there is no data
        const hasNoData = formattedSections.every(
          (section) => section.data.length === 0
        );
        setNoData(hasNoData);
      } else {
        setKidSections([]);
        setNoData(true);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setNoData(true); // Assume no data on error
    }
  };




  useEffect(() => {
    if (authToken && isFocused) {
      if (selectedlearnItemId == null) {
        setSelectedLearnItemId(10)
      }
      fetchAllLearnCategory();
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      fetchAllLearnData();
    }
  }, [authToken, selectedlearnItemId]);

  const fetchAllLearnData = async () => {
    setLearnLoading(true);
    setNoData(false);
    try {
      // await fetchAllCinematicsCategory();
      await fetchLearnTopVideos();
      await fetchLearnSubCategory(selectedlearnItemId);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLearnLoading(false);
    }
  };

  const fetchAllLearnCategory = async () => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(

        base_url + "learningHobbies/category/getAll?page=1&limit=10000",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllCategories---", result.AllCategories);
      setLearnData(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchLearnTopVideos = async () => {
    // console.log("Categry in id", selectedItemId);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "learningHobbies/getTopVideo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      //  console.log("getTopVideo------..", result.data);
      setDataLearnTopVideos(result.data);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchLearnSubCategory = async (selectedlearnItemId) => {
    const token = authToken;

    try {
      const response = await fetch(

        `${base_url}learningHobbies/getByCategory/${selectedlearnItemId}?page=1&limit=10000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          // title: category.sub_category_name,
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.video_result.videos,
        }));

        // Reverse the titles
        const reversedSections = formattedSections.reverse();
        // console.log('results---', reversedSections);
        setLearnSections(reversedSections);

        // Check if there is no data
        const hasNoData = formattedSections.every(section => section.data.length === 0);
        setNoData(hasNoData);
      } else {
        setLearnSections([]);
        setNoData(true);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setNoData(true);  // Assume no data on error
    }
  };


  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  useEffect(() => {
    if (authToken && isFocused) {
      if (selectedtvItemId == null) {
        setSelectedTvItemId(17)
      }
      fetchAllTvCategory();
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      fetchAllTvData();
    }
  }, [authToken, selectedtvItemId]);

  const fetchAllTvData = async () => {
    setTvLoading(true);
    setNoData(false);
    try {
      // await fetchAllCinematicsCategory();
      await fetchTvTopVideos();
      await fetchTvSubCategory(selectedtvItemId);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTvLoading(false);
    }
  };
  const fetchAllTvCategory = async () => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "tvProgmax/category/getAll?page=1&limit=10000",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllCategories---", result.AllCategories);
      setTvData(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchTvTopVideos = async () => {
    // console.log("Categry in id", selectedItemId);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "tvProgmax/getTopVideo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      setDataTvTopVideos(result.data);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchTvSubCategory = async (selectedtvItemId) => {
    const token = authToken;

    try {
      const response = await fetch(
        `${base_url}tvProgmax/getByCategory/${selectedtvItemId}?page=1&limit=10000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          // title: category.sub_category_name,
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.video_result.videos,
        }));

        // Reverse the titles
        const reversedSections = formattedSections.reverse();
        // console.log('results---', reversedSections);
        setTvSections(reversedSections);

        // Check if there is no data
        const hasNoData = formattedSections.every(section => section.data.length === 0);
        setNoData(hasNoData);
      } else {
        setTvSections([]);
        setNoData(true);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setNoData(true);  // Assume no data on error
    }
  };


  const renderTvVideoItem = ({ item }) => (
    // <TouchableOpacity onPress={handle_details}>
    <TouchableOpacity onPress={() => navigation.navigate('Tv_Promax_details', { videoData: item })}>
      <View style={styles.itemContainer}>
        {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <Text ellipsizeMode="tail"
          numberOfLines={1} style={styles.nametext}>{item.name}</Text>
        <Text ellipsizeMode="tail"
          numberOfLines={2} style={styles.text1}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTvSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          renderItem={renderTvVideoItem}
          keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  //DISC///////////////////////////////////////////////////////////////////////////////// new dics api 7/7/2024
  // Fetch all data when authToken is set and screen is focused
  const [searchesNewsData, setSearchesNewsData] = useState([]);
  const [Newsections, setNewsSections] = useState([]);
  const [noNewData, setNoNewsData] = useState(false);
  useEffect(() => {
    if (authToken && isFocused) {
      fetchAllNewsCategory();
      fetchTopSport();
      fetchSubCategoryNews(selectedNewsItemId);
    }
  }, [authToken, selectedNewsItemId, isFocused]);

  // Fetch categories
  const fetchAllNewsCategory = async () => {
    setNewLoader(true);
    try {
      const response = await fetch(`${base_url}news/category/getAll?page=1&limit=10000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      const reverseData = result.AllCategories.reverse();
      setSearchesNewsData(reverseData);
      if (selectedNewsItemId === null && result.AllCategories.length > 0) {
        setSelectedNewsItemId(result.AllCategories[0].id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setNewLoader(false);
  };

  // Fetch top sports
  const fetchTopSport = async () => {
    setNewLoader(true);
    try {
      const response = await fetch(`${base_url}news/getTopNews`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      // console.log('what news top,', result.data)
      setTopNewsData(result.data);
    } catch (error) {
      console.error("Error fetching top sports:", error);
    }
    setNewLoader(false);
  };

  // Fetch sub-category sports
  const fetchSubCategoryNews = async (categoryId) => {
    setNewLoader(true);
    try {
      const response = await fetch(`${base_url}news/getAllNewsByCategory/${categoryId}?page=1&limit=100000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          // title: category.sub_category_name,
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.news_result.News,
        }));
        setNewsSections(formattedSections);
        setNoNewsData(formattedSections.every(section => section.data.length === 0));
      } else {
        setNewsSections([]);
        setNoNewsData(true);
      }
    } catch (error) {
      console.error("Error fetching sub-category sports:", error);
      setNoNewsData(true); // Assume no data on error
    }
    setNewLoader(false);
  };

  const renderNewsItem = ({ item }) => (
    // <TouchableOpacity onPress={handle_details}>
    <TouchableOpacity onPress={() => navigation.navigate("ViewNews", { picData: item })}>
      <View style={styles.itemContainer}>
        {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
        <Image source={{ uri: item.image }} style={styles.image} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: hp(7),
            width: wp(25),
          }}
        >
          {item?.user_image ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: "hidden",
                borderRadius: wp(7) / 2,
              }}
            >
              <Image
                source={{ uri: item?.user_image }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                // style={{marginTop: hp(0.5)}}
                name={"account-circle"}
                size={24}
                color={"#FACA4E"}
              />
  
            </View>
          )}

          <View style={{ width: 70 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(0.7),
                color: "#000000",
                fontWeight: "bold",
                fontFamily: "Inter",
              }}
            >
              {item.username}
            </Text>
          </View>
          <View style={{ marginLeft: wp(1) }}>
            <NonVerified />
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );

  const renderNewsSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          renderItem={renderNewsItem}
          keyExtractor={(videoItem) => videoItem.news_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  // QAFI API for Category and sub start 9.9.2024
  // Fetch all data when authToken is set and screen is focused
  const [searchesQAFIData, setSearchesQAFIData] = useState([]);
  const [QAFIsections, setQAFISections] = useState([]);
  const [noQAFIData, setNoQAFIData] = useState(false);
  const [TopQAFIData, setTopQAFIData] = useState([]);
  const [QAFILoading, setQAFILoading] = useState(true);

  useEffect(() => {
    if (authToken && isFocused) {
      fetchAllQAFICategory();
      fetchTopQAFI();
      fetchSubCategoryQAFI(selectedQAFIItemId);
    }
  }, [authToken, selectedQAFIItemId, isFocused]);

  // Fetch categories
  const fetchAllQAFICategory = async () => {
    setQAFILoading(true)
    try {
      const response = await fetch(`${base_url}qafi/category/getAll?page=1&limit=10000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      const reverseData = result.AllCategories.reverse();
      setSearchesQAFIData(reverseData);
 
      if (selectedQAFIItemId === null && result.AllCategories.length > 0) {
        setSelectedQAFIItemId(result.AllCategories[0].id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setQAFILoading(false)
  };

  // Fetch top sports
  const fetchTopQAFI = async () => {
    setQAFILoading(true)
    try {
      const response = await fetch(`${base_url}qafi/getTopQafi`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      setTopQAFIData(result.data);
    } catch (error) {
      console.error("Error fetching top sports:", error);
    }
    setQAFILoading(false)
  };

  // Fetch sub-category sports
  const fetchSubCategoryQAFI = async (selectedQAFIItemId) => {
    setQAFILoading(true)
    try {
      const response = await fetch(`${base_url}qafi/getAllQafisByCategory/${selectedQAFIItemId}?page=1&limit=100000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          // title: category.sub_category_name,
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.QAFI_result.QAFIs,
        }));

        setQAFISections(formattedSections);

        console.log('sub cate hai---', formattedSections)
        setNoQAFIData(formattedSections.every(section => section.data.length === 0));
      } else {
        setQAFISections([]);
        setNoQAFIData(true);
      }
    } catch (error) {
      console.error("Error fetching sub-category sports:", error);
      setNoQAFIData(true); // Assume no data on error
    }
    setQAFILoading(false)
  };

  const renderQAFIItem = ({ item }) => (
    // <TouchableOpacity onPress={handle_details}>
    <TouchableOpacity onPress={() => navigation.navigate("ViewQAFI", { picData: item })}>
      <View style={styles.itemContainer}>

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
              borderRadius: wp(1),
              resizeMode: "cover",
            }}
            source={{ uri: item.image }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(12),
            height: hp(7),
            width: wp(25),
          }}
        >
          {item?.user_image ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: "hidden",
                borderRadius: wp(7) / 2,
              }}
            >
              <Image
                source={{ uri: item?.user_image }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                // style={{marginTop: hp(0.5)}}
                name={"account-circle"}
                size={24}
                color={"#FACA4E"}
              />

            </View>
          )}

          <View style={{ width: 70 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(0.7),
                color: "#000000",
                fontWeight: "bold",
                fontFamily: "Inter",
              }}
            >
              {item.username}
            </Text>
          </View>

          <View style={{ marginLeft: wp(1) }}>
            <NonVerified />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderQAFISection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          renderItem={renderQAFIItem}
          keyExtractor={(videoItem) => videoItem.qafi_id.toString()}
          // keyExtractor={(videoItem, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  // ebc api Category and sub 9/9/2024
  // Fetch all data when authToken is set and screen is focused
  const [searchesEBCData, setSearchesEBCData] = useState([]);
  const [EBCsections, setEBCSections] = useState([]);
  const [noEBCData, setNoEBCData] = useState(false);
  const [TopEBCData, setTopEBCData] = useState([]);
  const [EBCLoading, setEBCLoading] = useState(true);

  useEffect(() => {
    if (authToken && isFocused) {
      fetchAllEBCCategory();
      fetchTopEBC();
      fetchSubCategoryEBC(selectedEBCItemId);

    }
  }, [authToken, selectedEBCItemId, isFocused]);

  // Fetch categories
  const fetchAllEBCCategory = async () => {
    setEBCLoading(true)
    try {
      const response = await fetch(`${base_url}gebc/category/getAll?page=1&limit=10000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      const reverseData = result.AllCategories.reverse();
      setSearchesEBCData(reverseData);
      // if (result.AllCategories.length > 0) {
      //   setSelectedItemId(result.AllCategories[0].id);
      // }
      if (selectedEBCItemId === null && result.AllCategories.length > 0) {
        setSelectedEBCItemId(result.AllCategories[0].id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setEBCLoading(false)
  };

  // Fetch top sports
  const fetchTopEBC = async () => {
    setEBCLoading(true)
    try {
      const response = await fetch(`${base_url}gebc/getTopGebc`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      setTopEBCData(result.data);
    } catch (error) {
      console.error("Error fetching top sports:", error);
    }
    setEBCLoading(false)
  };

  // Fetch sub-category sports
  const fetchSubCategoryEBC = async (selectedEBCItemId) => {
    setEBCLoading(true)
    try {
      const response = await fetch(`${base_url}gebc/getAllGEBCsByCategory/${selectedEBCItemId}?page=1&limit=100000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          // title: category.sub_category_name,
          title:
          language === "fr" && category.sub_category_french_name
              ? category.sub_category_french_name
              : category.sub_category_name,
          data: category.GEBC_result.GEBCs,
        }));
        setEBCSections(formattedSections);
        setNoEBCData(formattedSections.every(section => section.data.length === 0));
      } else {
        setEBCSections([]);
        setNoEBCData(true);
      }
    } catch (error) {
      console.error("Error fetching sub-category sports:", error);
      setNoEBCData(true); // Assume no data on error
    }
    setEBCLoading(false)
  };

  const renderEBCItem = ({ item }) => (
    // <TouchableOpacity onPress={handle_details}>
    <TouchableOpacity onPress={() => navigation.navigate("ViewGEBC", { picData: item })}>
      <View style={styles.itemContainer}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: hp(10),
            borderRadius: wp(1),
            resizeMode: "stretch",
            borderWidth: 1, // Border width
            borderColor: "grey", // Border color
          }}
        >
          <Text style={{ fontSize: hp(5) }}>{item.image}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: hp(7),
            width: wp(25),
          }}
        >
          {item?.user_image ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: "hidden",
                borderRadius: wp(7) / 2,
              }}
            >
              <Image
                source={{ uri: item?.user_image }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                // style={{marginTop: hp(0.5)}}
                name={"account-circle"}
                size={24}
                color={"#FACA4E"}
              />

            </View>
          )}

          <View style={{ width: 70 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(0.7),
                color: "#000000",
                fontWeight: "bold",
                fontFamily: "Inter",
              }}
            >
              {item.username}
            </Text>
          </View>
          <View style={{ marginLeft: wp(1) }}>
            <NonVerified />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEBCSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          renderItem={renderEBCItem}
          keyExtractor={(videoItem) => videoItem.gebc_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );




  const [newLoader, setNewLoader] = useState([]);



  // fetch Market start
  // console.log('market ki id aaaii-----------', selectedItemIdMarket)

  const [selectedItemIdMarket, setSelectedItemIdMarket] = useState(null);
  const [dataElectronics, setDataElectronics] = useState([]);
  const [allMarket, setAllmarket] = useState([]);
  const [dataVehicles, setDataVehicles] = useState([]);
  const [dataClothing, setDataClothing] = useState([]);
  const [marketLoding, setMarketLoading] = useState([]);
  useEffect(() => {
    if (authToken && isFocused) {
      // Ensure selectedItemId has a value
      if (selectedItemIdMarket === null) {
        setSelectedItemIdMarket("Africa");
      }

      setMarketLoading(true);

      fetchAll(selectedItemIdMarket);
      fetchElectronics(selectedItemIdMarket);
      fetchVehicles(selectedItemIdMarket);
      fetchClothing(selectedItemIdMarket);

      setMarketLoading(false);
    }
  }, [authToken, selectedItemIdMarket, isFocused]);

  const [DataTopVideosMarket, setDataTopVideosMarket] = useState([]);
  const fetchTopMarket = async () => {
    const token = authToken;
    try {
      const response = await fetch(base_url + "top/app/top_item", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log('top market hai--', result.topitem[0])
      // return result.topitem[0];
      setDataTopVideosMarket(result.topitem[0]);
    } catch (error) {
      console.error("Error in fetchTopMarket:", error);
    }
  };
  const firstImageUrl = Array.isArray(DataTopVideosMarket.images) && DataTopVideosMarket.images.length > 0
    ? DataTopVideosMarket.images[0].image
    : null;


  const fetchCategoryMarket = async () => {
    //   console.log(' Categories Result', result);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "itemCategory/getAllItemCategories?page=1&limit=1000",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        // console.log('Data ', data);
        const categories = data.AllCategories.map((category) => ({
          // label: category.name,
          label:
          language === "fr" && category.french_name
              ? category.french_name
              : category.name,
          value: category.id.toString(),
        }));

        setCategorySelectMarket(categories);

      } else {
        console.error(
          // "Failed to fetch categories:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error in fetchCategoryMarket:", error);
    }
  };


  const fetchElectronics = async (selectedItemIdMarket) => {
    // console.log("Categry in id", selectedItemId);
    const token = authToken;

    try {
      const response = await fetch(
        base_url +
        `item/getAllItemByCategory/13?page=1&limit=5&region=${selectedItemIdMarket}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("Phones and electronic", result.AllItems);
      setDataElectronics(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchVehicles = async (selectedItemIdMarket) => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        base_url +
        `item/getAllItemByCategory/12?page=1&limit=5&region=${selectedItemIdMarket}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllItems fetch vehicle", result.AllItems);
      setDataVehicles(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchClothing = async (selectedItemIdMarket) => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        base_url +
        `item/getAllItemByCategory/6?page=1&limit=5&region=${selectedItemIdMarket}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllItems fetch cloth", result.AllItems);
      setDataClothing(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };
  const fetchAll = async (selectedItemIdMarket) => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        base_url +
        `item/getAllItemByCategory/5?page=1&limit=5&region=${selectedItemIdMarket}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllItems fetch other item", result.AllItems);
      setAllmarket(result.AllItems);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };


  const fetchElectronicsMarket = async (token, id, picId, marketId) => {
    try {
      const response = await fetch(
        base_url +
        `item/getAllItemByCategory/13?page=1&limit=5&region=${marketId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("electronins -------", result.AllItems);
      return result.AllItems;
      // setDataElectronicsMarket(result.AllItems);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchVehiclesMarket = async (token, id, picId, marketId) => {
    // console.log("market id vehile-------", marketId);
    try {
      const response = await fetch(
        base_url +
        `item/getAllItemByCategory/12?page=1&limit=5&region=${marketId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllItems in vehicle", result.AllItems);
      return result.AllItems; // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchClothingMarket = async (token, id, picId, marketId) => {
    // const token = authToken;

    try {
      const response = await fetch(
        base_url +
        `item/getAllItemByCategory/6?page=1&limit=5&region=${marketId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      return result.AllItems;

    } catch (error) {
      console.error("Error Trending:", error);
    }
  };
  const fetchAllMarket = async (token, id, picId, marketId) => {

    try {
      const response = await fetch(
        base_url +
        `item/getAllItemByCategory/5?page=1&limit=5&region=${marketId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log("all data market", result.AllItems);
      return result.AllItems;
    } catch (error) {
      // console.error("Error in fetchAllMarket:", error);
    }
  };


  // /////Market Start

  const renderAvailableAppsMarket = (item) => {
    // console.log("Items of market zone", item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetails", { ProductDetails: item })
        }
        style={{ width: wp(25.5), margin: 5 }}
      >
        <View>
          {!item?.images[0]?.image ||
            item?.images[0]?.image === "undefined" ||
            item?.images[0]?.image.startsWith("/") ? (
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                width: "100%",
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: "cover",
              }}
              source={appImages.galleryPlaceHolder}
            />
          ) : (
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,

                zIndex: 1,
                width: "100%",
                height: hp(16),
                borderRadius: wp(2.5),
                resizeMode: "cover",
              }}
              source={{ uri: item?.images[0]?.image }}
            />
          )}
        </View>

        <View
          style={{
            position: "absolute",
            top: hp(17),
            left: 3,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2, // Ensure it's on top
          }}
        >
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              fontSize: hp(1.7),
              fontFamily: "Inter",
              color: "black",
              fontWeight: "700",
            }}
          >
            {item?.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSearchesMarket = (item) => {
    // console.log('Regions item', item);
    const isSelected = selectedItemIdMarket === item.name;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            // backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
            backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
          },
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
          {/* {item} */}
          {name}
        </Text>
      </TouchableOpacity>
    );
  };
  //Your FlatList rendering the search ite
  /////////////////////////////////////////////////////////////////////////////////////////////////
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

  const loadSavedApps = async () => {
    try {
      const savedApps = await AsyncStorage.getItem("savedApps");
      if (savedApps) {
        // console.log("saved apps in useeffect --------->", savedApps);
        setSavedApps(JSON.parse(savedApps));
      }
    } catch (error) {
      console.error("Error loading saved apps from AsyncStorage:", error);
    }
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

  const handleItemPress = (category) => {
    setSelectedItemId(category);
    setIsSelectedActive(false); ///
    setcategoryActive(false); ////ye old hai jis ko comment kiya tha
    setSelectedCategory(category);
    setecommerance(category === t('Ecommerce'));
    // setecommerance(category === "E-commerce");
    setSport(category === t('cateSports'));
    // setSport(category === "Sports");
  };

  const renderSearches = (item) => {
    const isSelected = selectedItemId === item;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetailsCategory,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#DDDDDD",
          },
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

  const press_category = () => {
    setIsSelectedActive(!isSelectedActive);
    setSelectedItemId(null); // Deactivate all items when category is pressed
    setSelectedCategory("");
    setecommerance(false);
    setSport(false);
    setcategoryActive(true); //ye old hai jis ko comment kiya tha
  };


  const renderVideoItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Cinematics_details', { videoData: item, identifier: false })}>
      <View style={styles.itemContainer}>
        {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <Text ellipsizeMode="tail"
          numberOfLines={1} style={styles.nametext}>{item.name}</Text>
        <Text ellipsizeMode="tail"
          numberOfLines={2} style={styles.text1}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          renderItem={renderVideoItem}
          keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );


  const renderFanVideoItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Fans_star_details', { videoData: item })}>
      <View style={styles.itemContainer}>
        {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <Text ellipsizeMode="tail"
          numberOfLines={1} style={styles.nametext}>{item.name}</Text>
        <Text ellipsizeMode="tail"
          numberOfLines={2} style={styles.text1}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFanSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          renderItem={renderFanVideoItem}
          keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );



  const renderCinematicSearches = (item) => {
    // console.log("Regions", item);
    const isSelected = selectedCinematicItemId === item.id;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    // console.log('is selected hai---', isSelected)
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedCinematicItemId(item.id);
          console.log("Selected item:", item.id);
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

  const renderFanstartSearches = (item) => {
    // console.log("Regions", item);
    const isSelected = selectedFanstarItemId === item.id;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    // console.log('is selected hai---', isSelected)
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedFanStarItemId(item.id);
          console.log("Selected item:", item.id);
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
    const isSelected = selectedKidItemId === item.id;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedKidItemId(item.id);
          console.log("Selected item:", item.id);
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

  const renderKidVideoItem = ({ item }) => (
    // <TouchableOpacity onPress={handle_details}>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Kids_vid_details", { videoData: item })
      }
    >
      <View style={styles.itemContainer}>
        {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.nametext}>
          {item.name}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.text1}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderKidSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          renderItem={renderKidVideoItem}
          keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );


  const renderLearnSearches = (item) => {
    // console.log("Regions", item);
    const isSelected = selectedlearnItemId === item.id;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    // console.log('is selected hai---', isSelected)
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedLearnItemId(item.id);
          console.log("Selected item:", item.id);
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

  const renderLearnVideoItem = ({ item }) => (
    // <TouchableOpacity onPress={handle_details}>
    <TouchableOpacity onPress={() => navigation.navigate('Learning_details', { videoData: item })}>
      <View style={styles.itemContainer}>
        {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <Text ellipsizeMode="tail"
          numberOfLines={1} style={styles.nametext}>{item.name}</Text>
        <Text ellipsizeMode="tail"
          numberOfLines={2} style={styles.text1}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderLearnSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('Dashboard.NoDataavailable')}</Text>
      ) : (
        <FlatList
          data={item.data}
          renderItem={renderLearnVideoItem}
          keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );

  const renderTvSearches = (item) => {
    const isSelected = selectedtvItemId === item.id;
    const name = language === "fr" && item.french_name ? item.french_name : item.name;
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedTvItemId(item.id);
          console.log("Selected item:", item.id);
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

  const top_post_date = convertTimeAndDate(topLetterData.post_date );
  return (
    <View
      pointerEvents="auto"
      style={aLoader ? styles.containerBlur : styles.container}
    >
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={{ marginTop:Platform.OS =="ios"? 0: hp(6), width: "100%" }}>
        {/* {console.log("Navigation object:", navigation)} */}
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
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginHorizontal: wp(5) }}
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
                <Text style={{ color: "white" }}>{t('Dashboard.AddtoFavorites')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (favouriteItem) {
                    const updatedInstallData = dataApps.filter(
                      (item) => item.bundle !== favouriteItem.bundle
                    );
                    setDataApps(updatedInstallData);
                    setIsCancelModalVisible(false);
                    setIsLongPress(false);
                  }
                }}
                style={styles.overlayButton}
              >
                <Text style={{ color: "white" }}>
                  {t('Dashboard.RemoveFromWotchaGotchaApp')}

                  {/* Remove From Wotcha Gotcha App */}
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
                    } else {
                      // Item doesn't exist, add it to favouriteData
                      setFavouriteData((prevData) => [
                        ...prevData,
                        favouriteItem,
                      ]);
                      console.log("Add to Favorites pressed for:");
                    }

                    setIsLongPressRemove(false);
                  }
                }}
                style={styles.overlayButton}
              >
                <Text style={{ color: "white" }}>{t('Dashboard.RemoveFavorites')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (removeFavouriteItem) {
                    const updatedInstallData = dataApps.filter(
                      (item) => item.bundle !== removeFavouriteItem.bundle
                    );
                    setDataApps(updatedInstallData);
                    setIsCancelModalVisible(false);
                    setIsLongPressRemove(false);
                  } else {
                    setIsCancelModalVisible(false);
                    setIsLongPressRemove(false);
                  }
                }}
                style={styles.overlayButton}
              >
                <Text style={{ color: "white" }}>
                  {t('Dashboard.RemoveFromWotchaGotchaApp')}
                  {/* Remove From Wotcha Gotcha App */}
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
          barStyle="dark-content"
        />

        <View style={{ marginTop: hp(1) }}></View>

        {/* // start of banner slider */}

        <BannerCarousel
          isLoading={isLoading}
          adsData={adsData}
          noDataMessage={t('Dashboard.NoTopBanner')}
          onBannerPress={handleBannerPress}
        />

        {Platform.OS != "ios" ?
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
              data={MassApp}
              renderItem={({ item }) => renderSearches(item)}
            />
          </View> : <View>
            <Text>{t('NoDataAvailable')}</Text>
          </View>
        }




        {categoryActive ? (
          Platform.OS != "ios" && (
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
                                 <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                          {t('Dashboard.NoTopApps')}
                        </Text>
                      </View>
                    ) : (
                      <FlatList
                        style={{ margin: 8, flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        data={topData}
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
                  {t('Dashboard.PhoneBasedApps')}
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
                  {t('Dashboard.FavouriteApps')}
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
                            color:'gray'
                          }}
                        >
                          {t('Dashboard.NoFavouriteApps')}
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
                  {t('Dashboard.UnusedApps')}
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
          )

        ) : (
          <>
            {/* {ecommerance && selectedCategory === "E-commerce" && ( */}
            {ecommerance && selectedCategory === t('Ecommerce') && (
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
                                    <TouchableOpacity
                                      key={index}
                                      onPress={() => openCategoryApp(app)}
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
                                        {app.label.substring(0, 10)}
                                      </Text>
                                    </TouchableOpacity>
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
                          {t('Dashboard.addEcommernceapps')}

                          {/* Your can add E-commernce apps here */}
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "70%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

            {selectedCategory ===  t('Business') && (
            // {selectedCategory === "Business" && (
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
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => openCategoryApp(app)}
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
                                  </TouchableOpacity>
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
                          {t('Dashboard.addBussinessapps')}
                          {/* Your can add Bussiness apps here */}
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "70%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_b(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === t('cateSports') && (
            // {selectedCategory === "Sports" && (
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
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => openCategoryApp(app)} 
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
                                </TouchableOpacity>
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
                          {t('Dashboard.addSportsapps')}
                          {/* Your can add Sports apps here */}
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "70%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_sp(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory ===  t('Education') && (
            // {selectedCategory === "Education" && (
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
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => openCategoryApp(app)} 
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
                                </TouchableOpacity>
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
                          {t('Dashboard.addEducationapps')}
                          {/* Your can add Education apps here */}
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "70%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_e(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === t('Dating') && (
            // {selectedCategory === "Dating" && (
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
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => openCategoryApp(app)} 
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
                                </TouchableOpacity>
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
                          {t('Dashboard.addDatingapps')}
                          {/* Your can add Dating apps here */}
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "70%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_d(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === t('FoodDelivery') && (
            // {selectedCategory === "Food Delivery" && (
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
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => openCategoryApp(app)}
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
                                </TouchableOpacity>
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
                          {t('Dashboard.addFoodDeliveryapps')}
                          {/* Your can add Food Delivery apps here */}
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "70%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_fd(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === t('SocialMedia') && (
            // {selectedCategory === "Social Media" && (
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
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => openCategoryApp(app)}
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
                                </TouchableOpacity>
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
                          {t('Dashboard.addSocialMediaapp')}
                          {/* you can add Social Media app here */}
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "70%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_sm(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === t('MedicalWellness') && (
            // {selectedCategory === "Medical Wellness" && (
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
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => openCategoryApp(app)}
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
                                </TouchableOpacity>
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
                          {t('Dashboard.addMedicalwallnessapp')}
                          {/* You can Medical wallness app here */}
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "70%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_mw(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === t('Grocery') && (
            // {selectedCategory === "Grocery" && (
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
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => openCategoryApp(app)}
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
                                </TouchableOpacity>
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
                          {t('Dashboard.addGroceryapps')}
                          {/* You can add Grocery apps here */}
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "70%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_g(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {selectedCategory === t('Employment') && (
            // {selectedCategory === "Employment" && (
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
                              margin: "2%",
                            }}
                          >
                            {savedApps_em
                              .slice(rowIndex * 5, (rowIndex + 1) * 5)
                              .map((app, index) => (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => openCategoryApp(app)}
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
                                </TouchableOpacity>
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
                          {t('Dashboard.addEmploymentapps')}
                          {/* Your can add Employment apps here */}
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={{ position: "absolute", top: "70%", right: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible_em(true)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </>
        )}
        {/* //////////////// ///////////////////////////////////////////////////////////////////////abouve for comments */}
        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}

        {/* Video Mania */}
        <View style={styles.latestSearchList}>
          <View>

            <VideoActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: 'center' }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Xpisearches}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderSearchesVideo(item)}
          />
        </View>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom: 30 }}
        >
          <View style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
            {DataTopXpiData === undefined ? (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "contain",
                }}
                source={appImages.galleryPlaceHolder}
              />
            ) : (
              <TouchableOpacity style={{ width: '100%', height: "100%", borderRadius: wp(5) }} onPress={() => navigation.navigate('VideoPlayerScreen', { videoUri: DataTopXpiData.video, identifier: false })}>
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "contain",
                  }}
                  source={appImages.videoPlaceHolder}
                // source={{ uri: DataTopXpiData?.thumbnail }}
                />
              </TouchableOpacity>
            )}
            <View
              style={{
                position: "absolute",
                top: hp(16),
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2, // Ensure it's on top
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontSize: hp(2.5),
                  fontFamily: "Inter-Medium",
                  color: "black",
                  fontWeight: "700",
                  marginLeft: 12
                }}
              >
                {DataTopXpiData?.name}
              </Text>
            </View>
          </View>

          <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={7}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: "Inter-Regular",
                color: "#000000",
                //fontWeight: '700',
              }}
            >
              {DataTopXpiData === undefined || DataTopXpiData === 0
                ? "No Top Pic Shown"
                : DataTopXpiData?.description}
            </Text>
          </View>
        </View>

        <View style={{
          flex: 1, marginTop: hp(2),
          marginBottom: hp(5)
        }}>
          {isXpiLoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : noXpiData ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                        
              <Text style={{ fontFamily: "Inter-Regular", color:'gray'}}>{t('Dashboard.NoDataavailable')}</Text>
            </View>

          ) : (
            <FlatList
              data={Xpisections}
              renderItem={renderXpiVideoSection}
              keyExtractor={(item) => item.title}
            />
          )}
        </View>

        {/* /////////////////////////////////////////////////////////////// */}
        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
      
        {/* //////////////////////////////////////////////////////////// */}

        <View style={[styles.latestSearchList, { marginLeft: wp(1) }]}>
          <View>
            <ProfileActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Picsearches}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderSearchesPic(item)}
          />
        </View>

        <View

          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(15) }}
        >
          <View
            onPress={() => console.log("TOP DETAILS", DataTopPicData)}
            style={{
              width: wp(35),
              marginLeft: wp(2.5),
              height: "100%",
              borderRadius: wp(5),
            }}
          >
            {!DataTopPicData?.image ||
              DataTopPicData?.image === "undefined" ||
              DataTopPicData?.image.startsWith("/") ? (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={appImages?.galleryPlaceHolder}
              />
            ) : (
              <TouchableOpacity style={{ width: "100%", height: "100%", borderRadius: wp(3) }}
                onPress={() => navigation.navigate("TopPicView", { picData: DataTopPicData })}>
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                  source={{ uri: DataTopPicData?.image }}
                />
              </TouchableOpacity>
            )}

          </View>

          <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2, marginLeft: '2%' }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={7}
              style={{
                fontSize: hp(1.5),
                lineHeight: hp(2),
                fontFamily: "Inter-Regular",
                color: "#000000",
                //fontWeight: '700',
              }}
            >
              {DataTopPicData === 0 === undefined || DataTopPicData === 0
                ? "No Top Pic Shown"
                : DataTopPicData?.description}
            </Text>
          </View>
        </View>

        <View style={{
          flex: 1, marginTop: hp(2),
          marginBottom: hp(5)
        }}>
          {isPicLoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : noPicData ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            > 
              <Text style={{ fontFamily: "Inter-Regular",  color:'gray'}}>{t('Dashboard.NoDataavailable')}</Text>
            </View>

          ) : (
            <FlatList
              data={Picsections}
              renderItem={renderPicsSection}
              keyExtractor={(item) => item.title}
            />
          )}
        </View>

        {/* /////////////////////////////////////////////////////////////// */}
        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}

        {/* News module start */}
        <View style={styles.latestSearchList}>
          <View>
            <News name="news" size={28} color="#FACA4E" />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesNewsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderNewsSearches(item)}
          />
        </View>

        <View
          style={{
            marginTop: hp(1.5),
            marginBottom: hp(1),
            flexDirection: "row",
            height: hp(18),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewNews", { picData: topNewsData })}
          >
            {topNewsData === undefined ||
              topNewsData.length === 0 ||
              topNewsData.image === undefined ||
              topNewsData.image === null ||
              topNewsData.image === "" ||
              topNewsData.image === "0" ? (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                  source={appImages.galleryPlaceHolder}
                />
              </View>
            ) : (
              <View
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,

                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                  source={{ uri: topNewsData.image }}
                />
              </View>
            )}
          </TouchableOpacity>
          <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={7}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: "Inter-Regular",
                color: "#000000",
                //fontWeight: '700',
              }}
            >
              {topNewsData === undefined || topNewsData === 0
                ? "No Top News Shown"
                : topNewsData?.description}
            </Text>
          </View>
        </View>

        {/* //////////////////////////////////////////////////////////// */}
        <View style={{
          flex: 1, marginTop: hp(2),
          marginBottom: hp(5)
        }}>
          {newLoader ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : noNewData ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "Inter-Regular", color:'gray'}}>{t('Dashboard.NoDataavailable')}</Text>
            </View>

          ) : (
            <FlatList
              data={Newsections}
              renderItem={renderNewsSection}
              keyExtractor={(item) => item.title}
            />
          )}
        </View>

        {/* /////////////////////////////////////////////////////////////// */}

        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}
        {/* News module end */}

        {/* Post letter module start */}
        <View style={styles.latestSearchList}>
          <View>
            <LetterIcon name="newsletter" size={30} color="#FACA4E" />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={lettersearchesData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderPostLetterSearches(item)}
          />
        </View>

        <View
          style={{
            marginTop: hp(1.5),
            marginBottom: hp(.1),
            flexDirection: "row",
            height: hp(14),
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("LetterDetails", {
                Letters: topLetterData,
                identifier: false,
              })
            }
            style={{
              width: wp(45),
              marginHorizontal: wp(2),
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
                {topLetterData?.userimage !== null ||
                  topLetterData?.userimage !== undefined ? (
                  <View
                    style={{
                      height: hp(2),
                      width: wp(4),
                      borderRadius: wp(3),
                    }}
                  >
                    <Image
                      source={{ uri: topLetterData?.userimage }}
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
                  height: 10,
                  // marginRight: wp(1),
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
                  {top_post_date}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  height: hp(5),
                  paddingTop: 6,
                  // backgroundColor:'red', width:'60%'
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
                  {/* Subject: */}
                  {t('Dashboard.Subject')}
                </Text>
                <View style={{ height: "100%", width: "75%" }}>
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
                    {topLetterData.subject_place}
                  </Text>
                </View>
              </View>
              <View
                style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
              ></View>
            </View>
          </TouchableOpacity>
        </View>

 {/* //////////////////////////////////////////////////////////// */}
 <View style={{  flex: 1,
    marginBottom: hp(5)}}>
      {postletterloading ? (
        <ActivityIndicator size="large" color="#FACA4E" />
      ) : noletterData ? (
        <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
         <Text style={{ fontFamily: "Inter-Medium",}}>{t('NoDataAvailable')}</Text>
      </View>
       
      ) : (
        <FlatList
          data={lettersections}
          renderItem={renderLetterSection}
          keyExtractor={(item) => item.title}
        />
      )}
    </View>

{/* /////////////////////////////////////////////////////////////// */}


   

        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}

        {/* Post letter module end */}

        {/* QAFI Module start */}
        <View style={styles.latestSearchList}>
          <View>
            <QafiIcon name="people-arrows" size={22} color="#FACA4E" />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesQAFIData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderQAFISearches(item)}
          />
        </View>

        <View
          style={{
            marginTop: hp(1.5),
            marginBottom: hp(1),
            flexDirection: "row",
            height: hp(18),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewQAFI", { picData: TopQAFIData })}
          >
            {TopQAFIData === undefined ||
              TopQAFIData.length === 0 ||
              TopQAFIData.image === undefined ||
              TopQAFIData.image === null ||
              TopQAFIData.image === "" ||
              TopQAFIData.image === "0" ? (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                  source={appImages.galleryPlaceHolder}
                />
              </View>
            ) : (
              <View
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,

                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                  source={{ uri: TopQAFIData.image }}
                />
              </View>
            )}
          </TouchableOpacity>

          <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={7}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: "Inter-Regular",
                color: "#000000",
                //fontWeight: '700',
              }}
            >
              {TopQAFIData === undefined || TopQAFIData === 0
                ? "No Top QAFI Shown"
                : TopQAFIData?.description}
            </Text>
          </View>
        </View>

        {/* //////////////////////////////////////////////////////////// */}
        <View style={{
          flex: 1, marginTop: hp(2),
          marginBottom: hp(5)
        }}>
          {QAFILoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : noQAFIData ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "Inter-Medium", color:'gray' }}>{t('Dashboard.NoDataavailable')}</Text>
            </View>

          ) : (
            <FlatList
              data={QAFIsections}
              renderItem={renderQAFISection}
              keyExtractor={(item) => item.title}
            />
          )}
        </View>

        {/* /////////////////////////////////////////////////////////////// */}

        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}
        {/* QAFI Module end*/}

        {/* EBC Module start */}

        <View style={styles.latestSearchList}>
          <View>
            <EBC name="sticker-emoji" size={30} color="#FACA4E" />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesEBCData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderEBCSearches(item)}
          />
        </View>
        <View
          style={{
            marginTop: hp(1.5),
            marginBottom: hp(1),
            flexDirection: "row",
            height: hp(18),
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewGEBC", { picData: TopEBCData })}
          >
            {TopEBCData === undefined ||
              TopEBCData.length === 0 ||
              TopEBCData.image === undefined ||
              TopEBCData.image === null ||
              TopEBCData.image === "" ||
              TopEBCData.image === "0" ? (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                  source={appImages.galleryPlaceHolder}
                />
              </View>
            ) : (
              <View
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: hp(10),
                    borderRadius: wp(1),
                    resizeMode: "stretch",
                    borderWidth: 1, // Border width
                    borderColor: "grey", // Border color
                  }}
                >
                  <Text style={{ fontSize: hp(5) }}>{TopEBCData.image}</Text>
                </View>
               
              </View>
            )}
          </TouchableOpacity>
          <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2, marginLeft: '2%' }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={7}
              style={{
                fontSize: hp(1.5),
                lineHeight: hp(2),
                fontFamily: "Inter-Regular",
                color: "#000000",
                //fontWeight: '700',
              }}
            >
              {TopEBCData === undefined || TopEBCData === 0
                ? "No Top EBC Shown"
                : TopEBCData?.description}
            </Text>
          </View>
        </View>

        {/* //////////////////////////////////////////////////////////// */}
        <View style={{
          flex: 1, marginTop: hp(2),
          marginBottom: hp(5)
        }}>
          {EBCLoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : noEBCData ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "Inter-Medium", color:'gray' }}>{t('Dashboard.NoDataavailable')}</Text>
            </View>

          ) : (
            <FlatList
              data={EBCsections}
              renderItem={renderEBCSection}
              keyExtractor={(item) => item.title}
            />
          )}
        </View>

        {/* /////////////////////////////////////////////////////////////// */}

        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}
        {/* EBC Module End */}

        {/* Cinematics Moodule Start */}
        <View style={styles.latestSearchList}>
          <View>
            <Cinematiceactive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Cinematicdata}
            //keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderCinematicSearches(item)}
          />
        </View>

        <View style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom: 30 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cinematics_details', { videoData: dataTopVideos, identifier: false })} style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
            {dataTopVideos === 0 ? (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={appImages.galleryPlaceHolder}
              />
            ) : (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={{ uri: dataTopVideos?.thumbnail }}
              />
            )}
            <View
              style={{
                position: "absolute",
                top: hp(16),
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2, // Ensure it's on top
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontSize: hp(2.5),
                  fontFamily: "Inter-Medium",
                  color: "black",
                  fontWeight: "700",
                }}
              >
                {dataTopVideos?.name}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={7}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: "Inter-Regular",
                color: "#000000",
                //fontWeight: '700',
              }}
            >
  

              {dataTopVideos === undefined || dataTopVideos === 0
                ? "No Top Pic Shown"
                : dataTopVideos?.description}
            </Text>
          </View>
        </View>

        <View style={{
          flex: 1,
          paddingTop: 20
        }}>
          {cinLoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : (
            <FlatList
              data={sections}
              renderItem={renderSection}
              keyExtractor={(item) => item.title}
            />
          )}
        </View>
        {/* Cinematics Moodule end */}

        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}

        {/* Fan star zone start */}
        <View style={styles.latestSearchList}>
          <View>
            <FansActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={fandata}
            //keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderFanstartSearches(item)}
          />
        </View>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom: 30 }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Fans_star_details', { videoData: dataTopFanVideos })} style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
            {dataTopFanVideos === 0 ? (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={appImages.galleryPlaceHolder}
              />
            ) : (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={{ uri: dataTopFanVideos?.thumbnail }}
              />
            )}
            <View
              style={{
                position: "absolute",
                top: hp(16),
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2, // Ensure it's on top
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontSize: hp(2.5),
                  fontFamily: "Inter-Medium",
                  color: "black",
                  fontWeight: "700",
                }}
              >
                {dataTopFanVideos?.name}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={7}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: "Inter-Regular",
                color: "#000000",
                //fontWeight: '700',
              }}
            >
              {dataTopFanVideos === undefined || dataTopFanVideos === 0
                ? "No Top Pic Shown"
                : dataTopFanVideos?.description}
            </Text>
          </View>
        </View>

        <View style={{
          flex: 1,
          paddingTop: 20
        }}>
          {fanLoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : (
            <FlatList
              data={fansections}
              renderItem={renderFanSection}
              keyExtractor={(item) => item.title}
            />
          )}
        </View>

        {/* /////////////////////////////////////////////////////////////// */}
        {/* fan star zone end */}

        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}

        {/* Kids Vid Start */}
        <View style={styles.latestSearchList}>
          <View>
            <KidsActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            //data={regions}
            data={kiddata}
            //keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderKidsSearches(item)}
          />
        </View>

        <View
          style={{
            marginTop: hp(1.5),
            flexDirection: "row",
            height: hp(16),
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Kids_vid_details", {
                videoData: dataKidTopVideos,
              })
            }
            style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}
          >
            {dataKidTopVideos === 0 ? (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={appImages.galleryPlaceHolder}
              />
            ) : (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={{ uri: dataKidTopVideos?.thumbnail }}
              />
            )}
            <View
              style={{
                position: "absolute",
                top: hp(16),
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2, // Ensure it's on top
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontSize: hp(2.5),
                  fontFamily: "Inter-Medium",
                  color: "black",
                  fontWeight: "700",
                }}
              >
                {dataKidTopVideos?.name}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              justifyContent: "flex-start",
              width: "50%",
              paddingTop: 2,
            }}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={7}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: "Inter-Regular",
                color: "#000000",
                //fontWeight: '700',
              }}
            >
   

              {dataKidTopVideos === undefined || dataKidTopVideos === 0
                ? "No Top Pic Shown"
                : dataKidTopVideos?.description}
            </Text>
          </View>
        </View>

        {/* //////////////////////////////////////////////////////////// */}
        <View style={{ flex: 1, paddingTop: 20 }}>
          {kidLoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : (
            <FlatList
              data={kidsections}
              renderItem={renderKidSection}
              keyExtractor={(item) => item.title}
            />
          )}
        </View>

        {/* /////////////////////////////////////////////////////////////// */}
        {/* Kids Vid End */}

        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}

        <View style={styles.latestSearchList}>
          <View>
            <PuzzleActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            //data={regions}
            data={learndata}
            //keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderLearnSearches(item)}
          />
        </View>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom: 30 }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Learning_details', { videoData: datalearnTopVideos })} style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
            {datalearnTopVideos === 0 ? (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={appImages.galleryPlaceHolder}
              />
            ) : (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={{ uri: datalearnTopVideos?.thumbnail }}
              />
            )}
            <View
              style={{
                position: "absolute",
                top: hp(16),
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2, // Ensure it's on top
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontSize: hp(2.5),
                  fontFamily: "Inter-Medium",
                  color: "black",
                  fontWeight: "700",
                }}
              >
                {datalearnTopVideos?.name}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={7}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: "Inter-Regular",
                color: "#000000",
                //fontWeight: '700',
              }}
            >
              {datalearnTopVideos === undefined || datalearnTopVideos === 0
                ? "No Top Pic Shown"
                : datalearnTopVideos?.description}
            </Text>
          </View>
        </View>

        {/* //////////////////////////////////////////////////////////// */}
        <View style={{
          flex: 1,
          paddingTop: 20
        }}>
          {learnLoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : (
            <FlatList
              data={learnsections}
              renderItem={renderLearnSection}
              keyExtractor={(item) => item.title}
            />
          )}
        </View>

        {/* /////////////////////////////////////////////////////////////// */}
        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}


        <View style={styles.latestSearchList}>
          <View>
            <TVpromaxActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            //data={regions}
            data={tvdata}
            //keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderTvSearches(item)}
          />
        </View>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom: 30 }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Tv_Promax_details', { videoData: datatvTopVideos })} style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
            {datatvTopVideos === undefined ? (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={appImages.galleryPlaceHolder}
              />
            ) : (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
                source={{ uri: datatvTopVideos?.thumbnail }}
              />
            )}
            <View
              style={{
                position: "absolute",
                top: hp(16),
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2, // Ensure it's on top
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontSize: hp(2.5),
                  fontFamily: "Inter-Medium",
                  color: "black",
                  fontWeight: "700",
                }}
              >
                {datatvTopVideos?.name}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ justifyContent: "flex-start", width: "50%", paddingTop: 2 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={7}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: "Inter-Regular",
                color: "#000000",
                //fontWeight: '700',
              }}
            >
              {datatvTopVideos === undefined || datatvTopVideos === 0
                ? "No Top Pic Shown"
                : datatvTopVideos?.description}
            </Text>
          </View>
        </View>

        {/* //////////////////////////////////////////////////////////// */}
        <View style={{
          flex: 1,
          paddingTop: 20
        }}>
          {tvLoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : (
            <FlatList
              data={tvsections}
              renderItem={renderTvSection}
              keyExtractor={(item) => item.title}
            />
          )}
        </View>

        {/* /////////////////////////////////////////////////////////////// */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}


        {/* Market Zone */}

        <View style={styles.latestSearchListMarket}>
          <View>
            <MarketActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            //data={regions}
            data={RegionArea}
            //keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderSearchesMarket(item)}
          />
        </View>

        <View
          style={{ marginTop: hp(2), flexDirection: "row", height: hp(16) }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetails", { ProductDetails: DataTopVideosMarket })
            }>
            <View style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
              {firstImageUrl === 0 ? (
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                  source={appImages.galleryPlaceHolder}
                />
              ) : (
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                  source={{ uri: firstImageUrl }}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={{ width: "50%", }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={7}
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: "Inter-Regular",
                color: "#000000",
                //fontWeight: '700',
              }}
            >
              {dataTopVideos === undefined || dataTopVideos === 0
                ? "No Top Pic Shown"
                : dataTopVideos?.description}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: hp(4), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              //marginLeft: wp(3),
              fontFamily: "Inter-SemiBold",
              color: "#4A4A4A",
            }}
          >
            {categoriesSelectMarket[0]?.label}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {marketLoding === true ? (
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
                {dataElectronics?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                      {t('Dashboard.NoDataavailable')}
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={dataElectronics}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsMarket(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ marginTop: hp(4), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: "Inter-SemiBold",
              color: "#4A4A4A",
            }}
          >
            {categoriesSelectMarket[1]?.label}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {marketLoding === true ? (
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
                {/* {dummydataVehicles?.length === 0 ? ( */}
                {dataVehicles?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                   <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                      {t('Dashboard.NoDataavailable')}
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={dataVehicles}
                    // data={dummydataVehicles}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsMarket(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ marginTop: hp(4), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              // marginLeft: wp(3),
              fontFamily: "Inter-SemiBold",
              color: "#4A4A4A",
            }}
          >
            {categoriesSelectMarket[2]?.label}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {marketLoding === true ? (
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
                {dataClothing?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                      {t('Dashboard.NoDataavailable')}
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={dataClothing}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsMarket(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ marginTop: hp(4), height: hp(23) }}>
          <Text
            style={{
              fontSize: hp(2.3),
              fontFamily: "Inter-SemiBold",
              color: "#4A4A4A",

            }}
          >
            {categoriesSelectMarket[3]?.label}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
            {marketLoding === true ? (
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
                {allMarket?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                      {t('Dashboard.NoDataavailable')}
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={allMarket}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderAvailableAppsMarket(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
        {/* market zone end */}

        {/* // start of banner slider */}
        <BannerCarousel
          isLoading={isLoading}
          adsData={adsInActiveData}
          noDataMessage={t('Dashboard.NoBanner')}
          onBannerPress={handleBannerPress}
        />
        {/* ////slider end */}

      </ScrollView>

      <RBSheet
        ref={ref_RBSheetCamera}
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
            height: hp(25),
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
          <Text style={styles.maintext}>{t('Dashboard.Selectanoption')}</Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: hp(3),
          }}
        >
          <TouchableOpacity
            onPress={() => takePhotoFromCamera("camera")}
            style={
              selectedItem === "camera"
                ? styles.selectedItems
                : styles.nonselectedItems
            }
          >
            <Ionicons
              color={selectedItem === "camera" ? "#FACA4E" : "#888888"}
              name="camera"
              size={25}
            />

            <Text style={{ color: "#333333" }}>{t('Dashboard.Fromcamera')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => choosePhotoFromLibrary("gallery")}
            style={
              selectedItem === "gallery"
                ? styles.selectedItems
                : styles.nonselectedItems
            }
          >
            <MaterialCommunityIcons
              color={selectedItem === "gallery" ? "#FACA4E" : "#888888"}
              name="image"
              size={25}
            />

            <Text style={{ color: "#333333" }}>{t('Dashboard.Fromgallery')}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {aLoader && <ActivityIndicator size="large" color="#FACA4E" />}
      </View> */}

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
                    <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
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
                    <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_b}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
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
                    <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_sp}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
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
                    <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_e}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
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
                    <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_d}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
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
                    <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_fd}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
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
                    <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_sm}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
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
                    <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_mw}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
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
                    <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
                    <View style={{ left: "100%" }}>
                      <TouchableOpacity
                        onPress={handleSave_g}
                        style={{ height: 30, width: 30, paddingLeft: 4 }}
                      >
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
              ) :
                (
                  <>
                    <View style={styles.leftContent1}>
                      <Text style={styles.leftText1}>{t('Dashboard.YourApps')}</Text>
                      <View style={{ left: "100%" }}>
                        <TouchableOpacity
                          onPress={handleSave_em}
                          style={{ height: 30, width: 30, paddingLeft: 4 }}
                        >
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
                )
              }
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
  container: {
    flex: 1,
    //marginHorizontal: wp(3),
    backgroundColor: "white",
  },
  bannerview: {
    height: hp(15),
    marginTop: hp(2),
    marginBottom: hp(1),
    alignSelf: "center",
    resizeMode: "cover",
    width: "100%",
    borderRadius: wp(2),
    paddingHorizontal: wp(5),
  },
  TopBannerView: {
    height: '100%', width: '100%', borderWidth: 1, borderColor: 'gray', borderRadius: 10, flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerBlur: {
    flex: 1,
    // backgroundColor: "rgba(234,233,238)",
    backgroundColor: 'white'
  },
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
    // padding: 10,
    paddingHorizontal:wp(3),
    paddingVertical:hp(1.4),
    backgroundColor: "#F2F2F2",
    borderRadius: wp(5),
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

  // Category Styles
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
  //---------------\\

  //video styles
  latestSearchListVideo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },
  ti: {
    marginHorizontal: "7%",
    marginTop: "5%",
    width: 300,
    backgroundColor: "white",
    fontSize: wp(4),
    paddingLeft: "2%",
    borderRadius: 10,
  },
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: "98%",
    borderColor: "#FACA4E",

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: "98%",
    borderColor: "#E7EAF2",
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  iconStyle: {
    color: "#C4C4C4",
    width: 20,
    height: 20,
  },
  iconStyleInactive: {
    color: "#FACA4E",
  },
  maintext: {
    fontSize: hp(2.3),
    color: "#303030",
    fontWeight: "bold",
  },
  modaltextview: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: wp(90),
    borderRadius: 25,
    backgroundColor: "white",
    paddingHorizontal: wp(15),
  },
  optiontext: {
    fontSize: hp(1.7),
    color: "#303030",
    marginLeft: wp(4),
  },
  nonselectedItems: {
    width: wp(35),
    justifyContent: "space-evenly",
    alignItems: "center",
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: "#E7EAF2",
  },
  selectedItems: {
    width: wp(35),
    justifyContent: "space-evenly",
    alignItems: "center",
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: "#FACA4E",
  },

  // Disc Styles
  searchesDetailsDisc: {
    flexDirection: "row",
    marginLeft: wp(3),
    alignItems: "center",
    justifyContent: "center",
    width: wp(25),
    backgroundColor: "#F2F2F2",
    borderRadius: wp(5),
    height: hp(5),
  },
  latestSearchListDisc: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),
  },

  //---------------\\

  // Pic tour styles

  latestSearchListPicss: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },

  latestSearchListMarket: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),

    //borderWidth: 3,
  },
  latestSearchList: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: hp(1),
    height: hp(7),

  },
  searchesDetailsCategory: {
    flexDirection: "row",
    marginLeft: wp(3),
    alignItems: "center",
    justifyContent: "center",
    // width: wp(30),
    backgroundColor: "#F2F2F2",
    borderRadius: wp(5),
    // height: hp(5),
    paddingHorizontal:wp(3),
    paddingVertical:hp(1.3),

  },
  // ///////////////////////////

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
  text: {
    marginTop: 5,
    fontSize: hp(2.3),
    marginLeft: wp(1),
    fontFamily: "Inter-Bold",
    color: "#4A4A4A",
  },
  textname: {

    marginTop: 5,
    fontSize: hp(1.8),
    fontFamily: "Inter-SemiBold",
    color: "#4A4A4A",
  },
  itemContainer: {
    marginRight: wp(2),
    width: wp(35),
    // alignItems: "center",
  },
  text1: {
    color: "#4A4A4A",
    fontSize: hp(1.5),
    fontFamily: "Inter",

  },

  image: {
    width: wp(35),
    height: hp(12),
    resizeMode: "cover",
    borderRadius: 10,
  },
  nametext: {
    fontWeight: "700",
    color: "#4A4A4A",
    fontSize: hp(2),
    // textAlign: 'left',
    fontFamily: "Inter",
    marginTop: 5,
    fontSize: hp(1.9),
    // right: "20%",
  },


  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {

    color: "#4A4A4A",
    fontSize: hp(2.3),
    textAlign: "left",
    fontFamily: "Inter-SemiBold",
    marginBottom: 6
    // top: "6%",
  },
  videoItem: {
    marginRight: 15,
  },

  noDataText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    color: 'gray',
  },
  NoDataView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataText: {
    fontWeight: "500", fontSize: hp(2.1)
  }
});
