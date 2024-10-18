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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { base_url } from "../../../../../baseUrl";
import LetterIcon from "react-native-vector-icons/Entypo";
import { useTranslation } from 'react-i18next';

export default function OpenLetterScreen({ route }) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [topNewsData, setTopNewsData] = useState('');
  const [TopSignature, setTopSignature] = useState('');
  const { t } = useTranslation();
  const [authToken, setAuthToken] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [adsinActiveData, setAdsInActiveData] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchesData, setSearchesData] = useState([]);
  const [sections, setSections] = useState([]);
  const [noData, setNoData] = useState(false);
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
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  const [language, setLanguage] = useState(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        if (storedLanguage) {
          setLanguage(storedLanguage);
          console.log('lanugage--------', storedLanguage)
        }
      } catch (error) {
        console.error("Error fetching language:", error);
      }
    };

    fetchLanguage();
  }, [isFocused]);



  useEffect(() => {
    if (authToken) {
      fetchTopNews();
      fetchBannerConfig();
      fetchBannerInActive();
      // fetchLetterPublicGeneral();
    }
  }, [authToken]);

   // Fetch all data when authToken is set and screen is focused
   useEffect(() => {
    if (authToken) {
      fetchAllCinematicsCategory();
      fetchSubCategorySport(selectedItemId);
    }
  }, [authToken, selectedItemId]);

      // Fetch categories
      const fetchAllCinematicsCategory = async () => {
        setLoading(true)
        try {
          const response = await fetch(`${base_url}discCategory/getAllDiscCategories?page=1&limit=100000`, {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` },
          });
          const result = await response.json();

          const reverseData = result.AllCategories;
          setSearchesData(reverseData);

          if (selectedItemId === null && result.AllCategories.length > 0) {
            setSelectedItemId(result.AllCategories[0].id);
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
        // const response = await fetch(`${base_url}news/getAllNewsByCategory/${selectedItemId}?page=1&limit=100000`, {
        const response = await fetch(`${base_url}letter/getAllLetterByCategory/${selectedItemId}?page=1&limit=100000`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const result = await response.json();
        if (Array.isArray(result.data) && result.data.length > 0) {
          const formattedSections = result.data.map(category => ({
            title: category.sub_category_name,
            data: category.total_result.letters,
          }));

          setSections(formattedSections);
          console.log('data for sub cater haioiii', formattedSections)
          setNoData(formattedSections.every(section => section.title.length === 0));
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



  const fetchBannerConfig = async () => {
    const token = authToken;
    setIsLoading(true);
    try {
      const response = await fetch(
        base_url + "banner/getAllActiveBanners?topBanner=true",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      setAdsData(result.AllBanners || []);
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
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      const updatedBanners = result.AllBanners.map((banner) => {
        if (banner.image.startsWith("/fileUpload")) {
          banner.image = `https://watch-gotcha-be.mtechub.com${banner.image}`;
        }
        return banner;
      });
      setAdsInActiveData(updatedBanners);
    } catch (error) {
      console.error("Error AllBanners AdsInActiveData---", error);
    }
    setIsLoading(false);
  };

  const fetchTopNews = async () => {
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

      const formattedLetters = result.topitem.map((letter) => ({
        ...letter,
        post_date: convertTimeAndDate(letter.post_date), 
      }));
      setTopNewsData(formattedLetters[0] || ''); // Update the state with the fetched data
      fetchSpecificSig(formattedLetters[0].signature_id || '')
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
      // console.log('Signatire---------', result.Signature);
      setTopSignature(result.Signature)
    } catch (error) {
      setLoading(false);
      console.error("Error Trending:", error);
    }
  };

  const searches = [
    { id: 1, title: "Open Letters" },
 
  ];
  const renderSearches = (item) => {
    const isSelected = selectedItemId === item.id;
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
          setSelectedItemId(item.id);
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

  const fetchLetterPublicGeneral = async () => {
    setLoading(true);
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
      // console.log('singature--------', formattedLetters)
      setOpensLettersPublicGeneralData(formattedLetters); // Update the state with the fetched data
      // await fetchLetterPublicCelebrity();
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

      const formattedLetters = result.AllLetter.map((letter) => ({
        ...letter,
        post_date: convertTimeAndDate(letter.post_date),
      })).reverse();

      setOpensLettersPublicCelebrityData(formattedLetters); // Update the state with the fetched data
      // await fetchLetterPrivateFriends();
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
      setOpensLettersPrivateFriendsData(result.AllLetter); // Update the state with the fetched data
      // await fetchLetterPrivateCelebrity();
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
      setOpensLettersPrivateCelebrityData(result.AllLetter); // Update the state with the fetched data
      // fetchTopNews();

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error Trending:", error);
    }
  };


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
            {item.item?.userimage !== null ||
            item.item?.userimage !== undefined ||
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
                  source={{ uri: item.item?.userimage || userimageUrl }}
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



  const renderSection = ({ item }) => (
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
          text={t('OpenLetter')}
          showSearch={true}
        />
      </View>

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
              {t('NoTopBanner')}
                {/* No Top Banner */}
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
            data={searchesData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderSearches(item)}
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
 
            }}
          >
            <Text
              style={{
                color: "#282828",
             
                width: "25%",
                fontSize: 6,
                fontFamily: "Inter-Bold",
              }}
            >
              {topNewsData?.post_date}
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
                {topNewsData?.subject_place}
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
         <Text style={{ fontFamily: "Inter-Medium",}}>{t('NoDataAvailable')}</Text>
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






        {/* <View style={{ flex: 1 }}>
          <View style={{ marginTop: hp(5), height: hp(21) }}>
            <Text
              style={{
                color: "#4A4A4A",
                fontWeight: "bold",
                fontSize: hp(2),
                paddingBottom: 5,
              }}
            >
              {t('PublicGeneral')}
             
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
                {t('NoDataAvailable')}
              
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
              {t('PublicToAuthoritiesCelebritiesLeaders')}
             
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
                {t('NoDataAvailable')}
             
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
              {t('PrivateToFriendsPeersFollowers')}
     
            </Text>
            <View
                style={styles.NoDataView}
              >
                <Text style={styles.NoDataText}>
                {t('NoDataAvailable')}
                </Text>
              </View>
              <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: "center" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={opensLettersPublicCelebrityData}
              keyExtractor={(item) => item?.post_id.toString()}
              renderItem={({ item }) => renderPublicGeneral(item)}
            />
          </View>

          <View style={{ marginTop: hp(5), height: hp(21) }}>
            <Text
              style={{
                color: "#4A4A4A",
                fontWeight: "bold",
                fontSize: hp(2),
              }}
            >
              {t('PrivateToAuthoritiesCelebritiesLeaders')}
            
            </Text>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "Medium", fontSize: hp(2.1) }}>
              {t('NoDataAvailable')}
             
              </Text>
            </View>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: "center" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={opensLettersPublicCelebrityData}
              keyExtractor={(item) => item?.post_id.toString()}
              renderItem={({ item }) => renderPublicGeneral(item)}
            />
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
              {t('NoBanner')}
                {/* No Banner */}
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

      {/* //////////////////////////////////////// */}
      <TouchableOpacity
        onPress={() => goToScreen()}
        style={{ position: "absolute", bottom: 1, right: 25 }}
      >
        <Add />
      </TouchableOpacity>

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
    borderRadius: wp(5),
    borderWidth: 0.5,
    borderColor: "#00000017",
  },
  latestSearchList: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(2),
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: hp(5),
    marginHorizontal: wp(8),
    height: hp(8),
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
    // width: wp(26),
    padding: 10,
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
    fontFamily: "Inter",
    marginTop: 5,
    fontSize: hp(1.9),
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
