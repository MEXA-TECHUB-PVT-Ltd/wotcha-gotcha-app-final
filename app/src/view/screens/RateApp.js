import {
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fontiso from 'react-native-vector-icons/Fontisto';
import {appImages} from '../../assets/utilities';

import Headers from '../../assets/Custom/Headers';

import CPaperInput from '../../assets/Custom/CPaperInput';
import CustomButton from '../../assets/Custom/Custom_Button';


// import StarRating from 'react-native-star-rating';
import CustomSnackbar from '../../assets/Custom/CustomSnackBar';
import { useTranslation } from 'react-i18next';
export default function RateApp({navigation}) {
  const [starCount, setStarCount] = useState(5);
  const { t } = useTranslation();
  const [comment, setComment] = useState('');

  const [snackbarVisible, setSnackbarVisible] = useState(false);


  const dismissSnackbar = () => {
    setSnackbarVisible(true);
  };

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisible(false);
      navigation.goBack();
    }, 3000);
  };



  const onStarRatingPress = rating => {
    setStarCount(rating);
  };

  const handleSelectionAllForums = item => {
    setForumSelected(item);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{marginTop:Platform.OS =="ios" ? 0: hp(5)}}>
        <Headers showBackIcon={true} onPress={() => navigation.goBack()} />
      </View>
      <View
        style={{
          height: hp(18),
          marginTop: hp(5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 300, height: 300, resizeMode: 'contain'}}
          source={appImages.logo}
        />
      </View>

      <View style={{marginHorizontal:wp(21)}}>

      <StarRating
        disabled={false}
        maxStars={5}
        starSize={hp(4.3)}
        style={{height: hp(2)}}
        rating={starCount}
        selectedStar={onStarRatingPress}
        starStyle={{color: 'gold', marginRight: wp(0.8)}}
      />
      </View>

      <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp(3),
          }}>
          <CPaperInput
            multiline={true}
            placeholder={t('AddAComment')}
            placeholderTextColor="#B0B0B0"
            value={comment}
            onChangeText={text => setComment(text)}
            //height={hp(5)}
          />
        </View>


        <View style={{flex:1, 
          
          borderWidth:3, justifyContent:'flex-end'}}>
        <View style={{marginTop: '2%', alignSelf: 'center'}}>
          <CustomButton
            title={t('Submitted')}
            // title="Submitted"
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              handleUpdatePassword();
            }}
          />
        </View>
        </View>

        <CustomSnackbar
        message={t('Success')}
        messageDescription={t('YourRatingsSubmittedSuccessFully')}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
