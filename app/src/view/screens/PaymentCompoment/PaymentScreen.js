import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useStripe, CardField } from "@stripe/stripe-react-native";
import Headers from "../../../assets/Custom/Headers";
import axios from "axios";
import { base_url } from "../../../../../baseUrl";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";

const PaymentScreen = ({ navigation, route }) => {
  const token = route.params.authToken;
  const totalAmount = route.params.totalAmount;
  const bannerId = route.params.bannerId;
  const addBannerLink = route.params.addBannerLink;
  const datas = route.params.datas;
  const userId = route.params.user_id;
  const startDate = route.params.startDate;
  const endDate = route.params.endDate;
  const isChecked = route.params.top_banner;
  // const receivedData = route.params.receivedData;

  console.log("token------", token);
  console.log("totalAmount------", totalAmount);
  console.log("bannerId------", bannerId);
  console.log("addBannerLink------", addBannerLink);
  console.log("datas------", datas);
  console.log("userId------", userId);
  console.log("startDate------", startDate);
  console.log("endDate------", endDate);
  console.log("isChecked------", isChecked);
  
  // console.log("bannerId------", bannerId);
  const { createPaymentMethod } = useStripe();
  const [snackBarVisible, setSnackbarVisible] = useState(false);
  const [snackBarVisibleAlert, setSnackbarVisibleAlert] = useState(false);
  const [snackBarVisibleCardAlert, setSnackbarVisibleCardAlert] =
    useState(false);
    const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, []);
  const handlePayment = async () => {
    setIsLoading(true)
    try {
      // Step 1: Create Customer
      const customerResponse = await axios.post(
        base_url + "payments/create-customer",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token
          },
        }
      );
      // You can store the customerId if needed for future use
      const customerId = customerResponse.data.result.id;
      // console.log("customerId-------", customerId);
      const statussuccess = customerResponse.data.success;
      // console.log("statussuccess-------", statussuccess);
      const message = customerResponse.data.message;
      // console.log("message-------", message);
      // Step 2: Create Payment Method
      const { paymentMethod, error: paymentMethodError } =
        await createPaymentMethod({
          type: "card",
          paymentMethodType: "Card",
        });

      if (paymentMethodError) {
        handleCarddAlert();
        console.log("Payment failed", paymentMethodError.message);
        setIsLoading(false); // Hide loader on error
        return;
      }

      const paymentMethodId = paymentMethod.id;
      console.log("paymentMethodId", paymentMethodId);
      // Step 3: Attach Payment Method
      await axios.post(
        base_url + "payments/attach-payment-method",
        {
          paymentMethodId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      // Step 4: Transfer Payment
      const transferResponse = await axios.post(
        base_url + "payments/transfer-payment",
        {
          amount: totalAmount,
          banner_id: bannerId,
          paymentMethodId: paymentMethodId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      if (transferResponse.status === 200) {
        console.log("bannerId", bannerId);

        // Update the banner status after successful payment
        await updateBannerStatus(
          bannerId,
          datas,
          addBannerLink,
          totalAmount,
          startDate,
          endDate,
          userId,
          isChecked
        );
        console.log("Success", "Payment transferred successfully!");
      } else {
        handleUpdatePasswordAlert();
        console.log(
          "Payment failed",
          "An error occurred while transferring the payment."
        );
      }
    } catch (error) {
      console.error("Payment error:", error.message);
      handleUpdatePasswordAlert();
      console.log(
        "Payment failed",
        "An error occurred while processing your payment."
      );
    } finally {
      setIsLoading(false); // Hide loader after process completion
    }
  };

  const updateBannerStatus = async (
    bannerId,
    datas,
    addBannerLink,
    totalAmount,
    startDate,
    endDate,
    userId,
    isChecked
  ) => {
    try {
      const banner_Id = bannerId;
      const image = datas; // Assuming 'datas' is the image data
      const add_Banner_Link = addBannerLink;
      const total_Amount = totalAmount;
      const start_Date = startDate;
      const end_Date = endDate;
      const user_Id = userId;
      const is_Checked = isChecked;
  
      console.log("banner_Id", banner_Id);
      console.log("image", image);
      console.log("add_Banner_Link", add_Banner_Link);
      console.log("total_Amount", total_Amount);
      console.log("start_Date", start_Date);
      console.log("end_Date", end_Date);
      console.log("user_Id", user_Id);
      console.log("is_Checked", is_Checked);
  
      const body = {
        id: banner_Id,
        image: image, // Confirm 'image' contains the correct data format expected by your backend
        banner_link: add_Banner_Link,
        price: total_Amount,
        startDate: start_Date,
        endDate: end_Date,
        user_id: user_Id,
        paid_status: true,
        top_banner: is_Checked
      };
  
      const updateBannerStatusEndpoint = base_url + "banner/updateBanner";
      const response = await fetch(updateBannerStatusEndpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure 'token' is defined and accessible here
          "Content-Type": "application/json" // Specify content type explicitly
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      console.log("Response:", data);
  
      if (response.ok) {
        console.log("Banner status updated successfully");
        handleUpdatePassword();
        // Perform any additional actions upon successful update
      } else {
        console.error("Failed to update banner status:", data);
        // Handle error scenarios accordingly
      }
    } catch (error) {
      console.error("Error updating banner status:", error.message);
    }
  };
  

  // const updateBannerStatus = async (
  //   bannerId,
  //   datas,
  //   addBannerLink,
  //   totalAmount,
  //   startDate,
  //   endDate,
  //   userId,
  //   isChecked
  // ) => {
  //   const banner_Id = bannerId;
  //   const image = datas;
  //   const add_Banner_Link = addBannerLink;
  //   const total_Amount = totalAmount;
  //   const start_Date = startDate;
  //   const end_Date = endDate;
  //   const user_Id = userId;
  //   const is_Checked = isChecked;

  //   console.log("banner_Id", banner_Id);
  //   console.log("image--", image);
  //   console.log("add_Banner_Link", add_Banner_Link);
  //   console.log("total_Amount", total_Amount);
  //   console.log("start_Date", start_Date);
  //   console.log("end_Date", end_Date);
  //   console.log("user_Id", user_Id);
  //   console.log("is_Checked", is_Checked);

  //   const body = {
  //     id: banner_Id,
  //     image: image,
  //     banner_link: add_Banner_Link,
  //     price: total_Amount,
  //     startDate: start_Date,
  //     endDate: end_Date,
  //     user_id: user_Id,
  //     paid_status: true,
  //     top_banner: is_Checked
  //   };
  //   try {
  //     const updateBannerStatusEndpoint = base_url + "banner/updateBanner";
  //     const response = await fetch(updateBannerStatusEndpoint, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Include the token in the headers
  //       },
  //       body: JSON.stringify(body),
  //     });



  const handleCarddAlert = () => {
    setSnackbarVisibleCardAlert(true);
    setTimeout(() => {
      setSnackbarVisibleCardAlert(false);
    }, 3000);
  };

  const handleUpdatePassword = () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
      navigation.navigate("ViewBanners");
    }, 3000);
  };

  const handleUpdatePasswordAlert = () => {
    setSnackbarVisibleAlert(true);
    setTimeout(() => {
      setSnackbarVisibleAlert(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Headers
          showBackIcon={true}
          onPress={() => navigation.goBack()}
          showText={true}
          text={"Payment Details"}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Payment</Text>
          <Text style={styles.subtitle}>
            Enter your card details to proceed
          </Text>
          <View style={styles.cardContainer}>
            <CardField postalCodeEnabled={false} style={styles.cardField} />
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePayment}  disabled={isLoading}>
            {/* <Text style={styles.buttonText}>Pay Now</Text> */}
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Pay Now</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <CustomSnackbar
        message={"Success"}
        messageDescription={"Payment transferred successfully!"}
        onDismiss={() => setSnackbarVisible(false)}
        visible={snackBarVisible}
      />
      <CustomSnackbar
        message={"Alert!"}
        messageDescription={"An error occurred while processing your payment"}
        onDismiss={() => setSnackbarVisibleAlert(false)}
        visible={snackBarVisibleAlert}
      />
      <CustomSnackbar
        message={"Alert!"}
        messageDescription={"Card Details not Complete"}
        onDismiss={() => setSnackbarVisibleCardAlert(false)}
        visible={snackBarVisibleCardAlert}
      />
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 20,
  },
  headerContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  cardContainer: {
    width: "100%",
    marginBottom: 24,
  },
  cardField: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#FACA4E",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
