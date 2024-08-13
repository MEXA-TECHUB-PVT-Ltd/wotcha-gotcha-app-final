import {
    StyleSheet,
    FlatList,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    TextInput,
    StatusBar,
    PermissionsAndroid,
    ImageBackground,
    View,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useRef, useMemo, useEffect } from "react";
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import IonIcons from "react-native-vector-icons/Ionicons";
  export default function TopSportsView({ navigation, route }) {
    const [showFullContent, setShowFullContent] = useState(false);
    const toggleContent = () => {
      setShowFullContent(!showFullContent);
    };
    const receivedData = route.params?.picData;
    console.log("Data Recieved on pics", receivedData);
    var details = receivedData.description;
  
  
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: receivedData?.image }}
          style={{ flex: 1 }}
        >
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content" // You can set the StatusBar text color to dark or light
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IonIcons name={"chevron-back"} color={"white"} size={25} />
            </TouchableOpacity>
          </View>
  
          <View style={styles.bottomView}>
            <View style={{ height: hp(20) }}>
              <ScrollView
                showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
                style={{ flex: 1 }}
                contentContainerStyle={{
                  verticalLine: false,
                  marginHorizontal: wp(8),
                }}
              >
                <View style={{ width: "80%" }}>
                  <Text style={[styles.textProfileName, { marginLeft: -0 }]}>
                    {receivedData.name}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: hp(1),
                    fontFamily: "Inter",
                    fontSize: hp(1.8),
                    lineHeight: hp(2.1),
                    color: "#FFFFFF",
                  }}
                >
                  {showFullContent
                    ? details
                    : details.length > 90
                    ? details.substring(0, 90) + "..."
                    : details.slice(0)}
                </Text>
  
                <TouchableOpacity onPress={toggleContent}>
                  <Text
                    style={{
                      fontFamily: "Inter",
                      fontSize: hp(1.8),
                      color: "#FACA4E",
                    }}
                  >
                    {details.length > 90
                      ? showFullContent
                        ? "See Less"
                        : "See More"
                      : null}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
  
  
             
            </View>
          </View>
        </ImageBackground>
    
      </GestureHandlerRootView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    header: {
      flexDirection: "row",
      height: hp(6.2),
      marginTop: hp(8),
      alignItems: "center",
      marginHorizontal: wp(8),
    },
    bottomView: {
      flex: 1,
      justifyContent: "flex-end",
      // You can add padding or content to this view as needed.
    },
    textProfileName: {
      color: "#FFFFFF",
      fontSize: hp(2),
      marginLeft: wp(3),
      fontFamily: "Inter",
      fontWeight: "bold",
    },
  });
  