import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import {InstalledApps, RNLauncherKitHelper} from 'react-native-launcher-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

export default function SearchApps({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [searches, setSearches] = useState([]);

  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchAll();
  }, []);

  const fetchAll = async () => {
    // Simulate loading
    setLoading(true);
    // Fetch data one by one
    await loadSearchesFromStorage();

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map(app => app.label);
      const packageImages = installedApps.map(app => app.icon);
      const packageBundle = installedApps.map((app) => app.packageName);

      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        image: packageImages[index],

        bundle: packageBundle[index],

      }));

      setData(packageDataArray);
      setFilteredData(packageDataArray);

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = text => {
    
    const searchTerm = text.toLowerCase();
    const filteredApps = data.filter(app =>
      app.label.toLowerCase().includes(searchTerm),
    );
    setFilteredData(filteredApps);
    // setSelectedItemId(filteredApps);
    
  // Set the active search item if it exists in the saved searches
  const matchingItem = searches.find(
    (item) => item.title.toLowerCase() === searchTerm
  );

  if (matchingItem) {
    setSelectedItemId(matchingItem.id);
  } else {
    setSelectedItemId(null);
  }
  };

  const loadSearchesFromStorage = async () => {
    try {
      const savedSearches = await AsyncStorage.getItem('searchesApps');
      if (savedSearches) {
        setSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error('Error loading searches from storage:', error);
    }
  };

  const saveSearchTerm = async () => {

    // console.log("Search Term", searchTerm)
    if (searchTerm.trim() === '') {
      return;
    }

    try {
      const newSearchTerm = {id: searches.length + 1, title: searchTerm};
      const updatedSearches = [...searches, newSearchTerm];

      await AsyncStorage.setItem('searchesApps', JSON.stringify(updatedSearches));
      setSearches(updatedSearches);
      setSelectedItemId(newSearchTerm.id);
      setSearchTerm(''); // Clear the input field
      fetchAll();
    } catch (error) {
      console.error('Error saving search term:', error);
    }
  };

  const renderSearches = item => {
    // console.log('Items', item);
    const isSelected = selectedItemId === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemId(item.id);
          
          console.log('Selected item:', item.title);

          // Filter data based on the selected search term
        const selectedApps = data.filter(app => app.label === item.title);
        setFilteredData(selectedApps);
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#232323' : '#939393'},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAvailableApps = item => {
    // console.log('Items', item);
    const openApp = async (item) => {
      try {
        await RNLauncherKitHelper.launchApplication(item.bundle);
      } catch (error) {
        console.error("Error opening the app:", error);
        await RNLauncherKitHelper.launchApplication(item.bundle);
      }
    };
    return (
      <TouchableOpacity   onPress={() => openApp(item)}
        style={{
          height: hp(8),
          marginTop: hp(1),
          marginBottom: hp(1.5),
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: wp(7),
          borderWidth: 1,
          borderRadius: wp(3),
          borderColor: '#00000017',
        }}>
        <Image
          source={{uri: `data:image/png;base64,${item.image}`}}
          style={{width: 30, height: 80, marginLeft: wp(5)}}
          resizeMode="contain"
        />

        <Text
          style={{
            marginLeft: wp(3),
            flex: 1,
            color: '#333333',
            fontFamily: 'Inter',
          }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back width={20} height={20} style={{marginLeft: '1%'}} />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Fontiso
            name={'search'}
            size={18}
            color={'#A8A8A8'}
            style={{marginLeft: wp(5)}}
          />
          <TextInput
            style={{flex: 1, marginLeft: wp(3)}}
            placeholder="Search here"
            value={searchTerm}
            onChangeText={text => {
              setSearchTerm(text);
              handleSearch(text);
            }}
            onSubmitEditing={() => {
              saveSearchTerm();
              // This code will execute when the "Okay" button is pressed
              //console.log("Good", searchTerm);
            }}
          />
        </View>
      </View>

      <Text style={styles.latestSearch}>Latest Search</Text>

      <View style={styles.latestSearchList}>
        {searches.length > 0 ? (
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searches}
            // keyExtractor={item => item.id.toString()}
            keyExtractor={(item) => item.bundle}
            renderItem={({item}) => renderSearches(item)}
          />
        ) : (
          <Text
            style={{color: '#939393', fontSize: hp(1.8), alignSelf: 'center'}}>
            No recent searches found.
          </Text>
        )}
      </View>

      <Text style={styles.latestSearch}>Available Apps</Text>
      {data && data.length === 0 ? (
        <Text style={styles.noDataText}>No data available</Text>
      ) : (
      <FlatList
        style={{marginTop: hp(3), flex: 1}}
        showsVerticalScrollIndicator={false}
        data={filteredData} 
        //keyExtractor={item => item.id.toString()}
     
        renderItem={({item}) => renderAvailableApps(item)}
      />
    )}
      {loading ? (
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
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: hp(8),
    marginHorizontal: wp(8),
    height: hp(8),
    //borderWidth: 3,
  },
  searchBar: {
    height: hp(5.9),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(3.8),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: '#00000017',
  },
  latestSearch: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: wp(4.3),
    marginTop: hp(2),
    marginLeft: wp(10),
    color: '#595959',
  },
  latestSearchList: {
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
  },
  searchesDetails: {
    flexDirection: 'row',
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(30),
    backgroundColor: '#F2F2F2',
    borderRadius: wp(5),
    height: hp(5),
  },
  textSearchDetails: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: hp(1.8),
  },
  textHeader: {
    fontSize: wp(5.7),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 16,
    color: "#939393",
    textAlign: "center",
    marginTop: hp(3),
    fontFamily: "Inter-Semi-Bold",
  },
});
