import {StyleSheet, Text, Image, TouchableOpacity, FlatList, View} from 'react-native';
import React from 'react';
import Headers from '../../assets/Custom/Headers';
import {appImages} from '../../assets/utilities/index';
import IconPlus from '../../assets/svg/iconPlus.svg';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function PhoneBase() {
  const categories = [
    {id: 1, title: 'SnapChat', image: appImages.snapchat, icon: IconPlus},
    {id: 2, title: 'Gmail', image: appImages.gmail, icon: IconPlus},
    {id: 3, title: 'Pinterest', image: appImages.pinterest, icon: IconPlus},
    {id: 4, title: 'LinkedIn', image: appImages.linkedIn, icon: IconPlus},
    {id: 5, title: 'Calendar', image: appImages.calendar, icon: IconPlus},
    {id: 6, title: 'SnapChat', image: appImages.snapchat, icon: IconPlus},
    {id: 7, title: 'Gmail', image: appImages.gmail, icon: IconPlus},
    {id: 8, title: 'Pinterest', image: appImages.pinterest, icon: IconPlus},
    {id: 9, title: 'LinkedIn', image: appImages.linkedIn, icon: IconPlus},
    {id: 10, title: 'SnapChat', image: appImages.snapchat, icon: IconPlus},
  ];

  const renderPhoneBase = item => {
    console.log('Items', item);
    return (
      <View
        style={{
          height: hp(8),
          marginTop:hp(1),
          marginBottom:hp(1.5),
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: wp(7),
          borderWidth: 1,
          borderRadius: wp(3),
          borderColor: '#00000017',
        }}>
        <Image
          source={item.image}
          style={{width: 30, height: 80, marginLeft:wp(5)}}
          resizeMode="contain"
        />

        <Text style={{marginLeft:wp(3), flex:1, color:'#333333',fontFamily:'Inter'}}>
            {item.title}
        </Text>
        
        <TouchableOpacity style={{position: 'absolute', top: -7, right: -5}}>

        <item.icon width={18} height={18}/>

        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Headers
        showBackIcon={true}
        showText={true}
        text={'Phone Based Apps'}
        style={styles.textHeader}
      />

      <FlatList
        style={{marginTop: hp(3), flex:1}}
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => renderPhoneBase(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textHeader: {
    fontSize: wp(5.7),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
});
