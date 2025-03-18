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

import {appImages} from '../../assets/utilities/index';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../assets/Custom/Custom_Button';
import CustomSnackbar from '../../assets/Custom/CustomSnackBar';
import CheckedSubscription from '../../assets/svg/CheckedSubscription.svg';
import UnCheckedSubscription from '../../assets/svg/UnCheckedSubscription.svg';

import Headers from '../../assets/Custom/Headers';
import RBSheet from 'react-native-raw-bottom-sheet';

LogBox.ignoreAllLogs();

export default function SubscriptionPayment({navigation}) {
  const [selectedValue, setSelectedValue] = useState('');

  const changeSelectedValue = value => {
    setSelectedValue(value);
    console.log(value);
  };

  const payDesc = [
    {id: 1, desc: ' Seal your letter with a touch of elegance'},
    {id: 2, desc: 'Choose from a curated collection of luxurious'},
    {id: 3, desc: 'Opt for priority, expedited delivery services'},
    {id: 4, desc: 'Your words will be transformed into a work of art.'},
  ];

  const PlanDesc = ({PlanDescItems}) => {
    return (
      <View style={styles.PlanDescV}>
        <View
          style={{
            backgroundColor: '#FACA4E',
            width: 15,
            height: 15,
            borderRadius: 15,
          }}></View>

        <Text
          style={{marginLeft: wp(3), marginTop: hp(1), marginBottom: hp(1.4)}}>
          {PlanDescItems.desc}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
      
      <View style={{marginTop:hp(5)}}>

      <Headers onPress={()=>navigation.goBack()} showBackIcon={true} />


      </View>

      <View
          style={{
            flex: 1,
         justifyContent:'center',
            alignItems: 'center',
  
          }}>
          <Image source={appImages.alert} style={{resizeMode: 'contain', height:60}}  />
          <Text style={{fontSize:20,  fontFamily: 'Inter-Bold', marginTop:20}} >
          Not Available Now!
          </Text>
     </View>
      {/* <View style={{marginLeft: wp(7), marginTop: hp(3)}}>
        <Text
          style={{
            color: '#333333',
            //textAlign: 'center',
            fontWeight: 'bold',
            fontSize: hp(3.2),
            fontFamily: 'Inter',
          }}>
          Choose a Plan
        </Text>
      </View>

      <View style={{marginLeft: wp(7), marginTop: hp(2)}}>
        <Text
          style={{
            color: '#9597A6',
            //textAlign: 'center',
            fontWeight: '100',
            lineHeight: hp(3),
            fontSize: hp(2),
            fontFamily: 'Inter',
          }}>
          Upgrade to our Premium Plan for an{'\n'}enhanced experience
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => changeSelectedValue('Days')}
        style={
          selectedValue === 'Days'
            ? styles.checkedPayment
            : styles.unCheckedPayment
        }>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(5),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#FACA4E',
              //textAlign: 'center',
              fontWeight: 'bold',
              fontSize: hp(2.8),
              fontFamily: 'Inter',
            }}>
            10-days
          </Text>
          {selectedValue === 'Days' ? (
            <CheckedSubscription width={20} height={20} />
          ) : (
            <UnCheckedSubscription width={20} height={20} />
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(5),

            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#333333',
              //textAlign: 'center',
              fontWeight: 'bold',
              fontSize: hp(3),
              fontFamily: 'Inter',
            }}>
            $15.00
          </Text>

          <Text
            style={{
              color: '#9597A6',
              //textAlign: 'center',
              fontWeight: '400',
              fontSize: hp(2),
              fontFamily: 'Inter',
            }}>
            {} for 10-days
          </Text>
        </View>
      </TouchableOpacity> */}

      {/* Monthly */}

      {/* <TouchableOpacity
        onPress={() => changeSelectedValue('Monthly')}
        style={
            selectedValue === 'Monthly'
              ? styles.checkedPayment
              : styles.unCheckedPayment
          }>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(5),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#FACA4E',
              //textAlign: 'center',
              fontWeight: 'bold',
              fontSize: hp(2.8),
              fontFamily: 'Inter',
            }}>
            Monthly
          </Text>

          {selectedValue === 'Monthly' ? (
            <CheckedSubscription width={20} height={20} />
          ) : (
            <UnCheckedSubscription width={20} height={20} />
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(5),

            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#333333',
              //textAlign: 'center',
              fontWeight: 'bold',
              fontSize: hp(3),
              fontFamily: 'Inter',
            }}>
            $15.00
          </Text>

          <Text
            style={{
              color: '#9597A6',
              //textAlign: 'center',
              fontWeight: '400',
              fontSize: hp(2),
              fontFamily: 'Inter',
            }}>
            {} for 10-days
          </Text>
        </View>
      </TouchableOpacity> */}
      {/* //----------\\ */}
{/* 
      <View style={{marginLeft: wp(5), marginTop: hp(4)}}>
        <FlatList
          data={payDesc}
          keyExtractor={(item, index) => index.toString()} // You can use a more appropriate key if available
          renderItem={({item}) => <PlanDesc PlanDescItems={item} />}
        />
      </View>

      <View
        style={{
          marginTop: hp(3),
          marginBottom: hp(5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomButton
          title={'Pay'}
          load={false}
          // checkdisable={inn == '' && cm == '' ? true : false}
          customClick={() => {
            navigation.goBack()
            //ref_RBSheetLogout.current.open();
            //navigation.navigate('Profile_image');
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  checkedPayment: {
    marginHorizontal: wp(5),
    marginTop: hp(5),
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: wp(5),
    height: hp(15),
    borderColor: '#FACA4E',
  },
  unCheckedPayment: {
    marginHorizontal: wp(5),
    marginTop: hp(5),
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: wp(5),
    height: hp(15),
    borderColor: '#00000017',
  },
  PlanDescV: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(2.1),
  },
});
