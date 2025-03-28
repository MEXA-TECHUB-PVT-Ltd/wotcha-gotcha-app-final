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
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Approved from "../../../assets/svg/Approved.svg";
import { appImages } from "../../../assets/utilities/index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Headers from "../../../assets/Custom/Headers";
import { base_url } from "../../../../../baseUrl";
import { useTranslation } from 'react-i18next';
export default function ViewProfile({ navigation }) {
  const [authToken, setAuthToken] = useState('');
  const { t } = useTranslation();
  const [selectedItemId, setSelectedItemId] = useState(1);

  const [userId, setUserId] = useState("");

  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [videos, setVideos] = useState([]);
  const [pics, setPics] = useState([]);

  const [totalVideos, setTotalVideos] = useState(0);

  const [totalPics, setTotalPics] = useState(0);

  const [marketZone, setMarketZone] = useState([]);

  const [totalMarketZone, setTotalMarketZone] = useState(0);

  const [news, setNews] = useState([]);

  const [totalNews, setTotalNews] = useState(0);

  const [QAFI, setQAFI] = useState([]);

  const [totalQAFI, setTotalQAFI] = useState(0);

  const [GEBC, setGEBC] = useState([]);

  const [sports, setSports] = useState([]);
  const [totalsports, setTotalSports] = useState(0);

  const [totalGEBC, setTotalGEBC] = useState(0);

  const [letter, setLetter] = useState([]);
  const [totalLetter, setTotalLetter] = useState(0);

  const [cinematicvideos, setCinematicVideos] = useState([]);
  const [cinematictotalVideos, setCinematicTotalVideos] = useState(0);

  const [kidsvideos, setKidsVideos] = useState([]);
  const [kidstotalVideos, setKidsTotalVideos] = useState(0);

  const [tvvideos, setTVVideos] = useState([]);
  const [tvtotalVideos, setTVTotalVideos] = useState(0);

  const [learningvideos, setLearningVideos] = useState([]);
  const [learningtotalVideos, setLearningTotalVideos] = useState(0);

  const [fanStarvideos, setfanStarVideos] = useState([]);
  const [fanStartotalVideos, setfanStarTotalVideos] = useState(0);
  const [signatureData, setSignatureData] = useState(null);
  const isFocused = useIsFocused();

  // console.log('image----------------------------', image)
  // useEffect(() => {
  //   fetchVideos();
  // }, [isFocused]);

  // const fetchVideos = async () => {
  //   // Simulate loading
  //   setLoading(true);
  //   await getUserID();
  //   setLoading(false);
  // };

  // const getUserID = async () => {
  //   try {
  //     const result = await AsyncStorage.getItem("authToken ");
  //     if (result !== null) {
  //       setAuthToken(result);
  //       await fetchUserId(result);
  //     }

  //   } catch (error) {

  //     console.error("Error retrieving user ID:", error);
  //   }
  // };

  // const fetchUserId = async (tokens) => {
  //   const result3 = await AsyncStorage.getItem("userId ");
  //   if (result3 !== null) {
  //     setUserId(result3);
  //     fetchUser(tokens, result3);
  //   } else {
  //   }
  // };
  useEffect(() => {
    if (isFocused) {
      fetchVideos();
    }
  }, [isFocused]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken ");
      const user = await AsyncStorage.getItem("userId ");

      if (token && user) {
        setAuthToken(token);
        setUserId(user);
        await fetchUser(token, user);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchUser = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(base_url + `user/getUser/${user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
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
      const reversedData = result.Videos.reverse();
      setVideos(reversedData); // Update the state with the fetched data
      setTotalVideos(result.totalVideos);
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

      setPics(result.Tours); // Update the state with the fetched data
      setTotalPics(result.totalTours);
    } catch (error) {
      console.error("Error PIC TOUR", error);
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
      setSports(result.sports); // Update the state with the fetched data
      setTotalSports(result.totalSports);
    } catch (error) {
      console.error("Error PIC TOUR", error);
    }
  };


  const fetchMyMarketZoneTour = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(base_url + `item/getAllItemByUser/${user}?page=1&limit=500000`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setMarketZone(result.AllItems); // Update the state with the fetched data
      setTotalMarketZone(result.totalItems);
    } catch (error) {
      console.error("Error MARKET ZONE:", error);
    }
  };

  const fetchMyNews = async (tokens, user) => {

    const token = tokens;

    try {
      const response = await fetch(base_url + `news/getAllNewsByUser/${user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      const reversedNewData = result.News;
      setNews(reversedNewData); // Update the state with the fetched data

      setTotalNews(result.totalNews);
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
      setQAFI(reversedData); // Update the state with the fetched data
      setTotalQAFI(result.totalQAFIs);
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
      const reversedData = result.GEBCs; // Update the state with the fetched data
      setGEBC(reversedData);
      setTotalGEBC(result.totalGEBCs);
      setLoading(false);
    } catch (error) {
      console.error("Error GEBC:", error);
    }
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
      const formattedSignatures = result.AllLetters.map((signature) => {
        const imageUrl = signature.signature_image;
        let formattedUrl;
        if (imageUrl.startsWith("/fileUpload")) {
          formattedUrl = base_url + `${imageUrl}`;
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
// console.log('in profile letter----------', formattedSignatures)
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
      setKidsVideos(result.videos); // Update the state with the fetched data
      setKidsTotalVideos(result.totalVideos);
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
      setTVVideos(result.videos); // Update the state with the fetched data
      setTVTotalVideos(result.totalVideos);
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
  
      setfanStarVideos(result.videos); // Update the state with the fetched data
      setfanStarTotalVideos(result.totalVideos);
    } catch (error) {
      console.error("Error VIDEOS", error);
    }
  };


  const renderAvailableApps = (item) => {
 
    const imageUri = item.images[0].image;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetailsProfile", {
            ProductDetails: item,
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

        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsPic = (item) => {
    // const imageUrl =
    //   item.image && item.image
    //     ? item.image.startsWith("/fileUpload")
    //       ? base_url + `${item.image}`
    //       : item.image
    //     : null;
    const imageUrl = item.image && item.image.trim() !== '' 
  ? (item.image.startsWith("/fileUpload") ? `${base_url}${item.image}` : item.image)
  : null;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ViewVideoPicProfile", {
            picData: item,
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
            // source={{ uri: imageUrl }}
            source={imageUrl ? { uri: imageUrl } : appImages.galleryPlaceHolder}
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
 
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableSports = (item) => {
    // const imageUrl =
    //   item.image && item.image
    //     ? item.image.startsWith("/fileUpload")
    //       ? base_url + `${item.image}`
    //       : item.image
    //     : null;
    const imageUrl = item.image && item.image.trim() !== '' 
    ? (item.image.startsWith("/fileUpload") ? `${base_url}${item.image}` : item.image)
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
            // source={{ uri: imageUrl }}
            source={imageUrl ? { uri: imageUrl } : appImages.galleryPlaceHolder}
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

        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsVideo = (item) => {

    return (
      <TouchableOpacity
        onPress={
          () =>
            navigation.navigate("ViewVideo", {
              videoData: item,
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
            // source={{ uri: item.thumbnail }}
            source={
              item?.thumbnail === "" ||
              item?.thumbnail === null ||
              item?.thumbnail === undefined
                ? appImages.galleryPlaceHolder
                : { uri: item.thumbnail }
            }
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
            // source={{ uri: item.thumbnail }}
            source={
              item?.thumbnail === "" ||
              item?.thumbnail === null ||
              item?.thumbnail === undefined
                ? appImages.galleryPlaceHolder
                : { uri: item.thumbnail }
            }
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
        </View>
      </TouchableOpacity>
    );
  };
  const renderKidsVideo = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Kids_vid_details", {
            videoData: item,
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
            // source={{ uri: item.thumbnail }}
            source={
              item?.thumbnail === "" ||
              item?.thumbnail === null ||
              item?.thumbnail === undefined
                ? appImages.galleryPlaceHolder
                : { uri: item.thumbnail }
            }
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
        </View>
      </TouchableOpacity>
    );
  };
  const renderTVVideos = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Tv_Promax_details", {
            videoData: item,
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
            source={
              item?.thumbnail === "" ||
              item?.thumbnail === null ||
              item?.thumbnail === undefined
                ? appImages.galleryPlaceHolder
                : { uri: item.thumbnail }
            }
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

        </View>
      </TouchableOpacity>
    );
  };
  const renderLearnVideo = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Learning_details", {
            videoData: item,
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
            source={
              item?.thumbnail === "" ||
              item?.thumbnail === null ||
              item?.thumbnail === undefined
                ? appImages.galleryPlaceHolder
                : { uri: item.thumbnail }
            }
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
        </View>
      </TouchableOpacity>
    );
  };
  const renderFanstarVideo = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Fans_star_details", {
            videoData: item,
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
            source={
              item?.thumbnail === "" ||
              item?.thumbnail === null ||
              item?.thumbnail === undefined
                ? appImages.galleryPlaceHolder
                : { uri: item.thumbnail }
            }
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


  const renderAvailableAppsGEBC = (item) => {

    const imageUri = item?.image;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewUpdateGEBC", { details: item, identifier: true })}
        style={{ width: wp(35), marginRight: 10, }}
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


  const renderAvailableAppsQAFI = (item) => {
    // console.log('Items Of QAFI', item?.image);
    const imageUri = item?.image;
    // console.log(imageUri);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewUpdateQAFI", { details: item, identifier: true })}
        style={{ width: wp(35), marginRight: 10 }}
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
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsNEWS = (item) => {

    const imageUri = item?.image;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewUpdateNews", { details: item, identifier: true })}
        style={{ width: wp(35), marginRight: 10 }}
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
        </View>
       
      </TouchableOpacity>
    );
  };

  const renderAvailableLetter = (item) => {

    const imageUri = item?.image;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("LetterDetails", {
            Letters: item,
            identifier: true,
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
                    resizeMode: "contain",
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
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginTop: hp(-2),
              width: '40%',
              // paddingRight: wp(3),
            }}
          >
            <Text
              style={{
                color: "#282828",
                // marginLeft: wp(3),
                // width: "25%",
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
              paddingTop: 6,
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
              {t('Dashboard.Subject')}
              {/* Subject: */}
            </Text>
            <View style={{ height: '90%', }}>
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
                    resizeMode: "contain",
                  }}
                />
              </View>
            ) : (
              null
            )}
         
          </View>
          <View
            style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };

  //---------------------------\\

  const data = [
    // { id: "1", total: totalVideos, label: t('MyProfile.VideosMania') },

    { id: "1", total: totalVideos, label:  t('Drawer.VideoMania')},
    { id: "2", total: totalPics, label: t('Drawer.PicTours') },
    { id: "3", total: totalNews, label:  t('Drawer.News') },
    { id: "4", total: totalLetter, label: t('Drawer.OpenLetter') },
    { id: "5", total: totalQAFI, label: t('Drawer.QAFI') },
    { id: "6", total: totalGEBC, label: t('Drawer.EBIC') },
    { id: "7", total: totalsports, label: t('Drawer.Sports')},
 
    { id: "8", total: cinematictotalVideos, label: t('Drawer.Cinematics')},
    { id: "12", total: fanStartotalVideos, label: t('Drawer.Fans_star')},
    { id: "9", total: kidstotalVideos, label: t('Drawer.Kid-Vids') },
    { id: "10", total: tvtotalVideos, label: t('Drawer.TVProgMax')},
    { id: "11", total: learningtotalVideos, label: t('Drawer.LearningHobbies') },
    { id: "13", total: totalMarketZone, label: t('Drawer.MarketZone') },


    // { id: "1", total: totalVideos, label:  'Video Mania'},
    // { id: "2", total: totalPics, label: 'Pic Tours' },
    // { id: "3", total: totalNews, label:  'On-News' },
    // { id: "4", total: totalLetter, label: 'Open Letters' },
    // { id: "5", total: totalQAFI, label: 'QAFI' },
    // { id: "6", total: totalGEBC, label: 'EBIC' },
    // { id: "7", total: totalsports, label: 'Sports & Sports' },
 
    // { id: "8", total: cinematictotalVideos, label: 'Cinematic' },
    // { id: "9", total: kidstotalVideos, label: 'Kid-Vids' },
    // { id: "10", total: tvtotalVideos, label: 'TV ProgMax'},
    // { id: "11", total: learningtotalVideos, label: 'Learnings and Hobbies' },
    // { id: "12", total: fanStartotalVideos, label: 'Fans Stars Zone' },
    // { id: "13", total: totalMarketZone, label: 'Mondo Market' },

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
      <View style={{ marginTop: Platform.OS == "ios" ? 0 : hp(5), marginRight: wp(5) }}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          showSettings={true}
          onPressSettings={() => navigation.navigate("ProfileSettings")}
          showText={true}
          text={t('MyProfile.MyProfile')}
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
                  resizeMode: Platform.OS == "ios" ? "cover" : "contain",
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
  
              marginTop: hp(1.3),
              color: "#FACA4E",

              fontFamily: "Inter-Medium",
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              fontSize: hp(2),
   
              color: "#77838F",
           
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
       

        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(5) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              color: "#77838F",
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myVideosMania')}
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
                    <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                      {/* No data available */}
                      {t('Dashboard.NoDataavailable')}
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
              color: "#77838F",
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.MyPicTours')}
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
                   <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
               
                      {t('Dashboard.NoDataavailable')}
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

        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
              color: "#77838F",
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myNews')}
          </Text>

          <View style={{ flex: 1 }}>
            <View style={{ height: hp(15), marginTop: 5 }}>
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
                        <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                          {/* No data available */}
                          {t('Dashboard.NoDataavailable')}
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
              color: "#77838F",
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myOpenLetter')}
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
                    {letter?.length === 0 ? (
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
       
              color: "#77838F",
         
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myQAFI')}
            {/* My QAFI */}
          </Text>

          <View style={{ flex: 1 }}>
            <View style={{ height: hp(15), marginTop: 5 }}>
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
                         <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                          {/* No data available */}
                          {t('Dashboard.NoDataavailable')}
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
 
              color: "#77838F",
        
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myEBC')}
  
          </Text>

          <View style={{ flex: 1 }}>
            <View style={{ height: hp(15), marginTop: 5 }}>
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
                         <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                          {/* No data available */}
                          {t('Dashboard.NoDataavailable')}
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

        {/* My Sports */}
        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
    
              color: "#77838F",

              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.mySports')}
 
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
                     <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                      {/* No data available */}
                      {t('Dashboard.NoDataavailable')}
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
        
              color: "#77838F",
      
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myCinematics')}
      
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
                     <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                      {/* No data available */}
                      {t('Dashboard.NoDataavailable')}
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
     
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myFans_star')}
            {/* My Fan Star Zone */}
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
                     <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                      {/* No data available */}
                      {t('Dashboard.NoDataavailable')}
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



        <View style={{ height: hp(23), marginLeft: wp(8), marginTop: hp(1) }}>
          <Text
            style={{
              fontSize: hp(2.1),
        
              color: "#77838F",
       
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myKid-Vids')}
            {/* My Kids Vids */}
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
                     <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                      {/* No data available */}
                      {t('Dashboard.NoDataavailable')}
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
      
              color: "#77838F",
     
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myTVProgMax')}
            {/* My TV ProgMax */}
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
                     <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                      {/* No data available */}
                      {t('Dashboard.NoDataavailable')}
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
          
              color: "#77838F",
        
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myLearningHobbies')}
            {/* My Learning and Hobbies */}
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
                     <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                      {/* No data available */}
                      {t('Dashboard.NoDataavailable')}
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

   


        {/* market zone at bottom */}
        <View
          style={{ height: hp(23), marginHorizontal: wp(8), marginTop: hp(1) }}
        >
          <Text
            style={{
              fontSize: hp(2.1),
      
              color: "#77838F",
       
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myMarketZone')}
            {/* My Market Zone */}
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
                    paddingLeft:wp(6)
                  }}
                >
                   <Text style={{  fontFamily: "Inter-Medium",fontSize: hp(2), color:'gray' }}>
                    {/* No data available */}
                    {t('Dashboard.NoDataavailable')}
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
    // width: wp(30), // Adjusted width to fit approximately 4 items on the screen
    alignItems: "center",
    justifyContent: "center",
    height: hp(9),
    padding:hp(1),
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
