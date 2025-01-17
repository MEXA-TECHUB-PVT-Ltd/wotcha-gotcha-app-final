import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { appImages } from "../utilities";
import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const TopContent = ({
  data,
  placeholderImage,
  onPress,
  titleStyle,
  descriptionStyle,
  containerStyle,
  showUsername,
  showTopimage,
  showTopVideo,
  ShowEmoji
}) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Image or Video Placeholder */}
      <View style={styles.mediaContainer}>
        {/* {data === undefined ? (
          <Image
            style={styles.placeholderImage}
            source={placeholderImage}
          />
        ) : (
          <TouchableOpacity
            style={styles.touchableMedia}
            onPress={onPress}
          >
            <Image
              style={styles.media}
            //   source={{ uri: data.image || data.video  || data.thumbnail}}
            source={appImages.videoPlaceHolder}
            />
          </TouchableOpacity>
        )} */}
       {showTopVideo ? (
          <TouchableOpacity style={styles.touchableMedia} onPress={onPress}>
            <Image
              style={styles.media}
              source={appImages.videoPlaceHolder}
              // source={
              //   data?.video && data.video.trim() !== "" // Check if video exists
              //     ? { uri: data.video } // Display video thumbnail
              //     : appImages.videoPlaceHolder // Show video placeholder
              // }
            />
          </TouchableOpacity>
        ) : null}
        {showTopimage ? (
  <TouchableOpacity style={styles.touchableMedia} onPress={onPress}>
    <Image
      style={styles.media}
      source={
        data?.image && data.image.trim() !== "" // Check if image exists
          ? { uri: data.image } // Show image
          : data?.thumbnail && data.thumbnail.trim() !== "" // Check if thumbnail exists
          ? { uri: data.thumbnail } // Show thumbnail
          : appImages.galleryPlaceHolder // Fallback to placeholder
      }
    />
  </TouchableOpacity>
) : null}
      {/* {showTopimage && !showTopVideo ? (
          <TouchableOpacity style={styles.touchableMedia} onPress={onPress}>
            <Image
              style={styles.media}
              source={
                data?.image && data.image.trim() !== "" // Check if image exists
                  ? { uri: data.image || data.thumbnail } // Display image
                  : appImages.galleryPlaceHolder // Show gallery placeholder for Pic/News
              }
            />
          </TouchableOpacity>
        ) : null} */}
      {ShowEmoji ? (
          <TouchableOpacity style={styles.touchableMedia} onPress={onPress}>
            <View
                     style={{
                       width: "100%",
                       justifyContent: "center",
                       alignItems: "center",
                       height: hp(10),
                       borderRadius: wp(1),
                       resizeMode: "stretch",
                       borderWidth: 1, // Border width
                       borderColor: "grey", // Border color
                     }}
                   >
                     <Text style={{ fontSize: hp(5) }}>{data.image}</Text>
                   </View>
          </TouchableOpacity>
        ) : null}
        {/* Title */}
        {showUsername && data?.username && (
          <View style={styles.titleContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[styles.title, titleStyle]}
            >
              {data.username}
            </Text>
          </View>
        )}
        {data?.name && (
          <View style={styles.titleContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[styles.title, titleStyle]}
            >
              {/* {data?.name || "No Title Available"} */}
              {data?.name === undefined || data?.name === ''
                 ? t('Dashboard.NoDataavailable')
                 : data?.name}
                   
              {/* {data?.name || "No Title Available"} */}
            </Text>
          </View>
        )}
      </View>
      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={6}
          style={[styles.description, descriptionStyle]}
        >
           {data?.description === undefined || data?.description === ''
                 ? t('Dashboard.NoDataavailable')
                 : data?.description}
          {/* {data?.description || "No description available."} */}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(1),
    flexDirection: "row",
    height: hp(13),
    marginBottom: 40,
    // backgroundColor:'yellow'
  },
  mediaContainer: {
    width: "35%",
    // height: "90%",
    borderRadius: 10,
    position: "relative",
    // backgroundColor:'red'
  },
  placeholderImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "70%",
    borderRadius: 10,
    resizeMode: "contain",
  },
  touchableMedia: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  media: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },
  titleContainer: {
    position: "absolute",
    top: hp(13), // Adjust to fit media height
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "black",
    // marginLeft: 12,
  },
  descriptionContainer: {
    justifyContent: "flex-start",
    width: "50%",
    paddingTop: 2,
  },
  description: {
    fontSize: 12,
    marginLeft: 5,
    lineHeight: 18,
    color: "#000000",
  },
});

export default TopContent;
