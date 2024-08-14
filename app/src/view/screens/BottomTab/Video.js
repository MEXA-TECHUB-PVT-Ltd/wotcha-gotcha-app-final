import {
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Text,
  View,
  Dimensions
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Add from '../../../assets/svg/AddMainScreen.svg';
import Headers from '../../../assets/Custom/Headers';
import {appImages} from '../../../assets/utilities';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import RBSheet from 'react-native-raw-bottom-sheet';
import Carousel from 'react-native-snap-carousel';
import {useIsFocused} from '@react-navigation/native';
import { base_url } from '../../../../../baseUrl';
import Swiper from "react-native-swiper";
import VideoActive from "../../../assets/svg/VideoActive";


export default function Video() {
  const navigation = useNavigation();
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [topVideoImage, setTopVideoImage] = useState('');

  const [banners, setBanners] = useState([]);

  const [topVideoText, setTopVideoText] = useState('');

  const [searchesData, setSearches] = useState([]);

  const [authToken, setAuthToken] = useState('');

  const [imageInfo, setImageInfo] = useState(null);

  const isFocused = useIsFocused();

  const [selectedItem, setSelectedItem] = useState('');

  const [data, setData] = useState([]);

  const [dataLatestVideos, setDataLatestVideos] = useState([]);

  const [dataTopVideos, setDataTopVideos] = useState([]);

  const [dataMostViewedVideos, setMostViewedVideos] = useState([]);

  const [dataMostCommentedVideos, setMostCommentedVideos] = useState([]);

  const ref_RBSheetCamera = useRef(null);

    const [adsData, setAdsData] = useState([]);
  const [adsinActiveData, setAdsInActiveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // useEffect(() => {
  //   // Check if it's the initial load (selectedItemId is not set yet)
  //   if (selectedItemId === null) {
  //     setSelectedItemId(17);

  //   } else {
  //     // Fetch data based on the updated selectedItemId
  //     fetchVideos();
  //   }
  // }, [selectedItemId, isFocused]);







  const [sections, setSections] = useState([]);
  const [noData, setNoData] = useState(false);
// Fetch auth token
useEffect(() => {
  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken ");
      if (token) {
        setAuthToken(token);
        console.log('token----', token)
      } else {
        throw new Error("No auth token found");
      }
    } catch (err) {
      console.error("Error retrieving auth token:", err);
    }
  };

  getAuthToken();
}, []);

// Fetch all data when authToken is set and screen is focused
useEffect(() => {
  if (authToken && isFocused) {
    fetchAllCinematicsCategory();
    // fetchTopSport();
    fetchTopVideos(selectedItemId);
    fetchSubCategorySport(selectedItemId);
  }
}, [authToken, selectedItemId, isFocused]);

// Fetch categories
const fetchAllCinematicsCategory = async () => {
  setLoading(true)
  try {
    const response = await fetch(`${base_url}videoCategory/getAllVideoCategories`, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const result = await response.json();
    // setSearchesData(result.AllCategories);

    const categories = result.AllCategories.reverse();
    // console.log('Search Results', categories);
    setSearches(categories); // Update the state with the fetched data
    // if (result.AllCategories.length > 0) {
    //   setSelectedItemId(result.AllCategories[0].id);
    // }
    if (selectedItemId === null && categories.length > 0) {
      setSelectedItemId(categories[0].id);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
  setLoading(false)
};


// Fetch sub-category sports
const fetchSubCategorySport = async (selectedItemId) => {
  setLoading(true)
  try {
    const response = await fetch(`${base_url}xpi/getAllVideosBycategory/${selectedItemId}?page=1&limit=100000`, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const result = await response.json();
    if (Array.isArray(result.data) && result.data.length > 0) {
      const formattedSections = result.data.map(category => ({
        title: category.sub_category_name,
        data: category.video_result.Videos,
      }));
      setSections(formattedSections);
      // console.log('fooor mate', formattedSections)
      setNoData(formattedSections.every(section => section.data.length === 0));
    } else {
      setSections([]);
      setNoData(true);
    }
  } catch (error) {
    console.error("Error fetching sub-category sports:", error);
    setNoData(true); // Assume no data on error
  }
  setLoading(false)
};









  // useEffect(() => {
  //   // Fetch category data on initial load
  //   getUserID();
  // }, []);
  // useEffect(() => {
  //   if (selectedItemId !== null) {
  //     // Fetch data based on the updated selectedItemId
  //     fetchTopVideos();
  //   }
  // }, [selectedItemId, isFocused]);


  // const fetchVideos = async () => {
  //   // Simulate loading
  //   setLoading(true);

  //   // Fetch data one by one
  //   await getUserID();
  //   // await fetchLatestVideos();
  //   // await fetchMostViewedVideos();
  //   // await fetchMostCommentedVideos();
  //   // await fetchBanners();

  //   // Once all data is fetched, set loading to false
  //   setLoading(false);
  // };

  // const getUserID = async () => {
  //   // console.log('AT User Id');
  //   try {
  //     const result = await AsyncStorage.getItem('authToken ');
  //     if (result !== null) {
  //       setAuthToken(result);
  //       await fetchCategory(result);
  //       // console.log('user id retrieved:', result);
  //     }
  //   } catch (error) {
  //     // Handle errors here
  //     console.error('Error retrieving user ID:', error);
  //   }
  // };


















  useEffect(() => {
    if (authToken){
      fetchBannerConfig();
      fetchBannerInActive()
    }
    }, [authToken]);

  
    const fetchBannerConfig = async () => {
      const token = authToken;
      setIsLoading(true);
      try {
        const response = await fetch(
          base_url + "banner/getAllActiveBanners?topBanner=true",
          // base_url + "banner/getAllBannersByUser/97",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const result = await response.json();
        // console.log("AllBanners---", result.AllBanners);
        setAdsData(result.AllBanners);
      } catch (error) {
        console.error("Error AllBanners:", error);
      }
      setIsLoading(false); 
    };

    const fetchBannerInActive = async () => {
      const token = authToken;
      setIsLoading(true);
      try {
        const response = await fetch(
          base_url + "banner/getAllActiveBanners?topBanner=false",
          // base_url + "banner/getAllBannersByUser/97",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const result = await response.json();
        // setAdsInActiveData(result.AllBanners);
        const updatedBanners = result.AllBanners.map(banner => {
          if (banner.image.startsWith('/fileUpload')) {
            banner.image = `https://watch-gotcha-be.mtechub.com${banner.image}`;
          }
          return banner;
        });
        // console.log("AllBanners AdsInActiveData---", updatedBanners);
        setAdsInActiveData(updatedBanners);
      } catch (error) {
        console.error("Error AllBanners AdsInActiveData---", error);
      }
      setIsLoading(false);
    };

    const fetchCategory = async (token) => {
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
        const categories = result.AllCategories.reverse();
        // console.log('Search Results', categories);
        setSearches(categories); // Update the state with the fetched data
    
        if (categories.length > 0) {
          // Set the first category ID as selected
          setSelectedItemId(categories[0].id);
        }
      } catch (error) {
        console.error('Error category: ', error);
      }
    };
    // const fetchCategory = async result => {
    //   // console.log('Auth Token category', result);
    //   const token = result;
  
    //   try {
    //     const response = await fetch(
    //       base_url + 'videoCategory/getAllVideoCategories',
    //       {
    //         method: 'GET',
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       },
    //     );
  
    //     const result = await response.json();
    //     console.log('Search Results', result.AllCategories);
    //     setSearches(result.AllCategories.reverse()); // Update the state with the fetched data
    //     // setSelectedItemId()
  
    //     await fetchTopVideos();
    //   } catch (error) {
    //     console.error('Error category: ', error);
    //   }
    // };
  
    const fetchTopVideos = async () => {
      // console.log('TOP VIDEO CALLED----???---', authToken);
      const token = authToken;
  setLoading(true)
      try {
        const response = await fetch(
          base_url + `top/getAllTopVideosByCategory/${selectedItemId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        const result = await response.json();
        console.log('Resultings of Top Videossss????????', result.AllVideos[0]);
        setDataTopVideos(result.AllVideos[0]); // Update the state with the fetched data
  
        // await fetchTrendingVideos();
    
      } catch (error) {
        console.error('Error top:', error);
      }
      setLoading(false)
    };

  // const fetchTrendingVideos = async () => {
  //   // console.log('Categry in id', selectedItemId);
  //   // console.log("Id's", authToken);

  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `xpi/getTrendingVideosByCategory/${selectedItemId}?page=1&limit=5`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings', result.Videos);
  //     setData(result.Videos); // Update the state with the fetched data
  //     await fetchLatestVideos();
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };

  // const fetchLatestVideos = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `xpi/getAllRecentVideosByCategory/${selectedItemId}?page=1&limit=2`,
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
  //     await fetchMostViewedVideos();
  
  //   } catch (error) {
  //     console.error('Error latest:', error);
  //   }
  // };

  // const fetchMostViewedVideos = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `xpi/getMostViewedVideosByCategory/${selectedItemId}?page=1&limit=5`,
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
  //     await fetchMostCommentedVideos();
  //   } catch (error) {
  //     console.error('Error most view:', error);
  //   }
  // };

  // const fetchMostCommentedVideos = async () => {
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + `xpi/getMostCommentedVideosByCategory/${selectedItemId}?page=1&limit=5`,
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
  //     console.error('Error comment:', error);
  //   }
  // };



 
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
        console.log('image here', response);
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

        //navigation.navigate('UploadUpdateVideo', {Video: response.assets[0]});
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'video'}, response => {
      console.log('image here', response);
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

      //navigation.navigate('UploadUpdateVideo', {Video: response.assets[0]});
    });
  };

  const availableAppsVideo = [
    {
      id: 1,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
  ];

  const availableApps = [
    {
      id: 1,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
  ];

  const searches = [
    {id: 1, title: 'Games'},
    {id: 2, title: 'Business'},
    {id: 3, title: 'Education'},
    {id: 4, title: 'Games'},
    {id: 5, title: 'Business'},
    {id: 6, title: 'Education'},
    {id: 7, title: 'Games'},
    {id: 8, title: 'Business'},
    {id: 9, title: 'Education'},
    {id: 10, title: 'Games'},
  ];

  const renderAvailableApps = item => {
    // console.log('Items', item);
    return (
      <View style={{width: wp(30), margin: 5}}>
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
              borderRadius: wp(3),
              resizeMode: 'cover',
            }}
            source={item.image}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(2),
            marginTop: hp(12.5),
          }}>
          <Text style={{fontSize: hp(1.1), fontWeight: 'bold', width: wp(23)}}>
            {item.title}
          </Text>

          <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
        </View>
      </View>
    );
  };

 

  const renderSearches = item => {
    // console.log('Items', item);
    const isSelected = selectedItemId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemId(item.id);
          console.log('Selected item:', item.id);
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






  const renderAvailableAppsVideo = item => {
    //console.log('Itemsss', item);
    // console.log('Video Link', item.thumbnail);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewVideo', {videoData: item , identifier: false})}
        style={{width: wp(48), borderRadius: 5, margin: 5}}>
        <View>
          {item.thumbail === '' ||
          item.thumbnail === null ||
          item.thumbnail.startsWith('/') ||
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

          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>
      </TouchableOpacity>
    );
  };





  const renderVideoItem = ({ item }) => (
    // <TouchableOpacity onPress={handle_details}>
    <TouchableOpacity  onPress={() => navigation.navigate('ViewVideo', {videoData: item , identifier: false})}>
    <View style={styles.itemContainer}>
      {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
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

          {/* <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} /> */}
        </View>

      {/* <Text  ellipsizeMode="tail"
                numberOfLines={1} style={styles.text}>{item.name}</Text>
      <Text  ellipsizeMode="tail"
                numberOfLines={2} style={styles.text1}>{item.description}</Text> */}
    </View>
  </TouchableOpacity>
  );

  const renderSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>No Data available</Text>
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

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
{/* 
 <Headers
          showListings={true}
          navigation={navigation}
          showLogo={true}
          onPressListings={()=>{navigation.openDrawer()}}
          onPressProfile={() => navigation.navigate('ViewProfile')}
          showProfileImage={true}
        />
 */}
      <View style={{marginTop: hp(5)}}>
        <Headers
          OnpresshowHome={()=>{navigation.navigate('MoreScreen')}}
          showHome={true}
          // showListings={true}
          // navigation={navigation}
          // onPressListings={()=>{navigation.openDrawer()}}
          onPressSearch={() => navigation.navigate('SearchScreen')}
          showText={true}
          text={'Video Mania'}
          showSearch={true}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: hp(1),
          marginHorizontal: wp(4),
        }}>

       {/* // */}
        {/* // start of banner slider */}

        <View
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
    </View>
        {/* ////slider end */}
         {/* <View style={styles.bannerview}>
        <Image
          style={{
            width: "100%",
            borderRadius: wp(2),
            height: "100%",
            resizeMode: "contain",
          }}
          source={{
            uri: "https://neilpatel.com/wp-content/uploads/2021/02/ExamplesofSuccessfulBannerAdvertising.jpg",
          }}
        />
      </View> */}

         

        <View style={styles.latestSearchList}>
        <View>

              <VideoActive width={23} height={23} />
          </View>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderSearches(item)}
          />
        </View>
        
        {/* //////////// top start */}
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom:30 }}
        >
          <View style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
            {dataTopVideos === undefined ? (
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
              <TouchableOpacity style={{ width: '100%', height: "100%", borderRadius: wp(5) }} onPress={() => navigation.navigate('VideoPlayerScreen', {videoUri: dataTopVideos.video , identifier: false})}>
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
                source={{ uri: dataTopVideos?.video }}
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
                  marginLeft:12
                }}
              >
                {dataTopVideos?.name}
              </Text>
            </View>
          </View>

          <View style={{ justifyContent: "flex-start", width: "50%", paddingTop:2 }}>
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
        {/* //////////////////////////// */}
        {/* <View
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
              source={appImages?.videoPlaceHolder}
            />
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
                  fontSize: hp(1.5),
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
        </View> */}

{/* <View style={{  width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',}}>
      <Video
        source={{ uri: dataTopVideos?.video }}
        style={{ flex: 1,
          width: '100%',
          height: '100%',}}
        controls={true} // Show video controls
        resizeMode="contain"
      />
    </View> */}

<View style={{  flex: 1, marginTop:hp(2),
    marginBottom: hp(5)}}>
      {loading ? (
        <ActivityIndicator size="large" color="#FACA4E" />
      ) : noData ? (
        <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
         <Text style={{ fontFamily: "Inter-Medium",}}>No data for this category</Text>
      </View>
       
      ) : (
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.title}
        />
      )}
    </View>

{/* /////////////////////////////////////////////////////////////// */}

        {/* <View
          // onPress={() => navigation.navigate('ViewVideo')}
          style={{marginTop: hp(1.5), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Trending
          </Text>

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
                {data?.length === 0 ? (
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
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsVideo(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Latest Video
          </Text>

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
                {dataLatestVideos?.length === 0 ? (
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
                    showsHorizontalScrollIndicator={false}
                    data={dataLatestVideos}
                    horizontal
                    // keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsVideo(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Most Viewed
          </Text>

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
                {dataMostViewedVideos?.length === 0 ? (
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
                    showsHorizontalScrollIndicator={false}
                    data={dataMostViewedVideos}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsVideo(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Most Commented
          </Text>

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
                {dataMostCommentedVideos?.length === 0 ? (
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
                    showsHorizontalScrollIndicator={false}
                    data={dataMostCommentedVideos}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsVideo(item)}
                  />
                )}
              </>
            )}
          </View>
        </View> */}


           {/* // start of banner slider */}
           <View
          style={{
            alignItems: "center",
            height: hp(16),
            // marginLeft: 8,
            marginVertical: hp(2),
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : adsinActiveData.length === 0 ? (
            <View style={styles.TopBannerView}>
              <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                No Banner
              </Text>
            </View>
          ) : (
            <Carousel
              data={adsinActiveData}
              renderItem={({ item }) => (
                <View
                  key={item.id}
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: item?.image }}
                    style={{
                      height: hp(15),
                      width: "100%",
                      borderWidth: 1,
                      resizeMode: "contain",
                      borderRadius: 10,
                    }}
                  />
                </View>
              )}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width * 0.9}
              loop={true}
              autoplay={true}
            />
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => ref_RBSheetCamera.current.open()}
        style={{position: 'absolute', bottom: 1, right: 25}}>
        <Add />
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bannerview: {
    height: hp(15),
    marginTop: hp(2),
    alignSelf: "center",
    resizeMode: "cover",
    width: "100%",
    borderRadius: wp(2),
    paddingHorizontal: wp(5),
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(3),
    //borderWidth: 3,
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
  searchesDetails: {
    flexDirection: 'row',
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    //width: wp(30),
    padding: wp(3.3),
    backgroundColor: '#F2F2F2',
    borderRadius: wp(5),
    //height: hp(5),
  },
  textSearchDetails: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: hp(1.8),
    textAlign: 'center',
  },
  textHeader: {
    fontSize: wp(5.7),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },

  header: {
    flexDirection: 'row',
    height: hp(6.2),
    marginTop: hp(3),
    alignItems: 'center',
    marginHorizontal: wp(8),
  },
  headerText: {
    fontSize: hp(2.5),
    alignSelf: 'center',
    marginLeft: wp(23),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
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
  TopBannerView: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  itemContainer: {
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
  text: {
    fontWeight: "700",
    color: "#4A4A4A",
    fontSize: hp(2),
    // textAlign: 'left',
    fontFamily: "Inter",
    marginTop: 5,
    fontSize: hp(1.9),
    // right: "20%",
  },
  text1: {
    color: "#4A4A4A",
    fontSize: hp(1.5),
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
              marginBottom:6
              // top: "6%",
  },
  videoItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: 120,
    height: 90,
    borderRadius: 8,
  },

  noDataText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    color: 'gray',
  },
});
