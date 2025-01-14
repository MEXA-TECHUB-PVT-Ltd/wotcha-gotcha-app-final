import React from "react";
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const CustomMassAppCateModal = ({
  visible,
  onClose,
  title,
  data,
  renderItem,
  handleSave,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{ marginTop: hp(-3), height: hp(30) }}>
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity
                onPress={handleSave}
                style={{ height: 30, width: 30, paddingLeft: 4 , padding:10}}
              >
                <Ionicons name="checkmark-sharp" size={24} color="#FACA4E" />
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <View style={styles.flatListContainer}>
                <FlatList
                  data={data.slice(0, Math.ceil(data.length / 2))}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={renderItem}
                  contentContainerStyle={styles.flatListContent}
                />
              </View>
              <View style={styles.flatListContainer}>
                <FlatList
                  data={data.slice(Math.ceil(data.length / 2))}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={renderItem}
                  contentContainerStyle={styles.flatListContent}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop:15
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    bottom: "15%",
  },
  flatListContainer: {
    marginTop: "5%",
  },
  flatListContent: {
    borderWidth: 1,
    marginRight: wp(2.3),
    borderColor: "#00000017",
    borderRadius: wp(3),
  },
});

export default CustomMassAppCateModal;
