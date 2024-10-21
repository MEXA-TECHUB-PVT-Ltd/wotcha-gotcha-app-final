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
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import Carousel from "react-native-snap-carousel";
  import NonVerified from "../../../assets/svg/NonVerified.svg";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import { useNavigation } from "@react-navigation/native";
  import { useIsFocused } from "@react-navigation/native";
  import { base_url } from "../../../../../baseUrl";
  import EBC from "react-native-vector-icons/MaterialCommunityIcons";
  import { useTranslation } from 'react-i18next';
const EBCScreen = () => {

  const { t } = useTranslation();

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [authToken, setAuthToken] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [topNewsData, setTopNewsData] = useState([]);
  const [adsinActiveData, setAdsInActiveData] = useState([]);
  const [sections, setSections] = useState([]);
  const [noData, setNoData] = useState(false);
  const [searchesData, setSearchesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [carouselIndex, setCarouselIndex] = useState(0);
  // Fetch auth token
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
      }
    };

    getAuthToken();
  }, []);

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


  // Fetch all data when authToken is set and screen is focused
  useEffect(() => {
    if (authToken && isFocused) {
      fetchAllCinematicsCategory();
      fetchTopSport();
      fetchSubCategorySport(selectedItemId);
    }
  }, [authToken, selectedItemId, isFocused]);

  // Fetch categories
  const fetchAllCinematicsCategory = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${base_url}gebc/category/getAll?page=1&limit=10000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      const reverseData = result.AllCategories.reverse();
      setSearchesData(reverseData);
      if (selectedItemId === null && result.AllCategories.length > 0) {
        setSelectedItemId(result.AllCategories[0].id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setLoading(false)
  };

  // Fetch top sports
  const fetchTopSport = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${base_url}gebc/getTopGebc`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      setTopNewsData(result.data);
    } catch (error) {
      console.error("Error fetching top sports:", error);
    }
    setLoading(false)
  };

  // Fetch sub-category sports
  const fetchSubCategorySport = async (categoryId) => {
    setLoading(true)
    try {
      const response = await fetch(`${base_url}gebc/getAllGEBCsByCategory/${categoryId}?page=1&limit=100000`, {
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
        const reverseData = formattedSections.reverse();
        setSections(reverseData);
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
  const renderSearches = (item) => {
    // console.log('First Id', searchesData[0].id);
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



  const renderVideoItem = ({ item }) => (
    // <TouchableOpacity onPress={handle_details}>
    <TouchableOpacity onPress={() =>  navigation.navigate("ViewGEBC", { picData: item })}>
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

  const renderSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{item.title}</Text>
      {item.data.length === 0 ? (
        <Text style={styles.noDataText}>{t('NoDataAvailable')}</Text>
      ) : (
      <FlatList
        data={item.data}
        renderItem={renderVideoItem}
        keyExtractor={(videoItem) => videoItem.gebc_id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    )}
    </View>
  );

  
    useEffect(() => {
      if (authToken) {
        fetchBannerConfig();
        fetchBannerInActive();
 
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

        const updatedBanners = result.AllBanners.map((banner) => {
          if (banner.image.startsWith("/fileUpload")) {
            banner.image =  base_url + `${banner.image}`;
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
          onPressSearch={() => navigation.navigate("SearchGEBC")}
          //   onPressSearch={handleSearchPress}
          showText={true}
          text={t('EBIC')}
          showSearch={true}
        />
      </View>


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
             {t('NoTopBanner')}
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
            <EBC name="sticker-emoji" size={30} color="#FACA4E" />
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
            marginBottom: hp(1),
            flexDirection: "row",
            height: hp(18),
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewGEBC", { picData: topNewsData })}
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
              <Text style={{ fontSize: hp(5) }}>{topNewsData.image}</Text>
            </View>
              
              </View>
            )}
          </TouchableOpacity>
          <View style={{ justifyContent: "flex-start", width: "50%", paddingTop:2 , marginLeft:'2%'}}>
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
              {topNewsData === undefined || topNewsData === 0
                ? "No Top EBC Shown"
                : topNewsData?.description}
            </Text>
          </View>
        </View>

  {/* //////////////////////////////////////////////////////////// */}
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

      <TouchableOpacity
        onPress={() => navigation.navigate('GEBC')}
        style={{ position: "absolute", bottom: 1, right: 25 }}
      >
        <Add />
      </TouchableOpacity>
    </View>
  )
}

export default EBCScreen

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
  //  padding:6,
  paddingHorizontal:wp(3),
  paddingVertical:hp(1.3),
        backgroundColor: "#F2F2F2",
        borderRadius: wp(5),
        // height: hp(5),
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
})