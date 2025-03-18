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
  Modal,
  Alert,
  Platform
} from 'react-native';
import React, {useState, useRef, useMemo, useEffect} from 'react';
import {appImages} from '../../../assets/utilities/index';
import ButtonSend from '../../../assets/svg/ButtonSend.svg';
import EmojiPicker from 'rn-emoji-keyboard';
import DownArrowComments from '../../../assets/svg/DownArrowComments.svg';
import UpArrowComments from '../../../assets/svg/UpArrowComments.svg';

import SmileEmoji from '../../../assets/svg/SmileEmoji.svg';

import Share from 'react-native-share';

import axios from 'axios';

import RNFetchBlob from 'rn-fetch-blob';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Headers from '../../../assets/Custom/Headers';
import { base_url } from '../../../../../baseUrl';
import RBSheet from "react-native-raw-bottom-sheet";
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import Loader from '../../../assets/Custom/Loader';

import { useTranslation } from 'react-i18next';
export default function ViewNews({navigation, route}) {
  const [showFullContent, setShowFullContent] = useState(false);

  const [pastedURL, setPastedURL] = useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  );
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);

  const [likes, setLikes] = useState(null);

  const [commentsCount, setCommentsCount] = useState(null);

  const [showReply, setShowReply] = useState(false);

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState('');

  const [showMenu, setShowMenu] = useState(false);

  const [progress, setProgress] = useState(0);

  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const ref_Comments = useRef(null);

  const [authToken, setAuthToken] = useState([]);

  const refSlide = useRef();

  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [commentText, setCommentText] = useState(null); // State variable to hold the text

  const [showLikes, setShowLikes] = useState(false);
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

  const openEmoji = () => {
    setIsOpen(true);
  };

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);
        console.log('user id retrieved:', result);
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

  const fetchComments = async value => {
    const token = value;

    try {
      const response = await fetch(
        base_url + `news/getAllCommentsByNews/${receivedData?.news_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log("All Comments of usersssss", data.AllComments)
        setComments(data.AllComments || []);

        await fetchLikes(value);
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

  const fetchLikes = async values => {
    const token = values;

    try {
      const response = await fetch(
        base_url + `news/getAllLikesByNews/${receivedData?.news_id}`,
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
        fetchCommentsCounts(values);
        //setLikes(data.totalLikes);
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

  const fetchCommentsCounts = async values => {
    const token = values;

    try {
      const response = await fetch(
        base_url + `news/getAllCommentsByNews/${receivedData?.news_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log('All Comments', data.totalComments);
        setCommentsCount(data.totalComments);
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
    const handleDownload = async () => {
      if (!pastedURL) {
        console.log('Please Add Video URL');
        return;
      }
  
      // Check if permission is already granted
      const permissionGranted = await checkStoragePermission();
      if (permissionGranted) {
        downloadFile();
      }
    };
    const checkStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
  
        if (granted) {
          return true; // Permission already granted
        } else {
          return await requestForStoragePermission();
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    };
  
    const requestForStoragePermission = async () => {
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
          }
        );
  
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
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
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);

      if (pastedURL !== '') {
        requestStoragePermission();
      } else {
        console.log('Please Add Video Url');
      }

      //navigation.goBack();
    }, 3000);
  };

  const clearTextInput = () => {
    console.log('came to logssssss', commentText);
    // Clear the text in the TextInput
    setCommentText(null);
    sendComment();
  };

  const chats = [
    {
      id: 1,
      name: 'John Doe',
      message: 'The laughter in this video is contagious!',
      reply: false,
    },
    {
      id: 2,
      name: 'Olivia Bennett',
      message: 'I wish I had a friend group like this. You all are incredible!',
      reply: false,
    },
    {
      id: 3,
      name: 'Ethan Rodriguez',
      message:
        'This video just made my day! Thanks for sharing your awesome moments.',
      reply: false,
    },
    {
      id: 4,
      name: 'Mia Bennett',
      message: 'Friendship goals right there! Love how close you all are',
      reply: false,
    },
    {
      id: 5,
      name: 'Liam Sullivan',
      message:
        'Looks like you guys are having an absolute blast! Wish I could join in on the fun',
      reply: false,
    },
  ];

  const sendComment = async () => {
    setLoading(true);
    console.log('Set Loading ', loading);
    const token = authToken; // Replace with your actual token

    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const commentData = {
        NEWS_id: receivedData?.news_id,
        user_id: userId,
        comment: commentText,
      };

      const response = await axios.post(
        base_url + 'news/sendComment',
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

  const sendLikes = async () => {
    console.log('likes Token', authToken);
    console.log('User Id', userId);
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
        NEWS_id: receivedData?.news_id,
        user_id: userId,
      };

      const response = await axios.post(
        base_url + 'news/likeUnlikeNews',
        commentData,
        axiosConfig,
      );

      console.log('Response', response);

      if (response.status === 200) {
        setLoading(false);
        console.log('News Liked  successfully');
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
    console.log('Items of comments', item);
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewElseProfile', {id: receivedData?.user_id})
          }
          style={{
            height: hp(10),
            //borderWidth:3,
            paddingHorizontal: wp(5),
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
          }}>
          {item?.userimage ? (
            <View
              style={{
                height: wp(12),
                alignSelf: 'center',
                overflow: 'hidden',
                width: wp(12),
                borderRadius: wp(14) / 2, // Make it round by setting borderRadius to half the width and height
              }}>
              <Image
                style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
                source={{uri: item?.userimage}}
              />
            </View>
          ) : (
            <View
              style={{
                height: wp(14),
                alignSelf: 'center',
                resizeMode: 'hidden',
                width: wp(14),
                borderRadius: wp(14),
              }}>
              <MaterialCommunityIcons
                name={'account-circle'}
                size={50}
                color={'#FACA4E'}
              />
            </View>
          )}

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
                <MaterialCommunityIcons
                  name={'account-circle'}
                  size={30}
                  color={'#FACA4E'}
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
          '.JPG',
        description: 'file download',
      },
    })
      .fetch('GET', receivedData?.image, {
        //some headers ..
      })
      .then(res => { 
        setsnackbarVisible(true);
        // the temp file path
        console.log('The file saved to ', res.path());
      });
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleContentLike = () => {
    setShowLikes(!showLikes);
    sendLikes();
  };

  const receivedData = route.params?.picData;

  console.log('Data Recieved on news', receivedData);
  //news_id
  // var details = receivedData?.description;
  const details = receivedData?.description || '';

  const shareViaWhatsApp = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Hey! Check out this cool app!',
      url: 'https://play.google.com/store/apps/details?id=your.app.package',
      //social: Share.Social,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error.message);
    }
  };

  const [backgroundColor, setBackgroundColor] = useState('white');

  const openComments = () => {
    setIsBottomSheetExpanded(!isBottomSheetExpanded);
    refCommentsSheet.current.open();
  };
  const toggleBottomSheet = () => {
    setIsBottomSheetExpanded(!isBottomSheetExpanded);
    setBackgroundColor(isBottomSheetExpanded ? 'white' : 'gray');
  };

  const [modalVisible, setModalVisible] = useState(false);
  const handleImagePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={{flex: 1}}>
      {loading && <Loader />}
      <View style={{flex: 1, backgroundColor: backgroundColor}}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content" // You can set the StatusBar text color to dark or light
        />

        <View style={{marginTop: hp(5)}}>
          <Headers
            showBackIcon={true}
            showText={true}
            text={t('OnNewsDetails')}
            onPress={() => navigation.goBack()}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: hp(6.5),
            marginTop: hp(5),
            marginLeft: wp(8),
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ViewElseProfile', {
                id: receivedData?.user_id,
              })
            }
            style={{
              height: wp(10),
              alignSelf: 'center',
              overflow: 'hidden',
              width: wp(10),
              borderRadius: wp(10) / 2,
            }}>
            {receivedData?.user_image === null ? (
              <MaterialCommunityIcons
                name={'account-circle'}
                size={35}
                color={'#FACA4E'}
              />
            ) : (
              <Image
                style={{
                  width: '100%',
                  borderRadius: wp(10) / 2,
                  height: '100%',
                }}
                source={{uri: receivedData?.user_image}}
              />
            //   <View style={{ position: 'relative' }}>
            //   <Image
            //     style={{
            //       width: '100%',
            //       borderRadius: wp(10) / 2,
            //       height: '100%',
            //     }}
            //     source={{ uri: receivedData?.userimage }}
            //   />
            //     <View
            //       style={{
            //         position: 'absolute',
            //         top: 0,
            //         bottom: 0,
            //         left: 0,
            //         right: 0,
            //         borderRadius: wp(10) / 2,
            //       }}
            //     />
        
            // </View>
            )}
          </TouchableOpacity>

          <Text style={styles.textProfileName}>{receivedData?.username}</Text>
        </View>

        {/*   <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcons name={'chevron-back'} color={'white'} size={25} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(6.5),
              marginLeft: hp(10),
            }}>
            <View
              style={{
                height: wp(10),
                alignSelf: 'center',
                overflow: 'hidden',
                width: wp(10),
                borderRadius: wp(10) / 2,
              }}>
              {receivedData?.userimage === null ? (
                <MaterialCommunityIcons
                name={'account-circle'}
                size={35}
                color={'#FACA4E'}
              />
              ) : (
                <Image
                  style={{
                    width: '100%',
                    borderRadius: wp(10) / 2,
                    height: '100%',
                  }}
                  source={{uri: receivedData?.userimage}}
                />
              )}
            </View>

            <Text style={styles.textProfileName}>{receivedData?.username}</Text>
          </View>
        </View> */}

        <View style={{height: hp(5)}}>
          <ScrollView
            showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
            style={{flex: 1}}
            contentContainerStyle={{
              verticalLine: false,
              marginHorizontal: wp(8),
            }}>
            <Text
              style={{
                marginTop: hp(1),
                fontFamily: 'Inter',
                fontSize: hp(1.8),
                lineHeight: hp(2.1),
                color: 'black',
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

        <TouchableOpacity onPress={handleImagePress}
          style={{
            marginHorizontal: wp(8),
            overflow: 'hidden',
            marginTop: hp(3),
            flex: 1,
            borderRadius: wp(5),
            // borderWidth: 3,
            //borderColor: 'blue',
          }}>
          <Image
            source={{uri: receivedData?.image}}
            style={{width: '100%', height: '100%'}}
          />
        </TouchableOpacity>

        <View style={styles.bottomView}>
          <View style={{height: hp(20)}}>
            {/*  <View style={{height: 1, backgroundColor: '#FFFFFF52'}}></View> */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: hp(8),
                marginHorizontal: wp(12),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp(14),
                  height: hp(5),
                }}>
                <TouchableOpacity onPress={toggleContentLike}>
                  {showLikes ? (
                    <MaterialCommunityIcons
                      color={'#FACA4E'}
                      name={'cards-heart'}
                      size={25}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      color={'#FACA4E'}
                      name={'cards-heart-outline'}
                      size={25}
                    />
                  )}
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontSize: hp(1.5),
                    color: 'black',
                  }}>
                  {likes}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp(12),
                  height: hp(5),
                }}>
                <TouchableOpacity
                //  onPress={toggleBottomSheet}>
                  onPress={() => openComments()}>
                  <MaterialCommunityIcons
                    color={'#FACA4E'}
                    name={'comment-processing-outline'}
                    size={25}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontSize: hp(1.5),
                    color: 'black',
                  }}>
                  {commentsCount}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: wp(10),
                  height: hp(5),
                }}>
                <TouchableOpacity onPress={() => shareViaWhatsApp()}>
                  <MaterialCommunityIcons
                    color={'#FACA4E'}
                    name={'share-variant'}
                    size={25}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: wp(10),
                  height: hp(5),
                }}>
                      <TouchableOpacity onPress={handleDownload}>
                {/* <TouchableOpacity onPress={() => handleUpdatePassword()}> */}
                  <MaterialCommunityIcons
                    color={'#FACA4E'}
                    name={'download'}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal}>
            <Image
              style={styles.modalImage}
              source={{uri: receivedData?.image}}
            />
          </TouchableOpacity>
        </View>
      </Modal>
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
                <Text style={{color:'black'}}>{t('NoCommentsYet')}</Text>
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

          {/* {loading && (
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
          )} */}
          {loading && <Loader />}

          {isBottomSheetExpanded === false ? (
            <View
              style={{
                width: "100%",
                position: "absolute",
                bottom: 0,
                left: 0,
                backgroundColor: "#fff",
                flexDirection: "row",
                alignItems: "center",
                height: hp(Platform.OS =="ios"? 16:8),
                paddingVertical:20
                
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
                color='black'
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
                  color='black'
                  style={{ flex: 1, marginLeft: wp(1) }}
                />
                <TouchableOpacity
                  style={{ marginRight: wp(3) }}
                  onPress={() => clearTextInput()}
                >
                  <ButtonSend />
                </TouchableOpacity>
              </View>
            )
          )}

          {/* ///////////////////////// */}
        </RBSheet>
      {/* <BottomSheet
        ref={ref_Comments}
        index={isBottomSheetExpanded ? 0 : -1} // Set to -1 to start with collapsed state
        snapPoints={['65%', '90%']} // Adjust snap points as needed
        onScroll={event => {
          console.log('Event', event);
          const offsetY = event.nativeEvent.contentOffset.y;
          if (isBottomSheetExpanded && offsetY === 0) {
            setIsBottomSheetExpanded(false);
          } else if (!isBottomSheetExpanded && offsetY > 0) {
            setIsBottomSheetExpanded(true);
          }
        }}
        //snapPoints={snapPoints}
        //onChange={handleSheetChange}
        height={210}
        openDuration={250}
        closeOnDragDown={true}
        draggableIcon={false}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            paddingTop: 0,
            padding: 20,
            zIndex: 999,
            backgroundColor: 'white',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
        }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: hp(5),
          }}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Inter-Bold',
              fontSize: hp(2.3),
            }}>
            Comments
          </Text>
        </View>

        <View style={{marginTop: hp(1), flex: 1}}>
          <BottomSheetFlatList
            data={comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => renderComments(item)}
            extraData={loading}
          />
        </View>

        {showReply === false ? (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(8),
            }}>
            <TouchableOpacity
              style={{
                height: hp(8),
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(14),
              }}>
              <SmileEmoji />
            </TouchableOpacity>

            <TextInput
              value={commentText} // Bind the value to the state variable
              onChangeText={text => setCommentText(text)} // Update state on text change
              placeholderTextColor={'#848484'}
              placeholder="Write Comment Heressssss"
              style={{flex: 1, marginLeft: wp(1)}}
            />

            <TouchableOpacity onPress={() => clearTextInput}>
              <ButtonSend />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(8),
            }}>
            <TouchableOpacity
              onPress={() => openEmoji()}
              style={{
                height: hp(8),
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(14),
              }}>
              <SmileEmoji />
            </TouchableOpacity>

            <TextInput
              value={commentText} // Bind the value to the state variable
              onChangeText={text => setCommentText(text)} // Update state on text change
              placeholderTextColor={'#848484'}
              placeholder="Add a reply"
              style={{flex: 1, marginLeft: wp(1)}}
            />

            <TouchableOpacity onPress={() => clearTextInput()}>
              <ButtonSend />
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet> */}

      {isOpen === true ? (
        <EmojiPicker
          onEmojiSelected={handlePick}
          open={true}
          onClose={() => setIsOpen(false)}
        />
      ) : null}

      {/* {isBottomSheetExpanded && showReply === false ? (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            height: hp(8),
          }}>
          <TouchableOpacity
            onPress={() => openEmoji()}
            style={{
              height: hp(8),
              justifyContent: 'center',
              alignItems: 'center',
              width: wp(14),
            }}>
            <SmileEmoji />
          </TouchableOpacity>

          <TextInput
            value={commentText} // Bind the value to the state variable
            onChangeText={text => setCommentText(text)} // Update state on text change
            placeholderTextColor={'#848484'}
            placeholder="Write Comment Here"
            style={{flex: 1, marginLeft: wp(1)}}
          />

          <TouchableOpacity onPress={() => clearTextInput()}>
            <ButtonSend />
          </TouchableOpacity>
        </View>
      ) : (
        isBottomSheetExpanded && (
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(8),
            }}>
            <TouchableOpacity
              style={{
                height: hp(8),
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(14),
              }}>
              <SmileEmoji />
            </TouchableOpacity>

            <TextInput
              value={commentText} // Bind the value to the state variable
              onChangeText={text => setCommentText(text)} // Update state on text change
              placeholderTextColor={'#848484'}
              placeholder="Add a reply"
              style={{flex: 1, marginLeft: wp(1)}}
            />

            <TouchableOpacity onPress={() => clearTextInput()}>
              <ButtonSend />
            </TouchableOpacity>
          </View>
        )
      )} */}

  
      <CustomSnackbar
          message={t('Success')}
          messageDescription={t('Newsdownloadedsuccessfully')} 
          onDismiss={dismissSnackbar} // Make sure this function is defined
          visible={snackbarVisible}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: hp(6.2),
    marginTop: hp(8),
    alignItems: 'center',
    marginHorizontal: wp(8),
  },
  bottomView: {
    flex: 1,
    marginTop: hp(3),
    //justifyContent: 'flex-end',
    // You can add padding or content to this view as needed.
  },
  textProfileName: {
    color: 'black',
    fontSize: hp(2),
    marginLeft: wp(3),
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
