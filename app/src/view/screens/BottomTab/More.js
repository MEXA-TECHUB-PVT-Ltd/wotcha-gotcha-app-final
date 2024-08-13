// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, PanResponder, Animated, StatusBar, Image, StyleSheet } from 'react-native';
// import { DraggableGrid } from 'react-native-draggable-grid';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import AsyncStorage
//  from '@react-native-async-storage/async-storage';
// import MoreIcon from "../../../assets/svg/MoreIcon.svg";
// import Svg, { SvgXml } from 'react-native-svg';
// import HomeActive from "../../../assets/svg/HomeActive.svg";
// import CategoryActive from '../../../assets/svg/CategoryActive.svg';
// import VideoActive from '../../../assets/svg/VideoActive.svg';
// import MailActive from '../../../assets/svg/MailActive.svg';
// import ProfileInActive from '../../../assets/svg/ProfileInactive.svg';
// import MarketZoneInActive from '../../../assets/svg/MarketInactive.svg';
// import Cinematics from "../../../assets/svg/Cinematics.svg";
// import Fans from "../../../assets/svg/Fans.svg";
// import Kids from "../../../assets/svg/Kids.svg";
// import Television from "../../../assets/svg/Television.svg";
// import Puzzle from "../../../assets/svg/Puzzle.svg";
// import HomeInActive from '../../../assets/svg/HomeInactive.svg';
// import CategoryInactive from '../../../assets/svg/CategoryInactive.svg';
// import VideoInactive from '../../../assets/svg/VideoInactive.svg';
// import MailInActive from '../../../assets/svg/MailInActive.svg';
// import ProfileActive from '../../../assets/svg/ProfileActive.svg';
// import MarketActive from '../../../assets/svg/MarketActive.svg';
// import KidsActive from '../../../assets/svg/KidsActive.svg';
// import FansActive from '../../../assets/svg/FansActive.svg';
// import TVpromaxActive from '../../../assets/svg/TVpromaxActive.svg';
// import PuzzleActive from '../../../assets/svg/PuzzleActive.svg';
// import Cinematiceactive from '../../../assets/svg/Cinematiceactive.svg';

// export default function MoreScreen({ navigation, bottomNavIcons, setBottomNavIcons,setDynamicCategories, route }) {
   
//     const [categories, setCategories] = useState([
//         { key: 'one', name: 'Home', activeIcon: <HomeActive width={23} height={23} />, inactiveIcon: <HomeInActive width={23} height={23} />, dropped: false, identifier:1 },
//         { key: 'two', name: 'Mass App', activeIcon: <CategoryActive width={23} height={23} />, inactiveIcon: <CategoryInactive width={23} height={23} />, dropped: false, identifier:1  },
//         { key: 'three', name: 'Pic Tour', activeIcon: <ProfileActive width={23} height={23} />, inactiveIcon: <ProfileInActive width={23} height={23} />, dropped: false, identifier:1  },
//         { key: 'four', name: 'Video Mania', activeIcon: <VideoActive width={23} height={23} />, inactiveIcon: <VideoInactive width={23} height={23} />, dropped: false, identifier:1  },
//         { key: 'five', name: 'DISC', activeIcon: <MailActive width={23} height={23} /> , inactiveIcon: <MailInActive width={23} height={23} />, dropped: false, identifier:1 },
//         { key: 'six', name: 'Market Zone', activeIcon: <MarketActive width={23} height={23} />, inactiveIcon: <MarketZoneInActive width={23} height={23} />, dropped: false, identifier:1  },
//         { key: 'seven', name: 'Cinematics', activeIcon: <Cinematiceactive width={23} height={23} /> , inactiveIcon: <Cinematics width={23} height={23} />, dropped: false, identifier:1 },
//         { key: 'eight', name: 'Fans-Stars Area', activeIcon: <FansActive width={23} height={23} /> , inactiveIcon: <Fans width={23} height={23} />, dropped: false, identifier:1 },
//         { key: 'nine', name: 'Kid-Vids', activeIcon: <KidsActive width={23} height={23} />, inactiveIcon: <Kids width={23} height={23} />, dropped: false, identifier:1  },
//         { key: 'ten', name: 'TV Progmax', activeIcon: <TVpromaxActive width={23} height={23} /> , inactiveIcon: <Television width={23} height={23} />, dropped: false, identifier:1 },
//         { key: 'eleven', name: 'Learning & Hobbies', activeIcon: <PuzzleActive width={23} height={23} />, inactiveIcon: <Puzzle width={23} height={23} />, dropped: false, identifier:1  },
//     ].map((category, indexes) => {
//         if (indexes < 4) {
//             return { ...category, dropped: true, identifier:0 };
//         } else {
//             return category;
//         }
//     }));
// const handleIconDragDrop = (updatedCategories) => {
//   console.log("Updated categories:", updatedCategories);
  
//   const updatedCategoriesWithDropped = updatedCategories.map((category, index) => {
//     if (index < 4) {
//       //  const identifier = 0;
//       // return { ...category,dropped: index < 4, identifier};
//        const identifier = index < 4 ? 0 : 1;
//        console.log("Navigating with identifier:", identifier);

//     return { ...category, dropped: index < 4, identifier };
//     } else {
//       return { ...category, dropped: false };
//     }
//   });
//   setCategories(updatedCategoriesWithDropped);
//   const updatedIcons = updatedCategoriesWithDropped.map(category => ({
//     name: category.name,
//     activeIcon: category.activeIcon,
//   }));

//   const updatedNames = updatedCategoriesWithDropped.map(category => category.name);
//   console.log("Updated names:", updatedNames);
//   AsyncStorage.setItem('bottomNavIcons', JSON.stringify(updatedNames))
//     .catch(error => console.error('Error storing bottomNavIcons in local storage:', error));
// };
// const handleCategoryPressNav = (categoryName, identifier) => {
//    switch (categoryName) {
//       case 'Home':
//           navigation.navigate('DashboardTwo', { identifier });
//           break;
//       case 'Mass App':
//           navigation.navigate('Categories', { identifier });
//           break;
//       case 'Pic Tour':
//           navigation.navigate('PicTours');
//           break;
//       case 'Videos Mania':
//           navigation.navigate('Video');
//           break;
//       case 'DISC':
//           navigation.navigate("Disc");
//           break;
//       // case 'Pic Tour':
//       //     navigation.navigate('PicTours');
//       //     break;
//       case 'Market Zone':
//           navigation.navigate('MarketZone');
//           break;
//       case 'Cinematics':
//           navigation.navigate('Cinematics', {identifier});
//           break;
//        case 'Kids-Vids':
//           console.log("the value of identifier is ",identifier)
//           navigation.navigate('Kids_vid', { identifier });
//           break;
//       case 'TV Progmax':
//            navigation.navigate('Tv_Promax');
//           break;
//       case 'Fans-Stars Area':
//           navigation.navigate('Fans_star');
//           break;
//       case 'Learning & Hobbies':
//           navigation.navigate('Learning');
//           break;
//   }
// };
//  return (
//   <View style={styles.container}>
//     <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
//     <View style={styles.logoContainer}>
//       <Image
//         source={require('../../../assets/images/LogoOfWG.jpg')}
//         style={styles.logo}
//         resizeMode="contain"
//       />
//       <View style={styles.wrapper}>
//          <DraggableGrid
//         numColumns={4}
//         renderItem={render_item}
//         data={categories}
//         onItemPress={(category) => handleCategoryPressNav(category.name, category.identifier)}
//         onDragRelease={handleIconDragDrop}
//       />
//         </View>
       
//     </View>
    
//   </View>
// );
// }
// function render_item(category) {
//   console.log("Rendering", category.name, "Key:", category.key, "Dropped:", category.dropped);
//   return (
//     <View key={category.key}>
//       <View style={styles.categoryContainer}>
//         {category.dropped ? (
//           category.activeIcon
//         ) : (
//           category.inactiveIcon
//         )}
//       </View>
//       <Text style={styles.categoryText}>{category.name}</Text>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//     },
//     wrapper:{
//       flex: 8,
//       paddingTop:100,
//       width:'100%',
//       height:'100%',
//       justifyContent:'center',
//     },
//     rowContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 10,
//         top:"5%"
//     },
//     categoryContainer: {
//         alignItems: 'center',
//         margin:"4%"
//     },
//     categoryText: {
//         marginTop: 5,
//         textAlign: 'center',
//         color: 'black',
//         fontFamily: 'Inter',
//         fontWeight: 'bold',
//         maxWidth: 80,
//         flexWrap: 'wrap',
//         fontSize: 12,
//     },
//      box: {
//     height: 20,
//     width: 20,
//     backgroundColor: 'red',
//     borderRadius: 5,
//   },
//     categoryItem: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//      logoContainer: {
//         top:"5%",
//     alignItems: 'center',
//      },
//   logo: {
//     width: wp('70%'), // Adjust width as needed
//     height: hp('20%'), // Adjust height as needed
//   },
// });

// /////////////////////////////////////////////

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, PanResponder, Animated, StatusBar, Image, StyleSheet } from 'react-native';
import { DraggableGrid } from 'react-native-draggable-grid';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage
 from '@react-native-async-storage/async-storage';
import MoreIcon from "../../../assets/svg/MoreIcon.svg";
import Svg, { SvgXml } from 'react-native-svg';
import HomeActive from "../../../assets/svg/HomeActive.svg";
import CategoryActive from '../../../assets/svg/CategoryActive.svg';
import VideoActive from '../../../assets/svg/VideoActive.svg';
import MailActive from '../../../assets/svg/MailActive.svg';
import ProfileInActive from '../../../assets/svg/ProfileInactive.svg';
import MarketZoneInActive from '../../../assets/svg/MarketInactive.svg';
import Cinematics from "../../../assets/svg/Cinematics.svg";
import Fans from "../../../assets/svg/Fans.svg";
import Kids from "../../../assets/svg/Kids.svg";
import Television from "../../../assets/svg/Television.svg";
import Puzzle from "../../../assets/svg/Puzzle.svg";
import HomeInActive from '../../../assets/svg/HomeInactive.svg';
import CategoryInactive from '../../../assets/svg/CategoryInactive.svg';
import VideoInactive from '../../../assets/svg/VideoInactive.svg';
import MailInActive from '../../../assets/svg/MailInActive.svg';
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
// ///////// for defult 27.5.2024
const defaultCategories = [
  { key: 'one', name: 'Mass App', activeIcon: <CategoryActive width={23} height={23} />, inactiveIcon: <CategoryInactive width={23} height={23} />, dropped: false },
  { key: 'two', name: 'Videos Mania', activeIcon: <VideoActive width={23} height={23} />, inactiveIcon: <VideoInactive width={23} height={23} />, dropped: false },
  // { key: 'three', name: 'DISC', activeIcon: <MailActive width={23} height={23} />, inactiveIcon: <MailInActive width={23} height={23} />, dropped: false },
  { key: 'four', name: 'Pic Tour', activeIcon: <ProfileActive width={23} height={23} />, inactiveIcon: <ProfileInActive width={23} height={23} />, dropped: false },
  { key: 'five', name: 'Market Zone', activeIcon: <MarketActive width={23} height={23} />, inactiveIcon: <MarketZoneInActive width={23} height={23} />, dropped: false },
  { key: 'six', name: 'Cinematics', activeIcon: <Cinematiceactive width={23} height={23} />, inactiveIcon: <Cinematics width={23} height={23} />, dropped: false },
  { key: 'seven', name: 'Fans-Stars Area', activeIcon: <FansActive width={23} height={23} />, inactiveIcon: <Fans width={23} height={23} />, dropped: false },
  { key: 'eight', name: 'Kids-Vids', activeIcon: <KidsActive width={23} height={23} />, inactiveIcon: <Kids width={23} height={23} />, dropped: false },
  { key: 'nine', name: 'TV ProgMax', activeIcon: <TVpromaxActive width={23} height={23} />, inactiveIcon: <Television width={23} height={23} />, dropped: false },
  { key: 'ten', name: 'Learning & Hobbies', activeIcon: <PuzzleActive width={23} height={23} />, inactiveIcon: <Puzzle width={23} height={23} />, dropped: false },
  { key: 'eleven', name: 'Sports', activeIcon: <Ionicons name="sports-handball" size={28} color="#FACA4E" />, inactiveIcon: <Ionicons name="sports-handball" size={28} color="#C5C5C5" />, dropped: false },
  { key: 'twelve', name: 'News', activeIcon: <News name="news" size={26} color="#FACA4E" />, inactiveIcon: <News name="news" size={26} color="#C5C5C5" />, dropped: false },
  { key: 'thirteen', name: 'Open Letter', activeIcon: <LetterIcon name="newsletter" size={26} color="#FACA4E" />, inactiveIcon: <LetterIcon name="newsletter" size={26} color="#C5C5C5" />, dropped: false },
  { key: 'fourteen', name: 'QAFI', activeIcon: <QafiIcon name="people-arrows" size={20} color="#FACA4E" />, inactiveIcon: <QafiIcon name="people-arrows" size={20} color="#C5C5C5" />, dropped: false },
  { key: 'fifteen', name: 'EBC', activeIcon: <EBC name="sticker-emoji" size={28} color="#FACA4E" />, inactiveIcon: <EBC name="sticker-emoji" size={28} color="#C5C5C5" />, dropped: false },
];

export default function MoreScreen({ bottomNavIcons, setBottomNavIcons, setDynamicCategories, route }) {
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
      case 'Mass App':
        navigation.navigate('Categories', { identifier });
        break;
      case 'Videos Mania':
        navigation.navigate('Video', { identifier });
        break;
      // case 'DISC':
      //   navigation.navigate('Disc');
      //   break;
      case 'Pic Tour':
        navigation.navigate('PicTours');
        break;
      case 'Market Zone':
        navigation.navigate('MarketZone');
        break;
      case 'Cinematics':
        navigation.navigate('Cinematics', { identifier });
        break;
      case 'Kids-Vids':
        navigation.navigate('Kids_vid', { identifier });
        break;
      case 'TV ProgMax':
        navigation.navigate('Tv_Promax');
        break;
      case 'Fans-Stars Area':
        navigation.navigate('Fans_star');
        break;
      case 'Learning & Hobbies':
        navigation.navigate('Learning');
        break;
      case 'Sports':
        navigation.navigate('Sports');
        break;
      case 'News':
        navigation.navigate('NewsScreen');
        break;
      case 'Open Letter':
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
          source={require('../../../assets/images/logowithWBG.jpg')}
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
        <Text style={styles.dragText}>Drag to Adjust</Text>
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


// function render_item(category) {
//   console.log('cateory hai ----', category)
//   console.log('cateory droped  ----', category.dropped)
//   return (
//     <View key={category.key}>
//       <View style={styles.categoryContainer}>
//         {category.dropped ? category.activeIcon : category.inactiveIcon}
//       </View>
//       <Text style={styles.categoryText}>{category.name}</Text>
//     </View>
//   );
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
},
wrapper:{
  flex: 8,
  paddingTop:100,
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
  alignItems: 'center',
  paddingTop:hp(57)
},
dragText: {
  color: '#C4C4C4',
  fontSize:16,
  fontFamily: 'Inter',
},
});