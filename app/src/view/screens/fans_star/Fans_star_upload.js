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

import { Button, Divider, TextInput } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

import Back from "../../../assets/svg/back.svg";
import { appImages } from "../../../assets/utilities/index";
import Slider from "@react-native-community/slider";
import VolumeUp from "../../../assets/svg/VolumeUp.svg";
import Like from "../../../assets/svg/Like.svg";
import UnLike from "../../../assets/svg/Unlike.svg";
import Comment from "../../../assets/svg/Comment.svg";
import Send from "../../../assets/svg/Send.svg";
import Download from "../../../assets/svg/Download.svg";
import CustomButton from "../../../assets/Custom/Custom_Button";
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

import Fontiso from "react-native-vector-icons/Fontisto";

import IonIcons from "react-native-vector-icons/Ionicons";

import { SelectCountry, Dropdown } from "react-native-element-dropdown";
import CPaperInput from "../../../assets/Custom/CPaperInput";
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import Camera from "../../../assets/svg/Camera.svg";
import Gallery from "../../../assets/svg/Gallery.svg";

const Category = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
];
import { useRoute } from "@react-navigation/native";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
import CustomDialog from "../../../assets/Custom/CustomDialog";
import CustomLoaderButton from "../../../assets/Custom/CustomLoaderButton";
import { CLOUD_NAME, CLOUDINARY_URL, CLOUDINARY_Video_URL, UPLOAD_PRESET } from "../../../../../cloudinaryConfig";

export default function Fans_star_upload({ navigation }) {
  const route = useRoute();
  const ref_RBSheetCamera = useRef(null);
  const ref_RBSheetCamera1 = useRef(null);
  const imageUri = route.params?.imageUri;
  // console.log("from cinamtic---- ", imageUri);
  const [showThumbnailContent, setShowThumbnailContent] = useState(false);
  const [thumbnailImageUri, setThumbnailImageUri] = useState(null);
  const [thumbnailImageUritwo, setThumbnailImageUritwo] = useState(null);

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

  useEffect(() => {
    const getUserId = async () => {
      try {
        const result = await AsyncStorage.getItem("userId ");
        if (result !== null) {
          setUserId(result);
          console.log("user id---:", result);
        } else {
          console.log("result is null", result);
        }
      } catch (err) {
        console.error("Error retrieving auth token:", err);
        setError(err);
      }
    };

    getUserId();
  }, []);
  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken ");
        if (token) {
          console.log("token", token);
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
      fetchAllData();
    }
  }, [authToken, isFocused, category]);

  const fetchAllData = async () => {
    try {
      await fetchAllCinematicsCategory();
      await fetchAllSubCategory(category);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const fetchAllCinematicsCategory = async () => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;
    try {
      const response = await fetch(
        // base_url + "cinematics/category/getAll?page=1&limit=1000",
        base_url + "fanStar/category/getAll?page=1&limit=1000",
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
  console.log("Categry above function----", category);
  const fetchAllSubCategory = async (category) => {
    console.log("Categry in id--", category);
    const token = authToken;
    try {
      const response = await fetch(
        // /fanStar/sub_category/getAll?page=1&limit=5
        // /fanStar/sub_category/getAllByCategory?category_id=3
        // base_url + `cinematics/sub_category/getAllByCategory?category_id=${category}`,
        base_url +
          `fanStar/sub_category/getAllByCategory?category_id=${category}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      // console.log("AllSub  Categories---", result.AllCategories);
      setSubCate(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };

  //////////////// upload video

  const handleUpdatePassword = async () => {
    setsnackbarVisible(true);
    setTimeout(() => {
      setsnackbarVisible(false);
      navigation.replace("Fans_star");
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
    if (imageUri.uri || imageInfo.uri !== null) {
      console.log("click");

      const uri = imageUri.uri || imageInfo.uri;
      const type = imageUri.type || imageInfo.type;
      const name = imageUri.fileName || imageInfo.fileName;
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
    // const apiUrl = base_url + 'cinematics/create';
    const apiUrl = base_url + "fanStar/create";

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

      // Handle the error
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const performAction = () => {
    setModalVisible(false);
  };
  // const handle_bar = async () => {
  //   console.log("press");
  //   if (imageUri !== null) {
  //     const { uri, type, fileName } = imageUri;
  //     const source = { uri, type, name: fileName };
  //     console.log("Source in handle_bar", source);
  //     handleUploadVideo(source);
  //   } else {
  //     setSnackbarVisible(true);
  //     setTimeout(() => {
  //       setSnackbarVisible(false);
  //     }, 3000);
  //   }
  // };

  // const handleUploadVideo = async (source) => {
  //   const dataImage = new FormData();
  //   dataImage.append("file", {
  //     uri: source.uri,
  //     type: source.type,
  //     name: source.fileName,
  //   });
  //   dataImage.append("upload_preset", "ml_default"); // Use your Cloudinary upload preset
  //   dataImage.append('cloud_name', 'dzaawjnl1');
  //   try {
  //     const response = await fetch(
  //       "https://api.cloudinary.com/v1_1/dzaawjnl1/video/upload",
  //       {
  //         method: "POST",
  //         body: dataImage,
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     const result = await response.json();

  //     if (response.ok) {
  //       // setVideoUrl(result.secure_url); // Store the Cloudinary video URL in your state
  //       uploadVideo(result.secure_url); // Pass the URL to the next function
  //       console.log("Video uploaded to Cloudinary:", result);
  //     } else {
  //       console.error("Cloudinary upload failed:", result);
  //       Alert.alert(
  //         "Error While Uploading Video to Cloudinary",
  //         result.error?.message || "Unknown error"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error during Cloudinary upload:", error);
  //     Alert.alert("Error While Uploading Video", error.message);
  //   }
  // };

  // const uploadVideo = async (videoUrl) => {
  //   const token = authToken;
  //   const apiUrl = `${base_url}cinematics/create`;

  //   try {
  //     const formData = new FormData();
  //     formData.append("name", profileName);
  //     formData.append("description", description);
  //     formData.append("category", category);
  //     formData.append("subcategory", subcategory);
  //     formData.append("video", videoUrl); // Use the Cloudinary video URL
  //     formData.append("user_id", userId);

  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Use the provided token
  //         "Content-Type": "multipart/form-data", // Set the content type to FormData
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log("Response", responseData);
  //       console.log("Video uploaded successfully");
  //       handleUpdatePassword();
  //     } else {
  //       const responseData = await response.json();
  //       console.error(
  //         "Failed to upload video:",
  //         response.status,
  //         response.statusText,
  //         responseData
  //       );
  //       Alert.alert(
  //         "Failed to upload video to API",
  //         responseData.message || "Unknown error"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error during API upload:", error);
  //     Alert.alert("Error While Uploading Video to API", error.message);
  //   }
  // };

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
  // const handle_bar = () => {
  //   setSnackbarVisible(true);
  //   navigation.navigate("Cinematics");
  // };
  // const dismissSnackbar = () => {
  //   setSnackbarVisible(false);
  // };
  const handleVideoPress = () => {
    // const videoUri = imageUri;
    const videoUri = imageUri?.uri || imageInfo?.uri;
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

            // console.log("response", response.assets[0].uri);
            // navigation.navigate("CameraUpload", {
            //   imageUri: response.assets[0].uri,
            // });
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
        // navigation.navigate("CameraUpload", {
        //   imageUri: response.assets[0].uri,
        // });
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
            // navigation.navigate("Fans_star");
            navigation.goBack();
          }}
        >
          <IonIcons name={"chevron-back"} color={"#282828"} size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Upload Content</Text>
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
              source={{ uri: imageUri.uri }}
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
                    Change Content
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
                        Change Content
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
                    Upload thumbnail
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

        {/* <TextInput
          mode="outlined"
          label="My Video"
          onChangeText={(text) => setProfileName(text)}
          style={styles.ti}
          outlineColor="#0000001F"
          placeholderTextColor={"#646464"}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        /> */}
        <TextInput
          mode="outlined"
          label="My Video"
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
        <View style={{ marginLeft: 25 }}>
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
            labelField="name"
            valueField="id"
            placeholder={"Select Category"}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              console.log("kon main category id hai----", item.id);
              setCategory(item.id);
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
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            value={subcategory}
            data={subCate}
            search={false}
            maxHeight={200}
            labelField="name"
            valueField="id"
            placeholder={"Select Sub Category"}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              console.log("kon sub category id hai----", item.id);
              setSubCategory(item.id);
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
          {subcategoryError ? (
            <Text style={styles.errorText}>{subcategoryError}</Text>
          ) : null}
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
            placeholder={"Description"}
            placeholderTextColor="#121420"
            value={description}
            onChangeText={(text) => setDescription(text)}
            height={hp(20)}
          />
        </View>
        <View style={{ marginLeft: hp(4), marginTop: -8, marginBottom: 15 }}>
          {descriptionError ? (
            <Text style={styles.errorText}>{descriptionError}</Text>
          ) : null}
        </View>

        {/* <View
          style={{
            marginTop: hp(5),
            marginBottom: hp(5),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButton
            title={"Upload"}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            // customClick={handle_bar}
            customClick={() => {
              let hasError = false;
              if (!thumbnailImageUritwo) {
                setthumbnailImageUritwoError("Thumbnail is required");
                hasError = true;
              } else {
                setthumbnailImageUritwoError("");
              }
              if (!profileName) {
                setProfileNameError("Video title is required");
                hasError = true;
              } else {
                setProfileNameError("");
              }   
              if (!category) {
                setCategoryError("Category is required");
                hasError = true;
              } else {
                setCategoryError("");
              }
          
              if (!subcategory) {
                setSubcategoryError("Subcategory is required");
                hasError = true;
              } else {
                setSubcategoryError("");
              }
          
              if (!description) {
                setDescriptionError("Description is required");
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

              // if (category == "" || (subcategory == "" && description == "")) {
              //   console.log("no data");
              //   Alert.alert("Please select the value");
              // } else {
              //   if(loading === true){               
              //   }
              //   else{
              //     upload();
              //   }
              // }
              //handleUpdatePassword();
              //navigation.navigate('Profile_image');
            }}
          />
        </View> */}
        <View style={styles.loaderButtonView}>
          <View style={styles.loaderButtonInner}>
            <CustomLoaderButton
              title={"Upload"}
              load={loading}
              customClick={() => {
                let hasError = false;

                if (!thumbnailImageUritwo) {
                  setthumbnailImageUritwoError("Thumbnail is required");
                  hasError = true;
                } else {
                  setthumbnailImageUritwoError("");
                }

                if (!profileName) {
                  setProfileNameError("Video title is required");
                  hasError = true;
                } else {
                  setProfileNameError("");
                }

                if (!category) {
                  setCategoryError("Category is required");
                  hasError = true;
                } else {
                  setCategoryError("");
                }

                if (!subcategory) {
                  setSubcategoryError("Subcategory is required");
                  hasError = true;
                } else {
                  setSubcategoryError("");
                }

                if (!description) {
                  setDescriptionError("Description is required");
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

        {/* ////////// */}
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
              justifyContent: "space-between", // Adjust to space-between to separate the two options
              //borderWidth: 3,
              //justifyContent: "space-around",
              //marginTop: hp(1),
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
                Take a photo
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
                Choose a photo
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>

        {/* <View
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
          {loading && <ActivityIndicator size="large" color="#FACA4E" />}
        </View> */}

        {/* <CustomSnackbar
          message={"Success"}
          messageDescription={"News Posted Successfully"}
          onDismiss={dismissSnackbar} // Make sure this function is defined
          visible={snackbarVisible}
        /> */}

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
              Select an option
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
      </ScrollView>

      <CustomSnackbar
        message={"Alert!"}
        messageDescription={"Kindly Fill All Fields"}
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
        message={"Success"}
        messageDescription={"Content Uploaded Successfully"}
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
    paddingLeft: "2%",
    borderRadius: 10,
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
