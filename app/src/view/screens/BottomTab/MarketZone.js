
////////////////////////////////////////////////////////////////////////////////////////////////////////faisal code merg on 22/5/2024
import {
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
import Carousel from "react-native-snap-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Headers from "../../../assets/Custom/Headers";
import { appImages } from "../../../assets/utilities";
import Add from "../../../assets/svg/AddMainScreen.svg";
import { base_url } from "../../../../../baseUrl";
import { useNavigation } from "@react-navigation/native";
import MarketActive from "../../../assets/svg/MarketActive";

import { useTranslation } from 'react-i18next';
export default function MarketZone({  }) {
  const navigation = useNavigation();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const { t } = useTranslation();
  const [data, setData] = useState(null);

  const [authToken, setAuthToken] = useState("");

  const [dataElectronics, setDataElectronics] = useState(null);

  const isFocused = useIsFocused();

  const [dataVehicles, setDataVehicles] = useState(null);

  const [dataClothing, setDataClothing] = useState(null);

  //const [regions, setRegions] = useState(null);

  const [regions, setRegions] = useState(null);

  const [loading, setLoading] = useState(false);

  const [categoriesSelect, setCategorySelect] = useState([]);

  const [snackBarVisible, setSnackbarVisible] = useState(false);

  const [dataTopVideos, setDataTopVideos] = useState([]);
  const [adsinActiveData, setAdsInActiveData] = useState([]);
  const ref_RBSheetCamera = useRef(null);

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


  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken ");
        if (token) {
          setAuthToken(token);
          // await fetchCategory(token);
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
          // await fetchCategory(storedLanguage);
        }
      } catch (error) {
        console.error("Error fetching language:", error);
      }
    };

    fetchLanguage();
  }, [isFocused, authToken]);

  // useEffect(() => {
  //   if (authToken && isFocused) {
  //     // Ensure selectedItemId has a value
  //     if (selectedItemId === null || selectedItemId === undefined) {
  //       // setSelectedItemId(t('Africa'));
  //       setSelectedItemId("Africa");
  //     }

  //     setLoading(true);
  //     fetchCategory(language)
  //     fetchAll(selectedItemId);
  //     fetchTopVideos();
  //     fetchElectronics(selectedItemId);
  //     fetchVehicles(selectedItemId);
  //     fetchClothing(selectedItemId);

  //     setLoading(false);
  //   }
  // }, [authToken, selectedItemId ,isFocused, language]);

  useEffect(() => {
    const fetchData = async () => {
      if (authToken) {
        // Ensure selectedItemId has a value
        if (selectedItemId === null || selectedItemId === undefined) {
          setSelectedItemId("Africa");
        }
  
        setLoading(true);
        
        try {
          // Await all data fetching functions to ensure they complete before proceeding
          await fetchCategory();
          await fetchAll(selectedItemId);
          await fetchTopVideos();
          await fetchElectronics(selectedItemId);
          await fetchVehicles(selectedItemId);
          await fetchClothing(selectedItemId);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchData(); // Call the asynchronous function
  }, [authToken, selectedItemId]);
  
console.log('seceteddd--- id   --?', selectedItemId)
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
      const updatedBanners = result.AllBanners.map((banner) => {
        if (banner.image.startsWith("/fileUpload")) {
          banner.image = base_url + `${banner.image}`;
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

  const fetchTopVideos = async () => {
    const token = authToken;

    try {
      const response = await fetch(base_url + `top/app/top_item`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      setDataTopVideos(result.topitem[0]); // Update the state with the fetched data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCategory = async () => {
    // const token = result;
    setLoading(true);  try {
      const response = await fetch(
        base_url + "itemCategory/getAllItemCategories?page=1&limit=10000",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const categories = data.AllCategories.map((category) => ({
          label: category.name, // Use the "name" property as the label
          // label:
          // lang === "fr" && category.french_name
          //     ? category.french_name
          //     : category.name,
          french_name: category.french_name,
          value: category.id.toString(), // Convert "id" to a string for the value
        }));
console.log('data---------------', categories)
        setCategorySelect(categories); // Update the state with the formatted category data
      } else {
        console.error(
          "Failed to fetch categories:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };

  const fetchElectronics = async (selectedItemId) => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url +
          `item/getAllItemByCategory/13?page=1&limit=5&region=${selectedItemId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      setDataElectronics(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchVehicles = async (selectedItemId) => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        base_url +
          `item/getAllItemByCategory/12?page=1&limit=5&region=${selectedItemId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      setDataVehicles(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchClothing = async (selectedItemId) => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        base_url +
          `item/getAllItemByCategory/6?page=1&limit=5&region=${selectedItemId}`,
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
  const fetchAll = async (selectedItemId) => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        base_url +
          `item/getAllItemByCategory/5?page=1&limit=5&region=${selectedItemId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllItems fetch other item", result.AllItems);
      setData(result.AllItems);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const firstImageUrl = Array.isArray(dataTopVideos.images) && dataTopVideos.images.length > 0
    ? dataTopVideos.images[0]?.image
    : null;
    

  const goToScreen = () => {
    ref_RBSheetCamera.current.close();

    navigation.navigate("Sell");
  };
 

  const renderAvailableApps = (item) => {
    // console.log("Items of market zone", item?.images[0]?.image);
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

                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
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

  const renderSearches = (item) => {
    // console.log("Regions", item);
    const isSelected = selectedItemId === item.name;
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
          setSelectedItemId(item.name);
          console.log("Selected item:", item.name);
        }}
      >
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#232323" : "#939393" },
          ]}
        >
          {name}
          {/* {item} */}
        </Text>
      </TouchableOpacity>
    );
  };

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
          showHome={true}
          showText={true}
          onPressSearch={() => navigation.navigate("SearchProducts")}
          text={t('MarketZone')} 
          showSearch={true}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: hp(1),
          marginHorizontal: wp(6),
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
                      width:Platform.OS =="ios" ? "95%" :  "100%",
                      borderWidth: 1,
                      margin:Platform.OS =="ios"? 10:0,
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

        <View style={styles.latestSearchList}>
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
            renderItem={({ item }) => renderSearches(item)}
          />
        </View>
        <View
          style={{ marginTop: hp(2), flexDirection: "row", height: hp(16) }}
        >
           <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetails", { ProductDetails: dataTopVideos })
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
          <View style={{  width: "50%",}}>
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
                ? t('NoTopMarketShown')
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
             {language === 'fr' ? categoriesSelect[0]?.french_name : categoriesSelect[0]?.label}
            {/* {categoriesSelect[0]?.label} */}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
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
                {dataElectronics?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                      {t('NoDataAvailable')}
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={dataElectronics}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderAvailableApps(item)}
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
             {language === 'fr' ? categoriesSelect[1]?.french_name : categoriesSelect[1]?.label}
            {/* {categoriesSelect[1]?.label} */}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
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
                {/* {dummydataVehicles?.length === 0 ? ( */}
                {dataVehicles?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                    {t('NoDataAvailable')}
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
                    renderItem={({ item }) => renderAvailableApps(item)}
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
             {language === 'fr' ? categoriesSelect[2]?.french_name : categoriesSelect[2]?.label}
            {/* {categoriesSelect[2]?.label} */}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
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
                {dataClothing?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                    {t('NoDataAvailable')}
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={dataClothing}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderAvailableApps(item)}
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
             {language === 'fr' ? categoriesSelect[3]?.french_name : categoriesSelect[3]?.label}
            {/* {categoriesSelect[3]?.label} */}
          </Text>

          <View style={{ marginTop: hp(1), height: "100%" }}>
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
                {data?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: hp(2.1) }}>
                    {t('NoDataAvailable')}
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderAvailableApps(item)}
                  />
                )}
              </>
            )}
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

      <TouchableOpacity
        onPress={() => navigation.navigate("Sell")}
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
    // width: wp(30),
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
});
