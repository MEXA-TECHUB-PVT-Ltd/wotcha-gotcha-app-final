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
  import Back from '../../../assets/svg/back.svg';
  import {appImages} from '../../../assets/utilities/index';
  import CustomButton from '../../../assets/Custom/Custom_Button';

  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  export default function ChangeImageScreen() {
    return (
      <ImageBackground source={appImages.videoBG} style={{flex: 1}}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content" // You can set the StatusBar text color to dark or light
        />
  
  
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
  
              customClick={() => {
      
              }}
            />
  
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight:'bold',
                fontSize: hp(2.1),
                color: '#FFFFFF',
              }}>
              Change Image
            </Text>
          </View>
        </View>
      </ImageBackground>
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
  });
  