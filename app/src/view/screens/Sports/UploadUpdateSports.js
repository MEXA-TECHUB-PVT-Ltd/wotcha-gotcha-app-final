import {
    StyleSheet,

    StatusBar,
    ImageBackground,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import CustomButton from '../../../assets/Custom/Custom_Button';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import IonIcons from 'react-native-vector-icons/Ionicons';
  
  export default function UploadUpdateSports({navigation, route}) {

    const receivedData = route.params?.Video;
    return (
      <ImageBackground source={{uri:receivedData.uri}} style={{flex: 1}}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content" // You can set the StatusBar text color to dark or light
        />
  
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
  
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

              customClick={() => {
                navigation.navigate("UploadScreenSports", { Video: receivedData })
                //navigation.navigate('Profile_image');
              }}
            />

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
  