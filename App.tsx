import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './app/src/Navigation/AuthStack';
import DrawerNavigation from './app/src/Navigation/DrawerNavigation';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/src/redux/store/store';
import { AuthProvider, useAuth } from './app/src/redux/store/AuthProvider';

const AppContent = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId ');
        setIsAuthenticated(!!userId);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        {/* Loading Indicator */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <DrawerNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};
  const LoadingIndicator = () => (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#FACA4E" />
    </View>
  );
const App = () => (
  // <Provider store={store}>
  //   <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
  //   </PersistGate>
  // </Provider>
);

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default App;
