// import {
//   StyleSheet,
//   FlatList,
//   Text,
//   StatusBar,
//   Image,
//   TextInput,
//   View,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import Back from "../../assets/svg/back.svg";
// import { appImages } from "../../assets/utilities/index";
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP,
//   widthPercentageToDP as wp,
// } from "react-native-responsive-screen";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Fontiso from "react-native-vector-icons/Fontisto";
// import { base_url } from "../../../../baseUrl";
// import Loader from "../../assets/Custom/Loader";

// export default function SearchProducts({ navigation, route }) {
//   const { apiEndpoint } = route.params;
//   const [selectedItemId, setSelectedItemId] = useState(null);

//   const [authToken, setAuthToken] = useState(""); 
//   const [searchTerm, setSearchTerm] = useState("");

//   const [searches, setSearches] = useState([]);

//   const [data, setData] = useState([]);

//   const [filteredData, setFilteredData] = useState([]);

//   const [loading, setLoading] = useState(false);

//   console.log("route api --------", apiEndpoint);

//   useEffect(() => {
//     if (apiEndpoint) {
//       console.log("useeffect------------------");
//       fetchAll();
//     }
//     // Make the API request and update the 'data' state
//   }, [apiEndpoint]);

//   const fetchItems = (search) => {
//     fetchItemData(search);
//   };

//   const fetchItemData = async (search) => {
//     console.log("Token", authToken);

//     console.log("SEARCH ITEMS IN SEARCH", search);

//     const token = authToken;

//     try {
//       const response = await fetch(
//         base_url + `${apiEndpoint}?query=${search}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const result = await response.json();
//       console.log("AllItems", result.videos);
//       setData(result.videos); // Update the state with the fetched data
//       setSearchTerm("");
//       fetchAll(apiEndpoint);
//     } catch (error) {
//       console.error("Error Trending:", error);
//       // setSearchTerm("");
//       // fetchAll();
//     }
//   };

//   const fetchAll = async (apiEndpoint) => {
//     // Simulate loading
//     setLoading(true);
//     // Fetch data one by one
//     await loadSearchesFromStorage(apiEndpoint);

//     // Once all data is fetched, set loading to false
//     setLoading(false);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       console.log("Token", authToken);

//       try {
//         const token = authToken;
//         const response = await fetch(
//           base_url + `${apiEndpoint}?query=${selectedItemId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const result = await response.json();
//         console.log("AllItems sy video data--", result.videos);
//         setData(result.videos); // Update the state with the fetched data
//       } catch (error) {
//         console.error("Error Trending:", error);
//       } finally {
//         setLoading(false); // Set loading to false regardless of success or failure
//       }
//     };

//     fetchData();
//   }, [selectedItemId]);

//   const handleSearch = (text) => {
//     console.log("data Search", data);

//     if (!data) {
//       // Data is not available yet
//       return;
//     }

//     const searchTerm = text.toLowerCase();

//     const filteredApps = data.filter(
//       (app) => app.title && app.title.toLowerCase().includes(searchTerm)
//     );

//     setFilteredData(filteredApps);
//     // Set the active search item if it exists in the saved searches
//     const matchingItem = searches.find(
//       (item) => item.title.toLowerCase() === searchTerm
//     );

//     if (matchingItem) {
//       setSelectedItemId(matchingItem.title);
//     } else {
//       setSelectedItemId(null);
//     }
//   };

//   useEffect(() => {
//     loadSearchesFromStorage(apiEndpoint); // Load searches specific to the current screen's API endpoint
//   }, [apiEndpoint]);

//   const loadSearchesFromStorage = async (screenIdentifier) => {
//     try {
//       const savedSearches = await AsyncStorage.getItem("searchesProducts");
//       if (savedSearches) {
//         // Parse saved searches
//         const searches = JSON.parse(savedSearches);

//         // Filter searches based on screenIdentifier (apiEndpoint in this case)
//         const filteredSearches = searches.filter(
//           (search) => search.screenIdentifier === screenIdentifier
//         );
//         getUserID();
//         setSearches(filteredSearches);
//       }
//     } catch (error) {
//       console.error("Error loading searches from storage:", error);
//     }
//   };

//   const getUserID = async () => {
//     console.log("Id's");
//     try {
//       const result3 = await AsyncStorage.getItem("authToken ");
//       if (result3 !== null) {
//         setAuthToken(result3);
//         console.log("Token", result3);
//       }
//     } catch (error) {
//       // Handle errors here
//       console.error("Error retrieving user ID:", error);
//     }
//   };

//   const saveSearchTerm = async () => {
//     console.log("Search Term", searchTerm);
//     if (searchTerm.trim() === "") {
//       return;
//     }

//     try {
//       // Construct the new search term object
//       const newSearchTerm = {
//         id: searches + 1,
//         title: searchTerm,
//         screenIdentifier: apiEndpoint, // Save the screen identifier (apiEndpoint)
//       };

//       // Get existing searches from AsyncStorage
//       const savedSearches = await AsyncStorage.getItem("searchesProducts");
//       let searches = [];

//       if (savedSearches) {
//         searches = JSON.parse(savedSearches);
//       }

//       // Check if the search term already exists for the current screen
//       const existingSearch = searches.find(
//         (search) =>
//           search.title.toLowerCase() === searchTerm.toLowerCase() &&
//           search.screenIdentifier === apiEndpoint
//       );

//       if (!existingSearch) {
//         // Save the new search term
//         searches.push(newSearchTerm);
//         await AsyncStorage.setItem(
//           "searchesProducts",
//           JSON.stringify(searches)
//         );
//         setSearches(searches);
//       }
//       setSelectedItemId(searchTerm);
//       fetchItems(searchTerm);
//     } catch (error) {
//       console.error("Error saving search term:", error);
//     }
//   };

//   // const saveSearchTerm = async () => {
//   //   console.log("Search Term", searchTerm);
//   //   if (searchTerm.trim() === "") {
//   //     return;
//   //   }

//   //   try {
//   //     const newSearchTerm = { id: searches.length + 1, title: searchTerm };
//   //     const updatedSearches = [...searches, newSearchTerm];

//   //     await AsyncStorage.setItem(
//   //       "searchesProducts",
//   //       JSON.stringify(updatedSearches)
//   //     );
//   //     setSearches(updatedSearches);
//   //     fetchItems(searchTerm);
//   //     //setSearchTerm(''); // Clear the input field
//   //     //fetchAll();
//   //   } catch (error) {
//   //     console.error("Error saving search term:", error);
//   //   }
//   // };

//   const renderSearches = (item) => {
//     const isSelected = selectedItemId === item.title;

//     return (
//       <TouchableOpacity
//         style={[
//           styles.searchesDetails,
//           {
//             backgroundColor: isSelected ? "#FACA4E" : "#F2F2F2",
//           },
//         ]}
//         onPress={() => {
//           setSelectedItemId(item.title);
//           console.log("Selected item:", item.title);
//         }}
//       >
//         <Text
//           style={[
//             styles.textSearchDetails,
//             { color: isSelected ? "#232323" : "#939393" },
//           ]}
//         >
//           {item.title}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const handlePress = (item) => {
//     let screenName = "";

//     switch (apiEndpoint) {
//       case "kidVids/searchByTitle":
//         console.log("screen kids--------");
//         screenName = "Kids_vid_details";
//         break;
//       case "fanStar/searchByTitle":
//         console.log("screen fans------");
//         screenName = "Fans_star_details";
//         break;
//       case "cinematics/searchByTitle":
//         console.log("screen cinematic------");
//         screenName = "Cinematics_details";
//         break;
//       case "learningHobbies/searchByTitle":
//         console.log("screen learningHobbies/searchByTitle------");
//         screenName = "Learning_details";
//         break;
//       case "tvProgmax/searchByTitle":
//         console.log("screen tvProgmax/searchByTitle------");
//         screenName = "Tv_Promax_details";
//         break;
//       default:
//         screenName = "Default_vid_details"; // fallback screen
//     }

//     navigation.navigate(screenName, { videoData: item });
//   };

//   const renderAvailableVideo = (item) => {
//     console.log("Items images", item);

//     return (
//       <TouchableOpacity
//         onPress={() => handlePress(item)}
//         style={{
//           height: hp(15),
//           flex: 1,
//           borderRadius: wp(3),
//           margin: 4,
//         }}
//       >
//         <View style={styles.imagecontainer}>
//           <Image style={styles.image} source={{ uri: item?.thumbnail }} />
//           <View style={styles.descriptionContainer}>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={1}
//               style={styles.titleStyle}
//             >
//               {item?.name}
//             </Text>
//             <Text
//               ellipsizeMode="tail"
//               numberOfLines={5}
//               style={styles.description}
//             >
//               {item?.description}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent={true}
//         backgroundColor="transparent"
//         barStyle="dark-content" // You can set the StatusBar text color to dark or light
//       />
//       <View style={styles.searchHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Back width={20} height={20} style={{ marginLeft: "1%" }} />
//         </TouchableOpacity>

//         <View style={styles.searchBar}>
//           <Fontiso
//             name={"search"}
//             size={18}
//             color={"#A8A8A8"}
//             style={{ marginLeft: wp(5) }}
//           />
//           <TextInput
//             style={{ flex: 1, marginLeft: wp(3) }}
//             placeholder="Search here"
//             value={searchTerm}
//             onChangeText={(text) => {
//               setSearchTerm(text);
//               //setSelectedItemId(text)
//               handleSearch(text);
//             }}
//             onSubmitEditing={() => {
//               saveSearchTerm();
//               // This code will execute when the "Okay" button is pressed
//               //console.log("Good", searchTerm);
//             }}
//           />
//         </View>
//       </View>

//       <Text style={styles.latestSearch}>Latest Search</Text>

//       <View style={styles.latestSearchList}>
//         <FlatList
//           style={{ flex: 1 }}
//           contentContainerStyle={{ alignItems: "center" }}
//           showsHorizontalScrollIndicator={false}
//           horizontal
//           data={searches}
//           // keyExtractor={(item) => item.id.toString()}
//           keyExtractor={(item) => (item.id ? item.id.toString() : "")}
//           renderItem={({ item }) => renderSearches(item)}
//         />
//       </View>

//       <Text style={styles.latestSearch}>Top Searches</Text>

//       {data && data.length === 0 ? (
//         <Text style={styles.noDataText}>No data available</Text>
//       ) : (
//         <FlatList
//           style={{ marginTop: hp(3), marginHorizontal: wp(5), flex: 1 }}
//           showsVerticalScrollIndicator={false}
//           data={data}
//           renderItem={({ item }) => renderAvailableVideo(item)}
//         />
//       )}
//       {/* <FlatList
//         style={{ marginTop: hp(3), marginHorizontal: wp(5), flex: 1 }}
//         showsVerticalScrollIndicator={false}
//         data={data}
//         //keyExtractor={item => item.id.toString()}
//         // numColumns={3} // Set the number of columns to 3
//         renderItem={({ item }) => renderAvailableVideo(item)}
//       /> */}
// {loading && <Loader />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   searchHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-evenly",
//     marginTop: hp(8),
//     marginHorizontal: wp(8),
//     height: hp(8),
//     //borderWidth: 3,
//   },
//   searchBar: {
//     height: hp(5.9),
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: wp(3.8),
//     borderRadius: wp(5),
//     borderWidth: 0.5,
//     borderColor: "#00000017",
//   },
//   latestSearch: {
//     fontFamily: "Inter",
//     fontWeight: "bold",
//     fontSize: wp(4.3),
//     marginTop: hp(2),
//     marginLeft: wp(10),
//     color: "#595959",
//   },
//   latestSearchList: {
//     marginTop: hp(2.1),
//     height: hp(7),
//     marginLeft: wp(5),
//   },
//   searchesDetails: {
//     flexDirection: "row",
//     marginLeft: wp(3),
//     alignItems: "center",
//     justifyContent: "center",
//     width: wp(30),
//     backgroundColor: "#F2F2F2",
//     borderRadius: wp(5),
//     height: hp(5),
//   },
//   textSearchDetails: {
//     fontFamily: "Inter",
//     fontWeight: "700",
//     fontSize: hp(1.8),
//   },
//   textHeader: {
//     fontSize: wp(5.7),
//     color: "#333333",
//     fontFamily: "Inter",
//     fontWeight: "bold",
//   },
//   imagecontainer: {
//     flexDirection: "row",
//     // alignItems: "center",
//     height: 100,
//     width: "100%",
//   },
//   image: {
//     width: "35%", // Make sure the image is square
//     height: "100%",
//     borderRadius: 10,
//     resizeMode: "cover",
//   },
//   descriptionContainer: {
//     flex: 1,
//     marginLeft: 10,
//     // justifyContent: "center",
//     width: "50%",
//   },
//   titleStyle: {
//     fontSize: 14,
//     fontFamily: "Inter-Bold",
//     color: "#000000",
//   },
//   description: {
//     fontSize: 12,
//     fontFamily: "Inter-Regular",
//     color: "#000000",
//   },
//   noDataText: {
//     fontSize: 16,
//     color: "#939393",
//     textAlign: "center",
//     marginTop: hp(3),
//     fontFamily: "Inter-Semi-Bold",
//   },
// });


// ////////////




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
import Back from "../../assets/svg/back.svg";
import { appImages } from "../../assets/utilities/index";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fontiso from "react-native-vector-icons/Fontisto";
import { base_url } from "../../../../baseUrl";
import Loader from "../../assets/Custom/Loader";
import { useTranslation } from 'react-i18next';

export default function SearchProducts({navigation}) {
const [selectedItemId, setSelectedItemId] = useState(null);
const { t } = useTranslation();
const [authToken, setAuthToken] = useState('');
const [searchTerm, setSearchTerm] = useState(''); 

const [searches, setSearches] = useState([]);

const [data, setData] = useState([]);

const [filteredData, setFilteredData] = useState([]);

const [loading, setLoading] = useState(false);


const fetchAll = async () => {
  setLoading(true);
  await loadSearchesFromStorage();
  setLoading(false);
};

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
      base_url + `item/searchItems?name=${search}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const result = await response.json();
    console.log('market zone-------------------->??????', result)
    setData(result.letters); // Update the state with the fetched data
    setSearchTerm('');
    fetchAll();
  } catch (error) {
    console.error('Error Trending:', error);
    setSearchTerm('');
    fetchAll();
  }
};



useEffect(() => {
  const fetchData = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        base_url + `item/searchItems?name=${selectedItemId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('market zone-----------yyyy--------->??????', result)
      setData(result.letters); // Update the state with the fetched data
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
    const savedSearches = await AsyncStorage.getItem('MarketZoneSearch');
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
    const savedSearches = await AsyncStorage.getItem("MarketZoneSearch");
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
        "MarketZoneSearch",
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
  const firstImage = item?.images?.length > 0 ? item?.images[0]?.image : null;
  console.log('first iamge------------', firstImage)
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', {ProductDetails: item})}
      style={{
        height: hp(18),
        flex: 1,
        borderRadius: wp(3),
        margin: 5,
      }}>
         <View style={styles.imagecontainer}>
         {firstImage ? (
          <Image
            source={{ uri: firstImage }}
            style={styles.image} 
          />
        ) : (
          null
        )}
        {/* <Image style={styles.image} source={{ uri: item?.thumbnail }} /> */}
        <View style={styles.descriptionContainer}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.titleStyle}
          >
            {item?.title}
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
            //setSelectedItemId(text)
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
        // keyExtractor={item => item.id.toString()}
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
