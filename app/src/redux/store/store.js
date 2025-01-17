// // import { configureStore } from '@reduxjs/toolkit';
// // import { persistStore, persistReducer } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage'; // Default storage (AsyncStorage for React Native)
// // import { combineReducers } from 'redux';
// // import { categoriesReducer } from './categoriesSlice'; // Path to your slice

// // // Redux Persist configuration
// // const persistConfig = {
// //   key: 'root',
// //   storage,
// //   whitelist: ['categories'], // Only persist the 'categories' slice
// // };

// // const rootReducer = combineReducers({
// //   categories: categoriesReducer, // Your categories slice reducer
// // });

// // // Persist the root reducer
// // const persistedReducer = persistReducer(persistConfig, rootReducer);

// // // Configure store
// // export const store = configureStore({
// //     reducer: persistedReducer,
// //     middleware: (getDefaultMiddleware) =>
// //       getDefaultMiddleware({
// //         serializableCheck: {
// //           ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore specific actions
// //           ignoredPaths: ['categories.categories'], // Ignore the categories path from serializable check
// //         },
// //       }),
// //   });

// // // Create a persistor (used for rehydrating state)
// // export const persistor = persistStore(store);


// // 27-12-2024
// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for React Native
// import { combineReducers } from 'redux';
// import { categoriesReducer } from './categoriesSlice'; // Path to your slice

// // Redux Persist configuration
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage, // Set AsyncStorage for React Native
//   whitelist: ['categories'], // Only persist the 'categories' slice
// };

// const rootReducer = combineReducers({
//   categories: categoriesReducer, // Your categories slice reducer
// });

// // Persist the root reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore specific actions
//         ignoredPaths: ['categories.categories'], // Ignore the categories path from serializable check
//       },
//     }),
// });

// // Create a persistor (used for rehydrating state)
// export const persistor = persistStore(store);


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { categoriesReducer } from './categoriesSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['categories'], // Persist only the 'categories' slice
};

// Combine reducers
const rootReducer = combineReducers({
  categories: categoriesReducer,
});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Persistor for rehydrating state
export const persistor = persistStore(store);
