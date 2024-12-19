import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';
LogBox.ignoreAllLogs();

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  LogBox,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
//Screens
import Signin_signup from './app/src/view/screens/Signin_signup/Signin_signup';
import ViewAllBlogs from './app/src/view/screens/ViewAllBlogs/ViewAllBlogs';
import ViewVideoPicProfile from './app/src/view/screens/ViewVideoProfile/ViewVideoPicProfile';
import ViewVideoProfile from './app/src/view/screens/ViewVideoProfile/ViewVideoProfile';
import PostLetterEditSignature from './app/src/view/screens/PostLetter/PostLetterEditSignature';
import PostLetterEditSignaturePics from './app/src/view/screens/PostLetter/PostLetterEditSignaturePics';
import PostLetterInfo from './app/src/view/screens/PostLetter/PostLetterInfo';
import PostLetter from './app/src/view/screens/PostLetter/PostLetter';
import ViewProfile from './app/src/view/screens/Profile/ViewProfile';
import ProductDetailsProfile from './app/src/view/screens/ProductDetailsProfile';
import UpdatePassword from './app/src/view/screens/Profile/UpdatePassword';
import UpdateProfile from './app/src/view/screens/Profile/UpdateProfile';
import ProfileSettings from './app/src/view/screens/Profile/ProfileSettings';
import Dashboard from './app/src/view/screens/BottomTab/Dashboard';
import Categories from './app/src/view/screens/BottomTab/Categories';
import PrivateLetterDetails from './app/src/view/screens/PrivateLetterDetails';
import LetterDetails from './app/src/view/screens/LetterDetails';
import GEBC from './app/src/view/screens/GEBC/GEBC';
import QAFI from './app/src/view/screens/QAFI/QAFI';
import LetterDisc from './app/src/view/screens/BottomTab/LetterDisc';
import DrawerNavigation from './app/src/Navigation/DrawerNavigation';
import PostOnNews from './app/src/view/screens/PostOnNews/PostOnNews';
import ChangeImageScreen from './app/src/view/screens/PostOnNews/ChangeImageScreen';
import ViewAllCategories from './app/src/view/screens/ViewAllCategories';
import News from './app/src/view/screens/News';
import Disc from './app/src/view/screens/BottomTab/Disc';
import MarketZone from './app/src/view/screens/BottomTab/MarketZone';
import Video from './app/src/view/screens/BottomTab/Video';
import VerifyAccount from './app/src/view/screens/Auth/VerifyAccount';
import UpdateSellProduct from './app/src/view/screens/UpdateSellProduct';
import Sell from './app/src/view/screens/Sell';
import ProductDetails from './app/src/view/screens/ProductDetails';
import SearchProducts from './app/src/view/screens/SearchProducts';
import UploadUpdatePicScreen from './app/src/view/screens/UpdateAPic/UploadUpdatePicScreen';
import UploadUpdatePic from './app/src/view/screens/UpdateAPic/UploadUpdatePic';
import UploadUpdateVideo from './app/src/view/screens/UpdateAVideo/UploadUpdateVideo';
import UploadUpdateScreen from './app/src/view/screens/UpdateAVideo/UploadUpdateScreen';
import SubscriptionPayment from './app/src/view/screens/SubscriptionPayment';
import ContactUs from './app/src/view/screens/ContactUs';
import TermsAndCondition from './app/src/view/screens/TermsAndCondition';
import PrivacyPolicy from './app/src/view/screens/PrivacyPolicy';
import SearchScreen from './app/src/view/screens/SearchScreen';
import PicDetails from './app/src/view/screens/PicDetails';
import UploadScreen from './app/src/view/screens/UploadAVideo/UploadScreen';
import UploadVideo from './app/src/view/screens/UploadAVideo/UploadVideo';
import SearchApps from './app/src/view/screens/SearchApps';
import PhoneBase from './app/src/view/screens/PhoneBase';
import ResetPassword from './app/src/view/screens/Auth/ResetPassword';
import ForgetPassword from './app/src/view/screens/Auth/ForgetPassword';
import Profile_image from './app/src/view/screens/Profile_image/Profile_image';
import ChatScreen from './app/src/view/screens/ChatScreen';
import BlogDetails from './app/src/view/screens/ViewAllBlogs/BlogDetails';
import ViewBanners from './app/src/view/screens/BannerAds/ViewBanners';
import AddBanner from './app/src/view/screens/BannerAds/AddBanner';
import BannerDetails from './app/src/view/screens/BannerAds/BannerDetails';
import ViewVideo from './app/src/view/screens/VideoView/ViewVideo';
import UploadUpdateVideoScreen from './app/src/view/screens/UpdateAVideo/UploadUpdateVideoScreen';
import PicTours from './app/src/view/screens/BottomTab/PicTours';
import SearchAppsDisc from './app/src/view/screens/SearchAppsDisc';
import Conversation from './app/src/view/screens/Conversation';
import UploadScreenPic from './app/src/view/screens/UploadAVideo/UploadScreenPic';
import SavedItems from './app/src/view/screens/SavedItems';
import Notification from './app/src/view/screens/Notification';
import HelpScreen from './app/src/view/screens/HelpScreen';
import SplashScreen from './app/src/view/screens/SplashScreen';
import RateApp from './app/src/view/screens/RateApp';
import InstlApps from './app/src/view/screens/InstalledApps/InstlApps';
import SearchScreenPicTours from './app/src/view/screens/SearchScreenPicTours';
import {
  getToken,
  notificationListener,
  requestUserPermission,
} from './app/src/assets/utilities/CommonUtils';
import ViewAllCategoriesGEBC from './app/src/view/screens/ViewAllCategoriesGEBC';
import ViewAllCategoriesQAFI from './app/src/view/screens/ViewAllCategoriesQAFI';
import PostLetterAllUserName from './app/src/view/screens/PostLetter/PostLetterAllUserName';
import PostLetterSignature from './app/src/view/screens/PostLetter/PostLetterSignature';
import ViewAllCategoriesDashboard from './app/src/view/screens/ViewAllCategoriesDashboard';
import ViewAllCategoriesGEBCDashboard from './app/src/view/screens/ViewAllCategoriesGEBCDashboard';
import ViewAllCategoriesQAFIDashboard from './app/src/view/screens/ViewAllCategoriesQAFIDashboard';
import UpdateVideoProfile from './app/src/view/screens/ViewVideoProfile/UpdateVideoProfile';
import ViewUpdateNews from './app/src/view/screens/UpdateNews/ViewUpdateNews';
import UpdatePostOnNews from './app/src/view/screens/UpdateNews/UpdatePostOnNews';
import ViewUpdateGEBC from './app/src/view/screens/UpdateGEBC/ViewUpdateGEBC';
import UpdateGEBC from './app/src/view/screens/UpdateGEBC/UpdateGEBC';
import UpdateQAFI from './app/src/view/screens/UpdateQAFI/UpdateQAFI';
import ViewUpdateQAFI from './app/src/view/screens/UpdateQAFI/ViewUpdateQAFI';
import ViewGEBC from './app/src/view/screens/GEBC/ViewGEBC';
import ViewNews from './app/src/view/screens/ViewNews/ViewNews';
import ViewQAFI from './app/src/view/screens/QAFI/ViewQAFI';
import ViewElseProfile from './app/src/view/screens/Profile/ViewElseProfile';
import Cinematics from './app/src/view/screens/Cinematics/Cinematics';
import Cinematics_details from './app/src/view/screens/Cinematics/Cinematics_details';
import CameraView from './app/src/view/screens/Cinematics/CameraView';
import CameraUpload from './app/src/view/screens/Cinematics/CameraUpload';
import Tv_Promax from './app/src/view/screens/Tv_Promax/Tv_Promax';
import Tv_Promax_details from './app/src/view/screens/Tv_Promax/Tv_Promax_details';
import Tv_promax_upload from './app/src/view/screens/Tv_Promax/Tv_promax_upload';
import Learning from './app/src/view/screens/Learning/Learning';
import Learning_details from './app/src/view/screens/Learning/Learning_details';
import Learning_upload from './app/src/view/screens/Learning/Learning_upload';
import Kids_vid from './app/src/view/screens/kids_vid/Kids_vid';
import Kids_vid_details from './app/src/view/screens/kids_vid/Kids_vid_details';
import Kids_vid_upload from './app/src/view/screens/kids_vid/Kids_vid_upload';
import Fans_star from './app/src/view/screens/fans_star/Fans_star';
import Fans_star_details from './app/src/view/screens/fans_star/Fans_star_details';
import Fans_star_upload from './app/src/view/screens/fans_star/Fans_star_upload';
import Live_upload from './app/src/view/screens/fans_star/Live_upload'
import Going_live from './app/src/view/screens/fans_star/Going_live';
import Live from './app/src/view/screens/fans_star/Live';
import MoreScreen from './app/src/view/screens/BottomTab/More';
import VideoPlayerScreen from './app/src/view/screens/Tv_Promax/VideoPlayerScreen';
import Section from './app/src/view/screens/BottomTab/Section';
import Test from './app/src/view/screens/BottomTab/Test';
import UpdateContent from './app/src/view/screens/Cinematics/UpdateContent';
import SearchVideo from './app/src/view/screens/Cinematics/SearchVideo';
import Fans_Search_Video from './app/src/view/screens/fans_star/Fans_Search_Video';
import Kid_Search_Video from './app/src/view/screens/kids_vid/Kid_Search_Video';
import Leaning_Search_Video from './app/src/view/screens/Learning/Learning_Search_Video';
import Tv_Search_Video from './app/src/view/screens/Tv_Promax/Tv_Search_Video';
import UpdatePostLetterAllUserName from './app/src/view/screens/UpdatePostLetter/UpdatePostLetterAllUserName';
import UpdatePtLetter from './app/src/view/screens/UpdatePostLetter/UpdatePtLetter';
import UpdatePostLetterInfo from './app/src/view/screens/UpdatePostLetter/UpdatePostLetterInfo';
import UpdatePostLetterEditSignature from './app/src/view/screens/UpdatePostLetter/UpdatePostLetterEditSignature';
import UpdatePostLetterSignature from './app/src/view/screens/UpdatePostLetter/UpdatePostLetterSignature';
import UpdatePostLetterEditSignaturePics from './app/src/view/screens/UpdatePostLetter/UpdatePostLetterEditSignaturePics';
import ViewImage from './app/src/assets/Custom/ViewImage';
import SearchNews from './app/src/view/screens/ViewNews/SearchNew';
import SearchPostLetter from './app/src/view/screens/PostLetter/SearchPostLetter';
import SearchGEBC from './app/src/view/screens/GEBC/SearchGEBC';
import TopPicView from './app/src/view/screens/TopPic/TopPicView';
import ViewTopVideo from './app/src/view/screens/VideoView/ViewTopVideo';
import WrappedPaymentScreen from './app/src/view/screens/PaymentCompoment/PaymentScreen';
import PaymentScreen from './app/src/view/screens/PaymentCompoment/PaymentScreen';
import Sports from './app/src/view/screens/Sports/Sports';
import SportsDetails from './app/src/view/screens/Sports/SportsDetails';
import UploadUpdateSports from './app/src/view/screens/Sports/UploadUpdateSports';
import UploadScreenSports from './app/src/view/screens/Sports/UploadScreenSports';
import SearchScreenSports from './app/src/view/screens/Sports/SearchScreenSports';
import TopSportsView from './app/src/view/screens/Sports/TopSportsView';
import NewsScreen from './app/src/view/screens/ViewNews/NewsScreen';
import OpenLetterScreen from './app/src/view/screens/PostLetter/OpenLetterScreen';
import QAFIScreen from './app/src/view/screens/QAFI/QAFIScreen';
import EBCScreen from './app/src/view/screens/GEBC/EBCScreen';
import ViewSportsProfile from './app/src/view/screens/SportsUpdate/ViewSportsProfile';
import UpdateSportsScreen from './app/src/view/screens/SportsUpdate/UpdateSportsScreen';
import QAFIUpload from './app/src/view/screens/QAFI/QAFIUpload';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    getToken();
  }, []);
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
    lazy: true,
    detachInactiveScreens: true,
  }}>
          <Stack.Screen
            name="SpashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InstlApps"
            component={InstlApps}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Profile_image"
            component={Profile_image}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UpdateVideoProfile"
            component={UpdateVideoProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateContent"
            component={UpdateContent}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewAllCategoriesGEBC"
            component={ViewAllCategoriesGEBC}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewGEBC"
            component={ViewGEBC}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewQAFI"
            component={ViewQAFI}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewNews"
            component={ViewNews}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewUpdateNews"
            component={ViewUpdateNews}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UpdatePostOnNews"
            component={UpdatePostOnNews}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewUpdateGEBC"
            component={ViewUpdateGEBC}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UpdateGEBC"
            component={UpdateGEBC}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewUpdateQAFI"
            component={ViewUpdateQAFI}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UpdateQAFI"
            component={UpdateQAFI}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewAllCategoriesQAFI"
            component={ViewAllCategoriesQAFI}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="RateApp"
            component={RateApp}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Signin_signup"
            component={Signin_signup}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="HelpScreen"
            component={HelpScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewElseProfile"
            component={ViewElseProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Conversation"
            component={Conversation}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SearchAppsDisc"
            component={SearchAppsDisc}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PicTours"
            component={PicTours}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewVideo"
            component={ViewVideo}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UploadUpdateVideoScreen"
            component={UploadUpdateVideoScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="BannerDetails"
            component={BannerDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AddBanner"
            component={AddBanner}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewBanners"
            component={ViewBanners}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewAllBlogs"
            component={ViewAllBlogs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="BlogDetails"
            component={BlogDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ProfileSettings"
            component={ProfileSettings}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UploadScreenPic"
            component={UploadScreenPic}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewVideoPicProfile"
            component={ViewVideoPicProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewVideoProfile"
            component={ViewVideoProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PostLetterEditSignature"
            component={PostLetterEditSignature}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PostLetterEditSignaturePics"
            component={PostLetterEditSignaturePics}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PostLetterSignature"
            component={PostLetterSignature}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cinematics"
            component={Cinematics}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tv_Promax"
            component={Tv_Promax}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Kids_vid"
            component={Kids_vid}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Learning"
            component={Learning}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Fans_star"
            component={Fans_star}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Fans_star_details"
            component={Fans_star_details}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Fans_star_upload"
            component={Fans_star_upload}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Live_upload"
            component={Live_upload}
            options={{ headerShown: false }}
          />
          < Stack.Screen name='Live' component={Live} options={{ headerShown: false }} />
          <Stack.Screen name='Going_live' component={Going_live} options={{ headerShown: false }} />
          <Stack.Screen
            name="CameraView"
            component={CameraView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CameraUpload"
            component={CameraUpload}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tv_promax_upload"
            component={Tv_promax_upload}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VideoPlayerScreen"
            component={VideoPlayerScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Learning_upload"
            component={Learning_upload}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cinematics_details"
            component={Cinematics_details}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tv_Promax_details"
            component={Tv_Promax_details}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Learning_details"
            component={Learning_details}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Kids_vid_details"
            component={Kids_vid_details}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Kids_vid_upload"
            component={Kids_vid_upload}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PostLetterInfo"
            component={PostLetterInfo}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PostLetter"
            component={PostLetter}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PostLetterAllUserName"
            component={PostLetterAllUserName}
            options={{ headerShown: false }}
          />
          {/* //// */}
          <Stack.Screen
            name="UpdatePostLetterAllUserName"
            component={UpdatePostLetterAllUserName}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdatePtLetter"
            component={UpdatePtLetter}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdatePostLetterInfo"
            component={UpdatePostLetterInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdatePostLetterEditSignature"
            component={UpdatePostLetterEditSignature}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdatePostLetterEditSignaturePics"
            component={UpdatePostLetterEditSignaturePics}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdatePostLetterSignature"
            component={UpdatePostLetterSignature}
            options={{ headerShown: false }}
          />

          {/* ///////////////////////////////////////////////////////////// */}
          <Stack.Screen
            name="ViewProfile"
            component={ViewProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ProductDetailsProfile"
            component={ProductDetailsProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UpdatePassword"
            component={UpdatePassword}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PrivateLetterDetails"
            component={PrivateLetterDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LetterDetails"
            component={LetterDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="GEBC"
            component={GEBC}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="QAFI"
            component={QAFI}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QAFIUpload"
            component={QAFIUpload}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LetterDisc"
            component={LetterDisc}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="BottomTabNavigation"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{headerShown: false}}
        /> */}

          <Stack.Screen
            name="PostOnNews"
            component={PostOnNews}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SavedItems"
            component={SavedItems}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ChangeImageScreen"
            component={ChangeImageScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewAllCategories"
            component={ViewAllCategories}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="News"
            component={News}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Disc"
            component={Disc}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MarketZone"
            component={MarketZone}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Video"
            component={Video}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="VerifyAccount"
            component={VerifyAccount}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UpdateSellProduct"
            component={UpdateSellProduct}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Sell"
            component={Sell}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SearchProducts"
            component={SearchProducts}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UploadUpdatePicScreen"
            component={UploadUpdatePicScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UploadUpdatePic"
            component={UploadUpdatePic}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UploadUpdateVideo"
            component={UploadUpdateVideo}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UploadUpdateScreen"
            component={UploadUpdateScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SubscriptionPayment"
            component={SubscriptionPayment}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ContactUs"
            component={ContactUs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TermsAndCondition"
            component={TermsAndCondition}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SearchScreenPicTours"
            component={SearchScreenPicTours}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PicDetails"
            component={PicDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UploadScreen"
            component={UploadScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UploadVideo"
            component={UploadVideo}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SearchApps"
            component={SearchApps}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PhoneBase"
            component={PhoneBase}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewAllCategoriesDashboard"
            component={ViewAllCategoriesDashboard}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewAllCategoriesGEBCDashboard"
            component={ViewAllCategoriesGEBCDashboard}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ViewAllCategoriesQAFIDashboard"
            component={ViewAllCategoriesQAFIDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchVideo"
            component={SearchVideo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Fans_Search_Video"
            component={Fans_Search_Video}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Kid_Search_Video"
            component={Kid_Search_Video}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Leaning_Search_Video"
            component={Leaning_Search_Video}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tv_Search_Video"
            component={Tv_Search_Video}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewImage"
            component={ViewImage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchNews"
            component={SearchNews}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchPostLetter"
            component={SearchPostLetter}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchGEBC"
            component={SearchGEBC}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TopPicView"
            component={TopPicView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewTopVideo"
            component={ViewTopVideo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Sports"
            component={Sports}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SportsDetails"
            component={SportsDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadUpdateSports"
            component={UploadUpdateSports}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UploadScreenSports"
            component={UploadScreenSports}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchScreenSports"
            component={SearchScreenSports}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TopSportsView"
            component={TopSportsView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewsScreen"
            component={NewsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OpenLetterScreen"
            component={OpenLetterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QAFIScreen"
            component={QAFIScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EBCScreen"
            component={EBCScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewSportsProfile"
            component={ViewSportsProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UpdateSportsScreen"
            component={UpdateSportsScreen}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>

  );

  //   function Tabb() {

  //     return (
  //       <Tab.Navigator

  //         tabBarOptions={{
  //           labelStyle: {
  //             fontSize: 10,
  //             margin: 0,
  //             padding: 0,
  //             // marginBottom:'2%',
  //             color: 'pink'
  //           },

  //         }}
  //         screenOptions={({ route }) => ({
  //           tabBarLabelStyle: {
  //             textAlign: 'center', marginBottom: '5%',
  //           },
  //           tabBarShowLabel: false,

  //           tabBarStyle: {
  //             backgroundColor: '#ffff',
  //             borderTopColor: 'white',
  //             borderTopWidth: 0.5,
  //             height: 50,
  //             // borderTopLeftRadius: 20,
  //             // borderTopRightRadius: 20,
  //           },

  //           tabBarActiveTintColor: '#FE934E',
  //           tabBarInactiveTintColor: '#9E9E9E',
  //         })}
  //       >

  //         <Tab.Screen
  //           name="Home1"
  //           component={Home}
  //           options={{

  //             tabBarIcon: ({ focused }) =>
  //               focused ? <Bb1 /> : <B1 />,
  //             headerShown: false, title: 'Edit List'
  //           }}
  //           listeners={({ }) => ({
  //             tabPress: () => {
  //               console.log('++++++++++++++++++')
  //             },
  //           })}
  //         />

  //         <Tab.Screen
  //           name="Workouts"
  //           component={Workouts}
  //           options={{

  //             // tabBarIcon: ({ focused }) => (

  //             //   <TabIcon
  //             //     focused={focused}
  //             //     source={require('./src/assets/images/bottom2.png')}
  //             //     name={"Workouts"}
  //             //   />

  //             // ),
  //             tabBarIcon: ({ focused }) =>
  //               focused ? <Bb2 /> : <B2 />,
  //             headerShown: false, title: 'Workouts '
  //           }}
  //           onPress={() => {
  //             console.log('sak')

  //           }}
  //         />

  //         <Tab.Screen
  //           name="Daily_report"
  //           component={Daily_report}
  //           options={{

  //             // tabBarIcon: ({ focused }) => (
  //             //   <TabIcon
  //             //     focused={focused}
  //             //     source={require('./src/assets/images/bottom3.png')}
  //             //     name={"Daily_report"}
  //             //   />
  //             // ),
  //             tabBarIcon: ({ focused }) =>
  //               focused ? <Bb3 /> : <B3 />,
  //             headerShown: false, title: 'Daily_report '
  //           }}
  //           onPress={() => {
  //             console.log('sak')

  //           }}
  //         />
  //         <Tab.Screen
  //           name="Settings"
  //           component={Settings}
  //           options={{

  //             // tabBarIcon: ({ focused }) => (
  //             //   <TabIcon
  //             //     focused={focused}
  //             //     source={require('./src/assets/images/bottom4.png')}
  //             //     name={"Settings"}
  //             //   />
  //             // ),
  //             tabBarIcon: ({ focused }) =>
  //               focused ? <Bb4 /> : <B4 />,
  //             headerShown: false, title: 'Settings '
  //           }}
  //           onPress={() => {
  //             console.log('sak')

  //           }}
  //         />

  //       </Tab.Navigator>
  //     );
  //   }
};
export default App;
