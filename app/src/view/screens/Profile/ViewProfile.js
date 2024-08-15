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

  const [totalVideos, setTotalVideos] = useState(null);

  const [totalPics, setTotalPics] = useState(null);

  const [marketZone, setMarketZone] = useState([]);

  const [totalMarketZone, setTotalMarketZone] = useState(null);

  const [news, setNews] = useState([]);

  const [totalNews, setTotalNews] = useState(null);

  const [QAFI, setQAFI] = useState([]);

  const [totalQAFI, setTotalQAFI] = useState(null);

  const [GEBC, setGEBC] = useState([]);

  const [sports, setSports] = useState([]);
  const [totalsports, setTotalSports] = useState(null);

  const [totalGEBC, setTotalGEBC] = useState(null);

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


  // console.log('lettoooooooooo', letter)
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
      const result = await AsyncStorage.getItem("authToken ");
      if (result !== null) {
        setAuthToken(result);
        await fetchUserId(result);
        // console.log('View Profile user token retrieved of profile:', result);
      }

      /* console.log("User Id", userId);
      console.log("authToken", authToken); */
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  const fetchUserId = async (tokens) => {
    // console.log('Token', tokens);
    const result3 = await AsyncStorage.getItem("userId ");
    if (result3 !== null) {
      setUserId(result3);
      fetchUser(tokens, result3);
    } else {
      console.log("result is null", result3);
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
      const reversedData = result.Videos.reverse();
      setVideos(reversedData); // Update the state with the fetched data
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
      // console.log('Resultings', result.AllItems[0].images);
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
      const reversedNewData = result.News;
      setNews(reversedNewData); // Update the state with the fetched data
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
      // console.log('Resultings', result.QAFIs);
      const reversedData = result.QAFIs.reverse();
      setQAFI(reversedData); // Update the state with the fetched data
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
      // console.log("Resultings", result.GEBCs);
      const reversedData = result.GEBCs; // Update the state with the fetched data
      setGEBC(reversedData);
      setTotalGEBC(result.totalGEBCs);
      // fetchCinematic(tokens, user)
      setLoading(false);
    } catch (error) {
      console.error("Error GEBC:", error);
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
      // setLetter( result.AllLetters);
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
        // return {
        //   ...signature,
        //   signature_image: formattedUrl,
        // };
      });


      // console.log('Resultings of letter', formattedSignatures);
      setLetter(formattedSignatures); // Update the state with the fetched data
      setTotalLetter(result.totalLetters);
      setLoading(false);
    } catch (error) {
      console.error("Error GEBC:", error);
    }
  };
  const [convertedDate, setConvertedDate] = useState("");
  // const fetchSignature = async (tokens, user) => {
  //   const token = tokens;

  //   try {
  //     const response = await fetch(
  //       base_url + `signature/getAllSignaturesByUserId/${user}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const result = await response.json();
  //     const formattedSignatures = result.AllSignatures.map((signature) => {
  //       const imageUrl = signature.signature_image;
  //       let formattedUrl;
  //       if (imageUrl.startsWith("/fileUpload")) {
  //         formattedUrl = `https://watch-gotcha-be.mtechub.com${imageUrl}`;
  //       } else {
  //         formattedUrl = imageUrl;
  //       }
  //       const formattedDate = covertTimeAndDate(signature.signature_created_at);
  //       return {
  //         ...signature,
  //         signature_image: formattedUrl,
  //         signature_created_at: formattedDate,
  //       };
  //       // return {
  //       //   ...signature,
  //       //   signature_image: formattedUrl,
  //       // };
  //     });

  //     // console.log("Formatted Signatures:", formattedSignatures);
  //     setSignatureData(formattedSignatures);

  //     // If you need to convert date and time for any letter post date
  //     // await covertTimeAndDate(formattedSignatures.signature_created_at);
  //   } catch (error) {
  //     console.error("Error Trending:", error);
  //   }
  // };

  // const fetchSignature = async( tokens, user) => {
  //   const token = tokens;

  //   try {
  //     const response = await fetch(
  //       base_url + `signature/getAllSignaturesByUserId/${user}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     const imageUrl = result.AllSignatures.signature_image;
  //     console.log('imageUrl------', imageUrl)
  //     /* ? setSignatureData(`https://watch-gotcha-be.mtechub.com${result.Signature.signature_image}`)
  //     : setSignatureData(`result.Signature.signature_image`); */

  //     if (imageUrl.startsWith('/fileUpload')) {
  //       setSignatureData(`https://watch-gotcha-be.mtechub.com/${imageUrl}`);
  //     } else {
  //       setSignatureData(`${imageUrl}`);
  //     }

  //     // console.log('image', signatureData);
  //     //Alert.alert(result)

  //     await covertTimeAndDate(letter?.post_date);
  //   } catch (error) {
  //     console.error('Error Trending:', error);
  //   }
  // };
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
              identifier: true,
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

  //----------------\\
  //RENDER GEBC

  const renderAvailableAppsGEBC = (item) => {
    // console.log('Items Of GEBC', item);
    const imageUri = item?.image;
    // console.log(imageUri);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewUpdateGEBC", { details: item , identifier: true})}
        style={{ width: wp(35), marginRight:10, }}
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
        onPress={() => navigation.navigate("ViewUpdateQAFI", { details: item , identifier: true})}
        style={{ width: wp(35),marginRight:10}}
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
        onPress={() => navigation.navigate("ViewUpdateNews", { details: item , identifier: true})}
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
              alignSelf:'flex-end',
              marginTop: hp(-2),
              width:'40%',
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
             {t('Dashboard.Subject')}
              {/* Subject: */}
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
                    resizeMode: "contain",
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

  const data = [
    { id: "1", total: totalVideos, label: t('MyProfile.VideosMania') },
    { id: "2", total: totalPics, label: t('Drawer.PicTours') },
    { id: "3", total: totalNews, label: t('Drawer.News') },
    { id: "4", total: totalLetter, label: t('Drawer.OpenLetter') },
    { id: "5", total: totalQAFI, label: t('Drawer.QAFI') },
    { id: "6", total: totalGEBC, label: "EBC" },
    { id: "7", total: totalsports, label: t('Drawer.Sports') },
    // {
    //   id: "3",
    //   total: totalNews + totalGEBC + totalQAFI + totalLetter,
    //   label: "DISC",
    // },
    { id: "8", total: cinematictotalVideos, label: t('Drawer.Cinematics') },
    { id: "9", total: kidstotalVideos, label: t('Drawer.Kid-Vids') },
    { id: "10", total: tvtotalVideos, label: t('Drawer.TVProgMax') },
    { id: "11", total: learningtotalVideos, label: t('Drawer.LearningHobbies') },
    { id: "12", total: fanStartotalVideos, label: t('Drawer.Fans_star') },
    { id: "13", total: totalMarketZone, label: t('Drawer.MarketZone') },
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
            {t('MyProfile.myVideosMania')}
            {/* My Video Mania */}
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
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.MyPicTours')}
            {/* My Pic Tour */}
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
                      {/* No data available */}
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
            {t('MyProfile.myNews')}
           {/* My News */}
          </Text>

          <View style={{ flex: 1 }}>
        <View style={{ height: hp(15) , marginTop:5}}>
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
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
             {t('MyProfile.myOpenLetter')}
           {/* My Open Letters */}
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
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      {/* No data available */}
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
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myQAFI')}
           {/* My QAFI */}
          </Text>

          <View style={{ flex: 1 }}>
        <View style={{ height: hp(15),  marginTop:5}}>
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
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myEBC')}
           {/* My EBC */}
          </Text>

          <View style={{ flex: 1 }}>
        <View style={{ height: hp(15), marginTop:5}}>
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
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.mySports')}
            {/* My Sports */}
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
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
              fontFamily: "Inter-Bold",
            }}
          >
            {t('MyProfile.myCinematics')}
            {/* My Cinematics */}
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
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
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
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
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
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
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
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
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
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: "#77838F",
              //fontWeight: 'bold',
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
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
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
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
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


{/* market zone at bottom */}
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
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
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
