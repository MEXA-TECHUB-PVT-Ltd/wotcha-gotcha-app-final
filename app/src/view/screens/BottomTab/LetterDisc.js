import {
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';

import Headers from '../../../assets/Custom/Headers';
import {appImages} from '../../../assets/utilities';
import Add from '../../../assets/svg/AddMainScreen.svg';
import Approved from '../../../assets/svg/Approved';
export default function LetterDisc({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(0);

  const availableApps = [
    {
      id: 1,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Item Name',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Item Name',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Item Name',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Item Name',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
  ];

  //Disc Screen

  const searches = [
    {id: 1, title: 'On News'},
    {id: 2, title: 'Open Letters'},
    {id: 3, title: 'QAFI'},
    {id: 4, title: 'XYZ'},
    {id: 5, title: 'XYZ'},
    {id: 6, title: 'XYZ'},
    {id: 7, title: 'XYZ'},
  ];

  const renderAvailableApps = item => {
    console.log('Items', item);
    return (
      <View style={{width: wp(30), margin: 5}}>
        <View>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: '100%',
              height: hp(12),
              borderRadius: wp(3),
              resizeMode: 'cover',
            }}
            source={item.image}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(12),
            height: hp(7),
            width: wp(40),
          }}>
          <View
            style={{
              width: wp(7),
              marginLeft: wp(0.5),
              height: wp(7),
              borderRadius: wp(7) / 2,
            }}>
            <Image
              source={appImages.profileImg}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          </View>

          <Text
            style={{
              fontSize: hp(1.6),
              marginLeft: wp(2),
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}>
            John Doe
          </Text>

          <View style={{marginLeft: wp(1)}}>
            <Approved />
          </View>
        </View>
      </View>
    );
  };

  const renderSearches = item => {
    console.log('Items', item);
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

  const DiscScreen = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          <View style={{width: wp(40), height: '100%', borderRadius: wp(5)}}>
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,

                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(3),
                resizeMode: 'cover',
              }}
              source={appImages.topSearches1}
            />
          </View>

          <View style={{justifyContent: 'flex-end', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(40),
              }}>
              <View
                style={{
                  width: wp(10),
                  marginLeft: wp(3),
                  height: wp(10),
                  borderRadius: wp(10) / 2,
                }}>
                <Image
                  source={appImages.profileImg}
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                />
              </View>

              <Text
                style={{
                  fontSize: hp(1.6),
                  marginLeft: wp(2),
                  color: '#000000',
                  fontWeight: 'bold',
                  fontFamily: 'Inter',
                }}>
                John Doe
              </Text>

              <View style={{marginLeft: wp(1)}}>
                <Approved />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(40),
              }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontWeight: 'bold',
                  fontFamily: 'Inter',
                  color: '#000000',
                }}>
                Explore the intricate web of global politics in this thought-
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableApps}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableApps(item)}
            />
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableApps}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableApps(item)}
            />
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableApps}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableApps(item)}
            />
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableApps}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableApps(item)}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderPublicGeneral = item => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Image
          source={appImages.OpenLetter}
          style={{resizeMode: 'contain', width: wp(39)}}
        />

        <Image
          source={appImages.OpenLetter}
          style={{resizeMode: 'contain', width: wp(39)}}
        />
      </View>
    );
  };

  const OpenLetters = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: hp(21),
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Image
            source={appImages.openLettersFirst}
            style={{resizeMode: 'contain', width: wp(55)}}
          />
        </View>

        <View style={{height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Public (general)
          </Text>

          <FlatList
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={searches}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderPublicGeneral(item)}
        />


        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Public (to authorities, celebrities, leaders)
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />

            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Private (to friends, peers, followers)
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />

            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Private (to authorities, celebrities, leaders){' '}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />

            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{marginTop: hp(5)}}>
        <Headers
          showListings={true}
          showText={true}
          text={'Disc'}
          showSearch={true}
        />
      </View>

      <View
        style={{
          height: hp(18),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: wp(60), resizeMode: 'contain'}}
          source={appImages.bannerAds}
        />
      </View>

      <View style={{marginTop: hp(1), marginHorizontal: wp(8)}}>
        <Text style={{color: '#FACA4E', fontWeight: 'bold', fontSize: hp(2.3)}}>
          Disc
        </Text>
      </View>

      <View style={styles.latestSearchList}>
        <Text style={{color: '#232323', fontWeight: 'bold', fontSize: hp(2.1)}}>
          Top
        </Text>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={searches}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderSearches(item)}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: hp(1),
          marginHorizontal: wp(8),
        }}>
        {selectedItemId === 0 ? (
          <DiscScreen />
        ) : selectedItemId === 2 ? (
          <OpenLetters />
        ) : (
          <DiscScreen />
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('PostOnNews')}
        style={{position: 'absolute', bottom: 1, right: 25}}>
        <Add />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    height: hp(5.9),
    marginTop: hp(3),
    flex: 1,
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
    //marginLeft: wp(3.8),
    borderRadius: wp(5),
    borderWidth: 0.5,
    borderColor: '#00000017',
  },
  latestSearchList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginHorizontal: wp(8),
    //marginLeft: wp(5),
    //borderWidth: 3,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: hp(5),
    marginHorizontal: wp(8),
    height: hp(8),
    //borderWidth: 3,
  },
  latestSearch: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: wp(4.3),
    marginTop: hp(2),
    marginLeft: wp(10),
    color: '#595959',
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
});
