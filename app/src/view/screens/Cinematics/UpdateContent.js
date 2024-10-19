import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { SelectCountry, Dropdown } from "react-native-element-dropdown";
import { appImages } from "../../../assets/utilities/index";
import { Button, Divider, TextInput } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomButton from "../../../assets/Custom/Custom_Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CPaperInput from "../../../assets/Custom/CPaperInput";
import { useTranslation } from "react-i18next";
import CustomDialog from "../../../assets/Custom/CustomDialog";
import { base_url } from "../../../../../baseUrl";
import {
  CLOUD_NAME,
  CLOUDINARY_URL,
  CLOUDINARY_Video_URL,
  UPLOAD_PRESET,
} from "../../../../../cloudinaryConfig";

export default function UpdateContent({ navigation, route }) {
  const { t } = useTranslation();
  const { apiEndpoint, categoryapiEndpoint, subcategoryapiEndpoint } = route.params;
  const { Video } = route.params;
  const [selectedItem, setSelectedItem] = useState("");

  const [selectedItemThumbnial, setSelectedItemThumbnial] = useState("");

  const [profileName, setProfileName] = useState("");

  const [loading, setLoading] = useState(false);

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [dataFetched, isDataFetched] = useState(false);

  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [categoryId, setCategoryId] = useState("");

  const [userId, setUserId] = useState("");

  const [authToken, setAuthToken] = useState("");

  const [categoryType, setCategoryType] = useState(null);

  const [description, setDescription] = useState("");

  const [imageUri, setImageUri] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);

  const [thumbnailImageUri, setThumbnailImageUri] = useState(null);

  const [videoUrl, setVideoUrl] = useState(null);

  const [imageInfo, setImageInfo] = useState(null);

  const [imageInfoThumbnail, setImageInfoThumbnail] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const ref_RBSheetCamera = useRef(null);

  const ref_RBSheetThumbnail = useRef(null);
  const isFocused = useIsFocused();
  const receivedData = route.params?.Video;
  const [categoriesSelect, setCategorySelect] = useState([]);
  const [subCate, setSubCate] = useState([]);
  const [subcategory, setSubCategory] = useState("");
  console.log("categoryapiEndpointt-------", categoryapiEndpoint);
  console.log("receivedData------subcategoryapiEndpoint-------", subcategoryapiEndpoint);
  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  const performAction = () => {
    setModalVisible(false);
  };

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    await getUserID();

    setLoading(false);
  };

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem("userId ");
      if (result !== null) {
        setUserId(result);
      } else {
        console.log("result is null", result);
      }

      const result1 = await AsyncStorage.getItem("authToken ");
      if (result1 !== null) {
        setAuthToken(result1);

        //await fetchCategory(result1);
      } else {
        console.log("result is null", result);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  useEffect(() => {
    // Make the API request and update the 'data' state
    const fetchCategory = async () => {
      setProfileName(receivedData?.name);
      setDescription(receivedData?.description);
      setImageInfo({ uri: receivedData?.thumbnail });
      setThumbnailImageUri(receivedData?.thumbnail);

      // Mapping category and subcategory to label and value format
      const formattedCategory = {
        label:
          language === "fr" && receivedData?.category_french_name
            ? receivedData?.category_french_name
            : receivedData?.category_name,
        value: receivedData?.category_id?.toString(),
      };

      const formattedSubCategory = {
        label:
          language === "fr" && receivedData?.sub_category_french_name
            ? receivedData?.sub_category_french_name
            : receivedData?.sub_category_name,
        value: receivedData?.sub_category_id?.toString(),
      };

      setCategoryId(formattedCategory.value); // set the category in label-value format
      setSubCategory(formattedSubCategory.value);

      isDataFetched(true);
    };

    fetchCategory();
  }, [receivedData]);

  console.log("categoryId", categoryId);
  console.log("sub iddddd", subcategory);

  const [language, setLanguage] = useState(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        if (storedLanguage) {
          setLanguage(storedLanguage);
          console.log("lanugage--------", storedLanguage);
          await fetchCategoryPic(authToken, storedLanguage);
          // await fetchAllSubCategory(authToken,storedLanguage,categoryId);
        }
      } catch (error) {
        console.error("Error fetching language:", error);
      }
    };

    fetchLanguage();
  }, [isFocused, authToken]);

  // const fetchCategoryPic = async userToken => {
  //   const token = userToken;
  const fetchCategoryPic = async (token, lang) => {
    try {
      const response = await fetch(  
        base_url + `${categoryapiEndpoint}?page=1&limit=10000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const categories = data.AllCategories.map((category) => ({
          // label: category.name,
          label:
            lang === "fr" && category.french_name
              ? category.french_name
              : category.name,
          value: category.id.toString(), // Convert "id" to a string for the value
        }));
        setCategorySelect(categories);

        console.log('categooooooooooooooooooooo', data.AllCategories)
        // setCategorySelect(data.AllCategories);

        // console.log('Data Categories', categoriesSelect);
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

  useEffect(() => {
    if (authToken && categoryId) {
      fetchAllSubCategory(categoryId);
    }
  }, [authToken, categoryId]);

  const fetchAllSubCategory = async (categoryId) => {
    try {
      const response = await fetch(
        base_url + `${subcategoryapiEndpoint}${categoryId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
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
        setSubCate(reverseData);

        // setSubCate(result.AllCategories);
      } else {
        console.error(
          "Failed to fetch subcategories:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const upload = async (category) => {
    if (
      imageInfo !== null &&
      profileName !== "" &&
      description !== "" &&
      imageInfoThumbnail !== null
    ) {
      const uri = imageUri.uri || imageInfo.uri;
      const type = imageUri.type || imageInfo.type;
      const name = imageUri.fileName || imageInfo.fileName;
      const source = { uri, type, name };
      console.log("Video Source", source);
      handleUploadVideo(source, category);

      //uploadVideoCloudinary(imageInfo.uri)
    } else {
      setModalVisible(true);
    }
  };

  const handleUploadVideo = (video, category) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", video);
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
        setVideoUrl(data.url); // Store the Cloudinary video URL in your state
        handleUploadImage(data.url, category);
        //uploadXpiVideo(data.url);
        console.log(data);
      })
      .catch((err) => {
        //Alert.alert('Error While Uploading Video');
        console.log("Error While Uploading Video", err);
        setLoading(false);
      });
  };

  const handleUploadImage = (data1, category) => {
    setLoading(true);
    const uri = imageInfoThumbnail.uri;
    const type = imageInfoThumbnail.type;
    const name = imageInfoThumbnail.fileName;
    const sourceImage = { uri, type, name };
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
        setImageUrl(data.url); // Store the Cloudinary video URL in your state
        uploadXpiVideo(data.url, data1, category);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error While Uploading Video", err);
      });
  };

  const uploadXpiVideo = async (data, data1, category) => {
    const token = authToken;
    //   const apiUrl = base_url + 'xpi/updateXpiVideo';
    const apiUrl = base_url + `${apiEndpoint}`;

    const requestData = {
      // id: receivedData?.video_id,
      id: receivedData?.video_id,
      category_id: receivedData?.category_id,
      sub_category_id: receivedData?.sub_category_id,
      user_id: receivedData?.user_id,
      name: profileName,
      description: description,
      video: data1,
      thumbnail: data,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          "Failed to upload video uploadXpiVideo:",
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

  const uploadXpiVideoWithVideoChange = async (dataVideo, category) => {
    const token = authToken;
    //   const apiUrl = base_url + 'xpi/updateXpiVideo';
    const apiUrl = base_url + `${apiEndpoint}`;

    const requestData = {
      id: receivedData?.video_id,
      category_id: receivedData?.category_id,
      sub_category_id: receivedData?.sub_category_id,
      user_id: receivedData?.user_id,
      name: profileName,
      description: description,
      video: data1,
      thumbnail: data,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          "Failed to upload video uploadXpiVideoWithVideoChange:",
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

  const uploadXpiVideoWithThumbnailChange = async (
    dataVideo,
    dataThumbnail
  ) => {
    const token = authToken;
    //   const apiUrl = base_url + 'xpi/updateXpiVideo';
    const apiUrl = base_url + `${apiEndpoint}`;

    const requestData = {
      id: receivedData?.video_id,
      category_id: receivedData?.category_id,
      sub_category_id: receivedData?.sub_category_id,
      user_id: receivedData?.user_id,
      name: profileName,
      description: description,
      video: data1,
      thumbnail: data,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();

        setLoading(false);
        handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          "Failed to upload video uploadXpiVideoWithThumbnailChange:",
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

  const uploadXpiVideoWithOutAnyVideoChange = async () => {
    const token = authToken;
    //   const apiUrl = base_url + 'xpi/updateXpiVideo';
    const apiUrl = base_url + `${apiEndpoint}`;

    const requestData = {
      id: receivedData?.video_id,
      category_id: receivedData?.category_id,
      sub_category_id: receivedData?.sub_category_id,
      user_id: receivedData?.user_id,
      name: profileName,
      description: description,
      video: data1,
      thumbnail: data,
      // id: receivedData?.video_id,
      // user_id: userId,
      // name: profileName,
      // description: description,
      // video_category: receivedData?.video_category,
      // video: receivedData?.video,
      // thumbnail: receivedData?.thumbnail,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();

        setLoading(false);
        handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          "Failed to upload video uploadXpiVideoWithOutAnyVideoChange:",
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

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  const takePhotoFromCamera = async (value) => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: "video",
        videoQuality: "medium",
      },
      (response) => {
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);

            setImageInfo(response.assets[0]);
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setImageUri(response.uri);
          }
        }
        ref_RBSheetCamera.current.close();
      }
    );
  };

  const choosePhotoFromLibrary = (value) => {
    setSelectedItem(value);
    launchImageLibrary({ mediaType: "video" }, (response) => {
      if (!response.didCancel && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]);
      }

      ref_RBSheetCamera.current.close();
    });
  };

  const takePhotoFromCameraThumbnail = async (value) => {
    setSelectedItemThumbnial(value);
    launchCamera(
      {
        mediaType: "photo",
        videoQuality: "medium",
      },
      (response) => {
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setThumbnailImageUri(response.assets[0].uri);

            setImageInfoThumbnail(response.assets[0]);
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setThumbnailImageUri(response.uri);
          }
        }
        ref_RBSheetThumbnail.current.close();
      }
    );
  };

  const choosePhotoFromLibraryThumbnail = (value) => {
    setSelectedItemThumbnial(value);
    launchImageLibrary({ mediaType: "Photo" }, (response) => {
      if (!response.didCancel && response.assets.length > 0) {
        setThumbnailImageUri(response.assets[0].uri);
        setImageInfoThumbnail(response.assets[0]);
      }

      ref_RBSheetThumbnail.current.close();
    });
  };

  const handleUpdatePassword = async () => {
    setsnackbarVisible(true);

    setTimeout(() => {
      setsnackbarVisible(false);
      //handleUpload()
      navigation.navigate("ViewProfile");
    }, 3000);
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const checkUpdate = async () => {
    const cloudinaryUrl = "http://res.cloudinary.com";
    console.log("Data Fetched", isDataFetched);
    if (
      isDataFetched && // Check if data has been fetched
      imageInfo &&
      imageInfo.uri &&
      imageInfo.uri.startsWith(cloudinaryUrl) &&
      thumbnailImageUri &&
      thumbnailImageUri.startsWith(cloudinaryUrl)
    ) {
      uploadXpiVideoWithOutAnyVideoChange();
    } else if (
      imageInfo &&
      imageInfo.uri &&
      imageInfo.uri.startsWith(cloudinaryUrl)
    ) {
      handleUploadImageC(receivedData?.video);
    } else if (
      thumbnailImageUri &&
      thumbnailImageUri.startsWith(cloudinaryUrl)
    ) {
      convertDurationAndStore();
    } else {
      convertDurationAndStoreWithVideoAndThumnailChange();
    }
  };

  // check video length
  const convertDurationAndStore = () => {
    if (imageInfo && imageInfo.duration) {
      const durationInSeconds = imageInfo.duration;
      const durationInMinutes = Math.ceil(durationInSeconds / 60);

      let category;

      if (durationInMinutes >= 0 && durationInMinutes <= 3.14) {
        category = 16;
      } else if (durationInMinutes > 3.14 && durationInMinutes <= 36) {
        category = 17;
      } else if (durationInMinutes > 36 && durationInMinutes <= 63) {
        category = 18;
      } else if (durationInMinutes > 63 && durationInMinutes <= 90) {
        category = 19;
      } else if (durationInMinutes > 90 && durationInMinutes <= 126) {
        category = 20;
      }

      // Update the state with the calculated category
      setCategoryType(category);

      const uri = imageInfo.uri;
      const type = imageInfo.type;
      const name = imageInfo.fileName;
      const source = { uri, type, name };

      handleUploadVideoC(category, source);
    }
  };

  const convertDurationAndStoreWithVideoAndThumnailChange = () => {
    if (imageInfo && imageInfo.duration) {
      const durationInSeconds = imageInfo.duration;
      const durationInMinutes = Math.ceil(durationInSeconds / 60);

      let category;

      if (durationInMinutes >= 0 && durationInMinutes <= 3.14) {
        category = 16;
      } else if (durationInMinutes > 3.14 && durationInMinutes <= 36) {
        category = 17;
      } else if (durationInMinutes > 36 && durationInMinutes <= 63) {
        category = 18;
      } else if (durationInMinutes > 63 && durationInMinutes <= 90) {
        category = 19;
      } else if (durationInMinutes > 90 && durationInMinutes <= 126) {
        category = 20;
      }

      // Update the state with the calculated category
      setCategoryType(category);

      upload(category);
    }
  };

  // handle check update of video using cloudinary

  const handleUploadVideoC = (category, video) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "ml_default"); // Use your Cloudinary upload preset
    data.append("cloud_name", "dzaawjnl1"); // Use your Cloudinary cloud name

    fetch("https://api.cloudinary.com/v1_1/dzaawjnl1/video/upload", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVideoUrl(data.url); // Store the Cloudinary video URL in your state
        //uploadVideo(data.url)
        uploadXpiVideoWithVideoChange(data.url, category);
        //uploadXpiVideo(data.url);
        console.log(data);
      })
      .catch((err) => {
        //Alert.alert('Error While Uploading Video');
        console.log("Error While Uploading Video", err);
        setLoading(false);
      });
  };

  //------------------------------------------\\

  // handle check update of image using cloudinary

  const handleUploadImageC = (data1) => {
    setLoading(true);
    const uri = imageInfoThumbnail.uri;
    const type = imageInfoThumbnail.type;
    const name = imageInfoThumbnail.fileName;
    const sourceImage = { uri, type, name };

    const dataImage = new FormData();
    dataImage.append("file", sourceImage);
    dataImage.append("upload_preset", "ml_default"); // Use your Cloudinary upload preset
    dataImage.append("cloud_name", "dzaawjnl1"); // Use your Cloudinary cloud name

    fetch("https://api.cloudinary.com/v1_1/dzaawjnl1/image/upload", {
      method: "POST",
      body: dataImage,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.url); // Store the Cloudinary video URL in your state
        //uploadVideo(data.url)
        //uploadXpiVideo(data.url);
        uploadXpiVideoWithThumbnailChange(data1, data.url);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error While Uploading Video", err);
      });
  };

  //---------------------------------------------\\
  const [isCategoryActive, setIsCategoryActive] = useState(false); // Track if category dropdown is active
  const [isSubCategoryActive, setIsSubCategoryActive] = useState(false);
  const handleCategoryFocus = () => {
    setIsCategoryActive(true);
    setIsSubCategoryActive(false); // Make the sub-category dropdown inactive
  };

  const handleCategoryBlur = () => {
    setIsCategoryActive(false);
  };

  const handleSubCategoryFocus = () => {
    setIsSubCategoryActive(true);
    setIsCategoryActive(false); // Make the category dropdown inactive
  };

  const handleSubCategoryBlur = () => {
    setIsSubCategoryActive(false);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior="height" // You can use ‘height’ as well, depending on your preference
      enabled
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons name={"chevron-back"} color={"#282828"} size={25} />
        </TouchableOpacity>

        <Text style={styles.headerText}>{t("UpdateVideo")}</Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View
          style={{
            height: hp(30),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginHorizontal: wp(8),
          }}
        >
          <View
            style={{
              height: hp(20),
              width: wp(39),
              borderRadius: wp(8),
              marginHorizontal: wp(23),
            }}
          >
            {imageInfo !== null && (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(8),
                  resizeMode: "contain",
                }}
                source={{ uri: imageInfo.uri }}
              />
            )}
            <TouchableOpacity
              onPress={() => ref_RBSheetCamera.current.open()}
              style={{
                position: "absolute",
                top: 10,
                left: 48,
                height: hp(3),
                width: wp(21),
                borderRadius: wp(3),
                backgroundColor: "#FACA4E",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2, // Ensure it's on top
              }}
            >
              <Text
                style={{
                  fontSize: hp(1.3),
                  fontFamily: "Inter",
                  color: "#232323",
                  fontWeight: "700",
                }}
              >
                {t("ChangeVideo")}
                {/* Change Video */}
              </Text>
            </TouchableOpacity>
            {imageInfo == null && (
              <Image
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(8),
                  resizeMode: "stretch",
                  zIndex: 0, // Ensure it's below other elements when no image
                }}
                source={appImages.updatePics}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => ref_RBSheetThumbnail.current.open()}
            style={{
              height: hp(20),
              width: wp(39),
              borderRadius: wp(8),
              borderStyle: "dotted",
              borderWidth: 3, // Use 'dotted' for dotted border
              borderColor: "#FACA4E",
              marginHorizontal: wp(23),
            }}
          >
            {thumbnailImageUri !== null && (
              <Image
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1, // Ensure it's on top of other elements
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(8),
                  resizeMode: "contain",
                }}
                source={{ uri: thumbnailImageUri }}
              />
            )}
            <TouchableOpacity
              onPress={() => ref_RBSheetThumbnail.current.open()}
              style={{
                position: "absolute",
                top: 10,
                left: 39,
                height: hp(3),
                width: wp(25),
                borderRadius: wp(3),
                backgroundColor: "#FACA4E",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2, // Ensure it's on top
              }}
            >
              <Text
                style={{
                  fontSize: hp(1.3),
                  fontFamily: "Inter",
                  color: "#232323",
                  fontWeight: "700",
                }}
              >
                {t("Uploadthumbnail")}
                {/* Upload Thumbnail */}
              </Text>
            </TouchableOpacity>
            {thumbnailImageUri == null && null}
          </TouchableOpacity>
        </View>

        <View style={{ marginRight: wp(2) }}>
          <TextInput
            mode="outlined"
            label={t("Video")}
            value={profileName}
            outlineStyle={{ borderRadius: wp(3) }}
            onChangeText={(text) => setProfileName(text)}
            style={[styles.ti, { borderRadius: wp(10) }]}
            outlineColor="#0000001F"
            placeholderTextColor={"#646464"}
            activeOutlineColor="#FACA4E"
            autoCapitalize="none"
            onFocus={handleFocus}
            onBlur={handleBlur}
            // left={isTextInputActive ? <Oemail /> : <Gemail />}
          />
        </View>

        <View style={{ marginHorizontal: wp(7) }}>
          <Dropdown
            style={
              isCategoryActive
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
            value={categoryId}
            data={categoriesSelect}
            search={false}
            maxHeight={200}
            // labelField="name"
            // valueField="id"
            labelField="label"
            valueField="value"
            placeholder={t("SelectCategory")}
            searchPlaceholder="Search..."
            onFocus={handleCategoryFocus}
            onBlur={handleCategoryBlur}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              console.log("kon category id hai----?? ", item.value);
              setCategoryId(item.value);
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
        </View>
        <View style={{ marginHorizontal: wp(7), marginTop: hp(-2) }}>
          <Dropdown
            //  style={styles.textInputCategoryNonSelected}
            style={
              isSubCategoryActive
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
            labelField="label"
            valueField="value"
            placeholder={t("SelectSubCategory")}
            searchPlaceholder="Search..."
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onFocus={handleSubCategoryFocus}
            onBlur={handleSubCategoryBlur}
            onChange={(item) => {
              console.log("kon sub category id hai----", item.value);
              setSubCategory(item.value);
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "#000000" : "#000000"}
                name="down"
                size={15}
              />
            )}
          />
          <View></View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(3),
          }}
        >
          <CPaperInput
            multiline={true}
            placeholder={t("Description")}
            placeholderTextColor="#121420"
            value={description}
            onChangeText={(text) => setDescription(text)}
            height={hp(20)}
          />
        </View>
        <View
          style={{
            marginTop: hp(5),
            marginBottom: hp(5),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButton
            title={t("Update")}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              checkUpdate();
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
          <Text style={styles.maintext}>{t("SelectAnOption")}</Text>
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

            <Text style={{ color: "#333333" }}>{t("Fromcamera")}</Text>
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

            <Text style={{ color: "#333333" }}>{t("Fromgallery")}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSheetThumbnail}
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
          <Text style={styles.maintext}>{t("SelectAnOption")}</Text>
          <TouchableOpacity
            onPress={() => ref_RBSheetThumbnail.current.close()}
          >
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSheetThumbnail.current.close()}
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
            onPress={() => takePhotoFromCameraThumbnail("camera")}
            style={
              selectedItemThumbnial === "camera"
                ? styles.selectedItems
                : styles.nonselectedItems
            }
          >
            <Ionicons
              color={selectedItemThumbnial === "camera" ? "#FACA4E" : "#888888"}
              name="camera"
              size={25}
            />

            <Text style={{ color: "#333333" }}>{t("Fromcamera")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => choosePhotoFromLibraryThumbnail("gallery")}
            style={
              selectedItemThumbnial === "gallery"
                ? styles.selectedItems
                : styles.nonselectedItems
            }
          >
            <MaterialCommunityIcons
              color={
                selectedItemThumbnial === "gallery" ? "#FACA4E" : "#888888"
              }
              name="image"
              size={25}
            />

            <Text style={{ color: "#333333" }}>{t("Fromgallery")}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <CustomSnackbar
        message={t("Success")}
        messageDescription={t("UpdateVideoSuccessfully")}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white
          }}
        >
          <ActivityIndicator size="large" color="#FACA4E" />
        </View>
      )}

      <CustomDialog
        visible={modalVisible}
        onClose={closeModal}
        onAction={performAction}
        imageURL="URL_TO_YOUR_IMAGE"
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
    marginTop: hp(5),
    alignItems: "center",
    marginHorizontal: wp(8),
  },
  headerText: {
    fontSize: hp(2.5),
    alignSelf: "center",
    marginLeft: wp(23),
    color: "#333333",
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  ti: {
    marginHorizontal: "7%",
    marginTop: "5%",
    //width: 300,
    backgroundColor: "white",
    fontSize: wp(4),
    paddingLeft: "2%",
    borderRadius: 100,
  },
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: "98%",
    borderColor: "#FACA4E",

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: "98%",
    borderColor: "#E7EAF2",
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
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
  maintext: {
    fontSize: hp(2.3),
    color: "#303030",
    fontWeight: "bold",
  },
  modaltextview: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: wp(90),
    borderRadius: 25,
    backgroundColor: "white",
    paddingHorizontal: wp(15),
  },
  optiontext: {
    fontSize: hp(1.7),
    color: "#303030",
    marginLeft: wp(4),
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
});
