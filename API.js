// api.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { base_url } from './baseUrl';

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken ");
    if (token) {
      return token;
    } else {
      throw new Error("No auth token found");
    }
  } catch (err) {
    console.error("Error retrieving auth token:", err);
    throw err;
  }
};

export const fetchAllCinematicsCategory = async () => {
  const token = await getAuthToken();

  try {
    const response = await fetch(
      `${base_url}cinematics/category/getAll?page=1&limit=100`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
    return result.AllCategories;
  } catch (error) {
    console.error("Error Trending:", error);
    throw error;
  }
};

export const fetchCinematicTopVideos = async () => {
  const token = await getAuthToken();

  try {
    const response = await fetch(
      `${base_url}cinematics/getTopVideo`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error Trending:", error);
    throw error;
  }
};

export const fetchSubCategory = async (selectedCinematicItemId) => {
  const token = await getAuthToken();

  try {
    const response = await fetch(
        
      `${base_url}cinematics/getByCategory/${selectedCinematicItemId}?page=1&limit=1000`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (Array.isArray(result.data) && result.data.length > 0) {
      const formattedSections = result.data.map(category => ({
        title: category.sub_category_name,
        data: category.video_result.videos,
      }));

      return {
        sections: formattedSections,
        noData: formattedSections.every(section => section.data.length === 0),
      };
    } else {
      return {
        sections: [],
        noData: true,
      };
    }
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return {
      sections: [],
      noData: true,
    };
  }
};


export const fetchBannerConfig = async (authToken, base_url) => {
  try {
    const response = await fetch(
      `${base_url}banner/getAllActiveBanners?topBanner=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching active banners:", error);
    throw error;
  }
};

export const fetchBannerInActive = async (authToken, base_url) => {
  try {
    const response = await fetch(
      `${base_url}banner/getAllActiveBanners?topBanner=false`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const result = await response.json();
    return result.AllBanners.map(banner => {
      if (banner.image.startsWith('/fileUpload')) {
        banner.image = `${base_url}${banner.image}`;
      }
      return banner;
    });
  } catch (error) {
    console.error("Error fetching inactive banners:", error);
    throw error;
  }
};