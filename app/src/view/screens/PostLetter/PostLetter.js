import {
  StyleSheet,
  FlatList,
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
import RBSheet from "react-native-raw-bottom-sheet";
import { appImages } from "../../../assets/utilities/index";
import CustomButton from "../../../assets/Custom/Custom_Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PublicLetter from "../../../assets/svg/PublicLetter.svg";
import PrivateLetter from "../../../assets/svg/PrivateLetter.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import CPaperInput from "../../../assets/Custom/CPaperInput";
import Headers from "../../../assets/Custom/Headers";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
import { base_url } from "../../../../../baseUrl";
import { useTranslation } from "react-i18next";

export default function PostLetter({ navigation, route }) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [greetingsTitle, setGreetingsTitle] = useState(null);
  const { t } = useTranslation();
  const ref_RBSheetCamera = useRef(null);
  const [postLetter, setPostLetter] = useState("");
  const [subjectOfLetter, setSubjectOfLetter] = useState("");
  const [introductionOfLetter, setIntroductionOfLetter] = useState("");

  const [greetings, setGreetings] = useState("");

  const [userImage, setUserImage] = useState();

  const [letterType, setLetterTypes] = useState("Public");

  const ref_RBSendOffer = useRef(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [authToken, setAuthToken] = useState("");

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState("");
  const [Username, setUserName] = useState('');
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);

    await getUserID();
    setLoading(false);
  };

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem("userId ");
      if (result !== null) {
        setUserId(result);
        userToken(result);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  const userToken = async (id) => {
    try {
      const result3 = await AsyncStorage.getItem("authToken ");
      if (result3 !== null) {
        setAuthToken(result3);
        authTokenAndId(id, result3);
        userUserName();
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  const userUserName = async id => {
    try {
      const result3 = await AsyncStorage.getItem('userName');
      if (result3 !== null) {
        setUserName(result3);  
      }
    } catch (error) {
    }
  };
  const authTokenAndId = async (id, token) => {
    fetchUser(id, token);
  };

  const fetchUser = async (id, tokens) => {
    const token = tokens;

    try {
      const response = await fetch(base_url + `user/getUser/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserImage(data.user.image);
      } else {
        console.error(
          "Failed to fetch user:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Errors:", error);
    }
  };

  //---------------------------------------\\

  const receivedDataName = route.params?.name;
  const receivedDatAddress = route.params?.address;
  const receivedDataContactNumber = route.params?.contactNumber;
  const receivedDataEmail = route.params?.email;
  const receivedDataCategoryId = route.params?.category_id;
  const receivedDataLetterType = route.params?.letterType;

  const searches = [
    { id: 1, title: t("subject") },
    { id: 2, title: t("Introduction") },
    { id: 3, title: t("Body") },
    { id: 4, title: t("Greetings") },
  ];
  const onFocusChangeSubject = (id, title, text) => {
    setSelectedItemId(id);
    setGreetingsTitle(title);
    setSubjectOfLetter(text);
  };

  const onFocusChangeIntroduction = (id, title, text) => {
    setSelectedItemId(id);
    setGreetingsTitle(title);
    setIntroductionOfLetter(text);
  };

  const onFocusChangeBody = (id, title, text) => {
    setSelectedItemId(id);
    setGreetingsTitle(title);
    setPostLetter(text);
  };

  const onFocusChangeGreetings = (id, title, text) => {
    setSelectedItemId(id);
    setGreetingsTitle(title);
    setGreetings(text);
  };

  const setLetterType = (value) => {
    setLetterTypes(value);
    ref_RBSheetCamera.current.close();
  };

  const setType = () => {
    ref_RBSheetCamera.current.close();

    setLetterType("Private Letter");

    ref_RBSendOffer.current.open();
  };

  const handleUpdatePassword = async () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const renderSearches = (item) => {
    const isSelected = selectedItemId === item.id;

    return (
      <TouchableOpacity style={[styles.searchesDetails, {}]}>
        <Text
          style={[
            styles.textSearchDetails,
            { color: isSelected ? "#FACA4E" : "#939393" },
          ]}
        >
          {item.title}
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

      <View style={{ marginTop: hp(5), height: hp(8) }}>
        <Headers
          showBackIcon={true}
          showText={true}
          text={t("PostLetter")}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginHorizontal: wp(8),
          alignItems: "center",
          marginTop: hp(3),
          height: hp(8),
        }}
      >
        {userImage !== undefined ? (
          <View
            style={{
              width: wp(12),
              marginLeft: wp(0.5),
              height: wp(12),
              borderRadius: wp(12) / 2,
            }}
          >
            <Image
              source={{ uri: userImage }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: wp(12) / 2,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: wp(10),
              marginLeft: wp(3),
              height: wp(10),
              overflow: "hidden",
              borderRadius: wp(10) / 2,
            }}
          >
            <MaterialCommunityIcons
              style={{ marginTop: hp(0.5) }}
              name={"account-circle"}
              size={35}
              color={"#FACA4E"}
            />
          </View>
        )}
  <Text
            style={{
              color: '#333333',
              marginLeft: wp(3),
              fontFamily: 'Inter',
              fontWeight: 'bold',
            }}>
            {Username}
          </Text>
        {/* <TouchableOpacity
          onPress={() => ref_RBSheetCamera.current.open()}
          style={{
            flexDirection: "row",
            marginLeft: wp(5),
            height: hp(5),
            width: wp(33),
            borderWidth: 0.5,
            borderColor: "#FACA4E",
            borderRadius: wp(5),
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ color: "#FACA4E", fontFamily: "Inter-Regular" }}>
            {letterType}
          </Text>

          <Ionicons name="chevron-down" size={21} color="#FACA4E" />
        </TouchableOpacity> */}
      </View>

      <View
        style={{
          height: hp(8),
          width: "100%",
          marginTop: hp(3),
          borderTopColor: "#0000001A",
          borderBottomColor: "#0000001A",
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
        }}
      >
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

      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginLeft: wp(8), marginTop: hp(3) }}>
          <CPaperInput
            placeholder={t("SubjectOfLetter")}
            placeholderTextColor="#121420"
            value={subjectOfLetter}
            onChangeText={(text) => onFocusChangeSubject(1, "Subject", text)}
          />
        </View>

        <View style={{ marginLeft: wp(8), marginTop: hp(1) }}>
          <CPaperInput
            placeholder={t("IntroductionOfLetter")}
            placeholderTextColor="#121420"
            value={introductionOfLetter}
            onChangeText={(text) =>
              onFocusChangeIntroduction(2, "Introduction", text)
            }
          />
        </View>

        <View style={{ marginLeft: wp(8), marginTop: hp(3) }}>
          <CPaperInput
            multiline={true}
            placeholder={t("TypeHere")}
            placeholderTextColor="#121420"
            value={postLetter}
            onChangeText={(text) => onFocusChangeBody(3, "Body", text)}
            height={hp(55)}
          />
        </View>

        <View style={{ marginLeft: wp(8), marginTop: hp(1) }}>
          <CPaperInput
            multiline={true}
            placeholder={t("Greetings")}
            placeholderTextColor="#121420"
            value={greetings}
            onChangeText={(text) =>
              onFocusChangeGreetings(4, "Greetings", text)
            }
            height={hp(15)}
          />
        </View>

        <View style={{ marginTop: hp(1), marginHorizontal: wp(8) }}>
          <CustomButton
            title={t("Next")}
            load={false}
            customClick={() => {
              if (
                greetings !== "" &&
                subjectOfLetter !== "" &&
                introductionOfLetter !== "" &&
                postLetter !== ""
              ) {
                navigation.replace("PostLetterEditSignature", {
                  greetingsTitle: greetings,
                  subjectOfLetter: subjectOfLetter,
                  introductionOfLetter: introductionOfLetter,
                  postLetter: postLetter,
                  name: receivedDataName,
                  address: receivedDatAddress,
                  contactNumber: receivedDataContactNumber,
                  email: receivedDataEmail,
                  category_id: receivedDataCategoryId,
                  letterType: receivedDataLetterType,
                  formOfApeal: "My appeal",
                });
              } else {
                console.log("Going to else");
                handleUpdatePassword();
              }
            }}
          />
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
          <Text
            style={{
              fontFamily: "Inter-Medium",
              color: "#303030",
              fontSize: hp(2.3),
            }}
          >
            {t("SelectLetterType")}
            {/* Select Letter Type */}
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <CustomSnackbar
          message={t("Alert!")}
          messageDescription={t("KindlyFillAllFields")}
          onDismiss={dismissSnackbar} // Make sure this function is defined
          visible={snackbarVisible}
        />
        <View
          style={{
            justifyContent: "space-evenly",

            marginTop: hp(3),
          }}
        >
          <TouchableOpacity
            onPress={() => setLetterType("Public Letter")}
            style={{ flexDirection: "row", marginHorizontal: wp(7) }}
          >
            <PublicLetter height={23} width={23} />

            <Text
              style={{
                fontFamily: "Inter-Regular",
                color: "#656565",
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}
            >
              {t("PublicLetter")}
              {/* Public letter */}
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
            onPress={() => setType()}
            style={{
              flexDirection: "row",
              marginTop: hp(2.5),
              marginHorizontal: wp(7),
            }}
          >
            <PrivateLetter height={23} width={23} />

            <Text
              style={{
                fontFamily: "Inter-Regular",
                color: "#656565",
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}
            >
              {t("PrivateLetter")}
              {/* Private Letter */}
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSendOffer}
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
            height: hp(55),
          },
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginHorizontal: wp(8),
            justifyContent: "space-evenly",
          }}
        >
          <Image source={appImages.alert} style={{ resizeMode: "contain" }} />

          <Text
            style={{
              color: "#333333",
              marginLeft: wp(1),
              fontSize: hp(2.3),

              fontFamily: "Inter-Bold",
            }}
          >
            {t("UnableToPost")}
            {/* Unable To Post! */}
          </Text>

          <Text
            style={{
              color: "#9597A6",
              marginLeft: wp(1),
              fontSize: hp(2),
              textAlign: "center",
              lineHeight: hp(3),

              fontFamily: "Inter-Regular",
            }}
          >
            {t("UpgradeForPrivateLetterPostingAndASeamlessExperience")}
          </Text>

          <View style={{ marginHorizontal: wp(10) }}>
            <CustomButton
              title={t("BuySubscription")}
              customClick={() => {
                ref_RBSendOffer.current.close();
                navigation.navigate("SubscriptionPayment");
              }}
              style={{ width: wp(59) }}
            />
          </View>

          <TouchableOpacity onPress={() => ref_RBSendOffer.current.close()}>
            <Text
              style={{
                color: "#9597A6",
                marginLeft: wp(1),
                marginBottom: hp(3),
                fontSize: hp(2),
                textAlign: "center",
                lineHeight: hp(3),
                //textDecorationLine:'underline',
                fontFamily: "Inter-Regular",
                //fontWeight: 'bold',
              }}
            >
              {t("Maybelater")}
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
  searchesDetails: {
    flexDirection: "row",
    marginLeft: wp(3),
    alignItems: "center",
    justifyContent: "center",
    width: wp(23),
    height: hp(5),
  },
  textSearchDetails: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: hp(1.8),
  },
});
