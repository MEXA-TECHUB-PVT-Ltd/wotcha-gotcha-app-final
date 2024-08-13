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

import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
import Share from 'react-native-share';
import Blogss from '../../../assets/images/logo.png';
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

const Category = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];

const chats = [
  {
    id: 1,
    title: 'The Art of Mindful Cooking: Enhancing Your Culinary Experience',
    date: '26-09-2023',
  },
  {
    id: 2,
    title: 'exploring the Wonders of Virtual Reality Travel',
    date: '26-09-2023',
  },
  {
    id: 3,
    title: 'The Art of Mindful Cooking: Enhancing Your Culinary Experience',
    date: '26-09-2023',
  },
  {
    id: 4,
    title: 'exploring the Wonders of Virtual Reality Travel',
    date: '26-09-2023',
  },
  {
    id: 5,
    title: 'The Art of Mindful Cooking: Enhancing Your Culinary Experience',
    date: '26-09-2023',
  },
  {
    id: 6,
    title: 'exploring the Wonders of Virtual Reality Travel',
    date: '26-09-2023',
  },
];

export default function BlogDetails({navigation}) {
  const renderBlogs = item => {
    console.log('Items', item);
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('')}
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(5),
            height: hp(12),
            marginTop: hp(1.5),
            alignItems: 'center',
            paddingHorizontal: wp(3),
          }}>
          <View
            style={{
              height: hp(8),
              resizeMode: 'hidden',
              width: wp(21),
              borderRadius: wp(5),
            }}>
            <Image
              style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
              source={appImages.BlogsPic}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: wp(3),
              height: hp(7),
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Inter-Medium',
                fontSize: hp(1.5),
              }}>
              {item.title}
            </Text>

            <View style={{flexDirection: 'row', width: wp(39)}}>
              <Text
                style={{
                  color: '#646464',
                  fontFamily: 'Inter-Regular',
                  fontSize: hp(1.4),
                }}>
                Date Added:
              </Text>

              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Inter-Medium',
                  fontSize: hp(1.5),
                }}>
                {'    '}
                {item.date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: hp(0.1),
            width: '100%',
            backgroundColor: '#00000021',
          }}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
      <Headers showBackIcon={true} showText={true} text={'Blog Details'} />

      <View
        style={{
          height: hp(23),
          marginTop: hp(3),
          alignSelf: 'center',
          resizeMode: 'hidden',
          width: '80%',
          borderRadius: wp(5),
        }}>
        <Image
          style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
          source={appImages.BlogsPic}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop: hp(3)}}
        contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.TermsAndCondition}>
          Cooking is more than just a chore or a means to satisfy our hunger;
          it's an art form that allows us to express creativity, connect with
          our senses, and bring joy to our lives. Mindful cooking takes this
          concept to a whole new level. It's about being fully present in the
          kitchen, savoring every moment, and creating meals that not only
          nourish the body but also feed the soul. In this blog post, we'll
          explore the concept of mindful cooking and how it can enhance your
          culinary experience. Cooking is more than just a chore or a means to
          satisfy our hunger; it's an art form that allows us to express
          creativity, connect with our senses, and bring joy to our lives.
          Mindful cooking takes this concept to a whole new level. It's about
          being fully present in the kitchen, savoring every moment, and
          creating meals that not only nourish the body but also feed the soul.
          In this blog post, we'll explore the concept of mindful cooking and
          how it can enhance your culinary experience.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  TermsAndCondition: {
    color: '#343434',
    marginHorizontal: wp(10),
    fontSize: hp(1.7),
    fontFamily:'Inter-Regular',
    lineHeight: hp(3),
  },
});
