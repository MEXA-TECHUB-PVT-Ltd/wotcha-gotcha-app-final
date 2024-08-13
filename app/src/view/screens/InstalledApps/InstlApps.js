import React, { useState, useEffect } from 'react';
import { InstalledApps } from 'react-native-launcher-kit';
import Swiper from 'react-native-swiper';
import { FlatList,StatusBar, ActivityIndicator, View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function InstlApps() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map(app => app.label);
      const packageImages = installedApps.map(app => app.icon);

      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        image: packageImages[index],
      }));

      setData(packageDataArray);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderApps = item => {
    return (
      <View style={styles.items}>
        <Image
          style={{ width: 30, height: 30 }}
          source={{ uri: `data:image/png;base64,${item.image}` }}
        />
        <Text style={{ color: '#000000', fontSize: hp(1.3), fontWeight: 'bold' }}>
          {item.label}
        </Text>
      </View>
    );
  };

  const itemsPerPage = 27; // Change this to set the number of items per screen
  const screens = Math.ceil(data.length / itemsPerPage);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
         <StatusBar
          translucent={false}
          backgroundColor="transparent"
          barStyle="dark-content" // You can set the StatusBar text color to dark or light
        />
      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#FACA4E" />
        </View>
      ) : (
        <Swiper showsPagination={screens > 1}>
          {[...Array(screens)].map((_, index) => (
            <View key={index} style={{ width: windowWidth, height: windowHeight }}>
              <FlatList
                data={data.slice(index * itemsPerPage, (index + 1) * itemsPerPage)}
                numColumns={3}
                keyExtractor={(item, itemIndex) => `${index}-${itemIndex}`}
                renderItem={({ item }) => renderApps(item)}
              />
            </View>
          ))}
        </Swiper>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  items: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
});
