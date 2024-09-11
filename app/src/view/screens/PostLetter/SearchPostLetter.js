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
  import Back from '../../../assets/svg/back.svg';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Fontiso from 'react-native-vector-icons/Fontisto';
import { base_url } from '../../../../../baseUrl';
import { useTranslation } from 'react-i18next';
import Approved from "../../../assets/svg/Approved";
import Loader from '../../../assets/Custom/Loader';
  export default function SearchPostLetter({navigation, route}) {
    const index = route?.params?.selectedItemId
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
          base_url + `letter/searchLetters?name=${search}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        const result = await response.json();
        setData(result.letters); // Update the state with the fetched data
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
            base_url + `letter/searchLetters?name=${selectedItemId}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
  
          const result = await response.json();
          const formattedLetters = result.letters.map(letter => ({
            ...letter,
            post_date: convertTimeAndDate(letter.post_date),
          }));
          setData(formattedLetters); //
        } catch (error) {
          console.error('Error Trending:', error);
        }
      };
  
      fetchData();
    }, [selectedItemId]);
  
    const convertTimeAndDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
  
        });
      };
    const handleSearch = text => {

      if (!data) {
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
        const savedSearches = await AsyncStorage.getItem('lettersearch');
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

        const savedSearches = await AsyncStorage.getItem("lettersearch");
        let searches = [];
    
        if (savedSearches) {
          searches = JSON.parse(savedSearches);
        }
        const existingSearch = searches.find(
          (search) =>
            search.title.toLowerCase() === searchTerm.toLowerCase()
        );
    
        if (!existingSearch) {
          // Save the new search term
          searches.push(newSearchTerm);
          await AsyncStorage.setItem(
            "lettersearch",
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
      const imageUrl = item.signature_image
      ? item.signature_image.startsWith('/fileUpload') || item.signature_image.startsWith('/signatureImages')
        ? base_url + item.signature_image
        : item.signature_image
      : null;
    
        const userimageUrl = item.userimage
      ? item.userimage.startsWith('/userImage')
        ? base_url + item.userimage
        : item.userimage
      : null;
      return (
        <TouchableOpacity
        onPress={() =>
          navigation.navigate("LetterDetails", {
            Letters: item,
            identifier: false,
          })
        }
        style={{
          width: wp(45),
          marginHorizontal: wp(2),
          marginVertical: hp(1),
          height: "100%",
        }} // Add margin here
      >
        <View
          style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
        ></View>
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 2,
              alignItems: "center",
              height: hp(4),
            }}
          >
            {item?.userimage !== null || item?.userimage !== undefined || userimageUrl !== null || userimageUrl !== undefined ? (
              <View
                style={{
                  height: hp(2),
                  width: wp(4),
                  borderRadius: wp(3),
                }}
              >
                <Image
                  source={{ uri: item?.userimage || userimageUrl }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                />
              </View>
            ) : (
              <MaterialCommunityIcons
                style={{ marginTop: hp(0.5) }}
                name={"account-circle"}
                size={35}
                color={"#FACA4E"}
              />
            )}
  
            <View style={{ marginLeft: wp(2.5) }}>
              <Approved width={10} height={10} />
            </View>
          </View>
  
          <View
            style={{
              alignItems: "flex-end",
              marginTop: hp(-2),
              marginRight: wp(3),
            }}
          >
            <Text
              style={{
                color: "#282828",
                // marginLeft: wp(3),
                width: "25%",
                fontSize: 6,
                fontFamily: "Inter-Bold",
              }}
            >
              {item.post_date}
            </Text>
          </View>
  
          <View
            style={{
              flexDirection: "row",
              height: hp(5),
  paddingTop:6,
            }}
          >
            <Text
              style={{
                color: "#282828",
                fontSize: 8,
                textDecorationLine: "underline",
                fontFamily: "Inter-Bold",
              }}
            >
              {t('Subject')}  
           
            </Text>
            <View style={{height:'100%',width:'75%' }}>
              <Text
                numberOfLines={3}
              ellipsizeMode="tail"
                style={{
                  color: "#595959",
                  marginLeft: wp(1),
                  fontSize: 8,
                  fontFamily: "Inter-Regular",
                }}
              >
                {item.subject_place}
              </Text>
            </View>
          </View>
  
          <View
            style={{
              justifyContent: "center",
              alignItems: 'flex-end',
              height: hp(6),
  right:10
            }}
          >
            {imageUrl !== null || imageUrl !== undefined || item.signature_image !== undefined || item.signature_image !== null ? (
              <View
                style={{
                  height: hp(5),
                  width: wp(10),
                  borderRadius: wp(3),
                }}
              >
                <Image
                   source={{ uri: imageUrl || item.signature_image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: wp(3),
                    resizeMode: "cover",
                  }}
                />
              </View>
            ) : (
            null
            )}
  
          </View>
          <View
            style={{ backgroundColor: "#77BDF2", height: 2, width: "100%" }}
          ></View>
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
  