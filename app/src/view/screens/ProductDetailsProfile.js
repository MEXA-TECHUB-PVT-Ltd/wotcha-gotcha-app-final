import {
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Back from "../../assets/svg/back.svg";
import { appImages } from "../../assets/utilities/index";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CustomButton from "../../assets/Custom/Custom_Button";
import { base_url } from '../../../../baseUrl';
import Fontiso from "react-native-vector-icons/Fontisto";
import Location from "../../assets/svg/Location.svg";

import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from "react-native-vector-icons/Ionicons";

import Headers from "../../assets/Custom/Headers";

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import HeaderImageSlider from "../../assets/Custom/HeaderImageSlider";
import EditItem from "../../assets/svg/UpdateItem.svg";

import Delete from "../../assets/svg/Delete.svg";
import CustomSnackbar from "../../assets/Custom/CustomSnackBar";

export default function ProductDetailsProfile({ navigation, route }) {
  const identifier  = route.params.identifier;
  const [imageUri, setImageUri] = useState(null);
  const [selectedValueListView, setSelectedValueListView] = useState("");

  const ref_RBSendOffer = useRef(null);
  const ref_RBSendOffer2 = useRef(null);
  const ref_RBSheetCamera = useRef(null);
  const [authToken, setAuthToken] = useState('');
  const ref_RBSheetLogout = useRef(null);

  const receivedData = route.params?.ProductDetails;
  console.log("Product Details", receivedData);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken ");
        if (token) {
          setAuthToken(token);
        } else {
          throw new Error("No auth token found");
        }
      } catch (err) {
        console.error("Error retrieving auth token:", err);

      }
    };

    getAuthToken();
  }, []);

  const details = [
    { id: 1, title: "Lense", image: appImages.lense },
    { id: 2, title: "Holder", image: appImages.holder },
    { id: 3, title: "HeadPhone", image: appImages.headPhone },
    { id: 4, title: "Shoes", image: appImages.shoes },
    { id: 5, title: "Printer", image: appImages.printer },
    //{id: 10, title: 'Printer', image: appImages.printer},
  ];

  const renderAvailableApps = (item) => {
    console.log("Items", item);
    return (
      <View
        style={{
          //height: hp(18),
          //width:'100%',
          flex: 1,
          //borderRadius: wp(3),
          //margin: 5,
        }}
      >
        <Image
          style={{
            // flex: 1,
            resizeMode: "contain",
          }}
          source={item.image}
        />
      </View>
    );
  };

  const renderDot = (index, currentIndex) => {
    const dotWidth = index === currentIndex ? 12 : 6; // Adjust the dot width as needed

    return <View key={index} style={[styles.dot, { width: dotWidth }]} />;
  };

  const radioButtonsGridView = [
    { label: "$ 400", value: "400" },
    { label: "$ 390", value: "390" },
    { label: "$ 380", value: "380" },
  ];

  const onPressChangeView = async (item) => {
    //console.log("first",item)
    setSelectedValueListView(item);
    //await AsyncStorage.setItem('distance', token);
    ref_RBSendOffer.current.close();
  };

  const goToScreen = () => {
    ref_RBSheetCamera.current.close();
    navigation.navigate("UpdateSellProduct", { item: receivedData });
  };

  const openSheet = () => {
    ref_RBSheetCamera.current.close();

    ref_RBSheetLogout.current.open();
  };

  const changeDelete = () => {
    ref_RBSheetCamera.current.close();
    handleUpdateDelete();
    //navigation.goBack()
  };

  const handleUpdateDelete = async () => {
    const token = authToken;
    try {
      const response = await fetch(
        base_url + `item/deleteitem/${receivedData?.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            // Include any additional headers as needed
          },
          // You may include a request body if required by the server
          // body: JSON.stringify({}),
        },
      );

      if (response.ok) {
        handleUpdateDeletePassword();
        // Optionally handle the response data here
      } else {
        console.error(
          `Error deleting video with ID ${receivedData?.id}:`,
          response.status,
        );
        // Optionally handle the error response here
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors such as network issues
    }
  };
  
  const [snackbarDeleteVisible, setsnackbarDeleteVisible] = useState(false);

  const dismissDeleteSnackbar = () => {
    setsnackbarDeleteVisible(false);
  };
  const handleUpdateDeletePassword = async () => {
    setsnackbarDeleteVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarDeleteVisible(false);
      navigation.navigate('ViewProfile');
      //navigation.goBack();
    }, 3000);
  };
  //----------------------------------\\
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="black"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{ marginTop: hp(5) }}>
        <Headers
          showBackIcon={true}
          // showMenu={true}
          // onPressMenu={() => ref_RBSheetCamera.current.open()}
          onPress={() => navigation.goBack()}
          showText={true}
          text={"Item Details"}
        />
      </View>

      {identifier ? ( 
        <TouchableOpacity
              onPress={() => ref_RBSheetCamera.current.open()}
              style={{position:'absolute', right:20, marginTop: 60}}>
              <Entypo name={'dots-three-vertical'} size={18} color={'black'} />
            </TouchableOpacity>
      ) : (
     <View/>
      )}

      <View style={{ height: hp(35), marginTop: hp(5) }}>
        <HeaderImageSlider
          data={receivedData?.images}
          paginationStyleItemActiveStyle={{
            width: 18,
            height: 7,
            borderRadius: 7 / 2,
          }}
          paginationStyleItemInactive={{
            backgroundColor: "#D4D4D4",
            borderWidth: 0,
          }}
        />

        {/* <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      data={availableApps}
      renderItem={renderAvailableApps}
    /> */}

        {/* <SwiperFlatList
      data={availableApps}
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      renderItem={renderAvailableApps}
      renderAll={false}
      paginationStyleItem={styles.paginationStyle}
      paginationActiveDotColor={'blue'} // Change this to your active dot color
      paginationDefaultColor={'gray'} // Change this to your default dot color
      renderPagination={({ index, currentIndex }) => renderDot(index, currentIndex)}
    /> */}
      </View>

      <View
        style={{
          flex: 1,
          marginTop: hp(10),
          marginHorizontal: wp(8),
        }}
      >
        <Text
          style={{
            color: "#595959",
            fontFamily: "Inter",
            fontWeight: "800",
            fontSize: hp(2.4),
          }}
        >
          {receivedData?.title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#77838F",
              marginTop: hp(1.3),
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: hp(2),
            }}
          >
            {receivedData?.item_category_name}
          </Text>

          <Text
            style={{
              color: "#77838F",
              marginTop: hp(1.3),
              fontFamily: "Inter",
              fontWeight: "400",
              fontSize: hp(2),
            }}
          >
           $ {receivedData?.price}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: hp(5),
          }}
        >
          <Location width={15} height={15} />

          <Text
            style={{
              color: "#77838F",
              fontFamily: "Inter",
              marginLeft: wp(3),
              fontWeight: "400",
              fontSize: hp(2),
            }}
          >
            {receivedData?.location}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: hp(23) }}
        >
          <Text
            style={{
              color: "#77838F",
              fontFamily: "Inter",
              textAlign: "justify",
              lineHeight: hp(2.7),
              //fontWeight: '400',
              fontSize: hp(1.8),
            }}
          >
            {receivedData?.description}
          </Text>
        </ScrollView>
      </View>

      <RBSheet
        ref={ref_RBSendOffer}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(55),
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: wp(8),
            alignItems: "center",
          }}
        >
          <Text style={styles.maintext}>Send Offer</Text>
          <TouchableOpacity onPress={() => ref_RBSendOffer.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSendOffer.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            height: hp(14),
            alignItems: "center",
            marginTop: hp(3),
            marginHorizontal: wp(8),
            //borderWidth: 3,
          }}
        >
          <View
            style={{
              // height: hp(10),
              //flex: 1,
              height: hp(12),
              marginLeft: wp(5),
              //borderWidth:3,
              width: wp(21),
              borderRadius: wp(3),
              // margin: 5,
            }}
          >
            <Image
              style={{
                // position: 'absolute',
                // top: 0,
                // left: 0,
                //zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: "100%",
                height: "100%",
                //height:hp(15),
                // width:wp(15),
                borderRadius: wp(3),
                resizeMode: "contain",
              }}
              source={appImages.lense}
            />
          </View>

          <View
            style={{
              height: hp(10),
              marginLeft: wp(2.1),
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "#333333",
                fontFamily: "Inter",
                fontWeight: "bold",

                fontSize: hp(2),
              }}
            >
              Item Name
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#FACA4E",
                  fontFamily: "Inter",
                  fontWeight: "500",

                  fontSize: hp(2),
                }}
              >
                $ 456
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginLeft: wp(-1.7) }}>
              <Location width={18} height={18} />
              <Text
                style={{
                  color: "#77838F",
                  fontFamily: "Inter",
                  fontWeight: "300",

                  fontSize: hp(1.7),
                }}
              >
                123 Main Street Cityville, USA
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: hp(15),
            //flexDirection: 'row', // Arrange items horizontally
            justifyContent: "space-between", // Space between items
            //alignItems: 'center', // Center items vertically
            //borderWidth: 3,
            marginHorizontal: wp(8),
            //paddingHorizontal: 10, // Add horizontal padding
          }}
        >
          {radioButtonsGridView.map((button, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: "#0000001A",
                borderBottomWidth: 1,
                justifyContent: "space-between",
              }}
            >
              <RadioButtonLabel
                obj={button}
                index={index}
                onPress={() => onPressChangeView(button.value)}
                labelHorizontal={true}
                labelStyle={{
                  fontSize: hp(1.8),
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  color: "#333333",
                  //marginRight: 10, // Add margin between label and button
                }}
                labelWrapStyle={
                  {
                    //marginBottom: hp(2),
                  }
                }
              />
              <RadioButtonInput
                obj={button}
                index={index}
                isSelected={selectedValueListView === button.value}
                onPress={() => onPressChangeView(button.value)}
                borderWidth={1}
                buttonInnerColor={
                  selectedValueListView === button.value
                    ? "#FACA4E"
                    : "#00000017"
                }
                buttonOuterColor={
                  selectedValueListView === button.value
                    ? "#FACA4E"
                    : "#00000017"
                }
                buttonSize={15}
                buttonOuterSize={20}
                //buttonStyle={{ marginTop: hp(3) }}
              />
            </View>
          ))}
        </View>

        <View
          style={{
            height: hp(5),
            marginTop: hp(1.9),
            marginHorizontal: wp(8),
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#333333",
              fontFamily: "Inter",
              fontWeight: "bold",

              fontSize: hp(1.8),
            }}
          >
            Offer a different amount
          </Text>
        </View>

        <View
          style={{
            marginTop: hp(2.1),
            marginBottom: hp(5),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButton
            title={"Send Offer"}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              ref_RBSendOffer.current.open();
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSendOffer2}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(48),
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: wp(8),
            alignItems: "center",
          }}
        >
          <Text style={styles.maintext}>Send Offer</Text>
          <TouchableOpacity onPress={() => ref_RBSendOffer2.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSendOffer2.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            height: hp(14),
            alignItems: "center",
            marginTop: hp(3),
            marginHorizontal: wp(8),
            //borderWidth: 3,
          }}
        >
          <View
            style={{
              // height: hp(10),
              //flex: 1,
              height: hp(12),
              marginLeft: wp(5),
              //borderWidth:3,
              width: wp(21),
              borderRadius: wp(3),
              // margin: 5,
            }}
          >
            <Image
              style={{
                // position: 'absolute',
                // top: 0,
                // left: 0,
                //zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: "100%",
                height: "100%",
                //height:hp(15),
                // width:wp(15),
                borderRadius: wp(3),
                resizeMode: "contain",
              }}
              source={appImages.lense}
            />
          </View>

          <View
            style={{
              height: hp(10),
              marginLeft: wp(2.1),
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "#333333",
                fontFamily: "Inter",
                fontWeight: "bold",

                fontSize: hp(2),
              }}
            >
              Item Name
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#FACA4E",
                  fontFamily: "Inter",
                  fontWeight: "500",

                  fontSize: hp(2),
                }}
              >
                $ 456
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginLeft: wp(-1.7) }}>
              <Location width={18} height={18} />
              <Text
                style={{
                  color: "#77838F",
                  fontFamily: "Inter",
                  fontWeight: "300",

                  fontSize: hp(1.7),
                }}
              >
                123 Main Street Cityville, USA
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: hp(15),
            marginHorizontal: wp(8),
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#333333",
              fontFamily: "Inter",
              fontWeight: "bold",

              fontSize: hp(4.3),
            }}
          >
            $ 435
          </Text>

          <View
            style={{
              height: hp(0.1),
              width: "100%",
              backgroundColor: "#00000042",
            }}
          ></View>

          <Text
            style={{
              color: "#FACA4E",
              fontFamily: "Inter",
              fontWeight: "400",

              fontSize: hp(2.5),
            }}
          >
            Listed Price $456
          </Text>
        </View>

        <View
          style={{
            marginTop: hp(2.1),
            marginBottom: hp(5),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButton
            title={"Send Offer"}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              ref_RBSendOffer.current.open();
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSheetCamera}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(25),
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: wp(8),
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter-Medium",
              color: "#303030",
              fontSize: hp(2.3),
            }}
          >
            Select an option
          </Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            //flexDirection: 'row',
            justifyContent: "space-evenly",
            //alignItems: 'center',
            //borderWidth: 3,
            marginTop: hp(3),
          }}
        >
          <TouchableOpacity
            onPress={() => goToScreen()}
            style={{ flexDirection: "row", marginHorizontal: wp(7) }}
          >
            <EditItem height={23} width={23} />

            <Text
              style={{
                fontFamily: "Inter-Regular",
                color: "#656565",
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}
            >
              Update Item
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: hp(0.1),
              marginHorizontal: wp(8),
              marginTop: hp(3),
              backgroundColor: "#00000012",
            }}
          ></View>

          <TouchableOpacity
            onPress={() => openSheet()}
            style={{
              flexDirection: "row",
              marginTop: hp(2.5),
              marginHorizontal: wp(7),
            }}
          >
            <Delete height={23} width={23} />

            <Text
              style={{
                fontFamily: "Inter-Regular",
                color: "#656565",
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}
            >
              Delete Item
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSheetLogout}
        height={330}
        openDuration={250}
        enableOverDrag={false}
        enabledGestureInteraction={false}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 0,
            padding: 20,
            zIndex: 999,
          },
          draggableIcon: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Image source={appImages.alert} style={{ resizeMode: "contain" }} />
        <Text
          style={[
            styles.txtNotification,
            { marginTop: 1, fontSize: hp(2.5), fontWeight: "500" },
          ]}
        >
          Confirmation
        </Text>

        <Text style={{ marginTop: hp(2) }}>
          Do you really want to delete this item?
        </Text>

        <View style={styles.buttonDirections}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => ref_RBSheetLogout.current.close()}
          >
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity    onPress={() => changeDelete()}
            // onPress={() => ref_RBSheetLogout.current.close()}
            style={[styles.button, { backgroundColor: "#FACA4E" }]}
          >
            <Text style={[styles.textButton, { color: "#232323" }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
<View style={{marginTop:30}}>

      <CustomSnackbar
          message={'success'}
          messageDescription={'Video deleted successfully'}
          onDismiss={dismissDeleteSnackbar} // Make sure this function is defined
          visible={snackbarDeleteVisible}
        />
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  dot: {
    width: 6, // Default dot width
    height: 6, // Default dot height
    borderRadius: 3, // Make it round
    marginHorizontal: 5, // Adjust spacing between dots
    backgroundColor: "gray", // Default dot color
  },
  paginationStyle: {
    bottom: 10, // Adjust the position of the pagination
  },
  circleBox: {
    width: wp(12),
    height: wp(12),
    overflow: "hidden",
    borderColor: "#00000020",
    borderRadius: wp(50),
    justifyContent: "center",
    alignItems: "center",
  },
  maintext: {
    fontSize: hp(2.3),
    color: "#333333",
    fontWeight: "bold",
  },
  ti: {
    marginHorizontal: "7%",
    marginTop: "5%",
    width: 300,
    backgroundColor: "white",
    fontSize: wp(4),
    paddingLeft: "2%",
    borderRadius: 10,
  },
  buttonDirections: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(4.3),
    width: "100%",
    marginLeft: wp(5),
    justifyContent: "space-evenly",
  },
  button: {
    borderColor: "#FACA4E",
    borderWidth: 0.8,
    borderRadius: wp(5),
    width: wp(35),
    height: hp(5.5),
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#FACA4E",
    fontWeight: "bold",
  },
  txtNotification: {
    fontWeight: "500",
    marginTop: hp(10),
    marginLeft: wp(5),
    fontSize: hp(2.3),
    color: "#0B0B0B",
  },
});
