import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
const SubCategoryList = ({
    data,
    onVideoPress,
    placeholderImage,
}) => {
      const isFocused = useIsFocused();
    const { t } = useTranslation();
    // const [language, setLanguage] = useState(null);
    // useEffect(() => {
    //   const fetchLanguage = async () => {
    //     try {
    //       const storedLanguage = await AsyncStorage.getItem("language");
    //       if (storedLanguage) {
    //         setLanguage(storedLanguage);
    //         // console.log('lanugage-------- in dash', storedLanguage)
    //       }
    //     } catch (error) {
    //       console.error("Error fetching language:", error);
    //     }
    //   };
  
    //   fetchLanguage();
    // }, [isFocused]);
    // console.log('lang---------------in cate--------', language)
  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onVideoPress(item)}
      style={styles.videoItem}
    >
      <View>
        {item.thumbnail === '' ||
        item.thumbnail === null ||
        item.thumbnail === undefined ? (
          <Image
            style={styles.thumbnail}
            source={placeholderImage}
          />
        ) : (
          <Image
            style={styles.thumbnail}
            source={{ uri: item.thumbnail }}
          />
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.description}
        >
          {item.description || "No description available."}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = ({ item }) => {
    //   const name = language === "fr" && item.sub_category_french_name ? item.sub_category_french_name : item.sub_category_name;
    return(

    
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>
        {/* {name} */}
        {/* {item.sub_category_name} */}
        {item.title}
      </Text>
      {/* {item.video_result.Videos.length === 0 ? ( */}
      {item.data.length === 0 ? (
        <View style={styles.NoDataView}>
          <Text style={styles.NoDataText}>{t('Dashboard.NoDataavailable')}</Text>
        </View>
      ) : (
        <FlatList
        //   data={item.video_result.Videos}
        //   renderItem={renderVideoItem}
        //   keyExtractor={(videoItem) => videoItem.video_id.toString()}
        data={item.data}
        renderItem={renderVideoItem}
        keyExtractor={(videoItem) => videoItem.video_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderSection}
    //   keyExtractor={(item) => item.sub_category_id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    color: "#4A4A4A",
    fontSize: hp(2.3),
    textAlign: "left",
    fontFamily: "Inter-SemiBold",
    marginBottom: 6,
  },
  videoItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: wp(35),
    height: hp(12),
    borderRadius: wp(1),
    resizeMode: 'cover',
  },
  descriptionContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontSize: hp(1.6),
    color: "#000000",
  },
  noDataText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    color: 'gray',
  },
  NoDataView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataText: {
    fontWeight: "500", 
    fontSize: hp(2.1),
  },
});

export default SubCategoryList;
