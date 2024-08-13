import {
    StyleSheet,
    FlatList,
    Text,
    Image,
    StatusBar,
    PermissionsAndroid,
    ImageBackground,
    View,
    TouchableOpacity,
    ScrollView
  } from 'react-native';
  import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
  import {appImages} from '../../../assets/utilities/index';
  import DownArrowComments from '../../../assets/svg/DownArrowComments.svg';
  import UpArrowComments from '../../../assets/svg/UpArrowComments.svg';
  import {GestureHandlerRootView} from 'react-native-gesture-handler';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Share from 'react-native-share';
  
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  
  import IonIcons from 'react-native-vector-icons/Ionicons';
  
  import Video from 'react-native-video';
  
  import axios from 'axios';
  
  import RNFetchBlob from 'rn-fetch-blob';
  
  import Entypo from 'react-native-vector-icons/Entypo';
  import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import { base_url } from '../../../../../baseUrl';
  import EditItem from '../../../assets/svg/UpdateItem.svg';
  import Delete from '../../../assets/svg/Delete.svg';
  
  export default function ViewTopVideo({navigation, route}) {
    const [showFullContent, setShowFullContent] = useState(false);
    const identifier  = route.params.identifier;
    const [pastedURL, setPastedURL] = useState(
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    );

  
    const [mute, setMute] = useState(false);
  
    const [paused, setPaused] = useState(false);
  
    const [isOpen, setIsOpen] = useState(false);
  
    const [authToken, setAuthToken] = useState('');
  
    const [progress, setProgress] = useState(0);
  
    const [totalDuration, setTotalDuration] = useState('');
  
    const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  
    const ref_Comments = useRef(null);
  
    const refSlide = useRef();
  
    const bottomSheetRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);
  
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
        // Do something with formattedDuration, such as setting it in another state
        // setFormattedDuration(formattedDuration);
        // console.log('Formatted Duration:', formattedDuration);
  
        setTotalDuration(formattedDuration);
      }
    }, [progress]); // The effect will re-run whenever the progress state changes
  
    const receivedData = route.params?.videoData;
  
    console.log('Data Recieved on ViewVideo', receivedData);
  
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
      console.log('Is Open');
      setIsOpen(true);
      console.log('Is Open', isOpen);
    };
  
    const toggleMute = () => {
      setMute(!mute);
    };
  
    const togglePaused = () => {
      setPaused(!paused);
    };
    const shareViaWhatsApp = async () => {
      const shareOptions = {
        title: 'Share via',
        message: 'Hey! Check out this video!',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        //social: Share.Social,
      };
  
      try {
        await Share.open(shareOptions);
      } catch (error) {
        console.error('Error sharing via WhatsApp:', error.message);
      }
    };
  
    useEffect(() => {
      // Make the API request and update the 'data' state
      fetchAll();
    }, []);
  
    const fetchAll = async () => {
      // Simulate loading
      setLoading(true);
      // Fetch data one by one
  
      await getUserID();
      //await fetchComments();
      //await fetchLikes();
      //await fetchCommentsCounts();
  
      // Once all data is fetched, set loading to false
      setLoading(false);
    };
  
    const getUserID = async () => {
      // console.log("Id's");
      try {
        const result = await AsyncStorage.getItem('userId ');
        if (result !== null) {
          setUserId(result);
          // console.log('user id retrieved:', result);
        } else {
          console.log('user id null:', result);
        }
  
        const result1 = await AsyncStorage.getItem('authToken ');
        if (result1 !== null) {
          setAuthToken(result1);
  
          console.log('user token retrieved:', result1);
          await fetchComments(result1);
        } else {
          console.log('result is null', result);
        }
      } catch (error) {
        // Handle errors here
        console.error('Error retrieving user ID:', error);
      }
    };
  
    const fetchComments = async result => {
      const token = result;
  
      try {
        const response = await fetch(
          base_url + `xpi/getAllCommentsByVideo/${receivedData.video_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        if (response.ok) {
          const data = await response.json();
          //console.log("All Comments of usersssss", data.AllComents)
          setComments(data.AllComents);
          await fetchLikes(result);
        } else {
          console.error(
            'Failed to fetch categories:',
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const fetchLikes = async result => {
      const token = result;
  
      try {
        const response = await fetch(
          base_url + `xpi/getAllLikesByVideo/${receivedData.video_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        if (response.ok) {
          const data = await response.json();
          console.log('All Likes', data.totalLikes);
          setLikes(data.totalLikes);
          await fetchCommentsCounts(result);
        } else {
          console.error(
            'Failed to fetch categories:',
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const fetchCommentsCounts = async value => {
      const token = value;
  
      try {
        const response = await fetch(
          base_url + `xpi/getAllCommentsByVideo/${receivedData.video_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        if (response.ok) {
          const data = await response.json();
          //console.log("All Comments", data.totalComments);
          setCommentsCount(data.totalComments);
  
          await fetchSpecificVideo(value);
        } else {
          console.error(
            'Failed to fetch categories:',
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    //----------------------------------\\
  
    const fetchSpecificVideo = async result => {
      console.log('GET SPECIFIC VIDEO CALLED', result);
      const token = result;
  
      try {
        const response = await fetch(
          base_url + `xpi/getSpecificVideo/${receivedData?.video_id}?user_id=${userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        if (response.ok) {
          const data = await response.json();
          //console.log("All Comments of usersssss", data.AllComents)
          console.log('video Is liked or not>>>>>>>>', data.Video);
          // setShowLikes(data?.Video?.is_liked)
        } else {
          console.error(
            'Failed to fetch categories:',
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    //------------------------------------\\
  
    const dismissSnackbar = () => {
      setsnackbarVisible(false);
    };
  
    const handleUpdatePassword = async () => {
      // Perform the password update logic here
      // For example, you can make an API request to update the password
  
      // Assuming the update was successful
      // setsnackbarVisible(true);
  
      // Automatically hide the Snackbar after 3 seconds
      setTimeout(() => {
        setsnackbarVisible(false);
  
        if (pastedURL !== '') {
          requestStoragePermission();
        } else {
          //console.log("Please Add Video Url")
        }
  
        //navigation.goBack();
      }, 3000);
    };
  
    const clearTextInput = () => {
      //console.log('came to logssssss', commentText);
      // Clear the text in the TextInput
      setCommentText(null);
      sendComment();
    };
  
  
  
    const handlePick = emojiObject => {
      console.log('Emoji Object', emojiObject);
      //setIsOpen(false)
      setCommentText(emojiObject.emoji);
  
      /* example emojiObject = {
          "emoji": "❤️",
          "name": "red heart",
          "slug": "red_heart",
          "unicode_version": "0.6",
        }
      */
    };
  
    const sendComment = async () => {
      setLoading(true);
      const token = authToken; // Replace with your actual token
  
      try {
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
  
        const commentData = {
          video_id: receivedData.video_id,
          user_id: userId,
          comment: commentText,
        };
  
        const response = await axios.post(
          base_url + 'xpi/sendComment',
          commentData,
          axiosConfig,
        );
  
        console.log('Response', response);
  
        if (response.status === 200) {
          setLoading(false);
          console.log('Comment sent successfully');
          fetchAll();
        } else {
          setLoading(false);
          fetchAll();
          console.error(
            'Failed to send comment:',
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
      }
    };
  
    const sendLikes = async () => {
      setLoading(true);
      const token = authToken; // Replace with your actual token
  
      try {
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
  
        const commentData = {
          video_id: receivedData.video_id,
          user_id: userId,
        };
  
        const response = await axios.post(
          base_url + 'xpi/likeUnlikeVideo',
          commentData,
          axiosConfig,
        );
  
        console.log('Response', response);
  
        if (response.status === 200) {
          setLoading(false);
          console.log('Video Liked  successfully');
          fetchAll();
        } else {
          setLoading(false);
          fetchAll();
          console.error(
            'Failed to send comment:',
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
      }
    };
  
    const renderComments = item => {
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
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
            }}>
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
  
              {/* <Image
                style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
                source={appImages.profileImg}
              /> */}
            </View>
  
            <View
              style={{
                //flex: 1,
                marginLeft: wp(3),
                height: hp(5),
                //marginTop: hp(1),
                //borderWidth:3,
                justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Inter-Medium',
                  fontSize: hp(2.1),
                }}>
                {item.username}
              </Text>
  
              <Text
                style={{
                  color: '#4C4C4C',
                  fontFamily: 'Inter-Regular',
                  marginTop: hp(2.1),
                  fontSize: hp(1.6),
                }}>
                {item.comment}
              </Text>
  
              {false && (
                <TouchableOpacity
                  onPress={() => setShowReply(!showReply)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    //borderWidth:3,
                    height: hp(3),
                    width: wp(21),
                  }}>
                  {showReply === true ? (
                    <UpArrowComments />
                  ) : (
                    <DownArrowComments />
                  )}
  
                  <Text
                    style={{
                      color: '#FACA4E',
                      fontFamily: 'Inter-Regular',
                      marginLeft: wp(1.8),
                      fontSize: hp(1.6),
                    }}>
                    2
                  </Text>
  
                  <Text
                    style={{
                      color: '#FACA4E',
                      fontFamily: 'Inter-Regular',
                      marginLeft: wp(1.3),
                      fontSize: hp(1.6),
                    }}>
                    replies
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
  
          {showReply && (
            <View
              style={{
                justifyContent: 'space-evenly',
                height: hp(15),
                //borderWidth:3,
                marginLeft: wp(20),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: hp(6),
                  width: '100%',
                }}>
                <View
                  style={{
                    height: wp(10),
                    alignSelf: 'center',
                    resizeMode: 'hidden',
                    width: wp(10),
                    borderRadius: wp(10),
                  }}>
                  <Image
                    style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
                    source={appImages.profileImg}
                  />
                </View>
  
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Inter-Regular',
                      marginLeft: wp(1.8),
                      fontSize: hp(1.6),
                    }}>
                    Olivia Bennett
                  </Text>
  
                  <Text
                    style={{
                      color: '#4C4C4C',
                      fontFamily: 'Inter-Regular',
                      marginLeft: wp(2),
                      fontSize: hp(1.3),
                    }}>
                    I wish I had a friend group like this. You all are incredible!
                  </Text>
                </View>
              </View>
  
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: hp(6),
                  width: '100%',
                }}>
                <View
                  style={{
                    height: wp(10),
                    alignSelf: 'center',
                    resizeMode: 'hidden',
                    width: wp(10),
                    borderRadius: wp(10),
                  }}>
                  <Image
                    style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
                    source={appImages.profileImg}
                  />
                </View>
  
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Inter-Regular',
                      marginLeft: wp(1.8),
                      fontSize: hp(1.6),
                    }}>
                    Olivia Bennett
                  </Text>
  
                  <Text
                    style={{
                      color: '#4C4C4C',
                      fontFamily: 'Inter-Regular',
                      marginLeft: wp(2),
                      fontSize: hp(1.3),
                    }}>
                    I wish I had a friend group like this. You all are incredible!
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      );
    };
  
    const videos = require('../../../assets/images/DummyVideo.mp4'); // Reference your asset file here
  
    const requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Downloader App Storage Permission',
            message:
              'Downloader App needs access to your storage ' +
              'so you can download files',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile();
        } else {
          console.log('storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
  
    function formatDuration(durationInSeconds) {
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = Math.floor(durationInSeconds % 60);
  
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
  
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  
    // const openComments = () => {
    //   setPaused(true);
    //   setIsBottomSheetExpanded(!isBottomSheetExpanded);
    // };
    const openComments = () => {
      setIsBottomSheetExpanded(!isBottomSheetExpanded);
      refCommentsSheet.current.open();
    };
  
    const downloadFile = () => {
      const {config, fs} = RNFetchBlob;
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
            '/download_' +
            Math.floor(date.getDate() + date.getSeconds() / 2) +
            '.mp4',
          description: 'file download',
        },
      })
        .fetch('GET', receivedData.video, {
          //some headers ..
        })
        .then(res => {
          setsnackbarVisible(true)
          // the temp file path
          console.log('The file saved to ', res.path());
        });
    };
  
    const changeModal = () => {
      ref_RBSheetCamera.current.close();
      // navigation.replace('UpdateVideoProfile', {Video: receivedData});
      navigation.replace('UploadUpdateVideoScreen', {Video: receivedData, apiEndpoint: 'xpi/updateXpiVideo'});
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
          base_url + `xpi/deleteXpiVideo/${receivedData?.video_id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              // Include any additional headers as needed
            },
            // You may include a request body if required by the server
            // body: JSON.stringify({}),
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
    //----------------------------------\\
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1}}>
          {!isBottomSheetExpanded && paused === true && (
            <View
              style={{
                position: 'absolute',
                top: '50%',
                left: '48%',
                zIndex: 1,
              }}>
              <AntDesign name={'pause'} size={35} color={'#FACA4E'} />
            </View>
          )}
  
          <TouchableOpacity
            onPress={() => togglePaused()}
            style={styles.backgroundVideo}>
            <Video
              resizeMode="cover" // Use "cover" to make it cover the entire screen
              repeat={true} // You can set other video props as needed
              ref={refSlide}
              muted={mute}
              paused={paused}
              source={{
                uri: receivedData.video,
              }}
              style={{height: '100%', width: '100%'}}
              onProgress={x => {
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
              <IonIcons name={'chevron-back'} color={'white'} size={25} />
            </TouchableOpacity>
  
            <Image
              source={appImages.logoTransparent}
              style={{height: hp(15), width: wp(35), marginLeft: wp(23)}}
              resizeMode="contain"
            />
  
    
          </View>
          <View style={styles.bottomView}>
          <View style={{height: hp(20), marginHorizontal: wp(8)}}>
          

            <ScrollView
              showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
              style={{flex: 1, marginLeft: wp(5), marginTop: hp(1)}}
              contentContainerStyle={{verticalLine: false}}>
                 <Text style={styles.textProfileName}>
                {receivedData.name}
              </Text>
              <Text
                style={{
                  marginTop: hp(1),
                  fontFamily: 'Inter',
                  fontSize: hp(1.8),
                  lineHeight: hp(2.1),
                  color: '#FFFFFF',
                }}>
                {showFullContent
                  ? details
                  : details.length > 90
                  ? details.substring(0, 90) + '...'
                  : details.slice(0)}
              </Text>

              <TouchableOpacity onPress={toggleContent}>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontSize: hp(1.8),
                    color: '#FACA4E',
                  }}>
                  {details.length > 90
                    ? showFullContent
                      ? 'See Less'
                      : 'See More'
                    : null}
                </Text>
              </TouchableOpacity>
            </ScrollView>
           
          </View>
        </View>
          </View>
  
         
        {/* //-----------------------\\ */}
      </GestureHandlerRootView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      height: hp(15),
      marginTop: hp(3),
      alignItems: 'center',
      marginHorizontal: wp(8),
    },
    bottomView: {
      flex: 1,
      justifyContent: 'flex-end',
      // You can add padding or content to this view as needed.
    },
    textProfileName: {
      color: '#FFFFFF',
      fontSize: hp(2),
      marginLeft: wp(.2),
      fontFamily: 'Inter',
      fontWeight: 'bold',
    },
    backgroundVideo: {
      position: 'absolute',
      flex: 1,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
  