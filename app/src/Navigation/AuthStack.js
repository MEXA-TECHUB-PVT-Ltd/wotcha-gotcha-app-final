import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin_signup from "../view/screens/Signin_signup/Signin_signup";
import ForgetPassword from "../view/screens/Auth/ForgetPassword";
import ResetPassword from "../view/screens/Auth/ResetPassword";
import VerifyAccount from "../view/screens/Auth/VerifyAccount";
import MainStackNavigation from "./MainStackNavigation";
import SplashScreen from "../view/screens/SplashScreen";
import Profile_image from "../view/screens/Profile_image/Profile_image";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin_signup"
        component={Signin_signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyAccount"
        component={VerifyAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile_image"
        component={Profile_image}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainStackNavigation"
        component={MainStackNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
