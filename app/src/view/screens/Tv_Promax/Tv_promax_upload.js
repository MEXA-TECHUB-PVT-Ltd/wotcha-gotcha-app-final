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
  TouchableWithoutFeedback,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import Video from "react-native-video";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Button, Divider, TextInput } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Share from "react-native-share";
import { base_url } from "../../../../../baseUrl";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import IonIcons from "react-native-vector-icons/Ionicons";

import { SelectCountry, Dropdown } from "react-native-element-dropdown";
import CPaperInput from "../../../assets/Custom/CPaperInput";
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import Camera from "../../../assets/svg/Camera.svg";
import Gallery from "../../../assets/svg/Gallery.svg";
import { useRoute } from "@react-navigation/native";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
import CustomDialog from "../../../assets/Custom/CustomDialog";
import CustomLoaderButton from "../../../assets/Custom/CustomLoaderButton";
import { CLOUD_NAME, CLOUDINARY_URL, CLOUDINARY_Video_URL, UPLOAD_PRESET } from "../../../../../cloudinaryConfig";

export default function Tv_promax_upload({ navigation }) {
  const route = useRoute();
  const ref_RBSheetCamera = useRef(null);
  const ref_RBSheetCamera1 = useRef(null);
  const imageUri = route.params?.imageUri;
  // console.log("from cinamtic---- ", imageUri);
  const [showThumbnailContent, setShowThumbnailContent] = useState(false);
  const [thumbnailImageUri, setThumbnailImageUri] = useState(null);
  const [thumbnailImageUritwo, setThumbnailImageUritwo] = useState(null);
  const { t } = useTranslation();
  const [profileName, setProfileName] = useState("");
  const [VedioUri, setImageUri] = useState(null);
  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");

  const [description, setDescription] = useState("");
  const [imageInfo, setImageInfo] = useState(null);
  const [imageResponse, setImageResponse] = useState(null);

  const [snackbarVisible, setsnackbarVisible] = useState(false);
  const [snackbarVisibleAlert, setsnackbarVisibleAlert] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [videourl, setVideoURL] = useState(null);
  const [thumbailurl, setThumnailUrl] = useState(null);

  ////////////////////////////////////////////////////////////////////////////////////////3.6.2024
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [subCate, setSubCate] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [userId, setUserId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [profileNameError, setProfileNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subcategoryError, setSubcategoryError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [thumbnailError, setthumbnailImageUritwoError] = useState("");


  const [imageUriVideo, setimageUri] = useState(imageUri)
  useEffect(() => {
    setimageUri(imageUri);
  }, [imageUri])


  const dummyData = {
    AllCategories: [
      {
        id: 1,
        name: "Vehicles",
        french_name: "Véhicules",
      },
      {
        id: 2,
        name: "Tools & Devices",
        french_name: "Outils et appareils",
      },
    ],
  };
  // useEffect(() => {
  //   const getUserId = async () => {
  //     try {
  //       const result = await AsyncStorage.getItem("userId ");
  //       if (result !== null) {
  //         setUserId(result);
  //         console.log("user id---:", result);
  //       } else {
  //         console.log("result is null", result);
  //       }
  //     } catch (err) {
  //       console.error("Error retrieving auth token:", err);
  //       setError(err);
  //     }
  //   };

  //   getUserId();
  // }, []);
  // useEffect(() => {
  //   const getAuthToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken ");
  //       if (token) {
  //         console.log("token", token);
  //         setAuthToken(token);
  //       } else {
  //         throw new Error("No auth token found");
  //       }
  //     } catch (err) {
  //       console.error("Error retrieving auth token:", err);
  //       setError(err);
  //     }
  //   };

  //   getAuthToken();
  // }, []);


    const dummyData2 = {
    AllCategories: [
      {
        id: 1,
        name: "Vehic",
        french_name: "Véhic",
      },
      {
        id: 2,
        name: "Tools ",
        french_name: "Outils ",
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storedUserId, storedUserName, storedAuthToken] =
          await Promise.all([
            AsyncStorage.getItem("userId "),
            AsyncStorage.getItem("userName"),
            AsyncStorage.getItem("authToken "),
          ]);

        if (storedUserId) setUserId(storedUserId);
        if (storedAuthToken) setAuthToken(storedAuthToken);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [language, setLanguage] = useState(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        if (storedLanguage) {
          setLanguage(storedLanguage);
          console.log("lanugage--------", storedLanguage);
          await fetchAllCinematicsCategory(authToken, storedLanguage);
          

          // await fetchAllSubCategory(authToken,storedLanguage,categoryId);
        }
      } catch (error) {
        console.error("Error fetching language:", error);
      }
    };

    fetchLanguage();
  }, [isFocused, authToken]);


  useEffect(() => {
    if (authToken && isFocused) {
      fetchAllData();
    }
  }, [authToken, isFocused, category]);

  const fetchAllData = async () => {
    try {
      // await fetchAllCinematicsCategory();
      await fetchAllSubCategory(category);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  // const fetchAllCinematicsCategory = async () => {
    const fetchAllCinematicsCategory = async (token, lang) => {
    //console.log("Categry in id", selectedItemId)
    // const token = authToken;
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


      const categories = result.AllCategories.map((category) => ({
        label:
          lang === "fr" && category.french_name
            ? category.french_name
            : category.name,
        // label: category.name,
        value: category.id.toString(),
      }));

      setData(categories);

      // await fetchAllSubCategory(token, lang, category);
      // console.log("AllCategories---", result.AllCategories);
      // setData(result.AllCategories);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  // const fetchAllSubCategory = async (category) => {

    const fetchAllSubCategory = async (category) => {

      console.log("langiuuuuuuuuuuuuuuuuuuuuuuu---------", language);
      console.log("category---------", category);

    const token = authToken;
    try {
      const response = await fetch(
        //
        base_url +
          `tvProgmax/sub_category/getAllByCategory?category_id=${category}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();


      const subcategories = result.AllCategories.map((category) => ({
        // label: category.name, // Use the "name" property as the label
        label:
        language === "fr" && category.french_name
            ? category.french_name
            : category.name,
        value: category.id.toString(), // Convert "id" to a string for the value
      }));
      const reverseData = subcategories.reverse();
      console.log("result---------", reverseData);
      setSubCate(reverseData);




      // console.log("AllSub  Categories---", result.AllCategories);
      // setSubCate(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  //////////////// upload video

  const handleUpdatePassword = async () => {
    setsnackbarVisible(true);
    setTimeout(() => {
      setsnackbarVisible(false);
      navigation.replace("Tv_Promax");
    }, 2000);
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const handleUpdatePasswordAlert = async () => {
    setsnackbarVisibleAlert(true);
    setTimeout(() => {
      setsnackbarVisibleAlert(false);
    }, 3000);
  };

  const dismissSnackbarAlert = () => {
    setsnackbarVisibleAlert(false);
  };

  const upload = async () => {
    if (imageUriVideo.uri || imageInfo.uri !== null) {
      console.log("click");

      const uri = imageUriVideo.uri || imageInfo.uri;
      const type = imageUriVideo.type || imageInfo.type;
      const name = imageUriVideo.fileName || imageInfo.fileName;
      const source = { uri, type, name };
      console.log("Video Source", source);
      handleUploadVideo(source);
    } else {
      handleUpdatePasswordAlert();
    }
  };

  const handleUploadVideo = (source) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", source);
    data.append("upload_preset", UPLOAD_PRESET); // Use your Cloudinary upload preset
    data.append("cloud_name", CLOUD_NAME); // Use your Cloudinary cloud name

    fetch(CLOUDINARY_Video_URL, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Video Url is", data);
        // setVideoUrl(data.url); // Store the Cloudinary video URL in your state
        //uploadVideo(data.url)

        handleUploadImage(data.url);
        setVideoURL(data.url);
        //uploadXpiVideo(data.url);
        console.log("url comes----", data.url);
      })
      .catch((err) => {
        //Alert.alert('Error While Uploading Video');
        console.log("Error While Uploading Video", err);
        setLoading(false);
      });
  };

  const handleUploadImage = (data1) => {
    setLoading(true);
    const uri = thumbnailImageUritwo.uri;
    const type = thumbnailImageUritwo.type;
    const name = thumbnailImageUritwo.fileName;
    const sourceImage = { uri, type, name };
    console.log("Source Image", sourceImage);
    const dataImage = new FormData();
    dataImage.append("file", sourceImage);
    dataImage.append("upload_preset", UPLOAD_PRESET); // Use your Cloudinary upload preset
    dataImage.append("cloud_name", CLOUD_NAME); // Use your Cloudinary cloud name

    fetch(CLOUDINARY_URL, {
      method: "POST",
      body: dataImage,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setImageUrl(data.url); // Store the Cloudinary video URL in your state
        //uploadVideo(data.url)
        //uploadXpiVideo(data.url);
        console.log("Image Url", data);
        setThumnailUrl(data.url);
        uploadXpiVideo(data.url, data1);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error While Uploading Video", err);
      });
  };

  const uploadXpiVideo = async (data, data1) => {
    console.log("Image Uri", data);
    console.log("Video Uri", data1);
    console.log("Profile Name", profileName);
    console.log("Description", description);
    console.log("user id", userId);
    console.log("category id", category);
    console.log("subcategory id", subcategory);
    console.log("authToken", authToken);

    const token = authToken;
    const apiUrl = base_url + "tvProgmax/create";

    const requestData = {
      category_id: category,
      sub_category_id: subcategory,
      user_id: userId,
      name: profileName,
      description: description,
      video: data1,
      thumbnail: data,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response of Videos:", data);
        setLoading(false);
        handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          "Failed to upload video:",
          response.status,
          response.statusText
        );
        // Handle the error
      }
    } catch (error) {
      console.error("API Request Error:", error);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const performAction = () => {
    setModalVisible(false);
  };

  // /////////////////////
  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };
  const handle_thumbail = () => {
    ref_RBSheetCamera.current.open();
    setShowThumbnailContent(true);
  };

  const takePhotoFromCamera = async (value) => {
    ref_RBSheetCamera.current.close();
    launchCamera(
      {
        mediaType: "photo",
        //videoQuality: 'medium',
      },
      (response) => {
        console.log("image here in Camera Upload", response);
        if (!response.didCancel && response.assets.length > 0) {
          setThumbnailImageUri(response.assets[0].uri); // Set thumbnail image URI
          setThumbnailImageUritwo(response.assets[0]);
        }
      }
    );
  };

  const choosePhotoFromLibrary = (value) => {
    ref_RBSheetCamera.current.close();
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      console.log("image here in Camera Upload", response);
      if (!response.didCancel && response.assets.length > 0) {
        setThumbnailImageUri(response.assets[0].uri);
        setThumbnailImageUritwo(response.assets[0]); // Set thumbnail image URI
      }
    });
  };
  const handleVideoPress = () => {
    const videoUri = imageUriVideo?.uri || imageInfo?.uri;
    navigation.navigate("VideoPlayerScreen", { videoUri });
  };
  const takeVideoFromCamera = async () => {
    ref_RBSheetCamera1.current.close();

    launchCamera(
      {
        mediaType: "video",
      },
      (response) => {
        console.log("video here in camera upload", response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
            setImageInfo(response.assets[0]);
            setimageUri(response.assets[0]);
          }
        }
      }
    );
  };

  const chooseVideoFromLibrary = () => {
    ref_RBSheetCamera1.current.close();

    launchImageLibrary({ mediaType: "video" }, (response) => {
      console.log("video here camera upload", response);
      if (!response.didCancel && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]);
        setimageUri(response.assets[0]);
      }
    });
  };
  const handle_changeCOntent = () => {
    ref_RBSheetCamera1.current.open();
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior="height" // You can use ‘height’ as well, depending on your preference
      enabled
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <IonIcons name={"chevron-back"} color={"#282828"} size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t('UploadContent')}</Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              marginTop: hp(5),
              height: hp(30),
              borderWidth: 1,
              color: "#E8E8E8",
              borderRadius: wp(8),
              marginHorizontal: wp(6),
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              overflow: "hidden",
              width: wp(40), // Adjust the width to fit the content
            }}
          >
            <ImageBackground
              source={{ uri: imageUriVideo?.uri || imageInfo?.uri }}
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 10,
                  left: 8,
                  height: hp(3),
                  width: wp(18),
                  borderRadius: wp(3),
                  backgroundColor: "#FACA4E",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={handle_changeCOntent}>
                  <Text
                    style={{
                      fontSize: hp(1),
                      fontFamily: "Inter",
                      color: "#232323",
                      fontWeight: "700",
                    }}
                  >
                    {t('ChangeContent')}
                    
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableWithoutFeedback onPress={() => handleVideoPress()}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Ionicons name="play" size={30} color="white" />
                </View>
              </TouchableWithoutFeedback>
            </ImageBackground>
          </View>
          <TouchableOpacity onPress={handle_thumbail}>
            <View
              style={{
                marginTop: hp(5),
                height: hp(30),
                borderWidth: 1,
                color: "#E8E8E8",
                borderRadius: wp(8),
                // marginHorizontal: wp(23),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                overflow: "hidden",
                width: wp(40), // Adjust the width to fit the content
              }}
            >
              {thumbnailImageUri ? (
                <>
                  <ImageBackground
                    source={{ uri: thumbnailImageUri }}
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 50,
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 8,
                        height: hp(3),
                        width: wp(18),
                        borderRadius: wp(3),
                        backgroundColor: "#FACA4E",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: hp(1),
                          fontFamily: "Inter",
                          color: "#232323",
                          fontWeight: "700",
                        }}
                      >
                        {t('ChangeContent')}
                        {/* Change Content */}
                      </Text>
                    </View>
                  </ImageBackground>
                </>
              ) : (
                <>
                  <Image
                    source={require("../../../assets/images/thub.png")}
                    style={{ width: 20, height: 30 }}
                  />
                  <Text
                    style={{
                      fontSize: hp(1),
                      fontFamily: "Inter",
                      color: "#232323",
                      fontWeight: "700",
                    }}
                  >
                    {t('Uploadthumbnail')}
                    
                  </Text>
                </>
              )}
            </View>
            <View>
              {thumbnailError ? (
                <Text style={styles.errorText}>{thumbnailError}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>

        <TextInput
          mode="outlined"
          label={t('MyVideo')}
          value={profileName}
          onChangeText={(text) => setProfileName(text)}
          style={styles.ti}
          outlineColor="#E7EAF2"
          placeholderTextColor={"#646464"}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          theme={{
            roundness: 13, // This sets the border radius
            colors: {
              placeholder: "#646464", // Set the color of the placeholder
              text: "black", // Set the text color
              primary: "#FACA4E", // Set the primary color
              underlineColor: "transparent", // Set the underline color
              background: "white", // Set the background color
            },
          }}
        />
        <View style={{ marginLeft: 27 }}>
          {profileNameError ? (
            <Text style={styles.errorText}>{profileNameError}</Text>
          ) : null}
        </View>

        <View style={{ marginHorizontal: wp(7) }}>
          <Dropdown
            style={
              isFocus
                ? styles.textInputSelectedCategory
                : styles.textInputCategoryNonSelected
            }
            containerStyle={{
              marginTop: 3,
              alignSelf: "center",
              borderRadius: wp(3),
              width: "100%",
            }}
            // dropdownPosition="top"
            // mode="modal"
            placeholderStyle={{
              color: "#121420",
              //   fontWeight: '400',
              fontFamily: "Inter",
              fontSize: hp(1.8),
            }}
            iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
            itemTextStyle={{ color: "#000000" }}
            selectedTextStyle={{ fontSize: 16, color: "#000000" }}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            value={category}
            data={data}
            search={false}
            maxHeight={200}
            // labelField="name"
            // valueField="id"
               labelField="label"
            valueField="value"
            placeholder={t('SelectCategory')}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              console.log("kon main category id hai----", item.value);
              setCategory(item.value);
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "#FACA4E" : "#C4C4C4"}
                name="down"
                size={15}
              />
            )}
          />
          {categoryError ? (
            <Text style={styles.errorText}>{categoryError}</Text>
          ) : null}
        </View>

        <View style={{ marginHorizontal: wp(7) }}>
          <Dropdown
            style={
              isFocus
                ? styles.textInputSelectedCategory
                : styles.textInputCategoryNonSelected
            }
            containerStyle={{
              marginTop: 3,
              alignSelf: "center",
              borderRadius: wp(3),
              width: "100%",
            }}
            // dropdownPosition="top"
            // mode="modal"
            placeholderStyle={{
              color: "#121420",
              //   fontWeight: '400',
              fontFamily: "Inter",
              fontSize: hp(1.8),
            }}
            iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
            itemTextStyle={{ color: "#000000" }}
            selectedTextStyle={{
              fontSize: 16,
              color: "#000000",
              height: 42,
              textAlignVertical: "center",
            }}
            value={subcategory}
            data={subCate}
            search={false}
            maxHeight={200}
            // labelField="name"
            // valueField="id"
                 labelField="label"
            valueField="value"
            placeholder={t('SelectSubCategory')}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              console.log("kon sub category id hai----", item.value);
              setSubCategory(item.value);
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "#FACA4E" : "#C4C4C4"}
                name="down"
                size={15}
              />
            )}
          />
          <View>
            {subcategoryError ? (
              <Text style={styles.errorText}>{subcategoryError}</Text>
            ) : null}
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(2),
          }}
        >
          <CPaperInput
            multiline={true}
            placeholder={t('Description')}
            placeholderTextColor="#121420"
            value={description}
            onChangeText={(text) => setDescription(text)}
            height={hp(20)}
          />
        </View>
        <View style={{ marginLeft: hp(4), marginTop: -10, marginBottom: 15 }}>
          {descriptionError ? (
            <Text style={styles.errorText}>{descriptionError}</Text>
          ) : null}
        </View>
        <View style={styles.loaderButtonView}>
          <View style={styles.loaderButtonInner}>
            <CustomLoaderButton
              title={t('Upload')}
              load={loading}
              customClick={() => {
                let hasError = false;

                if (!thumbnailImageUritwo) {
                  setthumbnailImageUritwoError(t('Thumbnailisrequired'));
                  hasError = true;
                } else {
                  setthumbnailImageUritwoError("");
                }

                if (!profileName) {
                  setProfileNameError(t('Videotitleisrequired'));
                  hasError = true;
                } else {
                  setProfileNameError("");
                }

                if (!category) {
                  setCategoryError(t('Categoryisrequired'));
                  hasError = true;
                } else {
                  setCategoryError("");
                }

                if (!subcategory) {
                  setSubcategoryError(t('Subcategoryisrequired'));
                  hasError = true;
                } else {
                  setSubcategoryError("");
                }

                if (!description) {
                  setDescriptionError(t('Descriptionisrequired'));
                  hasError = true;
                } else {
                  setDescriptionError("");
                }

                if (!hasError) {
                  if (!loading) {
                    setLoading(true);
                    upload();
                  }
                }
              }}
            />
          </View>
        </View>
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
              {t('Selectanoption')}
              
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
              justifyContent: "space-between", // Adjust to space-between to separate the two options
            }}
          >
            <TouchableOpacity
              onPress={() => takePhotoFromCamera("Camera")}
              // onPress={goto_camera}
              style={{
                alignItems: "center",
                justifyContent: "center", // Center the icon and text vertically
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
                {t('Takeaphoto')}
                {/* Take a photo */}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => choosePhotoFromLibrary("gallery")}
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
                {t('Chooseaphoto')}
                {/* Choose a photo */}
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>

        <RBSheet
          ref={ref_RBSheetCamera1}
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
              {t('Selectanoption')}
              {/* Select an option */}
            </Text>
            <TouchableOpacity
              onPress={() => ref_RBSheetCamera1.current.close()}
            >
              <Ionicons
                name="close"
                size={23}
                color={"#303030"}
                onPress={() => ref_RBSheetCamera1.current.close()}
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
                {t('TakeaVideo')}
                {/* Take a Video */}
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
                {t('ChooseaVideo')}
                {/* Choose a Video */}
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </ScrollView>

      <CustomSnackbar
        message={t('Alert!')}
        messageDescription={t('KindlyFillAllFields')}
        onDismiss={dismissSnackbarAlert} // Make sure this function is defined
        visible={snackbarVisibleAlert}
      />
      <CustomDialog
        visible={modalVisible}
        onClose={closeModal}
        onAction={performAction}
        imageURL="URL_TO_YOUR_IMAGE"
      />

      <CustomSnackbar
        message={t('Success')}
        messageDescription={t('ContentUploadedSuccessfully')}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    height: hp(6.2),
    marginTop: hp(10),
    alignItems: "center",
    marginHorizontal: wp(8),
  },
  headerText: {
    fontSize: hp(2.3),
    alignSelf: "center",
    marginLeft: wp(23),
    color: "#333333",
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  ti: {
    marginHorizontal: "7%",
    marginTop: "5%",
    width: '84%',
    backgroundColor: "white",
    fontSize: wp(4),
    paddingLeft: "1%",
    borderRadius: 12,
  },
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: "98%",
    borderColor: "#FACA4E",

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    // marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: "98%",
    borderColor: "#E7EAF2",
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    // marginBottom: 20,
    marginTop: hp(3),
  },
  iconStyle: {
    color: "#C4C4C4",
    width: 20,
    height: 20,
  },
  iconStyleInactive: {
    color: "#FACA4E",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  loaderButtonView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderButtonInner: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
