import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Approved from "../svg/Approved";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useTranslation } from 'react-i18next';
const TopLetterComponent = ({ LetterData, navigation }) => {
    const { t } = useTranslation();
  const topLetterData = LetterData?.topLetter;
  const convertTimeAndDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
    });
  };
const top_post_date = convertTimeAndDate(topLetterData?.post_date );
  if (!topLetterData) {
    return (
      <View style={styles.noLetterContainer}>
        <Text style={styles.noLetterText}>{t("NoTopAvailable")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("LetterDetails", {
            Letters: topLetterData,
            identifier: false,
          })
        }
        style={styles.touchableContainer}
      >
        {/* Top Bar */}
        <View style={styles.topBar}></View>

        <View>
          {/* User Info */}
          <View style={styles.userInfoContainer}>
            {topLetterData?.userimage ? (
              <View style={styles.userImageContainer}>
                <Image
                  source={{ uri: topLetterData.userimage }}
                  style={styles.userImage}
                />
              </View>
            ) : (
              <MaterialCommunityIcons
                style={styles.icon}
                name={"account-circle"}
                size={35}
                color={"#FACA4E"}
              />
            )}
            <View style={styles.approvedIcon}>
              <Approved width={10} height={10} />
            </View>
          </View>

          {/* Post Date */}
          <View style={styles.postDateContainer}>
            <Text style={styles.postDateText}>{top_post_date}</Text>
          </View>

          {/* Subject */}
          <View style={styles.subjectContainer}>
            <Text style={styles.subjectLabel}>{t("Dashboard.Subject")}</Text>
            <View style={styles.subjectTextContainer}>
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={styles.subjectText}
              >
                {topLetterData.subject_place}
              </Text>
            </View>
          </View>

          {/* Bottom Bar */}
          <View style={styles.bottomBar}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(1.5),
    marginBottom: hp(0.1),
    flexDirection: "row",
    height: hp(14),
  },
  touchableContainer: {
    width: wp(45),
    marginHorizontal: wp(2),
  },
  topBar: {
    backgroundColor: "#77BDF2",
    height: 2,
    width: "100%",
  },
  userInfoContainer: {
    flexDirection: "row",
    paddingHorizontal: 2,
    alignItems: "center",
    height: hp(4),
  },
  userImageContainer: {
    height: hp(2),
    width: wp(4),
    borderRadius: wp(3),
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: wp(3),
    resizeMode: "cover",
  },
  icon: {
    marginTop: hp(0.5),
  },
  approvedIcon: {
    marginLeft: wp(2.5),
  },
  postDateContainer: {
    alignItems: "flex-end",
    height: 10,
  },
  postDateText: {
    color: "#282828",
    width: "25%",
    fontSize: 6,
    fontFamily: "Inter-Bold",
  },
  subjectContainer: {
    flexDirection: "row",
    height: hp(5),
    paddingTop: 6,
  },
  subjectLabel: {
    color: "#282828",
    fontSize: 8,
    textDecorationLine: "underline",
    fontFamily: "Inter-Bold",
  },
  subjectTextContainer: {
    height: "100%",
    width: "75%",
  },
  subjectText: {
    color: "#595959",
    marginLeft: wp(1),
    fontSize: 8,
    fontFamily: "Inter-Regular",
  },
  bottomBar: {
    backgroundColor: "#77BDF2",
    height: 2,
    width: "100%",
  },
  noLetterContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: hp(14),

  },
  noLetterText: {
    fontFamily: "Inter-Regular",
    fontSize: hp(2),
    color: "gray",
  },
});

export default TopLetterComponent;
