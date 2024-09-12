// BannerCarousel.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel'; // Ensure you have this dependency installed
import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";

const BannerCarousel = ({ isLoading, adsData, noDataMessage, onBannerPress }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        height: hp(17),
        // height: 160, 
        marginVertical: hp(2),
        // marginVertical: 16, 
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#FACA4E" />
      ) : adsData.length === 0 ? (
        <View style={styles.TopBannerView}>
          <Text style={{ fontWeight: 'bold', fontSize: hp(2.1) }}>{noDataMessage}</Text>
        </View>
      ) : (
        <Carousel
          data={adsData}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => onBannerPress(item.banner_link)}
              style={{ justifyContent: 'center' }}
            >
              <Image
                source={{ uri: item?.image }}
                style={{

                  height: hp(15),
                  width: '100%',
                  borderWidth: 1,
                  resizeMode:Platform.OS =="ios" ? 'cover':'contain',
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 0.9}
          loop={true}
          autoplay={true}
        />
      )}
    </View>
  );
};

export default BannerCarousel;
const styles = StyleSheet.create({
TopBannerView:{
    height:'100%',
    justifyContent: "center",
    alignItems: "center",
    width:'100%', borderWidth:1, borderColor:'gray',  borderRadius: 10, flex: 1,

  },
});