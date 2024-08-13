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
import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../assets/svg/VolumeUp.svg';
import Like from '../../assets/svg/Like.svg';
import UnLike from '../../assets/svg/Unlike.svg';
import Comment from '../../assets/svg/Comment.svg';
import Send from '../../assets/svg/Send.svg';
import Download from '../../assets/svg/Download.svg';

import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

export default function News({navigation, route}) {
  const [showFullContent, setShowFullContent] = useState(false);

  const [showLikes, setShowLikes] = useState(false);

  const receivedData = route.params?.News;

  console.log('Recieved Data News', receivedData);
  const details = receivedData?.description || '';
  // var details = receivedData.description
   // 'Hold onto your seats and get ready to be mesmerized by the beauty and grandeur of the Hold onto your seats';

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleContentLike = () => {
    setShowLikes(!showLikes);
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
    <View style={{flex: 1, backgroundColor:'#4A4A4A'}}>
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
          <View
            style={{
              height: hp(10),
              width: wp(10),
              borderRadius: wp(8),
              marginLeft: wp(3),
              overflow: 'hidden',
            }}>
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
              }}
              source={{uri:receivedData?.userimage}}
            />
          </View>

          <Text style={styles.textProfileName}>{receivedData.username}</Text>
        </View>
      </View>

      <View style={styles.centeredView}>
        {/* Centered Image */}
        <Image
          style={styles.centeredImage}
          source={{ uri: receivedData?.image }}
        />

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
    //flex: 1,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredImage: {
    width: '39%',
    height: hp(18), // Adjust the height as needed
    resizeMode: 'stretch',
    borderRadius: wp(2),
  },
});
