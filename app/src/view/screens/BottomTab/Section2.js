////////////////////////31/5/2024 ko ye Dashboard with section list

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
  SectionList
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Headers from '../../../assets/Custom/Headers';
import {appImages} from '../../../assets/utilities';

//---------------- IMPORTS OF DASHBOARD ----------------------\\

import {InstalledApps, RNLauncherKitHelper} from 'react-native-launcher-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

//----------------- IMPORT VIDE0 -------------------\\
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
//----------------------------------------------------\\
//------------------IMPORT OF DISC --------------------\\
import NonVerified from '../../../assets/svg/NonVerified.svg';
import CustomModal from '../../../assets/Custom/CustomModal';

const headings = [
  { title: "Trending Videos" },
  { title: "Recent Videos" },
  { title: "Top Videos" },
  { title: "Most Viewed Videos" },
  { title: "Most Commented Videos" },
  { title: "Video Categories" },
  { title: "QAFIs" },
  { title: "GEBCs" },
  { title: "Public General Letters" },
  { title: "Public Celebrity Letters" },
  { title: "Private Friends Letters" },
  { title: "Top QAFIs" },
  { title: "News" },
  { title: "Private Celebrity Letters" },
  { title: "Picture Categories" },
  { title: "Items" }
];import { base_url } from '../../../../../baseUrl';

export default function Dashboard({ route}) {
  const navigation = useNavigation();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [dataApps, setData] = useState([]);
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
  // useEffect(() => {
  // const loaderTimeout = setTimeout(() => {
  //     setAloader(false);
  //   }, 35000);
    
  //  return () => clearTimeout(loaderTimeout);
  // }, []); 
  const [flatListKey, setFlatListKey] = useState(Date.now());

  useEffect(() => {
    const fetchInstalledAppData = async () => {
      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map(app => app.label);
      const packageImages = installedApps.map(app => app.icon);
      const packageBundle = installedApps.map(app => app.packageName);
      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        bundle: packageBundle[index],
        image: packageImages[index],
      }));

      setData(packageDataArray);
      setIsLoading(false);
    };

    fetchInstalledAppData();
  }, []);

  useEffect(() => {
    const topSixItems = dataApps.slice(0, 6);
  //   console.log('Top Six Item');
      const saveTopData = async () => {
      try {
        const updatedTopData = topSixItems.map(item => ({
          ...item,
          count: 2, 
        }));
        await AsyncStorage.setItem('topData', JSON.stringify(updatedTopData));
        setTopData(updatedTopData); 
      } catch (error) {
        console.error('Error saving top data to AsyncStorage:', error);
      }
    };
    saveTopData();
  }, [dataApps]);
  useEffect(() => {
  //   if (isFocused) {
  const loadFavouriteData = async () => {
        try {
          const storedData = await AsyncStorage.getItem('favouriteData');
          console.log(
            'IS FOCUSED OF FAVOURITE DATA IS CALLED',
            typeof storedData,
          );
          console.log(
            'IS FOCUSED OF FAVOURITE DATA IS CALLED LENGTH',
            storedData.length,
          );
           if (storedData.length === 2) {
            console.log('FAVOURITE IS NULLl');
            const initialFavouriteData = dataApps.slice(0, 4);
            await AsyncStorage.setItem(
              'favouriteData',
              JSON.stringify(initialFavouriteData),
            );
            setFavouriteData(initialFavouriteData);
          } else {
            const parsedData = JSON.parse(storedData);
            setFavouriteData(parsedData);
            console.log('FAVOURITE IS NOT NULL');
          }
        } catch (error) {
          console.error(
            'Error loading favourite data from AsyncStorage:',
            error,
          );
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
            'favouriteData',
            JSON.stringify(favouriteData),
          );
        } catch (error) {
          console.error('Error saving favourite data to AsyncStorage:', error);
        }
      };
      saveFavouriteData();
  //   }
  }, [favouriteData, ]);

  useEffect(() => {
  //   if (isFocused) {
       const loadTopData = async () => {
        try {
          const storedData = await AsyncStorage.getItem('topData');
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setTopData(parsedData);
          }
        } catch (error) {
          console.error('Error loading top data from AsyncStorage:', error);
        }
      };

      loadTopData();
  //   }
  }, []); 

  useEffect(() => {
  //   if (isFocused) {
       const saveTopData = async () => {
        try {
          await AsyncStorage.setItem('topData', JSON.stringify(topData));
        } catch (error) {
          console.error('Error saving top data to AsyncStorage:', error);
        }
      };

      saveTopData();
  //   }
  }, [topData]); 
  
  useEffect(() => {
    const fetchUsedData = async () => {
      const lastUsageDate = new Date().toISOString();

      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map(app => app.label);
      const packageImages = installedApps.map(app => app.icon);
      const packageBundle = installedApps.map(app => app.packageName);
      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        bundle: packageBundle[index],
        image: packageImages[index],
        date: lastUsageDate,
      }));

      setUnusedApps(packageDataArray);

      await AsyncStorage.setItem(
        'comparisonDate',
        JSON.stringify(packageDataArray),
      );
      setIsLoading(false);
    };

    fetchUsedData();
  }, []);
  //------------------------------------------------------------\\
  const itemsPerPage = 10; // Change this to set the number of items per screen
  const [favouriteApps, setFavouriteApps] = useState([
    {id: 1, title: 'SnapChat', image: appImages.snapchat},
    {id: 2, title: 'Gmail', image: appImages.gmail},
    {id: 3, title: 'Pinterest', image: appImages.pinterest},
    {id: 4, title: 'LinkedIn', image: appImages.linkedIn},
    {id: 5, title: 'Calendar', image: appImages.calendar},
    {id: 6, title: 'SnapChat', image: appImages.snapchat},
    {id: 7, title: 'SnapChat', image: appImages.snapchat},
    {id: 8, title: 'Gmail', image: appImages.gmail},
    {id: 9, title: 'Pinterest', image: appImages.pinterest},
    {id: 10, title: 'LinkedIn', image: appImages.linkedIn},
  ]);

  // const onDragEnd = (data, targetList, item) => {
  //   console.log('data list', data);
  //   console.log('target list item', item);
  //   // Handle the item drop here
  //   // Update the target list based on the dragged item data
  //   // You might want to implement your own logic here
  //   const updatedList = [...targetList, item];
  //   // Update the state and use the callback to log the updated state
  //   setFavouriteApps(updatedList, () => {
  //     console.log('On drag ends FavouriteList', favouriteApps);
  //   });

  //   setFlatListKey(Date.now()); // Update the key to force re-render
  // };

  const renderApps = item => {
    //console.log('item at first', item);
    const openApp = async items => {
      try {
        // Check if the app is already in the topData array
        const appIndex = topData.findIndex(app => app.bundle === item.bundle);

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
        console.error('Error opening the app:', error);
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
        style={styles.items}>
        <Image
          style={{width: 43, height: 43}}
          source={{uri: `data:image/png;base64,${item?.image}`}}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: '#000000',
              textAlign: 'center',
              fontSize: hp(1.2),
              fontWeight: 'bold',
            }}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {item?.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFavouritesApps = item => {
    //console.log('item at first', item);
    const openApp = async items => {
      try {
        // Launch the application
        await RNLauncherKitHelper.launchApplication(item.bundle);

        // Check if the app is already in the topData array
        const appIndex = topData.findIndex(app => app.bundle === item.bundle);

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
          setTopData(prevData => [
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
        console.error('Error opening the app:', error);
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
        style={styles.items}>
        <Image
          style={{width: 43, height: 43}}
          source={{uri: `data:image/png;base64,${item?.image}`}}
        />
        <Text
          style={{
            color: '#000000',
            textAlign: 'center',
            fontSize: hp(1.2),
            fontWeight: 'bold',
          }}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item?.label}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderAvailableApps = item => {
    // Render the item only if count is equal to 2
    if (item.count >= 2) {
      return (
        <View style={{height: hp(8), padding: 5}}>
          <Image
            style={{width: wp(12), height: wp(12)}}
            resizeMode="contain"
            source={{uri: `data:image/png;base64,${item?.image}`}}
          />
        </View>
      );
    } else {
      // Return null or an empty view if count is not equal to 2
      return (
        <View style={{height: hp(8), padding: 5}}>
          <Image
            style={{width: wp(12), height: wp(12)}}
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

  //---------------------------------------------------\\

  //--------------------Video---------------------------\\

  const [selectedItemVideoId, setSelectedItemVideoId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [topVideoImage, setTopVideoImage] = useState('');

  const [topVideoText, setTopVideoText] = useState('');

  const [searchesData, setSearches] = useState('');

  const [authToken, setAuthToken] = useState('');

  const [imageInfo, setImageInfo] = useState(null);

  const [selectedItem, setSelectedItem] = useState('');

  const [data, setVideoData] = useState([]);

  const [dataLatestVideos, setDataLatestVideos] = useState([]);

  const [dataTopVideos, setDataTopVideos] = useState([]);

  const [dataMostViewedVideos, setMostViewedVideos] = useState([]);

  const [dataMostCommentedVideos, setMostCommentedVideos] = useState([]);

  const ref_RBSheetCamera = useRef(null);

  useEffect(() => {
    // Check if it's the initial load (selectedItemId is not set yet)
    if (selectedItemVideoId === null) {
      setSelectedItemVideoId(17);
    } else {
      // Fetch data based on the updated selectedItemId
      fetchVideos();
    }
  }, [selectedItemVideoId, ]);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    // Fetch data one by one
    await getUserID();
    // await fetchTopVideos();
    // await fetchLatestVideos();
    // await fetchMostViewedVideos();
    // await fetchMostCommentedVideos();

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {
 
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        await fetchCategory(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  // const fetchTrendingVideos = async () => {
  // //   console.log('Categry in id', selectedItemVideoId);
  // //   console.log("Id's", authToken);

  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url +`xpi/getTrendingVideosByCategory/${selectedItemVideoId}?page=1&limit=5`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings', result.Videos);
  //     setVideoData(result.Videos); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchLatestVideos = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `xpi/getAllRecentVideosByCategory/${selectedItemVideoId}?page=1&limit=2`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings', result.Videos);
  //     setDataLatestVideos(result.Videos); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error in fetchLatestVideos:', error);
  //   }
  // };

  // const fetchTopVideos = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `top/app/top_video/${selectedItemVideoId}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of Top Videossss', result.topVideo[0]);
  //     setDataTopVideos(result.topVideo[0]); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error in fetchTopVideos:', error);
  //   }
  // };

  // const fetchMostViewedVideos = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `xpi/getMostViewedVideosByCategory/${selectedItemVideoId}?page=1&limit=5`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings', result.Videos);
  //     setMostViewedVideos(result.Videos); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error in fetchMostViewedVideos:', error);
  //   }
  // };

  // const fetchMostCommentedVideos = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `xpi/getMostCommentedVideosByCategory/${selectedItemVideoId}?page=1&limit=5`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings', result.Videos);
  //     setMostCommentedVideos(result.Videos); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error in fetchMostCommentedVideos:', error);
  //   }
  // };

  const fetchCategory = async result => {
  //   console.log('Auth Token category', result);
    const token = result;

    try {
      const response = await fetch(
        base_url + 'videoCategory/getAllVideoCategories',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      // console.log('Search Results of Dashboard', result.AllCategories);
      setSearches(result.AllCategories.reverse()); // Update the state with the fetched data

      await fetchTrendingVideos(result);
    } catch (error) {
      console.error('Error in fetchCategory:', error);
    }
  };

  /*  const takePhotoFromCamera = value => {
    ref_RBSheetCamera.current.close();
    setSelectedItem(value);
    navigation.navigate('UploadUpdateVideo');
  };

  const choosePhotoFromLibrary = value => {
    ref_RBSheetCamera.current.close();
    setSelectedItem(value);
    navigation.navigate('UploadUpdateVideo');
  }; */

  const takePhotoFromCamera = async value => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: 'video',
        videoQuality: 'medium',
      },
      response => {
      //   console.log('image here', response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setLoading(true);
            setImageInfo(response.assets[0]);
            ref_RBSheetCamera.current.close();
            setLoading(false);

            navigation.navigate('UploadUpdateVideo', {
              Video: response.assets[0],
            });
          } else if (response.uri) {
            console.log('response', imageInfo);
            ref_RBSheetCamera.current.close();
            setLoading(false);

            navigation.navigate('UploadUpdateVideo', {
              Video: response.assets[0],
            });
          }
        }
        console.log('response', imageInfo);
        ref_RBSheetCamera.current.close();
        setLoading(false);

        navigation.navigate('UploadUpdateVideo', {Video: response.assets[0]});
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'video'}, response => {
      // console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        /*  console.log('Response', response.assets[0]);
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]); */
        setLoading(true);
        setImageInfo(response.assets[0]);
        ref_RBSheetCamera.current.close();
        setLoading(false);

        navigation.navigate('UploadUpdateVideo', {Video: response.assets[0]});
      }

      console.log('response', imageInfo);
      ref_RBSheetCamera.current.close();
      setLoading(false);

      navigation.navigate('UploadUpdateVideo', {Video: response.assets[0]});
    });
  };

  const renderAvailableAppsVideo = item => {
    //console.log('Itemsss', item);
  //   console.log('Video Link', item.thumbnail);
    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate('ViewVideo', {videoData: item})}
        style={{width: wp(27), margin: 5}}>
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
              source={{uri: item.thumbnail}}
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
      </TouchableOpacity>
    );
  };

  const renderSearchesVideo = item => {
  //   console.log('Items', item);
    const isSelected = selectedItemVideoId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemVideoId(item.id);
          // console.log('Selected item:', item.title);
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#232323' : '#939393'},
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  //-------------------------------------------------------\\

  //-------------------- DISC ------------------------------\\

  const [selectedItemDiscId, setSelectedItemDiscId] = useState(1);

  const [topNewsData, setTopNewsData] = useState([]);

  const [categoryIdNews, setCategoryIdNews] = useState(null);

  const [loadingDisc, setLoadingDisc] = useState(false);

  const isFocusedDisc = useIsFocused();

  const [newsData, setNewsData] = useState([]);

  const [authTokenDisc, setAuthTokenDisc] = useState('');

  const [opensLettersPublicGeneralData, setOpensLettersPublicGeneralData] =
    useState([]);

  const [opensLettersPublicCelebrityData, setOpensLettersPublicCelebrityData] =
    useState([]);

  const [opensLettersPrivateFriendsData, setOpensLettersPrivateFriendsData] =
    useState([]);

  const [
    opensLettersPrivateCelebrityData,
    setOpensLettersPrivateCelebrityData,
  ] = useState([]);

  const [qafiData, setQAFIData] = useState([]);

  const [gebcData, setGEBCData] = useState([]);

  const {NewsCategory, Type} = route?.params || {};

  // useEffect(() => {
  //     fetchData(); 
  // //   if (isFocusedDisc) {
  // //     // getUserDiscID();
  // //     fetchData(); // Call the async function
  // //   }
  // }, [NewsCategory, ]); // Include 'id' in the dependency array

  // // const getUserDiscID = async () => {
  // //   try {
  // //     const result = await AsyncStorage.getItem('authToken ');
  // //     if (result !== null) {
  // //       setAuthTokenDisc(result);
  // //       fetchData();
  // //       console.log('user id retrieved:', result);
  // //     }
  // //   } catch (error) {
  // //     // Handle errors here
  // //     console.error('Error retrieving user ID:', error);
  // //   }
  // // };

  // const fetchData = async () => {
  // //   console.log('Received NewsCategory of:', NewsCategory);
  // //   console.log('Received Type of:', Type);
  //   /*   Toast.show({
  //     type: 'success', // 'success', 'error', 'info', 'warning'
  //     position: 'bottom', // 'top', 'bottom', 'center'
  //     text1: NewsCategory.toString(),
  //     visibilityTime: 3000, // in milliseconds
  //     autoHide: true,
  //   }); */

  //   // Check if 'id' exists before using it
  //   // if (NewsCategory) {
  //   //   // console.log('Received id:', NewsCategory);
  //   //   setCategoryIdNews(NewsCategory); // Uncomment this line if you want to use id to set selectedItemId

  //   //   if (Type === 'NEWS') {
  //   //     setLoadingDisc(true);
  //   //     setSelectedItemDiscId(1);
  //   //   //   console.log('Category Id News is ', NewsCategory);
  //   //     // Fetch data one by one
  //   //     await fetchNews();

  //   //     // Once all data is fetched, set loading to false
  //   //     setLoadingDisc(false);
  //   //   } else if (Type === 'QAFI') {
  //   //     setLoadingDisc(true);
  //   //     setSelectedItemDiscId(3);
  //   //   //   console.log('Category Id QAFI is ', NewsCategory);
  //   //     // Fetch data one by one
  //   //     await fetchQAFI();

  //   //     // Once all data is fetched, set loading to false
  //   //     setLoadingDisc(false);
  //   //   } else if (Type === 'GEBC') {
  //   //     setLoadingDisc(true);
  //   //     setSelectedItemDiscId(4);
  //   //   //   console.log('Category Id QAFI is ', NewsCategory);
  //   //     // Fetch data one by one
  //   //     await fetchGEBC();

  //   //     // Once all data is fetched, set loading to false
  //   //     setLoadingDisc(false);
  //   //   }
  //   // } else {
  //   //   /*  setLoading(true);
  //   //   //setSelectedItemId(1)
  //   //   console.log('Category Id News is ', NewsCategory);
  //   //   // Fetch data one by one
  //   //   await fetchNews();

  //   //   // Once all data is fetched, set loading to false
  //   //   setLoading(false); */
  //   // }
  // };

  // const fetchNews = async () => {
  // //   console.log('Categry in id', categoryIdNews);
  // //   console.log('News Called');
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       // base_url + `news/getAllNewsByCategory/${categoryIdNews}?page=1&limit=100`,
  //       base_url + 'news/getAllNewsByCategory/3?page=1&limit=100',
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of News', result.AllQAFIs);
  //     //Alert.alert(result)

  //     setNewsData(result.AllQAFIs); // Update the state with the fetched data

  //     fetchTopNews();
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchTopNews = async () => {
  // //   console.log('Categry in id', categoryIdNews);
  // //   console.log('News Called');
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       // base_url + `top/getAllTopQAFIByCategory/${categoryIdNews}`,
  //       // base_url + '/top/getAllTopNEWSByCategory/3?page=1&limit=2',
  //       base_url + 'top/getAllTopQAFIByCategory/3',
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of Top News', result);
  //     //Alert.alert(result)

  //     setTopNewsData(result.AllQAFI[0]); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchQAFI = async () => {
  // //   console.log(' QAFI in id', categoryIdNews);
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       // base_url + `qafi/getAllQafisByCategory/${categoryIdNews}?page=1&limit=50`,
  //       base_url + 'qafi/getAllQafisByCategory/3?page=1&limit=50',
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of QAFI', result.QAFIs);
  //     //Alert.alert(result)

  //     setQAFIData(result.QAFIs); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchGEBC = async () => {
  // //   console.log('Categry in id', categoryIdNews);
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       // base_url + `gebc/getAllGEBCsByCategory/${categoryIdNews}?page=1&limit=50`,
  //       base_url + `gebc/getAllGEBCsByCategory/3?page=1&limit=50`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of News', result.GEBCs);
  //     //Alert.alert(result)

  //     setGEBCData(result.GEBCs); // Update the state with the fetched data
  //     // fetchTopNews();
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchLetterPublicGeneral = async () => {
  //   setLoading(true);
  // //   console.log('Categry in id', categoryIdNews);
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `letter/public_general_by_category/3/?page=1&limit=100`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of News', result.AllLetter);
  //     //Alert.alert(result)

  //     setOpensLettersPublicGeneralData(result.AllLetter); // Update the state with the fetched data
  //     await fetchLetterPublicCelebrity();
  //   } catch (error) {
  //     setLoading(false);
  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchLetterPublicCelebrity = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `letter/public_celebrity_by_category/3/?page=1&limit=10`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of News', result.AllLetter);
  //     //Alert.alert(result)

  //     setOpensLettersPublicCelebrityData(result.AllLetter); // Update the state with the fetched data
  //     await fetchLetterPrivateFriends();
  //   } catch (error) {
  //     setLoading(false);

  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchLetterPrivateFriends = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `letter/private_friends_by_category/3/?page=1&limit=5`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of News', result.AllLetter);
  //     //Alert.alert(result)

  //     setOpensLettersPrivateFriendsData(result.AllLetter); // Update the state with the fetched data
  //     await fetchLetterPrivateCelebrity();
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchLetterPrivateCelebrity = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `letter/private_celebrity_by_category/3/?page=1&limit=2`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of News', result.AllLetter);
  //     //Alert.alert(result)

  //     setOpensLettersPrivateCelebrityData(result.AllLetter); // Update the state with the fetched data
  //     // fetchTopNews();
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);

  //     console.error('Error Trending:', error);
  //   }
  // };

  //DISC

  const renderPublicGeneral = item => {
  //   console.log('Item', item);
    const imageUrl =
      item.images && item.images[0]
        ? item.images[0].startsWith('/fileUpload')
          ? base_url + `${item.images[0]}`
          : item.images[0]
        : null;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('LetterDetails', {Letters: item})}
        style={{width: wp(25.5), margin: 5}}>
        <View>
          {item.images && item.images[0] ? (
            <Image
              style={{
                height: hp(12),
                width: wp(23),
              }}
              source={{uri: imageUrl}}
            />
          ) : (
            // Show dummy image if item.images is null or undefined
            <Image
              style={{
                height: hp(12),
                width: wp(23),
              }}
              source={appImages.galleryPlaceHolder}
            />
          )}
          {/* <Image
            style={{
              height: hp(12),
              width: wp(23),
            }}
            source={{uri: imageUrl}}
          />  */}
        </View>
      </TouchableOpacity>
    );
  };

  //-------------------\\

  // const goToScreen = () => {
  //   if (selectedItemDiscId === 2) {
  //     navigation.navigate('PostLetterInfo');
  //   } else if (selectedItemDiscId === 1) {
  //     navigation.navigate('PostOnNews');
  //   } else if (selectedItemDiscId === 3) {
  //     navigation.navigate('QAFI');
  //   } else if (selectedItemDiscId === 4) {
  //     navigation.navigate('GEBC');
  //   }
  // };

  //Disc Screen

  const searchesDisc = [
    {id: 1, title: 'On News'},
    {id: 2, title: 'Open Letters'},
    {id: 3, title: 'QAFI'},
    {id: 4, title: 'EBC'},
  ];

  const renderAvailableDiscApps = item => {
  //   console.log('Items of News', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewNews', {picData: item})}
        style={{width: wp(25.5), margin: 5}}>
        <View>
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
            source={{uri: item.image}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(12),
            height: hp(7),
            width: wp(25),
          }}>
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: 'hidden',
                borderRadius: wp(7) / 2,
              }}>
              <Image
                source={{uri: item?.userimage}}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
              }}>
              <MaterialCommunityIcons
                style={{marginTop: hp(0.5)}}
                name={'account-circle'}
                size={30}
                color={'#FACA4E'}
              />
              {/*  <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          /> */}
            </View>
          )}

          <Text
            style={{
              fontSize: hp(1.5),
              marginLeft: wp(0.7),
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}>
            {item.username}
          </Text>

          <View style={{marginLeft: wp(1)}}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsQAFI = item => {
  //   console.log('Items of QAFI', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewQAFI', {picData: item})}
        style={{width: wp(25.5), margin: 5}}>
        <View>
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
            source={{uri: item.image}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(12),
            height: hp(7),
            width: wp(25),
          }}>
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: 'hidden',
                borderRadius: wp(7) / 2,
              }}>
              <Image
                source={{uri: item?.userimage}}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
              }}>
              <MaterialCommunityIcons
                style={{marginTop: hp(0.5)}}
                name={'account-circle'}
                size={30}
                color={'#FACA4E'}
              />
              {/*  <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          /> */}
            </View>
          )}

          <Text
            style={{
              fontSize: hp(1.5),
              marginLeft: wp(0.7),
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}>
            {item.username}
          </Text>

          <View style={{marginLeft: wp(1)}}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsDiscGEBC = item => {
  //   console.log('Items of GEBC', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewGEBC', {picData: item})}
        style={{width: wp(25.5), margin: 5}}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: hp(10),
            borderRadius: wp(1),
            resizeMode: 'stretch',
            borderWidth: 1, // Border width
            borderColor: 'grey', // Border color
          }}>
          <Text style={{fontSize: hp(5)}}>{item.image}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(1),
            height: hp(7),
            width: wp(25),
          }}>
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: 'hidden',
                borderRadius: wp(7) / 2,
              }}>
              <Image
                source={{uri: item?.userimage}}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
              }}>
              <MaterialCommunityIcons
                style={{marginTop: hp(0.5)}}
                name={'account-circle'}
                size={30}
                color={'#FACA4E'}
              />
              {/*  <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          /> */}
            </View>
          )}

          <Text
            style={{
              fontSize: hp(1.5),
              marginLeft: wp(0.7),
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}>
            {item.username}
          </Text>

          <View style={{marginLeft: wp(1)}}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDiscSearches = item => {
    // console.log('Items id', item.id);
    const isSelected = selectedItemDiscId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetailsDisc,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemDiscId(item.id);
          console.log('Selected item:', item.id);
          if (item.id === 1) {
            setSelectedItemDiscId(1);
            fetchNews();
            // navigation.navigate('ViewAllCategoriesDashboard');
            console.log('Fetch News screen item');
          } else if (item.id === 2) {
            setSelectedItemDiscId(2);
            fetchLetterPublicGeneral();
            console.log('On Letter id', item.id);
          } else if (item.id === 3) {
            setSelectedItemDiscId(3);
            fetchQAFI();
            console.log('On Letter id', item.id);
            // navigation.navigate('ViewAllCategoriesQAFIDashboard');
          } else if (item.id === 4) {
           setSelectedItemDiscId(4);
            fetchGEBC();
            console.log('On Letter id', item.id);
            // navigation.navigate('ViewAllCategoriesGEBCDashboard');
          }
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#232323' : '#939393'},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const DiscScreen = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          <View
            style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
            {topNewsData === undefined || topNewsData.length === 0 ? (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
                <Image
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: wp(3),
                    resizeMode: 'cover',
                  }}
                  source={appImages.galleryPlaceHolder}
                />
              </View>
            ) : (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
                <Image
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,

                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: wp(3),
                    resizeMode: 'cover',
                  }}
                  source={{uri: topNewsData?.image}}
                />
              </View>
            )}

            <View style={{justifyContent: 'center', flex: 1}}>  
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: hp(7),
                  width: wp(35),
                }}>
                <Text
                  style={{
                    fontSize: hp(1.5),
                    marginLeft: wp(2.5),
                    fontFamily: 'Inter-Regular',
                    color: '#000000',
                  }}>
                  {topNewsData === undefined || topNewsData.length === 0
                    ? 'Does not contain any top news'
                    : topNewsData?.description}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <>
                {newsData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available in DiscScreen
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={newsData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableDiscApps(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                data={newsData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableDiscApps(item)}
              />
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                data={newsData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableDiscApps(item)}
              />
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                data={newsData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableDiscApps(item)}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const QAFI = () => {
  //   console.log('Came to QAFI');
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          {topNewsData === undefined || topNewsData.length === 0 ? (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
              <Image
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(3),
                  resizeMode: 'cover',
                }}
                source={appImages.galleryPlaceHolder}
              />
            </View>
          ) : (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
              <Image
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,

                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(3),
                  resizeMode: 'cover',
                }}
                source={{uri: topNewsData?.image}}
              />
            </View>
          )}

          <View style={{justifyContent: 'center', flex: 1}}>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(35),
              }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontFamily: 'Inter-Regular',
                  color: '#000000',
                }}>
                {topNewsData === undefined || topNewsData.length === 0
                  ? 'Does not contain any top news'
                  : topNewsData?.description}
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <>
                {qafiData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={qafiData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <>
                {qafiData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={qafiData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <>
                {qafiData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={qafiData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <>
                {qafiData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={qafiData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  const GEBC = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          <View
            style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
            {topNewsData === undefined || topNewsData.length === 0 ? (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
                <Image
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: wp(3),
                    resizeMode: 'cover',
                  }}
                  source={appImages.galleryPlaceHolder}
                />
              </View>
            ) : (
              <View
                //onPress={() => navigation.navigate('News')}
                style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
                <Image
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,

                    zIndex: 1, // Ensure it's on top of other elements
                    //flex: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: wp(3),
                    resizeMode: 'cover',
                  }}
                  source={{uri: topNewsData?.image}}
                />
              </View>
            )}

            <View style={{justifyContent: 'center', flex: 1}}>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: hp(7),
                  width: wp(35),
                }}>
                <Text
                  style={{
                    fontSize: hp(1.5),
                    marginLeft: wp(2.5),
                    fontFamily: 'Inter-Regular',
                    color: '#000000',
                  }}>
                  {topNewsData === undefined || topNewsData.length === 0
                    ? 'Does not contain any top news'
                    : topNewsData?.description}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <>
                {gebcData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={gebcData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsDiscGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <>
                {gebcData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={gebcData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsDiscGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <>
                {gebcData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={gebcData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsDiscGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <>
                {gebcData?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={gebcData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsDiscGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  const OpenLetters = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          {topNewsData === undefined || topNewsData.length === 0 ? (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
              <Image
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(3),
                  resizeMode: 'cover',
                }}
                source={appImages.galleryPlaceHolder}
              />
            </View>
          ) : (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
              <Image
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,

                  zIndex: 1, // Ensure it's on top of other elements
                  //flex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(3),
                  resizeMode: 'cover',
                }}
                source={appImages.galleryPlaceHolder}
              />
            </View>
          )}

          <View style={{justifyContent: 'center', flex: 1}}>
          
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(35),
              }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontFamily: 'Inter-Regular',
                  color: '#000000',
                }}>
                {topNewsData === undefined || topNewsData.length === 0
                  ? 'Does not contain any top news'
                  : topNewsData?.description}
              </Text>
            </View>
          </View>
        </View>

        <View style={{height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Public (general)
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicGeneralData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          />
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Public (to authorities, celebrities, leaders)
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicCelebrityData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          />
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Private (to friends, peers, followers)
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
              No data available
            </Text>
          </View>
      
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Private (to authorities, celebrities, leaders){' '}
          </Text>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
              No data available
            </Text>
          </View>

        </View>
      </View>
    );
  };

  //---------------------------------------------------------\\

  //--------------------PIC TOURS ----------------------------\\

  const [selectedItemPicsId, setSelectedItemPicsId] = useState(5);

  const [imagePicInfo, setImagePicInfo] = useState(null);

  const [loadingPics, setLoadingPics] = useState(false);

  const [searchesDataPics, setSearchesPics] = useState('');

  const [selectedItemPics, setSelectedItemPics] = useState('');

  const [dataPics, setDataPics] = useState([]);

  const [dataLatestPics, setDataLatestPics] = useState([]);

  const [dataMostViewedPics, setMostViewedPics] = useState([]);

  const [dataMostCommentedPics, setMostCommentedPics] = useState([]);

  const [dataToppics, setDataTopPics] = useState([]);

  const [authTokenPics, setAuthTokenPics] = useState('');

  const ref_RBSheetCameraPics = useRef(null);

  // useEffect(() => {
  //   // Make the API request and update the 'data' state
  //   fetchVideosPics();
  // }, [selectedItemPicsId]);

  // const fetchVideosPics = async () => {
  //   // Simulate loading
  //   setLoadingPics(true);

  //   // Fetch data one by one
  // //   await getUserIDPics();
  //   await fetchCategoryPics();
  //   await fetchTrendingPics();
  //   await fetchTopPics();
  //   await fetchLatestPics();
  //   await fetchMostViewedPics();
  //   await fetchMostCommentedPics();

  //   // Once all data is fetched, set loading to false
  //   setLoadingPics(false);
  // };

  // // const getUserIDPics = async () => {
  // //   console.log('AT User Id');
  // //   try {
  // //     const result = await AsyncStorage.getItem('authToken ');
  // //     if (result !== null) {
  // //       setAuthTokenPics(result);
  // //       await fetchCategoryPics(result);
  // //       console.log('user id retrieved:', result);
  // //     }
  // //   } catch (error) {
  // //     // Handle errors here
  // //     console.error('Error retrieving user ID:', error);
  // //   }
  // // };

  // const fetchCategoryPics = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url  +'picCategory/getAllPicCategories?page=1&limit=5',
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Search Results', result.AllCategories);
  //     setSearchesPics(result.AllCategories); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error in fetchCategoryPics :', error);
  //   }
  // };

  // const fetchTrendingPics = async () => {
  // //   console.log('selected id trending videos', authToken);
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `picTour/getAllTrendingToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings Pics Tourzs', result.Tours);
  //     setDataPics(result.Tours); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchLatestPics = async () => {
  // //   console.log('selected id latest videos', authToken);

  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `picTour/getAllRecentVideosByCategory/${selectedItemPicsId}?page=1&limit=5`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings', result.Tours);
  //     setDataLatestPics(result.Tours); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error in fetchLatestPics:', error);
  //   }
  // };

  // const fetchMostViewedPics = async () => {
  // //   console.log('selected id most viewed videos', authToken);

  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `picTour/getMostViewedToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings Most Viewed', result.Tours);
  //     setMostViewedPics(result.Tours); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error in fetchMostViewedPics:', error);
  //   }
  // };


  // ////////////////////////correct the code again 28/5/2024
  // const fetchTopPics = async () => {
  //     // console.log('Category Top pics', selectedItemPicsId);
  //     const token = authToken;
    
  //     try {
  //       const response = await fetch(
  //         base_url + `top/app/top_tour/${selectedItemPicsId}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
    
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
    
  //       const result = await response.json();
    
  //       // Log the entire result to understand its structure
  //       // console.log('Resultings of Top Pics', result);
    
  //       // Check if result.topTour is an array and has elements
  //       if (result.topTour && Array.isArray(result.topTour) && result.topTour.length > 0) {
  //         // Optionally log the first top tour for debugging
  //         // console.log('First top tour:', result.topTour[0]);
    
  //         // Process the array as needed
  //         setDataTopPics(result.topTour[0]);
  //       } else {
  //         console.error('Top tours are missing or not in the expected format.');
  //       }
  //     } catch (error) {
  //       console.error('Error in fetchTopPics:', error);
  //     }
  //   };
    
  // // ////////////////////////////////////
  // // const fetchTopPics = async () => {
  // // //   console.log('Category Top pics', selectedItemPicsId);
  // //   const token = authToken;

  // //   try {
  // //     const response = await fetch(
  // //       base_url + `top/app/top_tour/${selectedItemPicsId}`,
  // //       {
  // //         method: 'GET',
  // //         headers: {
  // //           Authorization: `Bearer ${token}`,
  // //         },
  // //       },
  // //     );

  // //     const result = await response.json();
  // //     // console.log('Resultings of Top Pics', result.topTour[0]);
  // //     setDataTopPics(result.topTour[0]);
  // //   } catch (error) {
  // //     console.error('Error in fetchTopPics:', error);
  // //   }
  // // };

  // const fetchMostCommentedPics = async () => {
  // //   console.log('selected most commented videos', authToken);

  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url +`picTour/getMostCommentedToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings', result.Tours);
  //     setMostCommentedPics(result.Tours);
  //   } catch (error) {
  //     console.error('Error in fetchMostCommentedPics:', error);
  //   }
  // };

  // const renderSearchesPic = item => {
  // //   console.log('Items', item);
  //   const isSelected = selectedItemPicsId === item.id;

  //   return (
  //     <TouchableOpacity
  //       style={[
  //         styles.searchesDetails,
  //         {
  //           backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
  //         },
  //       ]}
  //       onPress={() => {
  //         setSelectedItemPicsId(item.id);
  //         // console.log('Selected item:', item.title);
  //       }}>
  //       <Text
  //         style={[
  //           styles.textSearchDetails,
  //           {color: isSelected ? '#232323' : '#939393'},
  //         ]}>
  //         {item.name}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };

  const renderAvailableAppsPics = item => {
  //   console.log('Items of Pics', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PicDetails', {picData: item})}
        style={{width: wp(27), margin: 5}}>
        <View>
          {!item.image ||
          item.image === 'undefined' ||
          item.image.startsWith('/') ? (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
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
                zIndex: 1,
                width: '100%',
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: 'cover',
              }}
              source={{uri: item.image}}
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
            style={{
              fontSize: hp(1.5),
              fontFamily: 'Inter-Regular',
              color: '#000000',
              width: wp(23),
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const takePhotoFromCameraPics = async value => {
  //   setSelectedItemPics(value);
  //   launchCamera(
  //     {
  //       mediaType: 'Photo',
  //       //videoQuality: 'medium',
  //     },
  //     response => {
  //       console.log('image here', response);
  //       if (!response.didCancel) {
  //         if (response.assets && response.assets.length > 0) {
  //           setLoadingPics(true);
  //           setImagePicInfo(response.assets[0]);
  //           ref_RBSheetCameraPics.current.close();
  //           setLoadingPics(false);

  //           navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
  //         } else if (response.uri) {
  //           ref_RBSheetCameraPics.current.close();
  //           setLoadingPics(false);

  //           navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
  //         }
  //       }
  //       ref_RBSheetCameraPics.current.close();
  //       setLoadingPics(false);

  //       navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
  //     },
  //   );
  // };

  // const choosePhotoFromLibraryPics = value => {
  //   setSelectedItemPics(value);
  //   launchImageLibrary({mediaType: 'Photo'}, response => {
  //     console.log('image here', response);
  //     if (!response.didCancel && response.assets.length > 0) {
  //       /*  console.log('Response', response.assets[0]);
  //       setImageUri(response.assets[0].uri);
  //       setImageInfo(response.assets[0]); */
  //       setLoadingPics(true);
  //       setImagePicInfo(response.assets[0]);
  //       ref_RBSheetCameraPics.current.close();
  //       setLoadingPics(false);

  //       navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
  //     }

  //     ref_RBSheetCameraPics.current.close();
  //     setLoadingPics(false);

  //     navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
  //   });
  // };

  //------------------------------------------------------------\\

  //--------------------- MARKET ZONE ----------------------------\\

  const [selectedItemIdMarket, setSelectedItemIdMarket] = useState(null);

  const [dataMarket, setDataMarket] = useState(null);

  const [authTokenMarket, setAuthTokenMarket] = useState('');

  const [dataElectronicsMarket, setDataElectronicsMarket] = useState(null);

  const [dataVehiclesMarket, setDataVehiclesMarket] = useState(null);

  const [dataClothingMarket, setDataClothingMarket] = useState(null);

  const [loadingMarket, setLoadingMarket] = useState(false);

  const [categoriesSelectMarket, setCategorySelectMarket] = useState([]);

  const [dataTopVideosMarket, setDataTopVideosMarket] = useState([]);

  const RegionArea = ['Africa', 'Europe', 'Americas', 'Asia', 'Middle East'];

  // useEffect(() => {
  //   // Make the API request and update the 'data' state
  //   fetchMarket();
  // }, [selectedItemIdMarket]);

  // const fetchMarket = async () => {
  //   // Simulate loading
  //   setLoadingMarket(true);
  //   // Fetch data one by one

  // //   await getUserIDMarket();
  //  await fetchCategoryMarket();
  //   await fetchAllMarket();

  //   await fetchTopMarket();

  //   await fetchElectronicsMarket();

  //   await fetchVehiclesMarket();

  //   await fetchClothingMarket();
  //   // Once all data is fetched, set loading to false
  //   setLoadingMarket(false);
  // };

  // // const getUserIDMarket = async () => {
  // //   console.log('AT User Id');
  // //   try {
  // //     const result = await AsyncStorage.getItem('authToken ');
  // //     if (result !== null) {
  // //       setAuthTokenMarket(result);
  // //       //await fetchRegion(result);
  // //       await fetchCategoryMarket(result);
  // //       console.log('user id retrieved:', result);
  // //     }
  // //   } catch (error) {
  // //     // Handle errors here
  // //     console.error('Error retrieving user ID:', error);
  // //   }
  // // };


  // // /////////////////////////////////////fetch all market. correct the code.28/5/2024
  // const fetchAllMarket = async () => {
  //     const token = authToken;
  //     console.log('token aya ', token)
    
  //     try {
  //       const response = await fetch(
  //         base_url + 'item/getAllItems?page=1&limit=2',
  //         {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
    
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
    
  //       const result = await response.json();
    
  //       // Log the entire result to understand its structure
  //       // console.log('AllItems result', result);
    
  //       // Check if result.AllItems exists and is an array
  //       if (result.AllItems && Array.isArray(result.AllItems)) {
  //         // Optionally log the AllItems array for debugging
  //         // console.log('AllItems:', result.AllItems);
    
  //         // Set the data as needed
  //         setDataMarket(result.AllItems);
  //       } else {
  //         console.error('AllItems is missing or not in the expected format.');
  //       }
  //     } catch (error) {
  //       console.error('Error in fetchAllMarket:', error);
  //     }
  //   };
    
  // // const fetchAllMarket = async () => {
  // //   const token = authToken;

  // //   try {
  // //     const response = await fetch(
  // //       base_url + 'item/getAllItems?page=1&limit=2',
  // //       {
  // //         method: 'GET',
  // //         headers: {
  // //           Authorization: `Bearer ${token}`,
  // //         },
  // //       },
  // //     );

  // //     const result = await response.json();
  // //     // console.log('AllItems', result.AllItems);
  // //     setDataMarket(result.AllItems);
  // //   } catch (error) {
  // //     console.error('Error Trending:', error);
  // //   }
  // // };

  // const fetchElectronicsMarket = async () => {
  // //   console.log('Categry in id', selectedItemId);
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `item/getAllItemByCategory/5?page=1&limit=5&region=${selectedItemIdMarket}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log(' s', result.AllItems);
  //     setDataElectronicsMarket(result.AllItems);
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchVehiclesMarket = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `item/getAllItemByCategory/6?page=1&limit=5&region=${selectedItemIdMarket}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('AllItems', result.AllItems);
  //     setDataVehiclesMarket(result.AllItems); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };


  // // //////////////////////////////testing the api

  // const fetchTopMarket = async () => {
  //     const token = authToken;
    
  //     try {
  //       const response = await fetch(
  //         base_url + 'top/app/top_item',
  //         {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
    
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
    
  //       const result = await response.json();
    
  //       // Log the entire result to understand its structure
  //       // console.log('Resultings of Top Market Place', result);
    
  //       // Check if result.topitem is an array and has elements
  //       if (result.topitem && Array.isArray(result.topitem) && result.topitem.length > 0) {
  //         // Optionally log the specific image URL for debugging
  //         // console.log('First top item image URL:', result.topitem[0]?.images[0]?.image);
    
  //         // Process the array as needed (e.g., reverse it if required)
  //         setDataTopVideosMarket(result.topitem[0]);
  //       } else {
  //         console.error('Top items are missing or not in the expected format.');
  //       }
  //     } catch (error) {
  //       console.error('Error in fetchTopMarket:', error);
  //     }
  //   };
    
  // // const fetchTopMarket = async () => {
  // //   const token = authToken;

  // //   try {
  // //     const response = await fetch(
  // //       base_url +`top/app/top_item`,
  // //       {
  // //         method: 'GET',
  // //         headers: {
  // //           Authorization: `Bearer ${token}`,
  // //         },
  // //       },
  // //     );

  // //     const result = await response.json();
  // //     // console.log(
  // //     //   'Resultings of Top Market Place',
  // //     //   result.topitem[0]?.images[0]?.image,
  // //     // );
  // //     setDataTopVideosMarket(result.topitem[0]); 
  // //   } catch (error) {
  // //     console.error('Error in fetchTopMarket:', error);
  // //   }
  // // };

  // const fetchClothingMarket = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url +`item/getAllItemByCategory/7?page=1&limit=5&region=${selectedItemIdMarket}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('AllItems', result.AllItems);
  //     setDataClothingMarket(result.AllItems);
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };
  // const fetchCategoryMarket = async () => {
  // //   console.log(' Categories Result', result);
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + 'itemCategory/getAllItemCategories?page=1&limit=5',
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     if (response.ok) {
  //       const data = await response.json();

  //     //   console.log('Data ', data);
  //       const categories = data.AllCategories.map(category => ({
  //         label: category.name,
  //         value: category.id.toString(), 
  //       }));

  //       setCategorySelectMarket(categories); 

  //     //   console.log('Data Categories', categoriesSelectMarket);
  //     } else {
  //       console.error(
  //         'Failed to fetch categories:',
  //         response.status,
  //         response.statusText,
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error in fetchCategoryMarket:', error);
  //   }
  // };

  // const searchesMarket = [
  //   {id: 1, title: 'Africa'},
  //   {id: 2, title: 'Europe'},
  //   {id: 3, title: 'N America'},
  //   {id: 4, title: 'L. America'},
  //   {id: 5, title: 'Asia'},
  //   {id: 6, title: 'Middle East'},
  //   {id: 7, title: 'Carribean'},
  // ];

  const renderAvailableAppsMarket = item => {
  //   console.log('Items of market zone', item?.images[0]?.image);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {ProductDetails: item})
        }
        style={{width: wp(25.5), margin: 5}}>
        <View>
          {!item?.images[0]?.image ||
          item?.images[0]?.image === 'undefined' ||
          item?.images[0]?.image.startsWith('/') ? (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
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

                zIndex: 1,
                width: '100%',
                height: hp(16),
                borderRadius: wp(2.5),
                resizeMode: 'cover',
              }}
              source={{uri: item?.images[0]?.image}}
            />
          )}
        </View>

        <View
          style={{
            position: 'absolute',
            top: hp(12),
            left: 7,
            //height: hp(3),
            //width: wp(21),
            //borderRadius: wp(3),
            //backgroundColor: '#FACA4E',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2, // Ensure it's on top
          }}>
          <Text
            style={{
              fontSize: hp(1.7),
              fontFamily: 'Inter',
              color: 'black',
              fontWeight: '700',
            }}>
            {item?.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSearchesMarket = item => {
  //   console.log('Regions', item);
    const isSelected = selectedItemIdMarket === item;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemIdMarket(item);
          // console.log('Selected item:', item);
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#232323' : '#939393'},
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleCancel = () => {
    setModalDeleteApps(false);
  };

  const handleConfirm = () => {
    if (removeFavouriteItem) {
      const updatedInstallData = dataApps.filter(
        item => item.bundle !== removeFavouriteItem.bundle,
      );
      setModalDeleteApps(false);
      setData(updatedInstallData);
    } else {
      setModalDeleteApps(false);
      console.log('CANCEL');
    }
  };

  const handleCancelFavourite = () => {
    setModalDeleteFavouriteApps(false);
  };

  const handleConfirmFavourite = () => {
    if (removeFavouriteItem) {
      // Check if the item already exists in favouriteData
      const isItemInFavourites = favouriteData.some(
        item => item.bundle === removeFavouriteItem.bundle,
      );

      console.log('Favourite Item', isItemInFavourites);

      if (isItemInFavourites) {
        // Item already exists, remove it from favouriteData
        const updatedFavouriteData = favouriteData.filter(
          item => item.bundle !== removeFavouriteItem.bundle,
        );
        setFavouriteData(updatedFavouriteData);

      //   console.log('Item removed from favourites');

        setModalDeleteFavouriteApps(false);
      } else {
        // Item doesn't exist, add it to favouriteData
        setFavouriteData(prevData => [...prevData, favouriteItem]);
      //   console.log('Add to Favorites pressed for:');

        setModalDeleteFavouriteApps(false);
      }
    } else {
      console.log('NO APPS FOUND');
    }
  };
   

  // ////
  // const targetRef = useRef(null);
  // const [dataMarket, setDataMarket] = useState([]);
  // Function to check if an element is in the viewport
//   const isElementInViewport = (el) => {
//     if (!el) return false;

//     const rect = el.getBoundingClientRect();
//     return (
//       rect.top >= 0 &&
//       rect.left >= 0 &&
//       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
//   };
// const fetchDataForVisibleComponent = async () => {
//   await fetchDataIfVisible(fetchCategoryMarket);
//   await fetchDataIfVisible(fetchAllMarket);
//   await fetchDataIfVisible(fetchElectronicsMarket);
//   await fetchDataIfVisible(fetchVehiclesMarket);
//   await fetchDataIfVisible(fetchClothingMarket);
// };

// const fetchDataIfVisible = async (fetchFunction) => {
//   if (isComponentVisible()) {
//     try {
//       await fetchFunction();
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
// };

// useEffect(() => {
//   fetchDataForVisibleComponent();
// }, []);

// const isComponentVisible = () => {
//   if (!scrollViewRef || !scrollViewRef.current) return false;

//   const scrollY = scrollViewRef.current.contentOffset?.y || 0;
//   const screenHeight = scrollViewRef.current.clientHeight || 0;

//   const marketComponentTop = 0; // Top of the market component
//   const marketComponentBottom = marketComponentTop + screenHeight; // Bottom of the market component

//   return (
//     marketComponentTop >= scrollY &&
//     marketComponentBottom <= scrollY + screenHeight
//   );
// };
/////////////////////////////////////////////////////////////////////////Main return start hai 28/5/2024

const [data2, setData2] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [currentApiIndex, setCurrentApiIndex] = useState(0);

  const apiEndpoints = [
    // videoCategory/getAllVideoCategories( setSearches(result.AllCategories.reverse());)
    // xpi/getTrendingVideosByCategory/17?page=1&limit=5.Videos
    'https://watch-gotcha-be.mtechub.com/xpi/getTrendingVideosByCategory/17?page=1&limit=5',
    'https://watch-gotcha-be.mtechub.com/xpi/getAllRecentVideosByCategory/17?page=1&limit=2',
    'https://watch-gotcha-be.mtechub.com/top/app/top_video/17',
    'https://watch-gotcha-be.mtechub.com/xpi/getMostViewedVideosByCategory/17?page=1&limit=5',
    'https://watch-gotcha-be.mtechub.com/xpi/getMostCommentedVideosByCategory/17?page=1&limit=5',
    'https://watch-gotcha-be.mtechub.com/videoCategory/getAllVideoCategories',
    'https://watch-gotcha-be.mtechub.com/qafi/getAllQafisByCategory/3?page=1&limit=50',
    'https://watch-gotcha-be.mtechub.com/gebc/getAllGEBCsByCategory/3?page=1&limit=50',
    'https://watch-gotcha-be.mtechub.com/letter/public_general_by_category/3/?page=1&limit=100',
    'https://watch-gotcha-be.mtechub.com/letter/public_celebrity_by_category/3/?page=1&limit=10',
    'https://watch-gotcha-be.mtechub.com/letter/private_friends_by_category/3/?page=1&limit=5',
    'https://watch-gotcha-be.mtechub.com/top/getAllTopQAFIByCategory/3',
    'https://watch-gotcha-be.mtechub.com/news/getAllNewsByCategory/3?page=1&limit=100',
    'https://watch-gotcha-be.mtechub.com/letter/private_celebrity_by_category/3/?page=1&limit=2',
    'https://watch-gotcha-be.mtechub.com/picCategory/getAllPicCategories?page=1&limit=5',
    'https://watch-gotcha-be.mtechub.com/item/getAllItems?page=1&limit=2'
  ];

  const token = authToken; // Replace with your actual token

  useEffect(() => {
    if (currentApiIndex < apiEndpoints.length) {
      fetchDataFromApi(currentApiIndex);
    } else {
      setLoading2(false);
    }
  }, [currentApiIndex]);

  const fetchDataFromApi = async (index) => {
    try {
      const response = await fetch(apiEndpoints[index], {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();

      // console.log('Fetched data from API:', result);

      let data = [];
      switch (index) {
        case 0:
          data = result.AllCategories || [];
          break;
        case 1:
          data = result.Videos || [];
          break;
        case 2:
          data = result.topVideo || [];
          break;
        case 3:
          data = result.Videos || [];
          break;
        case 4:
          data = result.Videos || [];
          break;
        case 5:
          data = result.Videos || [];
          break;
        case 6:
          data = result.QAFIs || [];
          break;
        case 7:
          data = result.GEBCs || [];
          break;
        case 8:
          data = result.AllLetter || [];
          break;
        case 9:
          data = result.AllLetter || [];
          break;
        case 10:
          data = result.AllLetter || [];
          break;
        case 11:
          data = result.AllQAFI || [];
          break;
        case 12:
          data = result.AllQAFIs || [];
          break;
        case 13:
          data = result.AllLetter || [];
          break;
        case 14:
          data = result.picCategories || [];
          break;
        case 15:
          data = result.items || [];
          break;
        default:
          break;
      }

      setData2(prevData => [
        ...prevData,
        {
          title: headings[index].title,
          data: data.map(item => JSON.stringify(item))
        }
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setCurrentApiIndex(prevIndex => prevIndex + 1);
    }
  };

  if (loading2 && currentApiIndex === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      pointerEvents="auto"
      style={aLoader ? styles.containerBlur : styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={{marginTop: hp(5), width: '100%'}}>
        {/* {console.log("Navigation object:", navigation)} */}
        <Headers
          showListings={true}
          navigation={navigation}
          showLogo={true}
          onPressListings={() => navigation.openDrawer()}
          onPressProfile={() => navigation.navigate('ViewProfile')}
          showProfileImage={true}
        />
        </View>
      <ScrollView ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginHorizontal: wp(5)}}>

        <Modal
          transparent={true}
          animationType="fade"
          visible={isLongPress}
          onRequestClose={() => setIsLongPress(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  if (favouriteItem) {
                    const isItemInFavourites = favouriteData.some(
                      item => item.bundle === favouriteItem.bundle,
                    );

                    if (isItemInFavourites) {
                      console.log('Item is already in favourites');
                    } else {
                      setFavouriteData(prevData => [
                        ...prevData,
                        favouriteItem,
                      ]);
                      console.log(
                        'Add to Favorites pressed for:',
                        favouriteItem.label,
                      );
                    }

                    setIsLongPress(false);
                  }
                }}
                style={styles.overlayButton}>
                <Text style={{color: 'white'}}>Add to Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (favouriteItem) {
                    const updatedInstallData = dataApps.filter(
                      item => item.bundle !== favouriteItem.bundle,
                    );
                    setData(updatedInstallData);
                    setIsCancelModalVisible(false);
                    setIsLongPress(false);
                  }
                }}
                style={styles.overlayButton}>
                <Text style={{color: 'white'}}>
                  Remove From Wotcha Gotcha App
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isCancelModalVisible && (
            <TouchableOpacity
              onPress={() => closeRequestModal()}
              style={styles.modalContentCross}>
              <Entypo name={'cross'} size={18} color={'black'} />
            </TouchableOpacity>
          )}
        </Modal>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isLongPressRemove}
          onRequestClose={() => setIsLongPressRemove(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  if (removeFavouriteItem) {
                    // Check if the item already exists in favouriteData
                    const isItemInFavourites = favouriteData.some(
                      item => item.bundle === removeFavouriteItem.bundle,
                    );

                    console.log('Favourite Item', isItemInFavourites);

                    if (isItemInFavourites) {
                      // Item already exists, remove it from favouriteData
                      const updatedFavouriteData = favouriteData.filter(
                        item => item.bundle !== removeFavouriteItem.bundle,
                      );
                      setFavouriteData(updatedFavouriteData);

                      console.log('Item removed from favourites');
                    } else {
                      // Item doesn't exist, add it to favouriteData
                      setFavouriteData(prevData => [
                        ...prevData,
                        favouriteItem,
                      ]);
                      console.log('Add to Favorites pressed for:');
                    }

                    setIsLongPressRemove(false);
                  }
                }}
                style={styles.overlayButton}>
                <Text style={{color: 'white'}}>Remove Favorites</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (removeFavouriteItem) {
                    const updatedInstallData = dataApps.filter(
                      item => item.bundle !== removeFavouriteItem.bundle,
                    );
                    setData(updatedInstallData);
                    setIsCancelModalVisible(false);
                    setIsLongPressRemove(false);
                  } else {
                    setIsCancelModalVisible(false);
                    setIsLongPressRemove(false);
                  }
                }}
                style={styles.overlayButton}>
                <Text style={{color: 'white'}}>
                  Remove From Wotcha Gotcha App
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isCancelRemoveModalVisible && (
            <TouchableOpacity
              onPress={() => closeRequestRemoveModal()}
              style={styles.modalContentCross}>
              <Entypo name={'cross'} size={18} color={'black'} />
            </TouchableOpacity>
          )}
        </Modal>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <View style={{marginTop: hp(5)}}></View>
        <View
          style={{
            marginTop: hp(2),
            marginLeft: wp(-1),
            height: hp(23),
            width: wp(60),
          }}>
          <FlatList
            style={{margin: 8, flex: 1}}
            showsVerticalScrollIndicator={false}
            data={topData}
            numColumns={3} // Set the number of columns to 3
            renderItem={({item}) => renderAvailableApps(item)}
          />
        </View>

        <View style={{marginTop: hp(-3), height: hp(25)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter-Bold',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Phone Based Apps
          </Text>

          {isLoading ? (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#FACA4E" />
            </View>
          ) : (
            <View style={{flex: 1}}>
              <FlatList
                data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />

              <FlatList
                data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />
            </View>
          )}
        </View>

        <View style={{height: hp(8), justifyContent: 'center'}}>
          <View
            style={{
              height: hp(7),
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              //borderWidth: 1,
              marginHorizontal: wp(12),
            }}>
          </View>
        </View>
        <View style={{marginTop: hp(-5), height: hp(28)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter-Bold',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Favourite Apps
          </Text>
          {isLoading ? (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#FACA4E" />
            </View>
          ) : (
            <>
              {favouriteData?.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
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
                    Math.ceil(favouriteData.length / 2),
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, itemIndex) => `${itemIndex}`}
                  renderItem={({item}) => renderFavouritesApps(item)}
                  contentContainerStyle={{
                    borderWidth: 1,
                    marginRight: wp(2.3),
                    marginTop: hp(3),
                    borderColor: '#00000017',
                    borderRadius: wp(3),
                  }}
                />
              )}
              <FlatList
                data={favouriteData.slice(Math.ceil(favouriteData.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderFavouritesApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />
            </>
          )}
        </View>

        <View style={{marginTop: hp(1.8), marginBottom: hp(5), height: hp(25)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter-Bold',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Unused Apps
          </Text>

          {isLoading ? (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#FACA4E" />
            </View>
          ) : (
            <View style={{flex: 1}}>
              <FlatList
                data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />

              <FlatList
                data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />
            </View>
          )}
        </View>
   <View
          style={{
            height: hp(18),
            marginTop: hp(-1.3),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: wp(60), height: hp(60), resizeMode: 'contain'}}
            source={{
              uri: 'https://neilpatel.com/wp-content/uploads/2021/02/ExamplesofSuccessfulBannerAdvertising.jpg',
            }}
          />
        </View>

        <View style={{marginTop: hp(1), marginHorizontal: wp(8)}}>
          <Text
            style={{color: '#FACA4E', fontWeight: 'bold', fontSize: hp(2.3)}}>
            Video Mania
          </Text>
        </View>

        <View style={styles.latestSearchListVideo}>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderSearchesVideo(item)}
          />
        </View>
        <View
          style={{
            marginTop: hp(1.5),
            marginLeft: wp(2.5),
            flexDirection: 'row',
            height: hp(17),
          }}>
          <View
            //onPress={() => navigation.navigate('ViewVideo')}
            style={{width: wp(39), height: '100%', borderRadius: wp(5)}}>
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(3),
                resizeMode: 'cover',
              }}
              source={appImages.videoPlaceHolder}
            />
            <View
              style={{
                position: 'absolute',
                top: hp(10),
                left: 10,
                //height: hp(3),
                //width: wp(21),
                //borderRadius: wp(3),
                //backgroundColor: '#FACA4E',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2, // Ensure it's on top
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: hp(2.1),
                  fontFamily: 'Inter',
                  color: 'black',
                  fontWeight: '700',
                }}>
                {dataTopVideos?.name}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: hp(3),
              height: hp(12.8),
              width: '45%',
              marginHorizontal: wp(1.5),
            }}>
            <Text
              numberOfLines={5}
              ellipsizeMode="tail"
              style={{
                fontSize: hp(1.5),
                //marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: 'Inter-Regular',
                color: '#000000',
                //fontWeight: '700',
              }}>

              {dataTopVideos?.description}
            </Text>
          </View>
        </View>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

{/* <View style={{ flex: 1, paddingTop: 50 }}>
  <SectionList
    sections={data2}
    keyExtractor={(item, index) => `${item}_${index}`}
    renderItem={({ item }) => null}
    renderSectionHeader={({ section: { title } }) => (
      <Text style={{ fontSize: 24, backgroundColor: "#f4f4f4", padding: 10 }}>{title}</Text>
    )}
    renderSectionFooter={({ section }) => {
      if (section.title == 'Trending Videos') {
        return (
          <FlatList
            horizontal
            data={section.data}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 18, marginRight: 10 }}>{item.name}</Text>
                <Text style={{ fontSize: 16, color: '#666' }}>{item.created_at}</Text>
              </View>
            )}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            showsHorizontalScrollIndicator={false}
          />
        );
      } else {
        return (
          <FlatList
            data={section.data}
            renderItem={({ item, index }) => (
              <Text style={{ padding: 10, fontSize: 18, height: 44, marginHorizontal: 5, backgroundColor: '#e0e0e0', textAlign: 'center' }}>{item}</Text>
            )}
            keyExtractor={(item, index) => `${item}_${index}`}
            showsHorizontalScrollIndicator={false}
          />
        );
      }
    }}
  />
  {loading2 && (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )}
</View> */}

    <View style={{ flex: 1,
    paddingTop: 50,}}>
      <SectionList
        sections={data2}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={({ item }) => null}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{fontSize: 24,
            backgroundColor: "#f4f4f4",
            padding: 10,}}>{title}</Text>
        )}
        renderSectionFooter={({ section }) => {
          if (section.title === 'Trending Videos') {
            return (
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item, index }) => renderAvailableAppsVideo(item)}
              //   renderItem={({ item }) => 
              //     // {
              //     //   console.log('item for flat list', item)
              //     // }
              //     (
                  
              //     <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              //       <Text style={{ fontSize: 18, marginRight: 10 , color:'black'}}>{item.name}</Text>
              //       <Text style={{ fontSize: 16, color: '#666',black:'yellow' }}>{item.username}</Text>
              //     </View>
              //   )
              // }
                keyExtractor={(item, index) => `${item.id}_${index}`}
                showsHorizontalScrollIndicator={false}
              />
            );
          }
          else if (section.title === 'Recent Videos') {
            return (
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item, index }) => renderAvailableAppsVideo(item)}
                keyExtractor={(item, index) => `${item.id}_${index}`}
                showsHorizontalScrollIndicator={false}
              />
            );
          }  else if (section.title === 'Most Viewed Videos') {
            return (
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item, index }) => renderAvailableAppsVideo(item)}
                keyExtractor={(item, index) => `${item.id}_${index}`}
                showsHorizontalScrollIndicator={false}
              />
            );
          }   else if (section.title === 'Most Commented Videos') {
            return (
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item, index }) => renderAvailableAppsVideo(item)}
                keyExtractor={(item, index) => `${item.id}_${index}`}
                showsHorizontalScrollIndicator={false}
              />
            );
          } else {
            return (
              <FlatList
                data={section.data}
                renderItem={({ item, index }) => (
                  <Text style={{ padding: 10, fontSize: 18, height: 44, marginHorizontal: 5, backgroundColor: '#e0e0e0', textAlign: 'center' }}>{item}</Text>
                )}
                keyExtractor={(item, index) => `${item}_${index}`}
                showsHorizontalScrollIndicator={false}
              />
            );
          }
        }}
        // renderSectionFooter={({ section }) => (
        //   <FlatList
        //     horizontal
        //     data={section.data}
        //     renderItem={({ item, index }) => renderAvailableAppsVideo(item)}
        //     keyExtractor={(item, index) => `${item}_${index}`}
        //     showsHorizontalScrollIndicator={false}
        //   />
            
        // )}
      />
      {loading2 && (
        <View style={{flex: 1,
          justifyContent: 'center',
          alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
      
{/* //////////////////////////////////////////////////////// */}
    
      </ScrollView>
      
      <RBSheet
        ref={ref_RBSheetCamera}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(25),
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(8),
            alignItems: 'center',
          }}>
          <Text style={styles.maintext}>Select an option</Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={'#303030'}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => takePhotoFromCamera('camera')}
            style={
              selectedItem === 'camera'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <Ionicons
              color={selectedItem === 'camera' ? '#FACA4E' : '#888888'}
              name="camera"
              size={25}
            />

            <Text style={{color: '#333333'}}>From camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => choosePhotoFromLibrary('gallery')}
            style={
              selectedItem === 'gallery'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <MaterialCommunityIcons
              color={selectedItem === 'gallery' ? '#FACA4E' : '#888888'}
              name="image"
              size={25}
            />

            <Text style={{color: '#333333'}}>From gallery</Text>
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
        cancelText={'Cancel'}
        doneText={'Yes, Delete'}
        onCancel={() => handleCancel()}
        onConfirm={() => handleConfirm()}
      />

      <CustomModal
        visible={modalDeleteFavouriteApps}
        onClose={() => setModalDeleteFavouriteApps(false)}
        headerText="Logout?"
        bodyText="Are You Sure You Want To Remove From Favourites?"
        cancelText={'Cancel'}
        doneText={'Yes, Remove'}
        onCancel={() => handleCancelFavourite()}
        onConfirm={() => handleConfirmFavourite()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginHorizontal: wp(3),
    backgroundColor: 'white',
  },
  containerBlur: {
    flex: 1,
    backgroundColor: 'rgba(234,233,238)',
    //backgroundColor: 'white'
  },
  searchBar: {
    height: hp(5.9),
    marginTop: hp(3),
    flex: 1,
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
    //marginLeft: wp(3.8),
    borderRadius: wp(5),
    borderWidth: 0.5,
    borderColor: '#00000017',
  },
  latestSearchList: {
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
  },

  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: hp(5),
    marginHorizontal: wp(8),
    height: hp(8),
    //borderWidth: 3,
  },
  latestSearch: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: wp(4.3),
    marginTop: hp(2),
    marginLeft: wp(10),
    color: '#595959',
  },
  latestSearchList: {
    marginTop: hp(2.1),
    height: hp(7),
    //marginLeft: wp(5),
  },
  searchesDetails: {
    flexDirection: 'row',
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: wp(5),
  },
  textSearchDetails: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: hp(1.8),
  },
  textHeader: {
    fontSize: wp(5.7),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },

  // Category Styles
  items: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlayButton: {
    backgroundColor: '#FACA4E',
    padding: 10,
    alignItems: 'center',
    //marginHorizontal: wp(5),
    justifyContent: 'center',
    marginTop: hp(5),
    borderRadius: 5,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  modalContent: {
    //   width: '80%',
    //justifyContent:'center',
    //alignItems:'center',
    //borderWidth:3,
    //backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  modalContentCross: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 18,
    zIndex: 999,
    right: 16,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  //---------------\\

  //video styles
  latestSearchListVideo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },
  ti: {
    marginHorizontal: '7%',
    marginTop: '5%',
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#FACA4E',

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#E7EAF2',
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  iconStyle: {
    color: '#C4C4C4',
    width: 20,
    height: 20,
  },
  iconStyleInactive: {
    color: '#FACA4E',
  },
  maintext: {
    fontSize: hp(2.3),
    color: '#303030',
    fontWeight: 'bold',
  },
  modaltextview: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: wp(90),
    borderRadius: 25,
    backgroundColor: 'white',
    paddingHorizontal: wp(15),
  },
  optiontext: {
    fontSize: hp(1.7),
    color: '#303030',
    marginLeft: wp(4),
  },
  nonselectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#E7EAF2',
  },
  selectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#FACA4E',
  },

  // Disc Styles
  searchesDetailsDisc: {
    flexDirection: 'row',
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(25),
    backgroundColor: '#F2F2F2',
    borderRadius: wp(5),
    height: hp(5),
  },
  latestSearchListDisc: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginHorizontal: wp(8),
    //marginLeft: wp(5),
    //borderWidth: 3,
  },

  //---------------\\

  // Pic tour styles

  latestSearchListPicss: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },

  //----------------\\
  //Market Zone

  latestSearchListMarket: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },
});
