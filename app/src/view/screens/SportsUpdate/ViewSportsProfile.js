import {
    StyleSheet,
    FlatList,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    TextInput,
    StatusBar,
    PermissionsAndroid,
    ImageBackground,
    View,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useRef, useMemo, useEffect } from "react";
  import Entypo from "react-native-vector-icons/Entypo";
  import { appImages } from "../../../assets/utilities/index";
  import Like from "../../../assets/svg/Like.svg";
  import UnLike from "../../../assets/svg/Unlike.svg";
  import Comment from "../../../assets/svg/Comment.svg";
  import Send from "../../../assets/svg/Send.svg";
  import Download from "../../../assets/svg/Download.svg";
  import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
  import ButtonSend from "../../../assets/svg/ButtonSend.svg";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import EditItem from "../../../assets/svg/UpdateItem.svg";
  
  import Delete from "../../../assets/svg/Delete.svg";
  
  import DownArrowComments from "../../../assets/svg/DownArrowComments.svg";
  import UpArrowComments from "../../../assets/svg/UpArrowComments.svg";
  
  import SmileEmoji from "../../../assets/svg/SmileEmoji.svg";
  
  import Share from "react-native-share";
  
  import axios from "axios";
  
  import RNFetchBlob from "rn-fetch-blob";
  
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
  
  import Fontiso from "react-native-vector-icons/Fontisto";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  import IonIcons from "react-native-vector-icons/Ionicons";
  
  import RBSheet from "react-native-raw-bottom-sheet";
  import EmojiPicker from "rn-emoji-keyboard";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
  import { base_url } from "../../../../../baseUrl";
  
  export default function ViewSportsProfile({ navigation, route }) {
    const [showFullContent, setShowFullContent] = useState(false);
    const identifier = route.params?.identifier;
    // console.log("Data Recieved on picData", identifier);
    const [pastedURL, setPastedURL] = useState(
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    );
  
    const [comments, setComments] = useState([]);
  
    const [snackbarDeleteVisible, setsnackbarDeleteVisible] = useState(false);
  
    const [likes, setLikes] = useState(null);
  
    const [commentsCount, setCommentsCount] = useState(null);
  
    const [showReply, setShowReply] = useState(false);
  
    const [loading, setLoading] = useState(false);
  
    const [userId, setUserId] = useState("");
  
    const [showMenu, setShowMenu] = useState(true);
  
    const [progress, setProgress] = useState(0);
  
    const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  
    const ref_Comments = useRef(null);
  
    const [authToken, setAuthToken] = useState([]);
  
    const refSlide = useRef();
  
    const bottomSheetRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ["25%", "50%"], []);
  
    const [snackbarVisible, setsnackbarVisible] = useState(false);
  
    const [commentText, setCommentText] = useState(null); // State variable to hold the text
  
    const [showLikes, setShowLikes] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const ref_RBSheetCamera = useRef(null);
    const refCommentsSheet = useRef();
  
  
    useEffect(() => {
      // Make the API request and update the 'data' state
      fetchAll();
    }, []);
  
    const fetchAll = async () => {
      // Simulate loading
      setLoading(true);
      // Fetch data one by one
  
      await getUserID();
  
      //await fetchLikes()
      //await fetchCommentsCounts()
  
      // Once all data is fetched, set loading to false
      setLoading(false);
    };
  
    const getUserID = async () => {
      console.log("Id's");
      try {
        const result = await AsyncStorage.getItem("userId ");
        if (result !== null) {
          setUserId(result);
          console.log("user id retrieved:", result);
        } else {
          console.log("user id null:", result);
        }
  
        const result1 = await AsyncStorage.getItem("authToken ");
        if (result1 !== null) {
          setAuthToken(result1);
          console.log("user token retrieved:", result1);
          await fetchComments(result1);
        } else {
          console.log("result is null", result);
        }
      } catch (error) {
        // Handle errors here
        console.error("Error retrieving user ID:", error);
      }
    };
  
    const fetchComments = async (value) => {
      const token = value;
  
      try {
        const response = await fetch(
          base_url +
            `picTour/getAllCommentsByPicTour/${receivedData?.pic_tour_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          //console.log("All Comments of usersssss", data.AllComents)
          setComments(data.AllComents);
          setCommentsCount(data.totalComments)
  
          await fetchLikes(value);
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
  
    const fetchLikes = async (values) => {
      const token = values;
  
      try {
        const response = await fetch(
          base_url + `picTour/getAllLikesByPicTour/${receivedData.pic_tour_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          console.log("All Likes", data.totalLikes);
          setLikes(data.totalLikes);
          // fetchCommentsCounts(values);
          //setLikes(data.totalLikes);
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
  
    // const fetchCommentsCounts = async (values) => {
    //   const token = values;
  
    //   try {
    //     const response = await fetch(
    //       base_url + `picTour/getAllCommentsByPicTour/${receivedData.pic_tour_id}`,
    //       {
    //         method: "GET",
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
  
    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log("All Comments", data.totalComments);
    //       setCommentsCount(data.totalComments);
    //     } else {
    //       console.error(
    //         "Failed to fetch categories:",
    //         response.status,
    //         response.statusText
    //       );
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };
  
    //---------------------------\\
  
    const changeModals = () => {
      ref_RBSheetCamera.current.close();
      navigation.navigate("UpdateSportsScreen", { item: receivedData });
    };
  
    const changeDelete = () => {
      ref_RBSheetCamera.current.close();
      handleUpdateDelete();
      //navigation.goBack()
    };
  
    const handleUpdateDelete = async () => {
      const token = authToken;
      try {
        const response = await fetch(
          base_url + `picTour/deletePicTour/${receivedData?.pic_tour_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              // Include any additional headers as needed
            },
            // You may include a request body if required by the server
            // body: JSON.stringify({}),
          }
        );
  
        if (response.ok) {
          handleUpdateDeletePassword();
          // Optionally handle the response data here
        } else {
          console.error(
            `Error deleting video with ID ${receivedData?.video_id}:`,
            response.status
          );
          // Optionally handle the error response here
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle other errors such as network issues
      }
    };
  
    //----------------------------\\
  
    const dismissSnackbar = () => {
      setsnackbarVisible(false);
    };
  
    const handleUpdatePassword = async () => {
      // Perform the password update logic here
      // For example, you can make an API request to update the password
  
      // Assuming the update was successful
      setsnackbarVisible(true);
  
      // Automatically hide the Snackbar after 3 seconds
      setTimeout(() => {
        setsnackbarVisible(false);
  
        if (pastedURL !== "") {
          requestStoragePermission();
        } else {
          console.log("Please Add Video Url");
        }
  
        //navigation.goBack();
      }, 3000);
    };
  
    const clearTextInput = () => {
      console.log("came to logssssss", commentText);
      // Clear the text in the TextInput
      setCommentText(null);
      sendComment();
    };
  
    const dismissDeleteSnackbar = () => {
      setsnackbarDeleteVisible(false);
    };
  
    const handleUpdateDeletePassword = async () => {
      // Perform the password update logic here
      // For example, you can make an API request to update the password
  
      // Assuming the update was successful
      setsnackbarDeleteVisible(true);
  
      // Automatically hide the Snackbar after 3 seconds
      setTimeout(() => {
        setsnackbarDeleteVisible(false);
        navigation.navigate("ViewProfile");
        //navigation.goBack();
      }, 3000);
    };
  
    const sendComment = async () => {
      setLoading(true);
      console.log("Set Loading ", loading);
      const token = authToken; // Replace with your actual token
  
      try {
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
  
        const commentData = {
          pic_tours_id: receivedData.pic_tour_id,
          user_id: userId,
          comment: commentText,
        };
  
        const response = await axios.post(
          base_url + "picTour/sendComment",
          commentData,
          axiosConfig
        );
  
        console.log("Response", response);
  
        if (response.status === 200) {
          setLoading(false);
          console.log("Comment sent successfully");
          fetchAll();
        } else {
          setLoading(false);
          fetchAll();
          console.error(
            "Failed to send comment:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
    };
  
    const sendLikes = async () => {
      console.log("likes Token", authToken);
      console.log("User Id", userId);
      setLoading(true);
      const token = authToken; // Replace with your actual token
  
      try {
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
  
        const commentData = {
          pic_tour_id: receivedData?.pic_tour_id,
          user_id: userId,
        };
  
        const response = await axios.post(
          base_url + "picTour/likeUnlikePicTour",
          commentData,
          axiosConfig
        );
  
        console.log("Response", response);
  
        if (response.status === 200) {
          setLoading(false);
          console.log("Pic Liked  successfully");
          fetchAll();
        } else {
          setLoading(false);
          fetchAll();
          console.error(
            "Failed to send comment:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
    };
  
    const openEmoji = () => {
      console.log("Is Open");
      setIsOpen(true);
      console.log("Is Open", isOpen);
    };
    const handlePick = (emojiObject) => {
      console.log("Emoji Object", emojiObject);
      //setIsOpen(false)
      setCommentText(emojiObject.emoji);
    };
    const renderComments = (item) => {
      //console.log('Items of comments', item);
      return (
        <View>
         <TouchableOpacity
            onPress={() =>
              navigation.navigate('ViewElseProfile', {id: item?.userid})
            }
            style={{
              height: hp(10),
              //borderWidth:3,
              paddingHorizontal: wp(5),
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
                  <View
              style={{
                height: wp(13),
                alignSelf: 'center',
                resizeMode: 'hidden',
                width: wp(13),
                borderRadius: hp(13) / 2,
              }}>
                  {item?.userimage ? (
                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: hp(13) / 2,
                        resizeMode:'cover'
                      }}
                      source={{ uri: item.userimage }}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={"account-circle"}
                      size={30}
                      color={"#FACA4E"}
                    />
                  )}
            </View>
  
            <View
              style={{
                //flex: 1,
                marginLeft: wp(3),
                height: hp(5),
                //marginTop: hp(1),
                //borderWidth:3,
                justifyContent: "space-around",
              }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontFamily: "Inter-Medium",
                  fontSize: hp(2.1),
                }}
              >
                {item.username}
              </Text>
  
              <Text
                style={{
                  color: "#4C4C4C",
                  fontFamily: "Inter-Regular",
                  marginTop: hp(2.1),
                  fontSize: hp(1.6),
                }}
              >
                {item.comment}
              </Text>
  
              {false && (
                <TouchableOpacity
                  onPress={() => setShowReply(!showReply)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    //borderWidth:3,
                    height: hp(3),
                    width: wp(21),
                  }}
                >
                  {showReply === true ? (
                    <UpArrowComments />
                  ) : (
                    <DownArrowComments />
                  )}
  
                  <Text
                    style={{
                      color: "#FACA4E",
                      fontFamily: "Inter-Regular",
                      marginLeft: wp(1.8),
                      fontSize: hp(1.6),
                    }}
                  >
                    2
                  </Text>
  
                  <Text
                    style={{
                      color: "#FACA4E",
                      fontFamily: "Inter-Regular",
                      marginLeft: wp(1.3),
                      fontSize: hp(1.6),
                    }}
                  >
                    replies
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
  
          {showReply && (
            <View
              style={{
                justifyContent: "space-evenly",
                height: hp(15),
                //borderWidth:3,
                marginLeft: wp(20),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: hp(6),
                  width: "100%",
                }}
              >
                <View
                  style={{
                    height: wp(10),
                    alignSelf: "center",
                    resizeMode: "hidden",
                    width: wp(10),
                    borderRadius: wp(10),
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      borderRadius: wp(2.1),
                      height: "100%",
                    }}
                    source={appImages.profileImg}
                  />
                </View>
  
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <Text
                    style={{
                      color: "#000000",
                      fontFamily: "Inter-Regular",
                      marginLeft: wp(1.8),
                      fontSize: hp(1.6),
                    }}
                  >
                    Olivia Bennett
                  </Text>
  
                  <Text
                    style={{
                      color: "#4C4C4C",
                      fontFamily: "Inter-Regular",
                      marginLeft: wp(2),
                      fontSize: hp(1.3),
                    }}
                  >
                    I wish I had a friend group like this. You all are incredible!
                  </Text>
                </View>
              </View>
  
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: hp(6),
                  width: "100%",
                }}
              >
                <View
                  style={{
                    height: wp(10),
                    alignSelf: "center",
                    resizeMode: "hidden",
                    width: wp(10),
                    borderRadius: wp(10),
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      borderRadius: wp(2.1),
                      height: "100%",
                    }}
                    source={appImages.profileImg}
                  />
                </View>
  
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <Text
                    style={{
                      color: "#000000",
                      fontFamily: "Inter-Regular",
                      marginLeft: wp(1.8),
                      fontSize: hp(1.6),
                    }}
                  >
                    Olivia Bennett
                  </Text>
  
                  <Text
                    style={{
                      color: "#4C4C4C",
                      fontFamily: "Inter-Regular",
                      marginLeft: wp(2),
                      fontSize: hp(1.3),
                    }}
                  >
                    I wish I had a friend group like this. You all are incredible!
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      );
    };
  
    const requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Downloader App Storage Permission",
            message:
              "Downloader App needs access to your storage " +
              "so you can download files",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile();
        } else {
          console.log("storage permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
  
    const downloadFile = () => {
      const { config, fs } = RNFetchBlob;
      const date = new Date();
      const fileDir = fs.dirs.DownloadDir;
      config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            fileDir +
            "/download_" +
            Math.floor(date.getDate() + date.getSeconds() / 2) +
            ".mp4",
          description: "file download",
        },
      })
        .fetch("GET", receivedData.image, {
          //some headers ..
        })
        .then((res) => {
          setsnackbarVisible(true);
          // the temp file path
          console.log("The file saved to ", res.path());
        });
    };
  
    const toggleContent = () => {
      setShowFullContent(!showFullContent);
    };
  
    const toggleContentLike = () => {
      setShowLikes(!showLikes);
      sendLikes();
    };
  
    const receivedData = route.params?.SportsData;
  
    console.log("Data Recieved on View Sports Profile", receivedData);
  
    var details = receivedData.description;
  
    const shareViaWhatsApp = async () => {
      const shareOptions = {
        title: "Share via",
        message: "Hey! Check out this cool app!",
        url: "https://play.google.com/store/apps/details?id=your.app.package",
        //social: Share.Social,
      };
  
      try {
        await Share.open(shareOptions);
      } catch (error) {
        console.error("Error sharing via WhatsApp:", error.message);
      }
    };
  
    const openComments = () => {
      setIsBottomSheetExpanded(!isBottomSheetExpanded);
      refCommentsSheet.current.open();
    };
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: receivedData?.image }}
          style={{ flex: 1 }}
        >
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content" // You can set the StatusBar text color to dark or light
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IonIcons name={"chevron-back"} color={"white"} size={25} />
            </TouchableOpacity>
  
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: hp(5),
                marginLeft: hp(6),
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewElseProfile", {
                    id: receivedData?.user_id,
                  })
                }
                style={{
                  height: hp(6),
                  width: hp(6),
                  borderRadius: hp(6) / 2,
                  marginLeft: wp(3),
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {receivedData?.userimage ? (
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: hp(6) / 2,
                      resizeMode: "cover",
                    }}
                    source={{ uri: receivedData.userimage }}
                  />
                ) : (
                  <MaterialCommunityIcons
                    style={{ marginTop: hp(0.5) }}
                    name={"account-circle"}
                    size={30}
                    color={"#FACA4E"}
                  />
                )}
              </TouchableOpacity>
              {/* <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewElseProfile", {
                      id: receivedData?.user_id,
                    })
                  }
                  style={{
                    height: '100%',
                    width:'20%',
                    borderRadius: hp(6) / 2,
                    marginLeft: wp(3),
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {receivedData?.userimage ? (
                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: hp(6) / 2,
                        resizeMode:'cover'
                      }}
                      source={{ uri: receivedData.userimage }}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      style={{ marginTop: hp(0.5) }}
                      name={"account-circle"}
                      size={30}
                      color={"#FACA4E"}
                    />
                  )}
                </TouchableOpacity> */}
  
             <View style={{width:'75%'}}>
  
    <Text  ellipsizeMode="tail"
              numberOfLines={1} style={styles.textProfileName}>{receivedData.username}</Text>
  </View>
            </View>
  
            {identifier ? ( 
          // Render specific content if identifier is true
          <TouchableOpacity
                onPress={() => ref_RBSheetCamera.current.open()}
                style={{position: 'absolute', right: 0}}>
                <Entypo name={'dots-three-vertical'} size={18} color={'white'} />
              </TouchableOpacity>
        ) : (
       <View/>
        )}
            {/* {showMenu && (
              <TouchableOpacity
                onPress={() => ref_RBSheetCamera.current.open()}
                style={{ marginLeft: wp(18), marginTop: hp(1) }}
              >
                <Entypo name={"dots-three-vertical"} size={18} color={"white"} />
              </TouchableOpacity>
            )} */}
          </View>
  
          <View style={styles.bottomView}>
            <View style={{ height: hp(20) }}>
              <ScrollView
                showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
                style={{ flex: 1 }}
                contentContainerStyle={{
                  verticalLine: false,
                  marginHorizontal: wp(8),
                }}
              >
                 <View style={{width:'80%'}}>
                    <Text style={[styles.textProfileName,{marginLeft:-0}]}>{receivedData.name}</Text>
                    </View>
                <Text
                  style={{
                    marginTop: hp(1),
                    fontFamily: "Inter",
                    fontSize: hp(1.8),
                    lineHeight: hp(2.1),
                    color: "#FFFFFF",
                  }}
                >
                  {showFullContent
                    ? details
                    : details.length > 90
                    ? details.substring(0, 90) + "..."
                    : details.slice(0)}
                </Text>
  
                <TouchableOpacity onPress={toggleContent}>
                  <Text
                    style={{
                      fontFamily: "Inter",
                      fontSize: hp(1.8),
                      color: "#FACA4E",
                    }}
                  >
                    {details.length > 90
                      ? showFullContent
                        ? "See Less"
                        : "See More"
                      : null}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
  
              <View style={{ height: 1, backgroundColor: "#FFFFFF52" }}></View>
  
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: hp(8),
                  marginHorizontal: wp(8),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: wp(14),
                    height: hp(5),
                  }}
                >
                  <TouchableOpacity onPress={toggleContentLike}>
                    {showLikes ? (
                      <Like height={21} width={21} />
                    ) : (
                      <UnLike height={21} width={21} />
                    )}
                  </TouchableOpacity>
  
                  <Text
                    style={{
                      fontFamily: "Inter",
                      fontSize: hp(1.5),
                      color: "#FFFFFF",
                    }}
                  >
                    {likes}
                  </Text>
                </View>
  
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: wp(12),
                    height: hp(5),
                  }}
                >
                  <TouchableOpacity
                    // onPress={() =>
                    //   setIsBottomSheetExpanded(!isBottomSheetExpanded)
                    // }
                    onPress={() => openComments()}
                  >
                    <Comment height={21} width={21} />
                  </TouchableOpacity>
  
                  <Text
                    style={{
                      fontFamily: "Inter",
                      fontSize: hp(1.5),
                      color: "#FFFFFF",
                    }}
                  >
                    {commentsCount}
                  </Text>
                </View>
  
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: wp(10),
                    height: hp(5),
                  }}
                >
                  <TouchableOpacity onPress={() => shareViaWhatsApp()}>
                    <Send height={21} width={21} />
                  </TouchableOpacity>
                </View>
  
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: wp(10),
                    height: hp(5),
                  }}
                >
                  <TouchableOpacity onPress={() => handleUpdatePassword()}>
                    <Download height={21} width={21} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
  
      {/* /// RBSheet */}
  
      <RBSheet
            ref={refCommentsSheet}
            height={450}
            openDuration={250}
            closeOnDragDown={true}
            customStyles={{
              container: {
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                paddingTop: 0,
                paddingHorizontal: 0,
                zIndex: 999,
                backgroundColor: "white",
              },
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: hp(5),
              }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontFamily: "Inter-Bold",
                  fontSize: hp(2.3),
                }}
              >
                Comments
              </Text>
            </View>
  
            <View style={{ marginTop: hp(1), flex: 1 }}>
              {comments.length === 0 || comments === null ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>No Comments Yet</Text>
                </View>
              ) : (
                <FlatList
                  data={comments}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => renderComments(item)}
                  extraData={loading}
                />
              )}
            </View>
  
  
            {loading && (
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -25 }, { translateY: -25 }],
            }}
          >
            <ActivityIndicator size="large" color="#FACA4E" />
          </View>
        )}
  
            {isBottomSheetExpanded === false ? (
              <View
                style={{
                  width: "100%",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  backgroundColor: "white",
                  flexDirection: "row",
                  alignItems: "center",
                  height: hp(8),
                }}
              >
                <TouchableOpacity
                  onPress={() => openEmoji()}
                  style={{
                    height: hp(8),
                    justifyContent: "center",
                    alignItems: "center",
                    width: wp(14),
                  }}
                >
                  <SmileEmoji />
                </TouchableOpacity>
  
                <TextInput
                  value={commentText} // Bind the value to the state variable
                  onChangeText={(text) => setCommentText(text)} // Update state on text change
                  placeholderTextColor={"#848484"}
                  placeholder="Write Comment Here"
                  style={{ flex: 1, marginLeft: wp(1) }}
                />
  
                <TouchableOpacity
                  style={{ marginRight: wp(3) }}
                  onPress={() => clearTextInput()}
                >
                  <ButtonSend />
                </TouchableOpacity>
              </View>
            ) : (
              isBottomSheetExpanded && (
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    flexDirection: "row",
                    alignItems: "center",
                    height: hp(8),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => openEmoji()}
                    style={{
                      height: hp(8),
                      justifyContent: "center",
                      alignItems: "center",
                      width: wp(14),
                    }}
                  >
                    <SmileEmoji />
                  </TouchableOpacity>
  
                  <TextInput
                    value={commentText} // Bind the value to the state variable
                    onChangeText={(text) => setCommentText(text)} // Update state on text change
                    placeholderTextColor={"#848484"}
                    // placeholder="Add a reply"
                    placeholder="Write Comment Here"
                    style={{ flex: 1, marginLeft: wp(1) }}
                  />
                  <TouchableOpacity style={{ marginRight: wp(3) }} onPress={() => clearTextInput()}>
                    <ButtonSend />
                  </TouchableOpacity>
                </View>
              )
            )}
          </RBSheet>
          {isOpen === true ? (
            <EmojiPicker
              onEmojiSelected={handlePick}
              open={true}
              onClose={() => setIsOpen(false)}
            />
          ) : null}
  
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
          {loading && <ActivityIndicator size="large" color="#FACA4E" />}
        </View>
  
        <CustomSnackbar
          message={"success"}
          messageDescription={"Pic deleted successfully"}
          onDismiss={dismissDeleteSnackbar} // Make sure this function is defined
          visible={snackbarDeleteVisible}
        />
  
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
              Select an option
            </Text>
            <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
              <IonIcons
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
              onPress={() => changeModals()}
              style={{ flexDirection: "row", marginHorizontal: wp(7) }}
            >
              <EditItem height={23} width={23} />
  
              <Text
                style={{
                  fontFamily: "Inter-Regular",
                  color: "#656565",
                  marginLeft: wp(3),
                  fontSize: hp(2.1),
                }}
              >
                Update Sports
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
              onPress={() => changeDelete()}
              style={{
                flexDirection: "row",
                marginTop: hp(2.5),
                marginHorizontal: wp(7),
              }}
            >
              <Delete height={23} width={23} />
  
              <Text
                style={{
                  fontFamily: "Inter-Regular",
                  color: "#656565",
                  marginLeft: wp(3),
                  fontSize: hp(2.1),
                }}
              >
                Delete Sports
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
        <CustomSnackbar
            message={'success'}
            messageDescription={'Video downloaded successfully'}
            onDismiss={dismissSnackbar} // Make sure this function is defined
            visible={snackbarVisible}
          />
      </GestureHandlerRootView>
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
      marginTop: hp(8),
      alignItems: "center",
      marginHorizontal: wp(8),
    },
    bottomView: {
      flex: 1,
      justifyContent: "flex-end",
      // You can add padding or content to this view as needed.
    },
    textProfileName: {
      color: "#FFFFFF",
      fontSize: hp(2),
      marginLeft: wp(3),
      fontFamily: "Inter",
      fontWeight: "bold",
    },
  
    buttonDirections: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: hp(4.3),
      width: "100%",
      marginLeft: wp(5),
      justifyContent: "space-evenly",
    },
    button: {
      borderColor: "#FACA4E",
      borderWidth: 0.8,
      borderRadius: wp(5),
      width: wp(35),
      height: hp(5.5),
      justifyContent: "center",
      alignItems: "center",
    },
    textButton: {
      color: "#FACA4E",
      fontWeight: "bold",
    },
    txtNotification: {
      fontWeight: "500",
      marginTop: hp(10),
      marginLeft: wp(5),
      fontSize: hp(2.3),
      color: "#0B0B0B",
    },
  });
  