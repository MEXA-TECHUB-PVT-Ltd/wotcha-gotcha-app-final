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
import QafiIcon from "react-native-vector-icons/FontAwesome5";

export default function QAFIScreen() {

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
      const response = await fetch(`${base_url}qafi/category/getAll?page=1&limit=10000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      const reverseData = result.AllCategories.reverse();
      setSearchesData(reverseData);
      // setSearchesData(result.AllCategories);
      // if (result.AllCategories.length > 0) {
      //   setSelectedItemId(result.AllCategories[0].id);
      // }
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
      const response = await fetch(`${base_url}qafi/getTopQafi`, {
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
      const response = await fetch(`${base_url}qafi/getAllQafisByCategory/${categoryId}?page=1&limit=100000`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          title: category.sub_category_name,
          data: category.QAFI_result.QAFIs,
        }));
        
        const reverseData = formattedSections.reverse();
        setSections(reverseData);
        // setSections(formattedSections);

        console.log('sub cate hai---', formattedSections)
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



  const renderSearches = (item) => {
    // console.log('First Id', searchesData[0].id);
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
          console.log("Selected item:", item.id);
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



  const renderVideoItem = ({ item }) => (
    // <TouchableOpacity onPress={handle_details}>
    <TouchableOpacity  onPress={() => navigation.navigate("ViewQAFI", { picData: item })}>
    <View style={styles.itemContainer}>
      {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
      {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
          
   
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
              {/*  <Image
                source={appImages.profileImg}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              /> */}
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
        keyExtractor={(videoItem) => videoItem.qafi_id.toString()}
        // keyExtractor={(videoItem, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    )}
    </View>
  );











































  // const [selectedItemId, setSelectedItemId] = useState(1);
  // const navigation = useNavigation();
  // const [categoryIdNews, setCategoryIdNews] = useState(null);

  // const [loading, setLoading] = useState(false);

  // const isFocused = useIsFocused();

  // const [newsData, setNewsData] = useState([]);

  // const [topNewsData, setTopNewsData] = useState([]);

  // const [authToken, setAuthToken] = useState("");

  // const [categoriesSelect, setCategorySelect] = useState([]);
  // const [categoryData, setCategoryData] = useState([]);

  // const [carouselIndex, setCarouselIndex] = useState(0);
  // const [adsinActiveData, setAdsInActiveData] = useState([]);
  // const [adsData, setAdsData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const [qaficategoryData, setQafiCategoryData] = useState([]);

  // useEffect(() => {
  //   if (isFocused) {
  //     getUserID(); // Call the async function
  //   }
  // }, []); // Include 'id' in the dependency array

  // const getUserID = async () => {
  //   try {
  //     const result = await AsyncStorage.getItem("authToken ");
  //     if (result !== null) {
  //       setAuthToken(result);
  //       // fetchData();
  //       // console.log("user id retrieved:", result);
  //     }
  //   } catch (error) {
  //     // Handle errors here
  //     console.error("Error retrieving user ID:", error);
  //   }
  // };

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

  // const fetchTopNews = async () => {
  //   // console.log('Categry in id', categoryIdNews);
  //   // console.log('News Called');
  //   setLoading(true);
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       // base_url + `top/getAllTopQAFIByCategory/${categoryIdNews}`,
  //       base_url + "top/getAllTopQAFIByCategory/3",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const result = await response.json();
  //     // console.log('Resultings of TopNews', result.AllQAFI[0]);
  //     //Alert.alert(result)

  //     setTopNewsData(result.AllQAFI[0]); // Update the state with the fetched data
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error Trending:", error);
  //   }
  // };

  // const fetchCate = async () => {
  //   setLoading(true);
  //   const token = authToken;

  //   try {
  //     const response = await fetch(
  //       base_url + "discCategory/getAllDiscCategories?page=1&limit=1000",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();

  //       // Use the data from the API to set the categories
  //       const categories = data.AllCategories.map((category) => ({
  //         label: category.name, // Use the "name" property as the label
  //         value: category.id.toString(), // Convert "id" to a string for the value
  //       }));

  //       // console.log("Categories", categories);

  //       setCategorySelect(categories); // Update the state with the formatted category data
  //       fetchQAFIDataForValues(categories);
  //       const valuesArray = categories.map((category) => category.value);
  //     } else {
  //       setLoading(false);
  //       console.error(
  //         "Failed to fetch categories:",
  //         response.status,
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Errors:", error);
  //   }
  // };

  // const fetchQAFIDataForValues = async (categories) => {
  //   setLoading(true);
  //   try {
  //     const dataByCategory = {};

  //     for (const category of categories) {
  //       const { label, value } = category;

  //       const response = await fetch(
  //         base_url + `qafi/getAllQafisByCategory/${value}?page=1&limit=1000`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );

  //       if (response.ok) {
  //         const result = await response.json();
  //         const reversedData = result.QAFIs.reverse();
  //         dataByCategory[label] = reversedData; // Assuming AllQAFIs contains the array of news items
  //         // dataByCategory[label] = result.QAFIs; // Assuming AllQAFIs contains the array of news items
  //         // console.log(
  //         //   "Fetched data for  qafii category------",
  //         //   label,
  //         //   ":",
  //         //   dataByCategory[label]
  //         // );
  //       } else {
  //         console.error(
  //           "Failed to fetch category data for category",
  //           label,
  //           ":",
  //           response.status,
  //           response.statusText
  //         );
  //       }
  //     }
  //     // console.log("qafi----------------", dataByCategory);
  //     setQafiCategoryData(dataByCategory);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error fetching category data:", error);
  //   } finally {
  //     setLoading(false); // Set loading to false after API call (whether it succeeded or failed)
  //   }
  // };

  // const searches = [
  //   { id: 1, title: "QAFI" },
  //   { id: 2, title: "Trending" },
  //   { id: 3, title: "Famous" },
  //   { id: 4, title: "Local" },
  // ];
  // const renderSearches = (item) => {
  //   // console.log('Items', item);
  //   const isSelected = selectedItemId === item.id;

  //   return (
  //     <TouchableOpacity
  //       style={[
  //         styles.searchesDetails,
  //         {
  //           backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
  //         },
  //       ]}
  //       onPress={() => {
  //         setSelectedItemId(item.id);
  //       }}
  //     >
  //       <Text
  //         style={[
  //           styles.textSearchDetails,
  //           { color: isSelected ? "#232323" : "#939393" },
  //         ]}
  //       >
  //         {item.title}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };

  // const renderAvailableAppsQAFI = (item) => {
  //   // console.log('Items of QAFI', item);
  //   return (
  //     <TouchableOpacity
  //       onPress={() => navigation.navigate("ViewQAFI", { picData: item })}
  //       style={{ width: wp(34), margin: 5 }}
  //     >
  //       <View>
  //         <Image
  //           style={{
  //             position: "absolute",
  //             top: 0,
  //             left: 0,

  //             zIndex: 1, // Ensure it's on top of other elements
  //             //flex: 1,
  //             width: "100%",
  //             height: hp(12),
  //             borderRadius: wp(1),
  //             resizeMode: "cover",
  //           }}
  //           source={{ uri: item.image }}
  //         />
  //       </View>

  //       <View
  //         style={{
  //           flexDirection: "row",
  //           alignItems: "center",
  //           marginTop: hp(12),
  //           height: hp(7),
  //           width: wp(25),
  //         }}
  //       >
  //         {item?.userimage ? (
  //           <View
  //             style={{
  //               width: wp(7),
  //               marginLeft: wp(0.5),
  //               height: wp(7),
  //               overflow: "hidden",
  //               borderRadius: wp(7) / 2,
  //             }}
  //           >
  //             <Image
  //               source={{ uri: item?.userimage }}
  //               style={{ width: "100%", height: "100%", resizeMode: "cover" }}
  //             />
  //           </View>
  //         ) : (
  //           <View
  //             style={{
  //               width: wp(7),
  //               marginLeft: wp(0.5),
  //               height: wp(7),
  //               borderRadius: wp(7) / 2,
  //               alignItems: "center",
  //               justifyContent: "center",
  //             }}
  //           >
  //             <MaterialCommunityIcons
  //               // style={{marginTop: hp(0.5)}}
  //               name={"account-circle"}
  //               size={24}
  //               color={"#FACA4E"}
  //             />
  //             {/*  <Image
  //               source={appImages.profileImg}
  //               style={{width: '100%', height: '100%', resizeMode: 'cover'}}
  //             /> */}
  //           </View>
  //         )}

  //         <View style={{ width: 70 }}>
  //           <Text
  //             ellipsizeMode="tail"
  //             numberOfLines={1}
  //             style={{
  //               fontSize: hp(1.5),
  //               marginLeft: wp(0.7),
  //               color: "#000000",
  //               fontWeight: "bold",
  //               fontFamily: "Inter",
  //             }}
  //           >
  //             {item.username}
  //           </Text>
  //         </View>

  //         <View style={{ marginLeft: wp(1) }}>
  //           <NonVerified />
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  const goToScreen = () => {
    navigation.navigate("QAFIUpload");
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
          onPressSearch={() => navigation.navigate("SearchAppsDisc")}
          //   onPressSearch={handleSearchPress}
          showText={true}
          text={"QAFI"}
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
          <QafiIcon name="people-arrows" size={26} color="#FACA4E" />
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
           onPress={() => navigation.navigate("ViewQAFI", { picData: topNewsData })}
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

              {topNewsData === undefined || topNewsData === 0
                ? "No Top QAFI Shown"
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
        {/* <View style={{ flex: 1 }}>
          {categoriesSelect.map((category) => (
            <View key={category.label}>
              <View style={{ height: hp(24) }}>
                <Text style={styles.text}>{category.label}</Text>
                {loading ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator size="large" color="#FACA4E" />
                  </View>
                ) : (
                  <View style={{ flex: 1 }}>
                    {qaficategoryData[category.label] &&
                    qaficategoryData[category.label].length === 0 ? (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ textAlign: "center" }}>
                          No data available for {category.label}
                        </Text>
                      </View>
                    ) : (
                      <FlatList
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={qaficategoryData[category.label]}
                        keyExtractor={(item) => item.qafi_id.toString()} // Ensure a unique key for each item
                        renderItem={({ item }) => renderAvailableAppsQAFI(item)}
                      />
                    )}
                  </View>
                )}
              </View>
            </View>
          ))}
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
    padding:6,
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
