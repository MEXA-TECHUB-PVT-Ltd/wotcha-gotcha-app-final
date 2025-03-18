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
  import {appImages} from '../../../assets/utilities/index';
  import CustomButton from '../../../assets/Custom/Custom_Button';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import CPaperInput from '../../../assets/Custom/CPaperInput';
  import Headers from '../../../assets/Custom/Headers';
  import CustomSnackbar from './../../../assets/Custom/CustomSnackBar';
  import { useTranslation } from 'react-i18next';

export default function PostLetterSignature({navigation, route}) {
const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [loading, setLoading] = useState(false);
  const ref_RBSheetCameraCanvas = useRef(null);

  const ref_RBSheetCamera = useRef(null);
  const [letterType, setLetterTypes] = useState('Public');

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const receivedDataName = route.params?.name;
  const receivedDatAddress = route.params?.address;
  const receivedDataContactNumber = route.params?.contactNumber;
  const receivedDataEmail = route.params?.email;
  const receivedDataCategoryId = route.params?.category_id;
  const receivedDataLetterType = route.params?.letterType;

  const receivedDataGreetingsTitle = route.params?.greetingsTitle;

  const receivedDatasubjectOfLetter = route.params?.subjectOfLetter;

  const receivedDataintroductionOfLetter = route.params?.introductionOfLetter;

  const receivedDatapostLetter = route.params?.postLetter;

  const receivedDataAppealOfLetter = route.params?.formOfApeal;

  const receivedDataLetterImg = route.params?.letterImg;

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo'}, response => {

      if (!response.didCancel && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
      ref_RBSheetCameraCanvas.current.close();
    });
  };

  const goToScreen=()=>{
    setSelectedItem("camera")
    console.log("Get")
    ref_RBSheetCameraCanvas.current.close()
    navigation.navigate("PostLetterEditSignature")
  }

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const setLetterType = value => {
    setLetterTypes(value);
    ref_RBSheetCamera.current.close();
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
        {/* Signature */}
      </Text>
      
      <View style={{marginLeft:wp(8), marginTop:hp(5)}}>

      <CPaperInput
          multiline={true}
          placeholder={'Description'}
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
        {/* Edit Signature */}
      </Text>
      </TouchableOpacity>

      <View style={{marginTop: '18%', alignSelf: 'center'}}>
        <CustomButton
          title={t('Next')}
          load={loading}
  
          customClick={() => {
            navigation.navigate('PostLetterEditSignature');
      
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

            <Text style={{marginTop:hp(-1.8),color: '#333333'}}>{t('FromCanvas')}</Text>
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

