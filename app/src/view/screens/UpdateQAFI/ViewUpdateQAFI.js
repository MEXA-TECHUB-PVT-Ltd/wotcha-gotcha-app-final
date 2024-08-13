import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {appImages} from '../../../assets/utilities/index';

import AsyncStorage from '@react-native-async-storage/async-storage';

import EditItem from '../../../assets/svg/UpdateItem.svg';

import Delete from '../../../assets/svg/Delete.svg';

import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';

import RBSheet from 'react-native-raw-bottom-sheet';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import { base_url } from '../../../../../baseUrl';

export default function ViewUpdateQAFI({navigation, route}) {
  const [showFullContent, setShowFullContent] = useState(false);
  const identifier  = route.params.identifier;
  const [showMenu, setShowMenu] = useState(true);

  const [showLikes, setShowLikes] = useState(false);

  const ref_RBSheetCamera = useRef(null);

  const [snackbarDeleteVisible, setsnackbarDeleteVisible] = useState(false);

  const receivedData = route.params?.details;

  //-------------------------\\

  const [comments, setComments] = useState([]);

  const [likes, setLikes] = useState(null);

  const [commentsCount, setCommentsCount] = useState(null);

  const [showReply, setShowReply] = useState(false);

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState('');

  const [progress, setProgress] = useState(0);

  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  const ref_Comments = useRef(null);

  const [authToken, setAuthToken] = useState([]);

  //------------------------\\

  console.log('Recieved Data News', receivedData);

  var details = receivedData.description;
  // 'Hold onto your seats and get ready to be mesmerized by the beauty and grandeur of the Hold onto your seats';

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
    console.log("Id's");
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
      } else {
        console.log('result is null', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleContentLike = () => {
    setShowLikes(!showLikes);
  };

  const changeModals = () => {
    ref_RBSheetCamera.current.close();
    navigation.navigate('UpdateQAFI', {item: receivedData});
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
        base_url + `qafi/deleteQafi/${receivedData?.qafi_id}`,
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
          `Error deleting video with ID ${receivedData?.qafi_id}:`,
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
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarDeleteVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarDeleteVisible(false);
      navigation.navigate('ViewProfile');
      //navigation.goBack();
    }, 3000);
  };

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

  return (
    <ImageBackground source={{uri: receivedData?.image}} style={{flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={styles.header}>
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

         
          <View style={{width:'60%'}}>

<Text  ellipsizeMode="tail"
          numberOfLines={1} style={styles.textProfileName}>{receivedData.username}</Text>
</View>
        </View>

        {identifier ? ( 
        // Render specific content if identifier is true
        <TouchableOpacity
              onPress={() => ref_RBSheetCamera.current.open()}
              style={{marginLeft: wp(1), marginTop: hp(1)}}>
              <Entypo name={'dots-three-vertical'} size={18} color={'white'} />
            </TouchableOpacity>
      ) : (
        // Render nothing if identifier is false or undefined
     <View/>
      )}
        {/* {showMenu && (
          <TouchableOpacity
            onPress={() => ref_RBSheetCamera.current.open()}
            style={{marginLeft: wp(1), marginTop: hp(1)}}>
            <Entypo name={'dots-three-vertical'} size={18} color={'white'} />
          </TouchableOpacity>
        )} */}
      </View>

      <View style={styles.bottomView}>
        <View style={{height: hp(20)}}>
          <ScrollView
            showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
            style={{flex: 1, marginTop: hp(5)}}
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
            Select an option
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
            //flexDirection: 'row',
            justifyContent: 'space-evenly',
            //alignItems: 'center',
            //borderWidth: 3,
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => changeModals()}
            style={{flexDirection: 'row', marginHorizontal: wp(7)}}>
            <EditItem height={23} width={23} />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
              Update QAFI
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
              Delete QAFI
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <CustomSnackbar
        message={'success'}
        messageDescription={'QAFI deleted successfully'}
        onDismiss={dismissDeleteSnackbar} // Make sure this function is defined
        visible={snackbarDeleteVisible}
      />
    </ImageBackground>
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
    justifyContent: 'flex-end',
    // You can add padding or content to this view as needed.
  },
  textProfileName: {
    color: '#FFFFFF',
    fontSize: hp(2),
    marginLeft: wp(3),
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  //rbsheet

  buttonDirections: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(4.3),
    width: '100%',
    marginLeft: wp(5),
    justifyContent: 'space-evenly',
  },
  button: {
    borderColor: '#FACA4E',
    borderWidth: 0.8,
    borderRadius: wp(5),
    width: wp(35),
    height: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FACA4E',
    fontWeight: 'bold',
  },
  txtNotification: {
    fontWeight: '500',
    marginTop: hp(10),
    marginLeft: wp(5),
    fontSize: hp(2.3),
    color: '#0B0B0B',
  },

  //--------------\\
});
