import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';

import RNFetchBlob from 'rn-fetch-blob';

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

import Canvas from 'react-native-canvas';

import SignatureCapture from 'react-native-signature-capture';
import { base_url } from '../../../../../baseUrl';
import { CLOUD_NAME, CLOUDINARY_URL, UPLOAD_PRESET } from '../../../../../cloudinaryConfig';

export default function UpdatePostLetterEditSignature({navigation, route}) {
  const [name, setName] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [signatureId, setSignatureId] = useState('');

  const [imageInfo, setImageInfo] = useState(null);

  const [userId, setUserId] = useState('');

  const [fileType, setFileType] = useState('');

  const [fileName, setFileName] = useState('');

  const [imageUri, setImageUri] = useState(null);

  const ref_RBSheetCameraCanvas = useRef(null);

  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(false);

  const [colorSelect, setColorSelect] = useState('#202020');

  const [selectedItem, setSelectedItem] = useState('');

  const signatureRef = useRef(null);
  const receivedData = route.params?.receivedDataLetterreceivedData;
  console.log('receivedData in edit sign___', receivedData.signature_id);
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
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);
        console.log('user id retrieved done--:', result);
      }
      const result3 = await AsyncStorage.getItem('authToken ');
      if (result3 !== null) {
        setAuthToken(result3);
        // console.log('user token retrieved:', result3);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }

    try {
      const result = await AsyncStorage.getItem('userName');
      if (result !== null) {
        setName(result);
        // console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  //-------------------\\
 
  /* const saveSign = () => {
    signatureRef.current.saveImage();
  }; */

  const receivedDataName = route.params?.name;
  const receivedDatAddress = route.params?.address;
  const receivedDataContactNumber = route.params?.contactNumber;
  const receivedDataEmail = route.params?.email;
  const receivedDataCategoryId = route.params?.category_id;
  const receivedDataLetterType = route.params?.letterType;
  const receivedDataGreetingsTitle = route.params?.greetingsTitle;
  const receivedDataSubjectOfLetter = route.params?.subjectOfLetter;
  const receivedDatapostLetter = route.params?.postLetter;
  const receivedDataintroductionOfLetter = route.params?.introductionOfLetter;

  // console.log('Name', receivedDataName);
  // console.log('Address', receivedDatAddress);
  // console.log('Contact', receivedDataContactNumber);
  // console.log('Email', receivedDataEmail);
  // console.log('Id', receivedDataCategoryId);
  // console.log('LetterType', receivedDataLetterType);
  // console.log('LetterTypeAppeal', receivedDataLetterType);
  // console.log('Greetings', receivedDataGreetingsTitle);
  // console.log('Subject Of Letter', receivedDataSubjectOfLetter);
  // console.log('Post Letter', receivedDatapostLetter);
  // console.log('Introduction Of Letter', receivedDataintroductionOfLetter);

  const saveSign = () => {
    console.log('Before saveImage');

    signatureRef.current.saveImage(encodedImage => {
      console.log('Encoded Image');
      //console.log(("Encoded Image of:",encodedImage.encoded))
      // Save the encoded image to state
      /*  setSavedSignature(true);

      setEncodedImage(encodedImage.encoded) */
    });

    console.log('After saveImage');

    //heyy()
  };

  const heyy = () => {
    console.log('Heyy Ref', signatureRef);
    console.log('Heyy Signature', encodedImage);
  };

  const resetSign = () => {
    signatureRef.current.resetImage();
    setSavedSignature(null);
  };

  const onSaveEvent = result => {
    // result.encoded - for the base64 encoded png
    // result.pathName - for the file path name
    console.log('Encoded Image', result.encoded);

    console.log('Encoded File Path', result.pathName);

    makeFile(result.encoded);

    //console.log(("Encoded Image of:",encodedImage.encoded))
    // Save the encoded image to state
    //setSavedSignature(true);

    //setEncodedImage(result.encoded)

    //setEncodedFilePath(result.pathName)

    //generateRandomName()
    /* 
    if(fileName!==''){
      handleUploadImage()
    } */

    //extractFileInfo(result.pathName)

    /* if(fileName!=='' && fileType!== ''){
      handleUploadImage()
    } */

    //handleUploadImage()
  };

  //handleUploadImage

  //upload pic

  const handleUploadImages = data => {
    setLoading(true);
    const uri = imageInfo.uri;
    const type = imageInfo.type;
    const name = imageInfo.fileName;
    const sourceImage = {uri, type, name};
    console.log('Source Image', sourceImage);
    const dataImage = new FormData();
    dataImage.append('file', sourceImage);
    dataImage.append('upload_preset', UPLOAD_PRESET); // Use your Cloudinary upload preset
    dataImage.append('cloud_name', CLOUD_NAME); // Use your Cloudinary cloud name
 
    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: dataImage,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        setImageUrl(data.url); // Store the Cloudinary video URL in your state
        //uploadVideo(data.url)
        //uploadXpiVideo(data.url);
        console.log('Image Url', data);
        createSignature(data.url);
        //uploadXpiVideo(data.url,data)
        // uploadVideo(data.url);
      })
      .catch(err => {
        setLoading(false);
        console.log('Error While Uploading Video', err);
      });
  };

  //------------------------------------\\

  const makeFile = result => {
    // console.log('Came to file', result);
    // Decode the base64 data
    const filePath = RNFetchBlob.fs.dirs.CacheDir + '/myImage.png';

    // Write the base64 data to a file
    RNFetchBlob.fs
      .writeFile(filePath, result, 'base64')
      .then(() => {
        console.log('File saved successfully:', filePath);
        postLetterFile(filePath);
        // Now, you can use the filePath to display or upload the image as needed
      })
      .catch(error => {
        console.error('Error saving file:', error);
      });
  };

  const postLetterFile = async filePath => {
    console.log('Post <> ', filePath);
    const uploadEndpoint = base_url + 'xpi/fileUpload';
    const token = authToken;

    try {
      const response = await RNFetchBlob.fetch(
        'POST',
        uploadEndpoint,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'file',
            filename: 'myImage.png',
            type: 'image/png',
            data: RNFetchBlob.wrap(filePath),
          },
        ],
      );

      //console.log('Upload Response:', response.data);

      const data = JSON.parse(response.data);

      // Extract the file entity
      const fileEntity =
        data.file && data.file.length > 0 ? data.file[0] : null;

      // Use the file entity as needed
      console.log('File Entity Type:', typeof fileEntity);
      console.log('File Entity:', fileEntity);

      if (fileEntity !== null && fileEntity !== undefined) {
        console.log('Going To Statement');

        createSignature(fileEntity);
      } else {
        console.log('File Entity is null or empty.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const createSignature = async data => {
    console.log('Image Uri of encoded', data);
    setLoading(true);
    const token = authToken;
    const apiUrl = base_url + 'signature/updateSignature';

    const requestData = {
      id: receivedData.signature_id,
      image: data,
    };
    console.log('Request Data:', requestData);
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('API Response for signature:', data.data?.signature_created_at);
        console.log('API Response for signature:', data);

        setLoading(false);
        navigation.replace('UpdatePostLetterEditSignaturePics', {
          greetingsTitle: receivedDataGreetingsTitle,
          subjectOfLetter: receivedDataSubjectOfLetter,
          introductionOfLetter: receivedDataintroductionOfLetter,
          postLetter: receivedDatapostLetter,
          name: receivedDataName,
          address: receivedDatAddress,
          contactNumber: receivedDataContactNumber,
          email: receivedDataEmail,
          category_id: receivedDataCategoryId,
          letterType: receivedDataLetterType,
          formOfApeal: 'My appeal',
          letterImg: data,
          signatureId: data.data?.signature_id,
          signatureCreatedAt: data.data?.signature_created_at,
          receivedData: receivedData

        });
        //handleUpdatePassword();
        
        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          'Failed to upload video:',
          response.status,
          response.statusText,
        );
        // Handle the error
      }
    } catch (error) {
      console.error('API Request Error:', error);
      setLoading(false);
      // Handle the error
    }
  };

  //-----------Checking Image----------------\\

  const takePhotoFromCamera = async value => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: 'photo',
        //videoQuality: 'medium',
      },
      response => {
        console.log('image here', response);

        if (!response.didCancel) {
          ref_RBSheetCameraCanvas.current.close();
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
            console.log('response', response.assets[0].uri);
            setImageInfo(response.assets[0]);
            ref_RBSheetCameraCanvas.current.close();
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setImageUri(response.uri);
            console.log('response null', response.uri);
            ref_RBSheetCameraCanvas.current.close();
          }
        }
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        console.log('Response', response.assets[0]);
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]);
        ref_RBSheetCameraCanvas.current.close();
        resetSign();
      }
      ref_RBSheetCameraCanvas.current.close();
      resetSign();

      console.log('response', imageInfo);
    });
  };

  //------------------------------------------\\

  const generateRandomName = () => {
    // Generate a random string as a unique identifier
    const randomString = Math.random().toString(36).substring(2, 10);

    // Get the current timestamp
    const timestamp = new Date().getTime();

    // Combine the random string and timestamp to create a unique name
    const uniqueName = `${randomString}_${timestamp}.png`;

    setFileName(uniqueName);

    return uniqueName;
  };

  const extractFileInfo = filePath => {
    // Use the platform-specific path delimiter
    const pathDelimiter = Platform.OS === 'android' ? '/' : '/';

    // Split the file path using the path delimiter
    const pathComponents = filePath.split(pathDelimiter);

    // Get the last component, which is the file name
    const fileName = pathComponents[pathComponents.length - 1];

    // Split the file name to get the file type
    const fileNameComponents = fileName.split('.');
    const fileType =
      fileNameComponents.length > 1 ? fileNameComponents.pop() : null;

    setFileName(fileName);

    setFileType(fileType);

    return {fileName, fileType};
  };

  const handleUploadImage = data => {
    setLoading(true);

    const uri = encodedFilePath;
    const type = 'image/png';
    const name = fileName;
    const sourceImage = {uri, type, name};
    //console.log('Source Image', sourceImage);
    console.log('Came to Upload Image', fileType);
    const dataImage = new FormData();
    dataImage.append('file', sourceImage);
    dataImage.append('upload_preset', UPLOAD_PRESET); // Use your Cloudinary upload preset
    dataImage.append('cloud_name', CLOUD_NAME); // Use your Cloudinary cloud name

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: dataImage,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        setImageUrl(data.url); // Store the Cloudinary video URL in your state
        //uploadVideo(data.url)
        //uploadXpiVideo(data.url);
        console.log('Image Url', data);
        //uploadXpiVideo(data.url,data)
        // uploadVideo(data.url);
      })
      .catch(err => {
        setLoading(false);
        console.log('Error While Uploading Video', err);
      });
  };

  const onDragEvent = () => {
    // This callback will be called when the user enters a signature
    console.log('dragged');
    setImageInfo(null);
    setImageUri(null);
    setImageUrl('');
  };

  //--------------------\\

  const canvasRef = useRef(null);
  let ctx = null;
  let isDrawing = false;

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [isTextInputActiveAddress, setIsTextInputActiveAddress] =
    useState(false);

  const [isTextInputActiveContact, setIsTextInputActiveContact] =
    useState(false);

  const [savedSignature, setSavedSignature] = useState(false);

  const [encodedImage, setEncodedImage] = useState(null);

  const [encodedFilePath, setEncodedFilePath] = useState(null);

  const [isTextInputActiveEmail, setIsTextInputActiveEmail] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const ref_RBSheetCamera = useRef(null);
  const [postLetter, setPostLetter] = useState('');
  const [letterType, setLetterTypes] = useState('Public');

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 300; // Set your canvas width
      canvasRef.current.height = 300; // Set your canvas height
      ctx = canvasRef.current.getContext('2d');
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
    }
  }, []);

  /* const handleTouchStart = (event) => {
    isDrawing = true;
    ctx.beginPath();
    const { pageX, pageY } = event.touches[0];
    ctx.moveTo(pageX, pageY);
    console.log("event", event)
  };

  const handleTouchMove = (event) => {
    if (!isDrawing) return;
    const { pageX, pageY } = event.touches[0];
    ctx.lineTo(pageX, pageY);
    ctx.stroke();
  };

  const handleTouchEnd = () => {
    isDrawing = false;
    ctx.closePath();
  }; */

  /* handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 100, 100);
  } */

  const handleTouchStart = event => {
    if (canvasRef.current) {
      isDrawing = true;
      const {pageX, pageY} = event.nativeEvent.touches[0];
      ctx.beginPath();
      ctx.moveTo(pageX, pageY);
    }
  };

  const handleTouchMove = event => {
    if (canvasRef.current && isDrawing) {
      const {pageX, pageY} = event.nativeEvent.touches[0];
      ctx.lineTo(pageX, pageY);
      ctx.stroke();
    }
  };

  const handleTouchEnd = () => {
    isDrawing = false;
    ctx.closePath();
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

  //------------------------\\

  //---------------------------------\\
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{marginTop: hp(5), height: hp(8)}}>
        <Headers
          showBackIcon={true}
          showText={true}
          text={'Edit Signature'}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View
        style={{
          borderRadius: wp(10),
          marginTop: hp(10),
          alignSelf: 'center',
          width: '80%',
          height: hp(50),
          //backgroundColor:'black',
          borderColor: '#E7EAF2',
          borderWidth: 1,
          overflow: 'hidden',
        }}>
        <SignatureCapture
          style={{width: '100%', height: '100%'}}
          ref={signatureRef}
          onSaveEvent={onSaveEvent}
          onDragEvent={onDragEvent}
          saveImageFileInExtStorage={true}
          showNativeButtons={false}
          showTitleLabel={false}
          //backgroundColor={'black'}
          strokeColor={colorSelect}
          minStrokeWidth={10}
          maxStrokeWidth={10}
          viewMode={'portrait'}
        />
      </View>
      {/* <View style={{marginLeft:wp(8), marginTop:hp(5)}}>

      <CPaperInput
          multiline={true}
          placeholder={'Description'}
          //heading={'Email Address'}
          placeholderTextColor="#121420"
          value={email}
          onChangeText={text => setEmail(text)}
          height={hp(38)}
        />

      </View> */}

      <View
        style={{
          flexDirection: 'row',
          marginTop: hp(5),
          height: hp(8),
          marginHorizontal: wp(8),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => resetSign()}>
          <Text
            style={{
              color: '#FACA4E',
              fontFamily: 'Inter-Regular',
              fontSize: hp(1.7),
            }}>
            Clear
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: hp(5),
            width: wp(23),
          }}>
          <TouchableOpacity
            onPress={() => setColorSelect('#202020')}
            style={{
              width: wp(5),
              height: wp(5),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#202020',
              borderRadius: wp(5) / 2,
            }}>
            {colorSelect === '#202020' ? (
              <AntDesign color={'#FFFFFF'} name={'check'} size={12} />
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setColorSelect('#FFF500')}
            style={{
              width: wp(5),
              height: wp(5),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFF500',
              borderRadius: wp(5) / 2,
            }}>
            {colorSelect === '#FFF500' ? (
              <AntDesign color={'#FFFFFF'} name={'check'} size={12} />
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setColorSelect('#225DD9')}
            style={{
              width: wp(5),
              height: wp(5),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#225DD9',
              borderRadius: wp(5) / 2,
            }}>
            {colorSelect === '#225DD9' ? (
              <AntDesign color={'#FFFFFF'} name={'check'} size={12} />
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{height: hp(8), alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => choosePhotoFromLibrary('gallery')}
          style={{
            justifyContent: 'center',
            //marginLeft: wp(10),
            alignItems: 'center',
            alignSelf: 'center',
            height: hp(5),
            width: wp(28),
            borderRadius: wp(5) /* backgroundColor:'#FACA4E' */,
          }}>
          <Text
            style={{
              color: '#FACA4E',
              textAlign: 'center',
              fontFamily: 'Inter-Regular',
              fontSize: hp(1.7),
            }}>
            Upload From Gallery
          </Text>
        </TouchableOpacity>
      </View>

      {imageInfo && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Uploaded Signature:</Text>
          <View style={{marginTop: hp(3)}}>
            <Image
              //source={{uri: `data:image/png;base64,${encodedImage}`}}
              source={{uri: imageUri}}
              style={{borderWidth: 3, width: 200, height: 100}}
            />
          </View>
        </View>
      )}

      <View style={{marginTop: '10%', alignSelf: 'center'}}>
        <CustomButton
          title="Done"
          // load={loading}
          // checkdisable={inn == '' && cm == '' ? true : false}
          customClick={() => {
            if (imageInfo !== null) {
              handleUploadImages();
            } else {
              saveSign();
            }
            //saveSign();
            //navigation.navigate('PostLetterEditSignaturePics');
            //navigation.navigate('Profile_image');
          }}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading && <ActivityIndicator size="large" color="#FACA4E" />}
      </View>

      {/*  <TouchableOpacity
            onPress={() => ref_RBSheetCameraCanvas.current.close()}
            style={
              selectedItem === 'camera'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
           <Image source={appImages.ArtBoard} style={{ resizeMode:'contain'}}/>

            <Text style={{marginTop:hp(-1.8),color: '#333333'}}>From canvas</Text>
          </TouchableOpacity> */}

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
          <Text style={styles.maintext}>Select an option</Text>
          <TouchableOpacity
            onPress={() => ref_RBSheetCameraCanvas.current.close()}>
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

            <Text style={{color: '#333333'}}>From gallery</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  canvas: {
    borderWidth: 1,
  },
  signature: {
    marginTop: hp(3),
    borderRadius: 5,
    height: hp(39),
    width: '80%',
    //borderColor: '#E7EAF2',
    borderWidth: 1,
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
});
