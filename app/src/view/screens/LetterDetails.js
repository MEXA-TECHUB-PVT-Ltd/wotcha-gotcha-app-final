import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  Modal,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Divider, TextInput } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import PlusPost from "../../assets/svg/PlusPost.svg";
import Approved from "../../assets/svg/Approved.svg";
import EditItem from '../../assets/svg/UpdateItem.svg';
import Delete from '../../assets/svg/Delete.svg';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Video from 'react-native-video';
import Back from "../../assets/svg/back.svg";
import { appImages } from "../../assets/utilities/index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from 'react-i18next';
import Share from "react-native-share";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Fontiso from "react-native-vector-icons/Fontisto";

import IonIcons from "react-native-vector-icons/Ionicons";

import Headers from "../../assets/Custom/Headers";
import { base_url } from "../../../../baseUrl";
import CustomSnackbar from "../../assets/Custom/CustomSnackBar";


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export default function LetterDetails({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const identifier  = route.params.identifier;
  const [authToken, setAuthToken] = useState("");

  const [convertedDate, setConvertedDate] = useState("");

  const [convertedTime, setConvertedTime] = useState("");

  const [signatureData, setSignatureData] = useState(null);
  const [snackbarDeleteVisible, setsnackbarDeleteVisible] = useState(false);
  const receivedData = route.params?.Letters;
  const ref_RBSheetCamera = useRef(null);

  console.log("Recieved Letter Data", receivedData);
  const { t } = useTranslation();

  useEffect(() => {
    // Make the API request and update the 'data' state
    console.log("Came to use effect");

    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    await getUserID();

    // Fetch data one by one
    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem("authToken ");
      if (result !== null) {
        setAuthToken(result);
        console.log("Token", result);

        await fetchSignature(result);

        // console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  const fetchSignature = async (tokenId) => {
    const token = tokenId;

    try {
      const response = await fetch(
        base_url +
          `signature/getSpecificSignature/${receivedData?.signature_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      const imageUrl = result.Signature.signature_image;
      /* ? setSignatureData(`https://watch-gotcha-be.mtechub.com${result.Signature.signature_image}`)
      : setSignatureData(`result.Signature.signature_image`); */

      if (imageUrl.startsWith("/fileUpload")) {
        setSignatureData(`https://watch-gotcha-be.mtechub.com/${imageUrl}`);
      } else {
        setSignatureData(`${imageUrl}`);
      }

      console.log("image", signatureData);
      //Alert.alert(result)

      await covertTimeAndDate(receivedData?.post_date);
    } catch (error) {
      console.error("Error Trending:", error);
    }
  };
  const convertTimeAndDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  const post_date = convertTimeAndDate(receivedData.post_date);
  
  

  const covertTimeAndDate = async (data) => {
    const originalDateString = data;
    const originalDate = new Date(originalDateString);

    // Format the date in a readable way
    const formattedDateValue = originalDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Format the time in a readable way
    const formattedTimeValue = originalDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    console.log("Formatted Date", formattedDateValue);
    console.log("Formatted Time", formattedTimeValue);

    // Save formatted date and time in states
    setConvertedDate(formattedDateValue);
    setConvertedTime(formattedTimeValue);
  };



  // const [userimagevisi, setUserImageVisi] = useState("");
  // const [modalVisible, setModalVisible] = useState(false);
  // const handleImagePress = () => {
  //   setModalVisible(true);
  // };

  // const handleCloseModal = () => {
  //   setModalVisible(false);
  // };

  // 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState('');

  const handleImagePress = (item) => {
    setSelectedImageUri(item);
    // setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImageUri('');
  };
  const renderAvailableApps = (item) => {
    console.log("Items hai", item);
    return (
      <TouchableOpacity style={{ width: wp(30), margin: 5 }} onPress={() =>
        navigation.navigate("ViewImage", {
          item: item,
        })
      }>
        <View>
          <Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: "100%",
              height: hp(12),
              borderRadius: wp(3),
              resizeMode: "cover",
            }}
            source={{ uri: item }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: wp(2),
            marginTop: hp(12.5),
          }}
        >
          <Text
            style={{ fontSize: hp(1.1), fontWeight: "bold", width: wp(23) }}
          >
            {item?.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const changeModal = () => {
    ref_RBSheetCamera.current.close();
    navigation.replace('UpdatePostLetterInfo', {Video: receivedData});
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
        base_url + `letter/deleteLetter/${receivedData?.post_id}`,
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
          `Error deleting video with ID ${receivedData?.post_id}:`,
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
    setTimeout(() => {
      setsnackbarDeleteVisible(false);
      navigation.replace('ViewProfile');
      //navigation.goBack();
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{ marginTop: hp(5) }}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          showText={true}
          text={t('LetterDetails')}
        />
      </View>
      <View>
      {identifier ? ( 
        <TouchableOpacity
              onPress={() => ref_RBSheetCamera.current.open()}
              style={{position:'absolute', right:10, marginTop: -25}}>
              <Entypo name={'dots-three-vertical'} size={18} color={'black'} />
            </TouchableOpacity>
      ) : (
     <View/>
      )}
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            marginTop: hp(2.1),
            height: hp(2.6),
            backgroundColor: "#77BDF2",
          }}
        ></View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ViewElseProfile", {
              id: receivedData?.user_id,
            })
          }
          style={{
            flexDirection: "row",
            marginHorizontal: wp(8),
            marginTop: hp(1.8),
            alignItems: "center",
            height: hp(10),
            //borderWidth: 3,
          }}
        >
          {receivedData?.userimage !== null ||
          receivedData?.userimage !== undefined ? (
            <View
              style={{
                //borderWidth: 3,
                height: hp(8),
                width: wp(18),
                borderRadius: wp(3),
              }}
            >
              <Image
                source={{ uri: receivedData?.userimage }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: wp(3),
                  resizeMode: "cover",
                }}
              />
            </View>
          ) : (
            <MaterialCommunityIcons
              style={{ marginTop: hp(0.5) }}
              name={"account-circle"}
              size={35}
              color={"#FACA4E"}
            />
          )}

          <View style={{ marginLeft: wp(2.5) }}>
            <Approved width={20} height={20} />
          </View>
        </TouchableOpacity>

        <View
          style={{
            alignItems: "flex-end",
            marginTop: hp(-2),
            marginRight: wp(3),
          }}
        >
          <Text
            style={{
              color: "#282828",
              marginLeft: wp(3),
              fontFamily: "Inter",
              fontWeight: "bold",
            }}
          >
            
            {post_date}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: hp(1),
            width: "90%",
            marginHorizontal: wp(8),
          }}
        >
          <Text
            style={{
              color: "#282828",
              textDecorationLine: "underline",
              fontFamily: "Inter",
              fontWeight: "bold",
            }}
          >
            {t('Subject')}
          </Text>
          <View style={{height:'100%', width:'80%'}}>
            <Text
              style={{
                color: "#595959",
                marginLeft: wp(1),
                fontFamily: "Inter-Regular",
              }}
            >
              {receivedData?.subject_place}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "90%",
            marginHorizontal: wp(8),
            marginVertical:hp(3)
          }}
        >
          <View style={{height:'100%'}}>
            <Text
              style={{
                color: "#595959",
                fontFamily: "Inter-Regular",
                paddingRight:'15%'
              }}
            >
              {receivedData?.introduction}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: wp(8),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#595959",
              fontFamily: "Inter-Regular",
              //fontWeight: 'bold',
            }}
          >
            {receivedData?.body}
          
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            marginHorizontal: wp(8),
            marginVertical:hp(3)
          }}
        >
          <View style={{height:'100%'}}>
            <Text
              style={{
                color: "#595959",
                fontFamily: "Inter-Regular",
                paddingRight:'15%'
              }}
            >
              {receivedData?.greetings}
            </Text>
          </View>
        </View>

  

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginHorizontal: wp(8),
            marginBottom: wp(8),
            height: hp(7),
          }}
        >
          <Image
            source={{ uri: `${signatureData}` }}
            style={{
              resizeMode: "contain",
              width: wp(30),
              height: wp(30),
            }}
          />
        </View>
{/*  source={appImages.videoPlaceHolder}
  <TouchableOpacity
                style={{ width: wp(40), borderRadius: wp(5)}}
              >
                <Image
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it's on top of other elements
                    width: '100%',
                    height: '100%',
                    borderRadius: wp(3),
                    resizeMode: 'cover',
                  }}
                  source={appImages.videoPlaceHolder}
                />
              </TouchableOpacity> */}
      <View style={styles.videomaincontainer}>
  {receivedData.video && (
    <View style={styles.videoContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('VideoPlayerScreen', {
            videoUri: receivedData.video,
            identifier: false,
          })
        }
        style={{ width: wp(40), borderRadius: wp(5) }}
      >
        

    
          <Video
            source={{ uri: receivedData.video }}
            style={styles.video}
            // resizeMode="contain"
            // controls={true} // Show media controls (play, pause, etc.)
          />
          {/* <Text style={styles.videoInfo}>{videoInfo?.fileName}</Text> */}
    
        

        {/* <Image
          style={{
            width: '100%',
            height: '100%',
            borderRadius: wp(3),
            resizeMode: 'contain',
          }}
          source={appImages.videoPlaceHolder} // Placeholder image source
        /> */}
      </TouchableOpacity>
    </View>
  )}
</View>

        <View
          style={{ marginTop: hp(1), marginHorizontal: wp(8), height: "100%" }}
        >
          <FlatList
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            data={receivedData?.images ? receivedData.images.slice(0, 3) : []}
            horizontal
            //keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderAvailableApps(item)}
          />
        </View>
      </ScrollView>

      {loading === true ? (
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
          <ActivityIndicator size="large" color="#FACA4E" />
        </View>
      ) : null}
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
              {t('Selectanoption')}
            
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
                {t('UpdateLetter')}
             
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
                 {t('DeleteLetter')}
             
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
     
      <CustomSnackbar
        message={t('Success')}
        messageDescription={t('LetterDeletedSuccessfully')}
        onDismiss={dismissDeleteSnackbar} // Make sure this function is defined
        visible={snackbarDeleteVisible}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <Image
              style={styles.modalImage}
              source={{ uri: selectedImageUri }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    

      {/* //-----------------------\\ */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  videomaincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    height: hp(20),
    width: wp(100),
    // marginHorizontal: wp(10),
    // alignItems: 'center',
    // justifyContent: 'center',
    
  },
  video: {
    height: '100%',
    width: '100%',
  },
  videoInfo: {
    color: '#FACA4E',
    marginTop: hp(2),
  },
});
