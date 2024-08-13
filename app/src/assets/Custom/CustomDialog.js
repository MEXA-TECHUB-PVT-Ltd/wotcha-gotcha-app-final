import React from 'react';
import { View, Modal, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { appImages } from '../utilities';

const CustomDialog = ({ visible, onClose, onAction }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <Image source={appImages.alert} style={styles.modalImage} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onAction} style={styles.actionButton}>
            <Text style={styles.buttonText}>Action</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10, // Rounded corners for the image
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: 'red', // Red close button
    padding: 12,
    margin: 10,
    borderRadius: 5,
  },
  actionButton: {
    backgroundColor: 'green', // Green action button
    padding: 12,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomDialog;