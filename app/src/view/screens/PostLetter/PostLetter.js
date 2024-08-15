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
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

import Entypo from 'react-native-vector-icons/Entypo';

import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlusPost from '../../../assets/svg/PlusPost.svg';
import Approved from '../../../assets/svg/Approved.svg';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Back from '../../../assets/svg/back.svg';
import {appImages} from '../../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../../assets/svg/VolumeUp.svg';
import Like from '../../../assets/svg/Like.svg';
import UnLike from '../../../assets/svg/Unlike.svg';
import Comment from '../../../assets/svg/Comment.svg';
import Send from '../../../assets/svg/Send.svg';
import Download from '../../../assets/svg/Download.svg';
import CustomButton from '../../../assets/Custom/Custom_Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PublicLetter from '../../../assets/svg/PublicLetter.svg';
import PrivateLetter from '../../../assets/svg/PrivateLetter.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../../assets/Custom/CPaperInput';
import Headers from '../../../assets/Custom/Headers';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
import { base_url } from '../../../../../baseUrl';

export default function PostLetter({navigation, route}) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [greetingsTitle, setGreetingsTitle] = useState(null);

  const ref_RBSheetCamera = useRef(null);
  const [postLetter, setPostLetter] = useState('');
  const [subjectOfLetter, setSubjectOfLetter] = useState('');
  const [introductionOfLetter, setIntroductionOfLetter] = useState('');

  const [greetings, setGreetings] = useState('');

  const [userImage, setUserImage] = useState();

  const [letterType, setLetterTypes] = useState('Public');

  const ref_RBSendOffer = useRef(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [authToken, setAuthToken] = useState('');

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState('');

  //-------------------------------------\\

  useEffect(() => {
    // Make the API request and update the 'data' state
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
    console.log("Id's");
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);
        console.log('user id retrieved:', result);

        userToken(result);
      }

      /*  const result3 = await AsyncStorage.getItem('authToken ');
      if (result3 !== null) {
        setAuthToken(result3);
        await fetchCategory(result3);

        console.log('user id retrieved:', result);
      } */

      /* const  userImage = await AsyncStorage.getItem('userImage');
      if (result3 !== null) {
        setAuthToken(result3);
        await fetchCategory(result3);

        console.log('user id retrieved:', result);
      } */
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }

    /*  try {
      const result = await AsyncStorage.getItem('userName');
      if (result !== null) {
        setName(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    } */

    //await authTokenAndId()
  };

  //--------------------------------\\

  const userToken = async id => {
    try {
      const result3 = await AsyncStorage.getItem('authToken ');
      if (result3 !== null) {
        setAuthToken(result3);
        //await fetchCategory(result3, id);
        authTokenAndId(id, result3);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const authTokenAndId = async (id, token) => {
    fetchUser(id, token);
  };

  const fetchUser = async (id, tokens) => {
    console.log('USER', id);
    console.log('TOKEN', tokens);
    const token = tokens;

    try {
      const response = await fetch(
        base_url + `user/getUser/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log('IMAGE', data.user.image);

        // Use the data from the API to set the categories
        setUserImage(data.user.image);
      } else {
        console.error(
          'Failed to fetch user:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      //await fetchCategory(id, tokens);
      console.error('Errors:', error);
    }
  };

  //---------------------------------------\\

  const receivedDataName = route.params?.name;
  const receivedDatAddress = route.params?.address;
  const receivedDataContactNumber = route.params?.contactNumber;
  const receivedDataEmail = route.params?.email;
  const receivedDataCategoryId = route.params?.category_id;
  const receivedDataLetterType = route.params?.letterType;

  console.log('Name', receivedDataName);
  console.log('Address', receivedDatAddress);
  console.log('Contact', receivedDataContactNumber);
  console.log('Email', receivedDataEmail);
  console.log('Id', receivedDataCategoryId);
  console.log('LetterType', receivedDataLetterType);
  console.log('LetterTypeAppeal', receivedDataLetterType);

  const searches = [
    {id: 1, title: 'Subject'},
    {id: 2, title: 'Introduction'},
    {id: 3, title: 'Body'},
    {id: 4, title: 'Greetings'},
  ];
  const onFocusChangeSubject = (id, title, text) => {
    console.log('Came to here');
    setSelectedItemId(id);
    setGreetingsTitle(title);
    setSubjectOfLetter(text);
  };

  const onFocusChangeIntroduction = (id, title, text) => {
    console.log('Came to here');
    setSelectedItemId(id);
    setGreetingsTitle(title);
    setIntroductionOfLetter(text);
  };

  const onFocusChangeBody = (id, title, text) => {
    console.log('Came to here');
    setSelectedItemId(id);
    setGreetingsTitle(title);
    setPostLetter(text);
  };

  const onFocusChangeGreetings = (id, title, text) => {
    console.log('Came to here');
    setSelectedItemId(id);
    setGreetingsTitle(title);
    setGreetings(text);
  };

  const setLetterType = value => {
    setLetterTypes(value);
    ref_RBSheetCamera.current.close();
  };

  const setType = () => {
    ref_RBSheetCamera.current.close();

    setLetterType('Private Letter');

    ref_RBSendOffer.current.open();
  };

  const handleUpdatePassword = async () => {
    console.log('going to update');
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const renderSearches = item => {
    console.log('Items', item);
    const isSelected = selectedItemId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            // backgroundColor: isSelected ? '#FACA4E' : null,
          },
        ]}
        /* onPress={() => {
          setSelectedItemId(item.id);
          setGreetingsTitle(item.title);
          console.log('Selected item:', item.title);
        }} */
      >
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#FACA4E' : '#939393'},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{marginTop: hp(5), height: hp(8)}}>
        <Headers
          showBackIcon={true}
          showText={true}
          text={'Post Letter'}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: wp(8),
          alignItems: 'center',
          marginTop: hp(3),
          height: hp(8),
        }}>
        {userImage !== undefined ? (
          <View
            style={{
              width: wp(12),
              marginLeft: wp(0.5),
              height: wp(12),
              borderRadius: wp(12) / 2,
            }}>
            <Image
              source={{uri: userImage}}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: wp(12) / 2,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: wp(10),
              marginLeft: wp(3),
              height: wp(10),
              overflow: 'hidden',
              borderRadius: wp(10) / 2,
            }}>
            <MaterialCommunityIcons
              style={{marginTop: hp(0.5)}}
              name={'account-circle'}
              size={35}
              color={'#FACA4E'}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={() => ref_RBSheetCamera.current.open()}
          style={{
            flexDirection: 'row',
            marginLeft: wp(5),
            height: hp(5),
            width: wp(33),
            borderWidth: 0.5,
            borderColor: '#FACA4E',
            borderRadius: wp(5),
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Text style={{color: '#FACA4E', fontFamily: 'Inter-Regular'}}>
            {letterType}
          </Text>

          <Ionicons name="chevron-down" size={21} color="#FACA4E" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: hp(8),
          width: '100%',
          marginTop: hp(3),
          borderTopColor: '#0000001A',
          borderBottomColor: '#0000001A',
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
        }}>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={searches}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderSearches(item)}
        />
      </View>

      <ScrollView style={{flex: 1}}>
        <View style={{marginLeft: wp(8), marginTop: hp(3)}}>
          <CPaperInput
            //multiline={true}
            placeholder={'Subject Of Letter'}
            //heading={'Title'}
            placeholderTextColor="#121420"
            value={subjectOfLetter}
            onChangeText={text => onFocusChangeSubject(1, 'Subject', text)}

            //onFocus={ console.log('CPaperInput focused')} // Log a message when CPaperInput receives focus

            //height={hp(55)}
          />
        </View>

        <View style={{marginLeft: wp(8), marginTop: hp(1)}}>
          <CPaperInput
            //multiline={true}
            placeholder={'Introduction Of Letter'}
            //heading={'Title'}
            placeholderTextColor="#121420"
            value={introductionOfLetter}
            onChangeText={text =>
              onFocusChangeIntroduction(2, 'Introduction', text)
            }
            //height={hp(55)}
          />
        </View>

        <View style={{marginLeft: wp(8), marginTop: hp(3)}}>
          <CPaperInput
            multiline={true}
            placeholder={'Type Here'}
            //heading={'Title'}
            placeholderTextColor="#121420"
            value={postLetter}
            onChangeText={text => onFocusChangeBody(3, 'Body', text)}
            height={hp(55)}
          />
        </View>

        <View style={{marginLeft: wp(8), marginTop: hp(1)}}>
          <CPaperInput
            multiline={true}
            placeholder={'Greetings'}
            //heading={'Title'}
            placeholderTextColor="#121420"
            value={greetings}
            onChangeText={text => onFocusChangeGreetings(4, 'Greetings', text)}
            height={hp(15)}
          />
        </View>

        <View style={{marginTop: hp(1), marginHorizontal: wp(8)}}>
          <CustomButton
            title={'Next'}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              if (
                greetings !== '' &&
                subjectOfLetter !== '' &&
                introductionOfLetter !== '' &&
                postLetter !== ''
              ) {
                navigation.replace('PostLetterEditSignature', {
                  greetingsTitle: greetings,
                  subjectOfLetter: subjectOfLetter,
                  introductionOfLetter: introductionOfLetter,
                  postLetter: postLetter,
                  name: receivedDataName,
                  address: receivedDatAddress,
                  contactNumber: receivedDataContactNumber,
                  email: receivedDataEmail,
                  category_id: receivedDataCategoryId,
                  letterType: receivedDataLetterType,
                  formOfApeal: 'My appeal',
                });
              } else {
                console.log('Going to else');
                handleUpdatePassword();
              }
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
            Select Letter Type
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="close"
              size={22}
              color={'#303030'}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <CustomSnackbar
          message={'Alert!'}
          messageDescription={'Kindly Fill All Fields'}
          onDismiss={dismissSnackbar} // Make sure this function is defined
          visible={snackbarVisible}
        />
        <View
          style={{
            //flexDirection: 'row',
            justifyContent: 'space-evenly',
            //alignItems: 'center',
            //borderWidth: 3,
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => setLetterType('Public Letter')}
            style={{flexDirection: 'row', marginHorizontal: wp(7)}}>
            <PublicLetter height={23} width={23} />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
              Public letter
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
            onPress={() => setType()}
            style={{
              flexDirection: 'row',
              marginTop: hp(2.5),
              marginHorizontal: wp(7),
            }}>
            <PrivateLetter height={23} width={23} />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
              Private Letter
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSendOffer}
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
            height: hp(55),
          },
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginHorizontal: wp(8),
            justifyContent: 'space-evenly',
          }}>
          <Image source={appImages.alert} style={{resizeMode: 'contain'}} />

          <Text
            style={{
              color: '#333333',
              marginLeft: wp(1),
              fontSize: hp(2.3),
              //textDecorationLine:'underline',
              fontFamily: 'Inter-Bold',
              //fontWeight: 'bold',
            }}>
            Unable To Post!
          </Text>

          <Text
            style={{
              color: '#9597A6',
              marginLeft: wp(1),
              fontSize: hp(2),
              textAlign: 'center',
              lineHeight: hp(3),
              //textDecorationLine:'underline',
              fontFamily: 'Inter-Regular',
              //fontWeight: 'bold',
            }}>
            Upgrade for private letter posting and a{'\n'}seamless experience
          </Text>

          <View style={{marginHorizontal: wp(10)}}>
            <CustomButton
              title="Buy Subscription"
              customClick={() => {
                ref_RBSendOffer.current.close();
                navigation.navigate('SubscriptionPayment');
              }}
              style={{width: wp(59)}}
            />
          </View>

          <TouchableOpacity onPress={() => ref_RBSendOffer.current.close()}>
            <Text
              style={{
                color: '#9597A6',
                marginLeft: wp(1),
                marginBottom: hp(3),
                fontSize: hp(2),
                textAlign: 'center',
                lineHeight: hp(3),
                //textDecorationLine:'underline',
                fontFamily: 'Inter-Regular',
                //fontWeight: 'bold',
              }}>
              Maybe later
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchesDetails: {
    flexDirection: 'row',
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(23),
    //backgroundColor: '#F2F2F2',
    //borderRadius: wp(5),
    height: hp(5),
  },
  textSearchDetails: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: hp(1.8),
  },
});
