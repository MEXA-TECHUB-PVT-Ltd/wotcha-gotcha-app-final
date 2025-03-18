import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../view/screens/BottomTab/Dashboard";
import Categories from "../view/screens/BottomTab/Categories";
import ProfileSettings from "../view/screens/Profile/ProfileSettings";
import BottomtabNavigation from "./BottomtabNavigation";
import InstlApps from "../view/screens/InstalledApps/InstlApps";
import UpdateVideoProfile from "../view/screens/ViewVideoProfile/UpdateVideoProfile";
import UpdateContent from "../view/screens/Cinematics/UpdateContent";
import ViewAllCategoriesGEBC from "../view/screens/ViewAllCategoriesGEBC";
import ViewGEBC from "../view/screens/GEBC/ViewGEBC";
import ViewQAFI from "../view/screens/QAFI/ViewQAFI";
import ViewNews from "../view/screens/ViewNews/ViewNews";
import ViewUpdateNews from "../view/screens/UpdateNews/ViewUpdateNews";
import UpdatePostOnNews from "../view/screens/UpdateNews/UpdatePostOnNews";
import ViewUpdateGEBC from "../view/screens/UpdateGEBC/ViewUpdateGEBC";
import UpdateGEBC from "../view/screens/UpdateGEBC/UpdateGEBC";
import ViewUpdateQAFI from "../view/screens/UpdateQAFI/ViewUpdateQAFI";
import UpdateQAFI from "../view/screens/UpdateQAFI/UpdateQAFI";
import ViewAllCategoriesQAFI from "../view/screens/ViewAllCategoriesQAFI";
import RateApp from "../view/screens/RateApp";
import HelpScreen from "../view/screens/HelpScreen";
import Notification from "../view/screens/Notification";
import ViewElseProfile from "../view/screens/Profile/ViewElseProfile";
import Conversation from "../view/screens/Conversation";
import SearchAppsDisc from "../view/screens/SearchAppsDisc";
import PicTours from "../view/screens/BottomTab/PicTours";
// import ViewVideo from "../view/screens/PicDetails";
import ViewVideo from './../view/screens/VideoView/ViewVideo';
import UploadUpdateVideoScreen from './../view/screens/UpdateAVideo/UploadUpdateVideoScreen';
import BannerDetails from "../view/screens/BannerAds/BannerDetails";
import AddBanner from "../view/screens/BannerAds/AddBanner";
import ViewBanners from "../view/screens/BannerAds/ViewBanners";
import ViewAllBlogs from "../view/screens/ViewAllBlogs/ViewAllBlogs";
import BlogDetails from "../view/screens/ViewAllBlogs/BlogDetails";
import ChatScreen from "../view/screens/ChatScreen";
import UploadScreenPic from "../view/screens/UploadAVideo/UploadScreenPic";
import ViewVideoPicProfile from "../view/screens/ViewVideoProfile/ViewVideoPicProfile";
import ViewVideoProfile from '../view/screens/ViewVideoProfile/ViewVideoProfile';
import PostLetterEditSignature from "../view/screens/PostLetter/PostLetterEditSignature";
import UpdatePostLetterEditSignaturePics from "../view/screens/UpdatePostLetter/UpdatePostLetterEditSignaturePics";
import PostLetterSignature from "../view/screens/PostLetter/PostLetterSignature";
import PostLetterEditSignaturePics from "../view/screens/PostLetter/PostLetterEditSignaturePics";
import Cinematics from "../view/screens/Cinematics/Cinematics";
import Tv_Promax from "../view/screens/Tv_Promax/Tv_Promax";
import Kids_vid from "../view/screens/kids_vid/Kids_vid";
import Learning from "../view/screens/Learning/Learning";
import Fans_star from "../view/screens/fans_star/Fans_star";
import Fans_star_details from "../view/screens/fans_star/Fans_star_details";
import Fans_star_upload from "../view/screens/fans_star/Fans_star_upload";
import Live_upload from "../view/screens/fans_star/Live_upload";
import Live from "../view/screens/fans_star/Live";
import Going_live from "../view/screens/fans_star/Going_live";
import CameraView from "../view/screens/Cinematics/CameraView";
import CameraUpload from '../view/screens/Cinematics/CameraUpload';
import Tv_promax_upload from "../view/screens/Tv_Promax/Tv_promax_upload";
import VideoPlayerScreen from "../view/screens/Tv_Promax/VideoPlayerScreen";
import Learning_upload from "../view/screens/Learning/Learning_upload";
import Cinematics_details from "../view/screens/Cinematics/Cinematics_details";
import Tv_Promax_details from "../view/screens/Tv_Promax/Tv_Promax_details";
import Learning_details from "../view/screens/Learning/Learning_details";
import Kids_vid_details from "../view/screens/kids_vid/Kids_vid_details";
import Kids_vid_upload from "../view/screens/kids_vid/Kids_vid_upload";
import PostLetterInfo from "../view/screens/PostLetter/PostLetterInfo";
import PostLetter from "../view/screens/PostLetter/PostLetter";
import PostLetterAllUserName from "../view/screens/PostLetter/PostLetterAllUserName";
import UpdatePostLetterAllUserName from "../view/screens/UpdatePostLetter/UpdatePostLetterAllUserName";
import UpdatePtLetter from "../view/screens/UpdatePostLetter/UpdatePtLetter";
import UpdatePostLetterInfo from "../view/screens/UpdatePostLetter/UpdatePostLetterInfo";
import UpdatePostLetterEditSignature from "../view/screens/UpdatePostLetter/UpdatePostLetterEditSignature";
import UpdatePostLetterSignature from "../view/screens/UpdatePostLetter/UpdatePostLetterSignature";
import ViewProfile from "../view/screens/Profile/ViewProfile";
import ProductDetailsProfile from "../view/screens/ProductDetailsProfile";
import UpdatePassword from "../view/screens/Profile/UpdatePassword";
import UpdateProfile from "../view/screens/Profile/UpdateProfile";
import PrivateLetterDetails from "../view/screens/PrivateLetterDetails";
import LetterDetails from "../view/screens/LetterDetails";
import GEBC from "../view/screens/GEBC/GEBC";
import QAFI from "../view/screens/QAFI/QAFI";
import QAFIUpload from "../view/screens/QAFI/QAFIUpload";
import LetterDisc from "../view/screens/BottomTab/LetterDisc";
import DrawerNavigation from "./DrawerNavigation";
import PostOnNews from "../view/screens/PostOnNews/PostOnNews";
import SavedItems from "../view/screens/SavedItems";
import ChangeImageScreen from "../view/screens/PostOnNews/ChangeImageScreen";
import ViewAllCategories from "../view/screens/ViewAllCategories";
import News from "../view/screens/News";
import Disc from "../view/screens/BottomTab/Disc";
import MarketZone from "../view/screens/BottomTab/MarketZone";
import Video from "../view/screens/BottomTab/Video";
import VerifyAccount from "../view/screens/Auth/VerifyAccount";
import UpdateSellProduct from "../view/screens/UpdateSellProduct";
import Sell from "../view/screens/Sell";
import ProductDetails from "../view/screens/ProductDetails";
import SearchProducts from "../view/screens/SearchProducts";
import UploadUpdatePicScreen from "../view/screens/UpdateAPic/UploadUpdatePicScreen";
import UploadUpdatePic from "../view/screens/UpdateAPic/UploadUpdatePic";
import UploadUpdateVideo from "../view/screens/UpdateAVideo/UploadUpdateVideo";
import UploadUpdateScreen from "../view/screens/UpdateAVideo/UploadUpdateScreen";
import SubscriptionPayment from "../view/screens/SubscriptionPayment";
import ContactUs from "../view/screens/ContactUs";
import TermsAndCondition from "../view/screens/TermsAndCondition";
import PrivacyPolicy from "../view/screens/PrivacyPolicy";
import SearchScreenPicTours from "../view/screens/SearchScreenPicTours";
import SearchScreen from "../view/screens/SearchScreen";
import PicDetails from '../view/screens/PicDetails';
import UploadScreen from "../view/screens/UploadAVideo/UploadScreen";
import UploadVideo from "../view/screens/UploadAVideo/UploadVideo";
import SearchApps from "../view/screens/SearchApps";
import PhoneBase from "../view/screens/PhoneBase";
import ForgetPassword from "../view/screens/Auth/ForgetPassword";
import ViewAllCategoriesDashboard from "../view/screens/ViewAllCategoriesDashboard";
import ViewAllCategoriesGEBCDashboard from "../view/screens/ViewAllCategoriesGEBCDashboard";
import ViewAllCategoriesQAFIDashboard from "../view/screens/ViewAllCategoriesQAFIDashboard";
import SearchVideo from "../view/screens/Cinematics/SearchVideo";
import Fans_Search_Video from "../view/screens/fans_star/Fans_Search_Video";
import Kid_Search_Video from "../view/screens/kids_vid/Kid_Search_Video";
import Leaning_Search_Video from "../view/screens/Learning/Learning_Search_Video";
import Tv_Search_Video from "../view/screens/Tv_Promax/Tv_Search_Video";
import ViewImage from "../assets/Custom/ViewImage";
import SearchNews from "../view/screens/ViewNews/SearchNew";
import SearchPostLetter from "../view/screens/PostLetter/SearchPostLetter";
import SearchGEBC from "../view/screens/GEBC/SearchGEBC";
import TopPicView from "../view/screens/TopPic/TopPicView";
import ViewTopVideo from "../view/screens/VideoView/ViewTopVideo";
import PaymentScreen from "../view/screens/PaymentCompoment/PaymentScreen";
import Sports from "../view/screens/Sports/Sports";
import SportsDetails from "../view/screens/Sports/SportsDetails";
import UploadUpdateSports from "../view/screens/Sports/UploadUpdateSports";
import UploadScreenSports from "../view/screens/Sports/UploadScreenSports";
import SearchScreenSports from "../view/screens/Sports/SearchScreenSports";
import TopSportsView from "../view/screens/Sports/TopSportsView";
import NewsScreen from "../view/screens/ViewNews/NewsScreen";
import OpenLetterScreen from "../view/screens/PostLetter/OpenLetterScreen";
import QAFIScreen from "../view/screens/QAFI/QAFIScreen";
import EBCScreen from "../view/screens/GEBC/EBCScreen";
import ViewSportsProfile from "../view/screens/SportsUpdate/ViewSportsProfile";
import UpdateSportsScreen from "../view/screens/SportsUpdate/UpdateSportsScreen";
import Signin_signup from "../view/screens/Signin_signup/Signin_signup";
const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator
      // initialRouteName="BottomTabNavigation"
      screenOptions={{
        headerShown: false,
        // lazy: true,
        // detachInactiveScreens: true
      }}
    >
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomtabNavigation}
      />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="InstlApps" component={InstlApps} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      <Stack.Screen name="UpdateVideoProfile" component={UpdateVideoProfile} />
      <Stack.Screen name="UpdateContent" component={UpdateContent} />
      <Stack.Screen name="ViewAllCategoriesGEBC" component={ViewAllCategoriesGEBC} />
      <Stack.Screen name="ViewGEBC" component={ViewGEBC} />
      <Stack.Screen name="ViewQAFI" component={ViewQAFI} />
      <Stack.Screen name="ViewNews" component={ViewNews} />
      <Stack.Screen name="ViewUpdateNews" component={ViewUpdateNews} />
      <Stack.Screen name="UpdatePostOnNews" component={UpdatePostOnNews} />
      <Stack.Screen name="ViewUpdateGEBC" component={ViewUpdateGEBC} />
      <Stack.Screen name="UpdateGEBC" component={UpdateGEBC} />
      <Stack.Screen name="ViewUpdateQAFI" component={ViewUpdateQAFI} />
      
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
                    {/* <Stack.Screen
                      name="Signin_signup"
                      component={Signin_signup}
                      options={{ headerShown: false }}
                    /> */}
      {/* Add other main app screens here */}
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
