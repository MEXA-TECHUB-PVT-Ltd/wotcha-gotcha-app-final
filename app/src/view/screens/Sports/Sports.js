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
    Dimensions,
  } from "react-native";
  import React, { useState, useRef, useEffect } from "react";
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
  import Carousel from "react-native-snap-carousel";
  import Headers from "../../../assets/Custom/Headers";
  import Add from "../../../assets/svg/AddMainScreen.svg";
  import { appImages } from "../../../assets/utilities";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import RBSheet from "react-native-raw-bottom-sheet";
  import { useTranslation } from 'react-i18next';
  import { launchCamera, launchImageLibrary } from "react-native-image-picker";
  import { useIsFocused } from "@react-navigation/native";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { base_url } from "../../../../../baseUrl";
  import { useNavigation } from "@react-navigation/native";
  import Sport from "react-native-vector-icons/MaterialIcons";
  export default function Sports() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [selectedItemPicsId, setSelectedItemPicsId] = useState(null);
  
    const [imageInfo, setImageInfo] = useState(null);
  
    const isFocused = useIsFocused();
  
    const [loading, setLoading] = useState(false);
  
    const [searchesData, setSearches] = useState("");
  
    const [selectedItem, setSelectedItem] = useState("");
  
    const [data, setData] = useState([]);
  
    const [dataLatestVideos, setDataLatestVideos] = useState([]);
  
    const [dataMostViewedVideos, setMostViewedVideos] = useState([]);
  
    const [dataMostCommentedVideos, setMostCommentedVideos] = useState([]);
  
    const [dataTopVideos, setDataTopVideos] = useState([]);
  
    const [authToken, setAuthToken] = useState("");
    const ref_RBSheetCamera = useRef(null);
    const [adsinActiveData, setAdsInActiveData] = useState([]);
    const [sections, setSections] = useState([]);
  const [noData, setNoData] = useState(false);
 
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


  const [adsData, setAdsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      const updatedBanners = result.AllBanners.map(banner => {
        if (banner.image.startsWith('/fileUpload')) {
          banner.image = base_url + `${banner.image}`;
        }
        return banner;
      });
      setAdsInActiveData(updatedBanners);
    } catch (error) {
      console.error("Error AllBanners AdsInActiveData---", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (authToken && isFocused) {
      fetchAllCinematicsCategory();
      fetchTopSport();
      fetchSubCategorySport(selectedItemPicsId);
    }
  }, [authToken, selectedItemPicsId, isFocused]);

  // Fetch categories
  const fetchAllCinematicsCategory = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${base_url}sports/category/getAll?page=1&limit=10000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      const reverseData = result.AllCategories.reverse();
      setSearches(reverseData);
      if (selectedItemPicsId === null && result.AllCategories.length > 0) {
        setSelectedItemPicsId(result.AllCategories[0].id);
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
      const response = await fetch(`${base_url}sports/getTopSport`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      setDataTopVideos(result.data);
     
    } catch (error) {
      console.error("Error fetching top sports:", error);
    }
    setLoading(false)
  };

  // Fetch sub-category sports
  const fetchSubCategorySport = async (categoryId) => {
    setLoading(true)
    try {
      const response = await fetch(`${base_url}sports/getByCategory/${selectedItemPicsId}?page=1&limit=100000`, {
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
          data: category.Sport_result.Sports,
        }));
        // const reverseData = formattedSections.reverse();
        setSections(formattedSections);
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

  
    const renderSearchesPic = (item) => {
      const isSelected = selectedItemPicsId === item.id;
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
            setSelectedItemPicsId(item.id);
    
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
  
  
    const takePhotoFromCamera = async (value) => {
      setSelectedItem(value);
      launchCamera(
        {
          mediaType: "photo",
          //videoQuality: 'medium',
        },
        (response) => {
  
          if (!response.didCancel) {
            if (response.assets && response.assets.length > 0) {
              setLoading(true);
              setImageInfo(response.assets[0]);
              ref_RBSheetCamera.current.close();
              setLoading(false);
  
              navigation.navigate("UploadUpdateSports", {
                Video: response.assets[0],
              });
            } else if (response.uri) {
              ref_RBSheetCamera.current.close();
              setLoading(false);
  
              navigation.navigate("UploadUpdateSports", {
                Video: response.assets[0],
              });
            }
          }
          // ref_RBSheetCamera.current.close();
          if (ref_RBSheetCamera.current) {
            ref_RBSheetCamera.current.close();
          }
          setLoading(false);
        }
      );
    };
  
    const choosePhotoFromLibrary = (value) => {
      setSelectedItem(value);
      launchImageLibrary({ mediaType: "photo" }, (response) => {
        if (!response.didCancel && response.assets.length > 0) {

          setLoading(true);
          setImageInfo(response.assets[0]);
          ref_RBSheetCamera.current.close();
          setLoading(false);
          navigation.navigate("UploadUpdateSports", { Video: response.assets[0] });
        }
        if (ref_RBSheetCamera.current) {
          ref_RBSheetCamera.current.close();
        }
        // ref_RBSheetCamera.current.close();
        setLoading(false);

      });
    };
  

    const renderVideoItem = ({ item }) => (

      <TouchableOpacity onPress={() => navigation.navigate('SportsDetails', {SportsData: item, identifier: false})}>
      <View style={styles.itemContainer}>
  
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text  ellipsizeMode="tail"
                  numberOfLines={1} style={styles.text}>{item.name}</Text>
        <Text  ellipsizeMode="tail"
                  numberOfLines={2} style={styles.text1}>{item.description}</Text>
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
          keyExtractor={(videoItem) => videoItem.sport_id.toString()}
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
  
        <View style={{ marginTop: hp(5) }}>
          <Headers
            OnpresshowHome={() => {
              navigation.navigate("MoreScreen");
            }}
            // onPress={() => navigation.goBack()}
            showSearch={true}
            onPressSearch={() => navigation.navigate("SearchScreenSports")}
            showText={true}
            onPressListings={() => navigation.openDrawer()}
            // showListings={true}
            showHome={true}
            text={t('Sports')}
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
                loop={true}
                autoplay={true}
              />
            )}
          </View>
  
          <View style={[styles.latestSearchList, { marginLeft: wp(3) }]}>
          <View>
                <Sport name="sports-handball" size={28} color="#FACA4E"/>
            </View>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: "center" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={searchesData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => renderSearchesPic(item)}
            />
          </View>
  
          <View
       
            style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(15) }}
          >
            <View
              onPress={() => console.log("TOP DETAILS", dataTopVideos)}
              style={{
                width: wp(35),
                marginLeft: wp(2.5),
                height: "100%",
                borderRadius: wp(5),
              }}
            >
              {!dataTopVideos?.image ||
              dataTopVideos?.image === "undefined" ||
              dataTopVideos?.image.startsWith("/") ? (
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
                <TouchableOpacity   style={{ width: "100%", height: "100%", borderRadius: wp(3) }}
                onPress={() => navigation.navigate("TopSportsView", { picData: dataTopVideos })}>
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
                  source={{ uri: dataTopVideos?.image }}
                />
                </TouchableOpacity>
              )}
            
            </View>
  
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
                {dataTopVideos === 0
                  ? t('NoTopSportsShown')
                  : dataTopVideos?.description}
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
         <Text style={{ fontFamily: "Inter-Regular",}}>{t('NoTopSportsShown')}</Text>
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
                   <View
                   style={{
                     flex: 1,
                     justifyContent: "center",
                     alignItems: "center",
                   }}
                 >
                   <ActivityIndicator size="large" color="#FACA4E" />
                 </View>
           
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
                loop={true}
                autoplay={true}
              />
            )}
          </View>
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
            <Text style={styles.maintext}>{t('Selectanoption')}</Text>
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
  
              <Text style={{ color: "#333333" }}>{t('Fromcamera')}</Text>
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
  
              <Text style={{ color: "#333333" }}>{t('Fromgallery')}</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
  
        <TouchableOpacity
          onPress={() => ref_RBSheetCamera.current.open()}
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
      paddingHorizontal: wp(5),
    },
    latestSearchList: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: hp(2.1),
      height: hp(7),
      marginLeft: wp(5),
    },
    searchesDetails: {
      flexDirection: "row",
      marginLeft: wp(3),
      alignItems: "center",
      padding: wp(3.3),
      justifyContent: "center",
      backgroundColor: "#F2F2F2",
      borderRadius: wp(5),
    },
    textSearchDetails: {
      fontFamily: "Inter",
      fontWeight: "700",
      textAlign: "center",
      fontSize: hp(1.8),
    },
  
    maintext: {
      fontSize: hp(2.3),
      color: "#303030",
      fontWeight: "bold",
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
      fontFamily: "Inter",
      marginTop: 5,
      fontSize: hp(1.9),
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
  