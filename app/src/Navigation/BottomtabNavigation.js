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

const Bottom = createBottomTabNavigator();
const BottomtabNavigation = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [sheetHeight, setSheetHeight] = useState(700);
  const [selectedScreen, setSelectedScreen] = useState('Dashboard');
  const [screen, setScreen] = useState([]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const storedIcons = await AsyncStorage.getItem('bottomNavIcons');
        if (storedIcons) {
          const parsedIcons = JSON.parse(storedIcons);
          setScreen(parsedIcons.slice(0, 3).map(name => ({ name })));
        }
      } catch (error) {
        console.error('Error reading icons from storage:', error);
      }
    };

    fetchIcons();
    const interval = setInterval(fetchIcons, 2000);
    return () => clearInterval(interval);
  }, []);

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
            name={screen.name}
            listeners={{
              tabPress: () => handleScreenSelect(screen.name),
            }}
            options={{
              tabBarIcon: ({ color, size, focused }) => {
                let iconComponent;
                switch (screen.name) {
                  // case 'Home':
                  //   iconComponent = focused ? <HomeActive size={size} color={color} /> : <HomeInActive size={size} color={color} />;
                  //   break;
                  case 'Mass Apps':
                    iconComponent = focused ? <CategoryActive size={size} color={color} /> : <CategoryInActive size={size} color={color} />;
                    break;
                  case 'Video Mania':
                    iconComponent = focused ? <VideoActive size={size} color={color} /> : <VideoInActive size={size} color={color} />;
                    break;
                  // case 'DISC':
                  //   iconComponent = focused ? <MailActive size={size} color={color} /> : <MailInActive size={size} color={color} />;
                  //   break;
                  case 'Pic Tours':
                    iconComponent = focused ? <ProfileActive size={size} color={color} /> : <ProfileInActive size={size} color={color} />;
                    break;
                  case 'Mondo Market':
                    iconComponent = focused ? <MarketZoneActive size={size} color={color} /> : <MarketZoneInActive size={size} color={color} />;
                    break;
                  case 'Cinematic':
                    iconComponent = focused ? <Cinematiceactive size={size} color={color} /> : <Cinematics_svg size={size} color={color} />;
                    break;
                  case 'Fans Stars Zone':
                    iconComponent = focused ? <FansActive size={size} color={color} /> : <Fans size={size} color={color} />;
                    break;
                  case 'Kid-Vids':
                    iconComponent = focused ? <KidsActive size={size} color={color} /> : <Kids size={size} color={color} />;
                    break;
                  case 'TV ProgMax':
                    iconComponent = focused ? <TVpromaxActive size={size} color={color} /> : <Television size={size} color={color} />;
                    break;
                  case 'Learnings and Hobbies':
                    iconComponent = focused ? <PuzzleActive size={size} color={color} /> : <Puzzle size={size} color={color} />;
                    break;
                  case 'Sports & Sports':
                    iconComponent = focused ? <Sport name="sports-handball" size={size} color='#FACA4E' /> : <Sport name="sports-handball"  size={size} color={color} />;
                    break;
                  case 'On-News':
                    iconComponent = focused ? <News name="news"  size={size} color='#FACA4E' /> : <News name="news"  size={size} color={color} />;
                    break;
                  case 'Open Letters':
                    iconComponent = focused ? <LetterIcon name="newsletter" size={size} color='#FACA4E' /> : <LetterIcon name="newsletter"  size={size} color={color} />;
                    break;
                  case 'QAFI':
                    iconComponent = focused ? <QafiIcon name="people-arrows" size={20} color='#FACA4E' /> : <QafiIcon name="people-arrows"  size={20} color={color} />;
                    break;
                  case 'EBIC':
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
              switch (screen.name) {
                // case 'Home':
                //   return <Dashboard />;
                case 'Mass Apps':
                  return <Categories />;
                case 'Video Mania':
                  return <Video />;
                // case 'DISC':
                //   return <Disc />;
                case 'Pic Tours':
                  return <PicTours />;
                case 'Mondo Market':
                  return <MarketZone />;
                case 'Cinematic':
                  return <Cinematics />;
                case 'Fans Stars Zone':
                  return <Fans_star/>;
                case 'Kid-Vids':
                  return <Kids_vid />;
                case 'TV ProgMax':
                  return <Tv_Promax />;
                case 'Learnings and Hobbies':
                  return <Learning />;
                case 'Sports & Sports':
                  return <Sports />;
                case 'On-News':
                  return <NewsScreen />;
                case 'Open Letters':
                  return <OpenLetterScreen />;
                case 'QAFI':
                  return <QAFIScreen/>;
                case 'EBIC':
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