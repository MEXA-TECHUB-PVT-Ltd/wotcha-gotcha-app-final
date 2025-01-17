import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome";
import { appImages } from "../utilities";
import Settings from "../../assets/svg/Settings.svg";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontiso from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feater from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "../../../../baseUrl";
const Headers = ({
  showBackIcon,
  showText,
  showSearch,
  onPressSearch,
  onPressListings,
  onPressGridView,
  onPressSettings,
  onPressfavourite,
  onPressMenu,
  onPressMenuWhite,
  onPressAdd,
  onPressProfile,
  text,
  showLogo,
  showProfileImage,
  showHeart,
  showMenu,
  showSettings,
  showMenuWhite,
  showAdd,
  showListings,
  showGridView,
  style,
  onPress,
  isFavorite,
  showHome,
  OnpresshowHome,
  navigation,
  identifier,
  identifierName,
}) => {
  const [image, setImage] = useState("");

  const [userId, setUserId] = useState("");

  const [authToken, setAuthToken] = useState([]);

  // //////////faisal code 23/5/2024 for get user and
  useEffect(() => {
    // Make the API request and update the 'image' state
    fetchUserProfileImage();
  }, []);

  const fetchUserProfileImage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken ");
      const userId = await AsyncStorage.getItem("userId ");
      // console.log('User Id in header', userId);
      // console.log('authToken in header', authToken);
      if (authToken && userId) {
        const response = await fetch(`${base_url}user/getUser/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const result = await response.json();
        setImage(result?.user?.image || ""); // Set image URI or empty string if not found
      }
    } catch (error) {
      console.error("Error fetching user profile image:", error);
    }
  };

  // ////////////faisal code end
  // useEffect(() => {
  //   // Make the API request and update the 'data' state
  //   fetchVideos();
  // }, []);

  // const fetchVideos = async () => {
  //   // Simulate loading

  //   // Fetch data one by one
  //   await getUserID();
  //   //await fetchUser();
  //   // Once all data is fetched, set loading to false
  // };

  // const getUserID = async () => {
  //   console.log('AT User Id');

  //   try {
  //     const result = await AsyncStorage.getItem('authToken ');
  //     if (result !== null) {
  //       setAuthToken(result);
  //       await fetchUserId(result);
  //       console.log('user token retrieved of profile:', result);
  //     }

  //     /* console.log("User Id", userId);
  //     console.log("authToken", authToken); */
  //   } catch (error) {
  //     // Handle errors here
  //     console.error('Error retrieving user ID:', error);
  //   }
  // };

  // const fetchUserId = async tokens => {
  //   console.log('Token', tokens);
  //   const result3 = await AsyncStorage.getItem('userId ');
  //   if (result3 !== null) {
  //     setUserId(result3);

  //     console.log('user id retrieved:', result3);
  //     fetchUser(tokens, result3);
  //   } else {
  //     console.log('result is null', result3);
  //   }
  // };

  // const fetchUser = async (tokens, user) => {
  //   console.log('Came to fetch Id');
  //   const token = tokens;

  //   try {
  //     const response = await fetch(
  //       base_url + `user/getUser/${user}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const result = await response.json();
  //     //console.log('Resultings', result.user);
  //     setImage(result?.user?.image);
  //   } catch (error) {
  //     console.error('Error USER:', error);
  //   }
  // };

  return (
    <View style={styles.header}>
      {showBackIcon && (
        <TouchableOpacity style={styles.backArrow} onPress={onPress}>
          <Ionicons name="chevron-back-sharp" size={25} color="#282828" />
        </TouchableOpacity>
      )}

      {showListings && (
        <TouchableOpacity
          style={styles.backArrow}
          onPress={onPressListings}
          navigation={navigation}
        >
          <Ionicons name="menu" size={32} color="#282828" />
        </TouchableOpacity>
      )}
      {showListings && navigation && (
        <TouchableOpacity
          style={styles.backArrow}
          onPress={onPressListings}
          navigation={navigation}
        >
          <Ionicons name="menu" size={32} color="#282828" />
        </TouchableOpacity>
      )}

      {/* {identifierName && navigation ? (
        <TouchableOpacity style={styles.menuIcon} onPress={onPressListings}>
          <Ionicons name="menu" size={32} color="#282828" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={32} color="#282828" />
        </TouchableOpacity>
      )} */}
      {/* {identifierName && navigation && (
  <TouchableOpacity style={styles.backArrow} onPress={onPressListings} navigation={navigation}>
    <Ionicons name="menu" size={32} color="#282828" />
  </TouchableOpacity>
)} */}

      {showText && <Text style={[styles.headerText, style]}>{text}</Text>}

      {showLogo && (
        <Image
          source={appImages.logoTransparent}
          style={styles.logoImage}
          resizeMode="contain"
        />
      )}

      {/* ////faisal code to get user image or show profile icon */}
      {/* {identifier === 1 ? (
        <TouchableOpacity style={styles.menuIcon} onPress={onPressListings}>
          <Ionicons name="menu" size={32} color="#282828" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={32} color="#282828" />
        </TouchableOpacity>
      )} */}
      {showProfileImage && (
        <TouchableOpacity
          onPress={onPressProfile}
          style={{
            marginTop: hp(-2),
            position: "absolute",
            right: wp(3),
          }}
        >
          {image ? (
            <View style={{ borderRadius: 30 }}>
              <Image
                source={{ uri: image }} // Use image URI if available
                style={styles.profileImgs}
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
        </TouchableOpacity>
      )}
      {/*  end */}
      {/* {showProfileImage && (
        <TouchableOpacity
          onPress={onPressProfile}
          style={{
            marginTop: hp(-2),
            position: 'absolute',
            right: wp(3),
          }}>
          {image !== null ? (
            <Image
              source={{uri: image}}
              style={styles.profileImgs}
              resizeMode="contain"
            />
          ) : (
            <MaterialCommunityIcons
              style={{marginTop: hp(0.5)}}
              name={'account-circle'}
              size={35}
              color={'#FACA4E'}
            />
          )}
        </TouchableOpacity>
      )} */}
      {showHeart && (
        <TouchableOpacity onPress={onPressfavourite} style={styles.heartIcon}>
          {isFavorite ? (
            <Fontiso name="heart" size={20} color={Colors.secondary} />
          ) : (
            <Fontiso name="heart-alt" size={20} color="#2B2B2B" />
          )}
        </TouchableOpacity>
      )}

      {showSearch && (
        <TouchableOpacity onPress={onPressSearch} style={styles.heartIcon}>
          <Feater name="search" size={20} color="#FACA4E" />
        </TouchableOpacity>
      )}

      {showMenu && (
        <TouchableOpacity onPress={onPressMenu} style={styles.heartIcon}>
          <Entypo name={"dots-three-vertical"} size={18} color={"#4A4A4A"} />
        </TouchableOpacity>
      )}
      {showHome && (
        <TouchableOpacity onPress={OnpresshowHome} style={styles.listingsMenu}>
          <Entypo name={"home"} size={20} color={"#4A4A4A"} />
        </TouchableOpacity>
      )}

      {showMenuWhite && (
        <TouchableOpacity onPress={onPressMenuWhite} style={styles.heartIcon}>
          <Entypo name={"dots-three-vertical"} size={18} color={"#ffffff"} />
        </TouchableOpacity>
      )}

      {showSettings && (
        <TouchableOpacity onPress={onPressSettings} style={styles.heartIcon}>
          <Settings width={23} height={23} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    //justifyContent:'space-between',
    alignItems: "center",
    justifyContent: "center",
    //paddingHorizontal:wp(5),
    height: hp(5),
    paddingBottom:8
    // marginTop: StatusBar.currentHeight - 20,
  },
  headerText: {
    color: "#333333",
    fontFamily: "Inter",
    fontWeight: "800",
    fontSize: hp(2.8),
    alignSelf: "center",
  },
  logoImage: {
    // alignSelf: "center",
    resizeMode: "contain",
    // marginTop: hp(-2.4),
    width: wp(39),
    height: hp(8),

  },
  backArrow: {
    position: "absolute",
    left: 20,
    justifyContent: "center",
    paddingVertical: 15,
    paddingRight: 10,
  },
  listingsMenu: {
    position: "absolute",
    left: 20,
    justifyContent: "center",
    padding: 10, // Padding to increase the touchable area
  },
  heartIcon: {
    position: "absolute",
    right: 15,
  },
  profileImgs: {
    width: wp(10),
    height: wp(10),
    resizeMode: 'cover',
    borderRadius: 100, // Assuming the image has dimensions 30x30
    //  overflow: "hidden", // Ensure the content is clipped to the border radius
  },
  imgAdd: {
    resizeMode: "contain",
    height: hp(3),
  },
});
