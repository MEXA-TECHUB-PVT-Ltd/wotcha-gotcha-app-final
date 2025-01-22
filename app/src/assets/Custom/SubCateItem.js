import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import NonVerified from "../svg/NonVerified.svg";
import { appImages } from "../utilities";
const SubCateItem = ({
  item,
  onPress,
  showusername,
  shownonVerify,
  showName,
  ShowEmoji,
  ShowThumbnail,
  CinematicContent,
  ShowUserImage,
  showNOImage,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        {
          ShowEmoji ? (
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
              <Text style={{ fontSize: hp(5) }}>{item.image}</Text>
            </View>
          ) : null
          // <Image source={{ uri: item.image }} style={styles.image} />
        }
        {/* {ShowThumbnail && item.thumbnail ? (
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
        ) : (
          <Image source={{ uri: item.image }} style={styles.image} />
        )} */}
        {ShowThumbnail && item.thumbnail ? (
          item.thumbnail === "" ||
          item.thumbnail === null ||
          item.thumbnail === undefined ? (
            <Image style={styles.thumbnail} source={appImages.galleryPlaceHolder} />
          ) : (
            <Image style={styles.image} source={{ uri: item.thumbnail }} />
          )
        ) : showNOImage ? null : item.image === "" ||
          item.image === null ||
          item.image === undefined ? (
          <Image style={styles.thumbnail} source={appImages.galleryPlaceHolder} />
        ) : (
          <Image style={styles.image} source={{ uri: item.image }} />
        )}
        {/* {ShowThumbnail && item.thumbnail ? (
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
        ) : showNOImage ? null : (
          <Image source={{ uri: item.image }} style={styles.image} />
        )} */}
        {/* User Info Section */}
        <View style={styles.userInfoContainer}>
          {/* User Image */}
          {ShowUserImage &&
            // User Image
            (item?.user_image ? (
              <View style={styles.userImageContainer}>
                <Image
                  source={{ uri: item?.user_image }}
                  style={styles.userImage}
                />
              </View>
            ) : (
              <View style={styles.placeholderIconContainer}>
                <MaterialCommunityIcons
                  name={"account-circle"}
                  size={24}
                  color={"#FACA4E"}
                />
              </View>
            ))}
          {/* {item?.user_image ? (
            <View style={styles.userImageContainer}>
              <Image
                source={{ uri: item?.user_image }}
                style={styles.userImage}
              />
            </View>
          ) : (
            <View style={styles.placeholderIconContainer}>
              <MaterialCommunityIcons
                name={"account-circle"}
                size={24}
                color={"#FACA4E"}
              />
            </View>
          )} */}

          {showusername ? (
            <View style={styles.usernameContainer}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.username}
              >
                {item.username}
              </Text>
            </View>
          ) : null}

          {showName ? (
            <View style={styles.usernameContainer}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.username}
              >
                {item.name}
              </Text>
            </View>
          ) : null}
          {CinematicContent && (
            <View>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.nametext}
              >
                {item.name}
              </Text>
              <Text ellipsizeMode="tail" numberOfLines={2} style={styles.text1}>
                {item.description}
              </Text>
            </View>
          )}
          {/* Username */}
          {/* <View style={styles.usernameContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.username}
            >
              {item.username}
            </Text>
          </View> */}

          {/* Non-Verified Icon */}
          {showusername ? (
            <View style={styles.nonVerifiedIcon}>
              <NonVerified />
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginRight: wp(2),
    width: wp(35),
    // alignItems: "center",
  },
  image: {
    width: wp(35),
    height: hp(12),
    resizeMode: "cover",
    borderRadius: wp(1),
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(5),
    width: wp(25),
  },
  userImageContainer: {
    width: wp(6),
    marginLeft: wp(0.5),
    height: wp(6),
    overflow: "hidden",
    borderRadius: wp(6) / 2,
  },
  userImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderIconContainer: {
    width: wp(6),
    marginLeft: wp(0.5),
    height: wp(6),
    borderRadius: wp(6) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  usernameContainer: {
    width: 70,
    marginLeft: wp(0.7),
  },
  username: {
    fontSize: hp(1.5),
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Inter",
  },

  nametext: {
    fontWeight: "700",
    color: "#4A4A4A",
    fontSize: hp(2),
    // textAlign: 'left',
    fontFamily: "Inter",
    marginTop: 5,
    fontSize: hp(1.9),
    // right: "20%",
  },
  text1: {
    color: "#4A4A4A",
    fontSize: hp(1.5),
    fontFamily: "Inter",
  },
  nonVerifiedIcon: {
    marginLeft: wp(1),
  },
});

export default SubCateItem;
