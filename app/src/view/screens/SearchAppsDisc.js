// // import {
// //   StyleSheet,
// //   FlatList,
// //   Text,
// //   StatusBar,
// //   Image,
// //   TextInput,
// //   View,
// //   TouchableOpacity,
// // } from 'react-native';
// // import React, {useState, useEffect} from 'react';
// // import Back from '../../assets/svg/back.svg';
// // import {appImages} from '../../assets/utilities/index';
// // import {
// //   heightPercentageToDP as hp,
// //   widthPercentageToDP,
// //   widthPercentageToDP as wp,
// // } from 'react-native-responsive-screen';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import Fontiso from 'react-native-vector-icons/Fontisto';
// // import { base_url } from '../../../../baseUrl';

// // export default function SearchAppsDisc({navigation}) {
// //   const [selectedItemId, setSelectedItemId] = useState(null);

// //   const [authToken, setAuthToken] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');

// //   const [searches, setSearches] = useState([]);

// //   const [data, setData] = useState([]);

// //   const [filteredData, setFilteredData] = useState([]);

// //   const [loading, setLoading] = useState(false);


// //   useEffect(() => {
// //     // Make the API request and update the 'data' state
// //     fetchAll();
// //   }, []);

// //   const fetchItems = search => {
// //     fetchItemData(search);
// //   };

// //   const fetchItemData = async search => {
// //     console.log('Tokensssss', authToken);

// //     console.log('SEARCH ITEMS', search);

// //     const token = authToken;

// //     try {
// //       const response = await fetch(
// //         base_url + `letter/searchLetters?name=${search}`,
// //         {
// //           method: 'GET',
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );

// //       const result = await response.json();
// //       console.log('AllItems', result.letters);
// //       setData(result.letters); // Update the state with the fetched data
// //       setSearchTerm('');
// //       fetchAll();
// //     } catch (error) {
// //       console.error('Error Trending:', error);
// //       setSearchTerm('');
// //       fetchAll();
// //     }
// //   };

// //   const fetchAll = async () => {
// //     // Simulate loading
// //     setLoading(true);
// //     // Fetch data one by one
// //     await loadSearchesFromStorage();

// //     // Once all data is fetched, set loading to false
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       //await AsyncStorage.removeItem('searchDiscLetters');

// //       console.log('Token', authToken);
// //       const token = authToken;

// //       try {
// //         const response = await fetch(
// //           base_url + `letter/searchLetters?name=${selectedItemId}`,
// //           {
// //             method: 'GET',
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           },
// //         );

// //         const result = await response.json();
// //         console.log('AllItems', result.letters);
// //         setData(result.letters); // Update the state with the fetched data
// //       } catch (error) {
// //         console.error('Error Trending:', error);
// //       }
// //     };

// //     fetchData();
// //   }, [selectedItemId]);

// //   const handleSearch = text => {
// //     console.log('data Search', data);

// //     if (!data) {
// //       // Data is not available yet
// //       return;
// //     }

// //     const searchTerm = text.toLowerCase();

// //     const filteredApps = data.filter(app =>
// //       app.title.toLowerCase().includes(searchTerm),
// //     );

// //     setFilteredData(filteredApps);
// //   };

// //   const loadSearchesFromStorage = async () => {
// //     try {
// //       const savedSearches = await AsyncStorage.getItem('searchDiscLetters');
// //       if (savedSearches) {
// //         setSearches(JSON.parse(savedSearches));
// //         getUserID();
// //       }
// //     } catch (error) {
// //       getUserID();
// //       console.error('Error loading searches from storage:', error);
// //     }
// //   };

// //   const getUserID = async () => {
// //     console.log("Id's");
// //     try {
// //       const result3 = await AsyncStorage.getItem('authToken ');
// //       if (result3 !== null) {
// //         setAuthToken(result3);
// //         console.log('Token', result3);
// //       }
// //     } catch (error) {
// //       // Handle errors here
// //       console.error('Error retrieving user ID:', error);
// //     }
// //   };

// //   const saveSearchTerm = async () => {
// //     console.log('Search Term', searchTerm);
// //     if (searchTerm.trim() === '') {
// //       return;
// //     }

// //     try {
// //       // Construct the new search term object
// //       const newSearchTerm = {
// //         id: searches + 1,
// //         title: searchTerm,
// //       };
  
// //       // Get existing searches from AsyncStorage
// //       const savedSearches = await AsyncStorage.getItem("searchDiscLetters");
// //       let searches = [];
  
// //       if (savedSearches) {
// //         searches = JSON.parse(savedSearches);
// //       }
  
// //       // Check if the search term already exists for the current screen
// //       const existingSearch = searches.find(
// //         (search) =>
// //           search.title.toLowerCase() === searchTerm.toLowerCase()
// //       );
  
// //       if (!existingSearch) {
// //         // Save the new search term
// //         searches.push(newSearchTerm);
// //         await AsyncStorage.setItem(
// //           "searchDiscLetters",
// //           JSON.stringify(searches)
// //         );
// //         setSearches(searches);
// //       }
// //       setSelectedItemId(searchTerm);
// //       fetchItems(searchTerm);
// //     } catch (error) {
// //       console.error("Error saving search term:", error);
// //     }
// //     // try {
// //     //   const newSearchTerm = {id: searches.length + 1, title: searchTerm};
// //     //   const updatedSearches = [...searches, newSearchTerm];

// //     //   await AsyncStorage.setItem(
// //     //     'searchDiscLetters',
// //     //     JSON.stringify(updatedSearches),
// //     //   );
// //     //   setSearches(updatedSearches);
// //     //   fetchItems(searchTerm);
// //     //   //setSearchTerm(''); // Clear the input field
// //     //   //fetchAll();
// //     // } catch (error) {
// //     //   console.error('Error saving search term:', error);
// //     // }
// //   };

// //   const renderSearches = item => {
// //     const isSelected = selectedItemId === item.title;

// //     return (
// //       <TouchableOpacity
// //         style={[
// //           styles.searchesDetails,
// //           {
// //             backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
// //           },
// //         ]}
// //         onPress={() => {
// //           setSelectedItemId(item.title);
// //           console.log('Selected item:', item.title);
// //         }}>
// //         <Text
// //           style={[
// //             styles.textSearchDetails,
// //             {color: isSelected ? '#232323' : '#939393'},
// //           ]}>
// //           {item.title}
// //         </Text>
// //       </TouchableOpacity>
// //     );
// //   };

// //   const renderAvailableApps = item => {
// //     console.log('Items images', item);

// //     return (
// //       <TouchableOpacity
// //         onPress={() => navigation.navigate('LetterDetails', {Letters: item})}
// //         style={{
// //           height: hp(18),
// //           flex: 1,
// //           borderRadius: wp(3),
// //           margin: 5,
// //         }}>
// //         <Image
// //           style={{
// //             position: 'absolute',
// //             top: 0,
// //             left: 0,
// //             zIndex: 1, // Ensure it's on top of other elements
// //             flex: 1,
// //             width: '100%',
// //             height: '100%',
// //             borderRadius: wp(3),
// //             resizeMode: 'cover',
// //           }}
// //           source={appImages?.OpenLetter}
// //         />
// //         <View
// //           style={{
// //             position: 'absolute',
// //             top: hp(14.5),
// //             left: 7,
// //             //height: hp(3),
// //             //width: wp(21),
// //             //borderRadius: wp(3),
// //             //backgroundColor: '#FACA4E',
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             zIndex: 2, // Ensure it's on top
// //           }}>
// //           <Text
// //             numberOfLines={1}
// //             ellipsizeMode="tail"
// //             style={{
// //               fontSize: hp(1.9),
// //               fontFamily: 'Inter-Medium',
// //               color: 'black',
// //             }}>
// //             {item?.introduction}
// //           </Text>
// //         </View>
// //       </TouchableOpacity>
// //     );
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar
// //         translucent={true}
// //         backgroundColor="transparent"
// //         barStyle="dark-content" // You can set the StatusBar text color to dark or light
// //       />
// //       <View style={styles.searchHeader}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Back width={20} height={20} style={{marginLeft: '1%'}} />
// //         </TouchableOpacity>

// //         <View style={styles.searchBar}>
// //           <Fontiso
// //             name={'search'}
// //             size={18}
// //             color={'#A8A8A8'}
// //             style={{marginLeft: wp(5)}}
// //           />
// //           <TextInput
// //             style={{flex: 1, marginLeft: wp(3)}}
// //             placeholder="Search here"
// //             value={searchTerm}
// //             onChangeText={text => {
// //               setSearchTerm(text);
// //               //setSelectedItemId(text)
// //               handleSearch(text);
// //             }}
// //             onSubmitEditing={() => {
// //               saveSearchTerm();
// //               // This code will execute when the "Okay" button is pressed
// //               //console.log("Good", searchTerm);
// //             }}
// //           />
// //         </View>
// //       </View>

// //       <Text style={styles.latestSearch}>Latest Search</Text>

// //       <View style={styles.latestSearchList}>
// //         <FlatList
// //           style={{flex: 1}}
// //           contentContainerStyle={{alignItems: 'center'}}
// //           showsHorizontalScrollIndicator={false}
// //           horizontal
// //           data={searches}
// //           // keyExtractor={item => item.id.toString()}
// //           keyExtractor={(item) => (item.id ? item.id.toString() : "")}
// //           renderItem={({item}) => renderSearches(item)}
// //         />
// //       </View>

// //       <Text style={styles.latestSearch}>Top Searches</Text>

// //       <FlatList
// //         style={{marginTop: hp(3), marginHorizontal: wp(5), flex: 1}}
// //         showsVerticalScrollIndicator={false}
// //         data={data}
// //         //keyExtractor={item => item.id.toString()}
// //         numColumns={3} // Set the number of columns to 3
// //         renderItem={({item}) => renderAvailableApps(item)}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'white',
// //   },
// //   searchHeader: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-evenly',
// //     marginTop: hp(8),
// //     marginHorizontal: wp(8),
// //     height: hp(8),
// //     //borderWidth: 3,
// //   },
// //   searchBar: {
// //     height: hp(5.9),
// //     flex: 1,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginLeft: wp(3.8),
// //     borderRadius: wp(5),
// //     borderWidth: 0.5,
// //     borderColor: '#00000017',
// //   },
// //   latestSearch: {
// //     fontFamily: 'Inter',
// //     fontWeight: 'bold',
// //     fontSize: wp(4.3),
// //     marginTop: hp(2),
// //     marginLeft: wp(10),
// //     color: '#595959',
// //   },
// //   latestSearchList: {
// //     marginTop: hp(2.1),
// //     height: hp(7),
// //     marginLeft: wp(5),
// //   },
// //   searchesDetails: {
// //     flexDirection: 'row',
// //     marginLeft: wp(3),
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     width: wp(30),
// //     backgroundColor: '#F2F2F2',
// //     borderRadius: wp(5),
// //     height: hp(5),
// //   },
// //   textSearchDetails: {
// //     fontFamily: 'Inter',
// //     fontWeight: '700',
// //     fontSize: hp(1.8),
// //   },
// //   textHeader: {
// //     fontSize: wp(5.7),
// //     color: '#333333',
// //     fontFamily: 'Inter',
// //     fontWeight: 'bold',
// //   },
// // });


// //////////////////////////////////////////
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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontiso from 'react-native-vector-icons/Fontisto';
import { base_url } from '../../../../baseUrl';

export default function SearchAppsDisc({navigation, route}) {
  const index = route?.params?.selectedItemId
  console.log('index---------', index)
  const [selectedItemId, setSelectedItemId] = useState(null);

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
    console.log('Token', authToken);

    console.log('SEARCH ITEMS', search);

    const token = authToken;

    try {
      const response = await fetch(
        base_url + `qafi/searchQafi?name=${search}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('AllItems for ', result.QAFIs);
      setData(result.QAFIs); // Update the state with the fetched data
      setSearchTerm('');
      fetchAll();
    } catch (error) {
      console.error('Error Trending:', error);
      setSearchTerm('');
      fetchAll();
    }
  };

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
      console.log('Token', authToken);
      const token = authToken;

      try {
        const response = await fetch(
          base_url + `qafi/searchQafi?name=${selectedItemId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const result = await response.json();
        console.log('AllItems', result.QAFIs);
        setData(result.QAFIs); // Update the state with the fetched data
      } catch (error) {
        console.error('Error Trending:', error);
      }
    };

    fetchData();
  }, [selectedItemId]);

  const handleSearch = text => {
    console.log('data Search', data);

    if (!data) {
      // Data is not available yet
      return;
    }
    const searchTerm = text.toLowerCase();

    const filteredApps = data.filter(
      (app) => app.title && app.title.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filteredApps);

    // Set the active search item if it exists in the saved searches
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
      const savedSearches = await AsyncStorage.getItem('qafisearch');
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
        console.log('Token', result3);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const saveSearchTerm = async () => {
    console.log('Search Term', searchTerm);
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
      const savedSearches = await AsyncStorage.getItem("qafisearch");
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
          "qafisearch",
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
          console.log('Selected item:', item.title);
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
    console.log('Items images', item);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewQAFI',  { picData: item })}
        style={{
          height: hp(18),
          flex: 1,
          borderRadius: wp(3),
          margin: 5,
        }}>
           <View style={styles.imagecontainer}>
          <Image style={styles.image} source={{ uri: item?.image }} />
          <View style={styles.descriptionContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={6}
              style={styles.titleStyle}
            >
              {item?.description}
            </Text>
            {/* <Text
              ellipsizeMode="tail"
              numberOfLines={5}
              style={styles.description}
            >
              {item?.description}
            </Text> */}
          </View>
        </View>
        {/* <Image
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1, // Ensure it's on top of other elements
            flex: 1,
            width: '100%',
            height: '100%',
            borderRadius: wp(3),
            resizeMode: 'cover',
          }}
          source={{uri: item?.thumbnail}}
        />
        <View
          style={{
            position: 'absolute',
            top: hp(14.5),
            left: 7,
            //height: hp(3),
            //width: wp(21),
            //borderRadius: wp(3),
            //backgroundColor: '#FACA4E',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2, // Ensure it's on top
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.9),
              fontFamily: 'Inter-Medium',
              color: '#FFFFFF',
            }}>
            {item?.description}
          </Text>
        </View> */}
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
            placeholder="Search here"
            value={searchTerm}
            onChangeText={text => {
              setSearchTerm(text);
              //setSelectedItemId(text)
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
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={searches}
          // keyExtractor={item => item.id.toString()}
          keyExtractor={(item) => (item.id ? item.id.toString() : "")}
          renderItem={({item}) => renderSearches(item)}
        />
      </View>

      <Text style={styles.latestSearch}>Top Searches</Text>

      {data && data.length === 0 ? (
        <Text style={styles.noDataText}>No data available</Text>
      ) : (
        <FlatList
          style={{ marginTop: hp(3), marginHorizontal: wp(5), flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => renderAvailableApps(item)}
        />
      )}
      {/* <FlatList
        style={{marginTop: hp(3), marginHorizontal: wp(5), flex: 1}}
        showsVerticalScrollIndicator={false}
        data={data}
        //keyExtractor={item => item.id.toString()}
        numColumns={3} // Set the number of columns to 3
        renderItem={({item}) => renderAvailableApps(item)}
      /> */}
        <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && <ActivityIndicator size="large" color="#FACA4E" />}
      </View>
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
    // alignItems: "center",
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
    // justifyContent: "center",
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
















// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { base_url } from '../../../../baseUrl';

// const SearchAppsDisc = ({navigation, route}) => {

//       const index = route?.params?.selectedItemId
//   // const [index, setIndex] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [results, setResults] = useState([]);
//   const [savedSearch, setSavedSearch] = useState('');
// console.log('result-----,', results)
//   useEffect(() => {
//     const fetchSavedSearch = async () => {
//       const savedTerm = await getSearchInput(index);
//       setSavedSearch(savedTerm);
//     };

//     fetchSavedSearch();
//   }, [index]);

//   const searchAPI1 = async (searchTerm) => {
//     const apiURL = base_url + `news/searchNews?name=${searchTerm}`;
//     try {
//       const response = await fetch(apiURL);
//       const data = await response.json();
//       console.log('description',data.News)
//       // return data.News;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  
//   const searchAPI2 = async (searchTerm) => {
//     const apiURL = base_url + `qafi/searchQafi?name=${searchTerm}`;
//     try {
//       const response = await fetch(apiURL);
//       const data = await response.json();
//       return data.QAFIs;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  
//   const searchAPI3 = async (searchTerm) => {
//     const apiURL = base_url + `gebc/searchGEBCs?name=${searchTerm}`;
//     try {
//       const response = await fetch(apiURL);
//       const data = await response.json();
//       return data.GEBCs;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  
//   const searchAPI4 = async (searchTerm) => {
//     const apiURL = base_url + `letter/searchLetters?name=${searchTerm}`;
//     try {
//       const response = await fetch(apiURL);
//       const data = await response.json();
//       return data.letters;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  

//   const saveSearchInput = async (index, searchTerm) => {
//     try {
//       await AsyncStorage.setItem(`searchInput_${index}`, searchTerm);
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }
//   };
  
//   const getSearchInput = async (index) => {
//     try {
//       const searchTerm = await AsyncStorage.getItem(`searchInput_${index}`);
//       return searchTerm;
//     } catch (error) {
//       console.error('Error retrieving data:', error);
//     }
//   };

//   const handleSearch = async () => {
//     let data = [];
//     switch (index) {
//       case 1:
//         data = await searchAPI1(searchTerm);
//         break;
//       case 2:
//         data = await searchAPI2(searchTerm);
//         break;
//       case 3:
//         data = await searchAPI3(searchTerm);
//         break;
//       case 4:
//         data = await searchAPI4(searchTerm);
//         break;
//       default:
//         throw new Error('Invalid index');
//     }
//     setResults(data);
//     await saveSearchInput(index, searchTerm);
//     setSavedSearch(searchTerm);
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Enter search term"
//         value={searchTerm}
//         onChangeText={setSearchTerm}
//       />
//       <Button title="Search" onPress={handleSearch} />
//       <View>
//         <Text>Saved Search for Index {index}: {savedSearch}</Text>
//         <FlatList
//           data={results}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => <Text>{item}</Text>}
//         />
//       </View>
//     </View>
//   );
// };

// export default SearchAppsDisc;
