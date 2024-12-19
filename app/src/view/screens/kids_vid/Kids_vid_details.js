import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ScrollView,
  Platform,
  ActivityIndicator,
  TextInput,
  StatusBar,
  PermissionsAndroid,
  ImageBackground,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { appImages } from "../../../assets/utilities/index";
import VolumeUp from "../../../assets/svg/VolumeUp.svg";
import Like from "../../../assets/svg/Like.svg";
import UnLike from "../../../assets/svg/Unlike.svg";
import Send from "../../../assets/svg/Send.svg";
import Download from "../../../assets/svg/Download.svg";
import Comment from '../../../assets/svg/Comment.svg';
import DownArrowComments from "../../../assets/svg/DownArrowComments.svg";
import UpArrowComments from "../../../assets/svg/UpArrowComments.svg";
import EditItem from '../../../assets/svg/UpdateItem.svg';
import Delete from '../../../assets/svg/Delete.svg';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Share from "react-native-share";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import RBSheet from "react-native-raw-bottom-sheet";
import FontAwsome from "react-native-vector-icons/FontAwesome";

import AntDesign from "react-native-vector-icons/AntDesign";

import IonIcons from "react-native-vector-icons/Ionicons";

import ButtonSend from "../../../assets/svg/ButtonSend.svg";

import Video from "react-native-video";

import SmileEmoji from "../../../assets/svg/SmileEmoji.svg";

import EmojiPicker from "rn-emoji-keyboard";
import Slider from '@react-native-community/slider';
import axios from "axios";

import RNFetchBlob from "rn-fetch-blob";
import { useIsFocused } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { base_url } from "../../../../../baseUrl";
import Loader from "../../../assets/Custom/Loader";
import { useTranslation } from 'react-i18next';

export default function Kids_vid_details({ navigation, route }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const identifier  = route.params.identifier;
  const [pastedURL, setPastedURL] = useState(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  );
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);

  const [likes, setLikes] = useState(null);

  const [mute, setMute] = useState(false);

  const [paused, setPaused] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [authToken, setAuthToken] = useState("");

  const [commentsCount, setCommentsCount] = useState(null);

  const [showReply, setShowReply] = useState(false);

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState("");

  const [showLikes, setShowLikes] = useState(false);

  const [progress, setProgress] = useState(0);

  const [totalDuration, setTotalDuration] = useState("");

  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const isFocused = useIsFocused();

  const refSlide = useRef();
  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [commentText, setCommentText] = useState(null); // State variable to hold the text
  const refCommentsSheet = useRef();

  const [snackbarDeleteVisible, setsnackbarDeleteVisible] = useState(false);
  const ref_RBSheetCamera = useRef(null);

  useEffect(() => {
    // This code will run whenever progress state changes
    if (progress && progress.seekableDuration !== undefined) {
      // Assuming progress.seekableDuration is the duration in seconds
      const formattedDuration = formatDuration(progress.seekableDuration);
      setTotalDuration(formattedDuration);
    }
  }, [progress]); // The effect will re-run whenever the progress state changes

  const receivedData = route.params?.videoData;
  var details = receivedData.description;
  /* 'Hold onto your seats and get ready to be mesmerized by the beauty and grandeur of the Hold onto your seats'; */

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleContentLike = () => {
    setShowLikes(!showLikes);
    sendLikes();
  };

  const openEmoji = () => {
    setIsOpen(true);
  };

  const toggleMute = () => {
    setMute(!mute);
  };

  const togglePaused = () => {
    setPaused(!paused);
  };
  const shareViaWhatsApp = async () => {
    const shareOptions = {
      title: "Share via",
      message: "Hey! Check out this video!",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      //social: Share.Social,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.error("Error sharing via WhatsApp:", error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchAll();
    }
  }, [isFocused]);

  const fetchAll = async () => {
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
        console.log("user id null:", result);
      }

      const result1 = await AsyncStorage.getItem("authToken ");
      if (result1 !== null) {
        setAuthToken(result1);
        await fetchComments(result1);
      } else {
        console.log("result is null", result);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  const fetchComments = async (result) => {
    const token = result;

    try {
      const response = await fetch(
        base_url +
          `kidVids/getComments/${receivedData.video_id}?page=1&limit=100000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCommentsCount(data.totalComments);
        setComments(data.comments);
      } else {
        console.error(
          "Failed to fetch comments:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const changeModal = () => {
    ref_RBSheetCamera.current.close();
    navigation.replace('UpdateContent', {Video: receivedData, apiEndpoint: 'kidVids/update' , categoryapiEndpoint: 'kidVids/category/getAll', subcategoryapiEndpoint: 'kidVids/sub_category/getAllByCategory?category_id='});
  };

  const changeDelete = () => {
    ref_RBSheetCamera.current.close();
    handleUpdateDelete();
  };

  const handleUpdateDelete = async () => {
    const token = authToken;
    try {
      const response = await fetch(
        base_url + `kidVids/delete/${receivedData?.video_id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            // Include any additional headers as needed
          },

        },
      );

      if (response.ok) {
        handleUpdateDeletePassword();
        // Optionally handle the response data here
      } else {
        console.error(
          `Error deleting video with ID ${receivedData?.video_id}:`,
          response.status,
        );
        // Optionally handle the error response here
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors such as network issues
    }
  };

  const dismissDeleteSnackbar = () => {
    setsnackbarDeleteVisible(false);
  };
  const handleUpdateDeletePassword = async () => {
    setsnackbarDeleteVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarDeleteVisible(false);
      navigation.navigate('ViewProfile');
      //navigation.goBack();
    }, 3000);
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const handleUpdatePassword = async () => {
    setTimeout(() => {
      setsnackbarVisible(false);

      if (pastedURL !== "") {
        requestStoragePermission();
      } else {
      }

    }, 3000);
  };

  const clearTextInput = () => {
    setCommentText(null);
    sendComment();
  };

  const handlePick = (emojiObject) => {
    console.log("Emoji Object", emojiObject);
    setCommentText(emojiObject.emoji);
  };

  const sendComment = async () => {
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
        video_id: receivedData.video_id,
        user_id: userId,
        comment: commentText,
      };

      const response = await axios.post(
        base_url + "kidVids/addComment",
        commentData,
        axiosConfig
      );

      if (response.status === 200) {
        setLoading(false);
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
            user_id: userId,
            video_id: receivedData.video_id,
        };

        const response = await axios.post(
            base_url + "kidVids/toggleLikeVideo",
            commentData,
            axiosConfig
        );
        if (response.status === 200 || response.status === 201) {
            setLoading(false);
            fetchAll();
        } else {
            setLoading(false);
            fetchAll();
            console.error(
                "Failed to send likes:",
                response.status,
                response.statusText
            );
        }
    } catch (error) {
        setLoading(false);
        console.error("Error:", error);
    }
};

  const renderComments = (item) => {

    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ViewElseProfile", { id: item?.user_id })
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
                {item?.user_image ? (
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: hp(13) / 2,
                      resizeMode:'cover'
                    }}
                    source={{ uri: item.user_image }}
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
              marginLeft: wp(3),
              height: hp(5),
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

  function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const openComments = () => {
    setIsBottomSheetExpanded(!isBottomSheetExpanded);
    refCommentsSheet.current.open();
  };

  const downloadFile = () => {
    const { config, fs } = RNFetchBlob;
    const date = new Date();
    const fileDir = fs.dirs.DownloadDir;
    config({
      // add this option that makes response data to be stored as a file,

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
      .fetch("GET", receivedData.video, {
        //some headers ..
      })
      .then((res) => {
        setsnackbarVisible(true);
        // the temp file path
        // alert('file downloaded successfully ');
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        // Handle errors if necessary
      });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
     {loading && <Loader />}
      <View style={{ flex: 1 }}>
        {/* Add the play button View */}
        {!isBottomSheetExpanded && paused === true && (
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "48%",
              zIndex: 1,
            }}
          >
            <AntDesign name={"pause"} size={35} color={"#FACA4E"} />
          </View>
        )}

        <TouchableOpacity
          onPress={() => togglePaused()}
          style={styles.backgroundVideo}
        >
          <Video
            resizeMode="cover" // Use "cover" to make it cover the entire screen
            repeat={true} // You can set other video props as needed
            ref={refSlide}
            muted={mute}
            paused={paused}
            source={{
              uri: receivedData.video,
            }}
            style={{ height: "100%", width: "100%" }}
            onProgress={(x) => {
              // console.log('Current Progress', x);
              setProgress(x);
            }}
          />
        </TouchableOpacity>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content" // You can set the StatusBar text color to dark or light
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcons name={"chevron-back"} color={"white"} size={25} />
          </TouchableOpacity>

          <Image
            source={appImages.logoTransparent}
            style={{ height: hp(15), width: wp(35), marginLeft: wp(23) }}
            resizeMode="contain"
          />

{/* COmment one by me */}
{identifier ? ( 
        <TouchableOpacity
              onPress={() => ref_RBSheetCamera.current.open()}
              style={{marginLeft: wp(18), marginTop: hp(1)}}>
              <Entypo name={'dots-three-vertical'} size={18} color={'white'} />
            </TouchableOpacity>
      ) : (
     <View/>
      )}
      {/* End==== */}
         
        </View>
        {/* Comment 2 by me */}

        <View style={styles.bottomView}>
          <View style={{ height: hp(30), marginHorizontal: wp(8) }}>
          <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: hp(5),
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewElseProfile", {
                    id: receivedData?.user_id,
                  })
                }
                style={{
                  height: '100%',
                  width:'13%',
                  borderRadius: hp(6) / 2,
                  marginLeft: wp(3),
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {receivedData?.user_image ? (
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: hp(6) / 2,
                      resizeMode:'cover'
                    }}
                    source={{ uri: receivedData.user_image }}
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

              <Text style={styles.textProfileName}>
                {receivedData.username}
              </Text>
            </View>
          
            <View style={{ width: "80%", marginHorizontal: wp(5),marginTop:4  }}>
                  <Text ellipsizeMode="tail"
                numberOfLines={2} style={[styles.textProfileName, { marginLeft: 0,}]}>
                    {receivedData.name}
                  </Text>
                </View>

            <ScrollView
              showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
              style={{ flex: 1, marginLeft: wp(5), marginTop: hp(1) }}
              contentContainerStyle={{ verticalLine: false }}
            >
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: 'space-evenly',
                height: hp(5),
              }}
            >
              <View
                style={{
                  height: hp(2),
                  width: wp(65),
                  justifyContent: "center",
                }}
              >
                <Slider
                  value={progress.currentTime}
                  minimumValue={0}
                  thumbTintColor="#FACA4E"
                  maximumValue={progress.seekableDuration}
                  minimumTrackTintColor={"#FACA4E"}
                  maximumTrackTintColor={"#F6F6F6"}
                  onValueChange={(x) => {
                    refSlide.current.seek(x);
                  }}
                />
              </View>

              {totalDuration !== "" ? (
                <Text
                  style={{
                    fontFamily: "Inter",
                    fontSize: hp(1.5),
                    color: "#FFFFFF",
                  }}
                >
                  {totalDuration}
                </Text>
              ) : null}
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(5),
                  width: wp(5),
                }}
                onPress={() => toggleMute()}
              >
                {mute === false ? (
                  <FontAwsome name={"volume-up"} size={18} color={"#FACA4E"} />
                ) : (
                  <FontAwsome name={"volume-off"} size={18} color={"#FACA4E"} />
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: hp(8),
                paddingLeft:10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: wp(15),
                  //borderWidth:3,
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
                    fontFamily: "Inter-Regular",
                    fontSize: hp(1.7),
                    marginRight: wp(3),
                    color: "#FFFFFF",
                  }}
                >
                  {receivedData.total_likes}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => openComments()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: wp(15),
                  height: hp(5),
                }}
              >
                <TouchableOpacity onPress={() => openComments()}>
                  <Comment height={21} width={21} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: "Inter-Regular",
                    fontSize: hp(1.7),
                    color: "#FFFFFF",
                  }}
                >
                  {commentsCount}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(15),
                  height: hp(5),
                }}
              >
                <TouchableOpacity onPress={() => shareViaWhatsApp()}>
                  <Send height={20} width={20} />
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
                  <Download height={20} width={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* End===== */}

        <CustomSnackbar
          message={t('Success')}
          messageDescription={t('VideoDownloadedSuccessfully')}
          onDismiss={dismissSnackbar} // Make sure this function is defined
          visible={snackbarVisible}
        />

   
{/* Comment 3 by me */}
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
              {t('Comments')}
              {/* Comments */}
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
                <Text>{t('NoCommentsYet')}</Text>
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
                placeholder={t('WriteCommentHere')}
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
                  placeholder={t('WriteCommentHere')}
                  style={{ flex: 1, marginLeft: wp(1) }}
                />
                <TouchableOpacity style={{ marginRight: wp(3) }} onPress={() => clearTextInput()}>
                  <ButtonSend />
                </TouchableOpacity>
              </View>
            )
          )}

       
        </RBSheet>
{/*End====*/}

        {isOpen === true ? (
          <EmojiPicker
            onEmojiSelected={handlePick}
            open={true}
            onClose={() => setIsOpen(false)}
          />
        ) : null}

     
      </View>
       {/* //-----------------\\ */}
       <RBSheet
        ref={ref_RBSheetCamera}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(25),
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(8),
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              color: '#303030',
              fontSize: hp(2.3),
            }}>
               {t('SelectAnOption')}
            {/* Select an option */}
          </Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <IonIcons
              name="close"
              size={22}
              color={'#303030'}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'space-evenly',
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => changeModal()}
            style={{flexDirection: 'row', marginHorizontal: wp(7)}}>
            <EditItem height={23} width={23} />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
                {t('UpdateVideo')}
              {/* Update Video */}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: hp(0.1),
              marginHorizontal: wp(8),
              marginTop: hp(3),
              backgroundColor: '#00000012',
            }}></View>

          <TouchableOpacity
            onPress={() => changeDelete()}
            style={{
              flexDirection: 'row',
              marginTop: hp(2.5),
              marginHorizontal: wp(7),
            }}>
            <Delete height={23} width={23} />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
                {t('DeleteVideo')}
              {/* Delete Video */}
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <CustomSnackbar
          message={t('Success')}
          messageDescription={t('VideoDeletedSuccessfully')}
          onDismiss={dismissDeleteSnackbar} // Make sure this function is defined
          visible={snackbarDeleteVisible}
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
    height: hp(15),
    marginTop: hp(3),
    alignItems: "center",
    marginHorizontal: wp(8),
  },
  bottomView: {
    position:'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textProfileName: {
    color: "#FFFFFF",
    fontSize: hp(2),
    marginLeft: wp(3),
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  backgroundVideo: {
    position: "absolute",
    flex: 1,
    // zIndex:1000,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
