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

import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlusPost from '../../assets/svg/PlusPost.svg';
import Approved from '../../assets/svg/Approved.svg';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../assets/svg/VolumeUp.svg';
import Like from '../../assets/svg/Like.svg';
import UnLike from '../../assets/svg/Unlike.svg';
import Comment from '../../assets/svg/Comment.svg';
import Send from '../../assets/svg/Send.svg';
import Download from '../../assets/svg/Download.svg';
import CustomButton from '../../assets/Custom/Custom_Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import EditItem from '../../assets/svg/UpdateItem.svg';

import Delete from '../../assets/svg/Delete.svg';



import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../assets/Custom/CPaperInput';
import Headers from '../../assets/Custom/Headers';

const Category = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];

export default function PrivateLetterDetails({navigation}) {
  const ref_RBSendOffer = useRef(null);
  const ref_RBSheetCamera = useRef(null);

  const availableApps = [
    {
      id: 1,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
  ];

  const renderAvailableApps = item => {
    console.log('Items', item);
    return (
      <View style={{width: wp(30), margin: 5}}>
        <View>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: '100%',
              height: hp(12),
              borderRadius: wp(3),
              resizeMode: 'cover',
            }}
            source={item.image}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(2),
            marginTop: hp(12.5),
          }}>
          <Text style={{fontSize: hp(1.1), fontWeight: 'bold', width: wp(23)}}>
            {item.title}
          </Text>

          <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{marginTop: hp(5)}}>
        <Headers showBackIcon={true} showText={true} text={'Letter Details'} />
      </View>

      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp(2.1),
            height: hp(2.6),
            backgroundColor: '#77BDF2',
            //borderWidth: 3,
          }}></View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(8),
            marginTop: hp(1.8),
            alignItems: 'center',
            justifyContent: 'space-between',
            height: hp(10),
            //borderWidth: 3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              //marginHorizontal: wp(8),
              //marginTop: hp(1.8),
              alignItems: 'center',
              height: hp(10),
              width: wp(30),
              //borderWidth: 3,
            }}>
            <View
              style={{
                //borderWidth: 3,
                height: hp(8),
                width: wp(18),
                borderRadius: wp(3),
              }}>
              <Image
                source={appImages.topSearches1}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(3),
                  resizeMode: 'cover',
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => ref_RBSheetCamera.current.open()}
              style={{marginLeft: wp(2.5)}}>
              <Approved width={20} height={20} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              //borderWidth: 3,
              height: hp(8),
              width: wp(18),
              borderRadius: wp(3),
            }}>
            <Image
              source={appImages.topSearches3}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: wp(3),
                resizeMode: 'cover',
              }}
            />
          </View>
        </View>

        <View
          style={{
            alignItems: 'flex-end',
            marginTop: hp(-1),
            marginRight: wp(25),
          }}>
          <Text
            style={{
              color: '#282828',
              fontSize: hp(1.8),
              marginLeft: wp(3),
              fontFamily: 'Inter-Bold',
              fontWeight: 'bold',
            }}>
            Paris, September 12, 2023
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: hp(5),
            marginTop: hp(1),
            alignItems: 'center',
            marginHorizontal: wp(8),
          }}>
          <Text
            style={{
              color: '#282828',
              marginLeft: wp(1),
              textDecorationLine: 'underline',
              fontFamily: 'Inter',
              fontWeight: 'bold',
            }}>
            Object:
          </Text>

          <Text
            style={{
              color: '#595959',
              marginLeft: wp(1),
              //textDecorationLine:'underline',
              fontFamily: 'Inter-Regular',
              //fontWeight: 'bold',
            }}>
            Important business porposal
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: wp(8),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#595959',
              marginLeft: wp(1),
              //textDecorationLine:'underline',
              fontFamily: 'Inter-Regular',
              //fontWeight: 'bold',
            }}>
            Dear Ms. Davis, {'\n'}I hope this letter finds you well. I am
            writing to you on behalf of XYZ Solutions, and I am excited to
            present an important business proposal that I believe could be
            mutually beneficial for both our companies. {'\n'}
            {'\n'}
            Over the past few months, our team has been thoroughly researching
            potential partners in the industry, and Davis Enterprises
            consistently stood out as a company with a remarkable track record
            of innovation and success. {'\n'}
            {'\n'}
            We are impressed by your commitment to excellence and your
            dedication to delivering top-notch products and services to your
            clients.I look forward to the possibility of working together and
            creating a prosperous future.{'\n'}
            {'\n'}
            We are impressed by your commitment to excellence and your
            dedication to delivering top-notch products and services to your
            clients.I look forward to the possibility of working together and
            creating a prosperous future.
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginHorizontal: wp(8),
            height: hp(7),
          }}>
          <Image
            source={appImages.Signature}
            style={{
              resizeMode: 'contain',
            }}
          />
        </View>

        <View
          style={{marginTop: hp(1), marginHorizontal: wp(8), height: '100%'}}>
          <FlatList
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            data={availableApps}
            horizontal
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderAvailableApps(item)}
          />
        </View>
      </ScrollView>

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
            height: hp(51),
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
              title="Buy Description"
              customClick={() => {
                ref_RBSendOffer.current.close();
                //navigation.navigate('ResetPassword');
              }}
              style={{width: wp(59)}}
            />
          </View>

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
        </View>
      </RBSheet>

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
            <Ionicons
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
          <View style={{flexDirection: 'row', marginHorizontal:wp(7)}}>

            <EditItem height={23} width={23}/>

          <Text
            style={{
              fontFamily: 'Inter-Regular',
              color: '#656565',
              marginLeft:wp(3),
              fontSize: hp(2.1),
            }}>

            Update Item

          </Text>

          </View>

          <View style={{height:hp(0.1), marginHorizontal:wp(8), marginTop:hp(3), backgroundColor:'#00000012'}}>

          </View>

          <View style={{flexDirection: 'row', marginTop:hp(2.5), marginHorizontal:wp(7)}}>

            <Delete height={23} width={23}/>

          <Text
            style={{
              fontFamily: 'Inter-Regular',
              color: '#656565',
              marginLeft:wp(3),
              fontSize: hp(2.1),
            }}>

            Delete Item

          </Text>

          </View>

          
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
});
