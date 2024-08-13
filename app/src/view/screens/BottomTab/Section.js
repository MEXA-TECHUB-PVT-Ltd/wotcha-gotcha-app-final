import React, { useEffect, useState } from "react";
import { View, Text, SectionList, FlatList, StyleSheet, ActivityIndicator } from "react-native";

// Headings for sections
const headings = [
  { title: "Trending Videos" },
  { title: "Recent Videos" },
  { title: "Top Videos" },
  { title: "Most Viewed Videos" },
  { title: "Most Commented Videos" },
  { title: "Video Categories" },
  { title: "QAFIs" },
  { title: "GEBCs" },
  { title: "Public General Letters" },
  { title: "Public Celebrity Letters" },
  { title: "Private Friends Letters" },
  { title: "Top QAFIs" },
  { title: "News" },
  { title: "Private Celebrity Letters" },
  { title: "Picture Categories" },
  { title: "Items" }
];

const Section = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentApiIndex, setCurrentApiIndex] = useState(0);

  const apiEndpoints = [
    'https://watch-gotcha-be.mtechub.com/xpi/getTrendingVideosByCategory/17?page=1&limit=5',
    'https://watch-gotcha-be.mtechub.com/xpi/getAllRecentVideosByCategory/17?page=1&limit=2',
    'https://watch-gotcha-be.mtechub.com/top/app/top_video/17',
    'https://watch-gotcha-be.mtechub.com/xpi/getMostViewedVideosByCategory/17?page=1&limit=5',
    'https://watch-gotcha-be.mtechub.com/xpi/getMostCommentedVideosByCategory/17?page=1&limit=5',
    'https://watch-gotcha-be.mtechub.com/videoCategory/getAllVideoCategories',

    'https://watch-gotcha-be.mtechub.com/qafi/getAllQafisByCategory/3?page=1&limit=50',
    'https://watch-gotcha-be.mtechub.com/gebc/getAllGEBCsByCategory/3?page=1&limit=50',
    'https://watch-gotcha-be.mtechub.com/letter/public_general_by_category/3/?page=1&limit=100',
    'https://watch-gotcha-be.mtechub.com/letter/public_celebrity_by_category/3/?page=1&limit=10',
    'https://watch-gotcha-be.mtechub.com/letter/private_friends_by_category/3/?page=1&limit=5',
    'https://watch-gotcha-be.mtechub.com/top/getAllTopQAFIByCategory/3',
    'https://watch-gotcha-be.mtechub.com/news/getAllNewsByCategory/3?page=1&limit=100',
    'https://watch-gotcha-be.mtechub.com/letter/private_celebrity_by_category/3/?page=1&limit=2',
    'https://watch-gotcha-be.mtechub.com/picCategory/getAllPicCategories?page=1&limit=5',
    'https://watch-gotcha-be.mtechub.com/item/getAllItems?page=1&limit=2'
  ];

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc2LCJpYXQiOjE3MTYyMDAwMzMsImV4cCI6MTcxODc5MjAzM30.3Awm12MgH6kreuZurgA9B9HIWiv0ooFTttuy43zPW24'; // Replace with your actual token

  useEffect(() => {
    if (currentApiIndex < apiEndpoints.length) {
      fetchDataFromApi(currentApiIndex);
    } else {
      setLoading(false);
    }
  }, [currentApiIndex]);

  const fetchDataFromApi = async (index) => {
    try {
      const response = await fetch(apiEndpoints[index], {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();

      console.log('Fetched data from API:', result);

      let data = [];
      switch (index) {
        case 0:
          data = result.Videos || [];
          break;
        case 1:
          data = result.Videos || [];
          break;
        case 2:
          data = result.topVideo || [];
          break;
        case 3:
          data = result.Videos || [];
          break;
        case 4:
          data = result.Videos || [];
          break;
        case 5:
          data = result.AllCategories || [];
          break;
        case 6:
          data = result.QAFIs || [];
          break;
        case 7:
          data = result.GEBCs || [];
          break;
        case 8:
          data = result.AllLetter || [];
          break;
        case 9:
          data = result.AllLetter || [];
          break;
        case 10:
          data = result.AllLetter || [];
          break;
        case 11:
          data = result.AllQAFI || [];
          break;
        case 12:
          data = result.AllQAFIs || [];
          break;
        case 13:
          data = result.AllLetter || [];
          break;
        case 14:
          data = result.picCategories || [];
          break;
        case 15:
          data = result.items || [];
          break;
        default:
          break;
      }

      setData(prevData => [
        ...prevData,
        {
          title: headings[index].title,
          data: data.map(item => JSON.stringify(item))
        }
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setCurrentApiIndex(prevIndex => prevIndex + 1);
    }
  };

  if (loading && currentApiIndex === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={({ item }) => null}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        renderSectionFooter={({ section }) => (
          <FlatList
            horizontal
            data={section.data}
            renderItem={({ item, index }) => <Text style={styles.item}>{item}</Text>}
            keyExtractor={(item, index) => `${item}_${index}`}
            showsHorizontalScrollIndicator={false}
          />
        )}
      />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
    textAlign: 'center'
  },
  header: {
    fontSize: 24,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Section;
