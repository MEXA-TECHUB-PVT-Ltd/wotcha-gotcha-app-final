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
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appImages } from "../../../assets/utilities";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NonVerified from "../../../assets/svg/NonVerified.svg";
import { base_url } from "../../../../../baseUrl";

const Test = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [selectedItemVideoId, setSelectedItemVideoId] = useState(null); // Set selectedItemVideoId to 17 initially
  const [selectedItemDiscId, setSelectedItemDiscId] = useState(1);
  const [selectedItemPicsId, setSelectedItemPicsId] = useState(null);
  const [selectedItemIdMarket, setSelectedItemIdMarket] = useState(null);
  const [categoriesSelectMarket, setCategorySelectMarket] = useState([]);
  const RegionArea = ["Africa", "Europe", "Americas", "Asia", "Middle East"];
  const renderSearchesVideo = (item) => {
    const isSelected = selectedItemVideoId === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedItemVideoId(item.id); // Update selectedItemVideoId when item is selected
          // console.log("Selected item:", item.id);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSearchesPic = (item) => {
    // console.log('Items for search pics-------', item.id);
    const isSelected = selectedItemPicsId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedItemPicsId(item.id);
          // console.log('Selected item:', item.title);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {item.name}
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
        const id = selectedItemVideoId || 17;
        const picId = selectedItemPicsId || 5;
        const marketId = selectedItemIdMarket || "Africa";
        const DiscId = selectedItemDiscId || 1;

        // const fetchFunctions = [
        //   fetchCategory,
        //   fetchTopVideos,
        //   fetchTrendingVideos,
        //   fetchLatestVideos,
        //   fetchMostViewedVideos,
        //   fetchMostCommentedVideos,
        //   fetchTopNews,
        //   fetchNews,
        //   fetchCategoryPics,
        //   fetchTopPics,
        //   fetchTrendingPics,
        //   fetchLatestPics,
        //   fetchMostViewedPics,
        //   fetchMostCommentedPics,
        //   fetchTopMarket,
        //   fetchCategoryMarket,
        //   fetchElectronicsMarket,
        //   fetchVehiclesMarket,
        //   fetchClothingMarket,
        //   fetchAllMarket,
        //   fetchLetterPublicGeneral,
        //   fetchLetterPrivateCelebrity,
        //   fetchLetterPrivateFriends,
        //   fetchLetterPublicCelebrity,
        //   fetchQAFI,
        //   fetchGEBC,
        // ];
        const fetchFunctions = [
          fetchCategory, // 0
          fetchTopVideos, // 1
          fetchTrendingVideos, // 2
          fetchLatestVideos, // 3
          fetchMostViewedVideos, // 4
          fetchMostCommentedVideos, // 5
          fetchTopNews, // 6
          fetchNews, // 7
          fetchCategoryPics, // 8
          fetchTopPics, // 9
          fetchTrendingPics, // 10
          fetchLatestPics, // 11
          fetchMostViewedPics, // 12
          fetchMostCommentedPics, // 13
          fetchTopMarket, // 14
          fetchCategoryMarket, // 15
          fetchElectronicsMarket, // 16
          fetchVehiclesMarket, // 17
          fetchClothingMarket, // 18
          fetchAllMarket, // 19
          fetchLetterPublicGeneral, // 20
          fetchLetterPrivateCelebrity, // 21
          fetchLetterPrivateFriends, // 22
          fetchLetterPublicCelebrity, // 23
          fetchQAFI, // 24
          fetchGEBC, // 25
        ];

        let newData = [];

        for (let i = 0; i < fetchFunctions.length; i++) {
          try {
            const result = await fetchFunctions[i](
              authToken,
              id,
              picId,
              marketId,
              DiscId
            );
            newData = [...newData, result];
            setData(newData);
            setLoading((prev) =>
              prev.map((item, index) =>
                index === i ? false : index === i + 1 ? true : item
              )
            );
          } catch (err) {
            setError(err);
            setLoading((prev) =>
              prev.map((item, index) => (index === i ? false : item))
            );
            break;
          }
        }
      };

      fetchSequentialData();
    }
  }, [
    authToken,
    selectedItemVideoId,
    selectedItemDiscId,
    selectedItemPicsId,
    selectedItemIdMarket,
  ]);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  // ////////////////////////////api function
  const fetchCategory = async (token, id) => {
    try {
      const response = await fetch(
        base_url + "videoCategory/getAllVideoCategories",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Category------------', result.AllCategories)
      return result.AllCategories.reverse();
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };

  const fetchTopVideos = async (token, id) => {
    try {
      const response = await fetch(base_url + `top/app/top_video/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      // console.log('Top', result.topVideo[0])
      return result.topVideo;
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };
  const fetchTrendingVideos = async (token, id) => {
    try {
      const response = await fetch(
        base_url + `xpi/getTrendingVideosByCategory/${id}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('trending', result.Videos)
      return result.Videos;
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };

  const fetchLatestVideos = async (token, id) => {
    try {
      const response = await fetch(
        base_url + `xpi/getAllRecentVideosByCategory/${id}?page=1&limit=2`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Recent', result.Videos)
      return result.Videos;
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };

  const fetchMostViewedVideos = async (token, id) => {
    try {
      const response = await fetch(
        base_url + `xpi/getMostViewedVideosByCategory/${id}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Viewed', result.Videos)
      return result.Videos;
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };

  const fetchMostCommentedVideos = async (token, id) => {

    try {
      const response = await fetch(
        base_url + `xpi/getMostCommentedVideosByCategory/${id}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Commented', result.Videos)
      return result.Videos;
    } catch (error) {
      console.error("Error Trending:", error);
      throw error;
    }
  };

  // ////Fetch News
  const fetchNews = async () => {
    //   console.log('Categry in id', categoryIdNews);
    //   console.log('News Called');
    const token = authToken;

    try {
      const response = await fetch(
        // base_url + `news/getAllNewsByCategory/${categoryIdNews}?page=1&limit=100`,
        base_url + "news/getAllNewsByCategory/3?page=1&limit=100",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      return result.AllQAFIs;
      // fetchTopNews();
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchTopNews = async (token) => {
    try {
      const response = await fetch(
        base_url + "top/getAllTopQAFIByCategory/3",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of Top News', result.AllQAFI[0]);
      //Alert.alert(result)
      return result.AllQAFI[0];
      // setTopNewsData(result.AllQAFI[0]); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchQAFI = async (token) => {
    //   console.log(' QAFI in id', categoryIdNews);
    // const token = authToken;

    try {
      const response = await fetch(
        // base_url + `qafi/getAllQafisByCategory/${categoryIdNews}?page=1&limit=50`,
        base_url + "qafi/getAllQafisByCategory/3?page=1&limit=50",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log("Resultings of QAFI", result.QAFIs);
      //Alert.alert(result)
      return result.QAFIs;
      // setQAFIData(result.QAFIs); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchGEBC = async (token, id, picId, marketId) => {
    //   console.log('Categry in id', categoryIdNews);
    // const token = authToken;

    try {
      const response = await fetch(
        // base_url + `gebc/getAllGEBCsByCategory/${categoryIdNews}?page=1&limit=50`,
        base_url + `gebc/getAllGEBCsByCategory/3?page=1&limit=50`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of GEBC', result.GEBCs);
      //Alert.alert(result)
      return result.GEBCs;
      // setGEBCData(result.GEBCs); // Update the state with the fetched data
      // fetchTopNews();
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchLetterPublicGeneral = async (token) => {
    // setLoading(true);
    //   console.log('Categry in id', categoryIdNews);
    // const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/public_general_by_category/3/?page=1&limit=100`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log(
        "Resultings of fetchLetterPublicGeneral letter--",
        result.AllLetter
      );
      return result.AllLetter;

      // setOpensLettersPublicGeneralData(result.AllLetter); // Update the state with the fetched data
      // await fetchLetterPublicCelebrity();
    } catch (error) {
      setLoading(false);
      console.error("Error Trending:", error);
    }
  };

  const fetchLetterPublicCelebrity = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/public_celebrity_by_category/3/?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of fetchLetterPublicCelebrity-----', result.AllLetter);
      return result.AllLetter;

      // setOpensLettersPublicCelebrityData(result.AllLetter); // Update the state with the fetched data
      // await fetchLetterPrivateFriends();
    } catch (error) {
      setLoading(false);

      console.error("Error Trending:", error);
    }
  };

  const fetchLetterPrivateFriends = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/private_friends_by_category/3/?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of fetchLetterPrivateFriends', result.AllLetter);
      //Alert.alert(result)
      return result.AllLetter;
      // setOpensLettersPrivateFriendsData(result.AllLetter); // Update the state with the fetched data
      // await fetchLetterPrivateCelebrity();
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchLetterPrivateCelebrity = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/private_celebrity_by_category/3/?page=1&limit=2`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of fetchLetterPrivateCelebrity', result.AllLetter);
      return result.AllLetter;

      // setOpensLettersPrivateCelebrityData(result.AllLetter); // Update the state with the fetched data
      // fetchTopNews();
      // setLoading(false);
    } catch (error) {
      // setLoading(false);

      console.error("Error Trending:", error);
    }
  };

  //DISC

  // ////Fetch Pics
  const fetchCategoryPics = async (token) => {
    // const token = authToken;

    try {
      const response = await fetch(
        base_url + "picCategory/getAllPicCategories?page=1&limit=5",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Search fetchCategoryPics-----------', result.AllCategories);
      return result.AllCategories;
      // setSearchesPics(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error("Error in fetchCategoryPics :", error);
    }
  };

  const fetchTopPics = async (token, id, picId) => {
    // console.log('picid ---------', picId)
    try {
      const response = await fetch(base_url + `top/app/top_tour/${picId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      // console.log("Top  topTour-----------", result.topTour[0]);
      return result.topTour;
      // setSearchesPics(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error("Error in topTour :", error);
    }
  };

  const fetchTrendingPics = async (token, id, picId) => {
    // const token = authToken;

    try {
      const response = await fetch(
        base_url +
          `picTour/getAllTrendingToursByCategory/${picId}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings Pics Tourzs', result.Tours);
      return result.Tours;
      // setDataPics(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchLatestPics = async (token, id, picId) => {
    //   console.log('selected id latest videos', authToken);

    // const token = authToken;

    try {
      const response = await fetch(
        base_url +
          `picTour/getAllRecentVideosByCategory/${picId}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      return result.Tours;
      // console.log('Resultings', result.Tours);
      // setDataLatestPics(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error("Error in fetchLatestPics:", error);
    }
  };

  const fetchMostViewedPics = async (token, id, picId) => {
    try {
      const response = await fetch(
        base_url +
          `picTour/getMostViewedToursByCategory/${picId}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings Most Viewed', result.Tours);
      return result.Tours;
      // setMostViewedPics(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error("Error in fetchMostViewedPics:", error);
    }
  };
  const fetchMostCommentedPics = async (token, id, picId) => {
    try {
      const response = await fetch(
        base_url +
          `picTour/getMostCommentedToursByCategory/${picId}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      return result.Tours;
    } catch (error) {
      console.error("Error in fetchMostCommentedPics:", error);
    }
  };
  // ///Fetch Pic end

  // fetch Market start
  // console.log('market ki id aaaii-----------', selectedItemIdMarket)
  const fetchTopMarket = async (token) => {
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
      return result.topitem;
      // setDataTopVideosMarket(result.topitem[0]);
    } catch (error) {
      console.error("Error in fetchTopMarket:", error);
    }
  };

  const fetchCategoryMarket = async () => {
    //   console.log(' Categories Result', result);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "itemCategory/getAllItemCategories?page=1&limit=5",
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
          label: category.name,
          value: category.id.toString(),
        }));

        setCategorySelectMarket(categories);

        //   console.log('Data Categories', categoriesSelectMarket);
      } else {
        console.error(
          "Failed to fetch categories:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error in fetchCategoryMarket:", error);
    }
  };

  const fetchElectronicsMarket = async (token, id, picId, marketId) => {
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
          `item/getAllItemByCategory/6?page=1&limit=5&region=${marketId}`,
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
          `item/getAllItemByCategory/7?page=1&limit=5&region=${marketId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      return result.AllItems;
      // console.log('AllItems', result.AllItems);
      // setDataClothingMarket(result.AllItems);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };
  const fetchAllMarket = async (token) => {
    // const token = authToken;
    // console.log('token aya ', token)

    try {
      const response = await fetch(
        base_url + "item/getAllItems?page=1&limit=2",
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
      console.error("Error in fetchAllMarket:", error);
    }
  };

  // fetch market end
  const renderPublicGeneral = (item) => {
    //   console.log('Item', item);
    const imageUrl =
      item.images && item.images[0]
        ? item.images[0].startsWith("/fileUpload")
          ? base_url + `${item.images[0]}`
          : item.images[0]
        : null;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("LetterDetails", { Letters: item })}
        style={{ width: wp(25.5), margin: 5 }}
      >
        <View>
          {item.images && item.images[0] ? (
            <Image
              style={{
                height: hp(12),
                width: wp(23),
              }}
              source={{ uri: imageUrl }}
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
  /////////Fetch news end
  // ///////////Trending
  const renderAvailableAppsVideo = (item) => {
    // console.log("Itemsss", item);
    //   console.log('Video Link', item.thumbnail);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewVideo", { videoData: item })}
        style={{ width: wp(27), margin: 5 }}
      >
        <View>
          {item.thumbail === "" ||
          item.thumbnail === null ||
          // item.thumbnail.startsWith('/') ||
          item.thumbnail === undefined ? (
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
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: "cover",
              }}
              source={{ uri: item.thumbnail }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: wp(0.5),
            marginTop: hp(12.5),
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              fontFamily: "Inter-Regular",
              color: "#000000",
              width: wp(23),
            }}
          >
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  ///////////////////////////
  //   //////////////////////////////  DISC START

  const searchesDisc = [
    { id: 1, title: "On News" },
    { id: 2, title: "Open Letters" },
    { id: 3, title: "QAFI" },
    { id: 4, title: "EBC" },
  ];

  const renderAvailableDiscApps = (item) => {
    //   console.log('Items of News', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewNews", { picData: item })}
        style={{ width: wp(25.5), margin: 5 }}
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
          {item?.userimage ? (
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
                source={{ uri: item?.userimage }}
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
              }}
            >
              <MaterialCommunityIcons
                style={{ marginTop: hp(0.5) }}
                name={"account-circle"}
                size={30}
                color={"#FACA4E"}
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
              color: "#000000",
              fontWeight: "bold",
              fontFamily: "Inter",
            }}
          >
            {item.username}
          </Text>

          <View style={{ marginLeft: wp(1) }}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsQAFI = (item) => {
    //   console.log('Items of QAFI', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewQAFI", { picData: item })}
        style={{ width: wp(25.5), margin: 5 }}
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
          {item?.userimage ? (
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
                source={{ uri: item?.userimage }}
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
              }}
            >
              <MaterialCommunityIcons
                style={{ marginTop: hp(0.5) }}
                name={"account-circle"}
                size={30}
                color={"#FACA4E"}
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
              color: "#000000",
              fontWeight: "bold",
              fontFamily: "Inter",
            }}
          >
            {item.username}
          </Text>

          <View style={{ marginLeft: wp(1) }}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsDiscGEBC = (item) => {
    //   console.log('Items of GEBC', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewGEBC", { picData: item })}
        style={{ width: wp(25.5), margin: 5 }}
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
          <Text style={{ fontSize: hp(5) }}>{item.image}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(1),
            height: hp(7),
            width: wp(25),
          }}
        >
          {item?.userimage ? (
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
                source={{ uri: item?.userimage }}
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
              }}
            >
              <MaterialCommunityIcons
                style={{ marginTop: hp(0.5) }}
                name={"account-circle"}
                size={30}
                color={"#FACA4E"}
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
              color: "#000000",
              fontWeight: "bold",
              fontFamily: "Inter",
            }}
          >
            {item.username}
          </Text>

          <View style={{ marginLeft: wp(1) }}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderDiscSearches = (item) => {
    // console.log('Items id', item.id);
    const isSelected = selectedItemDiscId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetailsDisc,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedItemDiscId(item.id);
          console.log("Selected Disc item:", item.id);
        }}
        // onPress={() => {
        //   setSelectedItemDiscId(item.id);
        //   console.log("Selected item:", item.id);
        //   if (item.id === 1) {
        //     setSelectedItemDiscId(1);
        //     // fetchNews();
        //     // navigation.navigate('ViewAllCategoriesDashboard');
        //     console.log("Fetch News screen item");
        //   } else if (item.id === 2) {
        //     setSelectedItemDiscId(2);
        //     fetchLetterPublicGeneral();
        //     console.log("On Letter id", item.id);
        //   } else if (item.id === 3) {
        //     setSelectedItemDiscId(3);
        //     fetchQAFI();
        //     console.log("On QAFI", item.id);
        //     // navigation.navigate('ViewAllCategoriesQAFIDashboard');
        //   } else if (item.id === 4) {
        //     setSelectedItemDiscId(4);
        //     fetchGEBC();
        //     console.log("On GEBS", item.id);
        //     // navigation.navigate('ViewAllCategoriesGEBCDashboard');
        //   }
        // }}
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

  const DiscScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
        >
          <View
            style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
          >
            {data[6] === undefined || data[6]?.length === 0 ? (
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
                //onPress={() => navigation.navigate('News')}
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                {loading[6] && (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
                {!loading[6] && data[6] && (
                  <View>
                    <FlatList
                      data={data[6]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => {
                        return (
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
                            source={{ uri: item.image }}
                          />
                        );
                      }}
                    />
                  </View>
                )}
              </View>
            )}

            <View style={{ justifyContent: "center", flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: hp(7),
                  width: wp(35),
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.5),
                    marginLeft: wp(2.5),
                    fontFamily: "Inter-Regular",
                    color: "#000000",
                  }}
                >
                  {data[6] === undefined || data[6].length === 0
                    ? "Does not contain any top news"
                    : data[6]?.description}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[7] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[7]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[7]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableDiscApps(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[7] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[7]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[7]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableDiscApps(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[7] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[7]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[7]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableDiscApps(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[7] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[7]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[7]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableDiscApps(item)}
                    />
                  </View>
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
      <View style={{ flex: 1 }}>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
        >
          {data[6] === undefined || data[6]?.length === 0 ? (
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
          )}

          <View style={{ justifyContent: "center", flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: hp(7),
                width: wp(35),
              }}
            >
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontFamily: "Inter-Regular",
                  color: "#000000",
                }}
              >
                {data[6] === undefined || data[6].length === 0
                  ? "Does not contain any top news"
                  : data[6]?.description}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: hp(21) }}>
          <Text
            style={{ color: "#4A4A4A", fontWeight: "bold", fontSize: hp(2) }}
          >
            Public (general)
          </Text>
          {loading[20] && <ActivityIndicator size="large" color="#0000ff" />}
          {!loading[20] && data[20] && (
            <FlatList
              data={data[20]}
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: "center" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderPublicGeneral(item)}
            />
          )}
        </View>

        <View style={{ marginTop: hp(5), height: hp(21) }}>
          <Text
            style={{ color: "#4A4A4A", fontWeight: "bold", fontSize: hp(2) }}
          >
            Public (to authorities, celebrities, leaders)
          </Text>
          {loading[23] && <ActivityIndicator size="large" color="#0000ff" />}
          {!loading[23] && data[23] && (
            <FlatList
              data={data[23]}
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: "center" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderPublicGeneral(item)}
            />
          )}
        </View>

        <View style={{ marginTop: hp(5), height: hp(21) }}>
          <Text
            style={{ color: "#4A4A4A", fontWeight: "bold", fontSize: hp(2) }}
          >
            Private (to friends, peers, followers)
          </Text>
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
        </View>

        <View style={{ marginTop: hp(5), height: hp(21) }}>
          <Text
            style={{ color: "#4A4A4A", fontWeight: "bold", fontSize: hp(2) }}
          >
            Private (to authorities, celebrities, leaders){" "}
          </Text>

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
        </View>
      </View>
    );
  };

  const QAFI = () => {
    //   console.log('Came to QAFI');
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
        >
          {data[6] === undefined || data[6]?.length === 0 ? (
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
              //onPress={() => navigation.navigate('News')}
              style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
            >
              {loading[6] && <ActivityIndicator size="large" color="#0000ff" />}
              {!loading[6] && data[6] && (
                <View>
                  <FlatList
                    data={data[6]}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={({ item }) => {
                      return (
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
                          source={{ uri: item.image }}
                        />
                      );
                    }}
                  />
                </View>
              )}
            </View>
          )}

          <View style={{ justifyContent: "center", flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: hp(7),
                width: wp(35),
              }}
            >
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontFamily: "Inter-Regular",
                  color: "#000000",
                }}
              >
                {data[6] === undefined || data[6].length === 0
                  ? "Does not contain any top news"
                  : data[6]?.description}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[24] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[24]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[24]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableAppsQAFI(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[24] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[24]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[24]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableAppsQAFI(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[24] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[24]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[24]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableAppsQAFI(item)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[24] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[24]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[24]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => renderAvailableAppsQAFI(item)}
                    />
                  </View>
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
      <View style={{ flex: 1 }}>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
        >
          <View
            style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(18) }}
          >
            {data[6] === undefined || data[6]?.length === 0 ? (
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
                //onPress={() => navigation.navigate('News')}
                style={{ width: wp(35), height: "100%", borderRadius: wp(5) }}
              >
                {loading[6] && (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
                {!loading[6] && data[6] && (
                  <View>
                    <FlatList
                      data={data[6]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) => {
                        return (
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
                            source={{ uri: item.image }}
                          />
                        );
                      }}
                    />
                  </View>
                )}
              </View>
            )}

            <View style={{ justifyContent: "center", flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: hp(7),
                  width: wp(35),
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.5),
                    marginLeft: wp(2.5),
                    fontFamily: "Inter-Regular",
                    color: "#000000",
                  }}
                >
                  {data[6] === undefined || data[6].length === 0
                    ? "Does not contain any top news"
                    : data[6]?.description}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[25] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[25]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[25]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) =>
                        renderAvailableAppsDiscGEBC(item)
                      }
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>
        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[25] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[25]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[25]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) =>
                        renderAvailableAppsDiscGEBC(item)
                      }
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[25] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[25]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[25]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) =>
                        renderAvailableAppsDiscGEBC(item)
                      }
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ marginTop: hp(2), height: hp(23) }}>
          <View style={{ marginTop: hp(1), height: "100%" }}>
            {loading[25] ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {data[25]?.length === 0 ? (
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
                  <View>
                    <FlatList
                      data={data[25]}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({ item }) =>
                        renderAvailableAppsDiscGEBC(item)
                      }
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  //////Pics Start
  const renderAvailableAppsPics = (item) => {
    //   console.log('Items of Pics', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("PicDetails", { picData: item })}
        style={{ width: wp(27), margin: 5 }}
      >
        <View>
          {!item.image ||
          item.image === "undefined" ||
          item.image.startsWith("/") ? (
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
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: "cover",
              }}
              source={{ uri: item.image }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: wp(0.5),
            marginTop: hp(12.5),
          }}
        >
          <Text
            style={{
              fontSize: hp(1.5),
              fontFamily: "Inter-Regular",
              color: "#000000",
              width: wp(23),
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  ///// Pics End
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
            top: hp(12),
            left: 7,
            //height: hp(3),
            //width: wp(21),
            //borderRadius: wp(3),
            //backgroundColor: '#FACA4E',
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2, // Ensure it's on top
          }}
        >
          <Text
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
    const isSelected = selectedItemIdMarket === item;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
          },
        ]}
        onPress={() => {
          setSelectedItemIdMarket(item);
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
  //Your FlatList rendering the search ite

  return (
    <ScrollView>
      <View style={styles.bannerview}>
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
      </View>

      <View style={{ marginTop: hp(1), marginHorizontal: wp(8) }}>
        <Text
          style={{ color: "#FACA4E", fontWeight: "bold", fontSize: hp(2.3) }}
        >
          Video Mania
        </Text>
      </View>

      {/* Top Video */}

      {/*   Top Video End */}
      {/* //// */}
      {loading[0] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[0] && data[0] && (
        <View>
          <FlatList
            data={data[0]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => renderSearchesVideo(item)}
          />
        </View>
      )}

      {/*  */}

      {loading[1] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[1] && data[1] && (
        <View>
          <FlatList
            data={data[1]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => {
              // console.log("top Item:-----------", item); // Corrected console.log syntax
              return (
                <View
                  style={{
                    marginTop: hp(1.5),
                    marginLeft: wp(2.5),
                    flexDirection: "row",
                    height: hp(17),
                  }}
                >
                  <View
                    onPress={() => navigation.navigate("ViewVideo")}
                    style={{
                      width: wp(39),
                      height: "100%",
                      borderRadius: wp(5),
                    }}
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
                      source={appImages.videoPlaceHolder}
                    />
                    <View
                      style={{
                        position: "absolute",
                        top: hp(10),
                        left: 10,
                        //height: hp(3),
                        //width: wp(21),
                        //borderRadius: wp(3),
                        //backgroundColor: '#FACA4E',
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 2, // Ensure it's on top
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: hp(2.1),
                          fontFamily: "Inter",
                          color: "black",
                          fontWeight: "700",
                        }}
                      >
                        {item?.name}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: hp(3),
                      height: hp(12.8),
                      width: "45%",
                      marginHorizontal: wp(1.5),
                    }}
                  >
                    <Text
                      numberOfLines={5}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: hp(1.5),
                        //marginLeft: wp(1),
                        lineHeight: hp(2),
                        fontFamily: "Inter-Regular",
                        color: "#000000",
                        //fontWeight: '700',
                      }}
                    >
                      {item?.description}
                    </Text>
                  </View>
                </View>
              );
            }}
            //   renderItem={({ item }) => <Text>{item.name}</Text>}
          />
        </View>
      )}
      {/* Top end */}

      {/* Treding Start */}

      {/* treding End */}
      {loading[2] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[2] && data[2] && (
        <View>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            Trending
          </Text>
          <FlatList
            data={data[2]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => renderAvailableAppsVideo(item)}
          />
        </View>
      )}
      {loading[3] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[3] && data[3] && (
        <View>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            Latest Video
          </Text>
          <FlatList
            data={data[3]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => renderAvailableAppsVideo(item)}
          />
        </View>
      )}

      {loading[4] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[4] && data[4] && (
        <View>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            Most Viewed
          </Text>
          <FlatList
            data={data[4]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => renderAvailableAppsVideo(item)}
          />
        </View>
      )}

      {loading[5] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[5] && data[5] && (
        <View>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            Most Commented
          </Text>
          <FlatList
            data={data[5]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => renderAvailableAppsVideo(item)}
          />
        </View>
      )}

      {/* //-------------------------------------------------------------\\ */}

      <View style={styles.bannerview}>
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
      </View>

      {/* Disc */}

      {/* DISC start */}
      <View style={{ marginTop: hp(1), marginHorizontal: wp(8) }}>
        <Text
          style={{ color: "#FACA4E", fontWeight: "bold", fontSize: hp(2.3) }}
        >
          DISC
        </Text>
      </View>

      <View style={styles.latestSearchListDisc}>
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: "center" }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={searchesDisc}
          renderItem={({ item }) => renderDiscSearches(item)}
          // renderItem={({ item }) => {
          //   console.log("DISC ITEM:", item);}}
          // renderItem={({item}) => renderDiscSearches(item)}
        />
      </View>
      <View></View>
      {selectedItemDiscId === 1 ? (
        <DiscScreen />
      ) : selectedItemDiscId === 2 ? (
        <OpenLetters />
      ) : selectedItemDiscId === 3 ? (
        <QAFI />
      ) : selectedItemDiscId === 4 ? (
        <GEBC />
      ) : null}
      {/* ////////DISC End */}

      {/* Pic Tours */}

      <View style={styles.bannerview}>
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
      </View>

      <Text
        style={{
          color: "#FACA4E",
          marginLeft: wp(3),
          fontFamily: "Inter-Bold",
          fontSize: hp(2.3),
        }}
      >
        Pic Tours
      </Text>

      <View style={[styles.latestSearchListPicss, { marginLeft: wp(3) }]}>
        {loading[8] && <ActivityIndicator size="large" color="#0000ff" />}
        {!loading[8] && data[8] && (
          <View>
            <FlatList
              data={data[8]}
              // style={{flex: 1}}
              contentContainerStyle={{ alignItems: "center" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => renderSearchesPic(item)}
            />
          </View>
        )}
      </View>

      {loading[9] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[9] && data[9] && (
        <FlatList
          data={data[9]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => {
            // console.log("top Item in ui:-----------", item); // Corrected console.log syntax
            return (
              <View
                style={{
                  marginTop: hp(1.5),
                  flexDirection: "row",
                  height: hp(18),
                }}
              >
                <View
                  style={{
                    width: wp(35),
                    marginLeft: wp(2.5),
                    height: "100%",
                    borderRadius: wp(5),
                  }}
                >
                  {!item?.image ||
                  item?.image === "undefined" ||
                  item?.image.startsWith("/") ? (
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
                      source={{ uri: item.image }}
                    />
                  )}
                  <View
                    style={{
                      position: "absolute",
                      top: hp(14),
                      left: 7,
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2, // Ensure it's on top
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp(1.6),
                        fontFamily: "Inter",
                        // color: 'red',
                        fontWeight: "700",
                      }}
                    >
                      {item?.username}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: hp(0.8),
                    marginLeft: wp(3),
                    width: "35%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: hp(1.6),
                      marginLeft: wp(1),
                      lineHeight: 15.5,
                      marginTop: hp(5),
                      fontFamily: "Inter-Regular",
                      color: "#000000",
                      //fontWeight: '700',
                    }}
                  >
                    {item.length === 0 ? "No Top Pic Shown" : item?.description}
                  </Text>
                </View>
              </View>
            );
          }}
          //   renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      )}

      {/* treding End */}
      {loading[10] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[10] && data[10] && (
        <View>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            Trending
          </Text>
          <FlatList
            data={data[10]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => renderAvailableAppsPics(item)}
          />
        </View>
      )}
      {loading[11] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[11] && data[11] && (
        <View>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            Latest Video
          </Text>
          <FlatList
            data={data[11]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => renderAvailableAppsPics(item)}
          />
        </View>
      )}

      {loading[12] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[12] && data[12] && (
        <View>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            Most Viewed
          </Text>
          <FlatList
            data={data[12]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => renderAvailableAppsPics(item)}
          />
        </View>
      )}

      {loading[13] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[13] && data[13] && (
        <View>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: "Inter",
              color: "#4A4A4A",
              fontWeight: "bold",
            }}
          >
            Most Commented
          </Text>
          <FlatList
            data={data[13]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => renderAvailableAppsPics(item)}
          />
        </View>
      )}

      {/* //-------------------------------------------------------------\\ */}

      {/* //-------------\\ */}

      <View style={styles.bannerview}>
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
      </View>

      {/* Market Zone */}

      <View style={{ marginTop: hp(1), marginLeft: wp(5) }}>
        <Text
          style={{ color: "#FACA4E", fontWeight: "bold", fontSize: hp(2.3) }}
        >
          Market Zone
        </Text>
      </View>

      <View style={styles.latestSearchListMarket}>
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
      {/* top marcket start */}
      {loading[14] && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading[14] && data[14] && (
        <View>
          <FlatList
            data={data[14]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => {
              // console.log("top Item:-----------", item); // Corrected console.log syntax
              return (
                <View
                  style={{
                    marginTop: hp(1.5),
                    flexDirection: "row",
                    height: hp(18),
                  }}
                >
                  <View
                    style={{
                      width: wp(35),
                      marginLeft: wp(2.5),
                      height: "100%",
                      borderRadius: wp(5),
                    }}
                  >
                    {!item?.image ||
                    item?.image === "undefined" ||
                    item?.image.startsWith("/") ? (
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
                        source={{ uri: item?.image }}
                      />
                    )}
                    <View
                      style={{
                        position: "absolute",
                        top: hp(14),
                        left: 7,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 2, // Ensure it's on top
                      }}
                    >
                      <Text
                        style={{
                          fontSize: hp(1.6),
                          fontFamily: "Inter",
                          // color: 'red',
                          fontWeight: "700",
                        }}
                      >
                        {item?.username}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: hp(0.8),
                      marginLeft: wp(3),
                      width: "35%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp(1.6),
                        marginLeft: wp(1),
                        lineHeight: 15.5,
                        marginTop: hp(5),
                        fontFamily: "Inter-Regular",
                        color: "#000000",
                        //fontWeight: '700',
                      }}
                    >
                      {item.length === 0
                        ? "No Top Pic Shown"
                        : item?.description}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}

      {/* Market Lable start */}
      <View style={{ marginTop: hp(2), height: hp(23) }}>
        <Text
          style={{
            fontSize: hp(2.3),
            fontFamily: "Inter",
            color: "#4A4A4A",
            fontWeight: "bold",
          }}
        >
          {categoriesSelectMarket[0]?.label}
        </Text>

        <View style={{ marginTop: hp(1), height: "100%" }}>
          {loading[16] ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : data[16]?.length === 0 ? (
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
              data={data[16]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderAvailableAppsMarket(item)}
            />
          )}
        </View>
      </View>
      {/* market lable two */}
      <View style={{ marginTop: hp(2), height: hp(23) }}>
        <Text
          style={{
            fontSize: hp(2.3),
            fontFamily: "Inter",
            color: "#4A4A4A",
            fontWeight: "bold",
          }}
        >
          {categoriesSelectMarket[1]?.label}
        </Text>

        <View style={{ marginTop: hp(1), height: "100%" }}>
          {loading[17] ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : data[17]?.length === 0 ? (
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
              data={data[17]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderAvailableAppsMarket(item)}
            />
          )}
        </View>
      </View>
      {/*  Market lable three */}
      <View style={{ marginTop: hp(2), height: hp(23) }}>
        <Text
          style={{
            fontSize: hp(2.3),
            fontFamily: "Inter",
            color: "#4A4A4A",
            fontWeight: "bold",
          }}
        >
          {categoriesSelectMarket[2]?.label}
        </Text>

        <View style={{ marginTop: hp(1), height: "100%" }}>
          {loading[18] ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : data[18]?.length === 0 ? (
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
              data={data[18]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderAvailableAppsMarket(item)}
            />
          )}
        </View>
      </View>
      {/*  market lable four start */}
      <View style={{ marginTop: hp(2), height: hp(23) }}>
        <Text
          style={{
            fontSize: hp(2.3),
            fontFamily: "Inter",
            color: "#4A4A4A",
            fontWeight: "bold",
          }}
        >
          {categoriesSelectMarket[3]?.label}
        </Text>

        <View style={{ marginTop: hp(1), height: "100%" }}>
          {loading[19] ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : data[19]?.length === 0 ? (
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
              data={data[19]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => renderAvailableAppsMarket(item)}
            />
          )}
        </View>
      </View>

      {/* top market end */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginHorizontal: wp(3),
    backgroundColor: "white",
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
  containerBlur: {
    flex: 1,
    backgroundColor: "rgba(234,233,238)",
    //backgroundColor: 'white'
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
  latestSearchList: {
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
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
  latestSearchList: {
    marginTop: hp(2.1),
    height: hp(7),
    //marginLeft: wp(5),
  },
  searchesDetails: {
    flexDirection: "row",
    marginLeft: wp(3),
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
    marginHorizontal: wp(8),
    //marginLeft: wp(5),
    //borderWidth: 3,
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

  //----------------\\
  //Market Zone

  latestSearchListMarket: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },
});
export default Test;
