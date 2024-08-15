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
  SectionList,
  Dimensions
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Fontiso from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
import Camera from "../../../assets/svg/Camera.svg";
import Gallery from "../../../assets/svg/Gallery.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Headers from "../../../assets/Custom/Headers";
import { appImages } from "../../../assets/utilities";
import Add from "../../../assets/svg/AddMainScreen.svg";
import { base_url } from "../../../../../baseUrl";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Carousel from 'react-native-snap-carousel';
import TVpromaxActive from "../../../assets/svg/TVpromaxActive";
import Swiper from "react-native-swiper";
const bannerAds = [
  {
    id: 1,
    image: require("../../../assets/images/BannerAds.png"),
  },
  {
    id: 2,
    image: require("../../../assets/images/BannerAds.png"),
  },
  {
    id: 3,
    image: require("../../../assets/images/BannerAds.png"),
  },
  {
    id: 4,
    image: require("../../../assets/images/BannerAds.png"),
  },
];
export default function Tv_Promax({  route }) {
  const navigation = useNavigation();
  // const { identifier } = route.params;
  // console.log("identifier from cinematices ", identifier)
  const [data, setData] = useState([]);

  const [authToken, setAuthToken] = useState("");

  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);

  const [dataTopVideos, setDataTopVideos] = useState([]);

  const ref_RBSheetCamera = useRef(null);
  const [imageUri, setImageUri] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
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

  useEffect(() => {
    if (authToken && isFocused) {
      if(selectedItemId == null)
        // console.log('useeffect mein id hai', selectedItemId)
        {
          setSelectedItemId(17)
        }
        
      // fetchAllData();
      fetchAllCinematicsCategory();
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      fetchAllData();
    }
  }, [authToken, selectedItemId]);

  const fetchAllData = async () => {
    setLoading(true);
    setNoData(false);
    try {
      // await fetchAllCinematicsCategory();
      await fetchTopVideos();
      await fetchSubCategory(selectedItemId);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const [adsData, setAdsData] = useState([]);
  const [adsinActiveData, setAdsInActiveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (authToken) {
      fetchBannerConfig();
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
  const fetchAllCinematicsCategory = async () => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        base_url + "tvProgmax/category/getAll?page=1&limit=10000",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllCategories---", result.AllCategories);
      setData(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  const fetchTopVideos = async () => {
     // console.log("Categry in id", selectedItemId);
     const token = authToken;

     try {
       const response = await fetch(
         base_url + "tvProgmax/getTopVideo",
         {
           method: "GET",
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
 
       const result = await response.json();
       console.log("getTopVideo------..", result.data);
       setDataTopVideos(result.data);
     } catch (error) {
       console.error("Error Trending:", error);
     }
  };

  const fetchSubCategory = async (selectedItemId) => {
    const token = authToken;
  
    try {
      const response = await fetch(
        `${base_url}tvProgmax/getByCategory/${selectedItemId}?page=1&limit=10000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const result = await response.json();
  
      if (Array.isArray(result.data) && result.data.length > 0) {
        const formattedSections = result.data.map(category => ({
          title: category.sub_category_name,
          data: category.video_result.videos,
        }));
  
             // Reverse the titles
      const reversedSections = formattedSections.reverse();
      console.log('results---', reversedSections);
      setSections(reversedSections);

        // Check if there is no data
        const hasNoData = formattedSections.every(section => section.data.length === 0);
        setNoData(hasNoData);
      } else {
        setSections([]);
        setNoData(true);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setNoData(true);  // Assume no data on error
    }
  };
  
  
  const renderVideoItem = ({ item }) => (
    // <TouchableOpacity onPress={handle_details}>
    <TouchableOpacity onPress={() => navigation.navigate('Tv_Promax_details', {videoData: item})}>
    <View style={styles.itemContainer}>
      {/* <Image source={require('../../../assets/images/img1.png')} style={styles.image} /> */}
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
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

  const handle_add = () => {
    ref_RBSheetCamera.current.open();
  };
 

  // const handle_details = () => {
  //   navigation.navigate("Cinematics_details");
  // };
  // const renderItem = ({ item }) => (
  //   <TouchableOpacity onPress={handle_details}>
  //     <View style={styles.itemContainer}>
  //       <Image source={item.image} style={styles.image} />
  //       <Text style={styles.text}>{item.title}</Text>
  //       <Text style={styles.text1}>{item.time}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  const goToScreen = () => {
    ref_RBSheetCamera.current.close();

    navigation.navigate("Sell");
  };

  const takeVideoFromCamera = async () => {
    ref_RBSheetCamera.current.close();

    launchCamera(
      {
        mediaType: "video",
      },
      (response) => {
        console.log("video here from camera", response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
            setImageInfo(response.assets[0]);

            console.log("response", response.assets[0].uri);
            navigation.navigate("Tv_promax_upload", {
              imageUri: response.assets[0],
            });
          }
        }
      }
    );
  };

  const chooseVideoFromLibrary = () => {
    ref_RBSheetCamera.current.close();

    launchImageLibrary({ mediaType: "video" }, (response) => {
      console.log("video here from gallery", response);
      if (!response.didCancel && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]);
        navigation.navigate("Tv_promax_upload", {
          imageUri: response.assets[0],
        });
      }
    });
  };

  const renderSearches = (item) => {
    // console.log("Regions", item);
    const isSelected = selectedItemId === item.id;
// console.log('is selected hai---', isSelected)
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
  const goto_camera = () => {
    navigation.navigate("CameraView");
  };


  // console.log('data for top aa gya ----', dataTopVideos)
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
          onPressSearch={() => navigation.navigate("Tv_Search_Video")}
          text={"Tv ProgMax"}
          showSearch={true}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: hp(1),
          marginHorizontal: wp(7),
        }}
      >

          {/* // */}
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
          itemWidth={Dimensions.get('window').width * 0.86}
          loop={true}
          autoplay={true}
        />
      )}
    </View>
        {/* ////slider end */}

        <View style={styles.latestSearchList}>
        <View>
              <TVpromaxActive width={23} height={23} />
          </View>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            //data={regions}
            data={data}
            //keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderSearches(item)}
          />
        </View>
        <View
          style={{ marginTop: hp(1.5), flexDirection: "row", height: hp(16), marginBottom:30 }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Tv_Promax_details', {videoData: dataTopVideos})} style={{ width: wp(43), height: "100%", borderRadius: wp(5) }}>
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
                source={{ uri: dataTopVideos?.thumbnail }}
              />
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
                }}
              >
                {dataTopVideos?.name}
              </Text>
            </View>
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
              {dataTopVideos === undefined || dataTopVideos === 0
                ? "No Top Tv ProgMax Shown"
                : dataTopVideos?.description}
            </Text>
          </View>
        </View>

{/* //////////////////////////////////////////////////////////// */}
<View style={{  flex: 1,
    paddingTop: 20}}>
      {loading ? (
        <ActivityIndicator size="large" color="#FACA4E" />
      ) : (
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.title}
        />
      )}
    </View>

{/* /////////////////////////////////////////////////////////////// */}
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
      ) : adsinActiveData.length === 0 ? (
        <View style={styles.TopBannerView}>
          <Text style={{ fontWeight: 'bold', fontSize: hp(2.1) }}>No Banner</Text>
        </View>
      ) : (
        <Carousel
          data={adsinActiveData}
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
      </ScrollView>

      <TouchableOpacity
        onPress={handle_add}
        style={{ position: "absolute", bottom: 1, right: 25 }}
      >
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
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(39),
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
          <Text
            style={{
              fontFamily: "Inter-Medium",
              color: "#303030",
              fontSize: hp(2.3),
            }}
          >
            Select an option
          </Text>
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
            //flexDirection: 'row',
            justifyContent: "space-evenly",
            //alignItems: 'center',
            //borderWidth: 3,
            marginTop: hp(3),
          }}
        >
          <TouchableOpacity
            onPress={() => goToScreen()}
            style={{ flexDirection: "row", marginHorizontal: wp(7) }}
          >
            <Text
              style={{
                fontFamily: "Inter-Regular",
                color: "#656565",
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}
            >
              Phones And Electronics
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: hp(0.1),
              marginHorizontal: wp(8),
              marginTop: hp(3),
              backgroundColor: "#00000012",
            }}
          ></View>

          <TouchableOpacity
            onPress={() => goToScreen()}
            style={{
              flexDirection: "row",
              marginTop: hp(1.8),
              marginHorizontal: wp(7),
            }}
          >
            <Text
              style={{
                fontFamily: "Inter-Regular",
                color: "#656565",
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}
            >
              Vehicle Parts
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: hp(0.1),
              marginHorizontal: wp(8),
              marginTop: hp(3),
              backgroundColor: "#00000012",
            }}
          ></View>

          <TouchableOpacity
            onPress={() => goToScreen()}
            style={{
              flexDirection: "row",
              marginTop: hp(1.8),
              marginHorizontal: wp(7),
            }}
          >
            <Text
              style={{
                fontFamily: "Inter-Regular",
                color: "#656565",
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}
            >
              Clothing and Related item
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: hp(0.1),
              marginTop: hp(1.8),
              marginHorizontal: wp(8),
              marginTop: hp(3),
              backgroundColor: "#00000012",
            }}
          ></View>

          <TouchableOpacity
            onPress={() => goToScreen()}
            style={{
              flexDirection: "row",
              marginTop: hp(1.8),
              marginHorizontal: wp(7),
            }}
          >
            <Text
              style={{
                fontFamily: "Inter-Regular",
                color: "#656565",
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}
            >
              All other items
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

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
            justifyContent: "space-between", // Set to space between to separate text and icon
            marginHorizontal: wp(8),
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "left",
              color: "black",
              fontSize: hp(2.1),
            }}
          >
            Select an option
          </Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={23}
              color={"#303030"}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            top: "1%",
            flex: 1,
            marginHorizontal: wp(8),
            marginBottom: hp(1),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => takeVideoFromCamera("Camera")}
            // onPress={goto_camera}
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              borderRadius: 10,
              borderColor: "#FACA4E",
              borderWidth: 1,
            }}
          >
            <View style={{ marginLeft: wp(3) }}>
              <Camera width={21} height={21} />
            </View>

            <Text
              style={{
                color: "grey",
                marginLeft: wp(3),
                // fontWeight: "600",
                fontSize: hp(2.1),
              }}
            >
              Take a Video
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => chooseVideoFromLibrary("gallery")}
            style={{
              alignItems: "center",
              justifyContent: "center", // Center the icon and text vertically
              flex: 1,
              borderRadius: 10,
              borderColor: "grey",
              borderWidth: 1,
              marginLeft: wp(8), // Add margin to separate the options
            }}
          >
            <View style={{ marginLeft: wp(3) }}>
              <Gallery width={21} height={21} />
            </View>

            <Text
              style={{
                color: "grey",
                marginLeft: wp(3),
                fontWeight: "600",
                fontFamily: "BebasNeue-Regular",
                fontSize: hp(2.1),
              }}
            >
              Choose a Video
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    // marginLeft: wp(1),
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
    width: wp(30),
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
    // fontWeight: 'bold',
    color: "#4A4A4A",
    fontSize: hp(1.5),
    // textAlign: 'left',
    fontFamily: "Inter",
    
    // marginTop: 5,
    // right: "20%",
  },
  flatListContent: {
    paddingHorizontal: wp(2),
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
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  videoDescription: {
    fontSize: 14,
    color: 'gray',
  },
  noDataText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    color: 'gray',
  },
});
