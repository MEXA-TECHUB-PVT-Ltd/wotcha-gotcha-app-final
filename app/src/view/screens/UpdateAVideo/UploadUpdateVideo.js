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
import React, {useState} from 'react';
import Video from 'react-native-video';
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

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

export default function UploadUpdateVideo({navigation, route}) {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const receivedData = route.params?.Video;

  console.log("Recieved Data", receivedData)

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <TouchableOpacity
        //onPress={() => togglePaused()}
        style={styles.backgroundVideo}>
        <Video
          resizeMode="cover" // Use "cover" to make it cover the entire screen
          repeat={true} // You can set other video props as needed
          source={{
            uri: receivedData.uri 
          }}
          style={{height: '100%', width: '100%'}}
        />
      </TouchableOpacity>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons name={'chevron-back'} color={'white'} size={25} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomView}>
        <View
          style={{
            height: hp(14),
            //borderWidth: 3,
            alignItems: 'center',
            marginHorizontal: wp(5),
          }}>
          <CustomButton
            title={'Next'}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              navigation.replace('UploadUpdateScreen',{ Video:receivedData });
              //console.log("kjjkbkjc ")
            }}
          />
          
         {/*  <TouchableOpacity onPress={()=>navigation.replace('UploadUpdateScreen',{ Video:receivedData })}>

          <Text
            style={{
              fontFamily: 'Inter',
              fontWeight: 'bold',
              fontSize: hp(2.1),
              color: '#FFFFFF',
            }}>
            Change Video
          </Text>
          </TouchableOpacity> */}
        </View>
      </View>
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
    //borderWidth: 3,
    justifyContent: 'flex-end',
    // You can add padding or content to this view as needed.
  },
  backgroundVideo: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
