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
import RNFetchBlob from 'rn-fetch-blob';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomButton from '../../../assets/Custom/Custom_Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Headers from '../../../assets/Custom/Headers';
import SignatureCapture from 'react-native-signature-capture';
import { base_url } from '../../../../../baseUrl';
import { CLOUD_NAME, CLOUDINARY_URL, UPLOAD_PRESET } from '../../../../../cloudinaryConfig';
import Loader from '../../../assets/Custom/Loader';

export default function PostLetterEditSignature({navigation, route}) {
  const [name, setName] = useState('');
  const [authToken, setAuthToken] = useState('');
  const { t } = useTranslation();
  const [imageInfo, setImageInfo] = useState(null);

  const [userId, setUserId] = useState('');

  const [imageUri, setImageUri] = useState(null);

  const ref_RBSheetCameraCanvas = useRef(null);

  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(false);

  const [colorSelect, setColorSelect] = useState('#202020');

  const [selectedItem, setSelectedItem] = useState('');

  const signatureRef = useRef(null);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    await getUserID();
    setLoading(false);
  };

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);
      }
      const result3 = await AsyncStorage.getItem('authToken ');
      if (result3 !== null) {
        setAuthToken(result3);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }

    try {
      const result = await AsyncStorage.getItem('userName');
      if (result !== null) {
        setName(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

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

  const saveSign = () => {
    signatureRef.current.saveImage(encodedImage => {
    });
  };

  const heyy = () => {
  };

  const resetSign = () => {
    signatureRef.current.resetImage();
    setSavedSignature(null);
  };

  const onSaveEvent = result => {

    makeFile(result.encoded);
  };

  const handleUploadImages = data => {
    setLoading(true);
    const uri = imageInfo.uri;
    const type = imageInfo.type;
    const name = imageInfo.fileName;
    const sourceImage = {uri, type, name};
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
        createSignature(data.url);
      })
      .catch(err => {
        setLoading(false);
        console.log('Error While Uploading Video', err);
      });
  };

  //------------------------------------\\

  const makeFile = result => {
    const filePath = RNFetchBlob.fs.dirs.CacheDir + '/myImage.png';
    RNFetchBlob.fs
      .writeFile(filePath, result, 'base64')
      .then(() => {
        postLetterFile(filePath);
      })
      .catch(error => {
        console.error('Error saving file:', error);
      });
  };

  const postLetterFile = async filePath => {
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

      const data = JSON.parse(response.data);

      const fileEntity =
        data.file && data.file.length > 0 ? data.file[0] : null;

      if (fileEntity !== null && fileEntity !== undefined) {
        createSignature(fileEntity);
      } else {
      }
    } catch (error) {
   
    }
  };

  const createSignature = async data => {
    const token = authToken;
    const apiUrl = base_url + 'signature/createSignature';

    const requestData = {
      user_id: userId,
      image: data,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        navigation.replace('PostLetterEditSignaturePics', {
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
        });
      } else {
        setLoading(false);

        console.error(
          'Failed to upload video:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('API Request Error:', error);
      setLoading(false);
    }
  };


  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]);
        ref_RBSheetCameraCanvas.current.close();
        resetSign();
      }
      ref_RBSheetCameraCanvas.current.close();
      resetSign();

    });
  };


  const onDragEvent = () => {
    setImageInfo(null);
    setImageUri(null);
    setImageUrl('');
  };

  //--------------------\\

  const canvasRef = useRef(null);
  let ctx = null;
  let isDrawing = false;


  const [savedSignature, setSavedSignature] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 300; // Set your canvas width
      canvasRef.current.height = 300; // Set your canvas height
      ctx = canvasRef.current.getContext('2d');
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
    }
  }, []);

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
          text={t('EditSignature')}
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
              {t('Clear')}
            
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
              {t('UploadFromGallery')}
            {/* Upload From Gallery */}
          </Text>
        </TouchableOpacity>
      </View>

      {imageInfo && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>{t('UploadedSignature')}</Text>
          <View style={{marginTop: hp(3)}}>
            <Image
  
              source={{uri: imageUri}}
              style={{borderWidth: 3, width: 200, height: 100}}
            />
          </View>
        </View>
      )}

      <View style={{marginTop: '10%', alignSelf: 'center'}}>
        <CustomButton
          title={t('Done')}

          customClick={() => {
            if (imageInfo !== null) {
              handleUploadImages();
            } else {
              saveSign();
            }

          }}
        />
      </View>

      {loading && <Loader />}

  
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

            <Text style={{color: '#333333'}}>{t('Fromgallery')}</Text>
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
