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

import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
import Share from 'react-native-share';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../../assets/Custom/CPaperInput';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Camera from '../../../assets/svg/Camera.svg';
import Gallery from '../../../assets/svg/Gallery.svg';

const Category = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];
import { useRoute } from '@react-navigation/native';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';

export default function Live_upload({navigation}) {
   const route = useRoute();
    const ref_RBSheetCamera = useRef(null);
  const imageUri = route.params?.imageUri;
  console.log(imageUri)
 const [showThumbnailContent, setShowThumbnailContent] = useState(false);
const [thumbnailImageUri, setThumbnailImageUri] = useState(null);
  const [profileName, setProfileName] = useState('');

  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [category, setCategory] = useState('');

  const [description, setDescription] = useState('');
  const [imageInfo, setImageInfo] = useState(null);
  const [imageResponse, setImageResponse] = useState(null);
 const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);



  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };
  const handle_thumbail = ()=>{
         ref_RBSheetCamera.current.open();
         setShowThumbnailContent(true);
  }
   const takePhotoFromCamera = async (value) => {
    ref_RBSheetCamera.current.close();

    launchCamera(
      {
        mediaType: "photo",
        //videoQuality: 'medium',
      },
      (response) => {
        console.log("image here", response);
        if (!response.didCancel && response.assets.length > 0) {
                setThumbnailImageUri(response.assets[0].uri); // Set thumbnail image URI
            }
      }
    );
  };

  const choosePhotoFromLibrary = (value) => {
    ref_RBSheetCamera.current.close();
  launchImageLibrary({ mediaType: "photo" }, (response) => {
      console.log("image here", response);
      if (!response.didCancel && response.assets.length > 0) {
                setThumbnailImageUri(response.assets[0].uri); // Set thumbnail image URI
            }
     });
  };
  const handle_bar = ()=>{
    navigation.navigate('Going_live', {
        thumbnailImageUri: thumbnailImageUri,
    });
  }
    const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };
  return (
    <KeyboardAvoidingView
    style={{flex: 1, backgroundColor:'white'}}
    behavior='height' // You can use ‘height’ as well, depending on your preference
    enabled>
    
      
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Fans_star')}}>
            <IonIcons name={'chevron-back'} color={'#282828'} size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Start Live</Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={{flex:1}}>
          <View style={{flexDirection:"row"}}>
<TouchableOpacity onPress={handle_thumbail}>
<View
  style={{
    marginTop: hp(2),
    height: hp(25),
    borderWidth: 1,
    color:"#E8E8E8",
    borderRadius: wp(8),
    marginHorizontal: wp(30),
    alignItems: 'center', 
    justifyContent: 'center', 
      borderRadius: 20, 
    overflow: 'hidden',
     width: wp(40), // Adjust the width to fit the content
    
 
  }}>
   {thumbnailImageUri ? (
      <>
       <ImageBackground
    source={{ uri: thumbnailImageUri }}
    style={{
      width: '100%',
      height: '100%', 
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius:50
    }}
  >
    <View
      style={{
        position: 'absolute',
        top: 10,
        left: 8,
        height: hp(3),
        width: wp(18),
        borderRadius: wp(3),
        backgroundColor: '#FACA4E',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: hp(1),
          fontFamily: 'Inter',
          color: '#232323',
          fontWeight: '700',
        }}>
        Change Content
      </Text>
    </View>
  </ImageBackground>
  </>

    ):(
      <>
  <Image source={require('../../../assets/images/thub.png')} style={{width:20, height:30}}/>
      <Text
        style={{
          fontSize: hp(1),
          fontFamily: 'Inter',
          color: '#232323',
          fontWeight: '700',
        }}>
        Upload thumbnail
      </Text>
      </>
      )}
</View>
</TouchableOpacity>
</View>


      <TextInput
        mode="outlined"
        label="My Video"
        onChangeText={text => setProfileName(text)}
        style={styles.ti}
        outlineColor="#0000001F"
        placeholderTextColor={'#646464'}
        activeOutlineColor="#FACA4E"
        autoCapitalize="none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        // left={isTextInputActive ? <Oemail /> : <Gemail />}
      />

      <View style={{marginHorizontal:wp(7)}}>

      <Dropdown
        style={
          isFocus
            ? styles.textInputSelectedCategory
            : styles.textInputCategoryNonSelected
        }
        containerStyle={{
          marginTop: 3,
          alignSelf: 'center',
          borderRadius: wp(3),
          width: '100%',
        }}
        // dropdownPosition="top"
        // mode="modal"
        placeholderStyle={{
          color: '#121420',
          //   fontWeight: '400',
          fontFamily: 'Inter',
          fontSize:hp(1.8),
        }}
        iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
        itemTextStyle={{color: '#000000'}}
        selectedTextStyle={{fontSize: 16, color: '#000000'}}
        // inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        value={category}
        data={Category}
        search={false}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={'Select Category'}
        searchPlaceholder="Search..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setCategory(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? '#FACA4E' : '#C4C4C4'}
            name="down"
            size={15}
          />
        )}
      />
      </View>

       <View style={{marginHorizontal:wp(7)}}>

      <Dropdown
        style={
          isFocus
            ? styles.textInputSelectedCategory
            : styles.textInputCategoryNonSelected
        }
        containerStyle={{
          marginTop: 3,
          alignSelf: 'center',
          borderRadius: wp(3),
          width: '100%',
        }}
        // dropdownPosition="top"
        // mode="modal"
        placeholderStyle={{
          color: '#121420',
          //   fontWeight: '400',
          fontFamily: 'Inter',
          fontSize:hp(1.8),
        }}
        iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
        itemTextStyle={{color: '#000000'}}
        selectedTextStyle={{fontSize: 16, color: '#000000'}}
        // inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        value={category}
        data={Category}
        search={false}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={'Select Sub Category'}
        searchPlaceholder="Search..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setCategory(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? '#FACA4E' : '#C4C4C4'}
            name="down"
            size={15}
          />
        )}
      />
      </View>
        
        <View style={{justifyContent:'center',alignItems:'center', marginTop:hp(-2)}}>

         <CPaperInput
              multiline={true}
              placeholder={'Description'}
              placeholderTextColor="#121420"
              value={description}
              onChangeText={text => setDescription(text)}
              height={hp(20)}
            />
        </View>
        <View style={{marginTop:hp(1), marginBottom:hp(5),justifyContent:'center',alignItems:'center'}}>
<TouchableOpacity onPress={handle_bar}>
   <CustomButton
            title={'Start Live'}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            // customClick={handle_bar}
          />
</TouchableOpacity>
       
        </View>
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
    justifyContent: "space-between", // Set to space between to separate text and icon
    marginHorizontal: wp(8),
    alignItems: "center",
  }}
>
  <Text style={{ fontWeight: "bold", textAlign: "left", color: "black" ,   fontSize: hp(2.1)}}>
    Select an option
  </Text>
  <TouchableOpacity
    onPress={() => ref_RBSheetCamera.current.close()}
  >
    <Ionicons
      name="close"
      size={23}
      color={"#303030"}
      onPress={() => ref_RBSheetCamera.current.close()}
    />
  </TouchableOpacity>
</View>

<View
  style={{
    top:"1%",
    flex: 1,
    marginHorizontal: wp(8),
    marginBottom: hp(1),
    flexDirection: "row",
    justifyContent: "space-between", // Adjust to space-between to separate the two options
    //borderWidth: 3,
    //justifyContent: "space-around",
    //marginTop: hp(1),
  }}
>
  <TouchableOpacity
      onPress={() => takePhotoFromCamera("Camera")}
    // onPress={goto_camera}
    style={{
      alignItems: "center",
      justifyContent: "center", // Center the icon and text vertically
      flex: 1,
      borderRadius: 10,
      borderColor: "#FACA4E",
      borderWidth: 1,
    }}
  >
    <View style={{ marginLeft: wp(3) }}>
      <Camera width={21} height={21} />
    </View>

    <Text
      style={{
        color: "grey",
        marginLeft: wp(3),
        // fontWeight: "600",
        fontSize: hp(2.1),
      }}
    >
      Take a photo
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
      onPress={() => choosePhotoFromLibrary("gallery")}
    style={{
      alignItems: "center",
      justifyContent: "center", // Center the icon and text vertically
      flex: 1,
      borderRadius: 10,
      borderColor: "grey",
      borderWidth: 1,
      marginLeft: wp(8), // Add margin to separate the options
    }}
  >
    <View style={{ marginLeft: wp(3) }}>
      <Gallery width={21} height={21} />
    </View>

    <Text
      style={{
        color: "grey",
        marginLeft: wp(3),
        fontWeight: "600",
        fontFamily: "BebasNeue-Regular",
        fontSize: hp(2.1),
      }}
    >
      Choose a photo
    </Text>
  </TouchableOpacity>
</View>

        </RBSheet>

          <CustomSnackbar
        message={'Success'}
        messageDescription={'Content uploaded successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />

        </ScrollView>

        
        </KeyboardAvoidingView>

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
    marginTop: hp(10),
    alignItems: 'center',
    marginHorizontal: wp(8),
  },
  headerText: {
    fontSize: hp(2.7),
    alignSelf: 'center',
    marginLeft: wp(23),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  ti: {
    marginHorizontal: '7%',
    marginTop: '3%',
    width: "85%",
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
    borderRadius:10
  },
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#FACA4E',
    
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3)
  },textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#E7EAF2',
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },iconStyle: {
    color: '#C4C4C4',
    width: 20,
    height: 20,
  },iconStyleInactive: {
    color: '#FACA4E',
  }
});
