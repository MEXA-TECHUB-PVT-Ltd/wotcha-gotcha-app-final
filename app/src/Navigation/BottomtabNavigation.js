import React, { useRef , useState, useEffect} from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView , StatusBar, Dimensions} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation , useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeActive from '../assets/svg/HomeActive.svg';
import HomeInActive from '../assets/svg/HomeInactive.svg';
import CategoryActive from '../assets/svg/CategoryActive.svg';
import CategoryInActive from '../assets/svg/CategoryInactive.svg';
import VideoActive from '../assets/svg/VideoActive.svg';
import VideoInActive from '../assets/svg/VideoInactive.svg';
import MailActive from '../assets/svg/MailActive.svg';
import MailInActive from '../assets/svg/MailInActive.svg';
import ProfileActive from '../assets/svg/ProfileActive.svg';
import ProfileInActive from '../assets/svg/ProfileInactive.svg';
import MarketZoneActive from '../assets/svg/MarketActive.svg';
import MarketZoneInActive from '../assets/svg/MarketInactive.svg';
import More from '../assets/svg/More.svg';
import Cinematics_svg from "../assets/svg/Cinematics.svg";
import Fans from "../assets/svg/Fans.svg";
import Kids from "../assets/svg/Kids.svg";
import Television from "../assets/svg/Television.svg";
import Puzzle from "../assets/svg/Puzzle.svg";
import MoreInactive from "../assets/svg/MoreInactive.svg";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fans_star from '../view/screens/fans_star/Fans_star';
import Kids_vid from '../view/screens/kids_vid/Kids_vid';
import Tv_Promax from '../view/screens/Tv_Promax/Tv_Promax';
// import Cinematics from '../view/screens/Cinematics/Cinematics';
import Learning from '../view/screens/Learning/Learning';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import MoreScreen from '../view/screens/BottomTab/More';
import Dashboard from './../view/screens/BottomTab/Dashboard';
import Categories from './../view/screens/BottomTab/Categories';
import Video from './../view/screens/BottomTab/Video';
import Disc from './../view/screens/BottomTab/Disc';
import MarketZone from './../view/screens/BottomTab/MarketZone';
import PicTours from '../view/screens/BottomTab/PicTours';
import PuzzleActive from  '../assets/svg/PuzzleActive.svg';
import Cinematiceactive from '../assets/svg/Cinematiceactive.svg';
import FansActive from '../assets/svg/FansActive.svg';
import TVpromaxActive from '../assets/svg/TVpromaxActive.svg';
import KidsActive from '../assets/svg/KidsActive.svg';
import Cinematics from '../view/screens/Cinematics/Cinematics';
// import DashboardTwo from '../view/screens/BottomTab/DashboardTwo';
import {StripeProvider} from '@stripe/stripe-react-native'
import Sport from "react-native-vector-icons/MaterialIcons";
import Sports from '../view/screens/Sports/Sports';
import News from "react-native-vector-icons/Entypo";
import NewsScreen from '../view/screens/ViewNews/NewsScreen';
import OpenLetterScreen from '../view/screens/PostLetter/OpenLetterScreen';
import LetterIcon from "react-native-vector-icons/Entypo";
import QafiIcon from "react-native-vector-icons/FontAwesome5";
import EBC from "react-native-vector-icons/MaterialCommunityIcons";
import QAFIScreen from '../view/screens/QAFI/QAFIScreen';
import EBCScreen from '../view/screens/GEBC/EBCScreen';
import CategoryInactive from '../assets/svg/CategoryInactive.svg';
import VideoInactive from '../assets/svg/VideoInactive.svg';
const Bottom = createBottomTabNavigator();
const BottomtabNavigation = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [sheetHeight, setSheetHeight] = useState(700);
  const [selectedScreen, setSelectedScreen] = useState('Dashboard');
  const [screen, setScreen] = useState([]);


  // this code is for empty bottom navicon on 20-12-2024. delet nai krna

  const defaultCategories = [
    { key: 'one', name: 'More.MassApp', activeIcon: <CategoryActive width={23} height={23} />, inactiveIcon: <CategoryInactive width={23} height={23} />, dropped: false },
    { key: 'two', name: 'Drawer.VideoMania', activeIcon: <VideoActive width={23} height={23} />, inactiveIcon: <VideoInactive width={23} height={23} />, dropped: false },
    { key: 'four', name: 'Drawer.PicTours', activeIcon: <ProfileActive width={23} height={23} />, inactiveIcon: <ProfileInActive width={23} height={23} />, dropped: false },
  ];

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const storedIcons = await AsyncStorage.getItem('bottomNavIcons');
        if (storedIcons) {
          const parsedIcons = JSON.parse(storedIcons);
          const filteredIcons = parsedIcons.slice(0, 3).map(key => ({ key }));
          if (filteredIcons.length > 0) {
            setScreen(filteredIcons);
          } else if (screen.length === 0) {
            // Only assign defaultCategories if screen is empty
            setScreen(defaultCategories.slice(0, 3));
          }
        } else if (screen.length === 0) {
          setScreen(defaultCategories.slice(0, 3));
        }
      } catch (error) {
        console.error('Error reading icons from storage:', error);
      }
    };

    fetchIcons();
    const interval = setInterval(fetchIcons, 2000);
    return () => clearInterval(interval);
  }, [screen]);

    // this code is for empty bottom navicon on 20-12-2024. delet nai krna

    
  // useEffect(() => {
  //   const fetchIcons = async () => {
  //     try {
  //       const storedIcons = await AsyncStorage.getItem('bottomNavIcons');
  //       if (storedIcons) {
  //         const parsedIcons = JSON.parse(storedIcons);
         
  //         setScreen(parsedIcons.slice(0, 3).map(key => ({ key })));
  //         // setScreen(parsedIcons.slice(0, 3).map(name => ({ name })));
      
  //       }
  //     } catch (error) {
  //       console.error('Error reading icons from storage:', error);
  //     }
  //   };

  //   fetchIcons();
  //   const interval = setInterval(fetchIcons, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  console.log('botom---------------?????????????----------', screen)

  useEffect(() => {
    const screenHeight = Dimensions.get('window').height;
    const statusBarHeight = StatusBar.currentHeight || 0;
    const newHeight = screenHeight - statusBarHeight - 100;
    setSheetHeight(newHeight);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedScreen('Dashboard');
    }, [])
  );

  const handleScreenSelect = (screenName) => {
    setSelectedScreen(screenName);
    // navigation.navigate(screenName);
  };

  const key = 'pk_test_51OmriNHtA3SK3biQ6qq8s1IrRmnZ08NsSlklyXD9GN8gLPGsR4tGqH08FkxkBDvPrEMIPLEIQMkAc8NrASOByh6E00ayjZlEWe'
  return (
    <View style={{ flex: 1 }}>
      <StripeProvider publishableKey={key}>
      <Bottom.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'yellow',
          tabBarInactiveTintColor: '#CACACA',
          tabBarLabelStyle: { display: 'none' },
          tabBarStyle: { display: 'flex' },
        }}
      >
        <Bottom.Screen
          name="Dashboard"
          component={Dashboard}
          listeners={{
            tabPress: () => handleScreenSelect('Dashboard'),
          }}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              focused ? <HomeActive size={size} color={color} /> : <HomeInActive size={size} color={color} />
            ),
          }}
        />
        {screen.map((screen, index) => (
          <Bottom.Screen
            key={index}
            name={screen.key}
            listeners={{
              tabPress: () => handleScreenSelect(screen.key),
            }}
            options={{
              tabBarIcon: ({ color, size, focused }) => {
                let iconComponent;
                switch (screen.key) {
                  // case 'Home':
                  //   iconComponent = focused ? <HomeActive size={size} color={color} /> : <HomeInActive size={size} color={color} />;
                  //   break;
                  case 'one':
                    iconComponent = focused ? <CategoryActive size={size} color={color} /> : <CategoryInActive size={size} color={color} />;
                    break;
                  case 'two':
                    iconComponent = focused ? <VideoActive size={size} color={color} /> : <VideoInActive size={size} color={color} />;
                    break;
                  // case 'DISC':
                  //   iconComponent = focused ? <MailActive size={size} color={color} /> : <MailInActive size={size} color={color} />;
                  //   break;
                  case 'four':
                    iconComponent = focused ? <ProfileActive size={size} color={color} /> : <ProfileInActive size={size} color={color} />;
                    break;
                  case 'five':
                    iconComponent = focused ? <MarketZoneActive size={size} color={color} /> : <MarketZoneInActive size={size} color={color} />;
                    break;
                  case 'six':
                    iconComponent = focused ? <Cinematiceactive size={size} color={color} /> : <Cinematics_svg size={size} color={color} />;
                    break;
                  case 'seven':
                    iconComponent = focused ? <FansActive size={size} color={color} /> : <Fans size={size} color={color} />;
                    break;
                  case 'eight':
                    iconComponent = focused ? <KidsActive size={size} color={color} /> : <Kids size={size} color={color} />;
                    break;
                  case 'nine':
                    iconComponent = focused ? <TVpromaxActive size={size} color={color} /> : <Television size={size} color={color} />;
                    break;
                  case 'ten':
                    iconComponent = focused ? <PuzzleActive size={size} color={color} /> : <Puzzle size={size} color={color} />;
                    break;
                  case 'eleven':
                    iconComponent = focused ? <Sport name="sports-handball" size={size} color='#FACA4E' /> : <Sport name="sports-handball"  size={size} color={color} />;
                    break;
                  case 'twelve':
                    iconComponent = focused ? <News name="news"  size={size} color='#FACA4E' /> : <News name="news"  size={size} color={color} />;
                    break;
                  case 'thirteen':
                    iconComponent = focused ? <LetterIcon name="newsletter" size={size} color='#FACA4E' /> : <LetterIcon name="newsletter"  size={size} color={color} />;
                    break;
                  case 'fourteen':
                    iconComponent = focused ? <QafiIcon name="people-arrows" size={20} color='#FACA4E' /> : <QafiIcon name="people-arrows"  size={20} color={color} />;
                    break;
                  case 'fifteen':
                    iconComponent = focused ? <EBC name="sticker-emoji" size={size} color='#FACA4E' /> : <EBC name="sticker-emoji"  size={size} color={color} />;
                    break;
                  default:
                    iconComponent = <More width={23} height={23} />;
                }
                return iconComponent;
              }
            }}
          >
            {() => {
              switch (screen.key) {
                // case 'Home':
                //   return <Dashboard />;
                case 'one':
                  return <Categories />;
                case 'two':
                  return <Video />;
                // case 'DISC':
                //   return <Disc />;
                case 'four':
                  return <PicTours />;
                case 'five':
                  return <MarketZone />;
                case 'six':
                  return <Cinematics />;
                case 'seven':
                  return <Fans_star/>;
                case 'eight':
                  return <Kids_vid />;
                case 'nine':
                  return <Tv_Promax />;
                case 'ten':
                  return <Learning />;
                case 'eleven':
                  return <Sports />;
                case 'twelve':
                  return <NewsScreen />;
                case 'thirteen':
                  return <OpenLetterScreen />;
                case 'fourteen':
                  return <QAFIScreen/>;
                case 'fifteen':
                  return <EBCScreen />;
                default:
                  return null;
              }
            }}
          </Bottom.Screen>
        ))}
        <Bottom.Screen 
          name="MoreScreen" 
          component={MoreScreen}  
          listeners={{
            tabPress: () => handleScreenSelect('MoreScreen'),
          }}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              focused ? <MoreInactive width={23} height={23} /> : <More width={23} height={23} />
            ),
          }}
        />
      </Bottom.Navigator>
      </StripeProvider>
  
    </View>
  );
};

export default BottomtabNavigation;

const styles = StyleSheet.create({
  moreIcon: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});