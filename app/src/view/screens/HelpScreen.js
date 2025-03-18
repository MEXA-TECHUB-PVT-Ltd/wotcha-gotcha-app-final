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
  TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {appImages} from '../../assets/utilities';

import Ionicons from 'react-native-vector-icons/Ionicons';


import Headers from '../../assets/Custom/Headers';

export default function HelpScreen({navigation}) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
       <View style={{marginTop: hp(5)}}>
      <Headers
        showText={true}
        text={t('Help')}
        onPress={() => navigation.goBack()}
        showBackIcon={true}
      />
      </View>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />

      <TouchableOpacity
            style={{
              marginHorizontal: wp(5),
              flexDirection: 'row',
              marginTop: hp(2),
              alignItems: 'center',
              paddingHorizontal: wp(3),
              justifyContent: 'space-between',
              height: hp(5),
            }}>
            <Text
              style={{color: '#000000', fontWeight: 'bold', fontSize: hp(2)}}>
                {t('Howitworks')}
              
            </Text>

            <Ionicons name={'chevron-forward'} size={20} color={'black'} />
          </TouchableOpacity>


          <TouchableOpacity
            style={{
              marginHorizontal: wp(5),
              flexDirection: 'row',
              marginTop: hp(2),
              alignItems: 'center',
              paddingHorizontal: wp(3),
              justifyContent: 'space-between',
              height: hp(5),
            }}>
            <Text
              style={{color: '#000000', fontWeight: 'bold', fontSize: hp(2)}}>
             {t('HelpCenter')}
            </Text>

            <Ionicons name={'chevron-forward'} size={20} color={'black'} />
          </TouchableOpacity>


          <TouchableOpacity
            style={{
              marginHorizontal: wp(5),
              flexDirection: 'row',
              marginTop: hp(2),
              alignItems: 'center',
              paddingHorizontal: wp(3),
              justifyContent: 'space-between',
              height: hp(5),
            }}>
            <Text
              style={{color: '#000000', fontWeight: 'bold', fontSize: hp(2)}}>
                {t('Insurance')}
           
            </Text>

            <Ionicons name={'chevron-forward'} size={20} color={'black'} />
          </TouchableOpacity>


          <TouchableOpacity
          onPress={()=>navigation.navigate("ContactUs")}
            style={{
              marginHorizontal: wp(5),
              flexDirection: 'row',
              marginTop: hp(2),
              alignItems: 'center',
              paddingHorizontal: wp(3),
              justifyContent: 'space-between',
              height: hp(5),
            }}>
            <Text
              style={{color: '#000000', fontWeight: 'bold', fontSize: hp(2)}}>
              {t('ContactUs')}
            </Text>

            <Ionicons name={'chevron-forward'} size={20} color={'black'} />
          </TouchableOpacity>




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
