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

import Headers from '../../assets/Custom/Headers';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

LogBox.ignoreAllLogs();

export default function TermsAndCondition({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />

      <View style={{marginTop:hp(5)}}>

      <Headers onPress={()=>navigation.goBack()} showBackIcon={true} showText={true} text={'Terms And Condition'} />

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop: hp(3)}}
        contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.TermsAndCondition}>
          We would like to make sure you are fully aware of all of your data
          protection rights. Every user is entitled to the following: The right
          to access – You have the right to request copies of your personal
          data. We may charge you a small fee for this service. The right to
          rectification – You have the right to request that we correct any
          information you believe is inaccurate. You also have the right to
          request that we complete the information you believe is incomplete.
          The right to erasure – You have the right to request that we erase
          your personal data, under certain conditions. The right to restrict
          processing – You have the right to request that we restrict the
          processing of your personal data, under certain conditions. The right
          to object to processing – You have the right to object to our
          processing of your personal data, under certain conditions. The right
          to data portability – You have the right to request that we transfer
          the data that we have collected to another organization, or directly
          to you, under certain conditions. If you make a request, we have one
          month to respond to you. If you would like to exercise any of these
          rights, please contact us. Another part of our priority is adding
          protection for children while using the internet. We encourage parents
          and guardians to observe, participate in, and/or monitor and guide
          their online activity. mtechub llc does not knowingly collect any
          Personal Identifiable Information from children under the age of 13.
          If you think that your child provided this kind of information on our
          website, we strongly encourage you to contact us immediately and we
          will do our best efforts to promptly remove such information from our
          records.
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
