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
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../../assets/Custom/CPaperInput';



const Category = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];

export default function UploadScreen() {
  const [profileName, setProfileName] = useState('');

  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [category, setCategory] = useState('');

  const [description, setDescription] = useState('');

  const { t } = useTranslation();
  const [isFocus, setIsFocus] = useState(false);



  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };
  return (
    <KeyboardAvoidingView
    style={{flex: 1, backgroundColor:'white'}}
    behavior='height' // You can use ‘height’ as well, depending on your preference
    enabled>
    
      
      <View style={styles.header}>
        <IonIcons name={'chevron-back'} color={'#282828'} size={25} />
        <Text style={styles.headerText}>{t('UploadPic')}</Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={{flex:1}}>

      <View
        style={{
          marginTop: hp(5),
          height: hp(30),
          borderWidth: 3,
          borderRadius: wp(8),
          marginHorizontal: wp(23),
        }}>
        <View
          style={{
            position: 'absolute',
            top: 10,
            left: 8,
            height: hp(3),
            width: wp(18),
            borderRadius: wp(3),
            backgroundColor: '#FACA4E',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: hp(1.3),
              fontFamily: 'Inter',
              color: '#232323',
              fontWeight: '700',
            }}>
              {t('ChangePic')}
            
          </Text>
        </View>
      </View>

      <TextInput
        mode="outlined"
        label={t('PicName')}
        onChangeText={text => setProfileName(text)}
        style={styles.ti}
        outlineColor="#0000001F"
        placeholderTextColor={'#646464'}
        activeOutlineColor="#FACA4E"
        autoCapitalize="none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        // left={isTextInputActive ? <Oemail /> : <Gemail />}
      />

      <View style={{marginHorizontal:wp(7)}}>

      <Dropdown
        style={
          isFocus
            ? styles.textInputSelectedCategory
            : styles.textInputCategoryNonSelected
        }
        containerStyle={{
          marginTop: 3,
          alignSelf: 'center',
          borderRadius: wp(3),
          width: '100%',
        }}
        // dropdownPosition="top"
        // mode="modal"
        placeholderStyle={{
          color: '#121420',
          //   fontWeight: '400',
          fontFamily: 'Inter',
          fontSize:hp(1.8),
        }}
        iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
        itemTextStyle={{color: '#000000'}}
        selectedTextStyle={{fontSize: 16, color: '#000000'}}
        // inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        value={category}
        data={Category}
        search={false}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={t('SelectCategory')}
        searchPlaceholder="Search..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setCategory(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? '#FACA4E' : '#C4C4C4'}
            name="down"
            size={15}
          />
        )}
      />
      </View>
        
        <View style={{justifyContent:'center',alignItems:'center', marginTop:hp(-1)}}>

         <CPaperInput
              multiline={true}
              placeholder={t('Description')}
              placeholderTextColor="#121420"
              value={description}
              onChangeText={text => setDescription(text)}
              height={hp(20)}
            />
        </View>
        <View style={{marginTop:hp(5), marginBottom:hp(5),justifyContent:'center',alignItems:'center'}}>

        <CustomButton
            title={t('Next')}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              //navigation.navigate('Profile_image');
            }}
          />
        </View>

        </ScrollView>

        
        </KeyboardAvoidingView>

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
    marginTop:Platform.OS == "ios" ? 0 : hp(3),
    alignItems: 'center',
    marginHorizontal: wp(8),
  },
  headerText: {
    fontSize: hp(2.3),
    alignSelf: 'center',
    marginLeft: wp(23),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  ti: {
    marginHorizontal: '7%',
    marginTop: '5%',
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#FACA4E',
    
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3)
  },textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#E7EAF2',
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },iconStyle: {
    color: '#C4C4C4',
    width: 20,
    height: 20,
  },iconStyleInactive: {
    color: '#FACA4E',
  }
});
