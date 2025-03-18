import {
  StyleSheet,
  FlatList,
  Image,
  Alert,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Headers from '../../assets/Custom/Headers';
import {appImages} from '../../assets/utilities';
import Add from '../../assets/svg/AddMainScreen.svg';
import { base_url } from '../../../../baseUrl';

export default function ViewAllCategoriesQAFI({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    await getUserID();
    // Fetch data one by one
    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {
    console.log('AT User Id');
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        await fetchCategory(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchCategory = async result => {
    console.log('Categry in id', selectedItemId);
    const token = result;

    try {
      const response = await fetch(
        base_url + 'discCategory/getAllDiscCategories?page=1&limit=100',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.AllCategories);
      setData(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const searches = [
    {id: 1, title: 'Politics'},
    {id: 2, title: 'Sports'},
    {id: 3, title: 'Business'},
    {id: 4, title: 'Finance'},
    {id: 5, title: 'Tech'},
    {id: 6, title: 'Health'},
    {id: 7, title: 'Culture'},
  ];

  const goToCategories = item => {
    console.log('Categories News', item);
    //Alert.alert('Categories', item);

    setSelectedItemId(item);
    navigation.navigate('Mail', {NewsCategory: item, Type: 'QAFI'});
  };

  const renderSearches = item => {
    console.log('Items', item);
    const isSelected = selectedItemId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : 'white',
          },
        ]}
        onPress={() => {
          goToCategories(item.id);
          console.log('Selected item:', item.name);
        }}>
        <Text style={isSelected ? styles.textColorSelected : styles.textColor}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{marginTop: hp(5)}}>
        <Headers
          showBackIcon={true}
          onPress={() => navigation.goBack()}
          showText={true}
          text={'Categories'}
        />
      </View>

      <View style={{flex: 1, marginTop: hp(5), alignItems: 'center'}}>
        <FlatList
          //style={{flex: 1}}
          //contentContainerStyle={{alignItems: 'center'}}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderSearches(item)}
        />
      </View>

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
        {loading && <ActivityIndicator size="large" color="#FACA4E" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchesDetails: {
    borderWidth: 1,
    borderColor: '#00000017',
    margin: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
    width: wp(37),
    height: hp(7),
  },
  textColor: {
    fontSize: hp(2.1),
    color: 'black',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  textColorSelected: {
    fontSize: hp(2.1),
    color: '#232323',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
});
