/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry,ToastAndroid} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import PushNotification , {Importance} from "react-native-push-notification";
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setFirstTimeFlag = async () => {
  try {
    const isFirstTime = await AsyncStorage.getItem("isFirstTime");
    if (isFirstTime === null || isFirstTime === "false") {
      await AsyncStorage.setItem("isFirstTime", "true");
      console.log("isFirstTime set to true");
    } else {
      console.log("isFirstTime already set:", isFirstTime);
    }
  } catch (error) {
    console.error("Error setting isFirstTime:", error);
  }
};
setFirstTimeFlag();

PushNotification.configure({

    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    
      },
      requestPermissions: Platform.OS=== 'ios',

});

PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // Register foreground message handler
messaging().onMessage(async remoteMessage => {
    console.log('Notification received in foreground:', remoteMessage);
    // Handle the notification content here
    // You can update your app's UI or show a custom in-app notification.
    if (remoteMessage.notification && remoteMessage.notification.title) {
        PushNotification.localNotification({
            /* Android Only Properties */
            channelId: "channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
            ticker: "My Notification Ticker", // (optional)
            /* iOS and Android properties */
            title: remoteMessage.notification.title, // (optional)
            message: remoteMessage.notification.body, // (required)
          });
        ToastAndroid.show(remoteMessage.notification.title, ToastAndroid.SHORT);
      }
  });

  //notification 

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    //navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
AppRegistry.registerComponent(appName, () => App);
