
import {
    StyleSheet,
    FlatList,
    Text,
    StatusBar,
    Image,
    TextInput,
    View,
    ActivityIndicator,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import Back from "../../../assets/svg/back.svg";
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import Fontiso from "react-native-vector-icons/Fontisto";
  import { base_url } from "../../../../../baseUrl";
import Loader from "../../../assets/Custom/Loader";
import { useTranslation } from 'react-i18next';

export default function Kid_Search_Video({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const { t } = useTranslation();
  const [authToken, setAuthToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [searches, setSearches] = useState([]);

  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchAll();
  }, []);

  const fetchItems = search => {
    fetchItemData(search);
  };

  const fetchItemData = async search => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `kidVids/searchByTitle?query=${search}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      setData(result.videos); // Update the state with the fetched data
      setSearchTerm('');
      fetchAll();
    } catch (error) {
      console.error('Error Trending:', error);
      setSearchTerm('');
      fetchAll();
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    await loadSearchesFromStorage();
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = authToken;

      try {
        const response = await fetch(
          base_url + `kidVids/searchByTitle?query=${selectedItemId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const result = await response.json();
        setData(result.videos); // Update the state with the fetched data
      } catch (error) {
        console.error('Error Trending:', error);
      }
    };

    fetchData();
  }, [selectedItemId]);

  const handleSearch = text => {
    if (!data) {
      // Data is not available yet
      return;
    }
    const searchTerm = text.toLowerCase();

    const filteredApps = data.filter(
      (app) => app.title && app.title.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filteredApps);
    const matchingItem = searches.find(
      (item) => item.title.toLowerCase() === searchTerm
    );

    if (matchingItem) {
      setSelectedItemId(matchingItem.title);
    } else {
      setSelectedItemId(null);
    }
  };

  const loadSearchesFromStorage = async () => {
    try {
      const savedSearches = await AsyncStorage.getItem('kidVids');
      if (savedSearches) {
        setSearches(JSON.parse(savedSearches));
        getUserID();
      }
    } catch (error) {
      getUserID();
      console.error('Error loading searches from storage:', error);
    }
  };

  const getUserID = async () => {
    try {
      const result3 = await AsyncStorage.getItem('authToken ');
      if (result3 !== null) {
        setAuthToken(result3);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const saveSearchTerm = async () => {
    if (searchTerm.trim() === '') {
      return;
    }

    try {
      // Construct the new search term object
      const newSearchTerm = {
        id: searches + 1,
        title: searchTerm,
      };
  
      // Get existing searches from AsyncStorage
      const savedSearches = await AsyncStorage.getItem("kidVids");
      let searches = [];
  
      if (savedSearches) {
        searches = JSON.parse(savedSearches);
      }
  
      // Check if the search term already exists for the current screen
      const existingSearch = searches.find(
        (search) =>
          search.title.toLowerCase() === searchTerm.toLowerCase()
      );
  
      if (!existingSearch) {
        // Save the new search term
        searches.push(newSearchTerm);
        await AsyncStorage.setItem(
          "kidVids",
          JSON.stringify(searches)
        );
        setSearches(searches);
      }
      setSelectedItemId(searchTerm);
      fetchItems(searchTerm);
    } catch (error) {
      console.error("Error saving search term:", error);
    }
  };

  const renderSearches = item => {
    const isSelected = selectedItemId === item.title;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemId(item.title);
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
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Kids_vid_details', {videoData: item})}
        style={{
          height: hp(18),
          flex: 1,
          borderRadius: wp(3),
          margin: 5,
        }}>
           <View style={styles.imagecontainer}>
          <Image style={styles.image} source={{ uri: item?.thumbnail }} />
          <View style={styles.descriptionContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.titleStyle}
            >
              {item?.name}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={5}
              style={styles.description}
            >
              {item?.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
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
            placeholder={t('SearchHere')}
            value={searchTerm}
            onChangeText={text => {
              setSearchTerm(text);
              handleSearch(text);
            }}
            onSubmitEditing={() => {
              saveSearchTerm();
            }}
          />
        </View>
      </View>

      <Text style={styles.latestSearch}>{t('LatestSearch')}</Text>

      <View style={styles.latestSearchList}>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={searches}
          keyExtractor={(item) => (item.id ? item.id.toString() : "")}
          renderItem={({item}) => renderSearches(item)}
        />
      </View>

      <Text style={styles.latestSearch}>{t('TopSearches')}</Text>

      {data && data.length === 0 ? (
        <Text style={styles.noDataText}>{t('NoDataAvailable')}</Text>
      ) : (
        <FlatList
          style={{ marginTop: hp(3), marginHorizontal: wp(5), flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => renderAvailableApps(item)}
        />
      )}
      {loading && <Loader />}
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
  },
  searchBar: {
    height: hp(5.9),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(3.8),
    borderRadius: wp(5),
    borderWidth: 0.5,
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
  imagecontainer: {
    flexDirection: "row",
    height: 100,
    width: "100%",
  },
  image: {
    width: "35%", // Make sure the image is square
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 10,
    width: "50%",
  },
  titleStyle: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
    color: "#000000",
  },
  description: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#000000",
  },
});
