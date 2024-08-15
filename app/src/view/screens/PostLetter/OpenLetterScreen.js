import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Headers from "../../../assets/Custom/Headers";
import { appImages } from "../../../assets/utilities";
import Add from "../../../assets/svg/AddMainScreen.svg";
import Approved from "../../../assets/svg/Approved";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel from "react-native-snap-carousel";
import Toast from "react-native-toast-message";
import MailActive from "../../../assets/svg/MailActive";
import NonVerified from "../../../assets/svg/NonVerified.svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { base_url } from "../../../../../baseUrl";
import LetterIcon from "react-native-vector-icons/Entypo";

export default function OpenLetterScreen({ route }) {
  const [selectedItemId, setSelectedItemId] = useState(1);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [topNewsData, setTopNewsData] = useState('');
  const [TopSignature, setTopSignature] = useState('');

  const [authToken, setAuthToken] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [adsinActiveData, setAdsInActiveData] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (isFocused) {
      getUserID(); // Call the async function
    }
  }, []); // Include 'id' in the dependency array

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem("authToken ");
      if (result !== null) {
        setAuthToken(result);
        // fetchData();
        console.log("user id retrieved:", result);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchTopNews();
      fetchBannerConfig();
      fetchBannerInActive();
      fetchLetterPublicGeneral();
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
      // console.log("AllBanners AdsInActiveData---", result.AllBanners);
      // setAdsInActiveData(result.AllBanners);
      const updatedBanners = result.AllBanners.map((banner) => {
        if (banner.image.startsWith("/fileUpload")) {
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

  const fetchTopNews = async () => {
    // console.log('Categry in id', categoryIdNews);
    // console.log('News Called');
    setLoading(true);
    const token = authToken;

    try {
      const response = await fetch(
        // base_url + `top/getAllTopQAFIByCategory/${categoryIdNews}`,
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
      const formattedLetters = result.topitem.map((letter) => ({
        ...letter,
        post_date: convertTimeAndDate(letter.post_date), 
      }));
      console.log('Resultings of TopNews', result.topitem);
      setTopNewsData(formattedLetters[0]); // Update the state with the fetched data
      fetchSpecificSig(formattedLetters[0].signature_id)
    } catch (error) {
      setLoading(false);
      console.error("Error Trending:", error);
    }
  };
  const fetchSpecificSig = async (signature_id) => {
    setLoading(true);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `signature/getSpecificSignature/${signature_id}`,
    
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log('Signatire---------', result.Signature);
      setTopSignature(result.Signature)
      // setTopNewsData(formattedLetters[0]); // Update the state with the fetched data
    } catch (error) {
      setLoading(false);
      console.error("Error Trending:", error);
    }
  };

  const searches = [
    { id: 1, title: "Open Letters" },
 
  ];
  // const searches = [
  //     { id: 1, title: "On News" },
  //     { id: 2, title: "Open Letters" },
  //     { id: 3, title: "QAFI" },
  //     { id: 4, title: "EBC" },
  //   ];
  const renderSearches = (item) => {
    // console.log('Items', item);
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

  const fetchLetterPublicGeneral = async () => {
    setLoading(true);
    // console.log('Categry in id', categoryIdNews);
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/public_general_by_category/3/?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      const formattedLetters = result.AllLetter.map((letter) => ({
        ...letter,
        post_date: convertTimeAndDate(letter.post_date),
      })).reverse();
      // console.log('Resultings of formattedLetters', formattedLetters);
      setOpensLettersPublicGeneralData(formattedLetters); // Update the state with the fetched data
      await fetchLetterPublicCelebrity();
    } catch (error) {
      setLoading(false);
      console.error("Error Trending:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false
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
  const fetchLetterPublicCelebrity = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/public_celebrity_by_category/3/?page=1&limit=10000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of News Celebrity Data', result.AllLetter);
      //Alert.alert(result)
      const formattedLetters = result.AllLetter.map((letter) => ({
        ...letter,
        post_date: convertTimeAndDate(letter.post_date),
      })).reverse();
      // const reversedData = result.AllLetter.reverse();
      // console.log('Resultings of News Celebrity Data', formattedLetters);
      setOpensLettersPublicCelebrityData(formattedLetters); // Update the state with the fetched data
      // setOpensLettersPublicCelebrityData(result.AllLetter); // Update the state with the fetched data
      await fetchLetterPrivateFriends();
    } catch (error) {
      setLoading(false);

      console.error("Error Trending:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false
    }
  };

  const fetchLetterPrivateFriends = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `letter/private_friends_by_category/3/?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of News', result.AllLetter);
      //Alert.alert(result)

      setOpensLettersPrivateFriendsData(result.AllLetter); // Update the state with the fetched data
      await fetchLetterPrivateCelebrity();
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchLetterPrivateCelebrity = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url +
          `letter/private_celebrity_by_category/3/?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log('Resultings of News', result.AllLetter);
      //Alert.alert(result)

      setOpensLettersPrivateCelebrityData(result.AllLetter); // Update the state with the fetched data
      // fetchTopNews();

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error Trending:", error);
    }
  };

  const renderPublicGeneral = (item) => {
    const imageUrl = item.signature_image
      ? item.signature_image.startsWith("/fileUpload") ||
        item.signature_image.startsWith("/signatureImages")
        ? base_url + item.signature_image
        : item.signature_image
      : null;

    const userimageUrl = item.userimage
      ? item.userimage.startsWith("/userImage")
        ? base_url + item.userimage
        : item.userimage
      : null;
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
            {item?.userimage !== null ||
            item?.userimage !== undefined ||
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
                  source={{ uri: item?.userimage || userimageUrl }}
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
              {item.post_date}
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
              Subject:
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
                {item.subject_place}
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
            item.signature_image !== undefined ||
            item.signature_image !== null ? (
              <View
                style={{
                  height: hp(5),
                  width: wp(9),
                  borderRadius: wp(3),
                }}
              >
                <Image
                  source={{ uri: imageUrl || item.signature_image }}
                  style={{
                    width: "100%",
                    height: "100%",

                    resizeMode: "contain",
                  }}
                />
              </View>
            ) : null}
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

  const goToScreen = () => {
    navigation.navigate("PostLetterInfo");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={{ marginTop: hp(5) }}>
        <Headers
          OnpresshowHome={() => {
            navigation.navigate("MoreScreen");
          }}
          showHome={true}
          onPressMenu={() => navigation.openDrawer()}
          onPressSearch={() => navigation.navigate("SearchPostLetter")}
          //   onPressSearch={handleSearchPress}
          showText={true}
          text={"Open Letter"}
          showSearch={true}
        />
      </View>

      {/* {renderItemText()} */}
      {/* {renderItemText()} */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: hp(1),
          marginHorizontal: wp(4),
        }}
      >
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
          ) : adsData.length === 0 ? (
            <View style={styles.TopBannerView}>
              <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                No Top Banner
              </Text>
            </View>
          ) : (
            <Carousel
              data={adsData}
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
              onSnapToItem={(index) => setCarouselIndex(index)}
              loop={true}
              autoplay={true}
            />
          )}
        </View>

        <View style={styles.latestSearchList}>
          <View>
            <LetterIcon name="newsletter" size={30} color="#FACA4E" />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searches}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderSearches(item)}
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
          navigation.navigate("LetterDetails", {
            Letters: topNewsData,
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
            {topNewsData?.userimage !== null ||
            topNewsData?.userimage !== undefined ? (
              <View
                style={{
                  height: hp(2),
                  width: wp(4),
                  borderRadius: wp(3),
                }}
              >
                <Image
                  source={{ uri: topNewsData?.userimage}}
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
              {topNewsData.post_date}
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
              Subject:
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
                {topNewsData.subject_place}
              </Text>
            </View>
          </View>
          {/* <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              height: hp(6),
              right: 10,
            }}
          >
            {imageUrl !== null ||
            imageUrl !== undefined ||
            item.signature_image !== undefined ||
            item.signature_image !== null ? (
              <View
                style={{
                  height: hp(5),
                  width: wp(9),
                  borderRadius: wp(3),
                }}
              >
                <Image
                  source={{ uri: imageUrl || item.signature_image }}
                  style={{
                    width: "100%",
                    height: "100%",

                    resizeMode: "contain",
                  }}
                />
              </View>
            ) : null}
          </View> */}
          <View
            style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
          ></View>
        </View>
      </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewNews", {
                News: topNewsData,
              })
            }
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
                {topNewsData === undefined || topNewsData.length === 0
                  ? "Does not contain any top news"
                  : topNewsData?.description}
              </Text>
            </View>
          </View> */}
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ marginTop: hp(5), height: hp(21) }}>
            <Text
              style={{
                color: "#4A4A4A",
                fontWeight: "bold",
                fontSize: hp(2),
                paddingBottom: 5,
              }}
            >
              Public (general)
            </Text>
            {loading ? (
                  <View style={styles.NoDataView}>
                 <ActivityIndicator size="large" color="#FACA4E" />
                 </View>
            ) : opensLettersPublicGeneralData.length === 0 ? (
              <View
                style={styles.NoDataView}
              >
                <Text style={styles.NoDataText}>
                  No data available
                </Text>
              </View>
            ) : (
              <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ alignItems: "center" }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={opensLettersPublicGeneralData}
                keyExtractor={(item) => item?.post_id.toString()}
                renderItem={({ item }) => renderPublicGeneral(item)}
              />
            )}
          </View>

          <View style={{ marginTop: hp(5), height: hp(21) }}>
            <Text
              style={{
                color: "#4A4A4A",
                fontWeight: "bold",
                fontSize: hp(2),
              }}
            >
              Public (to authorities, celebrities, leaders)
            </Text>

            {loading ? (
               <View
               style={styles.NoDataView}
             >
              <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : opensLettersPublicCelebrityData.length === 0 ? (
              <View
                style={styles.NoDataView}
              >
                <Text style={styles.NoDataText}>
                  No data available
                </Text>
              </View>
            ) : (
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: "center" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={opensLettersPublicCelebrityData}
              keyExtractor={(item) => item?.post_id.toString()}
              renderItem={({ item }) => renderPublicGeneral(item)}
            />
          )}
          </View>

          <View style={{ marginTop: hp(5), height: hp(21) }}>
            <Text
              style={{
                color: "#4A4A4A",
                fontWeight: "bold",
                fontSize: hp(2),
              }}
            >
              Private (to friends, peers, followers)
            </Text>
            <View
                style={styles.NoDataView}
              >
                <Text style={styles.NoDataText}>
                  No data available
                </Text>
              </View>
            {/* <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicCelebrityData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          /> */}
          </View>

          <View style={{ marginTop: hp(5), height: hp(21) }}>
            <Text
              style={{
                color: "#4A4A4A",
                fontWeight: "bold",
                fontSize: hp(2),
              }}
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
              <Text style={{ fontWeight: "Medium", fontSize: hp(2.1) }}>
                No data available
              </Text>
            </View>
            {/*  <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicCelebrityData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          /> */}
          </View>
        </View>

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
              onSnapToItem={(index) => setCarouselIndex(index)}
              loop={true}
              autoplay={true}
            />
          )}
        </View>
      </ScrollView>

      {/* ///////////////////////////////////////// */}

      {/* //////////////////////////////////////// */}
      <TouchableOpacity
        onPress={() => goToScreen()}
        style={{ position: "absolute", bottom: 1, right: 25 }}
      >
        <Add />
      </TouchableOpacity>

      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bannerview: {
    height: hp(15),
    marginTop: hp(2),
    alignSelf: "center",
    resizeMode: "cover",
    width: "100%",
    borderRadius: wp(2),
    paddingHorizontal: wp(8),
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),
    // marginHorizontal: wp(6),
    marginLeft: wp(2),
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
    width: wp(26),
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
  renderItem: {
    fontSize: wp(4.2),
    color: "black",
    fontFamily: "Inter",
    fontWeight: "bold",
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
  NoDataView:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataText:{
    fontWeight: "Medium", fontSize: hp(2.1)
  }
});
