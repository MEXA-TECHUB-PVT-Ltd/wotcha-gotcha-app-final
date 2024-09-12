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
  import React, {useState, useRef} from 'react';
  import RBSheet from 'react-native-raw-bottom-sheet';
  import Entypo from 'react-native-vector-icons/Entypo';
  import { useTranslation } from 'react-i18next';
  import {Button, Divider, TextInput} from 'react-native-paper';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import PlusPost from '../../../assets/svg/PlusPost.svg';
  import Approved from '../../../assets/svg/Approved.svg';
  
  
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
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  import PublicLetter from '../../../assets/svg/PublicLetter.svg';
  import PrivateLetter from '../../../assets/svg/PrivateLetter.svg';
  
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

export default function UpdatePostLetterSignature({navigation, route}) {

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const [imageUri, setImageUri] = useState('');


  const [selectedItem, setSelectedItem] = useState('');


  const [loading, setLoading] = useState(false);

  const ref_RBSheetCameraCanvas = useRef(null);

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [isTextInputActiveAddress, setIsTextInputActiveAddress] =
    useState(false);

  const [isTextInputActiveContact, setIsTextInputActiveContact] =
    useState(false);

  const [isTextInputActiveEmail, setIsTextInputActiveEmail] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const ref_RBSheetCamera = useRef(null);
  const [postLetter, setPostLetter] = useState('');
  const [letterType, setLetterTypes] = useState('Public');

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const receivedDataName = route.params?.name;
  const receivedDatAddress = route.params?.address;
  const receivedDataContactNumber = route.params?.contactNumber;
  const receivedDataEmail = route.params?.email;
  const receivedDataCategoryId = route.params?.category_id;
  const receivedDataLetterType = route.params?.letterType;
  const { t } = useTranslation();
  const receivedDataGreetingsTitle = route.params?.greetingsTitle;

  const receivedDatasubjectOfLetter = route.params?.subjectOfLetter;

  const receivedDataintroductionOfLetter = route.params?.introductionOfLetter;

  const receivedDatapostLetter = route.params?.postLetter;

  const receivedDataAppealOfLetter = route.params?.formOfApeal;

  const receivedDataLetterImg = route.params?.letterImg;

  console.log ("Name", receivedDataName )
  console.log ("Address", receivedDatAddress )
  console.log ("Contact", receivedDataContactNumber )
  console.log ("Email", receivedDataEmail )
  console.log ("Id", receivedDataCategoryId )
  console.log ("LetterType", receivedDataLetterType )

  console.log ("Greetings", receivedDataGreetingsTitle )

  console.log ("Subject", receivedDatasubjectOfLetter )

  console.log ("Introduction", receivedDataintroductionOfLetter )

  console.log ("Post Letter", receivedDatapostLetter )

  console.log ("Appeal Of Letter", receivedDataAppealOfLetter )

  console.log ("Letter Img", receivedDataLetterImg )


  const takePhotoFromCamera = async value => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: 'photo',
        // videoQuality: 'medium',
      },
      response => {
        console.log('image here', response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
            console.log('response', response.assets[0].uri);
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setImageUri(response.uri);
            console.log('response', response.uri);
          }
        }
        ref_RBSheetCameraCanvas.current.close();
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
      console.log('response', imageUri);

      ref_RBSheetCameraCanvas.current.close();
    });
  };

  const goToScreen=()=>{
    setSelectedItem("camera")
    console.log("Get")
    ref_RBSheetCameraCanvas.current.close()
    navigation.navigate("PostLetterEditSignature")
  }

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);
    }, 3000);
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };


  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  const handleFocusAddress = () => {
    setIsTextInputActiveAddress(true);
  };

  const handleBlurAddress = () => {
    setIsTextInputActiveAddress(false);
  };

  const handleFocusContact = () => {
    setIsTextInputActiveContact(true);
  };

  const handleBlurContact = () => {
    setIsTextInputActiveContact(false);
  };

  const handleFocusEmail = () => {
    setIsTextInputActiveEmail(true);
  };

  const handleBlurEmail = () => {
    setIsTextInputActiveEmail(false);
  };

  const searches = [
    {id: 1, title: 'Subject'},
    {id: 2, title: 'Subject'},
    {id: 3, title: 'Greetings'},
    {id: 4, title: 'Introduction'},
    {id: 5, title: 'Greetings'},
  ];

  const setLetterType = value => {
    setLetterTypes(value);
    ref_RBSheetCamera.current.close();
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
        onPress={() => {
          setSelectedItemId(item.id);
          console.log('Selected item:', item.title);
        }}>
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
          text={t('PostLetter')}
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
        <View
          style={{
            width: wp(12),
            marginLeft: wp(0.5),
            height: wp(12),
            borderRadius: wp(12) / 2,
          }}>
          <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
        </View>

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

      <Text
        style={{
          color: '#FACA4E',
          fontFamily: 'Inter-Medium',
          fontSize: hp(2.3),
          marginTop: hp(3),
          marginLeft: wp(8),
        }}>
          {t('Signature')}
        
      </Text>
      
      <View style={{marginLeft:wp(8), marginTop:hp(5)}}>

      <CPaperInput
          multiline={true}
          placeholder={t('Description')}
          //heading={'Email Address'}
          placeholderTextColor="#121420"
          value={email}
          onChangeText={text => setEmail(text)}
          height={hp(38)}
        />

      </View>

      <TouchableOpacity onPress={()=>ref_RBSheetCameraCanvas.current.open()} style={{justifyContent:'center', alignItems:'center',alignSelf:'center', height:hp(4), width:wp(28), borderRadius:wp(5), backgroundColor:'#FACA4E'}}>
      <Text
        style={{
          color: '#232323',
          fontFamily: 'Inter-Regular',
          fontSize: hp(1.7)
        }}>
          {t('EditSignature')}
        
      </Text>
      </TouchableOpacity>

      <View style={{marginTop: '18%', alignSelf: 'center'}}>
        <CustomButton
          title={t('Next')}
          // load={loading}
          // checkdisable={inn == '' && cm == '' ? true : false}
          customClick={() => {
            navigation.navigate('PostLetterEditSignature');
            //navigation.navigate('Profile_image');
          }}
        />
      </View>

      

      
      <RBSheet
        ref={ref_RBSheetCameraCanvas}
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
          <Text style={styles.maintext}>{t('Selectanoption')}</Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={'#303030'}
              onPress={() => ref_RBSheetCameraCanvas.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => goToScreen()}
            style={
              selectedItem === 'camera'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
           <Image source={appImages.ArtBoard} style={{ resizeMode:'contain'}}/>

            <Text style={{marginTop:hp(-1.8),color: '#333333'}}>{t('Fromcanvas')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => choosePhotoFromLibrary('gallery')}
            style={
              selectedItem === 'gallery'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <MaterialCommunityIcons
              color={selectedItem === 'gallery' ? '#FACA4E' : '#888888'}
              name="image"
              size={25}
            />

            <Text style={{color: '#333333'}}>{t('Fromgallery')}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <CustomSnackbar
        message={t('Success')}
        messageDescription={t('LetterPostedSuccessfully')}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      },ti: {
        marginTop: '5%',
        width: 300,
        backgroundColor: 'white',
        fontSize: wp(4),
        paddingLeft: '2%',
        borderRadius: 10,
      },
      textInputSelectedCategory: {
        borderWidth: 1,
        borderRadius: wp(3),
        width: '98%',
        borderColor: '#FACA4E',
        paddingHorizontal: 20,
        paddingVertical: 6.8,
        marginBottom: 20,
        marginTop: hp(3),
      },
      textInputCategoryNonSelected: {
        borderWidth: 1,
        borderRadius: wp(3),
        width: '98%',
        borderColor: '#E7EAF2',
        paddingHorizontal: 20,
        paddingVertical: 6.8,
        marginBottom: 20,
        marginTop: hp(3),
      },
      iconStyle: {
        color: '#C4C4C4',
        width: 20,
        height: 20,
      },
      iconStyleInactive: {
        color: '#FACA4E',
      },
      maintext: {
        fontSize: hp(2.3),
        color: '#303030',
        fontWeight: 'bold',
      },
      modaltextview: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: wp(90),
        borderRadius: 25,
        backgroundColor: 'white',
        paddingHorizontal: wp(15),
      },
      optiontext: {
        fontSize: hp(1.7),
        color: '#303030',
        marginLeft: wp(4),
      },
      nonselectedItems: {
        width: wp(35),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: hp(14),
        borderRadius: wp(1.8),
        borderWidth: 1,
        borderColor: '#E7EAF2',
      },
      selectedItems: {
        width: wp(35),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: hp(14),
        borderRadius: wp(1.8),
        borderWidth: 1,
        borderColor: '#FACA4E',
      },
      selectCheckBox:{
        width: 17,
        height: 17,
        borderRadius: wp(1),
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#FACA4E',
      },
      unSelectCheckBox:{
        width: 17,
        height: 17,
        borderRadius: wp(1),
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#C4C4C4',
      },
})

