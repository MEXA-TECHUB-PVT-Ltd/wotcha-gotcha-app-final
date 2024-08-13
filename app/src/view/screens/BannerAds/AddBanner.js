import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

import { Divider, TextInput } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Back from "../../../assets/svg/back.svg";
import { appImages } from "../../../assets/utilities/index";
import CustomButton from "../../../assets/Custom/Custom_Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Link from "../../../assets/svg/Link.svg";
import Calender from "../../../assets/svg/Calender.svg";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useStripe } from "@stripe/stripe-react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Headers from "../../../assets/Custom/Headers";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
import { base_url } from "../../../../../baseUrl";
import CustomLoaderButton from "../../../assets/Custom/CustomLoaderButton";
import { CLOUDINARY_URL, UPLOAD_PRESET, CLOUD_NAME } from "../../../../../cloudinaryConfig";


const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};
export default function AddBanner({ navigation }) {
  const [selectedItem, setSelectedItem] = useState("");
  const { createPaymentMethod } = useStripe();
  const [snackBarVisible, setSnackbarVisible] = useState(false);

  const [snackBarVisibleAlert, setSnackbarVisibleAlert] = useState(false);
  const [snackBarVisibleErrorAlert, setSnackbarVisibleErrorAlert] = useState(false);

  const [loading, setIsLoading] = useState(false);

  const [imageInfo, setImageInfo] = useState(null);

  const [addBannerLink, setAddBannerLink] = useState("");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [isActiveAddBanner, setIsActiveAddBanner] = useState(false);

  const [isActiveStartDate, setIsActiveStartDate] = useState(false);

  const [isActiveEndDate, setIsActiveEndDate] = useState(false);

  const [imageUri, setImageUri] = useState(null);

  const [authToken, setAuthToken] = useState([]);

  const [userId, setUserId] = useState("");

  const ref_RBSheetCamera = useRef(null);
  const [data, setData] = useState([]);
  const [aloading, setALoading] = useState([]);
  const [bannerImageError, setBannerImageError] = useState("");
  const [bannerURLError, setBannerURLError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [bannerId, setBannerId] = useState("");

  //----------------------------\\

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setIsLoading(true);
    await getUserID();
    setIsLoading(false);
  };

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem("userId ");
      if (result !== null) {
        setUserId(result);
        userToken(result);
      }
    } catch (error) {
      console.error("Error retrieving user ID:", error);
    }
  };

  //--------------------------------\\

  const userToken = async (id) => {
    try {
      const result3 = await AsyncStorage.getItem("authToken ");
      if (result3 !== null) {
        setAuthToken(result3);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

 
  useEffect(() => {
    if (authToken) {
      fetchBannerConfig();
    }
  }, [authToken]);
  const fetchBannerConfig = async () => {
    const token = authToken;
    setALoading(true);
    try {
      const response = await fetch(
        base_url + "bannerConfig/getAllBannerConfig/?page=1&limit=5000",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log("banner cost---", result.result);
      const cleanedDescription = stripHtmlTags(result.result.description);
      // Update the state with the cleaned description
      setData({
        ...result.result,
        description: cleanedDescription,
      });
      console.log("banner cost---", data);
      // setData(result.result);
    } catch (error) {
      console.error("Error Trending:", error);
    }
    setALoading(false);
  };
  // console.log("data.cost for state----", data.cost)
  // console.log("Categry in id", data.top_banner_cost)
  //-----------------------------\\

  const takePhotoFromCamera = async (value) => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: "photo",
        //videoQuality: 'medium',
      },
      (response) => {
        console.log("image here", response);

        if (!response.didCancel) {
          ref_RBSheetCamera.current.close();
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
            console.log("response is ", response.assets[0].uri);
            setImageInfo(response.assets[0]);
            ref_RBSheetCamera.current.close();
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setImageUri(response.uri);
            console.log("response null", response.uri);
            ref_RBSheetCamera.current.close();
          }
        }
      }
    );
  };

  const choosePhotoFromLibrary = (value) => {
    setSelectedItem(value);
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      console.log("image here", response);
      if (!response.didCancel && response.assets.length > 0) {
        console.log("Response", response.assets[0]);
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]);
        ref_RBSheetCamera.current.close();
      }
      ref_RBSheetCamera.current.close();

      console.log("response", imageInfo);
    });
  };

  const handleFocusAddBanner = () => {
    setIsActiveAddBanner(true);
  };

  const handleBlurAddBanner = () => {
    setIsActiveAddBanner(false);
  };

  const handleFocusStartDate = () => {
    setIsActiveStartDate(true);
  };

  const handleBlurStartDate = () => {
    setIsActiveStartDate(false);
  };

  const handleFocusEndDate = () => {
    setIsActiveEndDate(true);
  };

  const handleBlurEndDate = () => {
    setIsActiveEndDate(false);
  };

  const handleUpdatePassword = async () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
      navigation.navigate("ViewBanners");
    }, 3000);
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(true);
  };

  const handleUpdatePasswordAlert = async () => {
    setSnackbarVisibleAlert(true);
    setTimeout(() => {
      setSnackbarVisibleAlert(false);
    }, 3000);
  };

  const dismissSnackbarAlert = () => {
    setSnackbarVisibleAlert(true);
  };

  const handleUploadErrerAlert = async () => {
    setSnackbarVisibleErrorAlert(true);
    setTimeout(() => {
      setSnackbarVisibleErrorAlert(false);
    }, 3000);
  };

  const dismissSnackbarUploadErrorAlert = () => {
    setSnackbarVisibleErrorAlert(true);
  };

  const upload = async () => {
    if (
      imageUri !== null &&
      addBannerLink !== "" &&
      startDate !== "" &&
      endDate !== ""
    ) {
      handleUploadImage();
      //uploadVideo();
    } else {
      handleUpdatePasswordAlert();
    }
  };

  const handleUploadImage = (data) => {
    setIsLoading(true);
    const uri = imageInfo.uri;
    const type = imageInfo.type;
    const name = imageInfo.fileName;
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
        //setImageUrl(data.url); // Store the Cloudinary video URL in your state
        //uploadVideo(data.url)
        //uploadXpiVideo(data.url);
        console.log("Image Url", data);
        // uploadXpiVideo(data.url,data)
        handleSendCode(data.url);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Error While Uploading Video", err);
      });
  };

  const forgetPasswordEndpoint = base_url + "banner/createBanner"; // Replace with your actual API endpoint
  const handleSendCode = async (datas) => {
    console.log("DATA IMAGE", datas);
    console.log("addBannerLink IMAGE", addBannerLink);
    console.log("userId IMAGE", userId);
    console.log("startDate IMAGE", startDate);
    console.log("endDate IMAGE", endDate);
    console.log("totalamount ------", totalAmount);
    console.log("totalCostTopBanner", totalCostTopBanner);

    setIsLoading(true);

    try {
      const token = authToken; // Replace this with your actual function to get the bearer token

      const response = await fetch(forgetPasswordEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          banner_link: addBannerLink,
          price: totalAmount,
          image: datas,
          user_id: userId,
          startDate: startDate,
          endDate: endDate,
          top_banner: isChecked,
          paid_status: false,
        }),
      });

      const data = await response.json();

      if (data.statusCode === 201) {
        setIsLoading(false);
        console.log("data for response", data);
        const bannerId = data.data.id; // Capture the banner ID
        console.log("Banner ID", bannerId);
        // setBannerId(bannerId);
        navigation.navigate("PaymentScreen", {
          authToken: authToken,
          totalAmount: totalAmount,
          bannerId: bannerId,
          addBannerLink: addBannerLink,
          price: totalAmount,
          datas: datas,
          user_id: userId,
          startDate: startDate,
          endDate: endDate,
          top_banner: isChecked,
          paid_status: false,
        });

        // handleUpdatePassword();
        // Assuming there's at least one result
      } else {
        setIsLoading(false);
        handleUploadErrerAlert();
        console.log("ERROR", data);
        //console.error('No results found.', data.response.result);
      }

      // Reset the input fields
      // navigation.navigate('SelectGender');
    } catch (error) {
      console.error("Error:", error);
      //showAlert();
      setIsLoading(false);
    }
  };
  // ////17.5.2024 for open datapicker  ok///////////////////////////////////////////////////////////////////////////////////////////////////
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [totalCostTopBanner, setTotalCostTopBanner] = useState(0);

  const [totalCost, setTotalCost] = useState(0);

  const calculateTotalCost = (startDate, endDate, dailyCost) => {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include both start and end dates
    return diffDays * dailyCost;
  };
  // console.log('totalCost-----------', totalCost)
  // console.log('totalCostTopBanner-----------', totalCostTopBanner)

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (event.type === "set" && selectedDate) {
      setSelectedStartDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString();
      setStartDate(formattedDate);

      if (selectedEndDate) {
        const total = calculateTotalCost(
          selectedDate,
          selectedEndDate,
          data.cost
        );
        setTotalCost(total);
        const topBannerTotal = calculateTotalCost(
          selectedDate,
          selectedEndDate,
          data.top_banner_cost
        );
        setTotalCostTopBanner(topBannerTotal);
        if (isChecked) {
          setTotalAmount(total + topBannerTotal);
        } else {
          setTotalAmount(total);
        }
      }
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (event.type === "set" && selectedDate) {
      setSelectedEndDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString();
      setEndDate(formattedDate);

      if (selectedStartDate) {
        const total = calculateTotalCost(
          selectedStartDate,
          selectedDate,
          data.cost
        );
        setTotalCost(total);

        // //
        const topBannerTotal = calculateTotalCost(
          selectedStartDate,
          selectedDate,
          data.top_banner_cost
        );
        setTotalCostTopBanner(topBannerTotal);

        // Update totalAmount if checkbox is checked
        if (isChecked) {
          setTotalAmount(total + topBannerTotal);
        } else {
          setTotalAmount(total);
        }
      }
    }
  };

  const openStartDatePicker = () => {
    setShowStartPicker(true);
  };

  const openEndDatePicker = () => {
    setShowEndPicker(true);
  };

  ///////////////////////////
  const [isChecked, setIsChecked] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setTotalAmount(totalCost + totalCostTopBanner);
    } else {
      setTotalAmount(totalCost);
    }
  };
  // const toggleCheckbox = () => {
  //   setIsChecked(!isChecked);
  //   if (!isChecked) {
  //     setTotalAmount(totalCost + totalCost_top_banner_cost);
  //   } else {
  //     setTotalAmount(totalCost - totalCost_top_banner_cost);
  //   }
  // };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior="height" // You can use ‘height’ as well, depending on your preference
      enabled
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={"#FFFFFF"} />

      <View style={{ marginTop: hp(8) }}>
        <Headers
          showBackIcon={true}
          onPress={() => navigation.goBack()}
          showText={true}
          text={"Add Banner"}
        />
      </View>
      {/* <TouchableOpacity onPress={()=>navigation.navigate('PaymentScreen')}><Text>Helloe</Text></TouchableOpacity> */}
      {/* <Button
        title="Pay Now"
        onPress={() =>
          navigation.navigate("PaymentScreen", {
            authToken: authToken,
            totalAmount: totalAmount,
            bannerId: bannerId,
          })
        }
      /> */}
      <ScrollView style={styles.container}>
        <View>
          {imageUri == null ? (
            <TouchableOpacity
              onPress={() => ref_RBSheetCamera.current.open()}
              style={{
                borderRadius: wp(3),
                marginTop: hp(5),
                marginHorizontal: wp(10),
                height: hp(25),
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#E7EAF2",
              }}
            >
              <Image
                style={{ resizeMode: "contain" }}
                source={appImages.UploadBanner}
              />

              <Text
                style={{
                  fontFamily: "Inter",
                  marginTop: hp(1.8),
                  //fontWeight: 'bold',
                  fontSize: hp(2.1),
                  color: "#939393",
                }}
              >
                Upload Image
              </Text>
            </TouchableOpacity>
          ) : null}
          {imageUri !== null ? (
            <View
              style={{
                marginTop: hp(3),
                height: hp(18),
                marginBottom: hp(6),
                borderRadius: wp(2),
                marginHorizontal: wp(10),
              }}
            >
              {imageUri !== null && (
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(2),
                    resizeMode: "contain",
                  }}
                  source={{ uri: imageUri }}
                />
              )}
              {imageUri == null && (
                <Image
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "stretch",
                    zIndex: 0, // Ensure it's below other elements when no image
                  }}
                  source={appImages.updatePics}
                />
              )}

              <View
                style={{
                  height: 50,
                  borderColor: "#E7EAF2",
                  marginTop: hp(18),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => ref_RBSheetCamera.current.open()}
                  style={{
                    height: 30,
                    backgroundColor: "#FACA4E",
                    borderRadius: wp(4),
                    paddingHorizontal: wp(3),
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Inter-SemiBold",
                    }}
                  >
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {bannerImageError ? (
              <Text style={styles.errorText}>{bannerImageError}</Text>
            ) : null}
          </View>
        </View>

        <View style={{ alignSelf: "center" }}>
          <TextInput
            mode="outlined"
            label="Add Banner link"
            value={addBannerLink}
            onChangeText={(text) => setAddBannerLink(text)}
            //multiline={true} // Enable multiline input
            //numberOfLines={3} // Set the initial number of lines
            style={{ ...styles.ti }} // Adjust the height as needed
            outlineColor="#0000001F"
            placeholderTextColor="#646464"
            activeOutlineColor="#FACA4E"
            autoCapitalize="none"
            onFocus={handleFocusAddBanner}
            onBlur={handleBlurAddBanner}
          />
          <View>
            {bannerURLError ? (
              <Text style={styles.errorText}>{bannerURLError}</Text>
            ) : null}
          </View>
        </View>
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <TextInput
            mode="outlined"
            label="Start Date"
            value={startDate}
            // onChangeText={(text) => setStartDate(text)}
            //multiline={true} // Enable multiline input
            //numberOfLines={3} // Set the initial number of lines
            style={{ ...styles.ti }} // Adjust the height as needed
            outlineColor="#0000001F"
            placeholder="Start Date"
            placeholderTextColor="#646464"
            activeOutlineColor="#FACA4E"
            autoCapitalize="none"
            onFocus={openStartDatePicker}
            editable={false}
            // onBlur={handleBlurStartDate}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={openStartDatePicker}
          >
            <Calender width={22} height={22} />
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              testID="startDateTimePicker"
              value={selectedStartDate}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
            />
          )}
          <View>
            {startDateError ? (
              <Text style={styles.errorText}>{startDateError}</Text>
            ) : null}
          </View>
        </View>
        <View style={{ alignSelf: "center" }}>
          <TextInput
            mode="outlined"
            label="End Date"
            value={endDate}
            // onChangeText={(text) => setEndDate(text)}
            //multiline={true} // Enable multiline input
            //numberOfLines={3} // Set the initial number of lines
            style={{ ...styles.ti }} // Adjust the height as needed
            outlineColor="#0000001F"
            placeholderTextColor="#646464"
            activeOutlineColor="#FACA4E"
            autoCapitalize="none"
            onFocus={openEndDatePicker}
            editable={false}
            // onFocus={handleFocusEndDate}
            // onBlur={handleBlurEndDate}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={openEndDatePicker}
          >
            <Calender width={22} height={22} />
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              testID="endDateTimePicker"
              value={selectedEndDate}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
            />
          )}
          <View>
            {endDateError ? (
              <Text style={styles.errorText}>{endDateError}</Text>
            ) : null}
          </View>
        </View>
        {/* ///////// date picker */}

        {/* /////////// checkbox */}

        <View style={styles.checkcontainer}>
          {/* First Row: Checkbox with Heading */}
          <View style={styles.row}>
            <TouchableOpacity onPress={toggleCheckbox} style={styles.row}>
              <View style={[styles.checkbox, isChecked && styles.checked]}>
                {isChecked && <View style={styles.innerCheckbox} />}
              </View>
              <Text style={styles.heading}>Add a banner on top.</Text>
            </TouchableOpacity>
          </View>

          {/* Second Row: Text */}
          <View style={styles.row}>
            <Text style={styles.checkboxtext}>
              There will be an additional cost of ${totalCostTopBanner}.
            </Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 0.3,
            marginHorizontal: 20,
            marginVertical: 20,
            borderColor: "#EBEBEB",
          }}
        ></View>
        <View style={styles.Totalamountcontainer}>
          <Text style={styles.Totalamountheading}>Total Amount:</Text>
          {/* <Text style={styles.Totalamount}>$ 50</Text> */}
          <Text style={styles.Totalamount}>${totalAmount}</Text>
        </View>

        {/* ///////////////////// box end */}

        <View style={styles.loaderButtonView}>
          <View style={styles.loaderButtonInner}>
            <CustomLoaderButton
              title={"Add"}
              load={loading}
              customClick={() => {
                let hasError = false;

                if (!imageInfo) {
                  setBannerImageError("Banner is required");
                  hasError = true;
                } else {
                  setBannerImageError("");
                }

                if (!addBannerLink) {
                  setBannerURLError("Banner URL is required");
                  hasError = true;
                } else {
                  setBannerURLError("");
                }

                if (!startDate) {
                  setStartDateError("Start Date is required");
                  hasError = true;
                } else {
                  setStartDateError("");
                }

                if (!endDate) {
                  setEndDateError("End Date is required");
                  hasError = true;
                } else {
                  setEndDateError("");
                }

                if (!hasError) {
                  if (!loading) {
                    setIsLoading(true);
                    upload();
                  }
                }
              }}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: "6%", marginBottom: "10%" }}>
          {/* // */}
          {aloading ? (
            <ActivityIndicator size="large" color="#FACA4E" />
          ) : (
            data && (
              <View style={styles.bannerContainer}>
                <Text style={styles.heading}>Why Advertise?</Text>
                <Text style={[styles.checkboxtext, styles.extrastyle]}>
                  {data.description}
                </Text>

                <Text style={[styles.heading, { marginTop: "5%" }]}>
                  Better to upload image of size:
                </Text>
                <Text style={[styles.checkboxtext, styles.extrastyle]}>
                  {data.length} * {data.width}
                </Text>

                <Text style={[styles.heading, { marginTop: "5%" }]}>
                  Advertising cost perday:
                </Text>
                <Text style={[styles.checkboxtext, styles.extrastyle]}>
                  $ {data.cost} perday
                </Text>
              </View>
            )
          )}
          {/* // */}
        </View>

        {/* <View
          style={{
            flex: 1,
            marginTop: hp(2),
            alignSelf: "center",
            justifyContent: "flex-end",
          }}
        >
          <CustomButton
            title={"Add"}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              setIsLoading(true);
              upload();
              setIsLoading(false);
              //handleUpdatePassword();
              //navigation.navigate('Profile_image');
            }}
          />
        </View> */}

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
            <Text style={styles.maintext}>Select an option</Text>
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

              <Text style={{ color: "#333333" }}>From camera</Text>
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

              <Text style={{ color: "#333333" }}>From gallery</Text>
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
      </ScrollView>
      <CustomSnackbar
        message={"Success"}
        messageDescription={"Banner Posted SuccessFully"}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackBarVisible}
      />

      <CustomSnackbar
        message={"Alert!"}
        messageDescription={"Kindly Fill All Fields"}
        onDismiss={dismissSnackbarAlert} // Make sure this function is defined
        visible={snackBarVisibleAlert}
      />
      <CustomSnackbar
        message={"Alert!"}
        messageDescription={"Something Went Wrong"}
        onDismiss={setSnackbarVisibleErrorAlert} // Make sure this function is defined
        visible={snackBarVisibleErrorAlert}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  ti: {
    marginTop: "5%",
    width: 300,
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
  selectCheckBox: {
    width: 17,
    height: 17,
    borderRadius: wp(1),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FACA4E",
  },
  unSelectCheckBox: {
    width: 17,
    height: 17,
    borderRadius: wp(1),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#C4C4C4",
  },
  iconContainer: {
    position: "absolute",
    right: 4,
    padding: 10,
    top: 28,
  },
  checkcontainer: {
    flex: 1,
    paddingHorizontal: 42,
  },
  Totalamountcontainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 42,
    paddingTop: 10,
  },
  Totalamountheading: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
    color: "#666666",
  },
  Totalamount: {
    fontSize: 15,
    paddingLeft: 8,
    fontFamily: "Inter-Bold",
    color: "#FACA4E",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  heading: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333333",
    fontFamily: "Inter-Medium",
  },
  checkboxtext: {
    fontSize: 12,
    color: "#939393",
    marginTop: -3,
    fontFamily: "Inter-Regular",
  },
  extrastyle: {
    marginLeft: "4%",
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#FACA4E",
  },
  innerCheckbox: {
    width: 10,
    height: 10,
    backgroundColor: "black",
    borderRadius: 2,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
