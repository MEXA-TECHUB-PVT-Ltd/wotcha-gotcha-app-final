
////////////////////////////////////////////////////////////////////////////////////////////////////////add faisal code on 22/5/2024
import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  StatusBar,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Link from "../../../assets/svg/Link.svg";
import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Headers from "../../../assets/Custom/Headers";
import Add from "../../../assets/svg/AddMainScreen.svg";
import { base_url } from "../../../../../baseUrl";

export default function ViewBanners({ navigation }) {
  const [authToken, setAuthToken] = useState("");
  const { t } = useTranslation();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [allBanners, setAllBanners] = useState([]);
  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken ");
        if (token) {
          setAuthToken(token);
          getUserID()
        } else {
          throw new Error("No auth token found");
        }
      } catch (err) {
        console.error("Error retrieving auth token:", err);
        // setError(err);
      }
    };

    getAuthToken();
  }, []);


    const getUserID = async () => {

    try {
      const result = await AsyncStorage.getItem("userId ");
      if (result !== null) {
        setUserId(result);
      }
    }catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  // console.log('userId------------',userId )
  // console.log('authTokenauthToken------------',authToken )

  const fetchBanners = async (userId) => {
    const token = authToken;
    setLoading(true);
    try {
      const response = await fetch(
        base_url + `banner/getAllBannersByUser/${userId}`,
        // base_url + 'banner/getAllBanners',
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const Banners = data.AllBanners;
        // Use the data from the API to set the categories
        console.log('data of banner------------',Banners )
        setAllBanners(Banners);
      } else {
        console.error(
          "Failed to fetch user banner:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Errors:", error);
    }
    setLoading(false); 
  };

  useEffect(() => {
    if (userId) {
      fetchBanners(userId)
    }
  }, [userId]);
  const goToScreen = () => {
    navigation.navigate("AddBanner");
  };
 

  const renderBlogs = (item) => {
    // console.log("Items", item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("BannerDetails", { item: item , authToken: authToken})}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: wp(3),
            alignItems: "center",
            height: hp(12),
            marginTop: hp(3),
            marginHorizontal: wp(5),
          }}
        >
          <View
            style={{
              height: hp(10),
              alignSelf: "center",
              resizeMode: "hidden",
              width: wp(24),
              borderRadius: wp(5),
            }}
          >
            <Image
              style={{ width: "100%", borderRadius: wp(2.1), height: "100%" }}
              source={{ uri: item?.image }}
            />
          </View>

          <View style={{ flex: 1, justifyContent: "space-between" , marginLeft: wp(3),}}>
            <View
              style={{
                height: hp(6),
               
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: hp(1.8),
                    fontFamily: "Inter-Medium",
                  }}
                >
                  {t('Startdate')}
                  
                </Text>

                <Text
                  style={{
                    color: "#646464",
                    fontSize: hp(1.8),
                    fontFamily: "Inter-Regular",
                  }}
                >
                  {item?.startdate}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: hp(1.8),
                    fontFamily: "Inter-Medium",
                  }}
                >
                  {t('Enddate')}
                  
                </Text>

                <Text
                  style={{
                    color: "#646464",
                    fontSize: hp(1.8),
                    fontFamily: "Inter-Regular",
                  }}
                >
                  {item?.enddate}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: hp(1),
                height: hp(2.5),
                // alignSelf: "center"
              }}
            >
              <Link width={14} height={14} />

              <Text    numberOfLines={1}
            ellipsizeMode="tail"
                style={{
                  color: "#646464",
                  marginLeft: wp(3),
                  fontSize: hp(1.5),
                  fontFamily: "Inter-Regular",
                }}
              >
                {/* http:/?www.sample.org?head */}

                {item?.banner_link}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: hp(0.1),
            width: "100%",
            marginTop: hp(1),
            backgroundColor: "#00000021",
          }}
        ></View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#FFFFFF"} />

      <View style={{ marginTop: hp(5) }}>
        <Headers
          showBackIcon={true}
          onPress={() => navigation.goBack()}
          showText={true}
          text={"Banner Advertisement"}
        />
      </View>

      <View style={{ marginTop: hp(.5), flex: 1 }}>
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
         {/* <ActivityIndicator size="large" color="#0000ff" style={styles.loading} /> */}
       </View>
      ) : allBanners.length === 0 ? (
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>

          <Text style={styles.placeholder}>Your ads will show here</Text>

        </View>
      ) : (
        <FlatList
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          data={allBanners}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderBlogs(item)}
        />
      )}
    </View>

      <TouchableOpacity
        onPress={() => goToScreen()}
        style={{ position: "absolute", bottom: 1, right: 25 }}
      >
        <Add />
      </TouchableOpacity>
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
        {/* {loading && <ActivityIndicator size="large" color="#FACA4E" />} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  placeholder: {
 
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: '#888',
  },
});
