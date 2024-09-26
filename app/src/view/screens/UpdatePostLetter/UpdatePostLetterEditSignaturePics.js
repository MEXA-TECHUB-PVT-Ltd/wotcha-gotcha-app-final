import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { appImages } from "../../../assets/utilities/index";
import CustomButton from "../../../assets/Custom/Custom_Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PublicLetter from "../../../assets/svg/PublicLetter.svg";
import PrivateLetter from "../../../assets/svg/PrivateLetter.svg";
import Video from 'react-native-video';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Headers from "../../../assets/Custom/Headers";
import CustomSnackbar from "../../../assets/Custom/CustomSnackBar";
import { base_url } from "../../../../../baseUrl";
import { useNavigation } from "@react-navigation/native";

import { useTranslation } from 'react-i18next';
import { CLOUD_NAME, CLOUDINARY_URL, CLOUDINARY_Video_URL, UPLOAD_PRESET } from "../../../../../cloudinaryConfig";
export default function UpdatePostLetterEditSignaturePics({
  route,
}) {
  const navigation = useNavigation()
  const [selectedItem, setSelectedItem] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [userId, setUserId] = useState("");
  const [imageInfo, setImageInfo] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(false);
  const [snackbarVisible, setsnackbarVisible] = useState(false);
  const [snackbarVisibleALert, setsnackbarVisibleALert] = useState(false);
  const [snackbarVisibleExceedsALert, setsnackbarVisibleExceedsALert] =
    useState(false);
  const [snackbarVisibleLimitALert, setsnackbarVisibleLimitALert] =
    useState(false);
  const ref_RBSendOffer = useRef(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const ref_RBSheetCamera = useRef(null);
  const ref_RBSheetVideo = useRef(null);
  const { t } = useTranslation();
  const ref_RBSheetCameraCanvas = useRef(null);

  const [postLetter, setPostLetter] = useState("");
  const [letterType, setLetterTypes] = useState("Public");

  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [userImage, setUserImage] = useState();
  const [imageUris, setImageUris] = useState([]);
  
  const [imageInfoThumbnail, setimageInfoThumbnail] = useState(null);
  const [Username, setUserName] = useState('');
  const receivedData = route.params?.receivedData;
  console.log("receivedData-----", receivedData.images);
  console.log("imageUris--------??????", imageUris.length);

  const [imagesWithId, setImagesWithId] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [removedImageIds, setRemovedImageIds] = useState([]);
  // console.log('iimageInfoThumbnail', imageInfoThumbnail)rr
//  useEffect(() => {
//   if (receivedData?.images) {
//     // Take only the first three images
//     const initialImages = receivedData.images.slice(0, 3).map((image, index) => ({
//       id: index + 1,
//       uri: image,
//     }));
//     setImagesWithId(initialImages);
//     setImageUris(initialImages);
//   }
// }, [receivedData]);
const [LetterData, setLetterData] = useState([]);
useEffect(() => {
  if (receivedData) {
    const getAuthToken = async () => {
      const token = authToken;
      try {
        const response = await fetch(base_url + `letter/getSpecificLetter/${receivedData.post_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("get post letter data ", data.postLetter);

          // Use the data from the API to set the letter data
          setLetterData(data.postLetter);
          setImagesWithId(data.postLetter.images); 
          setImageUris(data.postLetter.images);
       
        } else {
          console.error(
            "Failed to fetch letter data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Errors:", error);
      }
    };

    // Call the async function
    getAuthToken();
  }
}, [receivedData, authToken]); // Include dependencies if needed


useEffect(() => {
  const fetchFileDetails = async () => {
    if (receivedData?.images) {
      const initialImages = await Promise.all(
        receivedData.images.slice(0, 3).map(async (image, index) => {
          const fileDetails = getFileDetails(image);
          return {
            id: index + 1,
            uri: fileDetails.uri,
            fileName: fileDetails.fileName,
            type: fileDetails.type,
          };
        })
      );
      // setImagesWithId(initialImages); 
      // setImageUris(initialImages);
    }
  };

  fetchFileDetails();
}, [receivedData]);

const getFileDetails = (imageUrl) => {
  // Extracting file name from the URL
  const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
  const fileType = fileName.split('.').pop();

  const fileDetails = {
    fileName: fileName,
    type: `image/${fileType}`,
    uri: imageUrl,
  };

  return fileDetails;
};

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
    try {
      const result = await AsyncStorage.getItem("userId ");
      if (result !== null) {
        setUserId(result);

        userToken(result);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  //--------------------------------\\

  const userToken = async (id) => {
    try {
      const result3 = await AsyncStorage.getItem("authToken ");
      if (result3 !== null) {
        setAuthToken(result3);
        //await fetchCategory(result3, id);
        authTokenAndId(id, result3);
        userUserName();
      }
    } catch (error) {
      // Handle errors here
      console.error("Error retrieving user ID:", error);
    }
  };

  const userUserName = async id => {
    try {
      const result3 = await AsyncStorage.getItem('userName');
      if (result3 !== null) {
        setUserName(result3);  
      }
    } catch (error) {
    }
  };
  const authTokenAndId = async (id, token) => {
    fetchUser(id, token);
  };

  const fetchUser = async (id, tokens) => {

    const token = tokens;

    try {
      const response = await fetch(base_url + `user/getUser/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("IMAGE", data.user.image);

        // Use the data from the API to set the categories
        setUserImage(data.user.image);
      } else {
        console.error(
          "Failed to fetch user:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      //await fetchCategory(id, tokens);
      console.error("Errors:", error);
    }
  };

  //-------------------------------------------------------\\


  // const handleImageChange = (index) => {
  //   setSelectedIndex(index);
  //   ref_RBSheetCameraCanvas.current.open();
  // };

  // console.log("........image.......", imagesWithId);
  // console.log("........selectedIndex.......", selectedIndex);
  // ////

  const letterId = receivedData?.post_id;
  const receivedDataName = route.params?.name;
  const receivedDatAddress = route.params?.address;
  const receivedDataContactNumber = route.params?.contactNumber;
  const receivedDataEmail = route.params?.email;
  const receivedDataCategoryId = route.params?.category_id;
  const receivedDataLetterType = route.params?.letterType;
  const receivedDataGreetingsTitle = route.params?.greetingsTitle;
  const receivedDatasubjectOfLetter = route.params?.subjectOfLetter;
  const receivedDataintroductionOfLetter = route.params?.introductionOfLetter;
  const receivedDatapostLetter = route.params?.postLetter;
  const receivedDataAppealOfLetter = route.params?.formOfApeal;
  const receivedDataLetterImg = route.params?.letterImg;
  // const receivedDataSignatureId = route.params?.signatureId;
  // const receivedDataSignatureCreatedAt = route.params?.signatureCreatedAt;
  const receivedDataSignatureId = receivedData?.signature_id;
  const receivedDataSignatureCreatedAt = receivedData?.post_date;


  // const takePhotoFromCamera = async value => {
  //   ref_RBSheetCameraCanvas.current.close();
  //   setSelectedItem(value);
  //   launchCamera(
  //     {
  //       mediaType: 'photo',
  //       // videoQuality: 'medium',
  //     },
  //     response => {
  //       console.log('image here', response);
  //       if (
  //         !response.didCancel &&
  //         response.assets &&
  //         response.assets.length > 0
  //       ) {
  //         const newImageUri = response.assets[0];
  //         updateImageUris(newImageUri);
  //       }
  //     },
  //   );
  // };


  const choosePhotoFromLibrary = (value) => {
    ref_RBSheetCameraCanvas.current.close();

    setSelectedItem(value);
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const newImageUri = response.assets[0];
        updateImageUris(newImageUri);
      }
    });
  };

  // const updateImageUris = newImageUri => {
  //   if (imageUris.length < 3) {
  //     setImageUris(prevImageUris => [...prevImageUris, newImageUri]);
  //   } else {
  //     // Handle the case when the limit exceeds (e.g., show a message)
  //     handleUpdatePasswordExceedsAlert();
  //   }
  // };
  
  // const updateImageUris = (newImageUri, newImageInfo) => {
  //   if (selectedIndex !== null) {
  //     setImagesWithId((prevImages) => {
  //       const updatedImages = [...prevImages];
  //       updatedImages[selectedIndex] = {
  //         ...updatedImages[selectedIndex],
  //         url: newImageUri,
  //         newImageInfo: newImageInfo, // Store the new image info
  //       };
  //       return updatedImages;
  //     });

  //     setImageUris((prevUris) => {
  //       const newUris = [...prevUris];
  //       newUris[selectedIndex] = newImageInfo; // Replace the existing image info with the new one
  //       return newUris;
  //     });
  //   }
  // };

  const takeVideoFromCamera = async (value) => {
    ref_RBSheetVideo.current.close();

    setSelectedItem(value);
    launchCamera(
      {
        mediaType: "video",
        videoQuality: "medium",
      },
      (response) => {
        console.log("image here", response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setVideoUri(response.assets[0].uri);
            console.log("response", response.assets[0].uri);
            setVideoInfo(response.assets[0]);
            ref_RBSheetVideo.current.close();
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setVideoUri(response.uri);
            console.log("response", response.uri);
            ref_RBSheetVideo.current.close();
          }
        }
      }
    );
  };

  const chooseVideoFromLibrary = (value) => {
    ref_RBSheetVideo.current.close();

    setSelectedItem(value);
    launchImageLibrary({ mediaType: "Video" }, (response) => {
      console.log("image here", response);
      if (!response.didCancel && response.assets.length > 0) {
        console.log("Response", response.assets[0]);
        setVideoUri(response.assets[0].uri);
        setVideoInfo(response.assets[0]);
      }

      console.log("response", imageInfo);

      ref_RBSheetVideo.current.close();
    });
  };

  // upload multiple images

  // const checkUpload = () => {
  //   if (imageUris.length === 0 && videoInfo === null) {
  //     handleUpdatePasswordAlert();
  //   } else if (imageUris.length !== 0 && videoInfo !== null) {
  //     handleUpdatePasswordLimitAlert();
  //   } else if (imageUris.length > 0) {
  //     handleUploadImages(imageUris);
  //   } else if (imageUris.length === 0 && videoInfo !== null) {
  //     handleUploadVideo();
  //   }
  // };

  console.log(' handleUploadImages single image functiona call----about------', imageUris)
  const checkUpload = () => {
    if (imageUris.length < 3 && videoInfo === null && removedImageIds.length > 0) {
      console.log('removeExistingImages functiona call----------', removedImageIds)
      removeExistingImages(removedImageIds);
    } else if (imageUris.length <= 3 && videoInfo === null) {
      console.log(' handleUploadImages single image functiona call----------')
      handleUploadImages(imageUris);
    } else if (imageUris.length === 0 && videoInfo === null) {
      console.log('handleUpdatePasswordAlert functiona call----------')
     
      handleUpdatePasswordAlert();
    } else if (imageUris.length !== 0 && videoInfo !== null) {
      console.log('handleUpdatePasswordLimitAlert functiona call----------')
      handleUpdatePasswordLimitAlert(); 
    } else if ( imageUris.length === 0 && videoInfo !== null) {
      console.log('handleUploadVideo  functiona call----------')
      handleUploadVideo();
    }
  };
  // const checkUpload = () => {
  //   if (imageUris.length < 3 && videoInfo === null && removedImageIds.length > 0) {
  //     removeExistingImages(removedImageIds);
  //   } else if (imageUris.length < 3 && videoInfo === null) {
  //     handleUploadImages(imageUris);
  //   } else if (imageUris.length === 0 && videoInfo === null) {
  //     handleUpdatePasswordAlert();
  //   } else if (imageUris.length !== 0 && videoInfo !== null) {
  //     handleUpdatePasswordLimitAlert(); 
  //   } else if (imageUris.length > 0) {
  //     handleUploadImages(imageUris);
  //   } else if ( imageUris.length === 0 && videoInfo !== null) {
  //     handleUploadVideo();
  //   }
  // };

 











// Cinematic se liya test
  // const handleUploadImages = () => {
  //   setLoading(true);
  //   const uri = imageInfoThumbnail.uri;
  //   const type = imageInfoThumbnail.type;
  //   const name = imageInfoThumbnail.fileName;
  //   const sourceImage = {uri, type, name};
  //   console.log('Source Image', sourceImage);
  //   const dataImage = new FormData();
  //   dataImage.append('file', sourceImage);
  //   dataImage.append('upload_preset', UPLOAD_PRESET); // Use your Cloudinary upload preset
  //   dataImage.append('cloud_name', CLOUD_NAME); // Use your Cloudinary cloud name
 
  //   fetch(CLOUDINARY_URL, {
  //     method: 'POST',
  //     body: dataImage,
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
      
  //       //uploadVideo(data.url)
  //       //uploadXpiVideo(data.url);
      
       
  //         createLetterImageone(data.url);
       
  //       console.log('Image Url imageInfoThumbnail', data);
        
  //     })
  //     .catch(err => {
  //       setLoading(false);
  //       console.log('Error While Uploading Video', err);
  //     });
  // };






  const handleUploadImages = async (imageArray) => {
    console.log("ImageArray", imageArray);
    setLoading(true);
  
    // Filter out the objects that have full Cloudinary URLs already (i.e., existing images)
    const existingImages = imageArray
      .filter(imageInfo => imageInfo.image && typeof imageInfo.image === 'string')
      .map(imageInfo => imageInfo.image); // Extract the existing Cloudinary URLs
  
    // Filter out the images that need to be uploaded (i.e., new local images)
    const uploadableImages = imageArray.filter(imageInfo =>
      imageInfo.uri && imageInfo.type && imageInfo.fileName
    );
  
    console.log("Existing Cloudinary URLs:", existingImages);
    console.log("Images to upload:", uploadableImages);
  
    const uploadPromises = uploadableImages.map(async (imageInfo) => {
      const uri = imageInfo.uri;
      const type = imageInfo.type;
      const name = imageInfo.fileName;
      const sourceImage = { uri, type, name };
      const dataImage = new FormData();
      dataImage.append("file", sourceImage);
      dataImage.append("upload_preset", UPLOAD_PRESET);
      dataImage.append("cloud_name", CLOUD_NAME);

      try {
        const response = await fetch(
          CLOUDINARY_URL,
          {
            method: "POST",
            body: dataImage,
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Image upload failed");
        }
        const data = await response.json();
        console.log("Image URL", data.url);
        return data.url; // Return the Cloudinary URL directly
      } catch (error) {
        setLoading(false);
        console.log("Error While Uploading Image", error);
        throw error;
      }
    });
  
    try {
      // Wait for all image uploads to complete
      const uploadedImageUrls = await Promise.all(uploadPromises);
      console.log("Uploaded Cloudinary URLs:", uploadedImageUrls);
  
      // Combine existing Cloudinary URLs with newly uploaded URLs
      const finalImageUrls = [...existingImages, ...uploadedImageUrls];
      
      console.log("Final Image URL Array:", finalImageUrls);
  
      // Pass the final array of URLs to createLetterImageone
      createLetterImageone(uploadedImageUrls);
  
    } catch (error) {
      console.error("Error while uploading images:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  

 // ye 26 ka function hai jis mein image upload ho rahi
//   const handleUploadImages = async (imageArray) => {
//     console.log("ImageArray", imageArray);
//     setLoading(true);

//     const uploadPromises = imageArray.map(async (imageInfo) => {
//       const uri = imageInfo.uri;
//       const type = imageInfo.type;
//       const name = imageInfo.fileName;
//       const sourceImage = { uri, type, name };
//       const dataImage = new FormData();
//       dataImage.append("file", sourceImage);
//       dataImage.append("upload_preset", UPLOAD_PRESET);
//       dataImage.append("cloud_name", CLOUD_NAME);

//       try {
//         const response = await fetch(
//           CLOUDINARY_URL,
//           {
//             method: "POST",
//             body: dataImage,
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Image upload failed");
//         }
//         const data = await response.json();
//         console.log("Image Url", data.url);
//         return data.url;
//       } catch (error) {
//         setLoading(false);
//         console.log("Error While Uploading Image", error);
//         throw error; // Rethrow the error so that the Promise.all catches it
//       }
//     });

//     try {
//       const imageUrls = await Promise.all(uploadPromises);
//       console.log("All images uploaded successfully:", imageUrls);
//       createLetterImageone(imageUrls);
//       // if(removedImageIds.length === 0){
//       //   createLetterImageone(imageUrls, removedImageIds);
//       // } 


// //  // Determine oldImageIds based on conditions
// //  const oldImageIds = removedImageIds.length > 0 ? removedImageIds : undefined;

// //  // Call the appropriate function based on conditions
// //  if (oldImageIds) {
// //    createLetterImage(imageUrls, oldImageIds);
// //  } else if (removedImageIds.length === 0) {
// //    createLetterImageone(imageUrls);
// //  }



//   // Call the appropriate function based on conditions
//   // if (removedImageIds.length > 0) {
//   //   createLetterImage(imageUrls, removedImageIds);
//   // } else {
//   //   createLetterImageone(imageUrls);
//   // }



//           // Call createLetterImageone with proper arguments
//     // if (removedImageIds.length === 0) {
//     //   createLetterImageone(imageUrls, []);
//     // } else {
//     //      // Determine oldImageIds based on conditions
//     // const oldImageIds =
//     // removedImageIds.length > 0 ? removedImageIds : imageUris.length < 3 ? '' : null;
//     // // updateLetterImages(imageUrls, oldImageIds);
//     //   createLetterImage(imageUrls, oldImageIds);
//     // }
    
//     } catch (error) {
//       console.log("Error uploading images:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

  // const createLetterImageone = async (imageUrls, removedImageIds) => {
  //   const token = authToken;
  //   console.log("removedImageIds call from zero oldimageid----", removedImageIds);

  //   const apiUrl = base_url + "letter/updatePostLetterImages";
 
  //   const requestData = {
  //     letterId: letterId,
  //     oldImageIds: removedImageIds,
  //     image: imageUrls, //you can send maximum 5 images
  //     video: "", // you can send one video maximum
  //   }; 
  //   console.log("Request data is---", requestData);
  //   try {
  //     console.log(requestData);
  //     const response = await fetch(apiUrl, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestData),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("API Response:", data);

  //       UpdateLetterImage();
  //       setLoading(false);
  //       // handleUpdatePassword();

  //       // Handle the response data as needed
  //     } else {
  //       setLoading(false);

  //       console.error("Failed call api:", response);
  //       // Handle the error
  //     }
  //   } catch (error) {
  //     console.error("API Request Error:", error);
  //     setLoading(false);

  //     // Handle the error
  //   }
  // };
  const createLetterImage = async (imageUrls, removedImageIds) => {
    const token = authToken;
    const apiUrl = base_url + "letter/updatePostLetterImages";
  
    const requestData = {
      letterId: letterId,
      oldImageIds: removedImageIds,  // This includes the IDs of removed images
      image: imageUrls,  // This includes the URLs of newly uploaded images
     
    };
  

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        UpdateLetterImage();
      } else {
        console.error("Failed to call API fore letter image:", response);
      }
    } catch (error) {
      console.error("API Request Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const createLetterImageone = async (imageUrls) => {
    setLoading(true);
    const token = authToken;
    const apiUrl = base_url + "letter/updatePostLetterImages";
    console.log(" createLetterImageone---", imageUrls);
    const requestData = {
      letterId: letterId,
      image: imageUrls,  // This includes the URLs of newly uploaded images
     
    };
  
    console.log("Request data is---", requestData);
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        UpdateLetterImage();
      } else {
        console.error("Failed to call API for image one:", response);
      }
    } catch (error) {
      console.error("API Request Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const removeExistingImages = async (removedImageIds) => {
    setLoading(true);
    const token = authToken;
    const apiUrl = base_url + "letter/updatePostLetterImages";
  console.log('remove in re', removedImageIds)
    const requestData = {
      letterId: letterId,
      oldImageIds: removedImageIds,  // Only send oldImageIds
   
    };
  
    console.log("Request data is---", requestData);
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        UpdateLetterImage();
      } else {
        console.error("Failed to call API for remove image:", response);
      }
    } catch (error) {
      console.error("API Request Error:", error);
    } finally {
      setLoading(false);
    }
  };


  
  // const createLetterImage = async (imageUrls, oldImageIds) => {
  //   const token = authToken;
  //   console.log("AUTH TOKEN", token);

  //   const apiUrl = base_url + "letter/updatePostLetterImages";

  //   const requestData = {
  //     letterId: letterId,
  //     oldImageIds: oldImageIds !== null ? oldImageIds : undefined,
  //     image: imageUrls, //you can send maximum 5 images
  //     video: "", // you can send one video maximum
  //   }; 
  //   console.log("Request data is---", requestData);
  //   try {
  //     console.log(requestData);
  //     const response = await fetch(apiUrl, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestData),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("API Response:", data);

  //       UpdateLetterImage();
  //       setLoading(false);
  //       // handleUpdatePassword();

  //       // Handle the response data as needed
  //     } else {
  //       setLoading(false);

  //       console.error("Failed call api:", response);
  //       // Handle the error
  //     }
  //   } catch (error) {
  //     console.error("API Request Error:", error);
  //     setLoading(false);

  //     // Handle the error
  //   }
  // };
  const UpdateLetterImage = async (image) => {
    const token = authToken;
    console.log("AUTH TOKEN", token);

    const apiUrl = base_url + "letter/updatePostLetter";

    const requestData = {
      letterId: letterId,
      // image: image, //you can send maximum 5 images
      // video: '', // you can send one video maximum
      user_id: userId,
      post_type: "public",
      receiver_type: "leader",
      // receiver_type: receivedDataLetterType,
      disc_category: receivedDataCategoryId,
      disc_sub_category: receivedDataLetterType,
      name: receivedDataName,
      address: receivedDatAddress,
      email: receivedDataEmail,
      contact_no: receivedDataContactNumber,
      subject_place: receivedDatasubjectOfLetter,
      post_date: receivedDataSignatureCreatedAt,
      greetings: receivedDataGreetingsTitle,
      introduction: receivedDataintroductionOfLetter,
      body: receivedDatapostLetter,
      form_of_appeal: receivedDataAppealOfLetter,
      signature_id: receivedDataSignatureId,
      paid_status: false,
      receiver_id: "",
      receiver_address: "receiver_address",
    };

    try {
      console.log(requestData);
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response for UpdateLetterImage---- :", data);

        setLoading(false);

        handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error("Failed call api:", response);
        // Handle the error
      }
    } catch (error) {
      console.error("API Request Error:", error);
      setLoading(false);

      // Handle the error
    }
  };
  //----------------------\\
 
  const handleUploadVideo = (video) => {
    setLoading(true);
    const uri = videoInfo.uri;
    const type = videoInfo.type;
    const name = videoInfo.fileName;
    const source = { uri, type, name };
    const data = new FormData();
    data.append("file", source);
    data.append("upload_preset", UPLOAD_PRESET); // Use your Cloudinary upload preset
    data.append("cloud_name", CLOUD_NAME); // Use your Cloudinary cloud name

    fetch(CLOUDINARY_Video_URL, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVideoUrl(data.url); // Store the Cloudinary video URL in your state
        //uploadVideo(data.url)

        createLetterVideo(data.url);
        //uploadXpiVideo(data.url);
        console.log(data);
      })
      .catch((err) => {
        //Alert.alert('Error While Uploading Video');
        console.log("Error While Uploading Video", err);
        setLoading(false);
      });
  };

  const createLetterVideo = async (video) => {
    const token = authToken;
    console.log("AUTH TOKEN", token);

    // const apiUrl = base_url + 'letter/createLetter';
    const apiUrl = base_url + "letter/updatePostLetterImages";

    const requestData = {
      letterId: letterId,
      // oldImageIds: removedImageIds, //you can send maximum 5 image
      image: "", //you can send maximum 5 images
      video: video, // you can send one video maximum
    };
    try {
      console.log("Video Request data", requestData);
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        UpdateLetterVideo();
        setLoading(false);
      } else {
        setLoading(false);

        console.error("Failed call api:", response);
        // Handle the error
      }
    } catch (error) {
      console.error("API Request Error:", error);
      setLoading(false);

      // Handle the error
    }
  };

  const UpdateLetterVideo = async (image) => {
    const token = authToken;
    console.log("AUTH TOKEN", token);

    const apiUrl = base_url + "letter/updatePostLetter";

    const requestData = {
      letterId: letterId,
      // image: image, //you can send maximum 5 images
      // video: '', // you can send one video maximum
      user_id: userId,
      post_type: "public",
      // receiver_type: receivedDataLetterType,
      receiver_type: "leader",
      disc_category: receivedDataCategoryId,
      disc_sub_category: receivedDataLetterType,
      name: receivedDataName,
      address: receivedDatAddress,
      email: receivedDataEmail,
      contact_no: receivedDataContactNumber,
      subject_place: receivedDatasubjectOfLetter,
      post_date: receivedDataSignatureCreatedAt,
      greetings: receivedDataGreetingsTitle,
      introduction: receivedDataintroductionOfLetter,
      body: receivedDatapostLetter,
      form_of_appeal: receivedDataAppealOfLetter,
      signature_id: receivedDataSignatureId,
      paid_status: false,
      receiver_id: "35",
      receiver_address: "receiver_address",
    };

    try {
      console.log(requestData);
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response for UpdateLetterImage---- :", data);

        setLoading(false);

        handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error("Failed call api:", response);
        // Handle the error
      }
    } catch (error) {
      console.error("API Request Error:", error);
      setLoading(false);

      // Handle the error
    }
  };
  //////////////////////////////////////UPLOAD video end

  const handleUpdatePassword = async () => {
    setsnackbarVisible(true);
    setTimeout(() => {
      setsnackbarVisible(false);
      navigation.replace("ViewProfile");
    }, 3000);
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const handleUpdatePasswordAlert = async () => {
    setsnackbarVisibleALert(true);
    setTimeout(() => {
      setsnackbarVisibleALert(false);
    }, 3000);
  };

  const dismissSnackbarAlert = () => {
    setsnackbarVisibleALert(false);
  };

  const handleUpdatePasswordExceedsAlert = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisibleExceedsALert(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisibleExceedsALert(false);
    }, 3000);
  };

  const dismissSnackbarExceedsAlert = () => {
    setsnackbarVisibleExceedsALert(false);
  };

  const handleUpdatePasswordLimitAlert = async () => {
    setsnackbarVisibleLimitALert(true);
    setTimeout(() => {
      setsnackbarVisibleLimitALert(false);
      limitAlert();
    }, 3000);
  };

  const dismissSnackbarLimitAlert = () => {
    setsnackbarVisibleLimitALert(false);
  };

  const limitAlert = () => {
    setImageInfo(null);
    setVideoUrl(false);
    setImageUris([]);
    setImageUri(null);
    setVideoUri(null);
    setVideoInfo(null);
  };
  const setLetterType = (value) => {
    setLetterTypes(value);
    ref_RBSheetCamera.current.close();
  };

  const setType = () => {
    ref_RBSheetCamera.current.close();

    setLetterType("Private Letter");

    ref_RBSendOffer.current.open();
  };
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////

  const handleRemoveImage = (index) => {
    console.log('handle remove image ????????????????', index)
    const removedImageId = imagesWithId[index]?.id;
    setRemovedImageIds([...removedImageIds, removedImageId]);
    // setRemovedImageIds(prevIds => [...prevIds, removedImageId]);
    const updatedImages = imagesWithId.filter((_, i) => i !== index);
    setImagesWithId(updatedImages);
    setImageUris(updatedImages);

     // Prepare to update oldImageIds based on removedImageId
  // updateLetterImages(removedImageId);
  };

  const updateLetterImages = async (uploadedImageUrls, oldImageIds) => {
    setLoading(true);
  console.log('idddddd------------------',oldImageIds )
  console.log('uploadedImageUrls--------?',uploadedImageUrls )
    const payload = {
      letterId: letterId, // Replace with actual letterId
      oldImageIds: oldImageIds !== null ? oldImageIds : '',
      image: uploadedImageUrls, 
      video: null, // Adjust as per your requirements
    }; 
  
    try {
      const response = await fetch(base_url + 'letter/updatePostLetterImages', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update letter images");
      }
  
      const data = await response.json();
      console.log("Letter images updated successfully:", data);
      // UpdateLetterImage();
      setLoading(false);
      // Handle success scenario (e.g., show success message)
    } catch (error) {
      console.error("Error updating letter images:", error);
      // Handle error scenario (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };
  


  const handleImageChange = (index) => {
    setSelectedIndex(index);
    ref_RBSheetCameraCanvas.current.open();
  };

  // const takePhotoFromCamera = async () => {
  //   ref_RBSheetCameraCanvas.current.close();
  //   launchCamera(
  //     {
  //       mediaType: 'photo',
  //     },
  //     response => {
  //       console.log('image here', response);
  //       if (!response.didCancel && response.assets && response.assets.length > 0) {
  //         const newImageUri = response.assets[0].uri;
  //         updateImageUris(newImageUri, selectedIndex);
  //       }
  //     },
  //   );
  // };

  const takePhotoFromCamera = async () => {
    ref_RBSheetCameraCanvas.current.close();
    launchCamera(
      {
        mediaType: 'photo',
      },
      response => {
        // console.log('image here', response);
        if (!response.didCancel && response.assets && response.assets.length > 0) {
          const newImageUri = response.assets[0];
          // setImageUri(response.assets[0])
          // setimageInfoThumbnail(newImageUri)
          console.log('image here', newImageUri);
          if (selectedIndex !== null) {
            updateImageUris(newImageUri, selectedIndex);
          } else if (imageUris.length < 3) {
            setimageInfoThumbnail(newImageUri)
            // setImageUris(response.assets[0])
            addImageUri(newImageUri);
          } else {
            handleUpdatePasswordExceedsAlert();
            // Alert.alert("You can only upload a maximum of 3 images");
          }
        }
      },
    );
  };

  const updateImageUris = (newUri, index) => {
    const updatedImages = imagesWithId.map((image, i) => {
      if (i === index) {
        return { ...image, uri: newUri };
      }
      return image;
    });
    setImagesWithId(updatedImages);
    setImageUris(updatedImages);
    setSelectedIndex(null);
    
  };

  const addImageUri = (newUri) => {
  
    // const fileName = newUri.substring(newUri.lastIndexOf('/') + 1);
    // const fileType = fileName.split('.').pop();
    // const newImage = {
    //   id: imagesWithId.length + 1,
    //   // uri: newUri,
      
    //     fileName: fileName,
    //     originalPath: newUri, // Use the URI as originalPath
    //     type: `image/${fileType}`, // Construct type based on file extension
    //     uri: newUri,
      
    // };
    const updatedImages = [...imagesWithId, newUri];
    console.log('ayyyyyyyyy-------', updatedImages)
    setImagesWithId(updatedImages);
    setImageUris(updatedImages);
    
    // If there are less than three images, no need to send oldImageIds
  // if (imageUris.length < 3) {
  //   updateLetterImages();
  // }
  };

  const checkAndAddImage = () => {
    if (imageUris.length < 3) {
      ref_RBSheetCameraCanvas.current.open();
    } else {
      handleUpdatePasswordExceedsAlert(); 
      // Alert.alert("You can only upload a maximum of 3 images");
    }
  };

  const renderImageItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri ||  item.image}} style={styles.image} />
      {/* <TouchableOpacity
        style={styles.changePicContainer}
        onPress={() => handleImageChange(index)}
      >
        <Text style={{ fontFamily: "Inter-Medium", fontSize: 10 }}>
          {t('ChangePic')}
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleRemoveImage(index)}
      >
        <MaterialCommunityIcons name="close-circle" size={24} color="#ff0000" />
      </TouchableOpacity>
     
    </View>
  );
  // const renderImageItem = ({ item, index }) => (
  //   <View style={styles.imageContainer}>
  //     <Image source={{uri: item.uri}} style={styles.image} />
  //     <TouchableOpacity
  //       style={styles.iconContainer}
  //       onPress={() => handleImageChange(index)}
  //     >
  //       <Text style={{ fontFamily: "Inter-Medium", fontSize: 10}}>
  //         Change Pic
  //       </Text>
  //       {/* <MaterialCommunityIcons name="camera" size={24} color="#fff" /> */}
  //     </TouchableOpacity>
  //   </View>
  // );

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{ marginTop: hp(5), height: hp(8) }}>
        <Headers
          showBackIcon={true}
          showText={true}
          text={t('UpdateLetter')}
          onPress={() => navigation.goBack()}
        />
      </View>
 
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: wp(8),
          alignItems: "center",
          marginTop: hp(3),
          height: hp(8),
        }}
      >
        {userImage !== undefined ? (
          <View
            style={{
              width: wp(12),
              marginLeft: wp(0.5),
              height: wp(12),
              borderRadius: wp(12) / 2,
            }}
          >
            <Image
              source={{ uri: userImage }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: wp(12) / 2,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: wp(10),
              marginLeft: wp(3),
              height: wp(10),
              overflow: "hidden",
              borderRadius: wp(10) / 2,
            }}
          >
            <MaterialCommunityIcons
              style={{ marginTop: hp(0.5) }}
              name={"account-circle"}
              size={35}
              color={"#FACA4E"}
            />
          </View>
        )}
<Text
            style={{
              color: '#333333',
              marginLeft: wp(3),
              fontFamily: 'Inter',
              fontWeight: 'bold',
            }}>
            {Username}
          </Text>

        {/* <TouchableOpacity
          onPress={() => ref_RBSheetCamera.current.open()}
          style={{
            flexDirection: "row",
            marginLeft: wp(5),
            height: hp(5),
            width: wp(33),
            borderWidth: 0.5,
            borderColor: "#FACA4E",
            borderRadius: wp(5),
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ color: "#FACA4E", fontFamily: "Inter-Regular" }}>
            {letterType}
          </Text>

          <Ionicons name="chevron-down" size={21} color="#FACA4E" />
        </TouchableOpacity> */}
      </View>

      {videoInfo == null  ? (
        <TouchableOpacity
        onPress={checkAndAddImage}
          // onPress={() => ref_RBSheetCameraCanvas.current.open()}
          style={{
            borderRadius: wp(3),
            marginTop: hp(5),
            height: hp(25),
            width: "70%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#E7EAF2",
          }}
        >
          <Image style={{ resizeMode: "contain" }} source={appImages.Upload} />

          <Text
            style={{
              fontFamily: "Inter",
              marginTop: hp(1.8),
              //fontWeight: 'bold',
              fontSize: hp(1.5),
              color: "#939393",
            }}
          >
            {t('maximum3imagesorvideos')}
            {/* You can maximum 3 images or videos */}
          </Text>
        </TouchableOpacity>
      ) : null}

      {imageUri !== null ? (
        <View
          style={{
            marginTop: hp(5),
            height: hp(35),
            borderRadius: wp(3),
            marginHorizontal: wp(20),
          }}
        >
          {imageUri !== null && (
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1, // Ensure it's on top of other elements
                flex: 1,
                width: "100%",
                height: "100%",
                borderRadius: wp(3),
                resizeMode: "contain",
              }}
              source={{ uri: imageUri }}
            />
          )}
          {imageUri == null && (
            <Image
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                borderRadius: wp(3),
                resizeMode: "stretch",
                zIndex: 0, // Ensure it's below other elements when no image
              }}
              source={appImages.updatePics}
            />
          )}
        </View>
      ) : null}

      {/* //-------------------\\ */}


      <View style={{ marginHorizontal: wp(15), marginTop: hp(3) }}>
        <FlatList
          data={imageUris}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Set the number of columns to 3
          renderItem={renderImageItem}
        />
      </View>
      {/* <View style={{ marginHorizontal: wp(15), marginTop: hp(3) }}>
        <FlatList
          data={imagesWithId}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Set the number of columns to 3
          renderItem={renderImageItem}
        />
      </View> */}

      {/* <View style={{marginHorizontal: wp(15), marginTop: hp(3)}}>
        <FlatList
          data={imageUris}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3} // Set the number of columns to 3
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Image source={{uri: item.uri}} style={styles.image} />
            </View>
          )}
        />
      </View> */}

      {imageUris === null || imageUris === undefined || imageUris.length === 0 ? (
        <TouchableOpacity
          onPress={() => ref_RBSheetVideo.current.open()}
          style={{
            borderRadius: wp(3),
            marginTop: hp(5),
            height: hp(25),
            width: "70%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#E7EAF2",
          }}
        >
          <Image style={{ resizeMode: "contain" }} source={appImages.Upload} />

          <Text
            style={{
              fontFamily: "Inter",
              marginTop: hp(1.8),
              //fontWeight: 'bold',
              fontSize: hp(1.5),
              color: "#939393",
            }}
          >
            {t('maximumupload1video')}
            {/* You can maximum upload 1 video */}
          </Text>
        </TouchableOpacity>
      ) : null}

      {/* {imageUris && (
        <View
          style={{
            height: hp(7),
            marginTop: hp(5),
            marginHorizontal: wp(10),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={{ uri: imageUris.uri}} style={styles.image} />
        </View>
      )} */}

<View style={styles.videomaincontainer}>
      {videoUri !== null && (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoUri }}
            style={styles.video}
            // resizeMode="contain"
            // controls={true} // Show media controls (play, pause, etc.)
          />
          {/* <Text style={styles.videoInfo}>{videoInfo?.fileName}</Text> */}
        </View>
      )}
    </View>
      {/* {imageUri !== null ? (
        <View
          style={{
            marginTop: hp(5),
            height: hp(35),
            borderRadius: wp(3),
            marginHorizontal: wp(20),
          }}>
          {imageUri !== null && (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1, // Ensure it's on top of other elements
                flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(3),
                resizeMode: 'contain',
              }}
              source={{uri: imageUri}}
            />
          )}
          {imageUri == null && (
            <Image
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(3),
                resizeMode: 'stretch',
                zIndex: 0, // Ensure it's below other elements when no image
              }}
              source={appImages.updatePics}
            />
          )}
        </View>
      ) : null}  */}

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={{ marginTop: "25%", alignSelf: "center" }}>
          <CustomButton
            title="Upload"
            // load={loading}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              //handleUpdatePassword();
              checkUpload();
              //handleUpdatePassword()
              //navigation.navigate('PostLetterEditSignature');
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </View>

      <RBSheet
        ref={ref_RBSheetCamera}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(25),
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: wp(8),
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter-Medium",
              color: "#303030",
              fontSize: hp(2.3),
            }}
          >
            {t('SelectLetterType')}
            
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            //flexDirection: 'row',
            justifyContent: "space-evenly",
            //alignItems: 'center',
            //borderWidth: 3,
            marginTop: hp(3),
          }}
        >
          <TouchableOpacity
            onPress={() => setLetterType("Public Letter")}
            style={{ flexDirection: "row", marginHorizontal: wp(7) }}
          >
            <PublicLetter height={23} width={23} />

            <Text
              style={{
                fontFamily: "Inter-Regular",
                color: "#656565",
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}
            >
              {t('PublicLetter')}
              
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: hp(0.1),
              marginHorizontal: wp(8),
              marginTop: hp(3),
              backgroundColor: "#00000012",
            }}
          ></View>

          <TouchableOpacity
            onPress={() => setType()}
            style={{
              flexDirection: "row",
              marginTop: hp(2.5),
              marginHorizontal: wp(7),
            }}
          >
            <PrivateLetter height={23} width={23} />

            <Text
              style={{
                fontFamily: "Inter-Regular",
                color: "#656565",
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}
            >
              {t('PrivateLetter')}
              
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSheetCameraCanvas}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(25),
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: wp(8),
            alignItems: "center",
          }}
        >
          <Text style={styles.maintext}>{t('Selectanoption')}</Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSheetCameraCanvas.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: hp(3),
          }}
        >
          <TouchableOpacity
            onPress={() => takePhotoFromCamera("camera")}
            style={
              selectedItem === "camera"
                ? styles.selectedItems
                : styles.nonselectedItems
            }
          >
            <Ionicons
              color={selectedItem === "camera" ? "#FACA4E" : "#888888"}
              name="camera"
              size={25}
            />

            <Text style={{ color: "#333333" }}>{t('Fromcamera')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => choosePhotoFromLibrary("gallery")}
            style={
              selectedItem === "gallery"
                ? styles.selectedItems
                : styles.nonselectedItems
            }
          >
            <MaterialCommunityIcons
              color={selectedItem === "gallery" ? "#FACA4E" : "#888888"}
              name="image"
              size={25}
            />

            <Text style={{ color: "#333333" }}>{t('Fromgallery')}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSendOffer}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(55),
          },
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginHorizontal: wp(8),
            justifyContent: "space-evenly",
          }}
        >
          <Image source={appImages.alert} style={{ resizeMode: "contain" }} />

          <Text
            style={{
              color: "#333333",
              marginLeft: wp(1),
              fontSize: hp(2.3),
              //textDecorationLine:'underline',
              fontFamily: "Inter-Bold",
              //fontWeight: 'bold',
            }}
          >
            {t('UnableToPost')}
            
          </Text>

          <Text
            style={{
              color: "#9597A6",
              marginLeft: wp(1),
              fontSize: hp(2),
              textAlign: "center",
              lineHeight: hp(3),
              //textDecorationLine:'underline',
              fontFamily: "Inter-Regular",
              //fontWeight: 'bold',
            }}
          >
            {t('Upgradeforprivateletter')}
            {/* Upgrade for private letter posting and a{"\n"}seamless experience */}
          </Text>

          <View style={{ marginHorizontal: wp(10) }}>
            <CustomButton
              title={t('BuySubscription')}
              customClick={() => {
                ref_RBSendOffer.current.close();
                navigation.navigate("SubscriptionPayment");
              }}
              style={{ width: wp(59) }}
            />
          </View>

          <TouchableOpacity onPress={() => ref_RBSendOffer.current.close()}>
            <Text
              style={{
                color: "#9597A6",
                marginLeft: wp(1),
                marginBottom: hp(3),
                fontSize: hp(2),
                textAlign: "center",
                lineHeight: hp(3),
                //textDecorationLine:'underline',
                fontFamily: "Inter-Regular",
                //fontWeight: 'bold',
              }}
            >
              {t('Maybelater')}
              {/* Maybe later */}
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSheetVideo}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(25),
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: wp(8),
            alignItems: "center",
          }}
        >
          <Text style={styles.maintext}>{t('Selectanoption')}</Text>
          <TouchableOpacity onPress={() => ref_RBSheetVideo.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={"#303030"}
              onPress={() => ref_RBSheetVideo.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: hp(3),
          }}
        >
          <TouchableOpacity
            onPress={() => takeVideoFromCamera("camera")}
            style={
              selectedItem === "camera"
                ? styles.selectedItems
                : styles.nonselectedItems
            }
          >
            <Ionicons
              color={selectedItem === "camera" ? "#FACA4E" : "#888888"}
              name="camera"
              size={25}
            />

            <Text style={{ color: "#333333" }}>{t('Fromcamera')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => chooseVideoFromLibrary("gallery")}
            style={
              selectedItem === "gallery"
                ? styles.selectedItems
                : styles.nonselectedItems
            }
          >
            <MaterialCommunityIcons
              color={selectedItem === "gallery" ? "#FACA4E" : "#888888"}
              name="image"
              size={25}
            />
            <Text style={{ color: "#333333" }}>{t('>Fromgallery')}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <CustomSnackbar
        message={t('Success')} 
        messageDescription={t('LetterUpdatedSuccessfully')}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />

      <CustomSnackbar
        message={t('Alert!')}
        messageDescription={t('maximumupload3imagesorvideo')}
        onDismiss={dismissSnackbarAlert} // Make sure this function is defined
        visible={snackbarVisibleALert}
      />

      <CustomSnackbar
        message={t('Alert!')}
        messageDescription={t('ImageLimitExceeds')}
        onDismiss={dismissSnackbarExceedsAlert} // Make sure this function is defined
        visible={snackbarVisibleExceedsALert}
      />

      <CustomSnackbar
        message={t('Alert!')}
        messageDescription={t('eitheruploadthreeimagesoronevideo!')}
        onDismiss={dismissSnackbarLimitAlert} // Make sure this function is defined
        visible={snackbarVisibleLimitALert}
      />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  ti: {
    marginTop: "5%",
    width: 300,
    backgroundColor: "white",
    fontSize: wp(4),
    paddingLeft: "2%",
    borderRadius: 10,
  },
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: "98%",
    borderColor: "#FACA4E",

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: "98%",
    borderColor: "#E7EAF2",
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  iconStyle: {
    color: "#C4C4C4",
    width: 20,
    height: 20,
  },
  iconStyleInactive: {
    color: "#FACA4E",
  },
  maintext: {
    fontSize: hp(2.3),
    color: "#303030",
    fontWeight: "bold",
  },
  modaltextview: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: wp(90),
    borderRadius: 25,
    backgroundColor: "white",
    paddingHorizontal: wp(15),
  },
  optiontext: {
    fontSize: hp(1.7),
    color: "#303030",
    marginLeft: wp(4),
  },
  nonselectedItems: {
    width: wp(35),
    justifyContent: "space-evenly",
    alignItems: "center",
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: "#E7EAF2",
  },
  selectedItems: {
    width: wp(35),
    justifyContent: "space-evenly",
    alignItems: "center",
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: "#FACA4E",
  },
  selectCheckBox: {
    width: 17,
    height: 17,
    borderRadius: wp(1),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FACA4E",
  },
  unSelectCheckBox: {
    width: 17,
    height: 17,
    borderRadius: wp(1),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#C4C4C4",
  },
  image: {
    width: "100%",
    height: 100,
    aspectRatio: 1, // Maintain the aspect ratio of the image
  },
  // imageContainer: {
  //   flex: 1,
  //   margin: wp(1),
  //   alignItems: "center",
  //   justifyContent: "center",
  //   position: "relative", // For absolute positioning of the icon
  // },
  // image: {
  //   width: wp(28),
  //   height: hp(20),
  //   borderRadius: 10,
  // },
  // iconContainer: {
  //   position: "absolute",
  //   top: 5,
  //   left: '10%',
  //   backgroundColor: "#FACA4E", // Semi-transparent background
  //   borderRadius: 12,
  //   padding: 5,
  // },
  // ///
  imageContainer: {
    position: 'relative',
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 5,
    right: 1,
  },
  changePicContainer: {
    position: 'absolute',
    top: 5,
    left: 2,
    backgroundColor: '#FACA4E',
    padding: 2,
    borderRadius: 5,
  },
  videomaincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    height: hp(30),
    width: wp(100),
    marginTop: hp(5),
    // marginHorizontal: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    height: '100%',
    width: '100%',
  },
  videoInfo: {
    color: '#FACA4E',
    marginTop: hp(2),
  },
});















/////////////////////////



// const takePhotoFromCamera = async () => {
//   ref_RBSheetCameraCanvas.current.close();
//   launchCamera(
//     {
//       mediaType: 'photo',
//     },
//     async response => {
//       console.log('image here', response);
//       if (!response.didCancel && response.assets && response.assets.length > 0) {
//         const newImageDetails = response.assets[0]; // This contains detailed information
//         const newImageUri = newImageDetails.uri;
        
//         const fileDetails = getFileDetails(newImageUri);
//         const newImage = {
//           id: imagesWithId.length + 1,
//           uri: newImageUri,
//           fileName: fileDetails.fileName,
//           type: fileDetails.type,
//         };

//         if (selectedIndex !== null) {
//           updateImageUris(newImage, selectedIndex);
//         } else if (imageUris.length < 3) {
//           addImageUri(newImage);
//         } else {
//           handleUpdatePasswordExceedsAlert();
//           // Alert.alert("You can only upload a maximum of 3 images");
//         }
//       }
//     },
//   );
// };




///////////////////////////









//////////////