// /////////////////////////////////////////////

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, PanResponder, Animated, StatusBar, Image, StyleSheet, Platform } from 'react-native';
import { DraggableGrid } from 'react-native-draggable-grid';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage
 from '@react-native-async-storage/async-storage';

import CategoryActive from '../../../assets/svg/CategoryActive.svg';
import VideoActive from '../../../assets/svg/VideoActive.svg';
import ProfileInActive from '../../../assets/svg/ProfileInactive.svg';
import MarketZoneInActive from '../../../assets/svg/MarketInactive.svg';
import Cinematics from "../../../assets/svg/Cinematics.svg";
import Fans from "../../../assets/svg/Fans.svg";
import Kids from "../../../assets/svg/Kids.svg";
import Television from "../../../assets/svg/Television.svg";
import Puzzle from "../../../assets/svg/Puzzle.svg";
import CategoryInactive from '../../../assets/svg/CategoryInactive.svg';
import VideoInactive from '../../../assets/svg/VideoInactive.svg';
import ProfileActive from '../../../assets/svg/ProfileActive.svg';
import MarketActive from '../../../assets/svg/MarketActive.svg';
import KidsActive from '../../../assets/svg/KidsActive.svg';
import FansActive from '../../../assets/svg/FansActive.svg';
import TVpromaxActive from '../../../assets/svg/TVpromaxActive.svg';
import PuzzleActive from '../../../assets/svg/PuzzleActive.svg';
import Cinematiceactive from '../../../assets/svg/Cinematiceactive.svg';
import Ionicons from "react-native-vector-icons/MaterialIcons";
import News from "react-native-vector-icons/Entypo";
import LetterIcon from "react-native-vector-icons/Entypo";
import QafiIcon from "react-native-vector-icons/FontAwesome5";
import EBC from "react-native-vector-icons/MaterialCommunityIcons";
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { appImages } from '../../../assets/utilities';
// ///////// for defult 27.5.2024
const defaultCategories = [
  { key: 'one', name: 'Mass Apps', activeIcon: <CategoryActive width={23} height={23} />, inactiveIcon: <CategoryInactive width={23} height={23} />, dropped: false },
  { key: 'two', name: 'Videos Mania', activeIcon: <VideoActive width={23} height={23} />, inactiveIcon: <VideoInactive width={23} height={23} />, dropped: false },
  // { key: 'three', name: 'DISC', activeIcon: <MailActive width={23} height={23} />, inactiveIcon: <MailInActive width={23} height={23} />, dropped: false },
  { key: 'four', name: 'Pic Tours', activeIcon: <ProfileActive width={23} height={23} />, inactiveIcon: <ProfileInActive width={23} height={23} />, dropped: false },
  { key: 'five', name: 'Mondo Market', activeIcon: <MarketActive width={23} height={23} />, inactiveIcon: <MarketZoneInActive width={23} height={23} />, dropped: false },
  { key: 'six', name: 'Cinematix', activeIcon: <Cinematiceactive width={23} height={23} />, inactiveIcon: <Cinematics width={23} height={23} />, dropped: false },
  { key: 'seven', name: 'Fans Stars Zone', activeIcon: <FansActive width={23} height={23} />, inactiveIcon: <Fans width={23} height={23} />, dropped: false },
  { key: 'eight', name: 'Kid-Vids', activeIcon: <KidsActive width={23} height={23} />, inactiveIcon: <Kids width={23} height={23} />, dropped: false },
  { key: 'nine', name: 'TV ProgMax', activeIcon: <TVpromaxActive width={23} height={23} />, inactiveIcon: <Television width={23} height={23} />, dropped: false },
  { key: 'ten', name: 'Learnings and Hobbies', activeIcon: <PuzzleActive width={23} height={23} />, inactiveIcon: <Puzzle width={23} height={23} />, dropped: false },
  { key: 'eleven', name: 'Sports & Sports', activeIcon: <Ionicons name="sports-handball" size={28} color="#FACA4E" />, inactiveIcon: <Ionicons name="sports-handball" size={28} color="#C5C5C5" />, dropped: false },
  { key: 'twelve', name: 'On-News', activeIcon: <News name="news" size={26} color="#FACA4E" />, inactiveIcon: <News name="news" size={26} color="#C5C5C5" />, dropped: false },
  { key: 'thirteen', name: 'Open Letters', activeIcon: <LetterIcon name="newsletter" size={26} color="#FACA4E" />, inactiveIcon: <LetterIcon name="newsletter" size={26} color="#C5C5C5" />, dropped: false },
  { key: 'fourteen', name: 'QAFI', activeIcon: <QafiIcon name="people-arrows" size={20} color="#FACA4E" />, inactiveIcon: <QafiIcon name="people-arrows" size={20} color="#C5C5C5" />, dropped: false },
  { key: 'fifteen', name: 'EBC', activeIcon: <EBC name="sticker-emoji" size={28} color="#FACA4E" />, inactiveIcon: <EBC name="sticker-emoji" size={28} color="#C5C5C5" />, dropped: false },
];

export default function MoreScreen({ bottomNavIcons, setBottomNavIcons, setDynamicCategories, route }) {
  const { t } = useTranslation(); 
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    async function initializeIcons() {
      try {
        const storedIcons = await AsyncStorage.getItem('bottomNavIcons');
        if (storedIcons) {
          const storedNames = JSON.parse(storedIcons);
          const updatedCategories = defaultCategories.map(category => ({
            ...category,
            dropped: storedNames.includes(category.name),
          }));

          // Sort updatedCategories based on storedNames order
          const sortedCategories = storedNames
            .map(name => updatedCategories.find(category => category.name === name))
            .filter(Boolean)
            .concat(updatedCategories.filter(category => !storedNames.includes(category.name)));

          setCategories(sortedCategories);
        } else {
          // No icons stored, set default
          const updatedCategories = defaultCategories.map((category, index) => ({
            ...category,
            dropped: index < 3,
            identifier: index < 3 ? 0 : 1,
          }));
          setCategories(updatedCategories);
          const updatedNames = updatedCategories.map(category => category.name);
          await AsyncStorage.setItem('bottomNavIcons', JSON.stringify(updatedNames));
        }
      } catch (error) {
        console.error('Error initializing icons:', error);
      }
    }

    if (isFocused) {
      initializeIcons();
    }
  }, [isFocused]);

  const handleIconDragDrop = (updatedCategories) => {
    const updatedCategoriesWithDropped = updatedCategories.map((category, index) => {
      const identifier = index < 3 ? 0 : 1;
      return { ...category, dropped: index < 3, identifier };
    });

    setCategories(updatedCategoriesWithDropped);

    const updatedNames = updatedCategoriesWithDropped.map(category => category.name);
    AsyncStorage.setItem('bottomNavIcons', JSON.stringify(updatedNames))
      .catch(error => console.error('Error storing bottomNavIcons in local storage:', error));
  };

  const handleCategoryPressNav = (categoryName, identifier) => {
    switch (categoryName) {
      case 'Mass Apps':
        navigation.navigate('Categories', { identifier });
        break;
      case 'Videos Mania':
        navigation.navigate('Video', { identifier });
        break;
      // case 'DISC':
      //   navigation.navigate('Disc');
      //   break;
      case 'Pic Tours':
        navigation.navigate('PicTours');
        break;
      case 'Mondo Market':
        navigation.navigate('MarketZone');
        break;
      case 'Cinematix':
        navigation.navigate('Cinematics', { identifier });
        break;
      case 'Kid-Vids':
        navigation.navigate('Kids_vid', { identifier });
        break;
      case 'TV ProgMax':
        navigation.navigate('Tv_Promax');
        break;
      case 'Fans Stars Zone':
        navigation.navigate('Fans_star');
        break;
      case 'Learnings and Hobbies':
        navigation.navigate('Learning');
        break;
      case 'Sports & Sports':
        navigation.navigate('Sports');
        break;
      case 'On-News':
        navigation.navigate('NewsScreen');
        break;
      case 'Open Letters':
        navigation.navigate('OpenLetterScreen');
        break;
      case 'QAFI':
        navigation.navigate('QAFIScreen');
        break;
      case 'EBC':
        navigation.navigate('EBCScreen');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.logoContainer}>
        <Image
          // source={require('../../../assets/images/logowithWBG.jpg')}
          source={appImages.logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.wrapper}>
          <DraggableGrid
            numColumns={4}
            renderItem={render_item}
            data={categories}
            onItemPress={(category) => handleCategoryPressNav(category.name, category.identifier)}
            onDragRelease={handleIconDragDrop}
          />
        </View>
       
      </View>
      <View style={styles.dragTextContainer}>
        <Text style={styles.dragText}>{t('More.PresstoAdjust')}</Text>
      </View>
    </View>
  );
}

function render_item(category, index) {
  const isActive = index < 3;
  // console.log('isactive hai---', isActive)
  return (
    <View key={category.key}>
      <View style={styles.categoryContainer}>
        {isActive ? category.activeIcon : category.inactiveIcon}
      </View>
      <Text style={styles.categoryText}>{category.name}</Text>
     
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
},
wrapper:{
  flex: 8,
  paddingTop:Platform.OS =="ios" ? 0: 100,
  width:'100%',
  height:'100%',
  justifyContent:'center',
},
rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    top:"5%"
},
categoryContainer: {
    alignItems: 'center',
    margin:"4%"
},
categoryText: {
    marginTop: 5,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    maxWidth: 80,
    flexWrap: 'wrap',
    fontSize: 12,
},
 box: {
height: 20,
width: 20,
backgroundColor: 'red',
borderRadius: 5,
},
categoryItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
 logoContainer: {
    top:"5%",
alignItems: 'center',
 },
logo: {
width: wp('70%'), // Adjust width as needed
height: hp('20%'), // Adjust height as needed
},
dragTextContainer: {
  position: 'absolute', // Absolute positioning to stick it to the bottom
  bottom: 0, // Align to the bottom of the container
  alignItems: 'center', // Center text horizontally
  paddingVertical:Platform.OS =="ios" ? 30:10, // Optional: Add padding for better visual spacing
  width:'100%'

},
dragText: {
  color: '#C4C4C4',
  fontSize: 16,
  fontFamily: 'Inter',
  textAlign: 'center',
  paddingHorizontal: 10, // Optional: Add padding to match width percentage
},
});