import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Add from "../svg/AddMainScreen.svg";
const AppGrid = ({ apps, placeholderText, onAddPress, openCategoryApp }) => (
  <View style={styles.container}>
    {apps.length > 0 ? (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Array.from({ length: Math.ceil(apps.length / 5) }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {apps.slice(rowIndex * 5, (rowIndex + 1) * 5).map((app, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openCategoryApp(app)}
                style={styles.appContainer}
              >
                <Image
                  style={styles.appImage}
                  source={{
                    uri: `data:image/png;base64,${app.image}`,
                  }}
                />
                <Text style={styles.appText}>
                  {app.label.substring(0, 10)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    ) : (
      <Text style={styles.placeholderText}>{placeholderText}</Text>
    )}
    <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
      <Add />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  appContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    flex: 1,
  },
  appImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  appText: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
  },
  placeholderText: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    marginTop: '40%',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FACA4E',
    borderRadius: 50,
    padding: 10,
  },
});

export default AppGrid;
