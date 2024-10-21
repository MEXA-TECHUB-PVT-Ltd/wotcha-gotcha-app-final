import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Modal = () => {
    const [modalVisible, setModalVisible] = useState(false);
const [selectedCategory, setSelectedCategory] = useState(null);
const [newItem, setNewItem] = useState({ label: '', image: '' });
    const handleAddButtonPress = (category) => {
        setSelectedCategory(category);
        setModalVisible(true);
      };



      const AddItemModal = ({ visible, onClose, onAdd, category }) => {
        const handleAdd = () => {
          onAdd(category, newItem); // Pass category and new item to the handler
          setNewItem({ label: '', image: '' }); // Reset newItem
          onClose(); // Close the modal
        };
      
        return (
          <Modal visible={visible} onRequestClose={onClose}>
            <View>
              <Text>Add Item to {category}</Text>
              <TextInput
                placeholder="Item Label"
                value={newItem.label}
                onChangeText={(text) => setNewItem({ ...newItem, label: text })}
              />
              <TextInput
                placeholder="Image URL"
                value={newItem.image}
                onChangeText={(text) => setNewItem({ ...newItem, image: text })}
              />
              <Button title="Add" onPress={handleAdd} />
              <Button title="Close" onPress={onClose} />
            </View>
          </Modal>
        );
      };
      
      const handleAddItem = (category, item) => {
        if (category === t('Ecommerce')) {
          // Add item to ecommerce array
          setSavedApps((prev) => [...prev, item]);
        } else if (category === t('Business')) {
          // Add item to business array
          setSavedApps_b((prev) => [...prev, item]);
        } else if (category === t('cateSports')) {
          // Add item to sports array
          setSavedApps_sp((prev) => [...prev, item]);
        } else if (category === t('Education')) {
          // Add item to education array
          setSavedApps_e((prev) => [...prev, item]);
        }
      };
  return (

    <View>
      <View style={{ position: "absolute", top: "80%", right: 10 }}>
  <TouchableOpacity onPress={() => handleAddButtonPress(t('Ecommerce'))}>
    <Add />
  </TouchableOpacity>
</View>



<AddItemModal
    visible={modalVisible}
    onClose={() => setModalVisible(false)}
    onAdd={handleAddItem}
    category={selectedCategory}
  />


    </View>
  )
}

export default Modal

const styles = StyleSheet.create({})