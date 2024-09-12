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
import { useTranslation } from 'react-i18next';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

LogBox.ignoreAllLogs();

export default function PrivacyPolicy({navigation}) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />

      <View style={{marginTop:hp(5)}}>

      <Headers onPress={()=>navigation.goBack()} showBackIcon={true} showText={true} text={t('PrivacyPolicy')} />

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop: hp(3)}}
        contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.TermsAndCondition}>
           {t('PrivacyText')}
         
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
