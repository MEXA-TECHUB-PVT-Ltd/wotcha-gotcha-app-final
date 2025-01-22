import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
const CustomaddFavModal = ({
    visible,
    onClose,
    actions = [],
    isCancelModalVisible,
    closeCancelModal,
  }) => {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={onClose} // Handles the hardware back button
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  action.onPress();
                  onClose(); // Close modal after an action
                }}
                style={styles.overlayButton}
              >
                <Text style={{ color: "white" }}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {isCancelModalVisible && (
            <TouchableOpacity
              onPress={() => {
                closeCancelModal();
                onClose(); // Ensure modal closes when cross button is clicked
              }}
              style={styles.modalContentCross}
            >
              <Entypo name={"cross"} size={18} color={"black"} />
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    );
  };
export default CustomaddFavModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  overlayButton: {
    backgroundColor: "#FACA4E",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    width: 200,
  },
  modalContentCross: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
