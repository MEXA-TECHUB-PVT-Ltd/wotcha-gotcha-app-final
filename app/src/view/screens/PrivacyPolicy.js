import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  LogBox,
  Animated,
  ImageBackground,
  Pressable,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {appImages} from '../../../assets/utilities/index';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Headers from './../../assets/Custom/Headers';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

LogBox.ignoreAllLogs();

export default function PrivacyPolicy({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />

      <View style={{marginTop:hp(5)}}>

      <Headers onPress={()=>navigation.goBack()} showBackIcon={true} showText={true} text={'Privacy Policy'} />

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop: hp(3)}}
        contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.TermsAndCondition}>
          At mtechub llc, accessible from https://mtechub.com, one of our main
          priorities is the privacy of our visitors. This Privacy Policy
          document contains types of information that is collected and recorded
          by mtechub llc and how we use it. If you have additional questions or
          require more information about our Privacy Policy, do not hesitate to
          contact us. This Privacy Policy applies only to our online activities
          and is valid for visitors to our website with regards to the
          information that they shared and/or collect in mtechub llc. This
          policy is not applicable to any information collected offline or via
          channels other than this website. The personal information that you
          are asked to provide, and the reasons why you are asked to provide it,
          will be made clear to you at the point we ask you to provide your
          personal information. If you contact us directly, we may receive
          additional information about you such as your name, email address,
          phone number, the contents of the message and/or attachments you may
          send us, and any other information you may choose to provide. When you
          register for an Account, we may ask for your contact information,
          including items such as name, company name, address, email address,
          and telephone number. Like any other website, mtechub llc uses
          'cookies'. These cookies are used to store information including
          visitors' preferences, and the pages on the website that the visitor
          accessed or visited. The information is used to optimize the users'
          experience by customizing our web page content based on visitors'
          browser type and/or other information.
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
    color: '#595959',
    marginHorizontal: wp(8),
    fontSize: hp(1.7),
    fontWeight: '400',
    lineHeight: hp(3),
  },
});
