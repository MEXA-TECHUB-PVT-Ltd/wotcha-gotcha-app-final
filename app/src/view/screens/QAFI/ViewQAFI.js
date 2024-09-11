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
  Modal
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Headers from '../../../assets/Custom/Headers';
import { base_url } from '../../../../../baseUrl';
import RBSheet from "react-native-raw-bottom-sheet";
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import Loader from '../../../assets/Custom/Loader';
import { useTranslation } from 'react-i18next';
export default function ViewQAFI({navigation, route}) {
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

  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [authToken, setAuthToken] = useState([]);

  const refSlide = useRef();

  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [commentText, setCommentText] = useState(null); // State variable to hold the text

  const [showLikes, setShowLikes] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    await getUserID();
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
      } else {
      }

      const result1 = await AsyncStorage.getItem('authToken ');
      if (result1 !== null) {
        setAuthToken(result1);
        await fetchComments(result1);
      } else {
      }
    } catch (error) {
    }
  };

  const fetchComments = async value => {
    const token = value;

    try {
      const response = await fetch(
        base_url + `qafi/getAllCommentsByQAFI/${receivedData?.qafi_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
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
        base_url + `qafi/getAllLikesByQafi/${receivedData?.qafi_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setLikes(data.totalLikes);
        fetchCommentsCounts(values);

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
        base_url + `qafi/getAllCommentsByQAFI/${receivedData?.qafi_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
   
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

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const handleUpdatePassword = async () => {
    setsnackbarVisible(true);
    setTimeout(() => {
      setsnackbarVisible(false);

      if (pastedURL !== '') {
        requestStoragePermission();
      } else {

      }

      //navigation.goBack();
    }, 3000);
  };

  const clearTextInput = () => {
    setCommentText(null);
    sendComment();
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
        QAFI_id: receivedData?.qafi_id,
        user_id: userId,
        comment: commentText,
      };

      const response = await axios.post(
        base_url + 'qafi/sendComment',
        commentData,
        axiosConfig,
      );

      if (response.status === 200) {
        setLoading(false);
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
    setCommentText(emojiObject.emoji);
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
        QAFI_id: receivedData?.qafi_id,
        user_id: userId,
      };

      const response = await axios.post(
        base_url + 'qafi/likeUnlikeQafi',
        commentData,
        axiosConfig,
      );
      if (response.status === 200) {
        setLoading(false);
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
          {item?.userimage ? (
            <View
              style={{
                height: wp(14),
                alignSelf: 'center',
                overflow: 'hidden',
                width: wp(14),
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
                size={28}
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
      })
      .then(res => {
        setsnackbarVisible(true);
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

  var details = receivedData?.description;

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
  const refCommentsSheet = useRef();
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
    <GestureHandlerRootView style={{flex: 1}}>
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
            text={t('QAFIDetails')}
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
            
              <View style={{ position: 'relative' }}>
              <Image
                style={{
                  width: '100%',
                  borderRadius: wp(10) / 2,
                  height: '100%',
                }}
                source={{ uri: receivedData?.user_image }}
              />
  
                <View
                  style={{
                    position: 'absolute',
    
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderRadius: wp(10) / 2,
                  }}
                />

            </View>
            )}
          </TouchableOpacity>

          <Text style={styles.textProfileName}>{receivedData?.username}</Text>
        </View>

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
  
          }}>
          <Image
            source={{uri: receivedData?.image}}
            style={{width: '100%', height: '100%'}}
          />
        </TouchableOpacity>

        <View style={styles.bottomView}>
          <View style={{height: hp(20)}}>

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
                <TouchableOpacity onPress={() => handleUpdatePassword()}>
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
      {isOpen === true ? (
        <EmojiPicker
          onEmojiSelected={handlePick}
          open={true}
          onClose={() => setIsOpen(false)}
        />
      ) : null}

   

      {loading && <Loader />}
      <CustomSnackbar
          message={t('Success')}
          messageDescription={t('QAFIdownloadedsuccessfully')}
          onDismiss={dismissSnackbar} // Make sure this function is defined
          visible={snackbarVisible}
        />
        
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
    height: hp(6.2),
    marginTop: hp(8),
    alignItems: 'center',
    marginHorizontal: wp(8),
  },
  bottomView: {
    flex: 1,
    marginTop: hp(3),
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
